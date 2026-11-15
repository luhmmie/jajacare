
import { createContext, useContext, useState, useEffect } from 'react';
import {
  login as loginService,
  logout as logoutService,
  getCurrentUser,
  getToken,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    const storedUser = getCurrentUser();
    if (token && storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (staffId, password, selectedRole) => {
    const { user } = await loginService(staffId, password, selectedRole);
    setUser(user);
    return user;
  };

  const logout = () => {
    logoutService();
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