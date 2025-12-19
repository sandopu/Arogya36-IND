
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
  STORE = 'STORE',
  HOSPITAL_ADMIN = 'HOSPITAL_ADMIN'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatarUrl?: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  specializations: string[];
  rating: number;
  tokensAvailable: number;
  waitTimes: string;
  imageUrl: string;
}

export interface MedicalStore {
  id: string;
  name: string;
  address: string;
  contact: string;
  rating: number;
  isOpen: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  hospitalId: string;
  specialization: string;
  experience: number;
  availability: string;
  imageUrl: string;
}

export interface Appointment {
  id: string;
  tokenNumber: number;
  patientName: string;
  doctorName: string;
  hospitalName: string;
  time: string;
  status: 'Pending' | 'Active' | 'Completed' | 'Cancelled';
  symptoms?: string;
  diagnosis?: string;
  prescriptionId?: string;
  date: string;
}

export interface MedicineOrder {
  id: string;
  patientName: string;
  appointmentId: string;
  items: string[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Packed' | 'Out for Delivery' | 'Delivered';
  date: string;
  address: string;
}

export interface ChartData {
  name: string;
  value: number;
}
