


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserNavbar from './UserNavbar';
import usePagination from "../../hooks/usePagination";
import WaveBackground from '../dashboard/WaveBackground';
import TableSkeleton from '../dashboard/TableSkeleton';
import { useFormContext } from "../dashboard/FormContext"; 
import { 
  FaSearch, FaDownload, FaDatabase, 
  FaLayerGroup, FaFilter, FaArrowLeft, FaClock,FaRegFileAlt,
 FaArrowDown
} from "react-icons/fa";
import UserFooter from './UserFooter';
import CardSkeleton from '../dashboard/CardSkeleton';
import ErrorLayout from '../shared/ErrorLayout'
   


const Response = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useFormContext(); // Get theme state
  const [fullData, setFullData] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const token = sessionStorage.getItem("token");
 const [selectedField, setSelectedField] = useState("ALL");
const [expandedId, setExpandedId] = useState(null);
 const [apiError, setApiError] = useState(null); // To track the status code (404, 500, etc.)
const [errorMessage, setErrorMessage] = useState("");
  // --- Theme Logic (Matching Admin UI) ---
  const theme = {
    pageBg:"bg-[#F5F6F8] text-[#4c1d95] selection:bg-indigo-200",
    card: "bg-white border border-[#EAECF0] shadow-sm ",
    input: "bg-white/50 border-white/60 text-indigo-800 placeholder-indigo-800 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",
    buttonPrimary:"bg-[#101828] hover:bg-[#1d2939] text-white",
    tableHeader:"bg-[#FFFFFF] text-[#535862]",
    textSub:"text-[#6A7181]",
  };

 



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
    setApiError(null);
  } catch (err) {
    setApiError(err.response?.status || 500);
    setErrorMessage(err.response?.data?.message || "Failed to sync response data");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => { if (formId) fetchData(); }, [formId]);

  
  const getResponseValue = (values, key) => {
  if (!values || values[key] === undefined || values[key] === null) return "—";
  return Array.isArray(values[key]) ? values[key].join(" | ") : values[key];
};

 
  const displayedFields =
  selectedField === "ALL"
    ? formFields
    : formFields.filter(f => f.key === selectedField);


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

  
  const headers = [
    "Submission ID",
    ...formFields.map(field => field.label),
    "Submission Date"
  ];

 
  const rows = filteredData.map(resp => [
  resp.formResponseId,
  ...formFields.map(f => {
    const val = resp.values[f.key];
    return Array.isArray(val) ? val.join(" | ") : val ?? "—";
  }),
  new Date(resp.createdAt).toLocaleString()
]);


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

 if (apiError) return ( 
    <ErrorLayout 
      status={apiError} 
      message={errorMessage} 
      
      
    />
  );
   

  return (
    <>
    <div className={`min-h-screen relative font-sans transition-colors duration-500 overflow-hidden flex flex-col ${theme.pageBg}`}>
      <UserNavbar />
      
      
     

      <main className="relative z-10 max-w-7xl mt-4 w-full  mx-auto px-4 md:px-6 md:py-5 pt-8 pb-4">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/form")}
          whileHover={{ x: -5 }}
          className={`flex items-center gap-2 sm:mb-8 mb-4  font-sans font-normal   leading-none tracking-normal align-middle transition-all   text-[#6A7181]
          `}
        >
          <FaArrowLeft size={14} className=''/> <span className='hidden sm:block text-sm '>Back to Dashboard</span>
        </motion.button>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`  mb-8  relative overflow-hidden`}
        >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="">
            <span className={`px-4 py-1 rounded-md text-3xl  md:text-xs tracking-normal leading-4 align-middle font-medium  bg-[#2B4BAB1A] text-[#2B4BAB]`}>
              Data Analytics
            </span>
            <h1 className={`text-xl md:text-3xl leading-tight tracking-tight align-middle  mt-2 font-bold mb-1 text-[#14181F]`}>
              Form Submissions
            </h1>

          <p className={`font-normal text-sm leading-snug tracking-normal align-middle ${theme.textSub}`}>
                Viewing all submitted entries. Filter by specific questions or search through text responses.

              </p>
              </div>
                  <button
                          onClick={exportToCSV}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold shadow-sm transition-all ${theme.buttonPrimary}`}
                        >
                          <FaDownload size={14} /> Export CSV
                        </button>
        </div>
        </motion.div>
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mb-8">
          {[
            { label: 'Total Entries', count: fullData.length, icon: FaLayerGroup, bg: 'bg-[#A5B5E3]', iconColor: 'text-[#132559]' },
            { label: 'Visible Results', count: filteredData.length, icon: FaFilter, bg: 'bg-[#F5FFBA]', iconColor: 'text-[#758517]' },
          { label: 'Total Questions', count: formFields.length, icon: FaRegFileAlt, bg: 'bg-[#ABF7BB]', iconColor: 'text-[#17852F]' }

          ].map((stat, i) => (
            <motion.div key={i} className={`${theme.card} sm:p-6 p-2 rounded-md max-w-xl h-24 flex items-center mt-4 gap-3 `}>
              <div className={`w-10 h-10 shrink-0 rounded-md flex items-center justify-center ${stat.bg}`}>
        
        <stat.icon size={20} className={stat.iconColor} />
      </div>
              <div className='font-semibold  text-sm md:text-base leading-[21px] tracking-normal align-middle'>
                <p className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[#101828]">{stat.count}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
  
   
                                                   <div className="pr-2 py-2  rounded-md mb-8 flex flex-col md:flex-row gap-4 justify-between md:bg-[#FFFFFF] md:border md:border-[#E5E7EB] md:shadow-sm items-center">
                               
                               
                               <div className="relative  w-full md:flex-1">
                                   <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                   <input
                                       className="w-full px-10 py-2 text-[10px] sm:border text-gray-600  border-black/30 sm:text-sm font-semibold placeholder:text-gray-400 border md:border-white/10 rounded-md outline-none transition-all"
                                       type="text"
                                       placeholder="Search entries"
                                      value={searchTerm} onChange={(e) =>setSearchTerm(e.target.value)}
                                   />
                               </div>
   
   
      
   
      <div className="flex items-center gap-2 w-full md:w-auto">
           <div className="w-full">
   
                             <select
      className={`w-full md:w-auto px-2 py-2 cursor-pointer text-[10px] sm:text-sm font-bold rounded-md border border-black/30 outline-none transition-all bg-white text-black`}
                   value={selectedField}
                   onChange={(e) => setSelectedField(e.target.value)}
                 >
                   <option value="ALL">All Questions</option>
                   {formFields.map((f) => (
    <option key={f.key} value={f.key}>
      {f.label}
    </option>
  ))}
                 </select>
   </div>
                          </div>
                           </div>





        {/* Table */}
        <motion.div 
         initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        
       className={` hidden md:block rounded-md overflow-hidden mt-8 transition-all duration-300  bg-[#FFFFFF] border border-[#E5E7EB] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]`}>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
             

              <thead className={`border-b  border-[#E5E7EB]`}>
  <tr className={theme.tableHeader}>
    {/* Column: No. with Checkbox and Icon */}
    <th className="px-6 py-4 text-[12px] font-semibold border-r border-[#E9EAEB] text-[#535862]">
      <div className="flex items-center gap-3">
     
        
        <div className="flex items-center gap-2 group cursor-pointer">
          <span>No.</span>
          
          
             <FaArrowDown  /> 
           
         
        </div>
      </div>
    </th>

    <th className="px-6 py-4 text-[12px] border-r border-[#E9EAEB] font-semibold text-[#535862]">
      <div className="flex items-center gap-2 group cursor-pointer">
        <span>Ref Id</span>
       
           <FaArrowDown className="" />
        
      </div>
    </th>

    <th className="px-6 py-4 text-[12px] border-r border-[#E9EAEB] font-semibold text-[#535862]">
      <div className="flex items-center gap-2 group cursor-pointer">
        <span>Timestamp</span>
      
           <FaArrowDown className="" />
       
      </div>
    </th>


    {displayedFields.map((f, index) => {
  const isLast = index === displayedFields.length - 1;
  return (
    <th 
      key={f.key} 
      className={`px-6 py-4 text-[12px] font-semibold text-[#535862] whitespace-nowrap ${!isLast ? 'border-r border-[#E9EAEB]' : ''}`}
    >
      <div className="flex items-center gap-2 group cursor-pointer">
        {f.label}
        <FaArrowDown className="" />
      </div>
    </th>
  );
})}
  </tr>
</thead>

              <tbody className={` `}>
                {loading ? (
                 <TableSkeleton rows={5} columns={3} />
                ) : currentData.length === 0 ? (
                                    <tr>
                                      <td colSpan={100} className="py-32 text-center">
                                        <FaRegFileAlt size={48} className="mx-auto mb-4  text-gray-400" />
                                        <p className={`text-xl font-bold text-gray-500 `}>No entries found matching your criteria</p>
                                      </td>
                                    </tr>

) : (currentData.map((resp, idx) => (
                  <motion.tr 
                    key={resp.formResponseId}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: idx * 0.05 }}
    className="hover:bg-[#F5F6F8] border-b border-[#E9EAEB] transition-colors group"
                  
                  >
                    <td className="px-6 py-4 text-sm text-[#667085] border-r border-[#E9EAEB]">{(currentPage - 1) * 10 + idx + 1}</td>
                   <td className="px-6 py-4 text-sm text-[#475467] border-r border-[#E9EAEB]">
  <span className={`font-mono text-xs text-[#344054]
  `}>
    {resp.formResponseId.slice(-8).toUpperCase()}
  </span>
</td>

                     
                     <td className="px-6 py-4 text-sm text-[#667085] border-r border-[#E9EAEB]">
  <div className="flex flex-col">
    <span className="text-xs font-medium">
      {new Date(resp.createdAt).toLocaleDateString()}
    </span>
   
  </div>
</td>

                  
                  


                    {displayedFields.map((f, index) => {
  const isLast = index === displayedFields.length - 1;
  const val = getResponseValue(resp.values, f.key);
  
  return (
    <td 
      key={f.key} 
      className={`px-6 py-4 text-sm font-medium text-[#667085] ${!isLast ? 'border-r border-[#E9EAEB]' : ''}`}
    >
      <span
        className={`text-sm font-medium ${val === "—" ? "opacity-30" : ""}`}
      >
        {val}
      </span>
    </td>
  );
})}
                   
                  </motion.tr>
                )))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
{!loading && filteredData.length > 0 && (
  <div className={`p-6 hidden md:flex items-center justify-between border-t border-gray-100`}>

    
    <div className="flex gap-3">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
className={`px-4 py-2 rounded-md text-[14px] font-semibold border transition-all disabled:opacity-50 
         bg-white border-[#E7EAEC] text-[#344054] shadow-sm
        `}
      
      >
        Previous
      </button>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
       className={`px-4 py-2 rounded-md text-[14px] font-semibold border transition-all disabled:opacity-50 bg-white border-[#E7EAEC] text-[#344054] shadow-sm
        `}>
      
        Next
      </button>
    </div>
   <p className={`text-[14px] font-medium text-[#344054]
    `}>
      Page {currentPage} of {totalPages}
    </p>

  </div>
)}
        </motion.div>
          

          {/* --- MOBILE CARDS --- */}
{/* --- MOBILE CARDS --- */}
<div className="grid grid-cols-1 max-w-md w-full mb-8 gap-4 md:hidden mx-auto mt-6">
  {loading ? (
    <div className="flex flex-col gap-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  ) : currentData.length === 0 ? (
    <div className="bg-white p-10 text-center rounded-md border border-[#E5E7EB]">
       <FaRegFileAlt size={40} className="mx-auto mb-4 text-gray-300" />
       <p className="font-bold text-gray-500">No entries found</p>
    </div>
  ) : (
    currentData.map((resp, idx) => {
      // Split fields: First one is the title, the rest are hidden
      const firstField = displayedFields.slice(0, 1);
      const remainingFields = displayedFields.slice(1);
      
      // FIX: Show button if there is AT LEAST one extra field to show
      const hasMore = displayedFields.length > 1;

      return (
        <motion.div 
          key={resp.formResponseId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-white p-3 rounded-md border border-[#EAECF0] shadow-sm mb-2"
        >
          {/* Card Header: Entry No & Ref ID */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-gray-600">
              Entry {(currentPage - 1) * 10 + idx + 1}
            </span>
            <span className="text-[10px] font-mono text-gray-400">
              Ref Id: {resp.formResponseId.slice(-6).toUpperCase()}
            </span>
          </div>

          {/* Primary Question (Always Visible) */}
          <div className="mb-2">
            {firstField.map((f) => (
              <div key={f.key}>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                  {f.label}
                </p>
                <p className="text-sm font-bold text-[#101828] truncate">
                  {getResponseValue(resp.values, f.key) || "—"}
                </p>
              </div>
            ))}
          </div>

          {/* Toggle Button: Exactly like Admin version */}
          {hasMore && (
            <div className="pt-1">
              <button 
                onClick={() => setExpandedId(expandedId === resp.formResponseId ? null : resp.formResponseId)}
                className="w-full py-1.5 bg-slate-50 text-[#2B4BAB] text-xs font-bold rounded border border-gray-200 transition-all active:scale-[0.98]"
              >
                {expandedId === resp.formResponseId 
                  ? "↑ Show Less" 
                  : `+ View ${remainingFields.length} more fields`}
              </button>
            </div>
          )}

          {/* Expanded Content: Slides down when open */}
          {expandedId === resp.formResponseId && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 pt-3 border-t border-gray-100 space-y-3"
            >
              {remainingFields.map((f) => (
                <div key={f.key}>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                    {f.label}
                  </p>
                  <p className="text-xs font-semibold text-[#344054]">
                    {getResponseValue(resp.values, f.key) || "—"}
                  </p>
                </div>
              ))}
              
              {/* Submission Date inside expanded view to match Admin */}
              <div className="pt-2 flex justify-between text-[10px] font-medium text-gray-400 border-t border-gray-50">
                <span>Submitted On:</span>
                <span>{new Date(resp.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          )}

        
        </motion.div>
      );
    })
  )}
</div>

 <div className=" md:hidden flex  flex-col md:flex-row justify-between items-center gap-4 px-6  py-4 border-t border-[#E9EAEB]">
    
 
    <span className="text-sm text-[#414651] font-medium order-1 md:order-2">
        Page {currentPage} of {totalPages}
    </span>

   
    <div className="flex gap-3 w-full md:w-auto order-2 md:order-1">
        <button 
            onClick={prevPage} 
            disabled={currentPage === 1} 
            className="flex-1 md:flex-none px-5 py-2 rounded-md font-semibold text-sm border border-[#D5D7DA] text-[#414651] disabled:opacity-30 hover:bg-slate-50 transition-all"
        >
            Previous
        </button>
        <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages} 
            className="flex-1 md:flex-none px-5 py-2 rounded-md font-semibold text-sm border border-[#D5D7DA] text-[#414651] disabled:opacity-40 transition-all shadow-sm"
        >
            Next
        </button>
    </div>
</div>
      </main>
      
    </div>
     <UserFooter/>
     </>
  );
};

export default Response;

