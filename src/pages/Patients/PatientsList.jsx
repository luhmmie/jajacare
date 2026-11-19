import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  FiSearch, FiPrinter, FiUserPlus, FiUsers,
  FiActivity, FiHeart, FiX, FiFileText
} from 'react-icons/fi';
import { FaStethoscope, FaHospital } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { listPatients } from '../../services/patientService';

export default function PatientsList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const canRegister = user?.role === 'admin' || user?.role === 'receptionist';

  const [searchTerm, setSearchTerm] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const [patients, setPatients] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    const timer = setTimeout(() => {
      listPatients({ search: searchTerm, faculty: facultyFilter, status: statusFilter, page, limit })
        .then((data) => {
          if (cancelled) return;
          setPatients(data.data || []);
          setTotal(data.total || 0);
        })
        .catch((err) => {
          if (cancelled) return;
          setError(err.message || 'Failed to load patients');
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searchTerm, facultyFilter, statusFilter, page, limit]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="max-w-[1600px] mx-auto pb-10 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-[#14357A] uppercase tracking-wider bg-blue-100 px-2 py-0.5 rounded">Registry Desk 04</span>
            <span className="text-[10px] text-gray-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Academic Year 2025/2026
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#14357A] mb-1">Patient Directory & Records</h1>
          <p className="text-sm text-gray-500">Manage registered University of Ibadan students, staff members, and hospital cards.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto no-print">
          <button
            onClick={() => window.print()}
            className="flex-1 md:flex-none bg-white border border-gray-200 text-[#14357A] font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm"
          >
            <FiPrinter /> Print Daily Register
          </button>
          {canRegister && (
            <button
              onClick={() => navigate('/patients/register')}
              className="flex-1 md:flex-none bg-[#14357A] hover:bg-[#0C2356] text-white font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"
            >
              <FiUserPlus /> Register New Patient
            </button>
          )}
        </div>
      </div>

      <div className="no-print bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Matric No, Name, or Staff ID..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm focus:border-[#14357A] outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Faculty filter..."
            value={facultyFilter}
            onChange={(e) => { setFacultyFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm text-gray-600 outline-none w-full md:w-auto"
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-md text-sm text-gray-600 outline-none w-full md:w-auto"
          >
            <option value="">Status: All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setSearchTerm(''); setFacultyFilter(''); setStatusFilter(''); setPage(1); }}
            className="text-[10px] font-bold text-[#14357A] hover:underline"
          >
            Reset all filters
          </button>
          <span className="text-[10px] text-gray-500 ml-auto">
            Showing {patients.length} of {total} records
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 hidden md:flex text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          <div className="w-[25%]">Patient Name & ID</div>
          <div className="w-[15%]">Matric / Staff No.</div>
          <div className="w-[20%]">Faculty / Residence</div>
          <div className="w-[15%]">Status</div>
          <div className="w-[15%]">Last Visit</div>
          <div className="w-[10%] text-right no-print">Actions</div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm text-gray-500">Loading patients...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm text-red-600 mb-2">{error}</p>
            <button
              onClick={() => setPage((p) => p)}
              className="text-xs font-bold text-[#14357A] underline"
            >
              Retry
            </button>
          </div>
        ) : patients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl flex items-center justify-center text-[#14357A]">
                <FiFileText size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#14357A] mb-2">No Patient Records Found</h3>
            <p className="text-sm text-gray-500 max-w-lg mb-8">
              No registered patients match the current criteria. Try clearing filters or register a new patient.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              {canRegister && (
                <button
                  onClick={() => navigate('/patients/register')}
                  className="bg-[#14357A] hover:bg-[#0C2356] text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <FiUserPlus /> Register New Patient
                </button>
              )}
              <button
                onClick={() => { setSearchTerm(''); setFacultyFilter(''); setStatusFilter(''); }}
                className="bg-[#F8FAFC] border border-gray-200 text-gray-600 font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
              >
                <FiX /> Clear All Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {patients.map((p) => {
              const initials = `${p.firstName?.[0] || ''}${p.lastName?.[0] || ''}`.toUpperCase();
              return (
                <div key={p.id} className="flex flex-col md:flex-row md:items-center px-6 py-4 hover:bg-gray-50 transition">
                  <div className="w-full md:w-[25%] flex items-center gap-3 mb-2 md:mb-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 bg-blue-100 text-blue-700">
                      {initials}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#14357A]">{p.firstName} {p.lastName}</p>
                      <p className="text-[10px] text-gray-500">{p.patientId}</p>
                    </div>
                  </div>
                  <div className="w-full md:w-[15%] text-xs text-gray-600 mb-1 md:mb-0">
                    {p.matricNumber}
                  </div>
                  <div className="w-full md:w-[20%] text-xs mb-1 md:mb-0">
                    <p className="font-semibold text-gray-700">{p.faculty || '—'}</p>
                    <p className="text-[10px] text-gray-500">{p.department || ''} {p.hallOfResidence ? `• ${p.hallOfResidence}` : ''}</p>
                  </div>
                  <div className="w-full md:w-[15%] text-xs mb-1 md:mb-0">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${p.status === 'active' ? 'text-green-700 bg-green-50' : 'text-gray-700 bg-gray-100'}`}>
                      {p.status || 'active'}
                    </span>
                  </div>
                  <div className="w-full md:w-[15%] text-xs mb-1 md:mb-0">
                    <p className="font-semibold text-gray-700">
                      {p.lastVisit ? new Date(p.lastVisit).toLocaleDateString() : 'No visits'}
                    </p>
                  </div>
                  <div className="w-full md:w-[10%] flex md:justify-end gap-2 mt-2 md:mt-0 no-print">
                    <button
                      onClick={() => navigate(`/patients/${p.id}`)}
                      className="text-xs font-bold text-[#14357A] bg-blue-50 px-3 py-1.5 rounded hover:bg-blue-100 transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm no-print">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="text-xs font-bold text-[#14357A] disabled:opacity-40 px-3 py-1.5 bg-blue-50 rounded"
          >
            ← Previous
          </button>
          <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="text-xs font-bold text-[#14357A] disabled:opacity-40 px-3 py-1.5 bg-blue-50 rounded"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}