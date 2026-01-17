import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiUser, FiMail, FiShield, FiLoader } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
import UserNavbar from "./UserNavbar";
import { useNavigate } from "react-router-dom";
import WaveBackground from "../dashboard/WaveBackground";
const ProfileSettings = () => {
  const [user, setUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API_BASE = "https://formbuilder-saas-backend.onrender.com/api/users/profile";

  // ---------------- GET USER (Memoized to prevent re-renders) ----------------
  const getUser = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
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

  // ---------------- ACTIONS ----------------
  const handleUpdate = async () => {
    if (!editingUser.name || !editingUser.email) return toast.error("Fields cannot be empty");
    
    setActionLoading(true);
    try {
      const res = await axios.put(`${API_BASE}/update`, editingUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data);
      localStorage.setItem("Name", res.data.data.name); // Sync with Navbar
      setEditingUser(null);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  const [passcode,setpasscode]=useState("");
  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await axios.delete(`${API_BASE}/delete`,{
        headers: { Authorization: `Bearer ${token}` },
        data: { password: passcode }
      });
      localStorage.clear();
      toast.success("Account deleted successfully");
      navigate("/register");
      setpasscode("");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Delete failed";
      toast.error(errorMsg);
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Waves in background */}
      <WaveBackground position="top" height="h-96" color="#6c2bd9" opacity={0.25} />
      <WaveBackground position="bottom" height="h-96" color="#6c2bd9" opacity={0.25} />

      {/* FormCraft Logo */}
      <div className="flex items-center gap-3 z-10 mb-8">
        <div className="w-12 h-12 bg-[#6C3BFF] rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white text-2xl font-bold">⧉</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">FormCraft</h1>
      </div>

      {/* Spinner */}
      <FaSpinner className="z-10 text-indigo-600 text-4xl animate-spin" />
    </div>
  );
}


  return (
    <div className="min-h-screen  relative font-sans bg-[#F8FAFC]">
      {/* <Toaster position="top-right" /> */}
      <UserNavbar />
        <WaveBackground position="top" />
                 <WaveBackground position="bottom"  />


      <main className="max-w-5xl relative z-10 mx-auto mt-10 pb-12 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 overflow-hidden border border-gray-100"
        >
          {/* Header Banner */}
          <div className="h-32 bg-violet-600 relative">
             <div className="absolute -bottom-12 left-8 p-1 bg-white rounded-2xl shadow-lg">
                <div className="w-24 h-24 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
             </div>
          </div>

          <div className="pt-16 px-8 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-50 pb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">{user?.name}</h1>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <FiMail className="text-indigo-400" /> {user?.email}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingUser({ name: user.name, email: user.email })}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                  <FiEdit size={16}/> Edit
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium flex items-center gap-2 hover:bg-gray-200 transition-all"
                >
                  <LogOut size={16}/> Logout
                </button>
              </div>
            </div>

            {/* Information Grid */}
            <AnimatePresence mode="wait">
              {!editingUser ? (
                <motion.div 
                  key="info"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8"
                >
                  <InfoCard icon={<FiUser />} label="Full Name" value={user?.name} />
                  <InfoCard icon={<FiMail />} label="Email Address" value={user?.email} />
                  <InfoCard icon={<FiShield />} label="Account Role" value={user?.role} isBadge />
                </motion.div>
              ) : (
                <motion.div 
                  key="edit"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="py-8 space-y-4 max-w-lg"
                >
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Display Name</label>
                    <input
                      name="name"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                      name="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button 
                      disabled={actionLoading}
                      onClick={handleUpdate}
                      className="flex-1 bg-indigo-600 text-white py-2 rounded-xl font-bold px-2 hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {actionLoading ? "Saving..." : "Save Changes"}
                    </button>
                    <button 
                      onClick={() => setEditingUser(null)}
                      className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Danger Zone */}
            <div className="mt-8 pt-8 border-t border-red-50">
               <h3 className="text-red-600 font-bold mb-2">Danger Zone</h3>
               <p className="text-gray-500 text-sm mb-4">Deleting your account will remove all your data permanently.</p>
               <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="text-red-600 font-semibold flex items-center gap-2 hover:underline"
                >
                  <FiTrash2 /> Delete Account
                </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-100 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 size={30} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Are you sure?</h2>
              <p className="text-gray-500 mt-2 mb-8">This action is irreversible. All your forms and data will be lost.</p>
              <div className="flex flex-col gap-3">
                <input
                value={passcode}
                onChange={(e)=>setpasscode(e.target.value)}
                type="password"
                 placeholder="Enter your Passcode"
                 className="w-full bg-gray-100 text-gray-600 text-center py-3 rounded-xl font-semibold  transition-all outline-none"
                />
                <button 
                  disabled={actionLoading}
                  onClick={handleDelete}
                  className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all"
                >
                  {actionLoading ? "Deleting..." : "Yes, Delete My Account"}
                </button>
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  No, Keep it
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reusable Info Component
const InfoCard = ({ icon, label, value, isBadge }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="text-indigo-500 mb-3 text-xl">{icon}</div>
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
    {isBadge ? (
      <span className="mt-1 inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase">
        {value}
      </span>
    ) : (
      <p className="text-gray-900 font-semibold mt-1 break-all">{value}</p>
    )}
  </div>
);

export default ProfileSettings;
