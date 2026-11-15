
import { Outlet, Link } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';
import { ShieldCheck } from 'lucide-react';
import { FaStethoscope } from 'react-icons/fa';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans bg-[#F8FAFC]">
      
      
      <div className="hidden lg:flex w-1/2 bg-[#0A192F] text-white flex-col justify-center px-16 relative overflow-hidden order-2 lg:order-1">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#0066FF] rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#F5B041] rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F5B041] bg-yellow-900/20 w-max px-3 py-1.5 rounded-full mb-8 border border-yellow-700">
            <ShieldCheck size={14} /> SECURE STAFF PORTAL
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Smarter healthcare for the{' '}
            <span className="text-[#F5B041]">University of Ibadan</span> community.
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-10">
            Access patient records, manage appointments, and deliver care faster — all in one place.
          </p>
          <div className="space-y-4 text-sm text-blue-100">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#F5B041] rounded-full" /> 38,500+ registered patients
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#F5B041] rounded-full" /> Role-based secure access
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#F5B041] rounded-full" /> 24/7 emergency support
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT SIDE: FORM AREA (Order 1 on mobile, Order 2 on desktop) ─── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 relative order-1 lg:order-2 min-h-screen lg:min-h-0">
        <Link
          to="/"
          className="absolute top-6 left-6 md:left-12 text-sm text-gray-500 hover:text-[#0A192F] flex items-center gap-2 font-medium"
        >
          <FiArrowLeft /> Back to home
        </Link>

        <div className="w-full max-w-md mx-auto">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14357A] to-[#0C2356] flex items-center justify-center text-[#D9A520] shadow-sm">
              <FaStethoscope size={20} />
            </div>
            <div>
              <span className="font-bold text-xl text-[#0A192F]">JajaCare</span>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">UI Clinic</p>
            </div>
          </div>

          <Outlet />
        </div>

        <p className="absolute bottom-6 left-6 md:left-12 text-xs text-gray-400">
          © 2026 University of Ibadan Health Services
        </p>
      </div>

    </div>
  );
}