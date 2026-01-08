import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, Plus, Trash2, Layout, Settings2, Sparkles } from 'lucide-react';
import UserNavbar from './UserNavbar';
import Footer from '../landingPage/Footer';
import Preview from './Preview';
import toast from "react-hot-toast";

const Home = () => {
  const [formfields, setformfields] = useState(false);
  const [selectedType, setSelectedType] = useState("TEXT");
  const [content, setcontent] = useState(false);
  const [labelname, setlabelname] = useState("");
  const [options, setoptions] = useState([""]);
  const [previewFields, setPreviewFields] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");
  const InputFields = ["TEXT", "NUMBER", "EMAIL", "DATE", "TEXTAREA", "CHECKBOX", "RADIO", "DROPDOWN"];

  const fetchField = async () => {
    try {
      const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPreviewFields(res.data.data);
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  useEffect(() => {
    fetchField();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!labelname) return toast.error("Please enter a label name");

    setIsSubmitting(true);
    const payload = {
      label: labelname,
      type: selectedType,
      options: ["CHECKBOX", "RADIO", "DROPDOWN"].includes(selectedType)
        ? options.filter(o => o.trim() !== "")
        : []
    };

    try {
      await axios.post("https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Field added to form!");
      // Reset after success
      setlabelname("");
      setoptions([""]);
      fetchField();
    } catch (err) {
      toast.error("Failed to add field");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleoptionchange = (index, value) => {
    const updateoption = [...options];
    updateoption[index] = value;
    setoptions(updateoption);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      <UserNavbar />

      <main className="max-w-6xl mx-auto px-4 mt-5">
        <div className="flex flex-col items-center gap-8">
        
          <motion.div 
            layout
            className="w-full max-w-4xl min-h-[450px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden relative"
          >
            <AnimatePresence mode="wait">
              {!formfields ? (
                /* INITIAL STATE: START BUILDING */
                <motion.div
                  key="start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center mb-6">
                    <Layout className="w-10 h-10 text-violet-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Create New Field</h2>
                  <p className="text-slate-500 max-w-sm mb-8">Start by adding your first input field to define how you want to collect data.</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setformfields(true)}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-violet-200 transition-all"
                  >
                    <Plus size={20} /> Build Field
                  </motion.button>
                </motion.div>
              ) : (
                /* ACTIVE STATE: FIELD EDITOR */
                <motion.div
                  key="editor"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="p-8 h-full flex flex-col"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-10">
                    <button 
                      onClick={() => setformfields(false)}
                      className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                    >
                      <ArrowLeftIcon size={24} />
                    </button>
                    
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                      <button className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-bold text-violet-600">Properties</button>
                      <button 
                        onClick={() => setcontent(true)}
                        className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-all"
                      >
                        Change Type
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-grow">
                    {/* Input Selection Side */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Field Label</label>
                        <input
                          autoFocus
                          value={labelname}
                          onChange={(e) => setlabelname(e.target.value)}
                          placeholder="e.g. Your Full Name"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:bg-white outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Field Type</label>
                        <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-2xl border border-violet-100">
                          <Settings2 className="text-violet-500" />
                          <span className="font-bold text-violet-700">{selectedType}</span>
                        </div>
                      </div>

                      {["CHECKBOX", "RADIO", "DROPDOWN"].includes(selectedType) && (
                        <div className="space-y-3">
                           <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Configure Options</label>
                           {options.map((opt, i) => (
                             <div key={i} className="flex gap-2">
                               <input
                                 value={opt}
                                 onChange={(e) => handleoptionchange(i, e.target.value)}
                                 placeholder={`Option ${i + 1}`}
                                 className=" px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                               />
                             </div>
                           ))}
                           <button 
                            onClick={() => setoptions([...options, ""])}
                            className="text-sm text-violet-600 font-bold flex items-center gap-1 hover:underline"
                           >
                            <Plus size={14} /> Add Option
                           </button>
                        </div>
                      )}

                      <button
                        disabled={isSubmitting}
                        onClick={handlesubmit}
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl"
                      >
                        {isSubmitting ? "Saving..." : "Save Field"}
                      </button>
                    </div>

                    {/* Live Preview Side */}
                    <div className="bg-slate-50 rounded-3xl p-8 border border-dashed border-slate-200 flex flex-col items-center justify-center">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Live Preview</span>
                       <div className="w-full max-w-xs bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                         <p className="text-sm font-bold text-slate-700 mb-2">{labelname || "Label Name"}</p>
                         {/* Dynamic Preview Rendering */}
                         {selectedType === "TEXTAREA" ? (
                           <div className="h-20 w-full bg-slate-50 rounded-lg border border-slate-200"></div>
                         ) : ["CHECKBOX", "RADIO"].includes(selectedType) ? (
                           <div className="space-y-2">
                              {options.slice(0, 3).map((o, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <div className={`w-4 h-4 border border-slate-300 ${selectedType === 'RADIO' ? 'rounded-full' : 'rounded'}`}></div>
                                  <div className="h-2 w-16 bg-slate-100 rounded"></div>
                                </div>
                              ))}
                           </div>
                         ) : (
                           <div className="h-10 w-full bg-slate-50 rounded-lg border border-slate-200"></div>
                         )}
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TYPE SELECTOR OVERLAY */}
            <AnimatePresence>
              {content && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-xl text-slate-800">Select Input Type</h3>
                      <button onClick={() => setcontent(false)} className="p-1 hover:bg-slate-100 rounded-full">
                        <Plus size={20} className="rotate-45" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {InputFields.map((type) => (
                        <button
                          key={type}
                          onClick={() => { setSelectedType(type); setcontent(false); }}
                          className={`p-4 rounded-2xl border text-sm font-bold transition-all ${
                            selectedType === type ? 'bg-violet-600 border-violet-600 text-white' : 'bg-white border-slate-100 hover:border-violet-200 text-slate-600'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* RECENTLY ADDED SECTION */}
        <div className="mt-10">
        
          <Preview previewFields={previewFields} refreshFields={fetchField} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;