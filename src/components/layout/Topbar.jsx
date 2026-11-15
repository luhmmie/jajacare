
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  FiSearch, FiBell, FiPhoneCall, FiMenu, 
  FiChevronDown, FiLogOut, FiSettings, FiUser, FiCommand 
} from 'react-icons/fi';
import { FaStethoscope } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { ROLE_LABELS } from '../../constants/roles';

export default function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigate = (path) => {
    setShowProfileMenu(false);
    navigate(path);
  };

  const roleLabel = ROLE_LABELS[user?.role] || user?.role || 'Staff';

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick} 
          className="lg:hidden text-gray-500 hover:text-[#14357A] p-2 -ml-2"
        >
          <FiMenu size={20} />
        </button>

        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14357A] to-[#0C2356] flex items-center justify-center shadow-sm text-[#D9A520] group-hover:scale-105 transition-transform">
            <FaStethoscope size={20} />
          </div>
          <div className="hidden sm:flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-[#14357A] leading-none tracking-tight">JajaCare</span>
              <span className="text-[9px] font-bold text-[#14357A] bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded uppercase tracking-wider">EHR</span>
            </div>
            <span className="text-[9px] font-semibold text-gray-500 tracking-wider mt-0.5">
              UNIVERSITY HEALTH SERVICES
            </span>
          </div>
        </Link>
      </div>

      
      <div className="hidden md:flex items-center gap-4 flex-1 max-w-2xl mx-8">
        <div className="hidden xl:flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1.5 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
          <span className="text-xs font-bold text-[#10B981]">Active Shift • Morning</span>
        </div>
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search Matric No, Staff ID, Name..."
            className="w-full pl-9 pr-16 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#14357A]/20 focus:border-[#14357A] focus:bg-white transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 border border-gray-300 rounded text-[10px] font-sans font-semibold text-gray-500 bg-white">
              <FiCommand size={10} /> K
            </kbd>
          </div>
        </div>
      </div>

      
      <div className="flex items-center gap-3 md:gap-4">
        
      
        <button className="hidden lg:flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-3 py-1.5 rounded-md transition-colors">
          <FiPhoneCall size={14} className="animate-bounce" />
          <span className="text-xs font-bold tracking-wide">0800-UI-JAJA</span>
        </button>

        
        <button className="relative p-2 text-gray-500 hover:text-[#14357A] hover:bg-gray-100 rounded-full transition">
          <FiBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>

      
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#14357A] text-white flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-xs font-bold text-[#14357A] leading-tight">{user?.name || 'Staff Member'}</span>
              <span className="text-[10px] text-gray-500">{roleLabel}</span>
            </div>
            <FiChevronDown className="text-gray-400 hidden md:block" size={14} />
          </button>

          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                
                
                <div className="px-4 py-3 border-b border-gray-100 mb-1">
                  <p className="text-sm font-bold text-[#14357A] truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-bold text-[#14357A] bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded uppercase">
                      {roleLabel}
                    </span>
                    <span className="text-[9px] text-gray-400">{user?.staffId}</span>
                  </div>
                </div>
                
                
                <button 
                  onClick={() => handleNavigate('/profile')}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  <FiUser size={16} className="text-gray-400" /> My Profile
                </button>

              
                {user?.role === 'admin' && (
                  <button 
                    onClick={() => handleNavigate('/settings')}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <FiSettings size={16} className="text-gray-400" /> Admin Settings
                  </button>
                )}
                
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-semibold"
                  >
                    <FiLogOut size={16} /> End Session
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}