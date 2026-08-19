export type UserRole = 'admin' | 'doctor';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
  department?: string;
  title: string;
}

export interface MetricCard {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  status?: 'normal' | 'warning' | 'critical';
  icon: string;
  subtext?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  floor: string;
  totalBeds: number;
  occupiedBeds: number;
  icuTotal: number;
  icuOccupied: number;
  doctorsCount: number;
  nursesCount: number;
  status: 'green' | 'yellow' | 'red'; // green: <75%, yellow: 75-90%, red: >90%
  temperature: number; // e.g. 21.5 C
  oxygenLevel: number; // e.g. 98.5%
  headDoctor: string;
  activePatients: number;
  waitingQueue: number;
}

export interface PredictionFactor {
  id: string;
  factor: string;
  impactValue: number; // e.g. +22 patients
  direction: 'increase' | 'decrease';
  category: 'Weather' | 'Seasonality' | 'Epidemiology' | 'Events' | 'Historical';
  description: string;
  confidence: number;
}

export interface Recommendation {
  id: string;
  title: string;
  actionType: 'staff' | 'bed' | 'inventory' | 'transfer' | 'equipment';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  expectedImpact: string;
  reason: string;
  departmentId?: string;
  status: 'pending' | 'applied' | 'dismissed';
  suggestedQuantity?: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Medicines' | 'Oxygen & Gas' | 'Equipment' | 'PPE & Consumables' | 'Mobility';
  currentStock: number;
  minThreshold: number;
  unit: string;
  burnRatePerDay: number;
  predictedDaysLeft: number;
  status: 'optimal' | 'low' | 'critical';
  supplier: string;
  unitCost: number;
}

export interface NearbyHospital {
  id: string;
  name: string;
  distanceKm: number;
  availableBeds: number;
  availableICU: number;
  emergencyContact: string;
  address: string;
  traumaLevel: string;
  status: 'open' | 'limited' | 'full';
}

export interface EmergencyChecklistItem {
  id: string;
  task: string;
  assignedTo: string;
  completed: boolean;
  priority: 'urgent' | 'standard';
}

export interface SimulationParams {
  patientSurge: number; // e.g. 300
  availableStaffPercent: number; // e.g. 80%
  icuCapacityReduction: number; // e.g. 0%
  oxygenSupplyDrop: number; // e.g. 20%
}

export interface SimulationResult {
  predictedTotalPatients: number;
  bedShortage: number;
  doctorShortage: number;
  nurseShortage: number;
  icuShortage: number;
  ventilatorShortage: number;
  oxygenShortageCylinders: number;
  emergencyLevel: 'STABLE' | 'ELEVATED' | 'CRITICAL' | 'CODE RED';
  recommendedActions: string[];
  estimatedWaitTimeMinutes: number;
}

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  triage: 'RED' | 'YELLOW' | 'GREEN';
  department: string;
  admissionDate: string;
  status: 'Admitted' | 'In ER' | 'In Surgery' | 'Discharged';
  doctorAssigned: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  suggestions?: string[];
  dataContext?: any;
}
