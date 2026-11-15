// src/utils/validators.js
export const isValidPhone = (phone) => {
  // Nigerian format: 080..., 070..., 081..., 090..., +234...
  return /^(\+?234|0)[789][01]\d{8}$/.test(phone.replace(/\s/g, ''));
};

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isRequired = (value) => {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== null && value !== undefined;
};

export const isValidMatric = (matric) => {
  // UI matric format e.g. 218372 or similar digits, or staff format
  return matric && matric.trim().length >= 5;
};

export const validatePatientForm = (form) => {
  const errors = {};

  if (!isRequired(form.firstName)) errors.firstName = 'First name is required';
  if (!isRequired(form.lastName)) errors.lastName = 'Last name is required';
  if (!isRequired(form.gender)) errors.gender = 'Gender is required';
  if (!isRequired(form.dateOfBirth)) errors.dateOfBirth = 'Date of birth is required';
  if (!isRequired(form.phone)) errors.phone = 'Phone number is required';
  else if (!isValidPhone(form.phone)) errors.phone = 'Invalid phone number';

  if (!isRequired(form.matricNumber)) errors.matricNumber = 'Matric/staff number is required';
  if (!isRequired(form.faculty)) errors.faculty = 'Faculty is required';
  if (!isRequired(form.department)) errors.department = 'Department is required';

  if (!isRequired(form.emergencyContact?.name)) errors.emergencyName = 'Emergency contact name is required';
  if (!isRequired(form.emergencyContact?.phone)) errors.emergencyPhone = 'Emergency contact phone is required';
  else if (!isValidPhone(form.emergencyContact.phone)) errors.emergencyPhone = 'Invalid phone number';

  return errors;
};
