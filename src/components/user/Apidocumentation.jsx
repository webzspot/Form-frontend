// import React, { useEffect, useState } from 'react'
// import UserNavbar from './UserNavbar'
// import WaveBackground from "../dashboard/WaveBackground";
// import { useFormContext } from "../dashboard/FormContext";
// import { motion} from "framer-motion";
// import axios from 'axios';
// import toast from "react-hot-toast";
// import { CopyIcon, DeleteIcon } from 'lucide-react';
// import { FiDelete } from 'react-icons/fi';
// import { MdDeleteSweep } from 'react-icons/md';

//   const SparkleIcon = ({ className }) => (
//   <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
//     <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
//   </svg>
// );

// const Apidocumentation = () => {

//   const { isDarkMode } = useFormContext();
//   const [keyname,setkeyname]=useState("");
//   const token = localStorage.getItem("token");
//   const[copied,setcopied]=useState("");
//   const[publicKey,setpublicKey]=useState("");
//   const[secretKey,setsecretKey]=useState("");
//   const [apiKeys, setApiKeys] = useState([]);


//   //get public and secret key
//   const getpublicsecretkey = async() => {
//   try{
//     const res=await axios.post("https://formbuilder-saas-backend.onrender.com/api/dashboard/keys" ,{
//     name:keyname
//     },
//     {
//      headers: { Authorization: `Bearer ${token}` }
//     })
//     console.log(res.data.data);

//       if (res.data.data.length > 0) {
//       console.log(res.data.data[0].key);
//       setpublicKey(res.data.data[0].publicKey);
//     }
    
    
//       if (res.data.data.length > 0) {
//       console.log(res.data.data[0].key);
//       setsecretKey(res.data.data[0].secretKey);
//     }
//   }catch{
//       toast.error(error.response?.data?.message || "Key generation failed");
//   }
//   }

//  useEffect(() => {
//   fetchpublickey();
// }, []);

//   const fetchpublickey=async()=>{
//     try{
//     const res=await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/keys",{
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//      setApiKeys(res.data.data);
//     if (res.data.data.length > 0) {
//       console.log(res.data.data[0].key);
//     }
    
//     }catch(error){
//     toast.error("failed to load existing api data")
//     }
//   }

//   const copyToClipboard=async(text,type)=>{
//      if (!text) return;
//     try{
//         await navigator.clipboard.writeText(text);
//         setcopied(type);
//         toast.success("Copied to clipboard");
//         setTimeout(()=>setcopied(""),1500);
//     }
//     catch(err){
//         toast.error("Failed to copy")
//     }
//   }

//     const theme = {
//     pageBg: isDarkMode 
//       ? "bg-[#05070f] text-white" : 
//       "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95]",
//     formCard: isDarkMode
//       ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
//       : "bg-white backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",
//     tableHeader: isDarkMode ? "bg-[#1e1b4b]/60 text-purple-300" : "bg-purple-100 text-[#4c1d95]",
//     input: isDarkMode
//       ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
//       : "bg-white/90 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",
//     leftPanel: isDarkMode
//       ? "bg-gradient-to-b from-[#1e1b4b] to-[#0f0c29] border-r border-purple-500/10" 
//       : "bg-[#8b5cf6] text-white", 
//     button: isDarkMode
//       ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
//       : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",
//     textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/90",
//     text:isDarkMode ? "text-white" : "text-black/80",
//   };

//   return (
//     <>   
//     <UserNavbar/>
//      <div
//     className={`relative min-h-screen transition-colors duration-300 ${
//       isDarkMode ? "bg-gray-950 text-white" : "bg-white text-black"
//     }`}
//   >
//  <div className="absolute inset-0 z-0 pointer-events-none">
//              <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
//              <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
             
//              {/* Floating Particles */}
//              <motion.div 
//                animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }} 
//                transition={{ duration: 4, repeat: Infinity }}
//                className="absolute top-1/4 left-10 text-white/40 text-4xl"
//              ><SparkleIcon className="w-8 h-8" /></motion.div>
//         </div>

//         <div className="flex justify-end ">
//             <button 
           
//             className={`${theme.button} px-4 py-2 m-10 rounded font-semibold text-lg sm:text-2xl` }>Generate api key</button>
//         </div>


//         <div className="flex justify-center">
//         <div className={`${theme.formCard} w-[400px] rounded-xl `}>
//            <div className="flex flex-col justify-center">
//            <input 
//            value={keyname}
//            onChange={(e)=>{setkeyname(e.target.value)}}
//            className="border text-lg px-4 py-2 rounded border-black/20 outline-none"
//            type="text"
//            placeholder="Enter the name of the api..."
//             /> 
//                 <div className="flex mt-4 justify-center gap-2 px-3">
//                     <p className="font-semibold text-lg">Public key:</p>
//                     <input
//                     value={publicKey || ""}
//                     readOnly
//                     className="border rounded border-black/40 flex-1"
//                     />
//                     <button
//                     onClick={()=>copyToClipboard(publicKey,"public")}
//                     >
//                     <CopyIcon size={18}/>
//                     </button>
//             </div>
//              <div className="flex mt-4 justify-center gap-2 px-3">
//                     <p className="font-semibold text-lg">Secret key:</p>
//                     <input
//                     type="password"
//                     value={secretKey || ""}
//                     readOnly
//                     className="border rounded border-black/40 flex-1"
//                     />
//                     <button
//                     onClick={()=>copyToClipboard(secretKey,"secret")}
//                     >
//                     <CopyIcon size={18}/>
//                     </button>
//             </div>

//             <button 
//             onClick={getpublicsecretkey}
//             className={`${theme.button} px-4 py-2 m-5 rounded font-semibold text-lg sm:text-2xl` }>Generate</button>
//             </div> 
//         </div>
        
//         </div>
//         <div className="overflow-x-auto mt-10 px-6">
//   <table className="w-full border border-purple-300 rounded-lg overflow-hidden">
//     <thead className={`${theme.tableHeader} `} >
//       <tr>
//         <th className="px-4 py-3 text-left">Name</th>
//         <th className="px-4 py-3 text-left">Public Key</th>
//         <th className="px-4 py-3 text-left">Created At</th>
//         <th className="px-4 py-3 text-center">Actions</th>
//       </tr>
//     </thead>

//     <tbody className={`${theme.formCard}`}>
//       {apiKeys.length === 0 ? (
//         <tr>
//           <td colSpan="4" className="text-center py-6 text-gray-500">
//             No API keys found
//           </td>
//         </tr>
//       ) : (
//         apiKeys.map((item) => (
//           <tr key={item.id} className=" hover:bg-purple-50">
//             <td className={`px-4 py-3 font-semibold ${theme.text}`}>{item.name}</td>

//             <td className="px-4 py-3 flex items-center gap-2">
//               <input
//                 value={item.key}
//                 readOnly
//                 className={`${theme.textSub} px-2 py-1 rounded w-full text-sm`}
//               />
//               <button
//                 onClick={() => copyToClipboard(item.key, "public")}
//                 className={`${theme.text}`}
//               >
//                 <CopyIcon size={16} />
//               </button>
//             </td>

//             <td className={`${theme.text} px-4 py-3 text-sm`}>
//               {new Date(item.createdAt).toLocaleDateString()}
//             </td>

//             <td className="px-4 py-3 text-center">
//               <button
//                 onClick={() => deleteApiKey(item.id)}
//                 className={`px-3 py-1 rounded ${theme.text}`}
//               >
//                 <MdDeleteSweep/>
//               </button>
//             </td>
//           </tr>
//         ))
//       )}
//     </tbody>
//   </table>
// </div>

//     </div>
//     </>
//   )
// }

// export default Apidocumentation



import React, { useEffect, useState } from 'react'
import UserNavbar from '../user/UserNavbar';
import WaveBackground from "../dashboard/WaveBackground";
import { useFormContext } from "../dashboard/FormContext";
import { motion} from "framer-motion";
import axios from 'axios';
import toast from "react-hot-toast";
import { CopyIcon, DeleteIcon } from 'lucide-react';
import { FiDelete } from 'react-icons/fi';
import { MdDeleteSweep } from 'react-icons/md';

  const SparkleIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const Apidocumentation = () => {

  const { isDarkMode } = useFormContext();
  const [keyname,setkeyname]=useState("");
  const token = localStorage.getItem("token");
  const[copied,setcopied]=useState("");
  const[publicKey,setpublicKey]=useState("");
  const[secretKey,setsecretKey]=useState("");
  const [apiKeys, setApiKeys] = useState([]);


  //get public and secret key
  const getpublicsecretkey = async() => {
  try{
    const res=await axios.post("https://formbuilder-saas-backend.onrender.com/api/dashboard/keys" ,{
    name:keyname
    },
    {
     headers: { Authorization: `Bearer ${token}` }
    })
    // console.log(res.data.data);

    //   if (res.data.data.length > 0) {
    //   console.log(res.data.data[0].key);
    //   setpublicKey(res.data.data[0].publicKey);
    // }
    
    
    //   if (res.data.data.length > 0) {
    //   console.log(res.data.data[0].key);
    //   setsecretKey(res.data.data[0].secretKey);


     const newKey = res.data.data;


    console.log(newKey); // {publicKey: "...", secretKey: "..."}

    setpublicKey(newKey.publicKey);
    setsecretKey(newKey.secretKey);
    
      await navigator.clipboard.writeText(newKey.secretKey);

    //  clear keys after 10 seconds
setTimeout(() => {
  setpublicKey("");
  setsecretKey("");
}, 10000);
  fetchpublickey();  


    setkeyname(""); // clear input
    toast.success("API key generated!. Secret key copied automatically. Save it now!");
    }
  catch(error){
      toast.error(error.response?.data?.message || "Key generation failed");
  }
  }

 useEffect(() => {
  fetchpublickey();
}, []);

  const fetchpublickey=async()=>{
    try{
    const res=await axios.get("https://formbuilder-saas-backend.onrender.com/api/dashboard/keys",{
                headers: { Authorization: `Bearer ${token}` }
            })
     setApiKeys(res.data.data);
    if (res.data.data.length > 0) {
      console.log(res.data.data[0].key);
    }
    
    }catch(error){
    toast.error("failed to load existing api data")
    }
  }

  const copyToClipboard=async(text,type)=>{
     if (!text) return;
    try{
        await navigator.clipboard.writeText(text);
        setcopied(type);
        toast.success("Copied to clipboard");
        setTimeout(()=>setcopied(""),1500);
    }
    catch(error){
        toast.error("Failed to copy")
    }
  }
 

  const deleteApiKey = async (id) => {
  try {
    await axios.delete(
      `https://formbuilder-saas-backend.onrender.com/api/dashboard/keys/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setApiKeys((prev) => prev.filter((item) => item.id !== id));
    toast.success("API key deleted");
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete failed");
  }
};



    const theme = {
    pageBg: isDarkMode 
      ? "bg-[#05070f] text-white" : 
      "bg-gradient-to-br from-[#F3E8FF] via-[#ffffff] to-[#D8B4FE] text-[#4c1d95]",
    formCard: isDarkMode
      ? "bg-[#12121a]/80 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_20px_rgba(139,92,246,0.05)]"
      : "bg-white backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",
    tableHeader: isDarkMode ? "bg-[#1e1b4b]/60 text-purple-300" : "bg-purple-100 text-[#4c1d95]",
    // input: isDarkMode
    //   ? "bg-[#05070f] border-purple-500/20 text-white placeholder-gray-600 focus:border-[#8b5cf6] focus:ring-[#8b5cf6]"
    //   : "bg-white/90 border-white/60 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:border-[#8b5cf6] focus:ring-[#8b5cf6] focus:bg-white/80",

    input: isDarkMode
  ? "bg-[#05070f] text-white placeholder-gray-600 focus:ring-[#8b5cf6]"
  : "bg-white/90 text-[#4c1d95] placeholder-[#4c1d95]/50 focus:ring-[#8b5cf6] focus:bg-white/80",

    leftPanel: isDarkMode
      ? "bg-gradient-to-b from-[#1e1b4b] to-[#0f0c29] border-r border-purple-500/10" 
      : "bg-[#8b5cf6] text-white", 
    button: isDarkMode
      ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
      : "bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white hover:shadow-lg hover:shadow-purple-500/30",
    textSub: isDarkMode ? "text-gray-400" : "text-[#4c1d95]/90",
    text:isDarkMode ? "text-white" : "text-black/80",
  };

  return (
    <>   
    <UserNavbar/>
     <div
    className={`relative min-h-screen transition-colors duration-300 ${
      isDarkMode ? "bg-gray-950 text-white" : "bg-white text-black"
    }`}
  >
 <div className="absolute inset-0 z-0 pointer-events-none">
             <WaveBackground position="top" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
             <WaveBackground position="bottom" height="h-100" color={isDarkMode ? "#1e1b4b" : "#a78bfa"} />
             
             {/* Floating Particles */}
             <motion.div 
               animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }} 
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute top-1/4 left-10 text-white/40 text-4xl"
             ><SparkleIcon className="w-8 h-8" /></motion.div>
        </div>

        <div className="flex justify-end ">
            <button 
           
            className={`${theme.button} px-4 py-2 m-10 rounded font-semibold text-lg sm:text-2xl `}>Generate api key</button>
        </div>


        <div className="flex justify-center">
        <div className={`${theme.formCard} w-[400px] rounded-xl `}>
           <div className="flex flex-col justify-center">
           <input 
           value={keyname}
           onChange={(e)=>{setkeyname(e.target.value)}}
           className="border text-lg px-4 py-2 rounded border-black/20 outline-none"
           type="text"
           placeholder="Enter the name of the api..."
            /> 
                <div className="flex mt-4 justify-center gap-2 px-3">
                    <p className="font-semibold text-lg">Public key:</p>
                    <input
                    value={publicKey || ""}
                    readOnly
                    placeholder=' publickey'
                     className={`${theme.input} flex-1 border border-gray-400 focus:border-purple-500`}

                    />
                    <button
                    onClick={()=>copyToClipboard(publicKey,"public")}
                    >
                    <CopyIcon size={18}/>
                    </button>
            </div>
             <div className="flex mt-4 justify-center gap-2 px-3">
                    <p className="font-semibold text-lg">Secret key:</p>
                    <input
                    type="password"
                    value={secretKey || ""}
                    placeholder=' secretkey'
                    readOnly
                    className={`${theme.input} flex-1 border border-gray-400 focus:border-purple-500`}

                    />
                    <button
                    onClick={()=>copyToClipboard(secretKey,"secret")}
                    >
                    <CopyIcon size={18}/>
                    </button>
            </div>

                 <button 
            onClick={getpublicsecretkey}
            className={`${theme.button} px-4 py-2 m-5 rounded font-semibold text-lg sm:text-2xl `}>Generate</button>
            
        </div>
        
            </div> 
        </div>
        
        
        <div className="overflow-x-auto mt-10 px-6">
  <table className="w-full border border-purple-300 rounded-lg overflow-hidden">
    <thead className={`${theme.tableHeader} `} >
      <tr>
        <th className="px-4 py-3 text-left">Name</th>
        <th className="px-4 py-3 text-left">Public Key</th>
        <th className="px-4 py-3 text-left">Created At</th>
        <th className="px-4 py-3 text-center">Actions</th>
      </tr>
    </thead>

    <tbody className={`${theme.formCard}`}>
      {apiKeys.length === 0 ? (
        <tr>
          <td colSpan="4" className="text-center py-6 text-gray-500">
            No API keys found
          </td>
        </tr>
      ) : (
        apiKeys.map((item) => (
          <tr key={item.id || item._id}
 className=" hover:bg-purple-50">
            <td className={`px-4 py-3 font-semibold ${theme.text}`}>{item.name}</td>

            <td className="px-4 py-3 flex items-center gap-2">
              <input
                value={item.key}
                readOnly
                className={`${theme.textSub} px-2 py-1 rounded w-full text-sm`}
              />
              <button
                onClick={() => copyToClipboard(item.key, "public")}
                className={`${theme.text}`}
              >
                <CopyIcon size={16} />
              </button>
            </td>

            <td className={`${theme.text} px-4 py-3 text-sm`}>
              {new Date(item.createdAt).toLocaleDateString()}
            </td>

            <td className="px-4 py-3 text-center">
              <button
                onClick={() => deleteApiKey(item.id)}
                className={`px-3 py-1 rounded ${theme.text}`}
              >
                <MdDeleteSweep/>
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

    </div>
    </>
  )
}

export default Apidocumentation