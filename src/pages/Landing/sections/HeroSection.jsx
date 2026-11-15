// src/pages/Landing/sections/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router';
import { FiArrowRight, FiPhone, FiMapPin, FiClock, FiUser, FiLock } from 'react-icons/fi';
import { FaCheckCircle, FaUserPlus, FaCalendarCheck, FaFolderOpen } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section id="home" className="relative bg-[#0A192F] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] to-[#122B4A] opacity-90 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 lg:py-28 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Copy */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0066FF] bg-blue-900/30 w-max px-3 py-1.5 rounded-full mb-6 border border-blue-800">
            <FaCheckCircle /> UNIVERSITY OF IBADAN HEALTH SERVICES
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Smarter healthcare for the <span className="text-[#F5B041]">University of Ibadan</span> community.
          </h1>
          
          <p className="text-blue-100 text-lg mb-8 max-w-lg leading-relaxed">
            Faster registration, unified digital records, smart triage and hassle-free appointment booking for all UI students and staff.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link to="/login" className="bg-[#F5B041] hover:bg-[#e09b2d] text-[#0A192F] font-bold px-6 py-3 rounded-md flex items-center gap-2 transition-colors">
              Book an Appointment <FiArrowRight />
            </Link>
            <a href="#about" className="bg-transparent border border-blue-700 hover:bg-blue-900/50 text-white font-semibold px-6 py-3 rounded-md transition-colors">
              Learn More
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 text-sm text-blue-200">
            <div className="flex items-center gap-2"><FiMapPin /> 2 Clinic Outposts</div>
            <div className="flex items-center gap-2"><FiClock /> 24/7 Emergency Care</div>
            <div className="flex items-center gap-2"><FiPhone /> 0800-UI-JAJA</div>
          </div>
        </div>

        {/* Right: Patient Portal Quick Access Card (no doctor) */}
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#0066FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          
          <div className="bg-white text-[#0A192F] rounded-2xl p-6 shadow-2xl relative z-10 w-full max-w-md ml-auto">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#0066FF]">
                  <FiUser size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">PATIENT PORTAL</h4>
                  <p className="text-xs text-gray-500">Quick Self-Service Access</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">ONLINE</span>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Are you a registered student or staff? Access your digital health records, book appointments, and view prescriptions instantly.
            </p>

            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#0066FF] hover:bg-blue-50 transition text-sm font-semibold">
                <span className="flex items-center gap-2"><FaUserPlus className="text-[#0066FF]" /> Register New Patient</span>
                <FiArrowRight className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#0066FF] hover:bg-blue-50 transition text-sm font-semibold">
                <span className="flex items-center gap-2"><FaCalendarCheck className="text-[#0066FF]" /> Book Appointment</span>
                <FiArrowRight className="text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#0066FF] hover:bg-blue-50 transition text-sm font-semibold">
                <span className="flex items-center gap-2"><FaFolderOpen className="text-[#0066FF]" /> View My Records</span>
                <FiArrowRight className="text-gray-400" />
              </button>
            </div>

            <div className="bg-[#0A192F] text-white p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Staff Login</p>
                <p className="text-xs text-blue-200 mt-0.5">Doctors, Nurses & Admin</p>
              </div>
              <Link to="/login" className="bg-[#F5B041] hover:bg-[#e09b2d] text-[#0A192F] p-2 rounded flex items-center justify-center transition-colors">
                <FiLock size={16} />
              </Link>
            </div>
          </div>
          
          <div className="absolute -bottom-6 -left-6 w-48 h-48 border-4 border-[#0066FF] rounded-full opacity-20 z-0 hidden lg:block" />
        </div>

      </div>
    </section>
  );
}