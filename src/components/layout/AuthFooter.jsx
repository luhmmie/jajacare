// src/components/layout/AuthFooter.jsx
import { Link } from 'react-router';

export default function AuthFooter() {
  return (
    <footer className="bg-[#F8FAFC] border-t border-gray-200 py-12 px-6 md:px-12 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              <div className="w-1 h-3 bg-[#0A192F] rounded-sm"></div>
              <div className="w-1 h-4 bg-[#0A192F] rounded-sm"></div>
              <div className="w-1 h-3 bg-[#0A192F] rounded-sm"></div>
            </div>
            <span className="font-bold text-lg text-[#0A192F]">JajaCare</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            Premier collegiate health management infrastructure providing rapid, compassionate primary care for students, faculty, and university personnel.
          </p>
          <p className="text-xs text-[#0066FF] font-semibold">Affiliated with University of Ibadan, Nigeria</p>
        </div>

      
        <div>
          <h4 className="font-bold text-[#0A192F] text-sm mb-4">Clinic Hours</h4>
          <div className="mb-3">
            <p className="text-xs font-bold text-gray-700">Emergency Unit:</p>
            <p className="text-xs text-gray-500">Mon - Sun: 24 Hours / 7 Days</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-700">General Outpatient:</p>
            <p className="text-xs text-gray-500">Mon - Sun: 8:00 AM - 8:00 PM</p>
          </div>
        </div>

        
        <div>
          <h4 className="font-bold text-[#0A192F] text-sm mb-4">Location & Contact</h4>
          <p className="text-xs text-gray-500 mb-3 leading-relaxed">
            Jaja Clinic Road, Central Campus,<br/>University of Ibadan, Oyo State, Nigeria
          </p>
          <p className="text-xs font-bold text-gray-700">Direct Telephone:</p>
          <p className="text-xs text-[#0066FF] font-semibold">+234 2 810 1100</p>
        </div>

        
        <div>
          <h4 className="font-bold text-[#0A192F] text-sm mb-4">Emergency Hotline</h4>
          <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
            <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-1">Campus Triage Response</p>
            <p className="text-lg font-bold text-red-700 mb-1">0800-UI-JAJA</p>
            <p className="text-[10px] text-red-500">Toll-free 24/7 Rapid Ambulance</p>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-gray-400">© 2025 University Health Services, University of Ibadan. All rights reserved.</p>
        <div className="flex gap-6 text-[10px] text-gray-500 font-semibold">
          <span className="hover:text-[#0A192F] cursor-pointer">Privacy Policy</span>
          <span className="hover:text-[#0A192F] cursor-pointer">Patient Rights Charter</span>
          <span className="hover:text-[#0A192F] cursor-pointer">Emergency Protocols</span>
        </div>
      </div>
    </footer>
  );
}
