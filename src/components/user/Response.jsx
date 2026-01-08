import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserNavbar from './UserNavbar';
import usePagination from "../../hooks/usePagination";

import { 
  ArrowLeft, 
  FileSpreadsheet, 
  RefreshCcw, 
  Search, 
} from 'lucide-react';

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
  const getResponseValue = (responseValues, fieldId) => {
    const entry = responseValues?.find(v => v.formFieldId === fieldId);
    if (!entry) return <span className="text-gray-300">—</span>;
    return Array.isArray(entry.value) ? entry.value.join(", ") : entry.value;
  };

  // Filter logic for search
  const filteredData = fullData.filter(resp => 
    JSON.stringify(resp.responseValue).toLowerCase().includes(searchTerm.toLowerCase()) ||
    resp.formResponseId.toLowerCase().includes(searchTerm.toLowerCase())
  );
   
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
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavbar />
      
      <main className="max-w-[1600px] mx-auto p-6 md:p-10">
        
        {/* Top Navigation & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <button 
              onClick={() => navigate('/form')}
              className="group flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-all text-sm font-semibold mb-3"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Workspace
            </button>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              Form Analytics 
              <span className="text-sm font-medium bg-violet-100 text-violet-700 px-3 py-1 rounded-full">
                {fullData.length} Total
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search responses..."
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 outline-none w-64 transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={fetchData}
              className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-all shadow-sm"
              title="Refresh Data"
            >
              <RefreshCcw size={20} className={loading ? "animate-spin text-violet-600" : ""} />
            </button>
            <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg shadow-slate-200">
              <FileSpreadsheet size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] w-16 text-center">No.</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Submission ID</th>
                  
                  {/* DYNAMIC HEADER LABELS */}
                  {formFields.map((field) => (
                    <th 
                      key={field.formFieldId} 
                      className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] min-w-[220px]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                        {field.label}
                      </div>
                    </th>
                  ))}
                  
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-right">Timestamp</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                   <tr>
                    <td colSpan={formFields.length + 3} className="py-32">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-400 font-medium animate-pulse">Syncing data from server...</p>
                      </div>
                    </td>
                  </tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan={formFields.length + 3} className="py-32 text-center text-slate-400 italic">
                      No results found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  currentData.map((resp, index) => (
                    <tr 
                      key={resp.formResponseId} 
                      className="group hover:bg-violet-50/40 transition-all duration-200"
                    >
                      <td className="px-6 py-5 text-sm font-bold text-slate-300 text-center">{index + 1}</td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded-md group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors">
                          {resp.formResponseId.slice(0, 8)}...
                        </span>
                      </td>

                      {/* DYNAMIC CELLS - ALIGNED TO HEADERS */}
                      {formFields.map((field) => (
                        <td key={field.formFieldId} className="px-6 py-5">
                          <p className="text-sm text-slate-700 font-semibold leading-relaxed">
                            {getResponseValue(resp.responseValue, field.formFieldId)}
                          </p>
                        </td>
                      ))}

                      <td className="px-6 py-5 text-right whitespace-nowrap">
                        <div className="inline-flex flex-col items-end">
                          <span className="text-xs font-bold text-slate-800">
                            {new Date(resp.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                            {new Date(resp.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
        

          
          </div>
          
          {/* Footer Info */}
          {!loading && (
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
             
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Live Data Sync Active</span>
              </div>
            </div>
          )} 

  
          {!loading && filteredData.length > 0 && (
  <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-slate-50">
    <span className="text-sm text-slate-500">
      Page {currentPage} of {totalPages}
    </span>

    <div className="flex gap-2">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-lg disabled:opacity-50"
      >
        Prev
      </button>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-violet-600 text-white rounded-lg disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
)}

        </div>
      </main>
    </div>
  );
};

export default Response;




