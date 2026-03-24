import React from 'react'
import { useFormContext } from "../dashboard/FormContext";
const UserFooter = () => {
//const { isDarkMode } = useFormContext();
  return (
    <footer className={`w-full  border-t   py-4 bg-white border-[#E5E7EB]`}>
      <div className="max-w-7xl mx-auto  px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className={`text-[12px] font-medium text-[#6A7181]`}>
          © 2026 FormCraft. All rights reserved.
        </p>
        <div className="flex  space-between  gap-17 md:gap-6">
          
          <a href="#" className={`text-[12px] font-medium transition-colors  text-[#6A7181] hover:text-[#2B4BAB]
          `}>Privacy Policy</a>
          <a href="#" className={`text-[12px] font-medium transition-colors text-[#6A7181] hover:text-[#2B4BAB]`}>Terms of Service</a>
          <a href="#" className={`text-[12px] font-medium transition-colors text-[#6A7181] hover:text-[#2B4BAB]
          `}>Cookie Policy</a>
        </div>
      </div>
    </footer>
  
  )
}

export default UserFooter