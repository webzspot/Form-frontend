import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, FileText, Sparkles } from "lucide-react";
import UserDetails from "./UserDetails";
import AllReports from "./AllReports";

const navItems = [
  { label: "Users", icon: <User size={18} />, key: "users" },
  { label: "Reports", icon: <FileText size={18} />, key: "reports" },
];

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [open, setOpen] = useState(false); // mobile side panel

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= Desktop Navbar ================= */}
      <div className="hidden md:flex sticky top-0 z-50 bg-white border-b border-black/10 shadow-sm">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 text-xl font-bold text-indigo-600">
            <Sparkles />
            Stellar
          </div>

          {/* Nav Items */}
          <div className="flex gap-6 text-black/70 font-medium">
            {navItems.map((item) => (
              <button
                key={item.key}
                className={`flex items-center gap-2 px-3 py-1 rounded ${
                  activeTab === item.key ? "bg-indigo-100 text-indigo-700" : "hover:bg-indigo-50"
                }`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= Mobile Navbar ================= */}
      <div className="md:hidden sticky top-0 z-50 bg-white border-b border-black/10 shadow-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-lg text-indigo-600">
          <Sparkles />
          Stellar
        </div>
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
           {/* Drawer */}
<motion.div
  initial={{ x: "-100%" }}
  animate={{ x: 0 }}
  exit={{ x: "-100%" }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
  className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl p-6"
>
  <div className="flex justify-between items-center mb-8">
    <div className="flex items-center gap-2 font-bold text-lg text-indigo-600">
      <Sparkles />
      Stellar
    </div>
    <button onClick={() => setOpen(false)}>
      <X />
    </button>
  </div>

  <div className="flex flex-col gap-3">
    {navItems.map((item) => (
      <div key={item.key} className="">
        <button
          onClick={() => setActiveTab(item.key)}
          className={`flex items-center gap-2 px-3 py-2 w-full rounded ${
            activeTab === item.key ? "bg-indigo-100 text-indigo-700" : "hover:bg-indigo-50"
          }`}
        >
          {item.icon} {item.label}
        </button>

        {/* Nested menu for Users */}
        {item.key === "users" && activeTab === "users" && (
          <div className="flex flex-col gap-2 ml-6 mt-2">
            <span className="text-gray-500 text-sm font-semibold">User Management</span>
            <button
              onClick={() => {
                setOpen(false); // close side panel
                document.getElementById("add-user-btn")?.click(); // open add user drawer
              }}
              className="text-indigo-700 text-sm hover:underline px-2 py-1 rounded"
            >
              ➕ Add New User
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
</motion.div>

          </>
        )}
      </AnimatePresence>

      {/* ================= Main Content ================= */}
      <div className="p-6">
        {activeTab === "users" && <UserDetails />}
        {activeTab === "reports" && <AllReports />}
      </div>
    </div>
  );
};

export default AdminLayout;

