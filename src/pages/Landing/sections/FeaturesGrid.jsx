// src/pages/Landing/sections/FeaturesGrid.jsx
import React from 'react';
import { FaUserPlus, FaCalendarCheck, FaFolderOpen, FaPrescriptionBottle } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

export default function FeaturesGrid() {
  const features = [
    { icon: <FaUserPlus />, title: 'Patient Registration', desc: 'Create digital profiles and generate a unique ID instantly. No more paper files or lost records.', link: 'Learn More' },
    { icon: <FaCalendarCheck />, title: 'Appointment Booking', desc: 'Book, reschedule, or cancel appointments with real-time availability. Get SMS reminders.', link: 'Check Slots' },
    { icon: <FaFolderOpen />, title: 'Digital Medical Records', desc: 'Access complete visit history, prescriptions, and lab results from any clinic workstation.', link: 'View Records' },
    { icon: <FaPrescriptionBottle />, title: 'Consultation & Prescription', desc: 'Digital tools for diagnosis, notes, and instant prescription generation. Paperless workflow.', link: 'Explore' },
  ];

  return (
    <section id="features" className="bg-[#F8FAFC] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-[#0066FF] uppercase tracking-widest mb-3">Powerful Features</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-4">High-performance tools for patients and clinicians</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Everything required to streamline patient administration, clinical consultation, diagnostics, and pharmacy operations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-50 text-[#0066FF] rounded-lg flex items-center justify-center text-xl mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-[#0A192F] mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">{f.desc}</p>
              <a href="#" className="text-[#0066FF] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                {f.link} <FiArrowRight />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}