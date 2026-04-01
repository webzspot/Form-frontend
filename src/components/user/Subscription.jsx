import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  X, 
  Zap, 
  ShieldCheck, 
  Crown, 
  ArrowRight,
  Database,
  Code,
  Globe,
  Lock
} from 'lucide-react';
import UserFooter from './UserFooter';
import UserNavbar from './UserNavbar';
import toast from 'react-hot-toast';

const Subscription = ({ standalone = true }) => {
  const navi = useNavigate();
  const [userPlan, setUserPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");
  const API_BASE = "https://formbuilder-saas-backend.onrender.com";

  // 1. Fetch User Profile to identify current plan
  const getUser = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`${API_BASE}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res)
      // Based on your console log: res.data.data.plan contains "PRO", "FREE", etc.
      if (res.data?.data?.plan) {
        setUserPlan(res.data.data.plan.toUpperCase());
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const planApi = async (plan) => {
    const currentToken = sessionStorage.getItem("token");

    if (!currentToken) {
      toast.error("Session expired. Please log in again.");
      navi("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE}/subscription/create`,
        { planType: plan },
        { 
          headers: { 
            Authorization: `Bearer ${currentToken}` 
          } 
        }
      );

      const options = {
        key: res.data.keyId,
        subscription_id: res.data.subscriptionId,
        name: "FormCraft",
        description: `${plan} Plan Upgrade`,
        handler: function (response) {
          toast.success("Payment Successful! Upgrading your account...");
          // Refresh plan local state after success
          setUserPlan(plan);
          navi("/home");
        },
        prefill: {
          name: sessionStorage.getItem("Name") || "Customer", 
        },
        theme: { color: "#2B4BAB" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", (response) => {
        toast.error("Payment Failed: " + response.error.description);
      });
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
      if (error.response?.status === 401) {
        toast.error("Session invalid. Please login again.");
        navi("/login");
      } else {
        toast.error("Something went wrong initializing payment.");
      }
    }
  };

  const plans = [
    {
      id: "FREE",
      name: "Free (Starter)",
      price: "0",
      description: "Ideal for individuals or small community drives.",
      icon: <Zap size={22} />,
      features: [
        { text: "3 Active Forms", active: true },
        { text: "100 Responses / month", active: true },
        { text: "100 MB Storage", active: true },
        { text: "1 User Seat", active: true },
        { text: "API Access", active: false },
        { text: "Branding Removal", active: false },
      ],
      cta: "Free",
    },
    {
      id: "PRO",
      name: "Pro (Growth)",
      price: "15",
      description: "Best for growing clinics and blood banks.",
      icon: <ShieldCheck size={22} />,
      features: [
        { text: "Unlimited Forms", active: true },
        { text: "2,000 Responses / month", active: true },
        { text: "5 GB Storage", active: true },
        { text: "1 User Seat", active: true },
        { text: "Read Only API (GET)", active: true },
        { text: "Custom Fonts & CSS", active: true },
      ],
      cta: "Go Pro",
      highlight: true
    },
    {
      id: "BUSINESS",
      name: "Business (Developer)",
      price: "49",
      description: "Advanced tools for enterprise healthcare systems.",
      icon: <Crown size={22} />,
      features: [
        { text: "Unlimited Forms", active: true },
        { text: "50,000 Responses / month", active: true },
        { text: "50 GB Storage", active: true },
        { text: "5 User Seats", active: true },
        { text: "Full API Access (POST)", active: true },
        { text: "Custom Branding", active: true },
      ],
      cta: "Get Business",
    }
  ];

  return (
    <>
      {standalone && <UserNavbar />}
      <div className="min-h-screen bg-[#FCFCFC] font-['DM_Sans']">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
          
          <div className="text-center mb-16">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#2B4BAB] font-bold text-xs tracking-widest uppercase mb-4"
            >
              Pricing Plans
            </motion.p>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-[#14181F] tracking-tighter"
            >
              Scalable solutions for <br/>
              <span className="text-[#2B4BAB]">modern data collection</span>
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => {
              // Determine if this card is the user's active plan
              const isActive = userPlan === plan.id;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative bg-white border border-gray-200 rounded-sm p-8 flex flex-col transition-all duration-300 hover:shadow-lg ${plan.highlight ? 'border-[#2B4BAB] border-2' : ''}`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2B4BAB] text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-8 text-center sm:text-left">
                    <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-6 bg-[#2B4BAB]/10 text-[#2B4BAB]">
                      {plan.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#14181F]">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-4">
                      <span className="text-5xl font-bold text-[#14181F] tracking-tight">${plan.price}</span>
                      <span className="text-[#737B8C] text-sm">/month</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-10 flex-1 border-t border-gray-100 pt-8">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-sm flex items-center justify-center ${feature.active ? 'bg-[#2B4BAB]/10' : 'bg-gray-100'}`}>
                          {feature.active ? (
                            <Check size={12} className="text-[#2B4BAB] stroke-[3px]" />
                          ) : (
                            <X size={12} className="text-gray-400" />
                          )}
                        </div>
                        <span className={`text-sm ${feature.active ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {isActive ? (
                    <div className="w-full py-4 rounded-sm font-bold text-sm flex items-center justify-center gap-2 border border-gray-200 text-gray-400 bg-gray-50">
                      <Check size={18} />
                      Active Plan
                    </div>
                  ) : (
                    <button 
                      onClick={() => planApi(plan.id)}
                      className="w-full py-4 rounded-sm font-bold text-sm flex items-center bg-[#2B4BAB] justify-center gap-2 transition-all text-white hover:brightness-110 shadow-md shadow-[#2B4BAB]/20"
                    >
                      {plan.cta} <ArrowRight size={16} />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-20 pt-10 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Availability', val: '99.9%', icon: <Globe size={18}/> },
              { label: 'Security', val: 'AES-256', icon: <Lock size={18}/> },
              { label: 'Uptime', val: '24/7', icon: <Code size={18}/> },
              { label: 'Storage', val: '50GB', icon: <Database size={18}/> },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-[#2B4BAB]">{item.icon}</div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-gray-400 tracking-tighter">{item.label}</p>
                  <p className="text-sm font-bold text-gray-800">{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {standalone && <UserFooter />}
    </>
  );
};

export default Subscription;

