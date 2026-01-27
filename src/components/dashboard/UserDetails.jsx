import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { 
    FaUser,FaFileAlt,  FaPlus, FaSearch, FaFilter, FaSortAmountDown, 
    FaTrash, FaEdit, FaTimes, FaCheckCircle, FaTimesCircle, 
    FaUserCheck, FaUserTimes,FaArrowRight
} from 'react-icons/fa';

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast  from "react-hot-toast";
import UserNavbar from '../user/UserNavbar';
import usePagination from '../../hooks/usePagination';
import TableSkeleton from './TableSkeleton';
import WaveBackground from "./WaveBackground";
import { useFormContext } from "../dashboard/FormContext";


const UserDetails= () => { 
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
    const { isDarkMode } = useFormContext();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const API_BASE_URL = 'https://formbuilder-saas-backend.onrender.com/api/admin/users';
    useEffect(() => {
        getAllUsers();
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
            const res = await axios.post(API_BASE_URL, { ...editingUser, role: "USER" }, {
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
const COLORS = ["#7c3aed", "#c4b5fd"];
 // Helper function to get user avatar initials
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2); };
 // Helper function to get avatar color based on name
  const getAvatarColor = (role) => {
    if (role === "ADMIN") return "bg-violet-600";
    return "bg-blue-600"; // USER
};
const ChartSkeleton = () => (
  <div className="h-[300px] flex items-center justify-center">
    <div className="w-40 h-40 rounded-full border-4 border-slate-200 border-t-violet-500 animate-spin"></div>
  </div>
);

const SparkleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

  // Theme Logic from AllReports
  const theme = {
    pageBg: isDarkMode 
      ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
      : "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95] selection:bg-purple-200",
    
    card: isDarkMode
      ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
      : "bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",

    input: isDarkMode
      ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
      : "bg-white/50 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",

    buttonPrimary: isDarkMode
      ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
      : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",

    textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/70",
    tableHeader: isDarkMode ? "bg-[#1e1b4b]/60 text-purple-300" : "bg-purple-200/50 text-[#4c1d95]",
    text:isDarkMode ? "text-white" : "text-violet-800",
  };

    return (
        <>
            <UserNavbar />
            <div className={`relative ${theme.pageBg} font-sans  min-h-screen w-full overflow-hidden ${isDarkMode ? 'bg-[#8b5cf6]/50 text-white shadow-purple-500/40' : 'bg-white text-[#6C63FF] shadow-indigo-200'}`}> 
   <div className="absolute inset-0 z-0 pointer-events-none">
                    <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
                    <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
                    
                    <motion.div 
                        animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }} 
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute top-1/4 left-10 text-white/40 text-4xl"
                    >
                        <SparkleIcon className="w-8 h-8" />
                    </motion.div>
                </div>
                <div className="relative z-10 p-4 md:p-8 font-sans text-slate-900">
                  
            
              {/* New Modern Header Section */}
<motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-8 rounded-3xl mb-8 shadow-2xl mt-5 relative overflow-hidden max-w-7xl mx-auto ${isDarkMode ? 'bg-[#8b5cf6]/50 text-white shadow-purple-500/40' : 'bg-white shadow-indigo-200'}`}
>
    <div className="relative z-10">
       
        <h1 className={`text-3xl font-bold mb-2  ${isDarkMode ? 'text-white' : 'text-[#4c1d95]'}`}>
            User Management
        </h1>
        <p className={`font-semibold/70 text-sm ${theme.textSub}`}>
            View and manage user accounts, roles, and access permissions while maintaining secure and organized control over your platform.
        </p>
    </div>
    
    {/* Optional: Add a subtle glow effect for dark mode */}
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[100px] rounded-full"></div>
</motion.div>

            {/* Filters and Table */}
                    {/* <div className={max-w-7xl mx-auto ${theme.pageBg} rounded-2xl  shadow-md overflow-hidden}>    */}
                     <div className={`rounded-xl max-w-7xl mx-auto ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-violet-300/50'}`}>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-6 ">
   

    <div className="flex gap-3">
      <motion.button
        onClick={() => {
          setIsAddMode(true);
          setEditingUser({ name: "", email: "", password: "", role: "USER" });
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
       className={`px-4 py-2 rounded-xl text-[10px] sm:text-sm font-semibold transition-all shadow-md flex items-center gap-1 sm:gap-2
                ${theme.buttonPrimary} 
                disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed`}
        
      >
        <FaPlus size={14} />
        Add New User
      </motion.button>

      <motion.button
        onClick={() => navigate("/admin/forms")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
       className={`px-4 py-2 rounded-xl font-semibold text-[10px] sm:text-sm transition-all shadow-md flex items-center gap-1 sm:gap-2
                ${theme.buttonPrimary} 
                disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed`}
        >
        <FaArrowRight size={16} />
        Go To Forms
      </motion.button>
    </div>
  </div>
<div className="px-4 py-2  border-slate-100 flex flg:flex-col gap-1 items-center">
                            <div className="relative flex-1">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    className={`w-full px-10 py-2 text-[10px] sm:text-sm font-semibold ${theme.input} border border-white/10  rounded-xl outline-none transition-all`}
                                    type="text" outline-none
                                    placeholder="Search name or email..."
                                    value={searchedUser}
                                    onChange={(e) => setSearchedUser(e.target.value)}
                                />
                            </div>
                   

<div className="flex items-center gap-2">
 
  {/* Sort By Styled Select Container */}
  <div >
    <select 
      value={sortBy} 
      onChange={(e) => setSortBy(e.target.value)} 
       className={`px-2 py-2 cursor-pointer  text-[10px] sm:text-sm font-bold rounded-xl border border-black/30 outline-none transition-all ${
        isDarkMode 
          ? "bg-[#12121a] border-purple-500/20 text-white hover:border-purple-500/50 " 
          : "bg-white  border-purple-100 text-[#4c1d95] hover:border-purple-300  "
      }`}
    >
      <option value="">Sort By</option>
      <option value="name-asc">A-Z (Name)</option>
      <option value="name-desc">Z-A (Name)</option>
      <option value="date-new">Newest First</option>
    </select>
    
   
    
  </div>
</div>
                        </div>

                        <div className='overflow-x-auto ' >
                            <table className={`w-full text-left ${theme.pageBg}`}>
                                <thead className={`${theme.tableHeader}`}>
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold  uppercase ">User Info</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase ">Role</th>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase ">Joined Date</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold  uppercase">Activity</th>
                                        <th className="px-6 py-4 text-xs font-semibold  uppercase ">Status</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold  uppercase ">Actions</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {loading ? (
                                          <TableSkeleton rows={5} columns={6} isDarkMode={isDarkMode} />
                                    ) : currentData.length === 0 ? (
                                        <tr>
                                             <td colSpan="6" className="px-6 py-20 text-center">
    <div className="flex flex-col items-center justify-center w-full">
      <FaFileAlt className="text-slate-400 mx-auto mb-4" size={36} />
      <p className="font-semibold text-lg">No Details found</p>
    </div>
  </td>
                                        </tr>
                                    ) : (
                                        currentData.map((user,index) => (
                                            <motion.tr key={user.userId} 
                                                initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="hover:bg-indigo-100/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {/* Avatar with initials */}
                                                       <div className={`sm:w-10 sm:h-10 w-7 h-7 ${getAvatarColor(user.role)} rounded-full 
    ${isDarkMode ? 'bg-violet-500' : `${theme.buttonPrimary}`} 
    flex items-center justify-center text-white font-semibold text-sm shadow-md`}>
    {getInitials(user.name)}
</div>
                                                        <div >
                                                            <div className="text-[13px] sm:text-sm font-semibold">{user.name}</div>
                                                            <div className={` text-[10px] sm:text-sm ${theme.textSub}`}>{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700  border-purple-200' : 'bg-purple-100 text-violet-800 '}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-[10px] sm:text-sm font-medium">
                                                    <div>{new Date(user.createdAt).toLocaleDateString()}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button 
                                                        onClick={() => navigate(`/admin/users/${user.userId}/activity`)}
                                                      className={`px-2 text-[10px] sm:text-sm py-1 rounded-xl font-semibold transition-all text-sm shadow-md flex items-center
                                                      ${theme.buttonPrimary} 
                                                    disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed`}
                                                      >
                                                        View
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${user.status === "Active" ? " text-gray-600 border border-gray-200" : " border-gray-200"}`}>
                                                        {user.status === "Active" ? <FaCheckCircle size={10} /> : <FaTimesCircle size={10} />}
                                                        {user.status || "Inactive"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center relative">
                                                    <button 
                                                        onClick={() => setOpenMenuIndex(openMenuIndex === user.userId ? null : user.userId)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded-full  hover:text-slate-600 transition-all"
                                                    >
                                                        •••
                                                    </button>
                                                    {openMenuIndex === user.userId && (
                                                        <div className={`absolute right-12 top-0 ${theme.card}  rounded-xl shadow-2xl z-50 min-w-[140px] py-2`}>
                                                            <div className="flex justify-between items-center px-3 pb-2  mb-1">
                                                                <span className="text-[10px] font-bold  uppercase">Options</span>
                                                                <button onClick={() => setOpenMenuIndex(null)} className="text-slate-300 hover:text-red-500 transition-colors"><FaTimes size={10}/></button>
                                                            </div>
                                                            <button onClick={() => { setEditingUser(user); setIsAddMode(false); setOpenMenuIndex(null); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm  hover:bg-violet-50 hover:text-violet-600 transition-colors">
                                                                <FaEdit size={12}/> Edit
                                                            </button>
                                                            <button onClick={() => { setPendingAction({ type: "delete", payload: user }); setShowConfirmModal(true); setOpenMenuIndex(null); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
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
                        <div className="flex justify-between items-center px-6 py-4 ">
                            <span className="text-sm text-slate-600 font-medium">Page {currentPage} of {totalPages}</span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={prevPage} 
                                    disabled={currentPage === 1} 
                                    className={`px-5 py-2 rounded-xl disabled:opacity-30 ${theme.text} font-semibold hover:bg-slate-100 transition-all disabled:hover:bg-transparent`}
                                >
                                    Prev
                                </button>
                                <button 
                                    onClick={nextPage} 
                                    disabled={currentPage === totalPages} 
                                   className={`px-4 py-2 rounded-xl font-semibold transition-all shadow-md flex items-center gap-2
                ${theme.buttonPrimary} 
                disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed`}
        >
                                    Next
                                </button>
                            </div>
                        </div>
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
                            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40" 
                        />
                        <motion.div 
                            initial={{ x: "100%" }} 
                            animate={{ x: 0 }} 
                            exit={{ x: "100%" }} 
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className={`fixed top-0 right-0 h-full w-full max-w-md  shadow-2xl z-50 ${theme.card}   overflow-y-auto `}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className={`text-2xl font-bold ${theme.text} `}>{isAddMode ? "Create New User" : "Edit User Profile"}</h2>
                                    <button 
                                        onClick={handleDismiss} 
                                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                    >
                                        <FaTimes size={20} className="text-slate-400" />
                                    </button>
                                </div>

                                {/* User Icon*/}
                                <div className={`mb-6 rounded-2xl overflow-hidden h-32 ${theme.buttonPrimary} flex items-center justify-center`}>
                                    <FaUser size={48} className="text-white/30" />
                                </div>

                                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); isAddMode ? handleAddUser() : handleUpdate(); }}>
                                    <div>
                                        <label className={`block text-sm font-semibold ${theme.text} mb-2`}>Full Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            value={editingUser.name} 
                                            onChange={handleEditChange} 
                                            required 
                                            // className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" 
                                            className={`${theme.input} w-full px-4 py-3 rounded-xl text-semibold outline-none` }
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                    <div>
                                        <label className={`${theme.text} block text-sm font-semibold text-slate-700 mb-2`}>Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            value={editingUser.email} 
                                            onChange={handleEditChange} 
                                            required 
                                           className={`${theme.input} w-full px-4 py-3 rounded-xl text-semibold outline-none` }
                                            placeholder="user@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-semibold  ${theme.text} mb-2`}>
                                            {isAddMode ? "Password" : "New Password (Optional)"}
                                        </label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            value={editingUser.password || ""} 
                                            onChange={handleEditChange} 
                                            required={isAddMode} 
                                            className={`${theme.input} w-full px-4 py-3 rounded-xl text-semibold outline-none` }
                                            placeholder={isAddMode ? "Enter password" : "Leave blank to keep current"}
                                        />
                                    </div>
                                    
                                    <div className="pt-6 flex gap-3">
                                        <button 
                                            type="submit" 
                                            className={`flex-1 text-white py-3 rounded-xl font-bold ${theme.buttonPrimary} transition-all shadow-lg hover:shadow-xl`}
                                        >
                                            {isAddMode ? "Create User" : "Update Profile"}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={handleDismiss} 
                                            // className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
                                            className={`${theme.input} flex-1 rounded-xl py-3 px-4 font-bold`}
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
                    <div className="fixed inset-0 flex items-center justify-center z-100 sm:p-4 p-7">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            onClick={handleDismiss} 
                            className={`fixed inset-0${
        isDarkMode ? "bg-slate-900/80" : "bg-slate-900/40 backdrop-blur-sm"
    }`}
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            exit={{ scale: 0.9, opacity: 0 }} 
                           className={`rounded-2xl p-8 w-[300px] shadow-2xl ${theme.card}`}
                        >
                            <div className="sm:w-20 sm:h-20 w-10 h-10 bg-linear-to-br from-red-100 to-red-200 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <FaTrash size={25} />
                            </div>
                            <h2 className={`sm:text-2xl font-bold ${theme.text} mb-2`}>Confirm Delete</h2>
                            <p className={`${theme.text} text-[10px] sm:text-sm mb-8`}>
                                Are you sure you want to remove <span className="font-bold text-slate-700">{pendingAction?.payload?.name}</span>? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button 
                                    onClick={handleDeleteConfirm} 
                                    className="flex-1 bg-linear-to-r from-red-600 to-red-700 text-white sm:py-3 py-1 text-[10px] sm:text-sm rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
                                >
                                    Delete
                                </button>
                                <button 
                                    onClick={handleDismiss} 
                                    className="flex-1 bg-slate-100 text-slate-600 sm:py-3 py-1 text-[10px] sm:text-sm rounded-xl font-semibold hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                        
                    </div>
                )}
            </AnimatePresence>

        </>
    );
};

export default UserDetails;