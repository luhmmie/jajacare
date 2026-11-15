// src/pages/Landing/sections/StatsStrip.jsx
import React from 'react';

const stats = [
  { value: '38,500+', label: 'Active Registered Patients' },
  { value: '99.4%', label: 'Digital Record Accuracy' },
  { value: '< 15 mins', label: 'Average Waiting Time' },
  { value: '24/7', label: 'Emergency & Ambulance' },
];

export default function StatsStrip() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-200">
          {stats.map((stat, idx) => (
            <div key={idx} className={`text-center ${idx !== 0 ? 'pl-8' : ''}`}>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#0A192F] mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
