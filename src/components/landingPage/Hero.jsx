



// import React from 'react'
// import { FaArrowRight, FaCheck } from "react-icons/fa";

// const Hero = () => {
//   return (
  
//     <div className="relative bg-[#0B0F17] w-full min-h-screen flex flex-col items-center px-4 pt-20 md:pt-32 overflow-x-hidden">
      
      
//       <div 
//         className="absolute inset-0 opacity-20 pointer-events-none "
//         style={{
//           backgroundImage: `
//             linear-gradient(to right, #31363F 1px, transparent 1px),
//             linear-gradient(to bottom, #31363F 1px, transparent 1px)
//           `,
//           backgroundSize: '30px 30px'
//         }}
//       ></div>

//       {/* 2. Top Glow Effect */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>

//       {/* 3. Hero Text Content */}
//       <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
      
//          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full 
//                 bg-[#0F1716] border border-[#10B77F33] 
//                 backdrop-blur-sm mb-8">
 
//   <span className="w-1.5 h-1.5 rounded-full bg-[#10B77F]"></span>
  
 
//   <span className="text-[#10B77F] text-xs font-medium tracking-wide">
//     Now in public beta
//   </span>
// </div>

       
//   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[#10B77F] blur-[100px] opacity-[0.15] rounded-full pointer-events-none -z-10"></div>

//   <h1 className="text-white text-5xl md:text-7xl  px-4 md:px-6 font-bold tracking-tight leading-tight relative z-10">
//     Forms that feel like <br />
//     <span className="relative inline-block">
//       <span className="text-transparent bg-clip-text bg-[linear-gradient(90.41deg,#10B77F_0%,#1AA2E6_100%)]">
//         conversations
//       </span>
   
//       <div 
//         className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full"
//         style={{ background: 'linear-gradient(90.41deg, #10B77F 0%, #1AA2E6 100%)' }}
//       ></div>
//     </span>
//   </h1>

//         <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mt-4">
//           Build forms people actually enjoy filling out. Drag, drop, publish — and watch your conversion rates climb.
//         </p>

//         <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
//           <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-8 py-3 rounded-lg font-medium shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2 transition-all">
//             Start building — it's free <FaArrowRight size={14} />
//           </button>
//           <button className="text-gray-300 hover:text-white font-medium">
//             See how it works
//           </button>
//         </div>

//         <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-[13px] text-gray-500">
//           <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> No credit card required</span>
//           <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> Free plan available</span>
//           <span className="flex items-center gap-2"><FaCheck className="text-emerald-500" size={10}/> Setup in 2 minutes</span>
//         </div>
//       </div>

//       {/* 4. Trusted By Section */}
//       <div className="relative z-10 w-full max-w-5xl mx-auto text-center mb-20">
//         <p className="text-white text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Trusted by teams at</p>
//         <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 ">
//            <span className="text-white/50 font-semibold ">Vercel</span>
//            <span className="text-white/50 font-semibold ">Stripe</span>
//            <span className="text-white/50 font-semibold ">Linear</span>
//            <span className="text-white/50 font-semid ">Notion</span>
//            <span className="text-white/50 font-semibold ">Figma</span>
//            <span className="text-white/50 font-semibold ">Slack</span>
//         </div>
//       </div>

//       {/* 5. Dashboard Browser Preview */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 mb-20">
//         <div className="rounded-xl border border-white/10 bg-[#0F131C] shadow-2xl overflow-hidden">
//           {/* Browser Header */}
//           <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#161B26]">
//             <div className="flex gap-1.5">
//               <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
//               <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
//               <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
//             </div>
//             <div className="mx-auto bg-[#0B0F17] px-4 py-1 rounded text-[10px] text-gray-500 w-48 text-center">
//               app.formcraft.io/dashboard
//             </div>
//           </div>
//           {/* Browser Content Area */}
//           <div className="h-[400px] md:h-[600px] bg-[#0B0F17] relative">
//              {/* Add your dashboard image or placeholder here */}
//              <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="text-gray-800 font-mono text-sm">Dashboard Preview Content</p>
//              </div>
//           </div>
//         </div>
        
//         {/* Subtle glow underneath the dashboard */}
//         <div className="absolute -inset-4 bg-blue-500/5 blur-3xl -z-10 rounded-full"></div>
//       </div>

//     </div>
//   )
// }

// export default Hero



import React from 'react'
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import home from "../../assets/home.png"
const Hero = () => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  return (
    <div className="relative bg-[#0B0F17] w-full min-h-screen flex flex-col items-center px-4 md:px-0 pt-24 md:pt-32 overflow-x-hidden">
      
      {/* 1. Grid Background */}
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
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-16 px-2">
        
        {/* Beta Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B77F33]  opacity-60 border border-[#10B77F] backdrop-blur-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full opacity-100 bg-[#10B77F]"></span>
          <span className="text-[#10B77F] opacity-100 text-xs font-medium tracking-wide">
            Now in public beta
          </span>
        </div>
    

     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[#10B77F] blur-[100px] opacity-[0.15] rounded-full pointer-events-none -z-10"></div>
        {/* Main Heading - Removed the <br /> for better mobile flow */}
        <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] relative z-10">
          Forms that feel like{" "}
          <span className="relative inline-block mt-2 sm:mt-0">
            <span className="text-transparent bg-clip-text bg-[linear-gradient(90.41deg,#10B77F_0%,#1AA2E6_100%)]">
              conversations
            </span>
            <div 
              className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full"
              style={{ background: 'linear-gradient(90.41deg, #10B77F 0%, #1AA2E6 100%)' }}
            ></div>
          </span>
        </h1>

        <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mt-6">
          Build forms people actually enjoy filling out. Drag, drop, publish — and watch your conversion rates climb.
        </p>

        {/* Buttons - Improved mobile stack */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link 
              to={ !token ? "/register" : role === "ADMIN" ? "/admindashboard" : "/home" }
            >
          <button className="w-full sm:w-auto bg-[linear-gradient(90.41deg,#10B77F_0%,#1AA2E6_100%)] text-white px-8 py-3 rounded-lg font-medium shadow-sm flex items-center justify-center gap-2 transition-all">
            Start building — it's free <FaArrowRight size={14} />
          </button>
          </Link>
          <button className="text-gray-300 hover:text-white font-medium py-2">
            See how it works
          </button>
        </div>

        {/* Features List */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-6 gap-y-3 mt-8 text-[13px] text-gray-500">
          <span className="flex items-center justify-center gap-2"><FaCheck className="text-emerald-500" size={10}/> No credit card required</span>
          <span className="flex items-center justify-center gap-2"><FaCheck className="text-emerald-500" size={10}/> Free plan available</span>
          <span className="flex items-center justify-center gap-2"><FaCheck className="text-emerald-500" size={10}/> Setup in 2 minutes</span>
        </div>
      </div>

      {/* 4. Trusted By Section - Fixed wrap for small screens */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center mb-16 px-4">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Trusted by teams at</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center items-center gap-6 md:gap-12 opacity-50">
           <span className="text-white font-semibold">Vercel</span>
           <span className="text-white font-semibold">Stripe</span>
           <span className="text-white font-semibold">Linear</span>
           <span className="text-white font-semibold">Notion</span>
           <span className="text-white font-semibold">Figma</span>
           <span className="text-white font-semibold">Slack</span>
        </div>
      </div>

      {/* 5. Dashboard Browser Preview - Fixed px to match navbar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-0 md:px-6 mb-20">
        <div className="rounded-xl border border-white/10 bg-[#0F131C] shadow-2xl overflow-hidden">
          {/* Browser Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#161B26]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
            </div>
            <div className="mx-auto bg-[#0B0F17] px-3 py-1 rounded text-[9px] text-gray-500 w-32 sm:w-48 text-center truncate">
              app.formcraft.io/dashboard
            </div>
          </div>
          {/* Browser Content Area */}
          <div className="h-[250px] sm:h-[400px] md:h-[600px] bg-[#0B0F17] relative">

         
   {/* When you get the screenshot, replace the 'src' below with your local path */}
   <img 
     src={home}
     alt="FormCraft Dashboard Preview"
     className="w-full h-auto object-cover block" 
   />
            
          </div>
        </div>
        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl -z-10 rounded-full"></div>
      </div>
    </div>
  )
}

export default Hero;