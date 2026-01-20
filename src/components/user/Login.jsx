import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Rocket, Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  
  // Form State
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Testimonial State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // --- TOAST HANDLER ---
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // --- HANDLE SUBMIT ---
  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please fill all the fields", "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://formbuilder-saas-backend.onrender.com/api/users/login",
        { email, password }
      );

      const { token, user } = response.data;
      
      // Save to Local Storage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("Name", user.name);

      showToast("Login Successful!", "success");

      // Redirect Logic
      setTimeout(() => {
        if (user.role === "ADMIN") {
          navigate("/admindashboard");
        } else {
          navigate("/home");
        }
      }, 1000);

    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Invalid credentials. Please try again.";
      showToast(errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // --- TESTIMONIAL DATA ---
  const testimonials = [
    {
      id: 1,
      name: "Alex Morgan",
      initials: "AM",
      text: "Secure, fast and easy to use. Exactly what I needed!",
      color: "from-violet-400 to-purple-500"
    },
    {
      id: 2,
      name: "Michael Chen",
      initials: "MC",
      text: "Logging in and managing my forms has never been smoother.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      id: 3,
      name: "Sophia Lee",
      initials: "SL",
      text: "The dashboard analytics helped me grow my business 10x.",
      color: "from-pink-400 to-rose-500"
    }
  ];

  // --- TESTIMONIAL ROTATION EFFECT ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // --- ANIMATION VARIANTS ---
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const floatingAnimation = (duration) => ({
    y: [0, -30, 0],
    transition: { duration: duration, repeat: Infinity, ease: "easeInOut" },
  });

  const heading = "Welcome Back to Stellar.";

  return (
    <div className="relative min-h-screen flex bg-white">
      
      {/* --- TOAST COMPONENT --- */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border ${
              toast.type === "success" 
                ? "bg-white border-green-500/20 text-green-700" 
                : "bg-white border-red-500/20 text-red-600"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
            <p className="text-sm font-semibold">{toast.message}</p>
            <button onClick={() => setToast({ ...toast, show: false })} className="ml-2 hover:bg-gray-100 rounded-full p-1">
               <X className="w-4 h-4 text-gray-400" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LEFT SECTION --- */}
      <div className="relative flex-1 px-8 lg:px-12 py-8 hidden md:flex flex-col justify-between overflow-hidden bg-[#0b0331]">
        
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={floatingAnimation(3)} className="absolute top-20 right-20 w-48 h-48 bg-violet-400/40 rounded-full blur-3xl" />
          <motion.div animate={floatingAnimation(4)} className="absolute bottom-40 left-10 w-40 h-40 bg-indigo-400/40 rounded-full blur-3xl" />
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -15, 0] }}
              transition={{ duration: 2 + i, repeat: Infinity }}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{ left: `${10 + (i * 7)}%`, top: `${20 + (i % 4) * 20}%` }}
            />
          ))}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-96 h-96 border border-violet-400/20 rounded-full" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full text-white">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl lg:text-3xl flex items-center gap-3 font-bold">
            <div className="w-10 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Rocket className="w-5 h-5" />
            </div>
            <span>Stellar</span>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-md">
            <h1 className="flex flex-wrap text-3xl lg:text-4xl font-bold leading-tight">
              {heading.split(" ").map((word, index) => (
                <motion.span key={index} variants={itemAnimation} className="mr-2">{word}</motion.span>
              ))}
            </h1>
            <motion.p variants={itemAnimation} className="text-sm lg:text-base text-white/60 mt-4 leading-relaxed">
              Log in to continue your journey and access your personalized dashboard.
            </motion.p>
          </motion.div>

          {/* ROTATING TESTIMONIAL SECTION */}
          <div className="h-32 w-full max-w-md relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentTestimonial].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonials[currentTestimonial].color} flex items-center justify-center text-xs font-bold shadow-lg`}>
                    {testimonials[currentTestimonial].initials}
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium leading-relaxed italic">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <p className="text-white/50 text-xs mt-1">- {testimonials[currentTestimonial].name}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* --- RIGHT SECTION (Form) --- */}
      <div className="flex-1 flex flex-col px-6 sm:px-12 justify-center bg-gray-50">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-md mx-auto">
          
          <div className="mb-8 mt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-2">Please enter your details.</p>
          </div>

          <form onSubmit={handlesubmit} className="space-y-5">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="w-full px-12 py-2 mt-1 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all text-gray-900 shadow-sm"
                  type="email"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                 <label className="text-sm font-medium text-gray-700">Password</label>
                 {/* Optional: Add Forgot Password link here later */}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="w-full px-12 py-2 mt-1 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-600 transition-all text-gray-900 shadow-sm"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={`w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-lg 
                ${isLoading 
                  ? "bg-violet-400 cursor-not-allowed" 
                  : "bg-violet-600 hover:bg-violet-700 hover:scale-[1.01] shadow-violet-500/20"
                }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-4 text-gray-500">or</span>
            </div>
          </div>

          <p className="text-center text-gray-600 mb-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-violet-600 font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;