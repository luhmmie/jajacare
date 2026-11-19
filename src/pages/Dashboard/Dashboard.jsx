import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  FiUsers, FiCalendar, FiClock, FiUserPlus,
  FiActivity, FiChevronRight, FiArrowRight, FiBox, FiAward,
  FiCheckCircle, FiHeart, FiThermometer, FiAlertCircle, FiFileText
} from 'react-icons/fi';
import { FaStethoscope, FaUserMd, FaHeartbeat, FaSyringe, FaBed, FaPills } from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts';
import { useAuth } from '../../hooks/useAuth';
import EmptyState from '../../components/common/EmptyState';
import { getStats, getWeeklyVisits, getActivity } from '../../services/dashboardService';
import { getQueue } from '../../services/appointmentService';
import { getPharmacyQueue } from '../../services/pharmacyService';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isNurse = user?.role === 'nurse';
  const isDoctor = user?.role === 'doctor';
  const isAdmin = user?.role === 'admin';
  const isReceptionist = user?.role === 'receptionist';
  const isPharmacist = user?.role === 'pharmacist';

  const [stats, setStats] = useState(null);
  const [weekly, setWeekly] = useState([]);
  const [activity, setActivity] = useState([]);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    (async () => {
      try {
        const [s, w, a] = await Promise.all([
          getStats(),
          getWeeklyVisits(),
          getActivity(5),
        ]);
        if (cancelled) return;
        setStats(s);
        setWeekly(w?.days || []);
        setActivity(a?.activity || []);

        if (isPharmacist || isAdmin) {
          const q = await getPharmacyQueue();
          if (!cancelled) setQueue((q || []).slice(0, 3));
        } else if (!isDoctor) {
          const q = await getQueue();
          if (!cancelled) setQueue((q || []).slice(0, 3));
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load dashboard');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [isAdmin, isDoctor, isPharmacist]);

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const chartData = weekly.map((d) => ({
    name: new Date(d.date).toLocaleDateString('en-GB', { weekday: 'short' }),
    students: d.count,
    staff: 0,
  }));

  const getStatCards = () => {
    if (!stats) return [];
    if (isNurse) {
      return [
        { label: 'Triage Queue', value: String(stats.triageQueue ?? 0), icon: <FiUsers />, sub: 'Awaiting triage', trend: 'Live' },
        { label: 'Vitals Recorded', value: String(stats.vitalsRecorded ?? 0), icon: <FiHeart />, sub: 'Today', trend: 'On track' },
        { label: 'Observation Ward', value: String(stats.wardBeds ?? 0), icon: <FaBed />, sub: 'Beds capacity', trend: 'Available' },
        { label: 'Pending Triage', value: String(stats.pendingTriage ?? 0), icon: <FiThermometer />, sub: 'Urgent cases', trend: 'Priority' },
      ];
    }
    if (isDoctor) {
      return [
        { label: 'My Patients Today', value: String(stats.patientsToday ?? 0), icon: <FiUsers />, sub: 'Assigned to you', trend: 'Live' },
        { label: 'Completed Consults', value: String(stats.completedConsultations ?? 0), icon: <FiCheckCircle />, sub: 'Today', trend: 'On track' },
        { label: 'Pending Consultations', value: String(stats.pendingConsultations ?? 0), icon: <FaStethoscope />, sub: 'In queue', trend: 'Live' },
        { label: 'Prescriptions Written', value: String(stats.prescriptionsWritten ?? 0), icon: <FaPills />, sub: 'e-Rx dispatched', trend: 'Today' },
      ];
    }
    if (isPharmacist) {
      return [
        { label: 'Pending Rx Queue', value: String(stats.pendingRx ?? 0), icon: <FiBox />, sub: 'Dispense requests', trend: 'Live' },
        { label: 'Dispensed Today', value: String(stats.dispensedToday ?? 0), icon: <FiCheckCircle />, sub: 'Orders completed', trend: 'On track' },
        { label: 'Low Stock Alerts', value: String(stats.lowStock ?? 0), icon: <FiAlertCircle />, sub: 'Reorder required', trend: 'Action needed' },
        { label: 'Total Inventory', value: String(stats.inventory ?? 0), icon: <FiActivity />, sub: 'SKUs tracked', trend: 'Stable' },
      ];
    }
    if (isAdmin) {
      return [
        { label: 'Patients Today', value: String(stats.patientsToday ?? 0), icon: <FiUsers />, sub: 'Today', trend: 'Live' },
        { label: 'Appointments', value: String(stats.appointmentsToday ?? 0), icon: <FiCalendar />, sub: 'Booked slots', trend: 'Today' },
        { label: 'Staff On Duty', value: String(stats.staffOnDuty ?? 0), icon: <FaUserMd />, sub: 'Active accounts', trend: 'Stable' },
        { label: 'Pending Consults', value: String(stats.pendingConsultations ?? 0), icon: <FaStethoscope />, sub: 'In queue', trend: 'Live' },
      ];
    }
    return [
      { label: 'Patients Today', value: String(stats.patientsToday ?? 0), icon: <FiUsers />, sub: 'Today', trend: 'Live' },
      { label: 'Appointments', value: String(stats.appointmentsToday ?? 0), icon: <FiCalendar />, sub: 'Booked slots', trend: 'Today' },
      { label: 'New Registrations', value: String(stats.newRegistrations ?? 0), icon: <FiUserPlus />, sub: 'Today', trend: 'Today' },
      { label: 'Pending Consults', value: String(stats.pendingConsultations ?? 0), icon: <FaStethoscope />, sub: 'In queue', trend: 'Live' },
    ];
  };

  const getQuickActions = () => {
    if (isNurse) {
      return [
        { icon: <FiHeart />, title: 'Record Patient Vitals', desc: 'Enter BP, temperature, pulse, SpO2', to: '/appointments' },
        { icon: <FaSyringe />, title: 'Confirm Arrival', desc: 'Check in scheduled patients', to: '/appointments' },
        { icon: <FaBed />, title: 'View Queue', desc: 'See patients waiting for triage', to: '/appointments' },
      ];
    }
    if (isDoctor) {
      return [
        { icon: <FiActivity />, title: 'View Appointments', desc: 'My consultations for today', to: '/appointments' },
        { icon: <FiFileText />, title: 'My Patients', desc: 'Browse patient records', to: '/patients' },
        { icon: <FiAward />, title: 'Update Profile', desc: 'Contact & license information', to: '/profile' },
      ];
    }
    if (isPharmacist) {
      return [
        { icon: <FiBox />, title: 'Dispense Next Rx', desc: 'Process pending prescriptions', to: '/pharmacy' },
        { icon: <FiCheckCircle />, title: 'View Stock', desc: 'Check current inventory', to: '/pharmacy' },
        { icon: <FiAlertCircle />, title: 'Reorder Stock', desc: 'Low inventory items', to: '/pharmacy' },
      ];
    }
    if (isAdmin) {
      return [
        { icon: <FiUsers />, title: 'Manage Staff', desc: 'Staff directory & access', to: '/settings' },
        { icon: <FiCalendar />, title: 'View Appointments', desc: 'All bookings today', to: '/appointments' },
        { icon: <FiUserPlus />, title: 'Register Patient', desc: 'New patient intake', to: '/patients/register' },
      ];
    }
    return [
      { icon: <FiUserPlus />, title: 'Register New Patient', desc: 'Create a new patient profile', to: '/patients/register' },
      { icon: <FiCalendar />, title: 'Book Appointment', desc: 'Schedule a new visit', to: '/appointments' },
      { icon: <FiUsers />, title: 'View Patients', desc: 'Browse patient directory', to: '/patients' },
    ];
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#0A192F] flex items-center gap-2">
            Welcome back, {user?.name || 'Staff'}
            <span className="text-[10px] bg-[#F5B041] text-[#0A192F] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              {user?.role || 'Staff'}
            </span>
          </h1>
          <p className="text-sm text-gray-500 flex flex-wrap items-center gap-2 mt-1">
            <FiCalendar /> Today is {today}
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => navigate(isPharmacist ? '/pharmacy' : '/appointments')}
            className="flex-1 md:flex-none bg-white border border-gray-200 text-[#0A192F] font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm"
          >
            <FiCalendar /> {isPharmacist ? 'Pharmacy Queue' : 'View Appointments'}
          </button>
          {(isAdmin || isReceptionist) && (
            <button
              onClick={() => navigate('/patients/register')}
              className="flex-1 md:flex-none bg-[#14357A] hover:bg-[#0C2356] text-white font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"
            >
              <FiUserPlus /> Register New Patient
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading && !stats ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-32 animate-pulse" />
          ))
        ) : (
          getStatCards().map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#14357A] flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="text-3xl font-bold text-[#14357A]">{stat.value}</h3>
              </div>
              <p className="text-[10px] text-gray-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9A520]"></span> {stat.sub} • {stat.trend}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-[#14357A] flex items-center gap-2">
                  <FiActivity /> {isDoctor ? 'My Consultation Throughput' : isPharmacist ? 'Dispensing Volume' : 'Weekly Patient Visits'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {isDoctor ? 'Your patient consult volume per day (last 7 days).' : isPharmacist ? 'Prescriptions processed per day.' : 'Outpatient visits over the last 7 days.'}
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              {chartData.length === 0 ? (
                <EmptyState icon={<FiActivity size={24} />} title="No data" description="Check back once records start." />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 600 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                    <RechartsTooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="students" fill="#14357A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-[#14357A] flex items-center gap-2">
                  <FiClock /> {isPharmacist ? 'Dispense Queue' : isDoctor ? 'My Consultation Queue' : 'Live Waiting Queue'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {isPharmacist ? 'Prescriptions waiting to be dispensed.' : 'Patients in the queue right now.'}
                </p>
              </div>
              <button
                onClick={() => navigate(isPharmacist ? '/pharmacy' : '/appointments')}
                className="text-xs font-bold text-[#14357A] bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 flex items-center gap-1 transition"
              >
                View All <FiArrowRight />
              </button>
            </div>

            {loading ? (
              <p className="text-xs text-gray-400 py-6 text-center">Loading queue...</p>
            ) : queue.length === 0 ? (
              <EmptyState
                icon={<FiCheckCircle size={24} className="text-green-500" />}
                title={isPharmacist ? 'No Pending Rx' : 'Queue is clear!'}
                description={isPharmacist ? 'All prescriptions have been dispensed.' : 'There are no patients waiting right now.'}
              />
            ) : (
              <div className="space-y-3">
                {queue.map((p, idx) => {
                  const patientName = isPharmacist
                    ? `${p.patientId?.firstName || ''} ${p.patientId?.lastName || ''}`.trim()
                    : `${p.patientId?.firstName || ''} ${p.patientId?.lastName || ''}`.trim();
                  const meta = p.patientId?.matricNumber || p.patientId?.patientId || '';
                  const time = p.timeSlot || (p.updatedAt ? new Date(p.updatedAt).toLocaleTimeString() : '');
                  const initials = (p.patientId?.firstName?.[0] || '') + (p.patientId?.lastName?.[0] || '');
                  return (
                    <div key={p.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-gray-50 border-gray-100 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full font-bold flex items-center justify-center shrink-0 bg-[#F5B041]/20 text-[#F5B041]">
                          {initials.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#14357A]">{patientName}</p>
                          <p className="text-[10px] text-gray-500">{meta}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                        <div className="hidden sm:block text-right">
                          <p className="text-[10px] text-gray-400 uppercase font-bold">Slot</p>
                          <p className="text-xs font-bold text-[#14357A]">{time}</p>
                        </div>
                        <button
                          onClick={() => navigate(isPharmacist ? '/pharmacy' : '/appointments')}
                          className="text-xs font-bold px-3 py-2 rounded-md bg-[#14357A] text-white hover:bg-[#0C2356]"
                        >
                          Open
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-[#14357A] mb-4 flex items-center gap-2">
              <FaHeartbeat className="text-[#F5B041]" /> Quick Actions
            </h3>
            <div className="space-y-3">
              {getQuickActions().map((action, i) => (
                <button
                  key={i}
                  onClick={() => navigate(action.to)}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-[#14357A]/30 hover:bg-blue-50/50 transition group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-[#14357A] text-white flex items-center justify-center shrink-0">
                      {action.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#14357A] group-hover:text-blue-700">{action.title}</p>
                      <p className="text-[10px] text-gray-500">{action.desc}</p>
                    </div>
                  </div>
                  <FiChevronRight className="text-gray-300 group-hover:text-[#14357A]" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-[#14357A] mb-6 flex items-center gap-2">
              <FiClock /> Recent Activity
            </h3>

            {loading ? (
              <p className="text-xs text-gray-400 text-center py-4">Loading...</p>
            ) : activity.length === 0 ? (
              <EmptyState icon={<FiActivity size={24} />} title="No recent activity" description="Events will appear here." />
            ) : (
              <div className="space-y-6 relative">
                {activity.map((a, idx) => (
                  <div key={a.id || idx} className="relative flex items-start gap-4">
                    <div className="w-4 h-4 rounded-full border-4 border-white shadow shrink-0 z-10 mt-0.5 bg-[#14357A]"></div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400">
                        {a.timestamp ? new Date(a.timestamp).toLocaleString() : ''}
                      </p>
                      <p className="text-xs font-bold text-[#14357A]">{a.type}</p>
                      <p className="text-[10px] text-gray-500">{a.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}