import { useState } from 'react';
import {
  FiUser, FiLock, FiSave, FiCheckCircle,
  FiShield, FiMail, FiPhone, FiBriefcase,
  FiCalendar, FiKey
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { ROLE_LABELS } from '../../constants/roles';
import { useNotification } from '../../context/NotificationContext';
import { updateMyProfile, updateMyPassword } from '../../services/userService';
import { saveUser } from '../../lib/apiClient';

export default function Profile() {
  const { user } = useAuth();
  const { notifySuccess, notifyError } = useNotification();

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
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (savingProfile) return;
    setSavingProfile(true);
    try {
      const updated = await updateMyProfile(profileForm);
      saveUser(updated);
      notifySuccess('Profile updated');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      notifyError(err.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (savingPassword) return;
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      notifyError('Please fill in both password fields');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      notifyError('Passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      notifyError('New password must be at least 6 characters');
      return;
    }
    setSavingPassword(true);
    try {
      await updateMyPassword(passwordForm.currentPassword, passwordForm.newPassword);
      notifySuccess('Password updated');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      notifyError(err.message || 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

  const roleLabel = ROLE_LABELS[user?.role] || user?.role || 'Staff';
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : '??';

  return (
    <div className="max-w-[1400px] mx-auto pb-10 space-y-6">
      {saved && (
        <div className="fixed top-6 right-6 z-50 bg-white border-l-4 border-green-500 rounded-lg shadow-2xl p-4">
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

      <div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          <span>Dashboard</span> <span className="text-gray-300">/</span>
          <span className="font-semibold text-[#14357A]">My Profile</span>
        </div>
        <h1 className="text-3xl font-bold text-[#14357A] mb-1">My Profile</h1>
        <p className="text-sm text-gray-500">Manage your personal information, contact details, and security settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

              <div className="w-full mt-6 space-y-3 text-left">
                <div className="flex items-start gap-2 text-[11px]">
                  <FiBriefcase className="text-blue-300 mt-0.5 shrink-0" size={12} />
                  <div>
                    <p className="text-blue-300 text-[9px] uppercase font-bold">Staff ID</p>
                    <p className="font-semibold">{user?.staffId || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-[11px]">
                  <FiMail className="text-blue-300 mt-0.5 shrink-0" size={12} />
                  <div className="min-w-0">
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
                {user?.licenseNumber && (
                  <div className="flex items-start gap-2 text-[11px]">
                    <FiShield className="text-blue-300 mt-0.5 shrink-0" size={12} />
                    <div>
                      <p className="text-blue-300 text-[9px] uppercase font-bold">License</p>
                      <p className="font-semibold">{user.licenseNumber}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2 text-[11px]">
                  <FiCalendar className="text-blue-300 mt-0.5 shrink-0" size={12} />
                  <div>
                    <p className="text-blue-300 text-[9px] uppercase font-bold">Joined</p>
                    <p className="font-semibold">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-center gap-1 text-[10px] text-blue-200">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  Session Active
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveProfile} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="bg-blue-50 text-[#14357A] p-2 rounded-lg"><FiUser size={20} /></div>
              <div>
                <h2 className="font-bold text-[#14357A]">Personal Information</h2>
                <p className="text-xs text-gray-500">Update your name, email, and phone number.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md focus:border-[#14357A] outline-none transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md focus:border-[#14357A] outline-none transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md focus:border-[#14357A] outline-none transition"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={savingProfile}
                className="bg-[#14357A] hover:bg-[#0C2356] text-white font-semibold px-6 py-2.5 rounded-md flex items-center gap-2 transition shadow-sm disabled:opacity-50"
              >
                <FiSave /> {savingProfile ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>

          <form onSubmit={handleChangePassword} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="bg-red-50 text-red-500 p-2 rounded-lg"><FiLock size={20} /></div>
              <div>
                <h2 className="font-bold text-[#14357A]">Security & Password</h2>
                <p className="text-xs text-gray-500">Change your login password. Passwords must be at least 6 characters.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Current Password *</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md focus:border-[#14357A] outline-none transition"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">New Password *</label>
                  <div className="relative">
                    <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md focus:border-[#14357A] outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Confirm New Password *</label>
                  <div className="relative">
                    <FiKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md focus:border-[#14357A] outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <p className="text-[10px] text-gray-500 flex items-center gap-1">
                <FiShield className="text-[#F5B041]" /> Protected by encrypted session
              </p>
              <button
                type="submit"
                disabled={savingPassword}
                className="bg-[#14357A] hover:bg-[#0C2356] text-white font-semibold px-6 py-2.5 rounded-md flex items-center gap-2 transition shadow-sm disabled:opacity-50"
              >
                <FiLock /> {savingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}