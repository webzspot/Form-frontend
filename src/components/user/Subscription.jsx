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
import { Loader2 } from 'lucide-react';

const Subscription = ({ standalone = true }) => {
  const navi = useNavigate();
  const [userPlan, setUserPlan] = useState(null);
  const [loading, setLoading] = useState(true);
   const [availablePlans, setAvailablePlans] = useState([]); 

  const token = sessionStorage.getItem("token");
  const API_BASE = "https://formbuilder-saas-backend.onrender.com";




  const getPlanIcon = (type) => {
    switch (type?.toUpperCase()) {
      case "FREE": return <Zap size={22} />;
      case "PRO": return <ShieldCheck size={22} />;
      case "BUSINESS": return <Crown size={22} />;
      default: return <Database size={22} />;
    }
  };

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
      const planData = res.data?.data?.plan?.planType;

      if (planData) {
        setUserPlan(planData.toUpperCase());
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);



   const fetchPlans = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/plans`);
      if (res.data?.success) {
        setAvailablePlans(res.data.data); // Data from your JSON
        console.log(res.data.data)
      }
    } catch (err) {
      toast.error("Failed to load pricing plans");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
    fetchPlans();
  }, [getUser,fetchPlans]);

  // const planApi = async (plan) => {
  //   const currentToken = sessionStorage.getItem("token");

  //   if (!currentToken) {
  //     toast.error("Session expired. Please log in again.");
  //     navi("/login");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(
  //       `${API_BASE}/subscription/create`,
  //       { planType: plan },
  //       { 
  //         headers: { 
  //           Authorization: `Bearer ${currentToken}` 
  //         } 
  //       }
  //     );

  //     const options = {
  //       key: res.data.keyId,
  //       subscription_id: res.data.subscriptionId,
  //       name: "FormCraft",
  //       description: `${plan} Plan Upgrade`,
  //       handler: function (response) {
  //         toast.success("Payment Successful! Upgrading your account...");
  //         // Refresh plan local state after success
  //         setUserPlan(plan);
  //         navi("/home");
  //       },
  //       prefill: {
  //         name: sessionStorage.getItem("Name") || "Customer", 
  //       },
  //       theme: { color: "#2B4BAB" },
  //     };

  //     const rzp1 = new window.Razorpay(options);
  //     rzp1.on("payment.failed", (response) => {
  //       toast.error("Payment Failed: " + response.error.description);
  //     });
  //     rzp1.open();
  //   } catch (error) {
  //     console.error("Payment Error:", error);
  //     if (error.response?.status === 401) {
  //       toast.error("Session invalid. Please login again.");
  //       navi("/login");
  //     } else {
  //       toast.error("Something went wrong initializing payment.");
  //     }
  //   }
  // };


  const planApi = async (planId) => {
  const currentToken = sessionStorage.getItem("token");

  if (!currentToken) {
    toast.error("Session expired. Please log in again.");
    navi("/login");
    return;
  }

  try {
    // FIX: Changed the key to 'planId' to match your backend's requirement
    const res = await axios.post(
      `${API_BASE}/subscription/create`,
      { planId: planId }, 
      { 
        headers: { 
          Authorization: `Bearer ${currentToken}` 
        } 
      }
    );
 console.log("FULL BACKEND DATA:", res.data);
    const options = {
      key: res.data.keyId,
      subscription_id: res.data.subscriptionId,
      name: "FormCraft",
      description: `Plan Upgrade`,
      handler: function (response) {
        toast.success("Payment Successful!");
      setUserPlan(planId);
      getUser();
        navi("/home");
      },
      prefill: {
        name: sessionStorage.getItem("Name") || "Customer", 
      },
      theme: { color: "#2B4BAB" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error("Payment Error:", error);
    toast.error(error.response?.data?.message || "Something went wrong.");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#2B4BAB]" size={40} />
        <p className="ml-2 font-medium text-gray-600">Loading plans...</p>
      </div>
    );
  }

  return (
    <>
      {standalone && <UserNavbar />}
      <div className="min-h-screen w-full bg-[#F5F6F8] font-['DM_Sans']">
        <div className="max-w-7xl bg-white rounded-md mx-auto px-4 md:px-6 py-20">
          
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

         <div className="flex flex-wrap  justify-center gap-12 ">
 {availablePlans.map((plan, i) => {
  const isActive = userPlan === plan.planType?.toUpperCase();
  const isFreePlan = plan.planType?.toUpperCase() === "FREE";
  
  const features = [
    { text: `${plan.activeFormLimit} Active Forms`, active: true },
    { text: `${plan.monthlyResponseLimit} Responses / month`, active: true },
    { text: `${plan.dailyResponseLimit} Daily Submissions`, active: true },
    { text: `${plan.apiKeyLimit} API Keys`, active: plan.apiKeyLimit > 0 },
    { text: "Custom Themes", active: !!plan.themeAccess },
    { text: `${plan.userLimit} User Seat`, active: true },
  ];

  return (
    <motion.div
      key={plan.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      viewport={{ once: true }}
      className={`relative bg-white border rounded-sm p-8 flex flex-col transition-all duration-300 hover:shadow-xl w-full md:w-[360px] ${plan.planType === 'PRO' ? 'border-[#2B4BAB] border-2 shadow-lg scale-105' : 'border-gray-200'}`}
    >
      {plan.planType === 'PRO' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2B4BAB] text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-6 bg-[#2B4BAB]/10 text-[#2B4BAB]">
          {getPlanIcon(plan.planType)}
        </div>
        <h3 className="text-xl font-bold text-[#14181F]">{plan.name}</h3>
        <div className="flex items-baseline gap-1 mt-4">
          <span className="text-5xl font-bold text-[#14181F] tracking-tight">
            {plan.currency === "INR" ? "₹" : "$"}{plan.amount}
          </span>
          <span className="text-[#737B8C] text-sm">/{plan.period}</span>
        </div>
        <p className="mt-2 text-gray-500 text-sm capitalize">{plan.description}</p>
      </div>

      <div className="space-y-4 mb-10 flex-1 border-t border-gray-100 pt-8">
        {features.map((feature, fIdx) => (
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

      {/* FIXED BUTTON LOGIC BELOW */}
      <div className="mt-auto">
        {isActive ? (
          <div className="w-full py-4 rounded-sm font-bold text-sm flex items-center justify-center gap-2 border border-[#2B4BAB] text-[#2B4BAB] bg-[#2B4BAB]/5">
            <Check size={18} /> Current Plan
          </div>
        ) : isFreePlan ? (
          <button 
            disabled
            className="w-full py-4 rounded-sm font-bold text-sm flex items-center justify-center bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
          >
            Default Plan
          </button>
        ) : (
          <button 
            onClick={() => planApi(plan.id)}
            className="w-full py-4 rounded-sm font-bold text-sm flex items-center bg-[#2B4BAB] justify-center gap-2 transition-all text-white hover:brightness-110 shadow-md shadow-[#2B4BAB]/20"
          >
            Upgrade Now <ArrowRight size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
})}
</div>

       
        </div>
      </div>
      {standalone && <UserFooter />}
    </>
  );
};

export default Subscription;





// import React, { useState, useEffect, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Check, X, Zap, ShieldCheck, Crown, ArrowRight,
//   Database, Loader2
// } from 'lucide-react';
// import UserFooter from './UserFooter';
// import UserNavbar from './UserNavbar';
// import toast from 'react-hot-toast';

// const Subscription = ({ standalone = true }) => {
//   const navi = useNavigate();
//   const [userPlan, setUserPlan] = useState(null);
//   const [availablePlans, setAvailablePlans] = useState([]); 
//   const [loading, setLoading] = useState(true);

//   const token = sessionStorage.getItem("token");
//   const API_BASE = "https://formbuilder-saas-backend.onrender.com";

//   const getUserProfile = useCallback(async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(`${API_BASE}/api/users/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // Extracting current plan from profile response
//       if (res.data?.data?.plan?.planType) {
//         setUserPlan(res.data.data.plan.planType.toUpperCase());
//       }
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     }
//   }, [token]);

//   const fetchPlans = useCallback(async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/plans`);
//       if (res.data?.success) {
//         setAvailablePlans(res.data.data); // Data from your JSON
//       }
//     } catch (err) {
//       toast.error("Failed to load pricing plans");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     getUserProfile();
//     fetchPlans();
//   }, [getUserProfile, fetchPlans]);

//   const planApi = async (planType) => {
//     if (!token) {
//       toast.error("Please log in to upgrade.");
//       navi("/login");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `${API_BASE}/subscription/create`,
//         { planType: planType },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const options = {
//         key: res.data.keyId,
//         subscription_id: res.data.subscriptionId,
//         name: "FormCraft",
//         description: `${planType} Plan Upgrade`,
//         handler: function (response) {
//           toast.success("Payment Successful!");
//           setUserPlan(planType);
//           navi("/home");
//         },
//         prefill: { name: sessionStorage.getItem("Name") || "Customer" },
//         theme: { color: "#2B4BAB" },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Payment initialization failed.");
//     }
//   };

//   const getPlanIcon = (type) => {
//     switch (type?.toUpperCase()) {
//       case "FREE": return <Zap size={22} />;
//       case "PRO": return <ShieldCheck size={22} />;
//       case "BUSINESS": return <Crown size={22} />;
//       default: return <Database size={22} />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <Loader2 className="animate-spin text-[#2B4BAB]" size={40} />
//       </div>
//     );
//   }

//   return (
//     <>
//       {standalone && <UserNavbar />}
//       <div className="min-h-screen bg-[#FCFCFC] font-['DM_Sans']">
//         <div className="max-w-7xl mx-auto px-4 md:px-6 py-20">
          
//           <div className="text-center mb-16">
//             <motion.p className="text-[#2B4BAB] font-bold text-xs tracking-widest uppercase mb-4">
//               Pricing Plans
//             </motion.p>
//             <motion.h1 className="text-4xl md:text-5xl font-bold text-[#14181F] tracking-tighter">
//               Scalable solutions for <br/>
//               <span className="text-[#2B4BAB]">modern data collection</span>
//             </motion.h1>
//           </div>

//           {/* Flexbox to center plans when there are only 2 */}
//           <div className="flex flex-wrap justify-center gap-12 ">
//             {availablePlans.map((plan, i) => {
//               const isActive = userPlan === plan.planType?.toUpperCase();
              
//               // Mapping exact fields from your JSON response
//               const features = [
//                 { text: `${plan.activeFormLimit} Active Forms`, active: true },
//                 { text: `${plan.monthlyResponseLimit} Responses / month`, active: true },
//                 { text: `${plan.dailyResponseLimit} Daily Submissions`, active: true },
//                 { text: `${plan.apiKeyLimit} API Keys`, active: plan.apiKeyLimit > 0 },
//                 { text: "Custom Themes", active: plan.themeAccess },
//                 { text: `${plan.userLimit} User Seat`, active: true },
//               ];

//               return (
//                 <motion.div
//                   key={plan.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   className={`relative bg-white border rounded-sm p-8 flex flex-col transition-all hover:shadow-xl w-full md:w-[360px] ${plan.planType === 'PRO' ? 'border-[#2B4BAB] border-2 shadow-lg scale-105' : 'border-gray-200'}`}
//                 >
//                   {plan.planType === 'PRO' && (
//                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2B4BAB] text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
//                       Most Popular
//                     </div>
//                   )}

//                   <div className="mb-8">
//                     <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-6 bg-[#2B4BAB]/10 text-[#2B4BAB]">
//                       {getPlanIcon(plan.planType)}
//                     </div>
//                     <h3 className="text-xl font-bold text-[#14181F]">{plan.name}</h3>
//                     <div className="flex items-baseline gap-1 mt-4">
//                       <span className="text-5xl font-bold text-[#14181F] tracking-tight">
//                         {plan.currency === "INR" ? "₹" : "$"}{plan.amount}
//                       </span>
//                       <span className="text-[#737B8C] text-sm">/{plan.period}</span>
//                     </div>
//                     <p className="mt-2 text-gray-500 text-sm capitalize">{plan.description}</p>
//                   </div>

//                   <div className="space-y-4 mb-10 flex-1 border-t border-gray-100 pt-8">
//                     {features.map((feature, fIdx) => (
//                       <div key={fIdx} className="flex items-center gap-3">
//                         <div className={`w-5 h-5 rounded-sm flex items-center justify-center ${feature.active ? 'bg-[#2B4BAB]/10' : 'bg-gray-100'}`}>
//                           {feature.active ? (
//                             <Check size={12} className="text-[#2B4BAB] stroke-[3px]" />
//                           ) : (
//                             <X size={12} className="text-gray-400" />
//                           )}
//                         </div>
//                         <span className={`text-sm ${feature.active ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
//                           {feature.text}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   {isActive ? (
//                     <div className="w-full py-4 rounded-sm font-bold text-sm flex items-center justify-center gap-2 border border-[#2B4BAB] text-[#2B4BAB] bg-[#2B4BAB]/5">
//                       <Check size={18} /> Current Plan
//                     </div>
//                   ) : (
//                     <button 
//                       onClick={() => planApi(plan.planType)}
//                       className="w-full py-4 rounded-sm font-bold text-sm flex items-center bg-[#2B4BAB] justify-center gap-2 transition-all text-white hover:brightness-110"
//                     >
//                       {plan.amount === 0 ? "Get Started" : "Upgrade Now"} <ArrowRight size={16} />
//                     </button>
//                   )}
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       {standalone && <UserFooter />}
//     </>
//   );
// };

// export default Subscription;






