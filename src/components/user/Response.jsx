


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import UserNavbar from './UserNavbar';
// import usePagination from "../../hooks/usePagination";
// import WaveBackground from '../dashboard/WaveBackground';
// import TableSkeleton from '../dashboard/TableSkeleton';
// import { useFormContext } from "../dashboard/FormContext"; 
// import { 
//   FaSearch, FaDownload, FaDatabase, 
//   FaLayerGroup, FaFilter, FaArrowLeft, FaClock,FaRegFileAlt,
//  FaArrowDown
// } from "react-icons/fa";
// import UserFooter from './userFooter'; 
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
//   const token = sessionStorage.getItem("token");
//  const [selectedField, setSelectedField] = useState("ALL");


//   // --- Theme Logic (Matching Admin UI) ---
//   const theme = {
//     pageBg: isDarkMode 
//       ? "bg-[#121212] text-white selection:bg-indigo-500/30" 
//       : "bg-[#F5F6F8] text-[#4c1d95] selection:bg-indigo-200",
//     card: isDarkMode
//       ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 "
//       : "bg-[#FFFFFF] border border-[#E5E7EB] ",
//     input: isDarkMode
//       ? "bg-[#05070f] border-[#2B4BAB] text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#2B4BAB]"
//       : "bg-white/50 border-white/60 text-indigo-800 placeholder-indigo-800 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",
//     buttonPrimary: isDarkMode
//       ? "bg-[#2B4BAB] hover:bg-[#2B4BAB] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
//       : "bg-indigo-800 text-white hover:shadow-lg hover:shadow-purple-500/30",
//     tableHeader: isDarkMode ? "bg-[#1e1b4b]/60 text-purple-300" : "bg-[#FFFFFF] text-[#535862]",
//     textSub: isDarkMode ? "text-gray-400" : "text-[#6A7181]",
//   };

//   // ... (Keep your existing fetchData and getResponseValue logic here) ...
//   // const fetchData = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const formRes = await axios.get(
//   //       `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`,
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );
//   //     setFormFields(formRes.data.data.formField);

//   //     const responsesListRes = await axios.get(
//   //       `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/responses/${formId}`,
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );
//   //     const list = responsesListRes.data.data;

//   //     const detailedResponses = await Promise.all(
//   //       list.map(resp => 
//   //         axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/response/${resp.formResponseId}`, {
//   //           headers: { Authorization: `Bearer ${token}` }
//   //         }).then(res => res.data.data)
//   //       )
//   //     ); 
//   //     setFullData(detailedResponses);
//   //   } catch (err) {
//   //     toast.error("Failed to sync response data");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };




//   const fetchData = async () => {
//   setLoading(true);
//   try {
//     const res = await axios.get(
//       `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/responses/${formId}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const data = res.data.data;

//     // Columns => formFields
//     setFormFields(data.columns);

//     // Rows => fullData
//     const normalizedRows = data.rows.map(row => ({
//       formResponseId: row.id,
//       createdAt: row.submittedAt,
//       values: row,  // Keep all fields in 'values'
//     }));
//     setFullData(normalizedRows);

//   } catch (err) {
//     toast.error("Failed to sync response data");
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => { if (formId) fetchData(); }, [formId]);

//   // const getResponseValue = (responseValues, fieldId) => {
//   //   const entry = responseValues?.find(v => v.formFieldId === fieldId);
//   //   if (!entry || !entry.value) return "—";
//   //   return Array.isArray(entry.value) ? entry.value.join(", ") : entry.value;
//   // };

//   const getResponseValue = (values, key) => {
//   if (!values || values[key] === undefined || values[key] === null) return "—";
//   return Array.isArray(values[key]) ? values[key].join(" | ") : values[key];
// };

//   //   const displayedFields =
//   // selectedField === "ALL"
//   //   ? formFields
//   //   : formFields.filter(
//   //       (f) => f.key === selectedField
//   //     );
//   const displayedFields =
//   selectedField === "ALL"
//     ? formFields
//     : formFields.filter(f => f.key === selectedField);



// //   const filteredData = fullData.filter((resp) => {
// //   // Search filter (existing)
// //   const matchesSearch = searchTerm
// //     ? resp.responseValue
// //         ?.map(e => e.value?.toString().toLowerCase() || "")
// //         .join(" ")
// //         .includes(searchTerm.toLowerCase())
// //     : true;

// //   // Question filter (NEW)
// //   const matchesQuestion =
// //     selectedField === "ALL"
// //       ? true
// //       : resp.responseValue?.some(
// //           (v) => v.formFieldId === selectedField && v.value
// //         );

// //   return matchesSearch && matchesQuestion;
// // });

// const filteredData = fullData.filter(resp => {
//   // Search filter
//   const matchesSearch = searchTerm
//     ? Object.values(resp.values)
//         .map(v => (v?.toString() || "").toLowerCase())
//         .join(" ")
//         .includes(searchTerm.toLowerCase())
//     : true;

//   // Question filter
//   const matchesField =
//     selectedField === "ALL"
//       ? true
//       : resp.values[selectedField];

//   return matchesSearch && matchesField;
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
//   // const rows = filteredData.map((resp) => {
//   //   return [
//   //     resp.formResponseId,
//   //     // For each header field, find the corresponding value in the response
//   //     ...formFields.map(field => {
//   //       const entry = resp.responseValue?.find(v => v.formFieldId === field.formFieldId);
//   //       if (!entry) return "—";
//   //       // Handle arrays (for checkboxes) by joining with a pipe | or space
//   //       return Array.isArray(entry.value) ? entry.value.join(" | ") : `"${entry.value}"`;
//   //     }),
//   //     new Date(resp.createdAt).toLocaleString()
//   //   ];
//   // });

//   const rows = filteredData.map(resp => [
//   resp.formResponseId,
//   ...formFields.map(f => {
//     const val = resp.values[f.key];
//     return Array.isArray(val) ? val.join(" | ") : val ?? "—";
//   }),
//   new Date(resp.createdAt).toLocaleString()
// ]);


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
// // const answeredFields = fullData.length > 0 
// //   ? fullData[0].responseValue?.length || 0
// //   : 0;

//   return (
//     <>
//     <div className={`min-h-screen relative font-sans transition-colors duration-500 overflow-hidden pb-20 ${theme.pageBg}`}>
//       <UserNavbar />
      
      
     

//       <main className="relative z-10 max-w-7xl mt-4 w-full  mx-auto px-4 md:px-6 md:py-5 py-12">
//         {/* Back Button */}
//         <motion.button
//           onClick={() => navigate("/form")}
//           whileHover={{ x: -5 }}
//           className={`flex items-center gap-2 sm:mb-8 mb-4  font-sans font-normal   leading-none tracking-normal align-middle transition-all   text-[#6A7181]
//           `}
//         >
//           <FaArrowLeft size={14} className=''/> <span className='hidden sm:block text-sm '>Back to Dashboard</span>
//         </motion.button>

//         {/* Header Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className={`  mb-8  relative overflow-hidden`}
//         >
//           <div className="relative z-10">
//             <span className={`px-4 py-1 rounded-md  text-xs tracking-normal leading-4 align-middle font-medium  bg-[#2B4BAB1A] text-[#2B4BAB]`}>
//               Data Analytics
//             </span>
//             <h1 className={`text-xl md:text-3xl leading-tight tracking-tight align-middle  mt-2 font-bold mb-1 text-[#14181F]`}>
//               Form Submissions
//             </h1>
//           <p className={`font-normal text-sm leading-snug tracking-normal align-middle ${theme.textSub}`}>
//                 Viewing all submitted entries. Filter by specific questions or search through text responses.

//               </p>
//         </div>
//         </motion.div>
//         {/* Stats Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mb-8">
//           {[
//             { label: 'Total Entries', count: fullData.length, icon: FaLayerGroup, bg: 'bg-[#A5B5E3]', iconColor: 'border-[#132559]' },
//             { label: 'Visible Results', count: filteredData.length, icon: FaFilter, bg: 'bg-[#F5FFBA]', iconColor: 'text-[#758517]' },
//           { label: 'Total Questions', count: formFields.length, icon: FaRegFileAlt, bg: 'bg-[#ABF7BB]', iconColor: 'text-[#17852F]' }

//           ].map((stat, i) => (
//             <motion.div key={i} className={`${theme.card} sm:p-6 p-2 rounded-xl max-w-xl h-24 flex items-center mt-4 gap-3 transition-transform hover:scale-[1.02]`}>
//               <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${stat.bg}`}>
        
//         <stat.icon size={18} className={stat.iconColor} />
//       </div>
//               <div className='font-semibold  text-sm md:text-base leading-[21px] tracking-normal align-middle'>
//                 <p className={`text-[#000000]`}>{stat.label}</p>
//                 <p className={`text-[#000000]`}>{stat.count}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Controls */}
//         <div className={`${theme.card} p-3 rounded-2xl mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between`}>
//           <div className="relative w-full md:w-96">
//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2B4BAB]" />
//             <input
//               type="text"
//               placeholder="Search across all responses..."
//               className={`w-full flex-1 px-12 sm:py-3 py-1 rounded-2xl border-none outline-none text-sm font-semibold transition-all text-[#2B4BAB]`}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div> 


//             <div className="flex flex-wrap gap-3 w-full sm:w-auto">
//           {/* <select
//   value={selectedField}
//   onChange={(e) => setSelectedField(e.target.value)}
//   className={`sm:px-6 py-1 sm:py-2 rounded-2xl sm:text-sm text-[10px] font-bold ${theme.input}`}
// >
//   <option value="ALL">All Questions</option>
//   {formFields.map((f) => (
//     <option key={f.key} value={f.key}>
//       {f.label}
//     </option>
//   ))}
// </select> */}

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             onClick={exportToCSV}
//             className={`flex items-center sm:px-6 py-0.5 px-2 sm:py-2 rounded-xl sm:text-sm text-[10px] font-semibold transition-all bg-[#2B4BAB] text-white`}
//           >
//             Export
//           </motion.button>
//         </div>
//     </div>
//         {/* Table */}
//         <motion.div 
//          initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
        
//        className={`rounded-2xl overflow-hidden mt-8 transition-all duration-300  bg-[#FFFFFF] border border-[#E5E7EB] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]`}>
//           <div className="overflow-x-auto custom-scrollbar">
//             <table className="w-full text-left border-collapse">
//               {/* <thead className={` border-b ${
//       isDarkMode ? "border-white/10" : "border-[#E5E7EB]"
//     }`}>
//                 <tr className={theme.tableHeader}>
//                <th className='px-6 py-4 text-[12px] font-semibold'>No.</th>
//                  <th className='px-6 py-4 text-[12px] font-semibold' >Submission ID</th>
                 
//                   <th className='px-6 py-4 text-[12px] font-semibold' >Timestamp</th>
                 
//                   {displayedFields.map(f => <th key={f.key} className='px-6 py-4 text-[12px] font-semibold'>{f.label}</th>)}
                 
//                 </tr>
//               </thead> */}

//               <thead className={`border-b  border-[#E5E7EB]`}>
//   <tr className={theme.tableHeader}>
//     {/* Column: No. with Checkbox and Icon */}
//     <th className="px-6 py-4 text-[12px] font-semibold text-[#535862]">
//       <div className="flex items-center gap-3">
//         {/* The Small Checkbox Box */}
//         <div className={`w-5 h-5 rounded-md border shadow-sm shrink-0 bg-white border-[#D0D5DD]
//         `} />
        
//         <div className="flex items-center gap-2 group cursor-pointer">
//           <span>No.</span>
          
          
//              <FaArrowDown  /> 
           
         
//         </div>
//       </div>
//     </th>

//     <th className="px-6 py-4 text-[12px] font-semibold text-[#535862]">
//       <div className="flex items-center gap-2 group cursor-pointer">
//         <span>Submission ID</span>
       
//            <FaArrowDown className="" />
        
//       </div>
//     </th>

//     <th className="px-6 py-4 text-[12px] font-semibold text-[#535862]">
//       <div className="flex items-center gap-2 group cursor-pointer">
//         <span>Timestamp</span>
      
//            <FaArrowDown className="" />
       
//       </div>
//     </th>

//     {displayedFields.map((f) => (
//       <th key={f.key} className="px-6 py-4 text-[12px] font-semibold text-[#535862] whitespace-nowrap">
//         <div className="flex items-center gap-2 group cursor-pointer">
//           {f.label}
         
//              <FaArrowDown className="" />
       
//         </div>
//       </th>
//     ))}
//   </tr>
// </thead>

//               <tbody className={`divide-y `}>
//                 {loading ? (
//                   <tr><td colSpan={100}><TableSkeleton rows={5} columns={4} /></td></tr>
//                 ) : currentData.length === 0 ? (
//                                     <tr>
//                                       <td colSpan={100} className="py-32 text-center">
//                                         <FaRegFileAlt size={48} className="mx-auto mb-4  opacity-20" />
//                                         <p className={`text-xl font-bold `}>No entries found matching your criteria</p>
//                                       </td>
//                                     </tr>

// ) : (currentData.map((resp, idx) => (
//                   <motion.tr 
//                     key={resp.formResponseId}
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   transition={{ delay: idx * 0.05 }}
//   className={`
//   `}
                  
//                   >
//                     <td className="px-6 py-4 text-sm font-bold opacity-70">{(currentPage - 1) * 10 + idx + 1}</td>
//                    <td className="px-6 py-4">
//   <span className={`font-mono text-[10px] px-2 py-1 rounded-lg 
//   `}>
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
//   {/* <span
//     className={`text-sm font-medium ${
//       getResponseValue(resp.responseValue, f.formFieldId) === "—"
//         ? "opacity-30"
//         : ""
//     }`}
//   >
//     {/* {getResponseValue(resp.responseValue, f.formFieldId)} */}
//     {/* getResponseValue(resp.values, f.key)

//   </span> */} 
//   <span
//   className={`text-sm font-medium    ${
//     getResponseValue(resp.values, f.key) === "—" ? "opacity-30" :""
    
        
//   }`}
// >
//   {getResponseValue(resp.values, f.key)}
// </span>

// </td>

//                     ))}
                   
//                   </motion.tr>
//                 )))}
//               </tbody>
//             </table>
//           </div>
//           {/* Pagination UI Location */}
// {!loading && filteredData.length > 0 && (
//   <div className={`p-6 flex items-center justify-between border-t border-gray-100`}>

    
//     <div className="flex gap-3">
//       <button
//         onClick={prevPage}
//         disabled={currentPage === 1}
// className={`px-4 py-2 rounded-lg text-[14px] font-semibold border transition-all disabled:opacity-50 
//          bg-white border-[#E7EAEC] text-[#344054] shadow-sm
//         `}
      
//       >
//         Previous
//       </button>

//       <button
//         onClick={nextPage}
//         disabled={currentPage === totalPages}
//        className={`px-4 py-2 rounded-lg text-[14px] font-semibold border transition-all disabled:opacity-50 bg-white border-[#E7EAEC] text-[#344054] shadow-sm
//         `}>
      
//         Next
//       </button>
//     </div>
//    <p className={`text-[14px] font-medium text-[#344054]
//     `}>
//       Page {currentPage} of {totalPages}
//     </p>

//   </div>
// )}
//         </motion.div>
       
//       </main>
      
//     </div>
//      <UserFooter/>
//      </>
//   );
// };

// export default Response;



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserNavbar from './UserNavbar';
import usePagination from "../../hooks/usePagination";
import TableSkeleton from '../dashboard/TableSkeleton';
import { 
  FaSearch, FaLayerGroup, FaArrowLeft, 
  FaRegFileAlt, FaArrowDown, FaGlobe, FaLock 
} from "react-icons/fa";
import UserFooter from './userFooter'; 

const Response = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [fullData, setFullData] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const token = sessionStorage.getItem("token");
  const [selectedField, setSelectedField] = useState("ALL");

  // --- Theme extracted from your screenshot ---
  const theme = {
    pageBg: "bg-[#F9FAFB]", // Very light gray background
    card: "bg-white border border-[#EAECF0] rounded-xl shadow-sm",
    tableHeader: "bg-[#F9FAFB] text-[#667085]", // Soft gray for headers
    textMain: "text-[#101828]", // Deep charcoal/black
    textSub: "text-[#667085]", // Slate gray
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/responses/${formId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = res.data.data;
      setFormFields(data.columns);
      const normalizedRows = data.rows.map(row => ({
        formResponseId: row.id,
        createdAt: row.submittedAt,
        values: row,
      }));
      setFullData(normalizedRows);
    } catch (err) {
      toast.error("Failed to sync response data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (formId) fetchData(); }, [formId]);

  const getResponseValue = (values, key) => {
    if (!values || values[key] === undefined || values[key] === null) return "—";
    return Array.isArray(values[key]) ? values[key].join(" | ") : values[key];
  };

  const filteredData = fullData.filter(resp => {
    const matchesSearch = searchTerm
      ? Object.values(resp.values).map(v => (v?.toString() || "").toLowerCase()).join(" ").includes(searchTerm.toLowerCase())
      : true;
    return matchesSearch;
  });

  const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(filteredData, 10); 

  return (
    <>
    <div className={`min-h-screen ${theme.pageBg} font-sans`}>
      <UserNavbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Back Link - Styled like your screenshot */}
        <button
          onClick={() => navigate("/form")}
          className="flex items-center gap-2 text-sm text-[#667085] hover:text-[#101828] transition-colors mb-6"
        >
          <FaArrowLeft size={12} /> Back to Dashboard
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#101828] tracking-tight">Form Submissions</h1>
          <p className="text-[#667085] mt-1 text-sm">
            Manage and monitor all responses for this form. You can filter and search through specific entries.
          </p>
        </div>

        {/* Stats Grid - Matching the visual style of your screenshot cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Submissions', count: fullData.length, icon: FaLayerGroup, iconBg: 'bg-[#F4F3FF]', iconColor: 'text-[#53389E]' },
            { label: 'Exportable Data', count: filteredData.length, icon: FaGlobe, iconBg: 'bg-[#F0F9FF]', iconColor: 'text-[#026AA2]' },
            { label: 'Active Fields', count: formFields.length, icon: FaLock, iconBg: 'bg-[#ECFDF3]', iconColor: 'text-[#027A48]' }
          ].map((stat, i) => (
            <div key={i} className={`${theme.card} p-5 flex items-start gap-4`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBg} ${stat.iconColor}`}>
                <stat.icon size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#101828]">{stat.label}</p>
                <p className="text-2xl font-bold text-[#101828]">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div className={`${theme.card} overflow-hidden`}>
          {/* Internal Table Search/Filter Placeholder (optional, keeping it clean) */}
          <div className="p-4 border-b border-[#EAECF0] flex justify-between items-center bg-white">
             <div className="relative w-72">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search entries..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-[#D0D5DD] rounded-lg focus:ring-1 focus:ring-gray-300 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`${theme.tableHeader} border-b border-[#EAECF0]`}>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-2">No. <FaArrowDown size={10} /></div>
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Submission ID</th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Timestamp</th>
                  {formFields.map((f) => (
                    <th key={f.key} className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                       {f.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAECF0]">
                {loading ? (
                  <tr><td colSpan={100}><TableSkeleton rows={5} columns={4} /></td></tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan={100} className="py-20 text-center text-[#667085]">
                      <FaRegFileAlt size={32} className="mx-auto mb-2 opacity-20" />
                      <p>No submissions found</p>
                    </td>
                  </tr>
                ) : (
                  currentData.map((resp, idx) => (
                    <tr key={resp.formResponseId} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-6 py-4 text-sm text-[#667085]">{(currentPage - 1) * 10 + idx + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-[#101828]">
                        {resp.formResponseId.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#667085]">
                        {new Date(resp.createdAt).toLocaleDateString()}
                      </td>
                      {formFields.map(f => (
                        <td key={f.key} className="px-6 py-4 text-sm text-[#667085]">
                          {getResponseValue(resp.values, f.key)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination - Matching the look of your bottom bar */}
          <div className="px-6 py-4 border-t border-[#EAECF0] flex items-center justify-between bg-white">
            <div className="flex gap-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-semibold text-[#344054] hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-semibold text-[#344054] hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <span className="text-sm text-[#667085]">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>
      </main>

    </div>
      <UserFooter />
    </>
  );
};

export default Response;