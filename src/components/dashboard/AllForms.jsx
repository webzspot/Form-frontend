// import React, { useEffect, useState,useMemo } from "react";
// import axios from "axios";
// import UserNavbar from "../user/UserNavbar";
// import { FiLoader } from "react-icons/fi";
// import { FaFileAlt, FaLock, FaUnlock } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import usePagination from "../../hooks/usePagination";
// const AllForms = () => {
//   const [forms, setForms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterPublic, setFilterPublic] = useState("ALL");
//   const navigate=useNavigate()
//   const token = localStorage.getItem("token");
   


//   //Fetch all forms 
//   useEffect(() => {
//     const fetchForms = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           "https://formbuilder-saas-backend.onrender.com/api/admin/forms",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         if (res.data.success) {
//           setForms(res.data.data);
//         } else {
//           setError(res.data.message);
//         }
//       } catch (err) {
//         setError(err.response?.data?.message || "Internal server error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchForms();
//   }, [token]);
   
 
     
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



//   //For Pagination
// const {
//   currentData,
//   currentPage,
//   totalPages,
//   nextPage,
//   prevPage
// } = usePagination(filteredForms, 10);







//   const totalForms = forms.length;
//   const totalPublic = forms.filter(f => f.isPublic).length;
//   const totalPrivate = forms.filter(f => !f.isPublic).length;

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-gray-50">
//         <FiLoader className="animate-spin text-indigo-600 text-4xl" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-red-600 text-lg">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <UserNavbar />

//       <div className="min-h-screen  bg-[#F8FAFC] px-2 py-3">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             <div>  

//                <span
//     onClick={() => navigate("/admindashboard")}
//     className="inline-flex items-center gap-1 mb-3 cursor-pointer text-lg font-semibold text-slate-500 hover:text-indigo-600 transition"
//   >
//     ← Back 
//   </span>


//               <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
//                 All Forms
//               </h1>
//               <p className="text-slate-500 mt-1 text-sm md:text-base">
//                 Monitor all forms submitted by users.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
//               <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
//                 <FaFileAlt className="text-indigo-500" size={24} />
//                 <div>
//                   <p className="text-xs text-slate-400 uppercase font-bold">Total</p>
//                   <p className="text-lg font-bold text-slate-800">{totalForms}</p>
//                 </div>
//               </div>
//               <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
//                 <FaUnlock className="text-emerald-500" size={24} />
//                 <div>
//                   <p className="text-xs text-slate-400 uppercase font-bold">Public</p>
//                   <p className="text-lg font-bold text-emerald-700">{totalPublic}</p>
//                 </div>
//               </div>
//               <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
//                 <FaLock className="text-gray-400" size={24} />
//                 <div>
//                   <p className="text-xs text-slate-400 uppercase font-bold">Private</p>
//                   <p className="text-lg font-bold text-gray-500">{totalPrivate}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//             <input
//               type="text"
//               placeholder="Search by form title..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full md:w-1/3 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm bg-white"
//             />
//             <select
//               value={filterPublic}
//               onChange={(e) => setFilterPublic(e.target.value)}
//               className="px-4 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
//             >
//               <option value="ALL">All Forms</option>
//               <option value="PUBLIC">Public</option>
//               <option value="PRIVATE">Private</option>
//             </select>
//           </div>

//           {/* Table */}
//           <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold tracking-widest">
//                   <th className="px-6 py-4">Form Title</th>
//     <th className="px-6 py-4">Created By</th>
//     <th className="px-6 py-4">Email</th>
//     <th className="px-6 py-4">Role</th>
//     <th className="px-6 py-4">Public</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {currentData.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="px-6 py-16 text-center text-slate-500">
//                       <FaFileAlt className="mx-auto text-slate-200 mb-4" size={48} />
//                       No forms found.
//                     </td>
//                   </tr>
//                 ) : (
//                   currentData.map((form) => (
//                     <tr
//   key={form.formId}
//   className="hover:bg-indigo-200/15 transition-colors">
//   <td className="px-6 py-4 font-medium text-slate-600">
//     {form.title}
//   </td>
//  <td className="px-6 py-4 text-sm text-slate-600">
//     {form.user.name}
//   </td>
//  <td className="px-6 py-4 text-sm text-slate-500">
//     {form.user.email}
//   </td>
//  {/* <td className="px-6 py-4">
//     <span className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
//       {form.user.role}
//     </span>
//   </td> */}

//   <td className="px-6 py-4">
//   <span
//     className={`text-xs font-semibold uppercase px-3 py-1 rounded-full ${
//       form.user.role === "ADMIN"
//         ? "bg-purple-100 text-purple-700"
//         : "bg-indigo-100 text-indigo-700"
//     }`}
//   >
//     {form.user.role}
//   </span>
// </td>

//  <td className="px-6 py-4 text-sm">
//     {form.isPublic ? (
//       <span className="text-emerald-600 font-medium">Public</span>
//     ) : (
//       <span className="text-gray-500 font-medium">Private</span>
//     )}
//   </td>
// </tr>

//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
//   <span className="text-sm text-slate-500">
//     Page {currentPage} of {totalPages}
//   </span>

//   <div className="flex gap-2">
//     <button
//       onClick={prevPage}
//       disabled={currentPage === 1}
//       className="px-4  py-2 border rounded disabled:opacity-50 font-semibold "
//     >
//       Prev
//     </button>

//     <button
//       onClick={nextPage}
//       disabled={currentPage === totalPages}
//       className="px-4 py-2 bg-violet-600 text-white rounded font-semibold disabled:opacity-50"
//     >
//       Next
//     </button>
//   </div>
// </div>






//         </div>
//       </div>
//     </>
//   );
// };

// export default AllForms;



import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import UserNavbar from "../user/UserNavbar";
import { FiLoader } from "react-icons/fi";
import { FaFileAlt, FaLock, FaUnlock, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import usePagination from "../../hooks/usePagination";
import WaveBackground from "./WaveBackground"; 
import TableSkeleton from "./TableSkeleton";
const AllForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPublic, setFilterPublic] = useState("ALL");
  const navigate = useNavigate();
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

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-violet-50/30 to-purple-50/20">
  //       <div className="text-center">
  //         <FiLoader className="animate-spin text-violet-600 text-5xl mx-auto mb-4" />
  //         <p className="text-slate-600 font-semibold">Loading forms...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-red-50/30 to-orange-50/20">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-3xl">⚠</span>
          </div>
          <p className="text-red-600 text-lg font-semibold text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen  relative font-sans bg-linear-to-br from-slate-50 via-violet-50/20 to-purple-50/10 px-4 py-8">
        
  <WaveBackground position="top" />
<WaveBackground position="bottom" />

        
        
        <div className="max-w-7xl relative z-10 mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            {/* Back Button */}
            <motion.button
              onClick={() => navigate("/admindashboard")}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2  mb-6 px-4 py-2 rounded-xl bg-white border-2  border-violet-200 text-violet-600 hover:bg-violet-50 transition-all shadow-sm hover:shadow-md font-semibold"
            >
              <FaArrowLeft size={14} />
              Back to Dashboard
            </motion.button>

            <div className="bg-linear-to-r from-violet-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl p-8 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="text-white">
                  <h1 className=" text-xl md:text-4xl font-extrabold tracking-tight mb-2">
                    Forms Overview
                  </h1>
                  <p className="text-violet-100 text-sm md:text-lg">
                      Overview of all user-created forms on the platform, including their titles, creators, and visibility status.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-200 group hover:border-indigo-200"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-linear-to-br from-indigo-100 to-indigo-200 p-4 rounded-xl text-indigo-600 group-hover:scale-110 transition-transform">
                    <FaFileAlt size={28} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Forms</p>
                    <p className="text-3xl font-extrabold text-slate-800">{totalForms}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-200 group hover:border-emerald-200"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-linear-to-br from-emerald-100 to-emerald-200 p-4 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform">
                    <FaUnlock size={28} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Public</p>
                    <p className="text-3xl font-extrabold text-emerald-700">{totalPublic}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-200 group hover:border-gray-300"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-linear-to-br from-gray-100 to-gray-200 p-4 rounded-xl text-gray-600 group-hover:scale-110 transition-transform">
                    <FaLock size={28} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Private</p>
                    <p className="text-3xl font-extrabold text-gray-600">{totalPrivate}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Filters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by form title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-5 py-3 pl-12 rounded-xl border-2 border-slate-200 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none text-sm bg-slate-50 font-medium transition-all"
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="8" cy="8" r="6" />
                    <path d="M12.5 12.5l4 4" />
                  </svg>
                </div>
              </div>

              <select
                value={filterPublic}
                onChange={(e) => setFilterPublic(e.target.value)}
                className="px-5 py-3 rounded-xl border-2 border-slate-200 text-sm bg-slate-50 font-semibold focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              >
                <option value="ALL">All Forms</option>
                <option value="PUBLIC">Public Only</option>
                <option value="PRIVATE">Private Only</option>
              </select>
            </div>
          </motion.div>

          {/* Table Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-linear-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Form Title
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Created By
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Visibility
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100"> 


                    {loading ? (
    
    <TableSkeleton rows={5} columns={5} />
  ) :currentData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-20">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaFileAlt className="text-slate-400" size={36} />
                          </div>
                          <p className="text-slate-600 font-semibold text-lg mb-1">No forms found</p>
                          <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentData.map((form, index) => (
                      <motion.tr
                        key={form.formId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-violet-50/50 transition-all group"
                      >
                        
                          <td className="px-6 py-4">
  <div className="flex items-center gap-3">

    {/* FormCraft Logo */}
    <div className="w-10 h-10 bg-[#6C3BFF] rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all">
      <div className="flex flex-col items-center gap-1">
        <span className="w-5 h-0.5 bg-white rounded-full opacity-90"></span>
        <span className="w-6 h-0.5 bg-white rounded-full"></span>
        <span className="w-4 h-0.5 bg-white rounded-full opacity-80"></span>
      </div>
    </div>

    {/* Form title */}
    <span className="font-semibold text-slate-800">
      {form.title}
    </span>

  </div>
</td>



                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-700">{form.user.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-500 font-medium">{form.user.email}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center text-xs font-bold uppercase px-3 py-1.5 rounded-full border-2 ${
                              form.user.role === "ADMIN"
                                ? "bg-purple-100 text-purple-700 border-purple-200"
                                : "bg-indigo-100 text-indigo-700 border-indigo-200"
                            }`}
                          >
                            {form.user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {form.isPublic ? (
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full border-2 border-emerald-200">
                              <FaUnlock size={12} />
                              Public
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full border-2 border-gray-200">
                              <FaLock size={12} />
                              Private
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center px-6 py-4 border-t-2 border-slate-100 bg-slate-50/50">
              <span className="text-sm text-slate-600 font-semibold">
                Page <span className="text-violet-600">{currentPage}</span> of <span className="text-violet-600">{totalPages}</span>
              </span>

              <div className="flex gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-5 py-2 border-2 border-slate-300 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 font-semibold hover:bg-slate-100 transition-all hover:border-slate-400 disabled:hover:bg-transparent disabled:hover:border-slate-300"
                >
                  Prev
                </button>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-5 py-2 bg-linear-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:from-violet-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:hover:from-violet-600 disabled:hover:to-purple-600"
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
