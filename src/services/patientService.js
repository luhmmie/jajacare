// src/services/patientService.js
import { getPatients, savePatients } from '../data/patients';
import { generatePatientId } from '../utils/generatePatientId';

export async function listPatients({ search = '', faculty = '', page = 1, limit = 10 } = {}) {
  await new Promise((r) => setTimeout(r, 200));
  let patients = getPatients();

  if (search) {
    const q = search.toLowerCase();
    patients = patients.filter(
      (p) =>
        p.firstName.toLowerCase().includes(q) ||
        p.lastName.toLowerCase().includes(q) ||
        p.patientId.toLowerCase().includes(q) ||
        p.matricNumber.toLowerCase().includes(q)
    );
  }

  if (faculty) {
    patients = patients.filter((p) => p.faculty === faculty);
  }

  const total = patients.length;
  const start = (page - 1) * limit;
  const data = patients.slice(start, start + limit);

  return { data, total, page, limit };
}

export async function getPatient(id) {
  await new Promise((r) => setTimeout(r, 200));
  const patient = getPatients().find((p) => p.id === id);
  if (!patient) throw new Error('Patient not found');
  return patient;
}

export async function createPatient(form) {
  await new Promise((r) => setTimeout(r, 500));
  const patients = getPatients();

  // Duplicate check
  if (patients.some((p) => p.matricNumber === form.matricNumber)) {
    throw new Error('A patient with this matric number already exists');
  }

  const newPatient = {
    ...form,
    id: `p${Date.now()}`,
    patientId: generatePatientId(),
    status: 'active',
    lastVisit: null,
    createdAt: new Date().toISOString(),
  };

  savePatients([newPatient, ...patients]);
  return newPatient;
}

export async function updatePatient(id, updates) {
  await new Promise((r) => setTimeout(r, 300));
  const patients = getPatients();
  const idx = patients.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error('Patient not found');
  patients[idx] = { ...patients[idx], ...updates };
  savePatients(patients);
  return patients[idx];
}

export async function deletePatient(id) {
  await new Promise((r) => setTimeout(r, 300));
  const patients = getPatients().filter((p) => p.id !== id);
  savePatients(patients);
}
