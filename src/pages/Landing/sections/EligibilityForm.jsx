// src/pages/Landing/sections/EligibilityForm.jsx
import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function EligibilityForm() {
  return (
    <section className="bg-[#F8FAFC] py-20 px-6 md:px-12 flex justify-center">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-200 max-w-3xl w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0066FF] to-[#F5B041]"></div>
        
        <h2 className="text-2xl font-bold text-[#0A192F] mb-2">Verify Your Clinic Eligibility</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your Matriculation Number or Staff ID to confirm active TISHIP insurance coverage.</p>
        
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <input 
            type="text" 
            placeholder="e.g., 218372 or STF-001" 
            className="w-full md:w-80 px-4 py-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF]"
          />
          <button className="bg-[#0A192F] hover:bg-[#122B4A] text-white font-semibold px-6 py-3 rounded-md flex items-center justify-center gap-2 transition">
            <FiSearch /> Verify & Proceed
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-4">Note: Only currently registered UI students and staff are covered.</p>
      </div>
    </section>
  );
}
