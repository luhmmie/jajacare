
import { Link } from 'react-router';
import { 
  FaTwitter, FaInstagram, FaLinkedin, 
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt 
} from 'react-icons/fa';
import { FaStethoscope } from 'react-icons/fa';

export default function PublicFooter() {
  return (
    <footer id="contact" className="bg-white pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14357A] to-[#0C2356] flex items-center justify-center text-[#D9A520]">
                <FaStethoscope size={20} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-lg text-[#14357A]">JajaCare</span>
                <span className="text-[9px] font-semibold text-gray-500 tracking-wider mt-0.5">UI HEALTH SERVICES</span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              The official digital health platform for the University of Ibadan. Delivering world-class healthcare to students, staff, and dependents.
            </p>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-[#0066FF] transition-colors"><FaTwitter size={18} /></a>
              <a href="#" className="hover:text-[#0066FF] transition-colors"><FaInstagram size={18} /></a>
              <a href="#" className="hover:text-[#0066FF] transition-colors"><FaLinkedin size={18} /></a>
            </div>
          </div>

          
          <div>
            <h4 className="font-bold text-[#14357A] mb-4">Clinic Hours</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Mon - Fri</span> 
                <span className="font-semibold text-[#14357A]">8:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Saturday</span> 
                <span className="font-semibold text-[#14357A]">10:00 AM - 2:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday & Holidays</span> 
                <span className="font-semibold text-[#14357A]">Closed</span>
              </li>
            </ul>
            <p className="text-[10px] text-gray-400 mt-3">Emergency Triage operates 24/7.</p>
          </div>

          
          <div>
            <h4 className="font-bold text-[#14357A] mb-4">Location & Contact</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-gray-400 shrink-0" /> 
                Jaja Clinic, University of Ibadan, Oyo State, Nigeria
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-gray-400" /> +234 803 123 4567
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-gray-400" /> support@jajacare.ui.edu.ng
              </li>
            </ul>
          </div>

          
          <div>
            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
              <h4 className="font-bold text-red-700 mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                Emergency 24/7
              </h4>
              <p className="text-red-600 font-bold text-xl mb-1">0800-UI-JAJA</p>
              <p className="text-[10px] text-red-500 mt-2 leading-relaxed">
                For life-threatening emergencies, please call this number immediately. Free campus ambulance dispatch available.
              </p>
            </div>
          </div>
        </div>

        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 University Health Services, University of Ibadan. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#14357A]">Privacy Policy</a>
            <a href="#" className="hover:text-[#14357A]">Terms of Service</a>
            <a href="#" className="hover:text-[#14357A]">Emergency Protocols</a>
          </div>
        </div>
      </div>
    </footer>
  );
}