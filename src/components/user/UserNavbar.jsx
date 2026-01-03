import React, { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bug, FileText, HomeIcon, LogOut, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { User } from "lucide-react"; 


const navItems = [
  { label: "Report", icon: <Bug size={18} /> },
  { label: "Home", icon: <HomeIcon size={18} /> },
  { label: "Forms", icon: <FileText size={18} /> },
];

const UserNavbar = ({ user, logout }) => {

 

// useEffect(() => {
//   if (!user) getUser(); // fetch if not already fetched
// }, [user, getUser]);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
 
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const handleNavClick = (label) => {
   

    if (label === "Report") navigate("/userreport");
    else if (label === "Home") navigate("/home");
    else if (label === "Forms") navigate("/form");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex sticky top-0 z-50 justify-center bg-white shadow-lg p-4">
        <div className="flex items-center gap-4 w-full max-w-6xl justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Sparkles className="text-[#6C3BFF]" />
            Stellar
          </div>
          <div className="flex gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#EEF2FF] hover:text-[#6C3BFF]"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <button
  onClick={() => navigate("/profile")}
  className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold"
>
  <User size={20} />
  {user?.name || "User"}
</button>
            <button
  onClick={() => {
    logout();
    toast.success("Logged out successfully");
    window.location.href = "/login";
  }}
  className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50"
>
  <LogOut size={18} /> Logout
</button>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b border-black/10 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Sparkles className="text-[#6C3BFF]" />
          Stellar
        </div>
        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl p-6 rounded-r-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Sparkles className="text-[#6C3BFF]" />
                  Stellar
                </div>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      handleNavClick(item.label);
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-2 py-2 rounded-xl text-gray-600 hover:bg-[#EEF2FF] hover:text-[#6C3BFF]"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => navigate("/login")}
                  className="flex bg-violet-600 hover:bg-violet-900 items-center gap-2 px-4 py-2 rounded-xl text-white"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {logoutSuccess && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white space-y-5 px-4 py-5 rounded w-4/5 sm:w-3/5 lg:w-2/5 text-center shadow-xl"
    >
      <h1 className="font-semibold text-xl">Logged Out</h1>
      <p className="text-sm text-black/70">
        You have been successfully logged out.
      </p>

      <button
        onClick={() => navigate("/login")}
        className="bg-violet-600 text-white px-4 py-1 rounded"
      >
        Go to Login
      </button>
    </motion.div>
  </div>
 )} 

    </>
  );
};

export default UserNavbar;
