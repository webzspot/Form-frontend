// import React, { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';
// import {Edit, Trash } from 'lucide-react';

// const Preview = () => {

//   const [fetchedFields, setFetchedFields] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updatepop,setupdatepop]=useState(false);
//   const [selectedfield , setselectedfield]=useState(null);
//   const [updatedname,setupdatedname]=useState("");
  
  
//   useEffect(() => {
    
//     const userId = sessionStorage.getItem("userId");

//         if (!userId) {
//     console.error("User not logged in");
//     setLoading(false);
//     return;
//   }
//     axios.get(`https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/user/${userId}`)
//       .then((res) => {
    
//         setFetchedFields(res.data.data);
//         setLoading(false);
//         console.log(res.data.data);
       
//       })
//       .catch((err) => {
//         console.error("Error fetching fields:", err);
//         setLoading(false);
//       });
//   }, []);



// //   DELETEFUCNTIONALITY
// const handledelete=(masterFieldId)=>{
//     axios.delete(`https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${masterFieldId}`)
//     .then((res)=>{
//         console.log(res);
//         setFetchedFields(prev=>prev.filter(field=>field.masterFieldId!==masterFieldId))
//     })
// }

// //UPDATE FUNCTIONALITY

// const handleupdate=()=>{
//    if (!selectedfield) return;

//   axios.put(`https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${selectedfield.masterFieldId}`,
//     {
//     name:updatedname,
//     type:selectedfield.type
//   }
// )
//   .then((res)=>{
//     console.log("updated",res.data);
//     setFetchedFields((prevFeilds)=>
//     prevFeilds.map((field)=>
//     field.masterFieldId===selectedfield.masterFieldId
//     ?{...field,name:updatedname}
//     :field
//     ))

//     setupdatepop(false);
//     // setselectedfield(null);
//   })
// }

// const openupdatepopup=(field)=>{
//  setselectedfield(field);
//  setupdatedname(field.name);
//  setupdatepop(true);
// }

//   return (
//     <div className="flex flex-col items-center mt-10 gap-6">
//       <h2 className="text-2xl font-bold text-[#6C3BFF]">Form Preview</h2>
      
//       <div className="relative w-4/5 shadow-2xl border border-black/10 rounded-2xl p-8 bg-white space-y-6">
//         {loading ? (
//           <p className="text-center text-gray-500">Loading form fields...</p>
//         ) : fetchedFields.length > 0 ? (
//           fetchedFields.map((field,index) => (
//             <div key={field.masterFieldId} className="flex flex-col gap-2">
//               {/* Render the Label Name */}
//               <label className="font-semibold text-gray-700">
//                 {field.name}
//               </label>
              


//             {/* Render field input */}
// {field.type === "TEXTAREA" && (
//   <textarea
//     className="border border-black/10 rounded-xl p-2 outline-none focus:border-[#6C3BFF]"
//     placeholder={`Enter ${field.name}`}
//   />
// )}

// {["TEXT", "EMAIL", "NUMBER", "DATE"].includes(field.type) && (
//   <input
//     type={field.type.toLowerCase()}
//     className="border border-black/10 rounded-xl p-2 outline-none focus:border-[#6C3BFF]"
//     placeholder={`Enter ${field.name}`}
//   />
// )}

// {field.type === "CHECKBOX" && field.options?.map((opt, i) => (
//   <label key={i} className="flex items-center gap-2">
//     <input type="checkbox" />
//     {opt}
//   </label>
// ))}

// {field.type === "RADIO" && field.options?.map((opt, i) => (
//   <label key={i} className="flex items-center gap-2">
//     <input type="radio" name={field.masterFieldId} />
//     {opt}
//   </label>
// ))}

// {field.type === "DROPDOWN" && (
//   <select className="border border-black/10 rounded-xl p-2">
//     <option>Select {field.name}</option>
//     {field.options?.map((opt, i) => (
//       <option key={i}>{opt}</option>
//     ))}
//   </select>
// )}


//               <div className='flex gap-4'>
               
//             <p onClick={()=>handledelete(field.masterFieldId,index)}
            
//             ><Trash/></p>

//             <p onClick={()=>openupdatepopup(field)}><Edit/></p>
//             </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-400">No fields found for this user.</p>
//         )}
        
        
//          {/* //UPDATE POP MESSAGE. */}
//          {updatepop && (
//         <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl z-50">
//          <div className="w-4/5 flex flex-col gap-4 border bg-white border-black/10 shadow-xl rounded-2xl px-4 py-4">
//          <h3 className="text-center font-bold text-lg">Update Field Name</h3>

//          <input 
//          type="text" 
//          value={updatedname}
//          onChange={(e)=>setupdatedname(e.target.value)}
        
//          className="border border-black/20 rounded-xl px-2 py-1 shadow"
//          />

//           <p className="text-black/50">Do you really want to proceed with the changes?</p>
//           <div className="flex justify-around mt-4">
//             <button 
//             onClick={handleupdate}
//             className="bg-[#6C3BFF] text-white px-3 py-1 rounded">Update</button>
//             <button 
//             onClick={()=>setupdatepop(false)}
//             className="bg-[#6C3BFF] text-white px-3 py-1 rounded">Dismiss</button>
//           </div>
//          </div> 
//          </div>
// )}
//       </div>
//     </div>
//   );
// };

// export default Preview;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash } from "lucide-react";

const Preview = ({userId}) => {
  const [fetchedFields, setFetchedFields] = useState([]);
  const [loading, setLoading] = useState(true);

  const [updatePop, setUpdatePop] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // 🔹 Fetch master fields for logged-in user
  useEffect(() => {
  if (!userId) return;

    axios
      .get(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/user/${userId}`
      )
      .then((res) => {
        setFetchedFields(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching fields:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  // 🔹 Delete field
  const handleDelete = (masterFieldId) => {
    axios
      .delete(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${masterFieldId}`
      )
      .then(() => {
        setFetchedFields((prev) =>
          prev.filter((f) => f.masterFieldId !== masterFieldId)
        );
      })
      .catch((err) => console.error("Delete failed", err));
  };

  // 🔹 Open update popup
  const openUpdatePopup = (field) => {
    setSelectedField(field);
    setUpdatedName(field.name);
    setUpdatePop(true);
  };

  // 🔹 Update field name
  const handleUpdate = () => {
    if (!selectedField || !updatedName.trim()) return;

    axios
      .put(
        `https://formbuilder-saas-backend.onrender.com/api/dashboard/master-fields/${selectedField.masterFieldId}`,
        {
          name: updatedName,
          type: selectedField.type, // IMPORTANT for Prisma enum
        }
      )
      .then(() => {
        setFetchedFields((prev) =>
          prev.map((f) =>
            f.masterFieldId === selectedField.masterFieldId
              ? { ...f, name: updatedName }
              : f
          )
        );

        setUpdatePop(false);
        setSelectedField(null);
      })
      .catch((err) => console.error("Update failed", err));
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-6">
      <h2 className="text-2xl font-bold text-[#6C3BFF]">
        Form Preview
      </h2>

      <div className="relative w-4/5 bg-white p-8 rounded-2xl shadow-xl space-y-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : fetchedFields.length === 0 ? (
          <p className="text-center text-gray-400">
            No fields found for this user
          </p>
        ) : (
          fetchedFields.map((field) => (
            <div key={field.masterFieldId} className="space-y-2">
              <label className="font-semibold">{field.name}</label>

              {/* INPUT TYPES */}
              {field.type === "TEXTAREA" && (
                <textarea className="w-full border rounded-xl p-2" />
              )}

              {["TEXT", "EMAIL", "NUMBER", "DATE"].includes(field.type) && (
                <input
                  type={field.type.toLowerCase()}
                  className="w-full border rounded-xl p-2"
                />
              )}

              {field.type === "CHECKBOX" &&
                field.options?.map((opt, i) => (
                  <label key={i} className="flex gap-2">
                    <input type="checkbox" />
                    {opt}
                  </label>
                ))}

              {field.type === "RADIO" &&
                field.options?.map((opt, i) => (
                  <label key={i} className="flex gap-2">
                    <input
                      type="radio"
                      name={field.masterFieldId}
                    />
                    {opt}
                  </label>
                ))}

              {field.type === "DROPDOWN" && (
                <select className="border rounded-xl p-2">
                  <option>Select {field.name}</option>
                  {field.options?.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              )}

              {/* ACTIONS */}
              <div className="flex gap-4 mt-2">
                <Trash
                  className="cursor-pointer"
                  onClick={() =>
                    handleDelete(field.masterFieldId)
                  }
                />
                <Edit
                  className="cursor-pointer"
                  onClick={() => openUpdatePopup(field)}
                />
              </div>
            </div>
          ))
        )}

        {/* UPDATE POPUP */}
        {updatePop && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl w-96 space-y-4">
              <h3 className="font-bold text-lg text-center">
                Update Field Name
              </h3>

              <input
                value={updatedName}
                onChange={(e) =>
                  setUpdatedName(e.target.value)
                }
                className="w-full border rounded-xl p-2"
              />

              <div className="flex justify-between">
                <button
                  onClick={handleUpdate}
                  className="bg-[#6C3BFF] text-white px-4 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => setUpdatePop(false)}
                  className="bg-gray-300 px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
