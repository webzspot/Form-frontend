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
//     FaArrowLeft 
// } from 'react-icons/fa';
// import toast from "react-hot-toast";
// import usePagination from "../../hooks/usePagination";
// import WaveBackground from "./WaveBackground";
// import TableSkeleton from './TableSkeleton';


// const AllReports = () => {
//     const [fetchReports, setFetchReports] = useState([]); 




//     const [loading, setLoading] = useState(true);
//     const [statusFilter, setStatusFilter] = useState("ALL");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [openStatusId, setOpenStatusId] = useState(null);

//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();

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
//         switch (status) {
//             case "RESOLVED": return "bg-emerald-100 text-emerald-700 border-emerald-300";
//             case "INPROGRESS": return "bg-blue-100 text-blue-700 border-blue-300";
//             case "RISED": return "bg-amber-100 text-amber-700 border-amber-300";
//             case "CLOSED": return "bg-slate-100 text-slate-700 border-slate-300";
//             case "REJECTED": return "bg-rose-100 text-rose-700 border-rose-300";
//             default: return "bg-gray-100 text-gray-700 border-gray-300";
//         }
//     };

//     const filteredReports = fetchReports
//         .filter(r => statusFilter === "ALL" ? true : r.status === statusFilter)
//         .filter(r => {
//             const search = searchQuery.toLowerCase();
//             return (
//                 r.reportId.toLowerCase().includes(search) ||
//                 (r.reportData.issueType || r.reportData.sub || "").toLowerCase().includes(search)
//             );
//         });
          
//     const {
//         currentData,
//         currentPage,
//         totalPages,
//         nextPage,
//         prevPage
//     } = usePagination(filteredReports, 10);

//     const STATUS_OPTIONS = ["RISED", "INPROGRESS", "RESOLVED", "CLOSED", "REJECTED"];

//     return (
//         <>
//             <UserNavbar />

//             <div className="min-h-screen relative  font-sans bg-linear-to-br from-slate-50 via-indigo-50/20 to-purple-50/10 px-4 py-8">
//               <WaveBackground position="top" />
// <WaveBackground position="bottom" />

              
              
              
//                 <div className="max-w-7xl relative z-10 mx-auto">
                    
//                     {/* Header Section */}
//                     <motion.div
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5 }}
//                         className="mb-8"
//                     >
//                         {/* Back Button */}
//                         <motion.button
//                             onClick={() => navigate("/admindashboard")}
//                             whileHover={{ x: -5 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl bg-white border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md font-semibold"
//                         >
//                             <FaArrowLeft size={14} />
//                             Back to Dashboard
//                         </motion.button>

//                         <div className="bg-linear-to-r from-violet-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl p-8 mb-8">
                            
//                                 <div className="text-white flex-1">
//                                     <h1 className=" text-xl md:text-4xl font-extrabold tracking-tight mb-2">Support Tickets</h1>
//                                     <p className="text-indigo-100 text-sm md:text-lg">View and manage all user-submitted support tickets in one place, track their progress, and update statuses to ensure timely resolution.</p>
//                                 </div>
                                
                           
                            
//                         </div>

//                         {/* Quick Stats Grid */}
                        
//                         <motion.div
//                             className="grid grid-cols-2 lg:grid-cols-4 gap-4"
//                             initial="hidden"
//                             animate="visible"
//                             variants={{
//                                 hidden: {},
//                                 visible: {
//                                     transition: { staggerChildren: 0.1 }
//                                 }
//                             }}
//                         >
//                             {[  
                              
                            
//                                 { label: 'New Tickets', count: fetchReports.filter(r => r.status === 'RISED').length, icon: FaExclamationCircle, color: 'text-amber-600', bgColor: 'from-amber-100 to-amber-200' },
//                                 { label: 'In Progress', count: fetchReports.filter(r => r.status === 'INPROGRESS').length, icon: FaClock, color: 'text-blue-600', bgColor: 'from-blue-100 to-blue-200' },
//                                 { label: 'Resolved', count: fetchReports.filter(r => r.status === 'RESOLVED').length, icon: FaCheckCircle, color: 'text-emerald-600', bgColor: 'from-emerald-100 to-emerald-200' },
//                                 { label: 'Rejected', count: fetchReports.filter(r => r.status === 'REJECTED').length, icon: FaTimesCircle, color: 'text-rose-600', bgColor: 'from-rose-100 to-rose-200' },
//                             ].map((stat, i) => (
//                                 <motion.div
//                                     key={i}
//                                     variants={{
//                                         hidden: { opacity: 0, y: 20 },
//                                         visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
//                                     }}
//                                     className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-200 group hover:border-indigo-200"
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         <div className={`p-4 rounded-xl bg-linear-to-br ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform shadow-sm`}>
//                                             <stat.icon size={24} />
//                                         </div>
//                                         <div>
//                                             <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
//                                             <p className="text-2xl font-extrabold text-slate-800">{stat.count}</p>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </motion.div>
//                     </motion.div>

//                     {/* Main Content Area */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: 0.2 }}
//                         className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
//                     >
                        
//                         {/* Filters Toolbar */}
//                         <div className="p-6 border-b border-slate-100 bg-linear-to-r from-slate-50 to-slate-100/50">
//                             <div className="flex flex-col md:flex-row gap-4 justify-between">
//                                 <div className="relative w-full md:w-96">
//                                     <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
//                                     <input 
//                                         type="text" 
//                                         placeholder="Search by ID or issue type..."
//                                         className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm bg-white font-medium shadow-sm"
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                     />
//                                 </div>

//                                 <div className="flex items-center gap-3">
//                                     <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
//                                         <div className="p-2 bg-indigo-100 rounded-lg">
//                                             <FaFilter size={12} className="text-indigo-600" />
//                                         </div>
//                                         Status:
//                                     </div>
//                                     <select
//                                         className="px-5 py-3 rounded-xl border-2 border-slate-200 text-sm font-bold bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none cursor-pointer hover:border-indigo-300 transition-all shadow-sm"
//                                         value={statusFilter}
//                                         onChange={(e) => setStatusFilter(e.target.value)}
//                                     >
//                                         <option value="ALL">All Statuses</option>
//                                         {STATUS_OPTIONS.map(status => (
//                                             <option key={status} value={status}>{status}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Table Container */}
//                         <div className="overflow-x-auto">
//                             <table className="w-full text-left border-collapse">
//                                 <thead>
//                                     <tr className="bg-linear-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
//                                         <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Reference ID</th>
//                                         <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">Issue Details</th>
//                                         <th className="px-6 py-4 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Status Action</th>
//                                         <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Filed Date</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-slate-100">
//                                     {loading ? (
//                                        <TableSkeleton rows={5} columns={4} />
// ): currentData.length === 0 ? (
//                                         <tr>
//                                             <td colSpan="4" className="px-6 py-20">
//                                                 <div className="text-center">
//                                                     <div className="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//                                                         <FaFileAlt className="text-slate-400" size={36} />
//                                                     </div>
//                                                     <p className="text-slate-600 font-semibold text-lg mb-1">No reports found</p>
//                                                     <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ) : (
//                                         currentData.map((report, index) => (
//                                             <motion.tr
//                                                 key={report.reportId}
//                                                 initial={{ opacity: 0, x: -20 }}
//                                                 animate={{ opacity: 1, x: 0 }}
//                                                 transition={{ duration: 0.3, delay: index * 0.05 }}
//                                                 className="hover:bg-indigo-50/40 transition-all group"
//                                             >
//                                                 <td className="px-6 py-4">
//                                                     <span className="inline-flex items-center text-xs font-mono font-bold text-indigo-600 bg-indigo-100 px-3 py-1.5 rounded-lg border-2 border-indigo-200 group-hover:bg-indigo-200 transition-colors cursor-help shadow-sm" title={report.reportId}>
//                                                         #{report.reportId.slice(-8).toUpperCase()}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <div className="font-bold text-slate-800 text-sm md:text-base mb-1">
//                                                         {report.reportData.issueType || report.reportData.sub}
//                                                     </div>
//                                                     <p className="text-xs md:text-sm text-slate-500 max-w-[300px] truncate" title={report.reportData.description || report.reportData.Issue}>
//                                                         {report.reportData.description || report.reportData.Issue}
//                                                     </p>
//                                                 </td>
                                                
//                                                 <td className="px-6 py-4 relative">
//                                                     <div className="flex justify-center">
//                                                         <motion.div
//                                                             whileHover={{ scale: 1.05 }}
//                                                             whileTap={{ scale: 0.95 }}
//                                                             onClick={() =>
//                                                                 setOpenStatusId(
//                                                                     openStatusId === report.reportId ? null : report.reportId
//                                                                 )
//                                                             }
//                                                             className={`
//                                                                 w-36
//                                                                 px-4
//                                                                 py-2
//                                                                 rounded-full
//                                                                 border-2
//                                                                 text-xs
//                                                                 font-bold
//                                                                 cursor-pointer
//                                                                 flex
//                                                                 items-center
//                                                                 justify-between
//                                                                 gap-2
//                                                                 shadow-sm
//                                                                 hover:shadow-md
//                                                                 transition-all
//                                                                 ${getStatusStyles(report.status)}
//                                                             `}
//                                                         > 
//                                                             <span className="flex-1 text-center">
//                                                                 {report.status}
//                                                             </span>
//                                                             <ChevronDown size={14} className="opacity-70" />
//                                                         </motion.div>
//                                                     </div>

//                                                     {/* Status Dropdown */}
//                                                     <AnimatePresence>
//                                                         {openStatusId === report.reportId && (
//                                                             <motion.div
//                                                                 initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                                                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                                                 exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                                                                 className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-2xl p-2 w-48"
//                                                             > 
//                                                                 {/* Close Button */}
//                                                                 <div className="flex justify-between items-center px-2 pb-2 border-b border-slate-100 mb-1">
//                                                                     <span className="text-[10px] font-bold text-slate-400 uppercase">Change Status</span>
//                                                                     <button
//                                                                         onClick={() => setOpenStatusId(null)}
//                                                                         className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
//                                                                     >
//                                                                         <X size={14} className="text-slate-500" />
//                                                                     </button>
//                                                                 </div>

//                                                                 {STATUS_OPTIONS.map((status) => (
//                                                                     <div
//                                                                         key={status}
//                                                                         onClick={() => {
//                                                                             handleStatusChange(report.reportId, status);
//                                                                             setOpenStatusId(null);
//                                                                         }}
//                                                                         className={`px-3 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all mb-1
//                                                                             ${
//                                                                                 report.status === status
//                                                                                     ? "bg-linear-to-r from-indigo-100 to-purple-100 text-indigo-700 border-2 border-indigo-300"
//                                                                                     : "hover:bg-slate-100 text-slate-700 border-2 border-transparent"
//                                                                             }
//                                                                         `}
//                                                                     >
//                                                                         {status}
//                                                                     </div>
//                                                                 ))}
//                                                             </motion.div>
//                                                         )}
//                                                     </AnimatePresence>
//                                                 </td>

//                                                 <td className=" p-2 md:px-6 md:py-4 text-right">
//                                                     <span className="inline-flex items-center  text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
//                                                         {new Date(report.createdAt).toLocaleDateString('en-US', {
//                                                             month: 'short',
//                                                             day: 'numeric',
//                                                             year: 'numeric'
//                                                         })}
//                                                     </span>
//                                                 </td>
//                                             </motion.tr>
//                                         ))
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div> 

//                         {/* Pagination */}
//                         <div className="flex justify-between items-center px-6 py-4 border-t-2 border-slate-100 bg-slate-50/50">
//                             <span className="text-sm text-slate-600 font-semibold">
//                                 Page <span className="text-indigo-600">{currentPage}</span> of <span className="text-indigo-600">{totalPages}</span>
//                             </span>

//                             <div className="flex gap-2">
//                                 <button
//                                     onClick={prevPage}
//                                     disabled={currentPage === 1}
//                                     className="px-5 py-2 border-2 border-slate-300 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 font-semibold hover:bg-slate-100 transition-all hover:border-slate-400 disabled:hover:bg-transparent disabled:hover:border-slate-300"
//                                 >
//                                     Prev
//                                 </button>

//                                 <button
//                                     onClick={nextPage}
//                                     disabled={currentPage === totalPages}
//                                     className="px-5 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:hover:from-indigo-600 disabled:hover:to-purple-600"
//                                 >
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


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import UserNavbar from "../user/UserNavbar";
import { ChevronDown, X } from "lucide-react";
import { 
    FaFileAlt, 
    FaFilter, 
    FaCheckCircle, 
    FaExclamationCircle, 
    FaClock, 
    FaTimesCircle, 
    FaSearch,
    FaArrowLeft 
} from 'react-icons/fa';
import toast from "react-hot-toast";
import usePagination from "../../hooks/usePagination";
import WaveBackground from "./WaveBackground";
import { useFormContext } from "../dashboard/FormContext";

const AllReports = () => {
    const { isDarkMode } = useFormContext();
    const [fetchReports, setFetchReports] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [openStatusId, setOpenStatusId] = useState(null);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Theme Configuration
    const theme = {
        pageBg: isDarkMode 
            ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
            : "bg-slate-50 text-slate-900 selection:bg-purple-200",
        card: isDarkMode
            ? "bg-[#12121a]/80 backdrop-blur-xl border-purple-500/20 shadow-[0_0_30px_rgba(139,92,246,0.05)]"
            : "bg-white border-slate-200 shadow-xl shadow-slate-200/40",
        headerCard: isDarkMode
            ? "bg-linear-to-r from-indigo-900 via-purple-900 to-slate-900"
            : "bg-linear-to-r from-violet-600 via-purple-600 to-indigo-700",
        tableHeader: isDarkMode 
            ? "bg-[#1e1b4b]/40 border-purple-500/20 text-purple-200"
            : "bg-linear-to-r from-slate-50 to-slate-100 text-slate-600",
        input: isDarkMode
            ? "bg-slate-900/50 border-purple-500/20 text-white focus:ring-purple-500"
            : "bg-white border-slate-200 text-slate-900 focus:ring-indigo-500",
        rowHover: isDarkMode ? "hover:bg-purple-500/5" : "hover:bg-indigo-50/40",
        textMain: isDarkMode ? "text-white" : "text-slate-800",
        textMuted: isDarkMode ? "text-gray-400" : "text-slate-500",
        border: isDarkMode ? "border-purple-500/10" : "border-slate-100"
    };

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
            setFetchReports(res.data.data);
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

    const getStatusStyles = (status) => {
        if (isDarkMode) {
            switch (status) {
                case "RESOLVED": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
                case "INPROGRESS": return "bg-blue-500/10 text-blue-400 border-blue-500/30";
                case "RISED": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
                case "CLOSED": return "bg-slate-500/10 text-slate-400 border-slate-500/30";
                case "REJECTED": return "bg-rose-500/10 text-rose-400 border-rose-500/30";
                default: return "bg-gray-500/10 text-gray-400 border-gray-500/30";
            }
        }
        switch (status) {
            case "RESOLVED": return "bg-emerald-100 text-emerald-700 border-emerald-300";
            case "INPROGRESS": return "bg-blue-100 text-blue-700 border-blue-300";
            case "RISED": return "bg-amber-100 text-amber-700 border-amber-300";
            case "CLOSED": return "bg-slate-100 text-slate-700 border-slate-300";
            case "REJECTED": return "bg-rose-100 text-rose-700 border-rose-300";
            default: return "bg-gray-100 text-gray-700 border-gray-300";
        }
    };

    const filteredReports = fetchReports
        .filter(r => statusFilter === "ALL" ? true : r.status === statusFilter)
        .filter(r => {
            const search = searchQuery.toLowerCase();
            return (
                r.reportId.toLowerCase().includes(search) ||
                (r.reportData.issueType || r.reportData.sub || "").toLowerCase().includes(search)
            );
        });
          
    const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(filteredReports, 10);

    const STATUS_OPTIONS = ["RISED", "INPROGRESS", "RESOLVED", "CLOSED", "REJECTED"];

    return (
        <div className={`min-h-screen relative font-sans transition-colors duration-500 ${theme.pageBg}`}>
            <UserNavbar />
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <WaveBackground position="top" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
                <WaveBackground position="bottom" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
            </div>

            <div className="max-w-7xl relative z-10 mx-auto px-4 py-8">
                {/* Header Section */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <motion.button
                        onClick={() => navigate("/admindashboard")}
                        whileHover={{ x: -5 }}
                        className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl border-2 transition-all font-semibold shadow-sm ${
                            isDarkMode ? "bg-slate-900 border-purple-500/30 text-purple-400 hover:bg-purple-500/10" : "bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                        }`}
                    >
                        <FaArrowLeft size={14} /> Back to Dashboard
                    </motion.button>

                    <div className={`${theme.headerCard} rounded-3xl shadow-2xl p-8 mb-8`}>
                        <div className="text-white flex-1">
                            <h1 className="text-xl md:text-4xl font-extrabold tracking-tight mb-2">Support Tickets</h1>
                            <p className={`${isDarkMode ? "text-purple-200" : "text-indigo-100"} text-sm md:text-lg`}>
                                View and manage all user-submitted support tickets, track progress, and ensure timely resolution.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'New', count: fetchReports.filter(r => r.status === 'RISED').length, icon: FaExclamationCircle, color: 'text-amber-500', bg: isDarkMode ? 'bg-amber-500/10' : 'bg-amber-100' },
                            { label: 'In Progress', count: fetchReports.filter(r => r.status === 'INPROGRESS').length, icon: FaClock, color: 'text-blue-500', bg: isDarkMode ? 'bg-blue-500/10' : 'bg-blue-100' },
                            { label: 'Resolved', count: fetchReports.filter(r => r.status === 'RESOLVED').length, icon: FaCheckCircle, color: 'text-emerald-500', bg: isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-100' },
                            { label: 'Rejected', count: fetchReports.filter(r => r.status === 'REJECTED').length, icon: FaTimesCircle, color: 'text-rose-500', bg: isDarkMode ? 'bg-rose-500/10' : 'bg-rose-100' },
                        ].map((stat, i) => (
                            <div key={i} className={`p-5 rounded-2xl border transition-all ${theme.card} group`}>
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <div>
                                        <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.textMuted}`}>{stat.label}</p>
                                        <p className={`text-xl font-extrabold ${theme.textMain}`}>{stat.count}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Main Table Area */}
                <motion.div className={`rounded-2xl border overflow-hidden ${theme.card}`}>
                    <div className={`p-6 border-b ${isDarkMode ? "bg-slate-900/40 border-purple-500/10" : "bg-slate-50 border-slate-100"}`}>
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            <div className="relative w-full md:w-96">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input 
                                    type="text" 
                                    placeholder="Search by ID or issue type..."
                                    className={`w-full pl-11 pr-4 py-3 rounded-xl border-2 transition-all outline-none text-sm font-medium ${theme.input}`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <select
                                    className={`px-5 py-3 rounded-xl border-2 text-sm font-bold outline-none cursor-pointer transition-all ${theme.input}`}
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="ALL">All Statuses</option>
                                    {STATUS_OPTIONS.map(status => <option key={status} value={status}>{status}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className={` ${theme.tableHeader} ${isDarkMode ? "border-purple-500/20" : "border-slate-200"}`}>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Reference ID</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Issue Details</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Status Action</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">Filed Date</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${theme.border}`}>
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan="4" className="px-6 py-8">
                                                <div className={`h-12 w-full rounded-xl ${isDarkMode ? "bg-slate-800/50" : "bg-slate-100"}`}></div>
                                            </td>
                                        </tr>
                                    ))
                                ) : currentData.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-20 text-center">
                                            <FaFileAlt className="mx-auto text-slate-400 mb-4" size={40} />
                                            <p className={`text-lg font-semibold ${theme.textMain}`}>No reports found</p>
                                        </td>
                                    </tr>
                                ) : (
                                    currentData.map((report, index) => (
                                        <motion.tr key={report.reportId} className={`transition-all group ${theme.rowHover}`}>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center text-xs font-mono font-bold px-3 py-1.5 rounded-lg  ${
                                                    isDarkMode ? "bg-purple-500/10 border-purple-500/20 text-purple-400" : "bg-indigo-100  text-indigo-600"
                                                }`}>
                                                    #{report.reportId.slice(-8).toUpperCase()}
                                                </span>
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                <div className={`font-bold text-sm mb-1 ${theme.textMain}`}>{report.reportData.issueType || report.reportData.sub}</div>
                                                <p className={`text-xs truncate max-w-[250px] ${theme.textMuted}`}>{report.reportData.description || report.reportData.Issue}</p>
                                            </td>
                                            <td className="px-6 py-4 relative">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => setOpenStatusId(openStatusId === report.reportId ? null : report.reportId)}
                                                        className={`w-36 px-4 py-2 rounded-full  text-xs font-bold flex items-center justify-between shadow-sm transition-all ${getStatusStyles(report.status)}`}
                                                    >
                                                        <span className="flex-1 text-center">{report.status}</span>
                                                        <ChevronDown size={14} />
                                                    </button>
                                                </div>
                                                <AnimatePresence>
                                                    {openStatusId === report.reportId && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                                            className={`absolute z-50 left-1/2 -translate-x-1/2 mt-2  rounded-xl shadow-2xl p-2 w-48 ${isDarkMode ? "bg-slate-900 border-purple-500/30" : "bg-white border-slate-200"}`}
                                                        >
                                                            <div className={`flex justify-between items-center px-2 pb-2 mb-1 ${theme.border}`}>
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Change Status</span>
                                                                <X size={14} className="cursor-pointer" onClick={() => setOpenStatusId(null)} />
                                                            </div>
                                                            {STATUS_OPTIONS.map((status) => (
                                                                <div
                                                                    key={status}
                                                                    onClick={() => { handleStatusChange(report.reportId, status); setOpenStatusId(null); }}
                                                                    className={`px-3 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all mb-1 ${
                                                                        report.status === status 
                                                                        ? (isDarkMode ? "bg-purple-500/20 text-purple-300 border border-purple-500/40" : "bg-indigo-100 text-indigo-700") 
                                                                        : (isDarkMode ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-700")
                                                                    }`}
                                                                >
                                                                    {status}
                                                                </div>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${isDarkMode ? "bg-slate-800 text-slate-400 border-purple-500/20" : "bg-slate-100 text-slate-600 border-slate-200/30"}`}>
                                                    {new Date(report.createdAt).toLocaleDateString()}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className={`flex justify-between items-center px-6 py-4 border-t-2 ${isDarkMode ? "bg-slate-900/40 border-purple-500/10" : "bg-slate-50/50 border-slate-100"}`}>
                        <span className={`text-sm font-semibold ${theme.textMuted}`}>
                            Page <span className="text-purple-500">{currentPage}</span> of {totalPages}
                        </span>
                        <div className="flex gap-2">
                            <button onClick={prevPage} disabled={currentPage === 1} className={`px-4 py-2 rounded-xl  text-sm font-bold transition-all disabled:opacity-30 ${isDarkMode ? "border-purple-500/20 text-purple-400 hover:bg-purple-500/10" : "border-slate-300 text-slate-700 hover:bg-slate-100"}`}>
                                Prev
                            </button>
                            <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-bold hover:scale-105 transition-all shadow-md disabled:opacity-30">
                                Next
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AllReports;