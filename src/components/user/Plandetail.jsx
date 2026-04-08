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

const Plandetail = () => {
  const [subscription, setSubscription] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const API_BASE = "https://formbuilder-saas-backend.onrender.com";

  useEffect(() => {
    getplandetail();
  }, []);

  const getplandetail = async () => {
    try {
      const [subRes, profileRes] = await Promise.all([
        axios.get(`${API_BASE}/subscription`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_BASE}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setSubscription(subRes.data.data);
      setUserStats(profileRes.data.data);
    } catch (err) {
      toast.error("Failed to fetch billing details");
    } finally {
      setLoading(false);
    }
  };

  // const cancelplandetail = async () => {
  //   try {
  //     await axios.post(
  //       `${API_BASE}/subscription/cancel`,
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     toast.success("Subscription cancelled");
  //     window.location.reload();
  //   } catch (err) {
  //     toast.error(err.response?.data || "Cancellation failed");
  //   }
  // };

  // Helper to handle Null/Backend empty values
  const formatValue = (val) => (val === null || val === undefined || val === "" ? "FREE" : val);

  return (
    <>
      <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-blue-100">
        <UserNavbar />

        <main className="max-w-7xl w-full mx-auto pt-12 pb-24 px-4 md:px-6 text-slate-900">
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
            {loading ? (
              <div className="h-[500px] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-[#2B4BAB] animate-spin" />
                <p className="text-slate-400 font-medium">Loading your plan details...</p>
              </div>
            ) : (
              <>
                {/* Header / Brand Section */}
                <div className="p-10 flex flex-col md:flex-row items-center gap-8 bg-white border-b border-slate-50">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-md flex items-center justify-center bg-blue-50 text-[#2B4BAB] shadow-inner">
                      <Zap size={40} fill="currentColor" className="opacity-90" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                      <h1 className="text-3xl font-bold uppercase tracking-tight">
                        {formatValue(subscription?.plan)} <span className="text-[#2B4BAB]">Plan</span>
                      </h1>
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
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
                    <button 
                      className="px-8 py-3 bg-[#2B4BAB] text-white rounded-md font-bold hover:bg-[#1e3a8a] shadow-xl shadow-[#2B4BAB]/20 transition-all active:scale-95 text-sm"
                      onClick={() => { navigate("/subscription") }}
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
                      value={formatValue(subscription?.razorpaySubscriptionId)} 
                      isCopyable 
                    />
                    <DetailCard 
                      icon={<Calendar className="text-[#2B4BAB]" size={20} />} 
                      label="Renewal Date" 
                      value={subscription?.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "FREE"} 
                    />
                    <DetailCard 
                      icon={<ShieldCheck className="text-emerald-500" size={20} />} 
                      label="Billing Status" 
                      value="Auto-renew On" 
                      isBadge 
                    />
                  </div>

                  <div className="rounded-md border border-slate-100 p-8 bg-white shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-1.5 h-6 bg-[#2B4BAB] rounded-full"></div>
                      <h2 className="font-bold text-lg uppercase tracking-tight">Usage & Quota</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Card 1: Forms Created */}
                      <div className="p-5 rounded-md bg-white shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-4">
                          <p className="text-sm font-bold text-slate-600">Forms Created</p>
                          <span className="px-2 py-1 bg-white rounded-md text-[10px] font-bold text-[#2B4BAB] shadow-sm uppercase">
                            {subscription?.plan === "FREE" || !subscription?.plan ? "Limit: 3" : "Unlimited"}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <h4 className="text-3xl font-black">{userStats?.formCount || 0}</h4>
                          <p className="text-slate-400 text-xs">Active forms</p>
                        </div>
                        
                        <p className="text-slate-400 mt-4 text-xs font-medium">
                          {subscription?.plan === "FREE" || !subscription?.plan
                            ? `${3 - (userStats?.formCount || 0)} forms remaining` 
                            : "Unlimited forms available"}
                        </p>
                        {(subscription?.plan === "FREE" || !subscription?.plan) && (
                          <div className="mt-4 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#2B4BAB] rounded-full transition-all duration-700" 
                              style={{ width: `${Math.min(((userStats?.formCount || 0) / 3) * 100, 100)}%` }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Card 2: Responses */}
                      <div className="p-5 rounded-md bg-white border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <p className="text-sm font-bold text-slate-600">Responses</p>
                          <span className="px-2 py-1 bg-white rounded-md text-[10px] font-bold text-[#2B4BAB] shadow-sm uppercase">
                            {subscription?.plan === "PRO" ? "Limit: 2,000" : 
                             subscription?.plan === "ULTRA" ? "Limit: 50,000" : "Limit: 100"}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <h4 className="text-3xl font-black">{userStats?.monthlyResponseCount || 0}</h4>
                          <p className="text-slate-400 text-xs">Monthly responses</p>
                        </div>
                        
                        <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                            style={{ 
                              width: `${Math.min(((userStats?.monthlyResponseCount || 0) / 
                                (subscription?.plan === "PRO" ? 2000 : 
                                 subscription?.plan === "ULTRA" ? 50000 : 100)) * 100, 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  {/* <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-50 text-red-500 rounded-md">
                        <Info size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold">Cancel Subscription</h4>
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
                  </div> */}
                </div>
              </>
            )}
          </motion.div>
        </main>
      </div>
      <UserFooter/>
    </>
  );
};

const DetailCard = ({ icon, label, value, isBadge, isCopyable }) => {
  const handleCopy = () => {
    if (value !== "FREE") {
      navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div className="p-6 rounded-md border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all group flex flex-col justify-between min-h-[115px]">
      <div className="flex justify-between items-center mb-auto">
        <div className="p-2.5 rounded-md bg-slate-50 group-hover:bg-blue-50 transition-colors">
          {icon}
        </div>
        {isCopyable && value !== "FREE" && (
          <button onClick={handleCopy} className="text-slate-300 hover:text-[#2B4BAB] transition-colors p-1">
            <Copy size={16} />
          </button>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#2B4BAB]/60 mb-1">{label}</p>
        
        {isBadge ? (
          <span className="inline-flex px-3 py-1 rounded-md text-[10px] font-black uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">
            {value}
          </span>
        ) : (
          <p className="font-bold text-slate-800 text-base truncate">
            {value}
          </p>
        )}
      </div>
    </div>
  );
};

export default Plandetail;