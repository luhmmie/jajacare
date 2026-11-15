
import { Link } from 'react-router';
import { 
  FiCalendar, FiPhoneCall 
} from 'react-icons/fi';
import { ShieldCheck } from 'lucide-react';
import { FaStethoscope } from 'react-icons/fa';

export default function PublicNavbar() {
  return (
    <header className="w-full font-sans">
      
      <div className="bg-[#E8F1FB] text-[#0066FF] text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2">
        <ShieldCheck size={14} />
        A new era of smarter health at UI.{' '}
        <Link to="/login" className="underline hover:text-blue-800">
          Book an appointment with our new JajaCare portal.
        </Link>
      </div>

      
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          
          
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14357A] to-[#0C2356] flex items-center justify-center shadow-sm text-[#D9A520] group-hover:scale-105 transition-transform">
              <FaStethoscope size={20} />
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl text-[#14357A] tracking-tight">JajaCare</span>
                <span className="text-[9px] font-bold text-[#14357A] bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  EHR
                </span>
              </div>
              <span className="text-[9px] font-semibold text-gray-500 tracking-wider mt-0.5">
                UNIVERSITY HEALTH SERVICES
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <a href="#home" className="hover:text-[#14357A] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#14357A] transition-colors">About</a>
            <a href="#features" className="hover:text-[#14357A] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#14357A] transition-colors">How It Works</a>
            <a href="#contact" className="hover:text-[#14357A] transition-colors">Contact</a>
          </div>

          
          <div className="flex items-center gap-2">
            <a 
              href="tel:0800UIJAJA" 
              className="hidden lg:flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-3 py-1.5 rounded-md transition-colors text-xs font-bold"
            >
              <FiPhoneCall size={12} className="animate-bounce" />
              0800-UI-JAJA
            </a>

            <Link 
              to="/login"
              className="text-sm font-bold text-[#14357A] hover:text-blue-700 px-4 py-2 rounded-md hover:bg-gray-50 transition"
            >
              Staff Login
            </Link>

            <Link 
              to="/login"
              className="bg-[#F5B041] hover:bg-[#e09b2d] text-[#0A192F] text-sm font-bold px-5 py-2.5 rounded-md flex items-center gap-2 transition shadow-sm"
            >
              <FiCalendar size={14} /> Book Appointment
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}