import React from 'react'
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
const Testimonials = () => {


    const testimonials = [
  {
    quote: "We replaced three tools with FormCraft. The builder is intuitive and the analytics actually help us make decisions.",
    name: "Emily Rodriguez",
    role: "Head of Growth",
    company: "Acme Corp",
    initials: "ER",
    color: "#10B77F1A", 
    textColor: "#10B77F" 
  },
  {
    quote: "Our form completion rate jumped 40% after switching. The UX of the forms themselves makes a real difference.",
    name: "Sarah Johnson",
    role: "Product Lead",
    company: "Basecamp",
    initials: "SJ",
    color: "#EEF2FF",
    textColor: "#594DE6"
  },
  {
    quote: "Finally a form tool that doesn't look like it was built in 2012. Our brand stays consistent across every touchpoint.",
    name: "Michael Chen",
    role: "Design Director",
    company: "Linear",
    initials: "MC",
    color: "#EFF6FF", 
    textColor: "#2A6DF4"
  }
];
  return (
    <>
         {/*Testimonials Section*/}
            
            <section id="testimonials" className='py-20 md:py-26 relative  w-full  bg-[#F3F4F680]'>
              <div className='max-w-7xl mx-auto px-4 md:px-6'>
        
                {/*Paragraph Section */}
                <motion.div 
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: false, amount: 0.2 }}
   className='flex flex-col items-start'>
                  <p className="text-[#10B77F]  font-['DM_Sans']  font-semibold text-sm leading-5 tracking-widest align-middle uppercase">Testimonials</p>
                  <h2 className="font-bold font-['Space_Grotesk'] text-4xl max-w-md mt-4 leading-11 tracking-tighter align-middle text-[#14181F]">Loved by teams who care about quality</h2>
                </motion.div>  
        
        
        
        
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 '>
        
                  {
                    testimonials.map((item,index)=>{
                      return(
                        <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
       viewport={{ once: false, amount: 0.1 }}
                        key={index}
                        style={{ 
                '--hover-col': `color-mix(in srgb, ${item.textColor}, transparent 80%)` 
              }}
                        className='flex flex-col w-full p-8 min-h-72 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] transition-all duration-300 group hover:border-(--hover-col)'>
                        
        
                        <div className="text-[#10B77F33] text-2xl">
            <FaQuoteLeft />
          </div>
                          <div className="flex gap-1 mt-4 ">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className="w-3 h-3   text-[#F59F0A]" 
              />
            ))}
          </div>
        
        
          {/* Testimonial Quote */}
        <p 
          className="text-[#14181F] font-['DM_Sans'] font-normal text-base leading-6 mt-4 max-w-72 min-h-16"
        >
          {item.quote}
        </p>
        
        
        
          <div className="border-t border-[#E5E7EB]  mt-7 pt-6 ">
        
            <div className='flex items-center gap-3'>
              <div className="rounded-full w-10 h-10  font-['DM_Sans'] flex justify-center items-center font-bold text-sm"
              style={{ backgroundColor: item.color, color: item.textColor }}>
                      {item.initials}
                </div>
        
        
                <div className="flex flex-col font-['DM_Sans']">
                  <p className="text-[#14181F] text-sm font-semibold  leading-relaxed align-middle " >{item.name}</p>
                  <p className="text-[#737B8C] text-sm font-normal leading-normal align-middle">{item.role} · {item.company}</p>
                  </div>
        
              </div>
        
          </div>
                          </motion.div>
                      )
                    })
                  }
        
                </div>
        
        
        
        
        
        
        
        
        
              </div>
            </section>

    </>
  )
}

export default Testimonials