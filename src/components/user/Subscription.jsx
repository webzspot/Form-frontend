import React, { useState } from 'react';
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
  Users,
  Code,
  Globe
} from 'lucide-react';
import UserNavbar from './UserNavbar';

const Subscription = ({ isDarkMode = false }) => {
  const navi=useNavigate()
  const token = localStorage.getItem("token");
   const API_BASE = "https://formbuilder-saas-backend.onrender.com";
 

   //RAZORPAY



  const planApi = async (plan) => {
  try {
    const res = await axios.post(
      `${API_BASE}/subscription/create`,
      { planType: plan },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // console.log("Backend Response:", res.data);

    const options = {
      key: res.data.keyId,   // FIXED
      subscription_id: res.data.subscriptionId,  // FIXED
      name: "FormBuilder App",  // FIXED comma

      handler: function (response) {
        alert("Payment Successful! Upgrading your account...");
        // window.location.reload();
        navi("/home")
      },

      theme: { color: "#3B82F6" },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert("Payment Failed: " + response.error.description);
    });

    rzp1.open();

  } catch (error) {
    console.error("Payment Error:", error);
    alert("Something went wrong initializing payment.");
  }
};
  



  const theme = {
    pageBg: isDarkMode 
      ? "bg-[#05070f] text-slate-100" 
      : "bg-[#F8FAFC] text-slate-800",
    
    card: isDarkMode
      ? "bg-[#11111a] border border-slate-800 shadow-xl"
      : "bg-white border border-slate-200 shadow-sm",

    buttonPrimary: isDarkMode
      ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/20"
      : "bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-200",

    textSub: isDarkMode ? "text-slate-400" : "text-slate-500",
  };

  const plans = [
    {
      id: "FREE",
      name: "Free (Starter)",
      price: "$0",
      description: "Ideal for individuals or small community drives.",
      icon: <Zap size={20} className="text-blue-500" />,
      features: [
        { text: "3 Active Forms", active: true },
        { text: "100 Responses / month", active: true },
        { text: "100 MB Storage", active: true },
        { text: "1 User Seat", active: true },
        { text: "API Access", active: false },
        { text: "Branding Removal", active: false },
      ],
      cta: "Get Started",
      highlight: false
    },
    {
      id: "PRO",
      name: "Pro (Growth)",
      price: "$15",
      description: "Best for growing clinics and blood banks.",
      icon: <ShieldCheck size={20} className="text-purple-500" />,
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
      price: "$49",
      description: "Advanced tools for enterprise healthcare systems.",
      icon: <Crown size={20} className="text-amber-500" />,
      features: [
        { text: "Unlimited Forms", active: true },
        { text: "50,000 Responses / month", active: true },
        { text: "50 GB Storage", active: true },
        { text: "5 User Seats", active: true },
        { text: "Full API Access (POST)", active: true },
        { text: "Custom Branding", active: true },
      ],
      cta: "Contact Enterprise",
      highlight: false
    }
  ];

  return (
    <>
  
    <div className={`min-h-screen ${theme.pageBg} p-8 md:p-20 transition-colors duration-300`}>
      
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
         

          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Scalable solutions for <br/> <span className="text-slate-500 font-medium italic">modern Form.</span>
          </motion.h1>
        </div>

        {/* Plan Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${theme.card} rounded-3xl p-8 flex flex-col relative transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5`}
            >
              {plan.highlight && (
                <div className="absolute top-6 right-8">
                  <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Recommended</span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'} p-3 rounded-2xl`}>
                  {plan.icon}
                </div>
                <h3 className="text-lg font-bold">{plan.name}</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`${theme.textSub} text-sm`}>/month</span>
                </div>
                <p className={`${theme.textSub} text-sm mt-3 leading-relaxed`}>
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-1 border-t border-slate-100 dark:border-slate-800 pt-8">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    {feature.active ? (
                      <Check size={16} className="text-purple-500" />
                    ) : (
                      <X size={16} className="text-slate-300 dark:text-slate-600" />
                    )}
                    <span className={`text-sm ${feature.active ? 'font-medium' : 'text-slate-300 dark:text-slate-600'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <button 
              onClick={()=>planApi(plan.id)}
              className={`${theme.buttonPrimary} w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all group`}>
                {plan.cta} 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            
            </motion.div>
          ))}
        </div>
      

        {/* Footer Stats - Clean & Professional */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-10 border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Global Availability', val: '99.9%', icon: <Globe size={18}/> },
            { label: 'Data Security', val: 'AES-256', icon: <ShieldCheck size={18}/> },
            { label: 'API Uptime', val: '24/7', icon: <Code size={18}/> },
            { label: 'Cloud Storage', val: 'Up to 50GB', icon: <Database size={18}/> },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="text-slate-400">{item.icon}</div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">{item.label}</p>
                <p className="text-sm font-bold">{item.val}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default Subscription;