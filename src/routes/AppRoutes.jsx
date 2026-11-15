
import { Routes, Route } from 'react-router';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../constants/roles';


import AuthLayout from '../components/layout/AuthLayout';
import AppLayout from '../components/layout/AppLayout';


import Landing from '../pages/Landing/Landing';
import Login from '../pages/Auth/Login';
import NotFound from '../pages/NotFound';


import Dashboard from '../pages/Dashboard/Dashboard';
import PatientsList from '../pages/Patients/PatientsList';
import PatientRegistration from '../pages/Patients/PatientRegistration';
import PatientProfile from '../pages/Patients/PatientProfile';
import Appointments from '../pages/Appointments/Appointments';
import Consultation from '../pages/Consultation/Consultation';
import Pharmacy from '../pages/Pharmacy/Pharmacy';
import Profile from '../pages/Profile/Profile';      // 👈 NEW
import Settings from '../pages/Settings/Settings';

export default function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/" element={<Landing />} />

  
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

  
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/patients/:id" element={<PatientProfile />} />
          <Route path="/appointments" element={<Appointments />} />
          
          
          <Route path="/profile" element={<Profile />} />

          
          <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.RECEPTIONIST]} />}>
            <Route path="/patients/register" element={<PatientRegistration />} />
          </Route>

    
          <Route element={<ProtectedRoute allowedRoles={[ROLES.DOCTOR]} />}>
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/consultation/:appointmentId" element={<Consultation />} />
          </Route>

          
          <Route element={<ProtectedRoute allowedRoles={[ROLES.PHARMACIST, ROLES.ADMIN]} />}>
            <Route path="/pharmacy" element={<Pharmacy />} />
          </Route>

          
          <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/settings" element={<Settings />} />
          </Route>

        </Route>
      </Route>

      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}