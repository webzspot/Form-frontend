// import React from "react";

// const LoadingScreen = () => {
//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
//       {/* Top Wave */}
//       <div className="absolute top-0 left-0 w-full h-96 overflow-hidden z-0 pointer-events-none">
//         <svg
//           viewBox="0 0 1440 320"
//           className="w-full h-full"
//           preserveAspectRatio="none"
//         >
//           <path
//             fill="#7c3aed"
//             fillOpacity="0.12"
//             d="M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,186.7C840,192,960,192,1080,176C1200,160,1320,128,1380,112L1440,96L1440,0L1380,0L1320,0L1200,0L1080,0L960,0L840,0L720,0L600,0L480,0L360,0L240,0L120,0L60,0L0,0Z"
//           />
//         </svg>
//       </div>

//       {/* Bottom Wave */}
//       <div className="absolute bottom-0 left-0 w-full h-96 overflow-hidden z-0 pointer-events-none">
//         <svg
//           viewBox="0 0 1440 320"
//           className="w-full h-full rotate-180"
//           preserveAspectRatio="none"
//         >
//           <path
//             fill="#7c3aed"
//             fillOpacity="0.12"
//             d="M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,186.7C840,192,960,192,1080,176C1200,160,1320,128,1380,112L1440,96L1440,0L1380,0L1320,0L1200,0L1080,0L960,0L840,0L720,0L600,0L480,0L360,0L240,0L120,0L60,0L0,0Z"
//           />
//         </svg>
//       </div>

//       {/* Logo and Spinner Container */}
//       <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-in">
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
//             <span className="text-primary-foreground text-2xl font-bold">F</span>
//           </div>
//           <h1 className="text-3xl font-bold text-foreground">FormCraft</h1>
//         </div>

//         {/* Wave Loader Animation */}
//         <div className="flex items-end gap-1 h-8">
//           <div
//             className="w-2 bg-primary rounded-full animate-wave-bar"
//             style={{ animationDelay: "0ms" }}
//           />
//           <div
//             className="w-2 bg-primary rounded-full animate-wave-bar"
//             style={{ animationDelay: "100ms" }}
//           />
//           <div
//             className="w-2 bg-primary rounded-full animate-wave-bar"
//             style={{ animationDelay: "200ms" }}
//           />
//           <div
//             className="w-2 bg-primary rounded-full animate-wave-bar"
//             style={{ animationDelay: "300ms" }}
//           />
//           <div
//             className="w-2 bg-primary rounded-full animate-wave-bar"
//             style={{ animationDelay: "400ms" }}
//           />
//         </div>

//         {/* Loading Text */}
//         <p className="text-muted-foreground text-sm font-medium animate-pulse">
//           Loading your workspace...
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoadingScreen;


import React from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import WaveBackground from '../dashboard/WaveBackground';

const LoadingScreen = ({ isDarkMode }) => {
  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      
      {/* --- TOP WAVE (Slides Down) --- */}
      <motion.div 
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 z-0"
      >
        <WaveBackground position="top" height="h-96" color={isDarkMode ? "#1f2937" : "#6d28d9"} opacity={0.25} />
      </motion.div>

      {/* --- BOTTOM WAVE (Slides Up) --- */}
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 z-0"
      >
        <WaveBackground position="bottom" height="h-96" color={isDarkMode ? "#1f2937" : "#6c2bd9"} opacity={0.25} />
      </motion.div>

      {/* --- CENTER CONTENT (Fades In) --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex flex-col items-center z-10"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#6C3BFF] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">⧉</span>
          </div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#4c1d95]'}`}>FormCraft</h1>
        </div>
        <FaSpinner className="text-indigo-600 text-4xl animate-spin" />
      </motion.div>

    </div>
  );
};


export default LoadingScreen;




// import React from "react";

// const LoadingScreen = () => {
//   return (
//     // Background: White with a very subtle violet gradient
//     <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
      
//       {/* Subtle Background Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-violet-100/40 via-transparent to-purple-100/40 animate-pulse" />

//       {/* --- TOP WAVES (Violet-300 Theme) --- */}
      
//       {/* Top Wave Layer 1 (Taller) */}
//       <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
//         <svg
//           className="relative block w-full h-[35vh]" 
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M0,0 C150,90 350,0 500,50 C650,100 800,20 1000,80 C1100,100 1200,60 1200,60 L1200,0 L0,0 Z"
//             className="fill-violet-300"
//           >
//             <animate
//               attributeName="d"
//               dur="8s"
//               repeatCount="indefinite"
//               values="
//                 M0,0 C150,90 350,0 500,50 C650,100 800,20 1000,80 C1100,100 1200,60 1200,60 L1200,0 L0,0 Z;
//                 M0,0 C150,40 350,100 500,60 C650,20 800,90 1000,40 C1100,20 1200,80 1200,80 L1200,0 L0,0 Z;
//                 M0,0 C150,90 350,0 500,50 C650,100 800,20 1000,80 C1100,100 1200,60 1200,60 L1200,0 L0,0 Z"
//             />
//           </path>
//         </svg>
//       </div>

//       {/* Top Wave Layer 2 (Taller) */}
//       <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
//         <svg
//           className="relative block w-full h-[30vh]"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M0,0 C200,50 400,80 600,40 C800,0 1000,60 1200,30 L1200,0 L0,0 Z"
//             className="fill-purple-200/70"
//           >
//             <animate
//               attributeName="d"
//               dur="6s"
//               repeatCount="indefinite"
//               values="
//                 M0,0 C200,50 400,80 600,40 C800,0 1000,60 1200,30 L1200,0 L0,0 Z;
//                 M0,0 C200,20 400,60 600,80 C800,50 1000,20 1200,60 L1200,0 L0,0 Z;
//                 M0,0 C200,50 400,80 600,40 C800,0 1000,60 1200,30 L1200,0 L0,0 Z"
//             />
//           </path>
//         </svg>
//       </div>

//       {/* --- BOTTOM WAVES --- */}

//       {/* Bottom Wave Layer 1 (Taller) */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-0">
//         <svg
//           className="relative block w-full h-[40vh]"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M0,0 C150,90 350,0 500,50 C650,100 800,20 1000,80 C1100,100 1200,60 1200,60 L1200,0 L0,0 Z"
//             className="fill-violet-300/80"
//           >
//             <animate
//               attributeName="d"
//               dur="10s"
//               repeatCount="indefinite"
//               values="
//                 M0,0 C150,90 350,0 500,50 C650,100 800,20 1000,80 C1100,100 1200,60 1200,60 L1200,0 L0,0 Z;
//                 M0,0 C100,40 300,100 500,70 C700,40 900,90 1100,50 C1150,30 1200,70 1200,70 L1200,0 L0,0 Z;
//                 M0,0 C150,90 350,0 500,50 C650,100 800,20 1000,80 C1100,100 1200,60 1200,60 L1200,0 L0,0 Z"
//             />
//           </path>
//         </svg>
//       </div>

//       {/* Bottom Wave Layer 2 (Taller) */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180 z-0">
//         <svg
//           className="relative block w-full h-[30vh]"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M0,0 C300,80 600,20 900,60 C1050,80 1150,40 1200,50 L1200,0 L0,0 Z"
//             className="fill-violet-200"
//           >
//             <animate
//               attributeName="d"
//               dur="7s"
//               repeatCount="indefinite"
//               values="
//                 M0,0 C300,80 600,20 900,60 C1050,80 1150,40 1200,50 L1200,0 L0,0 Z;
//                 M0,0 C300,30 600,90 900,40 C1050,20 1150,70 1200,60 L1200,0 L0,0 Z;
//                 M0,0 C300,80 600,20 900,60 C1050,80 1150,40 1200,50 L1200,0 L0,0 Z"
//             />
//           </path>
//         </svg>
//       </div>

//       {/* Floating Particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
//         {[...Array(15)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-violet-400/60 rounded-full"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
//               animationDelay: `${Math.random() * 5}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* --- CONTENT CONTAINER --- */}
//       <div className="relative z-20 flex flex-col items-center gap-6">
//         <div className="relative">
//           <div className="absolute inset-0 bg-violet-200/50 blur-3xl rounded-full scale-150 animate-pulse" />
//           <span className="text-3xl font-bold bg-violet-500 bg-clip-text text-transparent drop-shadow-sm tracking-tight">
//             FormCraft
//           </span>
//         </div>
//       </div>

//       {/* Inline Styles for Animations */}
//       <style>{`
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0) translateX(0);
//             opacity: 0.2;
//           }
//           25% {
//             transform: translateY(-20px) translateX(10px);
//             opacity: 0.6;
//           }
//           50% {
//             transform: translateY(-40px) translateX(-10px);
//             opacity: 0.4;
//           }
//           75% {
//             transform: translateY(-20px) translateX(5px);
//             opacity: 0.8;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoadingScreen;