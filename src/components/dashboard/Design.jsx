


// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   MdOutlineDesignServices, 
//   MdOutlinePalette, 
//   MdTextFields, 
//   MdRoundedCorner, 
//   MdColorLens, 
//   MdOutlineAdsClick 
// } from 'react-icons/md';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const Design = ({ editingFormId, token, formTheme, setFormTheme, isDarkMode }) => {
//   const [isDesigning, setIsDesigning] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('presets'); // 'presets', 'button', 'background', 'typography'

//   const palettes = [
//     { name: "Default", bg: "#ffffff", btn: "#2B4BAB", input: "#f3f4f6", text: "#111827" },
//     { name: "Midnight", bg: "#0f172a", btn: "#3b82f6", input: "#1e293b", text: "#ffffff" },
//     { name: "Forest", bg: "#f0fdf4", btn: "#166534", input: "#ffffff", text: "#14532d" },
//     { name: "Sunset", bg: "#fff7ed", btn: "#ea580c", input: "#ffedd5", text: "#7c2d12" },
//     { name: "Ocean", bg: "#f0f9ff", btn: "#2B4BAB", input: "#e0f2fe", text: "#0c4a6e" },
//     { name: "Slate", bg: "#f8fafc", btn: "#334155", input: "#f1f5f9", text: "#0f172a" },
//   ];

//   const handleLiveUpdate = (key, value) => {
//     setFormTheme(prev => ({ ...prev, [key]: value }));
//   };

//   const applyPalette = (p) => {
//     setFormTheme(prev => ({
//       ...prev,
//       bgColor: p.bg,
//       buttonColor: p.btn || "#2B4BAB",
//       inputBgColor: p.input,
//       labelColor: p.text || "#374151" 
//     }));
//     toast.success(`${p.name} applied!`);
//   };

//   const saveThemeOnly = async () => {
//     if (!editingFormId) return toast.error("Publish the form first to save design");
//     setLoading(true);
//     try {
//       await axios.put(
//         `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/theme/${editingFormId}`,
//         { theme: formTheme },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Design saved successfully!");
//     } catch (err) {
//       toast.error("Failed to save design");
//     } finally {
//       setLoading(false);
//     }
//   };

//       const theme = {
//       pageBg: isDarkMode 
//         ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
//         : "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95] selection:bg-purple-200",
      
//       card: isDarkMode
//         ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
//         : "bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",
  
//       input: isDarkMode
//         ? "bg-[#05070f] border border-purple-800/30 hover:border-purple-800/50 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
//         : "bg-white/50 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",
  
//       buttonPrimary: isDarkMode
//         ? "bg-[#2B4BAB] hover:bg-[#2B4BAB] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
//         : "bg-[#2B4BAB] text-white hover:shadow-lg hover:shadow-purple-500/30",
  
//       textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/70",
//       label: isDarkMode ? "text-gray-300" : "text-[#4c1d95]",
//       texttwo: isDarkMode ? "text-gray-400" : "text-black",
//       previewBox: isDarkMode 
//         ? "bg-[#1e1b4b]/40 border-purple-500/10" 
//         : "bg-purple-50/50 border-purple-200/50",
      
//       buttonsecondary: isDarkMode?
//       "bg-gray-900 text-white":"bg-gray-600 text-white",
//     };

//   return (
//     <div className="w-full ">
//       <button
//         onClick={() => setIsDesigning(!isDesigning)}
//         className="bg-[#2B4BAB] text-white px-4 sm:py-3 py-3 rounded-sm font-semibold flex items-center gap-3 w-full justify-center transition-all shadow-lg"
//       >
//         <MdOutlineDesignServices size={18} /> 
//         {isDesigning ? "Close Designer" : "Customize Form"}
//       </button>

//       <AnimatePresence>
//         {isDesigning && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className={`mt-4 ${theme.card} rounded-2xl shadow-2xl overflow-hidden flex flex-col`}
//           >
//             {/* --- TAB NAVIGATION --- */}
//             <div className={`flex ${theme.previewBox} p-1`}>
//               {[
//                 { id: 'presets', icon: <MdOutlinePalette />, label: 'Themes' },
//                 { id: 'button', icon: <MdOutlineAdsClick />, label: 'Buttons' },
//                 { id: 'background', icon: <MdColorLens />, label: 'BG Color' },
//                 { id: 'typography', icon: <MdTextFields />, label: 'Fonts' },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex-1 flex flex-col items-center sm:py-3 py-1 gap-1 transition-all rounded-xl ${
//                     activeTab === tab.id 
//                     ? `${theme.buttonPrimary}` 
//                     : "text-gray-400 hover:text-[#2B4BAB]"
//                   }`}
//                 >
//                   <span className="sm:text-xl">{tab.icon}</span>
//                   <span className="text-[8px] sm:text-[12px] uppercase font-bold">{tab.label}</span>
//                 </button>
//               ))}
//             </div>

//             <div className="sm:p-6 p-4 ">
//               <AnimatePresence mode="wait">
//                 {/* 1. THEMES SECTION */}
//                 {activeTab === 'presets' && (
//                   <motion.div 
//                     key="presets" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }}
//                     className="grid grid-cols-2 gap-3"
//                   >
//                     {palettes.map(p => (
//                       <button 
//                         key={p.name} 
//                         onClick={() => applyPalette(p)} 
//                         className={`group sm:p-3 p-2 ${theme.input} rounded-2xl flex flex-col gap-3 transition-all text-left`}
//                       >
//                         <div className="flex gap-1">
//                           <div className="sm:w-6 sm:h-6 w-4 h-4 rounded-full shadow-sm border border-gray-200" style={{ backgroundColor: p.bg }}></div>
//                           <div className="sm:w-6 sm:h-6 w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: p.btn }}></div>
//                         </div>
//                         <span className={`text-xs font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{p.name}</span>
//                       </button>
//                     ))}
//                   </motion.div>
//                 )}

//                 {/* 2. BUTTONS SECTION */}
//                 {activeTab === 'button' && (
//                   <motion.div 
//                     key="button" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }}
//                     className="space-y-6"
//                   >
//                     <div className="space-y-3">
//                       <label className={`text-[12px] sm:text-sm uppercase font-bold ${theme.label}`}>Button Color</label>
//                       <input type="color" value={formTheme.buttonColor} onChange={(e) => handleLiveUpdate('buttonColor', e.target.value)} className="w-full mt-2 sm:h-12 h-8 cursor-pointer rounded-xl overflow-hidden border-none" />
//                     </div>
//                     <div className="space-y-3">
//                       <div className="flex justify-between">
//                         <label className={`text-[12px] sm:text-sm uppercase font-bold ${theme.label}`}>Corner Rounding</label>
//                         <span className="text-xs font-mono text-[#2B4BAB] font-bold">{formTheme.borderRadius}</span>
//                       </div>
//                       <input 
//                         type="range" min="0" max="40" step="4"
//                         value={parseInt(formTheme.borderRadius) || 12} 
//                         onChange={(e) => handleLiveUpdate('borderRadius', `${e.target.value}px`)} 
//                         className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2B4BAB]" 
//                       />
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* 3. BACKGROUND SECTION */}
//                 {activeTab === 'background' && (
//                   <motion.div 
//                     key="background" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }}
//                     className="grid grid-cols-1 gap-6"
//                   >
//                     <div className="space-y-3">
//                       <label className={`text-[12px] sm:text-sm uppercase font-bold ${theme.label}`}>Page Background</label>
//                       <div className="flex gap-4 items-center">
//                         <input type="color" value={formTheme.bgColor} onChange={(e) => handleLiveUpdate('bgColor', e.target.value)} className="w-20 h-20 cursor-pointer rounded-2xl border-none" />
//                         <div className={`flex-1 p-3 text-[11px] sm:text-sm rounded-xl ${theme.input}`}>
//                           This color applies to the entire page background of your public form.
//                         </div>
//                       </div>
//                     </div>
//                     <div className="space-y-3">
//                       <label className={`text-[12px] sm:text-sm uppercase font-bold ${theme.label}`}>Form Input Background</label>
//                       <input type="color" value={formTheme.inputBgColor || "#ffffff"} onChange={(e) => handleLiveUpdate('inputBgColor', e.target.value)} className="w-full mt-2 sm:h-10 h-8 cursor-pointer rounded-lg border-none" />
//                     </div>
//                   </motion.div>
//                 )}

//                 {/* 4. TYPOGRAPHY SECTION */}
//                 {activeTab === 'typography' && (
//                   <motion.div 
//                     key="typography" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }}
//                     className="space-y-4"
//                   >
//                     <div className="space-y-3">
//                         <label className={`text-[12px] sm:text-sm uppercase font-bold ${theme.label}`}>Font Family</label>
//                         <div className="grid grid-cols-1 gap-2 mt-4">
//                             {["Inter", "Poppins", "Roboto", "Montserrat", "Playfair Display", "Space Grotesk"].map((font) => (
//                                 <button
//                                     key={font}
//                                     onClick={() => handleLiveUpdate('labelFont', font)}
//                                     style={{ fontFamily: font }}
//                                     className={`w-full text-[12px] sm:text-sm px-4 sm:py-2 py-0.5 text-left rounded-xl transition-all ${formTheme.labelFont === font ? "bg-[#2B4BAB] text-white shadow-sm" : `${theme.texttwo} hover:bg-gray-100`}`}
//                                 >
//                                     {font}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="space-y-3">
//                         <label className={`text-[12px] sm:text-sm uppercase font-bold ${theme.label}`}>Text Color</label>
//                         <input type="color" value={formTheme.labelColor || "#374151"} onChange={(e) => handleLiveUpdate('labelColor', e.target.value)} 
//                         className="w-full mt-2 sm:h-10 h-8 cursor-pointer rounded-lg border-none" />
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* --- FOOTER ACTION --- */}
//             <div className={`p-5 ${theme.input} border-t border-gray-100`}>
//               <button 
//                 onClick={saveThemeOnly} 
//                 disabled={loading} 
//                 className={`w-full sm:py-4 py-2 rounded-2xl text-sm font-bold transition-all shadow-lg active:scale-95 ${editingFormId ? `${theme.buttonPrimary}` : `${theme.buttonsecondary}`}`}
//               >
//                 {loading ? "Saving Styles..." : "Apply & Save Design"}
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Design;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdOutlineDesignServices, 
  MdOutlinePalette, 
  MdTextFields, 
  MdColorLens, 
  MdOutlineAdsClick 
} from 'react-icons/md';
import axios from 'axios';
import toast from 'react-hot-toast';

const Design = ({ editingFormId, token, formTheme, setFormTheme, isDarkMode }) => {
  const [isDesigning, setIsDesigning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('presets');

  // Updated palettes with focus on #2B4BAB and White
  const palettes = [
    { name: "Brand (Blue/White)", bg: "#ffffff", btn: "#2B4BAB", input: "#ffffff", text: "#111827" },
    { name: "Clean Studio", bg: "#fafafa", btn: "#2B4BAB", input: "#f3f4f6", text: "#111827" },
    { name: "Midnight", bg: "#0f172a", btn: "#3b82f6", input: "#1e293b", text: "#ffffff" },
    { name: "Slate", bg: "#f8fafc", btn: "#334155", input: "#f1f5f9", text: "#0f172a" },
    { name: "Soft Mint", bg: "#f0fdf4", btn: "#2B4BAB", input: "#ffffff", text: "#14532d" },
  ];

  const handleLiveUpdate = (key, value) => {
    setFormTheme(prev => ({ ...prev, [key]: value }));
  };

  const applyPalette = (p) => {
    setFormTheme(prev => ({
      ...prev,
      bgColor: p.bg,
      buttonColor: p.btn || "#2B4BAB",
      inputBgColor: p.input,
      labelColor: p.text || "#374151" 
    }));
    toast.success(`${p.name} applied!`);
  };

  const saveThemeOnly = async () => {
    if (!editingFormId) return toast.error("Publish the form first to save design");
    setLoading(true);
    try {
      await axios.put(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/theme/${editingFormId}`,
        { theme: formTheme },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Design saved successfully!");
    } catch (err) {
      toast.error("Failed to save design");
    } finally {
      setLoading(false);
    }
  };

  const theme = {
    // Replaced gradients with clean white/brand blue logic
    pageBg: isDarkMode 
      ? "bg-[#05070f] text-white" 
      : "bg-white text-gray-900",
    
    card: isDarkMode
      ? "bg-[#12121a] border border-gray-800 shadow-sm rounded-sm"
      : "bg-white border border-gray-100 shadow-md rounded-sm",

    input: isDarkMode
      ? "bg-[#05070f] border border-gray-800 text-white rounded-sm"
      : "bg-gray-50 border border-gray-200 text-gray-900 rounded-sm",

    buttonPrimary: "bg-[#2B4BAB] text-white rounded-sm hover:bg-black transition-colors",
    
    label: isDarkMode ? "text-gray-300" : "text-gray-900",
    textSub: isDarkMode ? "text-gray-400" : "text-gray-500",
    previewBox: isDarkMode ? "bg-gray-900" : "bg-gray-50",
    buttonsecondary: "bg-gray-200 text-gray-700 rounded-sm",
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsDesigning(!isDesigning)}
        className="bg-[#2B4BAB] text-white px-4 py-3 rounded-sm font-semibold flex items-center gap-3 w-full justify-center transition-all shadow-md active:scale-[0.98]"
      >
        <MdOutlineDesignServices size={18} /> 
        {isDesigning ? "Close Designer" : "Customize Form Styles"}
      </button>

      <AnimatePresence>
        {isDesigning && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`mt-4 ${theme.card} overflow-hidden flex flex-col`}
          >
            {/* --- TAB NAVIGATION (Brand Blue UI) --- */}
            <div className={`flex ${theme.previewBox} border-b border-gray-100 p-1`}>
              {[
                { id: 'presets', icon: <MdOutlinePalette />, label: 'Themes' },
                { id: 'button', icon: <MdOutlineAdsClick />, label: 'Buttons' },
                { id: 'background', icon: <MdColorLens />, label: 'Canvas' },
                { id: 'typography', icon: <MdTextFields />, label: 'Text' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center py-3 gap-1 transition-all rounded-sm ${
                    activeTab === tab.id 
                    ? "bg-[#2B4BAB] text-white shadow-sm" 
                    : "text-gray-400 hover:text-[#2B4BAB] hover:bg-white"
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {/* 1. THEMES SECTION */}
                {activeTab === 'presets' && (
                  <motion.div 
                    key="presets" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {palettes.map(p => (
                      <button 
                        key={p.name} 
                        onClick={() => applyPalette(p)} 
                        className={`group p-3 border border-gray-100 rounded-sm flex flex-col gap-3 transition-all text-left hover:border-[#2B4BAB] hover:shadow-sm`}
                      >
                        <div className="flex gap-1.5">
                          <div className="w-6 h-6 rounded-sm shadow-inner border border-gray-200" style={{ backgroundColor: p.bg }}></div>
                          <div className="w-6 h-6 rounded-sm shadow-sm" style={{ backgroundColor: p.btn }}></div>
                        </div>
                        <span className="text-[11px] font-bold text-gray-700 tracking-tight">{p.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* 2. BUTTONS SECTION */}
                {activeTab === 'button' && (
                  <motion.div 
                    key="button" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Button Color</label>
                      <input type="color" value={formTheme.buttonColor} onChange={(e) => handleLiveUpdate('buttonColor', e.target.value)} className="w-full h-12 cursor-pointer rounded-sm border-none bg-transparent" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Corner Radius</label>
                        <span className="text-xs font-bold text-[#2B4BAB]">{formTheme.borderRadius}</span>
                      </div>
                      <input 
                        type="range" min="0" max="20" step="2"
                        value={parseInt(formTheme.borderRadius) || 0} 
                        onChange={(e) => handleLiveUpdate('borderRadius', `${e.target.value}px`)} 
                        className="w-full h-1.5 bg-gray-100 rounded-sm appearance-none cursor-pointer accent-[#2B4BAB]" 
                      />
                    </div>
                  </motion.div>
                )}

                {/* 3. BACKGROUND SECTION */}
                {activeTab === 'background' && (
                  <motion.div 
                    key="background" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Page Background</label>
                      <div className="flex gap-4 items-center">
                        <input type="color" value={formTheme.bgColor} onChange={(e) => handleLiveUpdate('bgColor', e.target.value)} className="w-16 h-16 cursor-pointer rounded-sm border-none bg-transparent shadow-sm" />
                        <div className="flex-1 p-3 text-[11px] leading-relaxed text-gray-400 bg-gray-50 border border-gray-100 rounded-sm italic">
                          This defines the outer workspace color for your form.
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Input Field Fill</label>
                      <input type="color" value={formTheme.inputBgColor || "#ffffff"} onChange={(e) => handleLiveUpdate('inputBgColor', e.target.value)} className="w-full h-10 cursor-pointer rounded-sm border-none bg-transparent" />
                    </div>
                  </motion.div>
                )}

                {/* 4. TYPOGRAPHY SECTION */}
                {activeTab === 'typography' && (
                  <motion.div 
                    key="typography" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Selected Font</label>
                    <div className="grid grid-cols-1 gap-1.5">
                      {["Inter", "Poppins", "Montserrat", "Space Grotesk"].map((font) => (
                        <button
                          key={font}
                          onClick={() => handleLiveUpdate('labelFont', font)}
                          style={{ fontFamily: font }}
                          className={`w-full text-xs px-4 py-3 text-left rounded-sm transition-all border ${
                            formTheme.labelFont === font 
                            ? "border-[#2B4BAB] bg-[#2B4BAB]/5 text-[#2B4BAB] font-bold" 
                            : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          {font}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* --- FOOTER ACTION --- */}
            <div className="p-5 bg-gray-50 border-t border-gray-100">
              <button 
                onClick={saveThemeOnly} 
                disabled={loading} 
                className={`w-full py-4 rounded-sm text-xs font-black uppercase tracking-[0.2em] transition-all shadow-md active:scale-[0.98] ${
                  editingFormId ? "bg-[#2B4BAB] text-white hover:bg-black" : "bg-gray-300 text-white cursor-not-allowed"
                }`}
              >
                {loading ? "Syncing..." : "Finalize Design"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Design;