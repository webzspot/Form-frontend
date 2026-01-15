import React, { useState } from "react";
import axios from "axios";
import { Edit3, Trash2, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const Preview = ({ previewFields, refreshFields }) => {
  const token = localStorage.getItem("token");

  const [updatePop, setUpdatePop] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  
  const sortedFields = [...previewFields].sort((a, b) => {
    return String(a.masterFieldId).localeCompare(String(b.masterFieldId));
  });

  // 🔹 Delete field
  // const handleDelete = async (masterFieldId) => {
  //   try {
  //     await axios.delete(
  //       `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${masterFieldId}`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     toast.success("Field removed");
  //     refreshFields();
  //   } catch (err) {
  //     toast.error("Could not delete field");
  //   }
  // };


  const handleDelete = async (masterFieldId) => {
  try {
    const res = await axios.delete(
      `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${masterFieldId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    if (res.status === 200 || res.status === 204) {
      toast.success("Field removed");
      // This function must trigger the GET request in the parent component
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

  // 🔹 Updated handleUpdate to fix "Cannot set options" error
  const handleUpdate = async () => {
    if (!selectedField || !updatedName.trim()) return;
    setIsUpdating(true);

    // 1. Start with basic payload
    const payload = {
      label: updatedName,
      type: selectedField.type,
    };

    // 2. ONLY add options if the type is one that uses them.
    // This fixes the "Cannot set options for field type DATE" error.
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
      // 3. Better error logging
      const errorMsg = err.response?.data?.message || "Update failed";
      console.error("Update Error:", err.response?.data);
      toast.error(errorMsg);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-20 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Form Preview</h2>
          <p className="text-sm text-slate-500">This is how your form looks to users.</p>
        </div>
        <div className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {previewFields.length} Fields
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-4 py-2 space-y-4">
          {sortedFields.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                <AlertCircle size={32} />
              </div>
              <p className="text-slate-400 font-medium">No fields added yet.</p>
            </div>
          ) : (
            sortedFields.map((field) => (
              <motion.div 
                layout
                key={field.masterFieldId} 
                className="group relative bg-slate-50/50 px-4 py-3 rounded-2xl border border-transparent hover:border-violet-100 hover:bg-white transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px]  font-bold text-violet-500 uppercase tracking-widest">{field.type}</span>
                    <label className="block font-bold  text-slate-700">{field.label}</label>
                  </div>
                  
                  <div className="flex gap-2  transition-opacity">
                    <button 
                      onClick={() => openUpdatePopup(field)}
                      className="p-2  bg-white text-slate-400 hover:text-violet-600 rounded-lg shadow-sm border border-slate-100 transition-all"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(field.masterFieldId)}
                      className="p-2 bg-white text-slate-400 hover:text-red-500 rounded-lg shadow-sm border border-slate-100 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="w-full mt-2 max-w-md pointer-events-none opacity-70">
                  {field.type === "TEXTAREA" && (
                    <textarea disabled className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 h-24 resize-none" placeholder="Long text entry..." />
                  )}

                  {["TEXT", "EMAIL", "NUMBER", "DATE"].includes(field.type) && (
                    <input
                      disabled
                      type={field.type === "DATE" ? "date" : field.type.toLowerCase()}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-600"
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                    />
                  )}

                  {field.type === "CHECKBOX" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {field.options?.map((opt, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100">
                          <input type="checkbox" disabled className="w-4 h-4 rounded border-slate-300 text-violet-600" />
                          <span className="text-sm text-slate-600">{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {field.type === "RADIO" && (
                    <div className="space-y-2">
                      {field.options?.map((opt, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <input type="radio" disabled className="w-4 h-4 border-slate-300 text-violet-600" />
                          <span className="text-sm text-slate-600">{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {field.type === "DROPDOWN" && (
                    <select disabled className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-600 outline-none appearance-none">
                      <option>Select an option</option>
                      {field.options?.map((opt, i) => (
                        <option key={i}>{opt}</option>
                      ))}
                    </select>
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Rename Label</h3>
               
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">New Label Name</label>
                  <input
                    autoFocus
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
                    className="w-full bg-slate-50 border mt-2 border-slate-200 rounded-2xl px-4 py-2  focus:bg-white outline-none transition-all font-medium"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    disabled={isUpdating}
                    onClick={handleUpdate}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-violet-200 transition-all"
                  >
                    {isUpdating ? "Saving..." : "Update Label"}
                  </button>
                  <button
                    onClick={() => setUpdatePop(false)}
                    className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    Cancel
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