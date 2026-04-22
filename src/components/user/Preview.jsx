// // import React, { useState } from "react";
// // import axios from "axios";
// // import { Edit3, Trash2, X,ChevronDown, AlertCircle, Layers, Eye } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import toast from "react-hot-toast";
// // import { useFormContext } from "../dashboard/FormContext"; 

// // // --- Custom Sparkle Icon for consistency ---
// // const SparkleIcon = ({ className }) => (
// //   <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
// //     <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
// //   </svg>
// // );

// // const Preview = ({ previewFields, refreshFields }) => {
// //   //const { isDarkMode } = useFormContext(); 
// //   const token = sessionStorage.getItem("token");

// //   const [updatePop, setUpdatePop] = useState(false);
// //   const [selectedField, setSelectedField] = useState(null);
// //   const [updatedName, setUpdatedName] = useState("");
// //   const [isUpdating, setIsUpdating] = useState(false);

// //   const sortedFields = [...previewFields].sort((a, b) => {
// //     return String(a.masterFieldId).localeCompare(String(b.masterFieldId));
// //   });

// //   const handleDelete = async (masterFieldId) => {
// //     try {
// //       const res = await axios.delete(
// //         `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${masterFieldId}`,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
      
// //       if (res.status === 200 || res.status === 204) {
// //         toast.success("Field removed");
// //         refreshFields(); 
// //       }
// //     } catch (err) {
// //       console.error("Delete Error:", err);
// //       toast.error("Could not delete field");
// //     }
// //   };

// //   const openUpdatePopup = (field) => {
// //     setSelectedField(field);
// //     setUpdatedName(field.label || "");
// //     setUpdatePop(true);
// //   };

// //   const handleUpdate = async () => {
// //     if (!selectedField || !updatedName.trim()) return;
// //     setIsUpdating(true);

// //     const payload = {
// //       label: updatedName,
// //       type: selectedField.type,
// //     };

// //     if (["CHECKBOX", "RADIO", "DROPDOWN"].includes(selectedField.type)) {
// //       payload.options = selectedField.options || [];
// //     }

// //     try {
// //       await axios.put(
// //         `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${selectedField.masterFieldId}`,
// //         payload,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       setUpdatePop(false);
// //       refreshFields();
// //       toast.success("Label updated");
// //     } catch (err) {
// //       const errorMsg = err.response?.data?.message || "Update failed";
// //       toast.error(errorMsg);
// //     } finally {
// //       setIsUpdating(false);
// //     }
// //   };

  

// //   return (
// //   <>


 
// //       <section className="flex-[5] bg-white rounded-md
// //        border border-gray-200 shadow-sm overflow-hidden flex flex-col">
// //         {/* Header */}
// //         <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
// //           <div className="flex items-center gap-2">
// //             <Eye size={16} className="text-gray-400" />
// //             <h3 className="text-sm font-semibold text-gray-700">Form Preview</h3>
// //           </div>
// //           <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
// //             {previewFields.length} Fields
// //           </span>
// //         </div>

        
// //         <div className="p-6 space-y-4 overflow-y-auto flex-grow custom-scrollbar">
// //           <AnimatePresence>
// //             {previewFields.length > 0 ? (
// //               previewFields.map((field, idx) => (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: 10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   key={field._id || field.masterFieldId || idx}
// //                   className="p-5 border border-gray-100 rounded-md bg-white shadow-sm hover:border-blue-200 transition-colors relative group"
// //                 >
// //                   <div className="flex justify-between items-start mb-2">
// //                     <span className="text-[9px] font-bold bg-blue-50 text-[#2B4BAB] px-2 py-0.5 rounded uppercase tracking-tighter">
// //                       {field.type}
// //                     </span>
                    
// //                     {/* Action Buttons visible on hover */}
// //                     <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
// //                       <button 
// //                         onClick={() => openUpdatePopup(field)}
// //                         className="p-1 text-blue-600 hover:bg-blue-50 rounded"
// //                       >
// //                         <Edit3 size={14} />
// //                       </button>
// //                       <button 
// //                         onClick={() => handleDelete(field.masterFieldId || field._id)}
// //                         className="p-1 text-red-500 hover:bg-red-50 rounded"
// //                       >
// //                         <Trash2 size={14} />
// //                       </button>
// //                     </div>
// //                   </div>

// //                <label className="block text-sm font-bold text-gray-800 mb-2">
// //   {field.label} {field.required && <span className="text-red-500">*</span>}
// // </label>
// //                 <div className="mt-1">
// //   {/* 1. CHECKBOX & RADIO */}
// //   {["CHECKBOX", "RADIO"].includes(field.type) ? (
// //     <div className="space-y-2 py-1">
// //       {field.options && field.options.length > 0 ? (
// //         field.options.map((opt, i) => (
// //           <div key={i} className="flex items-center gap-2">
// //             <div className={`w-4 h-4 border border-gray-300 bg-gray-50 shrink-0 ${field.type === "RADIO" ? "rounded-full" : "rounded"}`} />
// //             <span className="text-sm text-gray-600">{opt}</span>
// //           </div>
// //         ))
// //       ) : (
// //         <p className="text-xs text-gray-400 italic">No options added</p>
// //       )}
// //     </div>
// //   ) : 
// //   /* 2. DROPDOWN */
// //   field.type === "DROPDOWN" ? (
// //     <div className="relative">
// //       <select disabled className="w-full p-2 border border-gray-200 rounded-md text-sm bg-gray-50/50 appearance-none cursor-not-allowed">
// //         <option>{field.placeholder || "Select an option..."}</option>
// //         {field.options?.map((opt, i) => (
// //           <option key={i}>{opt}</option>
// //         ))}
// //       </select>
// //       <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
// //         <ChevronDown size={14} className="text-gray-400" />
// //       </div>
// //     </div>
// //   ) : 
// //   /* 3. TEXTAREA / LIST */
// //   field.type === "TEXTAREA" || field.type === "LIST" ? (
// //     <textarea 
// //       disabled 
// //       className="w-full p-2 border border-gray-200 rounded-md text-sm bg-gray-50/50 h-20 resize-none cursor-not-allowed" 
// //       placeholder={field.placeholder || "Enter text..."}
// //     />
// //   ) : 
// //   /* 4. DEFAULT (TEXT, EMAIL, etc.) */
// //   (
// //     <input 
// //       type="text" 
// //       disabled 
// //       placeholder={field.placeholder || "..."} 
// //       className="w-full p-2 border border-gray-200 rounded-md text-sm bg-gray-50/50 cursor-not-allowed" 
// //     />
// //   )}
// // </div>
                
                      

// //                 </motion.div>
// //               ))
// //             ) : (
// //               <div className="flex flex-col items-center justify-center h-full text-gray-400 italic">
// //                 No fields added yet.
// //               </div>
// //             )}
// //           </AnimatePresence>
// //         </div>
// //       </section>

     
// //       <AnimatePresence>
// //         {updatePop && (
// //           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
// //             <motion.div 
// //               initial={{ scale: 0.95, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               className="bg-white rounded-md shadow-xl w-full max-w-md overflow-hidden border border-gray-100"
// //             >
// //               <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
// //                 <h3 className="font-bold text-gray-700">Rename Field</h3>
// //                 <button onClick={() => setUpdatePop(false)} className="text-gray-400 hover:text-gray-600">
// //                   <X size={20} />
// //                 </button>
// //               </div>
// //               <div className="p-6">
// //                 <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Field Label</label>
// //                 <input
// //                   autoFocus
// //                   value={updatedName}
// //                   onChange={(e) => setUpdatedName(e.target.value)}
// //                   className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500/20 outline-none"
// //                 />
// //                 <div className="flex gap-3 mt-6">
// //                   <button 
// //                     onClick={() => setUpdatePop(false)}
// //                     className="flex-1 px-4 py-2 text-sm font-bold text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button 
// //                     onClick={handleUpdate}
// //                     disabled={isUpdating}
// //                     className="flex-1 px-4 py-2 text-sm font-bold text-white bg-[#2B4BAB] rounded-md hover:bg-[#1e3a8a] disabled:opacity-50"
// //                   >
// //                     {isUpdating ? "Saving..." : "Save Changes"}
// //                   </button>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </div>
// //         )}
// //       </AnimatePresence>
  
// //   </>
// //   );
// // };

// // export default Preview;



// // // import React, { useState } from "react";
// // // import axios from "axios";
// // // import { Edit3, Trash2, X, ChevronDown, Eye, Loader2 } from "lucide-react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import toast from "react-hot-toast";

// // // const Preview = ({ previewFields, refreshFields, token }) => {
// // //   const [updatePop, setUpdatePop] = useState(false);
// // //   const [selectedField, setSelectedField] = useState(null);
  
// // //   // State for editing in popup
// // //   const [updatedName, setUpdatedName] = useState("");
// // //   const [updatedPlaceholder, setUpdatedPlaceholder] = useState("");
// // //   const [updatedRequired, setUpdatedRequired] = useState(false);
  
// // //   const [isUpdating, setIsUpdating] = useState(false);

// // //   const handleDelete = async (masterFieldId) => {
// // //     try {
// // //       const res = await axios.delete(
// // //         `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${masterFieldId}`,
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );
      
// // //       if (res.status === 200 || res.status === 204) {
// // //         toast.success("Field removed");
// // //         refreshFields(); 
// // //       }
// // //     } catch (err) {
// // //       toast.error("Could not delete field");
// // //     }
// // //   };

// // //   const openUpdatePopup = (field) => {
// // //     setSelectedField(field);
// // //     setUpdatedName(field.label || "");
// // //     setUpdatedPlaceholder(field.placeholder || "");
// // //     setUpdatedRequired(field.required || false);
// // //     setUpdatePop(true);
// // //   };

// // //   const handleUpdate = async () => {
// // //     if (!selectedField || !updatedName.trim()) return;
// // //     setIsUpdating(true);

// // //     const payload = {
// // //       label: updatedName,
// // //       type: selectedField.type,
// // //       placeholder: updatedPlaceholder,
// // //       required: updatedRequired,
// // //       readOnly: selectedField.readOnly,
// // //     };

// // //     if (["CHECKBOX", "RADIO", "DROPDOWN"].includes(selectedField.type)) {
// // //       payload.options = selectedField.options || [];
// // //     }

// // //     try {
// // //       await axios.put(
// // //         `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${selectedField.masterFieldId}`,
// // //         payload,
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );
// // //       setUpdatePop(false);
// // //       refreshFields();
// // //       toast.success("Field updated successfully");
// // //     } catch (err) {
// // //       toast.error(err.response?.data?.message || "Update failed");
// // //     } finally {
// // //       setIsUpdating(false);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <section className="flex-[5] bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden flex flex-col">
// // //         {/* Header */}
// // //         <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
// // //           <div className="flex items-center gap-2">
// // //             <Eye size={16} className="text-gray-400" />
// // //             <h3 className="text-sm font-semibold text-gray-700">Form Preview</h3>
// // //           </div>
// // //           <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md uppercase">
// // //             {previewFields.length} Available Fields
// // //           </span>
// // //         </div>

// // //         {/* Scrollable List */}
// // //         <div className="p-6 space-y-4 overflow-y-auto flex-grow custom-scrollbar">
// // //           <AnimatePresence>
// // //             {previewFields.length > 0 ? (
// // //               previewFields.map((field, idx) => (
// // //                 <motion.div
// // //                   initial={{ opacity: 0, y: 10 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   key={field._id || field.masterFieldId || idx}
// // //                   className="p-5 border border-gray-100 rounded-md bg-white shadow-sm hover:border-blue-200 transition-colors relative group"
// // //                 >
// // //                   <div className="flex justify-between items-start mb-2">
// // //                     <span className="text-[9px] font-bold bg-blue-50 text-[#2B4BAB] px-2 py-0.5 rounded uppercase tracking-tighter">
// // //                       {field.type}
// // //                     </span>
                    
// // //                     {/* Action Buttons */}
// // //                     <div className="flex gap-1  transition-opacity">
// // //                       <button 
// // //                         onClick={() => openUpdatePopup(field)}
// // //                         className="p-1 text-blue-600 hover:bg-blue-50 rounded"
// // //                         title="Edit properties"
// // //                       >
// // //                         <Edit3 size={14} />
// // //                       </button>
// // //                       <button 
// // //                         onClick={() => handleDelete(field.masterFieldId || field._id)}
// // //                         className="p-1 text-red-500 hover:bg-red-50 rounded"
// // //                       >
// // //                         <Trash2 size={14} />
// // //                       </button>
// // //                     </div>
// // //                   </div>

// // //                   <label className="block text-sm font-bold text-gray-800 mb-2">
// // //                     {field.label} {field.required && <span className="text-red-500">*</span>}
// // //                   </label>

// // //                   <div className="mt-1">
// // //                     {["CHECKBOX", "RADIO"].includes(field.type) ? (
// // //                       <div className="space-y-2 py-1">
// // //                         {field.options?.map((opt, i) => (
// // //                           <div key={i} className="flex items-center gap-2">
// // //                             <div className={`w-4 h-4 border border-gray-300 bg-gray-50 shrink-0 ${field.type === "RADIO" ? "rounded-full" : "rounded"}`} />
// // //                             <span className="text-sm text-gray-600">{opt}</span>
// // //                           </div>
// // //                         ))}
// // //                       </div>
// // //                     ) : field.type === "DROPDOWN" ? (
// // //                       <div className="relative">
// // //                         <select disabled className="w-full p-2.5 border border-gray-200 rounded-md text-sm bg-gray-50 appearance-none cursor-not-allowed">
// // //                           <option>{field.placeholder || "Select an option..."}</option>
// // //                         </select>
// // //                         <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
// // //                       </div>
// // //                     ) : (
// // //                       <input 
// // //                         type="text" 
// // //                         disabled 
// // //                         placeholder={field.placeholder || "Enter data..."} 
// // //                         className="w-full p-2.5 border border-gray-200 rounded-md text-sm bg-gray-50 cursor-not-allowed" 
// // //                       />
// // //                     )}
// // //                   </div>
// // //                 </motion.div>
// // //               ))
// // //             ) : (
// // //               <div className="flex flex-col items-center justify-center h-full text-gray-400 italic py-10">
// // //                 No fields added yet.
// // //               </div>
// // //             )}
// // //           </AnimatePresence>
// // //         </div>
// // //       </section>

// // //       {/* UPDATE POPUP */}
// // //       <AnimatePresence>
// // //         {updatePop && (
// // //           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
// // //             <motion.div 
// // //               initial={{ scale: 0.95, opacity: 0 }}
// // //               animate={{ scale: 1, opacity: 1 }}
// // //               className="bg-white rounded-md shadow-xl w-full max-w-md overflow-hidden border border-gray-100"
// // //             >
// // //               <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
// // //                 <h3 className="font-bold text-gray-700">Edit Field Properties</h3>
// // //                 <button onClick={() => setUpdatePop(false)} className="text-gray-400 hover:text-gray-600">
// // //                   <X size={20} />
// // //                 </button>
// // //               </div>

// // //               <div className="p-6 space-y-5">
// // //                 {/* Field Label (Name) */}
// // //                 <div>
// // //                   <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Field Name</label>
// // //                   <input
// // //                     value={updatedName}
// // //                     onChange={(e) => setUpdatedName(e.target.value)}
// // //                     className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2B4BAB]/20 outline-none"
// // //                     placeholder="Enter field name"
// // //                   />
// // //                 </div>

// // //                 {/* Placeholder Edit */}
// // //                 {!["CHECKBOX", "RADIO"].includes(selectedField?.type) && (
// // //                   <div>
// // //                     <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Placeholder</label>
// // //                     <input
// // //                       value={updatedPlaceholder}
// // //                       onChange={(e) => setUpdatedPlaceholder(e.target.value)}
// // //                       className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2B4BAB]/20 outline-none"
// // //                       placeholder="Enter placeholder text"
// // //                     />
// // //                   </div>
// // //                 )}

// // //                 {/* Required Toggle */}
// // //                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
// // //                   <span className="text-sm font-semibold text-gray-700">Required Field</span>
// // //                   <button 
// // //                     onClick={() => setUpdatedRequired(!updatedRequired)}
// // //                     className={`w-10 h-5 rounded-full relative transition-colors ${updatedRequired ? 'bg-[#2B4BAB]' : 'bg-gray-300'}`}
// // //                   >
// // //                     <motion.div 
// // //                       animate={{ x: updatedRequired ? 20 : 2 }}
// // //                       className="w-4 h-4 bg-white rounded-full mt-0.5 shadow-sm"
// // //                     />
// // //                   </button>
// // //                 </div>

// // //                 <div className="flex gap-3 pt-2">
// // //                   <button 
// // //                     onClick={() => setUpdatePop(false)}
// // //                     className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200"
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                   <button 
// // //                     onClick={handleUpdate}
// // //                     disabled={isUpdating}
// // //                     className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-[#2B4BAB] rounded-md hover:bg-[#1e3a8a] disabled:opacity-50 flex justify-center items-center gap-2"
// // //                   >
// // //                     {isUpdating ? <><Loader2 className="animate-spin" size={16}/> Saving</> : "Save Changes"}
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </motion.div>
// // //           </div>
// // //         )}
// // //       </AnimatePresence>
// // //     </>
// // //   );
// // // };

// // // export default Preview;




// import React, { useState } from "react";
// import axios from "axios";
// import { Edit3, Trash2, X, ChevronDown, AlertCircle, Layers, Eye, Loader2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";

// const Preview = ({ previewFields, refreshFields }) => {
//   const token = sessionStorage.getItem("token");

//   const [updatePop, setUpdatePop] = useState(false);
//   const [selectedField, setSelectedField] = useState(null);
//   const [updatedName, setUpdatedName] = useState("");
//   const [updatedPlaceholder, setUpdatedPlaceholder] = useState(""); // ✅ New: placeholder update
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [deletingId, setDeletingId] = useState(null); // ✅ New: per-field delete loader

//   const handleDelete = async (masterFieldId) => {
//     setDeletingId(masterFieldId); // ✅ Show spinner on this field
//     try {
//       const res = await axios.delete(
//         `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${masterFieldId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.status === 200 || res.status === 204) {
//         toast.success("Field removed");
//         refreshFields(); 
//       }
//     } catch (err) {
//       console.error("Delete Error:", err);
//       toast.error("Could not delete field");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const openUpdatePopup = (field) => {
//     setSelectedField(field);
//     setUpdatedName(field.label || "");
//     setUpdatedPlaceholder(field.placeHolder || ""); // ✅ Pre-fill placeholder (capital H)
//     setUpdatePop(true);
//   };

//   const handleUpdate = async () => {
//     if (!selectedField || !updatedName.trim()) return;
//     setIsUpdating(true);

//     const payload = {
//       label: updatedName,
//       type: selectedField.type,
//       placeHolder: updatedPlaceholder, // ✅ Send updated placeholder (capital H)
//     };

//     if (["CHECKBOX", "RADIO", "DROPDOWN"].includes(selectedField.type)) {
//       payload.options = selectedField.options || [];
//     }

//     try {
//       await axios.put(
//         `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${selectedField.masterFieldId}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUpdatePop(false);
//       refreshFields();
//       toast.success("Field updated");
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || "Update failed";
//       toast.error(errorMsg);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <>
//       <section className="flex-[5] bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden flex flex-col">
//         {/* Header */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
//           <div className="flex items-center gap-2">
//             <Eye size={16} className="text-gray-400" />
//             <h3 className="text-sm font-semibold text-gray-700">Form Preview</h3>
//           </div>
//           <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
//             {previewFields.length} Fields
//           </span>
//         </div>

//         <div className="p-6 space-y-4 overflow-y-auto flex-grow custom-scrollbar">
//           <AnimatePresence>
//             {previewFields.length > 0 ? (
//               previewFields.map((field, idx) => (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   key={field._id || field.masterFieldId || idx}
//                   className={`p-5 border border-gray-100 rounded-md bg-white shadow-sm hover:border-blue-200 transition-colors relative group ${
//                     deletingId === (field.masterFieldId || field._id) ? "opacity-50 pointer-events-none" : ""
//                   }`}
//                 >
//                   {/* Delete Loader Overlay */}
//                   {deletingId === (field.masterFieldId || field._id) && (
//                     <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-md z-10">
//                       <Loader2 size={20} className="animate-spin text-[#2B4BAB]" />
//                     </div>
//                   )}

//                   <div className="flex justify-between items-start mb-2">
//                     <span className="text-[9px] font-bold bg-blue-50 text-[#2B4BAB] px-2 py-0.5 rounded uppercase tracking-tighter">
//                       {field.type}
//                     </span>
                    
//                     {/* Action Buttons visible on hover */}
//                     <div className="flex gap-1">
//                       <button 
//                         onClick={() => openUpdatePopup(field)}
//                         className="p-1 text-blue-600 hover:bg-blue-50 rounded"
//                       >
//                         <Edit3 size={14} />
//                       </button>
//                       <button 
//                         onClick={() => handleDelete(field.masterFieldId || field._id)}
//                         className="p-1 text-red-500 hover:bg-red-50 rounded"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   </div>

//                   <label className="block text-sm font-bold text-gray-800 mb-2">
//                     {field.label} {field.required && <span className="text-red-500">*</span>}
//                   </label>

//                   <div className="mt-1">
//                     {/* CHECKBOX & RADIO */}
//                     {["CHECKBOX", "RADIO"].includes(field.type) ? (
//                       <div className="space-y-2 py-1">
//                         {field.options && field.options.length > 0 ? (
//                           field.options.map((opt, i) => (
//                             <div key={i} className="flex items-center gap-2">
//                               <div className={`w-4 h-4 border border-gray-300 bg-gray-50 shrink-0 ${field.type === "RADIO" ? "rounded-full" : "rounded"}`} />
//                               <span className="text-sm text-gray-600">{opt}</span>
//                             </div>
//                           ))
//                         ) : (
//                           <p className="text-xs text-gray-400 italic">No options added</p>
//                         )}
//                       </div>
//                     ) : field.type === "DROPDOWN" ? (
//                       /* DROPDOWN */
//                       <div className="relative">
//                         <select disabled className="w-full p-2 border border-gray-200 rounded-md text-sm bg-gray-50/50 appearance-none cursor-not-allowed">
//                           <option>{field.placeHolder || "Select an option..."}</option>
//                           {field.options?.map((opt, i) => (
//                             <option key={i}>{opt}</option>
//                           ))}
//                         </select>
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
//                           <ChevronDown size={14} className="text-gray-400" />
//                         </div>
//                       </div>
//                     ) : field.type === "TEXTAREA" || field.type === "LIST" ? (
//                       /* TEXTAREA */
//                       <textarea 
//                         disabled 
//                         className="w-full p-2 border border-gray-200 rounded-md text-sm bg-gray-50/50 h-20 resize-none cursor-not-allowed" 
//                         placeholder={field.placeHolder || "Enter text..."}  // ✅ capital H
//                       />
//                     ) : (
//                       /* DEFAULT: TEXT, EMAIL, NUMBER, DATE etc. */
//                       <input 
//                         type="text" 
//                         disabled 
//                         placeholder={field.placeHolder || "..."}  // ✅ capital H
//                         className="w-full p-2 border border-gray-200 rounded-md text-sm bg-gray-50/50 cursor-not-allowed" 
//                       />
//                     )}
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="flex flex-col items-center justify-center h-full text-gray-400 italic">
//                 No fields added yet.
//               </div>
//             )}
//           </AnimatePresence>
//         </div>
//       </section>

//       {/* Update Popup */}
//       <AnimatePresence>
//         {updatePop && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//             <motion.div 
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="bg-white rounded-md shadow-xl w-full max-w-md overflow-hidden border border-gray-100"
//             >
//               <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
//                 <h3 className="font-bold text-gray-700">Edit Field</h3>
//                 <button onClick={() => setUpdatePop(false)} className="text-gray-400 hover:text-gray-600">
//                   <X size={20} />
//                 </button>
//               </div>

//               <div className="p-6 space-y-4">
//                 {/* Label */}
//                 <div>
//                   <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Field Label</label>
//                   <input
//                     autoFocus
//                     value={updatedName}
//                     onChange={(e) => setUpdatedName(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500/20 outline-none"
//                     placeholder="Enter label"
//                   />
//                 </div>

//                 {/* Placeholder — hide for RADIO & CHECKBOX */}
//                 {!["RADIO", "CHECKBOX"].includes(selectedField?.type) && (
//                   <div>
//                     <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Placeholder</label>
//                     <input
//                       value={updatedPlaceholder}
//                       onChange={(e) => setUpdatedPlaceholder(e.target.value)}
//                       className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500/20 outline-none"
//                       placeholder="e.g. Enter your name"
//                     />
//                   </div>
//                 )}

//                 <div className="flex gap-3 mt-2">
//                   <button 
//                     onClick={() => setUpdatePop(false)}
//                     className="flex-1 px-4 py-2 text-sm font-bold text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200"
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     onClick={handleUpdate}
//                     disabled={isUpdating}
//                     className="flex-1 px-4 py-2 text-sm font-bold text-white bg-[#2B4BAB] rounded-md hover:bg-[#1e3a8a] disabled:opacity-50 flex items-center justify-center gap-2"
//                   >
//                     {isUpdating ? (
//                       <>
//                         <Loader2 size={15} className="animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       "Save Changes"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Preview;


import React, { useState } from "react";
import axios from "axios";
import { Edit3, Trash2, X, ChevronDown, Eye, Loader2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const Preview = ({ previewFields, refreshFields }) => {
  const token = sessionStorage.getItem("token");

  const [updatePop, setUpdatePop] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPlaceholder, setUpdatedPlaceholder] = useState("");
  const [updatedRequired, setUpdatedRequired] = useState(false);
  const [updatedReadOnly, setUpdatedReadOnly] = useState(false);
  const [updatedOptions, setUpdatedOptions] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (masterFieldId) => {
    setDeletingId(masterFieldId);
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
    } finally {
      setDeletingId(null);
    }
  };

  const openUpdatePopup = (field) => {
    setSelectedField(field);
    setUpdatedName(field.label || "");
    setUpdatedPlaceholder(field.placeHolder || "");
    setUpdatedRequired(field.required || false);
    setUpdatedReadOnly(field.readOnly || false);
    setUpdatedOptions(
      field.options && field.options.length > 0 ? [...field.options] : [""]
    );
    setUpdatePop(true);
  };

  const handleOptionChange = (index, value) => {
    const updated = [...updatedOptions];
    updated[index] = value;
    setUpdatedOptions(updated);
  };

  const addOption = () => setUpdatedOptions([...updatedOptions, ""]);

  const removeOption = (index) => {
    if (updatedOptions.length <= 1) return;
    setUpdatedOptions(updatedOptions.filter((_, i) => i !== index));
  };

  const handleUpdate = async () => {
    if (!selectedField || !updatedName.trim()) return toast.error("Label is required");
    setIsUpdating(true);

    const payload = {
      label: updatedName,
      type: selectedField.type,
      placeHolder: updatedPlaceholder,
      required: updatedRequired,
      readOnly: updatedReadOnly,
    };

    if (["CHECKBOX", "RADIO", "DROPDOWN"].includes(selectedField.type)) {
      payload.options = updatedOptions.filter((o) => o.trim() !== "");
    }

    try {
      await axios.put(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${selectedField.masterFieldId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUpdatePop(false);
      refreshFields();
      toast.success("Field updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  const hasOptions = (type) => ["CHECKBOX", "RADIO", "DROPDOWN"].includes(type);
  const hasPlaceholder = (type) => !["RADIO", "CHECKBOX"].includes(type);

  return (
    <>
      <section className="flex-[5] bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden flex flex-col">
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
                  exit={{ opacity: 0, y: -10 }}
                  key={field._id || field.masterFieldId || idx}
                  className={`p-5 border border-gray-100 rounded-md bg-white shadow-sm hover:border-blue-200 transition-colors relative group ${
                    deletingId === (field.masterFieldId || field._id)
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                >
                  {/* Delete Loader Overlay */}
                  {deletingId === (field.masterFieldId || field._id) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-md z-10">
                      <Loader2 size={20} className="animate-spin text-[#2B4BAB]" />
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-bold bg-blue-50 text-[#2B4BAB] px-2 py-0.5 rounded uppercase tracking-tighter">
                        {field.type}
                      </span>
                      {field.required && (
                        <span className="text-[9px] font-bold bg-red-50 text-red-500 px-2 py-0.5 rounded uppercase tracking-tighter">
                          Required
                        </span>
                      )}
                      {field.readOnly && (
                        <span className="text-[9px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase tracking-tighter">
                          Read Only
                        </span>
                      )}
                    </div>

                    <div className="flex gap-1">
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
                    {field.label}{" "}
                    {/* {field.required && <span className="text-red-500">*</span>} */}
                  </label>

                  <div className="mt-1">
                    {["CHECKBOX", "RADIO"].includes(field.type) ? (
                      <div className="space-y-2 py-1">
                        {field.options && field.options.length > 0 ? (
                          field.options.map((opt, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 border border-gray-300 bg-gray-50 shrink-0 ${
                                  field.type === "RADIO" ? "rounded-full" : "rounded"
                                }`}
                              />
                              <span className="text-sm text-gray-600">{opt}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-gray-400 italic">No options added</p>
                        )}
                      </div>
                    ) : field.type === "DROPDOWN" ? (
                      <div className="relative">
                        <select
                          disabled
                          className="w-full p-2 border border-gray-200 rounded-md text-sm bg-gray-50/50 appearance-none cursor-not-allowed"
                        >
                          <option>{field.placeHolder || "Select an option..."}</option>
                          {field.options?.map((opt, i) => (
                            <option key={i}>{opt}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <ChevronDown size={14} className="text-gray-400" />
                        </div>
                      </div>
                    ) : field.type === "TEXTAREA" || field.type === "LIST" ? (
                      <textarea
                        disabled
                        className="w-full p-2 border border-gray-200 rounded-md text-sm bg-gray-50/50 h-20 resize-none cursor-not-allowed"
                        placeholder={field.placeHolder || "Enter text..."}
                      />
                    ) : (
                      <input
                        type="text"
                        disabled
                        placeholder={field.placeHolder || "..."}
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

      {/* ── Update Popup ── */}
      <AnimatePresence>
        {updatePop && selectedField && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-md shadow-xl w-full max-w-md overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col"
            >
              {/* Popup Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                <div>
                  <h3 className="font-bold text-gray-700">Edit Field</h3>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">
                    {selectedField.type}
                  </p>
                </div>
                <button
                  onClick={() => setUpdatePop(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Popup Body — scrollable */}
              <div className="p-6 space-y-5 overflow-y-auto flex-grow custom-scrollbar">

                {/* Field Label */}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">
                    Field Label
                  </label>
                  <input
                    autoFocus
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2B4BAB]/20 outline-none text-sm"
                    placeholder="Enter label"
                  />
                </div>

                {/* Placeholder — hidden for RADIO & CHECKBOX */}
                {hasPlaceholder(selectedField.type) && (
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">
                      Placeholder
                    </label>
                    <input
                      value={updatedPlaceholder}
                      onChange={(e) => setUpdatedPlaceholder(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2B4BAB]/20 outline-none text-sm"
                      placeholder="e.g. Enter your name"
                    />
                  </div>
                )}

                {/* Options — only for CHECKBOX, RADIO, DROPDOWN */}
                {hasOptions(selectedField.type) && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-xs font-bold text-gray-400 uppercase">
                        Options
                      </label>
                      <button
                        onClick={addOption}
                        className="text-[11px] bg-[#2B4BAB]/10 text-[#2B4BAB] px-3 py-1.5 rounded-md font-bold hover:bg-[#2B4BAB]/20 transition-all flex items-center gap-1"
                      >
                        <Plus size={12} /> ADD OPTION
                      </button>
                    </div>
                    <div className="space-y-2 max-h-44 overflow-y-auto pr-1 custom-scrollbar">
                      {updatedOptions.map((opt, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex gap-2 items-center"
                        >
                          <input
                            value={opt}
                            onChange={(e) => handleOptionChange(i, e.target.value)}
                            placeholder={`Option ${i + 1}`}
                            className="flex-1 px-3 py-2 rounded-md border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#2B4BAB]/20"
                          />
                          {updatedOptions.length > 1 && (
                            <button
                              onClick={() => removeOption(i)}
                              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Validation Toggles */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Validation
                  </h4>
                  <div className="space-y-4">
                    {/* Required */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">Required</span>
                      <div
                        onClick={() => setUpdatedRequired(!updatedRequired)}
                        className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors duration-200 ${
                          updatedRequired ? "bg-[#2B4BAB]" : "bg-gray-200"
                        }`}
                      >
                        <motion.div
                          animate={{ x: updatedRequired ? 24 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Read Only */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">Read Only</span>
                      <div
                        onClick={() => setUpdatedReadOnly(!updatedReadOnly)}
                        className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors duration-200 ${
                          updatedReadOnly ? "bg-[#2B4BAB]" : "bg-gray-200"
                        }`}
                      >
                        <motion.div
                          animate={{ x: updatedReadOnly ? 24 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popup Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex gap-3 shrink-0 bg-gray-50/50">
                <button
                  onClick={() => setUpdatePop(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-[#2B4BAB] rounded-md hover:bg-[#1e3a8a] disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Preview;