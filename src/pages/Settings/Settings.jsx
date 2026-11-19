import { useState, useEffect } from 'react';
import {
  FiUsers, FiClock, FiShield, FiSave, FiPlus, FiX, FiCheckCircle,
  FiAlertCircle, FiUserX, FiSettings
} from 'react-icons/fi';
import { FaStethoscope, FaUserNurse, FaPills, FaUserMd } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../context/NotificationContext';
import {
  listUsers,
  createUser,
  revokeUser,
  updateUser,
} from '../../services/userService';
import { getClinicSettings, updateClinicSettings } from '../../services/settingsService';

export default function Settings() {
  const { user } = useAuth();
  const { notifySuccess, notifyError, notifyInfo } = useNotification();
  const [activeTab, setActiveTab] = useState('staff-management');
  const [staff, setStaff] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [staffToRevoke, setStaffToRevoke] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [clinicSettings, setClinicSettings] = useState(null);
  const [clinicForm, setClinicForm] = useState({ open: '08:00', close: '16:00', slotMinutes: 15 });
  const [savingClinic, setSavingClinic] = useState(false);

  const [newStaffForm, setNewStaffForm] = useState({
    name: '',
    staffId: '',
    email: '',
    password: '',
    phone: '',
    role: 'doctor',
    licenseNumber: '',
  });

  useEffect(() => {
    if (user?.role !== 'admin') return;
    loadStaff();
    loadClinic();
  }, [user]);

  async function loadStaff() {
    setLoadingStaff(true);
    try {
      const data = await listUsers({});
      setStaff(data || []);
    } catch (err) {
      notifyError(err.message || 'Failed to load staff');
    } finally {
      setLoadingStaff(false);
    }
  }

  async function loadClinic() {
    try {
      const data = await getClinicSettings();
      setClinicSettings(data);
      setClinicForm({
        open: data.workingHours?.open || '08:00',
        close: data.workingHours?.close || '16:00',
        slotMinutes: data.slotMinutes || 15,
      });
    } catch (err) {
      notifyError(err.message || 'Failed to load clinic settings');
    }
  }

  if (user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4"><FiShield size={32} /></div>
        <h1 className="text-2xl font-bold text-[#14357A] mb-2">Access Denied</h1>
        <p className="text-gray-500">Only administrators can access the Clinic Settings page.</p>
      </div>
    );
  }

  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (!newStaffForm.name || !newStaffForm.staffId || !newStaffForm.email || !newStaffForm.password) {
      notifyError('Name, staff ID, email and password are required');
      return;
    }
    setSubmitting(true);
    try {
      const created = await createUser(newStaffForm);
      setRecentlyAddedId(created.id);
      setIsAddStaffModalOpen(false);
      notifySuccess(`${created.name} accredited successfully`);
      setNewStaffForm({ name: '', staffId: '', email: '', password: '', phone: '', role: 'doctor', licenseNumber: '' });
      loadStaff();
    } catch (err) {
      notifyError(err.message || 'Failed to create staff');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmRevoke = async () => {
    if (!staffToRevoke) return;
    try {
      await revokeUser(staffToRevoke.id, 'Admin revoke from settings');
      notifyInfo(`${staffToRevoke.name} privileges revoked`);
      setIsRevokeModalOpen(false);
      setStaffToRevoke(null);
      loadStaff();
    } catch (err) {
      notifyError(err.message || 'Failed to revoke');
    }
  };

  const handleSaveClinic = async () => {
    setSavingClinic(true);
    try {
      const updated = await updateClinicSettings({
        workingHours: { open: clinicForm.open, close: clinicForm.close },
        slotMinutes: Number(clinicForm.slotMinutes),
      });
      setClinicSettings(updated);
      notifySuccess('Clinic settings saved');
    } catch (err) {
      notifyError(err.message || 'Failed to save settings');
    } finally {
      setSavingClinic(false);
    }
  };

  const tabs = [
    { id: 'staff-management', label: 'User Management & Staff', icon: <FiUsers />, badge: staff.length },
    { id: 'clinic-hours', label: 'Clinic Configuration & Hours', icon: <FiClock /> },
  ];

  const doctorCount = staff.filter((s) => s.role === 'doctor').length;
  const nurseCount = staff.filter((s) => s.role === 'nurse').length;
  const pharmacistCount = staff.filter((s) => s.role === 'pharmacist').length;
  const activeCount = staff.filter((s) => s.isActive).length;

  return (
    <div className="max-w-[1600px] mx-auto pb-10 space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          <span>Dashboard</span> <span className="text-gray-300">/</span> <span className="font-semibold text-[#14357A]">System Settings</span>
        </div>
        <h1 className="text-3xl font-bold text-[#14357A] mb-1">Clinic Administration & Settings</h1>
        <p className="text-sm text-gray-500">Configure Jaja Clinic operations, manage staff, and review system access.</p>
      </div>

      <div className="flex overflow-x-auto border-b border-gray-200 bg-white rounded-xl px-2 pt-2 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-[#14357A] text-[#14357A]' : 'border-transparent text-gray-500'}`}
          >
            {tab.icon} {tab.label}
            {tab.badge ? <span className="bg-[#14357A] text-white text-[9px] px-2 py-0.5 rounded-full">{tab.badge}</span> : null}
          </button>
        ))}
      </div>

      {activeTab === 'staff-management' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button onClick={() => setIsAddStaffModalOpen(true)} className="bg-[#F5B041] text-[#0A192F] font-bold px-4 py-2 rounded-lg text-xs shadow-sm flex items-center gap-2">
              <FiPlus /> Add New Staff Member
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Total Personnel</p>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#14357A] flex items-center justify-center"><FiUsers /></div>
              </div>
              <h3 className="text-3xl font-bold text-[#14357A]">{staff.length}</h3>
              <p className="text-[10px] text-gray-400 mt-1">{activeCount} active</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Doctors</p>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#14357A] flex items-center justify-center"><FaStethoscope /></div>
              </div>
              <h3 className="text-3xl font-bold text-[#14357A]">{doctorCount}</h3>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Nurses</p>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#14357A] flex items-center justify-center"><FaUserNurse /></div>
              </div>
              <h3 className="text-3xl font-bold text-[#14357A]">{nurseCount}</h3>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Pharmacy</p>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#14357A] flex items-center justify-center"><FaPills /></div>
              </div>
              <h3 className="text-3xl font-bold text-[#14357A]">{pharmacistCount}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-[#F8FAFC] border-b border-gray-200 px-6 py-4">
              <h3 className="font-bold text-[#14357A]">Clinical Staff Directory</h3>
            </div>
            {loadingStaff ? (
              <p className="text-sm text-gray-500 text-center py-8">Loading staff...</p>
            ) : staff.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No staff records.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase">
                    <th className="px-6 py-3">Staff</th>
                    <th className="px-4 py-3">Staff ID</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {staff.map((s) => {
                    const initials = (s.name || '').split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
                    return (
                      <tr key={s.id} className={`hover:bg-gray-50 ${recentlyAddedId === s.id ? 'bg-green-50/50' : ''}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-blue-100 text-blue-700">{initials}</div>
                            <div>
                              <p className="text-xs font-bold text-[#14357A]">{s.name}</p>
                              {s.licenseNumber && <p className="text-[9px] text-gray-500">{s.licenseNumber}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-xs font-semibold text-[#14357A]">{s.staffId}</td>
                        <td className="px-4 py-4 text-xs text-gray-600">{s.email}</td>
                        <td className="px-4 py-4">
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[9px] font-bold uppercase">{s.role}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {s.isActive ? 'Active' : 'Revoked'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          {s.isActive && s.id !== user?.id && (
                            <button
                              onClick={() => { setStaffToRevoke(s); setIsRevokeModalOpen(true); }}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <FiUserX size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {activeTab === 'clinic-hours' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl">
          <h3 className="font-bold text-[#14357A] mb-4 flex items-center gap-2"><FiClock /> Clinic Working Hours</h3>
          {clinicSettings ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Open Time</label>
                  <input type="time" value={clinicForm.open} onChange={(e) => setClinicForm({ ...clinicForm, open: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Close Time</label>
                  <input type="time" value={clinicForm.close} onChange={(e) => setClinicForm({ ...clinicForm, close: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Slot Length (minutes)</label>
                  <input type="number" value={clinicForm.slotMinutes} onChange={(e) => setClinicForm({ ...clinicForm, slotMinutes: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={handleSaveClinic} disabled={savingClinic} className="bg-[#14357A] text-white text-xs font-bold px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50">
                  <FiSave /> {savingClinic ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Loading settings...</p>
          )}
        </div>
      )}

      {isAddStaffModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-[#14357A] px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2"><FaUserMd /> Register New Staff</h3>
              <button onClick={() => setIsAddStaffModalOpen(false)} className="text-white/70 hover:text-white"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleAddStaff} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1">Full Name *</label>
                <input type="text" required value={newStaffForm.name} onChange={(e) => setNewStaffForm({ ...newStaffForm, name: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Staff ID *</label>
                  <input type="text" required value={newStaffForm.staffId} onChange={(e) => setNewStaffForm({ ...newStaffForm, staffId: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">License Number</label>
                  <input type="text" value={newStaffForm.licenseNumber} onChange={(e) => setNewStaffForm({ ...newStaffForm, licenseNumber: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1">Email *</label>
                <input type="email" required value={newStaffForm.email} onChange={(e) => setNewStaffForm({ ...newStaffForm, email: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Phone</label>
                  <input type="tel" value={newStaffForm.phone} onChange={(e) => setNewStaffForm({ ...newStaffForm, phone: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Role *</label>
                  <select value={newStaffForm.role} onChange={(e) => setNewStaffForm({ ...newStaffForm, role: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none">
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="pharmacist">Pharmacist</option>
                    <option value="receptionist">Receptionist</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1">Initial Password *</label>
                <input type="text" required value={newStaffForm.password} onChange={(e) => setNewStaffForm({ ...newStaffForm, password: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsAddStaffModalOpen(false)} className="px-6 py-2.5 text-xs font-bold text-gray-600 bg-[#F8FAFC] border border-gray-200 rounded-md">Cancel</button>
                <button type="submit" disabled={submitting} className="px-6 py-2.5 text-xs font-bold text-white bg-[#14357A] rounded-md flex items-center gap-2 disabled:opacity-50">
                  <FiCheckCircle /> {submitting ? 'Saving...' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isRevokeModalOpen && staffToRevoke && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
              <h3 className="font-bold text-[#14357A] flex items-center gap-2"><FiAlertCircle className="text-red-600" /> Revoke Privileges</h3>
              <button onClick={() => setIsRevokeModalOpen(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-lg p-3">
                <p className="text-sm font-bold text-[#14357A]">{staffToRevoke.name}</p>
                <p className="text-xs text-gray-500">{staffToRevoke.role} • {staffToRevoke.staffId}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-xs font-bold text-red-700 mb-2">This action will:</p>
                <ul className="space-y-1 text-[10px] text-gray-700">
                  <li>• Deactivate the account</li>
                  <li>• Prevent all further logins</li>
                  <li>• Preserve audit history</li>
                </ul>
              </div>
            </div>
            <div className="bg-[#F8FAFC] border-t border-gray-200 px-6 py-4 flex justify-end gap-2">
              <button onClick={() => setIsRevokeModalOpen(false)} className="px-6 py-2.5 text-xs font-bold text-gray-600 bg-white border border-gray-300 rounded-md">Cancel</button>
              <button onClick={confirmRevoke} className="px-6 py-2.5 text-xs font-bold text-white bg-red-600 rounded-md flex items-center gap-2"><FiUserX /> Revoke</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}