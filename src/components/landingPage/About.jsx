import React, { useState } from 'react'
import { FaChartPie,FaPlug,FaMousePointer } from "react-icons/fa";
import { motion,AnimatePresence } from "framer-motion";

const About = () => {
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
  const[index,setIndex]=useState(0)
  const prev = () =>{
  setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);}

const next = () =>{
  setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);}

const prevIndex = (index - 1 + testimonials.length) % testimonials.length;
const nextIndex = (index + 1) % testimonials.length;
return (
    <div className='bg-gray-200 pb-6 '>
        {/*Features */}
        <div className='flex flex-col  md:flex-row items-center justify-center gap-4  '>
            <div className='bg-white p-2 m-4 shadow-md  shadow-gray-400 rounded-xl w-64'>
            <div className='w-8 h-8 m-4 rounded-md bg-blue-500 text-white flex justify-center items-center'><FaMousePointer/></div>
              
                <h1 className='text-lg font-semibold m-4'>Drag & Drop Builder</h1>
                <p className='text-sm text-gray-600 m-4'>Create stunning forms with our intuitive drag-and-drop interface. No coding skills required.</p>
                 </div>
                 <div className='bg-white p-2  m-4 shadow-md  shadow-gray-400 rounded-xl w-64'>
                    <div className='w-8 h-8  m-4 rounded-md bg-green-500 text-white flex justify-center items-center'><FaChartPie/></div>
                    <h1 className='text-lg font-semibold m-4'>Real-time Analytics</h1>
                <p className='text-sm text-gray-600 m-4'>Track form submissions, conversion rates, and user behavior with powerful analytics tools.</p>
</div>
         <div className='bg-white p-2 m-4 shadow-md  shadow-gray-400 rounded-xl w-64'>
             <div className='w-8 h-8 m-4 rounded-md bg-purple-500 text-white flex justify-center items-center'><FaPlug/></div>
             <h1 className='text-lg font-semibold m-4'>100+ Integrations</h1>
                <p className='text-sm text-gray-600 m-4'>Connect with your favorite tools including CRM, email marketing, and payment platforms.
</p>
                         
         </div>
        </div>
           {/*Testimonals */}
           <div className='bg-white max-w-2xl lg:max-w-5xl  mx-auto rounded-xl p-2 mt-6 shadow-md shadow-gray-400  '>
             <h1 className='text-xl font-bold text-center m-4'>Trusted by Teams Worldwide</h1>
             <p className='text-base text-gray-600 text-center'>See what our customers are saying about FormCraft</p>
         
<div className="hidden lg:flex items-center justify-center mt-6 relative">

      {/* Previous card */}
      <div className="rounded-xl p-4 w-60 scale-95 flex-shrink-0 flex flex-col mx-4 opacity-50">
        <p className="text-yellow-500 mt-2 text-lg">{testimonials[prevIndex].stars}</p>
        <p className="mt-2 text-sm">{testimonials[prevIndex].text}</p>
        <div className="flex gap-2 mt-4 items-center">
          <img src={testimonials[prevIndex].img} className="rounded-full w-10 h-10 object-cover" />
          <div className="flex flex-col">
            <h4 className="font-bold">{testimonials[prevIndex].name}</h4>
            <p className="text-sm">{testimonials[prevIndex].role}</p>
          </div>
        </div>
      </div>

      {/* Middle card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonials[index].name}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="bg-gray-300 rounded-xl p-6 w-64 flex-shrink-0 flex flex-col z-10 shadow-lg mx-4"
        >
          <p className="text-yellow-500 mt-2 text-lg">{testimonials[index].stars}</p>
          <p className="mt-2 text-base">{testimonials[index].text}</p>
          <div className="flex gap-2 mt-2 items-center">
            <img src={testimonials[index].img} className="rounded-full w-10 h-10 object-cover" />
            <div className="flex flex-col">
              <h4 className="font-bold">{testimonials[index].name}</h4>
              <p className="text-sm">{testimonials[index].role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next card */}
      <div className="rounded-xl p-4 w-60 scale-95 flex-shrink-0 flex flex-col mx-4 opacity-50">
        <p className="text-yellow-500 mt-2 text-lg">{testimonials[nextIndex].stars}</p>
        <p className="mt-2 text-sm">{testimonials[nextIndex].text}</p>
        <div className="flex gap-2 mt-4 items-center">
          <img src={testimonials[nextIndex].img} className="rounded-full w-10 h-10 object-cover" />
          <div className="flex flex-col">
            <h4 className="font-bold">{testimonials[nextIndex].name}</h4>
            <p className="text-sm">{testimonials[nextIndex].role}</p>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={prev} className="absolute -left-10 top-1/2 -translate-y-1/2 bg-gray-600 text-white px-3 py-2 rounded-full shadow">&lt;</button>
      <button onClick={next} className="absolute -right-10 top-1/2 -translate-y-1/2 bg-gray-600 text-white px-3 py-2 rounded-full shadow">&gt;</button>
    </div>
  



{/* Mobile and Tab Carousel */}
<div className="flex lg:hidden  flex-col items-center mt-6 relative text-center">

  <motion.div
     key={index}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut"}}
    className="bg-gray-100 rounded-xl p-4 w-72 mx-6 shadow"
  >
    <p className="text-yellow-500 mt-2 text-lg">{testimonials[index].stars}</p>
    <p className="mt-2 text-sm">{testimonials[index].text}</p>

    <div className="flex gap-3 mt-4 items-center justify-center">
      <img src={testimonials[index].img} className="rounded-full w-10 h-10 object-cover" />
      <div className="flex flex-col">
        <h4 className="font-bold">{testimonials[index].name}</h4>
        <p className="text-sm">{testimonials[index].role}</p>
      </div>
    </div>
  </motion.div>

  {/* Arrows */}
  <div className="flex gap-6 mt-4">
    <button
      onClick={prev}
      className="bg-gray-600 text-white w-8 h-8 rounded-full flex justify-center items-center shadow"
    >
      ‹
    </button>

    <button
      onClick={next}
      className="bg-gray-600 text-white w-8 h-8 rounded-full flex justify-center items-center shadow"
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