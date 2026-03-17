// import React, { useState } from "react";
// import {Menu, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from 'react-router-dom';


// const Nav = () => {
//   const [open, setOpen] = useState(false);
   
//   const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");

//   const scrollToSection=(id)=>{
//     const section=document.getElementById(id);
//     if(section){
//       section.scrollIntoView({behavior:"smooth"});
//     }
//   }

//   return (
//     <>
//       <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50  ">
//         <div className="mx-auto container flex items-center justify-between py-3 px-3 sm:py-5 sm:px-6 ">

//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <div className="w-10 h-10 bg-[#6C3BFF] rounded-xl flex items-center justify-center">
//               <span className="text-white text-lg sm:text-2xl font-bold">⧉</span>
//             </div>
//             <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">
//               FormCraft
//             </h1>
//           </div>

//           {/* Center Menu */}
//           <ul className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-gray-700">
            
             
//               <li
//               onClick={()=>scrollToSection("home")}
//                className="cursor-pointer hover:text-[#6C3BFF]">Home</li>
             
//               <li
//               onClick={()=>scrollToSection("about")}
//                className="cursor-pointer hover:text-[#6C3BFF]">About</li>


//            <li className="cursor-pointer hover:text-[#6C3BFF]">Dashboard</li>
      

            
//             <li className="cursor-pointer hover:text-[#6C3BFF]">Templates</li>
         

             
//             <li className="cursor-pointer hover:text-[#6C3BFF]">Analytics</li>
        

          
//             <li className="cursor-pointer hover:text-[#6C3BFF]">Integrations</li>
            

            
            
        

            
//           </ul>

//           {/* Right Buttons */}
//           <div className="flex items-center gap-4">
//             <Link to={ !token ? "/login" : role === "ADMIN" ? "/admindashboard" : "/home" }>
//             <button className="text-gray-700 font-medium text-sm sm:text-lg hover:text-[#6C3BFF]">
//               Sign In
//             </button>
//             </Link>
           
//            <Link to={ !token ? "/register" : role === "ADMIN" ? "/admindashboard" : "/home" }>
//             <button className="bg-[#6C3BFF] hover:bg-[#5c2dea] hidden lg:block transition-all text-white font-semibold px-5 py-2.5 rounded-xl">
//               Get Started
//             </button>
//             </Link>

//             {/* Mobile Menu Button */}
//             <button
//               className="block lg:hidden text-xl"
//               onClick={() => setOpen(true)}
//             >
//               <Menu />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Slide Menu */}
//       <AnimatePresence>
//         {open && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//               onClick={() => setOpen(false)}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             />

//             {/* Slide Panel */}
//             <motion.div
//               className="fixed top-0 left-0 w-[75%] sm:w-[60%] h-full bg-white z-50 p-6"
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "spring", stiffness: 80 }}
//             >
//               <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-xl font-semibold">Menu</h2>
//                 <button onClick={() => setOpen(false)}>
//                   <X />
//                 </button>
//               </div>

//               <ul className="space-y-6 text-lg font-medium text-gray-700">
//                  <li
//               onClick={()=>scrollToSection("home")}
//                className="cursor-pointer hover:text-[#6C3BFF]">Home</li>
//                <li
//               onClick={()=>scrollToSection("about")}
//                className="cursor-pointer hover:text-[#6C3BFF]">About</li>

//                 <li className="hover:text-[#6C3BFF] cursor-pointer">Dashboard</li>
//                 <li className="hover:text-[#6C3BFF] cursor-pointer">Templates</li>
//                 <li className="hover:text-[#6C3BFF] cursor-pointer">Analytics</li>
//                 <li className="hover:text-[#6C3BFF] cursor-pointer">Integrations</li>
//                <Link  to={ !token ? "/register" : role === "ADMIN" ? "/admindashboard" : "/home" }><li className="bg-[#6C3BFF] rounded text-white px-4 py-1 my-4 w-fit hover:bg-[#7553da] cursor-pointer">GetStarted</li></Link> 
                
//               </ul>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Nav;


import React, { useState } from 'react';
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Add this line
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className=' bg-[#FCFCFCCC]  backdrop-blur-md h-[56.8px] w-full  fixed  top-0 left-0 border-b z-100 border-gray-100'>
      <div className=' w-full max-w-7xl flex justify-between h-14 mx-auto items-center px-4 md:px-6  '>
        
        {/* Logo Section - Kept exact widths */}
        {/* <div className='w-[103.53px] h-7 flex justify-around items-center'>
          <div className='bg-[#14181F] flex justify-center items-center w-7 h-7 rounded-md'>
            <p className='text-[#FCFCFC] font-bold text-sm'>F</p>
          </div>
          <p className='text-[#14181F] font-semibold text-[15px] leading-[22.5px] tracking-[-0.38px]'>
            FormCraft
          </p>
        </div> */}
   

   <div className='flex justify-start items-center gap-2'> 
    <div className='bg-[#14181F] flex justify-center items-center w-7 h-7 rounded-md'>
      <p className='text-[#FCFCFC] font-bold text-sm'>F</p>
    </div>
    <p className='text-[#14181F] font-semibold text-[15px]'>
      FormCraft
    </p>
  </div>
        {/* Desktop Navigation - Hidden on mobile */}
        <div className='hidden md:flex text-[#1F1F1F] items-center'>
          <p className='w-[78.57px] font-semibold h-[17.6px] cursor-pointer'>Features</p>
          <p className='w-[78.57px] font-semibold h-[17.6px] cursor-pointer'>About</p>
          <p className='w-[78.57px] font-semibold h-[17.6px] cursor-pointer'>Testimonials</p>
        </div>

        {/* CTA Buttons - Hidden on mobile to save space, or kept minimal */}
        <div className='hidden md:flex justify-around gap-3 items-center'>
          {/* <p className='font-semibold cursor-pointer'>Log in</p> 
          <button className='bg-[#14181F] text-[#FCFCFC] flex items-center gap-1 rounded-md font-semibold px-4 py-2 text-sm'>
            Start free <FaArrowRight size={13} />
          </button> */}

          <Link to={ !token ? "/login" : role === "ADMIN" ? "/admindashboard" : "/home" }>
    <p className='font-semibold cursor-pointer'>Log in</p> 
  </Link>

  {/* Wrap "Start free" button */}
  <Link to={ !token ? "/register" : role === "ADMIN" ? "/admindashboard" : "/home" }>
    <button className='bg-[#14181F] text-[#FCFCFC] flex items-center gap-1 rounded-md font-semibold px-4 py-2 text-sm'>
      Start free <FaArrowRight size={13} />
    </button>
  </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className='md:hidden flex  items-center ' onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} className="text-[#14181F]" /> : <FaBars size={24} className="text-[#14181F]" />}
        </div>
      </div>

      {/* Mobile Sidebar - Slides from left */}
      <div className={`fixed top-0 left-0 h-screen w-[250px] bg-white shadow-2xl  z-[200] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className='p-6 flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
             <div className='bg-[#14181F] flex justify-center items-center w-7 h-7 rounded-md'>
                <p className='text-[#FCFCFC] font-bold'>F</p>
             </div>
             <p className='font-bold text-lg'>FormCraft</p>
          </div>
          
          <div className='flex flex-col gap-6 text-[#1F1F1F] font-semibold'>
            <p onClick={toggleMenu}>Features</p>
            <p onClick={toggleMenu}>About</p>
            <p onClick={toggleMenu}>Testimonials</p>
            
            {/* <p onClick={toggleMenu}>Log in</p>
            <button className='bg-[#14181F] text-[#FCFCFC] flex items-center justify-center gap-1 rounded-md font-semibold py-3'>
              Start free <FaArrowRight size={13} />
            </button> */}
            <Link onClick={toggleMenu} to={ !token ? "/login" : role === "ADMIN" ? "/admindashboard" : "/home" }>
    <p>Log in</p>
  </Link>

  {/* Wrap Mobile Start free */}
  <Link onClick={toggleMenu} to={ !token ? "/register" : role === "ADMIN" ? "/admindashboard" : "/home" }>
    <button className='w-full bg-[#14181F] text-[#FCFCFC] flex items-center justify-center gap-1 rounded-md font-semibold py-3'>
      Start free <FaArrowRight size={13} />
    </button>
  </Link>
          </div>
        </div>
      </div>

     
    </nav>
  );
}

export default Nav;