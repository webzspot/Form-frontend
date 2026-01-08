// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useParams } from "react-router-dom";
// // import UserNavbar from "../user/UserNavbar";
// // import { FiLoader } from "react-icons/fi";
// // import { FaFileAlt } from "react-icons/fa";
// // import toast from "react-hot-toast";

// // const AdminFormResponses = () => {
// //   const { formId } = useParams();
// //   const token = localStorage.getItem("token");

// //   const [responses, setResponses] = useState([]);
// //   const [questions, setQuestions] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchResponses();
// //   }, [formId]);

// //   const fetchResponses = async () => {
// //     try {
// //       const res = await axios.get(
// //         `https://formbuilder-saas-backend.onrender.com/api/admin/form/responses/${formId}`,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       const data = res.data.data || [];
// //       setResponses(data);

// //       if (data.length > 0) {
// //         const q = data[0].responseValue.map((r) => ({
// //           id: r.formFieldId,
// //           label: r.formField.label,
// //         }));
// //         setQuestions(q);
// //       }
// //     } catch (err) {
// //       toast.error("Failed to load form responses");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <UserNavbar />

// //       <div className="min-h-screen bg-slate-50 p-4 md:p-8 lg:p-10">
// //         {/* Header */}
// //         <div className="max-w-7xl mx-auto mb-8">
// //           <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
// //             Form Responses
// //           </h1>
// //           <p className="text-slate-500 mt-1">
// //             View all submissions for this form in a tabular format.
// //           </p>
// //         </div>

// //         {/* Main Content */}
// //         <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="min-w-max w-full border-collapse">
// //               <thead>
// //                 <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold tracking-widest">
// //                   <th className="px-6 py-4 whitespace-nowrap">
// //                     Submitted At
// //                   </th>

// //                   {questions.map((q) => (
// //                     <th
// //                       key={q.id}
// //                       className="px-6 py-4 whitespace-nowrap"
// //                     >
// //                       {q.label}
// //                     </th>
// //                   ))}
// //                 </tr>
// //               </thead>

// //               <tbody className="divide-y divide-slate-100">
// //                 {loading ? (
// //                   Array(5)
// //                     .fill(0)
// //                     .map((_, i) => (
// //                       <tr key={i} className="animate-pulse">
// //                         <td colSpan={questions.length + 1} className="px-6 py-6">
// //                           <div className="h-10 bg-slate-100 rounded-lg w-full"></div>
// //                         </td>
// //                       </tr>
// //                     ))
// //                 ) : responses.length === 0 ? (
// //                   <tr>
// //                     <td
// //                       colSpan={questions.length + 1}
// //                       className="px-6 py-20 text-center"
// //                     >
// //                       <FaFileAlt
// //                         className="mx-auto text-slate-200 mb-4"
// //                         size={48}
// //                       />
// //                       <p className="text-slate-500 font-medium">
// //                         No responses submitted yet
// //                       </p>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   responses.map((res) => (
// //                     <tr
// //                       key={res.formResponseId}
// //                       className="hover:bg-indigo-50/30 transition-colors"
// //                     >
// //                       <td className="px-6 py-4 text-xs font-semibold text-slate-500 whitespace-nowrap">
// //                         {new Date(res.createdAt).toLocaleString()}
// //                       </td>

// //                       {questions.map((q) => {
// //                         const answer = res.responseValue.find(
// //                           (rv) => rv.formFieldId === q.id
// //                         );
// //                         return (
// //                           <td
// //                             key={q.id}
// //                             className="px-6 py-4 text-sm text-slate-700"
// //                           >
// //                             {answer?.value || "-"}
// //                           </td>
// //                         );
// //                       })}
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default AdminFormResponses;

 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import UserNavbar from "../user/UserNavbar";
// import { FaFileAlt, FaSearch, FaFilter } from "react-icons/fa";
// import toast from "react-hot-toast";

// const AdminFormResponses = () => {
//   const { formId } = useParams(); // get formId from URL
//   const token = localStorage.getItem("token"); // auth token

//   // --- STATE VARIABLES ---
//   const [responses, setResponses] = useState([]); // all responses
//   const [questions, setQuestions] = useState([]); // all unique questions
//   const [loading, setLoading] = useState(true); // loading state
//   const [filterQuestion, setFilterQuestion] = useState("ALL"); // column filter
//   const [searchQuery, setSearchQuery] = useState(""); // row search

//   // --- FETCH RESPONSES ON COMPONENT LOAD OR FORM ID CHANGE ---
//   useEffect(() => {
//     fetchResponses();
//   }, [formId]);

//   // --- FETCH ALL RESPONSES AND EXTRACT UNIQUE QUESTIONS ---
//   const fetchResponses = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `https://formbuilder-saas-backend.onrender.com/api/admin/form/responses/${formId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const data = res.data.data || [];
//       setResponses(data);

//       // Extract all unique questions from all responses
//       const questionMap = {};
//       data.forEach((res) => {
//         res.responseValue.forEach((rv) => {
//           if (!questionMap[rv.formFieldId]) {
//             questionMap[rv.formFieldId] = {
//               id: rv.formFieldId,
//               label: rv.formField.label,
//               type: rv.formField.type,
//               options: rv.formField.options || [],
//             };
//           }
//         });
//       });
//       setQuestions(Object.values(questionMap));
//     } catch (err) {
//       toast.error("Failed to load responses");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- DETERMINE COLUMNS TO DISPLAY BASED ON QUESTION FILTER ---
//   const displayedQuestions =
//     filterQuestion === "ALL"
//       ? questions
//       : questions.filter((q) => q.id === filterQuestion);

//   // --- FILTER RESPONSES BASED ON SEARCH QUERY ---
//   const filteredResponses = responses.filter((res) =>
//     res.responseValue.some((rv) =>
//       (rv.value || "")
//         .toString()
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase())
//     )
//   );

//   return (
//     <>
//       <UserNavbar />

//       <div className="min-h-screen bg-slate-50 p-4 md:p-8 lg:p-10 font-sans">
//         {/* --- HEADER --- */}
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
//               Form Responses
//             </h1>
//             <p className="text-slate-500 mt-1 text-sm md:text-base">
//               View all submissions for this form in a professional tabular layout.
//             </p>
//           </div>

//           {/* --- SEARCH & FILTER TOOLS --- */}
//           <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
//             {/* Search */}
//             <div className="relative w-full md:w-64">
//               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
//               <input
//                 type="text"
//                 placeholder="Search responses..."
//                 className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             {/* Question Filter */}
//             <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
//               <FaFilter />
//               <select
//                 className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm outline-none cursor-pointer hover:border-indigo-300 transition"
//                 value={filterQuestion}
//                 onChange={(e) => setFilterQuestion(e.target.value)}
//               >
//                 <option value="ALL">All Questions</option>
//                 {questions.map((q) => (
//                   <option key={q.id} value={q.id}>
//                     {q.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* --- TABLE CARD --- */}
//         <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-x-auto">
//           <table className="min-w-max border-collapse w-full">
//             {/* --- TABLE HEAD --- */}
//             <thead>
//               <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold tracking-widest">
//                 <th className="px-6 py-4 whitespace-nowrap">Submitted At</th>
//                 {displayedQuestions.map((q) => (
//                   <th key={q.id} className="px-6 py-4 whitespace-nowrap">{q.label}</th>
//                 ))}
//               </tr>
//             </thead>

//             {/* --- TABLE BODY --- */}
//             <tbody className="divide-y divide-slate-100">
//               {loading ? (
//                 // Skeleton loader for smooth UX
//                 Array(5).fill(0).map((_, i) => (
//                   <tr key={i} className="animate-pulse">
//                     <td colSpan={displayedQuestions.length + 1} className="px-6 py-6">
//                       <div className="h-10 bg-slate-100 rounded-lg w-full"></div>
//                     </td>
//                   </tr>
//                 ))
//               ) : filteredResponses.length === 0 ? (
//                 // No responses message
//                 <tr>
//                   <td colSpan={displayedQuestions.length + 1} className="px-6 py-20 text-center">
//                     <FaFileAlt className="mx-auto text-slate-200 mb-4" size={48} />
//                     <p className="text-slate-500 font-medium">No responses submitted yet</p>
//                   </td>
//                 </tr>
//               ) : (
//                 // Render all responses
//                 filteredResponses.map((res) => (
//                   <tr key={res.formResponseId} className="hover:bg-indigo-50/30 transition-colors">
//                     {/* Submission timestamp */}
//                     <td className="px-6 py-4 text-xs font-semibold text-slate-500 whitespace-nowrap">
//                       {new Date(res.createdAt).toLocaleString()}
//                     </td>

//                     {/* Render each displayed question */}
//                     {displayedQuestions.map((q) => {
//                       const answer = res.responseValue.find((rv) => rv.formFieldId === q.id);
//                       let value = "-"; // default if no answer
//                       if (answer) {
//                         value = Array.isArray(answer.value) ? answer.value.join(", ") : answer.value || "-";
//                       }

//                       return (
//                         <td key={q.id} className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">
//                           {value}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminFormResponses;


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
      console.error(err);
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
  
    const {
  currentData,
  currentPage,
  totalPages,
  nextPage,
  prevPage
} = usePagination(filteredResponses, 10);







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
        </div>

       {/* --- Table --- */}
<div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-x-auto">
  <table className="min-w-max border-collapse w-full">
    {/* --- Table head --- */}
    <thead className="bg-slate-50 sticky top-0 z-10">
      <tr className="border-b border-slate-400 text-slate-400 uppercase text-[11px] font-bold tracking-widest">
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
        currentData.map((res) => (
          <tr 
            key={res.formResponseId} 
            className={`transition-colors hover:bg-indigo-50/30 ${
              searchQuery ? "bg-indigo-50/10" : "" 
            }`}
          >
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



<div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 border-t bg-white rounded-b-3xl">
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
      className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50"
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
