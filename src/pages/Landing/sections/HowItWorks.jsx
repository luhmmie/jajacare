// src/pages/Landing/sections/HowItWorks.jsx
import React from 'react';
import { FiLogIn, FiActivity, FiCheckSquare, FiBox } from 'react-icons/fi';

export default function HowItWorks() {
  const steps = [
    { icon: <FiLogIn />, num: '1', title: 'Secure Staff Login', desc: 'Authenticate via UI Single Sign-On. Role-based access dynamically loads your specific workstation and queue.' },
    { icon: <FiActivity />, num: '2', title: 'Triage & Vitals', desc: 'Nurses record patient vitals, which are instantly graded by the MEWS system and routed to the attending doctor.' },
    { icon: <FiCheckSquare />, num: '3', title: 'Clinical Consult', desc: 'Doctors access full longitudinal history, order labs, and sign e-prescriptions with ICD-11 coded diagnoses.' },
    { icon: <FiBox />, num: '4', title: 'Dispense & Discharge', desc: 'Pharmacy receives the e-Rx instantly, verifies allergies, and dispenses. Ward admissions are logged automatically.' },
  ];

  return (
    <section id="how-it-works" className="bg-white py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold text-[#F5B041] uppercase tracking-widest mb-3">Clinical Workflow</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-4">How JajaCare empowers your shift</h2>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">Four seamless steps that connect the entire clinic from the front desk to the dispensary.</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gray-200 z-0"></div>
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto bg-white border-2 border-blue-100 rounded-full flex items-center justify-center text-[#14357A] text-2xl mb-6 shadow-sm">
                {step.icon}
              </div>
              <div className="text-xs font-bold text-[#F5B041] mb-2">STEP {step.num}</div>
              <h3 className="font-bold text-[#0A192F] text-lg mb-2">{step.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed px-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}