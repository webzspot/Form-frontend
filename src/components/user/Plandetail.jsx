// import React, { useEffect } from 'react'
// import UserNavbar from './UserNavbar'
// import axios from 'axios'

// const Plandetail = () => {
//        const token = localStorage.getItem("token");
//    const API_BASE = "https://formbuilder-saas-backend.onrender.com";
//    useEffect(()=>{
//     getplandetail()
//    },[])
//     const getplandetail=async()=>{
//         const res=await axios.get(`${API_BASE}/subscription`,{
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       console.log(res)
//     }
//   return (
//     <div>

//         <UserNavbar/>
        
//         Plandetail
        
        
//         </div>
//   )
// }

// export default Plandetail


import React, { useEffect, useState } from 'react';
import UserNavbar from './UserNavbar';
import axios from 'axios';
import { Calendar, CreditCard, CheckCircle2, AlertCircle, RefreshCw, Zap, ArrowLeft, ShieldCheck, Download, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WaveBackground from "../dashboard/WaveBackground";
import Footer from "../landingPage/Footer";

const Plandetail = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const API_BASE = "https://formbuilder-saas-backend.onrender.com";

  useEffect(() => {
    getplandetail();
  }, []);

  const getplandetail = async () => {
    try {
      const res = await axios.get(`${API_BASE}/subscription`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubscription(res.data.data);
      console.log(res.data.data)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

//   const cancelplandetail=async()=>{
//     const res=await axios.post(`${API_BASE}/subscription/cancel`,{
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       console.log(res)
//   }


const cancelplandetail = async () => {
  try {
    const res = await axios.post(
      `${API_BASE}/subscription/cancel`,
      {}, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
        window.location.reload();


    console.log("Cancel success:", res.data);
  } catch (err) {
    console.error("Cancel error:", err.response?.data || err.message);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <RefreshCw className="animate-spin text-violet-600" />
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen bg-[#FDFCFE] text-slate-900 transition-colors duration-500">
        <UserNavbar />
        
        {/* Soft Violet Waves */}
        <div className="absolute top-0 w-full overflow-hidden leading-[0] z-0 opacity-60">
           <WaveBackground position="top" height="h-160" color="#DDD6FE" />
        </div>

        <main className="max-w-5xl relative z-10 pt-16 mx-auto pb-20 px-6">
          {/* Back Button */}
          <Link to="/profile" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-700 mb-6 transition-all font-semibold group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Profile
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 border border-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(109,40,217,0.1)] backdrop-blur-xl"
          >
            {/* Header Banner - Deep Violet Gradient */}
            <div className="h-40 relative bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700">
                <div className="absolute -bottom-14 left-10 p-1.5 rounded-[2rem] bg-white shadow-xl">
                   <div className="w-28 h-28 rounded-[1.8rem] flex items-center justify-center bg-violet-50 text-violet-600">
                     <Zap size={44} fill="currentColor" />
                   </div>
                </div>
            </div>

            <div className="pt-20 px-10 pb-10">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-8 border-b border-violet-50 pb-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">
                      {subscription?.plan || "Free"} <span className="text-violet-600">Plan</span>
                    </h1>
                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest 
                      ${subscription?.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                      {subscription?.status}
                    </span>
                  </div>
                  <p className="text-slate-500 font-medium">Manage your billing, invoices, and plan features.</p>
                </div>

                <div className="flex gap-3">
                    <Link to={"/"} state={{scrollTo:"subscription"}}>
                  <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-violet-200">
                    Upgrade Plan
                  </button>
                  </Link>
                  <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all hover:bg-slate-50">
                    <Download size={18}/> Invoices
                  </button>
                </div>
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
                <DetailCard 
                  icon={<CreditCard className="text-violet-500" />} 
                  label="Subscription ID" 
                  value={subscription?.razorpaySubscriptionId || "N/A"} 
                  isCopyable 
                />
                <DetailCard 
                  icon={<Calendar className="text-indigo-500" />} 
                  label="Renewal Date" 
                  value={subscription?.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "N/A"} 
                />
                <DetailCard 
                  icon={<ShieldCheck className="text-emerald-500" />} 
                  label="Status" 
                  value="Secured" 
                  isBadge 
                />
              </div>

              {/* Progress Tracker */}
              <div className="mt-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-violet-400 mb-6">Usage & Billing</h3>
                <div className="p-8 rounded-[2rem] bg-violet-50/50 border border-violet-100 transition-all">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="font-bold text-lg text-slate-800">Current Period Progress</p>
                      <p className="text-sm text-slate-500">Plan resets every 30 days</p>
                    </div>
                    <p className="text-2xl font-black text-violet-600">65%</p>
                  </div>
                  <div className="h-4 w-full bg-white rounded-full overflow-hidden p-1 border border-violet-100">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="pt-10 mt-10 border-t border-red-100">
                 <div className="p-8 rounded-[2rem] bg-red-50/50 border border-red-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <h4 className="text-red-600 font-bold text-lg mb-1">Cancel Subscription</h4>
                      <p className="text-sm text-slate-500">Losing access to premium features will happen at the end of the month.</p>
                    </div>
                    <button 
                    onClick={()=>{cancelplandetail()}}
                    className="px-6 py-3 rounded-xl bg-white border border-red-200 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all">
                       End Subscription
                    </button>
                 </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
      <Footer/>
    </>
  );
};

const DetailCard = ({ icon, label, value, isBadge, isCopyable }) => (
  <div className="p-6 rounded-[2rem] border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all group">
    <div className="mb-4 text-2xl group-hover:scale-110 transition-transform">{icon}</div>
    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">{label}</p>
    {isBadge ? (
      <span className="inline-flex px-3 py-1 rounded-lg text-xs font-bold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
        {value}
      </span>
    ) : (
      <p className={`font-bold text-slate-800 ${isCopyable ? 'font-mono text-sm opacity-70' : 'text-lg'} truncate`}>
        {value}
      </p>
    )}
  </div>
);

export default Plandetail;