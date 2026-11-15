// src/services/consultationService.js
const STORAGE_KEY = 'jajacare_consultations';

function getConsultations() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveConsultations(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function startConsultation(appointmentId) {
  await new Promise((r) => setTimeout(r, 300));
  const items = getConsultations();
  const existing = items.find((c) => c.appointmentId === appointmentId);
  if (existing) return existing;

  const consultation = {
    id: `c${Date.now()}`,
    appointmentId,
    vitals: null,
    complaints: { symptoms: '', duration: '' },
    diagnosis: { text: '', notes: '' },
    prescription: [],
    status: 'draft',
    createdAt: new Date().toISOString(),
  };
  saveConsultations([consultation, ...items]);
  return consultation;
}

export async function getConsultation(id) {
  await new Promise((r) => setTimeout(r, 200));
  const consultation = getConsultations().find((c) => c.id === id);
  if (!consultation) throw new Error('Consultation not found');
  return consultation;
}

export async function saveConsultation(id, updates) {
  await new Promise((r) => setTimeout(r, 300));
  const items = getConsultations();
  const idx = items.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error('Consultation not found');
  items[idx] = { ...items[idx], ...updates };
  saveConsultations(items);
  return items[idx];
}

export async function completeConsultation(id) {
  return saveConsultation(id, {
    status: 'completed',
    completedAt: new Date().toISOString(),
  });
}
