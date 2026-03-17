import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Type, 
  ChevronDown, 
  CheckSquare, 
  Calendar, 
  List as ListIcon, 
  Settings2, 
  Eye, 
  Trash2 
} from 'lucide-react';
import UserNavbar from './UserNavbar';
import UserFooter from './userFooter';
import toast from "react-hot-toast";
import { useFormContext } from "../dashboard/FormContext"; 
import LoadingScreen from '../shared/LoadingScreen';
import Preview from './Preview';
const Home = () => {
  const { isDarkMode } = useFormContext(); 
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("TEXT");
  const [labelname, setlabelname] = useState("");
  const [placeholder, setPlaceholder] = useState(""); // New state for placeholder
  const [options, setoptions] = useState([""]);
  const [previewFields, setPreviewFields] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
const [isReadOnly, setIsReadOnly] = useState(false);
  const token = localStorage.getItem("token");

  // Sidebar Field Config
  const FieldTypes = [
    { id: "TEXT", label: "Text", icon: <Type size={18} /> },
    { id: "DROPDOWN", label: "Dropdown", icon: <ChevronDown size={18} /> },
    { id: "CHECKBOX", label: "Checkbox", icon: <CheckSquare size={18} /> },
    { id: "DATE", label: "Date", icon: <Calendar size={18} /> },
    { id: "LIST", label: "List", icon: <ListIcon size={18} /> },
  ];

  const fetchField = async () => {
    try {
      const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPreviewFields(res.data.data);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false); 
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
      placeholder: placeholder,
      required: isRequired, 
    readOnly: isReadOnly, 
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
      setPlaceholder("");
      setIsRequired(false); // Reset toggle
    setIsReadOnly(false);
      setoptions([""]);
      fetchField();
    } catch (err) {
      toast.error("Failed to add field");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingScreen isDarkMode={isDarkMode} />;

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#F5F6F8]'}`}>
      <UserNavbar />
      
    <main className="mt-4 mb-4 grow">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Field Builder</h1>
      <p className="text-gray-500">
        Design your data collection flow. Add and configure input fields for your form.
      </p>
    </header>

  
    <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:h-[800px]">
      
     
      <div className="flex-[7] flex flex-col md:flex-row bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        
        
        <section className="w-full md:w-56 bg-gray-50/50 border-b md:border-b-0 md:border-r border-gray-100 p-4 overflow-y-auto">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 px-1">
            Field Types
          </h3>
          <div className="flex flex-col gap-2">
            {FieldTypes.map((field) => (
              <button
                key={field.id}
                onClick={() => setSelectedType(field.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                  selectedType === field.id
                    ? "bg-[#2B4BAB] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="shrink-0">{field.icon}</span>
                {field.label}
              </button>
            ))}
          </div>
        </section>

        
        <section className="flex-1 bg-white flex flex-col min-w-0">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-gray-50/30 shrink-0">
            <Settings2 size={16} className="text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-700">Properties</h3>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto flex-grow custom-scrollbar">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Field Label</label>
              <input
                type="text"
                value={labelname}
                onChange={(e) => setlabelname(e.target.value)}
                placeholder="e.g. Full Name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2B4BAB]/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Placeholder</label>
              <input
                type="text"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                placeholder="e.g. Enter your name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2B4BAB]/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Selected Type</label>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500">
                <Type size={18} />
                <span className="font-medium">{selectedType}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Validation</h4>
        
              <div className="space-y-4">
  {/* Required Toggle */}
  <div className="flex justify-between items-center">
    <span className="text-sm font-semibold text-gray-700">Required</span>
    <div 
      onClick={() => setIsRequired(!isRequired)}
      className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors duration-200 ${isRequired ? 'bg-[#2B4BAB]' : 'bg-gray-200'}`}
    >
      <motion.div 
        animate={{ x: isRequired ? 24 : 0 }}
        className="w-4 h-4 bg-white rounded-full shadow-sm" 
      />
    </div>
  </div>

  {/* Read Only Toggle */}
  <div className="flex justify-between items-center">
    <span className="text-sm font-semibold text-gray-700">Read Only</span>
    <div 
      onClick={() => setIsReadOnly(!isReadOnly)}
      className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors duration-200 ${isReadOnly ? 'bg-[#2B4BAB]' : 'bg-gray-200'}`}
    >
      <motion.div 
        animate={{ x: isReadOnly ? 24 : 0 }}
        className="w-4 h-4 bg-white rounded-full shadow-sm" 
      />
    </div>
  </div>
</div>
            </div>

            <div className="pt-4">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Live Preview</h4>
              <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                <label className="text-xs font-medium text-gray-500 mb-1 block">
                  {labelname || "Field Label"}
                </label>
                <input
                  disabled
                  className="w-full h-10 bg-white border border-gray-200 rounded-md"
                />
              </div>
            </div>
          </div>

         
          <div className="p-6 border-t border-gray-100 shrink-0">
            <button
              onClick={handlesubmit}
              disabled={isSubmitting}
              className="w-full py-4 bg-[#2B4BAB] text-white font-bold rounded-xl hover:bg-[#233d8a] transition-all shadow-lg shadow-blue-900/10 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Field to Form"}
            </button>
          </div>
        </section>
      </div>

     <Preview 
        previewFields={previewFields} 
        refreshFields={fetchField} 
        token={token} 
      />

    </div>
  </div>
</main>
      <UserFooter/>
    </div>
  );
};

export default Home;