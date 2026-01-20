// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import UserNavbar from "../user/UserNavbar";
// import { FiLoader } from "react-icons/fi";
// import { FaFileAlt, FaLock, FaUnlock, FaArrowLeft } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import usePagination from "../../hooks/usePagination";
// import WaveBackground from "./WaveBackground"; 
// import TableSkeleton from "./TableSkeleton";
// const AllForms = () => {
//   const [forms, setForms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterPublic, setFilterPublic] = useState("ALL");
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   //Fetch all forms 
//   useEffect(() => {
//     const fetchForms = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           "https://formbuilder-saas-backend.onrender.com/api/admin/forms",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         if (res.data.success) {
//           setForms(res.data.data);
//         } else {
//           setError(res.data.message);
//         }
//       } catch (err) {
//         setError(err.response?.data?.message || "Internal server error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchForms();
//   }, [token]);

//   const filteredForms = useMemo(() => {
//     return forms
//       .filter((f) =>
//         filterPublic === "ALL"
//           ? true
//           : filterPublic === "PUBLIC"
//           ? f.isPublic
//           : !f.isPublic
//       )
//       .filter((f) =>
//         f.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//   }, [forms, filterPublic, searchQuery]);

//   //For Pagination
//   const {
//     currentData,
//     currentPage,
//     totalPages,
//     nextPage,
//     prevPage
//   } = usePagination(filteredForms, 10);

//   const totalForms = forms.length;
//   const totalPublic = forms.filter(f => f.isPublic).length;
//   const totalPrivate = forms.filter(f => !f.isPublic).length;



//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-red-50/30 to-orange-50/20">
//         <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-200">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <span className="text-red-600 text-3xl">⚠</span>
//           </div>
//           <p className="text-red-600 text-lg font-semibold text-center">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <UserNavbar />

//       <div className="min-h-screen  relative font-sans bg-linear-to-br from-slate-50 via-violet-50/20 to-purple-50/10 px-4 py-8">
        
//   <WaveBackground position="top" />
// <WaveBackground position="bottom" />

        
        
//         <div className="max-w-7xl relative z-10 mx-auto">
//           {/* Header Section */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mb-8"
//           >
//             {/* Back Button */}
//             <motion.button
//               onClick={() => navigate("/admindashboard")}
//               whileHover={{ x: -5 }}
//               whileTap={{ scale: 0.95 }}
//               className="inline-flex items-center gap-2  mb-6 px-4 py-2 rounded-xl bg-white border-2  border-violet-200 text-violet-600 hover:bg-violet-50 transition-all shadow-sm hover:shadow-md font-semibold"
//             >
//               <FaArrowLeft size={14} />
//               Back to Dashboard
//             </motion.button>

//             <div className="bg-linear-to-r from-violet-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl p-8 mb-8">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//                 <div className="text-white">
//                   <h1 className=" text-xl md:text-4xl font-extrabold tracking-tight mb-2">
//                     Forms Overview
//                   </h1>
//                   <p className="text-violet-100 text-sm md:text-lg">
//                       Overview of all user-created forms on the platform, including their titles, creators, and visibility status.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Stats Cards */}
//             <motion.div
//               className="grid grid-cols-1 sm:grid-cols-3 gap-4"
//               initial="hidden"
//               animate="visible"
//               variants={{
//                 hidden: {},
//                 visible: {
//                   transition: { staggerChildren: 0.1 }
//                 }
//               }}
//             >
//               <motion.div
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
//                 }}
//                 className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-200 group hover:border-indigo-200"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="bg-linear-to-br from-indigo-100 to-indigo-200 p-4 rounded-xl text-indigo-600 group-hover:scale-110 transition-transform">
//                     <FaFileAlt size={28} />
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Forms</p>
//                     <p className="text-3xl font-extrabold text-slate-800">{totalForms}</p>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
//                 }}
//                 className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-200 group hover:border-emerald-200"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="bg-linear-to-br from-emerald-100 to-emerald-200 p-4 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform">
//                     <FaUnlock size={28} />
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Public</p>
//                     <p className="text-3xl font-extrabold text-emerald-700">{totalPublic}</p>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
//                 }}
//                 className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-200 group hover:border-gray-300"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="bg-linear-to-br from-gray-100 to-gray-200 p-4 rounded-xl text-gray-600 group-hover:scale-110 transition-transform">
//                     <FaLock size={28} />
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Private</p>
//                     <p className="text-3xl font-extrabold text-gray-600">{totalPrivate}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </motion.div>

//           {/* Filters Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-6"
//           >
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//               <div className="w-full md:w-1/2">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search by form title..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full px-5 py-3 pl-12 rounded-xl border-2 border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm bg-slate-50 font-medium transition-all"
//                   />
//                   <svg
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//                     width="18"
//                     height="18"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <circle cx="8" cy="8" r="6" />
//                     <path d="M12.5 12.5l4 4" />
//                   </svg>
//                 </div>
//               </div>

//               <select
//                 value={filterPublic}
//                 onChange={(e) => setFilterPublic(e.target.value)}
//                 className="px-5 py-3 rounded-xl border-2 border-slate-200 text-sm bg-slate-50 font-semibold focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
//               >
//                 <option value="ALL">All Forms</option>
//                 <option value="PUBLIC">Public Only</option>
//                 <option value="PRIVATE">Private Only</option>
//               </select>
//             </div>
//           </motion.div>

//           {/* Table Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
//           >
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-linear-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
//                     <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
//                       Form Title
//                     </th>
//                     <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
//                       Created By
//                     </th>
//                     <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
//                       Role
//                     </th>
//                     <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
//                       Visibility
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100"> 


//                     {loading ? (
    
//     <TableSkeleton rows={5} columns={5} />
//   ) :currentData.length === 0 ? (
//                     <tr>
//                       <td colSpan="5" className="px-6 py-20">
//                         <div className="text-center">
//                           <div className="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <FaFileAlt className="text-slate-400" size={36} />
//                           </div>
//                           <p className="text-slate-600 font-semibold text-lg mb-1">No forms found</p>
//                           <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     currentData.map((form, index) => (
//                       <motion.tr
//                         key={form.formId}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.05 }}
//                         className="hover:bg-violet-50/50 transition-all group"
//                       >
                        
//                           <td className="px-6 py-4">
//   <div className="flex items-center gap-3">

//     {/* FormCraft Logo */}
//     <div className="w-10 h-10 bg-[#6C3BFF] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all">
//       <div className="flex flex-col items-center gap-1">
//         <span className="w-5 h-0.5 bg-white rounded-full opacity-90"></span>
//         <span className="w-6 h-0.5 bg-white rounded-full"></span>
//         <span className="w-4 h-0.5 bg-white rounded-full opacity-80"></span>
//       </div>
//     </div>

//     {/* Form title */}
//     <span className="font-semibold text-slate-800">
//       {form.title}
//     </span>

//   </div>
// </td>



//                         <td className="px-6 py-4">
//                           <span className="text-sm font-medium text-slate-700">{form.user.name}</span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className="text-sm text-slate-500 font-medium">{form.user.email}</span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span
//                             className={`inline-flex items-center text-xs font-bold uppercase px-3 py-1.5 rounded-full border-2 ${
//                               form.user.role === "ADMIN"
//                                 ? "bg-purple-100 text-purple-700 border-purple-200"
//                                 : "bg-indigo-100 text-indigo-700 border-indigo-200"
//                             }`}
//                           >
//                             {form.user.role}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           {form.isPublic ? (
//                             <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full border-2 border-emerald-200">
//                               <FaUnlock size={12} />
//                               Public
//                             </span>
//                           ) : (
//                             <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full border-2 border-gray-200">
//                               <FaLock size={12} />
//                               Private
//                             </span>
//                           )}
//                         </td>
//                       </motion.tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-between items-center px-6 py-4 border-t-2 border-slate-100 bg-slate-50/50">
//               <span className="text-sm text-slate-600 font-semibold">
//                 Page <span className="text-violet-600">{currentPage}</span> of <span className="text-violet-600">{totalPages}</span>
//               </span>

//               <div className="flex gap-2">
//                 <button
//                   onClick={prevPage}
//                   disabled={currentPage === 1}
//                   className="px-5 py-2 border-2 border-slate-300 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 font-semibold hover:bg-slate-100 transition-all hover:border-slate-400 disabled:hover:bg-transparent disabled:hover:border-slate-300"
//                 >
//                   Prev
//                 </button>

//                 <button
//                   onClick={nextPage}
//                   disabled={currentPage === totalPages}
//                   className="px-5 py-2 bg-linear-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:from-violet-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:hover:from-violet-600 disabled:hover:to-purple-600"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </motion.div> 
//         </div> 


//       </div>
//     </>
//   );
// };

// export default AllForms;



import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import UserNavbar from "../user/UserNavbar";
import { FiLoader, FiLayers, FiUnlock, FiLock, FiFileText } from "react-icons/fi";
import { FaFileAlt, FaLock, FaUnlock, FaArrowLeft, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import usePagination from "../../hooks/usePagination";
import WaveBackground from "./WaveBackground"; 
import TableSkeleton from "./TableSkeleton";
import { useFormContext } from "../dashboard/FormContext";

// --- Custom Sparkle Icon for consistency ---
const SparkleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const AllForms = () => {
  const { isDarkMode } = useFormContext();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPublic, setFilterPublic] = useState("ALL");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch all forms 
  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://formbuilder-saas-backend.onrender.com/api/admin/forms",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setForms(res.data.data);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Internal server error");
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [token]);

  const filteredForms = useMemo(() => {
    return forms
      .filter((f) =>
        filterPublic === "ALL"
          ? true
          : filterPublic === "PUBLIC"
          ? f.isPublic
          : !f.isPublic
      )
      .filter((f) =>
        f.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [forms, filterPublic, searchQuery]);

  // Pagination
  const {
    currentData,
    currentPage,
    totalPages,
    nextPage,
    prevPage
  } = usePagination(filteredForms, 10);

  const totalForms = forms.length;
  const totalPublic = forms.filter(f => f.isPublic).length;
  const totalPrivate = forms.filter(f => !f.isPublic).length;

  // --- THEME CONFIGURATION ---
  const theme = {
    // Backgrounds
    pageBg: isDarkMode 
        ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
        : "bg-linear-to-br from-slate-50 via-violet-50/20 to-purple-50/10 text-slate-900",
    
    // Cards
    card: isDarkMode
        ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-xl"
        : "bg-white border border-slate-200 shadow-lg",
    
    // Stats Cards
    statCard: isDarkMode
        ? "bg-[#1e1b4b]/40 border-purple-500/20 hover:border-purple-500/50 hover:bg-[#1e1b4b]/60"
        : "bg-white border-slate-200 hover:border-indigo-200 hover:shadow-xl",

    // Inputs
    input: isDarkMode
        ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
        : "bg-slate-50 border-slate-200 text-slate-900 focus:ring-violet-500",

    // Text Colors
    textMain: isDarkMode ? "text-white" : "text-slate-800",
    textSub: isDarkMode ? "text-gray-400" : "text-slate-500",
    
    // Table
    tableHeader: isDarkMode
        ? "bg-[#1e1b4b]/60 text-gray-300 border-b border-purple-500/10"
        : "bg-linear-to-r from-slate-50 to-slate-100 text-slate-600 border-b border-slate-200",
    
    tableRow: isDarkMode
        ? "hover:bg-[#1e1b4b]/40 border-b border-purple-500/5 text-gray-300"
        : "hover:bg-violet-50/50 border-b border-slate-100 text-slate-700",

    // Buttons
    buttonPrimary: isDarkMode
        ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
        : "bg-linear-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 shadow-md",
  };

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme.pageBg}`}>
        <div className={`p-8 rounded-2xl shadow-lg border-2 border-red-500/30 text-center ${isDarkMode ? 'bg-[#1e1b4b]' : 'bg-white'}`}>
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-3xl">⚠</span>
          </div>
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <UserNavbar />

      <div className={`min-h-screen relative font-sans transition-colors duration-500 px-4 py-8 overflow-hidden ${theme.pageBg}`}>
        
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
            <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
        </div>
        
        <div className="max-w-7xl relative z-10 mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {/* Back Button */}
            <motion.button
              onClick={() => navigate("/admindashboard")}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl border-2 font-semibold transition-all shadow-sm ${
                  isDarkMode 
                  ? 'bg-[#1e1b4b] border-purple-500/30 text-purple-300 hover:bg-purple-500/10' 
                  : 'bg-white border-violet-200 text-violet-600 hover:bg-violet-50 hover:shadow-md'
              }`}
            >
              <FaArrowLeft size={14} />
              Back to Dashboard
            </motion.button>

            <div className={`rounded-3xl shadow-2xl p-8 mb-8 overflow-hidden relative ${isDarkMode ? 'bg-gradient-to-r from-[#1e1b4b] to-[#0f0c29] border border-purple-500/20' : 'bg-linear-to-r from-violet-600 via-purple-600 to-indigo-700'}`}>
               {/* Blob Decoration */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                <div className="text-white">
                  <h1 className="text-xl md:text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-2">
                    Forms Overview {isDarkMode && <SparkleIcon className="w-6 h-6 text-purple-300" />}
                  </h1>
                  <p className="text-violet-100 text-sm md:text-lg opacity-90">
                      Overview of all user-created forms on the platform, including their titles, creators, and visibility status.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className={`p-6 rounded-2xl border transition-all group ${theme.statCard}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-linear-to-br from-indigo-100 to-indigo-200 text-indigo-600'}`}>
                    <FaFileAlt size={28} />
                  </div>
                  <div>
                    <p className={`text-xs uppercase font-bold tracking-wider mb-1 ${isDarkMode ? 'text-indigo-300' : 'text-slate-500'}`}>Total Forms</p>
                    <p className={`text-3xl font-extrabold ${theme.textMain}`}>{totalForms}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className={`p-6 rounded-2xl border transition-all group ${theme.statCard}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-linear-to-br from-emerald-100 to-emerald-200 text-emerald-600'}`}>
                    <FaUnlock size={28} />
                  </div>
                  <div>
                    <p className={`text-xs uppercase font-bold tracking-wider mb-1 ${isDarkMode ? 'text-emerald-300' : 'text-slate-500'}`}>Public</p>
                    <p className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-emerald-700'}`}>{totalPublic}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className={`p-6 rounded-2xl border transition-all group ${theme.statCard}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-xl transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-linear-to-br from-gray-100 to-gray-200 text-gray-600'}`}>
                    <FaLock size={28} />
                  </div>
                  <div>
                    <p className={`text-xs uppercase font-bold tracking-wider mb-1 ${isDarkMode ? 'text-purple-300' : 'text-slate-500'}`}>Private</p>
                    <p className={`text-3xl font-extrabold ${theme.textMain}`}>{totalPrivate}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`rounded-2xl p-6 mb-6 transition-all duration-500 ${theme.card}`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by form title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-5 py-3 pl-12 rounded-xl outline-none border-2 transition-all font-medium ${theme.input}`}
                  />
                  <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSub}`} />
                </div>
              </div>

              <select
                value={filterPublic}
                onChange={(e) => setFilterPublic(e.target.value)}
                className={`px-5 py-3 rounded-xl border-2 font-semibold outline-none transition-all cursor-pointer ${theme.input}`}
              >
                <option value="ALL" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>All Forms</option>
                <option value="PUBLIC" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>Public Only</option>
                <option value="PRIVATE" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>Private Only</option>
              </select>
            </div>
          </motion.div>

          {/* Table Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`rounded-2xl overflow-hidden border transition-all duration-500 ${theme.card}`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className={theme.tableHeader}>
                  <tr>
                    {['Form Title', 'Created By', 'Email', 'Role', 'Visibility'].map((h) => (
                        <th key={h} className="px-6 py-4 text-xs font-bold uppercase tracking-wider opacity-80">
                            {h}
                        </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-purple-500/5' : 'divide-slate-100'}`}> 
                    {loading ? (
                       <tr><td colSpan={5}><TableSkeleton rows={5} columns={5} isDarkMode={isDarkMode} /></td></tr>
                    ) : currentData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-20">
                        <div className="text-center">
                          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-[#1e1b4b] text-gray-500' : 'bg-slate-100 text-slate-400'}`}>
                            <FaFileAlt size={36} />
                          </div>
                          <p className={`font-semibold text-lg mb-1 ${theme.textMain}`}>No forms found</p>
                          <p className={`text-sm ${theme.textSub}`}>Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentData.map((form, index) => (
                      <motion.tr
                        key={form.formId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`transition-all group ${theme.tableRow}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {/* FormCraft Logo */}
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all ${isDarkMode ? 'bg-[#8b5cf6]' : 'bg-[#6C3BFF]'}`}>
                              <div className="flex flex-col items-center gap-1">
                                <span className="w-5 h-0.5 bg-white rounded-full opacity-90"></span>
                                <span className="w-6 h-0.5 bg-white rounded-full"></span>
                                <span className="w-4 h-0.5 bg-white rounded-full opacity-80"></span>
                              </div>
                            </div>
                            <span className={`font-semibold ${theme.textMain}`}>
                              {form.title}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className={`text-sm font-medium ${theme.textSub}`}>{form.user.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-medium ${theme.textSub}`}>{form.user.email}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center text-xs font-bold uppercase px-3 py-1.5 rounded-full border-2 ${
                              form.user.role === "ADMIN"
                                ? (isDarkMode ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : "bg-purple-100 text-purple-700 border-purple-200")
                                : (isDarkMode ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" : "bg-indigo-100 text-indigo-700 border-indigo-200")
                            }`}
                          >
                            {form.user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {form.isPublic ? (
                            <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full border-2 ${
                                isDarkMode 
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                                : "bg-emerald-100 text-emerald-700 border-emerald-200"
                            }`}>
                              <FaUnlock size={12} />
                              Public
                            </span>
                          ) : (
                            <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full border-2 ${
                                isDarkMode 
                                ? "bg-gray-700 text-gray-400 border-gray-600" 
                                : "bg-gray-100 text-gray-600 border-gray-200"
                            }`}>
                              <FaLock size={12} />
                              Private
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={`flex justify-between items-center px-6 py-4 border-t-2 ${isDarkMode ? 'border-purple-500/10 bg-[#1e1b4b]/30' : 'border-slate-100 bg-slate-50/50'}`}>
              <span className={`text-sm font-semibold ${theme.textSub}`}>
                Page <span className={isDarkMode ? "text-purple-400" : "text-violet-600"}>{currentPage}</span> of <span className={isDarkMode ? "text-purple-400" : "text-violet-600"}>{totalPages}</span>
              </span>

              <div className="flex gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-5 py-2 border-2 rounded-xl disabled:opacity-30 font-semibold transition-all ${
                      isDarkMode 
                      ? 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10 disabled:hover:bg-transparent' 
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100 disabled:hover:bg-transparent'
                  }`}
                >
                  Prev
                </button>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-5 py-2 rounded-xl font-semibold disabled:opacity-30 transition-all ${theme.buttonPrimary}`}
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div> 
        </div> 
      </div>
    </>
  );
};

export default AllForms;