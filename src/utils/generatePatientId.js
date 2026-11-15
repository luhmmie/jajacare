// src/utils/generatePatientId.js
import { getPatients } from '../data/patients';

/**
 * Generates a patient ID in the format: JC-YYYY-0001
 * Reads the last patient's ID and increments it.
 */
export function generatePatientId() {
  const year = new Date().getFullYear();
  const patients = getPatients();
  
  const yearPatients = patients.filter((p) =>
    p.patientId.startsWith(`JC-${year}-`)
  );

  const nextNumber = yearPatients.length + 1;
  const padded = String(nextNumber).padStart(4, '0');

  return `JC-${year}-${padded}`;
}
