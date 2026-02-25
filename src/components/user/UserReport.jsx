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
import Footer from "../landingPage/Footer";
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
      setChartColor(isDarkMode ? "#8b5cf6" : "#a78bfa");
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
const SparkleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

  // --- THEME ---
  const theme = {
    pageBg: isDarkMode 
      ? "bg-[#05070f] text-white" : 
      "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95]",
    formCard: isDarkMode
      ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
      : "bg-white backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",
    input: isDarkMode
      ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
      : "bg-white/90 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",
    leftPanel: isDarkMode
      ? "bg-gradient-to-b from-[#1e1b4b] to-[#0f0c29] border-r border-purple-500/10" 
      : "bg-[#8b5cf6] text-white", 
    button: isDarkMode
      ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
      : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",
    textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/40",
  };

  return (
    <>
      <UserNavbar />
      
      <div className={`w-full min-h-screen relative font-sans flex justify-center items-center py-10 overflow-hidden ${theme.pageBg}`}>
        
        <div className="absolute inset-0 z-0 pointer-events-none">
             <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
             <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
             
             {/* Floating Particles */}
             <motion.div 
               animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }} 
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute top-1/4 left-10 text-white/40 text-4xl"
             ><SparkleIcon className="w-8 h-8" /></motion.div>
        </div>

        {/* MAIN CONTAINER */}
        <motion.div
          initial={{ scale: 0.95, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-6xl  px-2 sm:px-4 relative z-10"
        >
           <div className={` w-full px-6 py-9 ${theme.formCard} mb-4 rounded-3xl`}>
                          <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                           className={`sm:text-3xl text-xl font-bold  ${theme.text}`}
                          >
                            Your Reports
                          </motion.h1>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`${theme.textSub} text-[12px] sm:text-lg mt-1`}
           
                          >
                            Create Manage Share Store your Forms
                          </motion.p>
                        </div>
          <div className={`grid grid-cols-1  lg:grid-cols-12 gap-0 overflow-hidden rounded-xl ${theme.formCard}`}>
            
            {/* ================= LEFT PANEL (ANALYTICS) ================= */}
            <div className={`hidden lg:flex lg:col-span-4 flex-col justify-between p-8 relative overflow-hidden text-white ${theme.leftPanel}`}>
              
              {/* Background Glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        {isDarkMode ? <FiMoon className="w-5 h-5"/> : <FiSun className="w-5 h-5"/>}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold ">Report</h2>
                        <p className="text-xs opacity-70">Live Impact Data</p>
                    </div>
                </div>

                {/* --- LIVE STOCK CHART SECTION --- */}
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-inner flex-1 flex flex-col relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        
                       
                    </div>

                    <div className="w-full flex-1 relative min-h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="time" hide />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: isDarkMode ? '#05070f' : '#ffffff', 
                                        borderRadius: '8px',
                                        border: 'none',
                                        color: isDarkMode ? '#fff' : '#000'
                                    }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="val" 
                                    stroke={chartColor} 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorVal)" 
                                    animationDuration={1000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 text-sm flex justify-between items-center">
                        <span className="opacity-70">Projected Urgency</span>
                        <span className="font-bold text-lg" style={{ color: chartColor }}>
                            {priority === "High" ? "CRITICAL" : priority === "Low" ? "STABLE" : "NEUTRAL"}
                        </span>
                    </div>
                </div>

                <div className="relative z-10 text-center opacity-60 text-sm mt-8">
                 Submit Your Bug Here 
                </div>
              </div>
            </div>

            {/* ================= RIGHT PANEL (FORM) ================= */}
            <div className="lg:col-span-8 p-4 sm:p-8 md:p-12 relative ">
              <div className="absolute top-0 left-0  w-full h-1 " />

              <div className="mb-8">
                <h2 className={`sm:text-3xl text-xl font-bold sm:mb-2 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#4c1d95]'}`}>
                  Submit Report 
                </h2>
                <p className={`font-semibold text-[10px] sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-[#4c1d95]/60'}`}>
                  Select priority to visualize impact.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Issue Type */}
                  <div className="space-y-2">
                    <label className={`sm:text-sm text-[10px] block font-bold  ${isDarkMode ? 'text-gray-400' : 'text-[#4c1d95]/80'}`}>
                      Issue Type <span className="text-[#8b5cf6]">*</span>
                    </label>
                    <div className="relative group">
                       <select
                         value={issuetype}
                         onChange={(e) => setIssuetype(e.target.value)}
                         className={`w-full rounded-xl px-2 py-2 sm:px-4 sm:py-3.5 text-[10px] sm:text-sm outline-none transition-all duration-300 appearance-none cursor-pointer ${theme.input} hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]`}
                       >
                         <option value="" className="text-gray-500">Select Category...</option>
                         <option value="Bug">Bug Report</option>
                         <option value="Feature Request">Feature Request</option>
                         <option value="Billing">Billing Issue</option>
                       </select>
                      
                    </div>
                  </div>

                  {/* Priority Selector (TRIGGERS GRAPH) */}
                  <div className="space-y-2">
                    <label className={`sm:text-sm text-[10px] block font-bold ${isDarkMode ? 'text-gray-400' : 'text-[#4c1d95]/80'}`}>
                      Priority Level
                    </label>
                    <div className="relative group">
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className={`w-full rounded-xl px-2 py-2 sm:px-4 sm:py-3.5 text-[10px] sm:text-sm  outline-none transition-all duration-300 appearance-none cursor-pointer ${theme.input} hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]`}
                      >
                        <option value="">Select Priority...</option>
                        <option value="Low">Low (Stable)</option>
                        <option value="Medium">Medium (Neutral)</option>
                        <option value="High">High (Critical)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none opacity-50 group-hover:scale-110 transition-transform">
                         <FiActivity className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-[#6d28d9]'}`} />
                       </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className={`sm:text-sm text-[10px] block font-bold ${isDarkMode ? 'text-gray-400' : 'text-[#4c1d95]/80'}`}>
                    Description <span className="text-[#8b5cf6]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the phenomenon..."
                    className={`w-full rounded-xl px-2 py-2 sm:px-4 sm:py-3.5 text-[10px] sm:text-sm  outline-none transition-all duration-300 resize-none ${theme.input} hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]`}
                  />
                </div>

                {/* Error Message */}
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

                {/* Submit Button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  disabled={loading}
                  className={`w-full sm:py-4 py-1 rounded-xl font-bold text-sm transition-all flex justify-center items-center gap-2 ${theme.button}`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FiSend /> <span>Submit Report</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

      </div>
      <Footer />
    </>
  );
};

export default UserReport;