// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // 1. Added missing import
// import { FiBarChart2, FiAlertCircle, FiLoader } from 'react-icons/fi';
// import UserNavbar from './UserNavbar';

// const Reportstatus = () => {
//   const token = localStorage.getItem("token");
//   const [userReportStatus, setUserReportStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // 2. Wrap the API call in useEffect so it runs on mount
//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "https://formbuilder-saas-backend.onrender.com/api/dashboard/user-report",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         // Assuming your backend returns data in response.data.data
//         setUserReportStatus(response.data.data);
//         console.log(response.data.data)
//       } catch (err) {
//         console.error("Report Fetch Error:", err);
//         setError(response.data.data.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) {
//       fetchReport();
//     }
//   }, [token]);

//   if (loading) return (
//     <div className="flex flex-col items-center justify-center p-10 space-y-4">
//       <FiLoader className="animate-spin text-violet-600 text-3xl" />
//       <p className="text-slate-500 font-medium">Generating your report...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="flex items-center font-semibold gap-2 text-red-500 p-10 justify-center">
//       <FiAlertCircle /> <span>{error}</span>
//     </div>
//   );

//   return (
//    <>
//    <UserNavbar/>
//     <div className="p-6 max-w-4xl mt-5 mx-auto">
        
//       <div className="flex items-center gap-3 mb-8">
//         <div className="p-3 bg-violet-100 text-violet-600 rounded-2xl">
//           <FiBarChart2 size={24} />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-slate-800">Usage Report</h2>
//           <p className="text-slate-500 text-sm">Overview of your form activities</p>
//         </div>
//       </div>

//       {/* 3. Displaying Data Dynamically */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatusCard 
//           label="Total Fields Created" 
//           value={userReportStatus?.totalFields || 0} 
//           color="bg-blue-500" 
//         />
//         <StatusCard 
//           label="Submissions Received" 
//           value={userReportStatus?.totalSubmissions || 0} 
//           color="bg-emerald-500" 
//         />
//         <StatusCard 
//           label="Active Forms" 
//           value={userReportStatus?.activeForms || 0} 
//           color="bg-violet-500" 
//         />
//       </div>
//     </div>
//     </>
//   );
// };
 
// // Reusable UI Component for Stats
// const StatusCard = ({ label, value, color }) => (
//   <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
//     <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{label}</p>
//     <div className="flex items-center gap-4">
//       <div className={`w-2 h-8 rounded-full ${color}`} />
//       <span className="text-3xl font-black text-slate-800">{value}</span>
//     </div>
//   </div>
  
// );
 

// export default Reportstatus;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FiBarChart2, FiAlertCircle, FiLoader, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
// import UserNavbar from './UserNavbar';

// const Reportstatus = () => {
//   const token = localStorage.getItem("token");
//   const [userReportStatus, setUserReportStatus] = useState([]); // Initialized as array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "https://formbuilder-saas-backend.onrender.com/api/dashboard/user-report",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         // Based on your log, response.data.data is the array
//         setUserReportStatus(response.data.data || []);
//       } catch (err) {
//         console.error("Report Fetch Error:", err);
//         setError(err.response?.data?.message || "Failed to load reports");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) fetchReport();
//   }, [token]);

//   // Helper to get status colors and icons
//   const getStatusDetails = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'RISED':
//         return { color: 'text-blue-600 bg-blue-50', icon: <FiClock />, label: 'Raised' };
//       case 'RESOLVED':
//         return { color: 'text-emerald-600 bg-emerald-50', icon: <FiCheckCircle />, label: 'Resolved' };
//       case 'REJECTED':
//         return { color: 'text-red-600 bg-red-50', icon: <FiXCircle />, label: 'Rejected' };
//       default:
//         return { color: 'text-slate-600 bg-slate-50', icon: <FiClock />, label: status };
//     }
//   };

//   if (loading) return (
//     <div className="h-screen flex flex-col items-center justify-center p-10 space-y-4">
//       <FiLoader className="animate-spin text-violet-600 text-4xl" />
//       <p className="text-slate-500 font-medium tracking-wide">Fetching report history...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50/50">
//       <UserNavbar />
//       <div className="p-6 max-w-5xl mt-10 mx-auto">
        
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-white shadow-sm text-violet-600 rounded-2xl border border-slate-100">
//               <FiBarChart2 size={24} />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-slate-800">Support Tickets</h2>
//               <p className="text-slate-500 text-sm">Track the status of your reported issues</p>
//             </div>
//           </div>
//           <div className="px-4 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-400 uppercase tracking-widest">
//             {userReportStatus.length} Reports
//           </div>
//         </div>

//         {error ? (
//           <div className="bg-red-50 border border-red-100 p-6 rounded-3xl flex items-center gap-3 text-red-600">
//             <FiAlertCircle size={24} />
//             <p className="font-semibold">{error}</p>
//           </div>
//         ) : userReportStatus.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
//             <p className="text-slate-400 font-medium">No reports found.</p>
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {userReportStatus.map((report) => {
//               const { color, icon, label } = getStatusDetails(report.status);
//               return (
//                 <div key={report.reportId} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
//                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-100 text-slate-500">
//                           {report.reportData?.issueType || "General Issue"}
//                         </span>
//                         <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${color}`}>
//                           {icon} {label}
//                         </span>
//                       </div>
//                       <h3 className="font-bold text-slate-700 text-lg">
//                         {report.reportData?.description}
//                       </h3>
//                       <p className="text-slate-400 text-xs mt-2">
//                         Reported on {new Date(report.createdAt).toLocaleDateString()} at {new Date(report.createdAt).toLocaleTimeString()}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-6 border-t md:border-t-0 pt-4 md:pt-0">
//                       <div className="text-center">
//                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Priority</p>
//                         <p className={`font-bold text-sm ${report.reportData?.priority === 'High' ? 'text-orange-500' : 'text-slate-600'}`}>
//                           {report.reportData?.priority || 'Low'}
//                         </p>
//                       </div>
//                       <div className="w-px h-8 bg-slate-100 hidden md:block" />
//                       <div className="text-right">
//                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Report ID</p>
//                         <p className="font-mono text-[10px] text-slate-400">#{report.reportId.slice(0, 8)}</p>
//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Reportstatus;



import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FiBarChart2, FiAlertCircle, FiLoader, FiCheckCircle, FiClock, FiXCircle, FiTrendingUp, FiActivity, FiFilter } from 'react-icons/fi';
import UserNavbar from './UserNavbar';

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
        console.log(response.data.data)
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
    <div className="h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin"></div>
        <FiActivity className="absolute text-violet-600 text-2xl" />
      </div>
      <p className="mt-4 text-slate-500 font-semibold animate-pulse">Analyzing Report Data...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
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
                      <div className="flex items-center justify-between lg:justify-end gap-8 border-t lg:border-t-0 pt-4 lg:pt-0">
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