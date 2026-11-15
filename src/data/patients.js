
const STORAGE_KEY = 'jajacare_patients';

const seedPatients = [
  {
    id: 'p1',
    patientId: 'JC-2026-0001',
    firstName: 'Oluwaseun',
    lastName: 'Adeleke',
    gender: 'male',
    dateOfBirth: '2002-05-14',
    phone: '08031234567',
    matricNumber: '218372',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    hallOfResidence: 'Mellanby Hall',
    emergencyContact: { name: 'Mrs. Adeleke', relationship: 'Mother', phone: '08031234567' },
    bloodGroup: 'O+',
    genotype: 'AA',
    allergies: ['Penicillin'],
    chronicConditions: ['Asthma'],
    lastVisit: '2026-01-15',
    status: 'active',
    createdAt: '2025-09-12',
  },
  {
    id: 'p2',
    patientId: 'JC-2026-0002',
    firstName: 'Chioma',
    lastName: 'Okafor',
    gender: 'female',
    dateOfBirth: '2001-11-22',
    phone: '08031234568',
    matricNumber: '205891',
    faculty: 'Faculty of Arts',
    department: 'English',
    hallOfResidence: 'Queen Idia Hall',
    emergencyContact: { name: 'Mr. Okafor', relationship: 'Father', phone: '08031234568' },
    bloodGroup: 'A+',
    genotype: 'AS',
    allergies: [],
    chronicConditions: [],
    lastVisit: '2026-01-18',
    status: 'active',
    createdAt: '2025-10-03',
  },
];

export function getPatients() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPatients));
    return seedPatients;
  }
  return JSON.parse(raw);
}

export function savePatients(patients) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
}
