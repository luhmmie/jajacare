
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


const chartData = [
  { name: 'Mon', students: 80, staff: 30 },
  { name: 'Tue', students: 95, staff: 40 },
  { name: 'Wed', students: 60, staff: 25 },
  { name: 'Thu*', students: 70, staff: 50 },
  { name: 'Fri*', students: 75, staff: 45 },
  { name: 'Sat*', students: 40, staff: 20 },
];

const queuePatientsData = [
  {
    initials: 'BA',
    name: 'Babatunde Adeleke',
    meta: 'Matric: 214567 • Faculty of Science • Mellanby Hall',
    extraLabel: 'Arrived',
    extraValue: '08:30 AM',
    status: 'Waiting',
    statusColor: 'bg-amber-100 text-amber-700',
    action: 'Call In',
    actionStyle: 'bg-[#14357A] text-white hover:bg-[#0C2356]',
    cardBg: 'bg-gray-50 border-gray-100',
    avatarBg: 'bg-[#F5B041]/20 text-[#F5B041]',
  },
  {
    initials: 'CO',
    name: 'Chioma Okonkwo',
    meta: 'BP: 118/76 mmHg • Matric: 219804 • Faculty of Pharmacy',
    extraLabel: 'Triage Station',
    extraValue: 'Nurse Bisi',
    status: 'In Triage',
    statusColor: 'bg-blue-100 text-blue-700',
    action: 'Review Vitals',
    actionStyle: 'bg-white text-[#14357A] border border-gray-300 hover:bg-gray-50',
    cardBg: 'bg-blue-50/50 border-blue-100',
    avatarBg: 'bg-blue-100 text-blue-600',
  },
  {
    initials: 'OB',
    name: 'Dr. Olumide Bakare',
    isPriority: true,
    meta: 'Staff ID: UISS-1092 • Faculty of Arts (Senior Lecturer)',
    extraLabel: 'Assigned Doctor',
    extraValue: 'Dr. Eze (You)',
    status: 'Ready for Consult',
    statusColor: 'bg-green-100 text-green-700',
    action: 'Start Session',
    actionStyle: 'bg-[#F5B041] text-[#14357A] hover:bg-[#e09b2d]',
    cardBg: 'bg-gray-50 border-gray-100',
    avatarBg: 'bg-blue-100 text-blue-600',
  },
];

const activityData = [
  { time: '09:14 AM', title: 'Consult Finalized', desc: 'Dr. Eze finalized consult for Folawale Adeyemi (Matric 218432).', dotColor: 'bg-[#14357A]' },
  { time: '09:02 AM', title: 'Triage Vitals Log', desc: 'Nurse Kemi logged vitals for Emeka Nwosu (BP: 130/85).', dotColor: 'bg-[#D9A520]' },
  { time: '08:45 AM', title: 'Insurance Verification', desc: 'Records Desk verified health insurance for 14 new students.', dotColor: 'bg-[#10B981]' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ─── Role detection ───
  const isNurse = user?.role === 'nurse';
  const isDoctor = user?.role === 'doctor';
  const isAdmin = user?.role === 'admin';
  const isReceptionist = user?.role === 'receptionist';
  const isPharmacist = user?.role === 'pharmacist';

  const DEMO_EMPTY = false;
  const queuePatients = DEMO_EMPTY ? [] : queuePatientsData;
  const recentActivity = DEMO_EMPTY ? [] : activityData;

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });


  const getStatCards = () => {
    if (isNurse) {
      return [
        { label: 'Patients in Queue', value: '8', icon: <FiUsers />, sub: 'Awaiting triage', trend: '+3 since 08:00' },
        { label: 'Vitals Recorded', value: '24', icon: <FiHeart />, sub: 'Today', trend: 'On track' },
        { label: 'Observation Ward', value: '5', icon: <FaBed />, sub: 'Beds occupied', trend: '3 available' },
        { label: 'Pending Triage', value: '2', icon: <FiThermometer />, sub: 'Urgent cases', trend: 'Priority' },
      ];
    }
    if (isDoctor) {
      return [
        { label: 'My Patients Today', value: '9', icon: <FiUsers />, sub: 'Assigned to you', trend: '3 waiting' },
        { label: 'Completed Consults', value: '6', icon: <FiCheckCircle />, sub: 'Today', trend: 'On track' },
        { label: 'Pending Consultations', value: '3', icon: <FaStethoscope />, sub: 'In queue', trend: 'Room 1 active' },
        { label: 'Prescriptions Written', value: '14', icon: <FaPills />, sub: 'e-Rx dispatched', trend: '100% TISHIP' },
      ];
    }
    if (isPharmacist) {
      return [
        { label: 'Pending Rx Queue', value: '18', icon: <FiBox />, sub: 'Dispense requests', trend: '3 urgent' },
        { label: 'Dispensed Today', value: '47', icon: <FiCheckCircle />, sub: 'Orders completed', trend: 'On track' },
        { label: 'Low Stock Alerts', value: '4', icon: <FiAlertCircle />, sub: 'Reorder required', trend: 'Action needed' },
        { label: 'Total Inventory', value: '1,284', icon: <FiActivity />, sub: 'SKUs tracked', trend: 'Stable' },
      ];
    }
    if (isAdmin) {
      return [
        { label: 'Total Patients', value: '142', icon: <FiUsers />, sub: 'Today', trend: '+12% vs yest.' },
        { label: 'Appointments', value: '48', icon: <FiCalendar />, sub: 'Booked slots', trend: '32 completed' },
        { label: 'Staff On Duty', value: '27', icon: <FaUserMd />, sub: 'Across 3 shifts', trend: 'Stable' },
        { label: 'Revenue Today', value: '₦142k', icon: <FiAward />, sub: 'TISHIP + Private', trend: 'Good' },
      ];
    }
    
    return [
      { label: 'Patients Today', value: '142', icon: <FiUsers />, sub: 'Peak at 09:30', trend: '+12% vs yest.' },
      { label: 'Appointments', value: '48', icon: <FiCalendar />, sub: '32 completed', trend: '16 remaining' },
      { label: 'New Registrations', value: '27', icon: <FiUserPlus />, sub: 'Undergrads', trend: 'Today' },
      { label: 'Pending Consults', value: '9', icon: <FaStethoscope />, sub: 'Est. wait: 18m', trend: 'Rooms 1,2,4 active' },
    ];
  };

  
  const getQuickActions = () => {
    if (isNurse) {
      return [
        { icon: <FiHeart />, title: 'Record Patient Vitals', desc: 'Enter BP, temperature, pulse, SpO2' },
        { icon: <FaSyringe />, title: 'Administer Medication', desc: 'Log dispensed drugs & injections' },
        { icon: <FaBed />, title: 'Update Observation Ward', desc: 'Manage ward beds & patient status' },
      ];
    }
    if (isDoctor) {
      return [
        { icon: <FiActivity />, title: 'Order Lab Test', desc: 'Malaria RDT, Widal & PCV' },
        { icon: <FiFileText />, title: 'Review Lab Results', desc: 'Check pending pathology reports' },
        { icon: <FiBox />, title: 'Pharmacy Dispense Voucher', desc: 'Fast e-prescription requisition' },
        { icon: <FiAward />, title: 'Medical Fitness Certificate', desc: 'Freshers & Sports clearance' },
      ];
    }
    if (isPharmacist) {
      return [
        { icon: <FiBox />, title: 'Dispense Next Rx', desc: 'Process pending prescriptions' },
        { icon: <FiCheckCircle />, title: 'Verify Prescription', desc: 'Check for drug interactions' },
        { icon: <FiAlertCircle />, title: 'Reorder Stock', desc: 'Low inventory items' },
      ];
    }
    return [
      { icon: <FiUserPlus />, title: 'Register New Patient', desc: 'Create a new patient profile' },
      { icon: <FiCalendar />, title: 'Book Appointment', desc: 'Schedule a new visit' },
      { icon: <FiActivity />, title: 'Order Lab Test', desc: 'Malaria RDT, Widal & PCV' },
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
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline font-medium text-[#10B981] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              {isNurse ? 'Triage & Vitals Station Active' 
                : isDoctor ? 'Consulting Room 1 Active' 
                : isPharmacist ? 'Dispensary Counter Open' 
                : 'General Outpatient & Emergency Triage Active'}
            </span>
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          
          <button 
            onClick={() => navigate(isPharmacist ? '/pharmacy' : '/appointments')}
            className="flex-1 md:flex-none bg-white border border-gray-200 text-[#0A192F] font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm"
          >
            <FiCalendar /> {isNurse ? 'View Queue' : isPharmacist ? 'Pharmacy Queue' : 'View Appointments'}
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

      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {getStatCards().map((stat, idx) => (
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
        ))}
      </div>

    
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

    
        <div className="xl:col-span-2 space-y-6">

          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-[#14357A] flex items-center gap-2">
                  <FiActivity /> {isNurse ? 'Triage Volume & Vitals Throughput' 
                    : isDoctor ? 'My Consultation Throughput' 
                    : isPharmacist ? 'Dispensing Volume' 
                    : 'Weekly Patient Visits & Throughput'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {isNurse ? 'Patients triaged and vitals recorded per day.'
                    : isDoctor ? 'Your patient consult volume per day (last 7 days).'
                    : isPharmacist ? 'Prescriptions processed per day.'
                    : 'Monday through Saturday outpatient distribution (Students vs. Staff).'}
                </p>
              </div>
              <div className="flex gap-4 text-[10px] font-bold text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#14357A]"></span> {isPharmacist ? 'Dispensed' : isDoctor ? 'Consulted' : 'Students'}
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#D9A520]"></span> {isPharmacist ? 'Pending' : isDoctor ? 'Pending' : 'Staff'}
                </div>
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
                    <Bar dataKey="students" stackId="a" fill="#14357A" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="staff" stackId="a" fill="#FDE68A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <p className="text-[10px] text-gray-400">* Projections based on 4-week moving average</p>
              <p className="text-[10px] font-bold text-[#14357A] bg-gray-50 px-2 py-1 rounded">
                {isNurse ? 'Avg Vitals Time: 4m 12s' : isDoctor ? 'Avg Consult Time: 12m 30s' : isPharmacist ? 'Avg Dispense Time: 4m 12s' : 'Clinic Capacity: 84% Available'}
              </p>
            </div>
          </div>

          {/* QUEUE */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-[#14357A] flex items-center gap-2">
                  <FiClock /> {isNurse ? 'Triage Queue' 
                    : isDoctor ? 'My Consultation Queue' 
                    : isPharmacist ? 'Dispense Queue' 
                    : 'Live Waiting Queue Preview'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {isNurse ? 'Patients waiting for vitals and triage.'
                    : isDoctor ? 'Patients assigned to you and ready for consultation.'
                    : isPharmacist ? 'Prescriptions waiting to be dispensed.'
                    : 'Real-time triage and patient routing status.'}
                </p>
              </div>
              <button 
                onClick={() => navigate(isPharmacist ? '/pharmacy' : '/appointments')}
                className="text-xs font-bold text-[#14357A] bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 flex items-center gap-1 transition"
              >
                View All <FiArrowRight />
              </button>
            </div>

            {queuePatients.length === 0 ? (
              <EmptyState
                icon={<FiCheckCircle size={24} className="text-green-500" />}
                title={isPharmacist ? 'No Pending Rx' : 'Queue is clear!'}
                description={isPharmacist ? 'All prescriptions have been dispensed.' : 'There are no patients waiting right now.'}
              />
            ) : (
              <div className="space-y-3">
                {queuePatients.map((p, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border gap-4 ${p.cardBg}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center shrink-0 ${p.avatarBg}`}>
                        {p.initials}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#14357A]">
                          {p.name}
                          {p.isPriority && (
                            <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded ml-2 uppercase">Priority Staff</span>
                          )}
                        </p>
                        <p className="text-[10px] text-gray-500">{p.meta}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-6 text-right w-full md:w-auto">
                      <div className="hidden sm:block">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">{p.extraLabel}</p>
                        <p className="text-xs font-bold text-[#14357A]">{p.extraValue}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${p.statusColor}`}>● {p.status}</span>
                      <button className={`text-xs font-bold px-3 py-2 rounded-md ${p.actionStyle}`}>
                        {isPharmacist ? 'Dispense' : p.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">

          {/* QUICK ACTIONS */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-[#14357A] mb-4 flex items-center gap-2">
              <FaHeartbeat className="text-[#F5B041]" /> 
              {isNurse ? 'Nursing Actions' 
                : isDoctor ? 'Clinical Actions' 
                : isPharmacist ? 'Pharmacy Actions' 
                : 'Quick Actions'}
            </h3>
            <div className="space-y-3">
              {getQuickActions().map((action, i) => (
                <button
                  key={i}
                  onClick={() => navigate(isPharmacist ? '/pharmacy' : '/appointments')}
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

          {/* WARD STATUS - hide for pharmacist */}
          {!isPharmacist && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-bold text-[#14357A] flex items-center gap-2"><FaBed /> Observation Ward Status</h3>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">5 / 12 Total Beds</span>
              </div>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-gray-700">Male Observation Ward</span>
                    <span className="text-[#14357A]">3 / 6 Beds</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className={`h-2 flex-1 rounded-sm ${i < 3 ? 'bg-[#14357A]' : 'bg-blue-100'}`}></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-gray-700">Female Observation Ward</span>
                    <span className="text-[#14357A]">2 / 6 Beds</span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className={`h-2 flex-1 rounded-sm ${i < 2 ? 'bg-[#D9A520]' : 'bg-amber-100'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVITY */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-[#14357A] mb-6 flex items-center gap-2">
              <FiClock /> {isNurse ? 'My Recent Activity' 
                : isDoctor ? 'My Recent Consults' 
                : isPharmacist ? 'Recent Dispensing' 
                : 'Recent Clinical Activity'}
            </h3>

            {recentActivity.length === 0 ? (
              <EmptyState icon={<FiActivity size={24} />} title="No recent activity" description="Events will appear here." />
            ) : (
              <div className="space-y-6 relative">
                {recentActivity.map((a, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    <div className={`w-4 h-4 rounded-full border-4 border-white shadow shrink-0 z-10 mt-0.5 ${a.dotColor}`}></div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400">{a.time}</p>
                      <p className="text-xs font-bold text-[#14357A]">{a.title}</p>
                      <p className="text-[10px] text-gray-500">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* BOTTOM BANNER */}
      <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-xs text-[#14357A] flex items-center gap-2">
          <FiAlertCircle /> <span className="font-bold">University Health Advisory:</span>
          {' '}Mass preventive health screening ongoing for 100L Freshers at Sultan Bello Hall Quadrangle until 16:00 WAT.
        </p>
        <p className="text-[10px] font-bold text-gray-500 whitespace-nowrap">Duty Desk: Main Consultation Wing</p>
      </div>

    </div>
  );
}