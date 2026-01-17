// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import UserNavbar from "../user/UserNavbar";
// import toast from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiLoader } from "react-icons/fi";
// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const UserActivity = () => {
//   const { id } = useParams();
//   const token = localStorage.getItem("token");
//   const API_URL = `https://formbuilder-saas-backend.onrender.com/api/admin/users/${id}`;
//   const navigate=useNavigate()

//   // User and Forms state
//   const [user, setUser] = useState(null);
//   const [forms, setForms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Modal state
//   const [selectedForm, setSelectedForm] = useState(null);
//   const [loadingForm, setLoadingForm] = useState(false);

//   // Fetch user activity on mount
//   useEffect(() => {
//     fetchUserActivity();
//   }, [id]);

//   const fetchUserActivity = async () => {
//     try {
//       const res = await axios.get(API_URL, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data.user);
//       setForms(res.data.user.form || []);
//     } catch (err) {
//       toast.error("Failed to load user activity");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Open modal to view form details 
//   const openFormModal = async (formId) => {
//     try {
       

//     setSelectedForm(null);
//     setLoadingForm(true);
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
   
//   //Closing form modal
//   const closeFormModal = () => {
//   setSelectedForm(null);
// };



//   // Render input placeholders for preview
//   const renderFieldPreview = (field) => {
//   const placeholder = `Preview for ${field.type}`;
//   switch (field.type) {
//     case "TEXT":
//     case "EMAIL":
//     case "NUMBER":
//     case "DATE":
//       return (
//         <input
//           disabled
//           type={field.type === "TEXT" ? "text" : field.type.toLowerCase()}
//           placeholder={placeholder}
//           className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm mt-2"
//           required={field.isRequired}
//         />
//       );
//     case "TEXTAREA":
//       return (
//         <textarea
//           disabled
//           placeholder={placeholder}
//           className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm mt-2"
//           required={field.isRequired}
//         />
//       );
//      case "DROPDOWN":
//   return (
//     <div className="flex flex-col gap-2 mt-2">
//       {field.options?.map((opt, i) => (
//         <div
//           key={i}
//           className="px-3 py-2 border rounded-lg bg-gray-100 text-sm text-gray-700"
//         >
//           {opt}
//         </div>
//       ))}
//     </div>
//   );
      
//     case "RADIO":
//     case "CHECKBOX":
//       return (
//         <div className="flex flex-col gap-1 mt-2">
//           {field.options?.map((opt, i) => (
//             <label key={i} className="flex items-center gap-2 text-sm">
//               <input
//                 type={field.type === "RADIO" ? "radio" : "checkbox"}
//                 disabled
//                 required={field.isRequired && field.type === "RADIO"}
//               />{" "}
//               {opt}
//             </label>
//           ))}
//         </div>
//       );
//     default:
//       return null;
//   }
// };
    



//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-gray-50">
//         <FiLoader className="animate-spin text-indigo-600 text-4xl" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <UserNavbar />

//       <div className="min-h-screen bg-[#F8FAFC] p-6">
//         <div className="max-w-6xl mx-auto space-y-10">
//           {/* User Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
//           >
//             <div className="h-28 bg-violet-600 relative">
//               <div className="absolute -bottom-10 left-8 bg-white p-1 rounded-2xl shadow-lg">
//                 <div className="w-20 h-20 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl font-bold">
//                   {user.name.charAt(0).toUpperCase()}
//                 </div>
//               </div>
//             </div>

//             <div className="pt-14 px-8 pb-6">

       

//               <h1 className="text-3xl font-extrabold text-slate-900">{user.name}</h1>
//               <p className="text-slate-500 mt-1">{user.email}</p>
//               <span className="inline-block mt-3 px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-indigo-50 text-indigo-700">
//                 {user.role}
//               </span>
//             </div>
//           </motion.div>

//           {/* Forms List */}
//           <div>

//    <span
//     onClick={() => navigate("/admindashboard")}
//     className="inline-flex items-center gap-1 cursor-pointer text-lg font-semibold text-slate-500 hover:text-indigo-600 transition"
//   >
//     ← Back 
//   </span>


//             <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
//               Forms created by <span className="text-3xl text-indigo-600 italic font-bold">{user.name}</span>
//             </h2>

//             {forms.length === 0 ? (
//               <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
//                 <p className="text-slate-500 text-sm">{user.name} has not created any forms yet.</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {forms.map((form) => (
//                   <motion.div
//                     key={form.formId}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition  flex flex-col justify-between"
//                   >
//                     <h3 className="text-xl font-bold text-indigo-700">{form.title}</h3>
//                     <p className="text-slate-500 text-sm mt-2">{form.description}</p>
//                     <p className="text-xs text-slate-400 mt-4">Created on {new Date(form.createdAt).toLocaleDateString()}</p>

//                     <div className="flex gap-2 mt-4">
//                        <button
//                onClick={() => openFormModal(form.formId)}
//                 className="flex-1 px-4 py-2 bg-black text-white rounded-xl text-sm font-semibold" >
//               View Form
//           </button>
//          <button
//   onClick={() => navigate(`/admin/form/${form.formId}/responses`)}
//   className="flex-1 px-4 py-2 bg-gray-200 text-black rounded-xl text-sm font-semibold"
// >
//   Responses
// </button>

//            </div>
//  </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* View Form Modal */}
//       <AnimatePresence>
//         {selectedForm && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
//             {/* Background */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={closeFormModal}
//               className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             />

//             {/* Modal Content */}
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
//             >
              
//                {/* Header */}
// <div className="p-8 flex justify-between items-start">
//   <div>
//    <h2 className="text-2xl text-black font-semibold mb-2">
//   {selectedForm?.title}

// </h2>
//    <p className="text-black/60">
//   {selectedForm?.description || "No description provided."}
// </p>

//   </div>

//   <button
//     onClick={closeFormModal}
//     className="bg-gray-100 hover:bg-violet-600 hover:text-white p-2 rounded-full transition-colors"
//   >
//     <X size={24} />
//   </button>
// </div>
//              {/* Body */}
// <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/50">

//   {/* FORM PREVIEW */}
//   {selectedForm && (
//     selectedForm.formField?.map((field) => (
//       <div
//         key={field.formFieldId}
//         className="bg-white p-6 border border-gray-100 shadow-sm rounded-xl"
//       >
//         <label className="block text-xs font-bold uppercase text-black mb-2">
//           {field.label}
//           {field.isRequired && <span className="text-red-500">*</span>}
//         </label>

//         {renderFieldPreview(field)}
//       </div>
//     ))
//   )}

// </div>
//               {/* Footer Buttons */}
//               <div className="p-6 bg-white border-t border-gray-200 flex gap-4">
//                 <button
//                   onClick={closeFormModal}
//                   className="flex-1 py-3 bg-black text-white rounded-xl font-bold"
//                 >
//                   Close
//                 </button>

//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
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

import { X, FileText, Calendar, Eye, MessageSquare, ArrowLeft} from "lucide-react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import WaveBackground from "./WaveBackground";

const UserActivity = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const API_URL = `https://formbuilder-saas-backend.onrender.com/api/admin/users/${id}`;
  const navigate = useNavigate();

  // User and Forms state
  const [user, setUser] = useState(null);
  const [forms, setForms] = useState([]);
  const [formsLoading, setFormsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true); // Full-page loader

  // Modal state
  const [selectedForm, setSelectedForm] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);

  // Fetch user activity on mount
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

  // Open modal to view form details 
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

  // Closing form modal
  const closeFormModal = () => {
    setSelectedForm(null);
  };

  // Render input placeholders for preview
  const renderFieldPreview = (field) => {
    const placeholder = `Preview for ${field.type}`;
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
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50 text-sm font-medium text-slate-600"
            required={field.isRequired}
          />
        );
      case "TEXTAREA":
        return (
          <textarea
            disabled
            placeholder={placeholder}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50 text-sm font-medium text-slate-600 min-h-[100px]"
            required={field.isRequired}
          />
        );
      case "DROPDOWN":
        return (
          <div className="flex flex-col gap-2 mt-2">
            {field.options?.map((opt, i) => (
              <div
                key={i}
                className="px-4 py-3 border-2 border-slate-200 rounded-xl bg-linear-to-r from-slate-50 to-slate-100 text-sm font-medium text-slate-700 hover:border-indigo-300 transition-colors"
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
              <label key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 cursor-pointer group">
                <input
                  type={field.type === "RADIO" ? "radio" : "checkbox"}
                  disabled
                  required={field.isRequired && field.type === "RADIO"}
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

  // Get user initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

//    if (pageLoading) {
//   return (
//     <div className="relative min-h-screen flex items-center justify-center">
//       {/* Waves in background */}
//       <WaveBackground position="top" />
//       <WaveBackground position="bottom" />

//       {/* Spinner on top */}
//       <FaSpinner className="z-10 text-indigo-600 text-6xl animate-spin" />
//     </div>
//   );
// }

if (pageLoading) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Waves in background */}
      <WaveBackground position="top" height="h-96" color="#6c2bd9" opacity={0.25} />
      <WaveBackground position="bottom" height="h-96" color="#6c2bd9" opacity={0.25} />

      {/* FormCraft Logo */}
      <div className="flex items-center gap-3 z-10 mb-8">
        <div className="w-12 h-12 bg-[#6C3BFF] rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-bold">⧉</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">FormCraft</h1>
      </div>

      {/* Spinner */}
      <FaSpinner className="z-10 text-indigo-600 text-4xl animate-spin" />
    </div>
  );
}



  

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen relative  font-sans bg-linear-to-br from-slate-50 via-violet-50/20 to-purple-50/10 px-4 py-8">
        <WaveBackground position="top" />
        <WaveBackground position="bottom" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-8">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate("/admindashboard")}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-violet-200 text-violet-600 hover:bg-violet-50 transition-all shadow-sm hover:shadow-md font-semibold"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </motion.button>

          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            {/* Header Banner */}
            <div className="h-32 bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 relative">
              <div className="absolute -bottom-12 left-8">
                <div className={`w-24 h-24 rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-600 shadow-2xl flex items-center justify-center text-white text-3xl font-extrabold border-4 border-white`}>
                  {getInitials(user.name)}
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="pt-16 px-8 pb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{user.name}</h1>
                  <p className="text-slate-500 text-lg mb-3">{user.email}</p>
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase border-2 ${
                    user.role === "ADMIN"
                      ? "bg-purple-100 text-purple-700 border-purple-300"
                      : "bg-indigo-100 text-indigo-700 border-indigo-300"
                  }`}>
                    <FaCheckCircle size={12} />
                    {user.role}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex gap-4">
                  <div className="bg-linear-to-br from-indigo-50 to-indigo-100 px-6 py-4 rounded-2xl border-2 border-indigo-200 shadow-sm">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Total Forms</p>
                    <p className="text-3xl font-extrabold text-indigo-700">{forms.length}</p>
                  </div>
                  <div className="bg-linear-to-br from-purple-50 to-purple-100 px-6 py-4 rounded-2xl border-2 border-purple-200 shadow-sm">
                    <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Member Since</p>
                    <p className="text-lg font-bold text-purple-700">
                      {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Forms Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
                Forms Created by{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-purple-600">
                  {user.name}
                </span>
              </h2>
              <p className="text-slate-500">
                View and manage all forms created by this user
              </p>
            </div>

            {/* Forms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formsLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse bg-slate-100 rounded-2xl h-56 flex flex-col justify-between p-6">
                      <div className="w-12 h-12 bg-slate-200 rounded-xl mb-4"></div>
                      <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                      <div className="flex gap-2 mt-4">
                        <div className="h-10 flex-1 bg-slate-200 rounded-xl"></div>
                        <div className="h-10 flex-1 bg-slate-200 rounded-xl"></div>
                      </div>
                    </div>
                  ))
                : forms.length === 0
                ? <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-16 text-center col-span-full">
                    <div className="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="text-slate-400" size={36} />
                    </div>
                    <p className="text-slate-600 font-semibold text-lg mb-1">No Forms Yet</p>
                    <p className="text-slate-400">{user.name} has not created any forms yet.</p>
                  </div>
                : forms.map((form, index) => (
                    <motion.div
                      key={form.formId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-md hover:shadow-xl hover:border-violet-300 transition-all flex flex-col justify-between group"
                    >
                     
  

    {/* FormCraft Logo */}
    <div className="w-10 h-10 bg-[#6C3BFF] rounded-xl flex items-center mb-4 justify-center shadow-md group-hover:scale-110 transition-all">
      <div className="flex flex-col items-center gap-1">
        <span className="w-5 h-0.5 bg-white rounded-full opacity-90"></span>
        <span className="w-6 h-0.5 bg-white rounded-full"></span>
        <span className="w-4 h-0.5 bg-white rounded-full opacity-80"></span>
      </div>
    </div>

   

 



                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-violet-600 transition-colors">
                          {form.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                          {form.description || "No description provided"}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                          <Calendar size={14} />
                          Created on{" "}
                          {new Date(form.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <button
                          onClick={() => openFormModal(form.formId)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                        >
                          <Eye size={16} />
                          View Form
                        </button>
                        <button
                          onClick={() => navigate(`/admin/form/${form.formId}/responses`)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-fuchsia-400 text-white border-2 border-slate-200 rounded-xl text-sm font-bold hover:bg-fuchsia-600 hover:border-fuchsia-600 transition-all"
                        >
                          <MessageSquare size={16} />
                          Responses
                        </button>
                      </div>
                    </motion.div>
                  ))}
            </div>
          </motion.div>

          {/* View Form Modal */}
         <AnimatePresence>
  {selectedForm && (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeFormModal}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col border-2 border-slate-200 mt-20 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 px-8 py-6 pt-10 flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold text-white mb-2">
              {selectedForm?.title}
            </h2>
            <p className="text-violet-100 text-sm">
              {selectedForm?.description || "No description provided."}
            </p>
          </div>

          <button
            onClick={closeFormModal}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-xl transition-all text-white ml-4"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-linear-to-br from-slate-50 to-slate-100/50">
          {loadingForm ? (
            <div className="flex items-center justify-center py-20">
              <FaSpinner className="animate-spin text-violet-600 text-4xl" />
            </div>
          ) : selectedForm?.formField?.length > 0 ? (
            selectedForm.formField.map((field, index) => (
              <motion.div
                key={field.formFieldId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 border-2 border-slate-200 shadow-sm rounded-2xl hover:border-violet-300 transition-colors"
              >
                <label className="block text-sm font-bold uppercase tracking-wide text-slate-700 mb-3">
                  {field.label}
                  {field.isRequired && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderFieldPreview(field)}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-slate-400" size={36} />
              </div>
              <p className="text-slate-500 font-semibold">No fields in this form</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t-2 border-slate-100 p-6 flex gap-4">
          <button
            onClick={closeFormModal}
            className="flex-1 py-3 bg-linear-to-r from-slate-700 to-slate-800 text-white rounded-xl font-bold hover:from-slate-800 hover:to-slate-900 transition-all shadow-md hover:shadow-lg"
          >
            Close Preview
          </button>
          <button
            onClick={() => {
              navigate(`/admin/form/${selectedForm.formId}/responses`);
              closeFormModal();
            }}
            className="flex-1 py-3 bg-linear-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            View Responses
          </button>
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
