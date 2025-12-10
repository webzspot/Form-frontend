import React, { useState } from 'react'
import { FaChartPie,FaPlug,FaMousePointer,FaMobile,FaShieldAlt } from "react-icons/fa";
import {MdOutlinePalette} from "react-icons/md";
import { motion,AnimatePresence } from "framer-motion";

const About = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const features = [
  {
    icon: <FaMousePointer />,
    title: "Drag & Drop Builder",
    text: "Intuitve visual editor that makes form creation effortless. Simply drag elements and customize to your needs."
  },
  {
    icon: <MdOutlinePalette />,
    title: "Custom Branding",
    text: "Make your brand perfectly with custom colors, fonts, logos, and themes. Make every form uniquely yours."
  },
 
  {
    icon: <FaChartPie />,
    title: "Real-time Analytics",
    text: "Track form submissions, conversion rates, and user behavior with powerful analytics tools."
  },
   
  {
    icon: <FaPlug />,
    title: "Seamless Integrations",
    text: "Connect with 1000+ apps including Slack, Google Sheets, Mailchimp, Zapier, and more."
  },
  {
    icon: < FaShieldAlt/>,
    title: "Enterprise Security",
    text: "Bank-level encryption, GDPR compliance, and advanced security features to protect your data."
  },
  {
    icon: <FaMobile />,
  
    title: "Mobile Responsive",
    text: "Forms that look perfect on any device. Optimized for desktop, tablet, and mobile experiences."
  }
 
];

    const testimonials = [
  {
    stars: "★★★★★",
    text: "FormCraft transformed how we collect customer feedback. The analytics are incredible!",
    name: "Sarah Johnson",
    role: "Managing Director",
    img: "/img1.jpeg"
  },
  {
    stars: "★★★★★",
    text: "Best form builder we've used. The integrations save us hours every week.",
    name: "Michael Chen",
    role: "Product Manager",
    img: "/img2.jpeg"
  },
  {
    stars: "★★★★★",
    text: "Simple, powerful, and beautiful. FormCraft is a game-changer for our business.",
    name: "Emily Rodriguez",
    role: "CEO",
    img: "/img3.jpeg"
  }
];
    const aboutform=[
      {
        heading:"50K+",
        text:"Active Users"
},
{
        heading:"2M+",
        text:"Forms Created"
},
{
        heading:"99.9%",
        text:"Uptime"
},
{
        heading:"24/7",
        text:"Support"
}
    ]
  const[index,setIndex]=useState(0)
  const prev = () =>{
      setHasInteracted(true);

  setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);}
const next = () =>{
    setHasInteracted(true);

  setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);}

const prevIndex = (index - 1 + testimonials.length) % testimonials.length;
const nextIndex = (index + 1) % testimonials.length;
return (
    <div className="bg-purple-100 pb-6">
         <div className='flex gap-4  justify-evenly  p-6'>
              {
                aboutform.map((item,index)=>
                <div key={index} className='flex flex-col '>
                  <h1 className=' text-lg md:text-3xl font-bold text-purple-800 text-center'>{item.heading}</h1>
                  <p className=' text-sm md:text-base text-gray-600 text-center'>{item.text}</p>

                  </div>
                  
                  )
              }
            </div>
    {/*Features */}
        <div className='bg-purple-50  p-2'>
            <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}>
  <div   className='bg-purple-500 rounded-full p-1 w-fit mt-6 flex flex-col justify-center items-center mx-auto'>
    <p className='text-white text-sm text-center p-2'>Powerful Features</p>
  </div>
<h2 className='text-2xl mt-4 font-bold text-center'>
    Everything You Need to Build{" "}
    <span className='relative bg-gradient-to-r bg-clip-text text-transparent from-purple-600 via-purple-800 to-violet-950 '>
      Amazing Forms
      <img
      src="/Line Image.png" 
      alt="underline"
      className="absolute left-0 -bottom-1 w-full h-auto"
    />
    </span>
  </h2>
<p className='text-gray-500 text-center mt-4'>
    From simple contact forms to complex surveys, our platform has all the tools you need.
  </p>
</motion.div>

<div className='grid grid-cols-1 md:grid-cols-2   mt-4 lg:grid-cols-3   justify-items-center p-4 gap-4 max-w-4xl lg:max-w-4xl md:max-w-2xl  mx-auto'>
            
             {
              features.map((item,index)=> 
< motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40,rotate: -3, scale: 0.95 }} whileInView={{opacity: 1, 
      x: 0,
      rotate: 0,         
        scale: 1  
    }}

    transition={{ 
      duration: 0.5, 
      delay: index * 0.1 
    }}

    viewport={{ once:true}}
                className='bg-white p-2 shadow-md h-56   shadow-gray-400 rounded-xl w-64 md:w-72 lg:w-64'>
            <div className='w-8 h-8 m-4  rounded-md  bg-purple-200 text-purple-800 p-2  flex justify-center items-center'>{item.icon}</div>
              
                <h1 className='text-lg font-semibold m-4'>{item.title}</h1>
                <p className='text-sm text-gray-600 m-4'>{item.text}</p>
                 </motion.div>
              )

        }
             </div>
           </div>
           {/*Testimonals */}
           <div className=' max-w-2xl lg:max-w-7xl  mx-auto rounded-xl p-2 mt-6 '>
             <h1 className=' text-lg md:text-2xl font-bold text-center m-4'>Trusted by Teams Worldwide</h1>
             <p className=' text-sm md:text-base text-gray-600 text-center'>See what our customers are saying about FormCraft</p>
         
<div className="hidden lg:flex justify-center items-center mt-6 overflow-hidden h-[260px] ">

      {/* Previous card */}
      <div className="rounded-xl p-4 w-60 scale-95 flex-shrink-0 flex min-h-[200px]
 flex-col mx-4 opacity-50 ">
        
        <p className="mt-2 text-sm text-left">{testimonials[prevIndex].text}</p>
        <div className="flex gap-2 mt-2 ">
          <img src={testimonials[prevIndex].img} className="rounded-full  w-10 h-10 object-cover" />
          <div className="flex flex-col">
            <h4 className="font-bold">{testimonials[prevIndex].name}</h4>
            <p className="text-sm">{testimonials[prevIndex].role}</p>
            <p className="text-yellow-500 text-lg">{testimonials[prevIndex].stars}</p>
          </div>
        </div>
      </div>

      {/* Middle card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonials[index].name}
          initial={hasInteracted ? { x: 100, opacity: 0 } : { x: 0, opacity: 1 }}
  animate={hasInteracted ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
  exit={hasInteracted ? { x: -100, opacity: 0 } : { x: 0, opacity: 1 }}

  transition={{ duration: 0.3, ease: "easeInOut" }}

          className="bg-white rounded-xl p-6 w-64 flex-shrink-0 min-h-[200px]
 flex flex-col z-10 shadow-md shadow-purple-400 mx-4"
        >
         
          <p className="mt-2 text-base text-left">{testimonials[index].text}</p>
          <div className="flex gap-2 mt-2  ">
            <img src={testimonials[index].img} className="rounded-full w-12  h-12 object-cover flex-shrink-0" />
            <div className="flex flex-col">
              <h4 className="font-bold">{testimonials[index].name}</h4>
              <p className="text-sm">{testimonials[index].role}</p>
               <p className="text-yellow-500  text-lg">{testimonials[index].stars}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next card */}
      <div className="rounded-xl p-4 w-60 scale-95 min-h-[200px]
 flex-shrink-0 flex flex-col mx-4 opacity-50">
      
        <p className="mt-2 text-sm text-left">{testimonials[nextIndex].text}</p>
        <div className="flex gap-2 mt-2">
          <img src={testimonials[nextIndex].img} className="rounded-full  w-10 h-10 object-cover" />
          <div className="flex flex-col">
            <h4 className="font-bold">{testimonials[nextIndex].name}</h4>
            <p className="text-sm">{testimonials[nextIndex].role}</p>
              <p className="text-yellow-500  text-lg">{testimonials[nextIndex].stars}</p>
          </div>
        </div>
      </div>
      {/* Arrows */}
  
      
    </div>
    <div className=" hidden lg:flex   gap-6 justify-center items-center mt-4">
    <button
      onClick={prev}
      className="bg-purple-600 text-white w-10 h-10  rounded-full flex justify-center items-center shadow"
    >
      ‹
    </button>

    <button
      onClick={next}
      className="bg-purple-600 text-white w-10 h-10 rounded-full flex justify-center items-center shadow"
    >
      ›
    </button>
  </div>
  



{/* Mobile and Tab Carousel */}
<div className="flex lg:hidden  flex-col items-center mt-6 relative ">

  <motion.div
     key={index}
           initial={hasInteracted ? { x: 100, opacity: 0 } : { x: 0, opacity: 1 }}
  animate={hasInteracted ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
  exit={hasInteracted ? { x: -100, opacity: 0 } : { x: 0, opacity: 1 }}
  transition={{ duration: 0.2, ease: "easeInOut" }}
    className="bg-gray-100 h-44 rounded-xl p-4 w-64 mx-6 shadow-md shadow-purple-400 "
  >
    
    <p className="mt-2 text-sm text-left">{testimonials[index].text}</p>

    <div className="flex gap-2 mt-2  ">
      <img src={testimonials[index].img} className="rounded-full  w-10 h-10 object-cover flex-shrink-0" />
      <div className="flex flex-col ">
        <h4 className="font-bold">{testimonials[index].name}</h4>
        <p className="text-sm">{testimonials[index].role}</p>
        <p className="text-yellow-500  text-lg">{testimonials[index].stars}</p>
      </div>
    </div>
  </motion.div>

  {/* Arrows */}
  <div className="flex gap-6 mt-4 justify-center items-center">
    <button
      onClick={prev}
      className="bg-purple-600 text-white w-8 h-8 rounded-full flex justify-center items-center shadow"
    >
      ‹
    </button>

    <button
      onClick={next}
      className="bg-purple-600 text-white w-8 h-8 rounded-full flex justify-center items-center shadow"
    >
      ›
    </button>
  </div>

</div>
</div>
   </div>
   
  )
}

export default About