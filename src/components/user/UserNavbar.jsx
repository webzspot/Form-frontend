import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Bug, FileText, HomeIcon, Sparkles, 
  FileChartColumn, User2Icon, User2, BarChart, 
  DockIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../dashboard/FormContext"; 
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const UserNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // We keep isDarkMode to ensure the navbar styling stays synced with the rest of the app
  const { isDarkMode } = useFormContext(); 

  const role = localStorage.getItem("role")?.toLowerCase() || "user";
  const Name = localStorage.getItem("Name") || "Profile";

  const navItems = [
    { label: "Home", icon: <HomeIcon size={18} />, allowedRoles: ["user"] },
    { label: "Forms", icon: <FileText size={18} />, allowedRoles: ["user"] },
    { label: "Report", icon: <Bug size={18} />, allowedRoles: ["user"] },
    { label: "Status", icon: <FileChartColumn size={18}/> , allowedRoles: ["user"] },
    { label: "Documentation", icon: <DockIcon size={18}/> , allowedRoles: ["user"] },
     { label: "Reference", icon: <DockIcon size={18}/> , allowedRoles: ["user"] },
    { label: "UserDetail", icon: <User2Icon size={18} />, allowedRoles: ["admin"] },
    { label: "UserReport", icon: <BarChart size={18} />, allowedRoles: ["admin"] },
     { label: "AdminDetail", icon: <MdOutlineAdminPanelSettings size={18} />, allowedRoles: ["admin"] },
    { label: Name, icon: <User2 size={18} />, allowedRoles: ["user", "admin"] },
  ];

  const visibleItems = navItems.filter((item) =>
    item.allowedRoles.includes(role)
  );

  const handleNavClick = (label) => {
    if (label === "Report") navigate("/userreport");
    else if (label === "Home") navigate("/home");
    else if (label === "Forms") navigate("/form");
    else if (label === "Status") navigate("/reportstatus");
    else if(label=== "Documentation") navigate("/apidocumentation");
    else if (label === "UserDetail") navigate("/admindashboard");
    else if (label === "UserReport") navigate("/adminreport");
    else if(label==="AdminDetail") navigate("/admindetails");
    else if(label==="Reference") navigate("/apireference");
    else if (label === Name) navigate("/profile");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className={`hidden lg:flex sticky top-0 z-50 justify-center transition-colors duration-300 border-b ${
        isDarkMode 
        ? "bg-[#0f172a]/80 backdrop-blur-md border-slate-800 shadow-2xl" 
        : "bg-white/90 backdrop-blur-md border-slate-100 shadow-lg"
      } p-4`}>
        <div className="flex items-center gap-4 w-full justify-between">
          <div 
            className={`flex items-center gap-2 font-bold text-lg cursor-pointer transition-colors ${isDarkMode ? "text-white" : "text-slate-900"}`} 
            onClick={() => navigate("/home")}
          >
            <Sparkles className="text-[#6C3BFF]" />
            Stellar
          </div>

          <div className="flex gap-2 items-center">
            {visibleItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium ${
                  isDarkMode 
                  ? "text-slate-300 hover:bg-slate-800 hover:text-indigo-400" 
                  : "text-slate-600 hover:bg-[#EEF2FF] hover:text-[#6C3BFF]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className={`lg:hidden sticky top-0 z-50 px-4 py-3 flex justify-between items-center transition-colors border-b ${
        isDarkMode 
        ? "bg-[#0f172a] border-slate-800 text-white" 
        : "bg-white border-black/10 text-slate-900"
      }`}>
        <div className="flex items-center gap-2 font-bold text-lg">
          <Sparkles className="text-[#6C3BFF]" />
          Stellar
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setOpen(true)}>
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/80 z-60"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className={`fixed top-0 left-0 h-full w-64 z-70 shadow-xl p-6 rounded-r-2xl border-r transition-colors ${
                isDarkMode 
                ? "bg-slate-900 border-slate-800" 
                : "bg-white border-slate-100"
              }`}
            >
              <div className="flex justify-between items-center mb-8">
                <div className={`flex items-center gap-2 font-bold text-lg ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  <Sparkles className="text-[#6C3BFF]" />
                  Stellar
                </div>
                <button onClick={() => setOpen(false)} className={isDarkMode ? "text-slate-400" : "text-slate-600"}><X /></button>
              </div>

              <div className="flex flex-col gap-4">
                {visibleItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      handleNavClick(item.label);
                      setOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
                      isDarkMode 
                      ? "text-slate-400 hover:bg-slate-800 hover:text-indigo-400" 
                      : "text-gray-600 hover:bg-[#EEF2FF] hover:text-[#6C3BFF]"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
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