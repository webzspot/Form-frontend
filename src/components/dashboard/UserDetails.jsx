import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { 
    FaUser,FaFileAlt,  FaPlus, FaSearch, FaFilter, FaSortAmountDown, 
    FaTrash, FaEdit, FaTimes, FaCheckCircle, FaTimesCircle, 
    FaUserCheck, FaUserTimes,FaArrowDown,FaCopy
} from 'react-icons/fa';
import { MoreVertical } from 'lucide-react';
import CardSkeleton from './CardSkeleton';

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast  from "react-hot-toast";
import UserNavbar from '../user/UserNavbar';
import usePagination from '../../hooks/usePagination';
import TableSkeleton from './TableSkeleton';

import { useFormContext } from "../dashboard/FormContext";
import UserFooter from '../user/UserFooter';

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
    const token = sessionStorage.getItem("token");
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
        } catch (error) {
            //toast.error("Failed to fetch users");
              const status = error.response?.status;
                const message = error.response?.data?.message;
            
                
                if (status === 404 && message?.toLowerCase().includes("no")) {
                  setPreviewFields([]);
                }
                
                else if(status===429){
                  toast.error("Too many requests. Please try again later.")
                }
               
                else if (status === 401) {
                  toast.error("Session expired. Please login again.");
                  
                }
            
                else {
                  toast.error("Failed to load data");
                  console.error("REAL ERROR:", error);
                }
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
            const res = await axios.post(API_BASE_URL, { ...editingUser }, {
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
   




  // Theme Logic from AllReports
  const theme = {
   
    
    card:  "bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",

    input: "bg-white/50 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",

    buttonPrimary:  "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",

    textSub:  "text-[#4c1d95]/70",
    
    text:"text-violet-800",
  };

    return (
        <>
            <UserNavbar />
            <div className={`relative  font-sans bg-[#F5F6F8]  min-h-screen w-full overflow-hidden `}> 
  
                <div className="relative z-10  max-w-7xl mx-auto px-4 md:px-6 text-slate-900">
                  
            
              {/* New Modern Header Section */}
<motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className={` mb-8  relative mt-8 overflow-hidden flex flex-col md:flex-row md:justify-between `}
>
   
     <div className='max-w-md '>
        <h1 className={`text-3xl font-bold  leading-tight tracking-tight align-middle mb-2 text-[#14181F]`}>
            User Management
        </h1>
        <p className={` text-sm font-normal leading-5 align-middle text-[#6A7181]`}>
            View and manage user accounts, roles, and access permissions while maintaining secure and organized control over your platform.
        </p>
    </div>  
    
                        <div className="flex flex-col mt-4 lg:flex-row lg:items-center lg:justify-between gap-4  ">
   

    <div className="flex  gap-3">
    

      <motion.button
        onClick={() => navigate("/admin/forms")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
       className={`px-4 md:px-6 py-2.5  font-medium leading-5 text-center align-middle rounded-md text-[#2B4BAB] text-sm transition-all border border-[#2B4BAB] flex items-center gap-1 sm:gap-2
               
                disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed`}
        >
        
        Go To Forms
      </motion.button>


        <motion.button
        onClick={() => {
          setIsAddMode(true);
          setEditingUser({ name: "", email: "", password: "", role: "USER" });
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
       className={`px-4 md:px-6 py-2.5  font-medium leading-5 text-center align-middle rounded-md bg-[#2B4BAB] text-white text-sm transition-all border border-[#2B4BAB] flex items-center gap-1 sm:gap-2
                disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed`}
        
      >
      
        Add New User
      </motion.button>
    </div>
  </div>
    
   
</motion.div>




                        <div className=" pr-2 py-2  rounded-md mb-8 flex flex-col md:flex-row gap-4 justify-between md:bg-[#FFFFFF] md:border md:border-[#E5E7EB] md:shadow-sm items-center">
    
   
    <div className="relative   w-full md:flex-1">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
            className="w-full px-10 py-2 text-[10px] sm:border  border-black/30 sm:text-sm font-semibold placeholder:text-gray-400 border md:border-white/10 rounded-md outline-none transition-all"
            type="text"
            placeholder="Search name or email..."
            value={searchedUser}
            onChange={(e) => setSearchedUser(e.target.value)}
        />
    </div>

   
    <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="w-full">
            <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className={`w-full md:w-auto px-2 py-2 cursor-pointer text-[10px] sm:text-sm font-bold rounded-md  border border-black/30 outline-none transition-all bg-white text-black`}
            >
                <option value="">Sort By</option>
                <option value="name-asc">A-Z (Name)</option>
                <option value="name-desc">Z-A (Name)</option>
                <option value="date-new">Newest First</option>
            </select>
        </div>
    </div>
</div>
          
                     <div className={` ` }>


                        <div className='hidden md:block overflow-x-auto rounded-md border bg-[#FFFFFF] border-[#E9EAEB] mb-4 ' >
                            <table className={`w-full text-left `}>
                                <thead className={`bg-white  text-[#535862] border-b border-[#E9EAEB]`}>
                                    <tr>
                                         <th className="px-6 py-4 text-xs font-semibold ">
                                           <div className="flex items-center gap-2 group cursor-pointer">
                                      
        
                                             <span>User Info</span>
                                            
                                                <FaArrowDown className="" />
                                             
                                           </div>
                                           </th>
                                      
                                     <th className="px-6 py-4 text-xs font-semibold ">
                                           <div className="flex items-center gap-2 group cursor-pointer">
                                             <span>Role</span>
                                            
                                                <FaArrowDown className="" />
                                             
                                           </div>
                                         </th>
                                     
                                         <th className="px-6 py-4 text-xs font-semibold ">
                                           <div className="flex items-center gap-2 group cursor-pointer">
                                             <span>Joined Date</span>
                                            
                                                <FaArrowDown className="" />
                                             
                                           </div></th>
                                           <th className="px-6 py-4 text-xs font-semibold ">
                                           <div className="flex items-center gap-2 group cursor-pointer">
                                             <span>Activity</span>
                                            
                                                <FaArrowDown className="" />
                                             
                                           </div></th>
                                         <th className="px-6 py-4 text-xs font-semibold ">
                                           <div className="flex items-center gap-2 group cursor-pointer">
                                             <span>Status</span>
                                            
                                                <FaArrowDown className="" />
                                             
                                           </div></th>
                                              <th className="px-6 py-4 text-xs font-semibold ">
                                           <div className="flex items-center gap-2 group cursor-pointer">
                                             <span>Action</span>
                                            
                                                <FaArrowDown className="" />
                                             
                                           </div></th>
                                
                                    </tr>
                                </thead>


                                
                                <tbody >
                                    {loading ? (
                                          <TableSkeleton rows={5} columns={6}  />
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
                                            className="hover:bg-[#F5F6F8] border-b border-[#E9EAEB] transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                      
                                                        <div >
                                                            
                                                            <div className="text-sm font-medium leading-5 tracking-normal text-[#181D27] ">{user.name}</div>
                                                           
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={   ` text-sm font-medium leading-5 tracking-normal text-[#181D27]  `}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium leading-5 tracking-normal text-[#181D27] ">
                                                    <div>{new Date(user.createdAt).toLocaleDateString()}</div>
                                                </td>
                                                <td className=" px-6 py-4 cursor-pointer text-sm font-medium leading-5 tracking-normal text-[#181D27]">
                                                    <button 
                                                        onClick={() => navigate(`/admin/users/${user.userId}/activity`)}
                                                      className={`
                                                      
                                                    disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed`}
                                                      >
                                                        View
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center  text-sm font-medium leading-5 tracking-normal    ${user.status === "Active" ? " text-gray-600 " : " text-[#00B712]"}`}>
                                                        
                                                        {user.status || "Inactive"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-start relative">
                                                    <button 
                                                        onClick={() => setOpenMenuIndex(openMenuIndex === user.userId ? null : user.userId)}
                                                        className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded-full   transition-all"
                                                    >
                                                          <MoreVertical size={20}  className='text-[#535862]'/> 
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
                            
                       
                                 
<div className=" hidden md:flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-[#E9EAEB]">
    
    
    <span className="text-sm text-[#414651] font-medium order-1 md:order-2">
        Page {currentPage} of {totalPages}
    </span>

   
    <div className="flex gap-3 w-full md:w-auto order-2 md:order-1">
        <button 
            onClick={prevPage} 
            disabled={currentPage === 1} 
            className="flex-1 md:flex-none px-5 py-2 rounded-md font-semibold text-sm border border-[#D5D7DA] text-[#414651] disabled:opacity-30 hover:bg-slate-50 transition-all"
        >
            Previous
        </button>
        <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages} 
            className="flex-1 md:flex-none px-5 py-2 rounded-md font-semibold text-sm border border-[#D5D7DA] text-[#414651] disabled:opacity-40 transition-all shadow-sm"
        >
            Next
        </button>
    </div>
</div>
                        </div>

                    </div>
                </div>
            
            
            {/* Mobile Card View  */}
<div className="grid grid-cols-1  max-w-md w-full px-4 mb-4 gap-4 md:hidden">
 
{loading ? (
  <div className="flex flex-col gap-4">
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </div>
) : currentData.length === 0 ? (
    <div className="bg-white p-10 text-center rounded-xl border border-[#E9EAEB]">
       <FaFileAlt className="text-slate-400 mx-auto mb-4" size={36} />
       <p className="font-semibold text-lg">No Details found</p>
    </div>
  ) : (
    currentData.map((user, index) => (
      <motion.div 
        key={user.userId}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white p-4 rounded-md border border-[#E9EAEB] shadow-sm relative"
      >
        {/* User Header in Card */}
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="text-sm font-bold text-[#181D27]">{user.name}</h3>
            <p className="text-xs text-[#6A7181]">{user.role}</p>
          </div>
          {/* Status Badge */}
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${user.status === "Active" ? "bg-gray-100 text-gray-600" : "bg-green-50 text-[#00B712]"}`}>
            {user.status || "Inactive"}
          </span>
        </div>

        {/* Details Row */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-50">
          <div className="text-[11px] text-[#6A7181]">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => navigate(`/admin/users/${user.userId}/activity`)}
              className="text-xs font-semibold text-[#2B4BAB] px-3 py-1 border border-[#2B4BAB] rounded-md"
            >
              View Activity
            </button>
            <button 
              onClick={() => setOpenMenuIndex(openMenuIndex === user.userId ? null : user.userId)}
              className="p-1 hover:bg-slate-100 rounded-full"
            >
              <MoreVertical size={18} className='text-[#535862]'/>
            </button>
          </div>
        </div>

        {/* Reusing your existing Menu Logic inside the card */}
        {openMenuIndex === user.userId && (
          <div className="absolute right-4 bottom-12 bg-white border border-[#E9EAEB] rounded-xl shadow-xl z-50 min-w-[140px] py-2">
            <button onClick={() => { setEditingUser(user); setIsAddMode(false); setOpenMenuIndex(null); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-violet-50 hover:text-violet-600 transition-colors">
              <FaEdit size={12}/> Edit
            </button>
            <button onClick={() => { setPendingAction({ type: "delete", payload: user }); setShowConfirmModal(true); setOpenMenuIndex(null); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
              <FaTrash size={12}/> Delete
            </button>
          </div>
        )}
      </motion.div>
    ))
  )}
</div>
                           
<div className=" md:hidden flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-[#E9EAEB]">
    
 
    <span className="text-sm text-[#414651] font-medium order-1 md:order-2">
        Page {currentPage} of {totalPages}
    </span>

    
    <div className="flex gap-3 w-full md:w-auto order-2 md:order-1">
        <button 
            onClick={prevPage} 
            disabled={currentPage === 1} 
            className="flex-1 md:flex-none px-5 py-2 rounded-md font-semibold text-sm border border-[#D5D7DA] text-[#414651] disabled:opacity-30 hover:bg-slate-50 transition-all"
        >
            Previous
        </button>
        <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages} 
            className="flex-1 md:flex-none px-5 py-2 rounded-md font-semibold text-sm border border-[#D5D7DA] text-[#414651] disabled:opacity-40 transition-all shadow-sm"
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
                className="fixed inset-0 bg-slate-900/50 z-40"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
               
                className="fixed left-1/2 top-1/2 z-50 flex flex-col h-full md:max-h-[90vh]  w-full  md:max-w-[500px] lg:max-w-[600px] bg-white md:rounded-[10px] shadow-2xl overflow-y-auto"
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className={`font-semibold text-base leading-6 tracking-normal text-[#000000] `}>{isAddMode ? "Add New User" : "Edit User Profile"}</h2>
                        <button
                            onClick={handleDismiss}
                            className="p-2 cursor-pointer"
                        >
                            <FaTimes className="text-[#181D27] w-[12px] h-[12px] " />
                        </button>
                    </div>

                    <div className='border border-[#E9EAEB] rounded-md px-6 pt-4'>
                        <p className='font-medium text-base leading-6 tracking-normal text-[#1D2026]'>Basic Info</p>

                        <div className="flex items-center gap-4 mb-8 border-b pb-4 border-[#E9EAEB] ">
                            <div className="w-[100px] h-[98px] bg-[#F5F7FA] mt-4 rounded-lg flex items-center justify-center border border-slate-200">
                                {editingUser.name ? (
                                    <span className="text-2xl font-bold text-slate-400">
                                        {editingUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </span>
                                ) : (
                                    <FaUser size={40} className="text-slate-300" />
                                )}
                            </div>
                        </div>

                        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); isAddMode ? handleAddUser() : handleUpdate(); }}>
                            <div className='flex flex-col md:flex-row justify-between gap-3'>
                                <div>
                                    <label className={`font-medium text-sm text-[#414651] mb-2`}>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editingUser.name}
                                        onChange={handleEditChange}
                                        required
                                        className={`w-full px-4 py-3 mt-4 rounded-md text-semibold outline-none border border-[#E9EAEB]`}
                                        placeholder="Enter full name"
                                    />
                                </div>
                                <div>
                                    <label className={`font-medium text-sm text-[#414651] mb-2`}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editingUser.email}
                                        onChange={handleEditChange}
                                        required
                                        className={`w-full px-4 py-3 rounded-md mt-4 text-semibold outline-none border border-[#E9EAEB] `}
                                        placeholder="user@example.com"
                                    />
                                </div>
                            </div>

                            <div className="relative border mb-4 border-[#E9EAEB] p-6 rounded-xl">
                                <label className="font-medium text-base text-[#1D2026] ">{isAddMode ? "Create Password" : "Change Password"}</label>
                                <div className="relative flex gap-2 justify-between items-center">
                                    <input
                                        type="password"
                                        name="password"
                                        value={editingUser.password || ""}
                                        onChange={handleEditChange}
                                        className="w-full px-4 py-3 pr-12 mt-4 rounded-xl border border-slate-200 outline-none"
                                        placeholder="••••••••"
                                    />
                                    <div className='border p-2 mt-4 rounded-md border-[#E9EAEB]'>
                                        <button
                                            type="button"
                                            onClick={() => navigator.clipboard.writeText(editingUser.password)}
                                            className="p-2 text-[#252B37] hover:text-indigo-600"
                                        >
                                            <FaCopy size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mt-4">
    <label className="font-medium text-sm text-[#414651] mb-2">User Role</label>
    <select
        name="role"
        value={editingUser.role}
        onChange={handleEditChange}
        className="w-full px-4 py-3 rounded-md border border-[#E9EAEB] outline-none bg-white font-semibold"
    >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
    </select>
   
</div>

                            <div className="pt-6 flex mb-4 justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleDismiss}
                                    className={`text-[#252B37] border border-[#D5D7DA] px-8 rounded-md py-3 font-semibold text-base`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`text-white bg-[#2B4BAB] border px-8 border-[#D5D7DA] py-3 rounded-md font-semibold text-base transition-all shadow-lg `}
                                >
                                    {isAddMode ? "Save" : "Edit"}
                                </button>
                            </div>
                        </form>
                    </div>
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
                            className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm
    }`}
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            exit={{ scale: 0.9, opacity: 0 }} 
                           className={`rounded-md p-8 w-[300px] shadow-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]`}
                        >
                            <div className="sm:w-20 sm:h-20 w-10 h-10 bg-linear-to-br from-red-100 to-red-200 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <FaTrash size={25} />
                            </div>
                            <h2 className={`text-xl font-bold text-gray-500 mb-2`}>Confirm Delete</h2>
                            <p className={`text-gray-500 text-[10px] sm:text-sm mb-8`}>
                                Are you sure you want to remove <span className="font-bold text-slate-700">{pendingAction?.payload?.name}</span>? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button 
                                    onClick={handleDeleteConfirm} 
                                    className="flex-1 bg-linear-to-r from-red-600 to-red-700 text-white sm:py-3 py-1 text-[10px] sm:text-sm rounded-md font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
                                >
                                    Delete
                                </button>
                                <button 
                                    onClick={handleDismiss} 
                                    className="flex-1 bg-slate-100 text-slate-600 sm:py-3 py-1 text-[10px] sm:text-sm rounded-md font-semibold hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                        
                    </div>
                )}
            </AnimatePresence>
    <UserFooter/>
        </>
    );
};

export default UserDetails;