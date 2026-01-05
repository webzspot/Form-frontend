import React,{useEffect,useState}from 'react'
import { useParams} from 'react-router-dom'
import {motion} from 'framer-motion'
import axios from 'axios'
const PublicForm = () => {
    const {slug}=useParams();
  
    
    const[form,setForm]=useState(null)
    const [responses, setResponses] = useState({})
    
     const [successMessage, setSuccessMessage] = useState("");
     const [errorMessage, setErrorMessage] = useState("");
      const [submitting, setSubmitting] = useState(false);


    
     //Getting form
    const getForm=async ()=>{
        try{
            const res=await axios.get(`https://formbuilder-saas-backend.onrender.com/api/public/form/${slug}`)
      

 setForm(res.data.data)

        }
       catch(err){
        console.log("Error",err)
       }
    }

    //Showing the form in the ui
    useEffect(()=>{
      getForm()
    },[])
  

    // Getting the input value 
    const handleChange = (fieldId, value) => {
  setResponses((prev) => ({
    ...prev,
    [fieldId]: value
  }))
}
   

    // Public submit the form
const handleSubmit = async (e) => {
  e.preventDefault()
    
  setErrorMessage("");
  setSuccessMessage("");
   setSubmitting(true);
  
 for (const field of form.formField) {
  if (field.required && !responses[field.formFieldId]) {
   setErrorMessage(`Please fill the required field: ${field.label}`);
       setSubmitting(false);

    return; 
  }
}
  
  const payload = {
    responses: Object.entries(responses).map(
      ([formFieldId, value]) => ({
        formFieldId,
        value
      })
    )
  }
  

  try {
    const res = await axios.post(
      `https://formbuilder-saas-backend.onrender.com/api/public/form/submit/${slug}`,
      payload
    )

    
   setSuccessMessage("✅ Your response has been submitted successfully!");

  } catch (err) {
   
    setErrorMessage("❌ Submission failed. Please try again.");
  }
  finally {
    setSubmitting(false); 
  }
}
     //Form loading
    if (!form) {
    return (
      <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">
         <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-[#6C3BFF] rounded-xl flex items-center justify-center">
        <span className="text-white text-xl font-bold">⧉</span>
      </div>
      <h2 className="text-2xl font-bold text-black">FormCraft</h2>
    </div>

   
      <p className='text-black font-semibold text-lg'>Loading form...</p>  
      </div>
    )
  }

  return (
         <div className="min-h-screen bg-gray-200 flex justify-center items-center p-4">
             <div className="w-full mx-auto max-w-4xl">

    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-[#6C3BFF] rounded-xl flex items-center justify-center">
        <span className="text-white text-xl font-bold">⧉</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">FormCraft</h2>
    </div>

   
    {/*Success message after submission */}
    {successMessage ? (
  <div className="min-h-screen bg-purple-200 flex  p-4">
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    
    className="bg-white p-8 rounded-2xl flex flex-col justify-center items-center shadow-xl h-48 text-center max-w-md w-full">
      <h1 className="text-lg font-bold text-purple-700 mb-4">{successMessage}</h1>
      <button
        onClick={() => {
          setResponses({});
          setSuccessMessage("");
          setErrorMessage("");
        }}
        className="mt-4 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg font-semibold"
      >
        Submit another response
      </button>
    </motion.div>
  </div>
) : (
    
  <form onSubmit={handleSubmit} className="bg-[#f0ebf5] p-8 rounded-2xl shadow-xl shadow-gray-600 w-full max-w-3xl">
    <h1 className="text-2xl font-extrabold bg-white shadow-md shadow-black border border-black/20 text-gray-900 mb-1">{form.title}</h1>
    <p className="text-gray-500 text-lg mb-6">{form.description}</p>

    {errorMessage && (
      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {errorMessage}
      </div>
    )}

    {form.formField.map((field) => (
      <div key={field.formFieldId} className="mb-4">
        {/* field label */}
        <label className="block text-gray-700 text-sm font-semibold mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {/* field inputs */}
        {field.type === "TEXT" && (
          <input
            type="text"
            onChange={(e) => handleChange(field.formFieldId, e.target.value)}
            className="border border-gray-300 w-full px-3 py-2 rounded-lg outline-none focus:border-black"
          />
        )}
        {field.type === "EMAIL" && (
          <input
            type="email"
            onChange={(e) => handleChange(field.formFieldId, e.target.value)}
            className="border border-gray-300 w-full px-3 py-2 rounded-lg outline-none focus:border-black"
          />
        )}
        {field.type === "NUMBER" && (
          <input
            type="number"
            onChange={(e) => handleChange(field.formFieldId, e.target.value)}
            className="border border-gray-300 w-full px-3 py-2 rounded-lg outline-none focus:border-black"
          />
        )}
         {field.type === "DATE" && (
          <input
            type="date"
            onChange={(e) => handleChange(field.formFieldId, e.target.value)}
            className="border border-gray-300 w-full px-3 py-2 rounded-lg outline-none focus:border-black"
          />
        )}
        {field.type === "TEXTAREA" && (
          <textarea
            onChange={(e) => handleChange(field.formFieldId, e.target.value)}
            className="border border-gray-300 w-full px-3 py-2 rounded-lg outline-none focus:border-black"
          />
        )}

        {field.type === "CHECKBOX" &&
          field.options.map((opt, i) => (
            <label key={i} className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                onChange={(e) => {
                  setResponses((prev) => {
                    const prevValues = prev[field.formFieldId] || [];
                    return {
                      ...prev,
                      [field.formFieldId]: e.target.checked
                        ? [...prevValues, opt]
                        : prevValues.filter((v) => v !== opt),
                    };
                  });
                }}
                className="accent-black"
              />
              {opt}
            </label>
          ))}

        {field.type === "RADIO" &&
          field.options.map((opt, i) => (
            <label key={i} className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name={field.formFieldId}
                onChange={() => handleChange(field.formFieldId, opt)}
                className="accent-black"
              />
              {opt}
            </label>
          ))}

        {field.type === "DROPDOWN" && (
          <select
            onChange={(e) => handleChange(field.formFieldId, e.target.value)}
            className="border border-gray-300 w-full px-3 py-2 rounded-lg outline-none focus:border-black"
          >
            <option value="">Select an option</option>
            {field.options.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
      </div>
    ))}

    <button
      type="submit"
       disabled={submitting}
      className="mt-6 w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800"
    >
  {submitting ? "Submitting..." : "Submit"}
    </button>
  </form>
)}



  </div>
  </div>
  )
}

export default PublicForm