
import React from 'react';
import { 
  FiActivity, FiThermometer, FiCpu, FiClock, 
  FiUserCheck, FiShield, FiArrowRight, FiCheckCircle 
} from 'react-icons/fi';
import { FaPrescriptionBottle, FaFlask, FaBed } from 'react-icons/fa';

export default function FeaturesGrid() {
  const features = [
    {
      icon: <FaPrescriptionBottle />,
      title: 'Rapid Consultation & ICD-11 e-Prescribing',
      desc: 'One-screen clinical charting with structured ICD-11 anatomical coding. Direct transmission to UHS Central Pharmacy with drug-interaction checks and zero missing dosage fields.',
      tags: ['Automated Essential Drug List (EDL) formularies', 'Instant dispensing receipt view at Pharmacy Counter 1-4'],
      link: 'Explore Doctor Workstation'
    },
    {
      icon: <FiThermometer />,
      title: 'Dynamic Triage & Nursing Vital Streams',
      desc: 'Automated Manchester and MEWS (Modified Early Warning Score) grading calculated instantly during intake shifts. High-risk acuity loads, hypoxia, or hypertensive crises trigger instant doctor alerts.',
      tags: ['Automated red-flag patient triage routing', 'Bluetooth IoT-enabled vitals integration support'],
      link: 'Launch Triage Station'
    },
    {
      icon: <FaFlask />,
      title: 'Laboratory & Diagnostics Sync',
      desc: 'Real-time specimen tracking from phlebotomy to analysis. Haematology, clinical chemistry, parasitology, and microbiology results push immediately into the consulting officer\'s session.',
      tags: ['Stat lab orders flagged with priority; auto-visual alerts', 'Direct lab technician certification stamps'],
      link: 'Access Lab Orders & Feeds'
    },
    {
      icon: <FiClock />,
      title: 'Seamless 24-Hour Shift Handover',
      desc: 'Automated handoff dossiers between Morning (08:00 - 16:00), Evening (16:00 - 22:00), and Night Emergency shifts. Ensures critical patient notes and pending casualty reviews never fall through the cracks.',
      tags: ['Shift-scoped clinical handover sheets', 'Mandatory incoming doctor acknowledgement'],
      link: 'Shift Handover Logs'
    },
    {
      icon: <FaBed />,
      title: 'Ward Admissions & Observation Tracking',
      desc: 'Live bed telemetry across Female Ward A, Male Ward B, and Casualty bays. Track intra-venous fluid orders, hourly ward rounds, medication administration times (e-MAR), and discharge readiness.',
      tags: ['Interactive bed board', 'Inpatient pharmacy ward requisition'],
      link: 'View Ward Census'
    },
    {
      icon: <FiShield />,
      title: 'Regulatory Compliance & Pharmacovigilance',
      desc: 'Built-in safety net enforcing Medical and Dental Council of Nigeria (MDCN) audit standards, TISHIP national formulary limits, and mandatory hard-stop drug allergy warnings during prescription authoring.',
      tags: ['Hard-stop all-drug allergy checks', 'Automated Pharmacists Council of Nigeria (PCN) reporting'],
      link: 'Review Clinical Governance'
    }
  ];

  return (
    <section id="features" className="bg-[#F8FAFC] py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold text-[#F5B041] uppercase tracking-widest mb-3">Clinical Modules & Care Workflows</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-4">High-precision tools for doctors, nursing officers, pharmacists & scientists</h2>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">Engineered to eliminate clinical friction, avoid transcription errors, and accelerate institutional patient turnaround across all units.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full hover:shadow-lg transition">
              <div className="w-12 h-12 bg-[#14357A] text-[#F5B041] rounded-lg flex items-center justify-center text-xl mb-5 shadow-md">
                {f.icon}
              </div>
              <h3 className="font-bold text-[#0A192F] text-lg mb-3 leading-tight">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6 flex-1">{f.desc}</p>
              
              <div className="space-y-2 mb-6">
                {f.tags.map((tag, i) => (
                  <div key={i} className="flex items-start gap-2 text-[10px] text-gray-600 font-medium">
                    <FiCheckCircle className="text-green-500 mt-0.5 shrink-0" /> {tag}
                  </div>
                ))}
              </div>
              
              <a href="#" className="text-[#0066FF] text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all mt-auto pt-4 border-t border-gray-100">
                {f.link} <FiArrowRight />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}