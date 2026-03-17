import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  XAxis,  
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import UserNavbar from "./UserNavbar";
import UserFooter from "./userFooter";

import toast from "react-hot-toast";
import WaveBackground from "../dashboard/WaveBackground";
import { useFormContext } from "../dashboard/FormContext";
import { 
  FiAlertCircle, 
  FiCheckCircle, 
  FiSend, 
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
  FiActivity,
  FiMoon,
  FiSun
} from "react-icons/fi";

const UserReport = () => {
  const token = localStorage.getItem("token");
  const [issuetype, setIssuetype] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useFormContext();

  // --- DYNAMIC STOCK DATA LOGIC ---
  const [chartData, setChartData] = useState([]);
  const [chartColor, setChartColor] = useState("#8b5cf6"); // Default Purple
  const [trendIcon, setTrendIcon] = useState(<FiActivity />);

  // Update chart based on Priority Selection
  useEffect(() => {
    if (priority === "High") {
      // Stock goes UP (Green)
      setChartData([
        { time: "10am", val: 20 }, { time: "11am", val: 40 }, 
        { time: "12pm", val: 35 }, { time: "1pm", val: 70 }, 
        { time: "2pm", val: 55 }, { time: "3pm", val: 90 }, 
        { time: "4pm", val: 100 }
      ]);
      setChartColor("#10b981"); // Emerald Green
      setTrendIcon(<FiTrendingUp className="text-emerald-400" />);
    } else if (priority === "Low") {
      // Stock goes DOWN (Red)
      setChartData([
        { time: "10am", val: 90 }, { time: "11am", val: 70 }, 
        { time: "12pm", val: 85 }, { time: "1pm", val: 40 }, 
        { time: "2pm", val: 50 }, { time: "3pm", val: 20 }, 
        { time: "4pm", val: 10 }
      ]);
      setChartColor("#ef4444"); // Red
      setTrendIcon(<FiTrendingDown className="text-red-400" />);
    } else {
      // Neutral / Volatile (Purple)
      setChartData([
        { time: "10am", val: 40 }, { time: "11am", val: 60 }, 
        { time: "12pm", val: 45 }, { time: "1pm", val: 55 }, 
        { time: "2pm", val: 40 }, { time: "3pm", val: 60 }, 
        { time: "4pm", val: 50 }
      ]);
      setChartColor(isDarkMode ? "#8b5cf6" : "#f43f5e");
      setTrendIcon(<FiMinus className={isDarkMode ? "text-purple-400" : "text-white"} />);
    }
  }, [priority, isDarkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!issuetype || !description) {
      setMessage("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "https://formbuilder-saas-backend.onrender.com/api/dashboard/user-report",
        {
          reportData: { issueType: issuetype, description, priority },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
       toast.success("Your report is submitted");
      setSuccess(true);
      setIssuetype("");
      setDescription("");
      setPriority("");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // --- Custom Star Icon for Aesthetic ---
// const SparkleIcon = ({ className }) => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
//     <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
//   </svg>
// );

  // --- THEME ---
  const theme = {
    pageBg: isDarkMode 
      ? "bg-[#05070f] text-white" : 
      "bg-[#F5F6F8] text-[#4c1d95]",
    formCard: isDarkMode
      ? "bg-[#1212]/80 backdrop-blur-xl shadow-[0_0_20px_rgba(139,92,246,0.05)]"
      : "bg-white  ",
    
      input: isDarkMode
    ? "bg-[#05070f]  text-white placeholder-gray-500 "
    : "bg-white text-[#14181F] placeholder-[#6A7181] ", 
    leftPanel: isDarkMode
      ? "bg-gradient-to-b from-[#1e1b4b] to-[#0f0c29] border-r border-purple-500/10" 
      : "bg-[#FFFFFF] ", 
    button: isDarkMode
      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
      : "bg-[#2B4BAB] text-white hover:bg-[#233d8a] transition-colors",
    textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/40",
  };


 
  return (
    <>
      <UserNavbar />
      
      <div className={`w-full min-h-screen relative font-sans flex justify-center items-start pt-8 overflow-hidden ${theme.pageBg}`}>
        
     

        {/* MAIN CONTAINER */}
        <motion.div
          initial={{ scale: 0.95, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
         className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10"
         
        >
          {/* Replace your current "Your Reports" div with this */}
<div className="w-full mb-8">
  <motion.h1
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#14181F]'}`}
  >
   Report
  </motion.h1>
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    className={` sm:text-base font-normal text-sm leading-snug align-middle mt-2 ${isDarkMode ? 'text-slate-400' : 'text-[#6A7181]'}`}
  >
    Submit a report or issue to the team.

  </motion.p>
</div>
           <div className={`grid grid-cols-1 lg:mb-0 md:mb-6 lg:grid-cols-12 gap-6 w-full  ${theme.formCard}`}> 
         
            
            {/* ================= LEFT PANEL (ANALYTICS) ================= */}
          
             <div className="lg:col-span-6  sm:p-12 md:pt-2 md:pl-4 relative sm:min-h-[442px] border  rounded-xl  border-[#E5E7EB] ">
               <div className="absolute top-0 left-0  w-full h-1 " /> 

              <div className=" p-2">
                <h2 className={`  font-medium text-2xl leading-none align-middle sm:mb-2 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#14181F]'}`}>
                  Submit Report 
                </h2>
                <p className={`font-normal text-sm leading-relaxed align-middle
 ${isDarkMode ? 'text-gray-400' : 'text-[#6A7181]'}`}>
                  Select priority to visualize impact.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2   ">
                <div className="grid grid-cols-1 p-2 md:grid-cols-2 gap-6">
                  
                 
                  <div className="space-y-2 ">
                    <label className={`font-medium text-sm leading-none align-middle ${isDarkMode ? 'text-gray-400' : 'text-[#6A7181]'}`}>
                      Issue Type <span className="text-[#6A7181]">*</span>
                    </label>
                    <div className="relative group border mt-4 border-[#E5E7EB] rounded-xl">
                       <select
                         value={issuetype}
                         onChange={(e) => setIssuetype(e.target.value)}
                         className={`w-full rounded-xl px-2 py-2 sm:px-4 sm:py-3.5 text-[10px] sm:text-sm outline-none transition-all duration-300 appearance-none cursor-pointer ${theme.input}`}
                       >
                         <option value="" className="text-[#6A7181]">Select Category</option>
                         <option value="Bug">Bug Report</option>
                         <option value="Feature Request">Feature Request</option>
                         <option value="Billing">Billing Issue</option>
                       </select>
                      
                    </div>
                  </div>

                
                  <div className="space-y-2">
                    <label className={`font-medium text-sm leading-none align-middle ${isDarkMode ? 'text-gray-400' : 'text-[#6A7181]'}`}>
                      Priority Level
                    </label>
                    <div className="relative group mt-4 border-[#E5E7EB] rounded-xl border">
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className={`w-full rounded-xl px-2 py-2 sm:px-4 sm:py-3.5 text-[10px] sm:text-sm  outline-none transition-all duration-300 appearance-none cursor-pointer ${theme.input} ${!issuetype ? 'text-[#6A7181]/60' : ''}`}
                      >
                        <option value="" className="text-[#6A7181]">Select Priority...</option>
                        <option value="Low">Low (Stable)</option>
                        <option value="Medium">Medium (Neutral)</option>
                        <option value="High">High (Critical)</option>
                      </select>
                     
                    </div>
                  </div>
                </div>

                <div className="space-y-2 p-2">
                  <label className={`font-medium text-sm leading-none align-middle  ${isDarkMode ? 'text-gray-400' : 'text-[#6A7181]'}`}>
                    Description <span className="text-[#6A7181]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description the Phenomenon.."
                    className={`w-full rounded-xl px-2 py-2 sm:px-4 sm:py-3.5 text-[10px] sm:text-sm  border border-[#E5E7EB] mt-4 outline-none transition-all duration-300 resize-none ${theme.input} `}
                  />
                </div>

                
                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-xl backdrop-blur-sm"
                    >
                      <FiAlertCircle />
                      <span className="text-sm font-semibold">{message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

               
                {/* <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  disabled={loading}
                  className={`inline-block max-w-24 h-5 font-sans font-medium text-sm leading-5 text-center align-middle opacity-100 ${theme.button}`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FiSend /> <span className="font-sans font-medium text-sm leading-5 text-center align-middle">Submit Report</span>
                    </>
                  )}
                </motion.button> */}
               {/* Centering Wrapper */}
<div className="w-full flex justify-center mb-4 ">
  <motion.button
    whileTap={{ scale: 0.97 }}
    whileHover={{ scale: 1.02 }}
    disabled={loading}
    className={`
      w-full max-w-[200px] md:max-w-[411px] h-8 md:h-11  
      flex items-center justify-center gap-2 
      rounded-md font-sans font-medium text-sm 
      transition-all duration-200
      ${theme.button}
    `}
  >
    {loading ? (
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        <span>Processing...</span>
      </div>
    ) : (
      <>
       
        <span>Submit Report</span>
      </>
    )}
  </motion.button>
</div>
              </form>
            </div> 



            {/* ================= RIGHT PANEL (FORM) ================= */}
       {/* ================= RIGHT PANEL (IMPACT VISUALIZATION) ================= */}
<div className="hidden lg:flex lg:col-span-6 min-h-[442px] flex-col rounded-xl border border-[#E5E7EB]  relative overflow-hidden" >
  <div className="flex-1 flex flex-col items-center justify-center p-8">
    <AnimatePresence mode="wait">
      {!priority ? (
        /* FIGMA STATE: Empty (Frame 17) */
        <motion.div
          key="placeholder"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center"
        >
          <h3 className={`text-[24px] ${isDarkMode?"text-white":"text-[#14181F]"} font-medium  mb-2`}>
            Live Impact Data
          </h3>
          <p className="text-[14px] text-[#6A7181] max-w-[315px] mx-auto">
            Submit reports to track projected urgency and visualize impact across your forms.
          </p>
        </motion.div>
      ) : (
        /* FIGMA STATE: Active Selection */
        <div className="border border-black/10 shadow-inner max-w-xl mx-auto w-full">
        <motion.div
          key="chart"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-full flex flex-col"
        >
          {/* Responsive Graph Container */}
          <div className="w-full flex-1 min-h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="dynamicColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #E5E7EB',
                    fontSize: '12px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="val" 
                  stroke={chartColor} 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#dynamicColor)" 
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Status Label - Dynamic Color */}
          <div className="mt-4 flex justify-end">
             <span 
               className="font-bold text-[20px] italic tracking-tight uppercase"
               style={{ color: chartColor }}
             >
                {priority === "High" ? "CRITICAL" : priority === "Medium" ? "NEUTRAL" : "STABLE"}
             </span>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  </div>
</div>
          </div>
        </motion.div>
          

      </div>
      <UserFooter />
    </>
  );
};

export default UserReport;