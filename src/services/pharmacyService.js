import { api } from '../lib/apiClient';

export async function getPharmacyQueue(date) {
  const qs = date ? `?date=${date}` : '';
  return api.get(`/pharmacy/queue${qs}`);
}

export async function dispensePrescription(prescriptionId, notes = '') {
  return api.post(`/pharmacy/dispense/${prescriptionId}`, { notes });
}

export async function rejectPrescription(prescriptionId, reason) {
  return api.post(`/pharmacy/reject/${prescriptionId}`, { reason });
}

export async function getStock() {
  return api.get('/pharmacy/stock');
}

export async function reorderStock(itemId, quantity = 100) {
  return api.post(`/pharmacy/reorder/${itemId}`, { quantity });
}

export async function checkInteractions(drugs) {
  return api.post('/pharmacy/check-interactions', { drugs });
}