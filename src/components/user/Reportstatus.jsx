


import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { 
  FiClock, FiCheckCircle, FiXCircle, FiActivity, 
  FiSearch, FiLayers, FiTrendingUp, FiArrowDown 
} from 'react-icons/fi'; 
import { FaRegFileAlt,FaSearch } from "react-icons/fa";
import UserNavbar from './UserNavbar';
import TableSkeleton from '../dashboard/TableSkeleton';
import UserFooter from './UserFooter';
import usePagination from "../../hooks/usePagination";
import toast from 'react-hot-toast';
import CardSkeleton from '../dashboard/CardSkeleton';
import ErrorLayout from '../shared/ErrorLayout';
const Reportstatus = () => {
  const token = sessionStorage.getItem("token");
  const [userReportStatus, setUserReportStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
 const [apiError, setApiError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

   const fetchReport = async () => {
      try {
        setLoading(true);
      
        const response = await axios.get(
          "https://formbuilder-saas-backend.onrender.com/api/dashboard/user-report",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const sortedData = (response.data.data || []).sort((a, b) => 
  new Date(b.createdAt) - new Date(a.createdAt)
);
        setUserReportStatus(sortedData);
        setApiError(null);
      } catch (error) {
       
setApiError(error.response?.status || 500); 
    
    
    setErrorMessage(error.response?.data?.message || "Check your internet connection or try again later.");
      
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
   
    if (token) fetchReport();
  }, [token]);


 

  const filteredReports = useMemo(() => {
    return userReportStatus.filter(report => {
      const matchesSearch = searchTerm
        ? report.reportData?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.reportId.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesStatus = filterStatus === "ALL" ? true : report.status?.toUpperCase() === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [userReportStatus, searchTerm, filterStatus]);



  
  const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(filteredReports, 10);

  const stats = useMemo(() => {
    const total = userReportStatus.length;
    const resolved = userReportStatus.filter(r => r.status?.toUpperCase() === 'RESOLVED').length;
    const pending = userReportStatus.filter(r => r.status?.toUpperCase() === 'RISED').length;
    const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;
    return { total, resolved, pending, rate };
  }, [userReportStatus]);

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'RISED':
        return { color: 'text-amber-600 bg-amber-50 border-amber-100', label: 'In Review', icon: <FiClock /> };
      case 'RESOLVED':
        return { color: 'text-emerald-600 bg-emerald-50 border-emerald-100', label: 'Resolved', icon: <FiCheckCircle /> };
      case 'REJECTED':
        return { color: 'text-rose-600 bg-rose-50 border-rose-100', label: 'Declined', icon: <FiXCircle /> };
      default:
        return { color: 'text-slate-600 bg-slate-50 border-slate-100', label: status, icon: <FiActivity /> };
    }
  };

  const theme = {
    pageBg: "bg-[#F5F6F8]",
    card: "",
    input: "bg-white border-gray-200 text-[#14181F] focus:ring-indigo-500",
    textSub: "text-[#6A7181]"
  };



   
  if (apiError) return ( 
    <ErrorLayout 
      status={apiError} 
      message={errorMessage} 
     
      
    />
  );
  return (
    <>
    <div className={` flex flex-col min-h-screen font-sans ${theme.pageBg} `}>
      <UserNavbar />
      <main className="max-w-7xl mt-4 w-full mx-auto px-4 md:px-6 pt-8 pb-4">
        
        {/* Header */}
        <div className="mb-8">
          <span className="px-4 py-1 rounded-md text-3xl md:text-xs font-medium bg-[#2B4BAB1A] text-[#2B4BAB]">
            Support Analytics
          </span>
          <h1 className="text-xl md:text-3xl font-bold mt-2 text-[#14181F]">Ticket Status Tracking</h1>
          <p className={`text-sm mt-1 ${theme.textSub}`}>Monitor resolution progress in real-time.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Reports', count: stats.total, icon: FiLayers, bg: 'bg-[#A5B5E3]', iconColor: 'text-[#132559]' },
            { label: 'Resolution Rate', count: `${stats.rate}%`, icon: FiTrendingUp, bg: 'bg-[#F5FFBA]', iconColor: 'text-[#758517]' },
            { label: 'Pending', count: stats.pending, icon: FiClock, bg: 'bg-[#FFE5B4]', iconColor: 'text-[#B45309]' },
            { label: 'Resolved', count: stats.resolved, icon: FiCheckCircle, bg: 'bg-[#ABF7BB]', iconColor: 'text-[#17852F]' }
          ].map((stat, i) => (
            <div  key={i} className="bg-white p-6 rounded-md flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg}`}>
                <stat.icon size={20} className={stat.iconColor} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#6A7181] uppercase">{stat.label}</p>
                <p className="text-2xl font-bold text-black">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>

       
                          <div className=" pr-2  py-2  rounded-md mb-8 flex flex-col md:flex-row gap-4 justify-between md:bg-[#FFFFFF] md:border md:border-[#E5E7EB] md:shadow-sm items-center">
      
    
      <div className="relative  w-full md:flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
              className="w-full px-10 py-2 text-[10px] sm:border  border-black/30 sm:text-sm font-semibold placeholder:text-gray-400 border md:border-white/10 rounded-md outline-none transition-all"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>
  
     
      <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="w-full">
              <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)} 
                  className={`w-full md:w-auto px-2 py-2 cursor-pointer text-[10px] sm:text-sm font-bold rounded-md border border-black/30 outline-none transition-all bg-white text-black`}
              >
                  
           <option value="ALL">All Status</option>
  <option value="RISED">In Review</option>
  <option value="INPROGRESS">In Progress</option>
  <option value="RESOLVED">Resolved</option>
  <option value="CLOSED">Closed</option>
  <option value="REJECTED">Declined</option>
              </select>
          </div>
      </div>
  </div>
        {/* Table */}
        <div className="bg-white rounded-md hidden md:block overflow-hidden border border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-[#E5E7EB]">
                <tr className="text-[#535862]">
                  <th className="px-6 py-4 text-[12px] border-r border-[#E9EAEB] font-semibold">No.</th>
                  <th className="px-6 py-4 text-[12px] border-r border-[#E9EAEB] font-semibold">Ref ID</th>
                  <th className="px-6 py-4 text-[12px] border-r border-[#E9EAEB] font-semibold">Issue Details</th>
                  <th className="px-6 py-4 text-[12px] border-r border-[#E9EAEB] font-semibold">Status</th>
                  <th className="px-6 py-4 text-[12px] border-r border-[#E9EAEB] font-semibold">Priority</th>
                  <th className="px-6 py-4 text-[12px] border-r border-[#E9EAEB] font-semibold">Date</th>
                </tr>
              </thead>
              <tbody >
                {loading ? (
                  <TableSkeleton rows={6} columns={6} isDarkMode={false} />
                ) : currentData.length === 0 ? (
                  <tr><td colSpan={6} className="py-20 text-center"><p className="text-[#6A7181]">No reports found.</p></td></tr>
                ) : (
                  currentData.map((report, idx) => {
                    const status = getStatusBadge(report.status);
                    return (
                     
                      <motion.tr key={report.reportId}    initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}    className="hover:bg-[#F5F6F8] border-b border-[#E9EAEB] transition-colors group"  >
                        <td className="px-6 border-r border-[#E9EAEB] py-4 text-sm text-gray-400">{(currentPage - 1) * 10 + idx + 1}</td>
                        <td className="px-6 border-r border-[#E9EAEB]  py-4">
                          <span className="font-mono text-[11px] text-gray-600">
                            {report.reportId.slice(-8).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 border-r border-[#E9EAEB]">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-indigo-900 uppercase">{report.reportData?.issueType}</span>
                            <span className="text-sm text-gray-600 line-clamp-1">{report.reportData?.description}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 border-r border-[#E9EAEB]">
                          <div className={`flex items-center w-30 gap-2 px-4 py-1.5 justify-start rounded-full text-[11px] font-bold border ${status.color}`}>
                            {status.icon} {status.label}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold border-r border-[#E9EAEB] text-slate-600">{report.reportData?.priority || 'Low'}</td>
                        <td className="px-6 py-4 text-[11px] font-medium text-gray-600 ">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
        

        {!loading && filteredReports.length > 0 &&( <div className="hidden md:flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-[#E9EAEB]">
 
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
</div>)}
        </div>



        {/* --- MOBILE CARDS  --- */}
<div className="grid grid-cols-1 max-w-md w-full mb-8 gap-4 md:hidden mx-auto">
  {loading ? (
    <div className="flex flex-col gap-4">
      <CardSkeleton />
      <CardSkeleton />
       <CardSkeleton />
    </div>
  ) : currentData.length === 0 ? (
    <div className="bg-white p-10 text-center rounded-xl border border-[#E9EAEB]">
       <FaRegFileAlt className="mx-auto text-gray-300 mb-4" size={36} />
       <p className="font-semibold text-lg text-slate-900">No reports found</p>
    </div>
  ) : (
    currentData.map((report, idx) => {
      const status = getStatusBadge(report.status);
      return (
        <motion.div 
          key={report.reportId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-white p-5 rounded-md border border-[#E9EAEB] shadow-sm relative"
        >
          {/* Header: Ref ID & Status Badge */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">
                Ref Id: {report.reportId.slice(-8).toUpperCase()}
              </p>
              <h3 className="text-sm font-bold text-[#14181F] uppercase leading-tight">
                {report.reportData?.issueType}
              </h3>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${status.color}`}>
              {status.icon}
              <span>{status.label}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[#6A7181] mb-2 line-clamp-2">
            {report.reportData?.description}
          </p>

          {/* Bottom Info Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-50">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Priority</p>
              <p className="text-xs font-semibold text-[#14181F]">{report.reportData?.priority || 'Low'}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Submitted On</p>
              <p className="text-xs font-semibold text-[#14181F]">
                {new Date(report.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
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
     <UserFooter />
     </>
  );
};

export default Reportstatus;