import React, { useState } from "react";
import axios from "axios";
import { Edit3, Trash2, X,ChevronDown, AlertCircle, Layers, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useFormContext } from "../dashboard/FormContext"; 

// --- Custom Sparkle Icon for consistency ---
const SparkleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const Preview = ({ previewFields, refreshFields }) => {
  const { isDarkMode } = useFormContext(); 
  const token = sessionStorage.getItem("token");

  const [updatePop, setUpdatePop] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const sortedFields = [...previewFields].sort((a, b) => {
    return String(a.masterFieldId).localeCompare(String(b.masterFieldId));
  });

  const handleDelete = async (masterFieldId) => {
    try {
      const res = await axios.delete(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${masterFieldId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.status === 200 || res.status === 204) {
        toast.success("Field removed");
        refreshFields(); 
      }
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Could not delete field");
    }
  };

  const openUpdatePopup = (field) => {
    setSelectedField(field);
    setUpdatedName(field.label || "");
    setUpdatePop(true);
  };

  const handleUpdate = async () => {
    if (!selectedField || !updatedName.trim()) return;
    setIsUpdating(true);

    const payload = {
      label: updatedName,
      type: selectedField.type,
    };

    if (["CHECKBOX", "RADIO", "DROPDOWN"].includes(selectedField.type)) {
      payload.options = selectedField.options || [];
    }

    try {
      await axios.put(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${selectedField.masterFieldId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUpdatePop(false);
      refreshFields();
      toast.success("Label updated");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Update failed";
      toast.error(errorMsg);
    } finally {
      setIsUpdating(false);
    }
  };

  // --- THEME CONFIGURATION ---
  const theme = {
    // Container Background
    container: isDarkMode
      ? "bg-[#12121a]/60 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
      : "bg-white border border-slate-100 shadow-xl",
      
    // Text Colors
    heading: isDarkMode ? "text-white" : "text-[#4c1d95]",
    subtext: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/50",
    
    // Field Item Style
    fieldItem: isDarkMode
      ? "bg-[#05070f]/60 border-purple-500/10 hover:border-purple-500/40 hover:bg-[#05070f]"
      : "bg-slate-50 border-transparent hover:border-purple-200 hover:bg-white",
    
    // Inputs
    input: isDarkMode
      ? "bg-[#1e1b4b]/40 border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6]"
      : "bg-white border-slate-200 text-[#4c1d95] placeholder-[#4c1d95]/40 focus:border-[#8b5cf6]",

    // Action Buttons
    actionBtn: isDarkMode
      ? "bg-[#1e1b4b] text-gray-400 hover:text-white border-purple-500/10 hover:border-purple-500/50"
      : "bg-white text-gray-400 hover:text-[#4c1d95] border-slate-200 hover:border-purple-200",
      
    // Delete Button Specific
    deleteBtn: isDarkMode
      ? "hover:text-red-400 hover:border-red-500/50"
      : "hover:text-red-500 hover:border-red-200",

    // Modal
    modal: isDarkMode 
       ? "bg-[#1e1b4b] border border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.2)]" 
       : "bg-white shadow-2xl",
    
    // Primary Button
    buttonPrimary: isDarkMode
      ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
      : "bg-violet-800 text-white shadow-lg shadow-purple-200",
  };

  return (
  <>


 
      <section className="flex-[5] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-700">Form Preview</h3>
          </div>
          <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
            {previewFields.length} Fields
          </span>
        </div>

        
        <div className="p-6 space-y-4 overflow-y-auto flex-grow custom-scrollbar">
          <AnimatePresence>
            {previewFields.length > 0 ? (
              previewFields.map((field, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={field._id || field.masterFieldId || idx}
                  className="p-5 border border-gray-100 rounded-xl bg-white shadow-sm hover:border-blue-200 transition-colors relative group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-bold bg-blue-50 text-[#2B4BAB] px-2 py-0.5 rounded uppercase tracking-tighter">
                      {field.type}
                    </span>
                    
                    {/* Action Buttons visible on hover */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openUpdatePopup(field)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(field.masterFieldId || field._id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

               <label className="block text-sm font-bold text-gray-800 mb-2">
  {field.label} {field.required && <span className="text-red-500">*</span>}
</label>
                <div className="mt-1">
  {/* 1. CHECKBOX & RADIO */}
  {["CHECKBOX", "RADIO"].includes(field.type) ? (
    <div className="space-y-2 py-1">
      {field.options && field.options.length > 0 ? (
        field.options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-4 h-4 border border-gray-300 bg-gray-50 shrink-0 ${field.type === "RADIO" ? "rounded-full" : "rounded"}`} />
            <span className="text-sm text-gray-600">{opt}</span>
          </div>
        ))
      ) : (
        <p className="text-xs text-gray-400 italic">No options added</p>
      )}
    </div>
  ) : 
  /* 2. DROPDOWN */
  field.type === "DROPDOWN" ? (
    <div className="relative">
      <select disabled className="w-full p-2 border border-gray-200 rounded-md text-sm bg-gray-50/50 appearance-none cursor-not-allowed">
        <option>{field.placeholder || "Select an option..."}</option>
        {field.options?.map((opt, i) => (
          <option key={i}>{opt}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronDown size={14} className="text-gray-400" />
      </div>
    </div>
  ) : 
  /* 3. TEXTAREA / LIST */
  field.type === "TEXTAREA" || field.type === "LIST" ? (
    <textarea 
      disabled 
      className="w-full p-2 border border-gray-200 rounded-md text-sm bg-gray-50/50 h-20 resize-none cursor-not-allowed" 
      placeholder={field.placeholder || "Enter text..."}
    />
  ) : 
  /* 4. DEFAULT (TEXT, EMAIL, etc.) */
  (
    <input 
      type="text" 
      disabled 
      placeholder={field.placeholder || "..."} 
      className="w-full p-2 border border-gray-200 rounded-md text-sm bg-gray-50/50 cursor-not-allowed" 
    />
  )}
</div>
                
                      

                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 italic">
                No fields added yet.
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

     
      <AnimatePresence>
        {updatePop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-700">Rename Field</h3>
                <button onClick={() => setUpdatePop(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Field Label</label>
                <input
                  autoFocus
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
                <div className="flex gap-3 mt-6">
                  <button 
                    onClick={() => setUpdatePop(false)}
                    className="flex-1 px-4 py-2 text-sm font-bold text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="flex-1 px-4 py-2 text-sm font-bold text-white bg-[#2B4BAB] rounded-lg hover:bg-[#1e3a8a] disabled:opacity-50"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
  
  </>
  );
};

export default Preview;