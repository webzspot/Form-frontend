import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [forms, setForms] = useState([]);
  const [activeFormId, setActiveFormId] = useState(null);
  const [view, setView] = useState("dashboard");
  const [activePublicForm, setActivePublicForm] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // --- Theme Logic ---
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newValue;
    });
  };

  // --- Form Logic ---
  const updateFormLocally = (formId, updatedData) => {
    setForms(prev => prev.map(f => f.formId === formId ? { ...f, ...updatedData } : f));
  };

  const deleteFormLocally = (formId) => {
    setForms(prev => prev.filter(f => f.formId !== formId));
  };

  return (
    <FormContext.Provider value={{ 
      forms, setForms, 
      activeFormId, setActiveFormId, 
      view, setView,
      updateFormLocally, deleteFormLocally,
      activePublicForm, setActivePublicForm,
      isDarkMode, toggleTheme
    }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom Hook
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};