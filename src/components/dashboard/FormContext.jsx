import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [forms, setForms] = useState([]);
  const [activeFormId, setActiveFormId] = useState(null);
  const [view, setView] = useState("dashboard");


//   const [user, setUser] = useState(null);
//   const token = localStorage.getItem("token");
//   console.log(token)
//   // Fetch user from API
//   const getUser = async () => {
//     try {
//       const res = await axios.get(
//         "https://formbuilder-saas-backend.onrender.com/api/users/profile",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUser(res.data.data);
//     } catch (err) {
//       console.log("Fetch user failed", err);
//     }
//   };

//   // Update user API
//   const updateUser = async (updatedData) => {
//     try {
//       const res = await axios.put(
//         "https://formbuilder-saas-backend.onrender.com/api/users/profile/update",
//         updatedData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUser(res.data.data); // update context
//       return true;
//     } catch (err) {
//       console.log("Update user failed", err);
//       return false;
//     }
//   };

//   // Delete user API
//   const deleteUser = async () => {
//     try {
//       await axios.delete(
//         "https://formbuilder-saas-backend.onrender.com/api/users/profile/delete",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUser(null);
//       localStorage.removeItem("token");
//       return true;
//     } catch (err) {
//       console.log("Delete user failed", err);
//       return false;
//     }
//   };

//   const logout = () => {
//   localStorage.removeItem("token");
//   setUser(null); // clear context
// };






  // Local Update: Finds the form in the list and updates its details
  const updateFormLocally = (formId, updatedData) => {
    setForms(prev => prev.map(f => f.formId === formId ? { ...f, ...updatedData } : f));
  };

  // Local Delete: Removes the form from the list
  const deleteFormLocally = (formId) => {
    setForms(prev => prev.filter(f => f.formId !== formId));
  };


  return (
    <FormContext.Provider value={{ 
      forms, setForms, 
      activeFormId, setActiveFormId, 
      view, setView,
      updateFormLocally, deleteFormLocally
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);