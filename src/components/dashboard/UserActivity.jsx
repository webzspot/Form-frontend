import React, { useEffect, useState,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../user/UserNavbar";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import { X, FileText, Calendar, Eye,CheckCircle, MessageSquare, ArrowLeft} from "lucide-react";
import { FaCheckCircle, FaSpinner, FaSearch, FaArrowLeft } from "react-icons/fa";
import UserFooter from "../user/UserFooter";

import ErrorLayout from "../shared/ErrorLayout"
const UserActivity = () => {

  const { id } = useParams();
  
  const token = sessionStorage.getItem("token");
  const API_URL = `https://formbuilder-saas-backend.onrender.com/api/admin/users/${id}`;
  const navigate = useNavigate();

  // User and Forms state
  const [user, setUser] = useState(null);
  const [forms, setForms] = useState([]);
  const [formsLoading, setFormsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true); 

  // Modal state
  const [selectedForm, setSelectedForm] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);

  const [visibleCount, setVisibleCount] = useState(6); 
const [searchTerm, setSearchTerm] = useState(""); 
 

 const [apiError, setApiError] = useState(null);
const [errorMessage, setErrorMessage] = useState("");



  useEffect(() => {
    fetchUserActivity();
  }, [id]);

  const fetchUserActivity = async () => {
    try {
      setPageLoading(true);
     
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setUser(res.data.data);
      console.log(res.data)
      setForms(res.data.data.form || []);
     
      setApiError(null);
    } catch (error) {
        setApiError(error.response?.status ); 
    
    
    setErrorMessage(error.response?.data?.message );
    } finally {
      setFormsLoading(false);
      setPageLoading(false);
    }
  };
  const openFormModal = async (formId) => {
    try {
      setSelectedForm(null);
      setPageLoading(formId);
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
      setPageLoading(false);
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
// Filter forms based on search input
const filteredForms = forms.filter((form) =>
  form.title.toLowerCase().includes(searchTerm.toLowerCase())
);

// Slice the array to only show the "visible" amount
const displayedForms = filteredForms.slice(0, visibleCount);



const QuotaSkeleton = () => (
  <div className="mt-10 p-8 rounded-md border border-slate-100 bg-white animate-pulse">
    <div className="flex justify-between mb-10">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-6 bg-slate-200 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-5 w-40 bg-slate-200 rounded"></div>
          <div className="h-3 w-32 bg-slate-100 rounded"></div>
        </div>
      </div>
      <div className="h-8 w-24 bg-slate-100 rounded-2xl"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 rounded-md border border-slate-100">
          <div className="h-3 w-20 bg-slate-100 mb-4 rounded"></div>
          <div className="h-8 w-32 bg-slate-200 mb-6 rounded"></div>
          <div className="w-full bg-slate-100 h-2.5 rounded-md"></div>
        </div>
      ))}
    </div>
  </div>
);
 
  if (apiError) {
  return (
    <ErrorLayout 
      status={apiError} 
      message={errorMessage} 
      
    />
  );
}
  
   



  return (
    <>
      <UserNavbar />

    <div className={`min-h-screen relative font-sans bg-[#F5F6F8] w-full transition-colors duration-500 overflow-hidden  `}>
      

        <div className="max-w-7xl mx-auto relative px-4 md:px-6 z-10 space-y-8">
          {/* Back Button */}
            <motion.button
                    onClick={() => navigate("/admindashboard")}
                    whileHover={{ x: -5 }}
                    className={`flex items-center gap-2 sm:mb-8 mb-4 mt-6 font-sans font-normal   leading-none tracking-normal align-middle transition-all   text-[#6A7181]
                    `}
                  >
                    <FaArrowLeft size={14} className=''/> <span className='hidden sm:block text-sm '>Back to Dashboard</span>
                  </motion.button>
       {/* User Profile Card */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className={` rounded-md bg-white overflow-hidden border border-[#E7EAEC] shadow-xl  `}
>
  {/* Header Banner  */}
  <div className={`h-20   relative`}>
    <div className="absolute -bottom-10 left-6">
      <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-white text-xl font-bold border bg-[#2B4BAB] shadow-lg`}>
        {user ? getInitials(user.name) : "..."}
      </div>
         <div className="absolute -bottom-2 -right-2 bg-gray-400 text-white p-1.5 rounded-lg border-2 border-white">
                            <CheckCircle size={14} />
                        </div>
    </div>
    
                     
  </div>

  {/* User Info & Stats Container */}
  <div className="pt-12 px-6 pb-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      {/* Left Side: Identity */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
       <h1 className="text-2xl text-gray-600 font-bold">{user?.name || "Loading User..."}</h1>
          <span className={`px-3 mt-2 rounded-full text-[10px] font-semibold border ${
            user?.role === "ADMIN"
              ? "bg-purple-500/10 text-gray-500 border-purple-500/20"
              : "bg-gray-200 border-blue-500/20"
          }`}>
            {user?.role}
          </span>
        </div>
        <p className={`text-gray-600 text-sm flex items-center gap-2`}>
          <span className="opacity-60"> {user?.email}</span>
        </p>
      </div>

      {/* Right Side: Compact Stats */}
      <div className="flex gap-3 ">
        {/* Forms Count */}
        <div className={` px-4 py-2 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center min-w-[100px]`}>
          <p className={`text-base font-semibold text-[#181D27]`}>Total Forms</p>
          <p className="text-sm  text-gray-500 font-bold">{forms.length}</p>
        </div>

        {/* Member Date */}
        <div className={` px-4 py-2 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center min-w-[100px]`}>
          <p className={`text-base font-semibold text-[#181D27]`}>Joined</p>
          <p className="text-sm text-gray-500 font-bold ">
           
            {user?.createdAt 
              ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
              : "..."}
          </p>
        </div>
      </div>

    </div>
  </div>
</motion.div>
         




{/* USAGE LIMITS SECTION - ADMIN VIEW */}
{pageLoading ? (
  <QuotaSkeleton />
) : (
  user && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mt-10 p-8 rounded-md border border-[#E7EAEC] bg-white shadow-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#2B4BAB] rounded-full"></div>
          <div>
            <h2 className="font-bold text-xl text-slate-900 tracking-tight">Plan Usage & Quotas</h2>
            <p className="text-sm text-slate-400 font-medium">
              Currently on <span className="text-[#2B4BAB] font-bold">{user.plan?.name || "Free"}</span> limits
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 w-fit py-2 bg-blue-50 border border-blue-100 rounded-md">
          <div className={`w-2 h-2 rounded-md animate-pulse ${user.AccountStatus === "ACTIVE" ? 'bg-green-500' : 'bg-amber-500'}`}></div>
          <span className="text-blue-700 font-bold text-xs uppercase tracking-widest">
            {user.AccountStatus} Account
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 1. MONTHLY RESPONSES */}
        <div className="relative p-6 rounded-md bg-white border border-slate-200 group">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Monthly Submissions</p>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-black text-slate-800">{user.monthlyResponseCount || 0}</p>
            <p className="text-slate-400 font-bold text-sm">/ {user.limits?.monthly?.limit || 0}</p>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
              <span>Utilization</span>
              <span>{Math.round(((user.monthlyResponseCount || 0) / (user.limits?.monthly?.limit || 1)) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-md overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((user.monthlyResponseCount || 0) / (user.limits?.monthly?.limit || 1)) * 100}%` }}
                className="bg-emerald-500 h-full rounded-md shadow-[0_0_10px_rgba(16,185,129,0.2)]"
              />
            </div>
            <p className="text-[10px] mt-3 text-slate-400 font-bold uppercase">{user.limits?.monthly?.remaining || 0} remaining this month</p>
          </div>
        </div>

        {/* 2. FORM CREATION LIMIT */}
        <div className="p-6 rounded-md bg-white border border-slate-200">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Active Forms</p>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-black text-slate-800">{user.formCount || 0}</p>
            <p className="text-slate-400 font-bold text-sm">/ {user.limits?.forms?.limit || 0}</p>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
              <span>Utilization</span>
              <span>{Math.round(((user.formCount || 0) / (user.limits?.forms?.limit || 1)) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((user.formCount || 0) / (user.limits?.forms?.limit || 1)) * 100}%` }}
                className="bg-[#2B4BAB] h-full rounded-full"
              />
            </div>
            <p className="text-[10px] mt-3 text-[#2B4BAB] font-bold uppercase">{user.limits?.forms?.remaining || 0} creations left</p>
          </div>
        </div>

        {/* 3. DAILY ROLLING LIMIT */}
        <div className="p-6 rounded-md bg-white border border-slate-200">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Daily Rolling Limit</p>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-black text-slate-800">{user.limits?.daily?.remaining || 0}</p>
            <p className="text-slate-400 font-bold text-sm">left today</p>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">
              <span>Utilization</span>
              <span>{Math.round(((user.dailyResponseCount || 0) / (user.limits?.daily?.limit || 1)) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-md overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((user.dailyResponseCount || 0) / (user.limits?.daily?.limit || 1)) * 100}%` }}
                className="bg-amber-400 h-full rounded-md"
              />
            </div>
            <p className="text-[10px] mt-3 text-amber-600 font-bold uppercase">Used {user.dailyResponseCount || 0} of {user.limits?.daily?.limit || 0}</p>
          </div>
        </div>

        {/* 4. OTHER ASSETS (API Keys & Seats) */}
        <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-50">
          <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">API</div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">API Access</p>
              <p className="text-sm font-bold text-slate-700">{user.limits?.apiKeys?.limit || 0} Key(s) Allowed</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">S</div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">User Seats</p>
              {/* <p className="text-sm font-bold text-slate-700">{user.AccountStatus} Workspace</p> */}
              <p className="text-sm font-bold text-slate-700">{user.limits?.users?.limit || 0} Active Workspace Seat(s)</p>
            </div>
          </div>


           <div className="flex items-center gap-4 p-4 rounded-md hover:bg-slate-50 transition-colors">
               <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">T</div>
  <div>
    <p className="text-xs font-bold text-slate-400 uppercase">
      Custom Settings
    </p>

    <p className="text-sm font-bold text-slate-700">
      {user?.limits?.themeAccess ? "Yes" : "No"}
    </p>
  </div>
</div>
        </div>
      </div>
    </motion.div>
  )
)}

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
                <span className="text-gray-700">
                 {user?.name || "..."}
                </span>
              </h2>
              <p className="text-[12px] text-gray-500 font-semibold">
                View and manage all forms created by this user
              </p>
            </div>
 


 {/* Search Bar */}

                          
                                                  <div className="pr-2 py-2 p-3 rounded-md mb-8 flex flex-col md:flex-row gap-4 justify-between bg-[#FFFFFF] border border-[#E5E7EB] shadow-sm items-center">
                              
                         
                              <div className="relative  w-full md:flex-1">
                                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                  <input
                                      className="w-full px-10 py-2 text-[10px] sm:text-sm font-semibold placeholder:text-gray-400 border border-white/10 rounded-xl outline-none transition-all"
                                      type="text"
                                      placeholder="Search name or email..."
                                     value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                  />
                              </div>
                          
                         
                          </div>

    
        
          {/* Forms Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
  {formsLoading
    ? 
      Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className={`animate-pulse border bg-white border-gray-200 rounded-md h-64 flex flex-col justify-between p-6 `}>
          <div className={`w-12 h-12  bg-slate-200 rounded-xl mb-4 `}></div>
          <div className={`h-6 bg-slate-200 rounded w-3/4 mb-2`}></div>
          <div className={`h-4 bg-slate-200 rounded w-full mb-2`}></div>
          <div className={`h-10 mt-4  bg-slate-200 rounded-xl`}></div>
        </div>
      ))
    : displayedForms.length === 0
    ? 
      <div className={` rounded-md border-2  border-dashed border-slate-300 p-16 mb-8 text-center col-span-full`}>
        <div className={`w-20 h-20 text-gray-600 rounded-full flex items-center justify-center mx-auto mb-4`}>
          <FileText className="text-gray-400" size={36} />
        </div>
        <p className={`font-semibold text-lg mb-1 text-gray-500`}>No Forms Yet</p>
        <p className="text-gray-400">{user?.name} has not created any forms yet.</p>
      </div>
    : 
      displayedForms.map((form, index) => (
        <motion.div
          key={form.formId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`p-6 rounded-md border transition-all flex flex-col bg-white justify-between  border-gray-200 hover:border-gray-300`}
        >
        

          <div className="flex-1">
            <h3 className={`text-xl font-bold mb-2 text-black`}>
              {form.title}
            </h3>
            <p className={`text-sm  leading-relaxed mb-4 line-clamp-2`}>
              {form.description || "No description provided"}
            </p>
            <div className={`flex items-center gap-2 text-xs font-medium text-gray-400`}>
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
       


             <div className={`relative z-10 mt-4   pt-5 mb-4 border-t flex gap-3 border-[#E5E7EB]`}>
            <motion.button
               onClick={() => navigate(`/admin/form/${form.formId}/responses`)}
              className="flex-1 py-2.5 rounded-lg font-medium text-sm border border-[#2B4BAB] text-[#2B4BAB] hover:bg-indigo-50 transition-all"
            >
              Responses
            </motion.button>
            
           
<motion.button
  
  disabled={pageLoading !== false} 
  onClick={() => openFormModal(form.formId)}
  className={`flex-1 py-2.5 rounded-lg font-medium text-sm text-white bg-[#2B4BAB] hover:bg-[rgb(17,54,165)] transition-all flex items-center justify-center gap-2 ${
    pageLoading === form.formId ? "opacity-80 cursor-not-allowed" : ""
  }`}
>
  {pageLoading === form.formId ? (
    <>
      <FaSpinner className="animate-spin" size={14} />
      <span>Loading...</span>
    </>
  ) : (
    "View"
  )}
</motion.button>
          </div>
        </motion.div>
 
                  ))}
            </div>
          </motion.div> 
 {/* Load More Button */}
{visibleCount < filteredForms.length && (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex justify-center mt-12 mb-10"
  >
    <button
      onClick={() => setVisibleCount((prev) => prev + 6)}
      className="group relative flex items-center gap-2 px-8 py-3 bg-gray-100 text-gray-500 rounded-md font-bold shadow-lg hover:shadow-indigo-500/40 hover:scale-105 transition-all active:scale-95"
    >
      <span>Load More Forms</span>
      <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center text-[10px]">
        {filteredForms.length - visibleCount}
      </div>
    </button>
  </motion.div>
)}
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
         
        `}
      >

        {/* HEADER */}
        <div className={`relative px-8 py-6 bg-[#2B4BAB]`}>
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
            bg-slate-50
          `}
        >
          {loadingForm ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <FaSpinner className="animate-spin text-purple-500 text-4xl" />
              <p className={`text-xs font-bold tracking-widest `}>
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
                
                  p-5 rounded-2xl
                  border border-purple-500/10
                  hover:border-purple-500/30
                  transition
                `}
              >
                <div className="flex justify-between items-center mb-4">
                  <label className={`text-[12px] md:text-sm font-semibold `}>
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
              <div className={`w-20 h-20  mx-auto  flex items-center justify-center rounded-xl border border-dashed border-purple-500/30 `}>
                <FileText size={36} className="text-purple-400/50" />
              </div>
              <p className="text-lg font-bold">Empty Form</p>
              <p className={`text-sm mt-1 `}>
                No fields added yet
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className={`px-4 py-4 flex gap-4 border-t border-purple-500/10 bg-white`}>
         
            <button
            onClick={() => {
              navigate(`/admin/form/${selectedForm.formId}/responses`);
              closeFormModal();
            }}
            className="flex-1 py-2.5 rounded-lg font-medium text-sm border border-[#2B4BAB] text-[#2B4BAB] hover:bg-indigo-50 transition-all"
            
          >
            Responses
          </button>
          <button
            onClick={closeFormModal}
             className={`flex-1 py-2.5 rounded-lg font-medium text-sm text-white bg-[#2B4BAB] hover:bg-[rgb(17,54,165)] transition-all`}
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
      <UserFooter/>
    </>
     
  );
};

export default UserActivity;