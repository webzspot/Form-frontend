// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import UserNavbar from "../user/UserNavbar";
// import { ChevronDown, X } from "lucide-react";
// import { 
//     FaFileAlt, 
//     FaFilter, 
//     FaCheckCircle, 
//     FaExclamationCircle, 
//     FaClock, 
//     FaTimesCircle, 
//     FaSearch,
// } from 'react-icons/fa';
// import toast from "react-hot-toast";
// import usePagination from "../../hooks/usePagination";
// import WaveBackground from "./WaveBackground";
// import TableSkeleton from './TableSkeleton';
// import { useFormContext } from './FormContext';

// const AllReports = () => {
//     const [fetchReports, setFetchReports] = useState([]); 
//     const { isDarkMode } = useFormContext(); 
//     const [loading, setLoading] = useState(true);
//     const [statusFilter, setStatusFilter] = useState("ALL");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [openStatusId, setOpenStatusId] = useState(null);

//     const token = sessionStorage.getItem("token");
//     const navigate = useNavigate();

//     const SparkleIcon = ({ className }) => (
//         <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
//             <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
//         </svg>
//     );

//     // --- THEME CONFIGURATION ---
//     const theme = {
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

//     textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/70",
//     label: isDarkMode ? "text-gray-300" : "text-[#4c1d95]",
    
//     previewBox: isDarkMode 
//       ? "bg-[#1e1b4b]/40 border-purple-500/10" 
//       : "bg-purple-50/50 border-purple-200/50",
    
//     divider: isDarkMode ? "bg-purple-500/20" : "bg-purple-200"
//   };

//     useEffect(() => {
//         fetchAllReports();
//     }, []);

//     const fetchAllReports = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.get(
//                 `https://formbuilder-saas-backend.onrender.com/api/dashboard/admin/user-reports`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setFetchReports(res.data.data);
//         } catch (err) {
//             toast.error("Failed to load reports");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleStatusChange = async (reportId, newStatus) => {
//         try {
//             await axios.patch(
//                 `https://formbuilder-saas-backend.onrender.com/api/dashboard/admin/user-report/${reportId}/status`,
//                 { status: newStatus },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
            
//             setFetchReports(prev =>
//                 prev.map(report => report.reportId === reportId ? { ...report, status: newStatus } : report)
//             );
//             toast.success(`Status updated to ${newStatus}`);
//         } catch (err) {
//             toast.error("Update failed");
//         }
//     };


//     const getStatusStyles = (status) => {
//     // Shared base classes for all badges
//     const base = "px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm transition-all ";

//     switch (status) {
//         case "RISED": 
//             // Matches your primary buttonPrimary purple
//             return base + (isDarkMode 
//                 ? "bg-violet-500/20 text-violet-400 border-violet-500/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]" 
//                 : "bg-violet-100 text-violet-700 border-violet-200");
        
//         case "INPROGRESS": 
//             // Cyan/Blue accent for action
//             return base + (isDarkMode 
//                 ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" 
//                 : "bg-cyan-50 text-cyan-700 border-cyan-200");
        
//         case "RESOLVED": 
//             // Emerald for success
//             return base + (isDarkMode 
//                 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
//                 : "bg-emerald-50 text-emerald-700 border-emerald-200");
        
//         case "REJECTED": 
//             // Rose/Red for errors
//             return base + (isDarkMode 
//                 ? "bg-rose-500/20 text-rose-400 border-rose-500/30" 
//                 : "bg-rose-50 text-rose-700 border-rose-200");
        
//         case "CLOSED": 
//             // Neutral for inactive
//             return base + (isDarkMode 
//                 ? "bg-slate-500/20 text-slate-400 border-slate-500/30" 
//                 : "bg-slate-100 text-slate-600 border-slate-300");

//         default: 
//             return base + "bg-gray-100 text-gray-700 border-gray-300";
//     }
// };

//     const filteredReports = fetchReports
//         .filter(r => statusFilter === "ALL" ? true : r.status === statusFilter)
//         .filter(r => {
//             const search = searchQuery.toLowerCase();
//             return (
//                 r.reportId.toLowerCase().includes(search) ||
//                 (r.reportData.issueType || r.reportData.sub || "").toLowerCase().includes(search)
//             );
//         });
          
//     const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(filteredReports, 10);

//     const STATUS_OPTIONS = ["RISED", "INPROGRESS", "RESOLVED", "CLOSED", "REJECTED"];

//     return (
//         <>
//             <UserNavbar />

//             <div className={`min-h-screen relative font-sans transition-colors duration-500 overflow-hidden ${theme.pageBg}`}>
//                 {/* WAVE BACKGROUNDS - Providing the 'Home' feel */}
//                 <div className="absolute inset-0 z-0 pointer-events-none">
//                     <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
//                     <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
                    
//                     <motion.div 
//                         animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }} 
//                         transition={{ duration: 4, repeat: Infinity }}
//                         className="absolute top-1/4 left-10 text-white/40 text-4xl"
//                     >
//                         <SparkleIcon className="w-8 h-8" />
//                     </motion.div>
//                 </div>
                
//                 <div className="max-w-7xl relative z-10 mx-auto px-4 py-12">
                    
//                     {/* Header Section */}
//                     <motion.div
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="mb-8"
//                     >
//                         <div className={`py-4 rounded-3xl flex px-8 mb-6 shadow-2xl ${isDarkMode ? 'bg-[#8b5cf6]/50 text-white shadow-purple-500/40' : 'bg-white text-[#6C63FF] shadow-indigo-200'}`}>
//                             <div className="text-white">
//                                 <h1 className={`text-3xl font-extrabold mb-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#4c1d95]'}`}>Support Tickets</h1>
//                                 <p className={`leading-relaxed ${theme.textSub}`}>
//                                     Manage user-submitted reports and track resolution progress across the platform.
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Status Summary Grid */}
//                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                             {[  
//                                 { label: 'New Tickets', count: fetchReports.filter(r => r.status === 'RISED').length, icon: FaExclamationCircle},
//                                 { label: 'In Progress', count: fetchReports.filter(r => r.status === 'INPROGRESS').length, icon: FaClock},
//                                 { label: 'Resolved', count: fetchReports.filter(r => r.status === 'RESOLVED').length, icon: FaCheckCircle },
//                                 { label: 'Rejected', count: fetchReports.filter(r => r.status === 'REJECTED').length, icon: FaTimesCircle},
//                             ].map((stat, i) => (
//                                 <motion.div
//                                     key={i}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: i * 0.1 }}
//                                     className={`${isDarkMode ? 'bg-[#12121a]/80 border-purple-500/10' : 'bg-white border-slate-200'} p-5 rounded-2xl shadow-md hover:shadow-xl transition-all border group hover:border-purple-400/10`}
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.bgColor} ${stat.color} shadow-sm`}>
//                                             <stat.icon size={20} />
//                                         </div>
//                                         <div>
//                                             <p className={`text-[10px] font-bold uppercase ${theme.textSub}`}>{stat.label}</p>
//                                             <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{stat.count}</p>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </motion.div>

//                     {/* Main Table Area */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className={`${theme.card} rounded-2xl overflow-hidden shadow-2xl`}
//                     >
//                         {/* Toolbar */}
//                         <div className={`p-6 border-b ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-violet-300/50'}`}>
//                             <div className="flex flex-col md:flex-row gap-4 justify-between">
//                                 <div className="relative w-full md:w-96">
//                                     <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
//                                     <input 
//                                         type="text" 
//                                         placeholder="Search by ID or issue type..."
//                                         className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 transition-all outline-none text-sm font-medium ${theme.input}`}
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                     />
//                                 </div>

//                                 <div className="flex items-center gap-3">
//                                     {/* <span className={`text font-semibold ${theme.textSub}`}></span> */}
//                                     <select
//                                         className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold outline-none cursor-pointer transition-all ${theme.input}`}
//                                         value={statusFilter}
//                                         onChange={(e) => setStatusFilter(e.target.value)}
//                                     >
//                                         <option value="ALL">All Statuses</option>
//                                         {STATUS_OPTIONS.map(status => (
//                                             <option 
//                                             className={`${isDarkMode ? 'bg-[#1e1e26] text-slate-200' : 'bg-violet-200/30 theme.input'} 
//                                             py-2 font-semibold rounded-xl hover:bg-violet-500  hover:text-white`}
//                                             key={status} value={status}>{status}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="overflow-x-auto">
//                             <table className="w-full text-left">
//                                 <thead>
//                                     <tr className={`${isDarkMode ? 'bg-white/5' : 'bg-violet-200/40'} border-b ${isDarkMode ? 'border-white/10' : 'border-slate-200/60'}`}>
//                                         <th className="px-6 py-4 text-xs font-bold uppercase ">Ref ID</th>
//                                         <th className="px-6 py-4 text-xs font-bold uppercase ">Issue Details</th>
//                                         <th className="px-6 py-4 text-center text-xs font-bold uppercase ">Status Action</th>
//                                         <th className="px-6 py-4 text-right text-xs font-bold uppercase ">Filed Date</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-slate-100'}`}>
//                                     {loading ? (
//                                         <TableSkeleton rows={5} columns={4} />
//                                     ) : currentData.length === 0 ? (
//                                         <tr>
//                                             <td colSpan="4" className="px-6 py-20 text-center">
//                                                 <FaFileAlt className="text-slate-400 mx-auto mb-4" size={36} />
//                                                 <p className="font-semibold text-lg">No reports found</p>
//                                             </td>
//                                         </tr>
//                                     ) : (
//                                         currentData.map((report, index) => (
//                                             <motion.tr
//                                                 key={report.reportId}
//                                                 className={`${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-indigo-50/40'} transition-all`}
//                                             >
//                                                 <td className="px-6 py-4">
//                                                     <span className="font-mono text-xs font-bold bg-indigo-500/10 px-2 py-1 rounded">
//                                                         #{report.reportId.slice(-8).toUpperCase()}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <div className="font-semibold text-sm mb-1">{report.reportData.issueType || report.reportData.sub}</div>
//                                                     <p className={`text-xs max-w-xs ${theme.textSub}`}>
//                                                         {report.reportData.description || report.reportData.Issue}
//                                                     </p>
//                                                 </td>
//                                                 <td className="px-6 py-4 relative">
//                                                     <div className="flex justify-center">
//                                                         <button
//                                                             onClick={() => setOpenStatusId(openStatusId === report.reportId ? null : report.reportId)}
//                                                             className={`w-36 px-4 py-2 rounded-full border-2 text-xs font-bold flex items-center justify-between transition-all shadow-sm ${getStatusStyles(report.status)}`}
//                                                         >
//                                                             <span className="flex-1">{report.status}</span>
//                                                             <ChevronDown size={14} />
//                                                         </button>
//                                                     </div>

//                                                     <AnimatePresence>
//                                                         {openStatusId === report.reportId && (
//                                                             <motion.div
//                                                                 initial={{ opacity: 0, scale: 0.95 }}
//                                                                 animate={{ opacity: 1, scale: 1 }}
//                                                                 exit={{ opacity: 0, scale: 0.95 }}
//                                                                 className={`absolute z-50 left-1/2 -translate-x-1/2 mt-2 border rounded-xl shadow-2xl p-2 w-44 ${isDarkMode ? 'bg-[#1a1a25] border-white/20' : 'bg-white border-slate-200'}`}
//                                                             >
//                                                                 {STATUS_OPTIONS.map((status) => (
//                                                                     <div
//                                                                         key={status}
//                                                                         onClick={() => {
//                                                                             handleStatusChange(report.reportId, status);
//                                                                             setOpenStatusId(null);
//                                                                         }}
//                                                                         className={`px-3 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all mb-1 ${report.status === status ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-500/10'}`}
//                                                                     >
//                                                                         {status}
//                                                                     </div>
//                                                                 ))}
//                                                             </motion.div>
//                                                         )}
//                                                     </AnimatePresence>
//                                                 </td>
//                                                 <td className="px-6 py-4 text-right">
//                                                     <span className={`text-xs font-semibold px-2 py-1 rounded ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
//                                                         {new Date(report.createdAt).toLocaleDateString()}
//                                                     </span>
//                                                 </td>
//                                             </motion.tr>
//                                         ))
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>

//                         {/* Pagination */}
//                         <div className={`flex justify-between items-center px-6 py-4 border-t ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50/50'}`}>
//                             <span className={`text-sm font-semibold ${theme.textSub}`}>
//                                 Page {currentPage} of {totalPages}
//                             </span>
//                             <div className="flex gap-2">
//                                 <button
//                                     onClick={prevPage}
//                                     disabled={currentPage === 1}
//                               className={`px-5 py-2 border rounded-xl font-semibold transition-all flex items-center gap-2
//                 ${isDarkMode 
//                     ? "border-purple-500/20 text-gray-400 hover:bg-purple-500/10" 
//                     : "border-purple-200/50 text-[#4c1d95] hover:bg-purple-50"
//                 } 
//                 disabled:opacity-20 disabled:cursor-not-allowed`}
//         >
//                                     Prev
//                                 </button>
//                                 <button
//                                     onClick={nextPage}
//                                     disabled={currentPage === totalPages}
//                                 className={`px-6 py-2 rounded-xl font-semibold transition-all shadow-md flex items-center gap-2
//                 ${theme.buttonPrimary} 
//                 disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed`}
//         >
//                                     Next
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AllReports;

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiClock, FiCheckCircle, FiXCircle, FiActivity, 
  FiSearch, FiLayers, FiTrendingUp, FiChevronDown 
} from 'react-icons/fi'; 
import { FaRegFileAlt } from "react-icons/fa";
import UserNavbar from "../user/UserNavbar";
import TableSkeleton from './TableSkeleton';
import usePagination from "../../hooks/usePagination";
import toast from 'react-hot-toast';

const AllReports = () => {
  const token = sessionStorage.getItem("token");
  const [fetchReports, setFetchReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [openStatusId, setOpenStatusId] = useState(null);

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
      setFetchReports(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reportId, newStatus) => {
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
            { label: 'New/Pending', count: stats.pending, icon: FiClock, bg: 'bg-[#FFE5B4]', iconColor: 'text-[#B45309]' },
            { label: 'Resolved', count: stats.resolved, icon: FiCheckCircle, bg: 'bg-[#ABF7BB]', iconColor: 'text-[#17852F]' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
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

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-2xl mb-8 flex flex-col sm:flex-row gap-4 justify-between border border-gray-100 shadow-sm">
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2B4BAB]" />
            <input
              type="text"
              placeholder="Search by ID or Issue..."
              className="w-full px-12 py-3 rounded-2xl outline-none text-sm font-semibold border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-6 py-2 rounded-2xl text-sm font-bold border border-gray-200 outline-none bg-white cursor-pointer hover:border-indigo-500 transition-all"
          >
            <option value="ALL">All Statuses</option>
            {STATUS_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-[#E5E7EB]">
                <tr className="text-[#535862]">
                  <th className="px-6 py-4 text-[12px] font-semibold">No.</th>
                  <th className="px-6 py-4 text-[12px] font-semibold">Ref ID</th>
                  <th className="px-6 py-4 text-[12px] font-semibold">Issue Details</th>
                  <th className="px-6 py-4 text-center text-[12px] font-semibold">Status Action</th>
                  <th className="px-6 py-4 text-right text-[12px] font-semibold">Date Filed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={5}><TableSkeleton rows={6} columns={5} /></td></tr>
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
                      <tr key={report.reportId} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {(currentPage - 1) * 10 + idx + 1}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-[11px] px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                            #{report.reportId.slice(-8).toUpperCase()}
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
                              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all ${statusStyle.color}`}
                            >
                              {statusStyle.icon}
                              <span>{report.status}</span>
                              <FiChevronDown className={`transition-transform ${openStatusId === report.reportId ? 'rotate-180' : ''}`} />
                            </button>
                          </div>

                          <AnimatePresence>
                            {openStatusId === report.reportId && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-1.5 w-40"
                              >
                                {STATUS_OPTIONS.map((opt) => (
                                  <div
                                    key={opt}
                                    onClick={() => {
                                      handleStatusChange(report.reportId, opt);
                                      setOpenStatusId(null);
                                    }}
                                    className={`px-3 py-2 text-[11px] font-bold rounded-lg cursor-pointer transition-all mb-1 
                                      ${report.status === opt ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-50 text-indigo-600'}`}
                                  >
                                    {opt}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && filteredReports.length > 0 && (
            <div className="p-6 flex items-center justify-between border-t border-gray-100 bg-gray-50/30">
              <p className="text-[14px] font-medium text-[#344054]">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={prevPage} 
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-xl bg-white text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-all"
                >
                  Previous
                </button>
                <button 
                  onClick={nextPage} 
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl disabled:opacity-50 hover:bg-indigo-700 shadow-sm transition-all"
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

export default AllReports;