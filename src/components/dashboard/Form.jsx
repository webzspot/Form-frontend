// import { useEffect, useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import axios from "axios"
// import toast from "react-hot-toast"
// import UserNavbar from "../user/UserNavbar"
// import { useFormContext } from "./FormContext"
// import {
//   EditIcon,Trash2,X,Send,Plus,Sparkles,Layers,Eye,
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
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import Footer from "../landingPage/Footer"
import Design from "./Design"
import WaveBackground from "../dashboard/WaveBackground"
import { FaSpinner } from "react-icons/fa"
import LoadingScreen from "../shared/LoadingScreen"


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
  const { forms, setForms, updateFormLocally, deleteFormLocally } = useFormContext()
  const [loading, setLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(null)
  const [isPublic, setIsPublic] = useState(true)
  const { isDarkMode } = useFormContext(); 

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

  const theme = {
    pageBg: isDarkMode 
      ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
      : "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95] selection:bg-purple-200",
    
    card: isDarkMode
      ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
      : "bg-white backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",

    input: isDarkMode
      ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
      : "bg-white/50 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",

    buttonPrimary: isDarkMode
      ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
      : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",

    textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/40",
    label: isDarkMode ? "text-gray-300" : "text-[#4c1d95]",
    
    previewBox: isDarkMode 
      ? "bg-[#1e1b4b]/40 border-purple-500/10" 
      : "bg-purple-50/50 border-purple-200/50",
    
    divider: isDarkMode ? "bg-purple-500/20" : "bg-purple-200"
  };

  const URL = import.meta.env.VITE_URL
  const navi = useNavigate()

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

      toast.success("Field Created!")
      setMasterFields((prev) => [...prev, res.data.data])
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

  // 3. Update Logic for any field property (Label, Type, etc.)
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

  // 7. Edit Handler (Load data into builder)
  const [editingFormId, setEditingFormId] = useState(null)
  const [formdescription, setformdescription] = useState("")

  const handleEditClick = async (formId) => {
    setLoading(true)
    try {
      const res = await axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      const data = res.data.data
      setFormTitle(data.title)
      setformdescription(data.description || "")
      setIsPublic(data.isPublic)

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
      const res = await axios.put(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${editingFormId}`,
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

  // VIEW FORM STATE
  const [viewform, setviewform] = useState(false)
  const [viewData, setViewData] = useState(null)

  const formview = async (formId) => {
    setLoading(true)
    try {
      const response = await axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`,
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

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 w-20 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full" />
        <div className="flex gap-2">
          <div className="h-9 w-9 bg-gray-100 rounded-xl" />
          <div className="h-9 w-9 bg-gray-100 rounded-xl" />
        </div>
      </div>
      <div className="h-7 w-3/4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg mb-3" />
      <div className="h-4 w-full bg-gray-100 rounded mb-2" />
      <div className="h-4 w-2/3 bg-gray-100 rounded mb-6" />
      <div className="pt-4 border-t border-gray-50 flex gap-3">
        <div className="flex-1 h-11 bg-gray-100 rounded-2xl" />
        <div className="flex-1 h-11 bg-gray-100 rounded-2xl" />
      </div>
    </div>
  )


    if (loading) {
    return <LoadingScreen isDarkMode={isDarkMode} />;
  }
  return (
    <>
    <div className={`min-h-screen relative  ${theme.pageBg}`}>
      <UserNavbar />
      <WaveBackground position="top" height="h-120" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
     
    <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
  

      <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-10">
          {!showFormBuilder ? (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${theme.card} rounded-3xl flex justify-between items-center gap-4`}
            >
              <div className={` w-full px-6 py-9 rounded-3xl`}>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                 className={`sm:text-3xl font-bold  ${theme.text}`}
                >
                  Your Forms
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`${theme.textSub} text-[12px] sm:text-lg mt-1`}
 
                >
                  Create Manage Share Store your Forms
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
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -15px rgba(124, 58, 237, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className={`group relative ${theme.buttonPrimary} text-[10px]  w-30 sm:w-50 text-center  mr-4 px-3 py-1 rounded shadow-lg shadow-violet-500/25 font-semibold flex items-center overflow-hidden`}
              >
                <span className="absolute inset  opacity-0 group-hover:opacity-100  transition-opacity duration-300" />
                <span className="relative  z-10 text-[10px] sm:text-lg">Create New Form</span>
               
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
             className={`w-full backdrop-blur-xl rounded shadow-2xl flex flex-col lg:flex-row overflow-hidden
  ${theme.card}
`}
            >
              {/* Left Side: Master Fields */}
              <div  className={`w-full lg:w-[380px] py-6 px-5 border-r
    ${isDarkMode
      ? "bg-[#0b0e17] border-white/10"
      : "bg-gradient-to-b from-gray-50/80 to-white/50 border-gray-100"}
  `}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`sm:text-lg text-sm ${theme.text} font-bold  flex items-center gap-2`}>
                    <Layers className={`w-5 h-5 ${theme.text}`} />
                    Available Fields
                  </h2>
                  <span 
                  className={`text-xs ${theme.buttonPrimary} font-medium px-2.5 py-1 rounded-full`}>
                    {masterFields.length} fields
                  </span>
                </div>

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
                       className={`group flex items-center gap-3 sm:py-3 sm:px-4 px-2 py-2 text-[11px] sm:text-[14px] rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
    selectedFields.some((f) => f.masterFieldId === field.masterFieldId)
      ? "bg-violet-50 border-violet-300 shadow-md shadow-violet-100"
      : "bg-white/70 border-transparent hover:border-gray-200 hover:bg-white shadow-sm hover:shadow-md"
  }`}
                    >
                      <div
                       className={`relative w-5 h-5  rounded-lg border-2 flex items-center justify-center transition-all duration-300
  ${
    selectedFields.some((f) => f.masterFieldId === field.masterFieldId)
      ? "bg-violet-600 border-violet-600"
      : isDarkMode
        ? "border-gray-900"
        : "border-gray-300"
  }
`}
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
                      <div className="flex-1 min-w-0">
                        <span className={`font-semibold block  ${
    isDarkMode ? "text-gray-600" : "text-gray-800"
  }`}>{field.label}</span>
                        <span className="text-xs text-gray-600">{field.type}</span>
                      </div>
                      <GripVertical className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.label>
                  ))}
                </motion.div>

                <div className="mt-6 space-y-4">
                  <motion.button
                    onClick={() => setIsAddingMaster(!isAddingMaster)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full sm:py-3 px-4 py-1 text-[13px] sm:text-[16px] rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${
                      isAddingMaster
                        ? `${theme.buttonsecondary}`
                        : `${theme.buttonPrimary}`
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
                        <div className={`p-5 ${theme.card} rounded-2xl shadow-inner space-y-4`}>
                          {/* Label Input */}
                          <div className="space-y-2">
                            <label className={`block text-[12px] font-bold ${theme.text}`}>
                              New Label
                            </label>
                            <input
                             className={`w-full border-2 rounded-xl  text-[12px] sm:text-sm px-4 sm:py-2.5 py-1 outline-none text-sm font-medium transition-all ${theme.input}`}
                              value={newField.label}
                              onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                              placeholder="Enter label name..."
                            />
                          </div>

                          {/* Type Selection */}
                          <div className="space-y-2">
                            <label className={`block text-[12px] font-bold ${theme.text}`}>
                              Type
                            </label>
                            <select
                              className={`w-full border-2 rounded-xl text-[12px] sm:text-sm px-4 sm:py-2.5 py-1 outline-none text-sm font-medium cursor-pointer appearance-none ${theme.input}`}
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 12px center",
                                backgroundSize: "20px",
                              }}
                              value={newField.type}
                              onChange={(e) => {
                                const isSelectionType = ["DROPDOWN", "RADIO", "CHECKBOX"].includes(e.target.value)
                                setNewField({
                                  ...newField,
                                  type: e.target.value,
                                  options: isSelectionType ? [""] : [],
                                })}}>
                              {["TEXT", "NUMBER", "EMAIL", "DATE", "TEXTAREA", "CHECKBOX", "RADIO", "DROPDOWN"].map(
                                (t) => (
                                  <option key={t} value={t}>
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
                                className={`space-y-3 rounded-xl p-4 ${theme.card}`}
                              >
                                <label className={`block text-[12px] ${theme.text} font-bold`}>
                                  Field Options
                                </label>
                                {newField.options.map((opt, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex gap-2">
                                    <input
                                      className={`flex-1 border-2 rounded-lg px-1 py-1 text-[10px] sm:text-sm outline-none transition-all ${theme.input}`}
                                      placeholder={`Option ${i + 1}`}
                                      value={opt}
                                      onChange={(e) => {
                                        const newOpts = [...newField.options]
                                        newOpts[i] = e.target.value
                                        setNewField({ ...newField, options: newOpts })}}/>
                                    {newField.options.length > 1 && (
                                      <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => {
                                          const newOpts = newField.options.filter((_, idx) => idx !== i)
                                          setNewField({ ...newField, options: newOpts })
                                        }}
                                        className={`p-2 ${theme.text} rounded-lg transition-all`}
                                      >
                                        <X size={14} />
                                      </motion.button>
                                    )}
                                  </motion.div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => setNewField({ ...newField, options: [...newField.options, ""] })}
                                  className={`sm:text-sm text-[10px] font-bold ${theme.text} flex items-center gap-1 transition-colors`}
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
                            className={`w-full sm:py-3 py-1 rounded-xl  text-sm ${theme.buttonPrimary} font-bold hover:shadow-lg hover:shadow-violet-900/25 transition-all duration-300`}>
                            Save Input Field
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
                        isDarkMode={isDarkMode}
                    />
                  </div>
                </div>
              </div>

              {/* Right Side: Preview & Edit */}
              <div
                className="flex-1 p-6 lg:p-8 flex flex-col transition-all duration-500 min-h-[60vh]"
                 style={{
    backgroundColor: formTheme.bgColor || "#ffffff",
  // fontFamily: `${formTheme.labelFont || "Inter"}, sans-serif`
  }} >
                <div className="w-full flex flex-col h-full">
                  {/* Form Title & Description */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="sm:mb-8 sm:space-y-4"
                  >
                    <div className="group flex items-center gap-3 border-b-2  border-transparent hover:border-violet-100 focus-within:border-violet-300 pb-2 transition-all duration-300">
<input
  value={formTitle || ""}
  onChange={(e) => setFormTitle(e.target.value)}
  placeholder="Enter Form Title..."
  style={{
    color: formTheme.labelColor|| "#111827"
    
  }}
  className="sm:text-2xl text-lg lg:text-3xl font-semibold w-full focus:outline-none bg-transparent placeholder:text-gray-300"
/>
                      <EditIcon
                        size={18}
                        className="text-gray-300 group-hover:text-violet-400 transition-colors "
                      />
                    </div>
                    <div className="group flex items-center gap-3 border-b-2 border-transparent hover:border-violet-100 focus-within:border-violet-300 pb-2 transition-all duration-300">
                      <input
  value={formdescription}
  onChange={(e) => setformdescription(e.target.value)}
  placeholder="Add a description for your form..."
   style={{
    color: formTheme.labelColor || "#6b7280",
  }}
  className="sm:text-sm lg:text-base text-[10px] w-full focus:outline-none bg-transparent placeholder:text-gray-300"
/>
                      <EditIcon
                        size={14}
                        className="text-gray-300 group-hover:text-violet-400 transition-colors "
                      />
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
                      className={`flex items-center gap-3 cursor-pointer sm:px-4 px-1 sm:py-2.5 py-1 text-[10px] sm:text-sm rounded-xl border-2 transition-all duration-300 ${
                        isPublic
                          ? "border-violet-600 bg-violet-600 shadow-md "
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="visibility"
                        checked={isPublic === true}
                        onChange={() => setIsPublic(true)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isPublic ? "border-white/60 bg-violet-800" : "border-gray-300"
                        }`}
                      >
                        {isPublic && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <Globe className={`w-4 h-4 ${isPublic ?`${theme.text}` : "text-gray-400"}`} />
                      <span className={`font-semibold text-sm ${isPublic ?`${theme.text}` : "text-gray-500"}`}>
                        Public
                      </span>
                    </motion.label>

                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 cursor-pointer sm:px-4 px-1 sm:py-2.5 py-1 text-[10px] sm:text-sm  rounded-xl border-2 transition-all duration-300 ${
                        !isPublic
                          ? "border-violet-100 bg-violet-300 shadow-md shadow-violet-100"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="visibility"
                        checked={isPublic === false}
                        onChange={() => setIsPublic(false)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          !isPublic ? "border-white" : "border-gray-300"
                        }`}
                      >
                        {!isPublic && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <Lock className={`w-4 h-4 ${!isPublic ? "text-white" : "text-gray-400"}`} />
                      <span className={`font-semibold text-sm ${!isPublic ? "text-white" : "text-gray-500"}`}>
                        Private
                      </span>
                    </motion.label>
                  </motion.div>

                  {/* Fields Area */}
                  <div className="flex flex-col space-y-4 flex-1 overflow-y-auto max-h-[45vh] pr-2 custom-scrollbar">
                    {selectedFields.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-64 border-2 border-dashed border-gray-200 text-center rounded-3xl flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50/50 to-white"
                      >
                        <motion.div
                          animate={pulseAnimation}
                          className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mb-4"
                        >
                          <Layers className="w-8 h-8 text-violet-800" />
                        </motion.div>
                        <p className="font-medium">Select fields from the left to start building</p>
                        <p className="text-sm text-gray-300 mt-1">Drag and drop to reorder</p>
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
                            className="group bg-white p-5 lg:p-6 rounded-2xl border-2 border-gray-100 hover:border-violet-200 shadow-sm hover:shadow-lg transition-all duration-300"
                            style={{ borderRadius: `calc(${formTheme.borderRadius || 16}px / 2)` }}
                          >
                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                              {/* Label Update */}
                              <div className="flex-1">
                                <label
                                  className="text-xs uppercase font-bold ml-1 mb-2 block "
                                 style={{
  color:
    formTheme.labelColor && formTheme.labelColor !== "#ffffff"
      ? formTheme.labelColor
      : "#6b7280", 
}}
                                >
                                  Field Label
                                </label>
                                <input
                                  type="text"
                                  value={field.label}
                                  onChange={(e) => updateFieldProperty(index, "label", e.target.value)}
                                  style={{
  backgroundColor: formTheme.inputBgColor || "#f9fafb",
  borderRadius: `calc(${formTheme.borderRadius || 16}px / 2)`,
  color: formTheme.labelColor
    ? formTheme.labelColor
    : "#111827", 
}}
 className={`w-full border-2 sm:px-3 sm:py-3 px-2 py-1 rounded-lg text-sm font-semibold outline-none transition-all
  ${theme.input}
`}/></div>
{/* Type Update */}
                              <div className="w-full sm:w-1/3">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block ">
                                  Field Type
                                </label>
                                <select
                                  value={field.type}
                                  onChange={(e) => updateFieldProperty(index, "type", e.target.value)}
                                  className={`w-full border-2 sm:px-3 sm:py-3 px-3 py-1 rounded-xl text-sm font-semibold outline-none cursor-pointer appearance-none
  ${theme.input}
`}
                                  style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 12px center",
                                    backgroundSize: "20px",
                                  }}
                                >
                                  <option value="TEXT">Short Text</option>
                                  <option value="TEXTAREA">Long Text</option>
                                  <option value="NUMBER">Number</option>
                                  <option value="EMAIL">Email</option>
                                  <option value="DATE">Date</option>
                                  <option value="DROPDOWN">Dropdown</option>
                                  <option value="RADIO">Radio</option>
                                  <option value="CHECKBOX">Checkbox</option>
                                </select>
                              </div>
                            </div>

                            <div className="flex justify-between items-center">
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                                  field.required
                                    ? "bg-violet-100 border-2 border-violet-200"
                                    : "bg-gray-50 border-2 border-gray-100 hover:border-gray-200"
                                }`}
                                onClick={() => updateFieldProperty(index, "required", !field.required)}
                              >
                                <div
                                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                                    field.required ? "bg-violet-600 border-violet-600" : "border-gray-300"
                                  }`}
                                >
                                  {field.required && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span
                                  className={`text-[10px] sm:text-sm font-bold uppercase ${field.required ? "text-violet-700" : "text-gray-500"}`}
                                >
                                  Required
                                </span>
                              </motion.div>
                              <span className="sm:text-xs text-[10px] text-gray-400 italic bg-gray-50 px-3 py-1.5 rounded-full">
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
                                  className="space-y-3 mt-4 p-4 bg-gradient-to-br from-violet-50/50 to-white rounded-xl border-2 border-violet-100"
                                >
                                  <p className="sm:text-xs text-[10px] font-bold text-gray-500 uppercase ">
                                    Options Management
                                  </p>
                                  {field.options.map((opt, optIndex) => (
                                    <motion.div
                                      key={optIndex}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      className="flex items-center sm:gap-2"
                                    >
                                      <input
                                        type="text"
                                        value={opt}
                                        onChange={(e) => {
                                          const updatedFields = [...selectedFields]
                                          updatedFields[index].options[optIndex] = e.target.value
                                          setSelectedFields(updatedFields)
                                        }}
                                        className={`sm:text-sm text-[10px] border-2 rounded-lg sm:px-3 sm:py-2 px-1 py-1 outline-none transition-all
  ${theme.input}
`}

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
                                    className="sm:text-sm text-[10px] font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
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

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 pt-4 flex flex-col sm:flex-row gap-3 border-t border-gray-100"
                  >
                    <motion.button
                      onClick={editingFormId ? updateForm : createForm}
                      disabled={loading}
                      whileHover={{
                        scale: loading ? 1 : 1.01,
                        boxShadow: loading ? "none" : "0 15px 30px -10px rgba(124, 58, 237, 0.4)",
                      }}
                      whileTap={{ scale: loading ? 1 : 0.99 }}
                      style={{
                        backgroundColor: formTheme.buttonColor || "#7c3aed",
                        borderRadius: formTheme.borderRadius || "16px",
                      }}
                      className="flex-1 text-white sm:py-3 py-1 font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <FaSpinner className="w-5 h-5" />
                          </motion.div>
                          Processing...
                        </>
                      ) : (
                        <>
                
                          {editingFormId ? "Update Form" : "Publish Form"}
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setShowFormBuilder(false)
                        setSelectedFields([])
                        setEditingFormId(null)
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="px-8 sm:py-3 py-1 bg-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all duration-300"
                    >
                      Cancel
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </header>

        {/* List of Forms Grid */}
        {loading && !showFormBuilder ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div key={i} variants={itemVariants}>
                <SkeletonCard />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {forms.map((form, index) => (
                <motion.div
                  key={form.formId}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileHover="hover"
                  className={`
  group relative backdrop-blur-sm sm:p-6 p-4 rounded-3xl border 
  flex flex-col justify-between transition-all duration-500 overflow-hidden
  ${isDarkMode
      ? "bg-[#0f172a]/80 backdrop-blur-md border-slate-800 shadow-2xl text-gray-100"
      : "bg-white/80 border-gray-100 text-gray-900"
    }
`}
                >
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Top Accent Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 origin-left"
                  />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`sm:px-3 sm:py-1.5 px-1 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border
  ${form.isPublic
    ? isDarkMode
      ? "bg-green-900/30 text-green-300 border-green-700"
      : "bg-green-50 text-green-700 border-green-200"
    : isDarkMode
      ? "bg-gray-700 text-gray-300 border-gray-600"
      : "bg-gray-50 text-gray-600 border-gray-200"}
`}
                      >
                        {form.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        {form.isPublic ? "Public" : "Private"}
                      </motion.span>
                      <div className="flex gap-1.5">
                        <motion.button
                          whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditClick(form.formId)}
                          className={`p-2.5 rounded-xl transition-all
  ${isDarkMode
    ? "text-gray-300 hover:text-violet-400 hover:bg-gray-700"
    : "text-gray-400 hover:text-violet-600 hover:bg-gray-100"}
`}
                         
                        >
                          <EditIcon  size={15} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1, backgroundColor: "#fef2f2" }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsDeleting(form)}
                          className={`p-2.5 rounded-xl transition-all
  ${isDarkMode
    ? "text-gray-300 hover:text-violet-400 hover:bg-gray-700"
    : "text-gray-400 hover:text-violet-600 hover:bg-gray-100"}
`}
                        >
                          <Trash2  size={15}  />
                        </motion.button>
                      </div>
                    </div>
                    <h3 className={`sm:text-xl font-bold mb-2 transition-colors duration-300
  ${isDarkMode 
    ? "text-gray-100 group-hover:text-violet-400" 
    : "text-gray-800 group-hover:text-violet-700"}
`}
>
                      {form.title}
                    </h3>
                    <p className={`sm:text-sm text-[10px] line-clamp-2 mb-4 leading-relaxed
  ${isDarkMode ? "text-gray-400" : "text-gray-500"}
`}
>

                      {form.description || "No description provided"}
                    </p>
                  </div>

                  <div className={`relative z-10 mt-4 pt-4 border-t flex gap-3
  ${isDarkMode ? "border-gray-700" : "border-gray-100"}
`}>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/responses/${form.formId}`)}
                     className={`flex-1 font-semibold sm:py-3 py-1 text-[10px] sm:text-sm rounded-xl transition-all duration-300
  flex items-center justify-center gap-2 border
  ${isDarkMode
    ? "bg-gray-700 text-violet-300 border-gray-600 hover:bg-gray-600"
    : "bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 border-violet-100 hover:from-violet-100 hover:to-indigo-100"}
`}
                    >
                      <Layers className="w-4 h-4" />
                      Responses
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => formview(form.formId)}
                      className={`flex-1 sm:py-3 py-1 text-[10px] sm:text-sm  font-semibold py-3 rounded-xl ${theme.buttonPrimary} transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20`}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {isDeleting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleting(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative ${theme.card} rounded-3xl p-8 shadow-2xl max-w-sm w-full border border-gray-100`}
            >
              <div className="w-16 h-16  rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className={`text-2xl font-bold ${theme.textSub} mb-2 text-center`}>Delete Form?</h3>
              <p className="text-gray-500 mb-8 text-center">
                Are you sure you want to delete <span className={`${theme.text} font-bold`}>"{isDeleting.title}"</span>?
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsDeleting(null)}
                  className="flex-1 px-6 py-3.5 text-gray-500 bg-gray-100 rounded-2xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 transition-all"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[350px] max-w-2xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col border border-gray-100"
              style={{
    backgroundColor: viewData.theme?.bgColor || "#ffffff",
    fontFamily: `${viewData.theme?.labelFont || "Inter"}, sans-serif`,
  }}
            >
              {/* Theme Strip with Gradient */}
              <div
                className="h-2 w-full"
                style={{
                  background: `linear-gradient(90deg, ${viewData.theme?.buttonColor || "#6C3BFF"}, ${viewData.theme?.buttonColor || "#6C3BFF"}88)`,
                }}
              />

              {/* Header */}
              <div   className="p-6 lg:p-8 flex justify-between items-start "
  style={{ backgroundColor: viewData.theme?.bgColor || "#ffffff" }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1 flex-wrap">
                    <h2
                      className="text-2xl lg:text-3xl font-bold "
                      style={{ color: viewData.theme?.labelColor || "#111827" }}
                    >
                      {viewData.title}
                    </h2>
                    <span className={` ${theme.text} font-bold text-[10px] uppercase px-3 mt-1 rounded-lg`}>
                      Preview Mode
                    </span>
                  </div>
                  <p className="text-sm w-full lg:text-base" style={{ color: viewData.theme?.labelColor || "#111827" }}>
                    {viewData.description || "No description provided."}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setviewform(false)}
                  className=" text-black hover:bg-red-100 hover:text-red-500  rounded-xl transition-all ml-2"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Form Preview Area */}
              <div
                className="flex-1 overflow-y-auto p-1 sm:p-3 space-y-5"
                style={{ backgroundColor: viewData.theme?.bgColor || "#f9fafb" }}
              >
                <AnimatePresence>
                  {viewData.formField?.map((field, index) => (
                    <motion.div
                      key={field.formFieldId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white py-1  px-2 shadow-sm border border-gray-100 hover:shadow-md hover:border-violet-100 transition-all duration-300"
                      style={{ borderRadius: viewData.theme?.borderRadius || "12px" }}
                    >
                      <label
                        className="block text-sm mt-1 font-bold mb-2"
                        style={{ color: viewData.theme?.labelColor || "#374151" }}
                      >
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>

                      <div
                        className="w-full px-2 py-1 mb-1 border-2 border-dashed border-gray-200 text-gray-400 text-sm flex items-center justify-between"
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
              <div className="p-5  lg:p-6 bg-gradient-to-t from-gray-50 to-white border-t border-gray-100 flex justify-around flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setviewform(false)}
                  className=" px-2 py-1 md:px-3 md:py-2 bg-gray-100 flex-1 text-gray-600 text-xs rounded-xl font-bold hover:bg-gray-200 transition-all"
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
                    const baseUrl = import.meta.env.VITE_URL.replace(/\/$/, "")
                    const link = `${baseUrl}/public/form/${viewData.slug}`
                    navigator.clipboard.writeText(link)
                    toast.success("Link copied!")
                  }}  

                  style={{
    background: viewData.isPublic
      ? `linear-gradient(135deg, ${viewData.theme?.buttonColor || "#7C3AED"}, ${viewData.theme?.buttonColor || "#7C3AED"}dd)`
      : "#E5E7EB",
    color: viewData.isPublic ? "white" : "#9CA3AF",
  }}
  className={`flex flex-1 items-center justify-around text-xs gap-2 px-2 py-1 md:px-3 md:py-2 rounded-xl font-bold transition-all ${
    viewData.isPublic
      ? "shadow-lg hover:brightness-110 active:scale-95"
      : "cursor-not-allowed"
  }`}>   Link
                </motion.button>
<motion.button
                  whileHover={{ scale: viewData.isPublic ? 1.02 : 1 }}
                  whileTap={{ scale: viewData.isPublic ? 0.98 : 1 }}
                  onClick={async () => {
                    if (!viewData.isPublic) {
                      toast.error("Form is private. Make it public first.")
                      return
                    }
                    const baseUrl = import.meta.env.VITE_URL?.replace(/\/$/, "") || window.location.origin
                    const formLink = `${baseUrl}/public/form/${viewData.slug}`
                    // const embedCode = <iframe src="${formLink}" title="${viewData.title}" width="100%" height="700" style="border:none; border-radius:12px;" allow="clipboard-write"></iframe>
                      const embedCode = `<iframe src="${formLink}" title="${viewData.title}" width="100%" height="700" style="border:none; border-radius:12px;" allow="clipboard-write"></iframe>`;
                    await navigator.clipboard.writeText(embedCode)
                    toast.success("Embed code copied!")
                  }}
                  style={{
                    background: viewData.isPublic
                      ? `linear-gradient(135deg, ${viewData.theme?.buttonColor || "#7C3AED"}, ${viewData.theme?.buttonColor || "#7C3AED"}dd)`
                      : "#E5E7EB",
                    color: viewData.isPublic ? "white" : "#9CA3AF",
                  }}
                  className={`flex-1 text-xs px-2 py-1 md:px-3 md:py-2 rounded-xl font-bold transition-all ${viewData.isPublic ? "shadow-lg hover:brightness-110 active:scale-95" : "cursor-not-allowed"}`}
                >
                  iframe
                </motion.button> 


                <motion.button
    whileHover={{ scale: viewData.isPublic ? 1.02 : 1 }}
    whileTap={{ scale: viewData.isPublic ? 0.98 : 1 }}
    onClick={async () => {
      if (!viewData.isPublic) {
        toast.error("Form is private. Make it public first.")
        return
      }
      const baseUrl = import.meta.env.VITE_URL?.replace(/\/$/, "") || window.location.origin
     const scriptCode = `<script 
  src="${baseUrl}/publicFormEmbed.js"
  data-form-id="${viewData.slug}"
  data-primary-color="${viewData.theme?.buttonColor || "#7C3AED"}"
  data-bg-color="${viewData.theme?.bgColor || "#ffffff"}"
  data-font="${viewData.theme?.labelFont || "Inter"}"
  data-input-bg-color="${viewData.theme?.inputBgColor || "#ffffff"}"
  data-label-color="${viewData.theme?.labelColor || "#374151"}"
  data-border-radius="${viewData.theme?.borderRadius || "16px"}"
  data-width="100%">
</script>`;


      await navigator.clipboard.writeText(scriptCode)
      toast.success("Script code copied!")
    }}
    style={{
      background: viewData.isPublic
        ? `linear-gradient(135deg, ${viewData.theme?.buttonColor || "#7C3AED"}, ${viewData.theme?.buttonColor || "#7C3AED"}dd)`
        : "#E5E7EB",
      color: viewData.isPublic ? "white" : "#9CA3AF",
    }}
    className={`flex-1 text-xs px-2 py-1 md:px-3 md:py:2 rounded-xl font-bold transition-all ${
      viewData.isPublic ? "shadow-lg hover:brightness-110 active:scale-95" : "cursor-not-allowed"
    }`}
  >
    Script
  </motion.button>




              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


    
    </div>
    <Footer/>
    </>
  )
}

export default Form