import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Rocket } from 'lucide-react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';



const Register = () => {

 const navigate = useNavigate();
 const [name,setname]=useState("");
 const [email,setemail]=useState("");
 const [password,setpassword]=useState("");
 const [nodataerror,setnodataerror]=useState("");
 const [sucessmessage,setsucessmessage]=useState(false);
 const [errormessage,seterrormessage]=useState(false);


 const handlesubmit=async(e)=>{
 e.preventDefault();

if(!name || !email || !password){
  setnodataerror("Please Fill All The Fields")
  return;
}
setnodataerror("");

const response=await axios.post("https://formbuilder-saas-backend.onrender.com/api/users/register" ,{
  name:name,
  email:email,
  password:password,
})

navigate("/login")


 }



// ANIMATION
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const wordAnimation = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const heading = "Start Your Journey With Us.";



  return (


    <div className="relative h-screen flex">


      {/* introduction */}
      

  <div className="relative flex-1 px-12 py-6 hidden sm:flex flex-col justify-between rounded-2xl bg-[#0b0331]">
   
 

  <div className="relative z-10 flex flex-col justify-between h-full text-white pointer-events-none">

            <div className='text-3xl flex items-center gap-2 font-bold text-white'>
            < Rocket className="text-violet-500 font-bold"/>
              <h1>Stellar</h1>
            </div>

            <div className="w-[90%]">
             <motion.h1
               variants={container}
               initial="hidden"
               animate="show"
              className="text-white text-4xl py-2 font-bold flex flex-wrap">
             {heading.split(" ").map((word, index) => (
            <motion.span
             key={index}
             variants={wordAnimation}
             className="mr-2 inline-block"> {word}  </motion.span> ))} </motion.h1>

              <p className="text-sm  text-white/60">Discover a new world of possibilities.Create your
                account to unlock exclusive features and content.
              </p>
            </div>

            <div >
            
              <h1 className='text-white text-sm font-bold py-1 '>"This platform changed my workflow completely.Highly recommended!"</h1>
              <p className='text-white/60 text-sm'>-Sarah johnson</p>
            </div>
 
        </div>

       
        </div>

        {/* Register */}
        <div className='flex-1 flex flex-col px-12 justify-center gap-2 rounded-2xl'>

          <div className="my-4">

           <h1 className='text-xl font-bold text-center'>Create an Account</h1>
           <p className='text-sm text-center text-black/60'>Let's get you started!</p>

          </div>
        
        {/* inputfields */}
        <form>
        <div className='space-y-4'>

            <div>
            <label className='text-sm'>Full Name</label>
            <input 
           value={name}
           onChange={(e)=>setname(e.target.value)}
            className='border my-1 border-black/20 shadow-2xl w-full rounded-lg px-2 py-1 focus:outline-none' 
            type="text" 
            placeholder="John Doe"/>
          </div>

            <div >
            <label className='text-sm'>Email Address</label>
            <input 
           value={email}
           onChange={(e)=>setemail(e.target.value)}
            className='border my-1 border-black/20 rounded-lg shadow-2xl w-full px-2 py-1 focus:outline-none' 
             type="email" 
             placeholder="you@example.com"/>
          </div>

            <div>
            <label className='text-sm'>Password</label>
            <input
             value={password}
           onChange={(e)=>setpassword(e.target.value)}
            className='border my-1 border-black/20 rounded-lg shadow-2xl w-full px-2 py-1 focus:outline-none' 
            type="password" 
            placeholder="••••••••"/>
          </div>
         
         {/* error message */}
         <div>
          {nodataerror &&(
            <p className="text-red-500 py-2 font-semibold">{nodataerror}</p>
          )}
         </div>
        </div>

        {/* button */}

  <div>
    <button 
      disabled={sucessmessage}
    onClick={handlesubmit}
    type="submit"
        className={`my-3 w-full py-2 rounded ${
                sucessmessage
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-violet-700 text-white"
              }`}
            >
      Create Account</button>
  </div>  
  </form>

  {/* authetication */}
   
   <div className="text-black/20" >
   
   <hr />
 
  </div>



  {/* login */}

  <h1 className='text-center'>Already have an account?<Link to={"/login"} className="text-violet-600 font-bold">Sign in</Link></h1>

        </div>


 
        </div>
   
  )
}

export default Register 