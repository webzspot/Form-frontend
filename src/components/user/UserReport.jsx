import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import UserNavbar from "./UserNavbar";
import Footer from "../landingPage/Footer";
import toast from "react-hot-toast";
import WaveBackground from "../dashboard/WaveBackground";

const UserReport = () => {
  const token=localStorage.getItem("token");
  const [issuetype, setIssuetype] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
          reportData: {
            issueType: issuetype,
            description: description,
           priority: priority,
          },
        }
        ,
        {
      headers:{
      Authorization:`Bearer ${token}`,
    }
        }
      );
      
      setSuccess(true);
      setIssuetype("");
      setDescription("");
      setPriority("");
      setMessage("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
 <UserNavbar/>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" w-full min-h-screen relative  font-sans flex justify-center items-center"
    > 

    <WaveBackground position="top"  /> 

    

            
      {/* Dashboard Container */}
      <motion.div
        initial={{ scale: 0.96, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-h-screen  relative z-10  rounded-xl p-6"
      >
      

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        {/* leftlayout   */}
<motion.div
  initial={{ opacity: 0, x: -40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="hidden md:flex flex-col justify-between
             bg-[#6C63FF] 
             rounded-3xl p-6 text-white shadow-lg
             relative overflow-hidden"
>
  {/* Floating blob */}
  <motion.div
    animate={{ y: [0, -14, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    className="absolute -top-16 -right-16 w-48 h-48 bg-white/20 rounded-full blur-3xl"
  />

  <div className="relative z-10">
    <h2 className="text-lg font-semibold mb-2">Report Overview</h2>

    <p className="text-sm opacity-90 mb-10">
      Submit bugs or feature requests directly from your dashboard.
    </p>

    <div className="space-y-6">

      {/* ================= ISSUE TYPE ================= */}
      <div className="bg-white/20 rounded-2xl p-4">
        <p className="text-xs opacity-80 mb-1">Type</p>

        <div className="relative h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={issuetype || "type-empty"}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-0 text-xl font-bold"
            >
              {issuetype || "—"}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* ================= PRIORITY ================= */}
      <div className="bg-white/20 rounded-2xl p-4">
        <p className="text-xs opacity-80 mb-1">Priority</p>

        <div className="relative h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={priority || "priority-empty"}
              initial={{
                y:
                  priority === "High"
                    ? 20
                    : priority === "Low"
                    ? -20
                    : 10,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale:
                  priority === "High"
                    ? [1, 1.1, 1]
                    : 1,
              }}
              exit={{
                y:
                  priority === "High"
                    ? -20
                    : priority === "Low"
                    ? 20
                    : -10,
                opacity: 0,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`absolute left-0 text-xl font-bold
                ${
                  priority === "High"
                    ? "text-green-300"
                    : priority === "Low"
                    ? "text-red-300"
                    : "text-white"
                }`}
            >
              {priority || "—"}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

    </div>
  </div>
</motion.div>


          {/* ================= RIGHT FORM ================= */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -4 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-white  rounded-3xl py-2 px-2"
          >
            <h2 className="text-xl font-bold text-[#3F3D56] mb-1">
              Report a Problem
            </h2>
            <p className="text-sm text-black/50 mb-6">
              Describe the issue you are facing
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Issue Type *
                </label>
                <select
                  value={issuetype}
                  onChange={(e) => setIssuetype(e.target.value)}
                  className="mt-1 w-full rounded-xl border font-semibold text-black/50 border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6C63FF] outline-none"
                >
                  <option value="">Select issue type</option>
                  <option>Bug</option>
                  <option>Feature Request</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Description *
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your issue..."
                  className="mt-1 w-full rounded-xl border font-semibold border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6C63FF] outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mt-1 w-full rounded-xl border font-semibold text-black/50 border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6C63FF] outline-none"
                >
                  <option value="">Optional</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              {message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 font-medium"
                >
                  {message}
                </motion.p>
              )}

              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                disabled={loading}
                className="w-full mt-4 py-3 rounded-xl
                           bg-[#6C63FF] 
                           text-white font-semibold shadow-md"
              >
                {loading ? "Submitting..." : "Submit Report"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* ================= SUCCESS MODAL ================= */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center
                       backdrop-blur-md bg-black/30 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-sm"
            >
              <h3 className="text-xl font-bold text-[#6C63FF] mb-2">
                Report Submitted 🎉
              </h3>
              <p className="text-gray-600 text-sm mb-5">
                Your issue has been submitted successfully. Our team will review it shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-2 bg-[#6C63FF] text-white rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div> 

    {/* ===== Bottom Wave Section ===== */}
<div className="relative w-full h-56 overflow-hidden">
  <WaveBackground position="bottom" height="h-80" />
</div>
  
    <Footer/>
      
    </>
  );
};

export default UserReport;
