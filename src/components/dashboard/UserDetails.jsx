import React, { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { 
    FaUser, FaPlus, FaSearch, FaFilter, FaSortAmountDown, 
    FaTrash, FaEdit, FaTimes, FaCheckCircle, FaTimesCircle, 
    FaUserCheck 
} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import UserNavbar from '../user/UserNavbar';
import usePagination from '../../hooks/usePagination';

const UserDetails = () => {
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

    return (
        <>
            <Toaster />
            <UserNavbar />
            <div className='bg-slate-50 min-h-screen w-full p-4 md:p-8 font-sans text-slate-900'>
                
                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
                        <p className="text-slate-500">Manage your organization's members and their roles.</p>
                    </div>
                    <div className='flex max-w-4xl gap-4'>
                        <button
                            onClick={() => { setIsAddMode(true); setEditingUser({ name: "", email: "", password: "", role: "" }); }}
                            className="flex items-center justify-center gap-1 bg-violet-600 hover:bg-violet-700 text-white px-3 py-3 rounded-xl shadow-lg transition-all active:scale-95"
                        >
                            <FaPlus size={14} /> Add New User
                        </button>
                        <button
                            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-black text-white px-3 py-3 rounded-xl shadow-lg transition-all active:scale-95"
                            onClick={() => navigate("/admin/forms")}
                        >
                            View All Forms
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="max-w-7xl flex flex-wrap mx-auto mb-8 gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 min-w-[200px]">
                        <div className="bg-indigo-100 p-4 rounded-xl text-indigo-600"><FaUser size={24} /></div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total</p>
                            <p className="text-2xl font-bold text-slate-800">{userData.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 min-w-[200px]">
                        <div className="bg-green-100 p-4 rounded-xl text-green-600"><FaUserCheck size={24} /></div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Active</p>
                            <p className="text-2xl font-bold text-green-600">{activeUsersCount}</p>
                        </div>
                    </div>
                </div>

                {/* Filters and Table */}
                <div className='max-w-7xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
                    <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                className="w-full pl-11 pr-4 py-2.5 font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
                                type="text"
                                placeholder="Search name or email..."
                                value={searchedUser}
                                onChange={(e) => setSearchedUser(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="px-4 py-2.5 font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none">
                                <option value="all">All Roles</option>
                                <option value="ADMIN">Admin</option>
                                <option value="USER">User</option>
                            </select>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2.5 font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none">
                                <option value="">Sort By</option>
                                <option value="name-asc">A-Z</option>
                                <option value="name-desc">Z-A</option>
                                <option value="date-new">Newest</option>
                            </select>
                        </div>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='w-full text-left'>
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">User Info</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Role</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Joined Date</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase">Activity</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {currentData.map((user) => (
                                    <tr key={user.userId} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800">{user.name}</div>
                                            <div className="text-sm text-slate-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            <div>{new Date(user.createdAt).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button 
                                                onClick={() => navigate(`/admin/users/${user.userId}/activity`)}
                                                className="px-3 py-1.5 text-sm rounded-lg bg-violet-600 text-white hover:bg-black transition"
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                                {user.status === "Active" ? <FaCheckCircle size={10} /> : <FaTimesCircle size={10} />}
                                                {user.status || "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center relative">
                                            <button 
                                                onClick={() => setOpenMenuIndex(openMenuIndex === user.userId ? null : user.userId)}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-slate-200 rounded-full text-slate-400"
                                            >
                                                •••
                                            </button>
                                            {openMenuIndex === user.userId && (
                                                <div className="absolute right-12 top-0 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 min-w-[140px] py-2">
                                                    <div className="flex justify-between items-center px-3 pb-2 border-b border-slate-50 mb-1">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Options</span>
                                                        <button onClick={() => setOpenMenuIndex(null)} className="text-slate-300 hover:text-red-500"><FaTimes size={10}/></button>
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100">
                        <span className="text-sm text-slate-500">Page {currentPage} of {totalPages}</span>
                        <div className="flex gap-2">
                            <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 border border-black/40 rounded-xl disabled:opacity-30 text-black/40 font-semibold">Prev</button>
                            <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-violet-600 text-white font-semibold rounded-xl disabled:opacity-30">Next</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Slide-over for Add/Edit */}
            <AnimatePresence>
                {editingUser && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleDismiss} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 " />
                        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 p-4 overflow-y-scroll">
                            <div className="flex justify-between items-center mb-8 ">
                                <h2 className="text-2xl font-bold text-slate-800">{isAddMode ? "Create User" : "Edit Profile"}</h2>
                                <button onClick={handleDismiss} className="p-2 hover:bg-slate-100 rounded-full"><FaTimes size={20} className="text-slate-400" /></button>
                            </div>
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); isAddMode ? handleAddUser() : handleUpdate(); }}>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                    <input type="text" name="name" value={editingUser.name} onChange={handleEditChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-violet-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                    <input type="email" name="email" value={editingUser.email} onChange={handleEditChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-violet-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">{isAddMode ? "Password" : "New Password (Optional)"}</label>
                                    <input type="password" name="password" value={editingUser.password || ""} onChange={handleEditChange} required={isAddMode} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-violet-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Account Role</label>
                                    <select name="role" value={editingUser.role} onChange={handleEditChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none">
                                        <option value="">Select Role</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="USER">User</option>
                                    </select>
                                </div>
                                <div className="pt-6 flex gap-3">
                                    <button type="submit" className="flex-1 bg-violet-600 text-white py-3 rounded-xl font-bold hover:bg-violet-700 transition-all">
                                        {isAddMode ? "Save User" : "Update Profile"}
                                    </button>
                                    <button type="button" onClick={handleDismiss} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200">Cancel</button>
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
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleDismiss} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl p-6 w-full max-w-sm relative z-10 shadow-2xl text-center">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4"><FaTrash size={24} /></div>
                            <h2 className="text-xl font-bold text-slate-800 mb-2">Confirm Delete</h2>
                            <p className="text-slate-500 mb-6">Are you sure you want to remove <b>{pendingAction?.payload?.name}</b>?</p>
                            <div className="flex gap-3">
                                <button onClick={handleDeleteConfirm} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-semibold hover:bg-red-700">Delete</button>
                                <button onClick={handleDismiss} className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl font-semibold hover:bg-slate-200">Cancel</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default UserDetails;