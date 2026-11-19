import { api } from '../lib/apiClient';

export async function listUsers({ role, search, isActive } = {}) {
  const qs = new URLSearchParams();
  if (role) qs.append('role', role);
  if (search) qs.append('search', search);
  if (isActive !== undefined) qs.append('isActive', isActive);
  const q = qs.toString();
  return api.get(`/users${q ? '?' + q : ''}`);
}

export async function listDoctors() {
  return api.get('/users/doctors');
}

export async function createUser(input) {
  return api.post('/users', input);
}

export async function updateUser(id, input) {
  return api.patch(`/users/${id}`, input);
}

export async function deactivateUser(id) {
  return api.delete(`/users/${id}`);
}

export async function updateMyProfile(input) {
  return api.patch('/users/me/profile', input);
}

export async function updateMyPassword(currentPassword, newPassword) {
  return api.patch('/users/me/password', { currentPassword, newPassword });
}

export async function revokeUser(id, reason) {
  return api.post(`/users/${id}/revoke`, { reason });
}