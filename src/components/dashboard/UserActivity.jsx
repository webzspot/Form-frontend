// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import UserNavbar from "../user/UserNavbar";
// import toast from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";

// import { X, FileText, Calendar, Eye, MessageSquare, ArrowLeft} from "lucide-react";
// import { FaCheckCircle, FaSpinner } from "react-icons/fa";
// import WaveBackground from "./WaveBackground";

// const UserActivity = () => {
//   const { id } = useParams();
//   const token = localStorage.getItem("token");
//   const API_URL = `https://formbuilder-saas-backend.onrender.com/api/admin/users/${id}`;
//   const navigate = useNavigate();

//   // User and Forms state
//   const [user, setUser] = useState(null);
//   const [forms, setForms] = useState([]);
//   const [formsLoading, setFormsLoading] = useState(true);
//   const [pageLoading, setPageLoading] = useState(true); // Full-page loader

//   // Modal state
//   const [selectedForm, setSelectedForm] = useState(null);
//   const [loadingForm, setLoadingForm] = useState(false);

//   // Fetch user activity on mount
//   useEffect(() => {
//     fetchUserActivity();
//   }, [id]);

//   const fetchUserActivity = async () => {
//     try {
//       setPageLoading(true);
//       const res = await axios.get(API_URL, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data.user);
//       setForms(res.data.user.form || []);
//     } catch (err) {
//       toast.error("Failed to load user activity");
//     } finally {
//       setFormsLoading(false);
//       setPageLoading(false);
//     }
//   };

//   // Open modal to view form details 
//   const openFormModal = async (formId) => {
//     try {
//       setSelectedForm(null);
//       setLoadingForm(true);
//       const res = await axios.get(
//         `https://formbuilder-saas-backend.onrender.com/api/admin/form/${formId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSelectedForm(res.data.data);
//     } catch (err) {
//       toast.error("Failed to load form details");
//     } finally {
//       setLoadingForm(false);
//     }
//   };

//   // Closing form modal
//   const closeFormModal = () => {
//     setSelectedForm(null);
//   };

//   // Render input placeholders for preview
//   const renderFieldPreview = (field) => {
//     const placeholder = `Preview for ${field.type}`;
//     switch (field.type) {
//       case "TEXT":
//       case "EMAIL":
//       case "NUMBER":
//       case "DATE":
//         return (
//           <input
//             disabled
//             type={field.type === "TEXT" ? "text" : field.type.toLowerCase()}
//             placeholder={placeholder}
//             className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50 text-sm font-medium text-slate-600"
//             required={field.isRequired}
//           />
//         );
//       case "TEXTAREA":
//         return (
//           <textarea
//             disabled
//             placeholder={placeholder}
//             className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50 text-sm font-medium text-slate-600 min-h-[100px]"
//             required={field.isRequired}
//           />
//         );
//       case "DROPDOWN":
//         return (
//           <div className="flex flex-col gap-2 mt-2">
//             {field.options?.map((opt, i) => (
//               <div
//                 key={i}
//                 className="px-4 py-3 border-2 border-slate-200 rounded-xl bg-linear-to-r from-slate-50 to-slate-100 text-sm font-medium text-slate-700 hover:border-indigo-300 transition-colors"
//               >
//                 {opt}
//               </div>
//             ))}
//           </div>
//         );
//       case "RADIO":
//       case "CHECKBOX":
//         return (
//           <div className="flex flex-col gap-3 mt-3">
//             {field.options?.map((opt, i) => (
//               <label key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 cursor-pointer group">
//                 <input
//                   type={field.type === "RADIO" ? "radio" : "checkbox"}
//                   disabled
//                   required={field.isRequired && field.type === "RADIO"}
//                   className="w-4 h-4 accent-indigo-600"
//                 />
//                 <span className="group-hover:text-indigo-600 transition-colors">{opt}</span>
//               </label>
//             ))}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   // Get user initials for avatar
//   const getInitials = (name) => {
//     return name
//       .split(" ")
//       .map((word) => word[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };



// if (pageLoading) {
//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center bg-white">
//       {/* Waves in background */}
//       <WaveBackground position="top" height="h-96" color="#6c2bd9" opacity={0.25} />
//       <WaveBackground position="bottom" height="h-96" color="#6c2bd9" opacity={0.25} />

//       {/* FormCraft Logo */}
//       <div className="flex items-center gap-3 z-10 mb-8">
//         <div className="w-12 h-12 bg-[#6C3BFF] rounded-xl flex items-center justify-center shadow-lg">
//           <span className="text-white text-2xl font-bold">⧉</span>
//         </div>
//         <h1 className="text-2xl font-bold text-gray-900">FormCraft</h1>
//       </div>

//       {/* Spinner */}
//       <FaSpinner className="z-10 text-indigo-600 text-4xl animate-spin" />
//     </div>
//   );
// }



  

//   return (
//     <>
//       <UserNavbar />

//       <div className="min-h-screen relative  font-sans bg-linear-to-br from-slate-50 via-violet-50/20 to-purple-50/10 px-4 py-8">
//         <WaveBackground position="top" />
//         <WaveBackground position="bottom" />

//         <div className="max-w-6xl mx-auto relative z-10 space-y-8">
//           {/* Back Button */}
//           <motion.button
//             onClick={() => navigate("/admindashboard")}
//             whileHover={{ x: -5 }}
//             whileTap={{ scale: 0.95 }}
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-violet-200 text-violet-600 hover:bg-violet-50 transition-all shadow-sm hover:shadow-md font-semibold"
//           >
//             <ArrowLeft size={16} />
//             Back to Dashboard
//           </motion.button>

//           {/* User Profile Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
//           >
//             {/* Header Banner */}
//             <div className="h-32 bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 relative">
//               <div className="absolute -bottom-12 left-8">
//                 <div className={`w-24 h-24 rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-600 shadow-2xl flex items-center justify-center text-white text-3xl font-extrabold border-4 border-white`}>
//                   {getInitials(user.name)}
//                 </div>
//               </div>
//             </div>

//             {/* User Info */}
//             <div className="pt-16 px-8 pb-8">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                 <div>
//                   <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{user.name}</h1>
//                   <p className="text-slate-500 text-lg mb-3">{user.email}</p>
//                   <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase border-2 ${
//                     user.role === "ADMIN"
//                       ? "bg-purple-100 text-purple-700 border-purple-300"
//                       : "bg-indigo-100 text-indigo-700 border-indigo-300"
//                   }`}>
//                     <FaCheckCircle size={12} />
//                     {user.role}
//                   </span>
//                 </div>

//                 {/* Stats */}
//                 <div className="flex gap-4">
//                   <div className="bg-linear-to-br from-indigo-50 to-indigo-100 px-6 py-4 rounded-2xl border-2 border-indigo-200 shadow-sm">
//                     <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Total Forms</p>
//                     <p className="text-3xl font-extrabold text-indigo-700">{forms.length}</p>
//                   </div>
//                   <div className="bg-linear-to-br from-purple-50 to-purple-100 px-6 py-4 rounded-2xl border-2 border-purple-200 shadow-sm">
//                     <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Member Since</p>
//                     <p className="text-lg font-bold text-purple-700">
//                       {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Forms Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             {/* Section Header */}
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
//                 Forms Created by{" "}
//                 <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-purple-600">
//                   {user.name}
//                 </span>
//               </h2>
//               <p className="text-slate-500">
//                 View and manage all forms created by this user
//               </p>
//             </div>

//             {/* Forms Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {formsLoading
//                 ? Array.from({ length: 3 }).map((_, i) => (
//                     <div key={i} className="animate-pulse bg-slate-100 rounded-2xl h-56 flex flex-col justify-between p-6">
//                       <div className="w-12 h-12 bg-slate-200 rounded-xl mb-4"></div>
//                       <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
//                       <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
//                       <div className="h-4 bg-slate-200 rounded w-5/6"></div>
//                       <div className="flex gap-2 mt-4">
//                         <div className="h-10 flex-1 bg-slate-200 rounded-xl"></div>
//                         <div className="h-10 flex-1 bg-slate-200 rounded-xl"></div>
//                       </div>
//                     </div>
//                   ))
//                 : forms.length === 0
//                 ? <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-16 text-center col-span-full">
//                     <div className="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <FileText className="text-slate-400" size={36} />
//                     </div>
//                     <p className="text-slate-600 font-semibold text-lg mb-1">No Forms Yet</p>
//                     <p className="text-slate-400">{user.name} has not created any forms yet.</p>
//                   </div>
//                 : forms.map((form, index) => (
//                     <motion.div
//                       key={form.formId}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.4, delay: index * 0.1 }}
//                       className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-md hover:shadow-xl hover:border-violet-300 transition-all flex flex-col justify-between group"
//                     >
                     
  

//     {/* FormCraft Logo */}
//     <div className="w-10 h-10 bg-[#6C3BFF] rounded-xl flex items-center mb-4 justify-center shadow-md group-hover:scale-110 transition-all">
//       <div className="flex flex-col items-center gap-1">
//         <span className="w-5 h-0.5 bg-white rounded-full opacity-90"></span>
//         <span className="w-6 h-0.5 bg-white rounded-full"></span>
//         <span className="w-4 h-0.5 bg-white rounded-full opacity-80"></span>
//       </div>
//     </div>

   

 



//                       <div className="flex-1">
//                         <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-violet-600 transition-colors">
//                           {form.title}
//                         </h3>
//                         <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
//                           {form.description || "No description provided"}
//                         </p>
//                         <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
//                           <Calendar size={14} />
//                           Created on{" "}
//                           {new Date(form.createdAt).toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric",
//                           })}
//                         </div>
//                       </div>

//                       <div className="flex gap-2 mt-6">
//                         <button
//                           onClick={() => openFormModal(form.formId)}
//                           className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
//                         >
//                           <Eye size={16} />
//                           View Form
//                         </button>
//                         <button
//                           onClick={() => navigate(`/admin/form/${form.formId}/responses`)}
//                           className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-fuchsia-400 text-white border-2 border-slate-200 rounded-xl text-sm font-bold hover:bg-fuchsia-600 hover:border-fuchsia-600 transition-all"
//                         >
//                           <MessageSquare size={16} />
//                           Responses
//                         </button>
//                       </div>
//                     </motion.div>
//                   ))}
//             </div>
//           </motion.div>

//           {/* View Form Modal */}
//          <AnimatePresence>
//   {selectedForm && (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={closeFormModal}
//         className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
//       />

//       {/* Modal */}
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         transition={{ type: "spring", damping: 25, stiffness: 200 }}
//         className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col border-2 border-slate-200 mt-20 overflow-hidden"
//       >
//         {/* Modal Header */}
//         <div className="sticky top-0 z-20 bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 px-8 py-6 pt-10 flex justify-between items-start">
//           <div className="flex-1">
//             <h2 className="text-2xl font-extrabold text-white mb-2">
//               {selectedForm?.title}
//             </h2>
//             <p className="text-violet-100 text-sm">
//               {selectedForm?.description || "No description provided."}
//             </p>
//           </div>

//           <button
//             onClick={closeFormModal}
//             className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-xl transition-all text-white ml-4"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         {/* Modal Body */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-linear-to-br from-slate-50 to-slate-100/50">
//           {loadingForm ? (
//             <div className="flex items-center justify-center py-20">
//               <FaSpinner className="animate-spin text-violet-600 text-4xl" />
//             </div>
//           ) : selectedForm?.formField?.length > 0 ? (
//             selectedForm.formField.map((field, index) => (
//               <motion.div
//                 key={field.formFieldId}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//                 className="bg-white p-6 border-2 border-slate-200 shadow-sm rounded-2xl hover:border-violet-300 transition-colors"
//               >
//                 <label className="block text-sm font-bold uppercase tracking-wide text-slate-700 mb-3">
//                   {field.label}
//                   {field.isRequired && <span className="text-red-500 ml-1">*</span>}
//                 </label>
//                 {renderFieldPreview(field)}
//               </motion.div>
//             ))
//           ) : (
//             <div className="text-center py-16">
//               <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FileText className="text-slate-400" size={36} />
//               </div>
//               <p className="text-slate-500 font-semibold">No fields in this form</p>
//             </div>
//           )}
//         </div>

//         {/* Modal Footer */}
//         <div className="sticky bottom-0 bg-white border-t-2 border-slate-100 p-6 flex gap-4">
//           <button
//             onClick={closeFormModal}
//             className="flex-1 py-3 bg-linear-to-r from-slate-700 to-slate-800 text-white rounded-xl font-bold hover:from-slate-800 hover:to-slate-900 transition-all shadow-md hover:shadow-lg"
//           >
//             Close Preview
//           </button>
//           <button
//             onClick={() => {
//               navigate(`/admin/form/${selectedForm.formId}/responses`);
//               closeFormModal();
//             }}
//             className="flex-1 py-3 bg-linear-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
//           >
//             View Responses
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   )}
// </AnimatePresence>

//         </div>
//       </div>
//     </>
//   );
// };

// export default UserActivity;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../user/UserNavbar";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import { X, FileText, Calendar, Eye, MessageSquare, ArrowLeft } from "lucide-react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import WaveBackground from "./WaveBackground";

const UserActivity = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const API_URL = `https://formbuilder-saas-backend.onrender.com/api/admin/users/${id}`;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [forms, setForms] = useState([]);
  const [formsLoading, setFormsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  const [selectedForm, setSelectedForm] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);

  useEffect(() => {
    fetchUserActivity();
  }, [id]);

  const fetchUserActivity = async () => {
    try {
      setPageLoading(true);
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setForms(res.data.user.form || []);
    } catch (err) {
      toast.error("Failed to load user activity");
    } finally {
      setFormsLoading(false);
      setPageLoading(false);
    }
  };

  const openFormModal = async (formId) => {
    try {
      setSelectedForm(null);
      setLoadingForm(true);
      const res = await axios.get(
        `https://formbuilder-saas-backend.onrender.com/api/admin/form/${formId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedForm(res.data.data);
    } catch (err) {
      toast.error("Failed to load form details");
    } finally {
      setLoadingForm(false);
    }
  };

  const closeFormModal = () => {
    setSelectedForm(null);
  };

  const renderFieldPreview = (field) => {
    const placeholder = `Preview for ${field.type}`;
    const inputClasses = "w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors";
    
    switch (field.type) {
      case "TEXT":
      case "EMAIL":
      case "NUMBER":
      case "DATE":
        return (
          <input
            disabled
            type={field.type === "TEXT" ? "text" : field.type.toLowerCase()}
            placeholder={placeholder}
            className={inputClasses}
            required={field.isRequired}
          />
        );
      case "TEXTAREA":
        return (
          <textarea
            disabled
            placeholder={placeholder}
            className={`${inputClasses} min-h-[100px]`}
            required={field.isRequired}
          />
        );
      case "DROPDOWN":
        return (
          <div className="flex flex-col gap-2 mt-2">
            {field.options?.map((opt, i) => (
              <div
                key={i}
                className="px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-300 transition-colors"
              >
                {opt}
              </div>
            ))}
          </div>
        );
      case "RADIO":
      case "CHECKBOX":
        return (
          <div className="flex flex-col gap-3 mt-3">
            {field.options?.map((opt, i) => (
              <label key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer group">
                <input
                  type={field.type === "RADIO" ? "radio" : "checkbox"}
                  disabled
                  className="w-4 h-4 accent-indigo-600"
                />
                <span className="group-hover:text-indigo-600 transition-colors">{opt}</span>
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const getInitials = (name) => {
    return name?.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2) || "??";
  };

  if (pageLoading) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 transition-colors">
        <WaveBackground position="top" height="h-96" color="#6c2bd9" opacity={0.15} />
        <WaveBackground position="bottom" height="h-96" color="#6c2bd9" opacity={0.15} />
        <div className="flex items-center gap-3 z-10 mb-8">
          <div className="w-12 h-12 bg-[#6C3BFF] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">⧉</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FormCraft</h1>
        </div>
        <FaSpinner className="z-10 text-indigo-600 dark:text-indigo-400 text-4xl animate-spin" />
      </div>
    );
  }

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen relative font-sans bg-slate-50 dark:bg-slate-950 px-4 py-8 transition-colors">
        <WaveBackground position="top" />
        <WaveBackground position="bottom" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-8">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate("/admindashboard")}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-slate-800 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-slate-800 transition-all shadow-sm hover:shadow-md font-semibold"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </motion.button>

          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="h-32 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 relative">
              <div className="absolute -bottom-12 left-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-2xl flex items-center justify-center text-white text-3xl font-extrabold border-4 border-white dark:border-slate-900">
                  {getInitials(user?.name)}
                </div>
              </div>
            </div>

            <div className="pt-16 px-8 pb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{user?.name}</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-lg mb-3">{user?.email}</p>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase border-2 ${
                    user?.role === "ADMIN"
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800"
                      : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800"
                  }`}>
                    <FaCheckCircle size={12} />
                    {user?.role}
                  </span>
                </div>

                <div className="flex gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 shadow-sm">
                    <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">Total Forms</p>
                    <p className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300">{forms.length}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 shadow-sm">
                    <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">Member Since</p>
                    <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
                      {user?.createdAt && new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Forms Section */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
                Forms Created by <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400">{user?.name}</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400">View and manage all forms created by this user</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formsLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse bg-white dark:bg-slate-900 rounded-2xl h-56 p-6 border-2 border-slate-100 dark:border-slate-800" />
                  ))
                : forms.length === 0
                ? <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-16 text-center col-span-full">
                    <FileText className="text-slate-400 mx-auto mb-4" size={36} />
                    <p className="text-slate-600 dark:text-slate-300 font-semibold text-lg">No Forms Yet</p>
                  </div>
                : forms.map((form, index) => (
                    <motion.div
                      key={form.formId}
                      className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-6 shadow-md hover:border-violet-300 dark:hover:border-violet-500 transition-all flex flex-col justify-between group"
                    >
                      <div className="w-10 h-10 bg-[#6C3BFF] rounded-xl flex items-center mb-4 justify-center shadow-md">
                        <div className="flex flex-col items-center gap-1">
                          <span className="w-5 h-0.5 bg-white rounded-full"></span>
                          <span className="w-6 h-0.5 bg-white rounded-full"></span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          {form.title}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{form.description || "No description provided"}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
                          <Calendar size={14} />
                          {new Date(form.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-6">
                        <button onClick={() => openFormModal(form.formId)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all">
                          <Eye size={16} /> View
                        </button>
                        <button onClick={() => navigate(`/admin/form/${form.formId}/responses`)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-fuchsia-500 dark:bg-fuchsia-600 text-white rounded-xl text-sm font-bold hover:bg-fuchsia-700 transition-all">
                          <MessageSquare size={16} /> Responses
                        </button>
                      </div>
                    </motion.div>
                  ))}
            </div>
          </motion.div>

          {/* Modal */}
          <AnimatePresence>
            {selectedForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeFormModal} className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm" />
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="bg-gradient-to-br from-violet-600 to-indigo-700 px-8 py-6 pt-10 flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white">{selectedForm?.title}</h2>
                      <p className="text-violet-100 text-sm">{selectedForm?.description}</p>
                    </div>
                    <button onClick={closeFormModal} className="bg-white/20 hover:bg-white/30 p-2 rounded-xl text-white"><X size={24} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 dark:bg-slate-950">
                    {loadingForm ? <FaSpinner className="animate-spin text-violet-600 mx-auto" /> : selectedForm?.formField?.map((field, index) => (
                      <div key={field.formFieldId} className="bg-white dark:bg-slate-900 p-6 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
                        <label className="block text-sm font-bold uppercase text-slate-700 dark:text-slate-300 mb-3">
                          {field.label} {field.isRequired && <span className="text-red-500">*</span>}
                        </label>
                        {renderFieldPreview(field)}
                      </div>
                    ))}
                  </div>
                  <div className="bg-white dark:bg-slate-900 border-t-2 border-slate-100 dark:border-slate-800 p-6 flex gap-4">
                    <button onClick={closeFormModal} className="flex-1 py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-xl font-bold">Close</button>
                    <button onClick={() => { navigate(`/admin/form/${selectedForm.formId}/responses`); closeFormModal(); }} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold">Responses</button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default UserActivity;