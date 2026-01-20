// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import axios from 'axios';
// import { 
//     FaUser, FaPlus, FaSearch, FaFilter, FaSortAmountDown, 
//     FaTrash, FaEdit, FaTimes, FaCheckCircle, FaTimesCircle, 
//     FaUserCheck, FaUserTimes,FaArrowRight
// } from 'react-icons/fa';

// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import toast  from "react-hot-toast";
// import UserNavbar from '../user/UserNavbar';
// import usePagination from '../../hooks/usePagination';
// import TableSkeleton from './TableSkeleton';
// import WaveBackground from "./WaveBackground";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   Legend
// } from "recharts";

// const UserDetails= () => {
//     const [userData, setUserData] = useState([]);
//     const [openMenuIndex, setOpenMenuIndex] = useState(null);
//     const [editingUser, setEditingUser] = useState(null);
//     const [searchedUser, setSearchedUser] = useState("");
//     const [sortBy, setSortBy] = useState('');
//     const [filterRole, setFilterRole] = useState('all');
//     const [isAddMode, setIsAddMode] = useState(false);
//     const [pendingAction, setPendingAction] = useState(null);
//     const [showConfirmModal, setShowConfirmModal] = useState(false);
//     const [loading, setLoading] = useState(false);
   
//     const token = localStorage.getItem("token");
    
//     const navigate = useNavigate();
//     const menuRef = useRef(null);

//     const API_BASE_URL = 'https://formbuilder-saas-backend.onrender.com/api/admin/users';

//     useEffect(() => {
//         getAllUsers();
//     }, []);

//     const getAllUsers = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.get(API_BASE_URL, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setUserData(res.data.data);
//         } catch (err) {
//             toast.error("Failed to fetch users");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditingUser({ ...editingUser, [name]: value });
//     };

//     const handleAddUser = async () => {
//         try {
//             const res = await axios.post(API_BASE_URL, editingUser, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setUserData([...userData, res.data.user]);
//             toast.success("New user created successfully!");
//             handleDismiss();
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Failed to add user");
//         }
//     };

//     const handleUpdate = async () => {
//         try {
//             const res = await axios.put(`${API_BASE_URL}/${editingUser.userId}`, 
//             {
//                 name: editingUser.name,
//                 email: editingUser.email,
//                 role: editingUser.role,
//                 ...(editingUser.password && { password: editingUser.password })
//             }, 
//             {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             setUserData(userData.map(user => user.userId === editingUser.userId ? res.data.user : user));
//             toast.success("User updated successfully!");
//             handleDismiss();
//         } catch (err) {
//             toast.error("Failed to update user");
//         }
//     };

//     const handleDeleteConfirm = async () => {
//         if (!pendingAction) return;
//         try {
//             await axios.delete(`${API_BASE_URL}/${pendingAction.payload.userId}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setUserData(userData.filter(user => user.userId !== pendingAction.payload.userId));
//             toast.success("User deleted successfully");
//             setShowConfirmModal(false);
//             setPendingAction(null);
//         } catch (err) {
//             toast.error("Delete failed");
//         }
//     };

//     const handleDismiss = () => {
//         setEditingUser(null);
//         setIsAddMode(false);
//         setPendingAction(null);
//         setShowConfirmModal(false);
//         setOpenMenuIndex(null);
//     };

//     const processedUsers = useMemo(() => {
//         return [...userData]
//             .filter(user =>
//                 user.name.toLowerCase().includes(searchedUser.toLowerCase()) ||
//                 user.email.toLowerCase().includes(searchedUser.toLowerCase())
//             )
//             .filter(user => filterRole === "all" ? true : user.role === filterRole)
//             .sort((a, b) => {
//                 if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
//                 if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
//                 if (sortBy === 'date-new') return new Date(b.createdAt) - new Date(a.createdAt);
//                 if (sortBy === 'date-old') return new Date(a.createdAt) - new Date(b.createdAt);
//                 return 0;
//             });
//     }, [userData, searchedUser, filterRole, sortBy]);

//     const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(processedUsers, 10);

//     const activeUsersCount = userData.filter((user) => user.status === "Active").length;
//     const inactiveUsersCount = userData.filter((user) => user.status !== "Active").length;  
//     const userChartData = [
//   { name: "Active Users", value: activeUsersCount },
//   { name: "Inactive Users", value: inactiveUsersCount }
// ];


// const COLORS = ["#7c3aed", "#c4b5fd"];

//     // Helper function to get user avatar initials
//     const getInitials = (name) => {
//         return name
//             .split(' ')
//             .map(word => word[0])
//             .join('')
//             .toUpperCase()
//             .slice(0, 2);
//     };

//     // Helper function to get avatar color based on name
//   const getAvatarColor = (role) => {
//     if (role === "ADMIN") return "bg-violet-600";
//     return "bg-blue-600"; // USER
// };

//  const ChartSkeleton = () => (
//   <div className="h-[300px] flex items-center justify-center">
//     <div className="w-40 h-40 rounded-full border-4 border-slate-200 border-t-violet-500 animate-spin"></div>
//   </div>
// );

//     return (
//         <>
//             <UserNavbar />
//             <div className='relative font-sans bg-linear-to-br from-slate-50 via-violet-50/20 to-purple-50/10 min-h-screen w-full overflow-hidden'>
               
// {/* 
//                 <div className="absolute top-0 left-0 w-full h-320px overflow-hidden z-0">
//     <svg
//         viewBox="0 0 1440 320"
//         className="w-full h-full"
//         preserveAspectRatio="none"
//     >
//         <path
//             fill="#7c3aed"
//             fillOpacity="0.12"
//             d="M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,186.7C840,192,960,192,1080,176C1200,160,1320,128,1380,112L1440,96L1440,0L1380,0L1320,0L1200,0L1080,0L960,0L840,0L720,0L600,0L480,0L360,0L240,0L120,0L60,0L0,0Z"
//         />
//     </svg>
// </div>  */} 

 
//   <WaveBackground position="top" />
//    <WaveBackground position="bottom" />
//                 <div className="relative z-10 p-4 md:p-8 font-sans text-slate-900">
//                     {/* Header Section with Image */}
//                     <motion.div 
//                         className="max-w-7xl mx-auto mb-8"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6, delay: 0.2 }}
//                     >
//                         <div className="bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden">
//                             <div className="flex flex-col md:flex-row items-center justify-between p-8 gap-6">
//                                 <div className="flex-1 text-white">
//                                     <h1 className=" text-xl md:text-4xl font-bold mb-2">User Management</h1>
//                                     <p className="text-violet-100 text-sm md:text-lg">  View and manage user accounts, roles, and access permissions while maintaining secure and organized control over your platform.</p>
//                                 </div>
                                
//                             </div>
//                         </div>

                      
//                     </motion.div> 

            
// {/* User Overview Chart  */}
// <motion.div
//   initial={{ opacity: 0, y: 30 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.6 }}
//   className="max-w-7xl mx-auto mb-10 bg-white rounded-3xl border border-black/10 shadow-xl overflow-hidden"
// >
  

//   {/* Content */}
//   <div className="p-6"> 
//  {loading ? (
//     <ChartSkeleton />
//   ) : userData.length === 0 ? (
//     <p className="text-center text-slate-400 font-medium py-20">
//       No users available
//     </p>
//   ) : (

//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      
//       {/* Pie Chart Section */}
//       <div className="flex justify-center items-center">
//         <div className="relative w-full max-w-sm">
//            <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
               
//                  data={userChartData}
//   innerRadius={90}
//   outerRadius={130}
//   paddingAngle={3}
//   cornerRadius={10}
//   dataKey="value"
    
//               >
//                 {userChartData.map((entry, index) => (
//                   <Cell key={index} fill={COLORS[index]} />
//                 ))}
//               </Pie>
//               <Tooltip 
//                  contentStyle={{
//                   backgroundColor: '#fffff',
//               border: '2px solid #e2e8f0',
//                   borderRadius: '12px',
//                   padding: '12px',
//                   boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
//                  }}
//               />


//             </PieChart>
//           </ResponsiveContainer> 
     


//           {/* Center Total Display */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
//             <p className="text-4xl font-extrabold text-slate-800">{userData.length}</p>
//             <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Users</p>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards Section */}
//       <div className="space-y-4">
        
//         {/* Active Users Card */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-linear-to-br from-fuchsia-50 to-fuchsia-100 border-2 border-fuchsia-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all group"
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 bg-fuchsia-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
//                 <FaUserCheck size={24} className="text-white" />
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-fuchsia-700 uppercase tracking-wider mb-1">
//                   Active Users
//                 </p>
//                 <p className="text-4xl font-extrabold text-fuchsia-600">
//                   {activeUsersCount}
//                 </p>
//               </div>
//             </div>
           
//           </div>
//         </motion.div>

//         {/* Inactive Users Card */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3 }}
//           className="bg-linear-to-br from-sky-50 to-sky-100 border-2 border-sky-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all group"
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 bg-sky-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
//                 <FaUserTimes size={24} className="text-white" />
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-1">
//                   Inactive Users
//                 </p>
//                 <p className="text-4xl font-extrabold text-sky-500">
//                   {inactiveUsersCount}
//                 </p>
//               </div>
//             </div>
         
//           </div>
//         </motion.div>



//       </div>
//     </div> 
//   )}
//   </div>
// </motion.div>

//             {/* Filters and Table */}
//                     <div className='max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden'>   

//                         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
//     <h2 className="text-lg font-bold text-slate-800">
//       Users
//     </h2>

//     <div className="flex gap-3">
//       <motion.button
//         onClick={() => {
//           setIsAddMode(true);
//           setEditingUser({ name: "", email: "", password: "", role: "" });
//         }}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-xl shadow-md"
//       >
//         <FaPlus size={14} />
//         Add New User
//       </motion.button>

//       <motion.button
//         onClick={() => navigate("/admin/forms")}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 border-2 text-white px-4 py-2.5 rounded-xl shadow-md"
//       >
//         <FaArrowRight size={16} />
//         Go To Forms
//       </motion.button>
//     </div>
//   </div>





//                         <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row gap-4">
//                             <div className="relative flex-1">
//                                 <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                                 <input
//                                     className="w-full pl-11 pr-4 py-3 font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 transition-all"
//                                     type="text"
//                                     placeholder="Search name or email..."
//                                     value={searchedUser}
//                                     onChange={(e) => setSearchedUser(e.target.value)}
//                                 />
//                             </div>
//                             <div className="flex gap-2">
//                                 <select 
//                                     value={filterRole} 
//                                     onChange={(e) => setFilterRole(e.target.value)} 
//                                     className="px-4 py-3 font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 transition-all"
//                                 >
//                                     <option value="all">All Roles</option>
//                                     <option value="ADMIN">Admin</option>
//                                     <option value="USER">User</option>
//                                 </select>
//                                 <select 
//                                     value={sortBy} 
//                                     onChange={(e) => setSortBy(e.target.value)} 
//                                     className="px-4 py-3 font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 transition-all"
//                                 >
//                                     <option value="">Sort By</option>
//                                     <option value="name-asc">A-Z</option>
//                                     <option value="name-desc">Z-A</option>
//                                     <option value="date-new">Newest</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <div className='overflow-x-auto'>
//                             <table className='w-full text-left'>
//                                 <thead className="bg-linear-to-r from-slate-50 to-slate-100 border-b border-slate-200">
//                                     <tr>
//                                         <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">User Info</th>
//                                         <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
//                                         <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Joined Date</th>
//                                         <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Activity</th>
//                                         <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
//                                         <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-slate-100">
//                                     {loading ? (
//                                          <TableSkeleton rows={5} columns={6} />
//                                     ) : currentData.length === 0 ? (
//                                         <tr>
//                                             <td colSpan={6} className="py-16">
//                                                 <div className="flex flex-col items-center justify-center">
                                                   
//                                                     <p className="text-xl font-semibold text-slate-700 mb-2">No users found</p>
                                                   
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ) : (
//                                         currentData.map((user,index) => (
//                                             <motion.tr key={user.userId} 
//                                                 initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.05 }}//
//                                             className="hover:bg-indigo-100/30 transition-colors group">
//                                                 <td className="px-6 py-4">
//                                                     <div className="flex items-center gap-3">
//                                                         {/* Avatar with initials */}
//                                                         <div className={`w-10 h-10 ${getAvatarColor(user.role)} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md`}>
//                                                             {getInitials(user.name)}
//                                                         </div>
//                                                         <div>
//                                                             <div className="font-semibold text-slate-800">{user.name}</div>
//                                                             <div className="text-sm text-slate-500">{user.email}</div>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
//                                                         {user.role}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-4 text-sm text-slate-600 font-medium">
//                                                     <div>{new Date(user.createdAt).toLocaleDateString()}</div>
//                                                 </td>
//                                                 <td className="px-6 py-4 text-center">
//                                                     <button 
//                                                         onClick={() => navigate(`/admin/users/${user.userId}/activity`)}
//                                                         className="px-4 py-2 text-sm rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-all shadow-sm hover:shadow-md"
//                                                     >
//                                                         View
//                                                     </button>
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-700 border border-green-200" : "bg-gray-100 text-gray-600 border border-gray-200"}`}>
//                                                         {user.status === "Active" ? <FaCheckCircle size={10} /> : <FaTimesCircle size={10} />}
//                                                         {user.status || "Inactive"}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-4 text-center relative">
//                                                     <button 
//                                                         onClick={() => setOpenMenuIndex(openMenuIndex === user.userId ? null : user.userId)}
//                                                         className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-all"
//                                                     >
//                                                         •••
//                                                     </button>
//                                                     {openMenuIndex === user.userId && (
//                                                         <div className="absolute right-12 top-0 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 min-w-[140px] py-2">
//                                                             <div className="flex justify-between items-center px-3 pb-2 border-b border-slate-100 mb-1">
//                                                                 <span className="text-[10px] font-bold text-slate-400 uppercase">Options</span>
//                                                                 <button onClick={() => setOpenMenuIndex(null)} className="text-slate-300 hover:text-red-500 transition-colors"><FaTimes size={10}/></button>
//                                                             </div>
//                                                             <button onClick={() => { setEditingUser(user); setIsAddMode(false); setOpenMenuIndex(null); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-violet-50 hover:text-violet-600 transition-colors">
//                                                                 <FaEdit size={12}/> Edit
//                                                             </button>
//                                                             <button onClick={() => { setPendingAction({ type: "delete", payload: user }); setShowConfirmModal(true); setOpenMenuIndex(null); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
//                                                                 <FaTrash size={12}/> Delete
//                                                             </button>
//                                                         </div>
//                                                     )}
//                                                 </td>
//                                             </motion.tr>
//                                         ))
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>

//                         {/* Pagination */}
//                         <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100 bg-slate-50/50">
//                             <span className="text-sm text-slate-600 font-medium">Page {currentPage} of {totalPages}</span>
//                             <div className="flex gap-2">
//                                 <button 
//                                     onClick={prevPage} 
//                                     disabled={currentPage === 1} 
//                                     className="px-5 py-2 border-2 border-slate-300 rounded-xl disabled:opacity-30 text-slate-700 font-semibold hover:bg-slate-100 transition-all disabled:hover:bg-transparent"
//                                 >
//                                     Prev
//                                 </button>
//                                 <button 
//                                     onClick={nextPage} 
//                                     disabled={currentPage === totalPages} 
//                                     className="px-5 py-2 bg-violet-600 text-white font-semibold rounded-xl disabled:opacity-30 hover:bg-violet-700 transition-all disabled:hover:bg-violet-600"
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Sidebar Slide-over for Add/Edit */}
//             <AnimatePresence>
//                 {editingUser && (
//                     <>
//                         <motion.div 
//                             initial={{ opacity: 0 }} 
//                             animate={{ opacity: 1 }} 
//                             exit={{ opacity: 0 }} 
//                             onClick={handleDismiss} 
//                             className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40" 
//                         />
//                         <motion.div 
//                             initial={{ x: "100%" }} 
//                             animate={{ x: 0 }} 
//                             exit={{ x: "100%" }} 
//                             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                             className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50   overflow-y-auto "
//                         >
//                             <div className="p-6">
//                                 <div className="flex justify-between items-center mb-8">
//                                     <h2 className="text-2xl font-bold text-slate-800">{isAddMode ? "Create New User" : "Edit User Profile"}</h2>
//                                     <button 
//                                         onClick={handleDismiss} 
//                                         className="p-2 hover:bg-slate-100 rounded-full transition-colors"
//                                     >
//                                         <FaTimes size={20} className="text-slate-400" />
//                                     </button>
//                                 </div>

//                                 {/* User Icon*/}
//                                 <div className="mb-6 rounded-2xl overflow-hidden h-32 bg-linear-to-r from-violet-500 to-purple-600 flex items-center justify-center">
//                                     <FaUser size={48} className="text-white/30" />
//                                 </div>

//                                 <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); isAddMode ? handleAddUser() : handleUpdate(); }}>
//                                     <div>
//                                         <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
//                                         <input 
//                                             type="text" 
//                                             name="name" 
//                                             value={editingUser.name} 
//                                             onChange={handleEditChange} 
//                                             required 
//                                             className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
//                                             placeholder="Enter full name"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
//                                         <input 
//                                             type="email" 
//                                             name="email" 
//                                             value={editingUser.email} 
//                                             onChange={handleEditChange} 
//                                             required 
//                                             className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
//                                             placeholder="user@example.com"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-semibold text-slate-700 mb-2">
//                                             {isAddMode ? "Password" : "New Password (Optional)"}
//                                         </label>
//                                         <input 
//                                             type="password" 
//                                             name="password" 
//                                             value={editingUser.password || ""} 
//                                             onChange={handleEditChange} 
//                                             required={isAddMode} 
//                                             className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
//                                             placeholder={isAddMode ? "Enter password" : "Leave blank to keep current"}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-semibold text-slate-700 mb-2">Account Role</label>
//                                         <select 
//                                             name="role" 
//                                             value={editingUser.role} 
//                                             onChange={handleEditChange} 
//                                             required 
//                                             className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
//                                         >
//                                             <option value="">Select Role</option>
//                                             <option value="ADMIN">Admin</option>
//                                             <option value="USER">User</option>
//                                         </select>
//                                     </div>
//                                     <div className="pt-6 flex gap-3">
//                                         <button 
//                                             type="submit" 
//                                             className="flex-1 bg-linear-to-r from-violet-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
//                                         >
//                                             {isAddMode ? "Create User" : "Update Profile"}
//                                         </button>
//                                         <button 
//                                             type="button" 
//                                             onClick={handleDismiss} 
//                                             className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
//                                         >
//                                             Cancel
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </motion.div>
//                     </>
//                 )}
//             </AnimatePresence>

//             {/* Delete Modal */}
//             <AnimatePresence>
//                 {showConfirmModal && (
//                     <div className="fixed inset-0 flex items-center justify-center z-100 p-4">
//                         <motion.div 
//                             initial={{ opacity: 0 }} 
//                             animate={{ opacity: 1 }} 
//                             exit={{ opacity: 0 }} 
//                             onClick={handleDismiss} 
//                             className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
//                         />
//                         <motion.div 
//                             initial={{ scale: 0.9, opacity: 0 }} 
//                             animate={{ scale: 1, opacity: 1 }} 
//                             exit={{ scale: 0.9, opacity: 0 }} 
//                             className="bg-white rounded-2xl p-8 w-full max-w-sm relative z-10 shadow-2xl text-center"
//                         >
//                             <div className="w-20 h-20 bg-linear-to-br from-red-100 to-red-200 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//                                 <FaTrash size={28} />
//                             </div>
//                             <h2 className="text-2xl font-bold text-slate-800 mb-2">Confirm Delete</h2>
//                             <p className="text-slate-500 mb-8">
//                                 Are you sure you want to remove <span className="font-bold text-slate-700">{pendingAction?.payload?.name}</span>? This action cannot be undone.
//                             </p>
//                             <div className="flex gap-3">
//                                 <button 
//                                     onClick={handleDeleteConfirm} 
//                                     className="flex-1 bg-linear-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
//                                 >
//                                     Delete
//                                 </button>
//                                 <button 
//                                     onClick={handleDismiss} 
//                                     className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-all"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </motion.div>
                        
//                     </div>
//                 )}
//             </AnimatePresence>

//         </>
//     );
// };

// export default UserDetails;


import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { 
    FaUser, FaPlus, FaSearch, FaFilter, FaSortAmountDown, 
    FaTrash, FaEdit, FaTimes, FaCheckCircle, FaTimesCircle, 
    FaUserCheck, FaUserTimes, FaArrowRight
} from 'react-icons/fa';

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast  from "react-hot-toast";
import UserNavbar from '../user/UserNavbar';
import usePagination from '../../hooks/usePagination';
import TableSkeleton from './TableSkeleton'; // Assuming you have this, or remove if not
import WaveBackground from "./WaveBackground";
import { useFormContext } from "../dashboard/FormContext";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const UserDetails = () => {
    const { isDarkMode } = useFormContext(); 
    const [userData, setUserData] = useState([]);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [searchedUser, setSearchedUser] = useState("");
    const [sortBy, setSortBy] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [isAddMode, setIsAddMode] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);
   
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const API_BASE_URL = 'https://formbuilder-saas-backend.onrender.com/api/admin/users';

    // --- DATA FETCHING ---
    useEffect(() => {
        getAllUsers();
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getAllUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_BASE_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(res.data.data);
        } catch (err) {
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingUser({ ...editingUser, [name]: value });
    };

    const handleAddUser = async () => {
        try {
            const res = await axios.post(API_BASE_URL, editingUser, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData([...userData, res.data.user]);
            toast.success("New user created successfully!");
            handleDismiss();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add user");
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.put(`${API_BASE_URL}/${editingUser.userId}`, 
            {
                name: editingUser.name,
                email: editingUser.email,
                role: editingUser.role,
                ...(editingUser.password && { password: editingUser.password })
            }, 
            {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUserData(userData.map(user => user.userId === editingUser.userId ? res.data.user : user));
            toast.success("User updated successfully!");
            handleDismiss();
        } catch (err) {
            toast.error("Failed to update user");
        }
    };

    const handleDeleteConfirm = async () => {
        if (!pendingAction) return;
        try {
            await axios.delete(`${API_BASE_URL}/${pendingAction.payload.userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(userData.filter(user => user.userId !== pendingAction.payload.userId));
            toast.success("User deleted successfully");
            setShowConfirmModal(false);
            setPendingAction(null);
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    const handleDismiss = () => {
        setEditingUser(null);
        setIsAddMode(false);
        setPendingAction(null);
        setShowConfirmModal(false);
        setOpenMenuIndex(null);
    };

    const processedUsers = useMemo(() => {
        return [...userData]
            .filter(user =>
                user.name.toLowerCase().includes(searchedUser.toLowerCase()) ||
                user.email.toLowerCase().includes(searchedUser.toLowerCase())
            )
            .filter(user => filterRole === "all" ? true : user.role === filterRole)
            .sort((a, b) => {
                if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
                if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
                if (sortBy === 'date-new') return new Date(b.createdAt) - new Date(a.createdAt);
                if (sortBy === 'date-old') return new Date(a.createdAt) - new Date(b.createdAt);
                return 0;
            });
    }, [userData, searchedUser, filterRole, sortBy]);

    const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(processedUsers, 10);

    const activeUsersCount = userData.filter((user) => user.status === "Active").length;
    const inactiveUsersCount = userData.filter((user) => user.status !== "Active").length;  
    const userChartData = [
        { name: "Active Users", value: activeUsersCount },
        { name: "Inactive Users", value: inactiveUsersCount }
    ];

    const COLORS = isDarkMode ? ["#8b5cf6", "#4c1d95"] : ["#7c3aed", "#c4b5fd"];

    const getInitials = (name) => name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    const getAvatarColor = (role) => {
        if (role === "ADMIN") return "bg-violet-600";
        return "bg-blue-600"; 
    };

    const ChartSkeleton = () => (
        <div className="h-[300px] flex items-center justify-center">
            <div className={`w-40 h-40 rounded-full border-4 ${isDarkMode ? 'border-purple-500/20 border-t-purple-500' : 'border-slate-200 border-t-violet-500'} animate-spin`}></div>
        </div>
    );

    // --- THEME CONFIGURATION ---
    const theme = {
        // Main Backgrounds
        pageBg: isDarkMode 
            ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
            : "bg-linear-to-br from-slate-50 via-violet-50/20 to-purple-50/10 text-slate-900",
        
        // Cards
        card: isDarkMode
            ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-xl"
            : "bg-white border border-slate-200 shadow-md",
        
        cardHeader: isDarkMode
            ? "bg-[#1e1b4b]/40 border-b border-purple-500/20"
            : "bg-slate-50/60 border-b border-slate-100",

        // Inputs
        input: isDarkMode
            ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
            : "bg-slate-50 border-slate-200 text-slate-900 focus:ring-violet-500",

        // Text Colors
        textMain: isDarkMode ? "text-white" : "text-slate-800",
        textSub: isDarkMode ? "text-gray-400" : "text-slate-500",
        
        // Table
        tableHeader: isDarkMode
            ? "bg-[#1e1b4b]/60 text-gray-300 border-b border-purple-500/10"
            : "bg-linear-to-r from-slate-50 to-slate-100 text-slate-600 border-b border-slate-200",
        
        tableRow: isDarkMode
            ? "hover:bg-[#1e1b4b]/40 border-b border-purple-500/5 text-gray-300"
            : "hover:bg-indigo-100/30 border-b border-slate-100 text-slate-700",

        // Dropdown Menu
        dropdown: isDarkMode
            ? "bg-[#1e1b4b] border border-purple-500/20 text-gray-200 shadow-2xl shadow-purple-900/20"
            : "bg-white border border-slate-200 text-slate-600 shadow-2xl",

        // Stats Cards
        statCardActive: isDarkMode
            ? "bg-[#1e1b4b]/40 border-purple-500/30 text-white"
            : "bg-linear-to-br from-fuchsia-50 to-fuchsia-100 border-fuchsia-200 text-slate-900",
        
        statCardInactive: isDarkMode
            ? "bg-[#1e1b4b]/40 border-indigo-500/30 text-white"
            : "bg-linear-to-br from-sky-50 to-sky-100 border-sky-200 text-slate-900",
    };

    return (
        <>
            <UserNavbar />
            <div className={`relative font-sans min-h-screen w-full overflow-hidden transition-colors duration-500 ${theme.pageBg}`}>
                
                <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
                <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#6c2bd9"} />
                
                <div className="relative z-10 p-4 md:p-8 font-sans">
                    {/* Header Section */}
                    <motion.div 
                        className="max-w-7xl mx-auto mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className={`rounded-3xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-[#1e1b4b] to-[#0f0c29] border border-purple-500/20' : 'bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700'}`}>
                            <div className="flex flex-col md:flex-row items-center justify-between p-8 gap-6">
                                <div className="flex-1 text-white">
                                    <h1 className="text-xl md:text-4xl font-bold mb-2">User Management</h1>
                                    <p className="text-violet-100 text-sm md:text-lg opacity-90">
                                        View and manage user accounts, roles, and access permissions while maintaining secure and organized control over your platform.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div> 

                    {/* User Overview Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`max-w-7xl mx-auto mb-10 rounded-3xl overflow-hidden transition-all duration-500 ${theme.card}`}
                    >
                        <div className="p-6"> 
                            {loading ? (
                                <ChartSkeleton />
                            ) : userData.length === 0 ? (
                                <p className={`text-center font-medium py-20 ${theme.textSub}`}>No users available</p>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                    {/* Pie Chart Section */}
                                    <div className="flex justify-center items-center">
                                        <div className="relative w-full max-w-sm">
                                            <ResponsiveContainer width="100%" height={300}>
                                                <PieChart>
                                                    <Pie
                                                        data={userChartData}
                                                        innerRadius={90}
                                                        outerRadius={130}
                                                        paddingAngle={3}
                                                        cornerRadius={10}
                                                        dataKey="value"
                                                        stroke="none"
                                                    >
                                                        {userChartData.map((entry, index) => (
                                                            <Cell key={index} fill={COLORS[index]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip 
                                                        contentStyle={{
                                                            backgroundColor: isDarkMode ? '#05070f' : '#ffffff',
                                                            border: isDarkMode ? '1px solid rgba(139,92,246,0.2)' : '2px solid #e2e8f0',
                                                            borderRadius: '12px',
                                                            color: isDarkMode ? '#fff' : '#000',
                                                            padding: '12px',
                                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                                        }}
                                                        itemStyle={{ color: isDarkMode ? '#fff' : '#000' }}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer> 
                                    
                                            {/* Center Total Display */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                                                <p className={`text-4xl font-extrabold ${theme.textMain}`}>{userData.length}</p>
                                                <p className={`text-sm font-semibold uppercase tracking-wider ${theme.textSub}`}>Total Users</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Cards Section */}
                                    <div className="space-y-4">
                                        {/* Active Users Card */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className={`rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border-2 ${theme.statCardActive} ${isDarkMode ? 'border-purple-500/20' : 'border-fuchsia-200'}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-md transition-transform hover:scale-110 ${isDarkMode ? 'bg-purple-600' : 'bg-fuchsia-500'}`}>
                                                        <FaUserCheck size={24} className="text-white" />
                                                    </div>
                                                    <div>
                                                        <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-purple-300' : 'text-fuchsia-700'}`}>
                                                            Active Users
                                                        </p>
                                                        <p className={`text-4xl font-extrabold ${isDarkMode ? 'text-purple-400' : 'text-fuchsia-600'}`}>
                                                            {activeUsersCount}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Inactive Users Card */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className={`rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border-2 ${theme.statCardInactive} ${isDarkMode ? 'border-indigo-500/20' : 'border-sky-200'}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-md transition-transform hover:scale-110 ${isDarkMode ? 'bg-indigo-600' : 'bg-sky-500'}`}>
                                                        <FaUserTimes size={24} className="text-white" />
                                                    </div>
                                                    <div>
                                                        <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-indigo-300' : 'text-sky-700'}`}>
                                                            Inactive Users
                                                        </p>
                                                        <p className={`text-4xl font-extrabold ${isDarkMode ? 'text-indigo-400' : 'text-sky-500'}`}>
                                                            {inactiveUsersCount}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div> 
                            )}
                        </div>
                    </motion.div>

                    {/* Filters and Table */}
                    <div className={`max-w-7xl mx-auto rounded-2xl border overflow-hidden transition-all duration-500 ${theme.card}`}> 
                        <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 ${theme.cardHeader}`}>
                            <h2 className={`text-lg font-bold ${theme.textMain}`}>Users</h2>

                            <div className="flex gap-3">
                                <motion.button
                                    onClick={() => {
                                        setIsAddMode(true);
                                        setEditingUser({ name: "", email: "", password: "", role: "" });
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-md ${isDarkMode ? 'bg-[#8b5cf6] text-white hover:bg-[#7c3aed]' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
                                >
                                    <FaPlus size={14} /> Add New User
                                </motion.button>

                                <motion.button
                                    onClick={() => navigate("/admin/forms")}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center gap-2 border-2 px-4 py-2.5 rounded-xl shadow-md ${isDarkMode ? 'bg-transparent border-purple-500 text-purple-300 hover:bg-purple-500/20' : 'bg-violet-600 border-transparent text-white hover:bg-violet-700'}`}
                                >
                                    <FaArrowRight size={16} /> Go To Forms
                                </motion.button>
                            </div>
                        </div>

                        <div className={`p-6 border-b flex flex-col lg:flex-row gap-4 ${isDarkMode ? 'border-purple-500/10' : 'border-slate-100'}`}>
                            <div className="relative flex-1">
                                <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSub}`} />
                                <input
                                    className={`w-full pl-11 pr-4 py-3 font-semibold rounded-xl outline-none transition-all ${theme.input}`}
                                    type="text"
                                    placeholder="Search name or email..."
                                    value={searchedUser}
                                    onChange={(e) => setSearchedUser(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                <select 
                                    value={filterRole} 
                                    onChange={(e) => setFilterRole(e.target.value)} 
                                    className={`px-4 py-3 font-semibold rounded-xl outline-none cursor-pointer transition-all ${theme.input}`}
                                >
                                    <option value="all" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>All Roles</option>
                                    <option value="ADMIN" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>Admin</option>
                                    <option value="USER" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>User</option>
                                </select>
                                <select 
                                    value={sortBy} 
                                    onChange={(e) => setSortBy(e.target.value)} 
                                    className={`px-4 py-3 font-semibold rounded-xl outline-none cursor-pointer transition-all ${theme.input}`}
                                >
                                    <option value="" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>Sort By</option>
                                    <option value="name-asc" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>A-Z</option>
                                    <option value="name-desc" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>Z-A</option>
                                    <option value="date-new" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>Newest</option>
                                </select>
                            </div>
                        </div>

                        <div className='overflow-x-auto'>
                            <table className='w-full text-left'>
                                <thead className={theme.tableHeader}>
                                    <tr>
                                        {['User Info', 'Role', 'Joined Date', 'Activity', 'Status', 'Actions'].map((h, i) => (
                                            <th key={i} className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider ${i === 3 || i === 5 ? 'text-center' : ''}`}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${isDarkMode ? 'divide-purple-500/5' : 'divide-slate-100'}`}>
                                    {loading ? (
                                        <tr><td colSpan={6}><TableSkeleton rows={5} columns={6} isDarkMode={isDarkMode} /></td></tr>
                                    ) : currentData.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-16">
                                                <div className="flex flex-col items-center justify-center">
                                                    <p className={`text-xl font-semibold mb-2 ${theme.textMain}`}>No users found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        currentData.map((user, index) => (
                                            <motion.tr key={user.userId} 
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                                className={`transition-colors group ${theme.tableRow}`}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 ${getAvatarColor(user.role)} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                                                            {getInitials(user.name)}
                                                        </div>
                                                        <div>
                                                            <div className={`font-semibold ${theme.textMain}`}>{user.name}</div>
                                                            <div className={`text-sm ${theme.textSub}`}>{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                                                        user.role === 'ADMIN' 
                                                        ? (isDarkMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-purple-100 text-purple-700 border border-purple-200')
                                                        : (isDarkMode ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-blue-100 text-blue-700 border border-blue-200')
                                                    }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className={`px-6 py-4 text-sm font-medium ${theme.textSub}`}>
                                                    <div>{new Date(user.createdAt).toLocaleDateString()}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button 
                                                        onClick={() => navigate(`/admin/users/${user.userId}/activity`)}
                                                        className={`px-4 py-2 text-sm rounded-lg transition-all shadow-sm hover:shadow-md ${
                                                            isDarkMode 
                                                            ? 'bg-[#8b5cf6] text-white hover:bg-[#7c3aed]' 
                                                            : 'bg-violet-600 text-white hover:bg-violet-700'
                                                        }`}
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                                                        user.status === "Active" 
                                                        ? (isDarkMode ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-green-100 text-green-700 border border-green-200") 
                                                        : (isDarkMode ? "bg-gray-700 text-gray-400 border border-gray-600" : "bg-gray-100 text-gray-600 border border-gray-200")
                                                    }`}>
                                                        {user.status === "Active" ? <FaCheckCircle size={10} /> : <FaTimesCircle size={10} />}
                                                        {user.status || "Inactive"}
                                                    </span>
                                                </td>
                                                {/* Action Column - Preserved Layout */}
                                                <td className="px-6 py-4 text-center relative" ref={menuRef}>
                                                    <button 
                                                        onClick={() => setOpenMenuIndex(openMenuIndex === user.userId ? null : user.userId)}
                                                        className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                                                            isDarkMode 
                                                            ? 'text-gray-400 hover:text-white hover:bg-white/10' 
                                                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'
                                                        }`}
                                                    >
                                                        •••
                                                    </button>
                                                    {openMenuIndex === user.userId && (
                                                        <div className={`absolute right-12 top-0 z-50 min-w-[140px] py-2 rounded-xl border ${theme.dropdown}`}>
                                                            <div className={`flex justify-between items-center px-3 pb-2 border-b mb-1 ${isDarkMode ? 'border-purple-500/20' : 'border-slate-100'}`}>
                                                                <span className={`text-[10px] font-bold uppercase ${theme.textSub}`}>Options</span>
                                                                <button onClick={() => setOpenMenuIndex(null)} className="text-slate-400 hover:text-red-500 transition-colors"><FaTimes size={10}/></button>
                                                            </div>
                                                            <button onClick={() => { setEditingUser(user); setIsAddMode(false); setOpenMenuIndex(null); }} className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                                                                isDarkMode ? 'hover:bg-purple-500/20 hover:text-white' : 'text-slate-600 hover:bg-violet-50 hover:text-violet-600'
                                                            }`}>
                                                                <FaEdit size={12}/> Edit
                                                            </button>
                                                            <button onClick={() => { setPendingAction({ type: "delete", payload: user }); setShowConfirmModal(true); setOpenMenuIndex(null); }} className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                                                                isDarkMode ? 'hover:bg-red-500/20 text-red-400' : 'text-red-600 hover:bg-red-50'
                                                            }`}>
                                                                <FaTrash size={12}/> Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className={`flex justify-between items-center px-6 py-4 border-t ${isDarkMode ? 'bg-[#1e1b4b]/30 border-purple-500/10' : 'bg-slate-50/50 border-slate-100'}`}>
                            <span className={`text-sm font-medium ${theme.textSub}`}>Page {currentPage} of {totalPages}</span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={prevPage} 
                                    disabled={currentPage === 1} 
                                    className={`px-5 py-2 border-2 rounded-xl disabled:opacity-30 font-semibold transition-all ${
                                        isDarkMode 
                                        ? 'border-purple-500/30 text-purple-300 hover:bg-purple-500/10 disabled:hover:bg-transparent' 
                                        : 'border-slate-300 text-slate-700 hover:bg-slate-100 disabled:hover:bg-transparent'
                                    }`}
                                >
                                    Prev
                                </button>
                                <button 
                                    onClick={nextPage} 
                                    disabled={currentPage === totalPages} 
                                    className={`px-5 py-2 font-semibold rounded-xl disabled:opacity-30 transition-all ${theme.buttonPrimary}`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Slide-over for Add/Edit */}
                    <AnimatePresence>
                        {editingUser && (
                            <>
                                <motion.div 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    exit={{ opacity: 0 }} 
                                    onClick={handleDismiss} 
                                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40" 
                                />
                                <motion.div 
                                    initial={{ x: "100%" }} 
                                    animate={{ x: 0 }} 
                                    exit={{ x: "100%" }} 
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                    className={`fixed top-0 right-0 h-full w-full max-w-md shadow-2xl z-50 overflow-y-auto ${theme.modal}`}
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-8">
                                            <h2 className={`text-2xl font-bold ${theme.textMain}`}>{isAddMode ? "Create New User" : "Edit User Profile"}</h2>
                                            <button 
                                                onClick={handleDismiss} 
                                                className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
                                            >
                                                <FaTimes size={20} className={theme.textSub} />
                                            </button>
                                        </div>

                                        <div className={`mb-6 rounded-2xl overflow-hidden h-32 flex items-center justify-center ${isDarkMode ? 'bg-[#1e1b4b] border border-purple-500/20' : 'bg-linear-to-r from-violet-500 to-purple-600'}`}>
                                            <FaUser size={48} className={isDarkMode ? "text-purple-500" : "text-white/30"} />
                                        </div>

                                        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); isAddMode ? handleAddUser() : handleUpdate(); }}>
                                            <div>
                                                <label className={`block text-sm font-semibold mb-2 ${theme.textSub}`}>Full Name</label>
                                                <input 
                                                    type="text" name="name" value={editingUser.name} onChange={handleEditChange} required 
                                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${theme.input}`} 
                                                    placeholder="Enter full name"
                                                />
                                            </div>
                                            <div>
                                                <label className={`block text-sm font-semibold mb-2 ${theme.textSub}`}>Email Address</label>
                                                <input 
                                                    type="email" name="email" value={editingUser.email} onChange={handleEditChange} required 
                                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${theme.input}`} 
                                                    placeholder="user@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className={`block text-sm font-semibold mb-2 ${theme.textSub}`}>
                                                    {isAddMode ? "Password" : "New Password (Optional)"}
                                                </label>
                                                <input 
                                                    type="password" name="password" value={editingUser.password || ""} onChange={handleEditChange} required={isAddMode} 
                                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${theme.input}`} 
                                                    placeholder={isAddMode ? "Enter password" : "Leave blank to keep current"}
                                                />
                                            </div>
                                            <div>
                                                <label className={`block text-sm font-semibold mb-2 ${theme.textSub}`}>Account Role</label>
                                                <select 
                                                    name="role" value={editingUser.role} onChange={handleEditChange} required 
                                                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none cursor-pointer transition-all ${theme.input}`}
                                                >
                                                    <option value="" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>Select Role</option>
                                                    <option value="ADMIN" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>Admin</option>
                                                    <option value="USER" className={isDarkMode ? 'bg-[#0B0F19]' : ''}>User</option>
                                                </select>
                                            </div>
                                            <div className="pt-6 flex gap-3">
                                                <button type="submit" className={`flex-1 py-3 rounded-xl font-bold transition-all ${theme.buttonPrimary}`}>
                                                    {isAddMode ? "Create User" : "Update Profile"}
                                                </button>
                                                <button 
                                                    type="button" 
                                                    onClick={handleDismiss} 
                                                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${isDarkMode ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Delete Modal */}
                    <AnimatePresence>
                        {showConfirmModal && (
                            <div className="fixed inset-0 flex items-center justify-center z-100 p-4">
                                <motion.div 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    exit={{ opacity: 0 }} 
                                    onClick={handleDismiss} 
                                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
                                />
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }} 
                                    animate={{ scale: 1, opacity: 1 }} 
                                    exit={{ scale: 0.9, opacity: 0 }} 
                                    className={`rounded-2xl p-8 w-full max-w-sm relative z-10 shadow-2xl text-center ${theme.modal}`}
                                >
                                    <div className="w-20 h-20 bg-linear-to-br from-red-100 to-red-200 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <FaTrash size={28} />
                                    </div>
                                    <h2 className={`text-2xl font-bold mb-2 ${theme.textMain}`}>Confirm Delete</h2>
                                    <p className={`mb-8 ${theme.textSub}`}>
                                        Are you sure you want to remove <span className={`font-bold ${theme.textMain}`}>{pendingAction?.payload?.name}</span>? This action cannot be undone.
                                    </p>
                                    <div className="flex gap-3">
                                        <button 
                                            onClick={handleDeleteConfirm} 
                                            className="flex-1 bg-linear-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
                                        >
                                            Delete
                                        </button>
                                        <button 
                                            onClick={handleDismiss} 
                                            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${isDarkMode ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default UserDetails;