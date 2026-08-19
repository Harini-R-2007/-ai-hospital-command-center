import { Department, InventoryItem, NearbyHospital, PredictionFactor, Recommendation, PatientRecord } from '../types';

export const mockDepartments: Department[] = [
  {
    id: 'dept-er',
    name: 'Emergency & Trauma',
    code: 'ER-01',
    floor: 'Ground Floor - Block A',
    totalBeds: 40,
    occupiedBeds: 36,
    icuTotal: 10,
    icuOccupied: 9,
    doctorsCount: 12,
    nursesCount: 28,
    status: 'red',
    temperature: 21.0,
    oxygenLevel: 99.2,
    headDoctor: 'Dr. Vikram Malhotra, MD (Emergency)',
    activePatients: 42,
    waitingQueue: 8
  },
  {
    id: 'dept-icu',
    name: 'Intensive Care Unit (ICU)',
    code: 'ICU-02',
    floor: '1st Floor - Block B',
    totalBeds: 30,
    occupiedBeds: 27,
    icuTotal: 30,
    icuOccupied: 27,
    doctorsCount: 8,
    nursesCount: 24,
    status: 'red',
    temperature: 20.5,
    oxygenLevel: 99.8,
    headDoctor: 'Dr. Ananya Sharma, DM (Critical Care)',
    activePatients: 27,
    waitingQueue: 3
  },
  {
    id: 'dept-ot',
    name: 'Operation Theatre Complex',
    code: 'OT-03',
    floor: '2nd Floor - Block B',
    totalBeds: 12,
    occupiedBeds: 8,
    icuTotal: 4,
    icuOccupied: 2,
    doctorsCount: 15,
    nursesCount: 20,
    status: 'yellow',
    temperature: 18.5,
    oxygenLevel: 99.5,
    headDoctor: 'Dr. Rajesh Nair, MCh (Surgical)',
    activePatients: 8,
    waitingQueue: 2
  },
  {
    id: 'dept-peds',
    name: 'Pediatrics & Neonatal Care',
    code: 'PED-04',
    floor: '3rd Floor - Block C',
    totalBeds: 35,
    occupiedBeds: 32,
    icuTotal: 8,
    icuOccupied: 7,
    doctorsCount: 7,
    nursesCount: 18,
    status: 'red',
    temperature: 22.5,
    oxygenLevel: 98.9,
    headDoctor: 'Dr. Meera Patel, MD (Pediatrics)',
    activePatients: 32,
    waitingQueue: 5
  },
  {
    id: 'dept-cardio',
    name: 'Cardiology & Cath Lab',
    code: 'CARD-05',
    floor: '2nd Floor - Block A',
    totalBeds: 45,
    occupiedBeds: 34,
    icuTotal: 12,
    icuOccupied: 9,
    doctorsCount: 9,
    nursesCount: 22,
    status: 'yellow',
    temperature: 21.2,
    oxygenLevel: 99.1,
    headDoctor: 'Dr. Sanjay Gupta, DM (Cardiology)',
    activePatients: 34,
    waitingQueue: 1
  },
  {
    id: 'dept-ortho',
    name: 'Orthopedics & Traumatology',
    code: 'ORTH-06',
    floor: '4th Floor - Block A',
    totalBeds: 50,
    occupiedBeds: 32,
    icuTotal: 4,
    icuOccupied: 2,
    doctorsCount: 6,
    nursesCount: 16,
    status: 'green',
    temperature: 22.0,
    oxygenLevel: 98.2,
    headDoctor: 'Dr. Kabir Roy, MS (Orthopedics)',
    activePatients: 32,
    waitingQueue: 0
  },
  {
    id: 'dept-ward-a',
    name: 'General Medical Ward A',
    code: 'GWA-07',
    floor: '3rd Floor - Block A',
    totalBeds: 60,
    occupiedBeds: 45,
    icuTotal: 0,
    icuOccupied: 0,
    doctorsCount: 5,
    nursesCount: 15,
    status: 'yellow',
    temperature: 23.0,
    oxygenLevel: 98.0,
    headDoctor: 'Dr. Sunita Verma, MD (General Medicine)',
    activePatients: 45,
    waitingQueue: 2
  },
  {
    id: 'dept-ward-b',
    name: 'General Surgical Ward B',
    code: 'GWB-08',
    floor: '4th Floor - Block B',
    totalBeds: 50,
    occupiedBeds: 30,
    icuTotal: 0,
    icuOccupied: 0,
    doctorsCount: 4,
    nursesCount: 12,
    status: 'green',
    temperature: 22.8,
    oxygenLevel: 98.1,
    headDoctor: 'Dr. Alok Joshi, MS (General Surgery)',
    activePatients: 30,
    waitingQueue: 0
  }
];

export const mockPredictionFactors: PredictionFactor[] = [
  {
    id: 'f-1',
    factor: 'Viral Fever & Respiratory Outbreak Index',
    impactValue: 22,
    direction: 'increase',
    category: 'Epidemiology',
    description: 'City health surveillance indicates a 34% spike in influenza/viral cases over past 48 hours.',
    confidence: 96
  },
  {
    id: 'f-2',
    factor: 'Weekend Emergency Admission Pattern',
    impactValue: 18,
    direction: 'increase',
    category: 'Seasonality',
    description: 'Historical Saturday/Sunday trend shows consistent 15-20% surge in road trauma & emergency triage.',
    confidence: 94
  },
  {
    id: 'f-3',
    factor: 'Monsoon Rain & Humidity Forecast',
    impactValue: 15,
    direction: 'increase',
    category: 'Weather',
    description: 'Heavy precipitation forecast (78mm) correlates with increased accidents and waterborne illness admissions.',
    confidence: 89
  },
  {
    id: 'f-4',
    factor: 'Local Festival / Stadium Crowd Gathering',
    impactValue: 12,
    direction: 'increase',
    category: 'Events',
    description: 'Major sports event nearby increases casualty buffer load for nearby emergency centers.',
    confidence: 91
  },
  {
    id: 'f-5',
    factor: 'Historical 5-Year Admission Growth',
    impactValue: 8,
    direction: 'increase',
    category: 'Historical',
    description: 'Baseline annual patient inflow growth trend calculated from 5,000+ past patient records.',
    confidence: 98
  },
  {
    id: 'f-6',
    factor: 'Elective Outpatient Rescheduling',
    impactValue: -11,
    direction: 'decrease',
    category: 'Historical',
    description: 'Pre-scheduled discharge pipeline and delayed elective orthopedics consultations.',
    confidence: 87
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    title: 'Prepare 25 Extra Surge Beds in Block C',
    actionType: 'bed',
    priority: 'CRITICAL',
    expectedImpact: 'Prevents ER overcrowding & reduces wait time by 42%',
    reason: 'Predicted tomorrow patient count is 218 vs 184 today; ER and Pediatrics are at 90%+ capacity.',
    departmentId: 'dept-er',
    status: 'pending',
    suggestedQuantity: 25
  },
  {
    id: 'rec-2',
    title: 'Call 4 Additional On-Call ICU Nurses',
    actionType: 'staff',
    priority: 'CRITICAL',
    expectedImpact: 'Maintains required 1:1 nurse-to-patient ratio for critical ventilators',
    reason: 'ICU occupancy projected at 93% with 4 incoming severe respiratory transfer cases.',
    departmentId: 'dept-icu',
    status: 'pending',
    suggestedQuantity: 4
  },
  {
    id: 'rec-3',
    title: 'Reserve 6 Emergency ICU Beds for High Risk',
    actionType: 'bed',
    priority: 'HIGH',
    expectedImpact: 'Saves critical minutes for cardiac & trauma emergency arrivals',
    reason: 'CardiologyCath Lab cath queue showing 3 high-probability surgical conversions.',
    departmentId: 'dept-cardio',
    status: 'pending',
    suggestedQuantity: 6
  },
  {
    id: 'rec-4',
    title: 'Shift 3 General Ward Nurses to Pediatrics',
    actionType: 'staff',
    priority: 'HIGH',
    expectedImpact: 'Relieves pediatric ward triage bottleneck',
    reason: 'Pediatric admission surge driven by viral outbreak forecast (+22 cases).',
    departmentId: 'dept-peds',
    status: 'pending',
    suggestedQuantity: 3
  },
  {
    id: 'rec-5',
    title: 'Procure 50 Medical Oxygen Cylinders (B-Type)',
    actionType: 'inventory',
    priority: 'HIGH',
    expectedImpact: 'Extends continuous high-flow oxygen buffer from 1.8 to 4.5 days',
    reason: 'Current burn rate is 32 cylinders/day with high ventilator usage.',
    status: 'pending',
    suggestedQuantity: 50
  },
  {
    id: 'rec-6',
    title: 'Re-route Non-Critical Trauma to Apollo Hospital Partner',
    actionType: 'transfer',
    priority: 'MEDIUM',
    expectedImpact: 'Balances regional hospital load and avoids code-red lockdown',
    reason: 'Apollo Hospital has 48 available beds and 12 ICU slots within 5.8 km.',
    status: 'pending'
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Medical Oxygen Cylinders (47L)',
    category: 'Oxygen & Gas',
    currentStock: 180,
    minThreshold: 100,
    unit: 'Cylinders',
    burnRatePerDay: 35,
    predictedDaysLeft: 5.1,
    status: 'optimal',
    supplier: 'Linde Medical Gases',
    unitCost: 120
  },
  {
    id: 'inv-2',
    name: 'ICU Mechanical Ventilators',
    category: 'Equipment',
    currentStock: 25,
    minThreshold: 20,
    unit: 'Units',
    burnRatePerDay: 18, // 18 in use
    predictedDaysLeft: 1.4, // only 7 available
    status: 'low',
    supplier: 'Draeger Healthcare',
    unitCost: 18500
  },
  {
    id: 'inv-3',
    name: 'Paracetamol IV 1000mg Infusion',
    category: 'Medicines',
    currentStock: 420,
    minThreshold: 500,
    unit: 'Vials',
    burnRatePerDay: 110,
    predictedDaysLeft: 3.8,
    status: 'low',
    supplier: 'Cipla Pharmaceuticals',
    unitCost: 8.5
  },
  {
    id: 'inv-4',
    name: 'Broad-Spectrum Antibiotics (Meropenem 1g)',
    category: 'Medicines',
    currentStock: 180,
    minThreshold: 300,
    unit: 'Vials',
    burnRatePerDay: 65,
    predictedDaysLeft: 2.7,
    status: 'critical',
    supplier: 'Sun Pharma',
    unitCost: 24.0
  },
  {
    id: 'inv-5',
    name: 'Sterile PPE Suit Kits (Level 3)',
    category: 'PPE & Consumables',
    currentStock: 1250,
    minThreshold: 400,
    unit: 'Kits',
    burnRatePerDay: 140,
    predictedDaysLeft: 8.9,
    status: 'optimal',
    supplier: '3M Medical Division',
    unitCost: 12.0
  },
  {
    id: 'inv-6',
    name: 'N95 Surgical Respirator Masks',
    category: 'PPE & Consumables',
    currentStock: 4800,
    minThreshold: 1500,
    unit: 'Masks',
    burnRatePerDay: 320,
    predictedDaysLeft: 15.0,
    status: 'optimal',
    supplier: 'Honeywell Safety',
    unitCost: 1.2
  },
  {
    id: 'inv-7',
    name: 'Nitrile Surgical Gloves (Box of 100)',
    category: 'PPE & Consumables',
    currentStock: 320,
    minThreshold: 100,
    unit: 'Boxes',
    burnRatePerDay: 28,
    predictedDaysLeft: 11.4,
    status: 'optimal',
    supplier: 'Ansell Healthcare',
    unitCost: 14.5
  },
  {
    id: 'inv-8',
    name: 'Heavy-Duty Wheelchairs (Bariatric & Standard)',
    category: 'Mobility',
    currentStock: 60,
    minThreshold: 40,
    unit: 'Units',
    burnRatePerDay: 45, // occupied
    predictedDaysLeft: 2.0,
    status: 'low',
    supplier: 'Drive DeVilbiss',
    unitCost: 280
  },
  {
    id: 'inv-9',
    name: 'Emergency Hydraulic Stretchers',
    category: 'Mobility',
    currentStock: 35,
    minThreshold: 25,
    unit: 'Units',
    burnRatePerDay: 29,
    predictedDaysLeft: 1.8,
    status: 'critical',
    supplier: 'Stryker Medical',
    unitCost: 2400
  }
];

export const mockNearbyHospitals: NearbyHospital[] = [
  {
    id: 'hosp-1',
    name: 'Apollo Speciality Hospital',
    distanceKm: 3.2,
    availableBeds: 48,
    availableICU: 12,
    emergencyContact: '+91 11 2692 5858',
    address: 'Sarita Vihar, Mathura Road, New Delhi',
    traumaLevel: 'Level 1 Trauma Center',
    status: 'open'
  },
  {
    id: 'hosp-2',
    name: 'Fortis Escorts Heart Institute',
    distanceKm: 5.8,
    availableBeds: 32,
    availableICU: 8,
    emergencyContact: '+91 11 4713 5000',
    address: 'Okhla Road, New Delhi',
    traumaLevel: 'Cardiac Super Speciality',
    status: 'open'
  },
  {
    id: 'hosp-3',
    name: 'Max Super Speciality Hospital',
    distanceKm: 8.1,
    availableBeds: 19,
    availableICU: 3,
    emergencyContact: '+91 11 2651 5050',
    address: 'Saket, New Delhi',
    traumaLevel: 'Level 1 Trauma Center',
    status: 'limited'
  },
  {
    id: 'hosp-4',
    name: 'AIIMS Apex Trauma Center',
    distanceKm: 12.4,
    availableBeds: 6,
    availableICU: 1,
    emergencyContact: '+91 11 2658 8500',
    address: 'Ansari Nagar, New Delhi',
    traumaLevel: 'National Apex Referral',
    status: 'full'
  }
];

export const mockHistoricalTrends = [
  { date: 'Mon', actual: 168, predicted: 165, icu: 22, confidence: 95 },
  { date: 'Tue', actual: 172, predicted: 170, icu: 24, confidence: 96 },
  { date: 'Wed', actual: 179, predicted: 182, icu: 25, confidence: 94 },
  { date: 'Thu', actual: 181, predicted: 180, icu: 26, confidence: 97 },
  { date: 'Fri (Today)', actual: 184, predicted: 184, icu: 27, confidence: 95 },
  { date: 'Sat (Tomorrow)', actual: null, predicted: 218, icu: 33, confidence: 94.2 },
  { date: 'Sun', actual: null, predicted: 232, icu: 36, confidence: 92.8 },
  { date: 'Mon (+2d)', actual: null, predicted: 195, icu: 28, confidence: 91.5 }
];

export const mockHourlyFlow = [
  { time: '00:00', arrivals: 4, discharges: 1 },
  { time: '03:00', arrivals: 6, discharges: 0 },
  { time: '06:00', arrivals: 12, discharges: 3 },
  { time: '09:00', arrivals: 28, discharges: 14 },
  { time: '12:00', arrivals: 34, discharges: 22 },
  { time: '15:00', arrivals: 29, discharges: 18 },
  { time: '18:00', arrivals: 38, discharges: 12 },
  { time: '21:00', arrivals: 19, discharges: 6 }
];

export const mockPatients: PatientRecord[] = [
  { id: 'PAT-501', name: 'Rajesh Sharma', age: 58, gender: 'M', triage: 'RED', department: 'Emergency & Trauma', admissionDate: 'Today, 08:30 AM', status: 'In ER', doctorAssigned: 'Dr. Vikram Malhotra' },
  { id: 'PAT-502', name: 'Priya Sundaram', age: 34, gender: 'F', triage: 'RED', department: 'ICU', admissionDate: 'Today, 09:15 AM', status: 'Admitted', doctorAssigned: 'Dr. Ananya Sharma' },
  { id: 'PAT-503', name: 'Aarav Gupta', age: 8, gender: 'M', triage: 'YELLOW', department: 'Pediatrics', admissionDate: 'Today, 10:05 AM', status: 'Admitted', doctorAssigned: 'Dr. Meera Patel' },
  { id: 'PAT-504', name: 'Sunita Menon', age: 67, gender: 'F', triage: 'RED', department: 'Cardiology', admissionDate: 'Today, 10:45 AM', status: 'In Surgery', doctorAssigned: 'Dr. Sanjay Gupta' },
  { id: 'PAT-505', name: 'Rohan Mehta', age: 29, gender: 'M', triage: 'GREEN', department: 'Orthopedics', admissionDate: 'Today, 11:20 AM', status: 'Admitted', doctorAssigned: 'Dr. Kabir Roy' },
  { id: 'PAT-506', name: 'Kavita Das', age: 42, gender: 'F', triage: 'YELLOW', department: 'General Medical Ward A', admissionDate: 'Today, 12:00 PM', status: 'Admitted', doctorAssigned: 'Dr. Sunita Verma' },
  { id: 'PAT-507', name: 'Vikram Singh', age: 51, gender: 'M', triage: 'RED', department: 'ICU', admissionDate: 'Today, 01:10 PM', status: 'Admitted', doctorAssigned: 'Dr. Ananya Sharma' },
  { id: 'PAT-508', name: 'Diya Verma', age: 4, gender: 'F', triage: 'YELLOW', department: 'Pediatrics', admissionDate: 'Today, 01:45 PM', status: 'In ER', doctorAssigned: 'Dr. Meera Patel' }
];
