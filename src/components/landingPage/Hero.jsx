import React from "react";
import { motion } from "framer-motion";
import { Rocket, Users, Heart } from "lucide-react";

const Hero = () => {
  const titleText = "Create Your First";
  const highlightText = "Form Account";


  const Feature = ({ icon, title, desc }) => (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-start gap-3"
    >
      <div className="bg-white/20 p-2 rounded-lg text-white">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-semibold">{title}</h4>
        <p className="text-white/70 text-sm">{desc}</p>
      </div>
    </motion.div>
  );



  const Stat = ({ number, label }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/20 rounded-xl p-6 text-center"
    >
      <h3 className="text-white text-2xl sm:text-3xl font-bold">{number}</h3>
      <p className="text-white/70 text-sm">{label}</p>
    </motion.div>
  );

  return (
    <>
    <div className=" bg-violet-300/20 ">
       <div className="container mx-auto w-full">
    <div className="py-0 px-0 max-w-7xl mx-auto lg:px-6 lg:py-6">
      <div className="bg-[#f0ebf5] rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 py-1 px-3 lg:p-6 lg:py-2 shadow-2xl  ">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-2xl py-10 px-6 sm:px-8 flex items-center"
        >
          <div className="space-y-3 lg:space-y-6">

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
                className="flex justify-center text-xs lg:text-lg items-center gap-2 rounded-xl bg-[#7c6dfc] px-6 py-3 text-white font-semibold shadow-lg"
              >
                🚀 Get Started Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex justify-center text-xs lg:text-lg items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 shadow-sm"
              >
                ▶ Watch Demo
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-4 sm:pt-4 text-sm justify-center text-center w-full">
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
          className="bg-[#0b122d] relative rounded-2xl p-4 sm:p-6 lg:p-10 w-full flex justify-center lg:mt-15"
        >
          <motion.div
            className="absolute -bottom-5 -left-5 z-20 bg-white rounded-xl shadow-lg  px-3 py-2 lg:px-4 lg:py-3 flex items-center gap-3 m-4"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="h-5 w-5 sm:h-10 sm:w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white ">
              📈
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">98%</h1>
              <p className="text-xs text-slate-500">Satisfaction Rate</p>
            </div>
          </motion.div>


          <div className="bg-[#020c34] rounded-xl w-full max-w-md sm:max-w-lg flex flex-nowrap gap-2">
            <motion.div
              className="absolute -top-5 -right-5 z-20 bg-white rounded-xl shadow-lg px-3 py-2 lg:px-4 lg:py-3 m-4 flex items-center gap-3"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="h-5 w-5 sm:h-10 sm:w-10 rounded-lg bg-green-500 flex items-center justify-center text-white">
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

            <div className="bg-[#5620f9] rounded-xl px-3 py-3 space-y-3 flex-1">
              <input
                type="text"
                placeholder="Type here"
                className="bg-white/80 rounded-md text-[10px] px-2 py-1 w-[75%]"
              />

              <ul className="text-[6px] sm:text-[9px]  flex gap-4 text-white/70 pt-2 pl-1">
                <li>Relation</li>
                <li>Fields</li>
                <li>Active</li>
                <li>Checking</li>
              </ul>
              <div className="flex gap-2 ">
                <div className="space-y-2 flex-1">
                  <div className="bg-white/90 h-[90px] rounded-md space-y-1">
                    <h1 className="text-[7px] font-bold bg-violet-400/40 p-1" >Form Builder</h1>
                    <div className="p-1">
                      <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
                      <h1 className="text-[6px] font-bold p-1" >label</h1>
                      <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
                      <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
                      <h1 className="text-[6px] bg-violet-700 m-1 text-white/60 w-fit px-1 rounded-xs">Submit</h1>
                    </div>
                  </div>
                  <div className="bg-white/90 h-[90px] rounded-md">
                    <div className="flex justify-between w-6/6 bg-violet-400/40">
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
                <div className="bg-white/90 h-[190px] flex-1 rounded-md px-2 py-1 hidden sm:block">
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
   

    </div>
    </div>
    <section className="w-full bg-gradient-to-br from-[#5b46e5] to-[#8f3cf7] py-16 px-4 mt-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-white/20 text-white text-sm px-4 py-1 rounded-full mb-4">
            ABOUT FORMCRAFT
          </span>

          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Building the Future of <br /> Form Creation
          </h2>

          <p className="text-white/80 mb-4 text-sm sm:text-base">
            Founded in 2020, FormCraft has revolutionized how businesses
            collect data. Our mission is to make form building accessible
            to everyone, from startups to enterprises.
          </p>

          <p className="text-white/80 mb-8 text-sm sm:text-base">
            We believe that powerful tools shouldn't require a technical
            degree. That's why we've built an intuitive platform that
            combines simplicity with enterprise-grade features.
          </p>

          {/* FEATURES */}
          <div className="space-y-4">
            <Feature icon={<Rocket />} title="Innovation First" desc="Constantly pushing boundaries" />
            <Feature icon={<Users />} title="Customer Focused" desc="Your success is our priority" />
            <Feature icon={<Heart />} title="Built with Care" desc="Quality in every detail" />
          </div>
        </motion.div>

        {/* RIGHT STATS */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-6"
        >
          <Stat number="150+" label="Countries" />
          <Stat number="4.9/5" label="Rating" />
          <Stat number="500+" label="Team Members" />
          <Stat number="$50M" label="Funding" />
        </motion.div>

      </div>
    </section>
    </>
   
  );
};

export default Hero;
