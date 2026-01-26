import React, { useState } from "react";
import axios from "axios";
import { Edit3, Trash2, X, AlertCircle, Layers } from "lucide-react";
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
  const token = localStorage.getItem("token");

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
    <div className="w-full max-w-5xl mx-auto sm:px-2">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
           <div className={` sm:p-3 rounded-2xl ${isDarkMode ? 'bg-[#8b5cf6]/20 text-[#8b5cf6]' : 'bg-white text-purple-600'}`}>
               <Layers size={24} />
           </div>
           <div>
             <h2 className={`sm:text-xl font-bold ${theme.heading}`}>Form Preview</h2>
             <p className={`text-[10px] sm:text-sm ${theme.subtext}`}>This is how your form looks to users.</p>
           </div>
        </div>
        
        <div className={`px-1 py-1 sm:px-3 sm:py-3  rounded-lg text-[10px] sm:text-sm font-bold  border ${theme.input}
            `}>
          {previewFields.length}  Fields
        </div>
      </div>

      {/* Main List Container */}
      <div className={`rounded-xl px-2  py-4 sm:py-6  transition-colors duration-500 ${theme.container}`}>
        <div className="space-y-2 sm:space-y-4">
          {sortedFields.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 ${isDarkMode ? 'bg-[#05070f] text-gray-600' : 'bg-slate-50 text-slate-300'}`}>
                <AlertCircle size={40} strokeWidth={1.5} />
              </div>
              <div>
                  <p className={`font-semibold text-lg ${theme.heading}`}>No fields found</p>
                  <p className={`text-sm ${theme.subtext}`}>Add a new field above to get started.</p>
              </div>
            </div>
          ) : (
            sortedFields.map((field) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={field.masterFieldId} 
                className={`group relative px-4 sm:px-6 py-2 sm:py-6 rounded-2xl border transition-all duration-300 ${theme.fieldItem}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase px-2 rounded-md ${
                            isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100/60 text-violet-800'
                        }`}>
                            {field.type}
                        </span>
                    </div>
                    <label className={`block text-sm sm:text font-bold ${theme.heading}`}>{field.label}</label>
                  </div>
                  
                  <div className="flex gap-2 ">
                    <button 
                      onClick={() => openUpdatePopup(field)}
                      className={`p-2 rounded-xl border transition-all ${theme.actionBtn}`}
                      title="Edit Label"
                    >
                      <Edit3 size={10} sm:size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(field.masterFieldId)}
                      className={`p-2 rounded-xl border transition-all ${theme.actionBtn} ${theme.deleteBtn}`}
                      title="Delete Field"
                    >
                      <Trash2 size={10} sm:size={16} />
                    </button>
                  </div>
                </div>

                <div className="w-full max-w-xl  opacity-80">
                  {field.type === "TEXTAREA" && (
                    <textarea disabled className={`w-full rounded-xl px-4 py-2 h-24 resize-none border ${theme.input}`} placeholder="Long text entry..." />
                  )}

                  {["TEXT", "EMAIL", "NUMBER", "DATE"].includes(field.type) && (
                    <input
                      disabled
                      type={field.type === "DATE" ? "date" : field.type.toLowerCase()}
                      className={`w-full text-[13px] sm:text-sm rounded-xl px-4 py-1 sm:py-2 border ${theme.input}`}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  )}

                  {field.type === "CHECKBOX" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {field.options?.map((opt, i) => (
                        <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${isDarkMode ? 'bg-[#05070f] border-white/5' : 'bg-white border-slate-100'}`}>
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${isDarkMode ? 'border-purple-500/50' : 'border-purple-300'}`}></div>
                          <span className={`text-sm ${theme.subtext}`}>{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {field.type === "RADIO" && (
                    <div className="space-y-2">
                      {field.options?.map((opt, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border ${isDarkMode ? 'border-purple-500/50' : 'border-purple-300'}`}></div>
                          <span className={`text-sm ${theme.subtext}`}>{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {field.type === "DROPDOWN" && (
                    <div className={`w-full text-[13px] sm:text-sm rounded-xl px-4 py-1 sm:py-2  border flex justify-between items-center ${theme.input}`}>
                       <span>Select an option</span>
                       <span className="opacity-50 text-[10px]">▼</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* UPDATE MODAL */}
      <AnimatePresence>
        {updatePop && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setUpdatePop(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full p-1 max-w-md rounded 2overflow-hidden ${theme.modal}`}
            >
               {/* Decorative Glow */}
               <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20  rounded-full blur-[60px] pointer-events-none" />

              <div className="flex px-2 py-2 bg-violet-100 justify-between items-center mb-4 relative z-10">
                <h3 className={`text-2xl font-bold ${theme.subtext}`}>Rename Field</h3>
                <button 
                  onClick={() => setUpdatePop(false)}
                  className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-2 p-2">
                  <label className={`text-sm px-2 block font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      New Label Name
                  </label>
                  <input
                    autoFocus
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                    className={`w-full rounded-xl px-4 text-[14px] py-2 outline-none transition-all font-medium border ${theme.input}`}
                  />
                </div>

                <div className="flex gap-3 p-2">
                  <button
                    onClick={() => setUpdatePop(false)}
                    className={`px-6 py-2 font-bold text-sm rounded-xl transition-all border ${
                      isDarkMode 
                      ? 'bg-transparent text-gray-400 border-white/10 hover:bg-white/5' 
                      : 'bg-white text-gray-500 border-slate-200 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isUpdating}
                    onClick={handleUpdate}
                    className={`flex-1 font-bold py-2 text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${theme.buttonPrimary}`}
                  >
                    {isUpdating ? "Saving..." : (
                        <>
                            <span>Update Label</span>
                           
                        </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Preview;