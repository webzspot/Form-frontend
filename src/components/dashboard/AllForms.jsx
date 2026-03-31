


// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import UserNavbar from "../user/UserNavbar";
// import { FiLayers, FiUnlock, FiLock, FiMoreVertical } from "react-icons/fi";
// import { FaArrowLeft, FaArrowDown, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import usePagination from "../../hooks/usePagination";
// import TableSkeleton from "./TableSkeleton";
// import UserFooter from "../user/UserFooter";
// import CardSkeleton from "./CardSkeleton";
// const AllForms = () => {
//   const [forms, setForms] = useState([]);
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterPublic, setFilterPublic] = useState("ALL");
//   const navigate = useNavigate();
//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     const fetchForms = async () => {
//       setLoading(true)
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

//   const filteredForms = useMemo(() => {
//     return forms
//       .filter((f) =>
//         filterPublic === "ALL"
//           ? true
//           : filterPublic === "PUBLIC"
//             ? f.isPublic
//             : !f.isPublic
//       )
//       .filter((f) =>
//         f.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//   }, [forms, filterPublic, searchQuery]);

//   const {
//     currentData,
//     currentPage,
//     totalPages,
//     nextPage,
//     prevPage
//   } = usePagination(filteredForms, 10);

//   const totalForms = forms.length;
//   const totalPublic = forms.filter(f => f.isPublic).length;
//   const totalPrivate = forms.filter(f => !f.isPublic).length;

//   return (
//     <>
//     <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-800">
//       <UserNavbar />

//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate("/admindashboard")}
//           className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm mb-8"
//         >
//           <FaArrowLeft size={12} />
//           <span>Back to Dashboard</span>
//         </button>

//         {/* Header Section */}
//         <div className="mb-10">
//           <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Forms Overview</h1>
//           <p className="text-slate-500 text-sm">
//             Manage and monitor all forms across the platform. You can filter by visibility or search for specific titles.
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <div className="bg-white p-6 rounded-md border border-slate-100 shadow-sm flex items-center gap-4">
//             <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
//               <FiLayers size={22} />
//             </div>
//             <div>
//               <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Form</p>
//               <p className="text-2xl font-bold text-slate-900">{totalForms}</p>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-md border border-slate-100 shadow-sm flex items-center gap-4">
//             <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
//               <FiUnlock size={22} />
//             </div>
//             <div>
//               <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Public</p>
//               <p className="text-2xl font-bold text-slate-900">{totalPublic}</p>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-md border border-slate-100 shadow-sm flex items-center gap-4">
//             <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
//               <FiLock size={22} />
//             </div>
//             <div>
//               <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Private</p>
//               <p className="text-2xl font-bold text-slate-900">{totalPrivate}</p>
//             </div>
//           </div>
//         </div>







//         <div className=" pr-2 py-2  rounded-md mb-8 flex flex-col md:flex-row gap-4 justify-between md:bg-[#FFFFFF] md:border md:border-[#E5E7EB] md:shadow-sm items-center">

         
//           <div className="relative  w-full md:flex-1">
//             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
             
//                           className="w-full px-10 py-2 text-[10px] sm:border  border-black/30 sm:text-sm font-semibold placeholder:text-gray-400 border md:border-white/10 rounded-md outline-none transition-all"
//             type="text"
//               placeholder="Search by form title..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

         
//           <div className="flex items-center gap-2 w-full md:w-auto">
//             <div className="w-full">
//               <select
//                 value={filterPublic}
//                 onChange={(e) => setFilterPublic(e.target.value)}
//                 className={`w-full md:w-auto px-2 py-2 cursor-pointer text-[10px] sm:text-sm font-bold rounded-md border border-black/30 outline-none transition-all bg-white text-black`}
//               >
//                 <option value="ALL">All Visibility</option>
//                 <option value="PUBLIC">Active Only</option>
//                 <option value="PRIVATE">Inactive Only</option>
//               </select>
//             </div>
//           </div>
//         </div>


//         {/* Table Container */}
//         <div className="hidden md:block bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="border-b border-slate-50 text-slate-400 text-[11px] font-bold uppercase tracking-widest">

//                   <th className="px-6 py-4 text-xs font-semibold ">
//                     <div className="flex items-center gap-2 group cursor-pointer">


//                       <span>Form Details</span>

//                       <FaArrowDown className="" />

//                     </div>
//                   </th>
//                   <th className="px-6 py-4 text-xs font-semibold ">
//                     <div className="flex items-center gap-2 group cursor-pointer">


//                       <span>Created By</span>

//                       <FaArrowDown className="" />

//                     </div>
//                   </th>
//                   <th className="px-6 py-4 text-xs font-semibold ">
//                     <div className="flex items-center gap-2 group cursor-pointer">


//                       <span>Role</span>

//                       <FaArrowDown className="" />

//                     </div>
//                   </th>
//                   <th className="px-6 py-4 text-xs font-semibold ">
//                     <div className="flex items-center gap-2 group cursor-pointer">


//                       <span>Status</span>

//                       <FaArrowDown className="" />

//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody >
//                 {loading ? (
//                   <TableSkeleton rows={5} columns={4} />
//                 ) :
//                   currentData.length === 0 ? (
//                     <tr>
//                       <td colSpan="5" className="px-8 py-12 text-center text-slate-400">
//                         No forms found.
//                       </td>
//                     </tr>
//                   ) : (
//                     currentData.map((form, index) => (
//                       <motion.tr key={form.formId} initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.05 }}
//                         className="hover:bg-[#F5F6F8] border-b border-[#E9EAEB] transition-colors group">
//                         <td className="px-8 py-4">
//                           <div className="flex items-center gap-3">

//                             <span className="text-sm font-medium text-slate-700">{form.title}</span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-slate-600">{form.user?.name || "Macd"}</td>
//                         <td className="px-6 py-4 text-sm text-slate-600">{form.user?.role || "User"}</td>
//                         <td className="px-6 py-4">
//                           <span className={`text-[13px] font-medium ${form.isPublic ? 'text-emerald-500' : 'text-slate-400'}`}>
//                             {form.isPublic ? "Active" : "Inactive"}
//                           </span>
//                         </td>
                     
//                       </motion.tr>
//                     ))
//                   )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="hidden md:flex px-8 py-5 border-t border-slate-50 justify-between items-center">
//             <div className="flex gap-3">
//               <button
//                 onClick={prevPage}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-all"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={nextPage}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-all"
//               >
//                 Next
//               </button>
//             </div>
//             <p className="text-sm text-slate-500 font-medium">
//               Page {currentPage} of {totalPages || 1}
//             </p>
//           </div>
//         </div>
      
  
//   {/* --- MOBILE CARDS --- */}
// <div className="grid grid-cols-1 max-w-md w-full  mb-4 gap-4 md:hidden">
//   {loading ? (
//     <div className="flex flex-col gap-4">
//       <CardSkeleton />
//       <CardSkeleton />
//       <CardSkeleton />
//     </div>
//   ) : currentData.length === 0 ? (
//     <div className="bg-white p-10 text-center rounded-xl border border-[#E9EAEB]">
//        <FaFileAlt className="text-slate-400 mx-auto mb-4" size={36} />
//        <p className="font-semibold text-lg text-slate-900">No forms found</p>
//     </div>
//   ) : (
//     currentData.map((form, index) => (
//       <motion.div 
//         key={form.formId}
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: index * 0.05 }}
//         className="bg-white  p-5 rounded-md border border-[#E9EAEB] shadow-sm relative"
//       >
       
//         <div className="flex justify-between items-start mb-3">
//           <div>
//             <h3 className="text-sm font-bold text-[#181D27] leading-tight">{form.title}</h3>
//             <p className="text-[11px] text-[#6A7181] mt-1">Ref Id: {form.formId.slice(-6)}</p>
//           </div>
//           <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
//             form.isPublic ? "bg-green-50 text-[#00B712]" : "bg-gray-100 text-gray-500"
//           }`}>
//             {form.isPublic ? "Active" : "Inactive"}
//           </span>
//         </div>

     
//         <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-50">
//           <div>
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Created By</p>
//             <p className="text-xs font-semibold text-[#181D27]">{form.user?.name || "Macd"}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Role</p>
//             <p className="text-xs font-semibold text-[#181D27]">{form.user?.role || "User"}</p>
//           </div>
//         </div>
//       </motion.div>
//     ))
//   )}
// </div>
                
// <div className=" md:hidden flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-[#E9EAEB]">
    
    
//     <span className="text-sm text-[#414651] font-medium order-1 md:order-2">
//         Page {currentPage} of {totalPages}
//     </span>

 
//     <div className="flex gap-3 w-full md:w-auto order-2 md:order-1">
//         <button 
//             onClick={prevPage} 
//             disabled={currentPage === 1} 
//             className="flex-1 md:flex-none px-5 py-2 rounded-md font-semibold text-sm border border-[#D5D7DA] text-[#414651] disabled:opacity-30 hover:bg-slate-50 transition-all"
//         >
//             Previous
//         </button>
//         <button 
//             onClick={nextPage} 
//             disabled={currentPage === totalPages} 
//             className="flex-1 md:flex-none px-5 py-2 rounded-md font-semibold text-sm border border-[#D5D7DA] text-[#414651] disabled:opacity-40 transition-all shadow-sm"
//         >
//             Next
//         </button>
//     </div>
// </div> 
//       </div>
      
//     </div>
//     <UserFooter/>
//     </>
//   );
// };

// export default AllForms;
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import UserNavbar from "../user/UserNavbar";
import { FiLayers, FiUnlock, FiLock, FiMoreVertical } from "react-icons/fi";
import { FaArrowLeft, FaArrowDown, FaSearch, FaFileAlt,FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import usePagination from "../../hooks/usePagination";
import TableSkeleton from "./TableSkeleton";
import UserFooter from "../user/UserFooter";
import CardSkeleton from "./CardSkeleton";
const AllForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPublic, setFilterPublic] = useState("ALL");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true)
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

  return (
    <>
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-800">
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admindashboard")}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm mb-8"
        >
          <FaArrowLeft size={12} />
          <span>Back to Dashboard</span>
        </button>

        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Forms Overview</h1>
          <p className="text-slate-500 text-sm">
            Manage and monitor all forms across the platform. You can filter by visibility or search for specific titles.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-md border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <FiLayers size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Form</p>
              <p className="text-2xl font-bold text-slate-900">{totalForms}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600">
              <FiUnlock size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Public</p>
              <p className="text-2xl font-bold text-slate-900">{totalPublic}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
              <FiLock size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Private</p>
              <p className="text-2xl font-bold text-slate-900">{totalPrivate}</p>
            </div>
          </div>
        </div>







        <div className=" pr-2 py-2  rounded-md mb-8 flex flex-col md:flex-row gap-4 justify-between md:bg-[#FFFFFF] md:border md:border-[#E5E7EB] md:shadow-sm items-center">

         
          <div className="relative  w-full md:flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
             
                          className="w-full px-10 py-2 text-[10px] sm:border  border-black/30 sm:text-sm font-semibold placeholder:text-gray-400 border md:border-white/10 rounded-md outline-none transition-all"
            type="text"
              placeholder="Search by form title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

         
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="w-full">
              <select
                value={filterPublic}
                onChange={(e) => setFilterPublic(e.target.value)}
                className={`w-full md:w-auto px-2 py-2 cursor-pointer text-[10px] sm:text-sm font-bold rounded-md border border-black/30 outline-none transition-all bg-white text-black`}
              >
                <option value="ALL">All Visibility</option>
                <option value="PUBLIC">Active Only</option>
                <option value="PRIVATE">Inactive Only</option>
              </select>
            </div>
          </div>
        </div>


        {/* Table Container */}
        <div className="hidden md:block bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 text-slate-400 text-[11px] font-bold uppercase tracking-widest">

                  <th className="px-6 py-4 text-xs font-semibold ">
                    <div className="flex items-center gap-2 group cursor-pointer">


                      <span>Form Details</span>

                      <FaArrowDown className="" />

                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold ">
                    <div className="flex items-center gap-2 group cursor-pointer">


                      <span>Created By</span>

                      <FaArrowDown className="" />

                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold ">
                    <div className="flex items-center gap-2 group cursor-pointer">


                      <span>Role</span>

                      <FaArrowDown className="" />

                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold ">
                    <div className="flex items-center gap-2 group cursor-pointer">


                      <span>Status</span>

                      <FaArrowDown className="" />

                    </div>
                  </th>
                </tr>
              </thead>
              <tbody >
                {loading ? (
                  <TableSkeleton rows={5} columns={4} />
                ) :
                  currentData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-8 py-12 text-center text-slate-400">
                        No forms found.
                      </td>
                    </tr>
                  ) : (
                    currentData.map((form, index) => (
                      <motion.tr key={form.formId} initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-[#F5F6F8] border-b border-[#E9EAEB] transition-colors group">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">

                            <span className="text-sm font-medium text-slate-700">{form.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{form.user?.name || "Macd"}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{form.user?.role || "User"}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[13px] font-medium ${form.isPublic ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {form.isPublic ? "Active" : "Inactive"}
                          </span>
                        </td>
                     
                      </motion.tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="hidden md:flex px-8 py-5 border-t border-slate-50 justify-between items-center">
            <div className="flex gap-3">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-all"
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-all"
              >
                Next
              </button>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Page {currentPage} of {totalPages || 1}
            </p>
          </div>
        </div>
      
  
  {/* --- MOBILE CARDS --- */}
<div className="grid grid-cols-1 max-w-md w-full  mb-4 gap-4 md:hidden">
  {loading ? (
    <div className="flex flex-col gap-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  ) : currentData.length === 0 ? (
    <div className="bg-white p-10 text-center rounded-xl border border-[#E9EAEB]">
       <FaFileAlt className="text-slate-400 mx-auto mb-4" size={36} />
       <p className="font-semibold text-lg text-slate-900">No forms found</p>
    </div>
  ) : (
    currentData.map((form, index) => (
      <motion.div 
        key={form.formId}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white  p-5 rounded-md border border-[#E9EAEB] shadow-sm relative"
      >
       
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-sm font-bold text-[#181D27] leading-tight">{form.title}</h3>
            <p className="text-[11px] text-[#6A7181] mt-1">Ref Id: {form.formId.slice(-6)}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
            form.isPublic ? "bg-green-50 text-[#00B712]" : "bg-gray-100 text-gray-500"
          }`}>
            {form.isPublic ? "Active" : "Inactive"}
          </span>
        </div>

     
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-50">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Created By</p>
            <p className="text-xs font-semibold text-[#181D27]">{form.user?.name || "Macd"}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Role</p>
            <p className="text-xs font-semibold text-[#181D27]">{form.user?.role || "User"}</p>
          </div>
        </div>
      </motion.div>
    ))
  )}
</div>
                
<div className=" md:hidden flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-[#E9EAEB]">
    
    
    <span className="text-sm text-[#414651] font-medium order-1 md:order-2">
        Page {currentPage} of {totalPages}
    </span>

 
    <div className="flex gap-3 w-full md:w-auto order-2 md:order-1">
        <button 
            onClick={prevPage} 
            disabled={currentPage === 1} 
            className="flex-1 md:flex-none px-5 py-2 rounded-md font-semibold text-sm border border-[#D5D7DA] text-[#414651] disabled:opacity-30 hover:bg-slate-50 transition-all"
        >
            Previous
        </button>
        <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages} 
            className="flex-1 md:flex-none px-5 py-2 rounded-md font-semibold text-sm border border-[#D5D7DA] text-[#414651] disabled:opacity-40 transition-all shadow-sm"
        >
            Next
        </button>
    </div>
</div> 
      </div>
      
    </div>
    <UserFooter/>
    </>
  );
};

export default AllForms;