import React, { useState } from "react";
import {Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';


const Nav = () => {
  const [open, setOpen] = useState(false);
   
  const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

  const scrollToSection=(id)=>{
    const section=document.getElementById(id);
    if(section){
      section.scrollIntoView({behavior:"smooth"});
    }
  }

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50  ">
        <div className="mx-auto container flex items-center justify-between py-3 px-3 sm:py-5 sm:px-6 ">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#6C3BFF] rounded-xl flex items-center justify-center">
              <span className="text-white text-lg sm:text-2xl font-bold">⧉</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">
              FormCraft
            </h1>
          </div>

          {/* Center Menu */}
          <ul className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-gray-700">
            
             
              <li
              onClick={()=>scrollToSection("home")}
               className="cursor-pointer hover:text-[#6C3BFF]">Home</li>
             
              <li
              onClick={()=>scrollToSection("about")}
               className="cursor-pointer hover:text-[#6C3BFF]">About</li>


           <li className="cursor-pointer hover:text-[#6C3BFF]">Dashboard</li>
      

            
            <li className="cursor-pointer hover:text-[#6C3BFF]">Templates</li>
         

             
            <li className="cursor-pointer hover:text-[#6C3BFF]">Analytics</li>
        

          
            <li className="cursor-pointer hover:text-[#6C3BFF]">Integrations</li>
            

            
            
        

            
          </ul>

          {/* Right Buttons */}
          <div className="flex items-center gap-4">
            <Link to={ !token ? "/login" : role === "ADMIN" ? "/admindashboard" : "/home" }>
            <button className="text-gray-700 font-medium text-sm sm:text-lg hover:text-[#6C3BFF]">
              Sign In
            </button>
            </Link>
           
           <Link to={ !token ? "/register" : role === "ADMIN" ? "/admindashboard" : "/home" }>
            <button className="bg-[#6C3BFF] hover:bg-[#5c2dea] hidden lg:block transition-all text-white font-semibold px-5 py-2.5 rounded-xl">
              Get Started
            </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="block lg:hidden text-xl"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Slide Panel */}
            <motion.div
              className="fixed top-0 left-0 w-[75%] sm:w-[60%] h-full bg-white z-50 p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              <ul className="space-y-6 text-lg font-medium text-gray-700">
                 <li
              onClick={()=>scrollToSection("home")}
               className="cursor-pointer hover:text-[#6C3BFF]">Home</li>
               <li
              onClick={()=>scrollToSection("about")}
               className="cursor-pointer hover:text-[#6C3BFF]">About</li>

                <li className="hover:text-[#6C3BFF] cursor-pointer">Dashboard</li>
                <li className="hover:text-[#6C3BFF] cursor-pointer">Templates</li>
                <li className="hover:text-[#6C3BFF] cursor-pointer">Analytics</li>
                <li className="hover:text-[#6C3BFF] cursor-pointer">Integrations</li>
               <Link  to={ !token ? "/register" : role === "ADMIN" ? "/admindashboard" : "/home" }><li className="bg-[#6C3BFF] rounded text-white px-4 py-1 my-4 w-fit hover:bg-[#7553da] cursor-pointer">GetStarted</li></Link> 
                
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
