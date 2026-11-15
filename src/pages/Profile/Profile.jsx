// src/pages/Profile/Profile.jsx
import { useState } from 'react';
import { 
  FiUser, FiLock, FiSave, FiCheckCircle, 
  FiShield, FiMail, FiPhone, FiBriefcase,
  FiCalendar, FiKey
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { ROLE_LABELS } from '../../constants/roles';

export default function Profile() {
  const { user } = useAuth();
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [saved, setSaved] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // In real app: await updateProfile(profileForm)
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    // In real app: await changePassword(...)
    alert('Password updated successfully.');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const roleLabel = ROLE_LABELS[user?.role] || user?.role || 'Staff';
  const initials = user?.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || '??';

  return (
    <div className="max-w-[1400px] mx-auto pb-10 space-y-6">
      
      {/* SUCCESS TOAST */}
      {saved && (
        <div className="fixed top-6 right-6 z-50 bg-white border-l-4 border-green-500 rounded-lg shadow-2xl p-4 animate-in slide-in-from-right-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <FiCheckCircle size={16} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#14357A]">Profile Updated</p>
              <p className="text-[10px] text-gray-500">Your changes have been saved.</p>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          <span>Dashboard</span> <span className="text-gray-300">/</span> 
          <span className="font-semibold text-[#14357A]">My Profile</span>
        </div>
        <h1 className="text-3xl font-bold text-[#14357A] mb-1">My Profile</h1>
        <p className="text-sm text-gray-500">Manage your personal information, contact details, and security settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ─── Profile Card (Sidebar) ─── */}
        <div className="lg:col-span-1">
          <div className="bg-[#14357A] text-white p-6 rounded-xl shadow-lg relative overflow-hidden sticky top-24">
            <div className="absolute top-0 right-0 bg-[#F5B041] text-[#0A192F] text-[9px] font-bold px-3 py-1 rounded-bl-lg">
              Active Session
            </div>
            
            <div className="flex flex-col items-center text-center mt-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F5B041] to-[#D9A520] text-[#0A192F] flex items-center justify-center text-3xl font-bold border-4 border-white/20 mb-4">
                {initials}
              </div>
              
              <h2 className="font-bold text-lg">{user?.name || 'Staff Member'}</h2>
              <p className="text-xs text-blue-200 mb-1">{roleLabel}</p>
              <p className="text-[10px] text-blue-300">UI Health Services</p>
              
              <div className="w-full mt-6 space-y-2 text-left">
                <div className="flex items-start gap-2 text-[11px]">
                  <FiBriefcase className="text-blue-300 mt-0.5 shrink-0" size={12} />
                  <div>
                    <p className="text-blue-300 text-[9px] uppercase font-bold">Staff ID</p>
                    <p className="font-semibold">{user?.staffId || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-[11px]">
                  <FiMail className="text-blue-300 mt-0.5 shrink-0" size={12} />
                  <div>
                    <p className="text-blue-300 text-[9px] uppercase font-bold">Email</p>
                    <p className="font-semibold truncate">{user?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-[11px]">
                  <FiPhone className="text-blue-300 mt-0.5 shrink-0" size={12} />
                  <div>
                    <p className="text-blue-300 text-[9px] uppercase font-bold">Phone</p>
                    <p className="font-semibold">{user?.phone || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-[11px]">
                  <FiShield className="text-blue-300 mt-0.5 shrink-0" size={12} />
                  <div>
                    <p className="text-blue-300 text-[9px] uppercase font-bold">2FA Status</p>
                    <p className="font-semibold flex items-center gap-1 text-green-300">
                      <FiCheckCircle size={10} /> Enabled
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Edit Forms ─── */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Personal Info */}
          <form onSubmit={handleSaveProfile} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-[#14357A] mb-4 flex items-center gap-2">
              <FiUser /> Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none focus:border-[#14357A]" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Staff ID</label>
                <input 
                  type="text" 
                  value={user?.staffId || 'N/A'}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none focus:border-[#14357A]" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none focus:border-[#14357A]" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Role</label>
                <input 
                  type="text" 
                  value={roleLabel}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Department</label>
                <input 
                  type="text" 
                  value="UI Health Services"
                  readOnly
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-500 outline-none" 
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
              <button type="button" className="px-4 py-2 text-xs font-bold text-gray-600 bg-[#F8FAFC] border border-gray-200 rounded-md hover:bg-gray-100">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2 text-xs font-bold text-white bg-[#14357A] rounded-md hover:bg-[#0C2356] flex items-center gap-2">
                <FiSave /> Save Changes
              </button>
            </div>
          </form>

          {/* Change Password */}
          <form onSubmit={handleChangePassword} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-[#14357A] mb-1 flex items-center gap-2">
              <FiLock /> Change Password
            </h3>
            <p className="text-xs text-gray-500 mb-4">Use a strong passphrase of at least 12 characters.</p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Current Password</label>
                <div className="relative">
                  <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input 
                    type="password" 
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none focus:border-[#14357A]" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">New Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none focus:border-[#14357A]" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none focus:border-[#14357A]" 
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
              <button 
                type="button" 
                onClick={() => setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })}
                className="px-4 py-2 text-xs font-bold text-gray-600 bg-[#F8FAFC] border border-gray-200 rounded-md hover:bg-gray-100"
              >
                Clear
              </button>
              <button type="submit" className="px-6 py-2 text-xs font-bold text-white bg-[#14357A] rounded-md hover:bg-[#0C2356] flex items-center gap-2">
                <FiLock /> Update Password
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}