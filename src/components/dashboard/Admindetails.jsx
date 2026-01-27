import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
    FaUser, FaPlus, FaSearch, FaTrash, FaEdit, FaTimes 
} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import UserNavbar from '../user/UserNavbar';
import usePagination from '../../hooks/usePagination';
import TableSkeleton from './TableSkeleton';
import WaveBackground from "./WaveBackground";
import { useFormContext } from "../dashboard/FormContext";

const Admindetails = () => {
    const [userData, setUserData] = useState([]);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [searchedUser, setSearchedUser] = useState("");
    const [sortBy, setSortBy] = useState('');
    const [isAddMode, setIsAddMode] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [adminConfirmPassword, setAdminConfirmPassword] = useState(""); 
    
    const { isDarkMode } = useFormContext();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const API_BASE_URL = 'https://formbuilder-saas-backend.onrender.com/api/admin/admins';

    // Unified Theme Object
    const theme = {
        pageBg: isDarkMode 
            ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
            : "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95] selection:bg-purple-200",
        card: isDarkMode
            ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-xl"
            : "bg-white backdrop-blur-xl border border-white/60 shadow-lg",
        input: isDarkMode
            ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
            : "bg-white border border-purple-100 text-[#4c1d95] placeholder-[#4c1d95]/40 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]",
        buttonPrimary: isDarkMode
            ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",
        textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/50",
        tableHeader: isDarkMode ? "bg-[#1e1b4b]/60 text-purple-300" : "bg-purple-100 text-[#4c1d95]",
        divider: isDarkMode ? "border-purple-500/10" : "border-purple-100"
    };

    useEffect(() => {
        getAllAdmins();
    }, []);

    const getAllAdmins = async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_BASE_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // The data arrives with .userId as per your console log
            setUserData(res.data.data); 
        } catch (err) {
            toast.error("Failed to fetch admin details");
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
            const res = await axios.post(API_BASE_URL, {
                name: editingUser.name,
                email: editingUser.email,
                password: editingUser.password,
                role: "ADMIN"
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData([...userData, res.data.data]);
            toast.success("Admin created successfully"); 
            handleDismiss();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add admin");
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.patch(`${API_BASE_URL}/${editingUser.userId}`, 
            { role: editingUser.role }, 
            { headers: { Authorization: `Bearer ${token}` } });

            setUserData(userData.map(user => user.userId === editingUser.userId ? res.data.data : user));
            toast.success("Role updated successfully"); 
            handleDismiss();
        } catch (err) {
            toast.error("Failed to update role");
        }
    };

    const handleDeleteConfirm = async () => {
        if (!adminConfirmPassword) return toast.error("Admin password required");
        
        try {
            await axios.delete(`${API_BASE_URL}/${pendingAction.payload.userId}`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { password: adminConfirmPassword } 
            });
            setUserData(userData.filter(u => u.userId !== pendingAction.payload.userId));
            toast.success("Admin deleted successfully");
            handleDismiss();
        } catch (err) {
            toast.error(err.response?.data?.message || "Incorrect Password");
        }
    };

    const handleDismiss = () => {
        setEditingUser(null);
        setIsAddMode(false);
        setPendingAction(null);
        setShowConfirmModal(false);
        setOpenMenuIndex(null);
        setAdminConfirmPassword("");
    };

    const processedUsers = useMemo(() => {
        return [...userData]
            .filter(user =>
                user.name?.toLowerCase().includes(searchedUser.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchedUser.toLowerCase())
            );
    }, [userData, searchedUser]);

    const { currentData } = usePagination(processedUsers, 10);

    const getInitials = (name) => name?.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2) || "AD";

    return (
        <>
            <UserNavbar />
            <div className={`relative min-h-screen w-full transition-colors duration-500 ${theme.pageBg}`}>
                {/* Background Waves */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <WaveBackground position="top" height="h-[500px]" color={isDarkMode ? "#1e1b4b" : "#c084fc"} />
                </div>

                <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
                    {/* Header Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
                        className={`p-8 rounded-3xl mb-8 shadow-2xl  ${isDarkMode ? 'bg-[#8b5cf6]/50 text-white shadow-purple-500/40' : 'bg-white shadow-indigo-200'}`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h1 className="sm:text-3xl text-2xl font-bold mb-2">Admin Management</h1>
                                <p className={`${theme.textSub} text-[10px] sm:text-sm`}>Full control over system administrators and permissions.</p>
                            </div>
                            <button onClick={() => { setIsAddMode(true); setEditingUser({ name: "", email: "", password: "", role: "ADMIN" }); }} 
                                className={`px-6 py-3 rounded-2xl font-bold flex  items-center gap-2 transition-all active:scale-95 ${theme.buttonPrimary}`}>
                                <FaPlus /> Create New Admin
                            </button>
                        </div>
                    </motion.div>

                    {/* Table Section */}
                    <div className={`rounded-3xl overflow-hidden shadow-xl ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-violet-300/50'}`}>
                        <div className="px-6 py-6 border-b border-white/10">
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
                                <input className={`w-full pl-12 pr-4 py-3 rounded-2xl outline-none transition-all ${theme.input}`} 
                                    type="text" placeholder="Search by name or email..." value={searchedUser} onChange={(e) => setSearchedUser(e.target.value)} />
                            </div>
                        </div>

                        <div className='overflow-x-auto'>
                            <table className="w-full text-left">
                                <thead className={theme.tableHeader}>
                                    <tr>
                                        <th className="px-8 py-5 text-sm font-bold uppercase ">Administrator</th>
                                        <th className="px-8 py-5 text-sm font-bold uppercase ">Role</th>
                                        <th className="px-8 py-5 text-sm font-bold uppercase">Joined Date</th>
                                        <th className="px-8 py-5 text-sm font-bold uppercase text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className={`${theme.input}`}>
                                    {loading ?  <p className={`py-10 px-10 ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-violet-300/50'} font-bold text-lg`}>Loading..</p> : currentData.map((user) => (
                                        <tr key={user.userId} className="hover:bg-purple-500/5 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg ${theme.buttonPrimary}`}>
                                                        {getInitials(user.name)}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold ">{user.name}</div>
                                                        <div className={theme.textSub}>{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-4 py-1.5 rounded-xl text-xs font-bold ${isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 '}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-medium">
                                                {new Date(user.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                                            </td>
                                            <td className="px-8 py-5 text-center relative">
                                                <button onClick={() => setOpenMenuIndex(openMenuIndex === user.userId ? null : user.userId)}
                                                    className={`p-2 rounded-xl hover:bg-purple-500/10 transition-all ${isDarkMode ? 'text-white' : 'text-purple-900'}`}>
                                                    <div className="flex gap-1  font-black">•••</div>
                                                </button>
                                                
                                                <AnimatePresence>
                                                    {openMenuIndex === user.userId && (
                                                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                            className={`absolute right-12 top-0 ${theme.card} border rounded-2xl shadow-2xl z-50 min-w-[160px] py-2 overflow-hidden`}>
                                                            <button onClick={() => { setEditingUser(user); setIsAddMode(false); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-500/10 transition-colors text-sm font-bold"><FaEdit className="text-blue-500" /> Edit User</button>
                                                            <button onClick={() => { setPendingAction({ type: "delete", payload: user }); setShowConfirmModal(true); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-red-500 transition-colors text-sm font-bold"><FaTrash /> Delete Admin</button>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Drawer */}
                <AnimatePresence>
                    {editingUser && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleDismiss} className="fixed inset-0 bg-black/60 backdrop-blur-md z-40" />
                            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className={`fixed top-0 right-0 h-full w-full sm:w-3/5 z-50 p-8 flex flex-col ${theme.card}`}>
                                <div className="flex justify-between items-center mb-10">
                                    <h2 className="font-bold text-xl sm:text-3xl">{isAddMode ? "New Admin" : "Edit Admin"}</h2>
                                    <button onClick={handleDismiss} className="p-2 rounded-full hover:bg-white/10 transition-all"><FaTimes sm:size={24}/></button>
                                </div>
                                <form className="space-y-6 flex-1" onSubmit={(e) => { e.preventDefault(); isAddMode ? handleAddUser() : handleUpdate(); }}>
                                    <div className="space-y-2">
                                        <label className="text-sm sm:text-lg block font-bold opacity-60">Full Name</label>
                                        <input className={`w-full p-4 rounded-2xl outline-none ${theme.input}`} name="name" value={editingUser.name} onChange={handleEditChange} required disabled={!isAddMode} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm sm:text-lg block font-bold opacity-60">Email</label>
                                        <input className={`w-full p-4 rounded-2xl outline-none ${theme.input}`} name="email" value={editingUser.email} onChange={handleEditChange} required disabled={!isAddMode} />
                                    </div>
                                    {isAddMode ? (
                                        <div className="space-y-2">
                                            <label className="text-sm sm:text-lg block font-bold opacity-60"> Password</label>
                                            <input className={`w-full p-4 rounded-2xl outline-none ${theme.input}`} type="password" name="password" onChange={handleEditChange} required minLength={6} />
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <label className="text-sm sm:text-lg block font-bold opacity-60">Account Access</label>
                                            <select className={`w-full p-4 rounded-2xl outline-none appearance-none ${theme.input}`} name="role" value={editingUser.role} onChange={handleEditChange}>
                                                <option value="ADMIN">ADMIN</option>
                                                <option value="USER">USER (Demote)</option>
                                            </select>
                                        </div>
                                    )}
                                    <div className="sm:pt-10 flex gap-4">
                                        <button type="submit" className={`flex-1 sm:py-4 py-2 rounded-2xl font-bold transition-all ${theme.buttonPrimary}`}>{isAddMode ? "Create Admin" : "Save Changes"}</button>
                                    </div>
                                </form>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Delete Modal */}
                <AnimatePresence>
                    {showConfirmModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleDismiss} className="fixed inset-0 bg-black/80 backdrop-blur-xl" />
                            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className={`rounded-3xl p-8 w-full max-w-sm relative z-10 text-center shadow-2xl ${theme.card}`}>
                                <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-12"><FaTrash size={32}/></div>
                                <h2 className="text-2xl font-bold mb-2">Are you sure?</h2>
                                <p className={`${theme.textSub} text-sm mb-8`}>Enter your password to permanently delete <br/><span className="font-bold text-red-400">{pendingAction?.payload?.name}</span></p>
                                <input type="password" placeholder="Confirm Admin Password" 
                                    className={`w-full p-4 rounded-2xl mb-6 outline-none text-center ${theme.input}`}
                                    value={adminConfirmPassword} onChange={(e) => setAdminConfirmPassword(e.target.value)} />
                                <div className="flex flex-col gap-3">
                                    <button onClick={handleDeleteConfirm} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-red-600/20">Delete Permanently</button>
                                    <button onClick={handleDismiss} className={`w-full py-4 rounded-2xl font-bold ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>Cancel</button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Admindetails;