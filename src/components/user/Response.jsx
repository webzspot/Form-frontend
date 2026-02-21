// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import UserNavbar from './UserNavbar';
// import usePagination from "../../hooks/usePagination";
// import WaveBackground from '../dashboard/WaveBackground';
// import TableSkeleton from '../dashboard/TableSkeleton';
// import { useFormContext } from "../dashboard/FormContext"; // Import Context for Theme
// import { 
//   FaFileAlt, FaSearch, FaDownload, FaDatabase, 
//   FaFilter, FaArrowLeft, FaClock, FaLayerGroup 
// } from "react-icons/fa";
      
//    // --- Custom Sparkle Icon for consistency ---
// const SparkleIcon = ({ className }) => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
//     <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
//   </svg>
// );


// const Response = () => {
//   const { formId } = useParams();
//   const navigate = useNavigate();
//   const { isDarkMode } = useFormContext(); // Get theme state
//   const [fullData, setFullData] = useState([]);
//   const [formFields, setFormFields] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const token = localStorage.getItem("token");
//  const [selectedField, setSelectedField] = useState("ALL");


//   // --- Theme Logic (Matching Admin UI) ---
//   const theme = {
//     pageBg: isDarkMode 
//       ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
//       : "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95] selection:bg-purple-200",
//     card: isDarkMode
//       ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
//       : "bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",
//     input: isDarkMode
//       ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
//       : "bg-white/50 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",
//     buttonPrimary: isDarkMode
//       ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
//       : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",
//     tableHeader: isDarkMode ? "bg-[#1e1b4b]/60 text-purple-300" : "bg-purple-100/50 text-[#4c1d95]",
//     textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/70",
//   };

//   // ... (Keep your existing fetchData and getResponseValue logic here) ...
//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const formRes = await axios.get(
//         `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setFormFields(formRes.data.data.formField);

//       const responsesListRes = await axios.get(
//         `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/responses/${formId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const list = responsesListRes.data.data;

//       const detailedResponses = await Promise.all(
//         list.map(resp => 
//           axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/response/${resp.formResponseId}`, {
//             headers: { Authorization: `Bearer ${token}` }
//           }).then(res => res.data.data)
//         )
//       ); 
//       setFullData(detailedResponses);
//     } catch (err) {
//       toast.error("Failed to sync response data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { if (formId) fetchData(); }, [formId]);

//   const getResponseValue = (responseValues, fieldId) => {
//     const entry = responseValues?.find(v => v.formFieldId === fieldId);
//     if (!entry || !entry.value) return "—";
//     return Array.isArray(entry.value) ? entry.value.join(", ") : entry.value;
//   };
//     const displayedFields =
//   selectedField === "ALL"
//     ? formFields
//     : formFields.filter(
//         (f) => f.formFieldId === selectedField
//       );


//   const filteredData = fullData.filter((resp) => {
//   // Search filter (existing)
//   const matchesSearch = searchTerm
//     ? resp.responseValue
//         ?.map(e => e.value?.toString().toLowerCase() || "")
//         .join(" ")
//         .includes(searchTerm.toLowerCase())
//     : true;

//   // Question filter (NEW)
//   const matchesQuestion =
//     selectedField === "ALL"
//       ? true
//       : resp.responseValue?.some(
//           (v) => v.formFieldId === selectedField && v.value
//         );

//   return matchesSearch && matchesQuestion;
// });


//   const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(filteredData, 10); 



//    const exportToCSV = () => {
//   if (filteredData.length === 0) {
//     return toast.error("No data available to export");
//   }

//   // 1. Define Headers: Submission ID, dynamic field labels, and Timestamp
//   const headers = [
//     "Submission ID",
//     ...formFields.map(field => field.label),
//     "Submission Date"
//   ];

//   // 2. Map the data rows
//   const rows = filteredData.map((resp) => {
//     return [
//       resp.formResponseId,
//       // For each header field, find the corresponding value in the response
//       ...formFields.map(field => {
//         const entry = resp.responseValue?.find(v => v.formFieldId === field.formFieldId);
//         if (!entry) return "—";
//         // Handle arrays (for checkboxes) by joining with a pipe | or space
//         return Array.isArray(entry.value) ? entry.value.join(" | ") : `"${entry.value}"`;
//       }),
//       new Date(resp.createdAt).toLocaleString()
//     ];
//   });

//   // 3. Combine headers and rows into a CSV string
//   // Use map(row => row.join(",")) to turn arrays into comma-separated strings
//   const csvContent = [
//     headers.join(","), 
//     ...rows.map(row => row.join(","))
//   ].join("\n");

//   // 4. Create a Blob and trigger download
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");
  
//   link.setAttribute("href", url);
//   link.setAttribute("download", `Responses_${formId}_${new Date().getTime()}.csv`);
//   link.style.visibility = "hidden";
  
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
  
//   toast.success("CSV Downloaded!");
// };
//    // Count total answered fields from first response
// const answeredFields = fullData.length > 0 
//   ? fullData[0].responseValue?.length || 0
//   : 0;

//   return (
//     <div className={`min-h-screen relative font-sans transition-colors duration-500 overflow-hidden pb-20 ${theme.pageBg}`}>
//       <UserNavbar />
      
//       {/* Background Waves */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
//         <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />

//          <motion.div 
//                    animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }} 
//                    transition={{ duration: 4, repeat: Infinity }}
//                    className="absolute top-1/4 left-10 text-white/40"
//                  >
//                    <SparkleIcon className="w-12 h-12" />
//                  </motion.div>


//       </div>

//       <main className="relative z-10 max-w-7xl mx-auto px-4 py-5 sm:py-12">
//         {/* Back Button */}
//         <motion.button
//           onClick={() => navigate("/form")}
//           whileHover={{ x: -5 }}
//           className={`flex items-center gap-2 sm:mb-8 mb-2 px-5 py-2.5 rounded-2xl font-semibold transition-all border ${
//             isDarkMode ? 'bg-[#12121a] border-purple-500/30 text-purple-400' : 'bg-white/60 border-purple-200 shadow-sm'
//           }`}
//         >
//           <FaArrowLeft size={14} /> <span className='hidden sm:block'>Back to Dashboard</span>
//         </motion.button>

//         {/* Header Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className={`p-8 rounded-[2.5rem] mb-8 shadow-2xl relative overflow-hidden ${
//             isDarkMode ? 'bg-[#12121a]/90 border border-purple-500/20' : 'bg-white/80 backdrop-blur-md border border-white'
//           }`}
//         >
//           <div className="relative z-10">
//             <span className={`px-4 py-1 rounded-full text-sm font-bold ${isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100'}`}>
//               Data Analytics
//             </span>
//             <h1 className={`sm:text-3xl text-xl mt-3 font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#4c1d95]'}`}>
//               Form Submissions
//             </h1>
//           <p className={`max-w-2xl text-[10px] sm:text-sm sm:font-medium ${theme.textSub}`}>
//                 Viewing all submitted entries. You can filter by specific questions or search through text responses.
//               </p>
//         </div>
//         </motion.div>
//         {/* Stats Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {[
//             { label: 'Total Entries', count: fullData.length, icon: FaDatabase, bg: 'bg-purple-500/10' },
//             { label: 'Visible Results', count: filteredData.length, icon: FaFilter, bg: 'bg-purple-500/10' },
//           { label: 'Total Questions', count: formFields.length, icon: FaLayerGroup, bg: 'bg-purple-500/10' }

//           ].map((stat, i) => (
//             <motion.div key={i} className={`${theme.card} sm:p-6 p-2 rounded-3xl flex items-center gap-5 transition-transform hover:scale-[1.02]`}>
//               <div className={`sm:p-4 p-2 rounded-2xl ${stat.bg} ${stat.color}`}>
//                 <stat.icon size={24} />
//               </div>
//               <div>
//                 <p className={`sm:text-sm text-[10px] font-bold ${theme.textSub}`}>{stat.label}</p>
//                 <p className={`sm:text-2xl text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{stat.count}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Controls */}
//         <div className={`${theme.card} p-3 rounded-2xl mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between`}>
//           <div className="relative w-full md:w-96">
//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
//             <input
//               type="text"
//               placeholder="Search across all responses..."
//               className={`w-full flex-1 px-12 sm:py-3 py-1 rounded-2xl border-none outline-none text-sm font-semibold transition-all ${theme.input}`}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div> 


//             <div className="flex flex-wrap gap-3 w-full sm:w-auto">
//           <select
//   value={selectedField}
//   onChange={(e) => setSelectedField(e.target.value)}
//   className={`sm:px-6 py-1 sm:py-2 rounded-2xl sm:text-sm text-[10px] font-bold ${theme.input}`}
// >
//   <option value="ALL">All Questions</option>
//   {formFields.map((f) => (
//     <option key={f.formFieldId} value={f.formFieldId}>
//       {f.label}
//     </option>
//   ))}
// </select>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             onClick={exportToCSV}
//             className={`flex items-center sm:px-6 py-0.5 px-2 sm:py-2 rounded-xl sm:text-sm text-[10px] font-semibold transition-all ${theme.buttonPrimary}`}
//           >
//             Export
//           </motion.button>
//         </div>
//     </div>
//         {/* Table */}
//         <motion.div 
//          initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
        
//         className={`${theme.card} rounded-3xl overflow-hidden`}>
//           <div className="overflow-x-auto custom-scrollbar">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className={theme.tableHeader}>
//                   <th className="px-6 py-5 text-sm font-bold">No.</th>
//                   <th className="px-6 py-5 text-sm font-bold">Submission ID</th>
//                    <th className="px-6 py-5 text-sm font-bold">Timestamp</th>
//                   {displayedFields.map(f => <th key={f.formFieldId} className="px-6 py-5 text-sm font-bold">{f.label}</th>)}
                 
//                 </tr>
//               </thead>
//               <tbody className={`divide-y ${isDarkMode ? 'divide-purple-500/10' : 'divide-purple-100'}`}>
//                 {loading ? (
//                   <tr><td colSpan={100}><TableSkeleton rows={5} columns={4} isDarkMode={isDarkMode} /></td></tr>
//                 ) : currentData.length === 0 ? (
//                                     <tr>
//                                       <td colSpan={100} className="py-32 text-center">
//                                         <FaFileAlt size={48} className="mx-auto mb-4  opacity-20" />
//                                         <p className={`text-xl font-bold ${theme.textSub}`}>No entries found matching your criteria</p>
//                                       </td>
//                                     </tr>
//                                   ) : (currentData.map((resp, idx) => (
//                   <motion.tr 
//                     key={resp.formResponseId}
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   transition={{ delay: idx * 0.05 }}
//   className={`group transition-colors ${
//     isDarkMode ? 'hover:bg-purple-500/5' : 'hover:bg-purple-50/50'
//   }`}
                  
//                   >
//                     <td className="px-6 py-4 text-sm font-bold opacity-70">{(currentPage - 1) * 10 + idx + 1}</td>
//                    <td className="px-6 py-4">
//   <span className={`font-mono text-[10px] px-2 py-1 rounded-lg ${
//     isDarkMode ? 'bg-purple-500/10 text-purple-300' : 'bg-purple-100'
//   }`}>
//     {resp.formResponseId.slice(-8).toUpperCase()}
//   </span>
// </td>

                     
//                      <td className="px-6 py-4">
//   <div className="flex flex-col">
//     <span className="text-xs font-bold">
//       {new Date(resp.createdAt).toLocaleDateString()}
//     </span>
//     <span className="text-[10px] opacity-50">
//       {new Date(resp.createdAt).toLocaleTimeString()}
//     </span>
//   </div>
// </td>

                  
//                     {displayedFields.map(f => (
//                      <td className="px-6 py-4">
//   <span
//     className={`text-sm font-medium ${
//       getResponseValue(resp.responseValue, f.formFieldId) === "—"
//         ? "opacity-30"
//         : ""
//     }`}
//   >
//     {getResponseValue(resp.responseValue, f.formFieldId)}
//   </span>
// </td>

//                     ))}
                   
//                   </motion.tr>
//                 )))}
//               </tbody>
//             </table>
//           </div>
//           {/* Pagination UI Location */}
// {!loading && filteredData.length > 0 && (
//   <div className={`p-6 flex items-center justify-between border-t ${isDarkMode ? 'border-purple-500/10' : 'border-purple-100'}`}>
//    <p className={`text-xs font-bold uppercase tracking-widest ${theme.textSub}`}>
//                 Showing {currentPage} of {totalPages} Pages
//               </p>

//     <div className="flex gap-3">
//       <button
//         onClick={prevPage}
//         disabled={currentPage === 1}
//         className={`px-6 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-20 ${
//                     isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
//                   }`}
//       >
//         Prev
//       </button>

//       <button
//         onClick={nextPage}
//         disabled={currentPage === totalPages}
//         className={`px-6 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-20 ${theme.buttonPrimary}`}
//                 >
      
//         Next
//       </button>
//     </div>
//   </div>
// )}
//         </motion.div>
        
//       </main>
//     </div>
//   );
// };

// export default Response;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserNavbar from './UserNavbar';
import usePagination from "../../hooks/usePagination";
import WaveBackground from '../dashboard/WaveBackground';
import TableSkeleton from '../dashboard/TableSkeleton';
import { useFormContext } from "../dashboard/FormContext"; // Import Context for Theme
import { 
  FaFileAlt, FaSearch, FaDownload, FaDatabase, 
  FaFilter, FaArrowLeft, FaClock, FaLayerGroup 
} from "react-icons/fa";
      
   // --- Custom Sparkle Icon for consistency ---
const SparkleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);


const Response = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useFormContext(); // Get theme state
  const [fullData, setFullData] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
 const [selectedField, setSelectedField] = useState("ALL");


  // --- Theme Logic (Matching Admin UI) ---
  const theme = {
    pageBg: isDarkMode 
      ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
      : "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95] selection:bg-purple-200",
    card: isDarkMode
      ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
      : "bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",
    input: isDarkMode
      ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
      : "bg-white/50 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",
    buttonPrimary: isDarkMode
      ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
      : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",
    tableHeader: isDarkMode ? "bg-[#1e1b4b]/60 text-purple-300" : "bg-purple-100/50 text-[#4c1d95]",
    textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/70",
  };

  // ... (Keep your existing fetchData and getResponseValue logic here) ...
  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const formRes = await axios.get(
  //       `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     setFormFields(formRes.data.data.formField);

  //     const responsesListRes = await axios.get(
  //       `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/responses/${formId}`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     const list = responsesListRes.data.data;

  //     const detailedResponses = await Promise.all(
  //       list.map(resp => 
  //         axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/response/${resp.formResponseId}`, {
  //           headers: { Authorization: `Bearer ${token}` }
  //         }).then(res => res.data.data)
  //       )
  //     ); 
  //     setFullData(detailedResponses);
  //   } catch (err) {
  //     toast.error("Failed to sync response data");
  //   } finally {
  //     setLoading(false);
  //   }
  // };




  const fetchData = async () => {
  setLoading(true);
  try {
    const res = await axios.get(
      `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/responses/${formId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = res.data.data;

    // Columns => formFields
    setFormFields(data.columns);

    // Rows => fullData
    const normalizedRows = data.rows.map(row => ({
      formResponseId: row.id,
      createdAt: row.submittedAt,
      values: row,  // Keep all fields in 'values'
    }));
    setFullData(normalizedRows);

  } catch (err) {
    toast.error("Failed to sync response data");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => { if (formId) fetchData(); }, [formId]);

  // const getResponseValue = (responseValues, fieldId) => {
  //   const entry = responseValues?.find(v => v.formFieldId === fieldId);
  //   if (!entry || !entry.value) return "—";
  //   return Array.isArray(entry.value) ? entry.value.join(", ") : entry.value;
  // };

  const getResponseValue = (values, key) => {
  if (!values || values[key] === undefined || values[key] === null) return "—";
  return Array.isArray(values[key]) ? values[key].join(" | ") : values[key];
};

  //   const displayedFields =
  // selectedField === "ALL"
  //   ? formFields
  //   : formFields.filter(
  //       (f) => f.key === selectedField
  //     );
  const displayedFields =
  selectedField === "ALL"
    ? formFields
    : formFields.filter(f => f.key === selectedField);



//   const filteredData = fullData.filter((resp) => {
//   // Search filter (existing)
//   const matchesSearch = searchTerm
//     ? resp.responseValue
//         ?.map(e => e.value?.toString().toLowerCase() || "")
//         .join(" ")
//         .includes(searchTerm.toLowerCase())
//     : true;

//   // Question filter (NEW)
//   const matchesQuestion =
//     selectedField === "ALL"
//       ? true
//       : resp.responseValue?.some(
//           (v) => v.formFieldId === selectedField && v.value
//         );

//   return matchesSearch && matchesQuestion;
// });

const filteredData = fullData.filter(resp => {
  // Search filter
  const matchesSearch = searchTerm
    ? Object.values(resp.values)
        .map(v => (v?.toString() || "").toLowerCase())
        .join(" ")
        .includes(searchTerm.toLowerCase())
    : true;

  // Question filter
  const matchesField =
    selectedField === "ALL"
      ? true
      : resp.values[selectedField];

  return matchesSearch && matchesField;
});



  const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(filteredData, 10); 



   const exportToCSV = () => {
  if (filteredData.length === 0) {
    return toast.error("No data available to export");
  }

  // 1. Define Headers: Submission ID, dynamic field labels, and Timestamp
  const headers = [
    "Submission ID",
    ...formFields.map(field => field.label),
    "Submission Date"
  ];

  // 2. Map the data rows
  // const rows = filteredData.map((resp) => {
  //   return [
  //     resp.formResponseId,
  //     // For each header field, find the corresponding value in the response
  //     ...formFields.map(field => {
  //       const entry = resp.responseValue?.find(v => v.formFieldId === field.formFieldId);
  //       if (!entry) return "—";
  //       // Handle arrays (for checkboxes) by joining with a pipe | or space
  //       return Array.isArray(entry.value) ? entry.value.join(" | ") : `"${entry.value}"`;
  //     }),
  //     new Date(resp.createdAt).toLocaleString()
  //   ];
  // });

  const rows = filteredData.map(resp => [
  resp.formResponseId,
  ...formFields.map(f => {
    const val = resp.values[f.key];
    return Array.isArray(val) ? val.join(" | ") : val ?? "—";
  }),
  new Date(resp.createdAt).toLocaleString()
]);


  // 3. Combine headers and rows into a CSV string
  // Use map(row => row.join(",")) to turn arrays into comma-separated strings
  const csvContent = [
    headers.join(","), 
    ...rows.map(row => row.join(","))
  ].join("\n");

  // 4. Create a Blob and trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", `Responses_${formId}_${new Date().getTime()}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  toast.success("CSV Downloaded!");
};
   // Count total answered fields from first response
// const answeredFields = fullData.length > 0 
//   ? fullData[0].responseValue?.length || 0
//   : 0;

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-500 overflow-hidden pb-20 ${theme.pageBg}`}>
      <UserNavbar />
      
      {/* Background Waves */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
        <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />

         <motion.div 
                   animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }} 
                   transition={{ duration: 4, repeat: Infinity }}
                   className="absolute top-1/4 left-10 text-white/40"
                 >
                   <SparkleIcon className="w-12 h-12" />
                 </motion.div>


      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-5 sm:py-12">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/form")}
          whileHover={{ x: -5 }}
          className={`flex items-center gap-2 sm:mb-8 mb-2 px-5 py-2.5 rounded-2xl font-semibold transition-all border ${
            isDarkMode ? 'bg-[#12121a] border-purple-500/30 text-purple-400' : 'bg-white/60 border-purple-200 shadow-sm'
          }`}
        >
          <FaArrowLeft size={14} /> <span className='hidden sm:block'>Back to Dashboard</span>
        </motion.button>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-[2.5rem] mb-8 shadow-2xl relative overflow-hidden ${
            isDarkMode ? 'bg-[#12121a]/90 border border-purple-500/20' : 'bg-white/80 backdrop-blur-md border border-white'
          }`}
        >
          <div className="relative z-10">
            <span className={`px-4 py-1 rounded-full text-sm font-bold ${isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100'}`}>
              Data Analytics
            </span>
            <h1 className={`sm:text-3xl text-xl mt-3 font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#4c1d95]'}`}>
              Form Submissions
            </h1>
          <p className={`max-w-2xl text-[10px] sm:text-sm sm:font-medium ${theme.textSub}`}>
                Viewing all submitted entries. You can filter by specific questions or search through text responses.
              </p>
        </div>
        </motion.div>
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Entries', count: fullData.length, icon: FaDatabase, bg: 'bg-purple-500/10' },
            { label: 'Visible Results', count: filteredData.length, icon: FaFilter, bg: 'bg-purple-500/10' },
          { label: 'Total Questions', count: formFields.length, icon: FaLayerGroup, bg: 'bg-purple-500/10' }

          ].map((stat, i) => (
            <motion.div key={i} className={`${theme.card} sm:p-6 p-2 rounded-3xl flex items-center gap-5 transition-transform hover:scale-[1.02]`}>
              <div className={`sm:p-4 p-2 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className={`sm:text-sm text-[10px] font-bold ${theme.textSub}`}>{stat.label}</p>
                <p className={`sm:text-2xl text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{stat.count}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className={`${theme.card} p-3 rounded-2xl mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between`}>
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Search across all responses..."
              className={`w-full flex-1 px-12 sm:py-3 py-1 rounded-2xl border-none outline-none text-sm font-semibold transition-all ${theme.input}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> 


            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <select
  value={selectedField}
  onChange={(e) => setSelectedField(e.target.value)}
  className={`sm:px-6 py-1 sm:py-2 rounded-2xl sm:text-sm text-[10px] font-bold ${theme.input}`}
>
  <option value="ALL">All Questions</option>
  {formFields.map((f) => (
    <option key={f.key} value={f.key}>
      {f.label}
    </option>
  ))}
</select>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={exportToCSV}
            className={`flex items-center sm:px-6 py-0.5 px-2 sm:py-2 rounded-xl sm:text-sm text-[10px] font-semibold transition-all ${theme.buttonPrimary}`}
          >
            Export
          </motion.button>
        </div>
    </div>
        {/* Table */}
        <motion.div 
         initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        
        className={`${theme.card} rounded-3xl overflow-hidden`}>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={theme.tableHeader}>
                  <th className="px-6 py-5 text-sm font-bold">No.</th>
                  <th className="px-6 py-5 text-sm font-bold">Submission ID</th>
                   <th className="px-6 py-5 text-sm font-bold">Timestamp</th>
                  {displayedFields.map(f => <th key={f.key} className="px-6 py-5 text-sm font-bold">{f.label}</th>)}
                 
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-purple-500/10' : 'divide-purple-100'}`}>
                {loading ? (
                  <tr><td colSpan={100}><TableSkeleton rows={5} columns={4} isDarkMode={isDarkMode} /></td></tr>
                ) : currentData.length === 0 ? (
                                    <tr>
                                      <td colSpan={100} className="py-32 text-center">
                                        <FaFileAlt size={48} className="mx-auto mb-4  opacity-20" />
                                        <p className={`text-xl font-bold ${theme.textSub}`}>No entries found matching your criteria</p>
                                      </td>
                                    </tr>
                                  ) : (currentData.map((resp, idx) => (
                  <motion.tr 
                    key={resp.formResponseId}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: idx * 0.05 }}
  className={`group transition-colors ${
    isDarkMode ? 'hover:bg-purple-500/5' : 'hover:bg-purple-50/50'
  }`}
                  
                  >
                    <td className="px-6 py-4 text-sm font-bold opacity-70">{(currentPage - 1) * 10 + idx + 1}</td>
                   <td className="px-6 py-4">
  <span className={`font-mono text-[10px] px-2 py-1 rounded-lg ${
    isDarkMode ? 'bg-purple-500/10 text-purple-300' : 'bg-purple-100'
  }`}>
    {resp.formResponseId.slice(-8).toUpperCase()}
  </span>
</td>

                     
                     <td className="px-6 py-4">
  <div className="flex flex-col">
    <span className="text-xs font-bold">
      {new Date(resp.createdAt).toLocaleDateString()}
    </span>
    <span className="text-[10px] opacity-50">
      {new Date(resp.createdAt).toLocaleTimeString()}
    </span>
  </div>
</td>

                  
                    {displayedFields.map(f => (
                     <td className="px-6 py-4">
  {/* <span
    className={`text-sm font-medium ${
      getResponseValue(resp.responseValue, f.formFieldId) === "—"
        ? "opacity-30"
        : ""
    }`}
  >
    {/* {getResponseValue(resp.responseValue, f.formFieldId)} */}
    {/* getResponseValue(resp.values, f.key)

  </span> */} 
  <span
  className={`text-sm font-medium ${
    getResponseValue(resp.values, f.key) === "—" ? "opacity-30" : ""
  }`}
>
  {getResponseValue(resp.values, f.key)}
</span>

</td>

                    ))}
                   
                  </motion.tr>
                )))}
              </tbody>
            </table>
          </div>
          {/* Pagination UI Location */}
{!loading && filteredData.length > 0 && (
  <div className={`p-6 flex items-center justify-between border-t ${isDarkMode ? 'border-purple-500/10' : 'border-purple-100'}`}>
   <p className={`text-xs font-bold uppercase tracking-widest ${theme.textSub}`}>
                Showing {currentPage} of {totalPages} Pages
              </p>

    <div className="flex gap-3">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-20 ${
                    isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                  }`}
      >
        Prev
      </button>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-20 ${theme.buttonPrimary}`}
                >
      
        Next
      </button>
    </div>
  </div>
)}
        </motion.div>
        
      </main>
    </div>
  );
};

export default Response;