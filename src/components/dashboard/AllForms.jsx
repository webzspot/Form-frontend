import React, { useEffect, useState,useMemo } from "react";
import axios from "axios";
import UserNavbar from "../user/UserNavbar";
import { FiLoader } from "react-icons/fi";
import { FaFileAlt, FaLock, FaUnlock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
const AllForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPublic, setFilterPublic] = useState("ALL");
  const navigate=useNavigate()
  const token = localStorage.getItem("token");
   


  //Fetch all forms 
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
   
   //Filter
   const filteredForms = forms
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
     
//  const filteredForms = useMemo(() => {
//   return forms
//     .filter((f) =>
//       filterPublic === "ALL"
//         ? true
//         : filterPublic === "PUBLIC"
//         ? f.isPublic
//         : !f.isPublic
//     )
//     .filter((f) =>
//       f.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
// }, [forms, filterPublic, searchQuery]);



  //For Pagination
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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <FiLoader className="animate-spin text-indigo-600 text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-[#F8FAFC] p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>  

               <span
    onClick={() => navigate("/admindashboard")}
    className="inline-flex items-center gap-1 cursor-pointer text-lg font-semibold text-slate-500 hover:text-indigo-600 transition"
  >
    ← Back 
  </span>


              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                All Forms
              </h1>
              <p className="text-slate-500 mt-1 text-sm md:text-base">
                Monitor all forms submitted by users.
              </p>
            </div>

            <div className="flex gap-4 ">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
                <FaFileAlt className="text-indigo-500" size={24} />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Total</p>
                  <p className="text-lg font-bold text-slate-800">{totalForms}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
                <FaUnlock className="text-emerald-500" size={24} />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Public</p>
                  <p className="text-lg font-bold text-emerald-700">{totalPublic}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
                <FaLock className="text-gray-400" size={24} />
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold">Private</p>
                  <p className="text-lg font-bold text-gray-500">{totalPrivate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <input
              type="text"
              placeholder="Search by form title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white"
            />
            <select
              value={filterPublic}
              onChange={(e) => setFilterPublic(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="ALL">All Forms</option>
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold tracking-widest">
                  <th className="px-6 py-4">Form Title</th>
    <th className="px-6 py-4">Created By</th>
    <th className="px-6 py-4">Email</th>
    <th className="px-6 py-4">Role</th>
    <th className="px-6 py-4">Public</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center text-slate-500">
                      <FaFileAlt className="mx-auto text-slate-200 mb-4" size={48} />
                      No forms found.
                    </td>
                  </tr>
                ) : (
                  currentData.map((form) => (
                    <tr
  key={form.formId}
  className="hover:bg-indigo-200/15 transition-colors">
  <td className="px-6 py-4 font-medium text-slate-600">
    {form.title}
  </td>
 <td className="px-6 py-4 text-sm text-slate-600">
    {form.user.name}
  </td>
 <td className="px-6 py-4 text-sm text-slate-500">
    {form.user.email}
  </td>
 {/* <td className="px-6 py-4">
    <span className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
      {form.user.role}
    </span>
  </td> */}

  <td className="px-6 py-4">
  <span
    className={`text-xs font-semibold uppercase px-3 py-1 rounded-full ${
      form.user.role === "ADMIN"
        ? "bg-purple-100 text-purple-700"
        : "bg-indigo-100 text-indigo-700"
    }`}
  >
    {form.user.role}
  </span>
</td>

 <td className="px-6 py-4 text-sm">
    {form.isPublic ? (
      <span className="text-emerald-600 font-medium">Public</span>
    ) : (
      <span className="text-gray-500 font-medium">Private</span>
    )}
  </td>
</tr>

                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
  <span className="text-sm text-slate-500">
    Page {currentPage} of {totalPages}
  </span>

  <div className="flex gap-2">
    <button
      onClick={prevPage}
      disabled={currentPage === 1}
      className="px-4  py-2 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    <button
      onClick={nextPage}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-violet-600 text-white rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</div>






        </div>
      </div>
    </>
  );
};

export default AllForms;
