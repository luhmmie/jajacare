
export const ROLES = {
  ADMIN: 'admin',
  RECEPTIONIST: 'receptionist',
  NURSE: 'nurse',
  DOCTOR: 'doctor',
  PHARMACIST: 'pharmacist', 
};

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Administrator',
  [ROLES.RECEPTIONIST]: 'Receptionist',
  [ROLES.NURSE]: 'Nurse',
  [ROLES.DOCTOR]: 'Doctor',
  [ROLES.PHARMACIST]: 'Pharmacist', 
};

export const PERMISSIONS = {
  registerPatient: [ROLES.ADMIN, ROLES.RECEPTIONIST],
  editPatient: [ROLES.ADMIN, ROLES.RECEPTIONIST],
  deletePatient: [ROLES.ADMIN],
  bookAppointment: [ROLES.ADMIN, ROLES.RECEPTIONIST],
  checkInPatient: [ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.NURSE],
  startConsultation: [ROLES.DOCTOR],
  manageUsers: [ROLES.ADMIN],
  clinicSettings: [ROLES.ADMIN],
  dispenseMedication: [ROLES.PHARMACIST], 
};