
import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

export default function CtaSection() {
  return (
    <section className="bg-[#0A192F] text-white py-20 md:py-24 px-6 md:px-12 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-[#0066FF] rounded-full mix-blend-multiply filter blur-[100px] md:blur-[120px] opacity-10 pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="w-12 h-12 bg-[#F5B041] text-[#0A192F] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <FaQuoteLeft />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
          Experience seamless health services at Jaja Clinic today.
        </h2>
        <p className="text-blue-100 mb-8 text-base md:text-lg max-w-2xl mx-auto">
          Register your student or staff profile, book appointments, and access all your health records from the palm of your hand.
        </p>
        
        <p className="text-xs text-blue-300">Trusted by over 38,500+ registered students and staff across the University of Ibadan.</p>
      </div>
    </section>
  );
}