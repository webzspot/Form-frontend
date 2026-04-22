


import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AreaChart, 
  Area, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import UserNavbar from "./UserNavbar";


import toast from "react-hot-toast";
import { 
  FiAlertCircle, 
  FiSend, 
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
  FiActivity
} from "react-icons/fi";
import UserFooter from "./UserFooter";

const UserReport = () => {
  const token = sessionStorage.getItem("token");
  const [issuetype, setIssuetype] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // --- DYNAMIC STOCK DATA LOGIC ---
  const [chartData, setChartData] = useState([]);
  const [chartColor, setChartColor] = useState("#f43f5e"); // Default Rose

  useEffect(() => {
    if (priority === "High") {
      setChartData([
        { time: "10am", val: 20 }, { time: "11am", val: 40 }, 
        { time: "12pm", val: 35 }, { time: "1pm", val: 70 }, 
        { time: "2pm", val: 55 }, { time: "3pm", val: 90 }, 
        { time: "4pm", val: 100 }
      ]);
      setChartColor("#ef4444"); // Emerald Green
    } else if (priority === "Low") {
      setChartData([
        { time: "10am", val: 90 }, { time: "11am", val: 70 }, 
        { time: "12pm", val: 85 }, { time: "1pm", val: 40 }, 
        { time: "2pm", val: 50 }, { time: "3pm", val: 20 }, 
        { time: "4pm", val: 10 }
      ]);
      setChartColor("#10b981"); // Red
    } else {
      setChartData([
        { time: "10am", val: 40 }, { time: "11am", val: 60 }, 
        { time: "12pm", val: 45 }, { time: "1pm", val: 55 }, 
        { time: "2pm", val: 40 }, { time: "3pm", val: 60 }, 
        { time: "4pm", val: 50 }
      ]);
      setChartColor("#FFA500"); // Rose
    }
  }, [priority]);

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
      setIssuetype("");
      setDescription("");
      setPriority("");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const theme = {
    pageBg: "bg-[#F5F6F8] text-[#4c1d95]",
    formCard: "bg-white",
    input: "bg-white text-[#14181F] placeholder-[#6A7181]", 
    button: "bg-[#2B4BAB] text-white hover:bg-[#233d8a] transition-colors",
  };

  return (
    <>
      <UserNavbar />
      <div className={`w-full min-h-screen relative font-sans flex justify-center items-start pt-8 pb-12 overflow-hidden ${theme.pageBg}`}>
        <motion.div
          initial={{ scale: 0.95, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10"
        >
          <div className="w-full mb-8">
            <motion.h1 className="text-2xl sm:text-3xl font-bold text-[#14181F]">
              Report
            </motion.h1>
            <motion.p className="sm:text-base font-normal text-sm leading-snug mt-2 text-[#6A7181]">
              Submit a report or issue to the team.
            </motion.p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 w-full rounded-md ${theme.formCard}`}> 
            {/* LEFT PANEL */}
            <div className="lg:col-span-6 sm:p-12 md:pt-6 md:pl-4 relative border rounded-md border-[#E5E7EB]">
              <div className="p-2">
                <h2 className="font-medium text-2xl text-[#14181F]">Submit Report</h2>
                <p className="font-normal text-sm text-[#6A7181] mb-6">Select priority to visualize impact.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 p-2 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-medium text-sm text-[#6A7181]">Issue Type *</label>
                    <div className="relative border border-[#E5E7EB] rounded-md">
                       <select
                         value={issuetype}
                         onChange={(e) => setIssuetype(e.target.value)}
                         className={`w-full rounded-md px-4 py-3.5 text-sm outline-none appearance-none cursor-pointer ${theme.input}`}
                       >
                         <option value="">Select Category</option>
                         <option value="Bug">Bug Report</option>
                         <option value="Feature Request">Feature Request</option>
                         <option value="Billing">Billing Issue</option>
                       </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-medium text-sm text-[#6A7181]">Priority Level</label>
                    <div className="relative border border-[#E5E7EB] rounded-md">
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className={`w-full rounded-md px-4 py-3.5 text-sm outline-none appearance-none cursor-pointer ${theme.input}`}
                      >
                        <option value="">Select Priority...</option>
                        <option value="Low">Low (Stable)</option>
                        <option value="Medium">Medium (Neutral)</option>
                        <option value="High">High (Critical)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 p-2">
                  <label className="font-medium text-sm text-[#6A7181]">Description *</label>
                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the phenomenon..."
                    className={`w-full rounded-md px-4 py-3.5 text-sm border border-[#E5E7EB] outline-none resize-none ${theme.input}`}
                  />
                </div>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-red-500 bg-red-50 border border-red-200 p-3 rounded-md mx-2"
                    >
                      <FiAlertCircle />
                      <span className="text-sm font-semibold">{message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="w-full flex justify-center pb-6">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.02 }}
                    disabled={loading}
                    className={`w-full max-w-[250px]  md:max-w-[411px] h-11 flex items-center justify-center gap-2 rounded-md font-medium text-sm ${theme.button}`}
                  >
                    {loading ? <span>Processing...</span> : <span>Submit Report</span>}
                  </motion.button>
                </div>
              </form>
            </div> 

            {/* RIGHT PANEL (VISUALIZATION) */}
            <div className="hidden lg:flex lg:col-span-6 min-h-[442px] flex-col rounded-md border border-[#E5E7EB] bg-white relative overflow-hidden">
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <AnimatePresence mode="wait">
                  {!priority ? (
                    <motion.div key="placeholder" className="text-center">
                      <h3 className="text-[24px] text-[#14181F] font-medium mb-2">Live Impact Data</h3>
                      <p className="text-[14px] text-[#6A7181] max-w-[315px] mx-auto">
                        Submit reports to track projected urgency and visualize impact across your forms.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div key="chart" className="w-full h-full flex flex-col">
                      <div className="w-full flex-1 min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                            <defs>
                              <linearGradient id="dynamicColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '12px' }} />
                            <Area type="monotone" dataKey="val" stroke={chartColor} strokeWidth={3} fill="url(#dynamicColor)" animationDuration={800} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-4 flex justify-end">
                         <span className="font-bold text-[20px] italic uppercase" style={{ color: chartColor }}>
                            {priority === "High" ? "CRITICAL" : priority === "Medium" ? "NEUTRAL" : "STABLE"}
                         </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      < UserFooter />
    </>
  );
};

export default UserReport;