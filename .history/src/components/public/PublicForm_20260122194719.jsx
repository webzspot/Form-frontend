// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { CheckCircle2, Loader2, Send, ChevronDown } from 'lucide-react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useFormContext } from '../dashboard/FormContext';

// const PublicForm = () => {
//   const { slug } = useParams();
//   const { activePublicForm, setActivePublicForm } = useFormContext();
//   const [responses, setResponses] = useState({});
//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPublicForm = async () => {
//       try {
//         const res = await axios.get(`https://formbuilder-saas-backend.onrender.com/api/public/form/${slug}`);
//         setActivePublicForm(res.data.data);
//       } catch (err) {
//         toast.error("Form not found");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPublicForm();
//   }, [slug, setActivePublicForm]);

//   const theme = activePublicForm?.theme || {};
//   const styles = {
//     bg: theme.bgColor || "#f3f4f6",
//     button: theme.buttonColor || "#6C3BFF",
//     input: theme.inputBgColor || "#ffffff",
//     font: theme.labelFont || "Inter",
//     radius: theme.borderRadius || "16px",
//     labelColor: theme.labelColor || "#374151" // Added support for your new white font
//   };

//   const handleInputChange = (id, value) => {
//     setResponses(prev => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     setSubmitting(true);
//     try {
//       const payload = {
//         responses: Object.entries(responses).map(([formFieldId, value]) => ({ formFieldId, value }))
//       };
//       await axios.post(`https://formbuilder-saas-backend.onrender.com/api/public/form/submit/${slug}`, payload);
//       setSubmitted(true);
//     } catch (err) {
//       toast.error("Submission failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return (
//     <div className="h-screen flex items-center justify-center">
//       <Loader2 className="animate-spin text-indigo-600" size={40} />
//     </div>
//   );

//   return (
//     <div 
//       className="min-h-screen py-12 px-4 transition-all duration-500"
//       style={{ backgroundColor: styles.bg, fontFamily: `${styles.font}, sans-serif` }}
//     >
//       <div className="max-w-xl mx-auto">
//         <AnimatePresence mode="wait">
//           {submitted ? (
//             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-10 rounded-3xl shadow-xl text-center">
//               <CheckCircle2 size={60} className="text-green-500 mx-auto mb-4" />
//               <h2 className="text-2xl font-bold text-gray-800">Submission Successful!</h2>
//               <p className="text-gray-500 mt-2">Thank you for your response.</p>
//             </motion.div>
//           ) : (
//             <motion.div 
//               initial={{ y: 20, opacity: 0 }} 
//               animate={{ y: 0, opacity: 1 }}
//               className="bg-white shadow-2xl overflow-hidden"
//               style={{ borderRadius: styles.radius }}
//             >
//               <div className="h-2" style={{ backgroundColor: styles.button }} />
//               <div className="p-8">
//                 <h1 className="text-3xl font-bold mb-2" style={{ color: styles.labelColor }}>{activePublicForm?.title}</h1>
//                 <p className="text-gray-500 mb-8" style={{ color: styles.labelColor, opacity: 0.8 }}>{activePublicForm?.description}</p>
                
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   {activePublicForm?.formField?.map((field) => (
//                     <div key={field.formFieldId} className="space-y-2">
//                       <label className="block font-bold text-sm" style={{ color: styles.labelColor }}>
//                         {field.label} {field.required && <span className="text-red-500">*</span>}
//                       </label>

//                       {/* --- RENDER LOGIC BASED ON TYPE --- */}
                      
//                       {/* TEXT & EMAIL & NUMBER */}
//                       {(field.type === "TEXT" || field.type === "EMAIL" || field.type === "NUMBER") && (
//                         <input
//                           type={field.type.toLowerCase()}
//                           required={field.required}
//                           onChange={(e) => handleInputChange(field.formFieldId, e.target.value)}
//                           style={{ backgroundColor: styles.input, borderRadius: `calc(${styles.radius} / 2)` }}
//                           className="w-full border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-sm"
//                         />
//                       )}

//                       {/* TEXTAREA */}
//                       {field.type === "TEXTAREA" && (
//                         <textarea
//                           required={field.required}
//                           rows={4}
//                           onChange={(e) => handleInputChange(field.formFieldId, e.target.value)}
//                           style={{ backgroundColor: styles.input, borderRadius: `calc(${styles.radius} / 2)` }}
//                           className="w-full border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-sm resize-none"
//                         />
//                       )}

//                       {/* DROPDOWN */}
//                       {field.type === "DROPDOWN" && (
//                         <div className="relative">
//                           <select
//                             required={field.required}
//                             onChange={(e) => handleInputChange(field.formFieldId, e.target.value)}
//                             style={{ backgroundColor: styles.input, borderRadius: `calc(${styles.radius} / 2)` }}
//                             className="w-full border border-gray-200 p-4 outline-none appearance-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-sm cursor-pointer"
//                           >
//                             <option value="">Select an option</option>
//                             {field.options?.map((opt, idx) => (
//                               <option key={idx} value={opt}>{opt}</option>
//                             ))}
//                           </select>
//                           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
//                         </div>
//                       )}

//                       {/* RADIO BUTTONS */}
//                       {field.type === "RADIO" && (
//                         <div className="space-y-2">
//                           {field.options?.map((opt, idx) => (
//                             <label key={idx} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
//                               <input
//                                 type="radio"
//                                 name={field.formFieldId}
//                                 required={field.required}
//                                 onChange={() => handleInputChange(field.formFieldId, opt)}
//                                 className="w-5 h-5"
//                                 style={{ accentColor: styles.button }}
//                               />
//                               <span className="text-gray-700">{opt}</span>
//                             </label>
//                           ))}
//                         </div>
//                       )}

//                       {/* CHECKBOXES */}
//                       {field.type === "CHECKBOX" && (
//                         <div className="space-y-2">
//                           {field.options?.map((opt, idx) => (
//                             <label key={idx} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
//                               <input
//                                 type="checkbox"
//                                 onChange={(e) => {
//                                   const currentValues = responses[field.formFieldId] || [];
//                                   const newValues = e.target.checked 
//                                     ? [...currentValues, opt] 
//                                     : currentValues.filter(v => v !== opt);
//                                   handleInputChange(field.formFieldId, newValues);
//                                 }}
//                                 className="w-5 h-5"
//                                 style={{ accentColor: styles.button }}
//                               />
//                               <span className="text-gray-700">{opt}</span>
//                             </label>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))}

//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     style={{ backgroundColor: styles.button, borderRadius: `calc(${styles.radius} / 2)` }}
//                     className="w-full text-white py-4 font-bold text-lg shadow-lg hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
//                   >
//                     {submitting ? (
//                       <Loader2 className="animate-spin" size={24} />
//                     ) : (
//                       <>
//                         <span>Submit Response</span>
//                         <Send size={18} />
//                       </>
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default PublicForm;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Send, ChevronDown } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormContext } from '../dashboard/FormContext'; 






const PublicForm = () => {
  const { slug } = useParams();
  const { activePublicForm, setActivePublicForm } = useFormContext();
  const [responses, setResponses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicForm = async () => {
      try {
        const res = await axios.get(`https://formbuilder-saas-backend.onrender.com/api/public/form/${slug}`);
        setActivePublicForm(res.data.data);
      } catch (err) {
        toast.error("Form not found");
      } finally {
        setLoading(false);
      }
    };
    fetchPublicForm();
  }, [slug, setActivePublicForm]); 


  const params = new URLSearchParams(window.location.search);
  const embedTheme = {
    buttonColor: params.get("primaryColor"),
    bgColor: params.get("bgColor"),
    labelFont: params.get("font"), 
      inputBgColor: params.get("inputBgColor"),
  labelColor: params.get("labelColor"),
  borderRadius: params.get("borderRadius"),

  };
const theme = {
  ...activePublicForm?.theme,
   ...Object.fromEntries(
    Object.entries(embedTheme).filter(([_, v]) => v)
  ),
};



  //const theme = activePublicForm?.theme || {};
  const styles = {
    bg: theme.bgColor || "#f3f4f6",
    button: theme.buttonColor || "#6C3BFF",
    input: theme.inputBgColor || "#ffffff",
    font: theme.labelFont || "Inter",
    radius: theme.borderRadius || "16px",
    labelColor: theme.labelColor || "#374151"
  };

  const handleInputChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Get all fields and filter which ones are required
    const formFields = activePublicForm?.formField || [];
    const requiredFields = formFields.filter(f => f.required);

    // 2. Validate that every required field has valid data in 'responses' state
    const missingFields = requiredFields.filter(field => {
      const value = responses[field.formFieldId];

      // Check if value is undefined (never touched)
      if (value === undefined || value === null) return true;
      
      // Check if string is empty or just spaces
      if (typeof value === 'string' && value.trim() === "") return true;

      // Check if checkbox array is empty
      if (Array.isArray(value) && value.length === 0) return true;

      return false;
    });

    // 3. HARD STOP: If there are missing fields, stop the function here
    if (missingFields.length > 0) {
      toast.error(`Please fill all required fields!`);
      return; // THIS PREVENTS SUBMISSION
    }

    // 4. Double check if form is completely empty (no data at all)
    if (Object.keys(responses).length === 0 && formFields.length > 0) {
        toast.error("Please provide your response before submitting.");
        return;
    }

    setSubmitting(true);
    try {
      const payload = {
        responses: Object.entries(responses).map(([formFieldId, value]) => ({ 
            formFieldId, 
            value 
        }))
      };
      
      await axios.post(`https://formbuilder-saas-backend.onrender.com/api/public/form/submit/${slug}`, payload);
      setSubmitted(true);
      
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-indigo-600" size={40} />
    </div>
  );

  return (
    <div 
      className="min-h-screen py-12 px-4 transition-all duration-500"
      style={{ backgroundColor: styles.bg, fontFamily: `${styles.font}, sans-serif` }}
    >
      <div className="max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                className="bg-white p-10 rounded-3xl shadow-xl text-center"
            >
              <CheckCircle2 size={60} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">Submission Successful!</h2>
              <p className="text-gray-500 mt-2">Thank you for your response.</p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              className="bg-white shadow-2xl overflow-hidden"
              style={{ borderRadius: styles.radius }}
            >
              <div className="h-2" style={{ backgroundColor: styles.button }} />
              <div className="p-8">
                <h1 className="text-3xl font-bold mb-2" style={{ color: styles.labelColor }}>
                    {activePublicForm?.title}
                </h1>
                <p className="text-gray-500 mb-8" style={{ color: styles.labelColor, opacity: 0.8 }}>
                    {activePublicForm?.description}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {activePublicForm?.formField?.map((field) => (
                    <div key={field.formFieldId} className="space-y-2">
                      <label className="block font-bold text-sm" style={{ color: styles.labelColor }}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>

                      {/* TEXT & EMAIL & NUMBER */}
                      {(field.type === "TEXT" || field.type === "EMAIL" || field.type === "NUMBER") && (
                        <input
                          type={field.type.toLowerCase()}
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                          onChange={(e) => handleInputChange(field.formFieldId, e.target.value)}
                          style={{ backgroundColor: styles.input, borderRadius: `calc(${styles.radius} / 2)` }}
                          className="w-full border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-sm"
                        />
                      )}   


                      {field.type === "DATE" && (
  <input
    type="date"
    onChange={(e) => handleInputChange(field.formFieldId, e.target.value)}
    style={{ backgroundColor: styles.input, borderRadius: `calc(${styles.radius} / 2)` }}
    className="w-full border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-sm"
  />
)}

                      {/* TEXTAREA */}
                      {field.type === "TEXTAREA" && (
                        <textarea
                          rows={4}
                          placeholder={`Type your message...`}
                          onChange={(e) => handleInputChange(field.formFieldId, e.target.value)}
                          style={{ backgroundColor: styles.input, borderRadius: `calc(${styles.radius} / 2)` }}
                          className="w-full border border-gray-200 p-4 outline-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-sm resize-none"
                        />
                      )}

                      {/* DROPDOWN */}
                      {field.type === "DROPDOWN" && (
                        <div className="relative">
                          <select
                            onChange={(e) => handleInputChange(field.formFieldId, e.target.value)}
                            style={{ backgroundColor: styles.input, borderRadius: `calc(${styles.radius} / 2)` }}
                            className="w-full border border-gray-200 p-4 outline-none appearance-none focus:ring-2 focus:ring-opacity-50 transition-all shadow-sm cursor-pointer"
                          >
                            <option value="">Select an option</option>
                            {field.options?.map((opt, idx) => (
                              <option key={idx} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                      )}

                      {/* RADIO BUTTONS */}
                      {field.type === "RADIO" && (
                        <div className="grid grid-cols-1 gap-2">
                          {field.options?.map((opt, idx) => (
                            <label key={idx} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                              <input
                                type="radio"
                                name={field.formFieldId}
                                onChange={() => handleInputChange(field.formFieldId, opt)}
                                className="w-5 h-5"
                                style={{ accentColor: styles.button }}
                              />
                              <span className="text-gray-700">{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {/* CHECKBOXES */}
                      {field.type === "CHECKBOX" && (
                        <div className="grid grid-cols-1 gap-2">
                          {field.options?.map((opt, idx) => (
                            <label key={idx} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                              <input
                                type="checkbox"
                                onChange={(e) => {
                                  const currentValues = responses[field.formFieldId] || [];
                                  const newValues = e.target.checked 
                                    ? [...currentValues, opt] 
                                    : currentValues.filter(v => v !== opt);
                                  handleInputChange(field.formFieldId, newValues);
                                }}
                                className="w-5 h-5"
                                style={{ accentColor: styles.button }}
                              />
                              <span className="text-gray-700">{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{ backgroundColor: styles.button, borderRadius: `calc(${styles.radius} / 2)` }}
                    className="w-full text-white py-4 font-bold text-lg shadow-lg hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>
                        <span>Submit Response</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PublicForm;