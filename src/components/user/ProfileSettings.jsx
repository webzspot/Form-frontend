// // import React, { useState, useEffect, useCallback } from "react";
// // import axios from "axios";
// // import { FiEdit, FiTrash2, FiUser, FiMail, FiShield, FiMoon, FiSun } from "react-icons/fi";
// // import toast from "react-hot-toast";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { LogOut } from "lucide-react";
// // import UserNavbar from "./UserNavbar";
// // import { useNavigate } from "react-router-dom";
// // import WaveBackground from "../dashboard/WaveBackground";
// // import { useFormContext } from "../dashboard/FormContext";
// // import Footer from "../landingPage/Footer";
// // import LoadingScreen from "../shared/LoadingScreen";
// // import { Link } from "react-router-dom";
// // const ProfileSettings = () => {
// //   const { isDarkMode, toggleTheme } = useFormContext();
// //   const [user, setUser] = useState(null);
// //   const [editingUser, setEditingUser] = useState(null);
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [passcode, setpasscode] = useState("");
  
// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");
// //   const API_BASE = "https://formbuilder-saas-backend.onrender.com/api/users/profile";

// //   const getUser = useCallback(async () => {
// //     if (!token) return;
// //     try {
// //       const res = await axios.get(API_BASE, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setUser(res.data.data);
    
// //     } catch (err) {
// //       toast.error("Session expired. Please login again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [token]);

// //   useEffect(() => {
// //     getUser();
// //   }, [getUser]);

// //   const handleUpdate = async () => {
// //     if (!editingUser.name || !editingUser.email) return toast.error("Fields cannot be empty");
// //     setActionLoading(true);
// //     try {
// //       const res = await axios.put(`${API_BASE}/update`, editingUser, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setUser(res.data.data);
// //       localStorage.setItem("Name", res.data.data.name);
// //       setEditingUser(null);
// //       toast.success("Profile updated successfully");
// //     } catch (err) {
// //       toast.error("Update failed");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     setActionLoading(true);
// //     try {
// //       await axios.delete(`${API_BASE}/delete`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //         data: { password: passcode }
// //       });
// //       localStorage.clear();
// //       toast.success("Account deleted successfully");
// //       navigate("/register");
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Delete failed");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     toast.success("Logged out successfully");
// //     navigate("/login");
// //   };

// //     const theme = {
// //     pageBg: isDarkMode 
// //       ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
// //       : "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95] selection:bg-purple-200",
    
// //     card: isDarkMode
// //       ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
// //       : "bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",

// //     input: isDarkMode
// //       ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
// //       : "bg-white/50 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",

// //     buttonPrimary: isDarkMode
// //       ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
// //       : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",

// //     textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/70",
// //     tableHeader: isDarkMode ? "bg-[#1e1b4b]/60 text-purple-300" : "bg-indigo-700 text-[#4c1d95]",
// //   };
 

// //   if (loading) {
// //     return <LoadingScreen isDarkMode={isDarkMode} />;
// //   }
// //   return (
// //     <>
   
// //       <div
// //     className={`relative min-h-screen transition-colors duration-300 ${
// //       isDarkMode ? "bg-gray-950 text-white" : "bg-white text-black"
// //     }`}
// //   >
// //       <UserNavbar />
     
// //       <WaveBackground position="top" height="h-180" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
// //       <WaveBackground position="bottom" height="h-150" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />

// //       <main className="max-w-7xl relative z-10 mt-10 mx-auto pb-12 px-4 sm:px-6">
// //         <motion.div 
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className={`${isDarkMode ? 'bg-black/60 border-slate-700  shadow-2xl shadow-black/20' : 'bg-white border-gray-100 shadow-xl shadow-indigo-100/50'} rounded-3xl overflow-hidden border`}
// //         >
// //           {/* Header Banner */}
// //           <div className={`h-32 relative ${isDarkMode ? 'bg-indigo-950' : `${theme.buttonPrimary}`}`}>
// //              <div className={`absolute -bottom-12 left-8 p-1 rounded-2xl shadow-lg ${isDarkMode ? 'bg-violet-500' : 'bg-white'}`}>
// //                 <div className={`w-24 h-24 rounded-xl flex items-center justify-center text-3xl font-bold ${isDarkMode ? 'bg-gray-900 text-indigo-400' : 'bg-indigo-50 text-violet-900'}`}>
// //                   {user?.name?.charAt(0).toUpperCase()}
// //                 </div>
// //              </div>
// //           </div>

// //           <div className="pt-16 px-8 pb-8 ">
// //             <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 ${isDarkMode ? 'border-slate-700' : 'border-gray-50'}`}>
// //               <div>
// //                 <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{user?.name}</h1>
// //                 <p className={`flex items-center gap-2 mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
// //                   <FiMail className="text-violet-800 mt-1" /> {user?.email}
// //                 </p>
             


// //  <Link to={"/plandetail"} >
// // <div className="mt-3">
// //   {user?.plan && (
// //     <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-tighter border ${
// //       user?.plan.toLowerCase() === 'business'
// //         ? isDarkMode 
// //           ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
// //           : 'bg-emerald-50 border-emerald-200 text-emerald-700'
// //         : user?.plan.toLowerCase() === 'pro'
// //         ? isDarkMode 
// //           ? 'bg-violet-500/10 border-violet-500/40 text-violet-400' 
// //           : 'bg-violet-50 border-violet-200 text-violet-700'
// //         : isDarkMode // Default / Free
// //           ? 'bg-slate-500/10 border-slate-500/40 text-slate-400' 
// //           : 'bg-gray-100 border-gray-200 text-gray-600'
// //     }`}>
// //       {user?.plan} Account
// //     </span>
// //   )}
// // </div>
// // </Link>

// //               </div>
// //               <div className="flex gap-2">
// //                 <button onClick={() => setEditingUser({ name: user.name, email: user.email })} className={`px-5 py-2.5 ${theme.buttonPrimary} text-white rounded-xl font-medium flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg`}>
// //                   <FiEdit size={16}/> Edit
// //                 </button>


// //                 <button onClick={handleLogout} className={`px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all ${isDarkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
// //                   <LogOut size={16}/> Logout
// //                 </button>
// //               </div>
// //             </div>

// //             {/* PREFERENCES SECTION */}
// //             <div className={`mt-8 pt-8  ${isDarkMode ? 'border-slate-700' : 'border-gray-50'}`}>
// //               <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-gray-900'}`}>Preferences</h3>
// //               <div className={`flex items-center justify-between p-4 rounded-2xl transition-colors ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
// //                 <div className="flex items-center gap-3">
// //                   <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white text-indigo-600 shadow-sm'}`}>
// //                     {isDarkMode ? <FiMoon /> : <FiSun />}
// //                   </div>
// //                   <div>
// //                     <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</p>
// //                     <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Toggle dashboard appearance</p>
// //                   </div>
// //                 </div>
// //                 <button onClick={toggleTheme} className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}>
// //                   <motion.div animate={{ x: isDarkMode ? 24 : 2 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md" />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Information Grid */}
// //             <AnimatePresence mode="wait">
// //               {!editingUser ? (
// //                 <motion.div key="info" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
// //                   <InfoCard isDarkMode={isDarkMode} icon={<FiUser />} label="Full Name" value={user?.name} />
// //                   <InfoCard isDarkMode={isDarkMode} icon={<FiMail />} label="Email Address" value={user?.email} />
// //                   <InfoCard isDarkMode={isDarkMode} icon={<FiShield />} label="Account Role" value={user?.role} isBadge />
// //                 </motion.div>
// //               ) : (
// //                 <motion.div key="edit" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="py-8 space-y-4 max-w-lg">
// //                   <div className="space-y-1">
// //                     <label className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Display Name</label>
// //                     <input value={editingUser.name} onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white focus:ring-indigo-500' : 'bg-gray-50 border-gray-200 focus:ring-indigo-500'}`} />
// //                   </div>
// //                   <div className="space-y-1">
// //                     <label className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Email Address</label>
// //                     <input value={editingUser.email} onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white focus:ring-indigo-500' : 'bg-gray-50 border-gray-200 focus:ring-indigo-500'}`} />
// //                   </div>
                  
// //                   <div className="flex gap-3 pt-4">
// //                     <button disabled={actionLoading} onClick={handleUpdate} className="flex-1 bg-indigo-600 text-white py-2 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50">
// //                       {actionLoading ? "Saving..." : "Save Changes"}
// //                     </button>
// //                     <button onClick={() => setEditingUser(null)} className={`flex-1 py-3 rounded-xl font-bold ${isDarkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
// //                       Cancel
// //                     </button>
// //                   </div>
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>

// //             {/* Danger Zone */}
// //             <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-red-900/30' : 'border-red-50'}`}>
// //                <h3 className="text-red-500 font-bold mb-2">Danger Zone</h3>
// //                <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-500'} text-sm mb-4`}>Permanently delete your account and all forms.</p>
// //                <button onClick={() => setShowDeleteModal(true)} className="text-red-500 font-semibold flex items-center gap-2 hover:underline">
// //                  <FiTrash2 /> Delete Account
// //                </button>
// //             </div>
// //           </div>
// //         </motion.div>
// //       </main>

// //       {/* Delete Confirmation Modal */}
// //       <AnimatePresence>
// //         {showDeleteModal && (
// //           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
// //             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-900'}`}>
// //               <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
// //                 <FiTrash2 size={30} />
// //               </div>
// //               <h2 className="text-2xl font-bold">Are you sure?</h2>
// //               <p className={`mt-2 mb-8 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>This action is irreversible. All your data will be lost.</p>
// //               <div className="flex flex-col gap-3">
// //                 <input value={passcode} onChange={(e)=>setpasscode(e.target.value)} type="password" placeholder="Enter your Passcode" className={`w-full text-center py-3 rounded-xl font-semibold outline-none border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-100 border-gray-200'}`} />
// //                 <button disabled={actionLoading} onClick={handleDelete} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all">
// //                   {actionLoading ? "Deleting..." : "Yes, Delete My Account"}
// //                 </button>
// //                 <button onClick={() => setShowDeleteModal(false)} className={`w-full py-3 rounded-xl font-bold ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
// //                   No, Keep it
// //                 </button>
// //               </div>
// //             </motion.div>
// //           </div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //     <Footer/>
// //     </>
// //   );
// // };

// // const InfoCard = ({ icon, label, value, isBadge, isDarkMode }) => (
// //   <div className={`p-5 rounded-2xl border transition-all ${isDarkMode ? 'bg-slate-700/30 border-slate-700 hover:bg-slate-700/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'}`}>
// //     <div className="text-indigo-500 mb-3 text-xl">{icon}</div>
// //     <p className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>{label}</p>
// //     {isBadge ? (
// //       <span className={`mt-1 inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${isDarkMode ? 'bg-indigo-900/40 text-indigo-300' : 'bg-indigo-50 text-indigo-700'}`}>
// //         {value}
// //       </span>
// //     ) : (
// //       <p className={`font-semibold mt-1 break-all ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>{value}</p>
// //     )}
// //   </div>

// // );

// // export default ProfileSettings;



// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { FiEdit, FiTrash2, FiMail } from "react-icons/fi";
// import toast from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import { LogOut } from "lucide-react";
// import UserNavbar from "./UserNavbar";
// import { useNavigate, Link } from "react-router-dom";
// import Footer from "../landingPage/Footer";
// import LoadingScreen from "../shared/LoadingScreen";
// import UserFooter from "./userFooter";

// const ProfileSettings = () => {
//   const [user, setUser] = useState(null);
//   const [editingUser, setEditingUser] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [passcode, setpasscode] = useState("");

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const API_BASE = "https://formbuilder-saas-backend.onrender.com/api/users/profile";

//   const getUser = useCallback(async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(API_BASE, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data.data);
//     } catch (err) {
//       toast.error("Session expired. Please login again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     getUser();
//   }, [getUser]);

//   const handleUpdate = async () => {
//     if (!editingUser.name || !editingUser.email) return toast.error("Fields cannot be empty");
//     setActionLoading(true);
//     try {
//       const res = await axios.put(`${API_BASE}/update`, editingUser, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data.data);
//       localStorage.setItem("Name", res.data.data.name);
//       setEditingUser(null);
//       toast.success("Profile updated successfully");
//     } catch (err) {
//       toast.error("Update failed");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     setActionLoading(true);
//     try {
//       await axios.delete(`${API_BASE}/delete`, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { password: passcode }
//       });
//       localStorage.clear();
//       toast.success("Account deleted successfully");
//       navigate("/register");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Delete failed");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   if (loading) return <LoadingScreen />;

//   const labelClasses = "text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1";
//   const valueClasses = "text-gray-800 font-medium";

//   return (
//     <div className="min-h-screen bg-[#f9fafb] font-sans selection:bg-indigo-100">
//       <UserNavbar />

//       <main className="max-w-5xl mx-auto pt-12 pb-24 px-4">
//         <motion.div 
//           initial={{ opacity: 0, y: 10 }} 
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden"
//         >
//           {/* TOP SECTION: Avatar & Upload */}
//           <div className="p-10 flex items-center gap-8 border-b border-gray-50">
//             <div className="relative">
//               <img 
//                 src="https://i.pinimg.com/736x/9e/c0/f8/9ec0f877571edc437f89c15c08081533.jpg" 
//                 alt="Profile" 
//                 className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
//               />
//             </div>
            
//             <div className="flex flex-col gap-2">
//               <button className="w-fit px-4 py-1.5 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
//                 Upload new photo
//               </button>
//               <div className="space-y-0.5">
//                 <p className="text-xs text-gray-400">At least 800×800 px recommended.</p>
//                 <p className="text-xs text-gray-400">JPG or PNG is allowed</p>
//               </div>
//             </div>

//             <div className="ml-auto self-start flex gap-3">
//                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Logout">
//                  <LogOut size={20}/>
//                </button>
//             </div>
//           </div>

//           {/* BOTTOM SECTION: Info Card */}
//           <div className="p-10">
//             <div className="rounded-2xl border border-gray-100 p-8 bg-white">
//               <div className="flex justify-between items-center mb-10">
//                 <h2 className="font-bold text-xl text-gray-900">Profile Info</h2>
//                 <button 
//                   onClick={() => setEditingUser({ name: user.name, email: user.email })}
//                   className="px-5 py-1.5 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm transition-all"
//                 >
//                   Edit
//                 </button>
//               </div>

//               <AnimatePresence mode="wait">
//                 {!editingUser ? (
//                   <motion.div 
//                     key="display"
//                     initial={{ opacity: 0 }} 
//                     animate={{ opacity: 1 }}
//                     className="grid grid-cols-1 md:grid-cols-3 gap-10"
//                   >
//                     <div>
//                       <p className={labelClasses}>Full Name</p>
//                       <p className={`text-lg ${valueClasses}`}>{user?.name}</p>
//                     </div>
//                     <div>
//                       <p className={labelClasses}>Email</p>
//                       <p className={`text-lg ${valueClasses}`}>{user?.email}</p>
//                     </div>
//                     <div>
//                       <p className={labelClasses}>Phone Number</p>
//                       <p className={`text-lg ${valueClasses}`}>9016765427</p> 
//                     </div>
//                   </motion.div>
//                 ) : (
//                   <motion.div 
//                     key="edit"
//                     initial={{ opacity: 0, scale: 0.98 }} 
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="grid grid-cols-1 md:grid-cols-2 gap-6"
//                   >
//                     <div className="space-y-2">
//                       <label className={labelClasses}>Full Name</label>
//                       <input 
//                         value={editingUser.name} 
//                         onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} 
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-indigo-500 transition-all" 
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <label className={labelClasses}>Email Address</label>
//                       <input 
//                         value={editingUser.email} 
//                         onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} 
//                         className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-indigo-500 transition-all" 
//                       />
//                     </div>
//                     <div className="flex gap-3 mt-4 md:col-span-2">
//                       <button 
//                         onClick={handleUpdate} 
//                         disabled={actionLoading} 
//                         className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 disabled:opacity-50"
//                       >
//                         {actionLoading ? "Saving..." : "Save Changes"}
//                       </button>
//                       <button 
//                         onClick={() => setEditingUser(null)} 
//                         className="px-8 py-2.5 text-gray-500 font-bold hover:underline"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Plan and Danger Zone */}
//             <div className="mt-12 flex items-center justify-between">
//               <Link to="/plandetail" className="group flex items-center gap-2">
//                 <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
//                   {user?.plan} Membership
//                 </span>
//                 <div className="h-px w-8 bg-indigo-100 group-hover:w-12 transition-all"></div>
//               </Link>

//               <button 
//                 onClick={() => setShowDeleteModal(true)} 
//                 className="text-xs font-semibold text-gray-300 hover:text-red-500 transition-colors flex items-center gap-2"
//               >
//                 <FiTrash2 size={14}/> Close Account
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </main>

//       {/* Delete Modal */}
//       <AnimatePresence>
//         {showDeleteModal && (
//           <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
//             <motion.div 
//               initial={{ scale: 0.95, opacity: 0 }} 
//               animate={{ scale: 1, opacity: 1 }} 
//               className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
//             >
//               <h2 className="text-xl font-bold mb-2">Delete Account?</h2>
//               <p className="text-sm text-gray-400 mb-6">Enter your passcode to confirm.</p>
//               <input 
//                 type="password" 
//                 value={passcode} 
//                 onChange={(e)=>setpasscode(e.target.value)} 
//                 placeholder="••••" 
//                 className="w-full text-center py-3 rounded-xl mb-4 border border-gray-100 bg-gray-50 outline-none" 
//               />
//               <div className="flex flex-col gap-2">
//                 <button onClick={handleDelete} className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors">Confirm Deletion</button>
//                 <button onClick={() => setShowDeleteModal(false)} className="w-full py-3 text-gray-400 font-bold hover:underline">Cancel</button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//   <UserFooter/>
//     </div>
//   );
// };

// export default ProfileSettings;



// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { FiEdit, FiTrash2, FiUser, FiMail, FiPhone } from "react-icons/fi";
// import toast from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import { LogOut, Loader2 } from "lucide-react";
// import UserNavbar from "./UserNavbar";
// import { useNavigate, Link } from "react-router-dom";
// import { useFormContext } from "../dashboard/FormContext";
// import UserFooter from "./userFooter";

// const ProfileSettings = () => {
//   const [user, setUser] = useState(null);
//   const [editingUser, setEditingUser] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [passcode, setpasscode] = useState("");

//   const navigate = useNavigate();
//  // const token = localStorage.getItem("token");
//  const token = sessionStorage.getItem("token");
//   const API_BASE = "https://formbuilder-saas-backend.onrender.com/api/users/profile";

//   const getUser = useCallback(async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(API_BASE, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data.data);
//     } catch (err) {
//       toast.error("Session expired. Please login again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     getUser();
//   }, [getUser]);

//   const handleUpdate = async () => {
//     if (!editingUser.name || !editingUser.email) return toast.error("Fields cannot be empty");
//     setActionLoading(true);
//     try {
//       const res = await axios.put(`${API_BASE}/update`, editingUser, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data.data);
//       sessionStorage.setItem("Name", res.data.data.name);
//       setEditingUser(null);
//       toast.success("Profile updated successfully");
//     } catch (err) {
//       toast.error("Update failed");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     setActionLoading(true);
//     try {
//       await axios.delete(`${API_BASE}/delete`, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { password: passcode }
//       });
//       sessionStorage.clear();
//       toast.success("Account deleted successfully");
//       navigate("/register");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Delete failed");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     //localStorage.clear();
//        sessionStorage.clear();
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   const labelClasses = "text-[11px] font-semibold uppercase tracking-wider mb-1 text-gray-400";
//   const valueClasses = "text-lg font-medium text-gray-800";

//   return (
//     <>
//       <div className="min-h-screen bg-[#f9fafb] transition-colors duration-300 font-sans selection:bg-indigo-100">
//         <UserNavbar />

//         <main className="max-w-7xl w-full mx-auto pt-12 pb-24 px-4 md:px-6">
//           <motion.div 
//             initial={{ opacity: 0, y: 10 }} 
//             animate={{ opacity: 1, y: 0 }}
//             className="rounded-3xl border bg-white border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden"
//           >
//             {loading ? (
//               <div className="h-[500px] flex flex-col items-center justify-center gap-4">
//                 <Loader2 className="w-8 h-8 text-[#2B4BAB] animate-spin" />
//                 <p className="text-gray-500 font-medium">Loading your profile...</p>
//               </div>
//             ) : (
//               <>
//                 {/* TOP SECTION: User Welcome */}
//                 <div className="p-10 flex items-center gap-8">
//                   <div className="relative">
//                     <img 
//                       src="https://i.pinimg.com/736x/9e/c0/f8/9ec0f877571edc437f89c15c08081533.jpg" 
//                       alt="Profile" 
//                       className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
//                     />
//                   </div>
                  
//                   <div className="flex flex-col gap-1">
//                     <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
//                     <p className="text-gray-500">Manage your account settings and preferences here.</p>
//                   </div>

//                   {/* <div className="ml-auto self-start">
//                     <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Logout">
//                       <LogOut size={22}/>
//                     </button>
//                   </div>
//                 </div> */}

//                  <div className="ml-auto self-start flex gap-3">
//                <button 
//                   onClick={toggleTheme} 
//                   className={`p-2 rounded-lg transition-all ${isDarkMode ? "bg-slate-700 text-yellow-400" : "bg-gray-100 text-gray-500"}`}
//                 >
//                   {isDarkMode ? <FiSun size={20}/> : <FiMoon size={20}/>}
//                </button>
//                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Logout">
//                  <LogOut size={20}/>
//                </button>
//             </div> 

//                 <div className="mx-10 border-b border-gray-100"></div>

//                 {/* BOTTOM SECTION: Info Card */}
//                 <div className="px-10 pb-10 mt-10">
//                   <div className="rounded-2xl border border-gray-200 bg-white p-8">
//                     <div className="flex justify-between items-center mb-10">
//                       <h2 className="font-bold text-xl text-gray-900">Account Details</h2>
//                       {!editingUser && (
//                         <button 
//                           onClick={() => setEditingUser({ name: user.name, email: user.email })}
//                           className="px-5 py-1.5 text-sm font-semibold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm transition-all"
//                         >
//                           Edit Profile
//                         </button>
//                       )}
//                     </div>

//                     <AnimatePresence mode="wait">
//                       {!editingUser ? (
//                         <motion.div 
//                           key="display"
//                           initial={{ opacity: 0 }} 
//                           animate={{ opacity: 1 }}
//                           className="grid grid-cols-1 md:grid-cols-3 gap-8"
//                         >
//                           <div className="flex items-start gap-4">
//                             <div className="p-3 bg-indigo-50 rounded-xl text-[#2B4BAB]"><FiUser size={20}/></div>
//                             <div>
//                               <p className={labelClasses}>Full Name</p>
//                               <p className={valueClasses}>{user?.name}</p>
//                             </div>
//                           </div>
//                           <div className="flex items-start gap-4">
//                             <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><FiMail size={20}/></div>
//                             <div>
//                               <p className={labelClasses}>Email Address</p>
//                               <p className={valueClasses}>{user?.email}</p>
//                             </div>
//                           </div>
//                           <div className="flex items-start gap-4">
//                             <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><FiPhone size={20}/></div>
//                             <div>
//                               <p className={labelClasses}>Phone Number</p>
//                               <p className={valueClasses}>+91 9016765427</p> 
//                             </div>
//                           </div>
//                         </motion.div>
//                       ) : (
//                         <motion.div 
//                           key="edit"
//                           initial={{ opacity: 0, scale: 0.98 }} 
//                           animate={{ opacity: 1, scale: 1 }}
//                           className="grid grid-cols-1 md:grid-cols-2 gap-6"
//                         >
//                           <div className="space-y-2">
//                             <label className={labelClasses}>Full Name</label>
//                             <input 
//                               value={editingUser.name} 
//                               onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} 
//                               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-indigo-500 transition-all" 
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <label className={labelClasses}>Email Address</label>
//                             <input 
//                               value={editingUser.email} 
//                               onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} 
//                               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-[#2B4BAB] transition-all" 
//                             />
//                           </div>
//                           <div className="flex gap-3 mt-4 md:col-span-2">
//                             <button 
//                               onClick={handleUpdate} 
//                               disabled={actionLoading} 
//                               className="px-8 py-2.5 bg-[#2B4BAB] text-white rounded-xl font-bold hover:bg-[#2B4BAB] shadow-lg shadow-indigo-500/20 disabled:opacity-50 transition-all"
//                             >
//                               {actionLoading ? "Saving Changes..." : "Save Changes"}
//                             </button>
//                             <button 
//                               onClick={() => setEditingUser(null)} 
//                               className="px-8 py-2.5 font-bold text-gray-500 hover:text-gray-700 transition-colors"
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   {/* Plan and Danger Zone */}
//                   <div className="mt-12 flex items-center justify-between">
//                     <Link to="/plandetail" className="group flex items-center gap-2">
//                       <span className="text-xs font-bold uppercase tracking-widest text-[#2B4BAB]">
//                         {user?.plan || 'Free'} Membership
//                       </span>
//                       <div className="h-px w-8 bg-indigo-100 transition-all group-hover:w-12"></div>
//                     </Link>

//                     <button 
//                       onClick={() => setShowDeleteModal(true)} 
//                       className="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2"
//                     >
//                       <FiTrash2 size={14}/> Close Account
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </motion.div>
//         </main>

//         {/* Delete Modal */}
//         <AnimatePresence>
//           {showDeleteModal && (
//             <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
//               <motion.div 
//                 initial={{ scale: 0.95, opacity: 0 }} 
//                 animate={{ scale: 1, opacity: 1 }} 
//                 className="rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl bg-white text-gray-900"
//               >
//                 <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <FiTrash2 size={24}/>
//                 </div>
//                 <h2 className="text-xl font-bold mb-2">Delete Account?</h2>
//                 <p className="text-sm mb-6 text-gray-500">This action is permanent. Please enter your passcode to confirm.</p>
//                 <input 
//                   type="password" 
//                   value={passcode} 
//                   onChange={(e)=>setpasscode(e.target.value)} 
//                   placeholder="••••" 
//                   className="w-full text-center py-3 rounded-xl mb-4 border border-gray-100 bg-gray-50 outline-none focus:border-red-500 transition-all" 
//                 />
//                 <div className="flex flex-col gap-2">
//                   <button 
//                     onClick={handleDelete} 
//                     disabled={actionLoading}
//                     className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
//                   >
//                     {actionLoading ? "Deleting..." : "Confirm Deletion"}
//                   </button>
//                   <button onClick={() => setShowDeleteModal(false)} className="w-full py-3 font-bold text-gray-400 hover:text-gray-600 transition-colors">Cancel</button>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>
//       </div>
//       <UserFooter/>
//     </>
//   );
// };

// export default ProfileSettings;



import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiUser, FiMail, FiPhone } from "react-icons/fi";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Loader2, CheckCircle } from "lucide-react";
import UserNavbar from "./UserNavbar";
import { useNavigate, Link } from "react-router-dom";
import { useFormContext } from "../dashboard/FormContext";
import UserFooter from "./userFooter";

const ProfileSettings = () => {
  // Keeping context for compatibility, but fixing to light mode branding
  const { isDarkMode } = useFormContext(); 
  const [user, setUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [passcode, setpasscode] = useState("");

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const API_BASE = "https://formbuilder-saas-backend.onrender.com/api/users/profile";

  const getUser = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(API_BASE, {
        headers: { Authorization:`Bearer ${token}` },
      });
     
      setUser(res.data.data);
    } catch (err) {
      toast.error("Session expired. Please login again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleUpdate = async () => {
    if (!editingUser.name || !editingUser.email) return toast.error("Fields cannot be empty");
    setActionLoading(true);
    try {
      const res = await axios.put(`${API_BASE}/update`, editingUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data);
      sessionStorage.setItem("Name", res.data.data.name);
      setEditingUser(null);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await axios.delete(`${API_BASE}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { password: passcode }
      });
      sessionStorage.clear();
      toast.success("Account deleted successfully");
      navigate("/register");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const labelClasses = "text-[11px] font-bold uppercase tracking-[0.1em] mb-1 text-[#2B4BAB]/60";
  const valueClasses = "text-lg font-semibold text-slate-800";

  return (
    <>
      <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-blue-100">
        <UserNavbar />

        <main className="max-w-7xl w-full mx-auto pt-12 pb-24 px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_15px_40px_rgba(43,75,171,0.06)] overflow-hidden"
          >
            {loading ? (
              <div className="h-[500px] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-[#2B4BAB] animate-spin" />
                <p className="text-slate-400 font-medium">Loading your profile details...</p>
              </div>
            ) : (
              <>
                {/* TOP SECTION: Avatar & Welcome */}
                <div className="p-10 flex flex-col md:flex-row items-center gap-8 bg-white">
                  <div className="relative group">
               
  <div className="w-28 h-28 rounded-3xl flex items-center justify-center text-white text-3xl font-bold bg-[#2B4BAB]  shadow-xl shadow-[#2B4BAB]/20">
    {user?.name?.charAt(0)?.toUpperCase()}
  </div>
                    <div className="absolute -bottom-2 -right-2 bg-gray-400 text-white p-1.5 rounded-lg border-2 border-white">
                        <CheckCircle size={14} />
                    </div>
                  </div>
                  
                  <div className="flex flex-col text-center md:text-left">
                    <h1 className="text-2xl font-bold text-slate-900">
                      Welcome back, <span className="text-[#2B4BAB]">{user?.name?.split(' ')[0]}!</span>
                    </h1>
                    <p className="text-slate-400 font-medium mt-1">
                      Manage your personal info, security, and membership.
                    </p>
                  </div>

                  <div className="md:ml-auto flex gap-3">
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-500 font-bold hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
                    >
                      <LogOut size={18}/> Logout
                    </button>
                  </div>
                </div>

                <div className="mx-10 border-t border-slate-50"></div>

                {/* BOTTOM SECTION: Info Card */}
                <div className="p-10">
                  <div className="rounded-[2rem] border border-slate-100 p-8 md:p-10 bg-[#FBFDFF]">
                    <div className="flex justify-between items-center mb-10">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-[#2B4BAB] rounded-full"></div>
                        <h2 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Profile Information</h2>
                      </div>
                      
                      {!editingUser && (
                        <button 
                          onClick={() => setEditingUser({ name: user.name, email: user.email })}
                          className="px-6 py-2.5 text-sm font-bold rounded-xl bg-[#2B4BAB] text-white hover:bg-[#1e3a8a] shadow-lg shadow-[#2B4BAB]/20 transition-all active:scale-95"
                        >
                          Edit Profile
                        </button>
                      )}
                    </div>

                    <AnimatePresence mode="wait">
                      {!editingUser ? (
                        <motion.div 
                          key="display"
                          initial={{ opacity: 0, x: 10 }} 
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                          <div className="space-y-1">
                            <p className={labelClasses}>Full Name</p>
                            <p className={valueClasses}>{user?.name}</p>
                          </div>
                          <div className="space-y-1">
                            <p className={labelClasses}>Email Address</p>
                            <p className={valueClasses}>{user?.email}</p>
                          </div>
                          <div className="space-y-1">
                            <p className={labelClasses}>Role</p>
                            <p className={valueClasses} >{user?.role}</p> 
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="edit"
                          initial={{ opacity: 0, scale: 0.99 }} 
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.99 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                          <div className="space-y-2">
                            <label className={labelClasses}>Full Name</label>
                            <input 
                              value={editingUser.name} 
                              onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} 
                              className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none focus:border-[#2B4BAB] focus:ring-4 focus:ring-[#2B4BAB]/5 transition-all font-medium"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className={labelClasses}>Email Address</label>
                            <input 
                              value={editingUser.email} 
                              onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} 
                              className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none focus:border-[#2B4BAB] focus:ring-4 focus:ring-[#2B4BAB]/5 transition-all font-medium"
                            />
                          </div>
                          <div className="flex gap-4 mt-4 md:col-span-2">
                            <button 
                              onClick={handleUpdate} 
                              disabled={actionLoading} 
                              className="px-8 py-3 bg-[#2B4BAB] text-white rounded-2xl font-bold hover:bg-[#1e3a8a] shadow-xl shadow-blue-500/20 disabled:opacity-50 transition-all active:scale-95"
                            >
                              {actionLoading ? "Updating..." : "Save Changes"}
                            </button>
                            <button 
                              onClick={() => setEditingUser(null)} 
                              className="px-8 py-3 text-slate-500 font-bold hover:text-slate-800 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Plan and Danger Zone */}
                  <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                    <Link to="/plandetail" className="group flex items-center gap-3">
                      <div className="px-3 py-1 bg-[#2B4BAB]/5 text-[#2B4BAB] rounded-lg text-xs font-black uppercase tracking-widest">
                        {user?.plan} Membership
                      </div>
                      <div className="h-px w-8 bg-slate-200 transition-all group-hover:w-16 group-hover:bg-[#2B4BAB]"></div>
                    </Link>

                    <button 
                      onClick={() => setShowDeleteModal(true)} 
                      className="text-sm font-bold text-slate-300 hover:text-red-500 transition-all flex items-center gap-2"
                    >
                      <FiTrash2 size={16}/> Deactivate Account
                    </button>
                  </div> 
                </div>
              </>
            )}
          </motion.div>
        </main>

        {/* Delete Modal */}
        <AnimatePresence>
          {showDeleteModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl border border-slate-100"
              >
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FiTrash2 size={30} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Are you sure?</h2>
                <p className="text-slate-500 text-sm mb-8 font-medium">Please enter your passcode to permanently delete your account.</p>
                <input 
                  type="password" 
                  value={passcode} 
                  onChange={(e)=>setpasscode(e.target.value)} 
                  placeholder="••••" 
                  className="w-full text-center py-4 rounded-2xl mb-6 border border-slate-200 outline-none focus:border-red-500 transition-all text-xl tracking-[0.5em] font-bold bg-slate-50" 
                />
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleDelete} 
                    className="w-full bg-red-600 text-white py-4 rounded-2xl font-black hover:bg-red-700 transition-colors shadow-lg shadow-red-100 active:scale-95"
                  >
                    Confirm Deletion
                  </button>
                  <button 
                    onClick={() => setShowDeleteModal(false)} 
                    className="w-full py-2 font-bold text-slate-400 hover:text-slate-600 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
      <UserFooter />
    </>
  );
};

export default ProfileSettings;