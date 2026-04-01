


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UserNavbar from "../user/UserNavbar";
import { 
  FaSearch, FaArrowLeft, FaDownload, 
  FaDatabase, FaFilter, FaLayerGroup, FaFileAlt, FaChevronDown, 
  FaRegFileAlt, FaArrowDown
} from "react-icons/fa";
import toast from "react-hot-toast";
import usePagination from "../../hooks/usePagination";
import TableSkeleton from "./TableSkeleton";
import {motion } from "framer-motion"
import CardSkeleton from "./CardSkeleton";
import UserFooter from "../user/UserFooter";
const AdminFormResponses = () => {
  const { formId } = useParams();
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterQuestion, setFilterQuestion] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [formTitle, setFormTitle] = useState("");
 const [expandedId, setExpandedId] = useState(null);
  const theme = {
    pageBg: "bg-[#F9FAFB]",
    card: "bg-white border border-[#EAECF0] rounded-md shadow-sm",
    tableHeader: "bg-[#F9FAFB] text-[#667085]", 
    textMain: "text-[#101828]",
    textSub: "text-[#667085]",
    input: "border-[#D0D5DD] focus:ring-2 focus:ring-gray-100",
    buttonPrimary: "bg-[#101828] hover:bg-[#1d2939] text-white",
    buttonSecondary: "bg-white border border-[#D0D5DD] text-[#344054] hover:bg-gray-50"
  };

  useEffect(() => {
    fetchResponses();
  }, [formId]);

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://formbuilder-saas-backend.onrender.com/api/admin/form/responses/${formId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = res.data.data || [];
      setResponses(data);
      if (data.length > 0) setFormTitle(data[0].form?.title || "Form Responses");

      const questionMap = {};
      data.forEach((res) => {
        res.responseValue.forEach((rv) => {
          if (!questionMap[rv.formFieldId]) {
            questionMap[rv.formFieldId] = {
              id: rv.formFieldId,
              label: rv.formField.label,
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




  
  const exportToCSV = () => {
  if (filteredResponses.length === 0) {
    return toast.error("No data available to export");
  }

  // Headers: Submission ID + dynamic questions + Timestamp
  const headers = ["Submission ID", ...displayedQuestions.map(q => q.label), "Submission Date"];

  const rows = filteredResponses.map((resp) => {
    return [
      resp.formResponseId,
      // Map question values
      ...displayedQuestions.map(q => {
        const entry = resp.responseValue?.find(v => v.formFieldId === q.id);
        if (!entry) return "—";
        return Array.isArray(entry.value) ? entry.value.join(" | ") : `"${entry.value}"`;
      }),
      new Date(resp.createdAt).toLocaleString()
    ];
  });

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Responses_${formTitle.replace(/\s+/g, "_")}.csv`;
  link.click();

  toast.success("CSV Downloaded!");
};

  
   const displayedQuestions = filterQuestion === "ALL" ? questions : questions.filter((q) => q.id === filterQuestion);

  const filteredResponses = responses.filter((res) =>
    res.responseValue.some((rv) => (rv.value || "").toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(filteredResponses, 10);

  return (
    <>
    <div className={`min-h-screen ${theme.pageBg} font-sans pb-20`}>
      <UserNavbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <button
          onClick={() => navigate("/admindashboard")}
          className="flex items-center gap-2 text-sm text-[#667085] hover:text-[#101828] transition-colors mb-6"
        >
          <FaArrowLeft size={12} /> Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#101828] tracking-tight">{formTitle}</h1>
            <p className="text-[#667085] mt-1 text-sm">Analyze and manage user-submitted data.</p>
          </div>
          
          <button
            onClick={exportToCSV}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all ${theme.buttonPrimary}`}
          >
            <FaDownload size={14} /> Export CSV
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Entries', count: responses.length, icon: FaLayerGroup, color: 'text-[#132559]', bg: 'bg-[#A5B5E3]' },
            { label: 'Visible Results', count: filteredResponses.length, icon: FaFilter, color: 'text-[#758517]', bg: 'bg-[#F5FFBA]' },
            { label: 'Total Questions', count: questions.length, icon: FaRegFileAlt, color: 'text-[#17852F]', bg: 'bg-[#ABF7BB]' }
          ].map((stat, i) => (
            <div key={i} className={`${theme.card} p-5 flex items-start gap-4`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[#101828]">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>


          



                                                <div className="pr-2 py-2 p-3 rounded-md mb-8 flex flex-col md:flex-row gap-4 justify-between bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm items-center">
                            
                          
                            <div className="relative  w-full md:flex-1">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    className="w-full px-10 py-2 text-[10px] sm:border  border-black/30 sm:text-sm font-semibold placeholder:text-gray-400 border md:border-white/10 rounded-md outline-none transition-all"
                                    type="text"
                                    placeholder="Search name or email..."
                                   value={searchQuery} onChange={(e) =>setSearchQuery(e.target.value)}
                                />
                            </div>


   

   <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="w-full">

                          <select
   className={`w-full md:w-auto px-2 py-2 cursor-pointer text-[10px] sm:text-sm font-bold rounded-md border border-black/30 outline-none transition-all bg-white text-black`}
                value={filterQuestion}
                onChange={(e) => setFilterQuestion(e.target.value)}
              >
                <option value="ALL">All Questions</option>
                {questions.map((q) => (
                  <option 
                  key={q.id} value={q.id}>{q.label}</option>
                ))}
              </select>
</div>
                       </div>
                        </div>


        {/* Table Container */}
        <div className={`${theme.card} hidden md:block overflow-hidden`}>
     

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`${theme.tableHeader} border-b border-[#EAECF0]`}>
                 <th className="px-6 py-4 text-[12px] border-r border-[#E9EAEB] font-semibold text-[#535862]">
                      <div className="flex items-center gap-3">
                     
                        
                        <div className="flex items-center gap-2 group cursor-pointer">
                          <span>No.</span>
                          
                          
                             <FaArrowDown  /> 
                           
                         
                        </div>
                      </div>
                    </th>
                 <th className="px-6 py-4 border-r border-[#E9EAEB] text-[12px] font-semibold text-[#535862]">
                      <div className="flex items-center gap-3">
                     
                        
                        <div className="flex items-center gap-2 group cursor-pointer">
                          <span>
                        Ref Id
                          </span>
                          
                          
                             <FaArrowDown  /> 
                           
                         
                        </div>
                      </div>
                    </th>
                  <th className="px-6 py-4 border-r border-[#E9EAEB] text-[12px] font-semibold text-[#535862]">
                       <div className="flex items-center gap-3">
                      
                         
                         <div className="flex items-center gap-2 group cursor-pointer">
                           <span>Timestamp</span>
                           
                           
                              <FaArrowDown  /> 
                            
                          
                         </div>
                       </div>
                     </th>
                  {/* {displayedQuestions.map((q,qIndex) => {
                    const isLast = qIndex === displayedQuestions.length - 1;
                    return(
                    
                    
                    <th key={q.id} className="px-6 py-4 text-[12px] border-r border-[#E9EAEB] font-semibold text-[#535862]">
                         <div className="flex items-center gap-3">
                        
                           
                           <div className="flex items-center gap-2 group cursor-pointer">
                             <span>{q.label}</span>
                             
                             
                                <FaArrowDown  /> 
                              
                            
                           </div>
                         </div>
                       </th>
                  ))} */}
                  {displayedQuestions.map((q, qIndex) => {
  const isLast = qIndex === displayedQuestions.length - 1;
  return (
    <th 
      key={q.id} 
      className={`px-6 py-4 text-[12px] font-semibold text-[#535862] ${!isLast ? 'border-r border-[#E9EAEB]' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 group cursor-pointer">
          <span>{q.label}</span>
          <FaArrowDown />
        </div>
      </div>
    </th>
  );
})}
                </tr>
              </thead>
              <tbody className="">
                {loading ? (
                  <TableSkeleton rows={5} columns={3 } />
                ) : currentData.length === 0 ? (
                 <tr>
                                                              <td colSpan="8" className="px-6 py-20 text-center">
                     <div className="flex flex-col items-center justify-center w-full">
                       <FaFileAlt className="text-slate-400 mx-auto mb-4" size={36} />
                       <p className="font-semibold text-lg">No Records found</p>
                     </div>
                   </td>
                                                         </tr>
                ) : (
                  currentData.map((res, index) => (
                    <motion.tr key={res.formResponseId}
                      initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-[#F5F6F8] border-b border-[#E9EAEB] transition-colors group" >
                      <td className="px-6 py-4  border-r border-[#E9EAEB] text-sm text-[#667085]">
                        {index + 1 + (currentPage - 1) * 10}
                      </td>
                      <td className="px-6 py-4 border-r border-[#E9EAEB]" >
                        <span className="text-xs font-mono font-medium  text-[#344054] ">
                          {res.formResponseId.slice(-8).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm border-r border-[#E9EAEB] text-[#667085]">
                        {new Date(res.createdAt).toLocaleDateString()}
                      </td>
                      {displayedQuestions.map((q,qIndex) => {
                        const answer = res.responseValue.find((rv) => rv.formFieldId === q.id);
                        const val = answer ? (Array.isArray(answer.value) ? answer.value.join(", ") : answer.value) : "—";
                        const isLast = qIndex === displayedQuestions.length - 1;
                        return <td key={q.id} className={`px-6 py-4 text-sm text-[#475467] ${!isLast ? 'border-r border-[#E9EAEB]' : ''}`}>{val}</td>;
                      })}
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className=" px-6 py-4 border-t border-[#EAECF0] flex md:hidden items-center justify-between bg-white">
              <div className="flex gap-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border ${theme.buttonSecondary} disabled:opacity-50`}
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border ${theme.buttonSecondary} disabled:opacity-50`}
              >
                Next
              </button>
            </div>
            <p className="text-[#414651] text-sm font-medium">
              Page {currentPage} of {totalPages}
            </p>
          
          </div>
        </div>

  

  {/* --- MOBILE CARD VIEW --- */}
<div className="grid grid-cols-1 gap-4 md:hidden mb-8">
  {loading ? (
   <div className="flex flex-col gap-4">
         <CardSkeleton />
         <CardSkeleton />
           <CardSkeleton />
       </div>
  ) : currentData.length === 0 ? (
    <div className="bg-white p-10 text-center rounded-xl border border-[#E5E7EB]">
      <FaRegFileAlt size={40} className="mx-auto mb-4 text-gray-300" />
      <p className="font-bold text-gray-500">No entries found</p>
    </div>
  ) : (
    currentData.map((res, idx) => {
      
      const primaryQ = displayedQuestions[0];
      const otherQs = displayedQuestions.slice(1);
      const primaryAnswer = res.responseValue.find((rv) => rv.formFieldId === primaryQ?.id);
      const primaryVal = primaryAnswer ? (Array.isArray(primaryAnswer.value) ? primaryAnswer.value.join(", ") : primaryAnswer.value) : "—";

      return (
        <motion.div 
          key={res.formResponseId}
          className="bg-white p-3 rounded-lg border border-[#EAECF0] shadow-sm"
        >
          {/* Header: Entry No & Ref ID */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-gray-600">
              Entry {idx + 1 + (currentPage - 1) * 10}
            </span>
            <span className="text-[10px] font-mono text-gray-400">
              Ref Id: {res.formResponseId.slice(-6).toUpperCase()}
            </span>
          </div>

          {/* Primary Question  */}
          <div className="mb-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{primaryQ?.label}</p>
            <p className="text-sm font-bold text-[#101828] truncate">{primaryVal}</p>
          </div>

          {/* Toggle Button */}
          {displayedQuestions.length > 1 && (
            <button 
              onClick={() => setExpandedId(expandedId === res.formResponseId ? null : res.formResponseId)}
              className="w-full py-1.5 bg-slate-50 text-[#2B4BAB] text-xs  font-bold rounded border border-gray-200"
            >
              {expandedId === res.formResponseId ? "↑ Show Less" : `+ View ${otherQs.length} more fields`}
            </button>
          )}

          {/* Expanded Content */}
          {expandedId === res.formResponseId && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 pt-3 border-t border-gray-100 space-y-3"
            >
              {otherQs.map((q) => {
                const ans = res.responseValue.find((rv) => rv.formFieldId === q.id);
                const val = ans ? (Array.isArray(ans.value) ? ans.value.join(", ") : ans.value) : "—";
                return (
                  <div key={q.id}>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{q.label}</p>
                    <p className="text-xs font-semibold text-[#344054]">{val}</p>
                  </div>
                );
              })}
              <div className="pt-2 flex justify-between text-[10px] font-medium text-gray-400 border-t border-gray-50">
                <span>Date: {new Date(res.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      );
    })
  )}
</div>


                                   
<div className=" md:hidden flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-[#E9EAEB]">
    
    
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

export default AdminFormResponses;