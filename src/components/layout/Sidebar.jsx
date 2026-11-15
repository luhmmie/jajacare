
import { NavLink } from 'react-router';
import { 
  FiGrid, FiUsers, FiCalendar, FiActivity, 
  FiSettings, FiX, FiLogOut, FiUserPlus, FiBox
} from 'react-icons/fi';
import { FaStethoscope } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../constants/roles';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiGrid size={20} />, roles: [ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.NURSE, ROLES.DOCTOR, ROLES.PHARMACIST] },
    { name: 'Patients List', path: '/patients', icon: <FiUsers size={20} />, roles: [ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.NURSE, ROLES.DOCTOR] },
    { name: 'Register Patient', path: '/patients/register', icon: <FiUserPlus size={20} />, roles: [ROLES.ADMIN, ROLES.RECEPTIONIST] },
    { name: 'Appointments', path: '/appointments', icon: <FiCalendar size={20} />, roles: [ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.NURSE, ROLES.DOCTOR] },
    { name: 'Consultation', path: '/consultation', icon: <FaStethoscope size={20} />, roles: [ROLES.DOCTOR] },
    { name: 'Pharmacy', path: '/pharmacy', icon: <FiBox size={20} />, roles: [ROLES.PHARMACIST, ROLES.ADMIN] }, // 👈 NEW
    { name: 'Settings', path: '/settings', icon: <FiSettings size={20} />, roles: [ROLES.ADMIN] },
  ];

  const filteredNav = navItems.filter((item) => item.roles.includes(user?.role));

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#14357A] text-white flex flex-col shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        <div className="h-16 flex items-center justify-between px-6 bg-[#0C2356] border-b border-blue-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D9A520] flex items-center justify-center text-[#14357A]">
              <FaStethoscope size={16} />
            </div>
            <span className="font-bold text-lg tracking-wide">JajaCare</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-blue-200 hover:text-white">
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2">
          <div className="px-3 text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2">
            Clinical Workspace
          </div>
          
          {filteredNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose()}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-3 rounded-lg transition-colors font-medium text-sm
                ${isActive ? 'bg-[#D9A520] text-[#14357A] shadow-md' : 'text-blue-100 hover:bg-blue-800 hover:text-white'}
              `}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-900 bg-[#0C2356]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-800 flex items-center justify-center font-bold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold truncate max-w-[100px]">{user?.name}</span>
                <span className="text-[10px] text-blue-300 capitalize">{user?.role}</span>
              </div>
            </div>
            <button onClick={logout} title="Log out" className="p-2 text-blue-300 hover:text-red-400 hover:bg-blue-900 rounded-md transition-colors">
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}