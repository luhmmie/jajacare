// src/pages/Patients/PatientProfile.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  FiUser, FiMapPin, FiPhoneCall, FiPrinter, FiEdit, 
  FiActivity, FiAlertTriangle, FiClock, FiFileText, 
  FiChevronRight, FiShield, FiSearch, FiCheckCircle, 
  FiCalendar, FiFolder, FiPlus
} from 'react-icons/fi';
import { 
  FaStethoscope, FaHeartbeat, FaFlask, 
  FaNotesMedical, FaHospital 
} from 'react-icons/fa';

export default function PatientProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('visit-history');

  const DEMO_EMPTY = false;

  return (
    <div className="max-w-[1600px] mx-auto pb-10 space-y-6">
      
      {/* HEADER */}
      <div className="no-print flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>Dashboard</span> <span className="text-gray-300">/</span> 
            <span>Patients</span> <span className="text-gray-300">/</span> 
            <span className="font-semibold text-[#14357A]">Oluwaseun Emmanuel Adeleke (JC-2026-0042)</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Active Undergraduate Student
            </span>
            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-green-200">
              <FiShield size={10} /> NHIS / TISHIP Eligible (100% Coverage)
            </span>
          </div>
          <p className="text-xs text-gray-500">Session: 2025/2026 Academic Year</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => window.print()}
            className="flex-1 md:flex-none bg-white border border-gray-200 text-[#14357A] font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm"
          >
            <FiPrinter /> Print Summary
          </button>
          <button className="flex-1 md:flex-none bg-white border border-gray-200 text-[#14357A] font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm">
            <FiEdit /> Edit Bio
          </button>
          <button 
            onClick={() => navigate('/consultation/new')}
            className="flex-1 md:flex-none bg-[#14357A] hover:bg-[#0C2356] text-white font-semibold px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 transition shadow-md"
          >
            <FaStethoscope /> Start Consultation
          </button>
        </div>
      </div>

      {/* ALLERGY BANNER */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="bg-red-600 text-white p-2 rounded-lg shrink-0 mt-0.5">
            <FiAlertTriangle size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold text-red-700 uppercase tracking-wider">Critical Drug Allergies</h3>
              <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">Penicillin</span>
              <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">Sulfa Drugs</span>
            </div>
            <p className="text-xs text-red-600 max-w-4xl">
              Severe acute hypersensitivity to Penicillin & Cotrimoxazole. Strictly avoid NSAIDs. <br/>
              <span className="font-semibold mt-1 inline-block">Condition Alert: Peptic Ulcer Disease (PUD).</span>
            </p>
          </div>
        </div>
        <p className="text-[10px] text-red-500 whitespace-nowrap flex items-center gap-1">
          <FiClock /> Updated 14 Oct 2026
        </p>
      </div>

      {/* PROFILE HEADER CARD */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex gap-4">
            <div className="w-24 h-28 rounded-lg overflow-hidden border-2 border-gray-100 bg-gray-50 shrink-0 relative">
              <img src="https://i.pravatar.cc/150?img=11" alt="Patient" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-[#14357A] text-white text-[9px] font-bold text-center py-1">UI-6070</div>
            </div>
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-[#14357A]">Oluwaseun Emmanuel Adeleke</h1>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">JC-2026-0042</span>
              </div>
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <span className="flex items-center gap-1"><FiActivity size={12} /> Faculty of Science (Computer Science, 300L)</span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1"><FiMapPin size={12} /> Mellanby Hall, Room B12</span>
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-4">
                <span className="flex items-center gap-1"><FiPhoneCall /> +234 803 123 4567</span>
              </p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-3 border-t xl:border-t-0 xl:border-l border-gray-100 pt-4 xl:pt-0 xl:pl-6">
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Blood Group</p>
              <p className="text-sm font-bold text-[#14357A]">O Rh+</p>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Genotype</p>
              <p className="text-sm font-bold text-[#14357A]">AA</p>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Age & Sex</p>
              <p className="text-sm font-bold text-[#14357A]">21 yrs • Male</p>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Weight & Height</p>
              <p className="text-sm font-bold text-[#14357A]">68.5 kg • 178 cm</p>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Emergency</p>
              <p className="text-sm font-bold text-[#14357A] truncate">Deaconess Adeleke</p>
            </div>
          </div>
        </div>
      </div>

      {/* TABS + CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        <div className="xl:col-span-3 space-y-6">
          
          <div className="no-print flex overflow-x-auto border-b border-gray-200 bg-white rounded-t-xl px-2 pt-2">
            {[
              { id: 'overview', label: 'Overview', icon: <FiFileText /> },
              { id: 'visit-history', label: 'Visit History (4)', icon: <FiActivity /> },
              { id: 'prescriptions', label: 'Prescriptions', icon: <FaNotesMedical />, badge: '3' },
              { id: 'appointments', label: 'Appointments', icon: <FiCalendar /> },
              { id: 'labs', label: 'Lab & Reps', icon: <FaFlask /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? 'border-[#14357A] text-[#14357A]' : 'border-transparent text-gray-500 hover:text-[#14357A]'
                }`}
              >
                {tab.icon} {tab.label}
                {tab.badge && <span className="bg-[#F5B041] text-white text-[9px] px-1.5 rounded-full">{tab.badge}</span>}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {/* Sample visit history */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                <div className="flex gap-3">
                  <div className="bg-[#14357A] text-white p-2 rounded-lg h-max"><FaStethoscope size={16} /></div>
                  <div>
                    <h3 className="font-bold text-[#14357A] text-lg">General Outpatient (GOPD) Encounter</h3>
                    <p className="text-xs text-gray-500 mt-1">14 Oct 2026 • Consulting Room 1</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Completed</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Attending Doctor</p>
                  <p className="text-xs font-bold text-[#14357A]">Dr. Adanna Eze</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">BP</p>
                  <p className="text-xs font-bold text-[#14357A]">118/76</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Pulse</p>
                  <p className="text-xs font-bold text-[#14357A]">72 bpm</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Temp</p>
                  <p className="text-xs font-bold text-[#14357A]">36.8°C</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-[#14357A] uppercase tracking-wider mb-2">Diagnosis</p>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">Acute Exacerbation of Peptic Ulcer Disease</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR - hidden in print */}
        <div className="no-print space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-sm text-[#14357A] mb-2">Primary Care Doctor</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#14357A] text-white flex items-center justify-center font-bold text-xs">AE</div>
              <div>
                <p className="text-sm font-bold text-[#14357A]">Dr. Adanna Eze</p>
                <p className="text-[10px] text-gray-500">Chief Medical Officer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}