import { createContext, useContext, useState, useEffect } from 'react';
import {
  login as loginService,
  logout as logoutService,
  getCurrentUser,
  getToken,
} from '../services/authService';
import { api, saveUser, clearTokens } from '../lib/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const storedUser = getCurrentUser();
    if (token && storedUser) {
      setUser(storedUser);
      setLoading(false);
      api.get('/auth/me')
        .then((data) => {
          if (data?.user) {
            setUser(data.user);
            saveUser(data.user);
          }
        })
        .catch(() => {});
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (staffId, password, selectedRole) => {
    const { user: u } = await loginService(staffId, password);
    if (selectedRole && u.role !== selectedRole) {
      clearTokens();
      localStorage.removeItem('jajacare_user');
      throw new Error(
        `These credentials belong to a ${u.role}. Please select the ${u.role} tab to continue.`
      );
    }
    setUser(u);
    return u;
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
  return ctx;
}