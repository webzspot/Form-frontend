import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, Plus, Layout, Settings2, Layers, Eye, Sparkles } from 'lucide-react';
import UserNavbar from './UserNavbar';
import Footer from '../landingPage/Footer';
import Preview from './Preview'; // <--- Restored Import
import toast from "react-hot-toast";
import WaveBackground from '../dashboard/WaveBackground';
import { useFormContext } from "../dashboard/FormContext"; 
import LoadingScreen from '../shared/LoadingScreen';

// --- Custom Star Icon for Aesthetic ---
const SparkleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const Home = () => {
  const { isDarkMode } = useFormContext(); 
  const [formfields, setformfields] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("TEXT");
  const [content, setcontent] = useState(false);
  const [labelname, setlabelname] = useState("");
  const [options, setoptions] = useState([""]);
  const [previewFields, setPreviewFields] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");
  const InputFields = ["TEXT", "NUMBER", "EMAIL", "DATE", "TEXTAREA", "CHECKBOX", "RADIO", "DROPDOWN"];

  // --- LOGIC: Fetch Fields ---
  const fetchField = async () => {
    try {
      const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPreviewFields(res.data.data);
    } catch (error) {
      console.error("Fetch error", error);
    }
    finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchField();
  }, []);

  // --- LOGIC: Submit Handler ---
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
      setlabelname("");
      setoptions([""]);
      fetchField();
    } catch (err) {
      toast.error("Failed to add field");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- LOGIC: Option Change ---
  const handleoptionchange = (index, value) => {
    const updateoption = [...options];
    updateoption[index] = value;
    setoptions(updateoption);
  };

  // --- THEME CONFIGURATION ---
  const theme = {
    pageBg: isDarkMode 
      ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
      : "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95] selection:bg-purple-200",
    
    card: isDarkMode
      ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
      : "bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",

    input: isDarkMode
      ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
      : "bg-white/50 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",

    buttonPrimary: isDarkMode
      ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
      : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",

    textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/70",
    label: isDarkMode ? "text-gray-300" : "text-[#4c1d95]",
    
    previewBox: isDarkMode 
      ? "bg-[#1e1b4b]/40 border-purple-500/10" 
      : "bg-purple-50/50 border-purple-200/50",
    
    divider: isDarkMode ? "bg-purple-500/20" : "bg-purple-200"
  };

  if (loading) {
    return <LoadingScreen isDarkMode={isDarkMode} />;
  }

  return (
    <>
      <UserNavbar />
      
      <div className={`min-h-screen relative font-sans transition-colors duration-500 overflow-hidden ${theme.pageBg}`}>
        
        {/* WAVE BACKGROUNDS */}
        <div className="absolute inset-0 z-0 pointer-events-none">
             <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
             <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
             
             {/* Floating Particles */}
             <motion.div 
               animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }} 
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute top-1/4 left-10 text-white/40 text-4xl"
             ><SparkleIcon className="w-8 h-8" /></motion.div>
        </div>
    
        <main className="max-w-6xl relative z-10 mx-auto px-4 mt-10 pb-20">
          <div className="flex flex-col items-center gap-8">
            
            <motion.div 
              layout
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`w-full max-w-5xl min-h-[550px] rounded-[2rem] border overflow-hidden relative transition-all duration-500 ${theme.card}`}
            >
              
              <AnimatePresence mode="wait">
                {!formfields ? (
                  /* --- START SCREEN --- */
                  <motion.div
                    key="start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
                    
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 shadow-2xl ${isDarkMode ? 'bg-[#8b5cf6] text-white shadow-purple-500/40' : 'bg-white text-[#6C63FF] shadow-indigo-200'}`}
                    >
                      <Layers className="w-12 h-12" />
                    </motion.div>
                    
                    <h2 className={`text-4xl font-extrabold mb-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-[#4c1d95]'}`}>
                      Field Builder
                    </h2>
                    <p className={`max-w-md mb-10 text-lg leading-relaxed ${theme.textSub}`}>
                      Design your data collection flow. Start by adding a new input field to your master form.
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setformfields(true)}
                      className={`px-10 py-4 rounded-2xl font-bold flex items-center gap-3 text-lg transition-all ${theme.buttonPrimary}`}
                    >
                      <Plus size={24} /> <span>Create New Field</span>
                    </motion.button>
                  </motion.div>
                ) : (
                  /* --- EDITOR SCREEN --- */
                  <motion.div
                    key="editor"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="p-8 md:p-10 h-full flex flex-col"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                      <button 
                        onClick={() => setformfields(false)}
                        className={`p-3 rounded-xl transition-colors flex items-center gap-2 group ${isDarkMode ? 'hover:bg-white/5 text-gray-400' : 'hover:bg-purple-100 text-[#4c1d95]/70'}`}
                      >
                        <ArrowLeftIcon size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-semibold">Back</span>
                      </button>
                      
                      <div className={`flex p-1.5 rounded-xl border ${isDarkMode ? 'bg-[#05070f] border-purple-500/20' : 'bg-white border-purple-100'}`}>
                        <button className={`px-5 py-2 rounded-lg text-sm font-bold shadow-sm ${isDarkMode ? 'bg-[#8b5cf6] text-white' : 'bg-purple-100 text-purple-700'}`}>
                            Properties
                        </button>
                        <button 
                          onClick={() => setcontent(true)}
                          className={`px-5 py-2 text-sm font-semibold transition-all flex items-center gap-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-purple-700'}`}
                        >
                          <Settings2 size={14} /> Change Type
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
                      {/* Left Column: Settings */}
                      <div className="space-y-8">
                        <div className="space-y-3">
                          <label className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${theme.label}`}>
                              Field Label
                          </label>
                          <input
                            autoFocus
                            value={labelname}
                            onChange={(e) => setlabelname(e.target.value)}
                            placeholder="e.g. Full Name"
                            className={`w-full px-5 py-4 rounded-2xl outline-none transition-all duration-300 font-medium ${theme.input} hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]`}
                          />
                        </div>

                        <div className="space-y-3">
                          <label className={`text-xs font-bold uppercase tracking-widest ${theme.label}`}>Selected Type</label>
                          <div className={`flex items-center gap-4 p-5 rounded-2xl border ${isDarkMode ? 'bg-purple-500/10 border-purple-500/30' : 'bg-purple-50 border-purple-200'}`}>
                            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-white text-purple-600'}`}>
                                <Settings2 size={20} />
                            </div>
                            <div>
                                <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-[#4c1d95]'}`}>{selectedType}</p>
                                <p className={`text-xs ${theme.textSub}`}>Currently editing this field type</p>
                            </div>
                          </div>
                        </div>

                        {["CHECKBOX", "RADIO", "DROPDOWN"].includes(selectedType) && (
                          <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                             <label className={`text-xs font-bold uppercase tracking-widest ${theme.label}`}>Options</label>
                             <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                               {options.map((opt, i) => (
                                 <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} className="flex gap-2">
                                   <input
                                     value={opt}
                                     onChange={(e) => handleoptionchange(i, e.target.value)}
                                     placeholder={`Option ${i + 1}`}
                                     className={`px-4 py-3 rounded-xl outline-none border w-full ${theme.input}`}
                                   />
                                 </motion.div>
                               ))}
                             </div>
                             <button 
                              onClick={() => setoptions([...options, ""])}
                              className={`text-sm font-bold flex items-center gap-2 transition-colors ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'}`}
                             >
                               <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center"><Plus size={12} /></div> Add Option
                             </button>
                          </div>
                        )}

                        <motion.button
                          disabled={isSubmitting}
                          onClick={handlesubmit}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-4 rounded-2xl font-bold tracking-wide shadow-lg transition-all mt-4 flex justify-center items-center gap-2 ${theme.buttonPrimary} disabled:opacity-50`}
                        >
                          {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Saving...</span>
                            </>
                          ) : (
                            <>
                                <span>Save Field to Form</span>
                                
                            </>
                          )}
                        </motion.button>
                      </div>

                      {/* Right Column: Preview */}
                      <div className={`rounded-[2.5rem] p-8 border flex flex-col relative overflow-hidden ${isDarkMode ? 'bg-black/20 border-white/10' : 'bg-white/50 border-purple-100'}`}>
                         <div className="absolute top-0 right-0 p-6 opacity-30">
                             <Layout size={100} strokeWidth={0.5} />
                         </div>
                         
                         <div className="flex items-center gap-2 mb-8 opacity-70">
                             <Eye size={16} />
                             <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Live Preview</span>
                         </div>

                         <div className="flex-1 flex items-center justify-center">
                             <div className={`w-full p-8 rounded-3xl shadow-xl border backdrop-blur-md transition-all duration-300 ${isDarkMode ? 'bg-[#05070f]/80 border-purple-500/20 shadow-purple-900/10' : 'bg-white/90 border-white shadow-purple-100'}`}>
                               <div className="space-y-4">
                                   <div className="flex justify-between">
                                        <p className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{labelname || "Field Label"}</p>
                                        <span className="text-xs text-purple-500 opacity-50">*</span>
                                   </div>
                                   
                                   {selectedType === "TEXTAREA" ? (
                                     <div className={`h-24 w-full rounded-xl border ${theme.previewBox}`}></div>
                                   ) : ["CHECKBOX", "RADIO"].includes(selectedType) ? (
                                     <div className="space-y-3">
                                        {options.slice(0, 3).map((o, i) => (
                                          <div key={i} className="flex items-center gap-3 opacity-60">
                                            <div className={`w-5 h-5 border ${isDarkMode ? 'border-purple-500/50' : 'border-purple-300'} ${selectedType === 'RADIO' ? 'rounded-full' : 'rounded-md'}`}></div>
                                            <div className={`h-2.5 w-24 rounded-full ${isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}></div>
                                          </div>
                                        ))}
                                     </div>
                                   ) : (
                                     <div className={`h-12 w-full rounded-xl border ${theme.previewBox}`}></div>
                                   )}
                               </div>
                             </div>
                         </div>
                         
                         <div className="mt-8 text-center opacity-40 text-[10px] uppercase tracking-widest">
                             Simulated Environment
                         </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* TYPE SELECTOR MODAL */}
              <AnimatePresence>
                {content && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/50 backdrop-blur-2xl z-50 flex items-center justify-center p-6"
                  >
                    <motion.div 
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className={`w-full max-w-lg rounded-3xl p-8 shadow-2xl relative overflow-hidden ${theme.card}`}
                    >
                      {/* Modal Background Glow */}
                      <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-[60px] pointer-events-none" />

                      <div className="flex justify-between items-center mb-8 relative z-10">
                        <div>
                            <h3 className={`font-bold text-2xl ${isDarkMode ? 'text-white' : 'text-[#4c1d95]'}`}>Input Type</h3>
                            <p className={`text-xs ${theme.textSub}`}>Select data format</p>
                        </div>
                        <button onClick={() => setcontent(false)} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-purple-100 text-[#4c1d95]'}`}>
                          <Plus size={24} className="rotate-45" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 relative z-10">
                        {InputFields.map((type) => (
                          <button
                            key={type}
                            onClick={() => { setSelectedType(type); setcontent(false); }}
                            className={`p-4 rounded-xl border text-sm font-bold transition-all duration-300 flex items-center justify-between group ${
                              selectedType === type
                                ? (isDarkMode ? 'bg-[#8b5cf6] border-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-[#4c1d95] text-white border-[#4c1d95]')
                                : (isDarkMode ? 'bg-[#05070f] border-purple-500/20 text-gray-400 hover:border-purple-500 hover:text-white' : 'bg-white border-purple-100 text-gray-600 hover:border-purple-300 hover:text-[#4c1d95]')
                            }`}
                          >
                            <span>{type}</span>
                            {selectedType === type && <SparkleIcon className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

            {/* ================= RECENTLY ADDED PREVIEW SECTION ================= */}
            <div className="w-full max-w-5xl mt-8">
          
                
        
                <Preview previewFields={previewFields} refreshFields={fetchField} />
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;