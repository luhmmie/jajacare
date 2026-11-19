const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function getToken() {
  return localStorage.getItem('jajacare_token');
}

export function getRefreshToken() {
  return localStorage.getItem('jajacare_refresh_token');
}

export function saveTokens(token, refreshToken) {
  if (token) localStorage.setItem('jajacare_token', token);
  if (refreshToken) localStorage.setItem('jajacare_refresh_token', refreshToken);
}

export function clearTokens() {
  localStorage.removeItem('jajacare_token');
  localStorage.removeItem('jajacare_refresh_token');
}

export function saveUser(user) {
  localStorage.setItem('jajacare_user', JSON.stringify(user));
}

export function readUser() {
  try {
    return JSON.parse(localStorage.getItem('jajacare_user'));
  } catch {
    return null;
  }
}

async function tryRefresh() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('jajacare_token', data.token);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && auth) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      headers.Authorization = `Bearer ${getToken()}`;
      res = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
    }
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data?.error?.message || 'Request failed');
    err.code = data?.error?.code;
    err.status = res.status;
    if (res.status === 401) {
      clearTokens();
      localStorage.removeItem('jajacare_user');
    }
    throw err;
  }

  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  delete: (path) => request(path, { method: 'DELETE' }),
};