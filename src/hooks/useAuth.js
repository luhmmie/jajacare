
import { useAuthContext } from '../context/AuthContext';
import { ROLES } from '../constants/roles';

export function useAuth() {
  const { user, loading, login, logout } = useAuthContext();
  return {
    user,
    loading,
    login,
    logout,
    role: user?.role,
    isAdmin: user?.role === ROLES.ADMIN,
    isReceptionist: user?.role === ROLES.RECEPTIONIST,
    isNurse: user?.role === ROLES.NURSE,
    isDoctor: user?.role === ROLES.DOCTOR,
    isPharmacist: user?.role === ROLES.PHARMACIST, // 👈 NEW
  };
}