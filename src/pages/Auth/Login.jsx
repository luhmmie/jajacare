
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { 
  FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight, 
  FiAlertCircle, FiShield 
} from 'react-icons/fi';
import { FaStethoscope, FaUserNurse, FaPills, FaUserTie } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const DUTY_ROLES = [
  { id: 'doctor', label: 'Doctor / MO', icon: <FaStethoscope /> },
  { id: 'nurse', label: 'Nursing & Triage', icon: <FaUserNurse /> },
  { id: 'receptionist', label: 'Records Desk', icon: <FiUser /> },
  { id: 'pharmacist', label: 'Pharmacy & Lab', icon: <FaPills /> },
  { id: 'admin', label: 'Admin Console', icon: <FaUserTie /> },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('doctor');
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!staffId.trim() || !password) {
      setError('Please enter both your Staff ID and password.');
      return;
    }

    setLoading(true);
    try {
      await login(staffId.trim(), password, selectedRole);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      
      
      <div className="mb-8">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#F5B041] uppercase tracking-widest">
            <span className="w-2 h-2 bg-[#F5B041] rounded-full"></span> Secure Clinical Station
          </div>
          <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">v4.8.2 Active</span>
        </div>
        <h1 className="text-3xl font-bold text-[#0A192F] mb-2">Staff Portal Login</h1>
        <p className="text-sm text-gray-500">
          Sign in with your clinical credentials. Select the workstation that matches your role.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-2 bg-red-50 text-red-700 p-3 rounded-md text-sm border border-red-200">
          <FiAlertCircle className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        
        {/* Role Selection (5 tabs) */}
        <div className="mb-6">
          <div className="flex justify-between items-end mb-2">
            <label className="text-xs font-bold text-[#0A192F]">Select Active Duty Role</label>
            <span className="text-[10px] text-gray-400">Filters workstation dashboard</span>
          </div>
          <div className="grid grid-cols-5 gap-2 bg-[#F8FAFC] p-1.5 rounded-lg border border-gray-200">
            {DUTY_ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-md transition text-[10px] font-semibold gap-1 ${
                  selectedRole === r.id 
                    ? 'bg-[#0A192F] text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <div className="text-base">{r.icon}</div>
                <span className="text-center leading-tight">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Staff ID */}
        <div className="mb-4">
          <div className="flex justify-between items-end mb-1.5">
            <label className="text-xs font-bold text-[#0A192F]">Staff ID or Institutional Email</label>
            <span className="text-[10px] text-gray-400">e.g., UI/MED/4102</span>
          </div>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              placeholder="Enter your Staff ID"
              className="w-full pl-9 pr-3 py-3 rounded-md border border-gray-200 bg-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF]"
              disabled={loading}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="flex justify-between items-end mb-1.5">
            <label className="text-xs font-bold text-[#0A192F]">Password</label>
            <Link to="/forgot-password" className="text-[10px] font-bold text-[#0A192F] hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter clinical access passphrase"
              className="w-full pl-9 pr-10 py-3 rounded-md border border-gray-200 bg-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF]"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={rememberMe} 
              onChange={() => setRememberMe(!rememberMe)}
              className="w-4 h-4 text-[#0066FF] rounded border-gray-300 focus:ring-[#0066FF]"
            />
            <span className="text-xs text-gray-600 font-medium">Remember this workstation</span>
          </label>
          <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Campus LAN Verified
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0A192F] hover:bg-[#122B4A] text-white font-bold py-3.5 rounded-md flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In to Clinic Workspace'} <FiArrowRight />
        </button>
      </form>

      <div className="mt-8 flex items-center justify-between text-[10px] text-gray-400">
        <span className="flex items-center gap-1"><FiShield /> Protected by 2FA & Encrypted Session</span>
        <span>UI ICT Support: ext 1042</span>
      </div>
    </div>
  );
}