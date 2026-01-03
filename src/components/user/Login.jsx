import { Link } from "react-router-dom";
import React, { useState, useEffect} from "react";
import axios from "axios"
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [loginemail, setloginemail] = useState("");
  const [loginpassword, setloginpassword] = useState("");
  const [error, seterror] = useState("");
  const [loginsucessmsg,setloginsucessmsg]=useState(false);
  const [loginerrormsg,setloginerrormsg]=useState(false);
  const [message,setmessage]=useState([]);
  const navigate=useNavigate();

  const handleSubmit =async(e) => {
 
    e.preventDefault();

    seterror("");

    if (!loginemail || !loginpassword) {
      seterror("Please fill all the fields");
      return;
    }

    try{
  const response=await axios.post("https://formbuilder-saas-backend.onrender.com/api/users/login" , 
   {
    email:loginemail,
    password:loginpassword
  })
    console.log(response)
  const role=response.data.user.role

if(role=="ADMIN"){
  navigate("/dashboard")
}
 
  const {token}=response.data;
  localStorage.setItem("token",token);
  setloginsucessmsg(true);
  setloginerrormsg(false);
  

    } catch(err){
    setmessage(err.response.data.message);
   
    }
  };

const handlecontinue=()=>{
  navigate("/home")
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

const heading = "Welcome Back to Stellar.";

  return (
    <div className="relative h-screen flex">

      {/* LEFT SECTION */}
      <div className="relative flex-1 px-12 py-6 hidden sm:flex flex-col justify-between rounded-2xl bg-[#0b0331]">
          
  
        <div className="relative z-10 flex flex-col justify-between h-full text-white">

          <div className="text-3xl flex items-center gap-2 font-bold">
            <Rocket className="text-violet-500" />
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

            <p className="text-sm text-white/60">
              Log in to continue your journey and access your personalized dashboard.
            </p>
          </div>

          <div>
            <h1 className="text-white text-sm font-bold py-1">
              "Secure, fast and easy to use. Exactly what I needed!"
            </h1>
            <p className="text-white/60 text-sm">- Alex Morgan</p>
          </div>

        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex-1 flex flex-col px-12 justify-center gap-2 rounded-2xl">

        <div className="my-4">
          <h1 className="text-xl font-bold text-center">Login to your Account</h1>
          <p className="text-sm text-center text-black/60">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">

            <div>
              <label className="text-sm">Email Address</label>
              <input
                value={loginemail}
                onChange={(e) => setloginemail(e.target.value)}
                className="border my-1 rounded-lg border-black/20 shadow-2xl w-full px-2 py-1 focus:outline-none"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm">Password</label>
              <input
                value={loginpassword}
                onChange={(e) => setloginpassword(e.target.value)}
                className="border my-1 rounded-lg border-black/20 shadow-2xl w-full px-2 py-1 focus:outline-none"
                type="password"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-500 py-2 font-semibold">{error}</p>
            )}

            {message &&(
              <p className="text-red-500 py-2 font-semibold">{message}</p>
            )}
          </div>

          <button
          onClick={handleSubmit}
            type="submit"
            className="my-3 w-full py-2 rounded bg-violet-700 text-white"
          >
            Login
          </button>
        </form>

        <div className="text-black/20">
          <hr />
        </div>

        <h1 className="text-center">
          Don’t have an account?
          <Link to="/register" className="text-violet-600 font-bold ml-1">
            Sign up
          </Link>
        </h1>

      </div>
    { loginsucessmsg &&
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white space-y-5 px-4 py-5 rounded w-4/5 sm:w-3/5 lg:w-2/5 text-center shadow-xl"
    >
    

      <h1 className="font-semibold text-xl ">Sucess!</h1>
      <p className="text-sm text-black/70">Your action has been completed succesfully.
        All changes have been saved and you're all set to continue.</p>

        <div className="flex flex-wrap gap-6 justify-center">
   

           <button
            onClick={handlecontinue}
             className="bg-violet-600 text-white px-4 py-1 rounded"
          
            >
              Continue
            </button>
            {/* </Link> */}

         <button onClick={() => setloginsucessmsg(false)}
           className="bg-white/30 text-black/50 px-2 py-1 rounded">Dismiss</button>
       
        </div>
       </motion.div>
       </div>
}

  { loginerrormsg &&
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white space-y-5 px-4 py-5 rounded w-4/5 sm:w-3/5 lg:w-2/5 text-center shadow-xl"
    >
      

      <h1 className="font-semibold text-xl ">Error</h1>
      <p className="text-sm text-black/70">New to Stellar?Register first and then login.</p>

        <div className="flex flex-wrap gap-6 justify-center">
 
 <Link to={"/register"}>
           <button
             className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Try Again
            </button>
            </Link>

       <button onClick={() => setloginerrormsg(false)}
           className="bg-white/30 text-black/50 px-2 py-1 rounded">Dismiss</button>
       
        </div>
       </motion.div>
       </div>
}

    </div>
  );
};

export default Login;
