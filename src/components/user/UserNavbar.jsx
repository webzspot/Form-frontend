import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, FileText, Sparkles, Bug, LogOut, HomeIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [

  { label: "User", icon: <User size={18} />, path: "/user" },
  { label: "Forms", icon: <FileText size={18} />, path: "/forms" },
  { label: "Report", icon: <Bug size={18} />, path: "/userreport" },
  { label: "Build" ,icon: <HomeIcon size={18}/> , path:"/home" },
];

const UserNavbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [logoutSuccess, setLogoutSuccess] = useState(false);
const navigate = useNavigate();


const userName = localStorage.getItem("userName") || "User";


const handleLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");

  setLogoutSuccess(true);
  setOpen(false); 
};




  return (
    <>
      {/* ================= Desktop / Tablet ================= */}
      <div className="hidden md:flex sticky top-0 z-50 justify-center">
        <div className="bg-white w-full rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between gap-6 border border-black/5">

          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-lg mr-4">
            <Sparkles className="text-[#6C3BFF]" />
            <span>Stellar</span>
          </div>

          {/* Nav Items */}
          <div className="flex gap-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.label} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition
                      ${
                        isActive
                          ? "bg-[#6C3BFF] text-white shadow-md"
                          : "text-gray-500 hover:bg-[#EEF2FF] hover:text-[#6C3BFF]"
                      }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium hidden lg:block">
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
            <button
  onClick={handleLogout}
  className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 transition"
>
  <LogOut size={18} />
  <span className="text-sm font-medium hidden lg:block">
    Logout
  </span>
</button>

          </div>
        </div>
      </div>


      {/* ================= Mobile ================= */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b border-black/10 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Sparkles className="text-[#6C3BFF]" />
          Stellar
        </div>
        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      {/* ================= Mobile Drawer ================= */}
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
                <div className="font-bold text-xl text-violet-600">
                  <span>Helo</span> {userName}
                </div>
                
                {navItems.map((item) => (
                  <Link key={item.label} to={item.path}>
                    <div className="flex items-center gap-3 px-2 py-2 rounded-xl text-gray-600 hover:bg-[#EEF2FF] hover:text-[#6C3BFF] transition">
                      {item.icon}
                      {item.label} 
                      
                    </div>
                  </Link>
             
                ))}
                 <button
  onClick={handleLogout}
  className="flex bg-violet-600 hover:bg-violet-800 items-center gap-2 px-4 py-2 rounded-xl text-white/80 transition"
>
  <LogOut size={18} />
  <span className="text-sm font-medium text-white/80  lg:block">
    Logout
  </span>
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
