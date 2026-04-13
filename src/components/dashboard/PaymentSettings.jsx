import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import UserNavbar from '../user/UserNavbar'
import UserFooter from '../user/UserFooter'
import toast from "react-hot-toast";
import { Eye, EyeOff, Key, ShieldCheck, Link2 } from 'lucide-react';
const PaymentSettings = () => {
 
 const[keys,setKeys]=useState({
    keyId:"",
    keySecret:"",
    webHookSecret:""
 })

 const token=sessionStorage.getItem("token")
const[loading,setLoading]=useState(false)

const handleSubmit=async(e)=>{
 e.preventDefault()
 setLoading(true)
 try{
 const res=await axios.post("https://formbuilder-saas-backend.onrender.com/api/admin/payment/keys",keys,{headers:{Authorization:`Bearer ${token}`}})
     console.log("Success:", res.data)
    toast.success("Platform Payment Settings updated successfully.");
    
    // Reset to empty strings, not an empty array
    setKeys({ keyId: "", keySecret: "", webHookSecret: "" });
 }
  catch(error){
   if (error.response?.status === 401) {
            toast.error("Invalid Razorpay credentials. Please check your Key ID and Secret.");
        } else {
            toast.error(error.response?.data?.message || "Failed to save settings.");
        }
  }
  finally{
    setLoading(false)
  }
}

  return (
  <>
    <UserNavbar />
    {/* 1. Updated Background to match Admindetails gradient */}
    <div className="relative min-h-screen w-full bg-[#F5F6F8] transition-colors duration-500">
        
        <div className="relative z-10 px-4 md:px-6 max-w-7xl mx-auto">
            
            {/* 2. Header Section - Matches Admin Management Title style */}
            <div className="mb-8 relative pt-8 overflow-hidden flex flex-col md:flex-row md:justify-between">
                <div className="max-w-md">
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#14181F] mb-2">
                        Razorpay Platform Settings
                    </h1>
                    <p className="text-sm font-normal leading-5 text-[#6A7181]">
                        Connect your Razorpay account to enable platform-wide payments and subscription management.
                    </p>
                </div>
            </div>

            {/* 3. The Card - Matches the 'white border rounded-md shadow-sm' from Admindetails */}
            <div className="bg-[#FFFFFF] border border-[#E9EAEB] shadow-sm rounded-md overflow-hidden mb-8">
                <div className="border-b p-6 border-[#E9EAEB]">
                    <p className="font-medium text-base leading-6 text-[#1D2026]">API Configuration</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Key ID */}
                        <div>
                            <label className="block text-sm font-medium text-[#414651] mb-2">Razorpay Key ID</label>
                            <div className="relative ">
                                <Key className="absolute left-3 top-4 h-4 w-4 text-[#6A7181]" />
                            <input
                                type="text"
                                required
                                placeholder="rzp_live_..."
                                className="w-full px-4 py-3 pl-10 rounded-md border border-[#E9EAEB] outline-none focus:border-[#2B4BAB] text-sm font-semibold transition-all"
                                value={keys.keyId}
                                onChange={(e) => setKeys({ ...keys, keyId: e.target.value })}
                            />
                            </div>
                        </div>

                        {/* Webhook Secret */}
                        <div>
                            <label className="block text-sm font-medium text-[#414651] mb-2">Webhook Secret</label>
                            <div className='relative'>
                                <Link2 className="absolute left-3 top-4 h-4 w-4 text-[#6A7181]" />
                            <input
                                type="password"
                                required
                                placeholder="Enter webhook secret"
                                className="w-full px-4 py-3 pl-10 rounded-md border border-[#E9EAEB] outline-none focus:border-[#2B4BAB] text-sm font-semibold transition-all"
                                value={keys.webHookSecret}
                                onChange={(e) => setKeys({ ...keys, webHookSecret: e.target.value })}
                            />
                            </div>
                        </div>
                    </div>

                    {/* Key Secret - Full Width */}
                    <div>
                        <label className="block text-sm font-medium text-[#414651] mb-2">Razorpay Key Secret</label>
                        <div className='relative'>
                            <ShieldCheck className="absolute left-3 top-4 h-4 w-4 text-[#6A7181]" />
                        <input
                            type="password"
                            required
                            placeholder="Enter your secret key"
                            className="w-full px-4 py-3 pl-10 rounded-md border border-[#E9EAEB] outline-none focus:border-[#2B4BAB] text-sm font-semibold transition-all"
                            value={keys.keySecret}
                            onChange={(e) => setKeys({ ...keys, keySecret: e.target.value })}
                        />
                        </div>
                    </div>

                    {/* Submit Button - Matches 'Create New Admin' button style */}
                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 font-semibold text-base rounded-md bg-[#2B4BAB] text-white transition-all shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:grayscale cursor-pointer"
                        >
                            {loading ? "Verifying & Saving..." : "Save Payment Settings"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <UserFooter />
</>
    
  )
}

export default PaymentSettings