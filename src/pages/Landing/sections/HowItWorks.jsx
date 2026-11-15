// src/pages/Landing/sections/HowItWorks.jsx
import React from 'react';
import { FiUserPlus, FiCalendar, FiActivity, FiHeart } from 'react-icons/fi';

export default function HowItWorks() {
  const steps = [
    { icon: <FiUserPlus />, num: '1', title: 'Register', desc: 'Sign up with your matriculation number. The system generates your unique JC ID instantly.' },
    { icon: <FiCalendar />, num: '2', title: 'Book', desc: 'Pick a doctor, select a time slot from available options, and book your appointment online.' },
    { icon: <FiActivity />, num: '3', title: 'Consult', desc: 'Visit the clinic, check-in, and meet your doctor. Vitals and notes are recorded digitally.' },
    { icon: <FiHeart />, num: '4', title: 'Follow-up', desc: 'Access prescriptions and test results from home. Book follow-ups without waiting in line.' },
  ];

  return (
    <section id="how-it-works" className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-[#0066FF] uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-4">How JajaCare works for you</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Four easy steps to receive high-standard medical attention without stressful physical lines.</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gray-200 z-0"></div>
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto bg-white border-2 border-blue-100 rounded-full flex items-center justify-center text-[#0066FF] text-2xl mb-6 shadow-sm">
                {step.icon}
              </div>
              <div className="text-xs font-bold text-[#F5B041] mb-2">STEP {step.num}</div>
              <h3 className="font-bold text-[#0A192F] text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}