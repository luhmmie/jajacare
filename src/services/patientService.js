import { api } from '../lib/apiClient';

export async function listPatients({ search = '', faculty = '', status = '', page = 1, limit = 20 } = {}) {
  const qs = new URLSearchParams();
  if (search) qs.append('search', search);
  if (faculty) qs.append('faculty', faculty);
  if (status) qs.append('status', status);
  qs.append('page', page);
  qs.append('limit', limit);
  return api.get(`/patients?${qs.toString()}`);
}

export async function getPatient(id) {
  return api.get(`/patients/${id}`);
}

export async function createPatient(input) {
  return api.post('/patients', input);
}

export async function updatePatient(id, input) {
  return api.patch(`/patients/${id}`, input);
}

export async function deletePatient(id) {
  return api.delete(`/patients/${id}`);
}

export async function getPatientHistory(id) {
  return api.get(`/patients/${id}/history`);
}