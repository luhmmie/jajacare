import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  FiActivity, FiAlertTriangle, FiCheckCircle,
  FiPlus, FiTrash2, FiFileText, FiPrinter, FiSave, FiBox
} from 'react-icons/fi';
import { FaStethoscope, FaPills, FaHeartbeat } from 'react-icons/fa';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../hooks/useAuth';
import {
  createConsultation,
  getConsultation,
  updateConsultation,
  completeConsultation,
  addPrescription,
  removePrescription,
} from '../../services/consultationService';
import { listAppointments } from '../../services/appointmentService';

export default function Consultation() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const { notifySuccess, notifyError, notifyInfo } = useNotification();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('prescription');
  const [consultation, setConsultation] = useState(null);
  const [patient, setPatient] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [vitalsForm, setVitalsForm] = useState({
    temperature: '',
    bloodPressure: '',
    pulse: '',
    spo2: '',
    weightKg: '',
    heightCm: '',
  });
  const [complaintsForm, setComplaintsForm] = useState({ symptoms: '', duration: '' });
  const [diagnosisForm, setDiagnosisForm] = useState({ code: '', text: '', notes: '' });
  const [newMed, setNewMed] = useState({ drug: '', dose: '', frequency: '', duration: '', instructions: '' });
  const [isAddingMed, setIsAddingMed] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!appointmentId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const appts = await listAppointments({});
        const appt = (appts || []).find((a) => String(a.id) === String(appointmentId));
        if (!appt) throw new Error('Appointment not found');
        if (cancelled) return;
        setAppointment(appt);
        setPatient(appt.patientId);

        let c;
        try {
          c = await createConsultation(appt.id);
        } catch {
          c = null;
        }
        if (cancelled) return;
        setConsultation(c);
        if (c?.vitals) {
          setVitalsForm({
            temperature: c.vitals.temperature || '',
            bloodPressure: c.vitals.bloodPressure || '',
            pulse: c.vitals.pulse || '',
            spo2: c.vitals.spo2 || '',
            weightKg: c.vitals.weightKg || '',
            heightCm: c.vitals.heightCm || '',
          });
        }
        if (c?.complaints) setComplaintsForm(c.complaints);
        if (c?.diagnosis) setDiagnosisForm(c.diagnosis);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load consultation');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [appointmentId]);

  const handleSaveVitals = async () => {
    if (!consultation) return;
    try {
      const updated = await updateConsultation(consultation.id, {
        vitals: {
          temperature: Number(vitalsForm.temperature) || undefined,
          bloodPressure: vitalsForm.bloodPressure || undefined,
          pulse: Number(vitalsForm.pulse) || undefined,
          spo2: Number(vitalsForm.spo2) || undefined,
          weightKg: Number(vitalsForm.weightKg) || undefined,
          heightCm: Number(vitalsForm.heightCm) || undefined,
        },
      });
      setConsultation(updated);
      notifySuccess('Vitals saved');
    } catch (err) {
      notifyError(err.message || 'Failed to save vitals');
    }
  };

  const handleSaveComplaints = async () => {
    if (!consultation) return;
    try {
      const updated = await updateConsultation(consultation.id, { complaints: complaintsForm });
      setConsultation(updated);
      notifySuccess('Complaints saved');
    } catch (err) {
      notifyError(err.message || 'Failed to save complaints');
    }
  };

  const handleSaveDiagnosis = async () => {
    if (!consultation) return;
    try {
      const updated = await updateConsultation(consultation.id, { diagnosis: diagnosisForm });
      setConsultation(updated);
      notifySuccess('Diagnosis saved');
    } catch (err) {
      notifyError(err.message || 'Failed to save diagnosis');
    }
  };

  const handleAddMed = async () => {
    if (!consultation || !newMed.drug) return;
    try {
      const updated = await addPrescription(consultation.id, newMed);
      setConsultation(updated);
      setNewMed({ drug: '', dose: '', frequency: '', duration: '', instructions: '' });
      setIsAddingMed(false);
      notifySuccess('Medication added');
    } catch (err) {
      if (err.code === 'CONFLICT' && err.message?.toLowerCase().includes('allergy')) {
        notifyError('⚠ Drug allergy detected — patient is allergic to this drug');
      } else {
        notifyError(err.message || 'Failed to add medication');
      }
    }
  };

  const handleRemoveMed = async (itemId) => {
    if (!consultation) return;
    try {
      const updated = await removePrescription(consultation.id, itemId);
      setConsultation(updated);
      notifyInfo('Medication removed');
    } catch (err) {
      notifyError(err.message || 'Failed to remove medication');
    }
  };

  const handleComplete = async () => {
    if (!consultation) return;
    if (!window.confirm('Complete this consultation and send Rx to pharmacy?')) return;
    setSaving(true);
    try {
      await completeConsultation(consultation.id);
      notifySuccess('Consultation completed & sent to pharmacy');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      notifyError(err.message || 'Failed to complete consultation');
    } finally {
      setSaving(false);
    }
  };

  if (!appointmentId) {
    return (
      <div className="max-w-[1600px] mx-auto p-8">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FaStethoscope size={32} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#14357A] mb-2">No Active Consultation</h2>
          <p className="text-sm text-gray-500 mb-4">Select an appointment to start a consultation.</p>
          <button onClick={() => navigate('/appointments')} className="bg-[#14357A] text-white text-xs font-bold px-4 py-2 rounded-lg">
            View Appointments
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <div className="max-w-[1600px] mx-auto p-8 text-sm text-gray-500">Loading consultation...</div>;
  if (error) return <div className="max-w-[1600px] mx-auto p-8 text-sm text-red-600">{error}</div>;
  if (!consultation || !patient) return <div className="max-w-[1600px] mx-auto p-8 text-sm text-gray-500">Consultation unavailable.</div>;

  const isLocked = consultation.status !== 'draft';
  const allergies = patient.allergies || [];
  const fullName = `${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`.replace(/\s+/g, ' ').trim();

  return (
    <div className="max-w-[1600px] mx-auto pb-10 space-y-6">
      <div className="no-print flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>Dashboard</span> <span className="text-gray-300">/</span>
            <span>Consultations</span> <span className="text-gray-300">/</span>
            <span className="font-semibold text-[#14357A]">Encounter {consultation.id.slice(-6)}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isLocked ? 'text-blue-700 bg-blue-50 border-blue-200' : 'text-[#F5B041] bg-amber-50 border-amber-200'}`}>
              {isLocked ? 'Completed' : 'In Consultation'}
            </span>
            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">TISHIP</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <button onClick={() => window.print()} className="bg-white border border-gray-200 text-gray-600 font-semibold px-3 py-2 rounded-lg hover:bg-gray-50 text-xs flex items-center justify-center gap-2">
            <FiPrinter /> Print
          </button>
          {!isLocked && (
            <button
              onClick={handleComplete}
              disabled={saving}
              className="bg-[#14357A] hover:bg-[#0C2356] text-white font-semibold px-6 py-2 rounded-lg transition shadow-md text-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FiCheckCircle /> {saving ? 'Completing...' : 'Complete Consultation'}
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-gray-200 shrink-0 flex items-center justify-center bg-blue-50 text-[#14357A] font-bold">
            {(patient.firstName?.[0] || '') + (patient.lastName?.[0] || '')}
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#14357A]">
              {fullName} <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Matric: {patient.matricNumber}</span>
            </h1>
            <p className="text-xs text-gray-500">
              {patient.faculty || '—'} • {patient.department || ''} • {patient.hallOfResidence || ''}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="bg-[#F8FAFC] px-3 py-1.5 rounded border border-gray-100">
            <p className="text-[9px] font-bold text-gray-400 uppercase">Blood & Genotype</p>
            <p className="font-bold text-[#14357A]">{patient.bloodGroup || '—'} • {patient.genotype || '—'}</p>
          </div>
          <div className="bg-[#F8FAFC] px-3 py-1.5 rounded border border-gray-100">
            <p className="text-[9px] font-bold text-gray-400 uppercase">Phone</p>
            <p className="font-bold text-[#14357A]">{patient.phone}</p>
          </div>
        </div>
      </div>

      {(allergies.length > 0 || (patient.chronicConditions || []).length > 0) && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <FiAlertTriangle className="text-red-600 shrink-0" size={18} />
            <span className="text-xs font-bold text-red-700 uppercase">Alerts:</span>
            {allergies.map((a) => (
              <span key={a} className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">{a}</span>
            ))}
            {(patient.chronicConditions || []).map((c) => (
              <span key={c} className="bg-orange-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">{c}</span>
            ))}
          </div>
        </div>
      )}

      <div className="no-print flex overflow-x-auto border-b border-gray-200 bg-white rounded-t-xl px-2 pt-2">
        {[
          { id: 'vitals', label: 'Vitals', icon: <FaHeartbeat /> },
          { id: 'complaints', label: 'Complaints & HPI', icon: <FiFileText /> },
          { id: 'diagnosis', label: 'Diagnosis', icon: <FaStethoscope /> },
          { id: 'prescription', label: 'Prescription', icon: <FaPills />, badge: consultation.prescription?.length || 0 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id ? 'border-[#14357A] text-[#14357A]' : 'border-transparent text-gray-500 hover:text-[#14357A]'
            }`}
          >
            {tab.icon} {tab.label}
            {tab.badge ? <span className="bg-[#14357A] text-white text-[9px] px-2 py-0.5 rounded-full ml-1">{tab.badge}</span> : null}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {activeTab === 'vitals' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#14357A] mb-4">Vitals</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Temperature (°C)</label>
                  <input type="number" step="0.1" value={vitalsForm.temperature} onChange={(e) => setVitalsForm({ ...vitalsForm, temperature: e.target.value })} disabled={isLocked} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none disabled:opacity-60" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Blood Pressure</label>
                  <input type="text" placeholder="120/80" value={vitalsForm.bloodPressure} onChange={(e) => setVitalsForm({ ...vitalsForm, bloodPressure: e.target.value })} disabled={isLocked} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none disabled:opacity-60" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Pulse (bpm)</label>
                  <input type="number" value={vitalsForm.pulse} onChange={(e) => setVitalsForm({ ...vitalsForm, pulse: e.target.value })} disabled={isLocked} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none disabled:opacity-60" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">SpO2 (%)</label>
                  <input type="number" value={vitalsForm.spo2} onChange={(e) => setVitalsForm({ ...vitalsForm, spo2: e.target.value })} disabled={isLocked} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none disabled:opacity-60" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Weight (kg)</label>
                  <input type="number" step="0.1" value={vitalsForm.weightKg} onChange={(e) => setVitalsForm({ ...vitalsForm, weightKg: e.target.value })} disabled={isLocked} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none disabled:opacity-60" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Height (cm)</label>
                  <input type="number" value={vitalsForm.heightCm} onChange={(e) => setVitalsForm({ ...vitalsForm, heightCm: e.target.value })} disabled={isLocked} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none disabled:opacity-60" />
                </div>
              </div>
              {consultation.vitals?.bmi && (
                <p className="text-xs text-gray-600 mt-3">
                  <strong>BMI:</strong> {consultation.vitals.bmi} (auto-calculated)
                </p>
              )}
              {!isLocked && (
                <div className="flex justify-end mt-4">
                  <button onClick={handleSaveVitals} className="bg-[#14357A] text-white text-xs font-bold px-4 py-2 rounded-md flex items-center gap-2">
                    <FiSave /> Save Vitals
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'complaints' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#14357A] mb-4">Complaints & History of Present Illness</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Symptoms</label>
                  <textarea rows="4" value={complaintsForm.symptoms} onChange={(e) => setComplaintsForm({ ...complaintsForm, symptoms: e.target.value })} disabled={isLocked} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none resize-none disabled:opacity-60" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Duration</label>
                  <input type="text" placeholder="e.g. 3 days" value={complaintsForm.duration} onChange={(e) => setComplaintsForm({ ...complaintsForm, duration: e.target.value })} disabled={isLocked} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none disabled:opacity-60" />
                </div>
              </div>
              {!isLocked && (
                <div className="flex justify-end mt-4">
                  <button onClick={handleSaveComplaints} className="bg-[#14357A] text-white text-xs font-bold px-4 py-2 rounded-md flex items-center gap-2">
                    <FiSave /> Save Complaints
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'diagnosis' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#14357A] mb-4">Diagnosis</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 mb-1">ICD-10 Code</label>
                    <input type="text" placeholder="e.g. K27.9" value={diagnosisForm.code} onChange={(e) => setDiagnosisForm({ ...diagnosisForm, code: e.target.value })} disabled={isLocked} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none disabled:opacity-60" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 mb-1">Diagnosis</label>
                    <input type="text" placeholder="e.g. Peptic Ulcer Disease" value={diagnosisForm.text} onChange={(e) => setDiagnosisForm({ ...diagnosisForm, text: e.target.value })} disabled={isLocked} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none disabled:opacity-60" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1">Notes</label>
                  <textarea rows="3" value={diagnosisForm.notes} onChange={(e) => setDiagnosisForm({ ...diagnosisForm, notes: e.target.value })} disabled={isLocked} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none resize-none disabled:opacity-60" />
                </div>
              </div>
              {!isLocked && (
                <div className="flex justify-end mt-4">
                  <button onClick={handleSaveDiagnosis} className="bg-[#14357A] text-white text-xs font-bold px-4 py-2 rounded-md flex items-center gap-2">
                    <FiSave /> Save Diagnosis
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'prescription' && (
            <>
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                <h2 className="text-xl font-bold text-[#14357A]">Electronic Prescription (e-Rx)</h2>
                <p className="text-xs text-gray-500 mt-1">Synchronized with Jaja Central Pharmacy.</p>
              </div>

              <div className="space-y-4">
                {(consultation.prescription || []).length === 0 && (
                  <div className="text-center py-10 bg-white border border-gray-200 rounded-xl">
                    <p className="text-gray-500 text-sm">No medications added yet.</p>
                  </div>
                )}
                {(consultation.prescription || []).map((med, index) => (
                  <div key={med.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-50 text-[#14357A] font-bold text-sm w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5">{index + 1}</div>
                        <div>
                          <h3 className="font-bold text-[#14357A] text-lg">{med.drug}</h3>
                          <p className="text-xs text-gray-500">{med.dose || ''} {med.frequency ? `• ${med.frequency}` : ''} {med.duration ? `• ${med.duration}` : ''}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${med.dispensed ? 'bg-blue-100 text-blue-700 border-blue-200' : med.rejected ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}>
                          {med.dispensed ? 'Dispensed' : med.rejected ? 'Rejected' : 'Pending'}
                        </span>
                        {!isLocked && !med.dispensed && (
                          <button onClick={() => handleRemoveMed(med.id)} className="text-gray-400 hover:text-red-500"><FiTrash2 size={16} /></button>
                        )}
                      </div>
                    </div>
                    {med.instructions && (
                      <p className="text-xs text-gray-500 mb-2">{med.instructions}</p>
                    )}
                  </div>
                ))}
              </div>

              {!isLocked && (
                <>
                  {!isAddingMed && (
                    <button onClick={() => setIsAddingMed(true)} className="w-full bg-[#F8FAFC] border-2 border-dashed border-gray-300 rounded-xl py-4 text-[#14357A] font-bold flex items-center justify-center gap-2">
                      <FiPlus /> Add Medication
                    </button>
                  )}
                  {isAddingMed && (
                    <div className="bg-white rounded-xl border border-[#14357A] shadow-md p-5">
                      <h3 className="font-bold text-[#14357A] mb-4 text-sm">Add New Medication</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <input type="text" placeholder="Drug Name *" value={newMed.drug} onChange={(e) => setNewMed({ ...newMed, drug: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                        <input type="text" placeholder="Dose (e.g. 1 capsule)" value={newMed.dose} onChange={(e) => setNewMed({ ...newMed, dose: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                        <input type="text" placeholder="Frequency (e.g. Once daily)" value={newMed.frequency} onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                        <input type="text" placeholder="Duration (e.g. 14 days)" value={newMed.duration} onChange={(e) => setNewMed({ ...newMed, duration: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                      </div>
                      <textarea placeholder="Instructions (optional)" rows="2" value={newMed.instructions} onChange={(e) => setNewMed({ ...newMed, instructions: e.target.value })} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none resize-none mb-3" />
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => setIsAddingMed(false)} className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
                        <button onClick={handleAddMed} className="bg-[#14357A] text-white px-4 py-2 rounded-md text-xs font-bold">Add</button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-sm text-[#14357A] mb-3 flex items-center gap-2"><FiActivity /> Vitals Summary</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#F8FAFC] p-2.5 rounded border border-gray-100">
                <p className="text-[9px] font-bold text-gray-400 uppercase">Temp</p>
                <p className="text-sm font-bold text-[#14357A]">{consultation.vitals?.temperature || '—'} {consultation.vitals?.temperature ? '°C' : ''}</p>
              </div>
              <div className="bg-[#F8FAFC] p-2.5 rounded border border-gray-100">
                <p className="text-[9px] font-bold text-gray-400 uppercase">BP</p>
                <p className="text-sm font-bold text-[#14357A]">{consultation.vitals?.bloodPressure || '—'}</p>
              </div>
              <div className="bg-[#F8FAFC] p-2.5 rounded border border-gray-100">
                <p className="text-[9px] font-bold text-gray-400 uppercase">Pulse</p>
                <p className="text-sm font-bold text-[#14357A]">{consultation.vitals?.pulse || '—'} {consultation.vitals?.pulse ? 'bpm' : ''}</p>
              </div>
              <div className="bg-[#F8FAFC] p-2.5 rounded border border-gray-100">
                <p className="text-[9px] font-bold text-gray-400 uppercase">SpO2</p>
                <p className="text-sm font-bold text-[#14357A]">{consultation.vitals?.spo2 || '—'} {consultation.vitals?.spo2 ? '%' : ''}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-sm text-[#14357A] mb-3 flex items-center gap-2"><FiFileText /> Diagnosis</h3>
            {consultation.diagnosis?.text ? (
              <div className="bg-[#F8FAFC] border border-gray-100 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <span className="bg-[#14357A] text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Primary</span>
                  {consultation.diagnosis.code && <span className="text-[9px] font-bold text-gray-400">{consultation.diagnosis.code}</span>}
                </div>
                <p className="text-xs font-bold text-[#14357A] mb-1">{consultation.diagnosis.text}</p>
                {consultation.diagnosis.notes && <p className="text-[10px] text-gray-500">{consultation.diagnosis.notes}</p>}
              </div>
            ) : (
              <p className="text-xs text-gray-500">No diagnosis recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}