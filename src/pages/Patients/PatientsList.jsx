// src/pages/Patients/PatientsList.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  FiSearch, FiPrinter, FiUserPlus, FiUsers, 
  FiActivity, FiHeart, FiX, FiUploadCloud, 
  FiFileText, FiBriefcase 
} from 'react-icons/fi';
import { FaStethoscope, FaHospital } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const patientsData = [
  { id: 'JC-2026-0042', name: 'Oluwaseun Adeleke', initials: 'OA', avatarBg: 'bg-blue-100 text-blue-700', matric: 'Matric: 214567', faculty: 'Science', dept: 'Computer Science', hall: 'Mellanby Hall', age: '21', sex: 'M', visitTime: 'Today, 08:30 AM', visitDesc: 'OPD Clinic 1', status: 'Waiting', statusColor: 'bg-amber-100 text-amber-700' },
  { id: 'JC-2026-0039', name: 'Chidinma Balogun', initials: 'CB', avatarBg: 'bg-red-100 text-red-700', matric: 'Matric: 220914', faculty: 'Technology', dept: 'Mechanical Eng.', hall: 'Queen Idia Hall', age: '19', sex: 'F', visitTime: 'Today, 07:15 AM', visitDesc: 'Ward 2 - Bed 4', status: 'Emergency', statusColor: 'bg-red-100 text-red-700' },
  { id: 'JC-2026-0028', name: 'Ibrahim Al-Hassan', initials: 'IA', avatarBg: 'bg-blue-100 text-blue-700', matric: 'Staff ID: ST-8812', faculty: 'Arts', dept: 'History & Diplomatic', hall: 'Staff Quarters - Sankore', age: '48', sex: 'M', visitTime: 'Yesterday', visitDesc: 'Routine Checkup', status: 'Active', statusColor: 'bg-blue-50 text-blue-700' },
  { id: 'JC-2026-0019', name: 'Folashade Enitan', initials: 'FE', avatarBg: 'bg-[#F5B041]/20 text-[#F5B041]', matric: 'Matric: 219803', faculty: 'Clinical Sciences', dept: 'Physiology', hall: 'Kuti Hall', age: '22', sex: 'F', visitTime: '14 Oct 2026', visitDesc: 'Pharmacy Dispensed', status: 'Active', statusColor: 'bg-blue-50 text-blue-700' },
  { id: 'JC-2026-0015', name: 'Emeka Tobechukwu', initials: 'ET', avatarBg: 'bg-blue-100 text-blue-700', matric: 'Matric: 226910', faculty: 'Social Sciences', dept: 'Economics', hall: 'Independence Hall', age: '20', sex: 'M', visitTime: 'Today, 09:10 AM', visitDesc: 'Vitals Screening', status: 'Waiting', statusColor: 'bg-amber-100 text-amber-700' },
];

export default function PatientsList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const canRegister = user?.role === 'admin' || user?.role === 'receptionist';

  const SHOW_EMPTY_STATE = false;
  const [searchTerm, setSearchTerm] = useState(SHOW_EMPTY_STATE ? 'JC-2026-UNREG' : '');
  const [facultyFilter, setFacultyFilter] = useState('All Faculties');
  const [hallFilter, setHallFilter] = useState('All Halls');

  const currentPatients = SHOW_EMPTY_STATE ? [] : patientsData;

  return (
    <div className="max-w-[1600px] mx-auto pb-10 space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-[#14357A] uppercase tracking-wider bg-blue-100 px-2 py-0.5 rounded">Registry Desk 04</span>
            <span className="text-[10px] text-gray-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Academic Year 2025/2026
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#14357A] mb-1">Patient Directory & Records</h1>
          <p className="text-sm text-gray-500">Manage registered University of Ibadan students, staff members, and hospital cards.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto no-print">
          <button 
            onClick={() => window.print()}
            className="flex-1 md:flex-none bg-white border border-gray-200 text-[#14357A] font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm"
          >
            <FiPrinter /> Print Daily Register
          </button>
          {canRegister && (
            <button 
              onClick={() => navigate('/patients/register')}
              className="flex-1 md:flex-none bg-[#14357A] hover:bg-[#0C2356] text-white font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"
            >
              <FiUserPlus /> Register New Patient
            </button>
          )}
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="no-print bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Matric No, Name, or Staff ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm focus:border-[#14357A] outline-none" 
            />
          </div>
          <select className="px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm text-gray-600 outline-none w-full md:w-auto">
            <option>Faculty: {facultyFilter}</option>
          </select>
          <select className="px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm text-gray-600 outline-none w-full md:w-auto">
            <option>Hall: {hallFilter}</option>
          </select>
          <select className="px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm text-gray-600 outline-none w-full md:w-auto">
            <option>2025/2026 Session</option>
          </select>
          <select className="px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm text-gray-600 outline-none w-full md:w-auto">
            <option>Status: All Active</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-2">Active Filters:</span>
          {SHOW_EMPTY_STATE && (
            <>
              <span className="flex items-center gap-1 bg-blue-50 text-[#14357A] border border-blue-100 px-2 py-1 rounded text-[10px] font-bold">
                Session: 2025/2026 <FiX className="cursor-pointer hover:text-red-500" />
              </span>
              <span className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 px-2 py-1 rounded text-[10px] font-bold">
                Status: Inactive / Unregistered <FiX className="cursor-pointer hover:text-red-500" />
              </span>
              <span className="flex items-center gap-1 bg-gray-100 text-gray-700 border border-gray-200 px-2 py-1 rounded text-[10px] font-bold">
                Query: "JC-2026-UNREG" <FiX className="cursor-pointer hover:text-red-500" />
              </span>
            </>
          )}
          <button className="text-[10px] font-bold text-[#14357A] ml-auto hover:underline">Reset all filters</button>
          <span className="text-[10px] text-gray-500 hidden sm:inline">Showing {currentPatients.length} of {SHOW_EMPTY_STATE ? '0' : '1,482'} records</span>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 hidden md:flex text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          <div className="w-[25%]">Patient Name & ID</div>
          <div className="w-[15%]">Matric / Staff No.</div>
          <div className="w-[20%]">Faculty / Residence</div>
          <div className="w-[15%]">TISHIP / NHIS Status</div>
          <div className="w-[15%]">Clinical Status</div>
          <div className="w-[10%] text-right no-print">Actions</div>
        </div>

        {currentPatients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="relative mb-6">
              <div className="absolute -top-3 -right-4 bg-[#F5B041] text-[#14357A] text-[10px] font-bold px-2 py-0.5 rounded shadow">0 Matches</div>
              <div className="w-20 h-20 bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl flex items-center justify-center text-[#14357A]">
                <FiFileText size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#14357A] mb-2">No Patient Records Found</h3>
            <p className="text-sm text-gray-500 max-w-lg mb-8">
              There are no registered patients matching the selected criteria or session filter. Search by matric number, clear active filters, or register a new student or staff patient.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl justify-center mb-10">
              {canRegister && (
                <button onClick={() => navigate('/patients/register')} className="bg-[#14357A] hover:bg-[#0C2356] text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition w-full sm:w-auto">
                  <FiUserPlus /> Register New Patient
                </button>
              )}
              <button className="bg-[#F8FAFC] border border-gray-200 text-gray-600 font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition w-full sm:w-auto">
                <FiX /> Clear All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {currentPatients.map((p) => (
              <div key={p.id} className="flex flex-col md:flex-row md:items-center px-6 py-4 hover:bg-gray-50 transition">
                
                <div className="w-full md:w-[25%] flex items-center gap-3 mb-2 md:mb-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${p.avatarBg}`}>
                    {p.initials}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#14357A]">{p.name}</p>
                    <p className="text-[10px] text-gray-500">{p.id}</p>
                  </div>
                </div>

                <div className="w-full md:w-[15%] text-xs text-gray-600 mb-1 md:mb-0">
                  {p.matric}
                </div>

                <div className="w-full md:w-[20%] text-xs mb-1 md:mb-0">
                  <p className="font-semibold text-gray-700">{p.faculty}</p>
                  <p className="text-[10px] text-gray-500">{p.dept} • {p.hall}</p>
                </div>

                <div className="w-full md:w-[15%] text-xs mb-1 md:mb-0">
                  <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded">Active</span>
                </div>

                <div className="w-full md:w-[15%] text-xs mb-1 md:mb-0">
                  <p className="font-semibold text-gray-700">{p.status}</p>
                  <p className="text-[10px] text-gray-500">{p.visitTime}</p>
                </div>

                <div className="w-full md:w-[10%] flex md:justify-end gap-2 mt-2 md:mt-0 no-print">
                  <button onClick={() => navigate(`/patients/${p.id}`)} className="text-xs font-bold text-[#14357A] bg-blue-50 px-3 py-1.5 rounded hover:bg-blue-100 transition">View</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM PANELS (hidden in print) */}
      <div className="no-print grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-sm text-[#14357A]">TISHIP / NHIS Gateway</h3>
              <div className="w-8 h-8 rounded bg-blue-50 text-[#14357A] flex items-center justify-center"><FiHeart size={16} /></div>
            </div>
            <p className="text-xs font-bold text-[#14357A] mb-2">Live Insurance Validator</p>
            <p className="text-[10px] text-gray-500 mb-4">Direct portal connection with University of Ibadan Tertiary Students Health Insurance Programme is active.</p>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-amber-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Gateway Ready</span>
            <span className="text-gray-400">Latency: 42ms</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Observation Units</p>
                <h3 className="font-bold text-sm text-[#14357A]">Jaja Ward Capacity</h3>
              </div>
              <div className="w-8 h-8 rounded bg-blue-50 text-[#14357A] flex items-center justify-center"><FaHospital size={16} /></div>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
              <span>Male & Female Wards</span>
              <span>4 / 28 Beds Occupied (14%)</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full mb-4 flex overflow-hidden">
               <div className="h-full bg-[#14357A]" style={{ width: '14%' }}></div>
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-red-600">Emergency Bay: 2 Reserved</span>
            <button className="text-[#14357A] hover:underline flex items-center gap-1">Ward Ledger →</button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Duty Roster</p>
                <h3 className="font-bold text-sm text-[#14357A]">On-Duty Physicians</h3>
              </div>
              <div className="w-8 h-8 rounded bg-blue-50 text-[#14357A] flex items-center justify-center"><FaStethoscope size={16} /></div>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-700">OA</div>
                <div className="w-8 h-8 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-amber-700">TK</div>
                <div className="w-8 h-8 rounded-full bg-[#F5B041] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">FB</div>
              </div>
              <div>
                <p className="text-xs font-bold text-[#14357A]">3 Medical Officers Active</p>
                <p className="text-[10px] text-gray-500">Consulting Rooms 1, 2, & 4</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold mt-4">
            <span className="text-gray-500">Triage Station: Matron Adeleke</span>
            <button className="text-[#14357A] hover:underline">View Staff Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
}