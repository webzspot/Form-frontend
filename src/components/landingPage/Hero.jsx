import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const titleText = "Create Your First";
  const highlightText = "Form Account";

  return (
    <div className="py-6 px-4 sm:px-8 lg:px-20">
      <div className="bg-[#f0ebf5] rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 sm:py-2 shadow-2xl">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-2xl py-10 px-6 sm:px-10 flex items-center"
        >
          <div className="space-y-6">

            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-[#ece8ff] px-4 py-1 text-sm font-medium text-[#6d5dfc]"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(109, 93, 252, 0)",
                  "0 0 12px rgba(109, 93, 252, 0.6)",
                  "0 0 0px rgba(109, 93, 252, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              💜 New Account Setup
            </motion.div>

            {/* <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight text-[#0f172a]">
              Create Your First <br />
              <span className="bg-[#6C3BFF] bg-clip-text text-transparent">
                Form Account
              </span>
            </h1> */}



            <motion.h1
              className="text-2xl sm:text-4xl font-extrabold leading-tight text-[#0f172a]"
            >
              {/* Line 1 typing */}
              <span className="inline-block">
                {titleText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 1
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              <br />

              {/* Line 2 typing (highlighted) */}
              <span className="inline-block bg-[#6C3BFF] bg-clip-text text-transparent">
                {highlightText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: titleText.length * 0.05 + index * 0.05,
                      duration: 0.6
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>


            <p className="max-w-md text-sm sm:text-base text-gray-600">
              Set up your FormCraft account in minutes and start building
              beautiful, responsive forms that convert. No coding required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex justify-center items-center gap-2 rounded-xl bg-[#7c6dfc] px-6 py-3 text-white font-semibold shadow-lg"
              >
                🚀 Get Started Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex justify-center items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 shadow-sm"
              >
                ▶ Watch Demo
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 text-sm">
              <span className="text-[#22c55e] font-medium">✅ Free 14-day trial</span>
              <span className="text-[#3b82f6] font-medium">💳 No credit card</span>
              <span className="text-[#8b5cf6] font-medium">❌ Cancel anytime</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="bg-[#0b122d] relative rounded-2xl p-4 sm:p-6 lg:p-10 w-full flex justify-center sm:mt-15"
        >
          <motion.div
            className="absolute -bottom-5 -left-5 z-20 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white">
              📈
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">98%</h1>
              <p className="text-xs text-slate-500">Satisfaction Rate</p>
            </div>
          </motion.div>


          <div className="bg-[#020c34] rounded-xl w-full max-w-md sm:max-w-lg flex">
            <motion.div
              className="absolute -top-5 -right-5 z-20 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="h-10 w-10 rounded-lg bg-green-500 flex items-center justify-center text-white">
                👥
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900">50K+</h1>
                <p className="text-xs text-slate-500">Active Users</p>
              </div>
            </motion.div>



            <div className="w-[90px] bg-[#020c34] text-white/60 text-[10px] py-6 border-r border-white/10">
              <ul className="space-y-3 px-3">
                <li>Dashboard</li>
                <li>Captures</li>
                <li>Rules</li>
                <li>Activity</li>
                <li>Inbox</li>
                <li>Forms</li>
                <li>Settings</li>
                <li>Profile</li>
              </ul>
            </div>

            <div className="bg-[#5620f9] flex-1 rounded-xl p-4 space-y-3">
              <input
                type="text"
                placeholder="Type here"
                className="bg-white/80 rounded-md text-[10px] px-2 py-1 w-[75%]"
              />

              <ul className="text-[9px] flex gap-4 text-white/70 pt-2 pl-1">
                <li>Relation</li>
                <li>Fields</li>
                <li>Active</li>
                <li>Checking</li>
              </ul>
              <div className="flex gap-2">
                <div className="space-y-2">
                  <div className="bg-white/90 h-[90px] rounded-md w-[150px] space-y-1">
                    <h1 className="text-[7px] font-bold bg-violet-400/40 p-1" >Form Builder</h1>
                    <div className="p-1">
                      <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
                      <h1 className="text-[6px] font-bold p-1" >label</h1>
                      <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
                      <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
                      <h1 className="text-[6px] bg-violet-700 m-1 text-white/60 w-fit px-1 rounded-xs">Submit</h1>
                    </div>
                  </div>
                  <div className="bg-white/90 h-[90px] rounded-md w-[150px]">
                    <div className="flex justify-between bg-violet-400/40">
                      <h1 className="text-[7px] font-bold  p-1" >Form Builder</h1>
                      <h1 className="text-[7px] font-bold text-violet-500 p-1" >premium</h1>
                    </div>
                    <div className="p-1">
                      <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
                      <h1 className="text-[6px] font-bold p-1" >label</h1>
                      <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
                      <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
                      <h1 className="text-[6px] bg-violet-700 m-1 text-white/60 w-fit px-1 rounded-xs">Submit</h1>
                    </div>

                  </div>
                </div>
                <div className="bg-white/90 h-[190px] rounded-md w-[150px] hidden sm:block">
                  <div className="flex justify-between p-1">
                    <h1 className="text-[10px] font-bold">Drag Builder</h1>
                    <h1 className="text-[10px] font-bold">X</h1>
                  </div>
                  <div className="text-[8px] mt-1 p-1 space-y-2">
                    <h1>Add Field</h1>
                    <h1>Required Field In Forms</h1>
                    <h1>Validation</h1>
                  </div>

                  <div className="text-[8px] mt-1 p-1 space-y-2">
                    <h1 className="font-bold text-[10px]">Summary</h1>
                    <div className="space-y-2 text-[8px] text-slate-700">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="summary"
                          className="accent-[#6d5dfc]"
                        />Show all fields</label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="summary"
                          className="accent-[#6d5dfc]"
                        /> Hide empty fields</label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="summary"
                          className="accent-[#6d5dfc]"
                        />Custom summary</label> </div>
                  </div> </div> </div> </div> </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
