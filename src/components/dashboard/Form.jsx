import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserNavbar from "../user/UserNavbar";
import { useFormContext } from './FormContext';
import { EditIcon, Trash2, Eye, ChevronDown } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { X, Send, CheckCircle } from 'lucide-react';

const Form = () => {
 
//masterfield
const [masterFields, setMasterFields] = useState([]);
const [selectedFields, setSelectedFields] = useState([]);
const [showFormBuilder, setShowFormBuilder] = useState(false);
const [formTitle, setFormTitle] = useState("Untitled Form");

//formfield
  const { forms, setForms, updateFormLocally, deleteFormLocally } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);  // Stores the form object to delete
  const token = localStorage.getItem("token");
  const navigate = useNavigate();




// 1. Fetch Master Fields on load
useEffect(() => {
  const getMasterFields = async () => {
    try {
      const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMasterFields(res.data.data);
    } catch (err) {
      toast.error("Error loading master fields");
    }
  };
  getMasterFields();
}, [token]);

// 2. Toggle field selection (Used by your checkboxes)
const toggleField = (toggledField) => {
  setSelectedFields(prev => {
    const exists = prev.find(f => f.masterFieldId === toggledField.masterFieldId);
    if (exists) {
      return prev.filter(f => f.masterFieldId !== toggledField.masterFieldId);
    }
    return [...prev, { ...toggledField, required: false }];
  });
};

// // 3. The Final API Call to Create the Form
const createForm = async () => {
  if (selectedFields.length === 0) return toast.error("Please select at least one field");

  setLoading(true);
  try {

     const uniqueTitle = `Untitled Form ${Date.now()}`

       const payload = {
      title: uniqueTitle,
      description: "Auto created form",
      isPublic: true,
      fields: selectedFields.map((field, index) => ({
        label: field.label,
        type: field.type,
        required: field.required,
        order: index,
        masterFieldId: field.masterFieldId || null,
        options: field.options || null
      }))
    }
    const res = await axios.post(
      "https://formbuilder-saas-backend.onrender.com/api/dashboard/form",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    toast.success("Form Published Successfully!");
    setShowFormBuilder(false);
    setSelectedFields([]);
    // Refresh your forms list in context if needed
    setForms(prev => [res.data.data, ...prev]); 
  } catch (err) {
    toast.error("Failed to create form");
  } finally {
    setLoading(false);
  }
};

  // 2. FETCH ALL FORMS
  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/forms", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setForms(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        toast.error("Failed to load forms");
      } finally {
        setLoading(false); // Ensures loading stops
      }
    };
    
    // Always fetch if we don't have forms, or you can remove the IF to refresh every time
    fetchForms(); 
  }, [token]); // Added token as dependency

  // 2. DELETE FORM - Now uses the ID from the state
  const confirmDelete = async () => {
    if (!isDeleting) return;
    
    const idToDelete = isDeleting.formId; // This uses the ID from your console log
    
    try {
      await axios.delete(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${idToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      deleteFormLocally(idToDelete); 
      toast.success("Form deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setIsDeleting(null); // Close the popup
    }
  };


  //FORMVIEW
const [viewform, setviewform] = useState(false);
const [viewData, setViewData] = useState(null);

const formview = async (formId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setViewData(response.data.data); 
      console.log(response.data.data);
      setviewform(true); 
    } catch (err) {
      toast.error("Failed to load form details");
    } finally {
      setLoading(false);
    }
  };
   

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar/>
      <div className="max-w-6xl mx-auto p-6">
        <header className="flex flex-col  justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-10 text-gray-800">My Dashboard</h1>
        {!showFormBuilder ? (
        <button
          onClick={() => { setShowFormBuilder(true); setSelectedFields([]); }}
          className="bg-violet-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-violet-700 transition font-bold"
        >
          + Create New Form
        </button>
      ):(
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-0 overflow-hidden min-h-[80vh]"
        >
          {/* Left Side: Master Fields */}
          <div className="w-full md:w-1/3 bg-gray-50 p-6 border-r border-gray-100">
            <h2 className="text-xl font-bold text-violet-700 mb-6 flex items-center gap-2">
               Available Fields
            </h2>
            <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
              {masterFields.map((field) => (
                <label
                  key={field.masterFieldId}
                  className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                    selectedFields.some(f => f.masterFieldId === field.masterFieldId) 
                    ? 'bg-violet-100 border-violet-500 shadow-sm' 
                    : 'bg-white border-transparent hover:border-gray-200 shadow-sm'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedFields.some(f => f.masterFieldId === field.masterFieldId)}
                    onChange={() => toggleField(field)}
                    className="accent-violet-600 w-5 h-5 rounded-lg"
                  />
                  <span className="font-semibold text-gray-700">{field.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Right Side: Preview & Save */}
          <div className="w-full md:w-2/3 p-8 flex flex-col">
            <div className="mb-8">
              <input 
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Enter Form Title..."
                className="text-3xl font-bold text-gray-800 w-full focus:outline-none border-b-2 border-transparent focus:border-violet-200 pb-2"
              />
              <p className="text-gray-400 text-sm mt-2">Preview how your form looks to users</p>
            </div>

            <div className="flex space-y-6">
              {selectedFields.length === 0 ? (
                <div className="h-64 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400">
                  <p>Select fields from the left to start building</p>
                </div>
              ) : (
                selectedFields.map((field) => (
                  <motion.div 
                    key={field.masterFieldId} layout
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 p-5 rounded-2xl border border-gray-100"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <label className="font-bold text-gray-700">{field.label}</label>
                      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border">
                        <span className="text-xs font-bold text-gray-500 uppercase">Required</span>
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={() => {
                            setSelectedFields(prev => prev.map(f => 
                              f.masterFieldId === field.masterFieldId ? { ...f, required: !f.required } : f
                            ))
                          }}
                          className="accent-violet-600"
                        />
                      </div>
                    </div>
                    
                    {/* Simplified Preview Input */}
                    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-400 text-sm italic">
                      User input area ({field.type.toLowerCase()})
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Actions */}
            <div className="mt-10 flex gap-4 pt-6 border-t border-gray-100">
              <button
                onClick={createForm}
                disabled={loading}
                className="flex-1 bg-violet-600 text-white py-4 rounded-2xl font-bold hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish Form"}
              </button>
              <button
                onClick={() => { setShowFormBuilder(false); setSelectedFields([]); }}
                className="px-8 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {forms.map((form) => (
                <motion.div
                  key={form.formId}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${form.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {form.isPublic ? "● Public" : "○ Private"}
                      </span>
                      <div className="flex gap-2">
                        <button onClick={() => toggleVisibility(form)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><EditIcon size={16}/></button>
                        <button 
                          onClick={() => setIsDeleting(form)} // Open the Popup
                          className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{form.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{form.description}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-50 flex gap-2">
                    <button 
                      onClick={() => navigate(`/responses/${form.formId}`)}
                      className="flex-1 bg-violet-50 text-violet-700 font-semibold py-2 rounded-xl hover:bg-violet-100 transition"
                    >
                      Responses
                    </button>
                    <button 
                   onClick={()=>formview(form.formId)}
                    className="flex-1 bg-gray-900 text-white font-semibold py-2 rounded-xl hover:bg-black transition flex items-center justify-center gap-2">
                      <Eye size={16}/> View
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {isDeleting && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDeleting(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full"
            >
              <h3 className="text-xl font-bold mb-2">Delete Form?</h3>
              <p className="text-gray-500 mb-6">Are you sure you want to delete <span className="font-bold text-gray-900">"{isDeleting.title}"</span>?</p>
              <div className="flex gap-3">
                <button onClick={() => setIsDeleting(null)} className="flex-1 px-4 py-2 bg-gray-100 rounded-xl font-semibold">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


{/* VIEW FORM */}
      <AnimatePresence>
        {viewform && viewData && (
          <div className="fixed inset-0 z-250 flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setviewform(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className=" p-8 text-white flex justify-between items-start">
                <div>
                  <h2 className="text-2xl text-black font-semibold mb-2">{viewData.title}</h2>
                  <p className=" text-black/60">{viewData.description || "No description provided."}</p>
                </div>
                <button 
                  onClick={() => setviewform(false)}
                  className="bg-black/30  hover:bg-violet-600 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-gray-50/50">
                {viewData.formField?.map((field, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={field.formFieldId} 
                    className="bg-white p-6  border border-gray-100 shadow-sm"
                  >
                    <label className="block text-xs font-bold uppercase  text-black mb-3">
                      {field.label} {field.isRequired && <span className="text-red-500">*</span>}
                    </label>

                {(() => {
        switch (field.type) {
          case "TEXTAREA":
            return <textarea disabled placeholder="Longer response here..." className="w-full py-1 px-2 bg-gray-50 border-2 border-gray-100 rounded-2xl h-24 resize-none outline-none" />;
          
          case "EMAIL":
            return <input type="email" disabled placeholder="email@example.com" className="w-full py-1 px-2 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none" />;
          
          case "DATE":
            return <input type="date" disabled className="w-full py-1 px-2 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none text-gray-400" />;

          case "NUMBER":
          return <input type="number" disabled className="w-full py-1 px-2 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none text-gray-400" />;

          case "CHECKBOX":
            return (
              <div className="space-y-2">
                {(field.options || ["Option 1", "Option 2"]).map(opt => (
                  <div key={opt} className="flex items-center gap-3  bg-gray-50 rounded-xl border border-gray-100">
                    <input type="checkbox" disabled className="w-5 py-2 px-1 accent-violet-600 rounded" />
                    <span className="text-gray-600 font-medium">{opt}</span>
                  </div>
                ))}
              </div>
            );

          case "DROPDOWN":
  return (
    <div className="relative group">
      <select 
        disabled 
        className="w-full px-2 py-1 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none appearance-none cursor-not-allowed text-gray-500 font-medium transition-all group-hover:border-violet-100"
      >
        <option value="">Select an option...</option>
        {field.options?.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
      
      {/* Custom Chevron Arrow for that premium look */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronDown/>
      </div>
    </div>
  );  

          case "RADIO":
            return (
              <div className="flex flex-wrap gap-4">
                {(field.options || ["Yes", "No"]).map(opt => (
                  <div key={opt} className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                    <input type="radio" disabled className="w-4 h-4 accent-violet-600" />
                    <span className="text-gray-600 font-medium text-sm">{opt}</span>
                  </div>
                ))}
              </div>
            );

          default: 
            return <input type="text" disabled className="w-full px-2 py-1 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none" />;
        }
      })()}
                  </motion.div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-white border-t border-gray-100 flex gap-4">
                <button 
                  onClick={() => setviewform(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition"
                >
                  Close Preview
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(viewData.sharedUrl);
                    toast.success("Link copied!");
                  }}
                  className="flex-1 py-4 bg-black text-white rounded-2xl font-bold hover:bg-violet-700 shadow-lg shadow-violet-200 transition flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Copy Share Link
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

 
}

export default Form;


