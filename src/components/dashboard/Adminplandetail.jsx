import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
    FaPlus, FaSearch, FaTimes, FaFileAlt, FaRegEdit, FaTrash, FaCheck, FaTimesCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import UserNavbar from '../user/UserNavbar';
import UserFooter from '../user/UserFooter';
import usePagination from '../../hooks/usePagination';
import TableSkeleton from './TableSkeleton';
import CardSkeleton from './CardSkeleton';
import ErrorLayout from '../shared/ErrorLayout';
 const INITIAL_PLAN_FORM = {
    name: "",
    planType: "FREE",
    description: "",
    amount: 0,
    currency: "INR",
    period: "monthly",
    interval: 1,
    activeFormLimit: 3,
    apiKeyLimit: 1,
    dailyResponseLimit: 50,
    monthlyResponseLimit: 1500,
    userLimit: 1,
    themeAccess: false,
    razorpayPlanId: ""
};

const Adminplandetail = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [planToDelete, setPlanToDelete] = useState(null);
const [editingPlanId, setEditingPlanId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
 const [apiError, setApiError] = useState(null);
const [errorMessage, setErrorMessage] = useState("");
    // Detailed Form State based on your data object
    const [formData, setFormData] = useState({
        name: "",
        planType: "FREE",
        description: "",
        amount: 0,
        currency: "INR",
        period: "monthly",
        interval: 1,
        activeFormLimit: 3,
        apiKeyLimit: 1,
        dailyResponseLimit: 50,
        monthlyResponseLimit: 1500,
        userLimit: 1,
        themeAccess: false,
        razorpayPlanId: ""
    });

    const GET_PLANS_URL = 'https://formbuilder-saas-backend.onrender.com/api/plans';
    const POST_PLAN_URL = 'https://formbuilder-saas-backend.onrender.com/api/admin/payment/plans';
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        fetchPlans();
    }, []);


   
    const fetchPlans = async () => {
        setLoading(true);
        try {
            const res = await axios.get(GET_PLANS_URL);
            setPlans(res.data.data || []);
            console.log(res.data.data)
        } catch (error) {
            setApiError(error.response?.status || 500); 
    
 
    setErrorMessage(error.response?.data?.message || "Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value) 
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);
    //     try {
    //         // Ensure razorpayPlanId is null if empty for the backend
    //         const payload = {
    //             ...formData,
    //             razorpayPlanId: formData.razorpayPlanId || null
    //         };
    //         await axios.post(POST_PLAN_URL, payload, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         toast.success("New Plan Created!");
    //         setIsModalOpen(false);
    //         fetchPlans();
    //     } catch (err) {
    //         toast.error(err.response?.data?.message || "Creation failed");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };




    const handleEditClick = (plan) => {
    setEditingPlanId(plan.id); // Set the ID so we know we are in "Update" mode
    setFormData({
        name: plan.name,
        planType: plan.planType,
        description: plan.description,
        amount: plan.amount,
        currency: plan.currency,
        period: plan.period,
        interval: plan.interval || 1,
        activeFormLimit: plan.activeFormLimit,
        apiKeyLimit: plan.apiKeyLimit,
        dailyResponseLimit: plan.dailyResponseLimit,
        monthlyResponseLimit: plan.monthlyResponseLimit,
        userLimit: plan.userLimit,
        themeAccess: plan.themeAccess,
        razorpayPlanId: plan.razorpayPlanId || ""
    });
    setIsModalOpen(true);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        // Prepare payload: Backend usually expects numbers for limits
        const payload = {
            planDetails: {
                ...formData,
                amount: Number(formData.amount),
                interval: 1 
            }
        };

        if (editingPlanId) {
            await axios.put(`${POST_PLAN_URL}/${editingPlanId}`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Plan Updated!");
        } else {
            await axios.post(POST_PLAN_URL, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("New Plan Created!");
        }

        // CLOSE AND RESET
        setIsModalOpen(false);
        setEditingPlanId(null);
        setFormData(INITIAL_PLAN_FORM); // Use the constant here!
        fetchPlans();
    } catch (err) {
        toast.error(err.response?.data?.message || "Operation failed");
    } finally {
        setIsSubmitting(false);
    }
};
   

   // 1. Just opens the modal and "remembers" which ID to delete
const openDeleteModal = (plan) => {
    setPlanToDelete(plan);
    setIsDeleteModalOpen(true);
};

 

const confirmDelete = async () => {
    if (!planToDelete) return;
    setIsSubmitting(true);
    try {
        // The backend expects { planId: "uuid" } in the BODY
        await axios.delete(POST_PLAN_URL, {
            headers: { Authorization: `Bearer ${token}` },
            data: { planId: planToDelete.id } // This sends the body correctly
        });
        
        toast.success("Plan updated successfully");
        setIsDeleteModalOpen(false);
        fetchPlans();
    } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to delete plan");
    } finally {
        setIsSubmitting(false);
    }
};
    const openCreateModal = () => {
    setEditingPlanId(null);
    setFormData(INITIAL_PLAN_FORM);
    setIsModalOpen(true);
};



 const filteredPlans = useMemo(() => {
        return plans.filter(plan => 
            plan.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [plans, searchTerm]);

    const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(filteredPlans, 6);
 

    
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
            <div className="min-h-screen bg-[#F5F6F8] pb-12 font-sans">
                <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl mb-2 font-bold text-[#14181F]">Plan Management</h1>
                            <p className="text-[#6A7181] text-sm">Define limits and pricing for your SaaS tiers.</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => openCreateModal(true)}
                            className="bg-[#2B4BAB] text-white px-5 py-2.5 rounded-md font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                        >
                            <FaPlus /> Create Plan
                        </motion.button>
                    </div>

                    {/* Search */}
                    <div className="bg-white border border-[#E5E7EB] p-2 rounded-md mb-6 shadow-sm flex items-center relative">
                        <FaSearch className="absolute left-5 text-gray-400" />
                        <input 
                            type="text"
                            placeholder="Search by plan name..."
                            className="w-full pl-12 pr-4 py-2 text-sm outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden lg:block bg-white border border-[#E9EAEB] rounded-md overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-[#F9FAFB] border-b border-[#E9EAEB] text-[#535862]">
                                <tr className="text-[11px] uppercase tracking-wider font-bold">
                                    <th className="px-6 py-4 border-r border-[#E9EAEB]">Name & Description</th>
                                    <th className="px-6 py-4 text-center border-r border-[#E9EAEB]">Forms</th>
                                    <th className="px-6 py-4 text-center border-r border-[#E9EAEB]">Resp (D/M)</th>
                                    <th className="px-6 py-4 text-center border-r border-[#E9EAEB]">Themes</th>

                                    <th className="px-6 py-4 border-r border-[#E9EAEB]">Price</th>
                                    <th className="px-6 py-4 text-center border-r border-[#E9EAEB]">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E9EAEB]">
    {loading ? 
        (
                                                  <TableSkeleton rows={5} columns={6}  />
                                            ) 
     : currentData.map((plan) => (
        <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
            {/* 1. NAME & DESCRIPTION */}
            <td className="px-6 py-4 border-r border-[#E9EAEB]">
                <div className="flex items-center gap-2">
                    <div className="font-bold text-[#181D27]">{plan.name}</div>
                    {/* The isActive check shows if the plan is archived/deleted */}
                    {plan.isActive === false && (
                        <span className="bg-amber-100 text-amber-700 text-[9px] px-1.5 py-0.5 rounded font-bold">
                            ARCHIVED
                        </span>
                    )}
                </div>
                <div className="text-[11px] text-[#6A7181] truncate max-w-[200px]">
                    {plan.description}
                </div>
            </td>

            {/* 2. FORMS LIMIT */}
            <td className="px-6 py-4 border-r border-[#E9EAEB] text-center font-semibold text-[#181D27]">
                {plan.activeFormLimit}
            </td>

            {/* 3. RESPONSES (Daily / Monthly) */}
            <td className="px-6 py-4 border-r border-[#E9EAEB] text-center text-xs">
                <span className="text-[#2B4BAB] font-bold">{plan.dailyResponseLimit}</span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-[#535862]">{plan.monthlyResponseLimit}</span>
            </td>

            {/* 4. THEMES */}
            <td className="px-6 py-4 border-r border-[#E9EAEB]">
                <div className="flex justify-center">
                    {plan.themeAccess ? (
                        <FaCheck className="text-green-500" />
                    ) : (
                        <FaTimesCircle className="text-gray-300" />
                    )}
                </div>
            </td>

            {/* 5. PRICE */}
            <td className="px-6 py-4 font-bold border-r border-[#E9EAEB] text-[#181D27]">
                {plan.amount === 0 ? (
                    <span className="text-green-600">Free</span>
                ) : (
                    `${plan.currency} ${plan.amount}`
                )}
            </td>

            {/* 6. ACTIONS */}
            <td className="px-6 py-4 text-center border-r border-[#E9EAEB]">
                <div className="flex justify-center gap-3">
                    <button 
                        onClick={() => handleEditClick(plan)} 
                        className="text-gray-400 hover:text-[#2B4BAB] transition-colors"
                    >
                        <FaRegEdit size={16} />
                    </button>
                    <button 
                        onClick={() => openDeleteModal(plan)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <FaTrash size={15} />
                    </button>
                </div>
            </td>
        </tr>
    ))}
</tbody>
                        </table>
                                                        
<div className=" hidden md:flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-[#E9EAEB]">
    
    
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

                    {/* Mobile Card Layout */}
                    <div className="lg:hidden space-y-4">
                        {loading ? (
                          <div className="flex flex-col gap-4">
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                          </div>
                        ) :currentData.length === 0 ? (
                            <div className="bg-white p-10 text-center rounded-xl border border-[#E9EAEB]">
                               <FaFileAlt className="text-slate-400 mx-auto mb-4" size={36} />
                               <p className="font-semibold text-lg">No Plans found</p>
                            </div>
                          ) : (
                        currentData.map((plan) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-4  rounded-md border border-[#E9EAEB] shadow-sm"
                                key={plan.id}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <span className="px-2  bg-[#2B4BAB]/10 text-[#2B4BAB] rounded text-[10px] font-bold uppercase">{plan.planType}</span>
                                    <h3 className="font-normal ext-base text-[#181D27]">{plan.currency} {plan.amount}</h3>
                                </div>
                                <h5 className="font-bold text-[#181D27] mb-1">
  
    {plan.isActive === false && (
        <span className="ml-2 bg-amber-100 text-amber-700 text-[8px] px-1 py-0.5 rounded font-bold">
            ARCHIVED
        </span>
    )}
</h5>
                                <div className='flex justify-between items-center'>
                                    <div className='flex flex-col gap-2'>
                                <h4 className="font-bold text-[#181D27] mb-1">{plan.name}</h4>
                                <p className="text-xs text-[#6A7181] mb-2">{plan.description}</p>
                                 </div>
                                  <div className="flex justify-center gap-3">
                    <button 
                        onClick={() => handleEditClick(plan)} 
                        className="text-gray-400 hover:text-[#2B4BAB] transition-colors"
                    >
                        <FaRegEdit size={16} />
                    </button>
                    <button 
                        onClick={() => openDeleteModal(plan)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <FaTrash size={15} />
                    </button>
                </div>
                </div>
                                <div className="grid grid-cols-2 gap-3 border-t border-gray-50 pt-4 text-[11px]">
                                    <div><span className="text-gray-400">Forms:</span> <span className="font-bold">{plan.activeFormLimit}</span></div>
                                    <div><span className="text-gray-400">API Keys:</span> <span className="font-bold">{plan.apiKeyLimit}</span></div>
                                    <div><span className="text-gray-400">Daily:</span> <span className="font-bold">{plan.dailyResponseLimit}</span></div>
                                    <div><span className="text-gray-400">Themes:</span> <span className="font-bold">{plan.themeAccess ? 'Yes' : 'No'}</span></div>
                                </div>


                         
                            </motion.div>
                        )))}
                    </div>
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

            

            <AnimatePresence>
  {isModalOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop with Blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={() => setIsModalOpen(false)}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="relative bg-white w-full max-w-2xl rounded-md shadow-2xl border border-black/5 my-auto overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 py-5 border-b border-black/5 flex justify-between items-center bg-[#FAFAFA]">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Configure Plan</h2>
            <p className="text-xs text-slate-400 font-medium">Define pricing and resource allocation.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Section 1: Identity */}
            <div className="md:col-span-2">
              <span className="text-[10px] font-bold text-[#2B4BAB] uppercase tracking-[0.15em] flex items-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-[#2B4BAB]/20"></span> Basic Identity
              </span>
            </div>

            <div className="col-span-1 space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase ml-1">Plan Name</label>
              <input 
                required name="name" value={formData.name} onChange={handleInputChange} 
                className="w-full px-4 py-2.5 bg-slate-50 border border-black/10 rounded-md text-sm outline-none focus:border-[#2B4BAB] focus:ring-4 focus:ring-[#2B4BAB]/5 transition-all" 
                placeholder="e.g. Pro Developer" 
              />
            </div>

            <div className="col-span-1 space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase ml-1">Plan Type</label>
              <input 
                required name="planType" value={formData.planType} onChange={handleInputChange} 
                className="w-full px-4 py-2.5 bg-slate-50 border border-black/10 rounded-md text-sm outline-none focus:border-[#2B4BAB] transition-all" 
                placeholder="PRO / FREE" 
              />
            </div>

            <div className="col-span-1 space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase ml-1">Billing Period</label>
              <input 
                required name="period" value={formData.period} onChange={handleInputChange} 
                className="w-full px-4 py-2.5 bg-slate-50 border border-black/10 rounded-md text-sm outline-none focus:border-[#2B4BAB] transition-all" 
                placeholder="Monthly / Yearly" 
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase ml-1">Description</label>
              <input 
                name="description" value={formData.description} onChange={handleInputChange} 
                className="w-full px-4 py-2.5 bg-slate-50 border border-black/10 rounded-md text-sm outline-none focus:border-[#2B4BAB] transition-all" 
                placeholder="What makes this plan special?" 
              />
            </div>

            {/* Section 2: Financials */}
            <div className="md:col-span-2 mt-4">
              <span className="text-[10px] font-bold text-[#2B4BAB] uppercase tracking-[0.15em] flex items-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-[#2B4BAB]/20"></span> Pricing & Gateway
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase ml-1">Amount (INR)</label>
              <input 
                type="number" name="amount" value={formData.amount} onChange={handleInputChange} 
                className="w-full px-4 py-2.5 bg-slate-50 border border-black/10 rounded-md text-sm outline-none focus:border-[#2B4BAB] transition-all font-semibold" 
              />
            </div>

            {/* <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase ml-1">Razorpay Plan ID</label>
              <input 
                name="razorpayPlanId" value={formData.razorpayPlanId} onChange={handleInputChange} 
                className="w-full px-4 py-2.5 bg-slate-50 border border-black/10 rounded-xl text-xs outline-none focus:border-[#2B4BAB] transition-all font-mono" 
                placeholder="plan_..." 
              />
            </div> */}

            {/* Section 3: Quotas */}
            <div className="md:col-span-2 mt-4">
              <span className="text-[10px] font-bold text-[#2B4BAB] uppercase tracking-[0.15em] flex items-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-[#2B4BAB]/20"></span> Resource Allocation
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase">Forms Limit</label>
                <input type="number" name="activeFormLimit" value={formData.activeFormLimit} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-black/5 rounded-md text-sm outline-none focus:border-[#2B4BAB]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase">Monthly Response Limit</label>
                <input type="number" name="monthlyResponseLimit" value={formData.monthlyResponseLimit} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-black/5 rounded-md text-sm outline-none focus:border-[#2B4BAB]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase">Daily Response Limit</label>
                <input type="number" name="dailyResponseLimit" value={formData.dailyResponseLimit} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-black/5 rounded-md text-sm outline-none focus:border-[#2B4BAB]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase">API Keys Limit</label>
                <input type="number" name="apiKeyLimit" value={formData.apiKeyLimit} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-black/5 rounded-md text-sm outline-none focus:border-[#2B4BAB]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase">Users Limit</label>
                <input type="number" name="userLimit" value={formData.userLimit} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-black/5 rounded-md text-sm outline-none focus:border-[#2B4BAB]" />
              </div>
            </div>

            <div className="md:col-span-2 flex items-center justify-between p-4 bg-[#2B4BAB]/5 rounded-md border border-[#2B4BAB]/10 mt-2">
              <div>
                <label htmlFor="themeAccess" className="text-sm font-bold text-slate-800 block cursor-pointer">Premium Themes</label>
                <p className="text-[11px] text-slate-500">Allow users to access custom form designs.</p>
              </div>
              <input 
                type="checkbox" id="themeAccess" name="themeAccess" 
                checked={formData.themeAccess} onChange={handleInputChange} 
                className="w-5 h-5 accent-[#2B4BAB] rounded-md cursor-pointer" 
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-10 flex gap-4">
            <button 
              type="button" onClick={() => setIsModalOpen(false)} 
              className="flex-1 py-3 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Discard Changes
            </button>
           <button 
  type="submit" 
  disabled={isSubmitting}
  className="flex-[2] py-3 bg-[#2B4BAB] text-white rounded-md font-bold text-sm ..."
>
  {isSubmitting ? "Processing..." : (editingPlanId ? "Update Plan" : "Publish Plan")}
</button>
          </div>
        </form>
      </motion.div>
    </div>
  )}
</AnimatePresence>


{/* DELETE CONFIRMATION MODAL */}
<AnimatePresence>
  {isDeleteModalOpen && (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setIsDeleteModalOpen(false)}
      />
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-white p-8 rounded-md max-w-sm w-full shadow-2xl text-center"
      >
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          <FaTrash />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Plan?</h3>
        <p className="text-sm text-slate-500 mb-8">
          Are you sure you want to delete <span className="font-bold text-slate-700">"{planToDelete?.name}"</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsDeleteModalOpen(false)}
            className="flex-1 py-3 rounded-md font-bold text-slate-400 hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={confirmDelete}
            disabled={isSubmitting}
            className="flex-1 py-3 bg-red-500 text-white rounded-md font-bold hover:bg-red-600 shadow-lg shadow-red-200 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

            <UserFooter />
        </>
    );
};

export default Adminplandetail;