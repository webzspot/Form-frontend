import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [forms, setForms] = useState([]);
  const [activeFormId, setActiveFormId] = useState(null);
  const [view, setView] = useState("dashboard");

 
   

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
      updateFormLocally, deleteFormLocally,
     
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);