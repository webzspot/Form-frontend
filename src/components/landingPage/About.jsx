import React from 'react'
import { FaChartPie,FaPlug,FaMousePointer } from "react-icons/fa";
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
    stars: "★★★★☆",
    text: "Simple, powerful, and beautiful. FormCraft is a game-changer for our business.",
    name: "Emily Rodriguez",
    role: "CEO",
    img: "/img3.jpeg"
  }
];


  return (
    <div className='bg-gray-200 pb-6 '>
        {/*Features */}
        <div className='flex flex-col  md:flex-row items-center justify-center gap-4  '>
            <div className='bg-white p-2 m-4 shadow-md  shadow-gray-400 rounded-md w-64'>
            <div className='w-8 h-8 m-4 rounded-md bg-blue-500 text-white flex justify-center items-center'><FaMousePointer/></div>
              
                <h1 className='text-lg font-semibold m-4'>Drag & Drop Builder</h1>
                <p className='text-sm text-gray-600 m-4'>  Create stunning forms with our intuitive drag-and-drop interface. No coding skills required.</p>
                 </div>
                 <div className='bg-white p-2  m-4 shadow-md  shadow-gray-400 rounded-md w-64'>
                    <div className='w-8 h-8  m-4 rounded-md bg-green-500 text-white flex justify-center items-center'><FaChartPie/></div>
                    <h1 className='text-lg font-semibold m-4'>Real-time Analytics</h1>
                <p className='text-sm text-gray-600 m-4'>Track form submissions, conversion rates, and user behavior with powerful analytics tools.
</p>
</div>
         <div className='bg-white p-2 m-4 shadow-md  shadow-gray-400 rounded-md w-64'>
             <div className='w-8 h-8 m-4 rounded-md bg-purple-500 text-white flex justify-center items-center'><FaPlug/></div>
             <h1 className='text-lg font-semibold m-4'>100+ Integrations</h1>
                <p className='text-sm text-gray-600 m-4'>Connect with your favorite tools including CRM, email marketing, and payment platforms.
</p>
                         
         </div>
        </div>
           {/*Testimonals */}
           <div className='bg-white max-w-5xl mx-auto rounded-md p-4 mt-6 shadow-md shadow-gray-400  '>
             <h1 className='text-xl font-bold text-center m-4'>Trusted by Teams Worldwide</h1>
             
             <p className='text-base text-gray-600 text-center'>See what our customers are saying about FormCraft</p>
              <div className='flex flex-col items-center md:flex-row justify-center' >
             {
              testimonials.map((item,index)=>{
                return(
               
               <div className='bg-gray-100 rounded-md p-4 w-64 m-6 ' key={index}>
                <p className='text-yellow-500 mt-2 text-lg'>★★★★★</p>
                <p className='mt-2 '>{item.text}</p>
                 <div className='flex gap-2 mt-4'>
                  <img src={item.img} className='rounded-full w-10 h-8 mt-2'/>
                  <div className='flex flex-col '>
                    <h4 className='font-bold '>{item.name}</h4>
                    <p className='text-sm'>{item.role}</p>


                  </div>

                 </div>


               </div>
              )
              })
             }
            </div>


           </div>
            
     




    </div>
  )
}

export default About