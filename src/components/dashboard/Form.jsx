// // import React, { useEffect, useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import axios from 'axios';
// // import toast from 'react-hot-toast';
// // import UserNavbar from "../user/UserNavbar";
// // import { useFormContext } from './FormContext';
// // import { EditIcon, Trash2, X, Send } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import { MdAddCard, MdOutlineDesignServices } from 'react-icons/md';
// // import Footer from '../landingPage/Footer';
// // import Design from './Design';
// // import WaveBackground from '../dashboard/WaveBackground';
// // import { FaSpinner } from 'react-icons/fa';


// // const Form = () => {
// //   // masterfield
// //   const [masterFields, setMasterFields] = useState([]);
// //   const [selectedFields, setSelectedFields] = useState([]);
// //   const [showFormBuilder, setShowFormBuilder] = useState(false);
// //   const [formTitle, setFormTitle] = useState("Untitled Form");
// //   const [isAddingMaster, setIsAddingMaster] = useState(false);
// // const [newField, setNewField] = useState({ label: "", type: "TEXT", options: [""] });

// //   // formfield
// //   const { forms, setForms, updateFormLocally, deleteFormLocally } = useFormContext();
// //   const [loading, setLoading] = useState(false);
// //   const [isDeleting, setIsDeleting] = useState(null);
// //   const [isPublic, setIsPublic] = useState(true);

// //   // --- THEME STATE ---
// //   const [formTheme, setFormTheme] = useState({
// //     bgColor: "#ffffff",
// //     buttonColor: "#7c3aed",
// //     inputBgColor: "#f3f4f6",
// //     labelFont: "Inter",
// //     borderRadius: "8px"
// //   });

// //   const token = localStorage.getItem("token");
// //   const navigate = useNavigate();

// //   const URL = import.meta.env.VITE_URL;
// //   const navi = useNavigate();

// //   // 1. Fetch Master Fields
// //   useEffect(() => {
// //     const getMasterFields = async () => {
// //       try {
// //         const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields", {
// //           headers: { Authorization: `Bearer ${token}` }
// //         });
// //         setMasterFields(res.data.data);
// //       } catch (err) {
// //         toast.error("Error loading master fields");
// //       }
// //     };
// //     getMasterFields();
// //   }, [token]);

// //   const handleInlineCreate = async () => {
// //   if (!newField.label) return toast.error("Label name required");

// //   try {
// //     const res = await axios.post("https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields", newField, {
// //       headers: { Authorization: `Bearer ${token}` }
// //     });

// //     toast.success("Field Created!");
    
// //     // Add new field to the list on the left
// //     setMasterFields(prev => [...prev, res.data.data]);
    
// //     // Reset and hide the form
// //     setNewField({ label: "", type: "TEXT", options: [""] });
// //     setIsAddingMaster(false);
// //   } catch (err) {
// //     toast.error("Failed to add master field");
// //   }
// // };

// //   // 2. Toggle field selection
// //   const toggleField = (toggledField) => {
// //     setSelectedFields(prev => {
// //       const exists = prev.find(f => f.masterFieldId === toggledField.masterFieldId);
// //       if (exists) {
// //         return prev.filter(f => f.masterFieldId !== toggledField.masterFieldId);
// //       }
// //       return [...prev, { ...toggledField, required: false }];
// //     });
// //   };

// //   // 3. Update Logic for any field property (Label, Type, etc.)
// //   const updateFieldProperty = (index, key, value) => {
// //     const updatedFields = [...selectedFields];
// //     updatedFields[index] = { ...updatedFields[index], [key]: value };
// //     setSelectedFields(updatedFields);
// //   };

// //   // 4. Create Form API
// //   const createForm = async () => {
// //     if (selectedFields.length === 0) return toast.error("Please select at least one field");
// //     setLoading(true);
// //     try {
// //       const uniqueTitle = formTitle === "Untitled Form" ? `Untitled Form ${Date.now()}` : formTitle;
// //       const payload = {
// //         title: uniqueTitle,
// //         description: formdescription,
// //        isPublic: isPublic,
// //           theme: formTheme,
// //         fields: selectedFields.map((field, index) => ({
// //           label: field.label,
// //           type: field.type,
// //           required: field.required,
// //           order: index,
// //           masterFieldId: field.masterFieldId || null,
// //           options: field.options || null
// //         }))
// //       };
// //       const res = await axios.post(
// //         "https://formbuilder-saas-backend.onrender.com/api/dashboard/form",
// //         payload,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       toast.success("Form Published Successfully!");
// //       setShowFormBuilder(false);
// //       setSelectedFields([]);
// //       setForms(prev => [res.data.data, ...prev]);
// //       setIsPublic(true);//isPublic
// //     } catch (err) {
// //       toast.error("Failed to create form");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // 5. Fetch All Forms
// //   useEffect(() => {
// //     const fetchForms = async () => {
// //       setLoading(true);
// //       try {
// //         const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/forms", {
// //           headers: { Authorization: `Bearer ${token}` }
// //         });
// //         setForms(res.data.data);
// //       } catch (err) {
// //         toast.error("Failed to load forms");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchForms();
// //   }, [token]);

// //   // 6. Delete Form
// //   const confirmDelete = async () => {
// //     if (!isDeleting) return;
// //     const idToDelete = isDeleting.formId;
// //     try {
// //       await axios.delete(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${idToDelete}`, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       deleteFormLocally(idToDelete);
// //       toast.success("Form deleted successfully");
// //     } catch (err) {
// //       toast.error("Delete failed");
// //     } finally {
// //       setIsDeleting(null);
// //     }
// //   };

// //   // 7. Edit Handler (Load data into builder)
// //   const [editingFormId, setEditingFormId] = useState(null);
// //   const [formdescription, setformdescription] = useState("");

// //   const handleEditClick = async (formId) => {
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       const data = res.data.data;
// //       setFormTitle(data.title);
// //       setformdescription(data.description || "");
// //       setIsPublic(data.isPublic); //isPublic true or false

// //       setEditingFormId(formId);

// //       const mappedFields = data.formField.map(f => ({
// //         masterFieldId: f.masterFieldId,
// //         formFieldId: f.formFieldId,
// //         label: f.label,
// //         type: f.type,
// //         required: f.isRequired,
// //         options: f.options
// //       }));

// //       setSelectedFields(mappedFields);
// //       setShowFormBuilder(true);
// //     } catch (err) {
// //       toast.error("Failed to load form for editing");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // 8. Update Form API
// //   const updateForm = async () => {
// //     if (selectedFields.length === 0) return toast.error("Please select at least one field");
// //     setLoading(true);
// //     try {
// //       const payload = {
// //         title: formTitle,
// //         description: formdescription,
// //         isPublic: isPublic,
// //         theme: formTheme,
// //         fields: selectedFields.map((field, index) => ({
// //           formFieldId: field.formFieldId || null,
// //           label: field.label,
// //           type: field.type,
// //           required: field.required,
// //           order: index,
// //           masterFieldId: field.masterFieldId || null,
// //           options: field.options || null
// //         }))
// //       };
// //       const res = await axios.put(
// //         `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${editingFormId}`,
// //         payload,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       toast.success("Form Updated Successfully!");
// //       setForms(prev => prev.map(f => f.formId === editingFormId ? res.data.data : f));
// //       setShowFormBuilder(false);
// //       setEditingFormId(null);
// //       setFormTitle("Untitled Form");
// //       setformdescription("");
// //       setSelectedFields([]);
// //     } catch (err) {
// //       toast.error("Failed to update form");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };


// //   // VIEW FORM STATE
// //   const [viewform, setviewform] = useState(false);
// //   const [viewData, setViewData] = useState(null);

// //   const formview = async (formId) => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`, {
// //         headers: { Authorization: `Bearer ${token}` }
// //       });
// //       setViewData(response.data.data);
// //       setviewform(true);
// //     } catch (err) {
// //       toast.error("Failed to load form details");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };


// //   //design


// //   return (
// //     <div className="min-h-screen font-sans relative bg-gray-50">
// //       <UserNavbar />

// //        <WaveBackground position="top" />
         
// //       <div className="max-w-6xl relative z-10 mx-auto p-6">
// //         <header className="flex justify-between items-center mb-8">
// //           {!showFormBuilder ? (
// //             <button
// //               onClick={() => {
// //                 setShowFormBuilder(true);
// //                 setSelectedFields([]);
// //                 setEditingFormId(null);
// //                 setFormTitle("Untitled Form");
// //                 setformdescription("");
// //               }}
// //               className="bg-violet-600 text-white text-sm sm:text-lg px-4 sm:px-6 py-3 rounded-xl shadow-lg hover:bg-violet-700 transition font-semibold"
// //             >
// //               Create New Form
// //             </button>
// //           ) : (
// //             <motion.div
// //               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
// //               className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-0 overflow-hidden"
// //             >
// //               {/* Left Side: Master Fields */}
// //               <div className="w-full  md:w-2/5 bg-gray-50 py-6 px-4 border-r border-gray-100">
// //                 <h2 className="text-lg font-bold text-violet-700 mb-6 flex items-center gap-2">Available Fields</h2>
             
// //                 <div className="space-y-3 overflow-y-auto max-h-[80vh] pr-2 custom-scrollbar">
// //                   {masterFields.map((field) => (
// //                     <label
// //                       key={field.masterFieldId}
// //                       className={`flex items-center gap-3 py-2 px-4 rounded-2xl cursor-pointer transition-all border-2 ${selectedFields.some(f => f.masterFieldId === field.masterFieldId)
// //                         ? 'bg-violet-100 border-violet-500 shadow-sm'
// //                         : 'bg-white border-transparent hover:border-gray-200 shadow-sm'
// //                         }`}
// //                     >
// //                       <input
// //                         type="checkbox"
// //                         checked={selectedFields.some(f => f.masterFieldId === field.masterFieldId)}
// //                         onChange={() => toggleField(field)}
// //                         className="accent-violet-600 w-5 h-5 rounded-lg"
// //                       />
// //                       <span className="font-semibold text-gray-700">{field.label}</span>
// //                     </label>
// //                   ))}
// //                   <div>
          
// //                     <button
// //                  onClick={() => setIsAddingMaster(!isAddingMaster)}
// //                  className="bg-violet-600 text-white px-4 py-2 rounded-xl font-semibold mt-10 flex items-center gap-4 w-full justify-center"
// //                   >
// //                    <MdAddCard /> {isAddingMaster ? "Close" : "Add Input Fields"}
// //                   </button>


// //                   </div>

// //  {isAddingMaster && (
// //       <motion.div
// //         initial={{ height: 0, opacity: 0 }}
// //         animate={{ height: "auto", opacity: 1 }}
// //         className="mt-4 p-4 bg-white border border-violet-200 rounded-2xl shadow-inner space-y-4"
// //       >
// //         {/* Label Input */}
// //         <div className="space-y-1">
// //           <label className="text-[10px] font-bold text-violet-500 uppercase">New Label</label>
// //           <input
// //             className="w-full border bg-black/10 border-black/20 rounded-lg px-2 py-1 outline-none text-sm focus:border-violet-600"
// //             value={newField.label}
// //             onChange={(e) => setNewField({ ...newField, label: e.target.value })}
// //             placeholder="Enter label name..."
// //           />
// //         </div>

// //         {/* Type Selection */}
// //         <div className="space-y-1">
// //           <label className="text-[10px] font-bold text-violet-500 uppercase">Type</label>
// //           <select
// //             className="w-full text-sm bg-transparent outline-none cursor-pointer"
// //             value={newField.type}
// //             onChange={(e) => {
// //               // Reset options to one empty string if switching to a selection type
// //               const isSelectionType = ["DROPDOWN", "RADIO", "CHECKBOX"].includes(e.target.value);
// //               setNewField({ 
// //                 ...newField, 
// //                 type: e.target.value,
// //                 options: isSelectionType ? [""] : [] 
// //               });
// //             }}
// //           >
// //             {["TEXT", "NUMBER", "EMAIL", "DATE", "TEXTAREA", "CHECKBOX", "RADIO", "DROPDOWN"].map(t => (
// //               <option key={t} value={t}>{t}</option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Dynamic Options Section - Shows only for selection types */}
// //         {["DROPDOWN", "RADIO", "CHECKBOX"].includes(newField.type) && (
// //           <div className="space-y-2 border border-black/20 rounded-lg px-2 py-1 pt-2">
// //             <label className="text-[10px] font-bold text-violet-500 uppercase">Field Options</label>
// //             {newField.options.map((opt, i) => (
// //               <div key={i} className="flex gap-2">
// //                 <input
// //                   className="flex-1 border bg-black/10 border-black/20 rounded-lg px-2 py-1 text-sm outline-none focus:border-violet-600"
// //                   placeholder={`Option ${i + 1}`}
// //                   value={opt}
// //                   onChange={(e) => {
// //                     const newOpts = [...newField.options];
// //                     newOpts[i] = e.target.value;
// //                     setNewField({ ...newField, options: newOpts });
// //                   }}
// //                 />
// //                 {newField.options.length > 1 && (
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       const newOpts = newField.options.filter((_, idx) => idx !== i);
// //                       setNewField({ ...newField, options: newOpts });
// //                     }}
// //                     className="text-red-400 hover:text-red-600"
// //                   >✕</button>
// //                 )}
// //               </div>
// //             ))}
// //             <button
// //               type="button"
// //               onClick={() => setNewField({ ...newField, options: [...newField.options, ""] })}
// //               className="text-[10px] text-violet-600 font-bold hover:underline mt-1"
// //             >
// //               + ADD OPTION
// //             </button>
// //           </div>
// //         )}

// //         {/* Save Button */}
// //         <button
// //           onClick={handleInlineCreate}
// //           className="w-full bg-violet-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-violet-800 transition-all"
// //         >
// //           Save Input Field
// //         </button>

     
// //       </motion.div>
// //     )}
  
// //            {/* DESIGN COMPONENT INTEGRATION */}
// //            <div className='mt-4'>
// //                 <Design 
// //                 editingFormId={editingFormId} 
// //                 token={token} 
// //                 formTheme={formTheme} 
// //                 setFormTheme={setFormTheme} 
// //               />
// //               </div>

// //                 </div>
// //               </div>

// //               {/* Right Side: Preview & Edit */}
// //             <div 
// //               className="w-full md:w-3/5 p-5 flex flex-col transition-all duration-500" 
// //               style={{ 
// //                backgroundColor: formTheme.bgColor || "#ffffff", 
// //                fontFamily: `${formTheme.labelFont || 'Inter'}, sans-serif`,
             
// //               }}
// //             >
// //               <div className="w-full  flex flex-col">
// //                 <div className="mb-8 space-y-4">
// //                   <div className='flex items-center gap-2 border-b-2 border-transparent focus-within:border-violet-200'>
                    
// //                     <input
// //                       value={formTitle || ""}
// //                       onChange={(e) => setFormTitle(e.target.value)}
// //                       placeholder="Enter Form Title..."
// //                       style={{ color: formTheme.labelColor || "#111827" }}
// //                       className="text-xl font-bold text-gray-800 w-full focus:outline-none pb-2"
// //                     />
// //                     <EditIcon size={15} className="text-gray-400" />
// //                   </div>
// //                   <div className='flex items-center gap-2 border-b-2 border-transparent focus-within:border-violet-200'>
// //                     <input
// //                       value={formdescription}
// //                       onChange={(e) => setformdescription(e.target.value)}
// //                       placeholder="Enter Form description"
// //                       style={{ color: `${formTheme.labelColor}99` || "#4b5563" }}
// //                       className="text-sm text-gray-800 w-full focus:outline-none pb-2"
// //                     />
// //                     <EditIcon size={15} className="text-gray-400" />
// //                   </div>
// //                 </div>
// //                     {/*Radio for public or private */}
// //                  <div className="flex gap-6 items-center mb-6">
// //   <label className="flex items-center gap-2 cursor-pointer">
// //     <input
// //       type="radio"
// //       name="visibility"
// //       checked={isPublic === true}
// //       onChange={() => setIsPublic(true)}
// //     />
// //     <span className="font-semibold text-gray-700" style={{ color: formTheme.labelColor }}>Public</span>
// //   </label>

// //   <label className="flex items-center gap-2 cursor-pointer">
// //     <input
// //       type="radio"
// //       name="visibility"
// //       checked={isPublic === false}
// //       onChange={() => setIsPublic(false)}
// //     />
// //     <span className="font-semibold text-gray-700" style={{ color: formTheme.labelColor }}>Private</span>
// //   </label>
// // </div>
// //                 <div className="flex flex-col space-y-6 flex-1 overflow-y-auto max-h-[50vh] pr-2">
// //                   {selectedFields.length === 0 ? (
// //                     <div className="h-64 border-2 border-dashed border-gray-200 text-center rounded-3xl flex flex-col items-center justify-center text-gray-400">
// //                       <p>Select fields from the left to start building</p>
// //                     </div>
// //                   ) : (
// //                     selectedFields.map((field, index) => (
// //                       <motion.div
// //                         key={field.masterFieldId || index} layout
// //                         initial={{ opacity: 0, x: 20 }} 
// //                         animate={{ opacity: 1, x: 0 }}
// //                         className="bg-gray-50 p-5 rounded-2xl border
// //                          border-gray-100"
// //                          style={{ 
// //                          backgroundColor: "#ffffff", 
// //                          borderRadius: formTheme.borderRadius || "16px" 
// //                       }}
// //                       >
// //                         <div className="flex flex-col sm:flex-row gap-4 mb-4">
// //                           {/* Label Update */}
// //                           <div className="flex-1">
// //                             <label 
// //                             className="text-xs font-bold text-gray-400 uppercase ml-2"
// //                             style={{ color: formTheme.labelColor || "#9ca3af" }}
// //                             >Field Label</label>
// //                             <input
// //                               type="text"
// //                               value={field.label}
// //                               onChange={(e) => updateFieldProperty(index, 'label', e.target.value)}
// //                               style={{ 
// //                     backgroundColor: formTheme.inputBgColor || "#f9fafb",
// //                     borderRadius: `calc(${formTheme.borderRadius} / 2)` || "8px",
// //                     color: formTheme.labelColor 
// //                   }}
// //                               className="w-full bg-white border border-gray-200 p-2 rounded-lg text-sm font-semibold focus:border-violet-500 outline-none"
// //                             />
// //                           </div>

// //                           {/* Type Update - NEW FUNCTIONALITY */}
// //                           <div className="w-full sm:w-1/3">
// //                             <label className="text-xs font-bold text-gray-400 uppercase ml-2">Field Type</label>
// //                             <select
// //                               value={field.type}
// //                               onChange={(e) => updateFieldProperty(index, 'type', e.target.value)}
// //                               className="w-full bg-white border border-gray-200 p-2 rounded-lg text-sm font-semibold focus:border-violet-500 outline-none"
// //                             >
// //                               <option value="TEXT">Short Text</option>
// //                               <option value="TEXTAREA">Long Text</option>
// //                               <option value="NUMBER">Number</option>
// //                               <option value="EMAIL">Email</option>
// //                               <option value="DATE">Date</option>
// //                               <option value="DROPDOWN">Dropdown</option>
// //                               <option value="RADIO">Radio</option>
// //                               <option value="CHECKBOX">Checkbox</option>
// //                             </select>
// //                           </div>
// //                         </div>

// //                         <div className="flex justify-between items-center">
// //                           <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
// //                             <span className="text-xs font-bold text-gray-500 uppercase">Required</span>
// //                             <input
// //                               type="checkbox"
// //                               checked={field.required}
// //                               onChange={() => updateFieldProperty(index, 'required', !field.required)}
// //                               className="accent-violet-600"
// //                             />
// //                           </div>
// //                           <span className="text-xs text-gray-400 italic">Preview: {field.type}</span>
// //                         </div>

// //                         {/* Options Rendering */}
// //                         {["DROPDOWN", "RADIO", "CHECKBOX"].includes(field.type) && field.options && (
// //                           <div className="space-y-2 mt-4 p-3 bg-white rounded-xl border border-gray-100">
// //                             <p className="text-xs font-bold text-violet-600 uppercase">Options Management:</p>
// //                             {field.options.map((opt, optIndex) => (
// //                               <div key={optIndex} className="flex items-center gap-2">
// //                                 <input
// //                                   type="text"
// //                                   value={opt}
// //                                   onChange={(e) => {
// //                                     const updatedFields = [...selectedFields];
// //                                     updatedFields[index].options[optIndex] = e.target.value;
// //                                     setSelectedFields(updatedFields);
// //                                   }}
// //                                   className="flex-1 text-sm bg-violet-50 border border-violet-100 rounded px-2 py-1 outline-none focus:border-violet-400"
// //                                 />
// //                                 <button
// //                                   onClick={() => {
// //                                     const updatedFields = [...selectedFields];
// //                                     updatedFields[index].options = updatedFields[index].options.filter((_, i) => i !== optIndex);
// //                                     setSelectedFields(updatedFields);
// //                                   }}
// //                                   className="text-red-400 hover:text-red-600"
// //                                 >
// //                                   <X size={14} />
// //                                 </button>
// //                               </div>
// //                             ))}
// //                             <button
// //                               onClick={() => {
// //                                 const updatedFields = [...selectedFields];
// //                                 updatedFields[index].options = [...(updatedFields[index].options || []), "New Option"];
// //                                 setSelectedFields(updatedFields);
// //                               }}
// //                               className="text-xs font-bold text-violet-600 hover:underline mt-1"
// //                             >
// //                               + Add Option
// //                             </button>
// //                           </div>
// //                         )}
// //                       </motion.div>
// //                     ))
// //                   )}
// //                 </div>

// //                 <div className="mt-auto pt-4 flex justify-center gap-2 border-gray-100">
// //                   <button
// //                     onClick={editingFormId ? updateForm : createForm}
// //                     disabled={loading}
// //                     style={{ 
// //             backgroundColor: formTheme.buttonColor || "#7c3aed",
// //             borderRadius: formTheme.borderRadius || "16px"
// //         }}
// //                     className=" w-full bg-violet-600 text-sm text-white py-2 rounded-xl font-semibold hover:bg-violet-700 px-2 shadow-lg transition-all  disabled:opacity-50"
// //                   >
// //                     {loading ? "Processing..." : editingFormId ? "Update Form" : "Publish Form"}
// //                   </button>
// //                   <button
// //                     onClick={() => {
// //                       setShowFormBuilder(false);
// //                       setSelectedFields([]);
// //                       setEditingFormId(null);
// //                     }}
// //                     className="px-2 w-full text-sm bg-gray-100 text-gray-600 py-2 rounded-xl font-bold hover:bg-gray-200 transition"
// //                   >
// //                     Cancel
// //                   </button>
// //                 </div>
// //               </div>
// //                 </div>
// //             </motion.div>
          
// //           )}
// //         </header>

// //         {/* List of Forms Grid */}
// //         {loading && !showFormBuilder ? (
// //            <div className="flex flex-col items-center justify-center h-64 gap-3">
// //     <FaSpinner className="animate-spin text-violet-600" size={32} />
   
// //   </div>
// //         ) : (
// //           <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             <AnimatePresence>
// //               {forms.map((form) => (
// //                 <motion.div
// //                   key={form.formId}
// //                   layout
// //                   initial={{ opacity: 0, scale: 0.9 }}
// //                   animate={{ opacity: 1, scale: 1 }}
// //                   exit={{ opacity: 0, scale: 0.8 }}
// //                   className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
// //                 >
// //                   <div>
// //                     <div className="flex justify-between items-start mb-4">
// //                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${form.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
// //                         {form.isPublic ? "● Public" : "○ Private"}
// //                       </span>
// //                       <div className="flex gap-2">
// //                         <button onClick={() => handleEditClick(form.formId)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
// //                           <EditIcon size={16} />
// //                         </button>
// //                         <button onClick={() => setIsDeleting(form)} className="p-2 hover:bg-red-50 rounded-lg text-red-500">
// //                           <Trash2 size={16} />
// //                         </button>
// //                       </div>
// //                     </div>
// //                     <h3 className="text-xl font-semibold text-gray-800 mb-2">{form.title}</h3>
// //                     <p className="text-gray-500 text-sm line-clamp-2 mb-4">{form.description}</p>
// //                   </div>

// //                   <div className="mt-4 pt-4 border-t border-gray-50 flex gap-2">
// //                     <button onClick={() => navigate(`/responses/${form.formId}`)} className="flex-1 bg-violet-50 text-violet-700 font-semibold py-2 rounded-xl hover:bg-violet-100 transition">
// //                       Responses
// //                     </button>
// //                     <button onClick={() => formview(form.formId)} className="flex-1 bg-black text-white font-semibold py-2 rounded-xl hover:bg-gray-800 transition">
// //                       View
// //                     </button>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </AnimatePresence>
// //           </motion.div>
// //         )}
// //       </div>

// //       {/* Delete and View Modals follow same structure as original... */}
// //       {/* (Kept original logic for Modals below to ensure functionality) */}
// //       <AnimatePresence>
// //         {isDeleting && (
// //           <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
// //             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleting(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
// //             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
// //               <h3 className="text-xl font-bold mb-2">Delete Form?</h3>
// //               <p className="text-gray-500 mb-6">Are you sure you want to delete <span className="font-bold text-gray-900">"{isDeleting.title}"</span>?</p>
// //               <div className="flex gap-3">
// //                 <button onClick={() => setIsDeleting(null)} className="flex-1 px-4 py-2 bg-gray-100 rounded-xl font-semibold">Cancel</button>
// //                 <button onClick={confirmDelete} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600">Delete</button>
// //               </div>
// //             </motion.div>
// //           </div>
// //         )}
// //       </AnimatePresence>

// // <AnimatePresence>
// //   {viewform && viewData && (
// //     <div className="fixed inset-0 z-250 flex items-center justify-center p-4 md:p-10">
// //       {/* Backdrop */}
// //       <motion.div 
// //         initial={{ opacity: 0 }} 
// //         animate={{ opacity: 1 }} 
// //         exit={{ opacity: 0 }} 
// //         onClick={() => setviewform(false)} 
// //         className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" 
// //       />

// //       <motion.div 
// //         initial={{ scale: 0.9, opacity: 0, y: 20 }} 
// //         animate={{ scale: 1, opacity: 1, y: 0 }} 
// //         exit={{ scale: 0.9, opacity: 0, y: 20 }} 
// //         className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col"
// //         style={{ fontFamily: `${viewData.theme?.labelFont || 'Inter'}, sans-serif` }}
// //       >
// //         {/* --- THEME STRIP --- */}
// //         <div 
// //           className="h-2 w-full" 
// //           style={{ backgroundColor: viewData.theme?.buttonColor || "#6C3BFF" }} 
// //         />

// //         {/* Header */}
// //         <div className="p-8 flex justify-between items-start border-b border-gray-50">
// //           <div>
// //             <div className="flex items-center gap-2 mb-1">
// //                <h2 className="text-2xl text-black font-bold" style={{ color: viewData.theme?.labelColor }}>
// //                 {viewData.title}
// //               </h2>
// //               <span className="px-2 py-1 bg-gray-100 text-[10px] font-black uppercase rounded-md text-gray-400">Preview Mode</span>
// //             </div>
// //             <p className="text-gray-500">{viewData.description || "No description provided."}</p>
// //           </div>
// //           <button 
// //             onClick={() => setviewform(false)} 
// //             className="bg-gray-100 hover:bg-red-50 hover:text-red-500 p-2 rounded-full transition-all"
// //           >
// //             <X size={20} />
// //           </button>
// //         </div>

// //         {/* Form Preview Area */}
// //         <div 
// //           className="flex-1 overflow-y-auto p-8 space-y-6" 
// //           style={{ backgroundColor: viewData.theme?.bgColor || "#f9fafb" }}
// //         >
// //           {viewData.formField?.map((field) => (
// //             <div 
// //               key={field.formFieldId} 
// //               className="bg-white p-6 shadow-sm border border-gray-100 transition-all"
// //               style={{ borderRadius: viewData.theme?.borderRadius || "12px" }}
// //             >
// //               <label 
// //                 className="block text-sm font-bold mb-3"
// //                 style={{ color: viewData.theme?.labelColor || "#374151" }}
// //               >
// //                 {field.label} {field.required && <span className="text-red-500">*</span>}
// //               </label>
              
// //               <div 
// //                 className="w-full px-4 py-3 border border-gray-200 text-gray-400 text-sm flex items-center justify-between"
// //                 style={{ 
// //                     backgroundColor: viewData.theme?.inputBgColor || "#ffffff",
// //                     borderRadius: `calc(${viewData.theme?.borderRadius || '12px'} / 2)` 
// //                 }}
// //               >
// //                 Preview for {field.type}
// //                 <div className="h-2 w-2 rounded-full bg-gray-200" />
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Action Footer */}
// //         <div className="p-6 bg-white border-t border-gray-100 flex flex-wrap gap-3">
// //           {/* Close Button */}
// //           <button 
// //             onClick={() => setviewform(false)} 
// //             className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
// //           >
// //             Close
// //           </button>

// //           {/* Copy Link Button */}
// //           <button
// //             onClick={() => {
// //               if (!viewData.isPublic) {
// //                 toast.error("Form is private. Make it public to copy link.");
// //                 return;
// //               }
// //               const baseUrl = import.meta.env.VITE_URL.replace(/\/$/, "");
// //               const link = `${baseUrl}/public/form/${viewData.slug}`;
// //               navigator.clipboard.writeText(link);
// //               toast.success("Link copied!");
// //             }}
// //             className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
// //               viewData.isPublic ? "bg-black text-white hover:bg-gray-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"
// //             }`}
// //           >
// //             <Send size={18} /> Copy Link
// //           </button>

// //           {/* Embed Button */}
// //           <button
// //             onClick={async () => { 
// //               if (!viewData.isPublic) {
// //                 toast.error("Form is private. Make it public first.");
// //                 return;
// //               }
// //               const baseUrl = import.meta.env.VITE_URL?.replace(/\/$/, "") || window.location.origin;
// //               const formLink = `${baseUrl}/public/form/${viewData.slug}`;
// //               const embedCode = `<iframe src="${formLink}" title="${viewData.title}" width="100%" height="700" style="border:none; border-radius:12px;" allow="clipboard-write"></iframe>`;
              
// //               await navigator.clipboard.writeText(embedCode);
// //               toast.success("Embed code copied!");
// //             }}
// //             style={{ 
// //               backgroundColor: viewData.isPublic ? (viewData.theme?.buttonColor || "#7C3AED") : "#E5E7EB",
// //               color: viewData.isPublic ? "white" : "#9CA3AF"
// //             }}
// //             className="flex-1 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-md active:scale-95"
// //           >
// //             Copy Embed Code
// //           </button>
// //         </div>
// //       </motion.div>
// //     </div>
// //   )}
// // </AnimatePresence>

// //       {/* ===== Bottom Wave Section ===== */}
// //               <div className="relative w-full h-56 overflow-hidden">
// //                 <WaveBackground position="bottom" height="h-56"
// //          />
// //               </div>
             
       
// //       <Footer/>
     
// //     </div>
// //   );
// // };

// // export default Form;



// // "use client"

// // import { useEffect, useState } from "react"
// // import { motion, AnimatePresence } from "framer-motion"
// // import axios from "axios"
// // import toast from "react-hot-toast"
// // import UserNavbar from "../user/UserNavbar"
// // import { useFormContext } from "./FormContext"
// // import {
// //   EditIcon,
// //   Trash2,
// //   X,
// //   Send,
// //   Plus,
// //   Sparkles,
// //   Layers,
// //   Eye,
// //   ChevronRight,
// //   GripVertical,
// //   Check,
// //   Globe,
// //   Lock,
// // } from "lucide-react"
// // import { useNavigate } from "react-router-dom"
// // import Footer from "../landingPage/Footer"
// // import Design from "./Design"
// // import WaveBackground from "../dashboard/WaveBackground"
// // import { FaSpinner } from "react-icons/fa"

// // // Enhanced animation variants
// // const containerVariants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: { staggerChildren: 0.1 },
// //   },
// // }

// // const itemVariants = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: { opacity: 1, y: 0 },
// // }

// // const cardHoverVariants = {
// //   rest: { scale: 1, y: 0 },
// //   hover: { scale: 1.02, y: -5, transition: { duration: 0.3, ease: "easeOut" } },
// // }

// // const pulseAnimation = {
// //   scale: [1, 1.05, 1],
// //   transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
// // }

// // const Form = () => {
// //   // masterfield
// //   const [masterFields, setMasterFields] = useState([])
// //   const [selectedFields, setSelectedFields] = useState([])
// //   const [showFormBuilder, setShowFormBuilder] = useState(false)
// //   const [formTitle, setFormTitle] = useState("Untitled Form")
// //   const [isAddingMaster, setIsAddingMaster] = useState(false)
// //   const [newField, setNewField] = useState({ label: "", type: "TEXT", options: [""] })

// //   // formfield
// //   const { forms, setForms, updateFormLocally, deleteFormLocally } = useFormContext()
// //   const [loading, setLoading] = useState(false)
// //   const [isDeleting, setIsDeleting] = useState(null)
// //   const [isPublic, setIsPublic] = useState(true)

// //   // --- THEME STATE ---
// //   const [formTheme, setFormTheme] = useState({
// //     bgColor: "#ffffff",
// //     buttonColor: "#7c3aed",
// //     inputBgColor: "#f3f4f6",
// //     labelFont: "Inter",
// //     borderRadius: "8px",
// //   })

// //   const token = localStorage.getItem("token")
// //   const navigate = useNavigate()

// //   const URL = import.meta.env.VITE_URL
// //   const navi = useNavigate()

// //   // 1. Fetch Master Fields
// //   useEffect(() => {
// //     const getMasterFields = async () => {
// //       try {
// //         const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         })
// //         setMasterFields(res.data.data)
// //       } catch (err) {
// //         toast.error("Error loading master fields")
// //       }
// //     }
// //     getMasterFields()
// //   }, [token])

// //   const handleInlineCreate = async () => {
// //     if (!newField.label) return toast.error("Label name required")

// //     try {
// //       const res = await axios.post(
// //         "https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields",
// //         newField,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       )

// //       toast.success("Field Created!")
// //       setMasterFields((prev) => [...prev, res.data.data])
// //       setNewField({ label: "", type: "TEXT", options: [""] })
// //       setIsAddingMaster(false)
// //     } catch (err) {
// //       toast.error("Failed to add master field")
// //     }
// //   }

// //   // 2. Toggle field selection
// //   const toggleField = (toggledField) => {
// //     setSelectedFields((prev) => {
// //       const exists = prev.find((f) => f.masterFieldId === toggledField.masterFieldId)
// //       if (exists) {
// //         return prev.filter((f) => f.masterFieldId !== toggledField.masterFieldId)
// //       }
// //       return [...prev, { ...toggledField, required: false }]
// //     })
// //   }

// //   // 3. Update Logic for any field property (Label, Type, etc.)
// //   const updateFieldProperty = (index, key, value) => {
// //     const updatedFields = [...selectedFields]
// //     updatedFields[index] = { ...updatedFields[index], [key]: value }
// //     setSelectedFields(updatedFields)
// //   }

// //   // 4. Create Form API
// //   const createForm = async () => {
// //     if (selectedFields.length === 0) return toast.error("Please select at least one field")
// //     setLoading(true)
// //     try {
// //       const uniqueTitle = formTitle === "Untitled Form" ? `Untitled Form ${Date.now()}` : formTitle
// //       const payload = {
// //         title: uniqueTitle,
// //         description: formdescription,
// //         isPublic: isPublic,
// //         theme: formTheme,
// //         fields: selectedFields.map((field, index) => ({
// //           label: field.label,
// //           type: field.type,
// //           required: field.required,
// //           order: index,
// //           masterFieldId: field.masterFieldId || null,
// //           options: field.options || null,
// //         })),
// //       }
// //       const res = await axios.post("https://formbuilder-saas-backend.onrender.com/api/dashboard/form", payload, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       toast.success("Form Published Successfully!")
// //       setShowFormBuilder(false)
// //       setSelectedFields([])
// //       setForms((prev) => [res.data.data, ...prev])
// //       setIsPublic(true)
// //     } catch (err) {
// //       toast.error("Failed to create form")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // 5. Fetch All Forms
// //   useEffect(() => {
// //     const fetchForms = async () => {
// //       setLoading(true)
// //       try {
// //         const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/forms", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         })
// //         setForms(res.data.data)
// //       } catch (err) {
// //         toast.error("Failed to load forms")
// //       } finally {
// //         setLoading(false)
// //       }
// //     }
// //     fetchForms()
// //   }, [token])

// //   // 6. Delete Form
// //   const confirmDelete = async () => {
// //     if (!isDeleting) return
// //     const idToDelete = isDeleting.formId
// //     try {
// //       await axios.delete(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${idToDelete}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       deleteFormLocally(idToDelete)
// //       toast.success("Form deleted successfully")
// //     } catch (err) {
// //       toast.error("Delete failed")
// //     } finally {
// //       setIsDeleting(null)
// //     }
// //   }

// //   // 7. Edit Handler (Load data into builder)
// //   const [editingFormId, setEditingFormId] = useState(null)
// //   const [formdescription, setformdescription] = useState("")

// //   const handleEditClick = async (formId) => {
// //     setLoading(true)
// //     try {
// //       const res = await axios.get(
// //         `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       )
// //       const data = res.data.data
// //       setFormTitle(data.title)
// //       setformdescription(data.description || "")
// //       setIsPublic(data.isPublic)

// //       setEditingFormId(formId)

// //       const mappedFields = data.formField.map((f) => ({
// //         masterFieldId: f.masterFieldId,
// //         formFieldId: f.formFieldId,
// //         label: f.label,
// //         type: f.type,
// //         required: f.isRequired,
// //         options: f.options,
// //       }))

// //       setSelectedFields(mappedFields)
// //       setShowFormBuilder(true)
// //     } catch (err) {
// //       toast.error("Failed to load form for editing")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // 8. Update Form API
// //   const updateForm = async () => {
// //     if (selectedFields.length === 0) return toast.error("Please select at least one field")
// //     setLoading(true)
// //     try {
// //       const payload = {
// //         title: formTitle,
// //         description: formdescription,
// //         isPublic: isPublic,
// //         theme: formTheme,
// //         fields: selectedFields.map((field, index) => ({
// //           formFieldId: field.formFieldId || null,
// //           label: field.label,
// //           type: field.type,
// //           required: field.required,
// //           order: index,
// //           masterFieldId: field.masterFieldId || null,
// //           options: field.options || null,
// //         })),
// //       }
// //       const res = await axios.put(
// //         `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${editingFormId}`,
// //         payload,
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       )
// //       toast.success("Form Updated Successfully!")
// //       setForms((prev) => prev.map((f) => (f.formId === editingFormId ? res.data.data : f)))
// //       setShowFormBuilder(false)
// //       setEditingFormId(null)
// //       setFormTitle("Untitled Form")
// //       setformdescription("")
// //       setSelectedFields([])
// //     } catch (err) {
// //       toast.error("Failed to update form")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // VIEW FORM STATE
// //   const [viewform, setviewform] = useState(false)
// //   const [viewData, setViewData] = useState(null)

// //   const formview = async (formId) => {
// //     setLoading(true)
// //     try {
// //       const response = await axios.get(
// //         `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         },
// //       )
// //       setViewData(response.data.data)
// //       setviewform(true)
// //     } catch (err) {
// //       toast.error("Failed to load form details")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // Skeleton Loader Component
// //   const SkeletonCard = () => (
// //     <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 animate-pulse">
// //       <div className="flex justify-between items-start mb-4">
// //         <div className="h-6 w-20 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full" />
// //         <div className="flex gap-2">
// //           <div className="h-9 w-9 bg-gray-100 rounded-xl" />
// //           <div className="h-9 w-9 bg-gray-100 rounded-xl" />
// //         </div>
// //       </div>
// //       <div className="h-7 w-3/4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg mb-3" />
// //       <div className="h-4 w-full bg-gray-100 rounded mb-2" />
// //       <div className="h-4 w-2/3 bg-gray-100 rounded mb-6" />
// //       <div className="pt-4 border-t border-gray-50 flex gap-3">
// //         <div className="flex-1 h-11 bg-gray-100 rounded-2xl" />
// //         <div className="flex-1 h-11 bg-gray-100 rounded-2xl" />
// //       </div>
// //     </div>
// //   )

// //   return (
// //     <div className="min-h-screen font-sans relative bg-gradient-to-br from-slate-50 via-white to-violet-50/30 overflow-x-hidden">
// //       <UserNavbar />

// //       {/* Animated Background Elements */}
// //       <div className="fixed inset-0 pointer-events-none overflow-hidden">
// //         <motion.div
// //           animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
// //           transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// //           className="absolute top-20 left-10 w-72 h-72 bg-violet-200/20 rounded-full blur-3xl"
// //         />
// //         <motion.div
// //           animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
// //           transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// //           className="absolute bottom-40 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"
// //         />
// //         <motion.div
// //           animate={{ scale: [1, 1.2, 1] }}
// //           transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
// //           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/10 rounded-full blur-3xl"
// //         />
// //       </div>

// //       <WaveBackground position="top" />

// //       <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <header className="mb-10">
// //           {!showFormBuilder ? (
// //             <motion.div
// //               initial={{ opacity: 0, y: -20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
// //             >
// //               <div>
// //                 <motion.h1
// //                   initial={{ opacity: 0, x: -20 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-violet-800 to-violet-600 bg-clip-text text-transparent"
// //                 >
// //                   Your Forms
// //                 </motion.h1>
// //                 <motion.p
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   transition={{ delay: 0.2 }}
// //                   className="text-gray-500 mt-2"
// //                 >
// //                   Create, manage and share your forms
// //                 </motion.p>
// //               </div>
// //               <motion.button
// //                 onClick={() => {
// //                   setShowFormBuilder(true)
// //                   setSelectedFields([])
// //                   setEditingFormId(null)
// //                   setFormTitle("Untitled Form")
// //                   setformdescription("")
// //                 }}
// //                 whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -15px rgba(124, 58, 237, 0.4)" }}
// //                 whileTap={{ scale: 0.98 }}
// //                 className="group relative bg-gradient-to-r from-violet-600 via-violet-600 to-indigo-600 text-white text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-lg shadow-violet-500/25 font-semibold flex items-center gap-3 overflow-hidden"
// //               >
// //                 <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //                 <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
// //                 <span className="relative z-10">Create New Form</span>
// //                 <Sparkles className="w-4 h-4 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
// //               </motion.button>
// //             </motion.div>
// //           ) : (
// //             <motion.div
// //               initial={{ opacity: 0, scale: 0.95, y: 20 }}
// //               animate={{ opacity: 1, scale: 1, y: 0 }}
// //               transition={{ duration: 0.4, ease: "easeOut" }}
// //               className="w-full bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-2xl shadow-violet-500/10 flex flex-col lg:flex-row gap-0 overflow-hidden"
// //             >
// //               {/* Left Side: Master Fields */}
// //               <div className="w-full lg:w-[380px] bg-gradient-to-b from-gray-50/80 to-white/50 backdrop-blur-sm py-6 px-5 border-r border-gray-100/80">
// //                 <div className="flex items-center justify-between mb-6">
// //                   <h2 className="text-lg font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
// //                     <Layers className="w-5 h-5 text-violet-600" />
// //                     Available Fields
// //                   </h2>
// //                   <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
// //                     {masterFields.length} fields
// //                   </span>
// //                 </div>

// //                 <motion.div
// //                   variants={containerVariants}
// //                   initial="hidden"
// //                   animate="visible"
// //                   className="space-y-2.5 overflow-y-auto max-h-[40vh] lg:max-h-[50vh] pr-2 custom-scrollbar"
// //                 >
// //                   {masterFields.map((field, index) => (
// //                     <motion.label
// //                       key={field.masterFieldId}
// //                       variants={itemVariants}
// //                       whileHover={{ x: 4 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       className={`group flex items-center gap-3 py-3 px-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
// //                         selectedFields.some((f) => f.masterFieldId === field.masterFieldId)
// //                           ? "bg-gradient-to-r from-violet-50 to-indigo-50 border-violet-300 shadow-md shadow-violet-100"
// //                           : "bg-white/70 border-transparent hover:border-gray-200 hover:bg-white shadow-sm hover:shadow-md"
// //                       }`}
// //                     >
// //                       <div
// //                         className={`relative w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
// //                           selectedFields.some((f) => f.masterFieldId === field.masterFieldId)
// //                             ? "bg-violet-600 border-violet-600"
// //                             : "border-gray-300 group-hover:border-violet-400"
// //                         }`}
// //                       >
// //                         <input
// //                           type="checkbox"
// //                           checked={selectedFields.some((f) => f.masterFieldId === field.masterFieldId)}
// //                           onChange={() => toggleField(field)}
// //                           className="sr-only"
// //                         />
// //                         <Check
// //                           className={`w-3.5 h-3.5 text-white transition-all duration-200 ${
// //                             selectedFields.some((f) => f.masterFieldId === field.masterFieldId)
// //                               ? "scale-100 opacity-100"
// //                               : "scale-0 opacity-0"
// //                           }`}
// //                         />
// //                       </div>
// //                       <div className="flex-1 min-w-0">
// //                         <span className="font-semibold text-gray-700 block truncate">{field.label}</span>
// //                         <span className="text-xs text-gray-400">{field.type}</span>
// //                       </div>
// //                       <GripVertical className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
// //                     </motion.label>
// //                   ))}
// //                 </motion.div>

// //                 <div className="mt-6 space-y-4">
// //                   <motion.button
// //                     onClick={() => setIsAddingMaster(!isAddingMaster)}
// //                     whileHover={{ scale: 1.01 }}
// //                     whileTap={{ scale: 0.99 }}
// //                     className={`w-full py-3 px-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${
// //                       isAddingMaster
// //                         ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
// //                         : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30"
// //                     }`}
// //                   >
// //                     <motion.div animate={{ rotate: isAddingMaster ? 45 : 0 }} transition={{ duration: 0.2 }}>
// //                       <Plus className="w-5 h-5" />
// //                     </motion.div>
// //                     {isAddingMaster ? "Close" : "Add Input Field"}
// //                   </motion.button>

// //                   <AnimatePresence>
// //                     {isAddingMaster && (
// //                       <motion.div
// //                         initial={{ height: 0, opacity: 0 }}
// //                         animate={{ height: "auto", opacity: 1 }}
// //                         exit={{ height: 0, opacity: 0 }}
// //                         transition={{ duration: 0.3 }}
// //                         className="overflow-hidden"
// //                       >
// //                         <div className="p-5 bg-gradient-to-br from-white to-violet-50/50 border border-violet-100 rounded-2xl shadow-inner space-y-4">
// //                           {/* Label Input */}
// //                           <div className="space-y-2">
// //                             <label className="text-[11px] font-bold text-violet-600 uppercase tracking-wider">
// //                               New Label
// //                             </label>
// //                             <input
// //                               className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-2.5 outline-none text-sm font-medium focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all duration-200"
// //                               value={newField.label}
// //                               onChange={(e) => setNewField({ ...newField, label: e.target.value })}
// //                               placeholder="Enter label name..."
// //                             />
// //                           </div>

// //                           {/* Type Selection */}
// //                           <div className="space-y-2">
// //                             <label className="text-[11px] font-bold text-violet-600 uppercase tracking-wider">
// //                               Type
// //                             </label>
// //                             <select
// //                               className="w-full text-sm bg-white border-2 border-gray-100 rounded-xl px-4 py-2.5 outline-none cursor-pointer font-medium focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all duration-200 appearance-none"
// //                               style={{
// //                                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
// //                                 backgroundRepeat: "no-repeat",
// //                                 backgroundPosition: "right 12px center",
// //                                 backgroundSize: "20px",
// //                               }}
// //                               value={newField.type}
// //                               onChange={(e) => {
// //                                 const isSelectionType = ["DROPDOWN", "RADIO", "CHECKBOX"].includes(e.target.value)
// //                                 setNewField({
// //                                   ...newField,
// //                                   type: e.target.value,
// //                                   options: isSelectionType ? [""] : [],
// //                                 })
// //                               }}
// //                             >
// //                               {["TEXT", "NUMBER", "EMAIL", "DATE", "TEXTAREA", "CHECKBOX", "RADIO", "DROPDOWN"].map(
// //                                 (t) => (
// //                                   <option key={t} value={t}>
// //                                     {t}
// //                                   </option>
// //                                 ),
// //                               )}
// //                             </select>
// //                           </div>

// //                           {/* Dynamic Options Section */}
// //                           <AnimatePresence>
// //                             {["DROPDOWN", "RADIO", "CHECKBOX"].includes(newField.type) && (
// //                               <motion.div
// //                                 initial={{ opacity: 0, height: 0 }}
// //                                 animate={{ opacity: 1, height: "auto" }}
// //                                 exit={{ opacity: 0, height: 0 }}
// //                                 className="space-y-3 border-2 border-violet-100 rounded-xl p-4 bg-white/50"
// //                               >
// //                                 <label className="text-[11px] font-bold text-violet-600 uppercase tracking-wider">
// //                                   Field Options
// //                                 </label>
// //                                 {newField.options.map((opt, i) => (
// //                                   <motion.div
// //                                     key={i}
// //                                     initial={{ opacity: 0, x: -10 }}
// //                                     animate={{ opacity: 1, x: 0 }}
// //                                     className="flex gap-2"
// //                                   >
// //                                     <input
// //                                       className="flex-1 bg-white border-2 border-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-400 transition-all"
// //                                       placeholder={`Option ${i + 1}`}
// //                                       value={opt}
// //                                       onChange={(e) => {
// //                                         const newOpts = [...newField.options]
// //                                         newOpts[i] = e.target.value
// //                                         setNewField({ ...newField, options: newOpts })
// //                                       }}
// //                                     />
// //                                     {newField.options.length > 1 && (
// //                                       <motion.button
// //                                         type="button"
// //                                         whileHover={{ scale: 1.1 }}
// //                                         whileTap={{ scale: 0.9 }}
// //                                         onClick={() => {
// //                                           const newOpts = newField.options.filter((_, idx) => idx !== i)
// //                                           setNewField({ ...newField, options: newOpts })
// //                                         }}
// //                                         className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
// //                                       >
// //                                         <X size={14} />
// //                                       </motion.button>
// //                                     )}
// //                                   </motion.div>
// //                                 ))}
// //                                 <button
// //                                   type="button"
// //                                   onClick={() => setNewField({ ...newField, options: [...newField.options, ""] })}
// //                                   className="text-sm text-violet-600 font-bold hover:text-violet-700 flex items-center gap-1 transition-colors"
// //                                 >
// //                                   <Plus size={14} /> Add Option
// //                                 </button>
// //                               </motion.div>
// //                             )}
// //                           </AnimatePresence>

// //                           {/* Save Button */}
// //                           <motion.button
// //                             onClick={handleInlineCreate}
// //                             whileHover={{ scale: 1.01 }}
// //                             whileTap={{ scale: 0.99 }}
// //                             className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
// //                           >
// //                             Save Input Field
// //                           </motion.button>
// //                         </div>
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>

// //                   {/* DESIGN COMPONENT INTEGRATION */}
// //                   <div className="mt-4">
// //                     <Design
// //                       editingFormId={editingFormId}
// //                       token={token}
// //                       formTheme={formTheme}
// //                       setFormTheme={setFormTheme}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Right Side: Preview & Edit */}
// //               <div
// //                 className="flex-1 p-6 lg:p-8 flex flex-col transition-all duration-500 min-h-[60vh]"
// //                 style={{
// //                   backgroundColor: formTheme.bgColor || "#ffffff",
// //                   fontFamily: `${formTheme.labelFont || "Inter"}, sans-serif`,
// //                 }}
// //               >
// //                 <div className="w-full flex flex-col h-full">
// //                   {/* Form Title & Description */}
// //                   <motion.div
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     className="mb-8 space-y-4"
// //                   >
// //                     <div className="group flex items-center gap-3 border-b-2 border-transparent hover:border-violet-100 focus-within:border-violet-300 pb-2 transition-all duration-300">
// //                       <input
// //                         value={formTitle || ""}
// //                         onChange={(e) => setFormTitle(e.target.value)}
// //                         placeholder="Enter Form Title..."
// //                         style={{ color: formTheme.labelColor || "#111827" }}
// //                         className="text-2xl lg:text-3xl font-bold w-full focus:outline-none bg-transparent placeholder:text-gray-300"
// //                       />
// //                       <EditIcon
// //                         size={18}
// //                         className="text-gray-300 group-hover:text-violet-400 transition-colors flex-shrink-0"
// //                       />
// //                     </div>
// //                     <div className="group flex items-center gap-3 border-b-2 border-transparent hover:border-violet-100 focus-within:border-violet-300 pb-2 transition-all duration-300">
// //                       <input
// //                         value={formdescription}
// //                         onChange={(e) => setformdescription(e.target.value)}
// //                         placeholder="Add a description for your form..."
// //                         style={{ color: `${formTheme.labelColor}99` || "#4b5563" }}
// //                         className="text-sm lg:text-base w-full focus:outline-none bg-transparent placeholder:text-gray-300"
// //                       />
// //                       <EditIcon
// //                         size={14}
// //                         className="text-gray-300 group-hover:text-violet-400 transition-colors flex-shrink-0"
// //                       />
// //                     </div>
// //                   </motion.div>

// //                   {/* Visibility Toggle */}
// //                   <motion.div
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     transition={{ delay: 0.1 }}
// //                     className="flex gap-4 items-center mb-6"
// //                   >
// //                     <motion.label
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       className={`flex items-center gap-3 cursor-pointer px-4 py-2.5 rounded-xl border-2 transition-all duration-300 ${
// //                         isPublic
// //                           ? "border-green-300 bg-green-50 shadow-md shadow-green-100"
// //                           : "border-gray-200 bg-white hover:border-gray-300"
// //                       }`}
// //                     >
// //                       <input
// //                         type="radio"
// //                         name="visibility"
// //                         checked={isPublic === true}
// //                         onChange={() => setIsPublic(true)}
// //                         className="sr-only"
// //                       />
// //                       <div
// //                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
// //                           isPublic ? "border-green-500 bg-green-500" : "border-gray-300"
// //                         }`}
// //                       >
// //                         {isPublic && <Check className="w-3 h-3 text-white" />}
// //                       </div>
// //                       <Globe className={`w-4 h-4 ${isPublic ? "text-green-600" : "text-gray-400"}`} />
// //                       <span className={`font-semibold text-sm ${isPublic ? "text-green-700" : "text-gray-500"}`}>
// //                         Public
// //                       </span>
// //                     </motion.label>

// //                     <motion.label
// //                       whileHover={{ scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       className={`flex items-center gap-3 cursor-pointer px-4 py-2.5 rounded-xl border-2 transition-all duration-300 ${
// //                         !isPublic
// //                           ? "border-amber-300 bg-amber-50 shadow-md shadow-amber-100"
// //                           : "border-gray-200 bg-white hover:border-gray-300"
// //                       }`}
// //                     >
// //                       <input
// //                         type="radio"
// //                         name="visibility"
// //                         checked={isPublic === false}
// //                         onChange={() => setIsPublic(false)}
// //                         className="sr-only"
// //                       />
// //                       <div
// //                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
// //                           !isPublic ? "border-amber-500 bg-amber-500" : "border-gray-300"
// //                         }`}
// //                       >
// //                         {!isPublic && <Check className="w-3 h-3 text-white" />}
// //                       </div>
// //                       <Lock className={`w-4 h-4 ${!isPublic ? "text-amber-600" : "text-gray-400"}`} />
// //                       <span className={`font-semibold text-sm ${!isPublic ? "text-amber-700" : "text-gray-500"}`}>
// //                         Private
// //                       </span>
// //                     </motion.label>
// //                   </motion.div>

// //                   {/* Fields Area */}
// //                   <div className="flex flex-col space-y-4 flex-1 overflow-y-auto max-h-[45vh] pr-2 custom-scrollbar">
// //                     {selectedFields.length === 0 ? (
// //                       <motion.div
// //                         initial={{ opacity: 0, scale: 0.95 }}
// //                         animate={{ opacity: 1, scale: 1 }}
// //                         className="h-64 border-2 border-dashed border-gray-200 text-center rounded-3xl flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50/50 to-white"
// //                       >
// //                         <motion.div
// //                           animate={pulseAnimation}
// //                           className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mb-4"
// //                         >
// //                           <Layers className="w-8 h-8 text-violet-400" />
// //                         </motion.div>
// //                         <p className="font-medium">Select fields from the left to start building</p>
// //                         <p className="text-sm text-gray-300 mt-1">Drag and drop to reorder</p>
// //                       </motion.div>
// //                     ) : (
// //                       <AnimatePresence mode="popLayout">
// //                         {selectedFields.map((field, index) => (
// //                           <motion.div
// //                             key={field.masterFieldId || index}
// //                             layout
// //                             initial={{ opacity: 0, x: 30, scale: 0.95 }}
// //                             animate={{ opacity: 1, x: 0, scale: 1 }}
// //                             exit={{ opacity: 0, x: -30, scale: 0.95 }}
// //                             transition={{ duration: 0.3 }}
// //                             whileHover={{ y: -2 }}
// //                             className="group bg-white p-5 lg:p-6 rounded-2xl border-2 border-gray-100 hover:border-violet-200 shadow-sm hover:shadow-lg transition-all duration-300"
// //                             style={{
// //                               borderRadius: formTheme.borderRadius || "16px",
// //                             }}
// //                           >
// //                             <div className="flex flex-col sm:flex-row gap-4 mb-4">
// //                               {/* Label Update */}
// //                               <div className="flex-1">
// //                                 <label
// //                                   className="text-xs font-bold uppercase ml-1 mb-2 block tracking-wider"
// //                                   style={{ color: formTheme.labelColor || "#9ca3af" }}
// //                                 >
// //                                   Field Label
// //                                 </label>
// //                                 <input
// //                                   type="text"
// //                                   value={field.label}
// //                                   onChange={(e) => updateFieldProperty(index, "label", e.target.value)}
// //                                   style={{
// //                                     backgroundColor: formTheme.inputBgColor || "#f9fafb",
// //                                     borderRadius: `calc(${formTheme.borderRadius} / 2)` || "8px",
// //                                     color: formTheme.labelColor,
// //                                   }}
// //                                   className="w-full border-2 border-gray-100 p-3 text-sm font-semibold focus:border-violet-400 focus:ring-4 focus:ring-violet-50 outline-none transition-all duration-200"
// //                                 />
// //                               </div>

// //                               {/* Type Update */}
// //                               <div className="w-full sm:w-1/3">
// //                                 <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-2 block tracking-wider">
// //                                   Field Type
// //                                 </label>
// //                                 <select
// //                                   value={field.type}
// //                                   onChange={(e) => updateFieldProperty(index, "type", e.target.value)}
// //                                   className="w-full bg-white border-2 border-gray-100 p-3 rounded-xl text-sm font-semibold focus:border-violet-400 focus:ring-4 focus:ring-violet-50 outline-none transition-all duration-200 cursor-pointer appearance-none"
// //                                   style={{
// //                                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
// //                                     backgroundRepeat: "no-repeat",
// //                                     backgroundPosition: "right 12px center",
// //                                     backgroundSize: "20px",
// //                                   }}
// //                                 >
// //                                   <option value="TEXT">Short Text</option>
// //                                   <option value="TEXTAREA">Long Text</option>
// //                                   <option value="NUMBER">Number</option>
// //                                   <option value="EMAIL">Email</option>
// //                                   <option value="DATE">Date</option>
// //                                   <option value="DROPDOWN">Dropdown</option>
// //                                   <option value="RADIO">Radio</option>
// //                                   <option value="CHECKBOX">Checkbox</option>
// //                                 </select>
// //                               </div>
// //                             </div>

// //                             <div className="flex justify-between items-center">
// //                               <motion.div
// //                                 whileHover={{ scale: 1.02 }}
// //                                 whileTap={{ scale: 0.98 }}
// //                                 className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
// //                                   field.required
// //                                     ? "bg-violet-100 border-2 border-violet-200"
// //                                     : "bg-gray-50 border-2 border-gray-100 hover:border-gray-200"
// //                                 }`}
// //                                 onClick={() => updateFieldProperty(index, "required", !field.required)}
// //                               >
// //                                 <div
// //                                   className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
// //                                     field.required ? "bg-violet-600 border-violet-600" : "border-gray-300"
// //                                   }`}
// //                                 >
// //                                   {field.required && <Check className="w-3 h-3 text-white" />}
// //                                 </div>
// //                                 <span
// //                                   className={`text-xs font-bold uppercase ${field.required ? "text-violet-700" : "text-gray-500"}`}
// //                                 >
// //                                   Required
// //                                 </span>
// //                               </motion.div>
// //                               <span className="text-xs text-gray-400 italic bg-gray-50 px-3 py-1.5 rounded-full">
// //                                 Preview: {field.type}
// //                               </span>
// //                             </div>

// //                             {/* Options Rendering */}
// //                             <AnimatePresence>
// //                               {["DROPDOWN", "RADIO", "CHECKBOX"].includes(field.type) && field.options && (
// //                                 <motion.div
// //                                   initial={{ opacity: 0, height: 0 }}
// //                                   animate={{ opacity: 1, height: "auto" }}
// //                                   exit={{ opacity: 0, height: 0 }}
// //                                   className="space-y-3 mt-4 p-4 bg-gradient-to-br from-violet-50/50 to-white rounded-xl border-2 border-violet-100"
// //                                 >
// //                                   <p className="text-xs font-bold text-violet-600 uppercase tracking-wider">
// //                                     Options Management
// //                                   </p>
// //                                   {field.options.map((opt, optIndex) => (
// //                                     <motion.div
// //                                       key={optIndex}
// //                                       initial={{ opacity: 0, x: -10 }}
// //                                       animate={{ opacity: 1, x: 0 }}
// //                                       className="flex items-center gap-2"
// //                                     >
// //                                       <input
// //                                         type="text"
// //                                         value={opt}
// //                                         onChange={(e) => {
// //                                           const updatedFields = [...selectedFields]
// //                                           updatedFields[index].options[optIndex] = e.target.value
// //                                           setSelectedFields(updatedFields)
// //                                         }}
// //                                         className="flex-1 text-sm bg-white border-2 border-violet-100 rounded-lg px-3 py-2 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-50 transition-all"
// //                                       />
// //                                       <motion.button
// //                                         whileHover={{ scale: 1.1 }}
// //                                         whileTap={{ scale: 0.9 }}
// //                                         onClick={() => {
// //                                           const updatedFields = [...selectedFields]
// //                                           updatedFields[index].options = updatedFields[index].options.filter(
// //                                             (_, i) => i !== optIndex,
// //                                           )
// //                                           setSelectedFields(updatedFields)
// //                                         }}
// //                                         className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
// //                                       >
// //                                         <X size={14} />
// //                                       </motion.button>
// //                                     </motion.div>
// //                                   ))}
// //                                   <button
// //                                     onClick={() => {
// //                                       const updatedFields = [...selectedFields]
// //                                       updatedFields[index].options = [
// //                                         ...(updatedFields[index].options || []),
// //                                         "New Option",
// //                                       ]
// //                                       setSelectedFields(updatedFields)
// //                                     }}
// //                                     className="text-sm font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1 transition-colors"
// //                                   >
// //                                     <Plus size={14} /> Add Option
// //                                   </button>
// //                                 </motion.div>
// //                               )}
// //                             </AnimatePresence>
// //                           </motion.div>
// //                         ))}
// //                       </AnimatePresence>
// //                     )}
// //                   </div>

// //                   {/* Action Buttons */}
// //                   <motion.div
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ delay: 0.2 }}
// //                     className="mt-6 pt-4 flex flex-col sm:flex-row gap-3 border-t border-gray-100"
// //                   >
// //                     <motion.button
// //                       onClick={editingFormId ? updateForm : createForm}
// //                       disabled={loading}
// //                       whileHover={{
// //                         scale: loading ? 1 : 1.01,
// //                         boxShadow: loading ? "none" : "0 15px 30px -10px rgba(124, 58, 237, 0.4)",
// //                       }}
// //                       whileTap={{ scale: loading ? 1 : 0.99 }}
// //                       style={{
// //                         backgroundColor: formTheme.buttonColor || "#7c3aed",
// //                         borderRadius: formTheme.borderRadius || "16px",
// //                       }}
// //                       className="flex-1 text-white py-3.5 font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// //                     >
// //                       {loading ? (
// //                         <>
// //                           <motion.div
// //                             animate={{ rotate: 360 }}
// //                             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// //                           >
// //                             <FaSpinner className="w-5 h-5" />
// //                           </motion.div>
// //                           Processing...
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Sparkles className="w-5 h-5" />
// //                           {editingFormId ? "Update Form" : "Publish Form"}
// //                         </>
// //                       )}
// //                     </motion.button>
// //                     <motion.button
// //                       onClick={() => {
// //                         setShowFormBuilder(false)
// //                         setSelectedFields([])
// //                         setEditingFormId(null)
// //                       }}
// //                       whileHover={{ scale: 1.01 }}
// //                       whileTap={{ scale: 0.99 }}
// //                       className="px-8 py-3.5 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all duration-300"
// //                     >
// //                       Cancel
// //                     </motion.button>
// //                   </motion.div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}
// //         </header>

// //         {/* List of Forms Grid */}
// //         {loading && !showFormBuilder ? (
// //           <motion.div
// //             variants={containerVariants}
// //             initial="hidden"
// //             animate="visible"
// //             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
// //           >
// //             {[1, 2, 3, 4, 5, 6].map((i) => (
// //               <motion.div key={i} variants={itemVariants}>
// //                 <SkeletonCard />
// //               </motion.div>
// //             ))}
// //           </motion.div>
// //         ) : (
// //           <motion.div
// //             layout
// //             variants={containerVariants}
// //             initial="hidden"
// //             animate="visible"
// //             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
// //           >
// //             <AnimatePresence mode="popLayout">
// //               {forms.map((form, index) => (
// //                 <motion.div
// //                   key={form.formId}
// //                   layout
// //                   variants={itemVariants}
// //                   initial="hidden"
// //                   animate="visible"
// //                   exit={{ opacity: 0, scale: 0.8, y: 20 }}
// //                   whileHover="hover"
// //                   className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 flex flex-col justify-between hover:border-violet-200 transition-all duration-500 overflow-hidden"
// //                 >
// //                   {/* Gradient Overlay on Hover */}
// //                   <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

// //                   {/* Top Accent Line */}
// //                   <motion.div
// //                     initial={{ scaleX: 0 }}
// //                     whileHover={{ scaleX: 1 }}
// //                     className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 origin-left"
// //                   />

// //                   <div className="relative z-10">
// //                     <div className="flex justify-between items-start mb-4">
// //                       <motion.span
// //                         whileHover={{ scale: 1.05 }}
// //                         className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
// //                           form.isPublic
// //                             ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200"
// //                             : "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 border border-gray-200"
// //                         }`}
// //                       >
// //                         {form.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
// //                         {form.isPublic ? "Public" : "Private"}
// //                       </motion.span>
// //                       <div className="flex gap-1.5">
// //                         <motion.button
// //                           whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
// //                           whileTap={{ scale: 0.9 }}
// //                           onClick={() => handleEditClick(form.formId)}
// //                           className="p-2.5 rounded-xl text-gray-400 hover:text-violet-600 transition-all"
// //                         >
// //                           <EditIcon size={16} />
// //                         </motion.button>
// //                         <motion.button
// //                           whileHover={{ scale: 1.1, backgroundColor: "#fef2f2" }}
// //                           whileTap={{ scale: 0.9 }}
// //                           onClick={() => setIsDeleting(form)}
// //                           className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 transition-all"
// //                         >
// //                           <Trash2 size={16} />
// //                         </motion.button>
// //                       </div>
// //                     </div>
// //                     <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-violet-700 transition-colors duration-300">
// //                       {form.title}
// //                     </h3>
// //                     <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
// //                       {form.description || "No description provided"}
// //                     </p>
// //                   </div>

// //                   <div className="relative z-10 mt-4 pt-4 border-t border-gray-100 flex gap-3">
// //                     <motion.button
// //                       whileHover={{ scale: 1.02, y: -2 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       onClick={() => navigate(`/responses/${form.formId}`)}
// //                       className="flex-1 bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 font-semibold py-3 rounded-xl hover:from-violet-100 hover:to-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 border border-violet-100"
// //                     >
// //                       <Layers className="w-4 h-4" />
// //                       Responses
// //                     </motion.button>
// //                     <motion.button
// //                       whileHover={{ scale: 1.02, y: -2 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       onClick={() => formview(form.formId)}
// //                       className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold py-3 rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20"
// //                     >
// //                       <Eye className="w-4 h-4" />
// //                       View
// //                     </motion.button>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </AnimatePresence>
// //           </motion.div>
// //         )}
// //       </div>

// //       {/* Delete Modal */}
// //       <AnimatePresence>
// //         {isDeleting && (
// //           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               onClick={() => setIsDeleting(null)}
// //               className="absolute inset-0 bg-black/60 backdrop-blur-md"
// //             />
// //             <motion.div
// //               initial={{ scale: 0.9, opacity: 0, y: 20 }}
// //               animate={{ scale: 1, opacity: 1, y: 0 }}
// //               exit={{ scale: 0.9, opacity: 0, y: 20 }}
// //               transition={{ type: "spring", damping: 25, stiffness: 300 }}
// //               className="relative bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full border border-gray-100"
// //             >
// //               <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
// //                 <Trash2 className="w-8 h-8 text-red-500" />
// //               </div>
// //               <h3 className="text-2xl font-bold mb-2 text-center text-gray-900">Delete Form?</h3>
// //               <p className="text-gray-500 mb-8 text-center">
// //                 Are you sure you want to delete <span className="font-bold text-gray-900">"{isDeleting.title}"</span>?
// //                 This action cannot be undone.
// //               </p>
// //               <div className="flex gap-3">
// //                 <motion.button
// //                   whileHover={{ scale: 1.02 }}
// //                   whileTap={{ scale: 0.98 }}
// //                   onClick={() => setIsDeleting(null)}
// //                   className="flex-1 px-6 py-3.5 bg-gray-100 rounded-2xl font-semibold hover:bg-gray-200 transition-all"
// //                 >
// //                   Cancel
// //                 </motion.button>
// //                 <motion.button
// //                   whileHover={{ scale: 1.02 }}
// //                   whileTap={{ scale: 0.98 }}
// //                   onClick={confirmDelete}
// //                   className="flex-1 px-6 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 transition-all"
// //                 >
// //                   Delete
// //                 </motion.button>
// //               </div>
// //             </motion.div>
// //           </div>
// //         )}
// //       </AnimatePresence>

// //       {/* View Form Modal */}
// //       <AnimatePresence>
// //         {viewform && viewData && (
// //           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               onClick={() => setviewform(false)}
// //               className="absolute inset-0 bg-gray-900/70 backdrop-blur-xl"
// //             />

// //             <motion.div
// //               initial={{ scale: 0.9, opacity: 0, y: 30 }}
// //               animate={{ scale: 1, opacity: 1, y: 0 }}
// //               exit={{ scale: 0.9, opacity: 0, y: 30 }}
// //               transition={{ type: "spring", damping: 25, stiffness: 300 }}
// //               className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col border border-gray-100"
// //               style={{ fontFamily: `${viewData.theme?.labelFont || "Inter"}, sans-serif` }}
// //             >
// //               {/* Theme Strip with Gradient */}
// //               <div
// //                 className="h-2 w-full"
// //                 style={{
// //                   background: `linear-gradient(90deg, ${viewData.theme?.buttonColor || "#6C3BFF"}, ${viewData.theme?.buttonColor || "#6C3BFF"}88)`,
// //                 }}
// //               />

// //               {/* Header */}
// //               <div className="p-6 lg:p-8 flex justify-between items-start border-b border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
// //                 <div className="flex-1 min-w-0">
// //                   <div className="flex items-center gap-3 mb-2 flex-wrap">
// //                     <h2
// //                       className="text-2xl lg:text-3xl font-bold truncate"
// //                       style={{ color: viewData.theme?.labelColor || "#111827" }}
// //                     >
// //                       {viewData.title}
// //                     </h2>
// //                     <span className="px-2.5 py-1 bg-violet-100 text-violet-700 text-[10px] font-black uppercase rounded-lg flex-shrink-0">
// //                       Preview Mode
// //                     </span>
// //                   </div>
// //                   <p className="text-gray-500 text-sm lg:text-base">
// //                     {viewData.description || "No description provided."}
// //                   </p>
// //                 </div>
// //                 <motion.button
// //                   whileHover={{ scale: 1.1, rotate: 90 }}
// //                   whileTap={{ scale: 0.9 }}
// //                   onClick={() => setviewform(false)}
// //                   className="bg-gray-100 hover:bg-red-100 hover:text-red-500 p-2.5 rounded-xl transition-all ml-4 flex-shrink-0"
// //                 >
// //                   <X size={20} />
// //                 </motion.button>
// //               </div>

// //               {/* Form Preview Area */}
// //               <div
// //                 className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-5"
// //                 style={{ backgroundColor: viewData.theme?.bgColor || "#f9fafb" }}
// //               >
// //                 <AnimatePresence>
// //                   {viewData.formField?.map((field, index) => (
// //                     <motion.div
// //                       key={field.formFieldId}
// //                       initial={{ opacity: 0, y: 20 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       transition={{ delay: index * 0.05 }}
// //                       className="bg-white p-5 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-violet-100 transition-all duration-300"
// //                       style={{ borderRadius: viewData.theme?.borderRadius || "12px" }}
// //                     >
// //                       <label
// //                         className="block text-sm font-bold mb-3"
// //                         style={{ color: viewData.theme?.labelColor || "#374151" }}
// //                       >
// //                         {field.label} {field.required && <span className="text-red-500">*</span>}
// //                       </label>

// //                       <div
// //                         className="w-full px-4 py-3.5 border-2 border-dashed border-gray-200 text-gray-400 text-sm flex items-center justify-between"
// //                         style={{
// //                           backgroundColor: viewData.theme?.inputBgColor || "#ffffff",
// //                           borderRadius: `calc(${viewData.theme?.borderRadius || "12px"} / 2)`,
// //                         }}
// //                       >
// //                         <span className="flex items-center gap-2">
// //                           <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
// //                           Preview for {field.type}
// //                         </span>
// //                         <ChevronRight className="w-4 h-4" />
// //                       </div>
// //                     </motion.div>
// //                   ))}
// //                 </AnimatePresence>
// //               </div>

// //               {/* Action Footer */}
// //               <div className="p-5 lg:p-6 bg-gradient-to-t from-gray-50 to-white border-t border-gray-100 flex flex-wrap gap-3">
// //                 <motion.button
// //                   whileHover={{ scale: 1.02 }}
// //                   whileTap={{ scale: 0.98 }}
// //                   onClick={() => setviewform(false)}
// //                   className="px-6 py-3.5 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
// //                 >
// //                   Close
// //                 </motion.button>

// //                 <motion.button
// //                   whileHover={{ scale: viewData.isPublic ? 1.02 : 1 }}
// //                   whileTap={{ scale: viewData.isPublic ? 0.98 : 1 }}
// //                   onClick={() => {
// //                     if (!viewData.isPublic) {
// //                       toast.error("Form is private. Make it public to copy link.")
// //                       return
// //                     }
// //                     const baseUrl = import.meta.env.VITE_URL.replace(/\/$/, "")
// //                     const link = `${baseUrl}/public/form/${viewData.slug}`
// //                     navigator.clipboard.writeText(link)
// //                     toast.success("Link copied!")
// //                   }}
// //                   className={`flex-1 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
// //                     viewData.isPublic
// //                       ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 shadow-lg shadow-gray-900/20"
// //                       : "bg-gray-200 text-gray-400 cursor-not-allowed"
// //                   }`}
// //                 >
// //                   <Send size={18} /> Copy Link
// //                 </motion.button>

// //                 <motion.button
// //                   whileHover={{ scale: viewData.isPublic ? 1.02 : 1 }}
// //                   whileTap={{ scale: viewData.isPublic ? 0.98 : 1 }}
// //                   onClick={async () => {
// //                     if (!viewData.isPublic) {
// //                       toast.error("Form is private. Make it public first.")
// //                       return
// //                     }
// //                     const baseUrl = import.meta.env.VITE_URL?.replace(/\/$/, "") || window.location.origin
// //                     const formLink = `${baseUrl}/public/form/${viewData.slug}`
// //                     const embedCode = `<iframe src="${formLink}" title="${viewData.title}" width="100%" height="700" style="border:none; border-radius:12px;" allow="clipboard-write"></iframe>`

// //                     await navigator.clipboard.writeText(embedCode)
// //                     toast.success("Embed code copied!")
// //                   }}
// //                   style={{
// //                     background: viewData.isPublic
// //                       ? `linear-gradient(135deg, ${viewData.theme?.buttonColor || "#7C3AED"}, ${viewData.theme?.buttonColor || "#7C3AED"}dd)`
// //                       : "#E5E7EB",
// //                     color: viewData.isPublic ? "white" : "#9CA3AF",
// //                   }}
// //                   className={`flex-1 py-3.5 rounded-xl font-bold transition-all ${viewData.isPublic ? "shadow-lg hover:brightness-110 active:scale-95" : "cursor-not-allowed"}`}
// //                 >
// //                   Copy Embed Code
// //                 </motion.button>
// //               </div>
// //             </motion.div>
// //           </div>
// //         )}
// //       </AnimatePresence>

// //       {/* Bottom Wave Section */}
// //       <div className="relative w-full h-56 overflow-hidden">
// //         <WaveBackground position="bottom" height="h-56" />
// //       </div>

// //       <Footer />
// //     </div>
// //   )
// // }

// // export default Form




// import { useEffect, useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import axios from "axios"
// import toast from "react-hot-toast"
// import UserNavbar from "../user/UserNavbar"
// import { useFormContext } from "./FormContext"
// import {
//   EditIcon,
//   Trash2,
//   X,
//   Send,
//   Plus,
//   Sparkles,
//   Layers,
//   Eye,
//   ChevronRight,
//   GripVertical,
//   Check,
//   Globe,
//   Lock,
// } from "lucide-react"
// import { useNavigate } from "react-router-dom"
// import Footer from "../landingPage/Footer"
// import Design from "./Design"
// import WaveBackground from "../dashboard/WaveBackground"
// import { FaSpinner } from "react-icons/fa"
// import LoadingScreen from "../shared/LoadingScreen"

// // Enhanced animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 },
//   },
// }

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// }

// const cardHoverVariants = {
//   rest: { scale: 1, y: 0 },
//   hover: { scale: 1.02, y: -5, transition: { duration: 0.3, ease: "easeOut" } },
// }

// const pulseAnimation = {
//   scale: [1, 1.05, 1],
//   transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
// }

// const Form = () => {
//   // masterfield
//   const [masterFields, setMasterFields] = useState([])
//   const [selectedFields, setSelectedFields] = useState([])
//   const [showFormBuilder, setShowFormBuilder] = useState(false)
//   const [formTitle, setFormTitle] = useState("Untitled Form")
//   const [isAddingMaster, setIsAddingMaster] = useState(false)
//   const [newField, setNewField] = useState({ label: "", type: "TEXT", options: [""] })
//   const [introloading, setintroLoading] = useState(true);
//   // formfield
//   const { forms, setForms, updateFormLocally, deleteFormLocally } = useFormContext()
//   const [loading, setLoading] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(null)
//   const [isPublic, setIsPublic] = useState(true)
//   const { isDarkMode } = useFormContext(); 

//   // --- THEME STATE ---
//   const [formTheme, setFormTheme] = useState({
//     bgColor: "#ffffff",
//     buttonColor: "#7c3aed",
//     inputBgColor: "#f3f4f6",
//     labelFont: "Inter",
//     borderRadius: "8px",
//   })

//   const token = localStorage.getItem("token")
//   const navigate = useNavigate()

//   const URL = import.meta.env.VITE_URL
//   const navi = useNavigate()

//   // 1. Fetch Master Fields
//   useEffect(() => {
//     const getMasterFields = async () => {
//       try {
//         const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         setMasterFields(res.data.data)
//       } catch (err) {
//         toast.error("Error loading master fields")
//       }
//       finally {
//         setintroLoading(false);
//       }
//     }
//     getMasterFields()
//   }, [token])

//   const handleInlineCreate = async () => {
//     if (!newField.label) return toast.error("Label name required")

//     try {
//       const res = await axios.post(
//         "https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields",
//         newField,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       )

//       toast.success("Field Created!")
//       setMasterFields((prev) => [...prev, res.data.data])
//       setNewField({ label: "", type: "TEXT", options: [""] })
//       setIsAddingMaster(false)
//     } catch (err) {
//       toast.error("Failed to add master field")
//     }
//   }

//   // 2. Toggle field selection
//   const toggleField = (toggledField) => {
//     setSelectedFields((prev) => {
//       const exists = prev.find((f) => f.masterFieldId === toggledField.masterFieldId)
//       if (exists) {
//         return prev.filter((f) => f.masterFieldId !== toggledField.masterFieldId)
//       }
//       return [...prev, { ...toggledField, required: false }]
//     })
//   }

//   // 3. Update Logic for any field property (Label, Type, etc.)
//   const updateFieldProperty = (index, key, value) => {
//     const updatedFields = [...selectedFields]
//     updatedFields[index] = { ...updatedFields[index], [key]: value }
//     setSelectedFields(updatedFields)
//   }

//   // 4. Create Form API
//   const createForm = async () => {
//     if (selectedFields.length === 0) return toast.error("Please select at least one field")
//     setLoading(true)
//     try {
//       const uniqueTitle = formTitle === "Untitled Form" ? `Untitled Form ${Date.now()}` : formTitle
//       const payload = {
//         title: uniqueTitle,
//         description: formdescription,
//         isPublic: isPublic,
//         theme: formTheme,
//         fields: selectedFields.map((field, index) => ({
//           label: field.label,
//           type: field.type,
//           required: field.required,
//           order: index,
//           masterFieldId: field.masterFieldId || null,
//           options: field.options || null,
//         })),
//       }
//       const res = await axios.post("https://formbuilder-saas-backend.onrender.com/api/dashboard/form", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       toast.success("Form Published Successfully!")
//       setShowFormBuilder(false)
//       setSelectedFields([])
//       setForms((prev) => [res.data.data, ...prev])
//       setIsPublic(true)
//     } catch (err) {
//       toast.error("Failed to create form")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // 5. Fetch All Forms
//   useEffect(() => {
//     const fetchForms = async () => {
//       setLoading(true)
//       try {
//         const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/forms", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         setForms(res.data.data)
//       } catch (err) {
//         toast.error("Failed to load forms")
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchForms()
//   }, [token])

//   // 6. Delete Form
//   const confirmDelete = async () => {
//     if (!isDeleting) return
//     const idToDelete = isDeleting.formId
//     try {
//       await axios.delete(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${idToDelete}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       deleteFormLocally(idToDelete)
//       toast.success("Form deleted successfully")
//     } catch (err) {
//       toast.error("Delete failed")
//     } finally {
//       setIsDeleting(null)
//     }
//   }

//   // 7. Edit Handler (Load data into builder)
//   const [editingFormId, setEditingFormId] = useState(null)
//   const [formdescription, setformdescription] = useState("")

//   const handleEditClick = async (formId) => {
//     setLoading(true)
//     try {
//       const res = await axios.get(
//         `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       )
//       const data = res.data.data
//       setFormTitle(data.title)
//       setformdescription(data.description || "")
//       setIsPublic(data.isPublic)

//       setEditingFormId(formId)

//       const mappedFields = data.formField.map((f) => ({
//         masterFieldId: f.masterFieldId,
//         formFieldId: f.formFieldId,
//         label: f.label,
//         type: f.type,
//         required: f.isRequired,
//         options: f.options,
//       }))

//       setSelectedFields(mappedFields)
//       setShowFormBuilder(true)
//     } catch (err) {
//       toast.error("Failed to load form for editing")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // 8. Update Form API
//   const updateForm = async () => {
//     if (selectedFields.length === 0) return toast.error("Please select at least one field")
//     setLoading(true)
//     try {
//       const payload = {
//         title: formTitle,
//         description: formdescription,
//         isPublic: isPublic,
//         theme: formTheme,
//         fields: selectedFields.map((field, index) => ({
//           formFieldId: field.formFieldId || null,
//           label: field.label,
//           type: field.type,
//           required: field.required,
//           order: index,
//           masterFieldId: field.masterFieldId || null,
//           options: field.options || null,
//         })),
//       }
//       const res = await axios.put(
//         `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${editingFormId}`,
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } },
//       )
//       toast.success("Form Updated Successfully!")
//       setForms((prev) => prev.map((f) => (f.formId === editingFormId ? res.data.data : f)))
//       setShowFormBuilder(false)
//       setEditingFormId(null)
//       setFormTitle("Untitled Form")
//       setformdescription("")
//       setSelectedFields([])
//     } catch (err) {
//       toast.error("Failed to update form")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // VIEW FORM STATE
//   const [viewform, setviewform] = useState(false)
//   const [viewData, setViewData] = useState(null)

//   const formview = async (formId) => {
//     setLoading(true)
//     try {
//       const response = await axios.get(
//         `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       )
//       setViewData(response.data.data)
//       setviewform(true)
//     } catch (err) {
//       toast.error("Failed to load form details")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Skeleton Loader Component
//   const SkeletonCard = () => (
//     <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 animate-pulse">
//       <div className="flex justify-between items-start mb-4">
//         <div className="h-6 w-20 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full" />
//         <div className="flex gap-2">
//           <div className="h-9 w-9 bg-gray-100 rounded-xl" />
//           <div className="h-9 w-9 bg-gray-100 rounded-xl" />
//         </div>
//       </div>
//       <div className="h-7 w-3/4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg mb-3" />
//       <div className="h-4 w-full bg-gray-100 rounded mb-2" />
//       <div className="h-4 w-2/3 bg-gray-100 rounded mb-6" />
//       <div className="pt-4 border-t border-gray-50 flex gap-3">
//         <div className="flex-1 h-11 bg-gray-100 rounded-2xl" />
//         <div className="flex-1 h-11 bg-gray-100 rounded-2xl" />
//       </div>
//     </div>
//   )


//     if (loading) {
//     return <LoadingScreen isDarkMode={isDarkMode} />;
//   }
//   return (
//     <>
//     <div className="min-h-screen font-sans relative bg-gradient-to-br from-slate-50 via-white to-violet-50/30 overflow-x-hidden">
//       <UserNavbar />

//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <motion.div
//           animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
//           transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           className="absolute top-20 left-10 w-72 h-72 bg-violet-200/20 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
//           transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           className="absolute bottom-40 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{ scale: [1, 1.2, 1] }}
//           transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/10 rounded-full blur-3xl"
//         />
//       </div>

//       <WaveBackground position="top" height="h-120" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
//       <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />

//       <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <header className="mb-10">
//           {!showFormBuilder ? (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
//             >
//               <div>
//                 <motion.h1
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-violet-800 to-violet-600 bg-clip-text text-transparent"
//                 >
//                   Your Forms
//                 </motion.h1>
//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                   className="text-gray-500 mt-2"
//                 >
//                   Create, manage and share your forms
//                 </motion.p>
//               </div>
//               <motion.button
//                 onClick={() => {
//                   setShowFormBuilder(true)
//                   setSelectedFields([])
//                   setEditingFormId(null)
//                   setFormTitle("Untitled Form")
//                   setformdescription("")
//                 }}
//                 whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -15px rgba(124, 58, 237, 0.4)" }}
//                 whileTap={{ scale: 0.98 }}
//                 className="group relative bg-gradient-to-r from-violet-600 via-violet-600 to-indigo-600 text-white text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-lg shadow-violet-500/25 font-semibold flex items-center gap-3 overflow-hidden"
//               >
//                 <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
//                 <span className="relative z-10">Create New Form</span>
//                 <Sparkles className="w-4 h-4 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
//               </motion.button>
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//               className="w-full bg-white/80 backdrop-blur-xl border border-white/50 rounded shadow-2xl shadow-violet-500/10 flex flex-col lg:flex-row gap-0 overflow-hidden"
//             >
//               {/* Left Side: Master Fields */}
//               <div className="w-full lg:w-[380px] bg-gradient-to-b from-gray-50/80 to-white/50 backdrop-blur-sm py-6 px-5 border-r border-gray-100/80">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-lg font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
//                     <Layers className="w-5 h-5 text-violet-600" />
//                     Available Fields
//                   </h2>
//                   <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
//                     {masterFields.length} fields
//                   </span>
//                 </div>

//                 <motion.div
//                   variants={containerVariants}
//                   initial="hidden"
//                   animate="visible"
//                   className="space-y-2.5 overflow-y-auto max-h-[40vh] lg:max-h-[50vh] pr-2 custom-scrollbar"
//                 >
//                   {masterFields.map((field, index) => (
//                     <motion.label
//                       key={field.masterFieldId}
//                       variants={itemVariants}
//                       whileHover={{ x: 4 }}
//                       whileTap={{ scale: 0.98 }}
//                       className={`group flex items-center gap-3 py-3 px-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
//                         selectedFields.some((f) => f.masterFieldId === field.masterFieldId)
//                           ? "bg-violet-50 border-violet-300 shadow-md shadow-violet-100"
//                           : "bg-white/70 border-transparent hover:border-gray-200 hover:bg-white shadow-sm hover:shadow-md"
//                       }`}
//                     >
//                       <div
//                         className={`relative w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
//                           selectedFields.some((f) => f.masterFieldId === field.masterFieldId)
//                             ? "bg-violet-600 border-violet-600"
//                             : "border-gray-300 group-hover:border-violet-400"
//                         }`}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={selectedFields.some((f) => f.masterFieldId === field.masterFieldId)}
//                           onChange={() => toggleField(field)}
//                           className="sr-only"
//                         />
//                         <Check
//                           className={`w-3.5 h-3.5 text-white transition-all duration-200 ${
//                             selectedFields.some((f) => f.masterFieldId === field.masterFieldId)
//                               ? "scale-100 opacity-100"
//                               : "scale-0 opacity-0"
//                           }`}
//                         />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <span className="font-semibold text-gray-700 block truncate">{field.label}</span>
//                         <span className="text-xs text-gray-400">{field.type}</span>
//                       </div>
//                       <GripVertical className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
//                     </motion.label>
//                   ))}
//                 </motion.div>

//                 <div className="mt-6 space-y-4">
//                   <motion.button
//                     onClick={() => setIsAddingMaster(!isAddingMaster)}
//                     whileHover={{ scale: 1.01 }}
//                     whileTap={{ scale: 0.99 }}
//                     className={`w-full py-3 px-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${
//                       isAddingMaster
//                         ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                         : "bg-violet-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30"
//                     }`}
//                   >
//                     <motion.div animate={{ rotate: isAddingMaster ? 45 : 0 }} transition={{ duration: 0.2 }}>
//                       <Plus className="w-5 h-5" />
//                     </motion.div>
//                     {isAddingMaster ? "Close" : "Add Input Field"}
//                   </motion.button>

//                   <AnimatePresence>
//                     {isAddingMaster && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="overflow-hidden"
//                       >
//                         <div className="p-5 bg-violet-50/50 border border-violet-100 rounded-2xl shadow-inner space-y-4">
//                           {/* Label Input */}
//                           <div className="space-y-2">
//                             <label className="text-[11px] font-bold text-violet-600 uppercase tracking-wider">
//                               New Label
//                             </label>
//                             <input
//                               className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-2.5 outline-none text-sm font-medium focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all duration-200"
//                               value={newField.label}
//                               onChange={(e) => setNewField({ ...newField, label: e.target.value })}
//                               placeholder="Enter label name..."
//                             />
//                           </div>

//                           {/* Type Selection */}
//                           <div className="space-y-2">
//                             <label className="text-[11px] font-bold text-violet-600 uppercase tracking-wider">
//                               Type
//                             </label>
//                             <select
//                               className="w-full text-sm bg-white border-2 border-gray-100 rounded-xl px-4 py-2.5 outline-none cursor-pointer font-medium focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all duration-200 appearance-none"
//                               style={{
//                                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
//                                 backgroundRepeat: "no-repeat",
//                                 backgroundPosition: "right 12px center",
//                                 backgroundSize: "20px",
//                               }}
//                               value={newField.type}
//                               onChange={(e) => {
//                                 const isSelectionType = ["DROPDOWN", "RADIO", "CHECKBOX"].includes(e.target.value)
//                                 setNewField({
//                                   ...newField,
//                                   type: e.target.value,
//                                   options: isSelectionType ? [""] : [],
//                                 })
//                               }}
//                             >
//                               {["TEXT", "NUMBER", "EMAIL", "DATE", "TEXTAREA", "CHECKBOX", "RADIO", "DROPDOWN"].map(
//                                 (t) => (
//                                   <option key={t} value={t}>
//                                     {t}
//                                   </option>
//                                 ),
//                               )}
//                             </select>
//                           </div>

//                           {/* Dynamic Options Section */}
//                           <AnimatePresence>
//                             {["DROPDOWN", "RADIO", "CHECKBOX"].includes(newField.type) && (
//                               <motion.div
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: "auto" }}
//                                 exit={{ opacity: 0, height: 0 }}
//                                 className="space-y-3 border-2 border-violet-100 rounded-xl p-4 bg-white/50"
//                               >
//                                 <label className="text-[11px] font-bold text-violet-600 uppercase tracking-wider">
//                                   Field Options
//                                 </label>
//                                 {newField.options.map((opt, i) => (
//                                   <motion.div
//                                     key={i}
//                                     initial={{ opacity: 0, x: -10 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     className="flex gap-2"
//                                   >
//                                     <input
//                                       className="flex-1 bg-white border-2 border-gray-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-400 transition-all"
//                                       placeholder={`Option ${i + 1}`}
//                                       value={opt}
//                                       onChange={(e) => {
//                                         const newOpts = [...newField.options]
//                                         newOpts[i] = e.target.value
//                                         setNewField({ ...newField, options: newOpts })
//                                       }}
//                                     />
//                                     {newField.options.length > 1 && (
//                                       <motion.button
//                                         type="button"
//                                         whileHover={{ scale: 1.1 }}
//                                         whileTap={{ scale: 0.9 }}
//                                         onClick={() => {
//                                           const newOpts = newField.options.filter((_, idx) => idx !== i)
//                                           setNewField({ ...newField, options: newOpts })
//                                         }}
//                                         className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
//                                       >
//                                         <X size={14} />
//                                       </motion.button>
//                                     )}
//                                   </motion.div>
//                                 ))}
//                                 <button
//                                   type="button"
//                                   onClick={() => setNewField({ ...newField, options: [...newField.options, ""] })}
//                                   className="text-sm text-violet-600 font-bold hover:text-violet-700 flex items-center gap-1 transition-colors"
//                                 >
//                                   <Plus size={14} /> Add Option
//                                 </button>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>

//                           {/* Save Button */}
//                           <motion.button
//                             onClick={handleInlineCreate}
//                             whileHover={{ scale: 1.01 }}
//                             whileTap={{ scale: 0.99 }}
//                             className="w-full bg-violet-600  text-white py-3 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
//                           >
//                             Save Input Field
//                           </motion.button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                   {/* DESIGN COMPONENT INTEGRATION */}
//                   <div className="mt-4">
//                     <Design
//                       editingFormId={editingFormId}
//                       token={token}
//                       formTheme={formTheme}
//                       setFormTheme={setFormTheme}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Right Side: Preview & Edit */}
//               <div
//                 className="flex-1 p-6 lg:p-8 flex flex-col transition-all duration-500 min-h-[60vh]"
//                 style={{
//                   backgroundColor: formTheme.bgColor || "#ffffff",
//                   fontFamily: `${formTheme.labelFont || "Inter"}, sans-serif`,
//                 }}
//               >
//                 <div className="w-full flex flex-col h-full">
//                   {/* Form Title & Description */}
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="mb-8 space-y-4"
//                   >
//                     <div className="group flex items-center gap-3 border-b-2 border-transparent hover:border-violet-100 focus-within:border-violet-300 pb-2 transition-all duration-300">
//                       <input
//                         value={formTitle || ""}
//                         onChange={(e) => setFormTitle(e.target.value)}
//                         placeholder="Enter Form Title..."
//                         style={{ color: formTheme.labelColor || "#111827" }}
//                         className="text-2xl lg:text-3xl font-bold w-full focus:outline-none bg-transparent placeholder:text-gray-300"
//                       />
//                       <EditIcon
//                         size={18}
//                         className="text-gray-300 group-hover:text-violet-400 transition-colors "
//                       />
//                     </div>
//                     <div className="group flex items-center gap-3 border-b-2 border-transparent hover:border-violet-100 focus-within:border-violet-300 pb-2 transition-all duration-300">
//                       <input
//                         value={formdescription}
//                         onChange={(e) => setformdescription(e.target.value)}
//                         placeholder="Add a description for your form..."
//                         style={{ color: `${formTheme.labelColor}99` || "#4b5563" }}
//                         className="text-sm lg:text-base w-full focus:outline-none bg-transparent placeholder:text-gray-300"
//                       />
//                       <EditIcon
//                         size={14}
//                         className="text-gray-300 group-hover:text-violet-400 transition-colors "
//                       />
//                     </div>
//                   </motion.div>

//                   {/* Visibility Toggle */}
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.1 }}
//                     className="flex gap-4 items-center mb-6"
//                   >
//                     <motion.label
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className={`flex items-center gap-3 cursor-pointer px-4 py-2.5 rounded-xl border-2 transition-all duration-300 ${
//                         isPublic
//                           ? "border-green-300 bg-green-50 shadow-md shadow-green-100"
//                           : "border-gray-200 bg-white hover:border-gray-300"
//                       }`}
//                     >
//                       <input
//                         type="radio"
//                         name="visibility"
//                         checked={isPublic === true}
//                         onChange={() => setIsPublic(true)}
//                         className="sr-only"
//                       />
//                       <div
//                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
//                           isPublic ? "border-green-500 bg-green-500" : "border-gray-300"
//                         }`}
//                       >
//                         {isPublic && <Check className="w-3 h-3 text-white" />}
//                       </div>
//                       <Globe className={`w-4 h-4 ${isPublic ? "text-green-600" : "text-gray-400"}`} />
//                       <span className={`font-semibold text-sm ${isPublic ? "text-green-700" : "text-gray-500"}`}>
//                         Public
//                       </span>
//                     </motion.label>

//                     <motion.label
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className={`flex items-center gap-3 cursor-pointer px-4 py-2.5 rounded-xl border-2 transition-all duration-300 ${
//                         !isPublic
//                           ? "border-amber-300 bg-amber-50 shadow-md shadow-amber-100"
//                           : "border-gray-200 bg-white hover:border-gray-300"
//                       }`}
//                     >
//                       <input
//                         type="radio"
//                         name="visibility"
//                         checked={isPublic === false}
//                         onChange={() => setIsPublic(false)}
//                         className="sr-only"
//                       />
//                       <div
//                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
//                           !isPublic ? "border-amber-500 bg-amber-500" : "border-gray-300"
//                         }`}
//                       >
//                         {!isPublic && <Check className="w-3 h-3 text-white" />}
//                       </div>
//                       <Lock className={`w-4 h-4 ${!isPublic ? "text-amber-600" : "text-gray-400"}`} />
//                       <span className={`font-semibold text-sm ${!isPublic ? "text-amber-700" : "text-gray-500"}`}>
//                         Private
//                       </span>
//                     </motion.label>
//                   </motion.div>

//                   {/* Fields Area */}
//                   <div className="flex flex-col space-y-4 flex-1 overflow-y-auto max-h-[45vh] pr-2 custom-scrollbar">
//                     {selectedFields.length === 0 ? (
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         className="h-64 border-2 border-dashed border-gray-200 text-center rounded-3xl flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50/50 to-white"
//                       >
//                         <motion.div
//                           animate={pulseAnimation}
//                           className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mb-4"
//                         >
//                           <Layers className="w-8 h-8 text-violet-400" />
//                         </motion.div>
//                         <p className="font-medium">Select fields from the left to start building</p>
//                         <p className="text-sm text-gray-300 mt-1">Drag and drop to reorder</p>
//                       </motion.div>
//                     ) : (
//                       <AnimatePresence mode="popLayout">
//                         {selectedFields.map((field, index) => (
//                           <motion.div
//                             key={field.masterFieldId || index}
//                             layout
//                             initial={{ opacity: 0, x: 30, scale: 0.95 }}
//                             animate={{ opacity: 1, x: 0, scale: 1 }}
//                             exit={{ opacity: 0, x: -30, scale: 0.95 }}
//                             transition={{ duration: 0.3 }}
//                             whileHover={{ y: -2 }}
//                             className="group bg-white p-5 lg:p-6 rounded-2xl border-2 border-gray-100 hover:border-violet-200 shadow-sm hover:shadow-lg transition-all duration-300"
//                             style={{
//                               borderRadius: formTheme.borderRadius || "16px",
//                             }}
//                           >
//                             <div className="flex flex-col sm:flex-row gap-4 mb-4">
//                               {/* Label Update */}
//                               <div className="flex-1">
//                                 <label
//                                   className="text-xs font-bold uppercase ml-1 mb-2 block tracking-wider"
//                                   style={{ color: formTheme.labelColor || "#9ca3af" }}
//                                 >
//                                   Field Label
//                                 </label>
//                                 <input
//                                   type="text"
//                                   value={field.label}
//                                   onChange={(e) => updateFieldProperty(index, "label", e.target.value)}
//                                   style={{
//                                     backgroundColor: formTheme.inputBgColor || "#f9fafb",
//                                     borderRadius: `calc(${formTheme.borderRadius} / 2)` || "8px",
//                                     color: formTheme.labelColor,
//                                   }}
//                                   className="w-full border-2 border-gray-100 p-3 text-sm font-semibold focus:border-violet-400 focus:ring-4 focus:ring-violet-50 outline-none transition-all duration-200"
//                                 />
//                               </div>

//                               {/* Type Update */}
//                               <div className="w-full sm:w-1/3">
//                                 <label className="text-xs font-bold text-gray-400 uppercase ml-1 mb-2 block tracking-wider">
//                                   Field Type
//                                 </label>
//                                 <select
//                                   value={field.type}
//                                   onChange={(e) => updateFieldProperty(index, "type", e.target.value)}
//                                   className="w-full bg-white border-2 border-gray-100 p-3 rounded-xl text-sm font-semibold focus:border-violet-400 focus:ring-4 focus:ring-violet-50 outline-none transition-all duration-200 cursor-pointer appearance-none"
//                                   style={{
//                                     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
//                                     backgroundRepeat: "no-repeat",
//                                     backgroundPosition: "right 12px center",
//                                     backgroundSize: "20px",
//                                   }}
//                                 >
//                                   <option value="TEXT">Short Text</option>
//                                   <option value="TEXTAREA">Long Text</option>
//                                   <option value="NUMBER">Number</option>
//                                   <option value="EMAIL">Email</option>
//                                   <option value="DATE">Date</option>
//                                   <option value="DROPDOWN">Dropdown</option>
//                                   <option value="RADIO">Radio</option>
//                                   <option value="CHECKBOX">Checkbox</option>
//                                 </select>
//                               </div>
//                             </div>

//                             <div className="flex justify-between items-center">
//                               <motion.div
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
//                                   field.required
//                                     ? "bg-violet-100 border-2 border-violet-200"
//                                     : "bg-gray-50 border-2 border-gray-100 hover:border-gray-200"
//                                 }`}
//                                 onClick={() => updateFieldProperty(index, "required", !field.required)}
//                               >
//                                 <div
//                                   className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
//                                     field.required ? "bg-violet-600 border-violet-600" : "border-gray-300"
//                                   }`}
//                                 >
//                                   {field.required && <Check className="w-3 h-3 text-white" />}
//                                 </div>
//                                 <span
//                                   className={`text-xs font-bold uppercase ${field.required ? "text-violet-700" : "text-gray-500"}`}
//                                 >
//                                   Required
//                                 </span>
//                               </motion.div>
//                               <span className="text-xs text-gray-400 italic bg-gray-50 px-3 py-1.5 rounded-full">
//                                 Preview: {field.type}
//                               </span>
//                             </div>

//                             {/* Options Rendering */}
//                             <AnimatePresence>
//                               {["DROPDOWN", "RADIO", "CHECKBOX"].includes(field.type) && field.options && (
//                                 <motion.div
//                                   initial={{ opacity: 0, height: 0 }}
//                                   animate={{ opacity: 1, height: "auto" }}
//                                   exit={{ opacity: 0, height: 0 }}
//                                   className="space-y-3 mt-4 p-4 bg-gradient-to-br from-violet-50/50 to-white rounded-xl border-2 border-violet-100"
//                                 >
//                                   <p className="text-xs font-bold text-violet-600 uppercase tracking-wider">
//                                     Options Management
//                                   </p>
//                                   {field.options.map((opt, optIndex) => (
//                                     <motion.div
//                                       key={optIndex}
//                                       initial={{ opacity: 0, x: -10 }}
//                                       animate={{ opacity: 1, x: 0 }}
//                                       className="flex items-center gap-2"
//                                     >
//                                       <input
//                                         type="text"
//                                         value={opt}
//                                         onChange={(e) => {
//                                           const updatedFields = [...selectedFields]
//                                           updatedFields[index].options[optIndex] = e.target.value
//                                           setSelectedFields(updatedFields)
//                                         }}
//                                         className="flex-1 text-sm bg-white border-2 border-violet-100 rounded-lg px-3 py-2 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-50 transition-all"
//                                       />
//                                       <motion.button
//                                         whileHover={{ scale: 1.1 }}
//                                         whileTap={{ scale: 0.9 }}
//                                         onClick={() => {
//                                           const updatedFields = [...selectedFields]
//                                           updatedFields[index].options = updatedFields[index].options.filter(
//                                             (_, i) => i !== optIndex,
//                                           )
//                                           setSelectedFields(updatedFields)
//                                         }}
//                                         className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
//                                       >
//                                         <X size={14} />
//                                       </motion.button>
//                                     </motion.div>
//                                   ))}
//                                   <button
//                                     onClick={() => {
//                                       const updatedFields = [...selectedFields]
//                                       updatedFields[index].options = [
//                                         ...(updatedFields[index].options || []),
//                                         "New Option",
//                                       ]
//                                       setSelectedFields(updatedFields)
//                                     }}
//                                     className="text-sm font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1 transition-colors"
//                                   >
//                                     <Plus size={14} /> Add Option
//                                   </button>
//                                 </motion.div>
//                               )}
//                             </AnimatePresence>
//                           </motion.div>
//                         ))}
//                       </AnimatePresence>
//                     )}
//                   </div>

//                   {/* Action Buttons */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="mt-6 pt-4 flex flex-col sm:flex-row gap-3 border-t border-gray-100"
//                   >
//                     <motion.button
//                       onClick={editingFormId ? updateForm : createForm}
//                       disabled={loading}
//                       whileHover={{
//                         scale: loading ? 1 : 1.01,
//                         boxShadow: loading ? "none" : "0 15px 30px -10px rgba(124, 58, 237, 0.4)",
//                       }}
//                       whileTap={{ scale: loading ? 1 : 0.99 }}
//                       style={{
//                         backgroundColor: formTheme.buttonColor || "#7c3aed",
//                         borderRadius: formTheme.borderRadius || "16px",
//                       }}
//                       className="flex-1 text-white py-3.5 font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {loading ? (
//                         <>
//                           <motion.div
//                             animate={{ rotate: 360 }}
//                             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                           >
//                             <FaSpinner className="w-5 h-5" />
//                           </motion.div>
//                           Processing...
//                         </>
//                       ) : (
//                         <>
//                           <Sparkles className="w-5 h-5" />
//                           {editingFormId ? "Update Form" : "Publish Form"}
//                         </>
//                       )}
//                     </motion.button>
//                     <motion.button
//                       onClick={() => {
//                         setShowFormBuilder(false)
//                         setSelectedFields([])
//                         setEditingFormId(null)
//                       }}
//                       whileHover={{ scale: 1.01 }}
//                       whileTap={{ scale: 0.99 }}
//                       className="px-8 py-3.5 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all duration-300"
//                     >
//                       Cancel
//                     </motion.button>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </header>

//         {/* List of Forms Grid */}
//         {loading && !showFormBuilder ? (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <motion.div key={i} variants={itemVariants}>
//                 <SkeletonCard />
//               </motion.div>
//             ))}
//           </motion.div>
//         ) : (
//           <motion.div
//             layout
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             <AnimatePresence mode="popLayout">
//               {forms.map((form, index) => (
//                 <motion.div
//                   key={form.formId}
//                   layout
//                   variants={itemVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit={{ opacity: 0, scale: 0.8, y: 20 }}
//                   whileHover="hover"
//                   className="group relative bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 flex flex-col justify-between hover:border-violet-200 transition-all duration-500 overflow-hidden"
//                 >
//                   {/* Gradient Overlay on Hover */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

//                   {/* Top Accent Line */}
//                   <motion.div
//                     initial={{ scaleX: 0 }}
//                     whileHover={{ scaleX: 1 }}
//                     className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 origin-left"
//                   />

//                   <div className="relative z-10">
//                     <div className="flex justify-between items-start mb-4">
//                       <motion.span
//                         whileHover={{ scale: 1.05 }}
//                         className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
//                           form.isPublic
//                             ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200"
//                             : "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 border border-gray-200"
//                         }`}
//                       >
//                         {form.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
//                         {form.isPublic ? "Public" : "Private"}
//                       </motion.span>
//                       <div className="flex gap-1.5">
//                         <motion.button
//                           whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => handleEditClick(form.formId)}
//                           className="p-2.5 rounded-xl text-gray-400 hover:text-violet-600 transition-all"
//                         >
//                           <EditIcon size={16} />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1, backgroundColor: "#fef2f2" }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => setIsDeleting(form)}
//                           className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 transition-all"
//                         >
//                           <Trash2 size={16} />
//                         </motion.button>
//                       </div>
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-violet-700 transition-colors duration-300">
//                       {form.title}
//                     </h3>
//                     <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
//                       {form.description || "No description provided"}
//                     </p>
//                   </div>

//                   <div className="relative z-10 mt-4 pt-4 border-t border-gray-100 flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02, y: -2 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => navigate(`/responses/${form.formId}`)}
//                       className="flex-1 bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 font-semibold py-3 rounded-xl hover:from-violet-100 hover:to-indigo-100 transition-all duration-300 flex items-center justify-center gap-2 border border-violet-100"
//                     >
//                       <Layers className="w-4 h-4" />
//                       Responses
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02, y: -2 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => formview(form.formId)}
//                       className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold py-3 rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20"
//                     >
//                       <Eye className="w-4 h-4" />
//                       View
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         )}
//       </div>

//       {/* Delete Modal */}
//       <AnimatePresence>
//         {isDeleting && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsDeleting(null)}
//               className="absolute inset-0 bg-black/60 backdrop-blur-md"
//             />
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="relative bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full border border-gray-100"
//             >
//               <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
//                 <Trash2 className="w-8 h-8 text-red-500" />
//               </div>
//               <h3 className="text-2xl font-bold mb-2 text-center text-gray-900">Delete Form?</h3>
//               <p className="text-gray-500 mb-8 text-center">
//                 Are you sure you want to delete <span className="font-bold text-gray-900">"{isDeleting.title}"</span>?
//                 This action cannot be undone.
//               </p>
//               <div className="flex gap-3">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setIsDeleting(null)}
//                   className="flex-1 px-6 py-3.5 bg-gray-100 rounded-2xl font-semibold hover:bg-gray-200 transition-all"
//                 >
//                   Cancel
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={confirmDelete}
//                   className="flex-1 px-6 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 transition-all"
//                 >
//                   Delete
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* View Form Modal */}
//       <AnimatePresence>
//         {viewform && viewData && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setviewform(false)}
//               className="absolute inset-0 bg-gray-900/70 backdrop-blur-xl"
//             />

//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 30 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 30 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col border border-gray-100"
//               style={{ fontFamily: `${viewData.theme?.labelFont || "Inter"}, sans-serif` }}
//             >
//               {/* Theme Strip with Gradient */}
//               <div
//                 className="h-2 w-full"
//                 style={{
//                   background: `linear-gradient(90deg, ${viewData.theme?.buttonColor || "#6C3BFF"}, ${viewData.theme?.buttonColor || "#6C3BFF"}88)`,
//                 }}
//               />

//               {/* Header */}
//               <div className="p-6 lg:p-8 flex justify-between items-start border-b border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-3 mb-2 flex-wrap">
//                     <h2
//                       className="text-2xl lg:text-3xl font-bold truncate"
//                       style={{ color: viewData.theme?.labelColor || "#111827" }}
//                     >
//                       {viewData.title}
//                     </h2>
//                     <span className="px-2.5 py-1 bg-violet-100 text-violet-700 text-[10px] font-black uppercase rounded-lg flex-shrink-0">
//                       Preview Mode
//                     </span>
//                   </div>
//                   <p className="text-gray-500 text-sm lg:text-base">
//                     {viewData.description || "No description provided."}
//                   </p>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setviewform(false)}
//                   className="bg-gray-100 hover:bg-red-100 hover:text-red-500 p-2.5 rounded-xl transition-all ml-4 flex-shrink-0"
//                 >
//                   <X size={20} />
//                 </motion.button>
//               </div>

//               {/* Form Preview Area */}
//               <div
//                 className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-5"
//                 style={{ backgroundColor: viewData.theme?.bgColor || "#f9fafb" }}
//               >
//                 <AnimatePresence>
//                   {viewData.formField?.map((field, index) => (
//                     <motion.div
//                       key={field.formFieldId}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                       className="bg-white p-5 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-violet-100 transition-all duration-300"
//                       style={{ borderRadius: viewData.theme?.borderRadius || "12px" }}
//                     >
//                       <label
//                         className="block text-sm font-bold mb-3"
//                         style={{ color: viewData.theme?.labelColor || "#374151" }}
//                       >
//                         {field.label} {field.required && <span className="text-red-500">*</span>}
//                       </label>

//                       <div
//                         className="w-full px-4 py-3.5 border-2 border-dashed border-gray-200 text-gray-400 text-sm flex items-center justify-between"
//                         style={{
//                           backgroundColor: viewData.theme?.inputBgColor || "#ffffff",
//                           borderRadius: `calc(${viewData.theme?.borderRadius || "12px"} / 2)`,
//                         }}
//                       >
//                         <span className="flex items-center gap-2">
//                           <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
//                           Preview for {field.type}
//                         </span>
//                         <ChevronRight className="w-4 h-4" />
//                       </div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>

//               {/* Action Footer */}
//               <div className="p-5 lg:p-6 bg-gradient-to-t from-gray-50 to-white border-t border-gray-100 flex flex-wrap gap-3">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setviewform(false)}
//                   className="px-6 py-3.5 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
//                 >
//                   Close
//                 </motion.button>

//                 <motion.button
//                   whileHover={{ scale: viewData.isPublic ? 1.02 : 1 }}
//                   whileTap={{ scale: viewData.isPublic ? 0.98 : 1 }}
//                   onClick={() => {
//                     if (!viewData.isPublic) {
//                       toast.error("Form is private. Make it public to copy link.")
//                       return
//                     }
//                     const baseUrl = import.meta.env.VITE_URL.replace(/\/$/, "")
//                     const link = `${baseUrl}/public/form/${viewData.slug}`
//                     navigator.clipboard.writeText(link)
//                     toast.success("Link copied!")
//                   }}
//                   className={`flex-1 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
//                     viewData.isPublic
//                       ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 shadow-lg shadow-gray-900/20"
//                       : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   <Send size={18} /> Copy Link
//                 </motion.button>

//                 <motion.button
//                   whileHover={{ scale: viewData.isPublic ? 1.02 : 1 }}
//                   whileTap={{ scale: viewData.isPublic ? 0.98 : 1 }}
//                   onClick={async () => {
//                     if (!viewData.isPublic) {
//                       toast.error("Form is private. Make it public first.")
//                       return
//                     }
//                     const baseUrl = import.meta.env.VITE_URL?.replace(/\/$/, "") || window.location.origin
//                     const formLink = `${baseUrl}/public/form/${viewData.slug}`
//                     const embedCode = `<iframe src="${formLink}" title="${viewData.title}" width="100%" height="700" style="border:none; border-radius:12px;" allow="clipboard-write"></iframe>`

//                     await navigator.clipboard.writeText(embedCode)
//                     toast.success("Embed code copied!")
//                   }}
//                   style={{
//                     background: viewData.isPublic
//                       ? `linear-gradient(135deg, ${viewData.theme?.buttonColor || "#7C3AED"}, ${viewData.theme?.buttonColor || "#7C3AED"}dd)`
//                       : "#E5E7EB",
//                     color: viewData.isPublic ? "white" : "#9CA3AF",
//                   }}
//                   className={`flex-1 py-3.5 rounded-xl font-bold transition-all ${viewData.isPublic ? "shadow-lg hover:brightness-110 active:scale-95" : "cursor-not-allowed"}`}
//                 >
//                   Copy Embed Code
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>


    
//     </div>
//     <Footer/>
//     </>
//   )
// }

// export default Form


import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import toast from "react-hot-toast"
import UserNavbar from "../user/UserNavbar"
import { useFormContext } from "./FormContext"
import {
  EditIcon,
  Trash2,
  X,
  Send,
  Plus,
  Sparkles,
  Layers,
  Eye,
  ChevronRight,
  GripVertical,
  Check,
  Globe,
  Lock,
  ArrowLeft
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import Footer from "../landingPage/Footer"
import Design from "./Design"
import WaveBackground from "../dashboard/WaveBackground"
import { FaSpinner } from "react-icons/fa"
import LoadingScreen from "../shared/LoadingScreen"

// --- Custom Sparkle Icon ---
const SparkleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -5, transition: { duration: 0.3, ease: "easeOut" } },
}

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
}

const Form = () => {
  // masterfield
  const [masterFields, setMasterFields] = useState([])
  const [selectedFields, setSelectedFields] = useState([])
  const [showFormBuilder, setShowFormBuilder] = useState(false)
  const [formTitle, setFormTitle] = useState("Untitled Form")
  const [isAddingMaster, setIsAddingMaster] = useState(false)
  const [newField, setNewField] = useState({ label: "", type: "TEXT", options: [""] })
  const [introloading, setintroLoading] = useState(true);
  
  // formfield
  const { forms, setForms, updateFormLocally, deleteFormLocally, isDarkMode } = useFormContext()
  const [loading, setLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(null)
  const [isPublic, setIsPublic] = useState(true)

  // VIEW FORM STATE
  const [viewform, setviewform] = useState(false)
  const [viewData, setViewData] = useState(null)

  // --- THEME STATE ---
  const [formTheme, setFormTheme] = useState({
    bgColor: "#ffffff",
    buttonColor: "#7c3aed",
    inputBgColor: "#f3f4f6",
    labelFont: "Inter",
    borderRadius: "8px",
  })

  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const URL = import.meta.env.VITE_URL || window.location.origin

  // 1. Fetch Master Fields
  useEffect(() => {
    const getMasterFields = async () => {
      try {
        const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setMasterFields(res.data.data)
      } catch (err) {
        toast.error("Error loading master fields")
      }
      finally {
        setintroLoading(false);
      }
    }
    getMasterFields()
  }, [token])

  // --- UPDATED CREATE LOGIC (Auto-Selects Field) ---
  const handleInlineCreate = async () => {
    if (!newField.label) return toast.error("Label name required")

    try {
      const res = await axios.post(
        "https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields",
        newField,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      toast.success("Field Created & Added!")
      const newFieldData = res.data.data;

      // 1. Update Master List
      setMasterFields((prev) => [...prev, newFieldData])
      
      // 2. AUTOMATICALLY ADD TO CURRENT FORM
      toggleField(newFieldData);

      // Reset
      setNewField({ label: "", type: "TEXT", options: [""] })
      setIsAddingMaster(false)
    } catch (err) {
      toast.error("Failed to add master field")
    }
  }

  // 2. Toggle field selection
  const toggleField = (toggledField) => {
    setSelectedFields((prev) => {
      const exists = prev.find((f) => f.masterFieldId === toggledField.masterFieldId)
      if (exists) {
        return prev.filter((f) => f.masterFieldId !== toggledField.masterFieldId)
      }
      return [...prev, { ...toggledField, required: false }]
    })
  }

  // 3. Update Logic for any field property
  const updateFieldProperty = (index, key, value) => {
    const updatedFields = [...selectedFields]
    updatedFields[index] = { ...updatedFields[index], [key]: value }
    setSelectedFields(updatedFields)
  }

  // 4. Create Form API
  const createForm = async () => {
    if (selectedFields.length === 0) return toast.error("Please select at least one field")
    setLoading(true)
    try {
      const uniqueTitle = formTitle === "Untitled Form" ? `Untitled Form ${Date.now()}` : formTitle
      const payload = {
        title: uniqueTitle,
        description: formdescription,
        isPublic: isPublic,
        theme: formTheme,
        fields: selectedFields.map((field, index) => ({
          label: field.label,
          type: field.type,
          required: field.required,
          order: index,
          masterFieldId: field.masterFieldId || null,
          options: field.options || null,
        })),
      }
      const res = await axios.post("https://formbuilder-saas-backend.onrender.com/api/dashboard/form", payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success("Form Published Successfully!")
      setShowFormBuilder(false)
      setSelectedFields([])
      setForms((prev) => [res.data.data, ...prev])
      setIsPublic(true)
    } catch (err) {
      toast.error("Failed to create form")
    } finally {
      setLoading(false)
    }
  }

  // 5. Fetch All Forms
  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true)
      try {
        const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/forms", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setForms(res.data.data)
      } catch (err) {
        toast.error("Failed to load forms")
      } finally {
        setLoading(false)
      }
    }
    fetchForms()
  }, [token])

  // 6. Delete Form
  const confirmDelete = async () => {
    if (!isDeleting) return
    const idToDelete = isDeleting.formId
    try {
      await axios.delete(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${idToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      deleteFormLocally(idToDelete)
      toast.success("Form deleted successfully")
    } catch (err) {
      toast.error("Delete failed")
    } finally {
      setIsDeleting(null)
    }
  }

  // 7. Edit Handler
  const [editingFormId, setEditingFormId] = useState(null)
  const [formdescription, setformdescription] = useState("")

  const handleEditClick = async (formId) => {
    setLoading(true)
    try {
      const res = await axios.get(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      const data = res.data.data
      setFormTitle(data.title)
      setformdescription(data.description || "")
      setIsPublic(data.isPublic)
      setFormTheme(data.theme || formTheme) // Load theme

      setEditingFormId(formId)

      const mappedFields = data.formField.map((f) => ({
        masterFieldId: f.masterFieldId,
        formFieldId: f.formFieldId,
        label: f.label,
        type: f.type,
        required: f.isRequired,
        options: f.options,
      }))

      setSelectedFields(mappedFields)
      setShowFormBuilder(true)
    } catch (err) {
      toast.error("Failed to load form for editing")
    } finally {
      setLoading(false)
    }
  }

  // 8. Update Form API
  const updateForm = async () => {
    if (selectedFields.length === 0) return toast.error("Please select at least one field")
    setLoading(true)
    try {
      const payload = {
        title: formTitle,
        description: formdescription,
        isPublic: isPublic,
        theme: formTheme,
        fields: selectedFields.map((field, index) => ({
          formFieldId: field.formFieldId || null,
          label: field.label,
          type: field.type,
          required: field.required,
          order: index,
          masterFieldId: field.masterFieldId || null,
          options: field.options || null,
        })),
      }
      const res = await axios.put(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${editingFormId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      toast.success("Form Updated Successfully!")
      setForms((prev) => prev.map((f) => (f.formId === editingFormId ? res.data.data : f)))
      setShowFormBuilder(false)
      setEditingFormId(null)
      setFormTitle("Untitled Form")
      setformdescription("")
      setSelectedFields([])
    } catch (err) {
      toast.error("Failed to update form")
    } finally {
      setLoading(false)
    }
  }

  // 9. View Form Logic
  const formview = async (formId) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setViewData(response.data.data)
      setviewform(true)
    } catch (err) {
      toast.error("Failed to load form details")
    } finally {
      setLoading(false)
    }
  }

  // --- THEME CONFIGURATION ---
  const theme = {
    pageBg: isDarkMode 
      ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
      : "bg-gradient-to-br from-slate-50 via-white to-violet-50/30 text-gray-900 selection:bg-purple-200",
    
    // Cards
    card: isDarkMode
      ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
      : "bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-violet-500/10",

    // Sidebar
    sidebar: isDarkMode
      ? "bg-[#0B0F19]/90 border-r border-purple-500/10"
      : "bg-gradient-to-b from-gray-50/80 to-white/50 border-r border-gray-100/80",

    // Items
    item: isDarkMode
      ? "bg-[#1e1b4b]/40 border-transparent hover:bg-[#1e1b4b] hover:border-purple-500/30"
      : "bg-white/70 border-transparent hover:border-gray-200 hover:bg-white",
    
    itemActive: isDarkMode
      ? "bg-[#8b5cf6]/20 border-purple-500 text-white"
      : "bg-violet-50 border-violet-300",

    // Text
    heading: isDarkMode ? "text-white" : "text-gray-900",
    subtext: isDarkMode ? "text-gray-400" : "text-gray-500",
    label: isDarkMode ? "text-gray-300" : "text-violet-600",

    // Inputs (Builder UI)
    input: isDarkMode
      ? "bg-[#1e1b4b]/50 border-purple-500/20 text-white placeholder-gray-500 focus:border-[#8b5cf6]"
      : "bg-white border-gray-100 text-gray-900 focus:border-violet-400",

    // Buttons
    buttonPrimary: isDarkMode
      ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
      : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25",
  };

  if (introloading) {
    return <LoadingScreen isDarkMode={isDarkMode} />;
  }

  return (
    <>
    <div className={`min-h-screen font-sans relative overflow-x-hidden transition-colors duration-500 ${theme.pageBg}`}>
      <UserNavbar />

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <WaveBackground position="top" height="h-120" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
          <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
      </div>

      <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-10">
          {!showFormBuilder ? (
            /* --- DASHBOARD VIEW --- */
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-white' : 'bg-gradient-to-r from-gray-900 via-violet-800 to-violet-600 bg-clip-text text-transparent'}`}
                >
                  Your Forms
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`${theme.subtext} mt-2`}
                >
                  Create, manage and share your forms
                </motion.p>
              </div>
              <motion.button
                onClick={() => {
                  setShowFormBuilder(true)
                  setSelectedFields([])
                  setEditingFormId(null)
                  setFormTitle("Untitled Form")
                  setformdescription("")
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold flex items-center gap-3 overflow-hidden ${theme.buttonPrimary}`}
              >
                <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
                <span className="relative z-10">Create New Form</span>
                <Sparkles className="w-4 h-4 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          ) : (
            /* --- FORM BUILDER VIEW --- */
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`w-full rounded-[2rem] flex flex-col lg:flex-row gap-0 overflow-hidden ${theme.card}`}
            >
              {/* --- LEFT SIDEBAR: MASTER FIELDS --- */}
              <div className={`w-full lg:w-[380px] py-6 px-5 ${theme.sidebar}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-violet-700'}`}>
                    <Layers className={`w-5 h-5 ${isDarkMode ? 'text-[#8b5cf6]' : 'text-violet-600'}`} />
                    Available Fields
                  </h2>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${isDarkMode ? 'bg-[#1e1b4b] text-purple-300' : 'bg-gray-100 text-gray-400'}`}>
                    {masterFields.length} fields
                  </span>
                </div>

                {/* Field List */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2.5 overflow-y-auto max-h-[40vh] lg:max-h-[50vh] pr-2 custom-scrollbar"
                >
                  {masterFields.map((field, index) => (
                    <motion.label
                      key={field.masterFieldId}
                      variants={itemVariants}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group flex items-center gap-3 py-3 px-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                        selectedFields.some((f) => f.masterFieldId === field.masterFieldId)
                          ? theme.itemActive
                          : theme.item
                      }`}
                    >
                      {/* Checkbox Icon */}
                      <div
                        className={`relative w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                          selectedFields.some((f) => f.masterFieldId === field.masterFieldId)
                            ? "bg-violet-600 border-violet-600"
                            : `border-gray-300 ${isDarkMode ? 'group-hover:border-purple-400' : 'group-hover:border-violet-400'}`
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedFields.some((f) => f.masterFieldId === field.masterFieldId)}
                          onChange={() => toggleField(field)}
                          className="sr-only"
                        />
                        <Check
                          className={`w-3.5 h-3.5 text-white transition-all duration-200 ${
                            selectedFields.some((f) => f.masterFieldId === field.masterFieldId)
                              ? "scale-100 opacity-100"
                              : "scale-0 opacity-0"
                          }`}
                        />
                      </div>
                      
                      {/* Label Text */}
                      <div className="flex-1 min-w-0">
                        <span className={`font-semibold block truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{field.label}</span>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{field.type}</span>
                      </div>
                      <GripVertical className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-gray-500' : 'text-gray-300'}`} />
                    </motion.label>
                  ))}
                </motion.div>

                {/* --- ADD NEW FIELD SECTION --- */}
                <div className="mt-6 space-y-4">
                  <motion.button
                    onClick={() => setIsAddingMaster(!isAddingMaster)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full py-3 px-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${
                      isAddingMaster
                        ? (isDarkMode ? "bg-[#1e1b4b] text-gray-400" : "bg-gray-100 text-gray-600")
                        : theme.buttonPrimary
                    }`}
                  >
                    <motion.div animate={{ rotate: isAddingMaster ? 45 : 0 }} transition={{ duration: 0.2 }}>
                      <Plus className="w-5 h-5" />
                    </motion.div>
                    {isAddingMaster ? "Close" : "Add Input Field"}
                  </motion.button>

                  <AnimatePresence>
                    {isAddingMaster && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className={`p-5 border rounded-2xl shadow-inner space-y-4 ${
                            isDarkMode 
                            ? 'bg-[#0B0F19] border-purple-500/20' 
                            : 'bg-violet-50/50 border-violet-100'
                        }`}>
                          {/* Label Input */}
                          <div className="space-y-2">
                            <label className={`text-[11px] font-bold uppercase tracking-wider ${theme.label}`}>
                              New Label
                            </label>
                            <input
                              className={`w-full border-2 rounded-xl px-4 py-2.5 outline-none text-sm font-medium transition-all duration-200 focus:ring-2 ${theme.input} ${isDarkMode ? 'focus:ring-purple-500/20' : 'focus:ring-violet-100'}`}
                              value={newField.label}
                              onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                              placeholder="Enter label name..."
                            />
                          </div>

                          {/* Type Selection */}
                          <div className="space-y-2">
                            <label className={`text-[11px] font-bold uppercase tracking-wider ${theme.label}`}>
                              Type
                            </label>
                            <select
                              className={`w-full text-sm border-2 rounded-xl px-4 py-2.5 outline-none cursor-pointer font-medium focus:ring-2 transition-all duration-200 appearance-none ${theme.input} ${isDarkMode ? 'focus:ring-purple-500/20' : 'focus:ring-violet-100'}`}
                              value={newField.type}
                              onChange={(e) => {
                                const isSelectionType = ["DROPDOWN", "RADIO", "CHECKBOX"].includes(e.target.value)
                                setNewField({
                                  ...newField,
                                  type: e.target.value,
                                  options: isSelectionType ? [""] : [],
                                })
                              }}
                            >
                              {["TEXT", "NUMBER", "EMAIL", "DATE", "TEXTAREA", "CHECKBOX", "RADIO", "DROPDOWN"].map(
                                (t) => (
                                  <option key={t} value={t} className={isDarkMode ? "bg-[#0B0F19]" : ""}>
                                    {t}
                                  </option>
                                ),
                              )}
                            </select>
                          </div>

                          {/* Dynamic Options Section */}
                          <AnimatePresence>
                            {["DROPDOWN", "RADIO", "CHECKBOX"].includes(newField.type) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`space-y-3 border-2 rounded-xl p-4 ${isDarkMode ? 'border-purple-500/10 bg-[#1e1b4b]/30' : 'border-violet-100 bg-white/50'}`}
                              >
                                <label className={`text-[11px] font-bold uppercase tracking-wider ${theme.label}`}>
                                  Field Options
                                </label>
                                {newField.options.map((opt, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex gap-2"
                                  >
                                    <input
                                      className={`flex-1 border-2 rounded-lg px-3 py-2 text-sm outline-none transition-all ${theme.input}`}
                                      placeholder={`Option ${i + 1}`}
                                      value={opt}
                                      onChange={(e) => {
                                        const newOpts = [...newField.options]
                                        newOpts[i] = e.target.value
                                        setNewField({ ...newField, options: newOpts })
                                      }}
                                    />
                                    {newField.options.length > 1 && (
                                      <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => {
                                          const newOpts = newField.options.filter((_, idx) => idx !== i)
                                          setNewField({ ...newField, options: newOpts })
                                        }}
                                        className="text-red-400 hover:text-red-600 p-2 rounded-lg transition-all"
                                      >
                                        <X size={14} />
                                      </motion.button>
                                    )}
                                  </motion.div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => setNewField({ ...newField, options: [...newField.options, ""] })}
                                  className={`text-sm font-bold flex items-center gap-1 transition-colors ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-violet-600 hover:text-violet-700'}`}
                                >
                                  <Plus size={14} /> Add Option
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Save Button */}
                          <motion.button
                            onClick={handleInlineCreate}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                                isDarkMode 
                                ? 'bg-[#8b5cf6] text-white hover:bg-[#7c3aed]' 
                                : 'bg-violet-600 text-white hover:shadow-lg hover:shadow-violet-500/25'
                            }`}
                          >
                            Save & Add to Form
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* DESIGN COMPONENT INTEGRATION */}
                  <div className="mt-4">
                    <Design
                      editingFormId={editingFormId}
                      token={token}
                      formTheme={formTheme}
                      setFormTheme={setFormTheme}
                    />
                  </div>
                </div>
              </div>

              {/* --- RIGHT SIDE: PREVIEW & EDIT --- */}
              <div
                className={`flex-1 p-6 lg:p-8 flex flex-col transition-all duration-500 min-h-[60vh] ${isDarkMode ? 'bg-[#0B0F19]' : ''}`}
                style={{
                  backgroundColor: !isDarkMode ? (formTheme.bgColor || "#ffffff") : undefined,
                  fontFamily: `${formTheme.labelFont || "Inter"}, sans-serif`,
                }}
              >
                <div className="w-full flex flex-col h-full">
                  {/* Top Bar: Back Button inside Builder */}
                  <div className="flex justify-between items-center mb-6">
                     <button 
                       onClick={() => setShowFormBuilder(false)}
                       className={`flex items-center gap-2 text-sm font-bold transition-opacity ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black opacity-50 hover:opacity-100'}`}
                     >
                       <ArrowLeft size={16} /> Back to Dashboard
                     </button>
                     <div className="flex gap-2">
                        {/* Publish / Update Button */}
                        <motion.button
                            onClick={editingFormId ? updateForm : createForm}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2"
                            style={{ backgroundColor: isDarkMode ? '#8b5cf6' : (formTheme.buttonColor || '#000') }}
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : (editingFormId ? "Update Form" : "Publish Form")}
                            {!loading && <Send size={16} />}
                        </motion.button>
                     </div>
                  </div>

                  {/* Form Title & Description */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 space-y-4"
                  >
                    <div className={`group flex items-center gap-3 border-b-2 pb-2 transition-all duration-300 ${
                        isDarkMode 
                        ? 'border-transparent hover:border-purple-500/50 focus-within:border-purple-500' 
                        : 'border-transparent hover:border-gray-200 focus-within:border-violet-300'
                    }`}>
                      <input
                        value={formTitle || ""}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="Enter Form Title..."
                        style={{ color: !isDarkMode ? (formTheme.labelColor || "#111827") : undefined }}
                        className={`text-2xl lg:text-3xl font-bold w-full focus:outline-none bg-transparent placeholder:opacity-50 ${isDarkMode ? 'text-white placeholder-gray-600' : ''}`}
                      />
                      <EditIcon size={18} className={`opacity-20 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-purple-400' : 'text-gray-400'}`} />
                    </div>
                    <div className={`group flex items-center gap-3 border-b-2 pb-2 transition-all duration-300 ${
                        isDarkMode 
                        ? 'border-transparent hover:border-purple-500/50 focus-within:border-purple-500' 
                        : 'border-transparent hover:border-gray-200 focus-within:border-violet-300'
                    }`}>
                      <input
                        value={formdescription}
                        onChange={(e) => setformdescription(e.target.value)}
                        placeholder="Add a description for your form..."
                        style={{ color: !isDarkMode ? (formTheme.labelColor || "#4b5563") : undefined }}
                        className={`text-sm lg:text-base w-full focus:outline-none bg-transparent placeholder:opacity-50 ${isDarkMode ? 'text-gray-400 placeholder-gray-700' : ''}`}
                      />
                      <EditIcon size={14} className={`opacity-20 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-purple-400' : 'text-gray-400'}`} />
                    </div>
                  </motion.div>

                  {/* Visibility Toggle */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-4 items-center mb-6"
                  >
                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 cursor-pointer px-4 py-2.5 rounded-xl border-2 transition-all duration-300 ${
                        isPublic
                          ? (isDarkMode ? "border-green-500/30 bg-green-500/10" : "border-green-300 bg-green-50 shadow-md")
                          : (isDarkMode ? "border-gray-700 bg-[#12121a]" : "border-gray-200 bg-white/50")
                      }`}
                    >
                      <input
                        type="radio"
                        name="visibility"
                        checked={isPublic === true}
                        onChange={() => setIsPublic(true)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isPublic ? "border-green-500 bg-green-500" : "border-gray-300"}`}>
                        {isPublic && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <Globe className={`w-4 h-4 ${isPublic ? "text-green-600" : "text-gray-400"}`} />
                      <span className={`font-semibold text-sm ${isPublic ? (isDarkMode ? "text-green-400" : "text-green-700") : "text-gray-500"}`}>Public</span>
                    </motion.label>

                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 cursor-pointer px-4 py-2.5 rounded-xl border-2 transition-all duration-300 ${
                        !isPublic
                          ? (isDarkMode ? "border-amber-500/30 bg-amber-500/10" : "border-amber-300 bg-amber-50 shadow-md")
                          : (isDarkMode ? "border-gray-700 bg-[#12121a]" : "border-gray-200 bg-white/50")
                      }`}
                    >
                      <input
                        type="radio"
                        name="visibility"
                        checked={isPublic === false}
                        onChange={() => setIsPublic(false)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${!isPublic ? "border-amber-500 bg-amber-500" : "border-gray-300"}`}>
                        {!isPublic && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <Lock className={`w-4 h-4 ${!isPublic ? "text-amber-600" : "text-gray-400"}`} />
                      <span className={`font-semibold text-sm ${!isPublic ? (isDarkMode ? "text-amber-400" : "text-amber-700") : "text-gray-500"}`}>Private</span>
                    </motion.label>
                  </motion.div>

                  {/* Form Fields Canvas */}
                  {/* Fields Area */}
                  <div className="flex flex-col space-y-4 flex-1 overflow-y-auto max-h-[45vh] pr-2 custom-scrollbar">
                    {selectedFields.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`h-64 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center ${
                            isDarkMode 
                            ? 'border-purple-500/20 bg-[#1e1b4b]/20 text-gray-500' 
                            : 'border-gray-200 bg-gradient-to-br from-gray-50/50 to-white text-gray-400'
                        }`}
                      >
                        <motion.div
                          animate={pulseAnimation}
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${isDarkMode ? 'bg-[#1e1b4b]' : 'bg-violet-100'}`}
                        >
                          <Layers className={`w-8 h-8 ${isDarkMode ? 'text-[#8b5cf6]' : 'text-violet-400'}`} />
                        </motion.div>
                        <p className="font-medium">Select fields from the left to start building</p>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>Drag and drop to reorder</p>
                      </motion.div>
                    ) : (
                      <AnimatePresence mode="popLayout">
                        {selectedFields.map((field, index) => (
                          <motion.div
                            key={field.masterFieldId || index}
                            layout
                            initial={{ opacity: 0, x: 30, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -30, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -2 }}
                            className={`group p-5 lg:p-6 rounded-2xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 ${
                                isDarkMode 
                                ? 'bg-[#12121a] border-purple-500/20 hover:border-purple-500/50' 
                                : 'bg-white border-gray-100 hover:border-violet-200'
                            }`}
                            style={{
                              borderRadius: formTheme.borderRadius || "16px",
                            }}
                          >
                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                              {/* Label Update */}
                              <div className="flex-1">
                                <label
                                  className={`text-xs font-bold uppercase ml-1 mb-2 block tracking-wider ${isDarkMode ? 'text-gray-400' : ''}`}
                                  style={{ color: !isDarkMode ? (formTheme.labelColor || "#9ca3af") : undefined }}
                                >
                                  Field Label
                                </label>
                                <input
                                  type="text"
                                  value={field.label}
                                  onChange={(e) => updateFieldProperty(index, "label", e.target.value)}
                                  className={`w-full border-2 p-3 text-sm font-semibold outline-none transition-all duration-200 ${theme.input} rounded-xl`}
                                  style={{
                                    borderRadius: `calc(${formTheme.borderRadius} / 2)` || "8px",
                                  }}
                                />
                              </div>

                              {/* Type Update */}
                              <div className="w-full sm:w-1/3">
                                <label className={`text-xs font-bold uppercase ml-1 mb-2 block tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                                  Field Type
                                </label>
                                <select
                                  value={field.type}
                                  onChange={(e) => updateFieldProperty(index, "type", e.target.value)}
                                  className={`w-full border-2 p-3 rounded-xl text-sm font-semibold outline-none transition-all duration-200 cursor-pointer appearance-none ${theme.input}`}
                                  style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 12px center",
                                    backgroundSize: "20px",
                                  }}
                                >
                                  {["TEXT", "NUMBER", "EMAIL", "DATE", "TEXTAREA", "CHECKBOX", "RADIO", "DROPDOWN"].map(t => (
                                      <option key={t} value={t} className={isDarkMode ? 'bg-[#0B0F19]' : ''}>{t}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="flex justify-between items-center">
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                                  field.required
                                    ? (isDarkMode ? "bg-purple-900/30 border-2 border-purple-500" : "bg-violet-100 border-2 border-violet-200")
                                    : (isDarkMode ? "bg-[#1e1b4b]/50 border-2 border-purple-500/20" : "bg-gray-50 border-2 border-gray-100 hover:border-gray-200")
                                }`}
                                onClick={() => updateFieldProperty(index, "required", !field.required)}
                              >
                                <div
                                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                                    field.required 
                                    ? (isDarkMode ? "bg-[#8b5cf6] border-[#8b5cf6]" : "bg-violet-600 border-violet-600")
                                    : (isDarkMode ? "border-gray-600" : "border-gray-300")
                                  }`}
                                >
                                  {field.required && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span
                                  className={`text-xs font-bold uppercase ${
                                      field.required 
                                      ? (isDarkMode ? "text-purple-300" : "text-violet-700") 
                                      : (isDarkMode ? "text-gray-400" : "text-gray-500")
                                  }`}
                                >
                                  Required
                                </span>
                              </motion.div>
                              <span className={`text-xs italic px-3 py-1.5 rounded-full ${isDarkMode ? 'text-gray-500 bg-[#1e1b4b]' : 'text-gray-400 bg-gray-50'}`}>
                                Preview: {field.type}
                              </span>
                            </div>

                            {/* Options Rendering */}
                            <AnimatePresence>
                              {["DROPDOWN", "RADIO", "CHECKBOX"].includes(field.type) && field.options && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className={`space-y-3 mt-4 p-4 rounded-xl border-2 ${
                                      isDarkMode 
                                      ? 'bg-[#1e1b4b]/30 border-purple-500/10' 
                                      : 'bg-gradient-to-br from-violet-50/50 to-white border-violet-100'
                                  }`}
                                >
                                  <p className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-purple-400' : 'text-violet-600'}`}>
                                    Options Management
                                  </p>
                                  {field.options.map((opt, optIndex) => (
                                    <motion.div
                                      key={optIndex}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="flex items-center gap-2"
                                    >
                                      <input
                                        type="text"
                                        value={opt}
                                        onChange={(e) => {
                                          const updatedFields = [...selectedFields]
                                          updatedFields[index].options[optIndex] = e.target.value
                                          setSelectedFields(updatedFields)
                                        }}
                                        className={`flex-1 text-sm border-2 rounded-lg px-3 py-2 outline-none transition-all ${theme.input} ${isDarkMode ? 'focus:border-purple-500' : 'focus:border-violet-400 border-violet-100'}`}
                                      />
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => {
                                          const updatedFields = [...selectedFields]
                                          updatedFields[index].options = updatedFields[index].options.filter(
                                            (_, i) => i !== optIndex,
                                          )
                                          setSelectedFields(updatedFields)
                                        }}
                                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                                      >
                                        <X size={14} />
                                      </motion.button>
                                    </motion.div>
                                  ))}
                                  <button
                                    onClick={() => {
                                      const updatedFields = [...selectedFields]
                                      updatedFields[index].options = [
                                        ...(updatedFields[index].options || []),
                                        "New Option",
                                      ]
                                      setSelectedFields(updatedFields)
                                    }}
                                    className={`text-sm font-bold flex items-center gap-1 transition-colors ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-violet-600 hover:text-violet-700'}`}
                                  >
                                    <Plus size={14} /> Add Option
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </header>

        {/* Existing Forms List (Only visible when builder is closed) */}
        {!showFormBuilder && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {forms.length === 0 && !loading ? (
                    <div className="col-span-full text-center py-20">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                            <Layers className={`w-10 h-10 ${isDarkMode ? 'text-slate-600' : 'text-gray-300'}`} />
                        </div>
                        <p className={theme.subtext}>No forms created yet.</p>
                    </div>
                ) : (
                    forms.map((form) => (
                        <motion.div
                            key={form.formId}
                            variants={cardHoverVariants}
                            initial="rest"
                            whileHover="hover"
                            className={`rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between h-[280px] ${
                                isDarkMode 
                                ? 'bg-[#12121a]/60 border-purple-500/20 hover:border-purple-500/50 shadow-lg' 
                                : 'bg-white border-gray-100 hover:border-violet-200 shadow-xl shadow-gray-200/50'
                            }`}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-purple-900/30' : 'bg-violet-50'}`}>
                                        <Layers className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-violet-600'}`} />
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        form.isPublic 
                                        ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700')
                                        : (isDarkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700')
                                    }`}>
                                        {form.isPublic ? "Public" : "Private"}
                                    </div>
                                </div>
                                <h3 className={`text-xl font-bold mb-2 line-clamp-1 ${theme.heading}`}>{form.title}</h3>
                                <p className={`text-sm line-clamp-2 ${theme.subtext}`}>
                                    {form.description || "No description provided."}
                                </p>
                            </div>

                            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100/10">
                                <button 
                                    onClick={() => handleEditClick(form.formId)}
                                    className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                                        isDarkMode 
                                        ? 'bg-white/10 text-white hover:bg-white/20' 
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => {
                                        setIsDeleting(form);
                                        toast((t) => (
                                            <div className="flex flex-col gap-2">
                                                <p className="font-semibold text-gray-800">Delete this form?</p>
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => { confirmDelete(); toast.dismiss(t.id); }}
                                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                                    >
                                                        Yes, delete
                                                    </button>
                                                    <button 
                                                        onClick={() => toast.dismiss(t.id)}
                                                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ));
                                    }}
                                    className={`p-2.5 rounded-xl transition-all ${
                                        isDarkMode 
                                        ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' 
                                        : 'bg-red-50 text-red-500 hover:bg-red-100'
                                    }`}
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button 
                                    onClick={() => window.open(`${URL}/public/form/${form.slug}`, "_blank")}
                                    className={`p-2.5 rounded-xl transition-all ${
                                        isDarkMode 
                                        ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20' 
                                        : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
                                    }`}
                                >
                                    <Eye size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        )}
      </div>

      {/* View Form Modal */}
      <AnimatePresence>
        {viewform && viewData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setviewform(false)}
              className="absolute inset-0 bg-gray-900/70 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col border border-gray-100"
              style={{ fontFamily: `${viewData.theme?.labelFont || "Inter"}, sans-serif` }}
            >
              {/* Theme Strip */}
              <div
                className="h-2 w-full"
                style={{
                  background: `linear-gradient(90deg, ${viewData.theme?.buttonColor || "#6C3BFF"}, ${viewData.theme?.buttonColor || "#6C3BFF"}88)`,
                }}
              />

              {/* Header */}
              <div className="p-6 lg:p-8 flex justify-between items-start border-b border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2
                      className="text-2xl lg:text-3xl font-bold truncate"
                      style={{ color: viewData.theme?.labelColor || "#111827" }}
                    >
                      {viewData.title}
                    </h2>
                    <span className="px-2.5 py-1 bg-violet-100 text-violet-700 text-[10px] font-black uppercase rounded-lg flex-shrink-0">
                      Preview Mode
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm lg:text-base">
                    {viewData.description || "No description provided."}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setviewform(false)}
                  className="bg-gray-100 hover:bg-red-100 hover:text-red-500 p-2.5 rounded-xl transition-all ml-4 flex-shrink-0"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Form Preview Area */}
              <div
                className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-5"
                style={{ backgroundColor: viewData.theme?.bgColor || "#f9fafb" }}
              >
                <AnimatePresence>
                  {viewData.formField?.map((field, index) => (
                    <motion.div
                      key={field.formFieldId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white p-5 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-violet-100 transition-all duration-300"
                      style={{ borderRadius: viewData.theme?.borderRadius || "12px" }}
                    >
                      <label
                        className="block text-sm font-bold mb-3"
                        style={{ color: viewData.theme?.labelColor || "#374151" }}
                      >
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>

                      <div
                        className="w-full px-4 py-3.5 border-2 border-dashed border-gray-200 text-gray-400 text-sm flex items-center justify-between"
                        style={{
                          backgroundColor: viewData.theme?.inputBgColor || "#ffffff",
                          borderRadius: `calc(${viewData.theme?.borderRadius || "12px"} / 2)`,
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                          Preview for {field.type}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Action Footer */}
              <div className="p-5 lg:p-6 bg-gradient-to-t from-gray-50 to-white border-t border-gray-100 flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setviewform(false)}
                  className="px-6 py-3.5 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Close
                </motion.button>

                <motion.button
                  whileHover={{ scale: viewData.isPublic ? 1.02 : 1 }}
                  whileTap={{ scale: viewData.isPublic ? 0.98 : 1 }}
                  onClick={() => {
                    if (!viewData.isPublic) {
                      toast.error("Form is private. Make it public to copy link.")
                      return
                    }
                    const link = `${URL}/public/form/${viewData.slug}`
                    navigator.clipboard.writeText(link)
                    toast.success("Link copied!")
                  }}
                  className={`flex-1 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    viewData.isPublic
                      ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 shadow-lg shadow-gray-900/20"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send size={18} /> Copy Link
                </motion.button>

                <motion.button
                  whileHover={{ scale: viewData.isPublic ? 1.02 : 1 }}
                  whileTap={{ scale: viewData.isPublic ? 0.98 : 1 }}
                  onClick={async () => {
                    if (!viewData.isPublic) {
                      toast.error("Form is private. Make it public first.")
                      return
                    }
                    const formLink = `${URL}/public/form/${viewData.slug}`
                    const embedCode = `<iframe src="${formLink}" title="${viewData.title}" width="100%" height="700" style="border:none; border-radius:12px;" allow="clipboard-write"></iframe>`

                    await navigator.clipboard.writeText(embedCode)
                    toast.success("Embed code copied!")
                  }}
                  style={{
                    background: viewData.isPublic
                      ? `linear-gradient(135deg, ${viewData.theme?.buttonColor || "#7C3AED"}, ${viewData.theme?.buttonColor || "#7C3AED"}dd)`
                      : "#E5E7EB",
                    color: viewData.isPublic ? "white" : "#9CA3AF",
                  }}
                  className={`flex-1 py-3.5 rounded-xl font-bold transition-all ${viewData.isPublic ? "shadow-lg hover:brightness-110 active:scale-95" : "cursor-not-allowed"}`}
                >
                  Copy Embed Code
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
    <Footer />
    </>
  )
}

export default Form