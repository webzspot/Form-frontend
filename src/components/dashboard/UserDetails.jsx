import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { 
    FaUser, FaPlus, FaSearch, FaFilter, FaSortAmountDown, 
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
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

const UserDetails= () => { 
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

     const theme = {
  pageBg: isDarkMode
    ? "bg-[#05070f] text-white selection:bg-purple-500/30"
    : "bg-slate-50 text-slate-900 selection:bg-purple-200",

  card: isDarkMode
    ? "bg-[#12121a]/90 border border-purple-500/20"
    : "bg-white border-slate-200 shadow-xl shadow-slate-200/40",

  headerCard: isDarkMode
    ? "bg-linear-to-r from-indigo-900 via-purple-900 to-slate-900"
    : "bg-linear-to-r from-violet-600 via-purple-600 to-indigo-700",

  tableHeader: isDarkMode
    ? "bg-[#1e1b4b]/50 text-purple-200"
    : "bg-slate-50 text-slate-600",

  modalBg: isDarkMode
    ? "bg-[#0f1220] text-white"
    : "bg-white text-slate-800",

  input: isDarkMode
    ? "bg-slate-900 border-purple-500/30 text-white placeholder:text-gray-400"
    : "bg-slate-50 border-slate-200 text-slate-800",

  textMuted: isDarkMode ? "text-gray-400" : "text-slate-500",
  border: isDarkMode ? "border-purple-500/20" : "border-slate-200"
};








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


const COLORS = ["#7c3aed", "#c4b5fd"];

    // Helper function to get user avatar initials
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

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

    return (
        <>
            
            <div className={`min-h-screen relative font-sans transition-colors duration-500 ${theme.pageBg}`}>
                <UserNavbar />
{/* 
                <div className="absolute top-0 left-0 w-full h-320px overflow-hidden z-0">
    <svg
        viewBox="0 0 1440 320"
        className="w-full h-full"
        preserveAspectRatio="none"
    >
        <path
            fill="#7c3aed"
            fillOpacity="0.12"
            d="M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,186.7C840,192,960,192,1080,176C1200,160,1320,128,1380,112L1440,96L1440,0L1380,0L1320,0L1200,0L1080,0L960,0L840,0L720,0L600,0L480,0L360,0L240,0L120,0L60,0L0,0Z"
        />
    </svg>
</div>  */} 

 
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
  <WaveBackground
    position="top"
    color={isDarkMode ? "#1e1b4b" : "#6c2bd9"}
  />
  <WaveBackground
    position="bottom"
    color={isDarkMode ? "#1e1b4b" : "#6c2bd9"}
  />
</div>
                <div className="relative z-10 p-4 md:p-8 font-sans text-slate-900">
                    {/* Header Section with Image */}
                    <motion.div 
                        className="max-w-7xl mx-auto mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className={`${theme.headerCard} rounded-3xl shadow-2xl`}>
                            <div className="flex flex-col md:flex-row items-center justify-between p-8 gap-6">
                                <div className="flex-1 text-white">
                                    <h1 className=" text-xl md:text-4xl font-bold mb-2">User Management</h1>
                                    <p className="text-violet-100 text-sm md:text-lg">  View and manage user accounts, roles, and access permissions while maintaining secure and organized control over your platform.</p>
                                </div>
                                
                            </div>
                        </div>

                      
                    </motion.div> 

            
{/* User Overview Chart  */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
 className={`max-w-7xl mx-auto mb-10 rounded-3xl overflow-hidden ${theme.card}`}
>
  

  {/* Content */}
  <div className="p-6"> 
 {loading ? (
    <ChartSkeleton />
  ) : userData.length === 0 ? (
    <p className="text-center text-slate-400 font-medium py-20">
      No users available
    </p>
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
    
              >
                {userChartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              {/* <Tooltip 
                 contentStyle={{
                   backgroundColor: isDarkMode ? '#1e1b4b' : '#ffffff', // dark/light bg
    color: isDarkMode ? '#ffffff' : '#000000',   
    border: isDarkMode ? '1px solid #7c3aed' : '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                 }}
              /> */}
<Tooltip
  content={({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
      <div
        className="p-3 rounded-xl shadow-lg"
        style={{
          backgroundColor: isDarkMode ? '#1e1b4b' : '#ffffff',
          border: isDarkMode ? '1px solid #7c3aed' : '1px solid #e2e8f0',
          color: isDarkMode ? '#ffffff' : '#000000', // <- text color
        }}
      >
        {payload.map((item, index) => (
          <div key={index} className="flex justify-between gap-2">
            <span>{item.name}</span>
            <span className="font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }}
/>


            </PieChart>
          </ResponsiveContainer> 
     


          {/* Center Total Display */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className={theme.textMain}>{userData.length}</p>
            <p  className={theme.textMuted}>Total Users</p>
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
         className={`rounded-2xl p-6 shadow-md transition-all ${
  isDarkMode
    ? "bg-fuchsia-500/10 border border-fuchsia-500/30"
    : "bg-linear-to-br from-fuchsia-50 to-fuchsia-100 border-2 border-fuchsia-200"
}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-fuchsia-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <FaUserCheck size={24} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-fuchsia-700 uppercase tracking-wider mb-1">
                  Active Users
                </p>
                <p  className={isDarkMode ? "text-fuchsia-300" : "text-fuchsia-700"}>
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
          className={`rounded-2xl p-6 shadow-md transition-all ${
  isDarkMode
    ? "bg-fuchsia-500/10 border border-fuchsia-500/30"
    : "bg-linear-to-br from-fuchsia-50 to-fuchsia-100 border-2 border-fuchsia-200"
}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-sky-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <FaUserTimes size={24} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-sky-700 uppercase tracking-wider mb-1">
                  Inactive Users
                </p>
                <p  className={isDarkMode ? "text-fuchsia-300" : "text-fuchsia-700"}>
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
                    <div className={`max-w-7xl mx-auto rounded-2xl overflow-hidden ${theme.card}`}>   

                        <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 border-b ${theme.border} ${
  isDarkMode ? "bg-slate-900/40" : "bg-slate-50/60"
}`}
>
    <h2 className="text-lg font-bold text-slate-800">
      Users
    </h2>

    <div className="flex gap-3">
      <motion.button
        onClick={() => {
          setIsAddMode(true);
          setEditingUser({ name: "", email: "", password: "", role: "" });
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-xl shadow-md"
      >
        <FaPlus size={14} />
        Add New User
      </motion.button>

      <motion.button
        onClick={() => navigate("/admin/forms")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 border-2 text-white px-4 py-2.5 rounded-xl shadow-md"
      >
        <FaArrowRight size={16} />
        Go To Forms
      </motion.button>
    </div>
  </div>





                        <div  className={`p-6 border-b flex flex-col lg:flex-row gap-4 ${theme.border} ${
    isDarkMode ? "bg-slate-900/30" : "bg-white"
  }`}>
                            <div className="relative flex-1">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                  className={`w-full pl-11 pr-4 py-3 font-semibold rounded-xl outline-none focus:ring-2 focus:ring-violet-500 transition-all ${theme.input}`}
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
                                    className={`px-4 py-3 font-semibold rounded-xl outline-none focus:ring-2 focus:ring-violet-500 transition-all ${theme.input}`}
                                >
                                    <option value="all">All Roles</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="USER">User</option>
                                </select>
                                <select 
                                    value={sortBy} 
                                    onChange={(e) => setSortBy(e.target.value)} 
                                    className="px-4 py-3 font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                                >
                                    <option value="">Sort By</option>
                                    <option value="name-asc">A-Z</option>
                                    <option value="name-desc">Z-A</option>
                                    <option value="date-new">Newest</option>
                                </select>
                            </div>
                        </div>

                        <div className='overflow-x-auto'>
                            <table className='w-full text-left'>
                                <thead className={`${theme.tableHeader} border-b ${theme.border}`}>
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">User Info</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Joined Date</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Activity</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                         <TableSkeleton rows={5} columns={6} />
                                    ) : currentData.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-16">
                                                <div className="flex flex-col items-center justify-center">
                                                   
                                                    <p className="text-xl font-semibold text-slate-700 mb-2">No users found</p>
                                                   
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        currentData.map((user,index) => (
                                            <motion.tr key={user.userId} 
                                                initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}//
                                           className={`transition-colors group ${
  isDarkMode ? "hover:bg-purple-500/5" : "hover:bg-indigo-100/30"
}`}>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {/* Avatar with initials */}
                                                        <div className={`w-10 h-10 ${getAvatarColor(user.role)} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                                                            {getInitials(user.name)}
                                                        </div>
                                                        <div>
                                                            <div className={theme.textMuted}>{user.name}</div>
                                                            <div className="text-sm text-slate-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                                    <div>{new Date(user.createdAt).toLocaleDateString()}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button 
                                                        onClick={() => navigate(`/admin/users/${user.userId}/activity`)}
                                                        className="px-4 py-2 text-sm rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-all shadow-sm hover:shadow-md"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-700 border border-green-200" : "bg-gray-100 text-gray-600 border border-gray-200"}`}>
                                                        {user.status === "Active" ? <FaCheckCircle size={10} /> : <FaTimesCircle size={10} />}
                                                        {user.status || "Inactive"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center relative">
                                                    <button 
                                                        onClick={() => setOpenMenuIndex(openMenuIndex === user.userId ? null : user.userId)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-all"
                                                    >
                                                        •••
                                                    </button>
                                                    {openMenuIndex === user.userId && (
                                                        <div className={`absolute right-12 top-0 rounded-xl shadow-2xl z-50 min-w-[140px] py-2 ${
    isDarkMode
      ? "bg-slate-900 border border-purple-500/30 text-white"
      : "bg-white border border-slate-200"
  }`}>
                                                            <div className="flex justify-between items-center px-3 pb-2 border-b border-slate-100 mb-1">
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Options</span>
                                                                <button onClick={() => setOpenMenuIndex(null)} className="text-slate-300 hover:text-red-500 transition-colors"><FaTimes size={10}/></button>
                                                            </div>
                                                            <button onClick={() => { setEditingUser(user); setIsAddMode(false); setOpenMenuIndex(null); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-violet-50 hover:text-violet-600 transition-colors">
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
                        <div  className={`flex justify-between items-center px-6 py-4 border-t ${theme.border} ${
    isDarkMode ? "bg-slate-900/40" : "bg-slate-50/50"
  }`}
>
                            <span className="text-sm text-slate-600 font-medium">Page {currentPage} of {totalPages}</span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={prevPage} 
                                    disabled={currentPage === 1} 
                                    className="px-5 py-2 border-2 border-slate-300 rounded-xl disabled:opacity-30 text-slate-700 font-semibold hover:bg-slate-100 transition-all disabled:hover:bg-transparent"
                                >
                                    Prev
                                </button>
                                <button 
                                    onClick={nextPage} 
                                    disabled={currentPage === totalPages} 
                                    className="px-5 py-2 bg-violet-600 text-white font-semibold rounded-xl disabled:opacity-30 hover:bg-violet-700 transition-all disabled:hover:bg-violet-600"
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
                            className={`fixed top-0 right-0 h-full w-full max-w-md shadow-2xl z-50 overflow-y-auto ${theme.modalBg}`}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className={`text-2xl font-bold ${theme.textMain}`}>{isAddMode ? "Create New User" : "Edit User Profile"}</h2>
                                    <button 
                                        onClick={handleDismiss} 
                                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                    >
                                        <FaTimes size={20} className="text-slate-400" />
                                    </button>
                                </div>

                                {/* User Icon*/}
                                <div className="mb-6 rounded-2xl overflow-hidden h-32 bg-linear-to-r from-violet-500 to-purple-600 flex items-center justify-center">
                                    <FaUser size={48} className="text-white/30" />
                                </div>

                                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); isAddMode ? handleAddUser() : handleUpdate(); }}>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            value={editingUser.name} 
                                            onChange={handleEditChange} 
                                            required 
                                           className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${theme.input}`}
                                            placeholder="Enter full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            value={editingUser.email} 
                                            onChange={handleEditChange} 
                                            required 
                                           className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${theme.input}`}
                                            placeholder="user@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            {isAddMode ? "Password" : "New Password (Optional)"}
                                        </label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            value={editingUser.password || ""} 
                                            onChange={handleEditChange} 
                                            required={isAddMode} 
                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${theme.input}`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Account Role</label>
                                        <select 
                                            name="role" 
                                            value={editingUser.role} 
                                            onChange={handleEditChange} 
                                            required 
                                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${theme.input}`}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="ADMIN">Admin</option>
                                            <option value="USER">User</option>
                                        </select>
                                    </div>
                                    <div className="pt-6 flex gap-3">
                                        <button 
                                            type="submit" 
                                            className="flex-1 bg-linear-to-r from-violet-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                                        >
                                            {isAddMode ? "Create User" : "Update Profile"}
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={handleDismiss} 
                                            className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
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
                            className={`fixed inset-0${
        isDarkMode ? "bg-slate-900/80" : "bg-slate-900/40 backdrop-blur-sm"
    }`}
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            exit={{ scale: 0.9, opacity: 0 }} 
                           className={`rounded-2xl p-8 shadow-2xl ${theme.modalBg}`}
                        >
                            <div className="w-20 h-20 bg-linear-to-br from-red-100 to-red-200 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <FaTrash size={28} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Confirm Delete</h2>
                            <p className="text-slate-500 mb-8">
                                Are you sure you want to remove <span className="font-bold text-slate-700">{pendingAction?.payload?.name}</span>? This action cannot be undone.
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
                                    className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-all"
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



