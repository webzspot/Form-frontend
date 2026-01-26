import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import UserNavbar from "../user/UserNavbar";
import { FiLayers, FiUnlock, FiLock, FiFileText } from "react-icons/fi";
import { FaFileAlt, FaLock, FaUnlock, FaArrowLeft, FaSearch, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import usePagination from "../../hooks/usePagination";
import WaveBackground from "./WaveBackground"; 
import TableSkeleton from "./TableSkeleton";
import { useFormContext } from "../dashboard/FormContext";
import LoadingScreen from "../shared/LoadingScreen";

const AllForms = () => {
  const { isDarkMode } = useFormContext();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPublic, setFilterPublic] = useState("ALL");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://formbuilder-saas-backend.onrender.com/api/admin/forms",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setForms(res.data.data);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Internal server error");
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, [token]);

  const filteredForms = useMemo(() => {
    return forms
      .filter((f) =>
        filterPublic === "ALL"
          ? true
          : filterPublic === "PUBLIC"
          ? f.isPublic
          : !f.isPublic
      )
      .filter((f) =>
        f.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [forms, filterPublic, searchQuery]);

  const {
    currentData,
    currentPage,
    totalPages,
    nextPage,
    prevPage
  } = usePagination(filteredForms, 10);

  const totalForms = forms.length;
  const totalPublic = forms.filter(f => f.isPublic).length;
  const totalPrivate = forms.filter(f => !f.isPublic).length;

  // --- THEME CONFIGURATION (Aligned with UserActivity) ---
  const theme = {
    pageBg: isDarkMode 
      ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
      : "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95]",
    
    card: isDarkMode
      ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-xl"
      : "bg-white/60 backdrop-blur-xl border border-white/60 shadow-lg",
    
    statBox: isDarkMode
      ? "bg-[#1e1b4b]/40 border-purple-500/10"
      : "bg-purple-50/50 border-purple-200/50",

    input: isDarkMode
      ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6]"
      : "bg-white/50 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:bg-white/80",

    textMain: isDarkMode ? "text-white" : "text-slate-800",
    textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/70",
    
    buttonPrimary: isDarkMode
      ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-lg shadow-purple-500/20"
      : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white shadow-md",

    tableHeader: isDarkMode
        ? "bg-[#1e1b4b]/60 text-gray-300 border-b border-purple-500/10"
        : "bg-purple-50/80 text-purple-900 border-b border-purple-100",
  };

if (loading) {
  return <LoadingScreen isDarkMode={isDarkMode} />;
}

  return (
    <>
      <UserNavbar />

      <div className={`min-h-screen relative font-sans transition-colors duration-500 px-4 py-8 overflow-hidden ${theme.pageBg}`}>
        
        {/* Background Waves */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} opacity={isDarkMode ? 0.5 : 0.3} />
            <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} opacity={isDarkMode ? 0.5 : 0.3} />
        </div>
        
        <div className="max-w-7xl relative z-10 mx-auto space-y-6">
          
          {/* Back Button */}
          <motion.button
            onClick={() => navigate("/admindashboard")}
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl border transition-all font-semibold ${theme.card}`}
          >
            <FaArrowLeft size={14} />
            <span className="hidden sm:block">Back to Dashboard</span>
          </motion.button>

          {/* Header Card */}
          <div className={`${theme.card} rounded-2xl p-8 relative overflow-hidden`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">Forms Overview</h1>
                <p className={`${theme.textSub} text-sm max-w-xl`}>
                  Manage and monitor all forms across the platform. You can filter by visibility or search for specific titles.
                </p>
              </div>

              {/* Stats Summary */}
              <div className="flex sm:gap-3 gap-1">
                {[
                  { label: "Total", val: totalForms },
                  { label: "Public", val: totalPublic },
                  { label: "Private", val: totalPrivate }
                ].map((stat, i) => (
                  <div key={i} className={`${theme.statBox} px-5 py-3 rounded-2xl border flex flex-col items-center min-w-[90px]`}>
                    <p className={`text-[11px] font-bold ${theme.textSub}`}>{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color}`}>{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textSub}`} />
              <input
                type="text"
                placeholder="Search by form title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium ${theme.input}`}
              />
            </div>
            <select
              value={filterPublic}
              onChange={(e) => setFilterPublic(e.target.value)}
              className={`px-4 py-3 rounded-xl border font-bold text-sm outline-none cursor-pointer ${theme.input}`}
            >
              <option value="ALL">All Visibility</option>
              <option value="PUBLIC">Public Only</option>
              <option value="PRIVATE">Private Only</option>
            </select>
          </div>

          {/* Table Container */}
          <motion.div 
            className={`${theme.card} rounded-2xl overflow-hidden shadow-xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className={theme.tableHeader}>
                  <tr>
                    {['Form Details', 'Created By', 'Role', 'Status'].map((h) => (
                      <th key={h} className="px-6 py-4 text-[12px] font-bold uppercase opacity-70">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-purple-500/10' : 'divide-purple-100'}`}>
                  {currentData.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-20 text-center">
                        <p className={`text-lg font-bold ${theme.textSub}`}>No forms found matching your criteria</p>
                      </td>
                    </tr>
                  ) : (
                    currentData.map((form, index) => (
                      <tr key={form.formId} className={`transition-colors ${isDarkMode ? 'hover:bg-purple-500/5' : 'hover:bg-purple-50/30'}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${isDarkMode ? 'bg-purple-600' : 'bg-indigo-500 shadow-md'}`}>
                              <FiFileText size={18} />
                            </div>
                            <div>
                              <p className="font-bold text-sm leading-tight">{form.title}</p>
                              <p className={`${theme.textSub} text-[11px] mt-0.5`}>ID: {form.formId.slice(0,8)}...</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm font-bold">{form.user.name}</p>
                          <p className={`${theme.textSub} text-[12px]`}>{form.user.email}</p>
                        </td>

                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                            form.user.role === "ADMIN"
                              ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                              : "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
                          }`}>
                            {form.user.role}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          {form.isPublic ? (
                            <span className="flex items-center gap-1.5 text-emerald-500 text-[12px] font-bold">
                              <FiUnlock size={14} /> Public
                            </span>
                          ) : (
                            <span className={`flex items-center gap-1.5 ${theme.textSub} text-[12px] font-bold`}>
                              <FiLock size={14} /> Private
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Aligned with UserActivity Buttons */}
            <div className={`flex justify-between items-center px-6 py-4 border-t ${isDarkMode ? 'border-purple-500/10' : 'border-purple-100'}`}>
              <p className={`text-sm font-bold ${theme.textSub}`}>
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-5 py-2 rounded-xl border font-bold text-sm transition-all disabled:opacity-30 ${theme.card}`}
                >
                  Prev
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-5 py-2 rounded-xl font-bold text-sm transition-all disabled:opacity-30 ${theme.buttonPrimary}`}
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </div> 
      </div>
    </>
  );
};

export default AllForms;