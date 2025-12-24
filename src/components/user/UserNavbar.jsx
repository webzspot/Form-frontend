import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";


const navItems = [
  { label: "User", icon: <User size={18} /> },
  { label: "Forms", icon: <FileText size={18} />, path: "/form"  },
];

const UserNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= Desktop / Tablet Navbar ================= */}
      <div className="hidden md:flex sticky top-0 z-50 bg-white border-b border-black/10 shadow-sm">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          
          {/* App Logo */}
          <div className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="text-indigo-600" />
            <span className="tracking-wide">Stellar</span>
          </div>

          {/* Nav Items */}
          <div className="flex gap-10 text-black/70 font-medium">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition"
              >
                {item.icon}
               <Link to={item.path}> {item.label}</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= Mobile Navbar ================= */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b border-black/10 shadow-sm px-4 py-3 flex justify-between items-center">
        
        {/* App Name */}
        <div className="flex items-center gap-2 font-bold text-lg">
          <Sparkles className="text-indigo-600" />
          Stellar
        </div>

        {/* Menu Button */}
        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      {/* ================= Mobile Side Drawer ================= */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Sparkles className="text-indigo-600" />
                  Stellar
                </div>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <motion.div
                    key={item.label}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 text-black/70 font-medium cursor-pointer hover:text-indigo-600 transition"
                  >
                    {item.icon}
                  <Link to={item.path}> {item.label}</Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserNavbar;


