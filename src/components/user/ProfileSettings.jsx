// // import React, { useState, useEffect, useCallback } from "react";
// // import axios from "axios";
// // import { FiEdit, FiTrash2, FiUser, FiMail, FiPhone } from "react-icons/fi";
// // import toast from "react-hot-toast";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { LogOut, Loader2, CheckCircle } from "lucide-react";
// // import UserNavbar from "./UserNavbar";
// // import { useNavigate, Link } from "react-router-dom";
// // import { useFormContext } from "../dashboard/FormContext";
// // import UserFooter from "./userFooter";

// // const ProfileSettings = () => {
// //   // Keeping context for compatibility, but fixing to light mode branding
// //   const { isDarkMode } = useFormContext(); 
// //   const [user, setUser] = useState(null);
// //   const [editingUser, setEditingUser] = useState(null);
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [actionLoading, setActionLoading] = useState(false);
// //   const [passcode, setpasscode] = useState("");

// //   const navigate = useNavigate();
// //   const token = sessionStorage.getItem("token");
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
// //       sessionStorage.setItem("Name", res.data.data.name);
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
// //       sessionStorage.clear();
// //       toast.success("Account deleted successfully");
// //       navigate("/register");
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Delete failed");
// //     } finally {
// //       setActionLoading(false);
// //     }
// //   };

// //   const handleLogout = () => {
// //     sessionStorage.clear();
// //     toast.success("Logged out successfully");
// //     navigate("/login");
// //   };

// //   const labelClasses = "text-[11px] font-bold uppercase tracking-[0.1em] mb-1 text-[#2B4BAB]/60";
// //   const valueClasses = "text-lg font-semibold text-slate-800";

// //   return (
// //     <>
// //       <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-blue-100">
// //         <UserNavbar />

// //         <main className="max-w-6xl w-full mx-auto pt-12 pb-24 px-4 md:px-6">
// //           <motion.div 
// //             initial={{ opacity: 0, y: 20 }} 
// //             animate={{ opacity: 1, y: 0 }}
// //             className="rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_15px_40px_rgba(43,75,171,0.06)] overflow-hidden"
// //           >
// //             {loading ? (
// //               <div className="h-[500px] flex flex-col items-center justify-center gap-4">
// //                 <Loader2 className="w-10 h-10 text-[#2B4BAB] animate-spin" />
// //                 <p className="text-slate-400 font-medium">Loading your profile details...</p>
// //               </div>
// //             ) : (
// //               <>
// //                 {/* TOP SECTION: Avatar & Welcome */}
// //                 <div className="p-10 flex flex-col md:flex-row items-center gap-8 bg-white">
// //                   <div className="relative group">
// //                     <img 
// //                       src="https://i.pinimg.com/736x/9e/c0/f8/9ec0f877571edc437f89c15c08081533.jpg" 
// //                       alt="Profile" 
// //                       className="w-28 h-28 rounded-3xl object-cover border-4 border-white shadow-xl shadow-[#2B4BAB]/10"
// //                     />
// //                     <div className="absolute -bottom-2 -right-2 bg-[#2B4BAB] text-white p-1.5 rounded-lg border-2 border-white">
// //                         <CheckCircle size={14} />
// //                     </div>
// //                   </div>
                  
// //                   <div className="flex flex-col text-center md:text-left">
// //                     <h1 className="text-2xl font-bold text-slate-900">
// //                       Welcome back, <span className="text-[#2B4BAB]">{user?.name?.split(' ')[0]}!</span>
// //                     </h1>
// //                     <p className="text-slate-400 font-medium mt-1">
// //                       Manage your personal info, security, and membership.
// //                     </p>
// //                   </div>

// //                   <div className="md:ml-auto flex gap-3">
// //                     <button 
// //                       onClick={handleLogout} 
// //                       className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-500 font-bold hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
// //                     >
// //                       <LogOut size={18}/> Logout
// //                     </button>
// //                   </div>
// //                 </div>

// //                 <div className="mx-10 border-t border-slate-50"></div>

// //                 {/* BOTTOM SECTION: Info Card */}
// //                 <div className="p-10">
// //                   <div className="rounded-[2rem] border border-slate-100 p-8 md:p-10 bg-[#FBFDFF]">
// //                     <div className="flex justify-between items-center mb-10">
// //                       <div className="flex items-center gap-3">
// //                         <div className="w-1.5 h-6 bg-[#2B4BAB] rounded-full"></div>
// //                         <h2 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Profile Information</h2>
// //                       </div>
                      
// //                       {!editingUser && (
// //                         <button 
// //                           onClick={() => setEditingUser({ name: user.name, email: user.email })}
// //                           className="px-6 py-2.5 text-sm font-bold rounded-xl bg-[#2B4BAB] text-white hover:bg-[#1e3a8a] shadow-lg shadow-[#2B4BAB]/20 transition-all active:scale-95"
// //                         >
// //                           Edit Profile
// //                         </button>
// //                       )}
// //                     </div>

// //                     <AnimatePresence mode="wait">
// //                       {!editingUser ? (
// //                         <motion.div 
// //                           key="display"
// //                           initial={{ opacity: 0, x: 10 }} 
// //                           animate={{ opacity: 1, x: 0 }}
// //                           exit={{ opacity: 0, x: -10 }}
// //                           className="grid grid-cols-1 md:grid-cols-3 gap-8"
// //                         >
// //                           <div className="space-y-1">
// //                             <p className={labelClasses}>Full Name</p>
// //                             <p className={valueClasses}>{user?.name}</p>
// //                           </div>
// //                           <div className="space-y-1">
// //                             <p className={labelClasses}>Email Address</p>
// //                             <p className={valueClasses}>{user?.email}</p>
// //                           </div>
// //                           <div className="space-y-1">
// //                             <p className={labelClasses}>Phone Number</p>
// //                             <p className={valueClasses}>+91 9016765427</p> 
// //                           </div>
// //                         </motion.div>
// //                       ) : (
// //                         <motion.div 
// //                           key="edit"
// //                           initial={{ opacity: 0, scale: 0.99 }} 
// //                           animate={{ opacity: 1, scale: 1 }}
// //                           exit={{ opacity: 0, scale: 0.99 }}
// //                           className="grid grid-cols-1 md:grid-cols-2 gap-6"
// //                         >
// //                           <div className="space-y-2">
// //                             <label className={labelClasses}>Full Name</label>
// //                             <input 
// //                               value={editingUser.name} 
// //                               onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} 
// //                               className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none focus:border-[#2B4BAB] focus:ring-4 focus:ring-[#2B4BAB]/5 transition-all font-medium"
// //                             />
// //                           </div>
// //                           <div className="space-y-2">
// //                             <label className={labelClasses}>Email Address</label>
// //                             <input 
// //                               value={editingUser.email} 
// //                               onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} 
// //                               className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none focus:border-[#2B4BAB] focus:ring-4 focus:ring-[#2B4BAB]/5 transition-all font-medium"
// //                             />
// //                           </div>
// //                           <div className="flex gap-4 mt-4 md:col-span-2">
// //                             <button 
// //                               onClick={handleUpdate} 
// //                               disabled={actionLoading} 
// //                               className="px-8 py-3 bg-[#2B4BAB] text-white rounded-2xl font-bold hover:bg-[#1e3a8a] shadow-xl shadow-blue-500/20 disabled:opacity-50 transition-all active:scale-95"
// //                             >
// //                               {actionLoading ? "Updating..." : "Save Changes"}
// //                             </button>
// //                             <button 
// //                               onClick={() => setEditingUser(null)} 
// //                               className="px-8 py-3 text-slate-500 font-bold hover:text-slate-800 transition-all"
// //                             >
// //                               Cancel
// //                             </button>
// //                           </div>
// //                         </motion.div>
// //                       )}
// //                     </AnimatePresence>
// //                   </div>

// //                   {/* Plan and Danger Zone */}
// //                   <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
// //                     <Link to="/plandetail" className="group flex items-center gap-3">
// //                       <div className="px-3 py-1 bg-[#2B4BAB]/5 text-[#2B4BAB] rounded-lg text-xs font-black uppercase tracking-widest">
// //                         {user?.plan} Membership
// //                       </div>
// //                       <div className="h-px w-8 bg-slate-200 transition-all group-hover:w-16 group-hover:bg-[#2B4BAB]"></div>
// //                     </Link>

// //                     <button 
// //                       onClick={() => setShowDeleteModal(true)} 
// //                       className="text-sm font-bold text-slate-300 hover:text-red-500 transition-all flex items-center gap-2"
// //                     >
// //                       <FiTrash2 size={16}/> Deactivate Account
// //                     </button>
// //                   </div> 
// //                 </div>
// //               </>
// //             )}
// //           </motion.div>
// //         </main>

// //         {/* Delete Modal */}
// //         <AnimatePresence>
// //           {showDeleteModal && (
// //             <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
// //               <motion.div 
// //                 initial={{ scale: 0.9, opacity: 0 }} 
// //                 animate={{ scale: 1, opacity: 1 }} 
// //                 exit={{ scale: 0.9, opacity: 0 }}
// //                 className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl border border-slate-100"
// //               >
// //                 <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
// //                   <FiTrash2 size={30} />
// //                 </div>
// //                 <h2 className="text-2xl font-black text-slate-900 mb-2">Are you sure?</h2>
// //                 <p className="text-slate-500 text-sm mb-8 font-medium">Please enter your passcode to permanently delete your account.</p>
// //                 <input 
// //                   type="password" 
// //                   value={passcode} 
// //                   onChange={(e)=>setpasscode(e.target.value)} 
// //                   placeholder="••••" 
// //                   className="w-full text-center py-4 rounded-2xl mb-6 border border-slate-200 outline-none focus:border-red-500 transition-all text-xl tracking-[0.5em] font-bold bg-slate-50" 
// //                 />
// //                 <div className="flex flex-col gap-3">
// //                   <button 
// //                     onClick={handleDelete} 
// //                     className="w-full bg-red-600 text-white py-4 rounded-2xl font-black hover:bg-red-700 transition-colors shadow-lg shadow-red-100 active:scale-95"
// //                   >
// //                     Confirm Deletion
// //                   </button>
// //                   <button 
// //                     onClick={() => setShowDeleteModal(false)} 
// //                     className="w-full py-2 font-bold text-slate-400 hover:text-slate-600 transition-all"
// //                   >
// //                     Cancel
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             </div>
// //           )}
// //         </AnimatePresence>
// //       </div>
// //       <UserFooter />
// //     </>
// //   );
// // };

// // export default ProfileSettings;


// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { FiEdit, FiTrash2, FiUser, FiMail, FiPhone } from "react-icons/fi";
// import toast from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import { LogOut, Loader2, CheckCircle } from "lucide-react";
// import UserNavbar from "./UserNavbar";
// import { useNavigate, Link } from "react-router-dom";
// import { useFormContext } from "../dashboard/FormContext";
// import UserFooter from "./UserFooter";

// const ProfileSettings = () => {
//   // Keeping context for compatibility, but fixing to light mode branding
//   const { isDarkMode } = useFormContext(); 
//   const [user, setUser] = useState(null);
//   const [editingUser, setEditingUser] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [passcode, setpasscode] = useState("");

//   const navigate = useNavigate();
//   const token = sessionStorage.getItem("token");
//   const API_BASE = "https://formbuilder-saas-backend.onrender.com/api/users/profile";

//   const getUser = useCallback(async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(API_BASE, {
//         headers: { Authorization:`Bearer ${token}` },
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
//     sessionStorage.clear();
//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   const labelClasses = "text-[11px] font-bold uppercase tracking-[0.1em] mb-1 text-[#2B4BAB]/60";
//   const valueClasses = "text-lg font-semibold text-slate-800";

//   return (
//     <>
//       <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-blue-100">
//         <UserNavbar />

//         <main className="max-w-7xl w-full mx-auto pt-12 pb-24 px-4 md:px-6">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }} 
//             animate={{ opacity: 1, y: 0 }}
//             className="rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_15px_40px_rgba(43,75,171,0.06)] overflow-hidden"
//           >
//             {loading ? (
//               <div className="h-[500px] flex flex-col items-center justify-center gap-4">
//                 <Loader2 className="w-10 h-10 text-[#2B4BAB] animate-spin" />
//                 <p className="text-slate-400 font-medium">Loading your profile details...</p>
//               </div>
//             ) : (
//               <>
//                 {/* TOP SECTION: Avatar & Welcome */}
//                 <div className="p-10 flex flex-col md:flex-row items-center gap-8 bg-white">
//                   <div className="relative group">
               
//   <div className="w-28 h-28 rounded-3xl flex items-center justify-center text-white text-3xl font-bold bg-[#2B4BAB]  shadow-xl shadow-[#2B4BAB]/20">
//     {user?.name?.charAt(0)?.toUpperCase()}
//   </div>
//                     <div className="absolute -bottom-2 -right-2 bg-gray-400 text-white p-1.5 rounded-lg border-2 border-white">
//                         <CheckCircle size={14} />
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col text-center md:text-left">
//                     <h1 className="text-2xl font-bold text-slate-900">
//                       Welcome back, <span className="text-[#2B4BAB]">{user?.name?.split(' ')[0]}!</span>
//                     </h1>
//                     <p className="text-slate-400 font-medium mt-1">
//                       Manage your personal info, security, and membership.
//                     </p>
//                   </div>

//                   <div className="md:ml-auto flex gap-3">
//                     <button 
//                       onClick={handleLogout} 
//                       className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-500 font-bold hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
//                     >
//                       <LogOut size={18}/> Logout
//                     </button>
//                   </div>
//                 </div>

//                 <div className="mx-10 border-t border-slate-50"></div>

//                 {/* BOTTOM SECTION: Info Card */}
//                 <div className="p-10">
//                   <div className="rounded-[2rem] border border-slate-100 p-8 md:p-10 bg-[#FBFDFF]">
//                     <div className="flex justify-between items-center mb-10">
//                       <div className="flex items-center gap-3">
//                         <div className="w-1.5 h-6 bg-[#2B4BAB] rounded-full"></div>
//                         <h2 className="font-bold text-lg text-slate-900 uppercase tracking-tight">Profile Information</h2>
//                       </div>
                      
//                       {!editingUser && (
//                         <button 
//                           onClick={() => setEditingUser({ name: user.name, email: user.email })}
//                           className="px-6 py-2.5 text-sm font-bold rounded-xl bg-[#2B4BAB] text-white hover:bg-[#1e3a8a] shadow-lg shadow-[#2B4BAB]/20 transition-all active:scale-95"
//                         >
//                           Edit Profile
//                         </button>
//                       )}
//                     </div>

//                     <AnimatePresence mode="wait">
//                       {!editingUser ? (
//                         <motion.div 
//                           key="display"
//                           initial={{ opacity: 0, x: 10 }} 
//                           animate={{ opacity: 1, x: 0 }}
//                           exit={{ opacity: 0, x: -10 }}
//                           className="grid grid-cols-1 md:grid-cols-3 gap-8"
//                         >
//                           <div className="space-y-1">
//                             <p className={labelClasses}>Full Name</p>
//                             <p className={valueClasses}>{user?.name}</p>
//                           </div>
//                           <div className="space-y-1">
//                             <p className={labelClasses}>Email Address</p>
//                             <p className={valueClasses}>{user?.email}</p>
//                           </div>
//                           <div className="space-y-1">
//                             <p className={labelClasses}>Role</p>
//                             <p className={valueClasses} >{user?.role}</p> 
//                           </div>
//                         </motion.div>
//                       ) : (
//                         <motion.div 
//                           key="edit"
//                           initial={{ opacity: 0, scale: 0.99 }} 
//                           animate={{ opacity: 1, scale: 1 }}
//                           exit={{ opacity: 0, scale: 0.99 }}
//                           className="grid grid-cols-1 md:grid-cols-2 gap-6"
//                         >
//                           <div className="space-y-2">
//                             <label className={labelClasses}>Full Name</label>
//                             <input 
//                               value={editingUser.name} 
//                               onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} 
//                               className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none focus:border-[#2B4BAB] focus:ring-4 focus:ring-[#2B4BAB]/5 transition-all font-medium"
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <label className={labelClasses}>Email Address</label>
//                             <input 
//                               value={editingUser.email} 
//                               onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} 
//                               className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 outline-none focus:border-[#2B4BAB] focus:ring-4 focus:ring-[#2B4BAB]/5 transition-all font-medium"
//                             />
//                           </div>
//                           <div className="flex gap-4 mt-4 md:col-span-2">
//                             <button 
//                               onClick={handleUpdate} 
//                               disabled={actionLoading} 
//                               className="px-8 py-3 bg-[#2B4BAB] text-white rounded-2xl font-bold hover:bg-[#1e3a8a] shadow-xl shadow-blue-500/20 disabled:opacity-50 transition-all active:scale-95"
//                             >
//                               {actionLoading ? "Updating..." : "Save Changes"}
//                             </button>
//                             <button 
//                               onClick={() => setEditingUser(null)} 
//                               className="px-8 py-3 text-slate-500 font-bold hover:text-slate-800 transition-all"
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   {/* Plan and Danger Zone */}
//                   <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
//                     <Link to="/plandetail" className="group flex items-center gap-3">
//                       <div className="px-3 py-1 bg-[#2B4BAB]/5 text-[#2B4BAB] rounded-lg text-xs font-black uppercase tracking-widest">
//                         {user?.plan} Plan
//                       </div>
//                       <div className="h-px w-8 bg-slate-200 transition-all group-hover:w-16 group-hover:bg-[#2B4BAB]"></div>
//                     </Link>

//                     <button 
//                       onClick={() => setShowDeleteModal(true)} 
//                       className="text-sm font-bold text-slate-300 hover:text-red-500 transition-all flex items-center gap-2"
//                     >
//                       <FiTrash2 size={16}/> Deactivate Account
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
//             <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
//               <motion.div 
//                 initial={{ scale: 0.9, opacity: 0 }} 
//                 animate={{ scale: 1, opacity: 1 }} 
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full text-center shadow-2xl border border-slate-100"
//               >
//                 <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                   <FiTrash2 size={30} />
//                 </div>
//                 <h2 className="text-2xl font-black text-slate-900 mb-2">Are you sure?</h2>
//                 <p className="text-slate-500 text-sm mb-8 font-medium">Please enter your passcode to permanently delete your account.</p>
//                 <input 
//                   type="password" 
//                   value={passcode} 
//                   onChange={(e)=>setpasscode(e.target.value)} 
//                   placeholder="••••" 
//                   className="w-full text-center py-4 rounded-2xl mb-6 border border-slate-200 outline-none focus:border-red-500 transition-all text-xl tracking-[0.5em] font-bold bg-slate-50" 
//                 />
//                 <div className="flex flex-col gap-3">
//                   <button 
//                     onClick={handleDelete} 
//                     className="w-full bg-red-600 text-white py-4 rounded-2xl font-black hover:bg-red-700 transition-colors shadow-lg shadow-red-100 active:scale-95"
//                   >
//                     Confirm Deletion
//                   </button>
//                   <button 
//                     onClick={() => setShowDeleteModal(false)} 
//                     className="w-full py-2 font-bold text-slate-400 hover:text-slate-600 transition-all"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>
//       </div>
//       <UserFooter />
//     </>
//   );
// };

// export default ProfileSettings;


import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Loader2, CheckCircle, ShieldCheck } from "lucide-react";
import UserNavbar from "./UserNavbar";
import { useNavigate, Link } from "react-router-dom";
import { useFormContext } from "../dashboard/FormContext";
import UserFooter from "./UserFooter";

const ProfileSettings = () => {
  const { isDarkMode } = useFormContext();
  const [user, setUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [passcode, setpasscode] = useState("");

  // Password Change States
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const API_BASE = "https://formbuilder-saas-backend.onrender.com/api/users";

  const getUser = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //console.log(res)
      setUser(res.data.data);
      console.log(res)
      // Add this where you receive the 'res' from your API

    } catch (err) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  useEffect(() => {
    getUser();
  }, [getUser]);
  

  const handleUpdate = async () => {
    if (!editingUser.name || !editingUser.email) return toast.error("Fields cannot be empty");
    
    setActionLoading(true);
    try {
      // 1. Update Profile Details
      await axios.put(`${API_BASE}/profile/update`, editingUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 2. Handle Password Change if toggled
      if (showPasswordFields) {
        if (!passwords.currentPassword || !passwords.newPassword) {
          toast.error("Both password fields are required");
          setActionLoading(false);
          return;
        }
        if (passwords.newPassword.length < 6) {
          toast.error("New password must be at least 6 characters");
          setActionLoading(false);
          return;
        }

       const res= await axios.post(`${API_BASE}/change-password`, passwords, {
          headers: { Authorization: `Bearer ${token}` },
        });
          console.log(res)
      }

      toast.success("Profile updated successfully");
      setEditingUser(null);
      setShowPasswordFields(false);
      setPasswords({ currentPassword: "", newPassword: "" });
      getUser(); // Refresh data
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await axios.delete(`${API_BASE}/profile/delete`, {
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
  const inputClasses = "w-full px-5 py-3.5 rounded-md border border-slate-200 outline-none focus:border-[#2B4BAB] focus:ring-4 focus:ring-[#2B4BAB]/5 transition-all font-medium bg-white";

  return (
    <>
      <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-blue-100">
        <UserNavbar />

        <main className="max-w-7xl w-full mx-auto pt-12 pb-24 px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md  border border-slate-100 bg-white shadow-[0_15px_40px_rgba(43,75,171,0.06)] overflow-hidden"
          >
            {loading ? (
              <div className="h-[500px] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-[#2B4BAB] animate-spin" />
                <p className="text-slate-400 font-medium">Loading your profile details...</p>
              </div>
            ) : (
              <>
                {/* TOP SECTION */}
                <div className="p-10 flex flex-col md:flex-row items-center gap-8 bg-white">
                  <div className="relative group">
                    <div className="w-28 h-28 rounded-3xl flex items-center justify-center text-white text-3xl font-bold bg-[#2B4BAB] shadow-xl shadow-[#2B4BAB]/20">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    {/* <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-lg border-2 border-white">
                        <CheckCircle size={14} />
                    </div> */}
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

                {/* BOTTOM SECTION */}
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
                          className="px-6 py-2.5 text-sm font-bold rounded-md bg-[#2B4BAB] text-white hover:bg-[#1e3a8a] shadow-lg shadow-[#2B4BAB]/20 transition-all active:scale-95"
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
                            <p className={`text-lg font-medium rounded-md ${valueClasses}`}>{user?.name}</p>
                          </div>
                          <div className="space-y-1">
                            <p className={labelClasses}>Email Address</p>
                            <p className={valueClasses}>{user?.email}</p>
                          </div>
                          <div className="space-y-1">
                            <p className={labelClasses}>Role</p>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} className="text-[#2B4BAB]" />
                                <p className={valueClasses}>{user?.role}</p>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="edit"
                          initial={{ opacity: 0, scale: 0.99 }} 
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.99 }}
                          className="space-y-8"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className={labelClasses}>Full Name</label>
                              <input 
                                value={editingUser.name} 
                                onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} 
                                className={inputClasses}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className={labelClasses}>Email Address</label>
                              <input 
                                value={editingUser.email} 
                                onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} 
                                className={inputClasses}
                              />
                            </div>
                          </div>

                          {/* Password Change Toggle Section */}
                          <div className="pt-4 border-t border-slate-100">
                            <button 
                                onClick={() => setShowPasswordFields(!showPasswordFields)}
                                className="flex items-center gap-2 text-sm font-bold text-[#2B4BAB] hover:underline mb-4"
                            >
                                <FiLock /> {showPasswordFields ? "Hide Password Settings" : "Change Password?"}
                            </button>

                            <AnimatePresence>
                                {showPasswordFields && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden"
                                    >
                                        <div className="space-y-2">
                                            <label className={labelClasses}>Current Password</label>
                                            <input 
                                                type="password"
                                                placeholder="Enter current password"
                                                value={passwords.currentPassword}
                                                onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                                                className={inputClasses}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className={labelClasses}>New Password</label>
                                            <input 
                                                type="password"
                                                placeholder="At least 6 characters"
                                                value={passwords.newPassword}
                                                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                                                className={inputClasses}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                          </div>

                          <div className="flex gap-4 pt-4">
                            <button 
                              onClick={handleUpdate} 
                              disabled={actionLoading} 
                              className="px-8 py-3 bg-[#2B4BAB] text-white rounded-md font-bold hover:bg-[#1e3a8a] shadow-xl shadow-blue-500/20 disabled:opacity-50 transition-all active:scale-95"
                            >
                              {actionLoading ? "Processing..." : "Save All Changes"}
                            </button>
                            <button 
                              onClick={() => {
                                setEditingUser(null);
                                setShowPasswordFields(false);
                              }} 
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
                    {/* <Link to="/plandetail" className="group flex items-center gap-3">
                      <div className="px-3 py-1 bg-[#2B4BAB]/5 text-[#2B4BAB] rounded-lg text-xs font-black uppercase tracking-widest">
                        {user?.plan} Plan
                      </div>
                      <div className="h-px w-8 bg-slate-200 transition-all group-hover:w-16 group-hover:bg-[#2B4BAB]"></div>
                    </Link> */}

                    {user?.role !== "ADMIN" ? (
    <Link to="/plandetail" className="group flex items-center gap-3">
      <div className="px-3 py-1 bg-[#2B4BAB]/5 text-[#2B4BAB] rounded-lg text-xs font-black uppercase tracking-widest">
        {user?.plan} Plan
      </div>
      <div className="h-px w-8 bg-slate-200 transition-all group-hover:w-16 group-hover:bg-[#2B4BAB]"></div>
    </Link>
  ) : (
    <div /> /* Keeps the layout balanced for admins */
  )}

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
                className="bg-white rounded-md p-10 max-w-sm w-full text-center shadow-2xl border border-slate-100"
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
                  className="w-full text-center py-4 rounded-md mb-6 border border-slate-200 outline-none focus:border-red-500 transition-all text-xl tracking-[0.5em] font-bold bg-slate-50" 
                />
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleDelete} 
                    className="w-full bg-red-600 text-white py-4 rounded-md font-black hover:bg-red-700 transition-colors shadow-lg shadow-red-100 active:scale-95"
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