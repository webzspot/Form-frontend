import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UserNavbar from "../user/UserNavbar";
import { 
  FaFileAlt, FaSearch, FaFilter, FaCheckCircle, 
  FaClock, FaArrowLeft, FaDownload, FaDatabase, FaLayerGroup 
} from "react-icons/fa";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import usePagination from "../../hooks/usePagination";
import TableSkeleton from "./TableSkeleton";
import WaveBackground from "./WaveBackground";
import { useFormContext } from "../dashboard/FormContext";

// --- Custom Sparkle Icon for consistency ---
const SparkleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const AdminFormResponses = () => {
  const { formId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { isDarkMode } = useFormContext();

  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterQuestion, setFilterQuestion] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [formTitle, setFormTitle] = useState("");

  useEffect(() => {
    fetchResponses();
  }, [formId]);

  const fetchResponses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://formbuilder-saas-backend.onrender.com/api/admin/form/responses/${formId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data.data || [];
      setResponses(data);
      if (data.length > 0) setFormTitle(data[0].form?.title || "Form Responses");

      const questionMap = {};
      data.forEach((res) => {
        res.responseValue.forEach((rv) => {
          if (!questionMap[rv.formFieldId]) {
            questionMap[rv.formFieldId] = {
              id: rv.formFieldId,
              label: rv.formField.label,
              type: rv.formField.type,
            };
          }
        });
      });
      setQuestions(Object.values(questionMap));
    } catch (err) {
      toast.error("Failed to load responses");
    } finally {
      setLoading(false);
    }
  };

  // Theme Logic from AllReports
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
    tableHeader: isDarkMode ? "bg-[#1e1b4b]/60 text-purple-300" : "bg-purple-100/50 text-[#4c1d95]",
  };

  const displayedQuestions = filterQuestion === "ALL" ? questions : questions.filter((q) => q.id === filterQuestion);

  const filteredResponses = responses.filter((res) =>
    res.responseValue.some((rv) => (rv.value || "").toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(filteredResponses, 10);

  const exportToCSV = () => {
    if (filteredResponses.length === 0) return toast.error("No data to export");
    const headers = ["Submission ID", "Submitted At", ...displayedQuestions.map(q => q.label)];
    const rows = filteredResponses.map(res => [
      res.formResponseId, 
      new Date(res.createdAt).toLocaleString(),
      ...displayedQuestions.map(q => {
        const answer = res.responseValue.find(rv => rv.formFieldId === q.id);
        return answer ? (Array.isArray(answer.value) ? answer.value.join(" | ") : answer.value) : "-";
      })
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Responses_${formTitle.replace(/\s+/g, '_')}.csv`;
    link.click();
    toast.success("Exported Successfully");
  };

  return (
    <>
      <UserNavbar />
      <div className={`min-h-screen relative font-sans transition-colors duration-500 overflow-hidden pb-20 ${theme.pageBg}`}>
        
        {/* WAVE BACKGROUNDS - Consistent with Home/Reports */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
          <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
          <motion.div 
            animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }} 
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-10 text-white/40"
          >
            <SparkleIcon className="w-12 h-12" />
          </motion.div>
        </div>

        <div className="max-w-7xl relative z-10 mx-auto px-4 sm:py-12 py-5">
          
          {/* Back Button */}
          <motion.button
            onClick={() => navigate("/admindashboard")}
            whileHover={{ x: -5 }}
            className={`flex items-center gap-2 sm:mb-8 mb-2 sm:px-5 px-2 py-2.5 rounded-2xl font-semibold transition-all border ${
              isDarkMode ? 'bg-[#12121a] border-purple-500/30 text-purple-400' : 'bg-white/60 border-purple-200  shadow-sm'
            }`}
          >
            <FaArrowLeft size={14} /> <span className="hidden sm:block">Back to Dashboard</span>
          </motion.button>

          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 rounded-[2.5rem] mb-8 shadow-2xl relative overflow-hidden ${
              isDarkMode ? 'bg-[#12121a]/90 border border-purple-500/20' : 'bg-white/80 backdrop-blur-md border border-white'
            }`}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className={`sm:px-4 px-2 py-1 rounded-full text-[10px] sm:text-sm font-bold ${isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                  Data Analytics
                </span>
               
              </div>
              <h1 className={`sm:text-3xl text-xl font-bold mb-2  ${isDarkMode ? 'text-white' : 'text-[#4c1d95]'}`}>
                {formTitle}
              </h1>
              <p className={`max-w-2xl text-[10px] sm:text-sm sm:font-medium ${theme.textSub}`}>
                Viewing all submitted entries. You can filter by specific questions or search through text responses.
              </p>
            </div>
          </motion.div>

          {/* Stats Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Total Entries', count: responses.length, icon: FaDatabase, bg: 'bg-purple-500/10' },
              { label: 'Visible Results', count: filteredResponses.length, icon: FaFilter, bg: 'bg-purple-500/10' },
              { label: 'Form Fields', count: questions.length, icon: FaLayerGroup, bg: 'bg-purple-500/10'},
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`${theme.card} sm:p-6 p-2 rounded-3xl flex items-center gap-5 group hover:scale-[1.02] transition-transform`}
              >
                <div className={`sm:p-4 p-2 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className={`sm:text-sm text-[10px] font-bold ${theme.textSub}`}>{stat.label}</p>
                  <p className={`sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{stat.count}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Controls Section */}
          <div className={`${theme.card} px-2 py-2 rounded-xl mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between`}>
            <div className="relative w-full lg:w-96">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search across all responses..."
                className={`w-full px-12 sm:py-3 py-1 rounded-2xl border-none outline-none text-sm font-semibold transition-all ${theme.input}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <select
                className={`flex-1 lg:flex-none px-6 sm:py-3 py-1 rounded-2xl text-sm font-bold outline-none cursor-pointer border-none ${theme.input}`}
                value={filterQuestion}
                onChange={(e) => setFilterQuestion(e.target.value)}
              >
                <option value="ALL">All Questions</option>
                {questions.map((q) => (
                  <option 
                  key={q.id} value={q.id}>{q.label}</option>
                ))}
              </select>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={exportToCSV}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-3 sm:py-3 rounded-2xl sm:text-sm  text-[10px] font-semibold sm:font-bold transition-all ${theme.buttonPrimary}`}
              >
                <FaDownload size={14} /> Export CSV
              </motion.button>
            </div>
          </div>

          {/* Table Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${theme.card} rounded-2xl overflow-hidden`}
          >
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={theme.tableHeader}>
                    <th className="px-6 py-5 text-sm font-bold">No.</th>
                    <th className="px-6 py-5 text-sm font-bold">Submission ID</th>
                    <th className="px-6 py-5 text-sm font-bold">Timestamp</th>
                    {displayedQuestions.map((q) => (
                      <th key={q.id} className="px-6 py-5 text-sm font-bold ">
                        {q.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-purple-500/10' : 'divide-purple-100'}`}>
                  {loading ? (
                    <tr><td colSpan={displayedQuestions.length + 3}><TableSkeleton rows={6} columns={displayedQuestions.length + 3} isDarkMode={isDarkMode} /></td></tr>
                  ) : currentData.length === 0 ? (
                    <tr>
                      <td colSpan={100} className="py-32 text-center">
                        <FaFileAlt size={48} className="mx-auto mb-4  opacity-20" />
                        <p className={`text-xl font-bold ${theme.textSub}`}>No entries found matching your criteria</p>
                      </td>
                    </tr>
                  ) : (
                    currentData.map((res, index) => (
                      <motion.tr 
                        key={res.formResponseId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group transition-colors ${isDarkMode ? 'hover:bg-purple-500/5' : 'hover:bg-purple-50/50'}`}
                      >
                        <td className="px-6 py-4 text-sm font-bold">
                          {index + 1 + (currentPage - 1) * 10}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-mono text-[10px] px-2 py-1 rounded-lg ${isDarkMode ? 'bg-purple-500/10 text-purple-300' : 'bg-purple-100'}`}>
                            {res.formResponseId.slice(-8).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex flex-col">
                             <span className="text-xs font-bold">{new Date(res.createdAt).toLocaleDateString()}</span>
                             <span className="text-[10px] opacity-50">{new Date(res.createdAt).toLocaleTimeString()}</span>
                           </div>
                        </td>
                        {displayedQuestions.map((q) => {
                          const answer = res.responseValue.find((rv) => rv.formFieldId === q.id);
                          const value = answer ? (Array.isArray(answer.value) ? answer.value.join(", ") : answer.value) : "-";
                          return (
                            <td key={q.id} className="px-6 py-4">
                              <span className={`text-sm font-medium ${value === "-" ? "opacity-30" : ""}`}>
                                {value}
                              </span>
                            </td>
                          );
                        })}
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className={`sm:p-6 p-3 flex items-center justify-between border-t ${isDarkMode ? 'border-purple-500/10' : 'border-purple-100'}`}>
              <p className={`text-xs font-bold ${theme.textSub}`}>
                Showing {currentPage} of {totalPages} Pages
              </p>
              <div className="flex gap-3">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-6 py-2 rounded-xl text-sm font-bols transition-all disabled:opacity-20 ${
                    isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                  }`}
                >
                  Prev
                </button>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-20 ${theme.buttonPrimary}`}
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

export default AdminFormResponses;