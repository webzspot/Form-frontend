// import React, { useState,useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Menu, X, Bug, FileText, Home, Sparkles, 
//   FileChartColumn, User2Icon, User2, BarChart3,Activity,
//   DockIcon,LayoutDashboard,LogOut
// } from "lucide-react";
// import { useNavigate,useLocation } from "react-router-dom";
// import { useFormContext } from "../dashboard/FormContext"; 
// import { MdOutlineAdminPanelSettings } from "react-icons/md";
// import toast from "react-hot-toast";
// const UserNavbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation(); // 2. Initialize location
//   const [open, setOpen] = useState(false);
  

//   const role = sessionStorage.getItem("role")?.toLowerCase() || "user";
//   const Name = sessionStorage.getItem("Name") || "Profile";


//   const handleLogout = () => {
//     //localStorage.clear();
//     sessionStorage.clear();
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };
 
 
// React.useEffect(() => {
//   const handleResize = () => {
//     if (window.innerWidth >= 1024) { // 1024px is the 'lg' breakpoint
//       setOpen(false);
//     }
//   };

//   window.addEventListener("resize", handleResize);
//   return () => window.removeEventListener("resize", handleResize);
// }, []);


//   const navItems = [
//     { label: "Home", path: "/home", icon: <Home size={16} strokeWidth={2} />, allowedRoles: ["user"] },
//     { label: "Forms", path: "/form", icon: <FileText size={16} strokeWidth={2} />, allowedRoles: ["user"] },
//     { label: "Report", path: "/userreport", icon: <BarChart3 size={16} strokeWidth={2} />, allowedRoles: ["user"] },
//     { label: "Status", path: "/reportstatus", icon: <Activity size={16} strokeWidth={2}/> , allowedRoles: ["user"] },
//    { label: "Plan & Pricing", path: "/subscription", icon: <Sparkles size={16} strokeWidth={2} />, allowedRoles: ["user"] },
    
//     { label: "User Details", path: "/admindashboard", icon: <LayoutDashboard size={16} />, allowedRoles: ["admin"] },
//     { label: "User Reports", path: "/adminreport", icon: <BarChart3 size={16} />, allowedRoles: ["admin"] },
//     { label: "Admin Details", path: "/admindetails", icon: <MdOutlineAdminPanelSettings size={18} />, allowedRoles: ["admin"] },
   
//   ];

//   const visibleItems = navItems.filter((item) =>
//     item.allowedRoles.includes(role)
//   );

//   const handleNavClick = (label) => {
//     if (label === "Report") navigate("/userreport");
//     else if (label === "Home") navigate("/home");
//     else if (label === "Forms") navigate("/form");
//     else if (label === "Status") navigate("/reportstatus");
   
//     else if (label === "UserReport") navigate("/adminreport");
  
//     else if (label === Name) navigate("/profile");
//   };

//   return (
//     <>
//       {/* Desktop Navbar */}
//       <div className={`hidden lg:flex sticky top-0 z-50  transition-colors duration-300 border-b bg-white/90 backdrop-blur-md border-slate-100 
//       `}>
//         <div className=" max-w-7xl  w-full mx-auto  flex  items-center justify-between px-0 md:px-6   h-[56.8px]  ">
          
  
//               {/*Logo Section*/}

// <div 
//             className="flex items-center  gap-3 cursor-pointer group" 
//             onClick={() => navigate("/home")}
//           >
//             <div className="w-8 h-8 bg-[#2B4BAB] rounded-lg flex items-center justify-center shadow-sm">
           
//             </div>
//             <span className={`font-semibold text-lg tracking-normal leading-[25.2px] align-middle text-[#14181F]`}>
//               FormCraft
//             </span>
//           </div>


//           {/*Icons Sections*/}
//           <div className="flex gap-1 items-center h-full">
//            {visibleItems.map((item) => {
//               const isActive = location.pathname === item.path; // 4. Check if active
         
//               return (
//                 <button
//                   key={item.label}
//                   onClick={() => navigate(item.path)}
//                   className={`relative flex items-center gap-2 px-4 h-[56.8px] transition-all font-normal text-[14px] ${
//                     isActive 
//                     ? (`text-[#14181F]`) 
//                     : (`text-[#6A7181] hover:text-[#14181F] `)
//                   }`}
//                 >
//                   {item.icon}
//                   <span>{item.label}</span>

//                   {/* The Animated Active Bar */}
//                   {isActive && (
//                     <motion.div
//                       layoutId="userNavUnderline"
//                       className="absolute bottom-2  left-0 right-0 h-[1.5px] bg-[#2B4BAB]"
//                       initial={false}
//                       transition={{ type: "spring", stiffness: 500, damping: 35 }}
//                     />
//                   )}
//                 </button>
//               );
//             })}
//           </div>









        
// <div className="flex items-center gap-4">
     
        
//          {/* Profile Section */}
// <div 
//   className="flex items-center gap-1 cursor-pointer min-w-fit" 
//   onClick={() => navigate("/profile")}
// >
//   <div className={`w-8 h-8  rounded-full flex items-center justify-center text-[12px] font-bold  border border-[#E5E7EB] shrink-0 text-[#6A7181] bg-[#F3F4F6] hover:bg-[#F3F4F6] hover:text-[#14181F]
//                 `}>
//     {Name.charAt(0).toUpperCase()}
//   </div>
//   <span className={`text-[14px] font-medium  whitespace-nowrap text-[#4B5563]`}>
//     {Name}
//   </span>
// </div>

//    {/*Logout  */}
//        <button 
//               onClick={handleLogout}
//               className={`p-2 flex items-center gap-1  transition-colors text-[#4B5563] hover:text-[#14181F]`}
//               title="Logout"
//             >
//               <LogOut size={16} /> Logout
//             </button>
       
//     </div>

     
//         </div>
//       </div>

//      <div className={`lg:hidden sticky top-0 z-50 px-4 py-3  flex justify-between items-center transition-colors border-b bg-white border-black/10 text-slate-900`}>
//         <div className="flex items-center gap-3 font-bold text-lg" onClick={() => navigate("/home")}>
//           <div className="w-7 h-7 bg-[#2B4BAB] rounded-md shadow-sm" />
//           <span className={`text-[#14181F]`}>FormCraft</span>
//         </div>
//         <button onClick={() => setOpen(true)}>
//           <Menu size={26} />
//         </button>
//       </div>

//       {/* Mobile Drawer */}
//       <AnimatePresence>
//         {open && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.6 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setOpen(false)}
//               className="fixed inset-0 bg-black/80 z-60"
//             />
//             <motion.div
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "spring", stiffness: 260, damping: 30 }}
//               className={`fixed top-0 left-0 h-full w-64 z-70 shadow-xl p-6 rounded-r-2xl border-r transition-colors bg-white border-slate-100"
//               `}
//             >
//               {/* Drawer Header with Logo & Close button */}
//               <div className="flex justify-between items-center mb-8">
//                 <div className="flex items-center gap-2">
//                   <div className="w-6 h-6 bg-[#2B4BAB] rounded-md" />
//                   <span className={`font-bold text-lgtext-[#14181F]`}>
//                     FormCraft
//                   </span>
//                 </div>
//                 <button onClick={() => setOpen(false)} className="text-slate-600">
//                   <X />
//                 </button>
//               </div>

//               {/* Drawer Navigation */}
//               <div className="flex flex-col gap-2">
//               {visibleItems.map((item) => {
//                  const isActive = location.pathname === item.path;
               
//                   return (
//                     <button
//                       key={item.label}
//                       onClick={() => { navigate(item.path); setOpen(false); }}
//                       className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
//                         isActive 
//                         ? "bg-[#2B4BAB]/10 text-[#2B4BAB] font-bold" 
//                         : "text-[#6A7181]"
//                       }`}
//                     >
//                       {item.icon}
//                       {item.label}
//                     </button>
//                   );
//                 })}
           

//   <hr className={`my-2 border-slate-100`} />
              

//                 {/* Mobile Profile Section */}
//                 <button 
//                   onClick={() => { navigate("/profile"); setOpen(false); }}
//                   className="flex items-center gap-3 px-4 py-3"
//                 >
//                   <div className="w-8 h-8 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[12px] font-bold text-[#6B7280] border border-[#E5E7EB]">
//                     {Name.charAt(0).toUpperCase()}
//                   </div>
//                   <span className={`font-medium text-[#4B5563]`}>{Name}</span>
//                 </button>
//               </div>

//               <button 
//                   onClick={handleLogout}
//                   className={`flex items-center font-medium text-[#4B5563] gap-3 px-5 py-3   pt-4`}
//                 >
//                   <LogOut size={18} /> Logout
//                 </button>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default UserNavbar;


import React, { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Bug, FileText, Home, Sparkles, 
  FileChartColumn, User2Icon, User2, BarChart3,Activity,
  DockIcon,LayoutDashboard,LogOut
} from "lucide-react";
import { useNavigate,useLocation } from "react-router-dom";
import { useFormContext } from "../dashboard/FormContext"; 
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import toast from "react-hot-toast";
const UserNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 2. Initialize location
  const [open, setOpen] = useState(false);
  

  const role = sessionStorage.getItem("role")?.toLowerCase() || "user";
  const Name = sessionStorage.getItem("Name") || "Profile";


  const handleLogout = () => {
    //localStorage.clear();
    sessionStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };
 
 
React.useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) { // 1024px is the 'lg' breakpoint
      setOpen(false);
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  const navItems = [
    { label: "Home", path: "/home", icon: <Home size={16} strokeWidth={2} />, allowedRoles: ["user"] },
    { label: "Forms", path: "/form", icon: <FileText size={16} strokeWidth={2} />, allowedRoles: ["user"] },
    { label: "Report", path: "/userreport", icon: <BarChart3 size={16} strokeWidth={2} />, allowedRoles: ["user"] },
    { label: "Status", path: "/reportstatus", icon: <Activity size={16} strokeWidth={2}/> , allowedRoles: ["user"] },
   { label: "Plan & Pricing", path: "/plandetail", icon: <Sparkles size={16} strokeWidth={2} />, allowedRoles: ["user"] },
    
    { label: "User Details", path: "/admindashboard", icon: <LayoutDashboard size={16} />, allowedRoles: ["admin"] },
    { label: "User Reports", path: "/adminreport", icon: <BarChart3 size={16} />, allowedRoles: ["admin"] },
    { label: "Admin Details", path: "/admindetails", icon: <MdOutlineAdminPanelSettings size={18} />, allowedRoles: ["admin"] },
   
  ];

  const visibleItems = navItems.filter((item) =>
    item.allowedRoles.includes(role)
  );

  const handleNavClick = (label) => {
    if (label === "Report") navigate("/userreport");
    else if (label === "Home") navigate("/home");
    else if (label === "Forms") navigate("/form");
    else if (label === "Status") navigate("/reportstatus");
   
    else if (label === "UserReport") navigate("/adminreport");
  
    else if (label === Name) navigate("/profile");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className={`hidden lg:flex sticky top-0 z-50  transition-colors duration-300 border-b bg-white/90 backdrop-blur-md border-slate-100 
      `}>
        <div className=" max-w-7xl  w-full mx-auto  flex  items-center justify-between px-0 md:px-6   h-[56.8px]  ">
          
  
              {/*Logo Section*/}

<div 
            className="flex items-center  gap-3 cursor-pointer group" 
            onClick={() => navigate("/home")}
          >
            <div className="w-8 h-8 bg-[#2B4BAB] rounded-lg flex items-center justify-center shadow-sm">
           
            </div>
            <span className={`font-semibold text-lg tracking-normal leading-[25.2px] align-middle text-[#14181F]`}>
              FormCraft
            </span>
          </div>


          {/*Icons Sections*/}
          <div className="flex gap-1 items-center h-full">
           {visibleItems.map((item) => {
              const isActive = location.pathname === item.path; // 4. Check if active
         
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`relative flex items-center gap-2 px-4 h-[56.8px] transition-all font-normal text-[14px] ${
                    isActive 
                    ? (`text-[#14181F]`) 
                    : (`text-[#6A7181] hover:text-[#14181F] `)
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>

                  {/* The Animated Active Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="userNavUnderline"
                      className="absolute bottom-2  left-0 right-0 h-[1.5px] bg-[#2B4BAB]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>









        
<div className="flex items-center gap-4">
     
        
         {/* Profile Section */}
<div 
  className="flex items-center gap-1 cursor-pointer min-w-fit" 
  onClick={() => navigate("/profile")}
>
  <div className={`w-8 h-8  rounded-full flex items-center justify-center text-[12px] font-bold  border border-[#E5E7EB] shrink-0 text-[#6A7181] bg-[#F3F4F6] hover:bg-[#F3F4F6] hover:text-[#14181F]
                `}>
    {Name.charAt(0).toUpperCase()}
  </div>
  <span className={`text-[14px] font-medium  whitespace-nowrap text-[#4B5563]`}>
    {Name}
  </span>
</div>

   {/*Logout  */}
       <button 
              onClick={handleLogout}
              className={`p-2 flex items-center gap-1  transition-colors text-[#4B5563] hover:text-[#14181F]`}
              title="Logout"
            >
              <LogOut size={16} /> Logout
            </button>
       
    </div>

     
        </div>
      </div>

     <div className={`lg:hidden sticky top-0 z-50 px-4 py-3  flex justify-between items-center transition-colors border-b bg-white border-black/10 text-slate-900`}>
        <div className="flex items-center gap-3 font-bold text-lg" onClick={() => navigate("/home")}>
          <div className="w-7 h-7 bg-[#2B4BAB] rounded-md shadow-sm" />
          <span className={`text-[#14181F]`}>FormCraft</span>
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
              className={`fixed top-0 left-0 h-full w-64 z-70 shadow-xl p-6 rounded-r-2xl border-r transition-colors bg-white border-slate-100"
              `}
            >
              {/* Drawer Header with Logo & Close button */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#2B4BAB] rounded-md" />
                  <span className={`font-bold text-lgtext-[#14181F]`}>
                    FormCraft
                  </span>
                </div>
                <button onClick={() => setOpen(false)} className="text-slate-600">
                  <X />
                </button>
              </div>

              {/* Drawer Navigation */}
              <div className="flex flex-col gap-2">
              {visibleItems.map((item) => {
                 const isActive = location.pathname === item.path;
               
                  return (
                    <button
                      key={item.label}
                      onClick={() => { navigate(item.path); setOpen(false); }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive 
                        ? "bg-[#2B4BAB]/10 text-[#2B4BAB] font-bold" 
                        : "text-[#6A7181]"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  );
                })}
           

  <hr className={`my-2 border-slate-100`} />
              

                {/* Mobile Profile Section */}
                <button 
                  onClick={() => { navigate("/profile"); setOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <div className="w-8 h-8 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[12px] font-bold text-[#6B7280] border border-[#E5E7EB]">
                    {Name.charAt(0).toUpperCase()}
                  </div>
                  <span className={`font-medium text-[#4B5563]`}>{Name}</span>
                </button>
              </div>

              <button 
                  onClick={handleLogout}
                  className={`flex items-center font-medium text-[#4B5563] gap-3 px-5 py-3   pt-4`}
                >
                  <LogOut size={18} /> Logout
                </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserNavbar;