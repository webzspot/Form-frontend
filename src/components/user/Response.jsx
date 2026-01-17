import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserNavbar from './UserNavbar';
import usePagination from "../../hooks/usePagination";
import WaveBackground from '../dashboard/WaveBackground';
import TableSkeleton from '../dashboard/TableSkeleton';
import { 
  ArrowLeft, 
  FileSpreadsheet, 
  RefreshCcw, 
  
} from 'lucide-react';
import { FaFileAlt,FaSearch, FaDownload, FaCheckCircle, FaClock,FaArrowLeft } from "react-icons/fa";

const Response = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [fullData, setFullData] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  // 1. Core Fetch Logic: Merges Meta-data with Detailed Values
  const fetchData = async () => {
    setLoading(true);
    try {
      // Step A: Fetch Form Structure (to get Labels for Headers)
      const formRes = await axios.get(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormFields(formRes.data.data.formField);

      // Step B: Fetch the list of Response IDs
      const responsesListRes = await axios.get(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/responses/${formId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const list = responsesListRes.data.data;

      // Step C: Fetch detailed data for EVERY response to get the actual "value"
      const detailedResponses = await Promise.all(
        list.map(resp => 
          axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/response/${resp.formResponseId}`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => res.data.data)
        )
      ); 
       

              

      setFullData(detailedResponses);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Failed to sync response data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formId) fetchData();
  }, [formId]);

  // Helper to extract value based on column header
  // const getResponseValue = (responseValues, fieldId) => {
  //   const entry = responseValues?.find(v => v.formFieldId === fieldId);
  //   if (!entry) return <span className="text-gray-300">—</span>;
  //   return Array.isArray(entry.value) ? entry.value.join(", ") : entry.value;
  // };
 
 const getResponseValue = (responseValues, fieldId) => {
  if (!responseValues || !Array.isArray(responseValues)) {
    return <span className="text-gray-300">—</span>;
  }

  const entry = responseValues.find(v => v.formFieldId === fieldId);
  
  if (!entry || entry.value === null || entry.value === undefined || entry.value === "") {
    return <span className="text-gray-300">—</span>;
  }

  if (Array.isArray(entry.value) && entry.value.length === 0) {
    return <span className="text-gray-300">—</span>;
  }

  return Array.isArray(entry.value) ? entry.value.join(", ") : entry.value;
};



  // Filter logic for search
  // const filteredData = fullData.filter(resp => 
  //   JSON.stringify(resp.responseValue).toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   resp.formResponseId.toLowerCase().includes(searchTerm.toLowerCase())
  // );   

 
  const filteredData = fullData.filter((resp) => {
  if (!searchTerm) return true; // show all if search is empty

  // Flatten all field values into one string
  const flattenedValues = resp.responseValue?.map((entry) => {
    if (!entry || entry.value === null || entry.value === undefined || entry.value === "") return "";

    if (Array.isArray(entry.value) && entry.value.length > 0) {
      return entry.value.join(" "); // for checkboxes
    }

    const date = new Date(entry.value);
    if (!isNaN(date)) {
      return date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return entry.value.toString(); // text, radio, dropdown
  }).join(" ").toLowerCase();

  // Search in flattened values OR in Submission ID
  return flattenedValues.includes(searchTerm.toLowerCase()) ||
         resp.formResponseId.toLowerCase().includes(searchTerm.toLowerCase());
});




   
  //For Pagination
  const {
  currentData,
  currentPage,
  totalPages,
  nextPage,
  prevPage
} = usePagination(filteredData, 10); // 10 responses per page






  //export data in csv
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
  const rows = filteredData.map((resp) => {
    return [
      resp.formResponseId,
      // For each header field, find the corresponding value in the response
      ...formFields.map(field => {
        const entry = resp.responseValue?.find(v => v.formFieldId === field.formFieldId);
        if (!entry) return "—";
        // Handle arrays (for checkboxes) by joining with a pipe | or space
        return Array.isArray(entry.value) ? entry.value.join(" | ") : `"${entry.value}"`;
      }),
      new Date(resp.createdAt).toLocaleString()
    ];
  });

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
  return (
    <div className="min-h-screen relative font-sans bg-linear-to-br from-slate-50 via-indigo-50/20 to-purple-50/10">
      <UserNavbar />
       <WaveBackground position="top" />
  <WaveBackground position="bottom"  /> 

      <main className=" relative z-10 max-w-[1600px] mx-auto p-6 md:p-10"> 
         

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
                       className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl bg-white border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md font-semibold"
                     >
                       <FaArrowLeft size={14} />
                       Back to Dashboard
                     </motion.button>
         
                     {/* Header Card */}
                     <div className="bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl p-8">
                       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                         <div className="text-white flex-1">
                           <h1 className=" text-lg md:text-4xl font-extrabold tracking-tight mb-2">
                             Form Responses
                           </h1>
                          
                           <p className="text-indigo-200 text-sm md:text-lg">
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
                       visible: {
                         transition: { staggerChildren: 0.1 }
                       }
                     }}
                   >
                     {/* Total Responses */}
                     <motion.div
                       variants={{
                         hidden: { opacity: 0, y: 20 },
                         visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                       }}
                       className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all group hover:border-indigo-300"
                     >
                       <div className="flex items-center gap-4">
                         <div className="p-4 rounded-xl bg-linear-to-br from-indigo-100 to-indigo-200 text-indigo-600 group-hover:scale-110 transition-transform">
                           <FaFileAlt size={24} />
                         </div>
                         <div>
                           <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                             Total Responses
                           </p>
                           <p className="text-3xl font-extrabold text-slate-900">{fullData.length}</p>
                         </div>
                       </div>
                     </motion.div>
         
                     {/* Filtered Responses */}
                     <motion.div
                       variants={{
                         hidden: { opacity: 0, y: 20 },
                         visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                       }}
                       className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all group hover:border-emerald-300"
                     >
                       <div className="flex items-center gap-4">
                         <div className="p-4 rounded-xl bg-linear-to-br from-emerald-100 to-emerald-200 text-emerald-600 group-hover:scale-110 transition-transform">
                           <FaCheckCircle size={24} />
                         </div>
                         <div>
                           <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                             Filtered Responses
                           </p>
                           <p className="text-3xl font-extrabold text-slate-900">{filteredData.length}</p>
                         </div>
                       </div>
                     </motion.div>
         
                     {/* Last Submitted */}
                     <motion.div
                       variants={{
                         hidden: { opacity: 0, y: 20 },
                         visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                       }}
                       className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all group hover:border-amber-300"
                     >
                       <div className="flex items-center gap-4">
                         <div className="p-4 rounded-xl bg-linear-to-br from-amber-100 to-amber-200 text-amber-600 group-hover:scale-110 transition-transform">
                           <FaClock size={24} />
                         </div>
                         <div>
                           <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                             Last Submitted
                           </p>
                           <p className="text-sm font-bold text-slate-700">
                             {fullData.length > 0 ? new Date(fullData[fullData.length - 1].createdAt).toLocaleDateString('en-US', {
                               month: 'short',
                               day: 'numeric',
                               hour: '2-digit',
                               minute: '2-digit'
                             }) : "-"}
                           </p>
                         </div>
                       </div>
                     </motion.div>
                   </motion.div>
   



        
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-6"
>
  <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">

    {/* Search */}
    <div className="relative w-full md:w-96">
      <FaSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={14}
      />
      <input
        type="text"
        placeholder="Search responses..."
        className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 font-medium transition-all"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Actions (Export) */}
    <div className="flex items-center gap-3 flex-wrap">
      
      {/* <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={fetchData}
        className="p-3 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-all shadow-sm"
        title="Refresh Data"
      >
        <RefreshCcw
          size={18}
          className={loading ? "animate-spin text-indigo-600" : ""}
        />
      </motion.button> */}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={exportToCSV}
        className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-slate-800 to-slate-900 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
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
  className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
>
  <div className="overflow-x-auto">
    <table className="min-w-max border-collapse w-full">
      {/* Table Head */}
      <thead className="bg-linear-to-r from-slate-50 to-slate-100 sticky top-0 z-10">
        <tr className="border-b-2 border-slate-200">
          <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider text-center whitespace-nowrap">
            No.
          </th>
          <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">
            Submission ID
          </th>
          {formFields.map((field) => (
            <th key={field.formFieldId} className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">
              {field.label}
            </th>
          ))}
          <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider text-right whitespace-nowrap">
            Timestamp
          </th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody className="divide-y divide-slate-100">
        <AnimatePresence>
          {loading ? (
            <TableSkeleton rows={5} columns={formFields.length + 3} />
          ) : currentData.length === 0 ? (
            <tr>
              <td colSpan={formFields.length + 3} className="px-6 py-20 text-center">
                <div className="text-slate-400 italic">No responses yet</div>
              </td>
            </tr>
          ) : (
            currentData.map((resp, index) => (
              <motion.tr
                key={resp.formResponseId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="transition-colors hover:bg-indigo-50/40 group"
              >
                {/* No. */}
                <td className="px-6 py-4 text-sm font-bold text-slate-500 text-center whitespace-nowrap">
                  {index + 1 + (currentPage - 1) * 10}
                </td>

                {/* Submission ID */}
                <td className="px-6 py-4 text-xs font-mono text-indigo-600 bg-indigo-50 max-w-[180px] truncate whitespace-nowrap group-hover:bg-indigo-100 transition-colors">
                  {resp.formResponseId.slice(0, 8)}...
                </td>

                {/* Responses */}
                {formFields.map((field) => (
                  <td key={field.formFieldId} className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    getResponseValue(resp.responseValue, field.formFieldId) !== "—"
                      ? "bg-emerald-50/50 text-slate-700 group-hover:bg-emerald-100/50"
                      : "text-slate-400 bg-slate-50/50"
                  } transition-colors`}>
                    {getResponseValue(resp.responseValue, field.formFieldId)}
                  </td>
                ))}

                {/* Timestamp */}
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="inline-flex flex-col items-end">
                    <span className="text-xs font-bold text-slate-800">
                      {new Date(resp.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                      {new Date(resp.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))
          )}
        </AnimatePresence>
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  {!loading && filteredData.length > 0 && (
    <div className="flex justify-between items-center px-6 py-4 border-t-2 border-slate-100 bg-slate-50/50">
      <span className="text-sm text-slate-600 font-semibold">
        Page <span className="text-indigo-600">{currentPage}</span> of <span className="text-indigo-600">{totalPages}</span>
      </span>

      <div className="flex gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-5 py-2 border-2 border-slate-300 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 font-semibold hover:bg-slate-100 transition-all hover:border-slate-400 disabled:hover:bg-transparent disabled:hover:border-slate-300"
        >
          Prev
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-5 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:hover:from-indigo-600 disabled:hover:to-purple-600"
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




