import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../user/UserNavbar";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FiLoader } from "react-icons/fi";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserActivity = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const API_URL = `https://formbuilder-saas-backend.onrender.com/api/admin/users/${id}`;
  const navigate=useNavigate()

  // User and Forms state
  const [user, setUser] = useState(null);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [selectedForm, setSelectedForm] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);

  // Fetch user activity on mount
  useEffect(() => {
    fetchUserActivity();
  }, [id]);

  const fetchUserActivity = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setForms(res.data.user.form || []);
    } catch (err) {
      toast.error("Failed to load user activity");
    } finally {
      setLoading(false);
    }
  };

  // Open modal to view form details 
  const openFormModal = async (formId) => {
    try {
       

    setSelectedForm(null);
    setLoadingForm(true);
      const res = await axios.get(
        `https://formbuilder-saas-backend.onrender.com/api/admin/form/${formId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedForm(res.data.data);
    } catch (err) {
      toast.error("Failed to load form details");
    } finally {
      setLoadingForm(false);
    }
  };
   
  //Closing form modal
  const closeFormModal = () => {
  setSelectedForm(null);
};



  // Render input placeholders for preview
  const renderFieldPreview = (field) => {
  const placeholder = `Preview for ${field.type}`;
  switch (field.type) {
    case "TEXT":
    case "EMAIL":
    case "NUMBER":
    case "DATE":
      return (
        <input
          disabled
          type={field.type === "TEXT" ? "text" : field.type.toLowerCase()}
          placeholder={placeholder}
          className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm mt-2"
          required={field.isRequired}
        />
      );
    case "TEXTAREA":
      return (
        <textarea
          disabled
          placeholder={placeholder}
          className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-sm mt-2"
          required={field.isRequired}
        />
      );
     case "DROPDOWN":
  return (
    <div className="flex flex-col gap-2 mt-2">
      {field.options?.map((opt, i) => (
        <div
          key={i}
          className="px-3 py-2 border rounded-lg bg-gray-100 text-sm text-gray-700"
        >
          {opt}
        </div>
      ))}
    </div>
  );
      
    case "RADIO":
    case "CHECKBOX":
      return (
        <div className="flex flex-col gap-1 mt-2">
          {field.options?.map((opt, i) => (
            <label key={i} className="flex items-center gap-2 text-sm">
              <input
                type={field.type === "RADIO" ? "radio" : "checkbox"}
                disabled
                required={field.isRequired && field.type === "RADIO"}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      );
    default:
      return null;
  }
};
    



  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <FiLoader className="animate-spin text-indigo-600 text-4xl" />
      </div>
    );
  }

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-[#F8FAFC] p-6">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* User Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
          >
            <div className="h-28 bg-violet-600 relative">
              <div className="absolute -bottom-10 left-8 bg-white p-1 rounded-2xl shadow-lg">
                <div className="w-20 h-20 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            <div className="pt-14 px-8 pb-6">

       

              <h1 className="text-3xl font-extrabold text-slate-900">{user.name}</h1>
              <p className="text-slate-500 mt-1">{user.email}</p>
              <span className="inline-block mt-3 px-4 py-1.5 rounded-full text-xs font-bold uppercase bg-indigo-50 text-indigo-700">
                {user.role}
              </span>
            </div>
          </motion.div>

          {/* Forms List */}
          <div>

   <span
    onClick={() => navigate("/admindashboard")}
    className="inline-flex items-center gap-1 cursor-pointer text-lg font-semibold text-slate-500 hover:text-indigo-600 transition"
  >
    ← Back 
  </span>


            <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
              Forms created by <span className="text-3xl text-indigo-600 italic font-bold">{user.name}</span>
            </h2>

            {forms.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
                <p className="text-slate-500 text-sm">{user.name} has not created any forms yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {forms.map((form) => (
                  <motion.div
                    key={form.formId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition  flex flex-col justify-between"
                  >
                    <h3 className="text-xl font-bold text-indigo-700">{form.title}</h3>
                    <p className="text-slate-500 text-sm mt-2">{form.description}</p>
                    <p className="text-xs text-slate-400 mt-4">Created on {new Date(form.createdAt).toLocaleDateString()}</p>

                    <div className="flex gap-2 mt-4">
                       <button
               onClick={() => openFormModal(form.formId)}
                className="flex-1 px-4 py-2 bg-black text-white rounded-xl text-sm font-semibold" >
              View Form
          </button>
         <button
  onClick={() => navigate(`/admin/form/${form.formId}/responses`)}
  className="flex-1 px-4 py-2 bg-gray-200 text-black rounded-xl text-sm font-semibold"
>
  Responses
</button>

           </div>
 </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Form Modal */}
      <AnimatePresence>
        {selectedForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            {/* Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFormModal}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
            >
              
               {/* Header */}
<div className="p-8 flex justify-between items-start">
  <div>
   <h2 className="text-2xl text-black font-semibold mb-2">
  {selectedForm?.title}

</h2>
   <p className="text-black/60">
  {selectedForm?.description || "No description provided."}
</p>

  </div>

  <button
    onClick={closeFormModal}
    className="bg-gray-100 hover:bg-violet-600 hover:text-white p-2 rounded-full transition-colors"
  >
    <X size={24} />
  </button>
</div>
             {/* Body */}
<div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/50">

  {/* FORM PREVIEW */}
  {selectedForm && (
    selectedForm.formField?.map((field) => (
      <div
        key={field.formFieldId}
        className="bg-white p-6 border border-gray-100 shadow-sm rounded-xl"
      >
        <label className="block text-xs font-bold uppercase text-black mb-2">
          {field.label}
          {field.isRequired && <span className="text-red-500">*</span>}
        </label>

        {renderFieldPreview(field)}
      </div>
    ))
  )}

</div>
              {/* Footer Buttons */}
              <div className="p-6 bg-white border-t border-gray-200 flex gap-4">
                <button
                  onClick={closeFormModal}
                  className="flex-1 py-3 bg-black text-white rounded-xl font-bold"
                >
                  Close
                </button>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserActivity;




