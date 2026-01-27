import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdOutlineDesignServices, 
  MdOutlinePalette, 
  MdTextFields, 
  MdRoundedCorner, 
  MdColorLens, 
  MdOutlineAdsClick 
} from 'react-icons/md';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useFormContext } from './FormContext';

const Design = ({ editingFormId, token, formTheme, setFormTheme, isDarkMode }) => {
  const [isDesigning, setIsDesigning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('presets'); // 'presets', 'button', 'background', 'typography'

  const palettes = [
    { name: "Default", bg: "#ffffff", btn: "#7c3aed", input: "#f3f4f6", text: "#111827" },
    { name: "Midnight", bg: "#0f172a", btn: "#3b82f6", input: "#1e293b", text: "#ffffff" },
    { name: "Forest", bg: "#f0fdf4", btn: "#166534", input: "#ffffff", text: "#14532d" },
    { name: "Sunset", bg: "#fff7ed", btn: "#ea580c", input: "#ffedd5", text: "#7c2d12" },
    { name: "Ocean", bg: "#f0f9ff", btn: "#0ea5e9", input: "#e0f2fe", text: "#0c4a6e" },
    { name: "Slate", bg: "#f8fafc", btn: "#334155", input: "#f1f5f9", text: "#0f172a" },
  ];

  const handleLiveUpdate = (key, value) => {
    setFormTheme(prev => ({ ...prev, [key]: value }));
  };

  const applyPalette = (p) => {
    setFormTheme(prev => ({
      ...prev,
      bgColor: p.bg,
      buttonColor: p.btn,
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
      pageBg: isDarkMode 
        ? "bg-[#05070f] text-white selection:bg-purple-500/30" 
        : "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95] selection:bg-purple-200",
      
      card: isDarkMode
        ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
        : "bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",
  
      input: isDarkMode
        ? "bg-[#05070f] border border-purple-800/30 hover:border-purple-800/50 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
        : "bg-white/50 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",
  
      buttonPrimary: isDarkMode
        ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
        : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",
  
      textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/70",
      label: isDarkMode ? "text-gray-300" : "text-[#4c1d95]",
      texttwo: isDarkMode ? "text-gray-400" : "text-black",
      previewBox: isDarkMode 
        ? "bg-[#1e1b4b]/40 border-purple-500/10" 
        : "bg-purple-50/50 border-purple-200/50",
      
      buttonsecondary: isDarkMode?
      "bg-gray-900 text-white":"bg-gray-600 text-white",
    };

  return (
    <div className="w-full mb-4">
      <button
        onClick={() => setIsDesigning(!isDesigning)}
        className="bg-gray-900 text-white px-4 sm:py-3 py-1 text-[13px] sm:text-[16px] rounded-2xl font-semibold flex items-center gap-3 w-full justify-center transition-all shadow-lg"
      >
        <MdOutlineDesignServices size={20} /> 
        {isDesigning ? "Close Designer" : "Customize Form"}
      </button>

      <AnimatePresence>
        {isDesigning && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`mt-4 ${theme.card} rounded-2xl shadow-2xl overflow-hidden flex flex-col`}
          >
            {/* --- TAB NAVIGATION --- */}
            <div className={`flex ${theme.previewBox} p-1`}>
              {[
                { id: 'presets', icon: <MdOutlinePalette />, label: 'Themes' },
                { id: 'button', icon: <MdOutlineAdsClick />, label: 'Buttons' },
                { id: 'background', icon: <MdColorLens />, label: 'BG Color' },
                { id: 'typography', icon: <MdTextFields />, label: 'Fonts' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center sm:py-3 py-1  gap-1 transition-all rounded-xl ${
                    activeTab === tab.id 
                    ? `${theme.buttonPrimary}` 
                    : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <span className="sm:text-xl">{tab.icon}</span>
                  <span className="text-[8px] sm:text-[12px] uppercase">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="sm:p-6 p-4 ">
              <AnimatePresence mode="wait">
                {/* 1. THEMES SECTION */}
                {activeTab === 'presets' && (
                  <motion.div 
                    key="presets" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    {palettes.map(p => (
                      <button 
                        key={p.name} 
                        onClick={() => applyPalette(p)} 
                        className={`group sm:p-3 p-2 ${theme.input} rounded-2xl flex flex-col gap-3  transition-all text-left`}
                      >
                        <div className="flex gap-1">
                          <div className="sm:w-6 sm:h-6 w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: p.bg }}></div>
                          <div className="sm:w-6 sm:h-6 w-4 h-4  rounded-full shadow-sm" style={{ backgroundColor: p.btn }}></div>
                        </div>
                        <span  className={`text-xs font-bold ${
    isDarkMode ? "text-gray-300" : "text-gray-700"
  }`}>{p.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* 2. BUTTONS SECTION */}
                {activeTab === 'button' && (
                  <motion.div 
                    key="button" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-3">
                      <label className={` text-[12px] sm:text-sm uppercase ${theme.text}`}>Button Color</label>
                      <input type="color" value={formTheme.buttonColor} onChange={(e) => handleLiveUpdate('buttonColor', e.target.value)} className="w-full mt-2 sm:h-12 h-8 cursor-pointer rounded-xl overflow-hidden" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <label className={` text-[12px] sm:text-sm uppercase ${theme.text}`}>Corner Rounding</label>
                        <span className="text-xs font-mono text-violet-600 font-bold">{formTheme.borderRadius}</span>
                      </div>
                      <input 
                        type="range" min="0" max="40" step="4"
                        value={parseInt(formTheme.borderRadius) || 12} 
                        onChange={(e) => handleLiveUpdate('borderRadius', `${e.target.value}px`)} 
                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-violet-600" 
                      />
                    </div>
                  </motion.div>
                )}

                {/* 3. BACKGROUND SECTION */}
                {activeTab === 'background' && (
                  <motion.div 
                    key="background" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }}
                    className="grid grid-cols-1 gap-6"
                  >
                    <div className="space-y-3">
                      <label className={` text-[12px] sm:text-sm uppercase ${theme.text}`}>Page Background</label>
                      <div className="flex gap-4 items-center">
                        <input type="color" value={formTheme.bgColor} onChange={(e) => handleLiveUpdate('bgColor', e.target.value)} className="w-20 h-20 cursor-pointer rounded-2xl" />
                        <div className={`flex-1 p-3 text-[7px] sm:text-sm rounded-xl ${theme.input} text-[11px]`}>
                          This color applies to the entire page background of your public form.
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className={` text-[12px] sm:text-sm uppercase ${theme.text}`}>Form Input Background</label>
                      <input type="color" value={formTheme.inputBgColor || "#ffffff"} onChange={(e) => handleLiveUpdate('inputBgColor', e.target.value)} className="w-full mt-2 sm:h-10 h-8 cursor-pointer rounded-lg" />
                    </div>
                  </motion.div>
                )}

                {/* 4. TYPOGRAPHY SECTION */}
                {activeTab === 'typography' && (
                  <motion.div 
                    key="typography" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-3">
                        <label className={` text-[12px] sm:text-sm uppercase ${theme.text}`}>Font Family</label>
                        <div className="grid grid-cols-1 gap-2 mt-4">
                            {["Inter", "Poppins", "Roboto", "Montserrat", "Playfair Display", "Space Grotesk"].map((font) => (
                                <button
                                    key={font}
                                    onClick={() => handleLiveUpdate('labelFont', font)}
                                    style={{ fontFamily: font }}
                                    className={`w-full  text-[12px] sm:text-sm px-4 sm:py-2 py-0.5 text-left rounded-xl ${theme.texttwo} transition-all ${formTheme.labelFont === font ? "border-violet-600 text-violet-700 shadow-sm" : " hover:border-gray-300"}`}
                                >
                                    {font}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <label className={` text-[12px] sm:text-sm uppercase ${theme.text}`}>Text Color</label>
                        <input type="color" value={formTheme.labelColor || "#374151"} onChange={(e) => handleLiveUpdate('labelColor', e.target.value)} 
                        className="w-full mt-2 sm:h-10 h-8 cursor-pointer rounded-lg" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* --- FOOTER ACTION --- */}
            <div className={`p-5 ${theme.input}`}>
              <button 
                onClick={saveThemeOnly} 
                disabled={loading} 
                className={`w-full sm:py-4 py-2 rounded-2xl text-sm font-bold transition-all shadow-lg active:scale-95 ${editingFormId ? `${theme.buttonPrimary}` : `${theme.buttonsecondary}`}`}
              >
                {loading ? "Saving Styles..." : "Apply & Save Design"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Design;