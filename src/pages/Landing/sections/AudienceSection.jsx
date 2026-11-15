
import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaUserNurse, FaCheck } from 'react-icons/fa';

export default function AudienceSection() {
  const audiences = [
    { icon: <FaUserGraduate />, title: 'UI Students', sub: 'Undergraduates & PG', features: ['Comprehensive medical coverage', 'Instant JC ID generation', 'Online appointment booking', 'Access to health records'] },
    { icon: <FaChalkboardTeacher />, title: 'Academic & Non-Academic Staff', sub: 'Teaching & Admin', features: ['Dedicated staff consultations', 'Priority appointment slots', 'NHIS integration', 'Prescription refills online'] },
    { icon: <FaUserNurse />, title: 'Frontdesk & Nursing Staff', sub: 'Clinic Administrators', features: ['Streamlined patient check-in', 'Real-time queue management', 'Digital vitals recording', 'Unified patient dashboards'] },
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-[#0066FF] uppercase tracking-widest mb-3">Patient & Staff Segments</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-4">Tailored for every member of the UI community</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Delivering specialized features across different groups — all under a single unified platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((aud, idx) => (
            <div key={idx} className="bg-[#0A192F] text-white p-8 rounded-2xl shadow-lg flex flex-col">
              <div className="text-[#F5B041] text-3xl mb-4">{aud.icon}</div>
              <h3 className="text-xl font-bold mb-1">{aud.title}</h3>
              <p className="text-sm text-blue-300 mb-6">{aud.sub}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {aud.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-blue-100">
                    <FaCheck className="text-[#F5B041] mt-1 shrink-0" size={12} /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2.5 border border-blue-700 rounded-md hover:bg-blue-900 transition font-semibold text-sm">
                Explore Portal
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
