import { api } from '../lib/apiClient';

export async function listAppointments({ date, doctorId, status, patientId } = {}) {
  const qs = new URLSearchParams();
  if (date) qs.append('date', date);
  if (doctorId) qs.append('doctorId', doctorId);
  if (status) qs.append('status', status);
  if (patientId) qs.append('patientId', patientId);
  const q = qs.toString();
  return api.get(`/appointments${q ? '?' + q : ''}`);
}

export async function createAppointment(input) {
  return api.post('/appointments', input);
}

export async function updateAppointment(id, input) {
  return api.patch(`/appointments/${id}`, input);
}

export async function getAvailableSlots(doctorId, date) {
  const qs = new URLSearchParams({ doctorId, date });
  return api.get(`/appointments/slots?${qs.toString()}`);
}

export async function getQueue(date) {
  const qs = date ? `?date=${date}` : '';
  return api.get(`/appointments/queue${qs}`);
}

export async function checkInAppointment(id) {
  return api.post(`/appointments/${id}/checkin`);
}