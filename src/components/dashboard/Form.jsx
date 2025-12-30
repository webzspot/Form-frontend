import React from 'react'
import { useState,useEffect,useRef} from 'react'
import { motion } from "framer-motion";

import UserNavbar from "../user/UserNavbar";
import axios from 'axios'
const Form = () => {
   const[showFormBuilder,setShowFormBuilder]=useState(false) 
   const masterListRef = useRef(null);
   const[masterFields,setMasterFields]=useState([])
   const[selectedFields,setSelectedFields]=useState([])
   const[forms,setForms]=useState([])
   const[showField,setShowField]=useState(false)
   const[newField,setNewField]=useState({
    name:"",
    type:"TEXT",
    
   })
   const [newOptions, setNewOptions] = useState([]); 
   const [currentOption, setCurrentOption] = useState("");
   const [editingFormId, setEditingFormId] = useState(null)
   const [editData, setEditData] = useState({
  title: "",
  description: "",
  isPublic: true
})
   const[activeForm,setActiveForm]=useState(null)
   
   const [showMasterList, setShowMasterList] = useState(false);
   const [responses, setResponses] = useState([]);       
const [selectedResponse, setSelectedResponse] = useState(null); 
const [showResponsesModal, setShowResponsesModal] = useState(false);
const [showDetailModal, setShowDetailModal] = useState(false);
const [responseFields, setResponseFields] = useState([]);


  const INPUT_TYPE_MAP = {
  TEXT: "text",
  EMAIL: "email",
  NUMBER: "number",
   DATE:"date"
  
} 

   useEffect(()=>{
    getMasterFields()
    getForms()
   },[])

   //Getting masterfields for showFormBuilder
   const getMasterFields=async ()=>{
    try{
        const user = JSON.parse(localStorage.getItem("user"))
const userId = user.userId
      
      const res=await axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/user/${userId}`)
      console.log(res.data.data,"master fields")
      setMasterFields(res.data.data)
    
    }
    catch(err){
      console.log(err)
    }
     
   }
       //For removing the particular masterfield in the right side panel 
   const toggleField = (toggledField) => {
  setSelectedFields(prev => {
    const exists = prev.find(
      field => field.masterFieldId === toggledField.masterFieldId
    )

    if (exists) {
     
      return prev.filter(
        field => field.masterFieldId !== toggledField.masterFieldId
      )
    }

    
    return [
      ...prev,
      {
        ...toggledField,
        required: false   
      }
    ]
  })
}

     //Addding a new masterfield in the left side panel
   const addMasterField=async ()=>{
    try{
        const user=JSON.parse(localStorage.getItem('user'))
        const userId=user.userId
        if (!newField.name.trim()) {
      console.log("Field name is empty");
      alert("Please fill the field name")
      return 
    }
       const res=await axios.post("https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields",{name:newField.name,type:newField.type, options: newOptions.length > 0 ? newOptions : null,userId})
       setMasterFields(prev=>[...prev,res.data.data])
       setTimeout(() => {
  masterListRef.current?.scrollTo({
    top: masterListRef.current.scrollHeight,
    behavior: "smooth",
  });
}, 100);
       console.log("Updated masterFields:", [...masterFields, res.data.data])
        setNewField({ name: "", type: "TEXT" });
        setShowField(false);

    }
    catch(err){
      console.log("Error",err)
    }
        

   }   
     
   //Getting all forms
   const getForms=async()=>{
    try{
        const user=JSON.parse(localStorage.getItem('user'))
     const userId=user.userId
     const res=await axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${userId}`)
     console.log("Forms fetched successfully",res.data.data)
     setForms(res.data.data)
    }
    catch(err){
      console.log("Error",err)
    }
     
   }


   //Creating a new form
  const createForm=async ()=>{
    try{
         const user=JSON.parse(localStorage.getItem('user'))
      const userId=user.userId
       if (selectedFields.length === 0) {
      alert("Please select at least one field")
      return
    }
    const uniqueTitle = `Untitled Form ${Date.now()}`

       const payload = {
      title: uniqueTitle,
      description: "Auto created form",
      isPublic: true,
      userId,
      fields: selectedFields.map((field, index) => ({
        label: field.name,
        type: field.type,
        required: field.required,
        order: index,
        masterFieldId: field.masterFieldId || null,
        options: field.options || null
      }))
    }

      const res=await axios.post("https://formbuilder-saas-backend.onrender.com/api/dashboard/form",payload)
       

   
       console.log("Form created successfully:", res.data)
    alert("Form created successfully")
    getForms()
    setShowFormBuilder(false)
    setSelectedFields([]) 
    }
    catch(err){
      console.error("Create form error:", err)
    alert("Failed to create form")
    }

   
  }
   
  //Getting Form fields for edit 
  const getFieldsForEdit = async (formId) => {
  try {
    const res = await axios.get(
      `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`
    );

    const form = res.data.data;

    setEditingFormId(formId);
    setEditData({
      title: form.title,
      description: form.description,
      isPublic: form.isPublic
    });

   
    setSelectedFields(
      form.formField.map(f => ({
        formFieldId: f.formFieldId,   
        label: f.label,
        type: f.type,
        required: f.required,
        options: f.options || [], 
           masterFieldId: f.masterFieldId || null
                     
      }))
    );

  } catch (err) {
    console.error("Failed to fetch form fields for edit", err);
    alert("Failed to load form fields");
  }
};

  //Updating the form
  const handleUpdate = async (formId, save = false) => {
  try {
    if (!save) {
       setShowMasterList(false); 
      await getFieldsForEdit(formId)
      return
    }

  
    const payload = {
      title: editData.title,
      description: editData.description,
      isPublic: editData.isPublic,
      fields: selectedFields.map((field, index) => ({
          formFieldId: field.formFieldId, 
        label: field.label || field.name,
        type: field.type,
        required: field.required,
        order: index,
        options: field.options || [],
         masterFieldId: field.masterFieldId || null

      }))
    }

    await axios.put(
      `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${editingFormId}`,
      payload
    )

    alert("Form updated successfully")
    setEditingFormId(null)
    getForms() 
  } catch (err) {
    console.error("Update failed", err)
    alert("Failed to update form")
  }
}


   
  //Deleting the form
   const deleteForm = async (formId) => {
  try {
    const res = await axios.delete(
      `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/${formId}`
    );

    if (res.data.success) {
      setForms(prev => prev.filter(form => form.formId !== formId));
      alert("Form deleted successfully");
    } else {
      alert(res.data.message || "Failed to delete form");
      
      getForms();
    }
  } catch (err) {
    console.error("Error deleting form", err);
    alert("Failed to delete form");
 
    getForms();
  }
};
 
  //Getting Form fields for seeing the form fiels in the UI
   const getFormFields=async (formId)=>{
    try{
        const res=await axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`)
     
      setActiveForm(res.data.data)
    }
    catch(err){
        console.log("Form details error", err)
    alert("Failed to load form fields")
    }
      
  
  

   }

   //Removing the form fields in edit modal
   const removeField = (id) => {
  setSelectedFields(prev =>
    prev.filter(field =>
      field.formFieldId
        ? field.formFieldId !== id
        : field.masterFieldId !== id
    )
  );
};
 
  //Fetching Responses for each form
const openResponses = async (formId) => {
  try {
    
    const res = await axios.get(
      `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/responses/${formId}`
    );
    setResponses(res.data.data);

    const formRes = await axios.get(
      `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/details/${formId}`
    );
    setResponseFields(formRes.data.data.formField);

   
    setShowResponsesModal(true);
  } catch (err) {
    console.log("Error fetching responses", err);
  }
};


 //Fetching responses details from each response
 const openResponseDetail = async (responseId) => {
  try{
      const res = await axios.get(
    `https://formbuilder-saas-backend.onrender.com/api/dashboard/form/response/${responseId}`
  );

  setSelectedResponse(res.data.data);
  setShowDetailModal(true);
  }
  catch(err){
    console.log("Error",err)
  }
 
};

const getLabel = (fieldId) =>
  responseFields.find(f => f.formFieldId === fieldId)?.label || "Unknown Field";

  


  return (
    <>
   <UserNavbar/>
    <div className="min-h-screen bg-gray-200 p-6">
      <button
  onClick={() =>{ setShowFormBuilder(true), setSelectedFields([])}}
  className="mb-6 px-6 py-2 bg-violet-600 text-white rounded-md absolute right-2  hover:bg-violet-700"
>
  + Create New Form
</button>

      {
        showFormBuilder&&(
        <div className='w-full max-w-4xl h-full mx-auto border border-purple-700   rounded-md bg-white flex flex-col shadow-gray-500  md:flex-row gap-6 p-4 shadow-md'>
            {/*Left side panel */}
         <div className='border   border-r p-4 md:w-1/3 rounded-md'>
  <h2 className="text-lg text-center text-violet-700 font-semibold mb-4">Master Fields</h2>
  <div className='overflow-y-auto flex flex-col space-y-2 max-h-[100vh]'   ref={masterListRef}>
    {masterFields.map((field) => (
      <label
        key={field.masterFieldId}
        className={`flex items-center gap-2 p-2 cursor-pointer rounded hover:bg-gray-50 ${
          selectedFields.some(f => f.masterFieldId === field.masterFieldId) ? 'bg-blue-50 border border-blue-300' : ''
        }`}
      >
        <input
          type='checkbox'
          checked={selectedFields.some(f => f.masterFieldId === field.masterFieldId)}
          onChange={() => toggleField(field)}
          className='accent-blue-500 w-4 h-4'
        />
        {field.name}
      </label>
    ))}
  </div>
  <button
  onClick={() => setShowField(true)}
  className="px-4 m-6 bg-violet-500 text-white py-2 rounded-md hover:bg-violet-700 cursor-pointer"
>
  + Add Master Field
</button>
</div>

           {/*Right side panel */}
         <div className='border  md:w-2/3 p-4 rounded-md'>
  <h2 className="text-2xl font-bold text-violet-700 mb-4 text-center border-b pb-2">Form Preview</h2>
  <div className='flex flex-col gap-3'>
  

   {selectedFields.map((field) => (
  <motion.div key={field.masterFieldId} className='flex flex-col gap-1' initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}>
    <label className="text-gray-700 font-medium">{field.name}</label>

    
<div className="flex items-center gap-2 mt-1">
  <label>{field.required && <span className="text-red-500">*</span>}</label>

  <input
    type="checkbox"
    checked={field.required}
    onChange={() => {
      setSelectedFields(prev =>
        prev.map(f =>
          f.masterFieldId === field.masterFieldId
            ? { ...f, required: !f.required }
            : f
        )
      )
    }}
  />
</div>




  
{/* TEXT / EMAIL / NUMBER / DATE */}
{["TEXT","EMAIL","NUMBER","DATE"].includes(field.type) && (
  <input
    type={INPUT_TYPE_MAP[field.type]}
    placeholder={field.name}
    className="w-full border border-violet-400 rounded px-3 py-2"
  />
)}


{/* TEXTAREA */}
{field.type === "TEXTAREA" && (
  <textarea
    placeholder={field.name}
    rows={3}
    className="w-full border border-violet-400 rounded px-3 py-2"
  />
)}
 {["DROPDOWN","RADIO","CHECKBOX"].includes(field.type) && field.options && (
  <div className="flex flex-col gap-2">
    {/* Dropdown */}
    {field.type === "DROPDOWN" && (
      <select className="border border-violet-400 rounded px-3 py-2">
        {field.options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    )}

    {/* Radio or Checkbox */}
    {(field.type === "RADIO" || field.type === "CHECKBOX") && (
      <div className="flex flex-col gap-1">
        {field.options.map((opt, idx) => (
          <label key={idx} className="flex items-center gap-2">
            <input
              type={field.type.toLowerCase()} 
              name={field.masterFieldId} 
              value={opt}
              className="accent-blue-500 w-4 h-4"
            />
            {opt}
          </label>
        ))}
      </div>
    )}
  </div>
)}



  </motion.div>
))}
   
    <button className="px-4 m-6 bg-violet-500 text-white py-2 rounded-md hover:bg-violet-700 cursor-pointer"
   onClick={createForm}
   >Create Form</button>
   <button
  onClick={() => {
    setShowFormBuilder(false)
    setSelectedFields([])
  }}
  className="px-4 m-6 bg-red-500 text-white py-2 rounded-md hover:bg-red-700 cursor-pointer"
>
  Cancel 
</button>
  </div> 
   
  
  
</div>
          
    {showField && (
  <motion.div className="fixed top-24   right-1/2 translate-x-1/2 z-50"  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}>
    <div className="bg-white rounded-lg p-6 w-[350px] shadow-xl border">
      <h3 className="text-lg text-center font-bold mb-4 text-violet-700">
        Add Master Field
      </h3>

      <div className='flex flex-col'>
        <input className=' px-4 py-2 border border-purple-500 rounded-md m-4 focus:ring-1 focus:outline-none focus:border-purple-700' placeholder='Field Name' value={newField.name} onChange={(e)=>setNewField({...newField,name:e.target.value})}/>
        <select className='px-4 text-gray-700 py-2 border border-purple-500 rounded-md m-4 focus:ring-1 focus:outline-none focus:border-purple-700' value={newField.type} onChange={(e) => setNewField({ 
      ...newField, 
      type: e.target.value, 
      
  })}>
          <option value='TEXT'>Text</option>
          <option value='EMAIL'>Email</option>
          <option value='NUMBER'>Number</option>
          <option value="TEXTAREA">Textarea</option>
          <option value="DATE">Date</option>
          <option value="DROPDOWN">Dropdown</option>
<option value="RADIO">Radio</option>
<option value="CHECKBOX">Checkbox</option>

      
        </select>

        </div>
        
    {["DROPDOWN","RADIO","CHECKBOX"].includes(newField.type) && (
  <div className="flex flex-col m-4 gap-2">
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Add option"
        value={currentOption}
        onChange={(e) => setCurrentOption(e.target.value)}
        className="border border-purple-500 rounded px-2 py-1 flex-1"
      />
      <button
        type="button"
        className="bg-purple-500 text-white px-3 rounded hover:bg-purple-600"
        onClick={() => {
          if (currentOption.trim() && !newOptions.includes(currentOption.trim())) {
            setNewOptions(prev => [...prev, currentOption.trim()]);
            setCurrentOption("");
          }
        }}
      >
        Add
      </button>
    </div>

    
    <div className="flex flex-wrap gap-2">
      {newOptions.map((opt, idx) => (
        <div key={idx} className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded">
          <span>{opt}</span>
          <button
            type="button"
            className="text-red-500 font-bold"
            onClick={() => setNewOptions(prev => prev.filter((_, i) => i !== idx))}
          >
            x
          </button>
        </div>
      ))}
    </div>
  </div>
)}


    

      <div className="flex justify-end gap-2 mt-6">
        <button
         onClick={addMasterField}
          className="px-4 py-2 border cursor-pointer bg-purple-500 text-white rounded-md hover:bg-purple-600"
        >
          Add
        </button>
        <button
          onClick={() => setShowField(false)}
          className="px-4 py-2 border cursor-pointer bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  </motion.div>
)}



        </div>
        )
      }
        


  {/* My Forms */}
<div className="mt-16 bg-white border border-violet-500 p-6 rounded-md shadow-lg shadow-black max-w-5xl mx-auto">
  <h2 className="text-xl font-bold text-violet-700 mb-4 text-center">
    My Forms
  </h2>
  <div className='px-3 py-2 w-44 mt-4 mb-4 rounded-md bg-gray-200 shadow-md shadow-gray-700'>
    <p className='text-black text-center font-bold'>Total Forms <span className='text-purple-900 font-semibold'>{forms.length}</span></p>
  </div>

  {forms.length === 0 ? (
    <p className="text-gray-500 text-center">No forms created yet</p>
  ) : (
    <div className="grid grid-cols-1 gap-4 max-w-8xl p-6 md:grid-cols-2 lg:grid-cols-4 ">
    
   {forms.map((form) => (
 <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
 
  transition={{ duration: 0.3 }}
  key={form.formId}
  className="bg-white border border-violet-600 rounded-lg p-5 shadow-sm hover:shadow-lg  flex flex-col gap-3 min-h-[180px]"
>
<div className="flex justify-end gap-2">


  <button
    onClick={() => handleUpdate(form.formId)} 
    className="text-blue-600 hover:bg-blue-100 p-1 rounded-md"
    title="Edit"
  >
    ✏️
  </button>

  <button
    onClick={() => deleteForm(form.formId)}
    className="text-red-500 hover:bg-red-100 p-1 rounded-md"
    title="Delete"
  >
    🗑️
  </button>
  <button   onClick={() => getFormFields(form.formId)} className='  bg-purple-500 text-white text-sm px-2 py-1 rounded-md hover:bg-purple-700 cursor-pointer'>View Form</button>
</div>

<h2 className="text-base font-semibold text-violet-800 truncate">
  {form.title}
</h2>


 
  <p className="text-sm text-gray-600  truncate">
    {form.description || "No description provided"}
  </p>
    
    
<button onClick={() => openResponses(form.formId)}
  className="bg-green-600  text-xs text-white  hover:bg-green-800 cursor-pointer px-2 py-1 rounded-md">
  View Responses
</button>
  
  <div className="flex justify-between items-center gap-3 text-xs text-gray-500">
    <span>
      Created on {new Date(form.createdAt).toLocaleDateString()}
    </span>

    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        form.isPublic
          ? "bg-green-100 text-green-700"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {form.isPublic ? "Public" : "Private"}
    </span>
  </div>
</motion.div>

  ))}
  </div>
)
}
</div>
{activeForm && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white border border-purple-600 p-6 rounded-md shadow-lg w-[500px] max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl text-center font-bold text-violet-700 mb-2">{activeForm.title}</h2>
      <p className="mb-4 text-sm text-center text-gray-600">{activeForm.description}</p>

      {activeForm.formField.map((field) => (
        <div key={field.masterFieldId || field.id} className="mb-3">
          <label className="block text-gray-700">{field.label}</label>
          {["TEXT", "EMAIL", "NUMBER", "DATE"].includes(field.type) && (
            <input type={field.type.toLowerCase()} className="border px-2 py-1 rounded w-full" />
          )}
          {field.type === "TEXTAREA" && (
            <textarea className="border px-2 py-1 rounded w-full" rows={3} />
          )}
          {["DROPDOWN", "RADIO", "CHECKBOX"].includes(field.type) && field.options && (
            <div className="mt-1">
              {field.type === "DROPDOWN" && (
                <select className="border px-2 py-1 rounded w-full">
                  {field.options.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
              {(field.type === "RADIO" || field.type === "CHECKBOX") && (
                <div className="flex flex-col gap-1">
                  {field.options.map((opt, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <input type={field.type.toLowerCase()} value={opt} className="accent-blue-500 w-4 h-4"/>
                      {opt}
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={() => setActiveForm(null)}
        className="mt-4 px-4 py-2 bg-red-500  text-white rounded-md cursor-pointer hover:bg-red-600"
      >
        Close
      </button>
    </div>
  </div>
)}


{editingFormId && (
  <div className="fixed inset-0 bg-opacity-40 flex  items-center justify-center z-50">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
       transition={{ duration: 0.3 }}
      className="bg-white rounded-lg w-full max-w-[520px] max-h-[85vh] overflow-y-auto border border-violet-500 p-6 shadow-xl"
    >
      <h3 className="text-xl font-bold text-violet-700 mb-4 text-center">
        Edit Form
      </h3>

      <input
        value={editData.title}
        onChange={e =>
          setEditData({ ...editData, title: e.target.value })
        }
        placeholder="Form Title"
        className="border p-2 w-full mb-3 rounded"
      />

      <textarea
        value={editData.description}
        onChange={e =>
          setEditData({ ...editData, description: e.target.value })
        }
        placeholder="Form Description"
        className="border p-2 w-full mb-4 rounded"
      />

    {selectedFields.map((field) => (
  <div  key={field.formFieldId} className="mb-4 border p-3 rounded">

    {/* LABEL EDIT */}
    <input
      value={field.label}
      onChange={(e) =>
        setSelectedFields(prev =>
          prev.map(f =>
            f.formFieldId === field.formFieldId
              ? { ...f, label: e.target.value }
              : f
          )
        )
      }
      placeholder="Field Label"
      className="border px-2 py-1 rounded w-full mb-2"
    />

    {/* TYPE EDIT */}
    <select
      value={field.type}
      onChange={(e) =>
        setSelectedFields(prev =>
          prev.map(f =>
            f.formFieldId === field.formFieldId
              ? { ...f, type: e.target.value, options: [] }
              : f
          )
        )
      }
      className="border px-2 py-1 rounded w-full mb-2"
    >
      <option value="TEXT">Text</option>
      <option value="EMAIL">Email</option>
      <option value="NUMBER">Number</option>
      <option value="DATE">Date</option>
      <option value="TEXTAREA">Textarea</option>
      <option value="DROPDOWN">Dropdown</option>
      <option value="RADIO">Radio</option>
      <option value="CHECKBOX">Checkbox</option>
    </select>

    {/* REQUIRED */}
    <label className="flex items-center gap-2 mb-2">
      <input
        type="checkbox"
        checked={field.required}
        onChange={() =>
          setSelectedFields(prev =>
            prev.map(f =>
              f.formFieldId === field.formFieldId
                ? { ...f, required: !f.required }
                : f
            )
          )
        }
      />
      Required
    </label>

    {/* OPTIONS  */}
    {["DROPDOWN","RADIO","CHECKBOX"].includes(field.type) && (
      <div>
        <div className="flex gap-2 mb-2">
          <input
            placeholder="Add option"
            value={field._newOption || ""}
            onChange={(e) =>
              setSelectedFields(prev =>
                prev.map(f =>
                  f.formFieldId === field.formFieldId
                    ? { ...f, _newOption: e.target.value }
                    : f
                )
              )
            }
            className="border px-2 py-1 rounded flex-1"
          />
          <button
            type="button"
            onClick={() => {
              if (!field._newOption?.trim()) return;
              setSelectedFields(prev =>
                prev.map(f =>
                  f.formFieldId === field.formFieldId
                    ? {
                        ...f,
                        options: [...field.options, field._newOption.trim()],
                        _newOption: ""
                      }
                    : f
                )
              )
            }}
            className="bg-violet-500 text-white px-3 rounded"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {field.options.map((opt, idx) => (
            <span
              key={idx}
              className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
            >
              {opt}
              <button
                onClick={() =>
                  setSelectedFields(prev =>
                    prev.map(f =>
                      f.formFieldId === field.formFieldId
                        ? {
                            ...f,
                            options: f.options.filter((_, i) => i !== idx)
                          }
                        : f
                    )
                  )
                }
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    )}

    {/* REMOVE FIELD */}
    <button
     onClick={() =>
    removeField(field.formFieldId || field.masterFieldId)
  }
      className="text-red-600 mt-2"
    >
      Remove Field
    </button>
  </div>
))}
{/* PUBLIC / PRIVATE TOGGLE */}
<label className="flex items-center gap-2 mb-4">
  <input
    type="checkbox"
    checked={editData.isPublic}
    onChange={(e) =>
      setEditData({ ...editData, isPublic: e.target.checked })
    }
    className="accent-violet-500 w-4 h-4"
  />
  Public
</label>


{showMasterList && (
  <div className="absolute top-6 left-6 w-60 border p-2 rounded max-h-[60vh] overflow-y-auto bg-white shadow-lg z-50">
    <h3 className="text-center font-semibold mb-2 text-violet-700">Master Fields</h3>
    {masterFields.map((mf) => (
      <label key={mf.masterFieldId} className="flex items-center justify-between gap-2 p-1 cursor-pointer hover:bg-gray-50 rounded">
        <span>{mf.name}</span>
        <input
          type="checkbox"
          checked={selectedFields.some(f => f.masterFieldId === mf.masterFieldId)}
          onChange={() => {
            const exists = selectedFields.find(f => f.masterFieldId === mf.masterFieldId);
            if (exists) {
              setSelectedFields(prev =>
                prev.filter(f => f.masterFieldId !== mf.masterFieldId)
              );
            } else {
              setSelectedFields(prev => [
                ...prev,
                {
                  label: mf.name,
                  type: mf.type,
                  options: mf.options || [],
                  required: false,
                  masterFieldId: mf.masterFieldId,
                }
              ]);
            }
          }}
          className="accent-blue-500 w-4 h-4"
        />
      </label>
    ))}
  </div>
)}


 

      <div className="flex justify-end gap-3">
        <button className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer'     onClick={() => setShowMasterList(prev => !prev)}
>
  
 
  + Add Field
</button>

        <button
          onClick={() => setEditingFormId(null)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
        >
          Cancel
        </button>

        <button
          onClick={() => handleUpdate(editingFormId, true)}
          className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 cursor-pointer"
        >
          
        Edit
        </button>
      </div>
    </motion.div>
  </div>
)}
 
    {/*Form Responses */}
 {showResponsesModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg w-full max-w-[450px] border border-violet-500 p-6 shadow-xl"
    >
      <h3 className="text-xl font-bold text-violet-700 mb-4 text-center">
        Form Responses
      </h3>

      {/* No Responses*/}
      {responses.length === 0 ? (
        <p className="text-center text-gray-500">
          No responses found
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {responses.map((r, index) => (
            <div
              key={r.formResponseId}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span className="font-medium">
                Submission {index + 1}
              </span>

              <button
                onClick={() => openResponseDetail(r.formResponseId)}
                className="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-700"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={() => setShowResponsesModal(false)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </motion.div>
  </div>
)}

   {/*Response Details */}
 {showDetailModal && selectedResponse && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-md w-[400px]">
      <h3 className="text-lg font-bold text-violet-700 mb-3 text-center">
        Response Detail
      </h3>

      {selectedResponse.responseValue.map(item => (
        <p key={item.responseValueId} className="mb-2">
          <b>{getLabel(item.formFieldId)}:</b>{" "}
          {Array.isArray(item.value)
            ? item.value.join(", ")
            : item.value}
        </p>
      ))}

      <button
        onClick={() => setShowDetailModal(false)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Close
      </button>
    </div>
  </div>
)}





    </div>
    </>
  )}
export default Form





