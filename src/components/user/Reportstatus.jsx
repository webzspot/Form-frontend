// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FiBarChart2, FiAlertCircle, FiCheckCircle, FiClock, 
//   FiXCircle, FiTrendingUp, FiActivity, FiFilter, FiLayers 
// } from 'react-icons/fi'; 
// import UserNavbar from './UserNavbar';
// import WaveBackground from '../dashboard/WaveBackground';
// import Footer from '../landingPage/Footer';
// import { useFormContext } from "../dashboard/FormContext";
// import LoadingScreen from '../shared/LoadingScreen';
// import UserFooter from './userFooter';

// // --- Custom Sparkle Icon for consistency ---
// const SparkleIcon = ({ className }) => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
//     <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
//   </svg>
// );

// const Reportstatus = () => {
//   const { isDarkMode } = useFormContext(); 
//   const token = localStorage.getItem("token");
//   const [userReportStatus, setUserReportStatus] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "https://formbuilder-saas-backend.onrender.com/api/dashboard/user-report",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setUserReportStatus(response.data.data || []);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to load reports");
//       } finally {
//          setLoading(false);
//       }
//     };
//     if (token) fetchReport();
//   }, [token]);

//   const stats = useMemo(() => {
//     const total = userReportStatus.length;
//     const resolved = userReportStatus.filter(r => r.status?.toUpperCase() === 'RESOLVED').length;
//     const pending = userReportStatus.filter(r => r.status?.toUpperCase() === 'RISED').length;
//     const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;
//     return { total, resolved, pending, rate };
//   }, [userReportStatus]);

//   const getStatusDetails = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'RISED':
//         return { 
//           color: isDarkMode ? 'text-amber-300 bg-amber-500/20 border-amber-500/20' : 'text-amber-600 bg-amber-50/40 border-amber-100', 
//           icon: <FiClock />, 
//           label: 'In Review' 
//         };
//       case 'RESOLVED':
//         return { 
//           color: isDarkMode ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-600 bg-emerald-50 border-emerald-100', 
//           icon: <FiCheckCircle />, 
//           label: 'Resolved' 
//         };
//       case 'REJECTED':
//         return { 
//           color: isDarkMode ? 'text-rose-300 bg-rose-500/10 border-rose-500/20' : 'text-rose-600 bg-rose-50 border-rose-100', 
//           icon: <FiXCircle />, 
//           label: 'Declined' 
//         };
//       default:
//         return { 
//           color: isDarkMode ? 'text-slate-300 bg-slate-700/30 border-slate-600' : 'text-slate-600 bg-slate-50 border-slate-100', 
//           icon: <FiActivity />, 
//           label: status 
//         };
//     }
//   };

//   const theme = {
//     pageBg: isDarkMode 
//       ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
//       : "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95] selection:bg-purple-200",
    
//     card: isDarkMode
//       ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
//       : "bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",

//     input: isDarkMode
//       ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
//       : "bg-violet-100 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",

//     buttonPrimary: isDarkMode
//       ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
//       : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",

//     textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/40",
//     label: isDarkMode ? "text-gray-300" : "text-[#4c1d95]",
    
//     previewBox: isDarkMode 
//       ? "bg-[#1e1b4b]/40 border-purple-500/10" 
//       : "bg-purple-50/50 border-purple-200/50",
    
//     divider: isDarkMode ? "bg-purple-500/20" : "bg-purple-200"
//   };

//   if (loading) {
//     return <LoadingScreen isDarkMode={isDarkMode} />;
//   }
  
//   return (
//     <>
//     <div className={`min-h-screen relative font-sans  transition-colors duration-500 ${theme.pageBg}`}>
//       <UserNavbar />
      
//       {/* Background Effects */}
//       <WaveBackground position="top" height="h-120" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
     
//     <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
    
//       <main className="max-w-6xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
//         {/* Header Section */}
//         <div className={`flex flex-col ${theme.card} px-4 py-6 rounded-3xl md:flex-row md:items-end  justify-between mb-10 gap-4`}>
//           <div>
//             <h1 className={`sm:text-3xl text-xl font-bold flex items-center gap-3 ${theme.text}`}>
//                Report Analytics {isDarkMode && <SparkleIcon className="w-6 h-6 text-[#8b5cf6]" />}
//             </h1>
//             <p className={`mt-2 text-xs sm:text-lg ${theme.subtext}`}>Monitor and track your support tickets in real-time.</p>
//           </div>
//         </div>

//         {/* Analytics Overview Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
//           <StatBox isDarkMode={isDarkMode} label="Total Reports" value={stats.total} icon={<FiLayers />} color="text-violet-800" />
//           <StatBox isDarkMode={isDarkMode} label="Resolution Rate" value={`${stats.rate}%`} icon={<FiTrendingUp />} color="text-violet-800" />
//           <StatBox isDarkMode={isDarkMode} label="Active Tickets" value={stats.pending} icon={<FiClock />} color="text-violet-800" />
//           <StatBox isDarkMode={isDarkMode} label="Closed Tickets" value={stats.resolved} icon={<FiCheckCircle />} color="text-violet-800" />
//         </div>

//         {/* Report List UI */}
//         <div className={`rounded-3xl border overflow-hidden transition-all ${theme.card}`}>
          
//           <div className={`sm:px-8 px-2 py-6 border-b flex justify-between items-center ${theme.input}`}>
//             <h3 className={`font-bold flex items-center gap-2 ${theme.heading}`}>
//                 Recent Activity
//             </h3>
//             <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-violet-300'}`}>
//                 Live Updates
//             </span>
//           </div>

//           <div className={`divide-y ${isDarkMode ? 'divide-purple-500/10' : 'divide-slate-100'}`}>
//             {userReportStatus.length > 0 ? (
//               userReportStatus.map((report) => {
//                 const { color, icon, label } = getStatusDetails(report.status);
//                 return (
//                   <div key={report.reportId} className={`sm:p-6 p-3 transition-all group ${theme.listItem}`}>
//                     <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      
//                       {/* Left Side: Status Icon */}
//                       <div className={`hidden lg:flex sm:w-14 sm:h-14 h-8 w-8 rounded-2xl items-center justify-center sm:text-2xl shadow-sm border backdrop-blur-sm ${color}`}>
//                         {icon}
//                       </div>

//                       {/* Middle: Content */}
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <span className={`px-2.5 py-1  rounded-lg sm:text-[10px] text-[8px] font-semibold uppercase  border ${
//                               isDarkMode 
//                               ? 'bg-[#05070f] border-purple-500/30 text-purple-300' 
//                               : 'bg-violet-800 text-white border-transparent'
//                           }`}>
//                             {report.reportData?.issueType || "Task"}
//                           </span>
//                           <span className={`lg:hidden flex items-center gap-1 sm:text-xs text-[10px] font-semibold px-2 py-0.5 rounded-md ${color}`}>
//                             {report.status}
//                           </span>
//                         </div>
                        
//                         <h4 className={`font-bold sm:text-lg text-[13px] leading-tight mb-2 transition-colors group-hover:text-[#8b5cf6] ${theme.heading}`}>
//                           {report.reportData?.description}
//                         </h4>
                        
//                         <div className={`flex items-center gap-4 sm:text-xs text-[10px] font-medium ${theme.subtext}`}>
//                           <span className="flex items-center gap-1"><FiClock className={isDarkMode ? "text-purple-400" : ""} /> {new Date(report.createdAt).toLocaleDateString()}</span>
//                           <span className={`hidden sm:inline px-2 py-0.5 rounded ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>ID: {report.reportId.slice(0, 8)}</span>
//                         </div>
//                       </div>

//                       {/* Right Side: Priority & Desktop Status */}
//                       <div className={`flex items-center justify-between lg:justify-end gap-8 border-t lg:border-t-0 pt-4 lg:pt-0 ${isDarkMode ? 'border-purple-500/10' : 'border-violet-200'}`}>
//                         <div className="text-left lg:text-right">
//                           <p className={`sm:text-[16px] text-[13px] font-bold mb-1 ${isDarkMode ? 'text-gray-500' : 'text-violet-800'}`}>Priority</p>
//                           <p className={`sm:text-sm text-[10px] font-bold ${
//                               report.reportData?.priority === 'High' 
//                               ? 'text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]' 
//                               : (isDarkMode ? 'text-gray-300' : 'text-slate-600')
//                           }`}>
//                             {report.reportData?.priority || 'Low'}
//                           </p>
//                         </div>
//                         <div className={`hidden lg:flex items-center gap-2 px-5 py-2 rounded-xl border text-sm font-bold shadow-sm backdrop-blur-md ${color}`}>
//                           {icon} {label}
//                         </div>
//                       </div>

//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="py-20 text-center">
//                 <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${isDarkMode ? 'bg-[#05070f] text-gray-600 border border-purple-500/20' : 'bg-slate-50 text-slate-300'}`}>
//                   <FiAlertCircle size={40} />
//                 </div>
//                 <p className={`font-medium text-lg ${theme.subtext}`}>No reports match your criteria.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
    
//     <UserFooter/>
//     </>
//   );
// };

// // Sub-component for Analytics Stats
// const StatBox = ({ label, value, icon, color, isDarkMode }) => (
//   <div className={`sm:p-6 px-2 py-1 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
//       isDarkMode 
//       ? 'bg-[#12121a]/60 backdrop-blur-xl border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)] hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]' 
//       : 'bg-white border-slate-200 shadow-sm hover:shadow-lg'
//   }`}>
//     <div className={`sm:w-12 sm:h-12 w-6 h-6 rounded-xl flex items-center justify-center sm:mb-4 mb-2 mt-1 text-2xl border ${
//         isDarkMode 
//         ? `bg-opacity-10 bg-black border-white/10 ${color}` 
//         : `bg-slate-50 border-slate-100 ${color.replace('400', '600')}`
//     }`}>
//       {icon}
//     </div>
//     <p className={`sm:text-sm text-xs font-bold  ${isDarkMode ? 'text-gray-500' : 'text-slate-400'}`}>{label}</p>
//     <h3 className={`sm:text-3xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{value}</h3>
//   </div>
// );

// export default Reportstatus;


import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { 
  FiClock, FiCheckCircle, FiXCircle, FiActivity, 
  FiSearch, FiLayers, FiTrendingUp, FiArrowDown 
} from 'react-icons/fi'; 
import { FaRegFileAlt } from "react-icons/fa";
import UserNavbar from './UserNavbar';
import TableSkeleton from '../dashboard/TableSkeleton';
import UserFooter from './userFooter';
import usePagination from "../../hooks/usePagination";

const Reportstatus = () => {
  const token = localStorage.getItem("token");
  const [userReportStatus, setUserReportStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://formbuilder-saas-backend.onrender.com/api/dashboard/user-report",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserReportStatus(response.data.data || []);
      } catch (err) {
        console.error("Failed to load reports", err);
      } finally {
        setLoading(false);
      }
    };
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
    card: "bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm",
    input: "bg-white border-gray-200 text-[#14181F] focus:ring-indigo-500",
    textSub: "text-[#6A7181]"
  };

  return (
    <>
    <div className={`min-h-screen font-sans ${theme.pageBg} pb-20`}>
      <UserNavbar />
      <main className="max-w-7xl mt-4 w-full mx-auto px-4 md:px-6 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <span className="px-4 py-1 rounded-md text-xs font-medium bg-[#2B4BAB1A] text-[#2B4BAB]">
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
            <div key={i} className={`${theme.card} p-6 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow`}>
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
        <div className={`${theme.card} p-3 rounded-2xl mb-8 flex flex-col sm:flex-row gap-4 justify-between`}>
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2B4BAB]" />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full px-12 py-3 rounded-2xl outline-none text-sm font-semibold border ${theme.input}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-6 py-2 rounded-2xl text-sm font-bold border outline-none ${theme.input}`}
          >
            <option value="ALL">All Status</option>
            <option value="RISED">In Review</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Declined</option>
          </select>
        </div>

        {/* Table */}
        <div className={`rounded-2xl overflow-hidden ${theme.card}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-[#E5E7EB]">
                <tr className="text-[#535862]">
                  <th className="px-6 py-4 text-[12px] font-semibold">No.</th>
                  <th className="px-6 py-4 text-[12px] font-semibold">Report ID</th>
                  <th className="px-6 py-4 text-[12px] font-semibold">Issue Details</th>
                  <th className="px-6 py-4 text-[12px] font-semibold">Status</th>
                  <th className="px-6 py-4 text-[12px] font-semibold">Priority</th>
                  <th className="px-6 py-4 text-[12px] font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan={6}><TableSkeleton rows={6} columns={6} isDarkMode={false} /></td></tr>
                ) : currentData.length === 0 ? (
                  <tr><td colSpan={6} className="py-20 text-center"><p className="text-[#6A7181]">No reports found.</p></td></tr>
                ) : (
                  currentData.map((report, idx) => {
                    const status = getStatusBadge(report.status);
                    return (
                      <tr key={report.reportId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-400">{(currentPage - 1) * 10 + idx + 1}</td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-[10px] px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                            {report.reportId.slice(-8).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-indigo-900 uppercase">{report.reportData?.issueType}</span>
                            <span className="text-sm text-gray-600 line-clamp-1">{report.reportData?.description}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${status.color}`}>
                            {status.icon} {status.label}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-slate-600">{report.reportData?.priority || 'Low'}</td>
                        <td className="px-6 py-4 text-[11px] font-medium text-gray-600">
                          {new Date(report.createdAt).toLocaleDateString()}
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
            <div className="p-6 flex items-center justify-between border-t border-gray-100">
              <p className="text-[14px] font-medium text-[#344054]">Page {currentPage} of {totalPages}</p>
              <div className="flex gap-3">
                <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 rounded-lg text-[14px] font-semibold border bg-white text-[#344054] disabled:opacity-50">Previous</button>
                <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 rounded-lg text-[14px] font-semibold border bg-white text-[#344054] disabled:opacity-50">Next</button>
              </div>
            </div>
          )}
        </div>
      </main>
     
    </div>
     <UserFooter />
     </>
  );
};

export default Reportstatus;