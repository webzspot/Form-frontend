// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Check, 
//   X, 
//   Zap, 
//   ShieldCheck, 
//   Crown, 
//   ArrowRight,
//   Database,
//   Users,
//   Code,
//   Globe
// } from 'lucide-react';
// import UserNavbar from './UserNavbar';

// const Subscription = () => {
//   const navi=useNavigate()
//   const token = sessionStorage.getItem("token");
//    const API_BASE = "https://formbuilder-saas-backend.onrender.com";
 

//    //RAZORPAY



//   const planApi = async (plan) => {
//   try {
//     const res = await axios.post(
//       `${API_BASE}/subscription/create`,
//       { planType: plan },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     // console.log("Backend Response:", res.data);

//     const options = {
//       key: res.data.keyId,   // FIXED
//       subscription_id: res.data.subscriptionId,  // FIXED
//       name: "FormBuilder App",  // FIXED comma

//       handler: function (response) {
//         alert("Payment Successful! Upgrading your account...");
//         // window.location.reload();
//         navi("/home")
//       },

//       theme: { color: "#3B82F6" },
//     };

//     const rzp1 = new window.Razorpay(options);

//     rzp1.on("payment.failed", function (response) {
//       alert("Payment Failed: " + response.error.description);
//     });

//     rzp1.open();

//   } catch (error) {
//     console.error("Payment Error:", error);
//     alert("Something went wrong initializing payment.");
//   }
// };
  



//   const theme = {
//     pageBg:  "bg-[#F8FAFC] text-slate-800",
    
//     card:  "bg-white border border-slate-200 shadow-sm",

//     buttonPrimary: "bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-200",

//     textSub: "text-slate-500",
//   };

//   const plans = [
//     {
//       id: "FREE",
//       name: "Free (Starter)",
//       price: "$0",
//       description: "Ideal for individuals or small community drives.",
//       icon: <Zap size={20} className="text-blue-500" />,
//       features: [
//         { text: "3 Active Forms", active: true },
//         { text: "100 Responses / month", active: true },
//         { text: "100 MB Storage", active: true },
//         { text: "1 User Seat", active: true },
//         { text: "API Access", active: false },
//         { text: "Branding Removal", active: false },
//       ],
//       cta: "Get Started",
//       highlight: false
//     },
//     {
//       id: "PRO",
//       name: "Pro (Growth)",
//       price: "$15",
//       description: "Best for growing clinics and blood banks.",
//       icon: <ShieldCheck size={20} className="text-purple-500" />,
//       features: [
//         { text: "Unlimited Forms", active: true },
//         { text: "2,000 Responses / month", active: true },
//         { text: "5 GB Storage", active: true },
//         { text: "1 User Seat", active: true },
//         { text: "Read Only API (GET)", active: true },
//         { text: "Custom Fonts & CSS", active: true },
//       ],
//       cta: "Go Pro",
//       highlight: true
//     },
//     {
//       id: "BUSINESS",
//       name: "Business (Developer)",
//       price: "$49",
//       description: "Advanced tools for enterprise healthcare systems.",
//       icon: <Crown size={20} className="text-amber-500" />,
//       features: [
//         { text: "Unlimited Forms", active: true },
//         { text: "50,000 Responses / month", active: true },
//         { text: "50 GB Storage", active: true },
//         { text: "5 User Seats", active: true },
//         { text: "Full API Access (POST)", active: true },
//         { text: "Custom Branding", active: true },
//       ],
//       cta: "Contact Enterprise",
//       highlight: false
//     }
//   ];

//   return (
//     <>
  
//     <div className={`min-h-screen ${theme.pageBg} p-8 md:p-20 transition-colors duration-300`}>
      
//       <div className="max-w-6xl mx-auto">
        
//         {/* Header */}
//         <div className="mb-16">
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center gap-2 mb-4"
//           >
         

//           </motion.div>
//           <motion.h1 
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
//           >
//             Scalable solutions for <br/> <span className="text-slate-500 font-medium italic">modern Form.</span>
//           </motion.h1>
//         </div>

//         {/* Plan Grid */}
//         <div id="subscription-cards" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {plans.map((plan, i) => (
//             <motion.div
//               key={plan.name}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className={`${theme.card} rounded-3xl p-8 flex flex-col relative transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5`}
//             >
//               {plan.highlight && (
//                 <div className="absolute top-6 right-8">
//                   <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Recommended</span>
//                 </div>
//               )}

//               <div className="flex items-center gap-3 mb-6">
//                 <div className={`bg-slate-50 p-3 rounded-2xl`}>
//                   {plan.icon}
//                 </div>
//                 <h3 className="text-lg font-bold">{plan.name}</h3>
//               </div>

//               <div className="mb-6">
//                 <div className="flex items-baseline gap-1">
//                   <span className="text-4xl font-bold">{plan.price}</span>
//                   <span className={`${theme.textSub} text-sm`}>/month</span>
//                 </div>
//                 <p className={`${theme.textSub} text-sm mt-3 leading-relaxed`}>
//                   {plan.description}
//                 </p>
//               </div>

//               <div className="space-y-4 mb-10 flex-1 border-t border-slate-100 dark:border-slate-800 pt-8">
//                 {plan.features.map((feature, fIdx) => (
//                   <div key={fIdx} className="flex items-center gap-3">
//                     {feature.active ? (
//                       <Check size={16} className="text-purple-500" />
//                     ) : (
//                       <X size={16} className="text-slate-300 dark:text-slate-600" />
//                     )}
//                     <span className={`text-sm ${feature.active ? 'font-medium' : 'text-slate-300 dark:text-slate-600'}`}>
//                       {feature.text}
//                     </span>
//                   </div>
//                 ))}
//               </div>
// {/* 
//               <button 
//               onClick={()=>planApi(plan.id)}
//               className={`${theme.buttonPrimary} w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all group`}>
//                 {plan.cta} 
//                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//               </button> */}
  
  
// {plan.id === "FREE" ? (
//   <div className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border-2 
//     border-slate-200 text-slate-400 bg-slate-100
//     `}>
//     <Check size={18} />
//     Free Plan
//   </div>
// ) : (
//   <button 
//     onClick={() => planApi(plan.id)}
//     className={`${theme.buttonPrimary} w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all group`}
//   >
//     {plan.cta} 
//     <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//   </button>
// )}
             
//      </motion.div>
//           ))}
//         </div>
      

//         {/* Footer Stats - Clean & Professional */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="mt-20 pt-10 border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-8"
//         >
//           {[
//             { label: 'Global Availability', val: '99.9%', icon: <Globe size={18}/> },
//             { label: 'Data Security', val: 'AES-256', icon: <ShieldCheck size={18}/> },
//             { label: 'API Uptime', val: '24/7', icon: <Code size={18}/> },
//             { label: 'Cloud Storage', val: 'Up to 50GB', icon: <Database size={18}/> },
//           ].map((item, i) => (
//             <div key={i} className="flex items-start gap-3">
//               <div className="text-slate-400">{item.icon}</div>
//               <div>
//                 <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">{item.label}</p>
//                 <p className="text-sm font-bold">{item.val}</p>
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Subscription;

// import React from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Check, 
//   X, 
//   Zap, 
//   ShieldCheck, 
//   Crown, 
//   ArrowRight,
//   Database,
//   Code,
//   Globe,
//   Lock
// } from 'lucide-react';

// const Subscription = () => {
//   const navi = useNavigate();
//   const token = sessionStorage.getItem("token");
//   const API_BASE = "https://formbuilder-saas-backend.onrender.com";

//   const planApi = async (plan) => {
//     try {
//       const res = await axios.post(
//         `${API_BASE}/subscription/create`,
//         { planType: plan },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const options = {
//         key: res.data.keyId,
//         subscription_id: res.data.subscriptionId,
//         name: "FormCraft",
//         handler: function (response) {
//           alert("Payment Successful! Upgrading your account...");
//           navi("/home");
//         },
//         theme: { color: "#10B77F" },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.on("payment.failed", (response) => alert("Payment Failed: " + response.error.description));
//       rzp1.open();
//     } catch (error) {
//       console.error("Payment Error:", error);
//       alert("Something went wrong initializing payment.");
//     }
//   };

//   const plans = [
//     {
//       id: "FREE",
//       name: "Free (Starter)",
//       price: "0",
//       description: "Ideal for individuals or small community drives.",
//       icon: <Zap size={22} />,
//       accent: "#10B77F",
//       features: [
//         { text: "3 Active Forms", active: true },
//         { text: "100 Responses / month", active: true },
//         { text: "100 MB Storage", active: true },
//         { text: "1 User Seat", active: true },
//         { text: "API Access", active: false },
//         { text: "Branding Removal", active: false },
//       ],
//       cta: "Current Plan",
//     },
//     {
//       id: "PRO",
//       name: "Pro (Growth)",
//       price: "15",
//       description: "Best for growing clinics and blood banks.",
//       icon: <ShieldCheck size={22} />,
//       accent: "#594DE6",
//       features: [
//         { text: "Unlimited Forms", active: true },
//         { text: "2,000 Responses / month", active: true },
//         { text: "5 GB Storage", active: true },
//         { text: "1 User Seat", active: true },
//         { text: "Read Only API (GET)", active: true },
//         { text: "Custom Fonts & CSS", active: true },
//       ],
//       cta: "Go Pro",
//       highlight: true
//     },
//     {
//       id: "BUSINESS",
//       name: "Business (Developer)",
//       price: "49",
//       description: "Advanced tools for enterprise healthcare systems.",
//       icon: <Crown size={22} />,
//       accent: "#2A6DF4",
//       features: [
//         { text: "Unlimited Forms", active: true },
//         { text: "50,000 Responses / month", active: true },
//         { text: "50 GB Storage", active: true },
//         { text: "5 User Seats", active: true },
//         { text: "Full API Access (POST)", active: true },
//         { text: "Custom Branding", active: true },
//       ],
//       cta: "Get Business",
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-[#FCFCFC] font-['DM_Sans']">
//       <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        
//         {/* Header Section */}
//         <div className="text-center mb-20">
//           <motion.p 
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-[#10B77F] font-semibold text-sm tracking-widest uppercase mb-4"
//           >
//             Pricing Plans
//           </motion.p>
//           <motion.h1 
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] text-[#14181F] tracking-tighter"
//           >
//             Scalable solutions for <br/>
//             <span className="text-transparent bg-clip-text bg-[linear-gradient(90.41deg,#10B77F_0%,#1AA2E6_100%)]">
//               modern data collection
//             </span>
//           </motion.h1>
//           <p className="text-[#737B8C] mt-6 text-lg max-w-2xl mx-auto">
//             Choose the perfect plan for your team. From solo creators to enterprise organizations.
//           </p>
//         </div>

//         {/* Plans Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
//           {plans.map((plan, i) => (
//             <motion.div
//               key={plan.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               viewport={{ once: true }}
//               className={`relative bg-white border border-[#E5E7EB] rounded-3xl p-8 flex flex-col transition-all duration-300 hover:shadow-xl group ${plan.highlight ? 'ring-2 ring-[#10B77F] ring-offset-4 ring-offset-[#FCFCFC]' : ''}`}
//             >
//               {plan.highlight && (
//                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[linear-gradient(90.41deg,#10B77F_0%,#1AA2E6_100%)] text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
//                   Most Popular
//                 </div>
//               )}

//               <div className="mb-8">
//                 <div 
//                   className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
//                   style={{ backgroundColor: `${plan.accent}1A`, color: plan.accent }}
//                 >
//                   {plan.icon}
//                 </div>
//                 <h3 className="text-xl font-bold font-['Space_Grotesk'] text-[#14181F]">{plan.name}</h3>
//                 <div className="flex items-baseline gap-1 mt-4">
//                   <span className="text-5xl font-bold text-[#14181F] tracking-tight">${plan.price}</span>
//                   <span className="text-[#737B8C] text-sm">/month</span>
//                 </div>
//                 <p className="text-[#737B8C] text-sm mt-4 leading-relaxed">
//                   {plan.description}
//                 </p>
//               </div>

//               <div className="space-y-4 mb-10 flex-1 border-t border-[#F3F4F6] pt-8">
//                 {plan.features.map((feature, fIdx) => (
//                   <div key={fIdx} className="flex items-center gap-3">
//                     <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${feature.active ? 'bg-[#10B77F1A]' : 'bg-gray-50'}`}>
//                       {feature.active ? (
//                         <Check size={12} className="text-[#10B77F] stroke-[3px]" />
//                       ) : (
//                         <X size={12} className="text-[#98A1B3]" />
//                       )}
//                     </div>
//                     <span className={`text-sm ${feature.active ? 'text-[#14181F] font-medium' : 'text-[#98A1B3]'}`}>
//                       {feature.text}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {plan.id === "FREE" ? (
//                 <div className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-[#E5E7EB] text-[#98A1B3] bg-[#F9FAFB]">
//                   <Check size={18} />
//                   Active Plan
//                 </div>
//               ) : (
//                 <button 
//                   onClick={() => planApi(plan.id)}
//                   className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all group overflow-hidden relative
//                     ${plan.highlight 
//                       ? 'bg-[linear-gradient(90.41deg,#10B77F_0%,#1AA2E6_100%)] text-white shadow-lg shadow-emerald-200' 
//                       : 'bg-[#14181F] text-white hover:bg-black'}`}
//                 >
//                   <span className="relative z-10 flex items-center gap-2">
//                     {plan.cta} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//                   </span>
//                 </button>
//               )}
//             </motion.div>
//           ))}
//         </div>

//         {/* Trust Stats Footer */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           className="mt-24 pt-12 border-t border-[#E5E7EB] grid grid-cols-2 md:grid-cols-4 gap-8"
//         >
//           {[
//             { label: 'Global Availability', val: '99.9%', icon: <Globe size={20}/> },
//             { label: 'Security Level', val: 'AES-256', icon: <Lock size={20}/> },
//             { label: 'API Uptime', val: '24/7/365', icon: <Code size={20}/> },
//             { label: 'Storage', val: 'Up to 50GB', icon: <Database size={20}/> },
//           ].map((item, i) => (
//             <div key={i} className="flex items-center gap-4 group">
//               <div className="text-[#98A1B3] group-hover:text-[#10B77F] transition-colors">
//                 {item.icon}
//               </div>
//               <div>
//                 <p className="text-[10px] font-bold uppercase text-[#98A1B3] tracking-widest">{item.label}</p>
//                 <p className="text-sm font-bold text-[#14181F]">{item.val}</p>
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Subscription;


import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
const Subscription = ({ standalone = true }) => {
  const navi = useNavigate();
  const token = sessionStorage.getItem("token");
  const API_BASE = "https://formbuilder-saas-backend.onrender.com";

  const planApi = async (plan) => {
  //   // 1. Always pull fresh token from sessionStorage inside the call
    const currentToken = sessionStorage.getItem("token");

    if (!currentToken) {
      alert("Session expired. Please log in again.");
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
          alert("Payment Successful! Upgrading your account...");
          navi("/home");
        },
        prefill: {
        //  name: "User", // You can pull this from sessionStorage too if available

        // Try using a more realistic name or pulling from sessionStorage if you have it
      name: sessionStorage.getItem("userName") || "Customer", 
      email: sessionStorage.getItem("userEmail") || "test@example.com"
        },
        theme: { color: "#2B4BAB" }, // Consistent Brand Color
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", (response) => {
        alert("Payment Failed: " + response.error.description);
      });
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
      if (error.response?.status === 401) {
        alert("Session invalid. Please login again.");
        navi("/login");
      } else {
        alert("Something went wrong initializing payment.");
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
      accent: "#2B4BAB",
      features: [
        { text: "3 Active Forms", active: true },
        { text: "100 Responses / month", active: true },
        { text: "100 MB Storage", active: true },
        { text: "1 User Seat", active: true },
        { text: "API Access", active: false },
        { text: "Branding Removal", active: false },
      ],
      cta: "Current Plan",
    },
    {
      id: "PRO",
      name: "Pro (Growth)",
      price: "15",
      description: "Best for growing clinics and blood banks.",
      icon: <ShieldCheck size={22} />,
      accent: "#2B4BAB",
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
      accent: "#2B4BAB",
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
        
        {/* Header Section */}
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

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              // Updated to rounded-sm
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

              {plan.id === "FREE" ? (
                <div className="w-full py-4 rounded-sm font-bold text-sm flex items-center justify-center gap-2 border border-gray-200 text-gray-400 bg-gray-50">
                  <Check size={18} />
                  Active Plan
                </div>
              ) : (
                <button 
                  onClick={() => planApi(plan.id)}
                  // Updated to rounded-sm and strictly #2B4BAB
                  className="w-full py-4 rounded-sm font-bold text-sm flex items-center justify-center gap-2 transition-all  text-white hover:brightness-110 shadow-md shadow-[#2B4BAB]/20"
                  style={{ background: 'linear-gradient(90.41deg, #10B77F 0%, #1AA2E6 100%)' }}
                >
                  {plan.cta} <ArrowRight size={16} />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Stats */}
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