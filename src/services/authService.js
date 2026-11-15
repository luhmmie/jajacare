// src/services/authService.js
import { seedUsers } from '../data/users';

const USERS_KEY = 'jajacare_users';
const USERS_VERSION_KEY = 'jajacare_users_version';
const USERS_VERSION = '2'; // 👈 bump this whenever you change seedUsers
const TOKEN_KEY = 'jajacare_token';
const USER_KEY = 'jajacare_user';

function getUsers() {
  const storedVersion = localStorage.getItem(USERS_VERSION_KEY);
  if (storedVersion !== USERS_VERSION) {
    localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
    localStorage.setItem(USERS_VERSION_KEY, USERS_VERSION);
    return seedUsers;
  }
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : seedUsers;
}

function makeToken(user) {
  const payload = { sub: user.id, role: user.role, name: user.name };
  return `mock.${btoa(JSON.stringify(payload))}.sig`;
}

const ROLE_MAP = {
  doctor: 'doctor',
  nurse: 'nurse',
  receptionist: 'receptionist',
  pharmacist: 'pharmacist',
  admin: 'admin',
};

const ROLE_LABELS = {
  doctor: 'Doctor / MO',
  nurse: 'Nursing & Triage',
  receptionist: 'Records Desk',
  pharmacist: 'Pharmacy & Lab',
  admin: 'Admin Console',
};

export async function login(staffId, password, selectedRole) {
  await new Promise((r) => setTimeout(r, 400));

  const user = getUsers().find(
    (u) =>
      (u.staffId === staffId || u.email === staffId) &&
      u.password === password &&
      u.isActive
  );

  if (!user) {
    throw new Error('Incorrect ID or password');
  }

  if (selectedRole) {
    const expectedRole = ROLE_MAP[selectedRole];
    if (expectedRole !== user.role) {
      const actualLabel = ROLE_LABELS[user.role] || user.role;
      throw new Error(
        `Your credentials are not authorized for the "${ROLE_LABELS[selectedRole]}" workstation. Please select the "${actualLabel}" tab and try again.`
      );
    }
  }

  const token = makeToken(user);
  const { password: _p, ...safe } = user;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(safe));

  return { token, user: safe };
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}