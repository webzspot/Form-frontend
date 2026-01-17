import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserNavbar from "../user/UserNavbar";
import { useFormContext } from './FormContext';
import { EditIcon, Trash2, X, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MdAddCard, MdOutlineDesignServices } from 'react-icons/md';
import Footer from '../landingPage/Footer';
import Design from './Design';
import WaveBackground from '../dashboard/WaveBackground';
import { FaSpinner } from 'react-icons/fa';


const Form = () => {
  // masterfield
  const [masterFields, setMasterFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [isAddingMaster, setIsAddingMaster] = useState(false);
const [newField, setNewField] = useState({ label: "", type: "TEXT", options: [""] });

  // formfield
  const { forms, setForms, updateFormLocally, deleteFormLocally } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isPublic, setIsPublic] = useState(true);

  // --- THEME STATE ---
  const [formTheme, setFormTheme] = useState({
    bgColor: "#ffffff",
    buttonColor: "#7c3aed",
    inputBgColor: "#f3f4f6",
    labelFont: "Inter",
    borderRadius: "8px"
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_URL;
  const navi = useNavigate();

  // 1. Fetch Master Fields
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

  const handleInlineCreate = async () => {
  if (!newField.label) return toast.error("Label name required");

  try {
    const res = await axios.post("https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields", newField, {
      headers: { Authorization: `Bearer ${token}` }
    });

    toast.success("Field Created!");
    
    // Add new field to the list on the left
    setMasterFields(prev => [...prev, res.data.data]);
    
    // Reset and hide the form
    setNewField({ label: "", type: "TEXT", options: [""] });
    setIsAddingMaster(false);
  } catch (err) {
    toast.error("Failed to add master field");
  }
};

  // 2. Toggle field selection
  const toggleField = (toggledField) => {
    setSelectedFields(prev => {
      const exists = prev.find(f => f.masterFieldId === toggledField.masterFieldId);
      if (exists) {
        return prev.filter(f => f.masterFieldId !== toggledField.masterFieldId);
      }
      return [...prev, { ...toggledField, required: false }];
    });
  };

  // 3. Update Logic for any field property (Label, Type, etc.)
  const updateFieldProperty = (index, key, value) => {
    const updatedFields = [...selectedFields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
    setSelectedFields(updatedFields);
  };

  // 4. Create Form API
  const createForm = async () => {
    if (selectedFields.length === 0) return toast.error("Please select at least one field");
    setLoading(true);
    try {
      const uniqueTitle = formTitle === "Untitled Form" ? `Untitled Form ${Date.now()}` : formTitle;
      const payload = {
        title: uniqueTitle,
        description: formdescription,
       isPublic: isPublic,
          theme: formTheme,
        fields: selectedFields.map((field, index) => ({
          label: field.label,
          type: field.type,
          required: field.required,
          order: index,
          masterFieldId: field.masterFieldId || null,
          options: field.options || null
        }))
      };
      const res = await axios.post(
        "https://formbuilder-saas-backend.onrender.com/api/dashboard/form",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Form Published Successfully!");
      setShowFormBuilder(false);
      setSelectedFields([]);
      setForms(prev => [res.data.data, ...prev]);
      setIsPublic(true);//isPublic
    } catch (err) {
      toast.error("Failed to create form");
    } finally {
      setLoading(false);
    }
  };

  // 5. Fetch All Forms
  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/forms", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setForms(res.data.data);
      } catch (err) {
        toast.error("Failed to load forms");
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, [token]);

  // 6. Delete Form
  const confirmDelete = async () => {
    if (!isDeleting) return;
    const idToDelete = isDeleting.formId;
    try {
      await axios.delete(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${idToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      deleteFormLocally(idToDelete);
      toast.success("Form deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setIsDeleting(null);
    }
  };

  // 7. Edit Handler (Load data into builder)
  const [editingFormId, setEditingFormId] = useState(null);
  const [formdescription, setformdescription] = useState("");

  const handleEditClick = async (formId) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = res.data.data;
      setFormTitle(data.title);
      setformdescription(data.description || "");
      setIsPublic(data.isPublic); //isPublic true or false

      setEditingFormId(formId);

      const mappedFields = data.formField.map(f => ({
        masterFieldId: f.masterFieldId,
        formFieldId: f.formFieldId,
        label: f.label,
        type: f.type,
        required: f.isRequired,
        options: f.options
      }));

      setSelectedFields(mappedFields);
      setShowFormBuilder(true);
    } catch (err) {
      toast.error("Failed to load form for editing");
    } finally {
      setLoading(false);
    }
  };

  // 8. Update Form API
  const updateForm = async () => {
    if (selectedFields.length === 0) return toast.error("Please select at least one field");
    setLoading(true);
    try {
      const payload = {
        title: formTitle,
        description: formdescription,
        isPublic: isPublic,
        theme: formTheme,
        fields: selectedFields.map((field, index) => ({
          formFieldId: field.formFieldId || null,
          label: field.label,
          type: field.type,
          required: field.required,
          order: index,
          masterFieldId: field.masterFieldId || null,
          options: field.options || null
        }))
      };
      const res = await axios.put(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${editingFormId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Form Updated Successfully!");
      setForms(prev => prev.map(f => f.formId === editingFormId ? res.data.data : f));
      setShowFormBuilder(false);
      setEditingFormId(null);
      setFormTitle("Untitled Form");
      setformdescription("");
      setSelectedFields([]);
    } catch (err) {
      toast.error("Failed to update form");
    } finally {
      setLoading(false);
    }
  };


  // VIEW FORM STATE
  const [viewform, setviewform] = useState(false);
  const [viewData, setViewData] = useState(null);

  const formview = async (formId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setViewData(response.data.data);
      setviewform(true);
    } catch (err) {
      toast.error("Failed to load form details");
    } finally {
      setLoading(false);
    }
  };


  //design


  return (
    <div className="min-h-screen font-sans relative bg-gray-50">
      <UserNavbar />

       <WaveBackground position="top" />
         
      <div className="max-w-6xl relative z-10 mx-auto p-6">
        <header className="flex justify-between items-center mb-8">
          {!showFormBuilder ? (
            <button
              onClick={() => {
                setShowFormBuilder(true);
                setSelectedFields([]);
                setEditingFormId(null);
                setFormTitle("Untitled Form");
                setformdescription("");
              }}
              className="bg-violet-600 text-white text-sm sm:text-lg px-4 sm:px-6 py-3 rounded-xl shadow-lg hover:bg-violet-700 transition font-semibold"
            >
              Create New Form
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-0 overflow-hidden"
            >
              {/* Left Side: Master Fields */}
              <div className="w-full  md:w-2/5 bg-gray-50 py-6 px-4 border-r border-gray-100">
                <h2 className="text-lg font-bold text-violet-700 mb-6 flex items-center gap-2">Available Fields</h2>
             
                <div className="space-y-3 overflow-y-auto max-h-[80vh] pr-2 custom-scrollbar">
                  {masterFields.map((field) => (
                    <label
                      key={field.masterFieldId}
                      className={`flex items-center gap-3 py-2 px-4 rounded-2xl cursor-pointer transition-all border-2 ${selectedFields.some(f => f.masterFieldId === field.masterFieldId)
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
                  <div>
          
                    <button
                 onClick={() => setIsAddingMaster(!isAddingMaster)}
                 className="bg-violet-600 text-white px-4 py-2 rounded-xl font-semibold mt-10 flex items-center gap-4 w-full justify-center"
                  >
                   <MdAddCard /> {isAddingMaster ? "Close" : "Add Input Fields"}
                  </button>


                  </div>

 {isAddingMaster && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        className="mt-4 p-4 bg-white border border-violet-200 rounded-2xl shadow-inner space-y-4"
      >
        {/* Label Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-violet-500 uppercase">New Label</label>
          <input
            className="w-full border-b p-1 outline-none text-sm focus:border-violet-600"
            value={newField.label}
            onChange={(e) => setNewField({ ...newField, label: e.target.value })}
            placeholder="Enter label name..."
          />
        </div>

        {/* Type Selection */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-violet-500 uppercase">Type</label>
          <select
            className="w-full text-sm bg-transparent outline-none cursor-pointer"
            value={newField.type}
            onChange={(e) => {
              // Reset options to one empty string if switching to a selection type
              const isSelectionType = ["DROPDOWN", "RADIO", "CHECKBOX"].includes(e.target.value);
              setNewField({ 
                ...newField, 
                type: e.target.value,
                options: isSelectionType ? [""] : [] 
              });
            }}
          >
            {["TEXT", "NUMBER", "EMAIL", "DATE", "TEXTAREA", "CHECKBOX", "RADIO", "DROPDOWN"].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Dynamic Options Section - Shows only for selection types */}
        {["DROPDOWN", "RADIO", "CHECKBOX"].includes(newField.type) && (
          <div className="space-y-2 border-t pt-2">
            <label className="text-[10px] font-bold text-violet-500 uppercase">Field Options</label>
            {newField.options.map((opt, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="flex-1 border-b text-sm outline-none focus:border-violet-600"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...newField.options];
                    newOpts[i] = e.target.value;
                    setNewField({ ...newField, options: newOpts });
                  }}
                />
                {newField.options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newOpts = newField.options.filter((_, idx) => idx !== i);
                      setNewField({ ...newField, options: newOpts });
                    }}
                    className="text-red-400 hover:text-red-600"
                  >✕</button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setNewField({ ...newField, options: [...newField.options, ""] })}
              className="text-[10px] text-violet-600 font-bold hover:underline mt-1"
            >
              + ADD OPTION
            </button>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleInlineCreate}
          className="w-full bg-violet-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-violet-800 transition-all"
        >
          Save Input Field
        </button>

     
      </motion.div>
    )}
  
           {/* DESIGN COMPONENT INTEGRATION */}
           <div className='mt-4'>
                <Design 
                editingFormId={editingFormId} 
                token={token} 
                formTheme={formTheme} 
                setFormTheme={setFormTheme} 
              />
              </div>

                </div>
              </div>

              {/* Right Side: Preview & Edit */}
            <div 
              className="w-full md:w-3/5 p-5 flex flex-col transition-all duration-500" 
              style={{ 
               backgroundColor: formTheme.bgColor || "#ffffff", 
               fontFamily: `${formTheme.labelFont || 'Inter'}, sans-serif`,
             
              }}
            >
              <div className="w-full  flex flex-col">
                <div className="mb-8 space-y-4">
                  <div className='flex items-center gap-2 border-b-2 border-transparent focus-within:border-violet-200'>
                    
                    <input
                      value={formTitle || ""}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="Enter Form Title..."
                      style={{ color: formTheme.labelColor || "#111827" }}
                      className="text-xl font-bold text-gray-800 w-full focus:outline-none pb-2"
                    />
                    <EditIcon size={15} className="text-gray-400" />
                  </div>
                  <div className='flex items-center gap-2 border-b-2 border-transparent focus-within:border-violet-200'>
                    <input
                      value={formdescription}
                      onChange={(e) => setformdescription(e.target.value)}
                      placeholder="Enter Form description"
                      style={{ color: `${formTheme.labelColor}99` || "#4b5563" }}
                      className="text-sm text-gray-800 w-full focus:outline-none pb-2"
                    />
                    <EditIcon size={15} className="text-gray-400" />
                  </div>
                </div>
                    {/*Radio for public or private */}
                 <div className="flex gap-6 items-center mb-6">
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="visibility"
      checked={isPublic === true}
      onChange={() => setIsPublic(true)}
    />
    <span className="font-semibold text-gray-700" style={{ color: formTheme.labelColor }}>Public</span>
  </label>

  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="visibility"
      checked={isPublic === false}
      onChange={() => setIsPublic(false)}
    />
    <span className="font-semibold text-gray-700" style={{ color: formTheme.labelColor }}>Private</span>
  </label>
</div>
                <div className="flex flex-col space-y-6 flex-1 overflow-y-auto max-h-[50vh] pr-2">
                  {selectedFields.length === 0 ? (
                    <div className="h-64 border-2 border-dashed border-gray-200 text-center rounded-3xl flex flex-col items-center justify-center text-gray-400">
                      <p>Select fields from the left to start building</p>
                    </div>
                  ) : (
                    selectedFields.map((field, index) => (
                      <motion.div
                        key={field.masterFieldId || index} layout
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-50 p-5 rounded-2xl border
                         border-gray-100"
                         style={{ 
                         backgroundColor: "#ffffff", 
                         borderRadius: formTheme.borderRadius || "16px" 
                      }}
                      >
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                          {/* Label Update */}
                          <div className="flex-1">
                            <label 
                            className="text-xs font-bold text-gray-400 uppercase ml-2"
                            style={{ color: formTheme.labelColor || "#9ca3af" }}
                            >Field Label</label>
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => updateFieldProperty(index, 'label', e.target.value)}
                              style={{ 
                    backgroundColor: formTheme.inputBgColor || "#f9fafb",
                    borderRadius: `calc(${formTheme.borderRadius} / 2)` || "8px",
                    color: formTheme.labelColor 
                  }}
                              className="w-full bg-white border border-gray-200 p-2 rounded-lg text-sm font-semibold focus:border-violet-500 outline-none"
                            />
                          </div>

                          {/* Type Update - NEW FUNCTIONALITY */}
                          <div className="w-full sm:w-1/3">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Field Type</label>
                            <select
                              value={field.type}
                              onChange={(e) => updateFieldProperty(index, 'type', e.target.value)}
                              className="w-full bg-white border border-gray-200 p-2 rounded-lg text-sm font-semibold focus:border-violet-500 outline-none"
                            >
                              <option value="TEXT">Short Text</option>
                              <option value="TEXTAREA">Long Text</option>
                              <option value="NUMBER">Number</option>
                              <option value="EMAIL">Email</option>
                              <option value="DATE">Date</option>
                              <option value="DROPDOWN">Dropdown</option>
                              <option value="RADIO">Radio</option>
                              <option value="CHECKBOX">Checkbox</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                            <span className="text-xs font-bold text-gray-500 uppercase">Required</span>
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={() => updateFieldProperty(index, 'required', !field.required)}
                              className="accent-violet-600"
                            />
                          </div>
                          <span className="text-xs text-gray-400 italic">Preview: {field.type}</span>
                        </div>

                        {/* Options Rendering */}
                        {["DROPDOWN", "RADIO", "CHECKBOX"].includes(field.type) && field.options && (
                          <div className="space-y-2 mt-4 p-3 bg-white rounded-xl border border-gray-100">
                            <p className="text-xs font-bold text-violet-600 uppercase">Options Management:</p>
                            {field.options.map((opt, optIndex) => (
                              <div key={optIndex} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={opt}
                                  onChange={(e) => {
                                    const updatedFields = [...selectedFields];
                                    updatedFields[index].options[optIndex] = e.target.value;
                                    setSelectedFields(updatedFields);
                                  }}
                                  className="flex-1 text-sm bg-violet-50 border border-violet-100 rounded px-2 py-1 outline-none focus:border-violet-400"
                                />
                                <button
                                  onClick={() => {
                                    const updatedFields = [...selectedFields];
                                    updatedFields[index].options = updatedFields[index].options.filter((_, i) => i !== optIndex);
                                    setSelectedFields(updatedFields);
                                  }}
                                  className="text-red-400 hover:text-red-600"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const updatedFields = [...selectedFields];
                                updatedFields[index].options = [...(updatedFields[index].options || []), "New Option"];
                                setSelectedFields(updatedFields);
                              }}
                              className="text-xs font-bold text-violet-600 hover:underline mt-1"
                            >
                              + Add Option
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>

                <div className="mt-auto pt-4 flex justify-center gap-2 border-gray-100">
                  <button
                    onClick={editingFormId ? updateForm : createForm}
                    disabled={loading}
                    style={{ 
            backgroundColor: formTheme.buttonColor || "#7c3aed",
            borderRadius: formTheme.borderRadius || "16px"
        }}
                    className=" w-full bg-violet-600 text-sm text-white py-2 rounded-xl font-semibold hover:bg-violet-700 px-2 shadow-lg transition-all  disabled:opacity-50"
                  >
                    {loading ? "Processing..." : editingFormId ? "Update Form" : "Publish Form"}
                  </button>
                  <button
                    onClick={() => {
                      setShowFormBuilder(false);
                      setSelectedFields([]);
                      setEditingFormId(null);
                    }}
                    className="px-2 w-full text-sm bg-gray-100 text-gray-600 py-2 rounded-xl font-bold hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
                </div>
            </motion.div>
          
          )}
        </header>

        {/* List of Forms Grid */}
        {loading && !showFormBuilder ? (
           <div className="flex flex-col items-center justify-center h-64 gap-3">
    <FaSpinner className="animate-spin text-violet-600" size={32} />
   
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
                        <button onClick={() => handleEditClick(form.formId)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                          <EditIcon size={16} />
                        </button>
                        <button onClick={() => setIsDeleting(form)} className="p-2 hover:bg-red-50 rounded-lg text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{form.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{form.description}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-50 flex gap-2">
                    <button onClick={() => navigate(`/responses/${form.formId}`)} className="flex-1 bg-violet-50 text-violet-700 font-semibold py-2 rounded-xl hover:bg-violet-100 transition">
                      Responses
                    </button>
                    <button onClick={() => formview(form.formId)} className="flex-1 bg-black text-white font-semibold py-2 rounded-xl hover:bg-gray-800 transition">
                      View
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Delete and View Modals follow same structure as original... */}
      {/* (Kept original logic for Modals below to ensure functionality) */}
      <AnimatePresence>
        {isDeleting && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleting(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full">
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

<AnimatePresence>
  {viewform && viewData && (
    <div className="fixed inset-0 z-250 flex items-center justify-center p-4 md:p-10">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={() => setviewform(false)} 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" 
      />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0, y: 20 }} 
        className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col"
        style={{ fontFamily: `${viewData.theme?.labelFont || 'Inter'}, sans-serif` }}
      >
        {/* --- THEME STRIP --- */}
        <div 
          className="h-2 w-full" 
          style={{ backgroundColor: viewData.theme?.buttonColor || "#6C3BFF" }} 
        />

        {/* Header */}
        <div className="p-8 flex justify-between items-start border-b border-gray-50">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <h2 className="text-2xl text-black font-bold" style={{ color: viewData.theme?.labelColor }}>
                {viewData.title}
              </h2>
              <span className="px-2 py-1 bg-gray-100 text-[10px] font-black uppercase rounded-md text-gray-400">Preview Mode</span>
            </div>
            <p className="text-gray-500">{viewData.description || "No description provided."}</p>
          </div>
          <button 
            onClick={() => setviewform(false)} 
            className="bg-gray-100 hover:bg-red-50 hover:text-red-500 p-2 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Preview Area */}
        <div 
          className="flex-1 overflow-y-auto p-8 space-y-6" 
          style={{ backgroundColor: viewData.theme?.bgColor || "#f9fafb" }}
        >
          {viewData.formField?.map((field) => (
            <div 
              key={field.formFieldId} 
              className="bg-white p-6 shadow-sm border border-gray-100 transition-all"
              style={{ borderRadius: viewData.theme?.borderRadius || "12px" }}
            >
              <label 
                className="block text-sm font-bold mb-3"
                style={{ color: viewData.theme?.labelColor || "#374151" }}
              >
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              
              <div 
                className="w-full px-4 py-3 border border-gray-200 text-gray-400 text-sm flex items-center justify-between"
                style={{ 
                    backgroundColor: viewData.theme?.inputBgColor || "#ffffff",
                    borderRadius: `calc(${viewData.theme?.borderRadius || '12px'} / 2)` 
                }}
              >
                Preview for {field.type}
                <div className="h-2 w-2 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Action Footer */}
        <div className="p-6 bg-white border-t border-gray-100 flex flex-wrap gap-3">
          {/* Close Button */}
          <button 
            onClick={() => setviewform(false)} 
            className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
          >
            Close
          </button>

          {/* Copy Link Button */}
          <button
            onClick={() => {
              if (!viewData.isPublic) {
                toast.error("Form is private. Make it public to copy link.");
                return;
              }
              const baseUrl = import.meta.env.VITE_URL.replace(/\/$/, "");
              const link = `${baseUrl}/public/form/${viewData.slug}`;
              navigator.clipboard.writeText(link);
              toast.success("Link copied!");
            }}
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              viewData.isPublic ? "bg-black text-white hover:bg-gray-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send size={18} /> Copy Link
          </button>

          {/* Embed Button */}
          <button
            onClick={async () => { 
              if (!viewData.isPublic) {
                toast.error("Form is private. Make it public first.");
                return;
              }
              const baseUrl = import.meta.env.VITE_URL?.replace(/\/$/, "") || window.location.origin;
              const formLink = `${baseUrl}/public/form/${viewData.slug}`;
              const embedCode = `<iframe src="${formLink}" title="${viewData.title}" width="100%" height="700" style="border:none; border-radius:12px;" allow="clipboard-write"></iframe>`;
              
              await navigator.clipboard.writeText(embedCode);
              toast.success("Embed code copied!");
            }}
            style={{ 
              backgroundColor: viewData.isPublic ? (viewData.theme?.buttonColor || "#7C3AED") : "#E5E7EB",
              color: viewData.isPublic ? "white" : "#9CA3AF"
            }}
            className="flex-1 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-md active:scale-95"
          >
            Copy Embed Code
          </button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

      {/* ===== Bottom Wave Section ===== */}
              <div className="relative w-full h-56 overflow-hidden">
                <WaveBackground position="bottom" height="h-56"
         />
              </div>
             
       
      <Footer/>
     
    </div>
  );
};

export default Form;
