// // import React from "react";
// // import { motion } from "framer-motion";
// // import { Rocket, Users, Heart } from "lucide-react";


// // const Hero = () => {
// //   const titleText = "Create Your First";
// //   const highlightText = "Form Account";


// //   const Feature = ({ icon, title, desc }) => (
// //     <motion.div
// //       whileHover={{ x: 5 }}
// //       className="flex items-start gap-3"
// //     >
// //       <div className="bg-white/20 p-2 rounded-lg text-white">
// //         {icon}
// //       </div>
// //       <div>
// //         <h4 className="text-white font-semibold">{title}</h4>
// //         <p className="text-white/70 text-sm">{desc}</p>
// //       </div>
// //     </motion.div>
// //   );



// //   const Stat = ({ number, label }) => (
// //     <motion.div
// //       whileHover={{ scale: 1.05 }}
// //       className="bg-white/20 rounded-xl p-6 text-center"
// //     >
// //       <h3 className="text-white text-2xl sm:text-3xl font-bold">{number}</h3>
// //       <p className="text-white/70 text-sm">{label}</p>
// //     </motion.div>
// //   );

// //   return (
// //     <>
// //     <section id="home" className=" bg-violet-300/20 ">
// //        <div className="container mx-auto w-full">
// //     <div className="py-0 px-0 max-w-7xl mx-auto lg:px-6 lg:py-6">
// //       <div className="bg-[#f0ebf5] rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10 py-1 px-3 lg:p-6 lg:py-2 shadow-2xl  ">

// //         {/* LEFT CONTENT */}
// //         <motion.div
// //           initial={{ opacity: 0, x: -40 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.9, ease: "easeOut" }}
// //           className="bg-white rounded-2xl shadow-2xl py-10 px-6 sm:px-8 flex items-center"
// //         >
// //           <div className="space-y-3 lg:space-y-6">

// //             <motion.div
// //               className="inline-flex items-center gap-2 rounded-full bg-[#ece8ff] px-4 py-1 text-sm font-medium text-[#6d5dfc]"
// //               animate={{
// //                 boxShadow: [
// //                   "0 0 0px rgba(109, 93, 252, 0)",
// //                   "0 0 12px rgba(109, 93, 252, 0.6)",
// //                   "0 0 0px rgba(109, 93, 252, 0)",
// //                 ],
// //               }}
// //               transition={{
// //                 duration: 2,
// //                 repeat: Infinity,
// //                 ease: "easeInOut",
// //               }}
// //             >
// //               💜 New Account Setup
// //             </motion.div>

// //             <motion.h1
// //               className="text-2xl sm:text-4xl font-extrabold leading-tight text-[#0f172a]"
// //             >
// //               {/* Line 1 typing */}
// //               <span className="inline-block">
// //                 {titleText.split("").map((char, index) => (
// //                   <motion.span
// //                     key={index}
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     transition={{
// //                       delay: index * 0.05,
// //                       duration: 1
// //                     }}
// //                   >
// //                     {char}
// //                   </motion.span>
// //                 ))}
// //               </span>

// //               <br />

// //               {/* Line 2 typing (highlighted) */}
// //               <span className="inline-block bg-[#6C3BFF] bg-clip-text text-transparent">
// //                 {highlightText.split("").map((char, index) => (
// //                   <motion.span
// //                     key={index}
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     transition={{
// //                       delay: titleText.length * 0.05 + index * 0.05,
// //                       duration: 0.6
// //                     }}
// //                   >
// //                     {char}
// //                   </motion.span>
// //                 ))}
// //               </span>
// //             </motion.h1>


// //             <p className="max-w-md text-sm sm:text-base text-gray-600">
// //               Set up your FormCraft account in minutes and start building
// //               beautiful, responsive forms that convert. No coding required.
// //             </p>

// //             <div className="flex flex-col sm:flex-row gap-4">
// //               <motion.button
// //                 whileHover={{ scale: 1.1 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="flex justify-center text-xs lg:text-lg items-center gap-2 rounded-xl bg-[#7c6dfc] px-6 py-3 text-white font-semibold shadow-lg"
// //               >
// //                 🚀 Get Started Now
// //               </motion.button>

// //               <motion.button
// //                 whileHover={{ scale: 1.1 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="flex justify-center text-xs lg:text-lg items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 shadow-sm"
// //               >
// //                 ▶ Watch Demo
// //               </motion.button>
// //             </div>

// //             <div className="flex flex-wrap gap-4 sm:pt-4 text-sm justify-center text-center w-full">
// //               <span className="text-[#22c55e] font-medium">✅ Free 14-day trial</span>
// //               <span className="text-[#3b82f6] font-medium">💳 No credit card</span>
// //               <span className="text-[#8b5cf6] font-medium">❌ Cancel anytime</span>
// //             </div>
// //           </div>
// //         </motion.div>

// //         {/* RIGHT CONTENT */}
// //         <motion.div
// //           initial={{ opacity: 0, x: 40 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
// //           className="bg-[#0b122d] relative rounded-2xl p-4 sm:p-6 lg:p-10 w-full flex justify-center lg:mt-15"
// //         >
// //           <motion.div
// //             className="absolute -bottom-5 -left-5 z-20 bg-white rounded-xl shadow-lg  px-3 py-2 lg:px-4 lg:py-3 flex items-center gap-3 m-4"
// //             animate={{ y: [0, -10, 0] }}
// //             transition={{
// //               duration: 2.5,
// //               repeat: Infinity,
// //               ease: "easeInOut"
// //             }}
// //           >
// //             <div className="h-5 w-5 sm:h-10 sm:w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white ">
// //               📈
// //             </div>
// //             <div>
// //               <h1 className="text-sm font-bold text-slate-900">98%</h1>
// //               <p className="text-xs text-slate-500">Satisfaction Rate</p>
// //             </div>
// //           </motion.div>


// //           <div className="bg-[#020c34] rounded-xl w-full max-w-md sm:max-w-lg flex flex-nowrap gap-2">
// //             <motion.div
// //               className="absolute -top-5 -right-5 z-20 bg-white rounded-xl shadow-lg px-3 py-2 lg:px-4 lg:py-3 m-4 flex items-center gap-3"
// //               animate={{ y: [0, 12, 0] }}
// //               transition={{
// //                 duration: 3,
// //                 repeat: Infinity,
// //                 ease: "easeInOut"
// //               }}
// //             >
// //               <div className="h-5 w-5 sm:h-10 sm:w-10 rounded-lg bg-green-500 flex items-center justify-center text-white">
// //                 👥
// //               </div>
// //               <div>
// //                 <h1 className="text-sm font-bold text-slate-900">50K+</h1>
// //                 <p className="text-xs text-slate-500">Active Users</p>
// //               </div>
// //             </motion.div>



// //             <div className="w-[90px] bg-[#020c34] text-white/60 text-[10px] py-6 border-r border-white/10">
// //               <ul className="space-y-3 px-3">
// //                 <li>Dashboard</li>
// //                 <li>Captures</li>
// //                 <li>Rules</li>
// //                 <li>Activity</li>
// //                 <li>Inbox</li>
// //                 <li>Forms</li>
// //                 <li>Settings</li>
// //                 <li>Profile</li>
// //               </ul>
// //             </div>

// //             <div className="bg-[#5620f9] rounded-xl px-3 py-3 space-y-3 flex-1">
// //               <input
// //                 type="text"
// //                 placeholder="Type here"
// //                 className="bg-white/80 rounded-md text-[10px] px-2 py-1 w-[75%]"
// //               />

// //               <ul className="text-[6px] sm:text-[9px]  flex gap-4 text-white/70 pt-2 pl-1">
// //                 <li>Relation</li>
// //                 <li>Fields</li>
// //                 <li>Active</li>
// //                 <li>Checking</li>
// //               </ul>
// //               <div className="flex gap-2 ">
// //                 <div className="space-y-2 flex-1">
// //                   <div className="bg-white/90 h-[90px] rounded-md space-y-1">
// //                     <h1 className="text-[7px] font-bold bg-violet-400/40 p-1" >Form Builder</h1>
// //                     <div className="p-1">
// //                       <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
// //                       <h1 className="text-[6px] font-bold p-1" >label</h1>
// //                       <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
// //                       <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
// //                       <h1 className="text-[6px] bg-violet-700 m-1 text-white/60 w-fit px-1 rounded-xs">Submit</h1>
// //                     </div>
// //                   </div>
// //                   <div className="bg-white/90 h-[90px] rounded-md">
// //                     <div className="flex justify-between w-6/6 bg-violet-400/40">
// //                       <h1 className="text-[7px] font-bold  p-1" >Form Builder</h1>
// //                       <h1 className="text-[7px] font-bold text-violet-500 p-1" >premium</h1>
// //                     </div>
// //                     <div className="p-1">
// //                       <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
// //                       <h1 className="text-[6px] font-bold p-1" >label</h1>
// //                       <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
// //                       <h1 className="text-[6px] border border-black/10 px-1" >Type here</h1>
// //                       <h1 className="text-[6px] bg-violet-700 m-1 text-white/60 w-fit px-1 rounded-xs">Submit</h1>
// //                     </div>

// //                   </div>
// //                 </div>
// //                 <div className="bg-white/90 h-[190px] flex-1 rounded-md px-2 py-1 hidden sm:block">
// //                   <div className="flex justify-between p-1">
// //                     <h1 className="text-[10px] font-bold">Drag Builder</h1>
// //                     <h1 className="text-[10px] font-bold">X</h1>
// //                   </div>
// //                   <div className="text-[8px] mt-1 p-1 space-y-2">
// //                     <h1>Add Field</h1>
// //                     <h1>Required Field In Forms</h1>
// //                     <h1>Validation</h1>
// //                   </div>

// //                   <div className="text-[8px] mt-1 p-1 space-y-2">
// //                     <h1 className="font-bold text-[10px]">Summary</h1>
// //                     <div className="space-y-2 text-[8px] text-slate-700">
// //                       <label className="flex items-center gap-2">
// //                         <input
// //                           type="radio"
// //                           name="summary"
// //                           className="accent-[#6d5dfc]"
// //                         />Show all fields</label>

// //                       <label className="flex items-center gap-2">
// //                         <input
// //                           type="radio"
// //                           name="summary"
// //                           className="accent-[#6d5dfc]"
// //                         /> Hide empty fields</label>

// //                       <label className="flex items-center gap-2">
// //                         <input
// //                           type="radio"
// //                           name="summary"
// //                           className="accent-[#6d5dfc]"
// //                         />Custom summary</label> </div>
// //                   </div> </div> </div> </div> </div>
// //         </motion.div>

// //       </div>
      
// //     </div>
   

// //     </div>
// //     </section>
// //     <section id="about" className="w-full bg-[#8f3cf7] py-16 px-4 mt-4">
// //       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

// //         {/* LEFT CONTENT */}
// //         <motion.div
// //           initial={{ opacity: 0, x: -40 }}
// //           whileInView={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.6 }}
// //         >
// //           <span className="inline-block bg-white/20 text-white text-sm px-4 py-1 rounded-full mb-4">
// //             ABOUT FORMCRAFT
// //           </span>

// //           <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
// //             Building the Future of <br /> Form Creation
// //           </h2>

// //           <p className="text-white/80 mb-4 text-sm sm:text-base">
// //             Founded in 2020, FormCraft has revolutionized how businesses
// //             collect data. Our mission is to make form building accessible
// //             to everyone, from startups to enterprises.
// //           </p>

// //           <p className="text-white/80 mb-8 text-sm sm:text-base">
// //             We believe that powerful tools shouldn't require a technical
// //             degree. That's why we've built an intuitive platform that
// //             combines simplicity with enterprise-grade features.
// //           </p>

// //           {/* FEATURES */}
// //           <div className="space-y-4">
// //             <Feature icon={<Rocket />} title="Innovation First" desc="Constantly pushing boundaries" />
// //             <Feature icon={<Users />} title="Customer Focused" desc="Your success is our priority" />
// //             <Feature icon={<Heart />} title="Built with Care" desc="Quality in every detail" />
// //           </div>
// //         </motion.div>

// //         {/* RIGHT STATS */}
// //         <motion.div
// //           initial={{ opacity: 0, x: 40 }}
// //           whileInView={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.6 }}
// //           className="grid grid-cols-2 gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-6"
// //         >
// //           <Stat number="150+" label="Countries" />
// //           <Stat number="4.9/5" label="Rating" />
// //           <Stat number="500+" label="Team Members" />
// //           <Stat number="$50M" label="Funding" />
// //         </motion.div>

// //       </div>
// //     </section>
// //     </>
   
// //   );
// // };

// // export default Hero;


// // import React from 'react'

// // const Hero = () => {
// //   return (
// //     <div className='bg-[#11141D] w-[1300px] h-[1312.3499755859375px]'>

// //       <div className='border-b border-white/10  w-full py-10'>

// //       </div>

// //     </div>
// //   )
// // }

// // export default Hero



// // import React from 'react'
// // import { FaArrowRight, FaCheck } from "react-icons/fa";
// // import Nav from './Nav';

// // const Hero = () => {
// //   return (
// //     <>
 
// //     <div className="relative bg-[#0B0F17] w-full min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
     
// //       {/* The Grid Background - Fills whole div horizontally and vertically */}
// //       <div 
// //         className="absolute inset-0 opacity-20 pointer-events-none"
// //         style={{
// //           backgroundImage: `
// //             linear-gradient(to right, #31363F 2px, transparent 1px),
// //             linear-gradient(to bottom, #31363F 1px, transparent 1px)
// //           `,
// //           backgroundSize: '30px 30px' // Adjust this to make the grid squares larger or smaller
// //         }}
// //       ></div>

// //       {/* Subtle Radial Glow in the center */}
// //       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>

// //       {/* Content Container */}
// //       <div className="relative z-10 max-w-4xl mx-auto">
        
// //         {/* Badge */}
// //         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1F26] border border-emerald-500/30 text-emerald-400 text-xs mb-8">
// //           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
// //           Now in public beta
// //         </div>

// //         {/* Headline */}
// //         <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6">
// //           Forms that feel like <br />
// //           <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
// //             conversations
// //           </span>
// //         </h1>

// //         {/* Sub-text */}
// //         <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
// //           Build forms people actually enjoy filling out. Drag, drop, publish — and watch your conversion rates climb.
// //         </p>

// //         {/* CTA Buttons */}
// //         <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
// //           <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all">
// //             Start building — it's free <FaArrowRight size={14} />
// //           </button>
// //           <button className="text-gray-300 hover:text-white font-medium transition-colors">
// //             See how it works
// //           </button>
// //         </div>

// //         {/* Features Checklist */}
// //         <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
// //           <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> No credit card required</span>
// //           <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> Free plan available</span>
// //           <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> Setup in 2 minutes</span>
// //         </div>
// //       </div>

// //       {/* "Trusted by" Section at the bottom */}
// //       <div className="absolute bottom-10 w-full px-6">
// //         <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Trusted by teams at</p>
// //         <div className="flex justify-center items-center gap-8 md:gap-16 opacity-40 grayscale contrast-125">
// //           <span className="text-white font-semibold text-lg">Vercel</span>
// //           <span className="text-white font-semibold text-lg">Stripe</span>
// //           <span className="text-white font-semibold text-lg">Linear</span>
// //           <span className="text-white font-semibold text-lg">Notion</span>
// //           <span className="text-white font-semibold text-lg">Figma</span>
// //           <span className="text-white font-semibold text-lg">Slack</span>
// //         </div>
// //       </div>

// //     </div>
// //     </>
// //   )
// // }

// // export default Hero



// // import React from 'react'
// // import { FaArrowRight, FaCheck } from "react-icons/fa";
// // import Nav from './Nav';

// // const Hero = () => {
// //   return (
// //     <>
// //     <Nav/>

// //     <div className="relative bg-[#0B0F17]  w-full min-h-screen flex flex-col items-center pt-20 md:pt-32 px-4 overflow-hidden">
    
      
// //       {/* 1. The Full-Length Grid Background */}
// //       <div 
// //         className="absolute  inset-0 opacity-20 pointer-events-none"
// //         style={{
// //           backgroundImage: `
// //             linear-gradient(to right, #31363F 1px, transparent 1px),
// //             linear-gradient(to bottom, #31363F 1px, transparent 1px)
// //           `,
// //           backgroundSize: '30px 30px'
// //         }}
// //       ></div>

// //       {/* 2. Top Glow Effect */}
// //       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>

// //       {/* 3. Hero Text Content */}
// //       <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
// //         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1F26] border border-white/10 text-gray-300 text-xs mb-8">
// //           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
// //           Now in public beta
// //         </div>

// //         <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6">
// //           Forms that feel like <br />
// //           <span className="text-transparent  bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
// //             conversations
// //           </span>
        

// //         </h1>

// //         <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
// //           Build forms people actually enjoy filling out. Drag, drop, publish — and watch your conversion rates climb.
// //         </p>

// //         <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
// //           <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-lg font-medium shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2 transition-all">
// //             Start building — it's free <FaArrowRight size={14} />
// //           </button>
// //           <button className="text-gray-300 hover:text-white font-medium">
// //             See how it works
// //           </button>
// //         </div>

// //         <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-gray-500">
// //           <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> No credit card required</span>
// //           <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> Free plan available</span>
// //           <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> Setup in 2 minutes</span>
// //         </div>
// //       </div>

// //       {/* 4. Trusted By Section */}
// //       <div className="relative z-10 w-full max-w-5xl mx-auto text-center mb-20">
// //         <p className="text-white text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Trusted by teams at</p>
// //         <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 ">
// //            <span className="text-white/50 font-semibold ">Vercel</span>
// //            <span className="text-white/50 font-semibold ">Stripe</span>
// //            <span className="text-white/50 font-semibold ">Linear</span>
// //            <span className="text-white/50 font-semid ">Notion</span>
// //            <span className="text-white/50 font-semibold ">Figma</span>
// //            <span className="text-white/50 font-semibold ">Slack</span>
// //         </div>
// //       </div>

// //       {/* 5. Dashboard Browser Preview */}
// //       <div className="relative z-10 w-full max-w-[1100px] mx-auto mb-20">
// //         <div className="rounded-xl border border-white/10 bg-[#0F131C] shadow-2xl overflow-hidden">
// //           {/* Browser Header */}
// //           <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#161B26]">
// //             <div className="flex gap-1.5">
// //               <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
// //               <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
// //               <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
// //             </div>
// //             <div className="mx-auto bg-[#0B0F17] px-4 py-1 rounded text-[10px] text-gray-500 w-48 text-center">
// //               app.formcraft.io/dashboard
// //             </div>
// //           </div>
// //           {/* Browser Content Area */}
// //           <div className="h-[400px] md:h-[600px] bg-[#0B0F17] relative">
// //              {/* Add your dashboard image or placeholder here */}
// //              <div className="absolute inset-0 flex items-center justify-center">
// //                 <p className="text-gray-800 font-mono text-sm">Dashboard Preview Content</p>
// //              </div>
// //           </div>
// //         </div>
        
// //         {/* Subtle glow underneath the dashboard */}
// //         <div className="absolute -inset-4 bg-blue-500/5 blur-3xl -z-10 rounded-full"></div>
// //       </div>

// //     </div>
// //     </>
// //   )
// // }

// // export default Hero



// import React from 'react'
// import { motion } from 'framer-motion'
// import { FaArrowRight, FaCheck } from "react-icons/fa";
// import Nav from './Nav';

// const Hero = () => {
//   // Animation Variants for staggered text
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2, delayChildren: 0.3 }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
//   };

//   return (
//     <>
//       <Nav />
//       <div className="relative bg-[#0B0F17] w-full min-h-screen flex flex-col items-center pt-20 md:pt-32 px-4 overflow-hidden">
        
//         {/* 1. Grid Background - Slow Fade In */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.2 }}
//           transition={{ duration: 2 }}
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             backgroundImage: `
//               linear-gradient(to right, #31363F 1px, transparent 1px),
//               linear-gradient(to bottom, #31363F 1px, transparent 1px)
//             `,
//             backgroundSize: '30px 30px'
//           }}
//         />

//         {/* 2. Top Glow */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>

//         {/* 3. Hero Text Content (Staggered) */}
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="relative z-10 max-w-4xl mx-auto text-center mb-16"
//         >
//           <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1F26] border border-white/10 text-gray-300 text-xs mb-8">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
//             Now in public beta
//           </motion.div>

//           <motion.h1 variants={itemVariants} className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6">
//             Forms that feel like <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
//               conversations
//             </span>
//           </motion.h1>

//           <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
//             Build forms people actually enjoy filling out. Drag, drop, publish — and watch your conversion rates climb.
//           </motion.p>

//           <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
//             <motion.button 
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-[#4F46E5] text-white px-8 py-3 rounded-lg font-medium shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2"
//             >
//               Start building — it's free <FaArrowRight size={14} />
//             </motion.button>
//             <button className="text-gray-300 hover:text-white font-medium transition-colors">
//               See how it works
//             </button>
//           </motion.div>

//           <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-gray-500">
//             <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> No credit card required</span>
//             <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> Free plan available</span>
//             <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> Setup in 2 minutes</span>
//           </motion.div>
//         </motion.div>

//         {/* 4. Trusted By Section - Fades in when in view */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.5 }}
//           className="relative z-10 w-full max-w-5xl mx-auto text-center mb-20"
//         >
//           <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Trusted by teams at</p>
//           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
//              {['Vercel', 'Stripe', 'Linear', 'Notion', 'Figma', 'Slack'].map((logo) => (
//                <span key={logo} className="text-white font-semibold text-lg hover:opacity-100 cursor-default transition-opacity">{logo}</span>
//              ))}
//           </div>
//         </motion.div>

//         {/* 5. Dashboard Preview - 3D Perspective Animation */}
//         <motion.div 
//           initial={{ opacity: 0, y: 100, rotateX: 15 }}
//           whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 1, ease: "easeOut" }}
//           className="relative z-10 w-full max-w-[1100px] mx-auto mb-20"
//           style={{ perspective: "1200px" }} // Added depth
//         >
//           <div className="rounded-xl border border-white/10 bg-[#0F131C] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden">
//             <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#161B26]">
//               <div className="flex gap-1.5">
//                 <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
//                 <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
//                 <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
//               </div>
//               <div className="mx-auto bg-[#0B0F17] px-4 py-1 rounded text-[10px] text-gray-500 w-48 text-center font-mono">
//                 app.formcraft.io/dashboard
//               </div>
//             </div>
//             <div className="h-[400px] md:h-[600px] bg-[#0B0F17] flex items-center justify-center">
//                 <div className="text-white/5 text-8xl font-bold tracking-tighter select-none">FORMCRAFT</div>
//             </div>
//           </div>
          
//           {/* Bottom Glow underneath dashboard */}
//           <div className="absolute -inset-10 bg-blue-600/5 blur-[120px] -z-10 rounded-full"></div>
//         </motion.div>

//       </div>
//     </>
//   )
// }

// export default Hero


import React from 'react'
import { FaArrowRight, FaCheck } from "react-icons/fa";

const Hero = () => {
  return (
    // min-h-screen allows the div to grow with content while keeping the background
    <div className="relative bg-[#0B0F17] w-full min-h-screen flex flex-col items-center pt-20 md:pt-32 px-4 overflow-x-hidden">
      
      {/* 1. The Full-Length Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none "
        style={{
          backgroundImage: `
            linear-gradient(to right, #31363F 1px, transparent 1px),
            linear-gradient(to bottom, #31363F 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      ></div>

      {/* 2. Top Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>

      {/* 3. Hero Text Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
         {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  bg-[#10B77F0D] 
 text-gray-300 text-xs mb-8">
          <span className="w-1.5 h-1.5 rounded-full 
"></span>
          Now in public beta
        </div> 
         */}
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full 
                bg-[#0F1716] border border-[#10B77F33] 
                backdrop-blur-sm mb-8">
  {/* The solid Green Dot */}
  <span className="w-1.5 h-1.5 rounded-full bg-[#10B77F]"></span>
  
  {/* The Text - matching the specific emerald color in the image */}
  <span className="text-[#10B77F] text-xs font-medium tracking-wide">
    Now in public beta
  </span>
</div>

        {/* <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Forms that feel like <br />
          <span className="text-transparent border border-b border-from-emerald-400 to-blue-500 bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            conversations
          </span>
        </h1> */}

        <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
  Forms that feel like <br />
  <span className="relative inline-block text-transparent bg-clip-text bg-[linear-gradient(90.41deg,#10B77F_0%,#1AA2E6_100%)]">
    conversations
    {/* The Exact Gradient Underline */}
    <div 
      className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full"
      style={{ background: 'linear-gradient(90.41deg, #10B77F 0%, #1AA2E6 100%)' }}
    ></div>
  </span>
</h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Build forms people actually enjoy filling out. Drag, drop, publish — and watch your conversion rates climb.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-lg font-medium shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2 transition-all">
            Start building — it's free <FaArrowRight size={14} />
          </button>
          <button className="text-gray-300 hover:text-white font-medium">
            See how it works
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-gray-500">
          <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> No credit card required</span>
          <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> Free plan available</span>
          <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> Setup in 2 minutes</span>
        </div>
      </div>

      {/* 4. Trusted By Section */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center mb-20">
        <p className="text-white text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Trusted by teams at</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 ">
           <span className="text-white/50 font-semibold ">Vercel</span>
           <span className="text-white/50 font-semibold ">Stripe</span>
           <span className="text-white/50 font-semibold ">Linear</span>
           <span className="text-white/50 font-semid ">Notion</span>
           <span className="text-white/50 font-semibold ">Figma</span>
           <span className="text-white/50 font-semibold ">Slack</span>
        </div>
      </div>

      {/* 5. Dashboard Browser Preview */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mb-20">
        <div className="rounded-xl border border-white/10 bg-[#0F131C] shadow-2xl overflow-hidden">
          {/* Browser Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#161B26]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <div className="mx-auto bg-[#0B0F17] px-4 py-1 rounded text-[10px] text-gray-500 w-48 text-center">
              app.formcraft.io/dashboard
            </div>
          </div>
          {/* Browser Content Area */}
          <div className="h-[400px] md:h-[600px] bg-[#0B0F17] relative">
             {/* Add your dashboard image or placeholder here */}
             <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-800 font-mono text-sm">Dashboard Preview Content</p>
             </div>
          </div>
        </div>
        
        {/* Subtle glow underneath the dashboard */}
        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl -z-10 rounded-full"></div>
      </div>

    </div>
  )
}

export default Hero