
import { useState } from 'react';
import { Link } from 'react-router';
import { FiPhoneCall, FiShield, FiMenu, FiX } from 'react-icons/fi';
import { ShieldCheck } from 'lucide-react';
import { FaStethoscope } from 'react-icons/fa';

export default function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full font-sans">

      <div className="bg-[#E8F1FB] text-[#0066FF] text-[10px] sm:text-xs font-semibold py-2 px-4 text-center flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} />
          The official clinical operating system for UI Health.
        </div>
        <Link to="/login" className="underline hover:text-blue-800">
          Access the Staff Portal here.
        </Link>
      </div>

      
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-2">
          
          
          <Link to="/" className="flex items-center gap-2 md:gap-3 shrink-0 group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#14357A] to-[#0C2356] flex items-center justify-center shadow-sm text-[#D9A520] group-hover:scale-105 transition-transform">
              <FaStethoscope size={18} className="md:hidden" />
              <FaStethoscope size={20} className="hidden md:block" />
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="font-bold text-lg md:text-xl text-[#14357A] tracking-tight">JajaCare</span>
                <span className="text-[8px] md:text-[9px] font-bold text-[#14357A] bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  EHR
                </span>
              </div>
              <span className="text-[8px] md:text-[9px] font-semibold text-gray-500 tracking-wider mt-0.5">
                UNIVERSITY HEALTH SERVICES
              </span>
            </div>
          </Link>

          
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <a href="#home" className="hover:text-[#14357A] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#14357A] transition-colors">About</a>
            <a href="#features" className="hover:text-[#14357A] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#14357A] transition-colors">How It Works</a>
            <a href="#contact" className="hover:text-[#14357A] transition-colors">Contact</a>
          </div>

          
          <div className="flex items-center gap-2 md:gap-3">
            <a 
              href="tel:0800UIJAJA" 
              className="hidden xl:flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-3 py-1.5 rounded-md transition-colors text-xs font-bold"
            >
              <FiPhoneCall size={12} className="animate-bounce" />
              0800-UI-JAJA
            </a>

            <Link 
              to="/login"
              className="hidden md:block text-xs md:text-sm font-bold text-[#14357A] hover:text-blue-700 px-2 md:px-4 py-2 rounded-md hover:bg-gray-50 transition whitespace-nowrap"
            >
              Sign In
            </Link>

            <Link 
              to="/login"
              className="hidden md:flex bg-[#F5B041] hover:bg-[#e09b2d] text-[#0A192F] text-sm font-bold px-4 md:px-5 py-2 md:py-2.5 rounded-md items-center gap-2 transition shadow-sm whitespace-nowrap"
            >
              <FiShield size={14} /> Staff Portal
            </Link>

            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#14357A] hover:bg-gray-100 rounded-md transition-colors"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

  
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-lg absolute w-full left-0">
            <a 
              href="#home" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-700 hover:text-[#14357A] py-2 border-b border-gray-50"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-700 hover:text-[#14357A] py-2 border-b border-gray-50"
            >
              About
            </a>
            <a 
              href="#features" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-700 hover:text-[#14357A] py-2 border-b border-gray-50"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-700 hover:text-[#14357A] py-2 border-b border-gray-50"
            >
              How It Works
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-700 hover:text-[#14357A] py-2 border-b border-gray-50"
            >
              Contact
            </a>
            
            <div className="pt-2 flex flex-col gap-2">
              <Link 
                to="/login"
                className="w-full text-center bg-[#F8FAFC] border border-gray-200 text-[#14357A] font-bold py-2.5 rounded-md"
              >
                Staff Sign In
              </Link>
              <Link 
                to="/login"
                className="w-full text-center bg-[#F5B041] hover:bg-[#e09b2d] text-[#0A192F] font-bold py-2.5 rounded-md flex items-center justify-center gap-2 transition"
              >
                <FiShield size={14} /> Staff Portal
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}