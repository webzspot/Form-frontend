// // import React, { useEffect } from 'react'
// // import UserNavbar from './UserNavbar'
// // import axios from 'axios'

// // const Plandetail = () => {
// //        const token = localStorage.getItem("token");
// //    const API_BASE = "https://formbuilder-saas-backend.onrender.com";
// //    useEffect(()=>{
// //     getplandetail()
// //    },[])
// //     const getplandetail=async()=>{
// //         const res=await axios.get(`${API_BASE}/subscription`,{
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       console.log(res)
// //     }
// //   return (
// //     <div>

// //         <UserNavbar/>
        
// //         Plandetail
        
        
// //         </div>
// //   )
// // }

// // export default Plandetail


// import React, { useEffect, useState } from 'react';
// import UserNavbar from './UserNavbar';
// import axios from 'axios';
// import { Calendar, CreditCard, CheckCircle2, AlertCircle, RefreshCw, Zap, ArrowLeft, ShieldCheck, Download, Copy } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import UserFooter from './userFooter';

// const Plandetail = () => {
//   const [subscription, setSubscription] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const token = sessionStorage.getItem("token");
//   const API_BASE = "https://formbuilder-saas-backend.onrender.com";

//   useEffect(() => {
//     getplandetail();
//   }, []);

//   const getplandetail = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/subscription`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSubscription(res.data.data);
//       console.log(res.data.data)
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

// //   const cancelplandetail=async()=>{
// //     const res=await axios.post(`${API_BASE}/subscription/cancel`,{
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       console.log(res)
// //   }


// const cancelplandetail = async () => {
//   try {
//     const res = await axios.post(
//       `${API_BASE}/subscription/cancel`,
//       {}, 
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//         window.location.reload();


//     console.log("Cancel success:", res.data);
//   } catch (err) {
//     console.error("Cancel error:", err.response?.data || err.message);
//   }
// };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <RefreshCw className="animate-spin text-violet-600" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="relative min-h-screen bg-[#FDFCFE] text-slate-900 transition-colors duration-500">
//         <UserNavbar />
        
       

//         <main className="max-w-7xl w-full  relative z-10 pt-16 mx-auto pb-20 px-6">
//           {/* Back Button */}
//           <Link to="/profile" className="inline-flex items-center gap-2 text-gray-500 text-sm  mb-6 transition-all font-semibold group">
//             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
//             Back to Profile
//           </Link>

//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white/80 border border-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(109,40,217,0.1)] backdrop-blur-xl"
//           >
//             {/* Header Banner - Deep Violet Gradient */}
//             <div className="h-40 relative bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700">
//                 <div className="absolute -bottom-14 left-10 p-1.5 rounded-[2rem] bg-white shadow-xl">
//                    <div className="w-28 h-28 rounded-[1.8rem] flex items-center justify-center bg-violet-50 text-violet-600">
//                      <Zap size={44} fill="currentColor" />
//                    </div>
//                 </div>
//             </div>

//             <div className="pt-20 px-10 pb-10">
//               <div className="flex flex-col lg:flex-row justify-between items-start gap-8 border-b border-violet-50 pb-10">
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <h1 className="text-4xl font-black tracking-tight text-slate-900">
//                       {subscription?.plan || "Free"} <span className="text-violet-600">Plan</span>
//                     </h1>
//                     <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest 
//                       ${subscription?.status === 'active' 
//                         ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
//                         : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
//                       {subscription?.status}
//                     </span>
//                   </div>
//                   <p className="text-slate-500 font-medium">Manage your billing, invoices, and plan features.</p>
//                 </div>

//                 <div className="flex gap-3">
//                     <Link to={"/"} state={{scrollTo:"subscription"}}>
//                   <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-violet-200">
//                     Upgrade Plan
//                   </button>
//                   </Link>
//                   <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all hover:bg-slate-50">
//                     <Download size={18}/> Invoices
//                   </button>
//                 </div>
//               </div>

//               {/* Detail Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
//                 <DetailCard 
//                   icon={<CreditCard className="text-violet-500" />} 
//                   label="Subscription ID" 
//                   value={subscription?.razorpaySubscriptionId || "N/A"} 
//                   isCopyable 
//                 />
//                 <DetailCard 
//                   icon={<Calendar className="text-indigo-500" />} 
//                   label="Renewal Date" 
//                   value={subscription?.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "N/A"} 
//                 />
//                 <DetailCard 
//                   icon={<ShieldCheck className="text-emerald-500" />} 
//                   label="Status" 
//                   value="Secured" 
//                   isBadge 
//                 />
//               </div>

//               {/* Progress Tracker */}
//               <div className="mt-4">
//                 <h3 className="text-sm font-black uppercase tracking-[0.2em] text-violet-400 mb-6">Usage & Billing</h3>
//                 <div className="p-8 rounded-[2rem] bg-violet-50/50 border border-violet-100 transition-all">
//                   <div className="flex justify-between items-end mb-4">
//                     <div>
//                       <p className="font-bold text-lg text-slate-800">Current Period Progress</p>
//                       <p className="text-sm text-slate-500">Plan resets every 30 days</p>
//                     </div>
//                     <p className="text-2xl font-black text-violet-600">65%</p>
//                   </div>
//                   <div className="h-4 w-full bg-white rounded-full overflow-hidden p-1 border border-violet-100">
//                     <motion.div 
//                       initial={{ width: 0 }}
//                       animate={{ width: "65%" }}
//                       className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Danger Zone */}
//               <div className="pt-10 mt-10 border-t border-red-100">
//                  <div className="p-8 rounded-[2rem] bg-red-50/50 border border-red-100 flex flex-col md:flex-row justify-between items-center gap-6">
//                     <div>
//                       <h4 className="text-red-600 font-bold text-lg mb-1">Cancel Subscription</h4>
//                       <p className="text-sm text-slate-500">Losing access to premium features will happen at the end of the month.</p>
//                     </div>
//                     <button 
//                     onClick={()=>{cancelplandetail()}}
//                     className="px-6 py-3 rounded-xl bg-white border border-red-200 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all">
//                        End Subscription
//                     </button>
//                  </div>
//               </div>
//             </div>
//           </motion.div>
//         </main>
//       </div>
//       <UserFooter/>
//     </>
//   );
// };

// const DetailCard = ({ icon, label, value, isBadge, isCopyable }) => (
//   <div className="p-6 rounded-[2rem] border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all group">
//     <div className="mb-4 text-2xl group-hover:scale-110 transition-transform">{icon}</div>
//     <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">{label}</p>
//     {isBadge ? (
//       <span className="inline-flex px-3 py-1 rounded-lg text-xs font-bold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
//         {value}
//       </span>
//     ) : (
//       <p className={`font-bold text-slate-800 ${isCopyable ? 'font-mono text-sm opacity-70' : 'text-lg'} truncate`}>
//         {value}
//       </p>
//     )}
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
      console.log(subRes.data.data)
      setUserStats(profileRes.data.data);
      console.log(profileRes.data.data)
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
      window.location.reload();
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
               
                <button className="p-3 rounded-md border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all">
                  <Download size={20}/>
                </button>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-10 bg-[#FBFDFF]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <DetailCard 
                  icon={<CreditCard className="text-[#2B4BAB]" size={20} />} 
                  label="Subscription ID" 
                  value={subscription?.razorpaySubscriptionId || "N/A"} 
                  isCopyable 
                />
                <DetailCard 
                  icon={<Calendar className="text-[#2B4BAB]" size={20} />} 
                  label="Renewal Date" 
                  value={subscription?.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "N/A"} 
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
      
      <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-md">
        <div className="w-2 h-2 bg-blue-500 rounded-md animate-pulse"></div>
        <span className="text-blue-700 font-bold text-xs uppercase tracking-widest">
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
      <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
          <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">API</div>
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">API Access</p>
                  <p className="text-sm font-bold text-slate-700">{userStats.limits?.apiKeys?.limit || 0} Key(s) Allowed</p>
              </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">S</div>
              <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">User Seats</p>
                  <p className="text-sm font-bold text-slate-700">{userStats.limits?.users?.limit || 0} Active Workspace Seat(s)</p>
              </div>
          </div>
      </div>

    </div>
  </div>
)}

              {/* Danger Zone */}
              <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
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
              </div>
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
    if (value !== "N/A") {
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
        <span className="inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
          {value}
        </span>
      ) : (
        <p className={`font-bold text-slate-800 ${isCopyable ? 'font-mono text-xs' : 'text-lg'} truncate`}>
          {value}
        </p>
      )}
    </div>
  );
};

export default Plandetail;