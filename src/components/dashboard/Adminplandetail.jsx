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

const Adminplandetail = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        } catch (err) {
            toast.error("Failed to fetch plans");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Ensure razorpayPlanId is null if empty for the backend
            const payload = {
                ...formData,
                razorpayPlanId: formData.razorpayPlanId || null
            };
            await axios.post(POST_PLAN_URL, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("New Plan Created!");
            setIsModalOpen(false);
            fetchPlans();
        } catch (err) {
            toast.error(err.response?.data?.message || "Creation failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredPlans = useMemo(() => {
        return plans.filter(plan => 
            plan.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [plans, searchTerm]);

    const { currentData, currentPage, totalPages, nextPage, prevPage } = usePagination(filteredPlans, 6);

    return (
        <>
            <UserNavbar />
            <div className="min-h-screen bg-[#F5F6F8] pb-12 font-sans">
                <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-[#14181F]">Plan Management</h1>
                            <p className="text-[#6A7181] text-sm">Define limits and pricing for your SaaS tiers.</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsModalOpen(true)}
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
                    <div className="hidden lg:block bg-white border border-[#E9EAEB] rounded-lg overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-[#F9FAFB] border-b border-[#E9EAEB] text-[#535862]">
                                <tr className="text-[11px] uppercase tracking-wider font-bold">
                                    <th className="px-6 py-4">Name & Description</th>
                                    <th className="px-6 py-4 text-center">Forms</th>
                                    <th className="px-6 py-4 text-center">Resp (D/M)</th>
                                    <th className="px-6 py-4 text-center">Themes</th>

                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E9EAEB]">
                                {loading ? (<tr><td colSpan="6" className="p-10 text-center text-gray-400">Loading plans...</td></tr>) : 
                                 currentData.map((plan) => (
                                    <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-[#181D27]">{plan.name}</div>
                                            <div className="text-[11px] text-[#6A7181]">{plan.description}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center font-medium">{plan.activeFormLimit}</td>
                                        <td className="px-6 py-4 text-center text-xs">
                                            <span className="text-[#2B4BAB]">{plan.dailyResponseLimit}</span> / {plan.monthlyResponseLimit}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {plan.themeAccess ? <FaCheck className="text-green-500 mx-auto" /> : <FaTimesCircle className="text-gray-300 mx-auto" />}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-[#181D27]">
                                            {plan.amount === 0 ? "Free" : `${plan.currency} ${plan.amount}`}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button className="text-gray-400 hover:text-[#2B4BAB]"><FaRegEdit /></button>
                                            <button className="text-gray-400 hover:text-red-500"><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card Layout */}
                    <div className="lg:hidden space-y-4">
                        {currentData.map((plan) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-4 rounded-xl border border-[#E9EAEB] shadow-sm"
                                key={plan.id}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <span className="px-2 py-0.5 bg-[#2B4BAB]/10 text-[#2B4BAB] rounded text-[10px] font-bold uppercase">{plan.planType}</span>
                                    <h3 className="font-bold text-lg text-[#181D27]">{plan.currency} {plan.amount}</h3>
                                </div>
                                <h4 className="font-bold text-[#181D27] mb-1">{plan.name}</h4>
                                <p className="text-xs text-[#6A7181] mb-4">{plan.description}</p>
                                
                                <div className="grid grid-cols-2 gap-3 border-t border-gray-50 pt-4 text-[11px]">
                                    <div><span className="text-gray-400">Forms:</span> <span className="font-bold">{plan.activeFormLimit}</span></div>
                                    <div><span className="text-gray-400">API Keys:</span> <span className="font-bold">{plan.apiKeyLimit}</span></div>
                                    <div><span className="text-gray-400">Daily:</span> <span className="font-bold">{plan.dailyResponseLimit}</span></div>
                                    <div><span className="text-gray-400">Themes:</span> <span className="font-bold">{plan.themeAccess ? 'Yes' : 'No'}</span></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detailed Create Plan Modal */}
            {/* <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-[#14181F]/60 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl my-auto"
                        >
                            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
                                <h2 className="text-lg font-bold text-[#14181F]">Configure New Plan</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors"><FaTimes /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                 
                                    <div className="md:col-span-2 text-[#2B4BAB] text-xs font-bold uppercase tracking-widest border-b pb-1">Basic Information</div>
                                    <div className="col-span-1">
                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">PLAN NAME</label>
                                        <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-[#2B4BAB]" placeholder="Pro Plan" />
                                    </div>

                                    <div className="col-span-1">
                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">PLAN TYPE</label>
                                      

                                           <input required name="planType" value={formData.planType} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-[#2B4BAB]" placeholder="Free" />
                                    </div>

                                               <div className="col-span-1">
                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">PERIOD</label>
                                        <input required name="period" value={formData.period} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-[#2B4BAB]" placeholder="e.g., Monthly, Yearly" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">DESCRIPTION</label>
                                        <input name="description" value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md text-sm outline-none" placeholder="Brief summary of features" />
                                    </div>

                                   
                                    <div className="md:col-span-2 text-[#2B4BAB] text-xs font-bold uppercase tracking-widest border-b pb-1 mt-2">Pricing & IDs</div>
                                    <div>
                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">AMOUNT ({formData.currency})</label>
                                        <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md text-sm outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">RAZORPAY PLAN ID</label>
                                        <input name="razorpayPlanId" value={formData.razorpayPlanId} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md text-sm outline-none" placeholder="plan_..." />
                                    </div>

                                    

                                    <div className="md:col-span-2 text-[#2B4BAB] text-xs font-bold uppercase tracking-widest border-b pb-1 mt-2">Resource Limits</div>
                                    <div>
                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">ACTIVE FORMS</label>
                                        <input type="number" name="activeFormLimit" value={formData.activeFormLimit} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md text-sm outline-none" />
                                    </div>

                                     <div>
                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">API KEY LIMIT</label>
                                        <input type="number" name="apiKeyLimit" value={formData.apiKeyLimit} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md text-sm outline-none" />
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">DAILY RESPONSES</label>
                                        <input type="number" name="dailyResponseLimit" value={formData.dailyResponseLimit} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md text-sm outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">MONTHLY RESPONSES</label>
                                        <input type="number" name="monthlyResponseLimit" value={formData.monthlyResponseLimit} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md text-sm outline-none" />
                                    </div>

                                      <div>
                                        <label className="text-[11px] font-bold text-gray-500 mb-1 block">USERLIMIT</label>
                                        <input type="number" name="userLimit" value={formData.userLimit} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md text-sm outline-none" />
                                    </div>

                                    <div className="flex items-center gap-2 pt-5">
                                        <input type="checkbox" id="themeAccess" name="themeAccess" checked={formData.themeAccess} onChange={handleInputChange} className="w-4 h-4 accent-[#2B4BAB]" />
                                        <label htmlFor="themeAccess" className="text-sm font-bold text-[#14181F]">Enable Theme Access</label>
                                    </div>

                                    
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-sm font-bold border rounded-md text-gray-600 hover:bg-gray-50">Cancel</button>
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="flex-1 py-2 bg-[#2B4BAB] text-white rounded-md font-bold text-sm shadow-lg hover:shadow-[#2B4BAB]/30 transition-all disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Creating..." : "Save Plan"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence> */}


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
        className="relative bg-white w-full max-w-2xl rounded-[1.5rem] shadow-2xl border border-black/5 my-auto overflow-hidden"
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
                className="w-full px-4 py-2.5 bg-slate-50 border border-black/10 rounded-xl text-sm outline-none focus:border-[#2B4BAB] focus:ring-4 focus:ring-[#2B4BAB]/5 transition-all" 
                placeholder="e.g. Pro Developer" 
              />
            </div>

            <div className="col-span-1 space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase ml-1">Plan Type</label>
              <input 
                required name="planType" value={formData.planType} onChange={handleInputChange} 
                className="w-full px-4 py-2.5 bg-slate-50 border border-black/10 rounded-xl text-sm outline-none focus:border-[#2B4BAB] transition-all" 
                placeholder="PRO / FREE" 
              />
            </div>

            <div className="col-span-1 space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase ml-1">Billing Period</label>
              <input 
                required name="period" value={formData.period} onChange={handleInputChange} 
                className="w-full px-4 py-2.5 bg-slate-50 border border-black/10 rounded-xl text-sm outline-none focus:border-[#2B4BAB] transition-all" 
                placeholder="Monthly / Yearly" 
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase ml-1">Description</label>
              <input 
                name="description" value={formData.description} onChange={handleInputChange} 
                className="w-full px-4 py-2.5 bg-slate-50 border border-black/10 rounded-xl text-sm outline-none focus:border-[#2B4BAB] transition-all" 
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
                className="w-full px-4 py-2.5 bg-slate-50 border border-black/10 rounded-xl text-sm outline-none focus:border-[#2B4BAB] transition-all font-semibold" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500 uppercase ml-1">Razorpay Plan ID</label>
              <input 
                name="razorpayPlanId" value={formData.razorpayPlanId} onChange={handleInputChange} 
                className="w-full px-4 py-2.5 bg-slate-50 border border-black/10 rounded-xl text-xs outline-none focus:border-[#2B4BAB] transition-all font-mono" 
                placeholder="plan_..." 
              />
            </div>

            {/* Section 3: Quotas */}
            <div className="md:col-span-2 mt-4">
              <span className="text-[10px] font-bold text-[#2B4BAB] uppercase tracking-[0.15em] flex items-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-[#2B4BAB]/20"></span> Resource Allocation
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase">Forms Limit</label>
                <input type="number" name="activeFormLimit" value={formData.activeFormLimit} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-black/5 rounded-lg text-sm outline-none focus:border-[#2B4BAB]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase">Monthly Response Limit</label>
                <input type="number" name="monthlyResponseLimit" value={formData.monthlyResponseLimit} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-black/5 rounded-lg text-sm outline-none focus:border-[#2B4BAB]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase">Daily Response Limit</label>
                <input type="number" name="dailyResponseLimit" value={formData.dailyResponseLimit} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-black/5 rounded-lg text-sm outline-none focus:border-[#2B4BAB]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase">API Keys Limit</label>
                <input type="number" name="apiKeyLimit" value={formData.apiKeyLimit} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-black/5 rounded-lg text-sm outline-none focus:border-[#2B4BAB]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase">Users Limit</label>
                <input type="number" name="userLimit" value={formData.userLimit} onChange={handleInputChange} className="w-full px-3 py-2 bg-slate-50 border border-black/5 rounded-lg text-sm outline-none focus:border-[#2B4BAB]" />
              </div>
            </div>

            <div className="md:col-span-2 flex items-center justify-between p-4 bg-[#2B4BAB]/5 rounded-2xl border border-[#2B4BAB]/10 mt-2">
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
              className="flex-[2] py-3 bg-[#2B4BAB] text-white rounded-xl font-bold text-sm shadow-xl shadow-[#2B4BAB]/20 hover:shadow-[#2B4BAB]/30 hover:-translate-y-0.5 transition-all active:translate-y-0 disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Publish Plan"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )}
</AnimatePresence>

            <UserFooter />
        </>
    );
};

export default Adminplandetail;