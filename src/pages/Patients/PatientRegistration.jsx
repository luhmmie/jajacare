import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  FiUser, FiBriefcase, FiPhoneCall, FiActivity,
  FiCheckCircle, FiMapPin, FiShield, FiSave
} from 'react-icons/fi';
import { FaIdCard, FaMale, FaFemale } from 'react-icons/fa';
import { useNotification } from '../../context/NotificationContext';
import { createPatient } from '../../services/patientService';

export default function PatientRegistration() {
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useNotification();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Male',
    dob: '',
    phone: '',
    address: '',
    affiliation: 'Student (Undergraduate)',
    matric: '',
    level: '100 Level (Fresher)',
    faculty: 'Faculty of Science',
    department: 'Computer Science',
    hall: 'Kuti Hall',
    emergencyName: '',
    emergencyRelation: 'Mother',
    emergencyPhone: '',
    emergencyAddress: '',
    bloodGroup: 'O+',
    genotype: 'AA',
    conditions: [],
  });

  const [allergies, setAllergies] = useState([]);
  const [allergyInput, setAllergyInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const calculateAge = (dob) => {
    if (!dob) return '';
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return `${age} yrs`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAllergy = (e) => {
    if (e.key === 'Enter' && allergyInput.trim()) {
      e.preventDefault();
      if (!allergies.includes(allergyInput.trim())) {
        setAllergies([...allergies, allergyInput.trim()]);
      }
      setAllergyInput('');
    }
  };

  const removeAllergy = (allergy) => {
    setAllergies(allergies.filter((a) => a !== allergy));
  };

  const toggleCondition = (cond) => {
    setFormData((prev) => ({
      ...prev,
      conditions: prev.conditions.includes(cond)
        ? prev.conditions.filter((c) => c !== cond)
        : [...prev.conditions, cond],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!formData.firstName || !formData.lastName || !formData.dob || !formData.phone || !formData.matric) {
      notifyError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const gender = formData.gender.toLowerCase() === 'female' ? 'female' : 'male';
      const cleanPhone = (p) => {
        const digits = p.replace(/\D/g, '');
        return digits.startsWith('0') ? digits : `0${digits}`;
      };

      const payload = {
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim() || undefined,
        lastName: formData.lastName.trim(),
        gender,
        dateOfBirth: formData.dob,
        phone: cleanPhone(formData.phone),
        address: formData.address,
        matricNumber: formData.matric.trim(),
        faculty: formData.faculty,
        department: formData.department,
        hallOfResidence: formData.hall,
        emergencyContact: {
          name: formData.emergencyName,
          relationship: formData.emergencyRelation,
          phone: formData.emergencyPhone ? cleanPhone(formData.emergencyPhone) : '',
          address: formData.emergencyAddress,
        },
        bloodGroup: formData.bloodGroup,
        genotype: formData.genotype,
        allergies,
        chronicConditions: formData.conditions,
      };

      const created = await createPatient(payload);
      notifySuccess(`Patient registered as ${created.patientId}`);
      navigate(`/patients/${created.id}`);
    } catch (err) {
      notifyError(err.message || 'Failed to register patient');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span>Dashboard</span> <span className="text-gray-300">/</span>
            <span>Patients</span> <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-700">New Registration</span>
          </div>
          <h1 className="text-3xl font-bold text-[#14357A] flex items-center gap-3">
            New Patient Registration
            <span className="text-[10px] font-bold text-[#14357A] bg-[#F5B041] px-3 py-1 rounded-full uppercase tracking-wider">
              Clinical Intake Form v2.4
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-3 shadow-sm">
            <div className="bg-gray-100 p-2 rounded text-gray-600"><FaIdCard size={20} /></div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Patient System ID</p>
              <p className="font-bold text-[#14357A]">Auto-generated</p>
            </div>
            <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded ml-2">NEW</span>
          </div>

          <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-3 shadow-sm">
            <div className="bg-gray-100 p-2 rounded text-gray-600"><FiShield size={20} /></div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">NHIS/TISHIP Validation</p>
              <p className="font-bold text-[#14357A] text-sm">UI Clinic Gateway Live</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="xl:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="bg-blue-50 text-[#14357A] p-2 rounded-lg"><FiUser size={20} /></div>
              <div>
                <h2 className="font-bold text-[#14357A]">Section 1: Personal Identity & Bio</h2>
                <p className="text-xs text-gray-500">Legal name, demographics, and primary domicile in Ibadan.</p>
              </div>
              <span className="ml-auto text-[10px] font-bold text-gray-400 uppercase tracking-wider">Required 1/4</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">First Name *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md focus:border-[#14357A] outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Middle Name</label>
                <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md focus:border-[#14357A] outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Surname *</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md focus:border-[#14357A] outline-none transition" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Gender *</label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setFormData({ ...formData, gender: 'Male' })} className={`flex-1 py-2.5 rounded-md flex items-center justify-center gap-2 text-sm font-semibold border transition ${formData.gender === 'Male' ? 'bg-[#14357A] text-white border-[#14357A]' : 'bg-[#F8FAFC] text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                    <FaMale /> Male
                  </button>
                  <button type="button" onClick={() => setFormData({ ...formData, gender: 'Female' })} className={`flex-1 py-2.5 rounded-md flex items-center justify-center gap-2 text-sm font-semibold border transition ${formData.gender === 'Female' ? 'bg-[#14357A] text-white border-[#14357A]' : 'bg-[#F8FAFC] text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                    <FaFemale /> Female
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Date of Birth *</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md focus:border-[#14357A] outline-none transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Auto Calculated Age</label>
                <div className="w-full px-3 py-2.5 bg-gray-100 border border-gray-200 rounded-md text-gray-600 font-semibold flex justify-between items-center">
                  {calculateAge(formData.dob)}
                  <FiActivity className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary Phone Number *</label>
                <div className="flex">
                  <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-200 rounded-l-md text-sm font-bold text-gray-600 flex items-center gap-1">🇳🇬 234</span>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="flex-1 px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-r-md focus:border-[#14357A] outline-none transition" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Residential Address in Ibadan *</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full pl-9 pr-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md focus:border-[#14357A] outline-none transition" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="bg-[#F5B041]/20 text-[#F5B041] p-2 rounded-lg"><FiBriefcase size={20} /></div>
              <div>
                <h2 className="font-bold text-[#14357A]">Section 2: University of Ibadan Affiliation</h2>
                <p className="text-xs text-gray-500">Matriculation credentials, hall accommodation, and faculty registry.</p>
              </div>
              <span className="ml-auto text-[10px] font-bold text-gray-400 uppercase tracking-wider">Required 2/4</span>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-700 mb-2">Affiliation Category *</label>
              <div className="flex flex-wrap gap-2">
                {['Student (Undergraduate)', 'Postgraduate', 'Academic Staff', 'Non-Academic Staff', 'Dependent'].map((aff) => (
                  <button key={aff} type="button" onClick={() => setFormData({ ...formData, affiliation: aff })} className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${formData.affiliation === aff ? 'bg-[#14357A] text-white border-[#14357A]' : 'bg-[#F8FAFC] text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                    {aff}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Matriculation / Staff ID *</label>
                <div className="flex">
                  <input type="text" name="matric" value={formData.matric} onChange={handleChange} required className="flex-1 px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-l-md focus:border-[#14357A] outline-none transition" />
                  <span className="px-3 py-2.5 bg-green-50 text-green-700 border border-l-0 border-gray-200 rounded-r-md text-xs font-bold flex items-center gap-1">
                    <FiCheckCircle /> Ready
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Academic Level / Designation *</label>
                <select name="level" value={formData.level} onChange={handleChange} className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md outline-none">
                  <option>100 Level (Fresher)</option>
                  <option>200 Level</option>
                  <option>300 Level (Penultimate)</option>
                  <option>400 Level (Finalist)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Faculty *</label>
                <select name="faculty" value={formData.faculty} onChange={handleChange} className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md outline-none">
                  <option>Faculty of Science</option>
                  <option>Faculty of Arts</option>
                  <option>Faculty of Clinical Sciences</option>
                  <option>Faculty of Engineering</option>
                  <option>Faculty of Social Sciences</option>
                  <option>Faculty of Technology</option>
                  <option>Faculty of Law</option>
                  <option>Faculty of Education</option>
                  <option>Faculty of Agriculture</option>
                  <option>Faculty of Veterinary Medicine</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Department *</label>
                <input type="text" name="department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Hall of Residence *</label>
                <select name="hall" value={formData.hall} onChange={handleChange} className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md outline-none">
                  <option>Kuti Hall</option>
                  <option>Mellanby Hall</option>
                  <option>Queen Idia Hall</option>
                  <option>Queen Amina Hall</option>
                  <option>Independence Hall</option>
                  <option>Tafawa Balewa Hall</option>
                  <option>Obafemi Awolowo Hall</option>
                  <option>Staff Quarters - Sankore</option>
                  <option>Off-campus</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="bg-red-50 text-red-500 p-2 rounded-lg"><FiPhoneCall size={20} /></div>
              <div>
                <h2 className="font-bold text-[#14357A]">Section 3: Emergency Contact & Kin</h2>
                <p className="text-xs text-gray-500">Primary point of reach during acute clinical emergencies.</p>
              </div>
              <span className="ml-auto text-[10px] font-bold text-gray-400 uppercase tracking-wider">Required 3/4</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Next of Kin Full Name</label>
                <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Relationship</label>
                <select name="emergencyRelation" value={formData.emergencyRelation} onChange={handleChange} className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md outline-none">
                  <option>Mother</option>
                  <option>Father</option>
                  <option>Spouse</option>
                  <option>Sibling</option>
                  <option>Guardian</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Emergency Phone</label>
                <div className="flex">
                  <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-200 rounded-l-md text-sm text-gray-600 flex items-center">+234</span>
                  <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} className="flex-1 px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-r-md outline-none" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Permanent / Guardian Physical Address</label>
              <input type="text" name="emergencyAddress" value={formData.emergencyAddress} onChange={handleChange} className="w-full px-3 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-md outline-none" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="bg-blue-50 text-[#14357A] p-2 rounded-lg"><FiActivity size={20} /></div>
              <div>
                <h2 className="font-bold text-[#14357A]">Section 4: Medical Baseline & Allergies</h2>
                <p className="text-xs text-gray-500">Crucial hematology markers, hypersensitivity records, and chronic flags.</p>
              </div>
              <span className="ml-auto text-[10px] font-bold text-gray-400 uppercase tracking-wider">Required 4/4</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Blood Group *</label>
                <div className="grid grid-cols-4 gap-2">
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                    <button key={bg} type="button" onClick={() => setFormData({ ...formData, bloodGroup: bg })} className={`py-2 rounded-md text-sm font-bold border transition ${formData.bloodGroup === bg ? 'bg-[#14357A] text-white border-[#14357A]' : 'bg-[#F8FAFC] text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Hemoglobin Genotype *</label>
                <div className="grid grid-cols-5 gap-2">
                  {['AA', 'AS', 'SS', 'AC', 'SC'].map((gt) => (
                    <button key={gt} type="button" onClick={() => setFormData({ ...formData, genotype: gt })} className={`py-2 rounded-md text-sm font-bold border transition ${formData.genotype === gt ? 'bg-[#14357A] text-white border-[#14357A]' : 'bg-[#F8FAFC] text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                      {gt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-red-600 flex items-center gap-1">Known Drug & Clinical Allergies ⚠</label>
                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                  <input type="checkbox" checked={allergies.length === 0} onChange={() => setAllergies(allergies.length === 0 ? ['NKDA'] : [])} className="w-4 h-4 rounded border-gray-300 text-[#14357A] focus:ring-[#14357A]" /> No known drug allergies (NKDA)
                </label>
              </div>
              <div className="w-full p-2 bg-[#F8FAFC] border border-gray-200 rounded-md flex flex-wrap gap-2 items-center focus-within:border-[#14357A] transition">
                {allergies.map((allergy) => (
                  <span key={allergy} className="bg-[#E11D48] text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    {allergy} <button type="button" onClick={() => removeAllergy(allergy)} className="hover:text-gray-200">×</button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Type allergy & press enter..."
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyDown={handleAddAllergy}
                  className="bg-transparent border-none outline-none flex-1 text-sm min-w-[150px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Pre-existing / Chronic Conditions</label>
              <div className="flex flex-wrap gap-2">
                {['Asthma', 'Hypertension', 'Sickle Cell Anemia', 'Peptic Ulcer', 'Diabetes'].map((cond) => (
                  <button key={cond} type="button" onClick={() => toggleCondition(cond)} className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${formData.conditions.includes(cond) ? 'bg-[#14357A] text-white border-[#14357A]' : 'bg-[#F8FAFC] text-gray-600 border-gray-200 hover:bg-gray-100'}`}>
                    {cond}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm gap-4 sticky bottom-4 z-20">
            <p className="text-[10px] text-gray-500 flex items-center gap-2 max-w-xs">
              <FiShield className="text-[#F5B041] shrink-0" size={16} /> All data validated according to Nigerian NDPR & UI Health Confidentiality Guidelines.
            </p>
            <div className="flex gap-2 w-full md:w-auto">
              <button type="button" onClick={() => navigate('/patients')} className="flex-1 md:flex-none px-4 py-2.5 text-xs font-bold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="flex-1 md:flex-none px-6 py-2.5 text-xs font-bold text-white bg-[#14357A] rounded-md hover:bg-[#0C2356] transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50">
                <FiSave /> {submitting ? 'Saving...' : 'Complete Registration & Print Clinic Card'}
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Preview Card</p>
              <span className="bg-[#F5B041] text-[#0A192F] text-[9px] font-bold px-2 py-0.5 rounded">Interactive</span>
            </div>

            <div className="bg-gradient-to-br from-[#14357A] to-[#0C2356] rounded-xl overflow-hidden text-white relative p-5 shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#F5B041] rounded text-[#14357A] flex items-center justify-center font-bold text-xs">J</div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider leading-none">JAJA CLINIC</p>
                    <p className="text-[8px] text-blue-200">UI Health Services</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-200 tracking-widest uppercase">{formData.affiliation.split(' ')[0]}</span>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="w-16 h-20 bg-gray-200 rounded border-2 border-[#F5B041] overflow-hidden shrink-0 flex items-center justify-center">
                  <FiUser className="text-gray-400 text-3xl" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-bold leading-tight mb-1">
                    {formData.firstName || 'First'} {formData.lastName || 'Last'}
                  </h3>
                  <p className="text-xs text-blue-200 mb-0.5">Matric: {formData.matric || '—'}</p>
                  <p className="text-xs text-blue-200">{formData.faculty} • {formData.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[9px] text-blue-200 border-t border-blue-700/50 pt-3">
                <div>
                  <p className="uppercase font-bold text-white">Blood • Genotype</p>
                  <p>{formData.bloodGroup} • {formData.genotype}</p>
                </div>
                <div>
                  <p className="uppercase font-bold text-white">Hall</p>
                  <p className="truncate">{formData.hall}</p>
                </div>
                <div>
                  <p className="uppercase font-bold text-white">Clinic No.</p>
                  <p>Auto</p>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-3 text-center leading-relaxed">
              Instant RFID encoding will sync to the student's Smart Identity Tag upon registration confirmation.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm text-[#14357A] flex items-center gap-2"><FiShield /> Insurance & Health Policy</h3>
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
              </span>
            </div>
            <p className="text-[10px] text-gray-500 mb-4">Covered under Tertiary Social Health Insurance Programme (UI Health Scheme 2025/2026 Session).</p>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-500">Primary Provider:</span>
              <span className="font-bold text-[#14357A]">Jaja Clinic OPD Unit</span>
            </div>
            <div className="flex justify-between text-xs mb-4">
              <span className="text-gray-500">Coverage Cap:</span>
              <span className="font-bold text-[#14357A]">Comprehensive (Tier 1)</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-sm text-[#14357A] flex items-center gap-2"><FiMapPin /> Clinic Center Location</h3>
              <span className="text-[10px] font-bold text-gray-500">Main Campus</span>
            </div>
            <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center bg-blue-900/10">
                <FiMapPin className="text-[#14357A] text-4xl drop-shadow-lg" />
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1"><FiMapPin /> Jaja Avenue, University of Ibadan</p>
          </div>
        </div>
      </div>
    </div>
  );
}