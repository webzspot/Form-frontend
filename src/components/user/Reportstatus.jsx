import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FiBarChart2, FiAlertCircle, FiLoader, FiCheckCircle, FiClock, FiXCircle, FiTrendingUp, FiActivity, FiFilter } from 'react-icons/fi'; 
import { FaSpinner } from 'react-icons/fa';
import UserNavbar from './UserNavbar';
import WaveBackground from '../dashboard/WaveBackground';
const Reportstatus = () => {
  const token = localStorage.getItem("token");
  const [userReportStatus, setUserReportStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err.response?.data?.message || "Failed to load reports");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchReport();
  }, [token]);

  // 1. Analytics Calculations
  const stats = useMemo(() => {
    const total = userReportStatus.length;
    const resolved = userReportStatus.filter(r => r.status?.toUpperCase() === 'RESOLVED').length;
    const pending = userReportStatus.filter(r => r.status?.toUpperCase() === 'RISED').length;
    const rate = total > 0 ? Math.round((resolved / total) * 100) : 0;
    return { total, resolved, pending, rate };
  }, [userReportStatus]);

  const getStatusDetails = (status) => {
    switch (status?.toUpperCase()) {
      case 'RISED':
        return { color: 'text-amber-600 bg-amber-50 border-amber-100', icon: <FiClock />, label: 'In Review' };
      case 'RESOLVED':
        return { color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: <FiCheckCircle />, label: 'Resolved' };
      case 'REJECTED':
        return { color: 'text-rose-600 bg-rose-50 border-rose-100', icon: <FiXCircle />, label: 'Declined' };
      default:
        return { color: 'text-slate-600 bg-slate-50 border-slate-100', icon: <FiActivity />, label: status };
    }
  };

  if (loading) return (
    // <div className="h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
    //   <div className="relative flex items-center justify-center">
    //     <div className="w-20 h-20 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin"></div>
    //     <FiActivity className="absolute text-violet-600 text-2xl" />
    //   </div>
    //   <p className="mt-4 text-slate-500 font-semibold animate-pulse">Analyzing Report Data...</p>
    // </div>
     <div className="relative min-h-screen flex flex-col items-center justify-center bg-white">
          {/* Waves in background */}
          <WaveBackground position="top" height="h-96" color="#6c2bd9" opacity={0.25} />
          <WaveBackground position="bottom" height="h-96" color="#6c2bd9" opacity={0.25} />
    
          {/* FormCraft Logo */}
          <div className="flex items-center gap-3 z-10 mb-8">
            <div className="w-12 h-12 bg-[#6C3BFF] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">⧉</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">FormCraft</h1>
          </div>
    
          {/* Spinner */}
          <FaSpinner className="z-10 text-indigo-600 text-4xl animate-spin" />
        </div>
  );

  return (
    <div className="min-h-screen relative font-sans bg-[#F8FAFC]">
      <UserNavbar />
      <WaveBackground position="top" />
         <WaveBackground position="bottom"  />
      <main className="max-w-6xl  relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Report Analytics</h1>
            <p className="text-slate-500 mt-1 font-medium">Monitor and track your support tickets in real-time.</p>
          </div>
         
        </div>

        {/* 2. Analytics Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatBox label="Total Reports" value={stats.total} icon={<FiActivity />} color="text-blue-600" bg="bg-blue-50" />
          <StatBox label="Resolution Rate" value={`${stats.rate}%`} icon={<FiTrendingUp />} color="text-violet-600" bg="bg-violet-50" />
          <StatBox label="Active Tickets" value={stats.pending} icon={<FiClock />} color="text-amber-600" bg="bg-amber-50" />
          <StatBox label="Closed Tickets" value={stats.resolved} icon={<FiCheckCircle />} color="text-emerald-600" bg="bg-emerald-50" />
        </div>

        {/* 3. Report List UI */}
        <div className="bg-white rounded-2rem border border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h3 className="font-bold text-slate-800">Recent Activity</h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Updates</span>
          </div>

          <div className="divide-y divide-slate-100">
            {userReportStatus.length > 0 ? (
              userReportStatus.map((report) => {
                const { color, icon, label } = getStatusDetails(report.status);
                return (
                  <div key={report.reportId} className="p-6 hover:bg-slate-50/50 transition-all group">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      
                      {/* Left Side: Status Icon */}
                      <div className={`hidden lg:flex w-12 h-12 rounded-2xl items-center justify-center text-xl shadow-sm border ${color}`}>
                        {icon}
                      </div>

                      {/* Middle: Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-white uppercase">
                            {report.reportData?.issueType || "Task"}
                          </span>
                          <span className={`lg:hidden flex items-center gap-1 text-xs font-bold ${color}`}>
                            {report.status}
                          </span>
                        </div>
                        <h4 className="text-slate-800 font-bold text-lg leading-tight group-hover:text-violet-600 transition-colors">
                          {report.reportData?.description}
                        </h4>
                        <div className="flex items-center gap-4 mt-3 text-slate-400 text-xs font-medium">
                          <span className="flex items-center gap-1"><FiClock /> {new Date(report.createdAt).toLocaleDateString()}</span>
                          <span className="hidden sm:inline">ID: {report.reportId.slice(0, 8)}</span>
                        </div>
                      </div>

                      {/* Right Side: Priority & Desktop Status */}
                      <div className="flex items-center justify-between lg:justify-end gap-8 border-t border-t-black/20 lg:border-t-0 pt-4 lg:pt-0">
                        <div className="text-left lg:text-right">
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Priority</p>
                          <p className={`text-sm font-bold ${report.reportData?.priority === 'High' ? 'text-rose-500' : 'text-slate-600'}`}>
                            {report.reportData?.priority || 'Low'}
                          </p>
                        </div>
                        <div className={`hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-xl border text-sm font-bold shadow-sm ${color}`}>
                          {icon} {label}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <FiAlertCircle size={32} />
                </div>
                <p className="text-slate-500 font-medium">No reports matches your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-component for Analytics Stats
const StatBox = ({ label, value, icon, color, bg }) => (
  <div className="bg-white p-6 rounded-1.5rem border border-slate-200/60 shadow-sm hover:shadow-md transition-all">
    <div className={`w-10 h-10 ${bg} ${color} rounded-xl flex items-center justify-center mb-4 text-xl`}>
      {icon}
    </div>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
    <h3 className="text-2xl font-black text-slate-800 mt-1">{value}</h3>
  </div>
);

export default Reportstatus;