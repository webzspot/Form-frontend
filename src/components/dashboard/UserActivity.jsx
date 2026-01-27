import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../user/UserNavbar";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "../shared/LoadingScreen";
import { X, FileText, Calendar, Eye, MessageSquare, ArrowLeft} from "lucide-react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import WaveBackground from "./WaveBackground";
import { useFormContext } from './FormContext';

const UserActivity = () => {

  const { id } = useParams();
  const token = localStorage.getItem("token");
  const API_URL = `https://formbuilder-saas-backend.onrender.com/api/admin/users/${id}`;
  const navigate = useNavigate();

  // User and Forms state
  const [user, setUser] = useState(null);
  const [forms, setForms] = useState([]);
  const [formsLoading, setFormsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true); // Full-page loader

  // Modal state
  const [selectedForm, setSelectedForm] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);

  // Fetch user activity on mount
  useEffect(() => {
    fetchUserActivity();
  }, [id]);

  const fetchUserActivity = async () => {
    try {
      setPageLoading(true);
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setForms(res.data.user.form || []);
    } catch (err) {
      toast.error("Failed to load user activity");
    } finally {
      setFormsLoading(false);
      setPageLoading(false);
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

  // Closing form modal
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
            className="w-full px-2 py-2 border-2 border-slate-200 rounded-xl bg-slate-50 text-[12px] md:text-sm font-medium text-slate-600"
            required={field.isRequired}
          />
        );
      case "TEXTAREA":
        return (
          <textarea
            disabled
            placeholder={placeholder}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-50 text-sm font-medium text-slate-600 min-h-[100px]"
            required={field.isRequired}
          />
        );
      case "DROPDOWN":
        return (
          <div className="flex flex-col gap-2 mt-2">
            {field.options?.map((opt, i) => (
              <div
                key={i}
                className="px-2 py-2 text-[12px] md:text-sm  border-2 border-slate-200 rounded-xl bg-linear-to-r from-slate-50 to-slate-100 text-sm font-medium text-slate-400 hover:border-indigo-300 transition-colors"
              >
                {opt}
              </div>
            ))}
          </div>
        );
      case "RADIO":
      case "CHECKBOX":
        return (
          <div className="flex flex-col gap-3 mt-3">
            {field.options?.map((opt, i) => (
              <label key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 cursor-pointer group">
                <input
                  type={field.type === "RADIO" ? "radio" : "checkbox"}
                  disabled
                  required={field.isRequired && field.type === "RADIO"}
                  className="w-4 h-4 text-[12px] md:text-sm  accent-violet-500"
                />
                <span className=" transition-colors">{opt}</span>
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  
    // --- THEME CONFIGURATION ---
    const { isDarkMode } = useFormContext(); 
    const theme = {
    pageBg: isDarkMode 
      ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
      : "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95] selection:bg-purple-200",
    
    card: isDarkMode
      ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
      : "bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",

    input: isDarkMode
      ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
      : "bg-white/50 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",

    buttonPrimary: isDarkMode
      ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
      : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",

    textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/70",
    label: isDarkMode ? "text-gray-300" : "text-[#4c1d95]",
    
    previewBox: isDarkMode 
      ? "bg-[#1e1b4b]/40 border-purple-500/10" 
      : "bg-purple-50/50 border-purple-200/50",
    
    divider: isDarkMode ? "bg-purple-500/20" : "bg-purple-200"
  };


if (pageLoading) {
  return <LoadingScreen isDarkMode={isDarkMode} />;
}

  return (
    <>
      <UserNavbar />

    <div className={`min-h-screen relative font-sans transition-colors duration-500 overflow-hidden ${theme.pageBg}`}>
       <div className="absolute inset-0 z-0 pointer-events-none">
          <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
          <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
        </div>

        <div className="max-w-6xl mx-auto relative p-3 z-10 space-y-8">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate("/admindashboard")}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          className={`inline-flex items-center gap-2 mt-4 ml-2 px-5 py-2 rounded-xl border transition-all font-bold ${theme.card}`}
          >
            <ArrowLeft size={16} />
           <span className="hidden sm:block"> Back to Dashboard</span>
          </motion.button>

       {/* User Profile Card */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className={`${theme.card} rounded-2xl overflow-hidden border-none shadow-xl max-w-5xl mx-auto`}
>
  {/* Header Banner - Smaller Height */}
  <div className={`h-20 ${theme.buttonPrimary} opacity-80 relative`}>
    <div className="absolute -bottom-10 left-6">
      <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-white text-xl font-bold border-4 ${isDarkMode ? 'border-[#12121a] bg-purple-600' : 'border-white bg-violet-500'} shadow-lg`}>
        {getInitials(user.name)}
      </div>
    </div>
  </div>

  {/* User Info & Stats Container */}
  <div className="pt-12 px-6 pb-6">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      
      {/* Left Side: Identity */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <span className={`px-3 mt-2 rounded-full text-[10px] font-semibold border ${
            user.role === "ADMIN"
              ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
              : "bg-violet-200 border-blue-500/20"
          }`}>
            {user.role}
          </span>
        </div>
        <p className={`${theme.textSub} text-sm flex items-center gap-2`}>
          <span className="opacity-60">ID: {user.email}</span>
        </p>
      </div>

      {/* Right Side: Compact Stats */}
      <div className="flex gap-3">
        {/* Forms Count */}
        <div className={`${theme.previewBox} px-4 py-2 rounded-xl border flex flex-col items-center min-w-[100px]`}>
          <p className={`text-[12px] font-bold ${theme.textSub}`}>Total Forms</p>
          <p className="text-xl font-bold">{forms.length}</p>
        </div>

        {/* Member Date */}
        <div className={`${theme.previewBox} px-4 py-2 rounded-xl border flex flex-col items-center min-w-[100px]`}>
          <p className={`text-[12px] font-bold ${theme.textSub}`}>Joined</p>
          <p className="text-sm font-bold pt-1">
            {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </p>
        </div>
      </div>

    </div>
  </div>
</motion.div>
         

          {/* Forms Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                Forms Created by{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-purple-600">
                  {user.name}
                </span>
              </h2>
              <p className="text-[12px] font-semibold">
                View and manage all forms created by this user
              </p>
            </div>

        
          {/* Forms Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {formsLoading
    ? // --- SKELETON LOADING STATE (Theme Aware) ---
      Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={`animate-pulse ${theme.card} rounded-2xl h-64 flex flex-col justify-between p-6`}>
          <div className={`w-12 h-12 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'} rounded-xl mb-4`}></div>
          <div className={`h-6 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'} rounded w-3/4 mb-2`}></div>
          <div className={`h-4 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'} rounded w-full mb-2`}></div>
          <div className={`h-10 mt-4 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'} rounded-xl`}></div>
        </div>
      ))
    : forms.length === 0
    ? // --- EMPTY STATE (Theme Aware) ---
      <div className={`${theme.card} rounded-2xl border-2 border-dashed ${isDarkMode ? 'border-purple-500/20' : 'border-slate-300'} p-16 text-center col-span-full`}>
        <div className={`w-20 h-20 ${theme.previewBox} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <FileText className={theme.textSub} size={36} />
        </div>
        <p className={`font-semibold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-slate-600'}`}>No Forms Yet</p>
        <p className={theme.textSub}>{user.name} has not created any forms yet.</p>
      </div>
    : // --- ACTUAL FORMS LIST ---
      forms.map((form, index) => (
        <motion.div
          key={form.formId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`${theme.card} p-6 rounded-2xl border transition-all flex flex-col justify-between group hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]`}
        >
        

          <div className="flex-1">
            <h3 className={`text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors ${isDarkMode ? 'text-white' : 'text-[#4c1d95]'}`}>
              {form.title}
            </h3>
            <p className={`${theme.textSub} text-sm leading-relaxed mb-4 line-clamp-2`}>
              {form.description || "No description provided"}
            </p>
            <div className={`flex items-center gap-2 text-xs font-medium ${theme.textSub}`}>
              <Calendar size={14} />
              <span>
                Created on {new Date(form.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => openFormModal(form.formId)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 ${theme.buttonPrimary} rounded-xl text-sm font-bold transition-all transform active:scale-95`}
            >
              <Eye size={16} />
              View Form
            </button>
            <button
              onClick={() => navigate(`/admin/form/${form.formId}/responses`)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all border transform active:scale-95
                ${isDarkMode 
                  ? 'bg-purple-500/10 border-purple-500/30 text-white hover:bg-purple-500/20' 
                  : 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50 shadow-sm'}`}
            >
              <MessageSquare size={16} />
              Responses
            </button>
          </div>
        </motion.div>
 
                  ))}
            </div>
          </motion.div>

          {/* View Form Modal */}
 <AnimatePresence>
  {selectedForm && (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeFormModal}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 26, stiffness: 280 }}
        className={`
          relative z-10
          w-full max-w-md
          max-h-[85vh]
          flex flex-col
          rounded-xl
          overflow-hidden
          shadow-2xl
          mt-17
          ${theme.card}
        `}
      >

        {/* HEADER */}
        <div className={`relative px-8 py-6 ${theme.buttonPrimary}`}>
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

          <div className="relative flex justify-between gap-4">
            <div>
              <span className="inline-block mb-2 px-3 py-1 text-xs font-bold rounded-full bg-white/30 text-white backdrop-blur">
                Form Preview
              </span>
              <h2 className="text-xl font-semibold text-white leading-tight">
                {selectedForm?.title}
              </h2>
              <p className="text-sm text-purple-100/80 mt-1">
                {selectedForm?.description || "No description provided."}
              </p>
            </div>

  
          </div>
        </div>

        {/* BODY */}
        <div
          className={`
            flex-1 overflow-y-auto
            px-8 py-6 space-y-6
            custom-scrollbar
            ${isDarkMode ? 'bg-[#0f0f15]' : 'bg-slate-50'}
          `}
        >
          {loadingForm ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <FaSpinner className="animate-spin text-purple-500 text-4xl" />
              <p className={`text-xs font-bold tracking-widest ${theme.textSub}`}>
                LOADING FIELDS
              </p>
            </div>
          ) : selectedForm?.formField?.length > 0 ? (
            selectedForm.formField.map((field, index) => (
              <motion.div
                key={field.formFieldId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className={`
                  ${theme.previewBox}
                  p-5 rounded-2xl
                  border border-purple-500/10
                  hover:border-purple-500/30
                  transition
                `}
              >
                <div className="flex justify-between items-center mb-3">
                  <label className={`text-[12px] md:text-sm font-semibold ${isDarkMode ? 'text-purple-300' : 'text-slate-600'}`}>
                    {field.label}
                    {field.isRequired && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <span className="text-[10px] md:text-sm  opacity-40 font-bold uppercase">
                    {field.type}
                  </span>
                </div>

                {renderFieldPreview(field)}

              </motion.div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className={`w-20 h-20  mx-auto  flex items-center justify-center rounded-xl border border-dashed border-purple-500/30 ${theme.previewBox}`}>
                <FileText size={36} className="text-purple-400/50" />
              </div>
              <p className="text-lg font-bold">Empty Form</p>
              <p className={`text-sm mt-1 ${theme.textSub}`}>
                No fields added yet
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className={`px-4 py-4 flex gap-4 border-t border-purple-500/10 ${isDarkMode ? 'bg-[#12121a]' : 'bg-white'}`}>
          <button
            onClick={closeFormModal}
            className="flex-1  text-[10px] md:text-sm rounded-2xl font-semibold border transition
              bg-transparent
              border-purple-500/30
              hover:bg-purple-500/10
            "
          >
            Go Back
          </button>

          <button
            onClick={() => {
              navigate(`/admin/form/${selectedForm.formId}/responses`);
              closeFormModal();
            }}
            className={`flex-1 py-3 text-[10px] md:text-sm rounded-2xl font-semibold text-white ${theme.buttonPrimary} shadow-lg`}
          >
            Responses
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

export default UserActivity;


