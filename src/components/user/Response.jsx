import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import UserNavbar from './UserNavbar';
import { ArrowLeft, X, ClipboardList } from 'lucide-react';

const Response = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [responseList, setResponseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // State for Single Response Detail
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
   
  //To store formfields
const [formFields, setFormFields] = useState([]);

  

  // 1. Fetch all responses for this form
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/responses/${formId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResponseList(res.data.data);
      } catch (err) {
        toast.error("Failed to load responses");
      } finally {
        setLoading(false);
      }
    };

    if (formId) fetchResponses();
  }, [formId, token]); 

   //For viewing form details/label in responses
  const formview = async (formId) => {
  try {
    const response = await axios.get(
      `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setFormFields(response.data.data.formField); 
  } catch (err) {
    toast.error("Failed to load form details");
  }
};

  //Storing formview function in useEffect
useEffect(() => {
  if (formId) {
    formview(formId);
  }
}, [formId]);




  // 2. Fetch Single Response Detail (API Path #6)
  const handleViewDetail = async (responseId) => {
    setIsDetailLoading(true);
    setShowModal(true);
    try {
      const res = await axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/response/${responseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedResponse(res.data.data);
    } catch (err) {
      toast.error("Error fetching details");
      setShowModal(false);
    } finally {
      setIsDetailLoading(false);
    }
  };
      
    //Adding Label function for formfields/responses
    const getLabel = (fieldId) => {
  if (!formFields || formFields.length === 0) return "Loading...";
  return formFields.find(f => f.formFieldId === fieldId)?.label || "Unknown Field";
};


  return (
    <>
      <UserNavbar />

      <div className="min-h-screen bg-gray-50 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Back Button */}
          <button 
            onClick={() => navigate('/form')}
            className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition mb-6 font-medium"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Form Responses</h1>
            <span className="bg-violet-100 text-violet-700 px-4 py-1 rounded-full text-sm font-semibold">
              {responseList.length} total
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin h-10 w-10 border-b-2 border-violet-600 rounded-full"></div>
            </div>
          ) : responseList.length === 0 ? (
            <div className="bg-white p-20 rounded-2xl text-center shadow-sm border border-gray-100">
              <ClipboardList className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 text-lg">No responses found for this form yet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 ">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Response ID</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Submitted At</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {responseList.map((resp) => (
                    <tr key={resp.formResponseId} className="border-b border-gray-50 hover:bg-violet-50/30 transition">
                      <td className="px-6 py-4 text-sm font-mono text-gray-500">{resp.formResponseId}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(resp.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleViewDetail(resp.formResponseId)}
                          className="bg-violet-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-violet-700 transition shadow-sm"
                        >
                          View Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-3xl p-8 shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Submission Details</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {isDetailLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin h-8 w-8 border-b-2 border-violet-600 rounded-full"></div>
                </div>
              ) : selectedResponse && (
                <div className="space-y-6">
                  {/* Metadata Section */}
                  <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Metadata</p>
                    <p className="text-sm text-gray-600">ID: <span className="font-mono">{selectedResponse.formResponseId}</span></p>
                    <p className="text-sm text-gray-600">Date: {new Date(selectedResponse.createdAt).toLocaleString()}</p>
                  </div>

                  {/* Field Values Section */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">
                      <ClipboardList size={18} className="text-violet-600" /> Answers
                    </h3>
                    <div className="grid gap-3">
                      {selectedResponse.responseValue && selectedResponse.responseValue.length > 0 ? (
                        selectedResponse.responseValue.map((item) => (
                          <div key={item.responseValueId} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                            <label className="block text-xs font-bold text-violet-500 uppercase mb-1">
                            {getLabel(item.formFieldId)}

                            </label>
                            <p className="text-gray-800 font-medium">
                              
                               {/* {item.value || <span className="text-gray-300 italic">No answer provided</span>}  */}
                                 {Array.isArray(item.value)
                                  ? item.value.join(", ")
                                    : item.value || <span className="text-gray-300 italic">No answer provided</span>} 
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 italic">No data values found in this response.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition"
                >
                  Close 
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Response;