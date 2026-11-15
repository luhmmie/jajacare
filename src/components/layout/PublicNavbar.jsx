
import { useState } from 'react';
import { Link } from 'react-router';
import { FiCalendar, FiPhoneCall, FiMenu, FiX } from 'react-icons/fi';
import { ShieldCheck } from 'lucide-react';
import { FaStethoscope } from 'react-icons/fa';

export default function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="w-full font-sans relative">
      {/* Top Announcement Banner */}
      <div className="bg-[#E8F1FB] text-[#0066FF] text-xs font-semibold py-2 px-4 text-center flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
        <div className="flex items-center gap-1">
          <ShieldCheck size={14} />
          A new era of smarter health at UI.
        </div>
        <Link to="/login" className="underline hover:text-blue-800">
          Book an appointment with our new JajaCare portal.
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
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-[#14357A] transition-colors">
                {link.label}
              </a>
            ))}
          </div>

    
          <div className="flex items-center gap-1 md:gap-3">
            <a 
              href="tel:0800UIJAJA" 
              className="hidden xl:flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-3 py-1.5 rounded-md transition-colors text-xs font-bold"
            >
              <FiPhoneCall size={12} className="animate-bounce" />
              0800-UI-JAJA
            </a>

            <Link 
              to="/login"
              className="hidden sm:block text-xs md:text-sm font-bold text-[#14357A] hover:text-blue-700 px-2 md:px-4 py-2 rounded-md hover:bg-gray-50 transition whitespace-nowrap"
            >
              Staff Login
            </Link>

            <Link 
              to="/login"
              className="hidden md:flex bg-[#F5B041] hover:bg-[#e09b2d] text-[#0A192F] text-sm font-bold px-4 md:px-5 py-2 md:py-2.5 rounded-md items-center gap-2 transition shadow-sm whitespace-nowrap"
            >
              <FiCalendar size={14} /> Book Appointment
            </Link>

          
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#14357A] hover:bg-gray-100 rounded-md transition ml-1"
              aria-label="Open Menu"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </nav>

    
      
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />


      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FaStethoscope className="text-[#14357A]" size={20} />
            <span className="font-bold text-lg text-[#14357A]">Menu</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition"
            aria-label="Close Menu"
          >
            <FiX size={24} />
          </button>
        </div>

  
        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-[#0A192F] font-semibold hover:bg-gray-50 hover:text-[#14357A] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        
        <div className="p-5 border-t border-gray-100 space-y-3 bg-gray-50">
          <Link 
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-[#14357A] hover:bg-[#0C2356] text-white font-bold py-3 rounded-md transition shadow-sm"
          >
            Staff Login
          </Link>
          <Link 
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-[#F5B041] hover:bg-[#e09b2d] text-[#0A192F] font-bold py-3 rounded-md transition shadow-sm"
          >
            <FiCalendar size={16} /> Book Appointment
          </Link>
          <a 
            href="tel:0800UIJAJA" 
            className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 font-bold py-3 rounded-md transition bg-red-50 hover:bg-red-100"
          >
            <FiPhoneCall size={16} /> Emergency: 0800-UI-JAJA
          </a>
        </div>
      </div>

    </header>
  );
}