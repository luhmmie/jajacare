import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  FiUser, FiMapPin, FiPhoneCall, FiPrinter, FiEdit,
  FiActivity, FiAlertTriangle, FiClock, FiFileText,
  FiShield, FiCalendar, FiFolder
} from 'react-icons/fi';
import { FaStethoscope, FaFlask, FaNotesMedical } from 'react-icons/fa';
import { getPatient, getPatientHistory } from '../../services/patientService';
import { listAppointments } from '../../services/appointmentService';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../hooks/useAuth';

export default function PatientProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { notifyError } = useNotification();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('visit-history');
  const [startingConsult, setStartingConsult] = useState(false);
  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState({ visits: [], prescriptions: [], appointments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([getPatient(id), getPatientHistory(id)])
      .then(([p, h]) => {
        if (cancelled) return;
        setPatient(p);
        setHistory(h);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load patient');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

  const handleStartConsultation = async () => {
    setStartingConsult(true);
    try {
      const today = new Date().toISOString().slice(0, 10);
      const appts = await listAppointments({ patientId: id });
      const candidates = (appts || []).filter((a) =>
        ['checked_in', 'in_consultation', 'scheduled'].includes(a.status)
      );
      if (candidates.length === 0) {
        notifyError('No active appointment for this patient. Book one first from the Appointments page.');
        return;
      }
      const todays = candidates.find((a) => a.date === today);
      const chosen = todays || candidates[0];
      if (user?.role === 'doctor' && chosen.doctorId?.id && chosen.doctorId.id !== user?.id) {
        notifyError('This appointment is assigned to another doctor.');
        return;
      }
      navigate(`/consultation/${chosen.id}`);
    } catch (err) {
      notifyError(err.message || 'Failed to find appointment');
    } finally {
      setStartingConsult(false);
    }
  };

  if (loading) {
    return <div className="max-w-[1600px] mx-auto p-8 text-sm text-gray-500">Loading patient...</div>;
  }
  if (error || !patient) {
    return <div className="max-w-[1600px] mx-auto p-8 text-sm text-red-600">{error || 'Patient not found'}</div>;
  }

  const fullName = `${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`.replace(/\s+/g, ' ').trim();
  const age = patient.dateOfBirth
    ? Math.floor((Date.now() - new Date(patient.dateOfBirth).getTime()) / (365.25 * 24 * 3600 * 1000))
    : '';
  const allergies = patient.allergies || [];
  const conditions = patient.chronicConditions || [];

  return (
    <div className="max-w-[1600px] mx-auto pb-10 space-y-6">
      <div className="no-print flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>Dashboard</span> <span className="text-gray-300">/</span>
            <span>Patients</span> <span className="text-gray-300">/</span>
            <span className="font-semibold text-[#14357A]">{fullName} ({patient.patientId})</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> {patient.status || 'active'}
            </span>
            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-green-200">
              <FiShield size={10} /> NHIS / TISHIP Eligible
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
          <button
            onClick={handleStartConsultation}
            disabled={startingConsult}
            className="flex-1 md:flex-none bg-[#14357A] hover:bg-[#0C2356] text-white font-semibold px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 transition shadow-md disabled:opacity-50"
          >
            <FaStethoscope /> {startingConsult ? 'Loading...' : 'Start Consultation'}
          </button>
        </div>
      </div>

      {(allergies.length > 0 || conditions.length > 0) && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-red-600 text-white p-2 rounded-lg shrink-0 mt-0.5">
              <FiAlertTriangle size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-sm font-bold text-red-700 uppercase tracking-wider">Critical Alerts</h3>
                {allergies.map((a) => (
                  <span key={a} className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">{a}</span>
                ))}
              </div>
              <p className="text-xs text-red-600 max-w-4xl">
                {conditions.length > 0 && (
                  <span className="font-semibold">Conditions: {conditions.join(', ')}.</span>
                )}
              </p>
            </div>
          </div>
          <p className="text-[10px] text-red-500 whitespace-nowrap flex items-center gap-1">
            <FiClock /> Updated {new Date(patient.updatedAt).toLocaleDateString()}
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex gap-4">
            <div className="w-24 h-28 rounded-lg overflow-hidden border-2 border-gray-100 bg-gray-50 shrink-0 flex items-center justify-center">
              <FiUser size={40} className="text-gray-300" />
            </div>
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl font-bold text-[#14357A]">{fullName}</h1>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">{patient.patientId}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2 flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1"><FiActivity size={12} /> {patient.faculty || '—'} ({patient.department || '—'})</span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1"><FiMapPin size={12} /> {patient.hallOfResidence || '—'}</span>
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-4">
                <span className="flex items-center gap-1"><FiPhoneCall /> {patient.phone}</span>
                <span>Matric: {patient.matricNumber}</span>
              </p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-3 border-t xl:border-t-0 xl:border-l border-gray-100 pt-4 xl:pt-0 xl:pl-6">
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Blood Group</p>
              <p className="text-sm font-bold text-[#14357A]">{patient.bloodGroup || '—'}</p>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Genotype</p>
              <p className="text-sm font-bold text-[#14357A]">{patient.genotype || '—'}</p>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Age & Sex</p>
              <p className="text-sm font-bold text-[#14357A]">{age} yrs • {patient.gender}</p>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Emergency</p>
              <p className="text-sm font-bold text-[#14357A] truncate">{patient.emergencyContact?.name || '—'}</p>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Emerg. Phone</p>
              <p className="text-sm font-bold text-[#14357A] truncate">{patient.emergencyContact?.phone || '—'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6">
          <div className="no-print flex overflow-x-auto border-b border-gray-200 bg-white rounded-t-xl px-2 pt-2">
            {[
              { id: 'overview', label: 'Overview', icon: <FiFileText /> },
              { id: 'visit-history', label: `Visit History (${history.visits.length})`, icon: <FiActivity /> },
              { id: 'prescriptions', label: 'Prescriptions', icon: <FaNotesMedical /> },
              { id: 'appointments', label: `Appointments (${history.appointments.length})`, icon: <FiCalendar /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? 'border-[#14357A] text-[#14357A]' : 'border-transparent text-gray-500 hover:text-[#14357A]'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {activeTab === 'visit-history' && (
              history.visits.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                  <p className="text-sm text-gray-500">No visit history yet.</p>
                </div>
              ) : (
                history.visits.map((v) => (
                  <div key={v.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                      <div className="flex gap-3">
                        <div className="bg-[#14357A] text-white p-2 rounded-lg h-max"><FaStethoscope size={16} /></div>
                        <div>
                          <h3 className="font-bold text-[#14357A] text-lg">{v.diagnosis?.text || 'Consultation'}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(v.createdAt).toLocaleString()} {v.diagnosis?.code ? `• ${v.diagnosis.code}` : ''}
                          </p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                        v.status === 'completed' ? 'bg-green-100 text-green-700' :
                        v.status === 'dispensed' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {v.status}
                      </span>
                    </div>
                    {v.vitals && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
                        {v.vitals.bloodPressure && (
                          <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase">BP</p>
                            <p className="text-xs font-bold text-[#14357A]">{v.vitals.bloodPressure}</p>
                          </div>
                        )}
                        {v.vitals.pulse && (
                          <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase">Pulse</p>
                            <p className="text-xs font-bold text-[#14357A]">{v.vitals.pulse} bpm</p>
                          </div>
                        )}
                        {v.vitals.temperature && (
                          <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase">Temp</p>
                            <p className="text-xs font-bold text-[#14357A]">{v.vitals.temperature}°C</p>
                          </div>
                        )}
                        {v.vitals.bmi && (
                          <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase">BMI</p>
                            <p className="text-xs font-bold text-[#14357A]">{v.vitals.bmi}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {v.complaints?.symptoms && (
                      <div className="mb-2">
                        <p className="text-[10px] font-bold text-[#14357A] uppercase tracking-wider mb-1">Complaints</p>
                        <p className="text-xs text-gray-700">{v.complaints.symptoms}</p>
                      </div>
                    )}
                    {v.diagnosis?.text && (
                      <div>
                        <p className="text-[10px] font-bold text-[#14357A] uppercase tracking-wider mb-1">Diagnosis</p>
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200">
                          {v.diagnosis.code ? `${v.diagnosis.code} — ` : ''}{v.diagnosis.text}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )
            )}
            {activeTab === 'prescriptions' && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                {history.prescriptions.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-6">No prescriptions on file.</p>
                ) : (
                  history.prescriptions.map((rx, idx) => (
                    <div key={idx} className="mb-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <p className="text-[10px] text-gray-500 mb-2">{new Date(rx.createdAt).toLocaleString()}</p>
                      {rx.prescription?.map((p) => (
                        <div key={p.id} className="flex justify-between text-xs bg-[#F8FAFC] p-2 rounded border border-gray-100 mb-1">
                          <span className="font-semibold">{p.drug}</span>
                          <span className="text-gray-500">{p.dose} • {p.frequency} • {p.duration}</span>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            )}
            {activeTab === 'appointments' && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                {history.appointments.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-6">No appointments on file.</p>
                ) : (
                  history.appointments.map((a) => (
                    <div key={a.id} className="flex justify-between items-center border-b border-gray-100 py-3 last:border-0">
                      <div>
                        <p className="text-xs font-bold text-[#14357A]">{a.date} • {a.timeSlot}</p>
                        <p className="text-[10px] text-gray-500">{a.reason || '—'}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                        a.status === 'completed' ? 'bg-green-100 text-green-700' :
                        a.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>{a.status}</span>
                    </div>
                  ))
                )}
              </div>
            )}
            {activeTab === 'overview' && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-sm text-gray-600">
                <p className="mb-2"><strong>Address:</strong> {patient.address || '—'}</p>
                <p className="mb-2"><strong>Emergency contact:</strong> {patient.emergencyContact?.name || '—'} ({patient.emergencyContact?.relationship || '—'}) — {patient.emergencyContact?.phone || '—'}</p>
                <p className="mb-2"><strong>Registered:</strong> {new Date(patient.createdAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        <div className="no-print space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-sm text-[#14357A] mb-2">Quick Actions</h3>
            <button
              onClick={() => navigate('/appointments')}
              className="w-full text-left text-xs font-bold text-[#14357A] bg-blue-50 px-3 py-2 rounded hover:bg-blue-100 mb-2"
            >
              → Book Appointment
            </button>
            <button
              onClick={() => window.print()}
              className="w-full text-left text-xs font-bold text-[#14357A] bg-blue-50 px-3 py-2 rounded hover:bg-blue-100"
            >
              → Print Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}