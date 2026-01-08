import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; // 1. Added Toaster import

const PublicForm = () => {
  const { slug } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const getForm = async () => {
    try {
      const res = await axios.get(`https://formbuilder-saas-backend.onrender.com/api/public/form/${slug}`);
      setForm(res.data.data);
    } catch (err) {
      console.log("Error", err);
      setErrorMessage("Could not load the form. It may have been deleted or the link is invalid.");
    }
  };

  useEffect(() => {
    getForm();
  }, []);

  const handleChange = (fieldId, value) => {
    setResponses((prev) => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setSubmitting(true);

    // 2. Updated Validation Loop with Toast
    for (const field of form.formField) {
      const value = responses[field.formFieldId];
      // Check if required field is empty (handles strings, arrays for checkboxes, and null/undefined)
      if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
        toast.error(`Required: ${field.label}`, {
          style: {
            borderRadius: '12px',
            background: '#333',
            color: '#fff',
          },
        });
        setSubmitting(false);
        return;
      }
    }

    const payload = {
      responses: Object.entries(responses).map(([formFieldId, value]) => ({
        formFieldId,
        value
      }))
    };

    try {
      await axios.post(`https://formbuilder-saas-backend.onrender.com/api/public/form/submit/${slug}`, payload);
     
      setSuccessMessage("Your response has been submitted successfully!");
    } catch (err) {
    
      setErrorMessage("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!form) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex flex-col justify-center items-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="mb-4"
        >
          <Loader2 size={40} className="text-[#6C3BFF]" />
        </motion.div>
        <p className='text-gray-500 font-medium text-lg animate-pulse'>Loading FormCraft...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] selection:bg-[#6C3BFF] selection:text-white flex justify-center items-start py-12 px-4 sm:px-6">
      {/* 5. Place the Toaster here */}
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="w-full max-w-2xl">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-[#6C3BFF] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white text-xl font-bold">⧉</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">FormCraft</h2>
        </div>

        <AnimatePresence mode="wait">
          {successMessage ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-10 rounded-3xl shadow-2xl shadow-indigo-100 text-center border border-gray-100"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={44} className="text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
              <p className="text-gray-600 mb-8">{successMessage}</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-2xl shadow-indigo-50 border border-gray-100 overflow-hidden"
            >
              <div className="h-2 bg-[#A084FF]" />
              
              <div className="p-8 sm:p-12">
                <h1 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">{form.title}</h1>
                <p className="text-gray-500 text-lg leading-relaxed mb-10">{form.description}</p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Keep the inline error as a backup, or remove if you only want toasts */}
                  {errorMessage && (
                    <motion.div 
                      initial={{ x: -10, opacity: 0 }} 
                      animate={{ x: 0, opacity: 1 }}
                      className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 rounded-r-xl"
                    >
                      <AlertCircle size={20} />
                      <span className="text-sm font-semibold">{errorMessage}</span>
                    </motion.div>
                  )}

                  {form.formField.map((field) => (
                    <div key={field.formFieldId} className="group transition-all">
                      <label className="block text-black/80 font-bold mb-2 group-focus-within:text-[#6C3BFF] transition-colors">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>

                      <div className="relative">
                        {field.type === "TEXT" && (
                          <input
                            type="text"
                            placeholder="Type your answer here..."
                            onChange={(e) => handleChange(field.formFieldId, e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-[#6C3BFF] focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all px-4 py-3 rounded-xl outline-none text-gray-700"
                          />
                        )}

                        {field.type === "EMAIL" && (
                          <input
                            type="email"
                            placeholder="name@example.com"
                            onChange={(e) => handleChange(field.formFieldId, e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-[#6C3BFF] focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all px-4 py-3 rounded-xl outline-none text-gray-700"
                          />
                        )}

                        {field.type === "NUMBER" && (
                          <input
                            type="number"
                            placeholder="0"
                            onChange={(e) => handleChange(field.formFieldId, e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-[#6C3BFF] focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all px-4 py-3 rounded-xl outline-none text-gray-700"
                          />
                        )}

                        {field.type === "DATE" && (
                          <input
                            type="date"
                            onChange={(e) => handleChange(field.formFieldId, e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-[#6C3BFF] focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all px-4 py-3 rounded-xl outline-none text-gray-700"
                          />
                        )}

                        {field.type === "TEXTAREA" && (
                          <textarea
                            placeholder="Enter detailed information..."
                            rows={4}
                            onChange={(e) => handleChange(field.formFieldId, e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-[#6C3BFF] focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all px-4 py-3 rounded-xl outline-none text-gray-700 resize-none"
                          />
                        )}

                        {field.type === "CHECKBOX" && (
                          <div className="grid grid-cols-1 gap-2 mt-2">
                            {field.options.map((opt, i) => (
                              <label key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-indigo-50 cursor-pointer transition-colors group/opt">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    setResponses((prev) => {
                                      const prevValues = prev[field.formFieldId] || [];
                                      return {
                                        ...prev,
                                        [field.formFieldId]: e.target.checked
                                          ? [...prevValues, opt]
                                          : prevValues.filter((v) => v !== opt),
                                      };
                                    });
                                  }}
                                  className="w-5 h-5 accent-[#6C3BFF] rounded"
                                />
                                <span className="text-gray-700 font-medium">{opt}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {field.type === "RADIO" && (
                          <div className="grid grid-cols-1 gap-2 mt-2">
                            {field.options.map((opt, i) => (
                              <label key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-indigo-50 cursor-pointer transition-colors">
                                <input
                                  type="radio"
                                  name={field.formFieldId}
                                  onChange={() => handleChange(field.formFieldId, opt)}
                                  className="w-5 h-5 accent-[#6C3BFF]"
                                />
                                <span className="text-gray-700 font-medium">{opt}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {field.type === "DROPDOWN" && (
                          <select
                            onChange={(e) => handleChange(field.formFieldId, e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-[#6C3BFF] focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all px-4 py-3 rounded-xl outline-none text-gray-700 appearance-none cursor-pointer"
                          >
                            <option value="">Select an option</option>
                            {field.options.map((opt, i) => (
                              <option key={i} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-8 group relative flex items-center justify-center bg-[#111827] hover:bg-black text-white py-4 rounded-2xl font-bold transition-all transform hover:translate-y-[-2px] active:translate-y-[0px] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-gray-200"
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin mr-2" size={20} />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Submit Response</span>
                        <Send size={18} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    )}
                  </button>
                </form>
              </div>
              
              <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Powered by FormCraft</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PublicForm;