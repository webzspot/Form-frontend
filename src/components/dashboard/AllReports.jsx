
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiClock, FiCheckCircle, FiXCircle, FiActivity, 
  FiSearch, FiLayers, FiTrendingUp, FiChevronDown 
} from 'react-icons/fi'; 
import { FaRegFileAlt,FaSpinner, FaSearch } from "react-icons/fa";
import UserNavbar from "../user/UserNavbar";
import TableSkeleton from './TableSkeleton';
import usePagination from "../../hooks/usePagination";
import toast from 'react-hot-toast';
import UserFooter from '../user/UserFooter';
import CardSkeleton from './CardSkeleton';
const AllReports = () => {
  const token = sessionStorage.getItem("token");
  const [fetchReports, setFetchReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [openStatusId, setOpenStatusId] = useState(null);
  
const [updatingId, setUpdatingId] = useState(null);
  useEffect(() => {
    fetchAllReports();
  }, []);

  const fetchAllReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/admin/user-reports`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

     
    const sortedData = (res.data.data || []).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
      setFetchReports(sortedData);
    } catch (err) {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reportId, newStatus) => {

    setUpdatingId(reportId);
    try {
      await axios.patch(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/admin/user-report/${reportId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setFetchReports(prev =>
        prev.map(report => report.reportId === reportId ? { ...report, status: newStatus } : report)
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Update failed");
    }
    finally{
      setUpdatingId(null);
    }
  };

  const filteredReports = useMemo(() => {
    return fetchReports.filter(report => {
      const search = searchQuery.toLowerCase();
      const matchesSearch = report.reportId.toLowerCase().includes(search) ||
        (report.reportData?.issueType || report.reportData?.sub || "").toLowerCase().includes(search);
      
      const matchesStatus = statusFilter === "ALL" ? true : report.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [fetchReports, searchQuery, statusFilter]);

  const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(filteredReports, 10);

  const stats = useMemo(() => {
    const total = fetchReports.length;
    const resolved = fetchReports.filter(r => r.status === 'RESOLVED').length;
    const pending = fetchReports.filter(r => r.status === 'RISED').length;
    const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;
    return { total, resolved, pending, rate };
  }, [fetchReports]);

  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case 'RISED':
        return { color: 'text-amber-600 bg-amber-50 border-amber-100', label: 'In Review', icon: <FiClock /> };
      case 'RESOLVED':
        return { color: 'text-emerald-600 bg-emerald-50 border-emerald-100', label: 'Resolved', icon: <FiCheckCircle /> };
      case 'REJECTED':
        return { color: 'text-rose-600 bg-rose-50 border-rose-100', label: 'Declined', icon: <FiXCircle /> };
      case 'INPROGRESS':
        return { color: 'text-blue-600 bg-blue-50 border-blue-100', label: 'In Progress', icon: <FiActivity /> };
      default:
        return { color: 'text-slate-600 bg-slate-50 border-slate-100', label: status, icon: <FiActivity /> };
    }
  };

  const STATUS_OPTIONS = ["RISED", "INPROGRESS", "RESOLVED", "CLOSED", "REJECTED"];

  return (
    <>
    <div className="min-h-screen font-sans bg-[#F5F6F8] pb-20">
      <UserNavbar />
      
      <main className="max-w-7xl mt-4 w-full mx-auto px-4 md:px-6 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <span className="px-4 py-1 rounded-md text-xs font-medium bg-[#2B4BAB1A] text-[#2B4BAB]">
            Admin Control Panel
          </span>
          <h1 className="text-xl md:text-3xl font-bold mt-2 text-[#14181F]">Support Ticket</h1>
          <p className="text-sm mt-1 text-[#6A7181]">Manage and resolve user-submitted reports.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Tickets', count: stats.total, icon: FiLayers, bg: 'bg-[#A5B5E3]', iconColor: 'text-[#132559]' },
            { label: 'Resolution Rate', count: `${stats.rate}%`, icon: FiTrendingUp, bg: 'bg-[#F5FFBA]', iconColor: 'text-[#758517]' },
            { label: 'Pending', count: stats.pending, icon: FiClock, bg: 'bg-[#FFE5B4]', iconColor: 'text-[#B45309]' },
            { label: 'Resolved', count: stats.resolved, icon: FiCheckCircle, bg: 'bg-[#ABF7BB]', iconColor: 'text-[#17852F]' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-md flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
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
         
         
                                 <div className=" pr-2 py-2  rounded-md mb-8 flex flex-col md:flex-row gap-4 justify-between md:bg-[#FFFFFF] md:border md:border-[#E5E7EB] md:shadow-sm items-center">
              <div className="relative  w-full md:flex-1">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID or Issue..."
           className="w-full px-10 py-2 text-[10px] sm:border  border-black/30 sm:text-sm font-semibold placeholder:text-gray-400 border md:border-white/10 rounded-md outline-none transition-all"     value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
              </div>
            
             <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="w-full">
           <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`w-full md:w-auto px-2 py-2 cursor-pointer text-[10px] sm:text-sm font-bold rounded-md border border-black/30 outline-none transition-all bg-white text-black`}
          >
            <option value="ALL">All Status</option>
            {STATUS_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

        </div>
         </div>
      </div>

        {/* Table Container */}
        <div className="hidden md:block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-[#E5E7EB]">
                <tr className="text-[#535862]">
                  <th className="px-6 py-4 text-[12px] font-semibold">No.</th>
                  <th className="px-6 py-4 text-[12px] font-semibold">Ref ID</th>
                  <th className="px-6 py-4 text-[12px] font-semibold">Issue Details</th>
                  <th className="px-6 py-4 text-center text-[12px] font-semibold">Status Action</th>
                  <th className="px-6 py-4 text-right text-[12px] font-semibold">Date </th>
                </tr>
              </thead>
              <tbody className="">
                {loading ? (
                  <TableSkeleton rows={5} columns={5} />
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <FaRegFileAlt className="mx-auto text-gray-300 mb-4" size={40} />
                      <p className="text-[#6A7181] font-medium">No reports found matching your criteria.</p>
                    </td>
                  </tr>
                ) : (
                  currentData.map((report, idx) => {
                    const statusStyle = getStatusBadgeStyles(report.status);
                    return (
                      <motion.tr key={report.reportId}   initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}   className="hover:bg-[#F5F6F8] border-b border-[#E9EAEB] transition-colors group">
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {(currentPage - 1) * 10 + idx + 1}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-[11px] text-gray-600">
                            {report.reportId.slice(-8).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-indigo-900 uppercase">
                              {report.reportData?.issueType || report.reportData?.sub}
                            </span>
                            <span className="text-sm text-gray-600 line-clamp-1 max-w-xs">
                              {report.reportData?.description || report.reportData?.Issue}
                            </span>
                          </div>
                        </td>
                       <td className="px-6 py-4 relative">
  <div className="flex justify-center">
    <button
      onClick={() => setOpenStatusId(openStatusId === report.reportId ? null : report.reportId)}
      disabled={updatingId === report.reportId}
      className={`flex items-center gap-2 px-4 py-1.5 w-35 justify-between rounded-full text-[11px] font-bold border transition-all ${statusStyle.color} ${updatingId === report.reportId ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      
      {updatingId === report.reportId ? (
        <>
        <div className='flex items-center gap-4 justify-between'>
          <FaSpinner className="animate-spin" size={12} />
          <span>Updating...</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2">
            {statusStyle.icon}
            <span>{report.status}</span>
          </div>
          <FiChevronDown 
            size={14} 
            className={`transition-transform ${openStatusId === report.reportId ? 'rotate-180' : ''}`} 
          />
        </>
      )}
    </button>
  </div>

  <AnimatePresence>
    {openStatusId === report.reportId && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute z-20 left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-1.5 w-40"
      >
        {STATUS_OPTIONS.map((opt) => {
          const order = ["RISED", "INPROGRESS", "RESOLVED", "CLOSED", "REJECTED"];
          const currentIndex = order.indexOf(report.status);
          const optionIndex = order.indexOf(opt);
          const isDisable = optionIndex <= currentIndex;

          return (
            <button
              key={opt}
              disabled={isDisable}
              onClick={() => {
                handleStatusChange(report.reportId, opt);
                setOpenStatusId(null);
              }}
              className={`w-full text-left px-3 py-2 text-[11px] font-bold rounded-lg transition-all mb-1
                ${isDisable 
                  ? 'opacity-40 cursor-not-allowed text-gray-400 bg-gray-50' 
                  : 'hover:bg-indigo-50 text-indigo-600 cursor-pointer'
                }`}
            >
              {opt}
            </button>
          );
        })}
      </motion.div>
    )}
  </AnimatePresence>
</td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && filteredReports.length > 0 && (
            <div className="hidden p-6 md:flex items-center justify-between border-t border-gray-100 bg-gray-50/30">
            
              <div className="flex gap-3">
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
                  className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-all">
                  Next
                </button>
              </div>
                <p className="text-[14px] font-medium text-[#344054]">
                Page {currentPage} of {totalPages}
              </p>
            </div>
          )}
        </div>



        {/* --- MOBILE CARDS  --- */}
<div className="grid grid-cols-1 max-w-md w-full mb-8 gap-4 md:hidden mx-auto">
  {loading ? (
    <div className="flex flex-col gap-4"><CardSkeleton /><CardSkeleton /><CardSkeleton /></div>
  ) : currentData.length === 0 ? (
    <div className="bg-white p-10 text-center rounded-xl border border-[#E9EAEB]">
       <FaRegFileAlt className="mx-auto text-gray-300 mb-4" size={36} />
       <p className="font-semibold text-lg text-slate-900">No reports found</p>
    </div>
  ) : (
    currentData.map((report, idx) => {
      const statusStyle = getStatusBadgeStyles(report.status);
      return (
        <motion.div 
          key={report.reportId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-white p-5 rounded-md border border-[#E9EAEB] shadow-sm relative"
        >
         
          <div className="flex justify-between items-start mb-1">
            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">
                Ref Id: {report.reportId.slice(-8).toUpperCase()}
              </p>
              <h3 className="text-sm font-bold text-[#14181F] uppercase">
                {report.reportData?.issueType || report.reportData?.sub}
              </h3>
            </div>
            
            {/* Action Dropdown for Mobile */}
            <div className="relative">
              <button
                onClick={() => setOpenStatusId(openStatusId === report.reportId ? null : report.reportId)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${statusStyle.color}`}
              >
                {updatingId === report.reportId ? <FaSpinner className="animate-spin" /> : report.status}
                <FiChevronDown size={12} />
              </button>

            
              <AnimatePresence>
                {openStatusId === report.reportId && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-32 p-1"
                  >
                    {["RISED", "INPROGRESS", "RESOLVED", "CLOSED", "REJECTED"].map((opt) => {
                      const order = ["RISED", "INPROGRESS", "RESOLVED", "CLOSED", "REJECTED"];
                      const isDisable = order.indexOf(opt) <= order.indexOf(report.status);
                      return (
                        <button
                          key={opt}
                          disabled={isDisable}
                          onClick={() => { handleStatusChange(report.reportId, opt); setOpenStatusId(null); }}
                          className={`w-full text-left px-2 py-1.5 text-[10px] font-bold rounded mb-1 ${
                            isDisable ? 'opacity-30 text-gray-400' : 'hover:bg-indigo-50 text-indigo-600'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[#6A7181] mb-2 line-clamp-2">
            {report.reportData?.description || report.reportData?.Issue}
          </p>

          
          <div className="flex justify-between items-center pt-1 border-t border-slate-50">
            <span className="text-[10px] font-bold text-slate-400">TICKET #{(currentPage - 1) * 10 + idx + 1}</span>
            <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {new Date(report.createdAt).toLocaleDateString()}
            </span>
          </div>
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

export default AllReports;