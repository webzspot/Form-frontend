import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion' 
import { ArrowLeftIcon } from 'lucide-react';
import Preview from './Preview';
import UserNavbar from './UserNavbar';


const Home = () => {
  const [createform, setcreateform] = useState(true);
  const [formfields,setformfields]=useState(false);
  const [selectedType, setSelectedType] = useState("TEXT");
  const InputFields= ["TEXT", "NUMBER", "EMAIL", "DATE" , "TEXTAREA", "CHECKBOX", "RADIO" , "DROPDOWN"];
  const [content,setcontent]=useState(false);
  const [labelname,setlabelname]=useState("");
  const[data,setdata]=useState([]);
  const[options,setoptions]=useState([""]);
 
 
const handlesubmit = () => {
  const userId = localStorage.getItem("userId");
  
  // 1. Create the full list of fields to upload
  // const allFields = [...data, { name: labelname, type: selectedType }];
 const allFields = labelname
  ? [...data, {
      name: labelname,
      type: selectedType,
      options: ["CHECKBOX","RADIO","DROPDOWN"].includes(selectedType)
        ? options.filter(o => o.trim() !== "")
        : []
    }]
  : data;
  // 2. Define a recursive function to upload one by one
  const uploadField = (index) => {
    // Base case: if we've uploaded everything, stop
    if (index >= allFields.length) {
      console.log("All fields uploaded in order!");
      setdata([]);
      setlabelname("");
      setSelectedType("TEXT");
      setoptions([""]);
      return;
    }

    const currentField = allFields[index];

    // 3. Send the current field
    axios.post("https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields", {
      name: currentField.name,
      type: currentField.type,
      options:currentField.options || [],
      userId: userId
    })
    .then((res) => {
      console.log(`Saved field ${index + 1}:`, res.data);
      
      uploadField(index + 1);
    })
    .catch((err) => {
      console.error("Error at index " + index, err);
    });
  };
  console.log(userId);
  uploadField(0);
};


  useEffect(() => {
    
    const userId = localStorage.getItem("userId");  
    console.log(userId);
    axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/user/${userId}`)
      .then((res) => {
    
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching fields:", err);
        
      });
  }, []);


  //OPTIONS
  const handleoptionchange=(index,value)=>{
    const updateoption=[...options];
    updateoption[index]=value;
    setoptions(updateoption);
  }

  const addoption=()=>{
    setoptions([...options," "]);
  }

  return (
    <div>
     <UserNavbar/>
      <div className='flex relative flex-col items-center gap-10 mt-4'>
        
        {/* Toggle Buttons */}
        <div className='flex justify-center gap-10'>
          <button 
            onClick={() => setcreateform(true)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${createform ? 'bg-[#6C3BFF] text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            Forms
          </button>
          <button 
            onClick={() => setcreateform(false)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${!createform ? 'bg-[#6C3BFF] text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            Create
          </button>
        </div>

        {/* Main Interactive Box */}
        <motion.div 
          layout 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-4/5 h-[400px] border border-black/10 shadow-2xl flex flex-col justify-center items-center cursor-pointer bg-white rounded-2xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {createform ? (
              <motion.div
                key="forms-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="text-gray-400">Your saved forms appear here</p>
              </motion.div>
            ) : !formfields? (
              <motion.div
                key="create-view"
                initial={{ scale: 0, opacity: 0 }} // Starts tiny and invisible
                animate={{ scale: 1, opacity: 1 }}  // Pops to full size
                exit={{ scale: 0, opacity: 0 }}    // Shrinks away
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center gap-4"
              >
                {/* The "Add" Pop Effect */}
                <div
                onClick={()=>{setformfields(true)}}
                 className="bg-[#6C3BFF] text-white font-semibold w-10 h-10 rounded-full flex justify-center items-center text-center text-2xl shadow-lg pb-1">
                  +
                </div>
                <h2 className="text-[#6C3BFF] font-bold text-xl uppercase tracking-wider">Add New Form</h2>
              </motion.div>
            ):(      
        <div  
       
        className="w-5/5 h-[400px] border  justify-between p-4 border-black/10 shadow-2xl flex flex-col  cursor-pointer bg-white rounded-2xl relative overflow-hidden">
          <div className="flex justify-between"> 
             <div>
              <ArrowLeftIcon  
              onClick={()=>setformfields(false)}/>
             </div>
             
             <div className="flex gap-6">
              <p  className="text-black/50 font-semibold hover:text-[#6C3BFF]">Title</p>
              <p 
              onClick={()=>{setcontent(true)}}
              className="text-black/50 font-semibold hover:text-[#6C3BFF]">Content</p> 
              </div>
             </div>
         
           
       <div className="w-full h-[300px] border border-black/5 shadow-inner bg-gray-50/30 rounded-2xl flex flex-col justify-center items-center p-6">
  <div className="w-full max-w-xs space-y-2">
   
   {/* LABELNAME */}
    <input
    onChange={(e)=>setlabelname(e.target.value)}
    value={labelname}
    type="text"
    className='px-2 border w-4/5 placeholder:text-gray-400 text-gray-800 border-black/10 rounded-xl py-1 outline-none'
    placeholder="Label Name" />
    
   {/* INPUTFIELD */}

{["CHECKBOX", "RADIO", "DROPDOWN"].includes(selectedType) && (
  <div className="flex flex-col gap-2 mb-3">
    {options.map((opt, i) => (
      <input
        key={i}
        type="text"
        value={opt}
        onChange={(e) => handleoptionchange(i, e.target.value)}
        placeholder={`Option ${i + 1}`}
        className="px-2 py-1 border rounded-xl border-black/10 outline-none"
      />
    ))}

    <button
      type="button"
      onClick={addoption}
      className="text-sm text-[#6C3BFF] w-fit"
    >
      + Add option
    </button>
  </div>
)}

{selectedType === 'TEXTAREA' && (
  <textarea 
  placeholder="Enter long text.."
  className="w-full max-w-md px-2 py-1 rounded-xl border border-black/10 outline-none focus:border-[#6C3BFF]"/>
)}


  {["TEXT","NUMBER","EMAIL","DATE"].includes(selectedType) && (

  <input type={selectedType.toLowerCase()}
  placeholder={`Enter ${selectedType.toLowerCase()}..`}
  className="w-full max-w-md px-2 py-1 rounded-xl border border-black/10 outline-none focus:border-[#6C3BFF]" />
  )}

{
  selectedType==="CHECKBOX" && (
    <div className="flex flex-col gap-2">
      {options.map((opt,i)=>(
        <label>
          <input type="checkbox" />
          {opt}
        </label>
      ))}
      </div>
)}

{
  selectedType==="RADIO" && (
    <div className="flex flex-col gap-2">
      {options.map((opt,i)=>(
        <label>
          <input type="radio" name="radio-preview" />
          {opt}
        </label>
      ))}
      </div>
)}

{
  selectedType==="DROPDOWN" && (
    <select className="w-full max-w-md px-2 py-1 rounded-xl border border-black/10 outline-none focus:border-[#6C3BFF]">
    <option>Select Option</option>
    {options.map((opt,i)=>(
      <option key={i}>{opt}</option>
    ))}
    </select>
    
)}

        
    


<div className="flex gap-4">


     <button 
        onClick={handlesubmit}
        className="bg-[#6C3BFF] text-white rounded px-4 py-1 mt-2">Submit</button>
</div>
      

  </div>

           </div>

         </div>)}
          </AnimatePresence>
        </motion.div>

     {  content?(
        <div className='w-3/5 bg-white absolute top-35 flex flex-col gap-6 text-sm px-8 py-4 rounded-2xl text-center shadow-2xl border border-black/10'>
          <div className="flex justify-between">
          <p className="bg-[#6C3BFF] px-2 rounded font-semibold py-1 text-white hover:cursor-pointer">Input Fields</p>
          <button onClick={()=>setcontent(false)} className="hover:cursor-pointer font-bold text-white bg-[#6C3BFF] rounded-full px-2 ">X</button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4  gap-3">
        {
       InputFields.map((item,i)=>{
        return <p
        key={i}
        onClick={()=>{ setSelectedType(item);setcontent(false);}}
         className=" text-black/50 hover:cursor-default font-semibold hover:text-[#6C3BFF]">
          {item}</p>
           })   
          } </div> 
     </div>):(null)
}

      </div>

       

      <Preview/>
    </div>
  )
}

export default Home



