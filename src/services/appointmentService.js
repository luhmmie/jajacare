// src/services/appointmentService.js
import { getAppointments, saveAppointments } from '../data/appointments';
import { APPOINTMENT_STATUSES } from '../constants/faculties';

export async function listAppointments({ date, doctorId, status } = {}) {
  await new Promise((r) => setTimeout(r, 200));
  let items = getAppointments();
  if (date) items = items.filter((a) => a.date === date);
  if (doctorId) items = items.filter((a) => a.doctorId === doctorId);
  if (status) items = items.filter((a) => a.status === status);
  return items;
}

export async function createAppointment(data) {
  await new Promise((r) => setTimeout(r, 400));
  const appointments = getAppointments();

  // Prevent double booking
  const clash = appointments.find(
    (a) =>
      a.doctorId === data.doctorId &&
      a.date === data.date &&
      a.timeSlot === data.timeSlot &&
      a.status !== APPOINTMENT_STATUSES.CANCELLED
  );
  if (clash) throw new Error('This time slot is already booked');

  const newAppointment = {
    ...data,
    id: `a${Date.now()}`,
    status: APPOINTMENT_STATUSES.SCHEDULED,
    createdAt: new Date().toISOString(),
  };
  saveAppointments([newAppointment, ...appointments]);
  return newAppointment;
}

export async function updateAppointment(id, updates) {
  await new Promise((r) => setTimeout(r, 300));
  const appointments = getAppointments();
  const idx = appointments.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error('Appointment not found');
  appointments[idx] = { ...appointments[idx], ...updates };
  saveAppointments(appointments);
  return appointments[idx];
}

export async function getQueue(date) {
  await new Promise((r) => setTimeout(r, 200));
  const appointments = getAppointments().filter(
    (a) => a.date === date && a.status === APPOINTMENT_STATUSES.CHECKED_IN
  );
  return appointments.map((a, idx) => ({ ...a, position: idx + 1 }));
}
