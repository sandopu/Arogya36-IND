import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appointment, Doctor, Hospital, MedicineOrder, MedicalStore } from '../types.ts';
import { MOCK_APPOINTMENTS, MOCK_DOCTORS, MOCK_HOSPITALS, MOCK_ORDERS, MOCK_STORES } from '../constants.ts';

interface DataContextType {
  hospitals: Hospital[];
  doctors: Doctor[];
  appointments: Appointment[];
  orders: MedicineOrder[];
  stores: MedicalStore[];
  bookAppointment: (patientName: string, doctorId: string, symptoms: string) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status'], diagnosis?: string) => void;
  createOrder: (appointmentId: string, items: string[], patientName: string) => void;
  updateOrderStatus: (id: string, status: MedicineOrder['status']) => void;
  addHospital: (hospital: Omit<Hospital, 'id' | 'tokensAvailable'>) => void;
  deleteHospital: (id: string) => void;
  addStore: (store: Omit<MedicalStore, 'id'>) => void;
  deleteStore: (id: string) => void;
  resetData: () => void;
  exportData: () => void;
  getDoctorById: (id: string) => Doctor | undefined;
  getHospitalById: (id: string) => Hospital | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getStored = (key: string, defaultValue: any) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  };

  const [hospitals, setHospitals] = useState<Hospital[]>(() => getStored('arogya360_hospitals', MOCK_HOSPITALS));
  const [stores, setStores] = useState<MedicalStore[]>(() => getStored('arogya360_stores', MOCK_STORES));
  const [doctors] = useState<Doctor[]>(() => getStored('arogya360_doctors', MOCK_DOCTORS));
  const [appointments, setAppointments] = useState<Appointment[]>(() => getStored('arogya360_appointments', MOCK_APPOINTMENTS));
  const [orders, setOrders] = useState<MedicineOrder[]>(() => getStored('arogya360_orders', MOCK_ORDERS));

  useEffect(() => {
    localStorage.setItem('arogya360_appointments', JSON.stringify(appointments));
    localStorage.setItem('arogya360_orders', JSON.stringify(orders));
    localStorage.setItem('arogya360_hospitals', JSON.stringify(hospitals));
    localStorage.setItem('arogya360_stores', JSON.stringify(stores));
  }, [appointments, orders, hospitals, stores]);

  const bookAppointment = (patientName: string, doctorId: string, symptoms: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) return;
    const hospital = hospitals.find(h => h.id === doctor.hospitalId);
    const maxToken = appointments.length > 0 ? Math.max(...appointments.map(a => a.tokenNumber)) : 100;
    const newAppointment: Appointment = {
      id: `a${Date.now()}`,
      tokenNumber: maxToken + 1,
      patientName,
      doctorName: doctor.name,
      hospitalName: hospital?.name || 'Unknown Hospital',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Pending',
      symptoms,
      date: new Date().toISOString().split('T')[0]
    };
    setAppointments(prev => [newAppointment, ...prev]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status'], diagnosis?: string) => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status, diagnosis: diagnosis || apt.diagnosis } : apt));
  };

  const createOrder = (appointmentId: string, items: string[], patientName: string) => {
    const newOrder: MedicineOrder = {
      id: `o${Date.now()}`,
      appointmentId, patientName, items,
      totalAmount: Math.floor(Math.random() * 1000) + 150,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      address: '12 Palm Grove, Mumbai'
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: MedicineOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addHospital = (h: Omit<Hospital, 'id' | 'tokensAvailable'>) => {
    setHospitals(prev => [...prev, { ...h, id: `h${Date.now()}`, tokensAvailable: 50 }]);
  };

  const deleteHospital = (id: string) => setHospitals(prev => prev.filter(h => h.id !== id));
  
  const addStore = (s: Omit<MedicalStore, 'id'>) => {
    setStores(prev => [...prev, { ...s, id: `s${Date.now()}` }]);
  };

  const deleteStore = (id: string) => setStores(prev => prev.filter(s => s.id !== id));

  const resetData = () => { localStorage.clear(); window.location.reload(); };

  const exportData = () => {
    const data = { hospitals, doctors, appointments, orders, stores };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `arogya360_backup.json`;
    link.click();
  };

  return (
    <DataContext.Provider value={{
      hospitals, doctors, appointments, orders, stores,
      bookAppointment, updateAppointmentStatus, createOrder, updateOrderStatus,
      addHospital, deleteHospital, addStore, deleteStore, resetData, exportData,
      getDoctorById: (id) => doctors.find(d => d.id === id),
      getHospitalById: (id) => hospitals.find(h => h.id === id)
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};