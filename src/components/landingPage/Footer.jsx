import React from 'react'
import { FaTwitter, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <section id="contact">
    <footer className='bg-gray-800 px-6 py-10 w-full  '>
       <div className='max-w-7xl mx-auto px-6'>
<div className=' flex flex-col  md:flex-row   md:justify-between gap-4 text-white pb-6 border-b border-gray-300/40'>

         {/*Branding and Social media */}
        <div className='md:w-96 w-full '>
          <div className='flex gap-2 items-center mt-4'>
            <img className='w-9 h-9 text-white' src='img4.webp'/>
            <h1 className='text-2xl font-bold '>FormCraft</h1>
            </div>
            <p className='text-sm mb-4 mt-4'> Build beautiful forms that convert. Trusted by over 50,000 teams worldwide to collect data and engage with customers.</p>
              {/*Social Media Icons*/}
        <div className='flex gap-4 mt-6 '>
         <div className='w-7 h-7  rounded-md bg-gray-700/40 flex justify-center items-center'><FaTwitter/></div>   
           <div className='w-7 h-7  rounded-md bg-gray-700/40 flex justify-center items-center'><FaLinkedin  /></div>   
             <div className='w-7 h-7  rounded-md bg-gray-700/40 flex justify-center items-center'><FaGithub  /></div>   
               <div className='w-7 h-7  rounded-md bg-gray-700/40 flex justify-center items-center'><FaYoutube  /></div>   
      
        </div>
        </div>
      
              


    
         {/*Product */}
         <div  className='flex flex-col' >
             <h1 className='text-xl font-semibold mt-4 hover:underline cursor-pointer'>Product</h1>
              <Link  className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer' onClick={() => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  }}>Features</Link>
                <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Templates</Link>
                  <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Integrations</Link>
                    <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Changelog</Link>
         </div>

              {/*Company */}
               <div className='flex flex-col'>
             <h1 className='text-xl font-semibold mt-4 hover:underline cursor-pointer'>Company</h1>
              <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>About Us</Link>
                <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Careers</Link>
                  <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Blog</Link>
                    <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Press</Link>
                    <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Contact</Link>
         </div>
          {/*Resources */}
           <div className='flex flex-col' >
             <h1 className='text-xl font-semibold mt-4'>Documentation</h1>
              <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Help Center</Link>
                <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Community</Link>
                  <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>API Reference</Link>
                    <Link className='text-sm text-gray-200 mt-4 hover:underline cursor-pointer'>Status</Link>
                    </div>
                    </div>
                   {/* Terms and Services */}
<div className='text-sm text-gray-300 pt-4 px-2 flex flex-col md:flex-row justify-between items-center'>
  
  <p className='text-center md:text-left'>&copy; 2024 FormCraft. All rights reserved.</p>

  
  <div className='flex flex-col md:flex-row gap-2 md:gap-8 mt-2 md:mt-0 items-center'>
    <p className='hover:underline cursor-pointer'>Privacy Policy</p>
    <p className='hover:underline cursor-pointer'>Terms of Service</p>
    <p className='hover:underline cursor-pointer'>Cookie Policy</p>
  </div>
</div>

                </div>
                  
          </footer>
          </section>
  )
}
export default Footer