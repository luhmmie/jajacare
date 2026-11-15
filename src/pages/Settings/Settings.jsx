// src/pages/Settings/Settings.jsx
import { useState } from 'react';
import { 
  FiUsers, FiClock, FiShield, FiDownload, 
  FiSave, FiPlus, FiX, FiCheckCircle,
  FiAlertCircle, FiUserX, FiSettings
} from 'react-icons/fi';
import { 
  FaStethoscope, FaUserNurse, FaPills, FaUserMd 
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../context/NotificationContext';

const initialStaffData = [
  { id: 1, name: 'Dr. Adanna Eze, FMCP', role: 'CMO', staffId: 'UI/MED/4102', mdcn: 'MDCN: 74892', unit: 'GOPD Rm 1', access: 'Super Admin', status: 'Active', initials: 'AE', avatarBg: 'bg-blue-100 text-blue-700' },
  { id: 2, name: 'Dr. T. Olaolapo', role: 'Senior MO', staffId: 'UI/MED/3849', mdcn: 'MDCN: 61204', unit: 'GOPD Acute Rm 2', access: 'Clinical Officer', status: 'Active', initials: 'TO', avatarBg: 'bg-blue-50 text-blue-600' },
  { id: 3, name: 'Dr. S. Dania', role: 'Medical Officer', staffId: 'UI/MED/5210', mdcn: 'MDCN: 89412', unit: 'Student Health', access: 'Clinical Officer', status: 'Active', initials: 'SD', avatarBg: 'bg-amber-100 text-amber-700' },
  { id: 4, name: 'Matron Kemi Adebayo', role: 'CNO', staffId: 'UI/NUR/2901', mdcn: 'NMCN: 94819', unit: 'Triage Stn 2', access: 'Triage Lead', status: 'Active', initials: 'KA', avatarBg: 'bg-blue-100 text-blue-700' },
  { id: 5, name: 'Pharm. T. Alabi', role: 'Lead Pharmacist', staffId: 'UI/PHM/3480', mdcn: 'PCN: 35199', unit: 'Central Dispensary', access: 'Dispensary Lead', status: 'Active', initials: 'TA', avatarBg: 'bg-blue-100 text-blue-700' },
];

export default function Settings() {
  const { user } = useAuth();
  const { notifySuccess, notifyInfo } = useNotification();
  const [activeTab, setActiveTab] = useState('staff-management');
  const [staff, setStaff] = useState(initialStaffData);
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [staffToRevoke, setStaffToRevoke] = useState(null);

  const [newStaffForm, setNewStaffForm] = useState({
    title: 'Dr.', name: 'Dr. Kolapo Babalola', staffId: 'UI/MED/6104',
    email: 'k.babalola@jaja.ui.edu.ng', profession: 'Senior Medical Officer (SMO)',
    unit: 'GOPD Consulting Rm 3', license: 'MDCN: 72915', accessLevel: 'Prescribing MO'
  });

  if (user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4"><FiShield size={32} /></div>
        <h1 className="text-2xl font-bold text-[#14357A] mb-2">Access Denied</h1>
        <p className="text-gray-500">Only administrators can access the Clinic Settings page.</p>
      </div>
    );
  }

  const handleAddStaff = (e) => {
    e.preventDefault();
    const newStaff = {
      id: Date.now(),
      name: newStaffForm.name,
      role: newStaffForm.profession,
      staffId: newStaffForm.staffId,
      mdcn: newStaffForm.license,
      unit: newStaffForm.unit,
      access: newStaffForm.accessLevel,
      status: 'Active',
      initials: newStaffForm.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
      avatarBg: 'bg-[#F5B041]/20 text-[#D9A520]'
    };
    setStaff([newStaff, ...staff]);
    setRecentlyAddedId(newStaff.id);
    setIsAddStaffModalOpen(false);
    notifySuccess(`${newStaff.name} accredited successfully.`);
  };

  const confirmRevoke = () => {
    setStaff(staff.map(s => s.id === staffToRevoke.id ? { ...s, status: 'Suspended' } : s));
    setIsRevokeModalOpen(false);
    notifyInfo(`${staffToRevoke.name} privileges revoked.`);
    setStaffToRevoke(null);
  };

  const tabs = [
    { id: 'staff-management', label: 'User Management & Staff', icon: <FiUsers />, badge: staff.length },
    { id: 'clinic-hours', label: 'Clinic Configuration & Hours', icon: <FiClock /> },
    { id: 'tiship', label: 'TSHIP & NHIS Integration', icon: <FiShield />, alert: true },
    { id: 'security', label: 'Security & Access', icon: <FiShield /> },
  ];

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
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-[#14357A] text-[#14357A]' : 'border-transparent text-gray-500'}`}>
            {tab.icon} {tab.label}
            {tab.badge ? <span className="bg-[#14357A] text-white text-[9px] px-2 py-0.5 rounded-full">{tab.badge}</span> : null}
            {tab.alert && <span className="w-1.5 h-1.5 rounded-full bg-[#F5B041]"></span>}
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {[
              { label: 'Total Personnel', value: staff.length, sub: 'Accredited', icon: <FiUsers /> },
              { label: 'Medical Officers', value: '8', sub: 'On Duty', icon: <FaStethoscope /> },
              { label: 'Nurses', value: '16', sub: '4 Wards', icon: <FaUserNurse /> },
              { label: 'Pharmacy & Lab', value: '12', sub: 'Diagnostics', icon: <FaPills /> },
              { label: 'Leave', value: '3', sub: 'Rest', icon: <FiClock /> },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[10px] font-bold text-gray-500 uppercase">{stat.label}</p>
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#14357A] flex items-center justify-center">{stat.icon}</div>
                </div>
                <h3 className="text-3xl font-bold text-[#14357A]">{stat.value}</h3>
                <p className="text-[10px] text-gray-400 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-[#F8FAFC] border-b border-gray-200 px-6 py-4">
              <h3 className="font-bold text-[#14357A]">Clinical Staff Directory</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase">
                  <th className="px-6 py-3">Staff</th>
                  <th className="px-4 py-3">Credentials</th>
                  <th className="px-4 py-3">Unit</th>
                  <th className="px-4 py-3">Access</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {staff.map((s) => (
                  <tr key={s.id} className={`hover:bg-gray-50 ${recentlyAddedId === s.id ? 'bg-green-50/50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${s.avatarBg}`}>{s.initials}</div>
                        <div><p className="text-xs font-bold text-[#14357A]">{s.name}</p><p className="text-[9px] text-gray-500">{s.role}</p></div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs"><p className="font-semibold text-[#14357A]">{s.staffId}</p><p className="text-[9px] text-gray-500">{s.mdcn}</p></td>
                    <td className="px-4 py-4 text-xs text-gray-600">{s.unit}</td>
                    <td className="px-4 py-4"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[9px] font-bold">{s.access}</span></td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{s.status}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button onClick={() => { setStaffToRevoke(s); setIsRevokeModalOpen(true); }} className="text-gray-400 hover:text-red-600"><FiUserX size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(activeTab === 'clinic-hours' || activeTab === 'tiship' || activeTab === 'security') && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
          <FiSettings size={32} className="text-gray-300 mx-auto mb-4" />
          <h3 className="font-bold text-[#14357A] mb-2 capitalize">{activeTab.replace('-', ' ')}</h3>
          <p className="text-sm text-gray-500">This section is coming soon.</p>
        </div>
      )}

      {/* ADD STAFF MODAL */}
      {isAddStaffModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-[#14357A] px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2"><FaUserMd /> Register New Staff</h3>
              <button onClick={() => setIsAddStaffModalOpen(false)} className="text-white/70 hover:text-white"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleAddStaff} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1">Full Name</label>
                <input type="text" value={newStaffForm.name} onChange={(e) => setNewStaffForm({...newStaffForm, name: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Staff ID</label>
                  <input type="text" value={newStaffForm.staffId} onChange={(e) => setNewStaffForm({...newStaffForm, staffId: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">License</label>
                  <input type="text" value={newStaffForm.license} onChange={(e) => setNewStaffForm({...newStaffForm, license: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1">Email</label>
                <input type="email" value={newStaffForm.email} onChange={(e) => setNewStaffForm({...newStaffForm, email: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1">Professional Role</label>
                <select value={newStaffForm.profession} onChange={(e) => setNewStaffForm({...newStaffForm, profession: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none">
                  <option>Senior Medical Officer (SMO)</option>
                  <option>Medical Officer (MO)</option>
                  <option>Chief Nursing Officer (CNO)</option>
                  <option>Pharmacist</option>
                  <option>Lab Scientist</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsAddStaffModalOpen(false)} className="px-6 py-2.5 text-xs font-bold text-gray-600 bg-[#F8FAFC] border border-gray-200 rounded-md">Cancel</button>
                <button type="submit" className="px-6 py-2.5 text-xs font-bold text-white bg-[#14357A] rounded-md flex items-center gap-2"><FiCheckCircle /> Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REVOKE MODAL */}
      {isRevokeModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
              <h3 className="font-bold text-[#14357A] flex items-center gap-2"><FiAlertCircle className="text-red-600" /> Revoke Privileges</h3>
              <button onClick={() => setIsRevokeModalOpen(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-lg p-3">
                <p className="text-sm font-bold text-[#14357A]">{staffToRevoke?.name}</p>
                <p className="text-xs text-gray-500">{staffToRevoke?.role} • {staffToRevoke?.unit}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-xs font-bold text-red-700 mb-2">Implications:</p>
                <ul className="space-y-1 text-[10px] text-gray-700">
                  <li>• All pending e-Rx drafts quarantined</li>
                  <li>• Removed from duty roster</li>
                  <li>• SSO login revoked</li>
                  <li>• Action logged in MDCN trail</li>
                </ul>
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-red-600" />
                <span className="text-[10px] text-gray-600">I confirm that I am authorized to revoke clinical privileges in accordance with UI Health Services Bylaws.</span>
              </label>
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