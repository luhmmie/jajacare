
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  FiActivity, FiAlertTriangle, FiCheckCircle, 
  FiClock, FiPlus, FiTrash2, FiSearch, FiInfo, 
  FiFileText, FiShield, FiPrinter, FiSave, FiZap, FiBox,
  FiRefreshCw
} from 'react-icons/fi';
import { FaStethoscope, FaPills, FaHeartbeat } from 'react-icons/fa';
import { useNotification } from '../../context/NotificationContext';

const initialMeds = [
  {
    id: 1,
    name: 'Rabeprazole Sodium',
    type: 'Capsule (Enteric-coated) • 20mg',
    isTiship: true,
    stock: 'In Stock (Shelf B4 - 340 caps)',
    description: 'Class: Proton Pump Inhibitor (PPI) • 1 UI Formulary Tier 1 Essential Drug',
    dosage: '20 mg (1 Capsule)',
    frequency: 'Once Daily (OD) - Morning',
    duration: '14 Days',
    dispenseQty: '14 Capsules',
    instructions: 'Take 30 mins before breakfast with plain water. Do not crush or chew.'
  },
  {
    id: 2,
    name: 'Gaviscon Liquid Suspension',
    type: 'Oral Liquid • 200ml Bottle',
    isTiship: true,
    stock: 'In Stock (Shelf D1 - 85 bottles)',
    description: 'Sodium Alginate + Sodium Bicarbonate + Calcium Carbonate • Reflux Barrier',
    dosage: '10 ml',
    frequency: 'TDS (Post-meals & Bedtime)',
    duration: '7 Days',
    dispenseQty: '1 Bottle (200ml)',
    instructions: 'Shake bottle vigorously before ingestion.'
  },
];

export default function Consultation() {
  const navigate = useNavigate();
  const { notifySuccess, notifyInfo } = useNotification();
  const [activeTab, setActiveTab] = useState('prescription');
  const [meds, setMeds] = useState(initialMeds);
  const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '', duration: '' });
  const [isAddingMed, setIsAddingMed] = useState(false);

  const handleAddMed = () => {
    if (!newMed.name) return;
    const med = {
      id: Date.now(),
      name: newMed.name,
      type: 'Custom Medication',
      isTiship: true,
      stock: 'Pending Verification',
      description: 'Added manually by clinician',
      dosage: newMed.dosage || '1 tab',
      frequency: newMed.frequency || 'BD',
      duration: newMed.duration || '5 Days',
      dispenseQty: '10 Tabs',
      instructions: 'Take as directed by physician.'
    };
    setMeds([...meds, med]);
    setNewMed({ name: '', dosage: '', frequency: '', duration: '' });
    setIsAddingMed(false);
    notifySuccess('Medication added to Rx list');
  };

  const handleRemoveMed = (id) => {
    setMeds(meds.filter(m => m.id !== id));
    notifyInfo('Medication removed');
  };

  const handleAddPreset = (presetName) => {
    const presetMeds = [
      { name: 'Artemether/Lumefantrine 80/480mg', dosage: '1 tab', frequency: 'BD', duration: '3 Days', instructions: 'Take with fatty food.' },
      { name: 'Paracetamol 500mg', dosage: '2 tabs', frequency: 'TDS', duration: '3 Days', instructions: 'For fever.' },
    ].map((m, i) => ({
      id: Date.now() + i,
      name: m.name,
      type: 'Preset Medication',
      isTiship: true,
      stock: 'In Stock',
      description: `Added via ${presetName} preset`,
      dosage: m.dosage,
      frequency: m.frequency,
      duration: m.duration,
      dispenseQty: 'Standard Pack',
      instructions: m.instructions
    }));
    setMeds([...meds, ...presetMeds]);
    notifySuccess(`Loaded preset: ${presetName}`);
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-10 space-y-6">
      
      {/* HEADER */}
      <div className="no-print flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>Dashboard</span> <span className="text-gray-300">/</span> 
            <span>Consultations</span> <span className="text-gray-300">/</span> 
            <span className="font-semibold text-[#14357A]">Active Encounter #ENC-2026-0892</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-[#F5B041] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">In Consultation • Room 1</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">Duration: 14m 37s</span>
            <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">UI TISHIP</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <button onClick={() => notifyInfo('Session held. You can resume later.')} className="flex-1 lg:flex-none bg-white border border-gray-200 text-gray-600 font-semibold px-3 py-2 rounded-lg hover:bg-gray-50 transition shadow-sm text-xs">Hold</button>
          <button onClick={() => window.print()} className="flex-1 lg:flex-none bg-white border border-gray-200 text-gray-600 font-semibold px-3 py-2 rounded-lg hover:bg-gray-50 transition shadow-sm text-xs flex items-center justify-center gap-2"><FiPrinter /> Print Rx</button>
          <button onClick={() => notifySuccess('Draft saved successfully.')} className="flex-1 lg:flex-none bg-[#F8FAFC] border border-gray-200 text-[#14357A] font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition shadow-sm text-xs flex items-center justify-center gap-2"><FiSave /> Save Draft</button>
          <button 
            onClick={() => {
              if(window.confirm('Complete this consultation and send Rx to pharmacy?')) {
                notifySuccess('Consultation completed & sent to pharmacy.');
                setTimeout(() => navigate('/dashboard'), 1500);
              }
            }}
            className="flex-1 lg:flex-none bg-[#14357A] hover:bg-[#0C2356] text-white font-semibold px-6 py-2 rounded-lg transition shadow-md text-xs flex items-center justify-center gap-2"
          >
            <FiCheckCircle /> Complete Consultation
          </button>
        </div>
      </div>

    
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 shrink-0">
            <img src="https://i.pravatar.cc/150?img=11" alt="Patient" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#14357A]">Oluwaseun Emmanuel Adeleke <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">Matric: 214567</span></h1>
            <p className="text-xs text-gray-500">300L Computer Science • Mellanby Hall Room B12</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="bg-[#F8FAFC] px-3 py-1.5 rounded border border-gray-100"><p className="text-[9px] font-bold text-gray-400 uppercase">Age & Sex</p><p className="font-bold text-[#14357A]">21 yrs • Male</p></div>
          <div className="bg-[#F8FAFC] px-3 py-1.5 rounded border border-gray-100"><p className="text-[9px] font-bold text-gray-400 uppercase">Blood & Genotype</p><p className="font-bold text-[#14357A]">O Rh+ • AA</p></div>
        </div>
      </div>

      
      <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <FiAlertTriangle className="text-red-600 shrink-0" size={18} />
          <span className="text-xs font-bold text-red-700 uppercase">Critical Alerts:</span>
          <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">Penicillin & Sulfa Drugs</span>
        </div>
      </div>

    
      <div className="no-print flex overflow-x-auto border-b border-gray-200 bg-white rounded-t-xl px-2 pt-2">
        {[
          { id: 'vitals', label: 'Vitals', icon: <FaHeartbeat /> },
          { id: 'complaints', label: 'Complaints & HPI', icon: <FiFileText /> },
          { id: 'diagnosis', label: 'Diagnosis', icon: <FaStethoscope /> },
          { id: 'prescription', label: 'Prescription Builder', icon: <FaPills />, badge: meds.length },
        ].map(tab => (
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
          {activeTab === 'prescription' ? (
            <>
              <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl p-5">
                <h2 className="text-xl font-bold text-[#14357A]">Outpatient Electronic Prescription (e-Rx)</h2>
                <p className="text-xs text-gray-500 mt-1">Synchronized with Jaja Central Pharmacy.</p>
              </div>

              <div className="no-print flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search generic or trade..." className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none" />
                </div>
                <button onClick={() => setIsAddingMed(true)} className="bg-[#14357A] text-white font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm">
                  <FiPlus /> Add Custom Drug
                </button>
              </div>

              <div className="no-print flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Fast Presets:</span>
                <button onClick={() => handleAddPreset('Acute PUD Protocol')} className="bg-[#F8FAFC] border border-gray-200 text-[#14357A] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <FiZap className="text-[#F5B041]" /> Acute PUD
                </button>
                <button onClick={() => handleAddPreset('Uncomplicated Malaria')} className="bg-[#F8FAFC] border border-gray-200 text-[#14357A] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <FiZap className="text-[#F5B041]" /> Malaria
                </button>
              </div>

              <div className="space-y-4">
                {meds.length === 0 && (
                  <div className="text-center py-10 bg-white border border-gray-200 rounded-xl">
                    <p className="text-gray-500 text-sm">No medications added yet.</p>
                  </div>
                )}
                {meds.map((med, index) => (
                  <div key={med.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-50 text-[#14357A] font-bold text-sm w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5">{index + 1}</div>
                        <div>
                          <h3 className="font-bold text-[#14357A] text-lg">{med.name}</h3>
                          <p className="text-xs text-gray-500">{med.type}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="bg-green-100 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded border border-green-200">{med.stock}</span>
                        <button onClick={() => handleRemoveMed(med.id)} className="no-print text-gray-400 hover:text-red-500"><FiTrash2 size={16} /></button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="bg-teal-100 text-teal-800 text-[9px] font-bold px-2 py-0.5 rounded w-max inline-block mb-1">TISHIP Covered 100%</span>
                      <p className="text-xs text-gray-500">{med.description}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#F8FAFC] p-3 rounded-lg border border-gray-100">
                      <div><p className="text-[9px] font-bold text-gray-400 uppercase">Dosage</p><p className="text-xs font-bold text-[#14357A]">{med.dosage}</p></div>
                      <div><p className="text-[9px] font-bold text-gray-400 uppercase">Frequency</p><p className="text-xs font-bold text-[#14357A]">{med.frequency}</p></div>
                      <div><p className="text-[9px] font-bold text-gray-400 uppercase">Duration</p><p className="text-xs font-bold text-[#14357A]">{med.duration}</p></div>
                      <div><p className="text-[9px] font-bold text-gray-400 uppercase">Qty</p><p className="text-xs font-bold text-[#14357A]">{med.dispenseQty}</p></div>
                    </div>
                  </div>
                ))}
              </div>

              {isAddingMed && (
                <div className="no-print bg-white rounded-xl border border-[#14357A] shadow-md p-5">
                  <h3 className="font-bold text-[#14357A] mb-4 text-sm">Add New Medication</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input type="text" placeholder="Drug Name" value={newMed.name} onChange={(e) => setNewMed({...newMed, name: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                    <input type="text" placeholder="Dosage" value={newMed.dosage} onChange={(e) => setNewMed({...newMed, dosage: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                    <input type="text" placeholder="Frequency" value={newMed.frequency} onChange={(e) => setNewMed({...newMed, frequency: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                    <input type="text" placeholder="Duration" value={newMed.duration} onChange={(e) => setNewMed({...newMed, duration: e.target.value})} className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm outline-none" />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setIsAddingMed(false)} className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-md">Cancel</button>
                    <button onClick={handleAddMed} className="bg-[#14357A] text-white px-4 py-2 rounded-md text-xs font-bold">Save</button>
                  </div>
                </div>
              )}

              <button onClick={() => setIsAddingMed(true)} className="no-print w-full bg-[#F8FAFC] border-2 border-dashed border-gray-300 rounded-xl py-4 text-[#14357A] font-bold flex items-center justify-center gap-2">
                <FiPlus /> Add Another Medication
              </button>

              <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiFileText className="text-blue-500" size={16} />
                  <div>
                    <p className="text-xs font-bold text-[#14357A]">Prescribing Clinician: Dr. Adanna Eze (CMO)</p>
                    <p className="text-[9px] text-gray-500">Reg #MDCN-74892</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Signed & Timed</p>
                  <p className="text-xs font-bold text-[#14357A]">08:35 WAT</p>
                </div>
              </div>

              <div className="no-print bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1 text-xs font-bold text-green-600">
                  <FiCheckCircle /> {meds.length} Medications Prescribed
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button onClick={() => window.print()} className="flex-1 md:flex-none bg-white border border-gray-200 text-[#14357A] font-bold px-4 py-2 rounded-md hover:bg-gray-50 text-xs flex items-center gap-2">
                    <FiPrinter /> Print Signed Rx
                  </button>
                  <button onClick={() => { notifySuccess('Consultation completed.'); setTimeout(() => navigate('/dashboard'), 1500); }} className="flex-1 md:flex-none bg-[#14357A] text-white font-bold px-6 py-2 rounded-md text-xs flex items-center gap-2">
                    <FiBox /> Complete & Dispatch
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center min-h-[500px] flex flex-col items-center justify-center">
              <FaStethoscope size={32} className="text-gray-300 mb-4" />
              <h2 className="text-xl font-bold text-[#14357A] mb-2">{activeTab.toUpperCase()} Form</h2>
              <p className="text-sm text-gray-500">This section is coming soon.</p>
            </div>
          )}
        </div>

        <div className="no-print space-y-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-[#14357A] flex items-center gap-2"><FiActivity /> Encounter Vitals</h3>
              <button onClick={() => notifyInfo('Vitals re-take form opened')} className="text-[10px] font-bold text-[#14357A] hover:underline flex items-center gap-1"><FiRefreshCw size={10} /> Re-take</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#F8FAFC] p-2.5 rounded border border-gray-100"><p className="text-[9px] font-bold text-gray-400 uppercase">Body Temp</p><p className="text-lg font-bold text-[#14357A]">36.8°C</p></div>
              <div className="bg-[#F8FAFC] p-2.5 rounded border border-gray-100"><p className="text-[9px] font-bold text-gray-400 uppercase">Blood Pressure</p><p className="text-lg font-bold text-[#14357A]">118/76</p></div>
              <div className="bg-[#F8FAFC] p-2.5 rounded border border-gray-100"><p className="text-[9px] font-bold text-gray-400 uppercase">Pulse Rate</p><p className="text-lg font-bold text-[#14357A]">72 bpm</p></div>
              <div className="bg-[#F8FAFC] p-2.5 rounded border border-gray-100"><p className="text-[9px] font-bold text-gray-400 uppercase">SpO2</p><p className="text-lg font-bold text-[#14357A]">99%</p></div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-sm text-[#14357A] mb-3 flex items-center gap-2"><FiFileText /> Clinical Diagnoses</h3>
            <div className="bg-[#F8FAFC] border border-gray-100 p-3 rounded-lg">
              <div className="flex justify-between items-start mb-1">
                <span className="bg-[#14357A] text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Primary</span>
                <span className="text-[9px] font-bold text-gray-400">ICD-10: K27.9</span>
              </div>
              <p className="text-xs font-bold text-[#14357A] mb-1">Peptic Ulcer Disease</p>
              <p className="text-[10px] text-gray-500">Epigastric burning discomfort.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}