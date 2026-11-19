import { useState, useEffect } from 'react';
import {
  FiCalendar, FiClock, FiChevronLeft, FiChevronRight,
  FiPrinter, FiActivity, FiCheckCircle,
  FiPlus, FiUsers, FiX
} from 'react-icons/fi';
import { FaStethoscope } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../context/NotificationContext';
import { ROLES } from '../../constants/roles';
import { listAppointments, createAppointment, checkInAppointment, getQueue } from '../../services/appointmentService';
import { listPatients } from '../../services/patientService';
import { listDoctors } from '../../services/userService';

const todayStr = () => new Date().toISOString().slice(0, 10);

export default function Appointments() {
  const { user } = useAuth();
  const { notifySuccess, notifyError } = useNotification();
  const isNurse = user?.role === ROLES.NURSE;
  const isDoctor = user?.role === ROLES.DOCTOR;
  const canBook = user?.role === ROLES.ADMIN || user?.role === ROLES.RECEPTIONIST;

  const [selectedDate, setSelectedDate] = useState(todayStr());
  const [appointments, setAppointments] = useState([]);
  const [queue, setQueue] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [bookingData, setBookingData] = useState({
    patientId: '',
    doctorId: '',
    date: todayStr(),
    timeSlot: '09:00',
    reason: '',
  });

  useEffect(() => {
    refreshAll();
  }, [selectedDate]);

  async function refreshAll() {
    setLoading(true);
    setError('');
    try {
      const [appts, q] = await Promise.all([
        listAppointments({ date: selectedDate }),
        getQueue(selectedDate),
      ]);
      setAppointments(appts || []);
      setQueue(q || []);
    } catch (err) {
      setError(err.message || 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  }

  async function loadPatientsIfNeeded() {
    if (patients.length > 0) return;
    try {
      const data = await listPatients({ page: 1, limit: 200 });
      setPatients(data.data || []);
    } catch (err) {
      notifyError('Failed to load patients');
    }
  }

  async function loadDoctorsIfNeeded() {
    if (doctors.length > 0) return;
    try {
      const data = await listDoctors();
      setDoctors(data || []);
    } catch (err) {
      notifyError('Failed to load doctors');
    }
  }

  const handleOpenBookModal = () => {
    loadPatientsIfNeeded();
    loadDoctorsIfNeeded();
    setBookingData({ ...bookingData, date: selectedDate });
    setIsBookModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingData.patientId || !bookingData.doctorId || !bookingData.timeSlot) {
      notifyError('Please select patient, doctor, and slot');
      return;
    }
    setSubmitting(true);
    try {
      await createAppointment(bookingData);
      notifySuccess('Appointment booked successfully');
      setIsBookModalOpen(false);
      setBookingData({ patientId: '', doctorId: '', date: selectedDate, timeSlot: '09:00', reason: '' });
      refreshAll();
    } catch (err) {
      notifyError(err.message || 'Failed to book appointment');
    } finally {
      setSubmitting(false);
    }
  };

  const openCheckIn = (appt) => {
    setSelectedPatient(appt);
    setIsCheckInModalOpen(true);
  };

  const handleCheckInSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient?.id) {
      setIsCheckInModalOpen(false);
      return;
    }
    try {
      await checkInAppointment(selectedPatient.id);
      notifySuccess(`${selectedPatient.patientId?.firstName || 'Patient'} checked in`);
      setIsCheckInModalOpen(false);
      refreshAll();
    } catch (err) {
      notifyError(err.message || 'Check-in failed');
    }
  };

  const shiftDate = (days) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().slice(0, 10));
  };

  const totalBooked = appointments.length;
  const waiting = appointments.filter((a) => a.status === 'checked_in').length;
  const inConsult = appointments.filter((a) => a.status === 'in_consultation').length;
  const completed = appointments.filter((a) => a.status === 'completed').length;

  return (
    <div className="max-w-[1600px] mx-auto pb-10 space-y-6">
      <div className="no-print flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span>Dashboard</span> <span className="text-gray-300">/</span>
            <span className="font-semibold text-[#14357A]">Appointments</span>
          </div>
          <h1 className="text-2xl font-bold text-[#14357A]">Daily Clinical Schedule</h1>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="bg-white border border-gray-200 rounded-lg flex items-center p-1 shadow-sm">
            <button onClick={() => shiftDate(-1)} className="p-1.5 text-gray-400 hover:text-[#14357A] hover:bg-gray-50 rounded"><FiChevronLeft /></button>
            <div className="px-3 flex items-center gap-2">
              <FiCalendar className="text-[#14357A]" />
              <span className="text-sm font-bold text-[#14357A] whitespace-nowrap">{selectedDate}</span>
            </div>
            <button onClick={() => shiftDate(1)} className="p-1.5 text-gray-400 hover:text-[#14357A] hover:bg-gray-50 rounded"><FiChevronRight /></button>
          </div>
          <button
            onClick={() => setSelectedDate(todayStr())}
            className="bg-white border border-gray-200 text-gray-600 font-semibold px-4 py-2.5 rounded-lg hover:bg-gray-50 transition shadow-sm text-sm"
          >
            Today
          </button>
        </div>
      </div>

      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="bg-white border border-gray-200 text-gray-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition shadow-sm text-xs flex items-center gap-2"
          >
            <FiPrinter /> Print
          </button>
          {canBook && (
            <button
              onClick={handleOpenBookModal}
              className="bg-[#14357A] hover:bg-[#0C2356] text-white font-semibold px-4 py-2 rounded-lg transition shadow-sm text-xs flex items-center gap-2"
            >
              <FiPlus /> Book Appointment
            </button>
          )}
        </div>
      </div>

      <div className="no-print grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Booked</p>
          <h3 className="text-3xl font-bold text-[#14357A]">{totalBooked}</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Waiting</p>
          <h3 className="text-3xl font-bold text-[#14357A]">{waiting}</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">In Consultation</p>
          <h3 className="text-3xl font-bold text-[#14357A]">{inConsult}</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Completed</p>
          <h3 className="text-3xl font-bold text-[#14357A]">{completed}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-[#F8FAFC] border-b border-gray-200 px-6 py-4">
              <h3 className="font-bold text-[#14357A] flex items-center gap-2"><FiActivity /> Appointments for {selectedDate}</h3>
            </div>
            <div className="p-6">
              {loading ? (
                <p className="text-sm text-gray-500 text-center py-8">Loading...</p>
              ) : error ? (
                <p className="text-sm text-red-600 text-center py-8">{error}</p>
              ) : appointments.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No appointments for this date.</p>
              ) : (
                <div className="space-y-3">
                  {appointments.map((a) => (
                    <div key={a.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-[#FFF7ED] border border-[#F5B041]/30 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#F5B041]/20 text-[#F5B041] font-bold flex items-center justify-center shrink-0">
                          {a.timeSlot?.split(':')[0] || ''}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#14357A]">
                            {a.patientId?.firstName} {a.patientId?.lastName}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {a.patientId?.matricNumber || ''} • {a.timeSlot} • {a.doctorId?.name || 'Doctor'}
                          </p>
                          {a.reason && <p className="text-[10px] text-gray-400 mt-0.5">{a.reason}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                          a.status === 'completed' ? 'bg-green-100 text-green-700' :
                          a.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          a.status === 'checked_in' ? 'bg-amber-100 text-amber-700' :
                          a.status === 'in_consultation' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>{a.status}</span>
                        {isNurse && a.status === 'scheduled' && (
                          <button
                            onClick={() => openCheckIn(a)}
                            className="bg-[#F5B041] text-[#0A192F] text-xs font-bold px-3 py-1.5 rounded"
                          >
                            ✓ Check In
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-[#F8FAFC] border-b border-gray-200 px-4 py-3 flex justify-between items-center">
              <h3 className="font-bold text-sm text-[#14357A] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5B041]"></span> Live Queue
              </h3>
              <span className="bg-[#F5B041] text-white text-[9px] font-bold px-2 py-0.5 rounded">Realtime</span>
            </div>
            <div className="p-4 space-y-2">
              {queue.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-4">Queue empty</p>
              ) : (
                queue.map((q, i) => (
                  <div key={q.id} className="border border-gray-100 bg-[#F8FAFC] rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-700 font-bold text-[9px] px-1.5 py-0.5 rounded">#Q-{String(i + 1).padStart(2, '0')}</span>
                      <p className="text-xs font-bold text-[#14357A]">{q.patientId?.firstName} {q.patientId?.lastName}</p>
                    </div>
                    <p className="text-[9px] text-gray-500">Matric: {q.patientId?.matricNumber || '—'}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {isBookModalOpen && canBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm no-print">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-[#14357A] px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2"><FiCalendar className="text-[#F5B041]" /> Book New Appointment</h3>
              <button onClick={() => setIsBookModalOpen(false)} className="text-white/70 hover:text-white"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#14357A] mb-1">Patient</label>
                <select
                  required
                  value={bookingData.patientId}
                  onChange={(e) => setBookingData({ ...bookingData, patientId: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none"
                >
                  <option value="">— Select patient —</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>{p.firstName} {p.lastName} ({p.matricNumber})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#14357A] mb-1">Doctor</label>
                <select
                  required
                  value={bookingData.doctorId}
                  onChange={(e) => setBookingData({ ...bookingData, doctorId: e.target.value })}
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none"
                >
                  <option value="">— Select doctor —</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#14357A] mb-1">Date</label>
                  <input type="date" required value={bookingData.date} onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#14357A] mb-1">Time</label>
                  <input type="time" required value={bookingData.timeSlot} onChange={(e) => setBookingData({ ...bookingData, timeSlot: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#14357A] mb-1">Reason</label>
                <textarea rows="3" value={bookingData.reason} onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none resize-none" />
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsBookModalOpen(false)} className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-600 bg-[#F8FAFC] border border-gray-200 rounded-md">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-[#14357A] rounded-md disabled:opacity-50">
                  {submitting ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCheckInModalOpen && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm no-print">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-[#F5B041] px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-[#0A192F] flex items-center gap-2"><FiCheckCircle /> Confirm Arrival</h3>
              <button onClick={() => setIsCheckInModalOpen(false)} className="text-[#0A192F]/70 hover:text-[#0A192F]"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleCheckInSubmit} className="p-6 space-y-4">
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-lg p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Patient</p>
                <p className="text-lg font-bold text-[#14357A]">{selectedPatient.patientId?.firstName} {selectedPatient.patientId?.lastName}</p>
                <p className="text-xs text-gray-500">Matric: {selectedPatient.patientId?.matricNumber || '—'}</p>
                <p className="text-xs text-gray-500">Slot: {selectedPatient.timeSlot}</p>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsCheckInModalOpen(false)} className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-600 bg-[#F8FAFC] border border-gray-200 rounded-md">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-[#14357A] rounded-md">Proceed to Triage</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}