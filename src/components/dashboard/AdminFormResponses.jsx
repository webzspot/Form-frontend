
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import UserNavbar from "../user/UserNavbar";
// import { FaFileAlt, FaSearch, FaFilter, FaCheckCircle, FaClock, FaArrowLeft, FaDownload } from "react-icons/fa";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import usePagination from "../../hooks/usePagination";
// import TableSkeleton from "./TableSkeleton";
// import WaveBackground from "./WaveBackground";


// const AdminFormResponses = () => {
//   const { formId } = useParams();
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   //Responses state
//   const [responses, setResponses] = useState([]);
//   console.log(responses);

//   //Extract questions from response 
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   //Filter 
//   const [filterQuestion, setFilterQuestion] = useState("ALL");

//   //Search
//   const [searchQuery, setSearchQuery] = useState("");

//   //Form Title
//   const [formTitle, setFormTitle] = useState("");

//   //Fetch responses when page loads
//   useEffect(() => {
//     fetchResponses();
//   }, [formId]);

//   //Function to fetch responses
//   const fetchResponses = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `https://formbuilder-saas-backend.onrender.com/api/admin/form/responses/${formId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const data = res.data.data || [];
     
//       setResponses(data);
      
//       if (data.length > 0) {
//         setFormTitle(data[0].form?.title || "Form Responses");
//       }

//       const questionMap = {}; //Helps to fetch a unique questions from responses value
//       data.forEach((res) => {
//         res.responseValue.forEach((rv) => { 
//           if (!questionMap[rv.formFieldId]) {
//             questionMap[rv.formFieldId] = {
//               id: rv.formFieldId,
//               label: rv.formField.label,
//               type: rv.formField.type,
//               options: rv.formField.options || [],
//             };
//           }
//         });
//       });
//       setQuestions(Object.values(questionMap));
//     } catch (err) {
//       toast.error("Failed to load responses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   //Filter
//   const displayedQuestions =
//     filterQuestion === "ALL"
//       ? questions
//       : questions.filter((q) => q.id === filterQuestion);

//   //Search
//   const filteredResponses = responses.filter((res) =>
//     res.responseValue.some((rv) =>
//       (rv.value || "")
//         .toString()
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase())
//     )
//   );
     
//   //For Pagination
//   const {
//     currentData,
//     currentPage,
//     totalPages,
//     nextPage,
//     prevPage
//   } = usePagination(filteredResponses, 10);

//   //Export to CSV
//   const exportToCSV = () => {
//     if (filteredResponses.length === 0) {
//       return toast.error("No data to export");
//     }

//     //Headers
//     const headers = [
//       "Submission ID",
//       "Submitted At",
//       ...displayedQuestions.map(q => q.label),
//     ];

//     //Rows
//     const rows = filteredResponses.map(res => [
//       res.formResponseId, 
      
//       new Date(res.createdAt).toLocaleDateString() +
//         " " +
//         new Date(res.createdAt).toLocaleTimeString(),

//       ...displayedQuestions.map(q => {
//         const answer = res.responseValue.find(
//           rv => rv.formFieldId === q.id
//         );
//         if (!answer) return "-";
//         return Array.isArray(answer.value)
//           ? answer.value.join(" | ")
//           : answer.value;
//       })
//     ]);

//     const csv = [
//       headers.join(","),
//       ...rows.map(r => r.join(","))
//     ].join("\n");

//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `Admin_Responses_${formId}.csv`;
//     link.click();

//     toast.success("CSV exported successfully");
//   };

//   return (
//     <>
//       <UserNavbar />

//       <div className="min-h-screen relative font-sans bg-linear-to-br from-slate-50 via-indigo-50/20 to-purple-50/10 px-4 py-8">
       

//          <WaveBackground position="top" />
//   <WaveBackground position="bottom"  />


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
//               className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl bg-white border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md font-semibold"
//             >
//               <FaArrowLeft size={14} />
//               Back to Dashboard
//             </motion.button>

//             {/* Header Card */}
//             <div className="bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl p-8">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                 <div className="text-white flex-1">
//                   <h1 className="text-4xl font-extrabold tracking-tight mb-2">
//                     Form Responses
//                   </h1>
//                   <p className="text-xl text-fuchsia-300 italic mb-1">
//                     <span className="font-bold">{formTitle}</span>
//                   </p>
//                   <p className="text-indigo-200 text-sm md:text-lg">
//                     Monitor and analyze all submissions for this form
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Stats Cards */}
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: {},
//               visible: {
//                 transition: { staggerChildren: 0.1 }
//               }
//             }}
//           >
//             {/* Total Responses */}
//             <motion.div
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
//               }}
//               className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all group hover:border-indigo-300"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="p-4 rounded-xl bg-linear-to-br from-indigo-100 to-indigo-200 text-indigo-600 group-hover:scale-110 transition-transform">
//                   <FaFileAlt size={24} />
//                 </div>
//                 <div>
//                   <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
//                     Total Responses
//                   </p>
//                   <p className="text-3xl font-extrabold text-slate-900">{responses.length}</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Filtered Responses */}
//             <motion.div
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
//               }}
//               className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all group hover:border-emerald-300"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="p-4 rounded-xl bg-linear-to-br from-emerald-100 to-emerald-200 text-emerald-600 group-hover:scale-110 transition-transform">
//                   <FaCheckCircle size={24} />
//                 </div>
//                 <div>
//                   <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
//                     Filtered Responses
//                   </p>
//                   <p className="text-3xl font-extrabold text-slate-900">{filteredResponses.length}</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Last Submitted */}
//             <motion.div
//               variants={{
//                 hidden: { opacity: 0, y: 20 },
//                 visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
//               }}
//               className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all group hover:border-amber-300"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="p-4 rounded-xl bg-linear-to-br from-amber-100 to-amber-200 text-amber-600 group-hover:scale-110 transition-transform">
//                   <FaClock size={24} />
//                 </div>
//                 <div>
//                   <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
//                     Last Submitted
//                   </p>
//                   <p className="text-sm font-bold text-slate-700">
//                     {responses.length > 0 ? new Date(responses[responses.length - 1].createdAt).toLocaleDateString('en-US', {
//                       month: 'short',
//                       day: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     }) : "-"}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Filters Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-6"
//           >
//             <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
//               {/* Search */}
//               <div className="relative w-full md:w-96">
//                 <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
//                 <input
//                   type="text"
//                   placeholder="Search responses..."
//                   className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 font-medium transition-all"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>

//               {/* Filter and Export */}
//               <div className="flex items-center gap-3 flex-wrap">
//                 <div className="flex items-center gap-2">
//                   <div className="p-2 bg-indigo-100 rounded-lg">
//                     <FaFilter size={12} className="text-indigo-600" />
//                   </div>
//                   <select
//                     className="px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm font-bold outline-none cursor-pointer hover:border-indigo-300 transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     value={filterQuestion}
//                     onChange={(e) => setFilterQuestion(e.target.value)}
//                   >
//                     <option value="ALL">All Questions</option>
//                     {questions.map((q) => (
//                       <option key={q.id} value={q.id}>
//                         {q.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={exportToCSV}
//                   className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-slate-800 to-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
//                 >
//                   <FaDownload size={14} />
//                   Export CSV
//                 </motion.button>
//               </div>
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
//               <table className="min-w-max border-collapse w-full">
//                 {/* Table Head */}
//                 <thead className="bg-linear-to-r from-slate-50 to-slate-100 sticky top-0 z-10">
//                   <tr className="border-b-2 border-slate-200">
//                     <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider text-center whitespace-nowrap">
//                       No.
//                     </th>
//                     <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">
//                       Submission ID
//                     </th>
//                     <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">
//                       Submitted At
//                     </th>
//                     {displayedQuestions.map((q) => (
//                       <th key={q.id} className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">
//                         {q.label}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>

//                 {/* Table Body */}
//                 <tbody className="divide-y divide-slate-100">
//                   {loading ? (
//                     <TableSkeleton rows={5} columns={displayedQuestions.length + 3} />
//                   ) : currentData.length === 0 ? (
//                     <tr>
//                       <td colSpan={displayedQuestions.length + 3} className="px-6 py-20">
//                         <div className="text-center">
//                           <div className="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <FaFileAlt className="text-slate-400" size={36} />
//                           </div>
//                           <p className="text-slate-600 font-semibold text-lg mb-1">No responses yet</p>
//                           <p className="text-slate-400 text-sm">No submissions have been made for this form</p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     currentData.map((res, index) => (
//                       <motion.tr
//                         key={res.formResponseId}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.03 }}
//                         className="transition-colors hover:bg-indigo-50/40 group"
//                       >
//                         {/* No. */}
//                         <td className="px-6 py-4 text-sm font-bold text-slate-500 text-center whitespace-nowrap">
//                           {index + 1 + (currentPage - 1) * 10}
//                         </td>

//                         {/* Submission ID */}
//                         <td className="px-6 py-4 text-xs font-mono text-indigo-600 bg-indigo-50 max-w-[180px] truncate whitespace-nowrap overflow-hidden group-hover:bg-indigo-100 transition-colors">
//                           {res.formResponseId}
//                         </td>

//                         {/* Submitted At */}
//                         <td className="px-6 py-4 text-xs font-semibold text-slate-600 whitespace-nowrap">
//                           {new Date(res.createdAt).toLocaleDateString('en-US', {
//                             month: 'short',
//                             day: 'numeric',
//                             year: 'numeric',
//                             hour: '2-digit',
//                             minute: '2-digit'
//                           })}
//                         </td>

//                         {/* Responses */}
//                         {displayedQuestions.map((q) => {
//                           const answer = res.responseValue.find((rv) => rv.formFieldId === q.id);
//                           let value = "-"; 
//                           if (answer) value = Array.isArray(answer.value) ? answer.value.join(", ") : answer.value || "-";

//                           return (
//                             <td 
//                               key={q.id} 
//                               className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
//                                 value !== "-" 
//                                   ? "bg-emerald-50/50 text-slate-700 group-hover:bg-emerald-100/50" 
//                                   : "text-slate-400 bg-slate-50/50" 
//                               } transition-colors`}
//                             >
//                               {value}
//                             </td>
//                           );
//                         })}
//                       </motion.tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-between items-center px-6 py-4 border-t-2 border-slate-100 bg-slate-50/50">
//               <span className="text-sm text-slate-600 font-semibold">
//                 Page <span className="text-indigo-600">{currentPage}</span> of <span className="text-indigo-600">{totalPages}</span>
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
//                   className="px-5 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:hover:from-indigo-600 disabled:hover:to-purple-600"
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

// export default AdminFormResponses;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import UserNavbar from "../user/UserNavbar";
// import { FaFileAlt, FaSearch, FaFilter, FaCheckCircle, FaClock, FaArrowLeft, FaDownload } from "react-icons/fa";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import usePagination from "../../hooks/usePagination";
// import TableSkeleton from "./TableSkeleton";
// import WaveBackground from "./WaveBackground";
// import { useFormContext } from "../dashboard/FormContext"; // Import Context

// // --- Custom Sparkle Icon for consistency ---
// const SparkleIcon = ({ className }) => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
//     <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
//   </svg>
// );

// const AdminFormResponses = () => {
//   const { formId } = useParams();
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const { isDarkMode } = useFormContext(); // Get Theme Context

//   // Responses state
//   const [responses, setResponses] = useState([]);
  
//   // Extract questions from response 
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filter 
//   const [filterQuestion, setFilterQuestion] = useState("ALL");

//   // Search
//   const [searchQuery, setSearchQuery] = useState("");

//   // Form Title
//   const [formTitle, setFormTitle] = useState("");

//   // Fetch responses when page loads
//   useEffect(() => {
//     fetchResponses();
//   }, [formId]);

//   // Function to fetch responses
//   const fetchResponses = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `https://formbuilder-saas-backend.onrender.com/api/admin/form/responses/${formId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const data = res.data.data || [];
//       setResponses(data);
      
//       if (data.length > 0) {
//         setFormTitle(data[0].form?.title || "Form Responses");
//       }

//       const questionMap = {}; // Helps to fetch a unique questions from responses value
//       data.forEach((res) => {
//         res.responseValue.forEach((rv) => { 
//           if (!questionMap[rv.formFieldId]) {
//             questionMap[rv.formFieldId] = {
//               id: rv.formFieldId,
//               label: rv.formField.label,
//               type: rv.formField.type,
//               options: rv.formField.options || [],
//             };
//           }
//         });
//       });
//       setQuestions(Object.values(questionMap));
//     } catch (err) {
//       toast.error("Failed to load responses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter
//   const displayedQuestions =
//     filterQuestion === "ALL"
//       ? questions
//       : questions.filter((q) => q.id === filterQuestion);

//   // Search
//   const filteredResponses = responses.filter((res) =>
//     res.responseValue.some((rv) =>
//       (rv.value || "")
//         .toString()
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase())
//     )
//   );
      
//   // For Pagination
//   const {
//     currentData,
//     currentPage,
//     totalPages,
//     nextPage,
//     prevPage
//   } = usePagination(filteredResponses, 10);

//   // Export to CSV
//   const exportToCSV = () => {
//     if (filteredResponses.length === 0) {
//       return toast.error("No data to export");
//     }

//     // Headers
//     const headers = [
//       "Submission ID",
//       "Submitted At",
//       ...displayedQuestions.map(q => q.label),
//     ];

//     // Rows
//     const rows = filteredResponses.map(res => [
//       res.formResponseId, 
//       new Date(res.createdAt).toLocaleDateString() + " " + new Date(res.createdAt).toLocaleTimeString(),
//       ...displayedQuestions.map(q => {
//         const answer = res.responseValue.find(rv => rv.formFieldId === q.id);
//         if (!answer) return "-";
//         return Array.isArray(answer.value) ? answer.value.join(" | ") : answer.value;
//       })
//     ]);

//     const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `Admin_Responses_${formId}.csv`;
//     link.click();
//     toast.success("CSV exported successfully");
//   };

//   // --- THEME CONFIGURATION ---
//   const theme = {
//     pageBg: isDarkMode 
//         ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
//         : "bg-linear-to-br from-slate-50 via-indigo-50/20 to-purple-50/10 text-slate-900",
    
//     card: isDarkMode
//         ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-xl"
//         : "bg-white border border-slate-200 shadow-xl",
    
//     cardHeader: isDarkMode
//         ? "bg-[#1e1b4b]/40 border-b border-purple-500/20"
//         : "bg-slate-50/60 border-b border-slate-100",

//     input: isDarkMode
//         ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
//         : "bg-slate-50 border-slate-200 text-slate-900 focus:ring-indigo-500",

//     textMain: isDarkMode ? "text-white" : "text-slate-900",
//     textSub: isDarkMode ? "text-gray-400" : "text-slate-500",
    
//     tableHeader: isDarkMode
//         ? "bg-[#1e1b4b]/60 text-gray-300 border-b border-purple-500/10"
//         : "bg-linear-to-r from-slate-50 to-slate-100 text-slate-600 border-b border-slate-200",
    
//     tableRow: isDarkMode
//         ? "hover:bg-[#1e1b4b]/40 border-b border-purple-500/5 text-gray-300"
//         : "hover:bg-indigo-50/40 border-b border-slate-100 text-slate-700",

//     buttonPrimary: isDarkMode
//         ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
//         : "bg-linear-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 shadow-md",
//   };

//   return (
//     <>
//       <UserNavbar />

//       <div className={`min-h-screen relative font-sans transition-colors duration-500 px-4 py-8 overflow-hidden ${theme.pageBg}`}>
        
//         {/* Background Effects */}
//         <div className="absolute inset-0 z-0 pointer-events-none">
//             <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
//             <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
//         </div>

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
//               className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl border-2 font-semibold transition-all shadow-sm ${
//                   isDarkMode 
//                   ? 'bg-[#1e1b4b] border-purple-500/30 text-purple-300 hover:bg-purple-500/10' 
//                   : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:shadow-md'
//               }`}
//             >
//               <FaArrowLeft size={14} />
//               Back to Dashboard
//             </motion.button>

//             {/* Header Card */}
//             <div className={`rounded-3xl shadow-2xl p-8 overflow-hidden relative ${isDarkMode ? 'bg-gradient-to-r from-[#1e1b4b] to-[#0f0c29] border border-purple-500/20' : 'bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700'}`}>
//                {/* Blob Decoration */}
//                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
//                 <div className="text-white flex-1">
//                   <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-2">
//                     Form Responses {isDarkMode && <SparkleIcon className="w-6 h-6 text-purple-300" />}
//                   </h1>
//                   <p className={`text-xl italic mb-1 ${isDarkMode ? 'text-purple-200' : 'text-fuchsia-300'}`}>
//                     <span className="font-bold">{formTitle}</span>
//                   </p>
//                   <p className={`text-sm md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-indigo-200'}`}>
//                     Monitor and analyze all submissions for this form
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Stats Cards */}
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: {},
//               visible: { transition: { staggerChildren: 0.1 } }
//             }}
//           >
//             {/* Total Responses */}
//             <motion.div
//               variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
//               className={`rounded-2xl p-6 border-2 transition-all group hover:shadow-xl ${
//                   isDarkMode 
//                   ? 'bg-[#1e1b4b]/40 border-indigo-500/30 hover:border-indigo-500/50' 
//                   : 'bg-white border-indigo-200 hover:border-indigo-300 shadow-md'
//               }`}
//             >
//               <div className="flex items-center gap-4">
//                 <div className={`p-4 rounded-xl transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-linear-to-br from-indigo-100 to-indigo-200 text-indigo-600'}`}>
//                   <FaFileAlt size={24} />
//                 </div>
//                 <div>
//                   <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>Total Responses</p>
//                   <p className={`text-3xl font-extrabold ${theme.textMain}`}>{responses.length}</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Filtered Responses */}
//             <motion.div
//               variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
//               className={`rounded-2xl p-6 border-2 transition-all group hover:shadow-xl ${
//                   isDarkMode 
//                   ? 'bg-[#1e1b4b]/40 border-emerald-500/30 hover:border-emerald-500/50' 
//                   : 'bg-white border-emerald-200 hover:border-emerald-300 shadow-md'
//               }`}
//             >
//               <div className="flex items-center gap-4">
//                 <div className={`p-4 rounded-xl transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-linear-to-br from-emerald-100 to-emerald-200 text-emerald-600'}`}>
//                   <FaCheckCircle size={24} />
//                 </div>
//                 <div>
//                   <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>Filtered Responses</p>
//                   <p className={`text-3xl font-extrabold ${theme.textMain}`}>{filteredResponses.length}</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Last Submitted */}
//             <motion.div
//               variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
//               className={`rounded-2xl p-6 border-2 transition-all group hover:shadow-xl ${
//                   isDarkMode 
//                   ? 'bg-[#1e1b4b]/40 border-amber-500/30 hover:border-amber-500/50' 
//                   : 'bg-white border-amber-200 hover:border-amber-300 shadow-md'
//               }`}
//             >
//               <div className="flex items-center gap-4">
//                 <div className={`p-4 rounded-xl transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-linear-to-br from-amber-100 to-amber-200 text-amber-600'}`}>
//                   <FaClock size={24} />
//                 </div>
//                 <div>
//                   <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>Last Submitted</p>
//                   <p className={`text-sm font-bold ${theme.textMain}`}>
//                     {responses.length > 0 ? new Date(responses[responses.length - 1].createdAt).toLocaleDateString('en-US', {
//                       month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
//                     }) : "-"}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Filters Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className={`rounded-2xl p-6 mb-6 border transition-all duration-500 ${theme.card}`}
//           >
//             <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
//               {/* Search */}
//               <div className="relative w-full md:w-96">
//                 <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSub}`} size={14} />
//                 <input
//                   type="text"
//                   placeholder="Search responses..."
//                   className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 text-sm outline-none transition-all font-medium ${theme.input}`}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>

//               {/* Filter and Export */}
//               <div className="flex items-center gap-3 flex-wrap">
//                 <div className="flex items-center gap-2">
//                   <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-100'}`}>
//                     <FaFilter size={12} className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} />
//                   </div>
//                   <select
//                     className={`px-4 py-3 rounded-xl border-2 text-sm font-bold outline-none cursor-pointer transition-all ${theme.input}`}
//                     value={filterQuestion}
//                     onChange={(e) => setFilterQuestion(e.target.value)}
//                   >
//                     <option value="ALL" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>All Questions</option>
//                     {questions.map((q) => (
//                       <option key={q.id} value={q.id} className={isDarkMode ? 'bg-[#0B0F19]' : ''}>
//                         {q.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={exportToCSV}
//                   className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all ${
//                       isDarkMode 
//                       ? 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600' 
//                       : 'bg-linear-to-r from-slate-800 to-slate-900 text-white'
//                   }`}
//                 >
//                   <FaDownload size={14} />
//                   Export CSV
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>

//           {/* Table Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className={`rounded-2xl border overflow-hidden transition-all duration-500 ${theme.card}`}
//           >
//             <div className="overflow-x-auto">
//               <table className="min-w-max border-collapse w-full">
//                 {/* Table Head */}
//                 <thead className={`sticky top-0 z-10 ${theme.tableHeader}`}>
//                   <tr>
//                     <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center whitespace-nowrap opacity-80">
//                       No.
//                     </th>
//                     <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap opacity-80">
//                       Submission ID
//                     </th>
//                     <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap opacity-80">
//                       Submitted At
//                     </th>
//                     {displayedQuestions.map((q) => (
//                       <th key={q.id} className="px-6 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap opacity-80">
//                         {q.label}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>

//                 {/* Table Body */}
//                 <tbody className={`divide-y ${isDarkMode ? 'divide-purple-500/5' : 'divide-slate-100'}`}>
//                   {loading ? (
//                     <tr><td colSpan={displayedQuestions.length + 3}><TableSkeleton rows={5} columns={displayedQuestions.length + 3} isDarkMode={isDarkMode} /></td></tr>
//                   ) : currentData.length === 0 ? (
//                     <tr>
//                       <td colSpan={displayedQuestions.length + 3} className="px-6 py-20">
//                         <div className="text-center">
//                           <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-[#1e1b4b] text-gray-500' : 'bg-linear-to-br from-slate-100 to-slate-200 text-slate-400'}`}>
//                             <FaFileAlt size={36} />
//                           </div>
//                           <p className={`font-semibold text-lg mb-1 ${theme.textMain}`}>No responses yet</p>
//                           <p className={`text-sm ${theme.textSub}`}>No submissions have been made for this form</p>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     currentData.map((res, index) => (
//                       <motion.tr
//                         key={res.formResponseId}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.03 }}
//                         className={`transition-colors group ${theme.tableRow}`}
//                       >
//                         {/* No. */}
//                         <td className={`px-6 py-4 text-sm font-bold text-center whitespace-nowrap ${theme.textSub}`}>
//                           {index + 1 + (currentPage - 1) * 10}
//                         </td>

//                         {/* Submission ID */}
//                         <td className="px-6 py-4 text-xs font-mono max-w-[180px] truncate whitespace-nowrap overflow-hidden">
//                             <span className={`px-2 py-1 rounded ${isDarkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>
//                                 {res.formResponseId}
//                             </span>
//                         </td>

//                         {/* Submitted At */}
//                         <td className={`px-6 py-4 text-xs font-semibold whitespace-nowrap ${theme.textMain}`}>
//                           {new Date(res.createdAt).toLocaleDateString('en-US', {
//                             month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
//                           })}
//                         </td>

//                         {/* Responses */}
//                         {displayedQuestions.map((q) => {
//                           const answer = res.responseValue.find((rv) => rv.formFieldId === q.id);
//                           let value = "-"; 
//                           if (answer) value = Array.isArray(answer.value) ? answer.value.join(", ") : answer.value || "-";

//                           return (
//                             <td 
//                               key={q.id} 
//                               className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
//                                 value !== "-" 
//                                   ? (isDarkMode ? "text-emerald-300 bg-emerald-500/10" : "text-slate-700 bg-emerald-50/50")
//                                   : (isDarkMode ? "text-gray-600" : "text-slate-400 bg-slate-50/50")
//                               }`}
//                             >
//                               {value}
//                             </td>
//                           );
//                         })}
//                       </motion.tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             <div className={`flex justify-between items-center px-6 py-4 border-t-2 ${isDarkMode ? 'border-purple-500/10 bg-[#1e1b4b]/30' : 'border-slate-100 bg-slate-50/50'}`}>
//               <span className={`text-sm font-semibold ${theme.textSub}`}>
//                 Page <span className={isDarkMode ? "text-indigo-400" : "text-indigo-600"}>{currentPage}</span> of <span className={isDarkMode ? "text-indigo-400" : "text-indigo-600"}>{totalPages}</span>
//               </span>

//               <div className="flex gap-2">
//                 <button
//                   onClick={prevPage}
//                   disabled={currentPage === 1}
//                   className={`px-5 py-2 border-2 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed font-semibold transition-all ${
//                       isDarkMode 
//                       ? 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10 disabled:hover:bg-transparent' 
//                       : 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 disabled:hover:bg-transparent'
//                   }`}
//                 >
//                   Prev
//                 </button>

//                 <button
//                   onClick={nextPage}
//                   disabled={currentPage === totalPages}
//                   className={`px-5 py-2 rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all ${theme.buttonPrimary}`}
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

// export default AdminFormResponses;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserNavbar from "../user/UserNavbar";
import { FaFileAlt, FaSearch, FaFilter, FaCheckCircle, FaClock, FaArrowLeft, FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import usePagination from "../../hooks/usePagination";
import TableSkeleton from "./TableSkeleton";
import WaveBackground from "./WaveBackground";
import { useFormContext } from "../dashboard/FormContext"; // Import Context

// --- Custom Sparkle Icon for consistency ---
const SparkleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const AdminFormResponses = () => {
  const { formId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { isDarkMode } = useFormContext(); // Get Theme Context

  // Responses state
  const [responses, setResponses] = useState([]);
  
  // Extract questions from response 
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter 
  const [filterQuestion, setFilterQuestion] = useState("ALL");

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Form Title
  const [formTitle, setFormTitle] = useState("");

  // Fetch responses when page loads
  useEffect(() => {
    fetchResponses();
  }, [formId]);

  // Function to fetch responses
  const fetchResponses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://formbuilder-saas-backend.onrender.com/api/admin/form/responses/${formId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data.data || [];
      setResponses(data);
      
      if (data.length > 0) {
        setFormTitle(data[0].form?.title || "Form Responses");
      }

      const questionMap = {}; // Helps to fetch a unique questions from responses value
      data.forEach((res) => {
        res.responseValue.forEach((rv) => { 
          if (!questionMap[rv.formFieldId]) {
            questionMap[rv.formFieldId] = {
              id: rv.formFieldId,
              label: rv.formField.label,
              type: rv.formField.type,
              options: rv.formField.options || [],
            };
          }
        });
      });
      setQuestions(Object.values(questionMap));
    } catch (err) {
      toast.error("Failed to load responses");
    } finally {
      setLoading(false);
    }
  };

  // Filter
  const displayedQuestions =
    filterQuestion === "ALL"
      ? questions
      : questions.filter((q) => q.id === filterQuestion);

  // Search
  const filteredResponses = responses.filter((res) =>
    res.responseValue.some((rv) =>
      (rv.value || "")
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );
      
  // For Pagination
  const {
    currentData,
    currentPage,
    totalPages,
    nextPage,
    prevPage
  } = usePagination(filteredResponses, 10);

  // Export to CSV
  const exportToCSV = () => {
    if (filteredResponses.length === 0) {
      return toast.error("No data to export");
    }

    // Headers
    const headers = [
      "Submission ID",
      "Submitted At",
      ...displayedQuestions.map(q => q.label),
    ];

    // Rows
    const rows = filteredResponses.map(res => [
      res.formResponseId, 
      new Date(res.createdAt).toLocaleDateString() + " " + new Date(res.createdAt).toLocaleTimeString(),
      ...displayedQuestions.map(q => {
        const answer = res.responseValue.find(rv => rv.formFieldId === q.id);
        if (!answer) return "-";
        return Array.isArray(answer.value) ? answer.value.join(" | ") : answer.value;
      })
    ]);

    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Admin_Responses_${formId}.csv`;
    link.click();
    toast.success("CSV exported successfully");
  };

  // --- THEME CONFIGURATION ---
  const theme = {
    pageBg: isDarkMode 
        ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
        : "bg-linear-to-br from-slate-50 via-indigo-50/20 to-purple-50/10 text-slate-900",
    
    card: isDarkMode
        ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-xl"
        : "bg-white border border-slate-200 shadow-xl",
    
    cardHeader: isDarkMode
        ? "bg-[#1e1b4b]/40 border-b border-purple-500/20"
        : "bg-slate-50/60 border-b border-slate-100",

    input: isDarkMode
        ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
        : "bg-slate-50 border-slate-200 text-slate-900 focus:ring-indigo-500",

    textMain: isDarkMode ? "text-white" : "text-slate-900",
    textSub: isDarkMode ? "text-gray-400" : "text-slate-500",
    
    tableHeader: isDarkMode
        ? "bg-[#1e1b4b]/60 text-gray-300 border-b border-purple-500/10"
        : "bg-linear-to-r from-slate-50 to-slate-100 text-slate-600 border-b border-slate-200",
    
    tableRow: isDarkMode
        ? "hover:bg-[#1e1b4b]/40 border-b border-purple-500/5 text-gray-300"
        : "hover:bg-indigo-50/40 border-b border-slate-100 text-slate-700",

    buttonPrimary: isDarkMode
        ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
        : "bg-linear-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 shadow-md",
  };

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
                  : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:shadow-md'
              }`}
            >
              <FaArrowLeft size={14} />
              Back to Dashboard
            </motion.button>

            {/* Header Card */}
            <div className={`rounded-3xl shadow-2xl p-8 overflow-hidden relative ${isDarkMode ? 'bg-gradient-to-r from-[#1e1b4b] to-[#0f0c29] border border-purple-500/20' : 'bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700'}`}>
               {/* Blob Decoration */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
                <div className="text-white flex-1">
                  <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-2">
                    Form Responses {isDarkMode && <SparkleIcon className="w-6 h-6 text-purple-300" />}
                  </h1>
                  <p className={`text-xl italic mb-1 ${isDarkMode ? 'text-purple-200' : 'text-fuchsia-300'}`}>
                    <span className="font-bold">{formTitle}</span>
                  </p>
                  <p className={`text-sm md:text-lg ${isDarkMode ? 'text-gray-400' : 'text-indigo-200'}`}>
                    Monitor and analyze all submissions for this form
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {/* Total Responses */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className={`rounded-2xl p-6 border-2 transition-all group hover:shadow-xl ${
                  isDarkMode 
                  ? 'bg-[#1e1b4b]/40 border-indigo-500/30 hover:border-indigo-500/50' 
                  : 'bg-white border-indigo-200 hover:border-indigo-300 shadow-md'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-linear-to-br from-indigo-100 to-indigo-200 text-indigo-600'}`}>
                  <FaFileAlt size={24} />
                </div>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>Total Responses</p>
                  <p className={`text-3xl font-extrabold ${theme.textMain}`}>{responses.length}</p>
                </div>
              </div>
            </motion.div>

            {/* Filtered Responses */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className={`rounded-2xl p-6 border-2 transition-all group hover:shadow-xl ${
                  isDarkMode 
                  ? 'bg-[#1e1b4b]/40 border-emerald-500/30 hover:border-emerald-500/50' 
                  : 'bg-white border-emerald-200 hover:border-emerald-300 shadow-md'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-linear-to-br from-emerald-100 to-emerald-200 text-emerald-600'}`}>
                  <FaCheckCircle size={24} />
                </div>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>Filtered Responses</p>
                  <p className={`text-3xl font-extrabold ${theme.textMain}`}>{filteredResponses.length}</p>
                </div>
              </div>
            </motion.div>

            {/* Last Submitted */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className={`rounded-2xl p-6 border-2 transition-all group hover:shadow-xl ${
                  isDarkMode 
                  ? 'bg-[#1e1b4b]/40 border-amber-500/30 hover:border-amber-500/50' 
                  : 'bg-white border-amber-200 hover:border-amber-300 shadow-md'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-linear-to-br from-amber-100 to-amber-200 text-amber-600'}`}>
                  <FaClock size={24} />
                </div>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>Last Submitted</p>
                  <p className={`text-sm font-bold ${theme.textMain}`}>
                    {responses.length > 0 ? new Date(responses[responses.length - 1].createdAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    }) : "-"}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`rounded-2xl p-6 mb-6 border transition-all duration-500 ${theme.card}`}
          >
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSub}`} size={14} />
                <input
                  type="text"
                  placeholder="Search responses..."
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 text-sm outline-none transition-all font-medium ${theme.input}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter and Export */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-100'}`}>
                    <FaFilter size={12} className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} />
                  </div>
                  <select
                    className={`px-4 py-3 rounded-xl border-2 text-sm font-bold outline-none cursor-pointer transition-all ${theme.input}`}
                    value={filterQuestion}
                    onChange={(e) => setFilterQuestion(e.target.value)}
                  >
                    <option value="ALL" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>All Questions</option>
                    {questions.map((q) => (
                      <option key={q.id} value={q.id} className={isDarkMode ? 'bg-[#0B0F19]' : ''}>
                        {q.label}
                      </option>
                    ))}
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={exportToCSV}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all ${
                      isDarkMode 
                      ? 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600' 
                      : 'bg-linear-to-r from-slate-800 to-slate-900 text-white'
                  }`}
                >
                  <FaDownload size={14} />
                  Export CSV
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Table Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`rounded-2xl border overflow-hidden transition-all duration-500 ${theme.card}`}
          >
            <div className="overflow-x-auto">
              <table className="min-w-max border-collapse w-full">
                {/* Table Head */}
                <thead className={`sticky top-0 z-10 ${theme.tableHeader}`}>
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center whitespace-nowrap opacity-80">
                      No.
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap opacity-80">
                      Submission ID
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap opacity-80">
                      Submitted At
                    </th>
                    {displayedQuestions.map((q) => (
                      <th key={q.id} className="px-6 py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap opacity-80">
                        {q.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className={`divide-y ${isDarkMode ? 'divide-purple-500/5' : 'divide-slate-100'}`}>
                  {loading ? (
                    <tr><td colSpan={displayedQuestions.length + 3}><TableSkeleton rows={5} columns={displayedQuestions.length + 3} isDarkMode={isDarkMode} /></td></tr>
                  ) : currentData.length === 0 ? (
                    <tr>
                      <td colSpan={displayedQuestions.length + 3} className="px-6 py-20">
                        <div className="text-center">
                          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-[#1e1b4b] text-gray-500' : 'bg-linear-to-br from-slate-100 to-slate-200 text-slate-400'}`}>
                            <FaFileAlt size={36} />
                          </div>
                          <p className={`font-semibold text-lg mb-1 ${theme.textMain}`}>No responses yet</p>
                          <p className={`text-sm ${theme.textSub}`}>No submissions have been made for this form</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentData.map((res, index) => (
                      <motion.tr
                        key={res.formResponseId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className={`transition-colors group ${theme.tableRow}`}
                      >
                        {/* No. */}
                        <td className={`px-6 py-4 text-sm font-bold text-center whitespace-nowrap ${theme.textSub}`}>
                          {index + 1 + (currentPage - 1) * 10}
                        </td>

                        {/* Submission ID */}
                        <td className="px-6 py-4 text-xs font-mono max-w-[180px] truncate whitespace-nowrap overflow-hidden">
                            <span className={`px-2 py-1 rounded ${isDarkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>
                                {res.formResponseId}
                            </span>
                        </td>

                        {/* Submitted At */}
                        <td className={`px-6 py-4 text-xs font-semibold whitespace-nowrap ${theme.textMain}`}>
                          {new Date(res.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </td>

                        {/* Responses */}
                        {displayedQuestions.map((q) => {
                          const answer = res.responseValue.find((rv) => rv.formFieldId === q.id);
                          let value = "-"; 
                          if (answer) value = Array.isArray(answer.value) ? answer.value.join(", ") : answer.value || "-";

                          return (
                            <td 
                              key={q.id} 
                              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                                value !== "-" 
                                  ? (isDarkMode ? "text-emerald-300 bg-emerald-500/10" : "text-slate-700 bg-emerald-50/50")
                                  : (isDarkMode ? "text-gray-600" : "text-slate-400 bg-slate-50/50")
                              }`}
                            >
                              {value}
                            </td>
                          );
                        })}
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={`flex justify-between items-center px-6 py-4 border-t-2 ${isDarkMode ? 'border-purple-500/10 bg-[#1e1b4b]/30' : 'border-slate-100 bg-slate-50/50'}`}>
              <span className={`text-sm font-semibold ${theme.textSub}`}>
                Page <span className={isDarkMode ? "text-indigo-400" : "text-indigo-600"}>{currentPage}</span> of <span className={isDarkMode ? "text-indigo-400" : "text-indigo-600"}>{totalPages}</span>
              </span>

              <div className="flex gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-5 py-2 border-2 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed font-semibold transition-all ${
                      isDarkMode 
                      ? 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10 disabled:hover:bg-transparent' 
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 disabled:hover:bg-transparent'
                  }`}
                >
                  Prev
                </button>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-5 py-2 rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all ${theme.buttonPrimary}`}
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

export default AdminFormResponses;