
import React from 'react';
import { FiFileText, FiClock, FiShield, FiActivity } from 'react-icons/fi';

export default function StatsStrip() {
  const stats = [
    { 
      value: '100%', 
      label: 'Zero Physical Paper Charts', 
      subtext: 'Full digital longitudinal charts with automated legacy dossier digitization.',
      icon: <FiFileText />,
      iconColor: 'text-[#14357A]'
    },
    { 
      value: '< 45s', 
      label: 'Consultation Charting & e-Rx', 
      subtext: 'ICD-11 macros, auto-dose verification, and one-tap dispensary transmission.',
      icon: <FiClock />,
      iconColor: 'text-[#F5B041]'
    },
    { 
      value: '100%', 
      label: 'NHIA & MDCN Compliance', 
      subtext: 'Validated TISHIP benefit packages, digital signature stamps, and audit trails.',
      icon: <FiShield />,
      iconColor: 'text-[#14357A]'
    },
    { 
      value: '24/7', 
      label: 'Ward & Casualty Emergency Link', 
      subtext: 'Instant ambulance telemetry, bed occupancy telemetry, and UCH trauma link.',
      icon: <FiActivity />,
      iconColor: 'text-red-500'
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200 py-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-extrabold text-[#0A192F] tracking-tight">{stat.value}</h3>
                <div className={`text-xl ${stat.iconColor}`}>{stat.icon}</div>
              </div>
              <h4 className="font-bold text-sm text-[#0A192F] mb-2">{stat.label}</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">{stat.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}