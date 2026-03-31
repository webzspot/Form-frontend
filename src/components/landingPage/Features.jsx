import React from 'react'
import { FaMousePointer,  FaRegChartBar, FaPlug, FaShieldAlt, FaMobileAlt, FaPalette } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Features = () => {

 

    const stats = [
    { value: "50K+", label: "Teams using FormCraft" },
    { value: "2M+", label: "Forms created monthly" },
    { value: "99.9%", label: "Uptime guarantee" },
    { value: "4.9", label: "Average user rating" },
  ];
     const features = [
      {
        icon: <FaMousePointer style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '20px' }} />,
        iconColor: "#10B77F",
       
        title: "Drag & drop builder",
        text: "Visually compose forms without writing code. Reorder fields, nest sections, and preview live.",
        badge: "Popular"
      },
      {
        icon:<FaPalette  style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '20px' }}/>,
        iconColor: "#594DE6", 
        title: "Custom branding",
        text: "Apply your colors, fonts, and logo so every form feels native to your product.",
      },
      {
        icon: <FaRegChartBar />,
        iconColor: "#2A6DF4", 
        title: "Real-time analytics",
        text: "Track submissions, drop-off rates, and completion times from a single dashboard.",
      },
      {
        icon: <FaPlug style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '40px' }} />,
        iconColor: "#F59F0A", 
        title: "1,000+ integrations",
        text: "Push data to Slack, Sheets, Notion, Zapier, or your own API endpoints.",
        badge: "New"
      },
      {
        icon:<FaShieldAlt style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '30px' }} />,
        iconColor: "#10B77F",
        
        title: "Enterprise security",
        text: "SOC 2 compliant with end-to-end encryption and granular access controls.",
      },
      {
        icon: <FaMobileAlt />,
        iconColor:"#E93553",
        title: "Mobile-first",
        text: "Responsive by default. Every form adapts to any screen size automatically.",
      }
    ];
  return (
   <>





    {/*Stats Section */}
      <section className='  relative py-20 px-6 w-full  bg-[#11141D] '>
        
    <div className="absolute top-0 left-0 w-full h-1px bg-linear-to-r from-transparent via-[#10B77F] to-transparent opacity-40"></div>




    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
      {
        stats.map((item,index)=>{
         return  (
            <div key={index} className='flex flex-col items-center text-center'>
              <h2 className="text-[#FFFFFF] text-4xl leading-10 tracking-tight font-bold font-['DM-sans']">{item.value}</h2>
              <p className='text-[#98A1B3] font-normal mt-2 leading-5 text-xs text-center align-middle'>{item.label}</p>

            </div>
           )
        })
      }


      <div className="absolute bottom-0 left-0 w-full h-1px bg-linear-to-r from-transparent via-[#10B77F] to-transparent opacity-40"></div>

    </div>
      </section>
    
    {/*Features Section */}
    
           <section id="features" className='py-20 md:py-26  relative w-full bg-[#FCFCFC] '>
      <div className='max-w-7xl  mx-auto px-4 md:px-6'>
        
        {/* Paragraph Container */}
        <motion.div
        
  initial={{ opacity: 0, x: -30 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: false }}
        className='flex flex-col items-start'>
          <p className="text-[#10B77F] uppercase font-semibold text-sm leading-5  tracking-widest font-[DM_Sans]">Features</p>
         
          <h2 className="text-[#14181F] font-bold max-w-xl mt-4 text-4xl font-['Space_Grotesk'] leading-11 tracking-tighter align-middle">
            Everything you need,<br className="hidden md:block" /> nothing you don't
          </h2>
          <p className="text-[#737B8C] text-base font-normal leading-6 font-['DM_Sans'] mt-4">
            A complete toolkit for building, deploying, and analyzing forms at any scale.
          </p>
        </motion.div>
    
        {/* Features Grid */}
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16'>
      {features.map((item, index) => (
        <motion.div 

       
      
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }} 
      viewport={{ once: false }}
          key={index} 
          className='relative bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl w-full min-h-56 p-10 flex flex-col hover:shadow-lg transition-all group overflow-hidden'
        >
         
          <div 
            className="absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: item.hoverBorder || item.iconColor }}
          ></div>
    
         
          {item.badge && (
            <span 
              className="absolute top-5 right-8 font-['DM_Sans'] font-semibold text-xs leading-4 uppercase"
              style={{ color: item.iconColor }}
            >
              {item.badge}
            </span>
          )}
    
          
          <div 
            className="text-xl  ml-4 mb-6" 
            style={{ color: item.iconColor }}
          >
            {item.icon}
          </div>
    
          <h3 className="text-base font-bold leading-6 text-[#14181F] font-['Space_Grotesk'] mb-3">
            {item.title}
          </h3>
    
          <p className="text-sm font-normal leading-5 text-[#737B8C] font-['DM_Sans'] ">
            {item.text}
          </p>
    
         
        </motion.div>
      ))}
    </div>
      </div>
    </section> 

   {/* <Subscription standalone={false} /> */}
    </>
  )
}

export default Features