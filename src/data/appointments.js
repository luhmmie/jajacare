
const STORAGE_KEY = 'jajacare_appointments';

const seedAppointments = [
  {
    id: 'a1',
    patientId: 'p1',
    doctorId: 'u4',
    doctorName: 'Dr. Tunde Adebayo',
    patientName: 'Oluwaseun Adeleke',
    date: new Date().toISOString().split('T')[0], // today
    timeSlot: '09:00',
    reason: 'Persistent cough for 3 days',
    status: 'scheduled',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'a2',
    patientId: 'p2',
    doctorId: 'u4',
    doctorName: 'Dr. Tunde Adebayo',
    patientName: 'Chioma Okafor',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '09:30',
    reason: 'Routine check-up',
    status: 'checked_in',
    checkedInAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export function getAppointments() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedAppointments));
    return seedAppointments;
  }
  return JSON.parse(raw);
}

export function saveAppointments(appointments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}
