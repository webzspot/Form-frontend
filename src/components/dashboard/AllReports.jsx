import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { 
    FaFileAlt, 
    FaFilter, 
    FaCheckCircle, 
    FaExclamationCircle, 
    FaClock, 
    FaTimesCircle, 
    FaSearch 
} from 'react-icons/fa';
import toast, { Toaster } from "react-hot-toast";


const AllReports = () => {
    const [fetchReports, setFetchReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    
    const token = localStorage.getItem("token");
    

    const STATUS_OPTIONS = ["RISED", "INPROGRESS", "RESOLVED", "CLOSED", "REJECTED"];

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
            console.error("Error", err);
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
            console.error("Error", err);
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "RESOLVED": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "INPROGRESS": return "bg-blue-100 text-blue-700 border-blue-200";
            case "RISED": return "bg-amber-100 text-amber-700 border-amber-200";
            case "CLOSED": return "bg-slate-100 text-slate-700 border-slate-200";
            case "REJECTED": return "bg-rose-100 text-rose-700 border-rose-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
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

    return (
        <>
         
        <UserNavbar/>
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 lg:p-10 font-sans">
        
            
            {/* Header Section */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Support Tickets</h1>
                    <p className="text-slate-500 mt-1 text-sm md:text-base">Monitor and manage user-reported issues and feedback.</p>
                </div>
                
                <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                    <div className="px-4 py-2 border-r border-slate-100">
                        <span className="block text-[10px] uppercase font-bold text-slate-400">Total</span>
                        <span className="text-lg font-bold text-slate-700">{fetchReports.length}</span>
                    </div>
                    <div className="px-4 py-2">
                        <span className="block text-[10px] uppercase font-bold text-slate-400">Filtered</span>
                        <span className="text-lg font-bold text-indigo-600">{filteredReports.length}</span>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'New Tickets', count: fetchReports.filter(r => r.status === 'RISED').length, icon: FaExclamationCircle, color: 'text-amber-500' },
                    { label: 'In Progress', count: fetchReports.filter(r => r.status === 'INPROGRESS').length, icon: FaClock, color: 'text-blue-500' },
                    { label: 'Resolved', count: fetchReports.filter(r => r.status === 'RESOLVED').length, icon: FaCheckCircle, color: 'text-emerald-500' },
                    { label: 'Rejected', count: fetchReports.filter(r => r.status === 'REJECTED').length, icon: FaTimesCircle, color: 'text-rose-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-slate-50 ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-xl font-bold text-slate-800">{stat.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                
                {/* Filters Toolbar */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input 
                            type="text" 
                            placeholder="Search by ID or issue type..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-sm bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mr-2">
                            <FaFilter size={12} /> Filter:
                        </div>
                        <select
                            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold bg-white focus:ring-4 focus:ring-indigo-500/10 outline-none cursor-pointer hover:border-indigo-200 transition-all"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="ALL">All Statuses</option>
                            {STATUS_OPTIONS.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold tracking-widest">
                                <th className="px-6 py-4">Reference ID</th>
                                <th className="px-6 py-4">Issue Details</th>
                                <th className="px-6 py-4 text-center">Status Action</th>
                                <th className="px-6 py-4 text-right">Filed Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="4" className="px-6 py-4"><div className="h-10 bg-slate-100 rounded-lg w-full"></div></td>
                                    </tr>
                                ))
                            ) : filteredReports.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-16 text-center">
                                        <FaFileAlt className="mx-auto text-slate-200 mb-4" size={48} />
                                        <p className="text-slate-500 font-medium">No reports found matching your criteria</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredReports.map((report) => (
                                    <tr key={report.reportId} className="hover:bg-indigo-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors cursor-help" title={report.reportId}>
                                                #{report.reportId.slice(-8).toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800 text-sm md:text-base">
                                                {report.reportData.issueType || report.reportData.sub}
                                            </div>
                                            <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-[300px] truncate" title={report.reportData.description || report.reportData.Issue}>
                                                {report.reportData.description || report.reportData.Issue}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-bold ${getStatusStyles(report.status)}`}
                                                >
                                                    <select
                                                        className="bg-transparent outline-none cursor-pointer appearance-none"
                                                        value={report.status}
                                                        onChange={(e) => handleStatusChange(report.reportId, e.target.value)}
                                                    >
                                                        {STATUS_OPTIONS.map((status) => (
                                                            <option key={status} value={status} className="bg-white text-slate-800">{status}</option>
                                                        ))}
                                                    </select>
                                                </motion.div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-xs font-semibold text-slate-400">
                                                {new Date(report.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
};

export default AllReports;