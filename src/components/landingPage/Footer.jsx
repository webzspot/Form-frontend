// import React from 'react'
// import { FaTwitter, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <section id="contact">
//     <footer className='bg-gray-800 px-6 py-10 w-full  '>
//        <div className='max-w-7xl mx-auto px-6'>
// <div className=' flex flex-col  md:flex-row   md:justify-between gap-4 text-white pb-6 border-b border-gray-300/40'>

//          {/*Branding and Social media */}
//         <div className='md:w-96 w-full '>
//           <div className='flex gap-2 items-center mt-4'>
//             <img className='w-9 h-9 text-white' src='img4.webp'/>
//             <h1 className='text-2xl font-bold '>FormCraft</h1>
//             </div>
//             <p className='text-sm mb-4 mt-4'> Build beautiful forms that convert. Trusted by over 50,000 teams worldwide to collect data and engage with customers.</p>
//               {/*Social Media Icons*/}
//         <div className='flex gap-4 mt-6 '>
//          <div className='w-7 h-7  rounded-md bg-gray-700/40 flex justify-center items-center'><FaTwitter/></div>   
//            <div className='w-7 h-7  rounded-md bg-gray-700/40 flex justify-center items-center'><FaLinkedin  /></div>   
//              <div className='w-7 h-7  rounded-md bg-gray-700/40 flex justify-center items-center'><FaGithub  /></div>   
//                <div className='w-7 h-7  rounded-md bg-gray-700/40 flex justify-center items-center'><FaYoutube  /></div>   
      
//         </div>
//         </div>
      
              


    
//          {/*Product */}
//          <div  className='flex flex-col' >
//              <h1 className='text-xl font-semibold mt-4 hover:underline cursor-pointer'>Product</h1>
//               <Link  className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer' onClick={() => {
//     document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
//   }}>Features</Link>
//                 <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Templates</Link>
//                   <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Integrations</Link>
//                     <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Changelog</Link>
//          </div>

//               {/*Company */}
//                <div className='flex flex-col'>
//              <h1 className='text-xl font-semibold mt-4 hover:underline cursor-pointer'>Company</h1>
//               <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>About Us</Link>
//                 <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Careers</Link>
//                   <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Blog</Link>
//                     <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Press</Link>
//                     <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Contact</Link>
//          </div>
//           {/*Resources */}
//            <div className='flex flex-col' >
//              <h1 className='text-xl font-semibold mt-4'>Documentation</h1>
//               <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Help Center</Link>
//                 <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Community</Link>
//                   <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>API Reference</Link>
//                     <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Status</Link>
//                     </div>
//                     </div>
//                    {/* Terms and Services */}
// <div className='text-sm text-gray-300 pt-4 px-2 flex flex-col md:flex-row justify-between items-center'>
  
//   <p className='text-center md:text-left'>&copy; 2024 FormCraft. All rights reserved.</p>

  
//   <div className='flex flex-col md:flex-row gap-2 md:gap-8 mt-2 md:mt-0 items-center'>
//     <p className='hover:underline cursor-pointer'>Privacy Policy</p>
//     <p className='hover:underline cursor-pointer'>Terms of Service</p>
//     <p className='hover:underline cursor-pointer'>Cookie Policy</p>
//   </div>
// </div>

//                 </div>
                  
//           </footer>
//           </section>
//   )
// }
// export default Footer


import React from 'react'
import { HiArrowRight } from 'react-icons/hi';

const Footer = () => {


  const productLinks = ["Features", "Pricing", "Integrations", "Changelog"];
const companyLinks = ["About", "Blog", "Careers", "Contact"];
const resourceLinks = ["Documentation", "API Reference", "Community", "Status"];
  return (
   <footer className='bg-[#0B0D13] w-full min-h-screen '>

    <div className='max-w-7xl mx-auto px-6 '>

     <div className='relative w-full flex flex-col items-center justify-center text-center pt-20'>

      <div className="absolute top-16 w-96 h-60 bg-indigo-500/10 blur-3xl rounded-full -z-10" />
  <div className="absolute top-24 w-80 h-40 bg-indigo-600/5 blur-2xl rounded-full -z-10" />
       
       <h2 className="text-4xl text-[#D3D7DE] font-semibold font-['Space_Grotesk'] leading-10 tracking-tight text-center mx-auto max-w-lg">
        Ready to build forms people love?
       </h2>

       <p className='text-[#6C7993] text-base font-[DM Sans]  font-normal leading-6 text-center max-w-lg ml-4 mt-3'>Start for free. No credit card needed. Upgrade when you're ready.</p>
         


         <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-8">
  
 
   
<button className="
  flex items-center justify-center 
  w-56 h-12 rounded-lg 
  bg-linear-to-r from-[#10B77F] to-[#1AA2E6] 
  shadow-lg hover:opacity-90 transition-all
">
  
  <div className="flex items-center gap-2">
    <span className="text-white text-base font-semibold font-sans leading-none">
      Get started for free
    </span>
    
    
    <HiArrowRight className="text-white w-4 h-4 translate-y-[0.5px]" />
  </div>
</button>

<button className="
  flex items-center justify-center
  w-36 h-12 rounded-lg 
  text-[#6C7993] text-base font-semibold font-sans
  hover:text-white transition-colors
">
 
  Talk to sales
</button>

</div>
     </div>
    
     

    
  
  
  {/* Container Two */}
      <div className="mt-5 md:mt-10 lg:mt-20 border-t border-slate-700/20 pt-2 md:pt-4 lg:pt-16">
        
        
        <div className="flex flex-col items-center md:items-start  md:flex-row gap-10 lg:gap-0">
          
        
          <div className="w-full   max-w-72 shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-xs bg-linear-to-br from-[#10B77F] to-[#1AA2E6]">
                F
              </div>
              <span className="text-[#D3D7DE] text-sm font-semibold font-sans">
                FormCraft
              </span>
            </div>

            <p className="text-[#6C7993] text-sm leading-5 font-normal font-sans max-w-56 mb-6">
              Beautiful forms that convert. Trusted by 50,000+ teams worldwide.
            </p>

            <div className="flex items-center gap-5">
              <a href="#" className="text-[#6C7993] text-[12px] font-semibold font-sans hover:text-white transition-colors">X</a>
              <a href="#" className="text-[#6C7993] text-[12px] font-semibold font-sans hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-[#6C7993] text-[12px] font-semibold font-sans hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>

          
          <div className="flex-1  grid grid-cols-3 md:grid-cols-3 gap-5">
            {/* Product */}
            <div className="flex flex-col">
              <h3 className="text-[#D3D7DE] text-xs font-bold font-['Space_Grotesk'] uppercase tracking-tight mb-4">
                Product
              </h3>
              <ul className="flex flex-col gap-4">
                {productLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#6C7993] text-xs font-normal font-sans hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="flex flex-col">
              <h3 className="text-[#D3D7DE] text-xs font-bold font-['Space_Grotesk'] uppercase tracking-tight mb-4">
                Company
              </h3>
              <ul className="flex flex-col gap-4">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#6C7993] text-xs font-normal font-sans hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="flex flex-col">
              <h3 className="text-[#D3D7DE] text-xs font-bold font-['Space_Grotesk'] uppercase tracking-tight mb-4">
                Resources
              </h3>
              <ul className="flex flex-col gap-4">
                {resourceLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#6C7993] text-xs font-normal font-sans hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>


<div className="mt-20 pt-6 border-t border-[#6C7993]/10 flex flex-col md:flex-row justify-between items-center gap-4 pb-15">
           
            <p className="text-[#6C7993] text-xs font-normal">
              © 2024 FormCraft. All rights reserved.
            </p>
          
            <div className="flex gap-6">
              <a href="#" className="text-[#6C7993] text-xs font-normal hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-[#6C7993] text-xs font-normal hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-[#6C7993] text-xs font-normal hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
       </div>

</div> 

    

   </footer>
  )
}

export default Footer