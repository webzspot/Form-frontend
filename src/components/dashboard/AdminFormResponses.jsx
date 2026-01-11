import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserNavbar from "../user/UserNavbar";
import { FaFileAlt, FaSearch, FaFilter, FaCheckCircle, FaClock } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";

const AdminFormResponses = () => {
  const { formId } = useParams();
  const token = localStorage.getItem("token");

  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterQuestion, setFilterQuestion] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const navigate=useNavigate()
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
      
      if (data.length > 0) {
  setFormTitle(data[0].form?.title || "Form Responses");
}
      const questionMap = {};
      data.forEach((res) => {
        res.responseValue.forEach((rv) => {
          if (!questionMap[rv.formFieldId]) {
            questionMap[rv.formFieldId] = {
              id: rv.formFieldId,
              label: rv.formField.label,
              type: rv.formField.type,
              options: rv.formField.options || [],
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

  const displayedQuestions =
    filterQuestion === "ALL"
      ? questions
      : questions.filter((q) => q.id === filterQuestion);

  const filteredResponses = responses.filter((res) =>
    res.responseValue.some((rv) =>
      (rv.value || "")
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );
     
  //For Pagination
    const {
  currentData,
  currentPage,
  totalPages,
  nextPage,
  prevPage
} = usePagination(filteredResponses, 10);

 //Export to CSV
 const exportToCSV = () => {
  if (filteredResponses.length === 0) {
    return toast.error("No data to export");
  }

  const headers = [
    "Submission ID",
    "Submitted At",
    ...displayedQuestions.map(q => q.label),
  ];

const rows = filteredResponses.map(res => [
  res.formResponseId, //  ADD THIS
  new Date(res.createdAt).toLocaleDateString() +
    " " +
    new Date(res.createdAt).toLocaleTimeString(),

  ...displayedQuestions.map(q => {
    const answer = res.responseValue.find(
      rv => rv.formFieldId === q.id
    );
    if (!answer) return "-";
    return Array.isArray(answer.value)
      ? answer.value.join(" | ")
      : answer.value;
  })
]);

  const csv = [
    headers.join(","),
    ...rows.map(r => r.join(","))
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Admin_Responses_${formId}.csv`;
  link.click();

  toast.success("CSV exported");
};

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-slate-50 p-4 md:p-8 lg:p-10 font-sans">
        {/* Header*/}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="mt-2">
            <span
    onClick={() => navigate("/admindashboard")}
    className="inline-flex items-center gap-1 cursor-pointer text-lg font-semibold text-slate-500 hover:text-indigo-600 transition"
  >
    ← Back 
  </span>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
               Responses of <span className="text-3xl text-indigo-600 italic font-bold">{formTitle}</span> 
            </h1>
            <p className="text-slate-500 mt-1 text-sm md:text-base">
              Monitor all submissions for this form.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <FaFileAlt size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Total Responses</p>
              <p className="text-xl font-bold text-slate-900">{responses.length}</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
              <FaCheckCircle size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Filtered Responses</p>
              <p className="text-xl font-bold text-slate-900">{filteredResponses.length}</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600">
              <FaClock size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Last Submitted</p>
              <p className="text-xl font-bold text-slate-600">
                {responses.length > 0 ? new Date(responses[responses.length - 1].createdAt).toLocaleString() : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter*/}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 items-start md:items-center mb-6">
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search responses..."
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <FaFilter />
            <select
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm outline-none cursor-pointer hover:border-indigo-300 transition"
              value={filterQuestion}
              onChange={(e) => setFilterQuestion(e.target.value)}
            >
              <option value="ALL">All Questions</option>
              {questions.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.label}
                </option>
              ))}
            </select>
          </div> 

         <button
  onClick={exportToCSV}
  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold"
>
  Export CSV
</button>

        </div>

       {/* --- Table --- */}
<div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-x-auto">
  <table className="min-w-max border-collapse w-full">
    {/* --- Table head --- */}
    <thead className="bg-slate-50 sticky top-0 z-10">
      <tr className="border-b border-slate-400 text-slate-400 uppercase text-[11px] font-bold tracking-widest">
       <th className="px-6 py-4 whitespace-nowrap text-center">No.</th>
<th className="px-6 py-4 whitespace-nowrap">Submission ID</th>
<th className="px-6 py-4 whitespace-nowrap">Submitted At</th>
        {displayedQuestions.map((q) => (
          <th key={q.id} className="px-6 py-4 whitespace-nowrap">{q.label}</th>
        ))}
      </tr>
    </thead>

    {/* --- TABLE BODY --- */}
    <tbody className="divide-y divide-slate-100">
      {loading ? (
        Array(5).fill(0).map((_, i) => (
          <tr key={i} className="animate-pulse">
            <td colSpan={displayedQuestions.length + 1} className="px-6 py-6">
              <div className="h-10 bg-slate-100 rounded-lg w-full"></div>
            </td>
          </tr>
        ))
      ) : currentData.length === 0 ? (
        <tr>
          <td colSpan={displayedQuestions.length + 1} className="px-6 py-20 text-center">
            <FaFileAlt className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-500 font-medium">No responses submitted yet</p>
          </td>
        </tr>
      ) : (
        currentData.map((res,index) => (
 <tr
    key={res.formResponseId}
    className="transition-colors hover:bg-indigo-50/30"
  >
    {/* No. */}
    <td className="px-6 py-4 text-xs text-slate-500 text-center">
      {index + 1 + (currentPage - 1) * 10}
    </td>

    {/* Submission ID */}
    <td className="px-6 py-4 text-xs text-slate-500 max-w-[180px] truncate whitespace-nowrap overflow-hidden ">
      {res.formResponseId}
    </td>

    {/* Submitted At */}
    <td className="px-6 py-4 text-xs font-semibold text-slate-500 whitespace-nowrap">
      {new Date(res.createdAt).toLocaleString()}
    </td>

            {/* Responses */}
            {displayedQuestions.map((q) => {
              const answer = res.responseValue.find((rv) => rv.formFieldId === q.id);
              let value = "-"; 
              if (answer) value = Array.isArray(answer.value) ? answer.value.join(", ") : answer.value || "-";

              return (
                <td 
                  key={q.id} 
                  className={`px-6 py-4 text-sm text-slate-700 whitespace-nowrap ${
                    value !== "-" ? "bg-green-50/50" : "text-slate-400" 
                  }`}
                >
                  {value}
                </td>
              );
            })}
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>



<div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-white rounded-b-3xl">
  <span className="text-sm text-slate-500">
    Page {currentPage} of {totalPages}
  </span>

  <div className="flex gap-2">
    <button
      onClick={prevPage}
      disabled={currentPage === 1}
      className="px-4 py-2 border rounded-lg disabled:opacity-50"
    >
      Prev
    </button>

    <button
      onClick={nextPage}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-violet-600 text-white rounded-lg disabled:opacity-50"
    >
      Next
    </button>
  </div>
</div>

      </div>
    </>
  );
};

export default AdminFormResponses;
