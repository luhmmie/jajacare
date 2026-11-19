import { api } from '../lib/apiClient';

export async function getStats() {
  return api.get('/dashboard/stats');
}

export async function getWeeklyVisits() {
  return api.get('/dashboard/weekly-visits');
}

export async function getActivity(limit = 10) {
  return api.get(`/dashboard/activity?limit=${limit}`);
}