import { api } from '../lib/apiClient';

export async function getClinicSettings() {
  return api.get('/settings/clinic');
}

export async function updateClinicSettings(input) {
  return api.patch('/settings/clinic', input);
}