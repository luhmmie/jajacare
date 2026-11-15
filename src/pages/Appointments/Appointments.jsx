
import { useState } from 'react';
import { 
  FiCalendar, FiClock, FiChevronLeft, FiChevronRight, 
  FiUser, FiPrinter, FiActivity, FiCheckCircle, 
  FiPlus, FiUsers, FiShield, FiX
} from 'react-icons/fi';
import { FaStethoscope } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../context/NotificationContext';
import { ROLES } from '../../constants/roles';

export default function Appointments() {
  const { user } = useAuth();
  const { notifySuccess, notifyInfo } = useNotification();
  const isNurse = user?.role === ROLES.NURSE;
  const isDoctor = user?.role === ROLES.DOCTOR;
  const canBook = user?.role === ROLES.ADMIN || user?.role === ROLES.RECEPTIONIST;

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [bookingData, setBookingData] = useState({
    patientId: '219803',
    patientName: 'Folashade Enitan',
    doctor: 'Dr. Adanna Eze (CMO - Consulting 1)',
    date: '2026-10-24',
    time: '11:30 AM',
    category: 'GOPD Outpatient',
    reason: ''
  });

  const [vitalsData, setVitalsData] = useState({
    bp: '', temp: '', pulse: '', spo2: '', weight: '', height: ''
  });

  const handleOpenBookModal = () => setIsBookModalOpen(true);
  const handleOpenCheckIn = (patient) => {
    setSelectedPatient(patient);
    setIsCheckInModalOpen(true);
  };
  const handleOpenVitals = (patient) => {
    setSelectedPatient(patient);
    setIsVitalsModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsBookModalOpen(false);
    notifySuccess(`Appointment booked for ${bookingData.patientName} at ${bookingData.time}`);
  };

  const handleCheckInSubmit = (e) => {
    e.preventDefault();
    setIsCheckInModalOpen(false);
    notifySuccess(`${selectedPatient.name} checked in. Notified triage station.`);
  };

  const handleVitalsSubmit = (e) => {
    e.preventDefault();
    setIsVitalsModalOpen(false);
    notifySuccess(`Vitals recorded for ${selectedPatient.name}. Sent to doctor.`);
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-10 space-y-6">
      
      {/* HEADER */}
      <div className="no-print flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span>Dashboard</span> <span className="text-gray-300">/</span> 
            <span className="font-semibold text-[#14357A]">Appointments & Daily Clinical Schedule</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-[#14357A] bg-blue-100 px-2 py-0.5 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14357A]"></span> Shift 01 | Morning GOPD: 08:00 - 16:00 (WAT)
            </span>
            <span className="text-[10px] font-bold text-[#F5B041] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded flex items-center gap-1">
              UI Jaja Clinic GOPD Floor
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="bg-white border border-gray-200 rounded-lg flex items-center p-1 shadow-sm">
            <button className="p-1.5 text-gray-400 hover:text-[#14357A] hover:bg-gray-50 rounded"><FiChevronLeft /></button>
            <div className="px-3 flex items-center gap-2">
              <FiCalendar className="text-[#14357A]" />
              <span className="text-sm font-bold text-[#14357A] whitespace-nowrap">Wednesday, 24 October 2026</span>
            </div>
            <button className="p-1.5 text-gray-400 hover:text-[#14357A] hover:bg-gray-50 rounded"><FiChevronRight /></button>
          </div>
          <button className="bg-white border border-gray-200 text-gray-600 font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-50 transition shadow-sm text-sm">
            Today
          </button>
        </div>
      </div>

      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <div className="flex bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
          <button className="bg-[#14357A] text-white px-4 py-1.5 rounded-md text-xs font-bold shadow-sm">Doctor Day View</button>
          <button className="text-gray-500 hover:bg-gray-50 px-4 py-1.5 rounded-md text-xs font-bold">Week View</button>
          <button className="text-gray-500 hover:bg-gray-50 px-4 py-1.5 rounded-md text-xs font-bold">Triage Matrix</button>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => window.print()}
            className="bg-white border border-gray-200 text-gray-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition shadow-sm text-xs flex items-center gap-2"
          >
            <FiPrinter /> Print Roster / Queue
          </button>

          {canBook && (
            <button 
              onClick={handleOpenBookModal}
              className="bg-[#14357A] hover:bg-[#0C2356] text-white font-semibold px-4 py-2 rounded-lg transition shadow-sm text-xs flex items-center gap-2"
            >
              <FiPlus /> Book Appointment
            </button>
          )}

          {isNurse && (
            <button 
              onClick={() => handleOpenCheckIn({ name: 'Walk-In Patient', staffId: 'N/A', id: 'walk-in' })}
              className="bg-[#F5B041] hover:bg-[#e09b2d] text-[#0A192F] font-bold px-4 py-2 rounded-lg transition shadow-sm text-xs flex items-center gap-2"
            >
              <FiCheckCircle /> Confirm Arrival
            </button>
          )}
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="no-print grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Booked Today</p>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#14357A] flex items-center justify-center"><FiCalendar size={16} /></div>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <h3 className="text-3xl font-bold text-[#14357A]">36</h3>
            <span className="text-xs font-medium text-gray-500">/ 42 Max</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full mb-1 overflow-hidden">
            <div className="h-full bg-[#14357A]" style={{ width: '85%' }}></div>
          </div>
          <p className="text-[10px] text-gray-500 text-right font-bold">85% Cap</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live Waiting in Clinic</p>
            <div className="w-8 h-8 rounded-full bg-[#F5B041]/20 text-[#F5B041] flex items-center justify-center"><FiUsers size={16} /></div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-3xl font-bold text-[#14357A]">8</h3>
            <span className="text-xs font-bold text-[#F5B041] bg-[#F5B041]/10 px-2 py-0.5 rounded">GOPD Area</span>
          </div>
          <p className="text-[10px] text-gray-500 flex items-center gap-1">
            <FiClock /> Avg Wait: 14 mins
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">In Consultation</p>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#14357A] flex items-center justify-center"><FaStethoscope size={16} /></div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-3xl font-bold text-[#14357A]">3</h3>
            <span className="text-xs font-medium text-gray-500">Active Doctors</span>
          </div>
          <p className="text-[10px] text-gray-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Rooms: 1, 2, 4 Active
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Completed Encounters</p>
            <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><FiCheckCircle size={16} /></div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-3xl font-bold text-[#14357A]">22</h3>
            <span className="text-xs font-medium text-gray-500">61% of Day</span>
          </div>
          <p className="text-[10px] text-gray-500 flex items-center gap-1">
            <FiCheckCircle /> 19 Discharged, 3 Lab Sent
          </p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-[#F8FAFC] border-b border-gray-200 px-6 py-4">
              <h3 className="font-bold text-[#14357A] flex items-center gap-2"><FiActivity /> Duty Roster (08:00 - 16:00 WAT)</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-[#FFF7ED] border border-[#F5B041]/30 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F5B041]/20 text-[#F5B041] font-bold flex items-center justify-center shrink-0">BA</div>
                    <div>
                      <p className="font-bold text-sm text-[#14357A]">Babatunde Adeleke</p>
                      <p className="text-[10px] text-gray-500">Matric 221004 • Kuti Hall • 09:00 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {isNurse ? (
                      <button onClick={() => handleOpenCheckIn({ name: 'Babatunde Adeleke', staffId: '221004', id: '1', doctor: 'Dr. Adanna Eze' })} className="bg-[#F5B041] text-[#0A192F] text-xs font-bold px-3 py-1.5 rounded">✓ Confirm Arrival</button>
                    ) : (
                      <button className="bg-[#14357A] text-white text-xs font-bold px-3 py-1.5 rounded">Call In</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-[#F8FAFC] border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="font-bold text-sm text-[#14357A] flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#F5B041]"></span> Live Outpatient Queue</h3>
              <span className="bg-[#F5B041] text-white text-[9px] font-bold px-2 py-0.5 rounded">Realtime</span>
            </div>
            <div className="p-4">
              <div className="border border-gray-100 bg-[#F8FAFC] rounded-lg p-3">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 font-bold text-[9px] px-1.5 py-0.5 rounded">#Q-01</span>
                    <p className="text-xs font-bold text-[#14357A]">Babatunde Adeleke</p>
                  </div>
                </div>
                <p className="text-[9px] text-gray-500 mb-2">Matric 221004 • Kuti Hall</p>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-gray-500 flex items-center gap-1"><FiClock /> 14m wait</span>
                  <div className="flex gap-2">
                    {isNurse && (
                      <button onClick={() => handleOpenVitals({ name: 'Babatunde Adeleke', staffId: '221004', id: '1' })} className="bg-[#14357A] text-white text-[9px] font-bold px-2 py-1 rounded">Take Vitals</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isNurse && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="bg-[#F5B041] px-4 py-3 rounded-t-xl">
                <h3 className="font-bold text-sm text-[#0A192F] flex items-center gap-2"><FiCheckCircle /> Triage Station</h3>
              </div>
              <div className="p-4 space-y-3">
                <button 
                  onClick={() => handleOpenCheckIn({ name: 'Walk-In Patient', staffId: 'N/A', id: 'walk-in' })} 
                  className="w-full bg-[#14357A] text-white font-bold py-2.5 rounded-md text-xs flex items-center justify-center gap-2"
                >
                  <FiCheckCircle /> Scan Matric Card to Check-In
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOOKING MODAL */}
      {isBookModalOpen && canBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm no-print">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
            <div className="bg-[#14357A] px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2"><FiCalendar className="text-[#F5B041]" /> Book New Appointment</h3>
              <button onClick={() => setIsBookModalOpen(false)} className="text-white/70 hover:text-white"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#14357A] mb-1">Patient Matric / Staff ID</label>
                <input type="text" required value={bookingData.patientId} onChange={(e) => setBookingData({...bookingData, patientId: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#14357A] mb-1">Assigned Doctor</label>
                <select value={bookingData.doctor} onChange={(e) => setBookingData({...bookingData, doctor: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none">
                  <option>Dr. Adanna Eze (CMO - Consulting 1)</option>
                  <option>Dr. T. Olaolapo (GOPD 2)</option>
                  <option>Dr. S. Dania (Student Health)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#14357A] mb-1">Date</label>
                  <input type="date" required value={bookingData.date} onChange={(e) => setBookingData({...bookingData, date: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#14357A] mb-1">Time Slot</label>
                  <select value={bookingData.time} onChange={(e) => setBookingData({...bookingData, time: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none">
                    <option>09:00 AM</option><option>09:30 AM</option><option>10:00 AM</option><option>10:30 AM</option><option>11:00 AM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#14357A] mb-1">Reason for Visit</label>
                <textarea required rows="3" value={bookingData.reason} onChange={(e) => setBookingData({...bookingData, reason: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none resize-none"></textarea>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsBookModalOpen(false)} className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-600 bg-[#F8FAFC] border border-gray-200 rounded-md">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-[#14357A] rounded-md">Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHECK-IN MODAL */}
      {isCheckInModalOpen && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm no-print">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
            <div className="bg-[#F5B041] px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-[#0A192F] flex items-center gap-2"><FiCheckCircle /> Confirm Arrival</h3>
              <button onClick={() => setIsCheckInModalOpen(false)} className="text-[#0A192F]/70 hover:text-[#0A192F]"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleCheckInSubmit} className="p-6 space-y-4">
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-lg p-4 mb-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Patient</p>
                <p className="text-lg font-bold text-[#14357A]">{selectedPatient.name}</p>
                <p className="text-xs text-gray-500">Matric: {selectedPatient.staffId}</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer p-3 bg-red-50 border border-red-200 rounded-md">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-red-600" />
                <span className="text-xs text-red-700 font-bold">Flag as Emergency</span>
              </label>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsCheckInModalOpen(false)} className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-600 bg-[#F8FAFC] border border-gray-200 rounded-md">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-[#14357A] rounded-md">Proceed to Triage</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VITALS MODAL */}
      {isVitalsModalOpen && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm no-print">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
            <div className="bg-[#14357A] px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2"><FiActivity /> Record Vitals</h3>
              <button onClick={() => setIsVitalsModalOpen(false)} className="text-white/70 hover:text-white"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleVitalsSubmit} className="p-6 space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-xs font-bold text-[#14357A]">Recording for: {selectedPatient.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="BP: 120/80" onChange={(e) => setVitalsData({...vitalsData, bp: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" required />
                <input type="number" placeholder="Temp: 36.8" onChange={(e) => setVitalsData({...vitalsData, temp: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" required />
                <input type="number" placeholder="Pulse: 72" onChange={(e) => setVitalsData({...vitalsData, pulse: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" required />
                <input type="number" placeholder="SpO2: 99" onChange={(e) => setVitalsData({...vitalsData, spo2: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" required />
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsVitalsModalOpen(false)} className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-600 bg-[#F8FAFC] border border-gray-200 rounded-md">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-[#14357A] rounded-md">Save Vitals</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}