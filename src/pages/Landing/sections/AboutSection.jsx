
import React from 'react';
import { FaStethoscope, FaAmbulance, FaShieldAlt } from 'react-icons/fa';

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0066FF] uppercase tracking-wider mb-4">
              <span className="w-8 h-px bg-[#0066FF]"></span> About Jaja Clinic
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-6 leading-tight">
              Serving the First & Best Since 1948
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Jaja Clinic has been the health cornerstone of the University of Ibadan for over seven decades. 
              From our historic halls to our modern digital upgrade, we remain committed to the well-being 
              of every student and staff member.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
                <p className="text-xl font-bold text-[#0A192F]">12</p>
                <p className="text-xs text-gray-500">Clinic Wards</p>
              </div>
              <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
                <p className="text-xl font-bold text-[#0A192F]">14</p>
                <p className="text-xs text-gray-500">Departments</p>
              </div>
              <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
                <p className="text-xl font-bold text-[#0A192F]">7,000+</p>
                <p className="text-xs text-gray-500">Weekly Cases</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" 
              alt="Jaja Clinic Building" 
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-6 left-6 bg-[#0A192F] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
              Jaja Clinic Main Campus, UI
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <FaStethoscope />, title: 'Preventive Medicine', desc: 'Annual health checks, immunizations, and wellness programs for the entire university community.' },
            { icon: <FaAmbulance />, title: '24/7 Emergency & Trauma', desc: 'Round-the-clock emergency services, ambulance dispatch, and trauma care for critical situations.' },
            { icon: <FaShieldAlt />, title: 'NHIS & TISHIP Insurance', desc: 'Comprehensive coverage plans for all registered students and staff under the national health insurance scheme.' },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="text-[#0066FF] text-2xl mt-1">{item.icon}</div>
              <div>
                <h4 className="font-bold text-[#0A192F] mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}