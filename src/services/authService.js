import { api, saveTokens, clearTokens, saveUser, readUser, getToken } from '../lib/apiClient';

export async function login(staffId, password) {
  const data = await api.post('/auth/login', { staffId, password });
  saveTokens(data.token, data.refreshToken);
  saveUser(data.user);
  return { user: data.user, token: data.token };
}

export async function logout() {
  try {
    await api.post('/auth/logout');
  } catch {
    // ignore
  }
  clearTokens();
  localStorage.removeItem('jajacare_user');
}

export function getCurrentUser() {
  return readUser();
}

export { getToken };

export function isAuthenticated() {
  return !!getToken();
}