// src/utils/calculateBMI.js
export function calculateBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return null;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return Number(bmi.toFixed(1));
}

export function getBMICategory(bmi) {
  if (bmi === null) return { label: '—', color: 'gray' };
  if (bmi < 18.5) return { label: 'Underweight', color: 'blue' };
  if (bmi < 25) return { label: 'Normal', color: 'green' };
  if (bmi < 30) return { label: 'Overweight', color: 'amber' };
  return { label: 'Obese', color: 'red' };
}
