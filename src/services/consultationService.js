import { api } from '../lib/apiClient';

export async function createConsultation(appointmentId) {
  return api.post('/consultations', { appointmentId });
}

export async function getConsultation(id) {
  return api.get(`/consultations/${id}`);
}

export async function updateConsultation(id, input) {
  return api.patch(`/consultations/${id}`, input);
}

export async function completeConsultation(id) {
  return api.post(`/consultations/${id}/complete`);
}

export async function getConsultationPrint(id) {
  return api.get(`/consultations/${id}/print`);
}

export async function addPrescription(consultationId, item) {
  return api.post(`/consultations/${consultationId}/prescription`, item);
}

export async function removePrescription(consultationId, itemId) {
  return api.delete(`/consultations/${consultationId}/prescription/${itemId}`);
}