import React from 'react';

const Nav = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#6C3BFF] rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">⧉</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">FormCraft</h1>
        </div>

        {/* Center Menu */}
        <ul className="hidden md:flex md:justify-between items-center gap-10 text-[16px] font-medium text-gray-700">
          <li className="cursor-pointer hover:text-[#6C3BFF]">Dashboard</li>
          <li className="cursor-pointer hover:text-[#6C3BFF]">Templates</li>
          <li className="cursor-pointer hover:text-[#6C3BFF]">Analytics</li>
          <li className="cursor-pointer hover:text-[#6C3BFF]">Integrations</li>
        </ul>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-700 font-medium hover:text-[#6C3BFF]">
            Sign In
          </button>

          <button className="bg-[#6C3BFF] hover:bg-[#5c2dea] hidden sm:block transition-all text-white font-semibold px-5 py-2.5 rounded-xl">
            Get Started
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Nav;
