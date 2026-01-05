import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserNavbar from "../user/UserNavbar";
import { useFormContext } from './FormContext';
import { EditIcon, Trash2, X, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MdAddCard } from 'react-icons/md';

const Form = () => {
  // masterfield
  const [masterFields, setMasterFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [formTitle, setFormTitle] = useState("Untitled Form");

  // formfield
  const { forms, setForms, updateFormLocally, deleteFormLocally } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
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
        isPublic: true,
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
        isPublic: true,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <div className="max-w-6xl mx-auto p-6">
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
              className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-0 overflow-hidden min-h-[80vh]"
            >
              {/* Left Side: Master Fields */}
              <div className="w-full md:w-1/3 bg-gray-50 p-6 border-r border-gray-100">
                <h2 className="text-xl font-bold text-violet-700 mb-6 flex items-center gap-2">Available Fields</h2>
                <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
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
                      onClick={() => navi("/home")}
                      className="bg-violet-600 text-white px-4 py-2 rounded-xl font-semibold mt-10 flex items-center gap-4 w-full"
                    >
                      <MdAddCard />Add Master Field
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Preview & Edit */}
              <div className="w-full md:w-2/3 p-8 flex flex-col">
                <div className="mb-8 space-y-4">
                  <div className='flex items-center gap-2 border-b-2 border-transparent focus-within:border-violet-200'>
                    <input
                      value={formTitle || ""}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="Enter Form Title..."
                      className="text-xl font-bold text-gray-800 w-full focus:outline-none pb-2"
                    />
                    <EditIcon size={15} className="text-gray-400" />
                  </div>
                  <div className='flex items-center gap-2 border-b-2 border-transparent focus-within:border-violet-200'>
                    <input
                      value={formdescription}
                      onChange={(e) => setformdescription(e.target.value)}
                      placeholder="Enter Form description"
                      className="text-sm text-gray-800 w-full focus:outline-none pb-2"
                    />
                    <EditIcon size={15} className="text-gray-400" />
                  </div>
                </div>

                <div className="flex flex-col space-y-6 flex-1 overflow-y-auto max-h-[50vh] pr-2">
                  {selectedFields.length === 0 ? (
                    <div className="h-64 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400">
                      <p>Select fields from the left to start building</p>
                    </div>
                  ) : (
                    selectedFields.map((field, index) => (
                      <motion.div
                        key={field.masterFieldId || index} layout
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-50 p-5 rounded-2xl border border-gray-100"
                      >
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                          {/* Label Update */}
                          <div className="flex-1">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-2">Field Label</label>
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => updateFieldProperty(index, 'label', e.target.value)}
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

                <div className="mt-auto pt-6 flex gap-4 border-t border-gray-100">
                  <button
                    onClick={editingFormId ? updateForm : createForm}
                    disabled={loading}
                    className="flex-1 bg-violet-600 text-white py-3 rounded-2xl font-semibold hover:bg-violet-700 shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? "Processing..." : editingFormId ? "Update Form" : "Publish Form"}
                  </button>
                  <button
                    onClick={() => {
                      setShowFormBuilder(false);
                      setSelectedFields([]);
                      setEditingFormId(null);
                    }}
                    className="px-8 bg-gray-100 text-gray-600 py-3 rounded-2xl font-bold hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </header>

        {/* List of Forms Grid */}
        {loading && !showFormBuilder ? (
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

      {/* View Modal logic remains largely the same but ensures viewData is handled */}
      <AnimatePresence>
        {viewform && viewData && (
          <div className="fixed inset-0 z-250 flex items-center justify-center p-4 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setviewform(false)} className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded shadow-2xl flex flex-col">
              <div className="p-8 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl text-black font-semibold mb-2">{viewData.title}</h2>
                  <p className="text-black/60">{viewData.description || "No description provided."}</p>
                </div>
                <button onClick={() => setviewform(false)} className="bg-gray-100 hover:bg-violet-600 hover:text-white p-2 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-gray-50/50">
                {viewData.formField?.map((field, idx) => (
                  <div key={field.formFieldId} className="bg-white p-6 border border-gray-100 shadow-sm">
                    <label className="block text-xs font-bold uppercase text-black mb-3">
                      {field.label} {field.isRequired && <span className="text-red-500">*</span>}
                    </label>
                    <input disabled placeholder={`Preview for ${field.type}`} className="w-full px-2 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none" />
                  </div>
                ))}
              </div>
              <div className="p-6 bg-white border-t border-gray-100 flex gap-4">
                <button onClick={() => setviewform(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold">Close</button>
                <button
                  onClick={() => {
                    const link = `${URL}/public/form/${viewData.slug}`;
                    navigator.clipboard.writeText(link);
                    toast.success("Link copied!");
                  }}
                  className="flex-1 py-3 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Copy Link
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Form;
