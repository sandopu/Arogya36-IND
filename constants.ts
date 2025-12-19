
import { Hospital, Doctor, Appointment, MedicineOrder, MedicalStore } from './types';

export const APP_NAME = "Arogya360";

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'Royal City Hospital',
    address: '12 Palace Road, Central District',
    city: 'Mumbai',
    specializations: ['Cardiology', 'Neurology'],
    rating: 4.8,
    tokensAvailable: 12,
    waitTimes: '25 mins',
    imageUrl: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: 'h2',
    name: 'Green Valley Medical Center',
    address: '45 Hillside Ave, North Zone',
    city: 'Mumbai',
    specializations: ['Dermatology', 'Pediatrics', 'General'],
    rating: 4.5,
    tokensAvailable: 45,
    waitTimes: '10 mins',
    imageUrl: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: 'h3',
    name: 'Imperial Heart Institute',
    address: '88 Kingsway, South Zone',
    city: 'Delhi',
    specializations: ['Cardiology'],
    rating: 4.9,
    tokensAvailable: 5,
    waitTimes: '40 mins',
    imageUrl: 'https://picsum.photos/400/300?random=3'
  }
];

export const MOCK_STORES: MedicalStore[] = [
  {
    id: 's1',
    name: 'Apollo Pharmacy',
    address: 'Shop 4, Main Market, Bandra',
    contact: '9876543210',
    rating: 4.7,
    isOpen: true
  },
  {
    id: 's2',
    name: 'Wellness Forever',
    address: 'Opposite City Hospital, Andheri',
    contact: '9123456789',
    rating: 4.5,
    isOpen: true
  }
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Aryan Mehta',
    hospitalId: 'h1',
    specialization: 'Cardiology',
    experience: 15,
    availability: '10:00 AM - 4:00 PM',
    imageUrl: 'https://picsum.photos/100/100?random=10'
  },
  {
    id: 'd2',
    name: 'Dr. Sarah Khan',
    hospitalId: 'h2',
    specialization: 'Dermatology',
    experience: 8,
    availability: '09:00 AM - 2:00 PM',
    imageUrl: 'https://picsum.photos/100/100?random=11'
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    tokenNumber: 102,
    patientName: 'Rahul Sharma',
    doctorName: 'Dr. Aryan Mehta',
    hospitalName: 'Royal City Hospital',
    time: '10:30 AM',
    status: 'Active',
    symptoms: 'Chest pain, mild shortness of breath after exercise.',
    date: '2023-10-26'
  },
  {
    id: 'a2',
    tokenNumber: 103,
    patientName: 'Priya Singh',
    doctorName: 'Dr. Aryan Mehta',
    hospitalName: 'Royal City Hospital',
    time: '11:00 AM',
    status: 'Pending',
    symptoms: 'Regular checkup, history of hypertension.',
    date: '2023-10-27'
  },
  {
    id: 'a3',
    tokenNumber: 45,
    patientName: 'Amit Verma',
    doctorName: 'Dr. Sarah Khan',
    hospitalName: 'Green Valley Medical Center',
    time: '09:15 AM',
    status: 'Completed',
    diagnosis: 'Allergic dermatitis. Prescribed antihistamines.',
    date: '2023-10-25'
  }
];

export const MOCK_ORDERS: MedicineOrder[] = [
  {
    id: 'o1',
    patientName: 'Rahul Sharma',
    appointmentId: 'a1',
    items: ['Atorvastatin 10mg', 'Aspirin 75mg'],
    totalAmount: 450,
    status: 'Out for Delivery',
    date: '2023-10-25',
    address: '12 Palm Grove, Bandra West, Mumbai'
  },
  {
    id: 'o2',
    patientName: 'Amit Verma',
    appointmentId: 'a3',
    items: ['Cetirizine 10mg', 'Calamine Lotion'],
    totalAmount: 210,
    status: 'Processing',
    date: '2023-10-26',
    address: '45 Hill Road, Andheri East, Mumbai'
  }
];
