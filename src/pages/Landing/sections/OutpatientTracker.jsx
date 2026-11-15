// src/pages/Landing/sections/OutpatientTracker.jsx
import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';

export default function OutpatientTracker() {
  const queue = [
    { clinic: 'General Outpatient Clinic (GOPC)', dept: 'Adeola, Babatunde O.', wait: '18 mins', status: 'In Triage', color: 'bg-blue-100 text-blue-700' },
    { clinic: 'General Outpatient Clinic (GOPC)', dept: 'Akinwale, Folake A.', wait: '25 mins', status: 'With Doctor', color: 'bg-green-100 text-green-700' },
    { clinic: 'General Outpatient Clinic (GOPC)', dept: 'Nwankwo, Emeka C.', wait: '32 mins', status: 'With Doctor', color: 'bg-green-100 text-green-700' },
    { clinic: 'General Outpatient Clinic (GOPC)', dept: 'Okonkwo, Chidinma', wait: '40 mins', status: 'Waiting', color: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <section className="bg-[#F8FAFC] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <p className="text-xs font-bold text-[#0066FF] uppercase tracking-widest mb-2">Real-time Queue</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A192F]">Live Outpatient Queue Tracker</h2>
            <p className="text-sm text-gray-500 mt-1">Real-time updates from the Jaja Clinic General Outpatient Desk.</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-semibold text-[#0A192F] border border-gray-300 px-4 py-2 rounded-md bg-white hover:bg-gray-50">
            <FiRefreshCw /> Refresh Queue
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Clinic Desk</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Attending Patient</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Wait Time</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-[#0A192F]">{row.clinic}</td>
                  <td className="px-6 py-4 text-gray-600">{row.dept}</td>
                  <td className="px-6 py-4 text-gray-600 font-mono">{row.wait}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${row.color}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
