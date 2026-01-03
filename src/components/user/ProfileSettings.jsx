import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
 import UserNavbar from "./UserNavbar";



/* ---------- Simple Avatar (NO IMAGE) ---------- */
const Avatar = ({ name }) => {
  return (
    <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow">
      {name?.charAt(0).toUpperCase()}
    </div>
  );
};

const ProfileSettings = () => {
    const [user, setUser] = useState(null);

 
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  


  
  const token = localStorage.getItem("token");

  // ---------------- GET USER ----------------
  const getUser = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        "https://formbuilder-saas-backend.onrender.com/api/users/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.data);
    } catch (err) {
      console.log("Fetch user failed", err);
    }
  };

  // ---------------- UPDATE USER ----------------
  const updateUser = async (updatedData) => {
    try {
      const res = await axios.put(
        "https://formbuilder-saas-backend.onrender.com/api/users/profile/update",
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.data);
      return true;
    } catch (err) {
      console.log("Update failed", err);
      return false;
    }
  };

  // ---------------- DELETE USER ----------------
  const deleteUser = async () => {
    try {
      await axios.delete(
        "https://formbuilder-saas-backend.onrender.com/api/users/profile/delete",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      logout();
      return true;
    } catch (err) {
      console.log("Delete failed", err);
      return false;
    }
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };


   useEffect(() => {
    if (!user) getUser();
  }, [user, getUser]);
 if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const startEdit = () => setEditingUser({ name: user.name, email: user.email });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (await updateUser(editingUser)) {
      toast.success("Profile updated");
      setEditingUser(null);
    } else toast.error("Update failed");
  };

  const handleDelete = async () => {
    setDeleting(true);
    if (await deleteUser()) window.location.href = "/login";
    else toast.error("Delete failed");
    setDeleting(false);
  };

  return (
     <>
      <UserNavbar user={user} logout={logout} />
      <Toaster position="top-right" />

      {/* ================= MAIN ================= */}
      <div className="pt-20 h-screen bg-gray-100 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">

          {/* ================= LEFT PANEL ================= */}
          <div className="hidden md:flex flex-col justify-center items-center
                          bg-[#6C63FF] rounded-3xl text-white shadow-lg
                          relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-56 h-56
                            bg-white/20 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <Avatar name={user.name} />
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-sm opacity-90">{user.email}</p>
              <span className="px-4 py-1 bg-white/20 rounded-full text-sm">
                {user.role}
              </span>
            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="md:col-span-2 bg-white rounded-3xl
                          p-8 shadow-lg overflow-y-auto">
            <h1 className="text-2xl font-bold text-gray-800">
              Profile Settings
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Manage your account information
            </p>

            {/* DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-xs text-gray-500">Username</p>
                <p className="font-medium">{user.name}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border">
                <p className="text-xs text-gray-500">Role</p>
                <p className="font-medium">{user.role}</p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={startEdit}
                className="flex items-center gap-2 px-6 py-3
                           bg-[#6C63FF] text-white rounded-xl"
              >
                <FiEdit /> Edit Profile
              </button>
               
                 <button
    onClick={() => {
      logout();
       toast.success("Logged out successfully");
      window.location.href = "/login";
    }}
    className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-xl"
  >
    <LogOut /> Logout
  </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 px-6 py-3
                           bg-red-600 text-white rounded-xl"
              >
                <FiTrash2 /> Delete Account
              </button>
            </div>

            {/* EDIT FORM */}
            {editingUser && (
              <div className="bg-gray-50 border rounded-2xl p-6 space-y-4">
                <input
                  name="name"
                  value={editingUser.name}
                  onChange={handleChange}
                  className="w-full border px-4 py-3 rounded-xl"
                  placeholder="Name"
                />
                <input
                  name="email"
                  value={editingUser.email}
                  onChange={handleChange}
                  className="w-full border px-4 py-3 rounded-xl"
                  placeholder="Email"
                />

                <div className="flex gap-4">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 bg-[#6C63FF]
                               text-white py-3 rounded-xl"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingUser(null)}
                    className="flex-1 bg-gray-200 py-3 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= DELETE MODAL ================= */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-[90%] max-w-sm"
            >
              <h2 className="text-lg font-semibold">Delete Account</h2>
              <p className="text-sm text-gray-600 mb-4">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-5 py-2 bg-gray-200 rounded-lg"
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



export default ProfileSettings;
