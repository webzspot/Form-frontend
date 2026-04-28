// // // import React, { useEffect, useState } from 'react';
// // // import UserNavbar from './UserNavbar';
// // // import axios from 'axios';
// // // import { 
// // //   Calendar, CreditCard, RefreshCw, Zap, ArrowLeft, 
// // //   ShieldCheck, Download, Copy, ExternalLink, Info 
// // // } from 'lucide-react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { Link } from 'react-router-dom';
// // // import UserFooter from './UserFooter';
// // // import toast from 'react-hot-toast';
// // // import { Loader2 } from 'lucide-react';
// // // import { useNavigate } from 'react-router-dom';
// // // import ErrorLayout from '../shared/ErrorLayout'
// // // const Plandetail = () => {
// // //   const [subscription, setSubscription] = useState(null);
// // //   const [userStats, setUserStats] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [apiError, setApiError] = useState(null);
// // // const [errorMessage, setErrorMessage] = useState("");
// // //   const navigate=useNavigate()

// // //   const token = sessionStorage.getItem("token");
// // //   const API_BASE = "https://formbuilder-saas-backend.onrender.com";

// // //   useEffect(() => {
// // //     getplandetail();
// // //   }, []);

// // //   const getplandetail = async () => {
// // //     try {
// // //       const [subRes, profileRes] = await Promise.all([
// // //         axios.get(`${API_BASE}/subscription`, { headers: { Authorization: `Bearer ${token}` } }),
// // //         axios.get(`${API_BASE}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } })
// // //       ]);
// // //       setSubscription(subRes.data.data);
// // //       console.log(subRes.data.data)
// // //       setUserStats(profileRes.data.data);
// // //       console.log(profileRes.data.data)
// // //       setApiError(null);
// // //     } catch (err) {
    
// // //    setApiError(err.response?.status || 500);
// // //    setErrorMessage(err.response?.data?.message || "Failed to fetch billing details");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const cancelplandetail = async () => {
// // //     try {
// // //       const res = await axios.post(
// // //         `${API_BASE}/subscription/cancel`,
// // //         {},
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );
// // //       toast.success("Subscription cancelled");
// // //       window.location.reload();
// // //     } catch (err) {
// // //       toast.error(err.response?.data || "Cancellation failed");
// // //     }
// // //   };

  

// // //   if (apiError) {
// // //   return (
// // //     <ErrorLayout 
// // //       status={apiError} 
// // //       message={errorMessage} 
     
// // //     />
// // //   );
// // // }
// // //   return (
// // //     <>
// // //       <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-blue-100">
// // //         <UserNavbar />

// // //         <main className="max-w-7xl w-full mx-auto pt-12 pb-24 px-4 md:px-6 text-slate-900">
// // //           {/* Back Navigation */}
// // //           <Link to="/profile" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#2B4BAB] text-sm mb-8 transition-all font-bold group">
// // //             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
// // //             Back to Profile
// // //           </Link>

// // //           <motion.div 
// // //             initial={{ opacity: 0, y: 20 }} 
// // //             animate={{ opacity: 1, y: 0 }}
// // //             className="rounded-md border border-slate-100 bg-white shadow-[0_15px_40px_rgba(43,75,171,0.06)] overflow-hidden"
// // //           >
// // //             {loading ? (
// // //               <div className="h-[500px] flex flex-col items-center justify-center gap-4">
// // //                 <Loader2 className="w-10 h-10 text-[#2B4BAB] animate-spin" />
// // //                 <p className="text-slate-400 font-medium">Loading your plan details...</p>
// // //               </div>
// // //             ) : (
// // //               <>
// // //                 {/* Header / Brand Section */}
// // //                 <div className="p-10 flex flex-col md:flex-row items-center gap-8 bg-white border-b border-slate-50">
// // //                   <div className="relative">
// // //                     <div className="w-24 h-24 rounded-md flex items-center justify-center bg-blue-50 text-[#2B4BAB] shadow-inner">
// // //                       <Zap size={40} fill="currentColor" className="opacity-90" />
// // //                     </div>
// // //                   </div>
                  
// // //                   <div className="flex flex-col text-center md:text-left">
// // //                     <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
// // //                       <h1 className="text-3xl font-bold uppercase tracking-tight">
// // //                         {formatValue(subscription?.plan)} <span className="text-[#2B4BAB]">Plan</span>
// // //                       </h1>
// // //                       <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
// // //                         subscription?.status === 'active' 
// // //                           ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
// // //                           : 'bg-amber-50 text-amber-600 border-amber-100'
// // //                       }`}>
// // //                         {subscription?.status || "Inactive"}
// // //                       </span>
// // //                     </div>
// // //                     <p className="text-slate-400 font-medium mt-1">
// // //                       Billing cycle: {subscription?.interval || "Monthly"}
// // //                     </p>
// // //                   </div>

// // //                   <div className="md:ml-auto flex gap-3">
// // //                     <button 
// // //                       className="px-8 py-3 bg-[#2B4BAB] text-white rounded-md font-bold hover:bg-[#1e3a8a] shadow-xl shadow-[#2B4BAB]/20 transition-all active:scale-95 text-sm"
// // //                       onClick={() => { navigate("/subscription") }}
// // //                     >
// // //                       Upgrade Now
// // //                     </button>
// // //                     {/* <button className="p-3 rounded-md border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">
// // //                       <Download size={20}/>
// // //                     </button> */}
// // //                   </div>
// // //                 </div>

// // //                 {/* Content Section */}
// // //                 <div className="p-10 bg-[#FBFDFF]">
// // //                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
// // //                     <DetailCard 
// // //                       icon={<CreditCard className="text-[#2B4BAB]" size={20} />} 
// // //                       label="Subscription ID" 
// // //                       value={formatValue(subscription?.razorpaySubscriptionId)} 
// // //                       isCopyable 
// // //                     />
// // //                     <DetailCard 
// // //                       icon={<Calendar className="text-[#2B4BAB]" size={20} />} 
// // //                       label="Renewal Date" 
// // //                       value={subscription?.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "FREE"} 
// // //                     />
// // //                     <DetailCard 
// // //                       icon={<ShieldCheck className="text-emerald-500" size={20} />} 
// // //                       label="Billing Status" 
// // //                       value="Auto-renew On" 
// // //                       isBadge 
// // //                     />
// // //                   </div>

// // //         {/* USAGE LIMITS SECTION */}
// // // {userStats && userStats.role !== "ADMIN" && (
// // //   <div className="mt-10 p-8 rounded-md border border-slate-100 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
// // //     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
// // //       <div className="flex items-center gap-3">
// // //         <div className="w-1.5 h-6 bg-[#2B4BAB] rounded-full"></div>
// // //         <div>
// // //           <h2 className="font-bold text-xl text-slate-900 tracking-tight">Plan Usage & Quotas</h2>
// // //           <p className="text-sm text-slate-400 font-medium">
// // //             Monitoring your <span className="text-[#2B4BAB]">{subscription?.plan || "Free"}</span> limits
// // //           </p>
// // //         </div>
// // //       </div>
      
// // //       <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-md">
// // //         <div className="w-2 h-2 bg-blue-500 rounded-md animate-pulse"></div>
// // //         <span className="text-blue-700 font-bold text-xs uppercase tracking-widest">
// // //           {subscription?.plan || "Free"} Plan
// // //         </span>
// // //       </div>
// // //     </div>
    
// // //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
// // //       {/* 1. MONTHLY RESPONSES */}
// // //       <div className="relative p-6 rounded-md bg-white border border-slate-200 group">
// // //         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Monthly Submissions</p>
// // //         <div className="flex items-baseline gap-1">
// // //           <p className="text-3xl font-black text-slate-800">{userStats.limits?.monthly?.used || 0}</p>
// // //           <p className="text-slate-400 font-bold text-sm">/ {userStats.limits?.monthly?.limit || 0}</p>
// // //         </div>
        
// // //         <div className="mt-6">
// // //           <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
// // //             <span>Utilization</span>
// // //             <span>{Math.round(((userStats.limits?.monthly?.used || 0) / (userStats.limits?.monthly?.limit || 1)) * 100)}%</span>
// // //           </div>
// // //           <div className="w-full bg-slate-200 h-2.5 rounded-md overflow-hidden">
// // //             <motion.div 
// // //               initial={{ width: 0 }}
// // //               animate={{ width: `${((userStats.limits?.monthly?.used || 0) / (userStats.limits?.monthly?.limit || 1)) * 100}%` }}
// // //               className="bg-emerald-500 h-full rounded-md shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
// // //             />
// // //           </div>
// // //           <p className="text-[10px] mt-3 text-slate-400 font-bold uppercase">{userStats.limits?.monthly?.remaining || 0} remaining this month</p>
// // //         </div>
// // //       </div>

// // //       {/* 2. FORM CREATION LIMIT */}
// // //       <div className="p-6 rounded-md bg-white border border-slate-200">
// // //         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Active Forms</p>
// // //         <div className="flex items-baseline gap-1">
// // //           <p className="text-3xl font-black text-slate-800">{userStats.limits?.forms?.used || 0}</p>
// // //           <p className="text-slate-400 font-bold text-sm">/ {userStats.limits?.forms?.limit || 0}</p>
// // //         </div>
        
// // //         <div className="mt-6">
// // //           <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
// // //             <span>Utilization</span>
// // //             <span>{Math.round(((userStats.limits?.forms?.used || 0) / (userStats.limits?.forms?.limit || 1)) * 100)}%</span>
// // //           </div>
// // //           <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
// // //             <motion.div 
// // //               initial={{ width: 0 }}
// // //               animate={{ width: `${((userStats.limits?.forms?.used || 0) / (userStats.limits?.forms?.limit || 1)) * 100}%` }}
// // //               className="bg-[#2B4BAB] h-full rounded-full" 
// // //             />
// // //           </div>
// // //           <p className="text-[10px] mt-3 text-[#2B4BAB] font-bold uppercase">{userStats.limits?.forms?.remaining || 0} creations left</p>
// // //         </div>
// // //       </div>

// // //       {/* 3. DAILY ROLLING LIMIT */}
// // //       {/* <div className="p-6 rounded-md bg-white border-2 border-slate-200 flex flex-col justify-center">
// // //         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Daily Rolling Limit</p>
// // //         <div className="flex items-baseline gap-1">
// // //           <p className="text-2xl font-black text-slate-700">{userStats.limits?.daily?.remaining || 0}</p>
// // //           <p className="text-xs font-medium text-slate-400">left today</p>
// // //         </div>
        
// // //         <div className="mt-6 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
// // //              <div 
// // //               className="bg-amber-400 h-full rounded-md" 
// // //               style={{ width: `${((userStats.limits?.daily?.used || 0) / (userStats.limits?.daily?.limit || 1)) * 100}%` }}
// // //             />
// // //         </div>

// // //         <div className="flex items-center gap-2 mt-4">
// // //             <p className="text-[10px] text-slate-400 font-medium italic leading-tight">
// // //               Used {userStats.limits?.daily?.used || 0} of {userStats.limits?.daily?.limit || 0} daily limit.
// // //             </p>
// // //         </div>
// // //       </div> */}


// // //       {/* 3. DAILY ROLLING LIMIT - FIXED TO MATCH */}
// // //       <div className="p-6 rounded-md bg-white border border-slate-200">
// // //         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Daily Rolling Limit</p>
// // //         <div className="flex items-baseline gap-1">
// // //           <p className="text-3xl font-black text-slate-800">{userStats.limits?.daily?.remaining || 0}</p>
// // //           <p className="text-slate-400 font-bold text-sm">left today</p>
// // //         </div>
        
// // //         <div className="mt-6">
// // //           <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
// // //             <span>Utilization</span>
// // //             <span>{Math.round(((userStats.limits?.daily?.used || 0) / (userStats.limits?.daily?.limit || 1)) * 100)}%</span>
// // //           </div>
// // //           <div className="w-full bg-slate-200 h-2.5 rounded-md overflow-hidden">
// // //             <motion.div 
// // //               initial={{ width: 0 }}
// // //               animate={{ width: `${((userStats.limits?.daily?.used || 0) / (userStats.limits?.daily?.limit || 1)) * 100}%` }}
// // //               className="bg-amber-400 h-full rounded-md" 
// // //             />
// // //           </div>
// // //           <p className="text-[10px] mt-3 text-amber-600 font-bold uppercase">Used {userStats.limits?.daily?.used || 0} of {userStats.limits?.daily?.limit || 0}</p>
// // //         </div>
// // //       </div>

// // //       {/* 4. OTHER ASSETS (API Keys & Seats) */}
// // //       <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
// // //           <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
// // //               <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">API</div>
// // //               <div>
// // //                   <p className="text-xs font-bold text-slate-400 uppercase">API Access</p>
// // //                   <p className="text-sm font-bold text-slate-700">{userStats.limits?.apiKeys?.limit || 0} Key(s) Allowed</p>
// // //               </div>
// // //           </div>
// // //           <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
// // //               <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">S</div>
// // //               <div>
// // //                   <p className="text-xs font-bold text-slate-400 uppercase">User Seats</p>
// // //                   <p className="text-sm font-bold text-slate-700">{userStats.limits?.users?.limit || 0} Active Workspace Seat(s)</p>
// // //               </div>
// // //           </div>
// // //       </div>

// // //     </div>
// // //   </div>
// // // )}

// // //                   {/* Danger Zone */}
// // //                   {/* <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
// // //                     <div className="flex items-start gap-4">
// // //                       <div className="p-3 bg-red-50 text-red-500 rounded-md">
// // //                         <Info size={24} />
// // //                       </div>
// // //                       <div>
// // //                         <h4 className="font-bold">Cancel Subscription</h4>
// // //                         <p className="text-sm text-slate-400 font-medium max-w-sm">
// // //                           Cancelling will disable premium features at the end of your current billing period.
// // //                         </p>
// // //                       </div>
// // //                     </div>
                    
// // //                     <button 
// // //                       onClick={cancelplandetail}
// // //                       className="px-8 py-3 rounded-md border border-red-100 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95 text-sm"
// // //                     >
// // //                       End Subscription
// // //                     </button>
// // //                   </div> */}
// // //                 </div>
// // //               </>
// // //             )}
// // //           </motion.div>
// // //         </main>
// // //       </div>
// // //       <UserFooter/>
// // //     </>
// // //   );
// // // };

// // // const DetailCard = ({ icon, label, value, isBadge, isCopyable }) => {
// // //   const handleCopy = () => {
// // //     if (value !== "FREE") {
// // //       navigator.clipboard.writeText(value);
// // //       toast.success("Copied to clipboard");
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-6 rounded-md border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all group flex flex-col justify-between min-h-[115px]">
// // //       <div className="flex justify-between items-center mb-auto">
// // //         <div className="p-2.5 rounded-md bg-slate-50 group-hover:bg-blue-50 transition-colors">
// // //           {icon}
// // //         </div>
// // //         {isCopyable && value !== "FREE" && (
// // //           <button onClick={handleCopy} className="text-slate-300 hover:text-[#2B4BAB] transition-colors p-1">
// // //             <Copy size={16} />
// // //           </button>
// // //         )}
// // //       </div>
      
// // //       <div className="mt-4">
// // //         <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#2B4BAB]/60 mb-1">{label}</p>
        
// // //         {isBadge ? (
// // //           <span className="inline-flex px-3 py-1 rounded-md text-[10px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
// // //             {value}
// // //           </span>
// // //         ) : (
// // //           <p className="font-bold text-slate-800 text-base truncate">
// // //             {value}
// // //           </p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Plandetail;


// // import React, { useEffect, useState } from 'react';
// // import UserNavbar from './UserNavbar';
// // import axios from 'axios';
// // import { 
// //   Calendar, CreditCard, RefreshCw, Zap, ArrowLeft, 
// //   ShieldCheck, Download, Copy, ExternalLink, Info 
// // } from 'lucide-react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Link } from 'react-router-dom';
// // import UserFooter from './UserFooter';
// // import toast from 'react-hot-toast';
// // import { Loader2 } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import ErrorLayout from '../shared/ErrorLayout'
// // const Plandetail = () => {
// //   const [subscription, setSubscription] = useState(null);
// //   const [userStats, setUserStats] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [apiError, setApiError] = useState(null);
// // const [errorMessage, setErrorMessage] = useState("");
// //   const navigate=useNavigate()

// //   const token = sessionStorage.getItem("token");
// //   const API_BASE = "https://formbuilder-saas-backend.onrender.com";

// //   useEffect(() => {
// //     getplandetail();
// //   }, []);

// //   const getplandetail = async () => {
// //     try {
// //       // const res = await axios.get(`${API_BASE}/subscription`, {
// //       //   headers: { Authorization: `Bearer ${token}` },
// //       // });
// //       const [subRes, profileRes] = await Promise.all([
// //       axios.get(`${API_BASE}/subscription`, { headers: { Authorization: `Bearer ${token}` } }),
// //       axios.get(`${API_BASE}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } })
// //     ]);
// //       setSubscription(subRes.data.data);
// //       console.log(subRes.data.data)
// //       setUserStats(profileRes.data.data);
// //       console.log(profileRes.data.data)
// //       setApiError(null);
// //     } catch (err) {
    
// //    setApiError(err.response?.status || 500);
// //    setErrorMessage(err.response?.data?.message || "Failed to fetch billing details");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const cancelplandetail = async () => {
// //     try {
// //       const res = await axios.post(
// //         `${API_BASE}/subscription/cancel`,
// //         {},
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
// //       toast.success("Subscription cancelled");
// //       window.location.reload();
// //     } catch (err) {
// //       toast.error(err.response?.data || "Cancellation failed");
// //     }
// //   };

  

// //   if (apiError) {
// //   return (
// //     <ErrorLayout 
// //       status={apiError} 
// //       message={errorMessage} 
     
// //     />
// //   );
// // }
// //   return (
// //     <>
// //       <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-blue-100">
// //         <UserNavbar />

// //         <main className="max-w-7xl w-full mx-auto pt-12 pb-24 px-4 md:px-6">
// //           {/* Back Navigation */}
// //           <Link to="/profile" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#2B4BAB] text-sm mb-8 transition-all font-bold group">
// //             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
// //             Back to Profile
// //           </Link>

// //           <motion.div 
// //             initial={{ opacity: 0, y: 20 }} 
// //             animate={{ opacity: 1, y: 0 }}
// //             className="rounded-md border border-slate-100 bg-white shadow-[0_15px_40px_rgba(43,75,171,0.06)] overflow-hidden"
// //           >
// //             {/* Header / Brand Section */}
// //          {loading? (
// //               <div className="h-[500px] flex flex-col items-center justify-center gap-4">
// //                 <Loader2 className="w-10 h-10 text-[#2B4BAB] animate-spin" />
// //                 <p className="text-slate-400 font-medium">Loading your plan details...</p>
// //               </div>
// //             ) : ( <>
// //             <div className="p-10 flex flex-col md:flex-row items-center gap-8 bg-white border-b border-slate-50">
// //               <div className="relative">
// //                 <div className="w-24 h-24 rounded-3xl flex items-center justify-center bg-blue-50 text-[#2B4BAB] shadow-inner">
// //                   <Zap size={40} fill="currentColor" className="opacity-90" />
// //                 </div>
// //               </div>
              
// //               <div className="flex flex-col text-center md:text-left">
// //                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
// //                   <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">
// //                     {subscription?.plan || "Free"} <span className="text-[#2B4BAB]">Plan</span>
// //                   </h1>
// //                   <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
// //                     subscription?.status === 'active' 
// //                       ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
// //                       : 'bg-amber-50 text-amber-600 border-amber-100'
// //                   }`}>
// //                     {subscription?.status || "Inactive"}
// //                   </span>
// //                 </div>
// //                 <p className="text-slate-400 font-medium mt-1">
// //                   Billing cycle: {subscription?.interval || "Monthly"}
// //                 </p>
// //               </div>

// //               <div className="md:ml-auto flex gap-3">
               
// //                   <button className="px-8 py-3 bg-[#2B4BAB] text-white rounded-md font-bold hover:bg-[#1e3a8a] shadow-xl shadow-[#2B4BAB]/20 transition-all active:scale-95 text-sm"
// //                   onClick={()=>{navigate("/subscription")}}
// //                   >
// //                     Upgrade Now
// //                   </button>
               
// //                 <button className="p-3 rounded-md border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">
// //                   <Download size={20}/>
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Content Section */}
// //             <div className="p-10 bg-[#FBFDFF]">
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
// //                 <DetailCard 
// //                   icon={<CreditCard className="text-[#2B4BAB]" size={20} />} 
// //                   label="Subscription ID" 
// //                   value={subscription?.razorpaySubscriptionId || "N/A"} 
// //                   isCopyable 
// //                 />
// //                 <DetailCard 
// //                   icon={<Calendar className="text-[#2B4BAB]" size={20} />} 
// //                   label="Renewal Date" 
// //                   value={subscription?.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "N/A"} 
// //                 />
// //                 <DetailCard 
// //                   icon={<ShieldCheck className="text-emerald-500" size={20} />} 
// //                   label="Billing Status" 
// //                   value="Auto-renew On" 
// //                   isBadge 
// //                 />
// //               </div>

// //         {/* USAGE LIMITS SECTION */}
// // {userStats && userStats.role !== "ADMIN" && (
// //   <div className="mt-10 p-8 rounded-md border border-slate-100 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
// //     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
// //       <div className="flex items-center gap-3">
// //         <div className="w-1.5 h-6 bg-[#2B4BAB] rounded-full"></div>
// //         <div>
// //           <h2 className="font-bold text-xl text-slate-900 tracking-tight">Plan Usage & Quotas</h2>
// //           <p className="text-sm text-slate-400 font-medium">
// //             Monitoring your <span className="text-[#2B4BAB]">{subscription?.plan || "Free"}</span> limits
// //           </p>
// //         </div>
// //       </div>
      
// //       <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-md">
// //         <div className="w-2 h-2 bg-blue-500 rounded-md animate-pulse"></div>
// //         <span className="text-blue-700 font-bold text-xs uppercase tracking-widest">
// //           {subscription?.plan || "Free"} Plan
// //         </span>
// //       </div>
// //     </div>
    
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
// //       {/* 1. MONTHLY RESPONSES */}
// //       <div className="relative p-6 rounded-md bg-white border border-slate-200 group">
// //         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Monthly Submissions</p>
// //         <div className="flex items-baseline gap-1">
// //           <p className="text-3xl font-black text-slate-800">{userStats.limits?.monthly?.used || 0}</p>
// //           <p className="text-slate-400 font-bold text-sm">/ {userStats.limits?.monthly?.limit || 0}</p>
// //         </div>
        
// //         <div className="mt-6">
// //           <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
// //             <span>Utilization</span>
// //             <span>{Math.round(((userStats.limits?.monthly?.used || 0) / (userStats.limits?.monthly?.limit || 1)) * 100)}%</span>
// //           </div>
// //           <div className="w-full bg-slate-200 h-2.5 rounded-md overflow-hidden">
// //             <motion.div 
// //               initial={{ width: 0 }}
// //               animate={{ width: `${((userStats.limits?.monthly?.used || 0) / (userStats.limits?.monthly?.limit || 1)) * 100}%` }}
// //               className="bg-emerald-500 h-full rounded-md shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
// //             />
// //           </div>
// //           <p className="text-[10px] mt-3 text-slate-400 font-bold uppercase">{userStats.limits?.monthly?.remaining || 0} remaining this month</p>
// //         </div>
// //       </div>

// //       {/* 2. FORM CREATION LIMIT */}
// //       <div className="p-6 rounded-md bg-white border border-slate-200">
// //         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Active Forms</p>
// //         <div className="flex items-baseline gap-1">
// //           <p className="text-3xl font-black text-slate-800">{userStats.limits?.forms?.used || 0}</p>
// //           <p className="text-slate-400 font-bold text-sm">/ {userStats.limits?.forms?.limit || 0}</p>
// //         </div>
        
// //         <div className="mt-6">
// //           <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
// //             <span>Utilization</span>
// //             <span>{Math.round(((userStats.limits?.forms?.used || 0) / (userStats.limits?.forms?.limit || 1)) * 100)}%</span>
// //           </div>
// //           <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
// //             <motion.div 
// //               initial={{ width: 0 }}
// //               animate={{ width: `${((userStats.limits?.forms?.used || 0) / (userStats.limits?.forms?.limit || 1)) * 100}%` }}
// //               className="bg-[#2B4BAB] h-full rounded-full" 
// //             />
// //           </div>
// //           <p className="text-[10px] mt-3 text-[#2B4BAB] font-bold uppercase">{userStats.limits?.forms?.remaining || 0} creations left</p>
// //         </div>
// //       </div>

// //       {/* 3. DAILY ROLLING LIMIT */}
// //       {/* <div className="p-6 rounded-md bg-white border-2 border-slate-200 flex flex-col justify-center">
// //         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Daily Rolling Limit</p>
// //         <div className="flex items-baseline gap-1">
// //           <p className="text-2xl font-black text-slate-700">{userStats.limits?.daily?.remaining || 0}</p>
// //           <p className="text-xs font-medium text-slate-400">left today</p>
// //         </div>
        
// //         <div className="mt-6 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
// //              <div 
// //               className="bg-amber-400 h-full rounded-md" 
// //               style={{ width: `${((userStats.limits?.daily?.used || 0) / (userStats.limits?.daily?.limit || 1)) * 100}%` }}
// //             />
// //         </div>

// //         <div className="flex items-center gap-2 mt-4">
// //             <p className="text-[10px] text-slate-400 font-medium italic leading-tight">
// //               Used {userStats.limits?.daily?.used || 0} of {userStats.limits?.daily?.limit || 0} daily limit.
// //             </p>
// //         </div>
// //       </div> */}


// //       {/* 3. DAILY ROLLING LIMIT - FIXED TO MATCH */}
// //       <div className="p-6 rounded-md bg-white border border-slate-200">
// //         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Daily Rolling Limit</p>
// //         <div className="flex items-baseline gap-1">
// //           <p className="text-3xl font-black text-slate-800">{userStats.limits?.daily?.remaining || 0}</p>
// //           <p className="text-slate-400 font-bold text-sm">left today</p>
// //         </div>
        
// //         <div className="mt-6">
// //           <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
// //             <span>Utilization</span>
// //             <span>{Math.round(((userStats.limits?.daily?.used || 0) / (userStats.limits?.daily?.limit || 1)) * 100)}%</span>
// //           </div>
// //           <div className="w-full bg-slate-200 h-2.5 rounded-md overflow-hidden">
// //             <motion.div 
// //               initial={{ width: 0 }}
// //               animate={{ width: `${((userStats.limits?.daily?.used || 0) / (userStats.limits?.daily?.limit || 1)) * 100}%` }}
// //               className="bg-amber-400 h-full rounded-md" 
// //             />
// //           </div>
// //           <p className="text-[10px] mt-3 text-amber-600 font-bold uppercase">Used {userStats.limits?.daily?.used || 0} of {userStats.limits?.daily?.limit || 0}</p>
// //         </div>
// //       </div>

// //       {/* 4. OTHER ASSETS (API Keys & Seats) */}
// //       <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
// //           <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
// //               <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">API</div>
// //               <div>
// //                   <p className="text-xs font-bold text-slate-400 uppercase">API Access</p>
// //                   <p className="text-sm font-bold text-slate-700">{userStats.limits?.apiKeys?.limit || 0} Key(s) Allowed</p>
// //               </div>
// //           </div>
// //           <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
// //               <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">S</div>
// //               <div>
// //                   <p className="text-xs font-bold text-slate-400 uppercase">User Seats</p>
// //                   <p className="text-sm font-bold text-slate-700">{userStats.limits?.users?.limit || 0} Active Workspace Seat(s)</p>
// //               </div>
// //           </div>
// //       </div>

// //     </div>
// //   </div>
// // )}

// //               {/* Danger Zone */}
// //               <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
// //                 <div className="flex items-start gap-4">
// //                   <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
// //                     <Info size={24} />
// //                   </div>
// //                   <div>
// //                     <h4 className="text-slate-900 font-bold">Cancel Subscription</h4>
// //                     <p className="text-sm text-slate-400 font-medium max-w-sm">
// //                       Cancelling will disable premium features at the end of your current billing period.
// //                     </p>
// //                   </div>
// //                 </div>
                
// //                 <button 
// //                   onClick={cancelplandetail}
// //                   className="px-8 py-3 rounded-md border border-red-100 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95 text-sm"
// //                 >
// //                   End Subscription
// //                 </button>
// //               </div>
// //             </div>
// //             </>)}
// //           </motion.div>
// //         </main>
// //       </div>
// //       <UserFooter/>
// //     </>
// //   );
// // };

// // const DetailCard = ({ icon, label, value, isBadge, isCopyable }) => {
// //   const handleCopy = () => {
// //     if (value !== "N/A") {
// //       navigator.clipboard.writeText(value);
// //       toast.success("Copied to clipboard");
// //     }
// //   };

// //   return (
// //     <div className="p-6 rounded-md border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all group relative">
// //       <div className="flex justify-between items-start mb-4">
// //         <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
// //           {icon}
// //         </div>
// //         {isCopyable && value !== "N/A" && (
// //           <button onClick={handleCopy} className="text-slate-300 hover:text-[#2B4BAB] transition-colors">
// //             <Copy size={14} />
// //           </button>
// //         )}
// //       </div>
      
// //       <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#2B4BAB]/60 mb-1">{label}</p>
      
// //       {isBadge ? (
// //         <span className="inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
// //           {value}
// //         </span>
// //       ) : (
// //         <p className={`font-bold text-slate-800 ${isCopyable ? 'font-mono text-xs' : 'text-lg'} truncate`}>
// //           {value}
// //         </p>
// //       )}
// //     </div>
// //   );
// // };

// // export default Plandetail;

// // import React, { useEffect, useState } from 'react';
// // import UserNavbar from './UserNavbar';
// // import axios from 'axios';
// // import { 
// //   Calendar, CreditCard, RefreshCw, Zap, ArrowLeft, 
// //   ShieldCheck, Download, Copy, ExternalLink, Info 
// // } from 'lucide-react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Link } from 'react-router-dom';
// // import UserFooter from './UserFooter';
// // import toast from 'react-hot-toast';
// // import { Loader2 } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import ErrorLayout from '../shared/ErrorLayout'
// // const Plandetail = () => {
// //   const [subscription, setSubscription] = useState(null);
// //   const [userStats, setUserStats] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [apiError, setApiError] = useState(null);
// // const [errorMessage, setErrorMessage] = useState("");
// //   const navigate=useNavigate()

// //   const token = sessionStorage.getItem("token");
// //   const API_BASE = "https://formbuilder-saas-backend.onrender.com";

// //   useEffect(() => {
// //     getplandetail();
// //   }, []);

// //   // const getplandetail = async () => {
// //   //   try {
// //   //     // const res = await axios.get(`${API_BASE}/subscription`, {
// //   //     //   headers: { Authorization: `Bearer ${token}` },
// //   //     // });
// //   //     const [subRes, profileRes] = await Promise.all([
// //   //     axios.get(`${API_BASE}/subscription`, { headers: { Authorization: `Bearer ${token}` } }),
// //   //     axios.get(`${API_BASE}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } })
// //   //   ]);
// //   //     setSubscription(subRes.data.data);
// //   //     console.log(subRes.data.data)
// //   //     setUserStats(profileRes.data.data);
// //   //     console.log(profileRes.data.data)
// //   //     setApiError(null);
// //   //   } catch (err) {
    
// //   //  setApiError(err.response?.status || 500);
// //   //  setErrorMessage(err.response?.data?.message || "Failed to fetch billing details");
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };


// //   const getplandetail = async () => {
// //   try {
// //     const [subRes, profileRes] = await Promise.all([
// //       axios.get(`${API_BASE}/subscription`, { headers: { Authorization: `Bearer ${token}` } }),
// //       axios.get(`${API_BASE}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } })
// //     ]);
    
// //     console.log("Subscription API Response:", subRes);
// //     console.log(subRes.data.data);
// //     // Fallback to a default 'Free' structure if data is null or empty
// //     const subData = subRes.data.data || { plan: "Free", status: "Active", interval: "Monthly" };
// //     setSubscription(subData);
    
// //     setUserStats(profileRes.data.data);
// //     setApiError(null);
// //   } catch (err) {
// //     // If 404 is returned (common for 'no subscription found'), set as Free Plan
// //     if (err.response?.status === 404) {
// //       setSubscription({ plan: "Free", status: "Active", interval: "Monthly" });
// //       setApiError(null);
// //     } else {
// //       setApiError(err.response?.status || 500);
// //       setErrorMessage(err.response?.data?.message || "Failed to fetch billing details");
// //     }
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   // const cancelplandetail = async () => {
// //   //   try {
// //   //     const res = await axios.post(
// //   //       `${API_BASE}/subscription/cancel`,
// //   //       {},
// //   //       { headers: { Authorization: `Bearer ${token}` } }
// //   //     );
// //   //     toast.success("Subscription cancelled");
// //   //     window.location.reload();
// //   //   } catch (err) {
// //   //     toast.error(err.response?.data || "Cancellation failed");
// //   //   }
// //   // };

  

// //   if (apiError) {
// //   return (
// //     <ErrorLayout 
// //       status={apiError} 
// //       message={errorMessage} 
     
// //     />
// //   );
// // }
// //   return (
// //     <>
// //       <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-blue-100">
// //         <UserNavbar />

// //         <main className="max-w-7xl w-full mx-auto pt-12 pb-24 px-4 md:px-6">
// //           {/* Back Navigation */}
// //           <Link to="/profile" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#2B4BAB] text-sm mb-8 transition-all font-bold group">
// //             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
// //             Back to Profile
// //           </Link>

// //           <motion.div 
// //             initial={{ opacity: 0, y: 20 }} 
// //             animate={{ opacity: 1, y: 0 }}
// //             className="rounded-md border border-slate-100 bg-white shadow-[0_15px_40px_rgba(43,75,171,0.06)] overflow-hidden"
// //           >
// //             {/* Header / Brand Section */}
// //          {loading? (
// //               <div className="h-[500px] flex flex-col items-center justify-center gap-4">
// //                 <Loader2 className="w-10 h-10 text-[#2B4BAB] animate-spin" />
// //                 <p className="text-slate-400 font-medium">Loading your plan details...</p>
// //               </div>
// //             ) : ( <>
// //             <div className="p-10 flex flex-col md:flex-row items-center gap-8 bg-white border-b border-slate-50">
// //               <div className="relative">
// //                 <div className="w-24 h-24 rounded-3xl flex items-center justify-center bg-blue-50 text-[#2B4BAB] shadow-inner">
// //                   <Zap size={40} fill="currentColor" className="opacity-90" />
// //                 </div>
// //               </div>
              
// //               <div className="flex flex-col text-center md:text-left">
// //                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
// //                   <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">
// //                     {subscription?.plan || "Free"} <span className="text-[#2B4BAB]">Plan</span>
// //                   </h1>
// //                   <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
// //                     subscription?.status === 'active' 
// //                       ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
// //                       : 'bg-amber-50 text-amber-600 border-amber-100'
// //                   }`}>
// //                     {subscription?.status || "Inactive"}
// //                   </span>
// //                 </div>
// //                 <p className="text-slate-400 font-medium mt-1">
// //                   Billing cycle: {subscription?.interval || "Monthly"}
// //                 </p>
// //               </div>

// //               <div className="md:ml-auto flex gap-3">
               
// //                   <button className="px-8 py-3 bg-[#2B4BAB] text-white rounded-md font-bold hover:bg-[#1e3a8a] shadow-xl shadow-[#2B4BAB]/20 transition-all active:scale-95 text-sm"
// //                   onClick={()=>{navigate("/subscription")}}
// //                   >
// //                     Upgrade Now
// //                   </button>
// // {/*                
// //                 <button className="p-3 rounded-md border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">
// //                   <Download size={20}/>
// //                 </button> */}
// //               </div>
// //             </div>

// //             {/* Content Section */}
// //             <div className="p-10 bg-[#FBFDFF]">
// //               {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
// //                 <DetailCard 
// //                   icon={<CreditCard className="text-[#2B4BAB]" size={20} />} 
// //                   label="Subscription ID" 
// //                   value={subscription?.razorpaySubscriptionId || "N/A"} 
// //                   isCopyable 
// //                 />
// //                 <DetailCard 
// //                   icon={<Calendar className="text-[#2B4BAB]" size={20} />} 
// //                   label="Renewal Date" 
// //                   value={subscription?.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "N/A"} 
// //                 />
// //                 <DetailCard 
// //                   icon={<ShieldCheck className="text-emerald-500" size={20} />} 
// //                   label="Billing Status" 
// //                   value="Auto-renew On" 
// //                   isBadge 
// //                 />
// //               </div> */}

// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
// //   <DetailCard 
// //     icon={<CreditCard className="text-[#2B4BAB]" size={20} />} 
// //     label="Subscription ID" 
// //     // If it's a Free plan, show 'Free Plan' instead of 'N/A'
// //     value={subscription?.plan === "Free" ? "FREE_PLAN_USER" : (subscription?.razorpaySubscriptionId || "N/A")} 
// //     isCopyable={subscription?.plan !== "Free"} 
// //   />
// //   <DetailCard 
// //     icon={<Calendar className="text-[#2B4BAB]" size={20} />} 
// //     label="Renewal Date" 
// //     // Handle the renewal date for free users
// //     value={subscription?.plan === "Free" ? "Never Expires" : (subscription?.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "N/A")} 
// //   />
// //   <DetailCard 
// //     icon={<ShieldCheck className="text-emerald-500" size={20} />} 
// //     label="Billing Status" 
// //     value={subscription?.plan === "Free" ? "Always Free" : "Auto-renew On"} 
// //     isBadge 
// //   />
// // </div>

// //         {/* USAGE LIMITS SECTION */}
// // {userStats && userStats.role !== "ADMIN" && (
// //   <div className="mt-10 p-8 rounded-md border border-slate-100 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
// //     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
// //       <div className="flex items-center gap-3">
// //         <div className="w-1.5 h-6 bg-[#2B4BAB] rounded-full"></div>
// //         <div>
// //           <h2 className="font-bold text-xl text-slate-900 tracking-tight">Plan Usage & Quotas</h2>
// //           <p className="text-sm text-slate-400 font-medium">
// //             Monitoring your <span className="text-[#2B4BAB]">{subscription?.plan || "Free"}</span> limits
// //           </p>
// //         </div>
// //       </div>
      
// //       <div className="flex items-center gap-2 w-fit px-4 py-2 bg-blue-50 border border-blue-100 rounded-md">
// //         <div className="w-2 h-2 bg-blue-500 rounded-md animate-pulse"></div>
// //         <span className="text-blue-700 font-bold text-xs uppercase tracking-widest">
// //           {subscription?.plan || "Free"} Plan
// //         </span>
// //       </div>
// //     </div>
    
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
// //       {/* 1. MONTHLY RESPONSES */}
// //       <div className="relative p-6 rounded-md bg-white border border-slate-200 group">
// //         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Monthly Submissions</p>
// //         <div className="flex items-baseline gap-1">
// //           <p className="text-3xl font-black text-slate-800">{userStats.limits?.monthly?.used || 0}</p>
// //           <p className="text-slate-400 font-bold text-sm">/ {userStats.limits?.monthly?.limit || 0}</p>
// //         </div>
        
// //         <div className="mt-6">
// //           <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
// //             <span>Utilization</span>
// //             <span>{Math.round(((userStats.limits?.monthly?.used || 0) / (userStats.limits?.monthly?.limit || 1)) * 100)}%</span>
// //           </div>
// //           <div className="w-full bg-slate-200 h-2.5 rounded-md overflow-hidden">
// //             <motion.div 
// //               initial={{ width: 0 }}
// //               animate={{ width: `${((userStats.limits?.monthly?.used || 0) / (userStats.limits?.monthly?.limit || 1)) * 100}%` }}
// //               className="bg-emerald-500 h-full rounded-md shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
// //             />
// //           </div>
// //           <p className="text-[10px] mt-3 text-slate-400 font-bold uppercase">{userStats.limits?.monthly?.remaining || 0} remaining this month</p>
// //         </div>
// //       </div>

// //       {/* 2. FORM CREATION LIMIT */}
// //       <div className="p-6 rounded-md bg-white border border-slate-200">
// //         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Active Forms</p>
// //         <div className="flex items-baseline gap-1">
// //           <p className="text-3xl font-black text-slate-800">{userStats.limits?.forms?.used || 0}</p>
// //           <p className="text-slate-400 font-bold text-sm">/ {userStats.limits?.forms?.limit || 0}</p>
// //         </div>
        
// //         <div className="mt-6">
// //           <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
// //             <span>Utilization</span>
// //             <span>{Math.round(((userStats.limits?.forms?.used || 0) / (userStats.limits?.forms?.limit || 1)) * 100)}%</span>
// //           </div>
// //           <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
// //             <motion.div 
// //               initial={{ width: 0 }}
// //               animate={{ width: `${((userStats.limits?.forms?.used || 0) / (userStats.limits?.forms?.limit || 1)) * 100}%` }}
// //               className="bg-[#2B4BAB] h-full rounded-full" 
// //             />
// //           </div>
// //           <p className="text-[10px] mt-3 text-[#2B4BAB] font-bold uppercase">{userStats.limits?.forms?.remaining || 0} creations left</p>
// //         </div>
// //       </div>

// //       {/* 3. DAILY ROLLING LIMIT */}
// //       {/* <div className="p-6 rounded-md bg-white border-2 border-slate-200 flex flex-col justify-center">
// //         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Daily Rolling Limit</p>
// //         <div className="flex items-baseline gap-1">
// //           <p className="text-2xl font-black text-slate-700">{userStats.limits?.daily?.remaining || 0}</p>
// //           <p className="text-xs font-medium text-slate-400">left today</p>
// //         </div>
        
// //         <div className="mt-6 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
// //              <div 
// //               className="bg-amber-400 h-full rounded-md" 
// //               style={{ width: `${((userStats.limits?.daily?.used || 0) / (userStats.limits?.daily?.limit || 1)) * 100}%` }}
// //             />
// //         </div>

// //         <div className="flex items-center gap-2 mt-4">
// //             <p className="text-[10px] text-slate-400 font-medium italic leading-tight">
// //               Used {userStats.limits?.daily?.used || 0} of {userStats.limits?.daily?.limit || 0} daily limit.
// //             </p>
// //         </div>
// //       </div> */}


// //       {/* 3. DAILY ROLLING LIMIT - FIXED TO MATCH */}
// //       <div className="p-6 rounded-md bg-white border border-slate-200">
// //         <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Daily Rolling Limit</p>
// //         <div className="flex items-baseline gap-1">
// //           <p className="text-3xl font-black text-slate-800">{userStats.limits?.daily?.remaining || 0}</p>
// //           <p className="text-slate-400 font-bold text-sm">left today</p>
// //         </div>
        
// //         <div className="mt-6">
// //           <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
// //             <span>Utilization</span>
// //             <span>{Math.round(((userStats.limits?.daily?.used || 0) / (userStats.limits?.daily?.limit || 1)) * 100)}%</span>
// //           </div>
// //           <div className="w-full bg-slate-200 h-2.5 rounded-md overflow-hidden">
// //             <motion.div 
// //               initial={{ width: 0 }}
// //               animate={{ width: `${((userStats.limits?.daily?.used || 0) / (userStats.limits?.daily?.limit || 1)) * 100}%` }}
// //               className="bg-amber-400 h-full rounded-md" 
// //             />
// //           </div>
// //           <p className="text-[10px] mt-3 text-amber-600 font-bold uppercase">Used {userStats.limits?.daily?.used || 0} of {userStats.limits?.daily?.limit || 0}</p>
// //         </div>
// //       </div>

// //       {/* 4. OTHER ASSETS (API Keys & Seats) */}
// //       <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-50">
// //           <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
// //               <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">API</div>
// //               <div>
// //                   <p className="text-xs font-bold text-slate-400 uppercase">API Access</p>
// //                   <p className="text-sm font-bold text-slate-700">{userStats.limits?.apiKeys?.limit || 0} Key(s) Allowed</p>
// //               </div>
// //           </div>
// //           <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
// //               <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">S</div>
// //               <div>
// //                   <p className="text-xs font-bold text-slate-400 uppercase">User Seats</p>
// //                   <p className="text-sm font-bold text-slate-700">{userStats.limits?.users?.limit || 0} Active Workspace Seat(s)</p>
// //               </div>
// //           </div>

// //           <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
// //                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">T</div>
// //   <div>
// //     <p className="text-xs font-bold text-slate-400 uppercase">
// //       Custom Settings
// //     </p>

// //     <p className="text-sm font-bold text-slate-700">
// //       {userStats?.limits?.themeAccess ? "Yes" : "No"}
// //     </p>
// //   </div>
// // </div>
// //       </div>

// //     </div>
// //   </div>
// // )}

// //               {/* Danger Zone */}
// //               {/* <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
// //                 <div className="flex items-start gap-4">
// //                   <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
// //                     <Info size={24} />
// //                   </div>
// //                   <div>
// //                     <h4 className="text-slate-900 font-bold">Cancel Subscription</h4>
// //                     <p className="text-sm text-slate-400 font-medium max-w-sm">
// //                       Cancelling will disable premium features at the end of your current billing period.
// //                     </p>
// //                   </div>
// //                 </div>
                
// //                 <button 
// //                   onClick={cancelplandetail}
// //                   className="px-8 py-3 rounded-md border border-red-100 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95 text-sm"
// //                 >
// //                   End Subscription
// //                 </button>
// //               </div> */}
// //             </div>
// //             </>)}
// //           </motion.div>
// //         </main>
// //       </div>
// //       <UserFooter/>
// //     </>
// //   );
// // };

// // const DetailCard = ({ icon, label, value, isBadge, isCopyable }) => {
// //   const handleCopy = () => {
// //     if (value !== "N/A") {
// //       navigator.clipboard.writeText(value);
// //       toast.success("Copied to clipboard");
// //     }
// //   };

// //   return (
// //     <div className="p-6 rounded-md border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all group relative">
// //       <div className="flex justify-between items-start mb-4">
// //         <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
// //           {icon}
// //         </div>
// //         {isCopyable && value !== "N/A" && (
// //           <button onClick={handleCopy} className="text-slate-300 hover:text-[#2B4BAB] transition-colors">
// //             <Copy size={14} />
// //           </button>
// //         )}
// //       </div>
      
// //       <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#2B4BAB]/60 mb-1">{label}</p>
      
// //       {isBadge ? (
// //         <span className="inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
// //           {value}
// //         </span>
// //       ) : (
// //         <p className={`font-bold text-slate-800 ${isCopyable ? 'font-mono text-xs' : 'text-lg'} truncate`}>
// //           {value}
// //         </p>
// //       )}
// //     </div>
// //   );
// // };

// // export default Plandetail;



// import React, { useEffect, useState } from 'react';
// import UserNavbar from './UserNavbar';
// import axios from 'axios';
// import { 
//   Calendar, CreditCard, Zap, ArrowLeft, 
//   ShieldCheck, Copy, Loader2 ,Info
// } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Link, useNavigate } from 'react-router-dom';
// import UserFooter from './UserFooter';
// import toast from 'react-hot-toast';
// import ErrorLayout from '../shared/ErrorLayout';

// const Plandetail = () => {
//   const [userStats, setUserStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [apiError, setApiError] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const token = sessionStorage.getItem("token");
//   const API_BASE = "https://formbuilder-saas-backend.onrender.com";

//   useEffect(() => {
//     getplandetail();
//   }, []);

//   const getplandetail = async () => {
//     try {
//       // Fetching only from the profile API as it contains the merged data
//       const res = await axios.get(`${API_BASE}/api/users/profile`, { 
//         headers: { Authorization: `Bearer ${token}` } 
//       });
//       console.log(res)
//       const userData = res.data.data;
//       setUserStats(userData);
//       setApiError(null);
//     } catch (err) {
//       setApiError(err.response?.status || 500);
//       setErrorMessage(err.response?.data?.message || "Failed to fetch profile and billing details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (apiError) {
//     return <ErrorLayout status={apiError} message={errorMessage} />;
//   }

//   // Helper variables for cleaner JSX
//   const currentPlan = userStats?.subscription?.plan || "Free";
//   const isFreePlan = currentPlan.toLowerCase() === "free";
//   const subscriptionStatus = userStats?.subscription?.status || "active";


//     const cancelplandetail = async () => {
//     try {
//       const res = await axios.post(
//         `${API_BASE}/subscription/cancel`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Subscription cancelled");
//       window.location.reload();
//     } catch (err) {
//       toast.error(err.response?.data || "Cancellation failed");
//     }
//   };


//   return (
//     <>
//       <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-blue-100">
//         <UserNavbar />

//         <main className="max-w-7xl w-full mx-auto pt-12 pb-24 px-4 md:px-6">
//           <Link to="/profile" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#2B4BAB] text-sm mb-8 transition-all font-bold group">
//             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
//             Back to Profile
//           </Link>

//           <motion.div 
//             initial={{ opacity: 0, y: 20 }} 
//             animate={{ opacity: 1, y: 0 }}
//             className="rounded-md border border-slate-100 bg-white shadow-[0_15px_40px_rgba(43,75,171,0.06)] overflow-hidden"
//           >
//             {loading ? (
//               <div className="h-[500px] flex flex-col items-center justify-center gap-4">
//                 <Loader2 className="w-10 h-10 text-[#2B4BAB] animate-spin" />
//                 <p className="text-slate-400 font-medium">Loading your plan details...</p>
//               </div>
//             ) : (
//               <>
//                 {/* Header Section */}
//                 <div className="p-10 flex flex-col md:flex-row items-center gap-8 bg-white border-b border-slate-50">
//                   <div className="w-24 h-24 rounded-md flex items-center justify-center bg-blue-50 text-[#2B4BAB] shadow-inner">
//                     <Zap size={40} fill="currentColor" className="opacity-90" />
//                   </div>
                  
//                   <div className="flex flex-col text-center md:text-left">
//                     <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
//                       <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">
//                         {currentPlan} <span className="text-[#2B4BAB]">Plan</span>
//                       </h1>
//                       <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
//                         subscriptionStatus === 'active' 
//                           ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
//                           : 'bg-amber-50 text-amber-600 border-amber-100'
//                       }`}>
//                         {subscriptionStatus}
//                       </span>
//                     </div>
//                     <p className="text-slate-400 font-medium mt-1">
//                       Billing cycle: {userStats?.subscription?.interval || "Monthly"}
//                     </p>
//                   </div>

//                   <div className="md:ml-auto">
//                     <button 
//                       className="px-8 py-3 bg-[#2B4BAB] text-white rounded-md font-bold hover:bg-[#1e3a8a] shadow-xl shadow-[#2B4BAB]/20 transition-all active:scale-95 text-sm"
//                       onClick={() => navigate("/subscription")}
//                     >
//                       {isFreePlan ? "Upgrade Now" : "Manage Plan"}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="p-10 bg-[#FBFDFF]">
//                   {/* Info Cards */}
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//                     <DetailCard 
//                       icon={<CreditCard className="text-[#2B4BAB]" size={20} />} 
//                       label="Subscription ID" 
//                       value={isFreePlan ? "FREE_PLAN_USER" : (userStats?.subscription?.razorpaySubscriptionId || "N/A")} 
//                       isCopyable={!isFreePlan} 
//                     />
//                     <DetailCard 
//                       icon={<Calendar className="text-[#2B4BAB]" size={20} />} 
//                       label="Renewal Date" 
//                       value={isFreePlan ? "Never Expires" : (userStats?.subscription?.renewalDate ? new Date(userStats.subscription.renewalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "N/A")} 
//                     />
//                     <DetailCard 
//                       icon={<ShieldCheck className="text-emerald-500" size={20} />} 
//                       label="Billing Status" 
//                       value={isFreePlan ? "Always Free" : "Auto-renew On"} 
//                       isBadge 
//                     />
//                   </div>

//                   {/* Usage Quotas */}
//                   {userStats?.role !== "ADMIN" && (
//                     <div className="mt-10 p-8 rounded-md border border-slate-100 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
//                       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
//                         <div className="flex items-center gap-3">
//                           <div className="w-1.5 h-6 bg-[#2B4BAB] rounded-full"></div>
//                           <div>
//                             <h2 className="font-bold text-xl text-slate-900 tracking-tight">Plan Usage & Quotas</h2>
//                             <p className="text-sm text-slate-400 font-medium">Monitoring your <span className="text-[#2B4BAB]">{currentPlan}</span> limits</p>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         <UsageProgress label="Monthly Submissions" used={userStats.limits?.monthly?.used} limit={userStats.limits?.monthly?.limit} color="bg-emerald-500" />
//                         <UsageProgress label="Active Forms" used={userStats.limits?.forms?.used} limit={userStats.limits?.forms?.limit} color="bg-[#2B4BAB]" />
//                         <UsageProgress label="Daily Rolling Limit" used={userStats.limits?.daily?.used} limit={userStats.limits?.daily?.limit} color="bg-amber-400" />
//                       </div>

//                       <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 mt-10 border-t border-slate-50">
//                         <FeatureItem icon="API" label="API Access" value={`${userStats.limits?.apiKeys?.limit || 0} Key(s)`} />
//                         <FeatureItem icon="S" label="User Seats" value={`${userStats.limits?.users?.limit || 0} Seat(s)`} />
//                         <FeatureItem icon="T" label="Custom Themes" value={userStats?.limits?.themeAccess ? "Unlocked" : "Locked"} />
//                       </div>
          
             
//                     </div>
                    
//                   )}
                  
//                 </div>
                
//               </>
              
//             )}


//                   <div className="flex flex-col px-10 mb-10 md:flex-row items-center justify-between gap-6 pt-10 mt-10 border-t border-slate-50">
//   <div className="flex items-start gap-4">
//     <div className="p-3 bg-red-50 text-red-500 rounded-md">
//       <Info size={24} />
//     </div>
//     <div>
//       <h4 className="text-slate-900 font-bold">Cancel Subscription</h4>
//       <p className="text-sm text-slate-400 font-medium max-w-sm">
//         Cancelling will disable premium features at the end of your current billing period.
//       </p>
//     </div>
//   </div>

//   <button
//     onClick={cancelplandetail}
//     className="px-8 py-3 rounded-md border border-red-100 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95 text-sm shrink-0"
//   >
//     End Subscription
//   </button>
// </div>
            
//           </motion.div>
//         </main>

//       </div>
      
//       <UserFooter />
//     </>
//   );
// };

// // Reusable Sub-Components
// const DetailCard = ({ icon, label, value, isBadge, isCopyable }) => {
//   const handleCopy = () => {
//     navigator.clipboard.writeText(value);
//     toast.success("Copied to clipboard");
//   };

//   return (
//     <div className="p-6 rounded-md border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all group relative">
//       <div className="flex justify-between items-start mb-4">
//         <div className="p-2.5 rounded-md bg-slate-50 group-hover:bg-blue-50 transition-colors">{icon}</div>
//         {isCopyable && (
//           <button onClick={handleCopy} className="text-slate-300 hover:text-[#2B4BAB] transition-colors"><Copy size={14} /></button>
//         )}
//       </div>
//       <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#2B4BAB]/60 mb-1">{label}</p>
//       {isBadge ? (
//         <span className="inline-flex px-3 py-1 rounded-md text-[10px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">{value}</span>
//       ) : (
//         <p className={`font-bold text-slate-800 ${isCopyable ? 'font-mono text-xs' : 'text-lg'} truncate`}>{value}</p>
//       )}
//     </div>
//   );
// };

// const UsageProgress = ({ label, used = 0, limit = 1, color }) => {
//   const percentage = Math.min(Math.round((used / (limit || 1)) * 100), 100);
//   return (
//     <div className="p-6 rounded-md bg-white border border-slate-200">
//       <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
//       <div className="flex items-baseline gap-1">
//         <p className="text-3xl font-semibold text-slate-800">{used}</p>
//         <p className="text-slate-400 font-bold text-sm">/ {limit}</p>
//       </div>
//       <div className="mt-6">
//         <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
//           <span>Utilization</span>
//           <span>{percentage}%</span>
//         </div>
//         <div className="w-full bg-slate-200 h-2.5 rounded-md overflow-hidden">
//           <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} className={`${color} h-full rounded-md`} />
//         </div>
//       </div>
//     </div>
//   );
// };

// const FeatureItem = ({ icon, label, value }) => (
//   <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
//     <div className="w-10 h-10 rounded-md bg-[#2B4BAB] text-white flex items-center justify-center font-semibold">{icon}</div>
//     <div>
//       <p className="text-xs font-bold text-slate-400 uppercase">{label}</p>
//       <p className="text-sm font-bold text-slate-700">{value}</p>
//     </div>
//   </div>
// );

// export default Plandetail;


import React, { useEffect, useState } from 'react';
import UserNavbar from './UserNavbar';
import axios from 'axios';
import { 
  Calendar, CreditCard, RefreshCw, Zap, ArrowLeft, 
  ShieldCheck, Download, Copy, ExternalLink, Info 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import UserFooter from './UserFooter';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ErrorLayout from '../shared/ErrorLayout'
const Plandetail = () => {
  const [subscription, setSubscription] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
const [errorMessage, setErrorMessage] = useState("");
  const navigate=useNavigate()

  const token = sessionStorage.getItem("token");
  const API_BASE = "https://formbuilder-saas-backend.onrender.com";

  useEffect(() => {
    getplandetail();
  }, []);

  const getplandetail = async () => {
    try {
      // const res = await axios.get(`${API_BASE}/subscription`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      const [subRes, profileRes] = await Promise.all([
      axios.get(`${API_BASE}/subscription`, { headers: { Authorization: `Bearer ${token}` } }),
      axios.get(`${API_BASE}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } })
    ]);
      setSubscription(subRes.data.data);
      //console.log(subRes.data.data)
      setUserStats(profileRes.data.data);
      //console.log(profileRes.data.data)
      setApiError(null);
    } catch (err) {
    
   setApiError(err.response?.status || 500);
   setErrorMessage(err.response?.data?.message || "Failed to fetch billing details");
    } finally {
      setLoading(false);
    }
  };

  const cancelplandetail = async () => {
    try {
      const res = await axios.post(
        `${API_BASE}/subscription/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Subscription cancelled");
     // window.location.reload();
     navigate('/plandetail')
    } catch (err) {
      toast.error(err.response?.data || "Cancellation failed");
    }
  };

  

  if (apiError) {
  return (
    <ErrorLayout 
      status={apiError} 
      message={errorMessage} 
     
    />
  );
}
  return (
    <>
      <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-blue-100">
        <UserNavbar />

        <main className="max-w-7xl w-full mx-auto pt-12 pb-24 px-4 md:px-6">
          {/* Back Navigation */}
          <Link to="/profile" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#2B4BAB] text-sm mb-8 transition-all font-bold group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Profile
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md border border-slate-100 bg-white shadow-[0_15px_40px_rgba(43,75,171,0.06)] overflow-hidden"
          >
            {/* Header / Brand Section */}
         {loading? (
              <div className="h-[500px] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-[#2B4BAB] animate-spin" />
                <p className="text-slate-400 font-medium">Loading your plan details...</p>
              </div>
            ) : ( <>
            <div className="p-10 flex flex-col md:flex-row items-center gap-8 bg-white border-b border-slate-50">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center bg-blue-50 text-[#2B4BAB] shadow-inner">
                  <Zap size={40} fill="currentColor" className="opacity-90" />
                </div>
              </div>
              
              <div className="flex flex-col text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">
                    {subscription?.plan || "Free"} <span className="text-[#2B4BAB]">Plan</span>
                  </h1>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                    subscription?.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {subscription?.status || "Inactive"}
                  </span>
                </div>
                <p className="text-slate-400 font-medium mt-1">
                  Billing cycle: {subscription?.interval || "Monthly"}
                </p>
              </div>

              <div className="md:ml-auto flex gap-3">
               
                  <button className="px-8 py-3 bg-[#2B4BAB] text-white rounded-md font-bold hover:bg-[#1e3a8a] shadow-xl shadow-[#2B4BAB]/20 transition-all active:scale-95 text-sm"
                  onClick={()=>{navigate("/subscription")}}
                  >
                    Upgrade Now
                  </button>
               
                {/* <button className="p-3 rounded-md border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">
                  <Download size={20}/>
                </button> */}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-10 bg-[#FBFDFF]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <DetailCard 
                  icon={<CreditCard className="text-[#2B4BAB]" size={20} />} 
                  label="Subscription ID" 
                  value={subscription?.razorpaySubscriptionId || "Free"} 
                  isCopyable 
                />
                <DetailCard 
                  icon={<Calendar className="text-[#2B4BAB]" size={20} />} 
                  label="Renewal Date" 
                  value={subscription?.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Free"} 
                />
                <DetailCard 
                  icon={<ShieldCheck className="text-emerald-500" size={20} />} 
                  label="Billing Status" 
                  value="Auto-renew On" 
                  isBadge 
                />
              </div>

        {/* USAGE LIMITS SECTION */}
{userStats && userStats.role !== "ADMIN" && (
  <div className="mt-10 p-8 rounded-md border border-slate-100 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-6 bg-[#2B4BAB] rounded-full"></div>
        <div>
          <h2 className="font-bold text-xl text-slate-900 tracking-tight">Plan Usage & Quotas</h2>
          <p className="text-sm text-slate-400 font-medium">
            Monitoring your <span className="text-[#2B4BAB]">{subscription?.plan || "Free"}</span> limits
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-fit px-4 py-2 bg-blue-50 border border-blue-100 rounded-md">
        <div className="w-2 h-2 bg-blue-500 rounded-md animate-pulse"></div>
        <span className="text-blue-700 font-bold text-md uppercase tracking-widest">
          {subscription?.plan || "Free"} Plan
        </span>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {/* 1. MONTHLY RESPONSES */}
      <div className="relative p-6 rounded-md bg-white border border-slate-200 group">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Monthly Submissions</p>
        <div className="flex items-baseline gap-1">
          <p className="text-3xl font-black text-slate-800">{userStats.limits?.monthly?.used || 0}</p>
          <p className="text-slate-400 font-bold text-sm">/ {userStats.limits?.monthly?.limit || 0}</p>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
            <span>Utilization</span>
            <span>{Math.round(((userStats.limits?.monthly?.used || 0) / (userStats.limits?.monthly?.limit || 1)) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-md overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((userStats.limits?.monthly?.used || 0) / (userStats.limits?.monthly?.limit || 1)) * 100}%` }}
              className="bg-emerald-500 h-full rounded-md shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
            />
          </div>
          <p className="text-[10px] mt-3 text-slate-400 font-bold uppercase">{userStats.limits?.monthly?.remaining || 0} remaining this month</p>
        </div>
      </div>

      {/* 2. FORM CREATION LIMIT */}
      <div className="p-6 rounded-md bg-white border border-slate-200">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Active Forms</p>
        <div className="flex items-baseline gap-1">
          <p className="text-3xl font-black text-slate-800">{userStats.limits?.forms?.used || 0}</p>
          <p className="text-slate-400 font-bold text-sm">/ {userStats.limits?.forms?.limit || 0}</p>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
            <span>Utilization</span>
            <span>{Math.round(((userStats.limits?.forms?.used || 0) / (userStats.limits?.forms?.limit || 1)) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((userStats.limits?.forms?.used || 0) / (userStats.limits?.forms?.limit || 1)) * 100}%` }}
              className="bg-[#2B4BAB] h-full rounded-full" 
            />
          </div>
          <p className="text-[10px] mt-3 text-[#2B4BAB] font-bold uppercase">{userStats.limits?.forms?.remaining || 0} creations left</p>
        </div>
      </div>

      {/* 3. DAILY ROLLING LIMIT */}
      {/* <div className="p-6 rounded-md bg-white border-2 border-slate-200 flex flex-col justify-center">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Daily Rolling Limit</p>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl font-black text-slate-700">{userStats.limits?.daily?.remaining || 0}</p>
          <p className="text-xs font-medium text-slate-400">left today</p>
        </div>
        
        <div className="mt-6 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
             <div 
              className="bg-amber-400 h-full rounded-md" 
              style={{ width: `${((userStats.limits?.daily?.used || 0) / (userStats.limits?.daily?.limit || 1)) * 100}%` }}
            />
        </div>

        <div className="flex items-center gap-2 mt-4">
            <p className="text-[10px] text-slate-400 font-medium italic leading-tight">
              Used {userStats.limits?.daily?.used || 0} of {userStats.limits?.daily?.limit || 0} daily limit.
            </p>
        </div>
      </div> */}


      {/* 3. DAILY ROLLING LIMIT - FIXED TO MATCH */}
      <div className="p-6 rounded-md bg-white border border-slate-200">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Daily Rolling Limit</p>
        <div className="flex items-baseline gap-1">
          <p className="text-3xl font-black text-slate-800">{userStats.limits?.daily?.remaining || 0}</p>
          <p className="text-slate-400 font-bold text-sm">left today</p>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
            <span>Utilization</span>
            <span>{Math.round(((userStats.limits?.daily?.used || 0) / (userStats.limits?.daily?.limit || 1)) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-md overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((userStats.limits?.daily?.used || 0) / (userStats.limits?.daily?.limit || 1)) * 100}%` }}
              className="bg-amber-400 h-full rounded-md" 
            />
          </div>
          <p className="text-[10px] mt-3 text-amber-600 font-bold uppercase">Used {userStats.limits?.daily?.used || 0} of {userStats.limits?.daily?.limit || 0}</p>
        </div>
      </div>

      {/* 4. OTHER ASSETS (API Keys & Seats) */}
      <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-50">
          {/* <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors"> */}
              {/* <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">API</div>
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">API Access</p>
                  <p className="text-sm font-bold text-slate-700">{userStats.limits?.apiKeys?.limit || 0} Key(s) Allowed</p>
              </div> */}
          {/* </div> */}
          {/* <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors"> */}
              {/* <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">S</div> */}
              {/* <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">User Seats</p>
                  <p className="text-sm font-bold text-slate-700">{userStats.limits?.users?.limit || 0} Active Workspace Seat(s)</p>
              </div> */}
          {/* </div> */}

          <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
               <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">T</div>
  <div>
    <p className="text-xs font-bold text-slate-400 uppercase">
      Custom Settings
    </p>

    <p className="text-sm font-bold text-slate-700">
      {userStats?.limits?.themeAccess ? "Yes" : "No"}
    </p>
  </div>
</div>
      </div>

    </div>
  </div>
)}

              {/* Danger Zone */}
            {userStats?.plan?.planType !== "FREE" && ( <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                    <Info size={24} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold">Cancel Subscription</h4>
                    <p className="text-sm text-slate-400 font-medium max-w-sm">
                      Cancelling will disable premium features at the end of your current billing period.
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={cancelplandetail}
                  className="px-8 py-3 rounded-md border border-red-100 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95 text-sm"
                >
                  End Subscription
                </button>
              </div>)}
            </div>
            </>)}
          </motion.div>
        </main>
      </div>
      <UserFooter/>
    </>
  );
};

const DetailCard = ({ icon, label, value, isBadge, isCopyable }) => {
  const handleCopy = () => {
    if (value !== "Free") {
      navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div className="p-6 rounded-md border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all group relative">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
          {icon}
        </div>
        {isCopyable && value !== "N/A" && (
          <button onClick={handleCopy} className="text-slate-300 hover:text-[#2B4BAB] transition-colors">
            <Copy size={14} />
          </button>
        )}
      </div>
      
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#2B4BAB]/60 mb-1">{label}</p>
      
      {isBadge ? (
        <span className="inline-flex px-3 py-1 rounded-lg text-[10px] font-mono uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
          {value}
        </span>
      ) : (
        <p className={`font-mono text-slate-800  ${isCopyable ? 'text-lg' : 'text-lg'} truncate`}>
          {value}
        </p>
      )}
    </div>
  );
};

export default Plandetail;