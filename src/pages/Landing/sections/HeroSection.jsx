
import React from 'react';
import { Link } from 'react-router';
import { FiArrowRight, FiPhone, FiMapPin, FiClock, FiShield, FiActivity } from 'react-icons/fi';
import { FaCheckCircle, FaStethoscope, FaUserMd, FaHeartbeat } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section id="home" className="relative bg-[#0A192F] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] to-[#122B4A] opacity-90 z-0" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24 lg:py-32 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold text-[#F5B041] bg-blue-900/30 px-3 py-1.5 rounded-full mb-6 border border-blue-800">
            <FaCheckCircle /> THE CLINICAL OPERATING SYSTEM FOR UI HEALTH
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            High-precision healthcare for the <span className="text-[#F5B041]">University of Ibadan</span>.
          </h1>
          
          <p className="text-blue-100 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
            Empower your medical team with real-time triage, automated e-prescriptions, and unified longitudinal health records.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mb-12">
            <Link to="/login" className="w-full sm:w-auto bg-[#F5B041] hover:bg-[#e09b2d] text-[#0A192F] font-bold px-8 py-3.5 rounded-md flex items-center justify-center gap-2 transition shadow-lg shadow-[#F5B041]/20">
              Staff Login <FiArrowRight />
            </Link>
            <a href="#features" className="w-full sm:w-auto text-center bg-transparent border border-blue-700 hover:bg-blue-900/50 text-white font-semibold px-8 py-3.5 rounded-md transition">
              Explore Clinical Modules
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-blue-200">
            <div className="flex items-center gap-2"><FiMapPin /> UI Clinic Main Campus</div>
            <div className="flex items-center gap-2"><FiClock /> 24/7 Casualty Support</div>
            <div className="flex items-center gap-2"><FiPhone /> Ext. 1042</div>
          </div>
        </div>

        
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#0066FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          
          <div className="bg-white text-[#0A192F] rounded-2xl p-6 shadow-2xl relative z-10 w-full max-w-md ml-auto border-t-4 border-[#F5B041]">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-[#14357A] rounded-lg flex items-center justify-center">
                  <FaStethoscope size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Clinical Command Center</h4>
                  <p className="text-[10px] text-gray-500">University Health Services</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 text-[9px] font-bold px-2 py-1 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> LIVE
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FiActivity className="text-amber-500" />
                  <span className="text-xs font-semibold">Triage Queue</span>
                </div>
                <span className="text-sm font-bold text-[#14357A]">8 Waiting</span>
              </div>
              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaUserMd className="text-blue-500" />
                  <span className="text-xs font-semibold">Active Doctors</span>
                </div>
                <span className="text-sm font-bold text-[#14357A]">3 On Duty</span>
              </div>
              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaHeartbeat className="text-red-500" />
                  <span className="text-xs font-semibold">Ward Bed Occupancy</span>
                </div>
                <span className="text-sm font-bold text-[#14357A]">5 / 12</span>
              </div>
            </div>

            <Link to="/login" className="block w-full bg-[#0A192F] hover:bg-[#122B4A] text-white text-center font-bold py-2.5 rounded-md transition-colors text-sm">
              Access EHR Portal
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}