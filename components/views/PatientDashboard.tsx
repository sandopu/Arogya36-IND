import React, { useState } from 'react';
import { Card } from '../Card.tsx';
import { Button } from '../Button.tsx';
import { MapPin, Clock, Star, Pill, AlertCircle, CheckCircle, FileText } from 'lucide-react';
import { useData } from '../../contexts/DataContext.tsx';
import { Modal } from '../Modal.tsx';
import { Doctor } from '../../types.ts';

interface PatientDashboardProps { activeTab: string; }

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ activeTab }) => {
  const { hospitals, doctors, appointments, orders, bookAppointment } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredHospitals = hospitals.filter(h => 
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const myAppointments = appointments.filter(a => a.patientName === 'Rahul Sharma');
  const activeToken = myAppointments.find(a => a.status === 'Active');
  const myOrders = orders.filter(o => o.patientName === 'Rahul Sharma');

  const handleOpenBooking = (hospitalId: string) => {
    setSelectedHospitalId(hospitalId);
    const hospitalDoctors = doctors.filter(d => d.hospitalId === hospitalId);
    if (hospitalDoctors.length > 0) setSelectedDoctorId(hospitalDoctors[0].id);
    setIsBookingOpen(true);
  };

  const handleBook = () => {
    if (!selectedDoctorId || !symptoms) return;
    setIsSubmitting(true);
    setTimeout(() => {
      bookAppointment("Rahul Sharma", selectedDoctorId, symptoms);
      setIsSubmitting(false);
      setIsBookingOpen(false);
      setSymptoms('');
    }, 800);
  };

  return (
    <div className="space-y-8">
      {activeTab === 'dashboard' && (
        <>
          <div className="bg-gradient-to-r from-royal-900/80 to-royal-600/80 rounded-2xl p-8 text-white border border-white/10 backdrop-blur-md">
            <h1 className="text-4xl font-serif font-bold mb-2">Namaste, Rahul 🙏</h1>
            <p className="text-royal-200">Your health dashboard is ready.</p>
          </div>

          <div className="relative max-w-3xl mx-auto -mt-10 z-10 px-4">
            <div className="glass-dark rounded-2xl p-2 flex items-center shadow-2xl">
              <MapPin className="h-6 w-6 text-gold-500 ml-4" />
              <input 
                type="text"
                placeholder="Search hospitals or specialists..."
                className="flex-1 p-4 bg-transparent text-white outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button>Find Care</Button>
            </div>
          </div>

          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHospitals.map(hospital => (
              <Card key={hospital.id}>
                <h3 className="font-bold text-lg">{hospital.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{hospital.address}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hospital.specializations.map(s => (
                    <span key={s} className="text-[10px] bg-royal-900/50 px-2 py-1 rounded border border-royal-500/20">{s}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-emerald-400 text-sm font-bold">{hospital.tokensAvailable} Slots</span>
                  <Button size="sm" variant="secondary" onClick={() => handleOpenBooking(hospital.id)}>Book</Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {activeTab === 'tokens' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myAppointments.map(apt => (
            <Card key={apt.id} title={`Token #${apt.tokenNumber}`}>
              <h4 className="font-bold text-white">{apt.doctorName}</h4>
              <p className="text-sm text-slate-400">{apt.hospitalName}</p>
              <div className="mt-4 p-3 bg-black/20 rounded-lg text-gold-500 font-bold">
                {apt.time} • {apt.status}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} title="Book Appointment">
        <div className="space-y-4">
          <select 
            className="w-full p-3 bg-slate-900 text-white rounded-lg border border-white/10"
            value={selectedDoctorId || ''}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
          >
            {doctors.filter(d => d.hospitalId === selectedHospitalId).map(doc => (
              <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialization})</option>
            ))}
          </select>
          <textarea 
            className="w-full p-3 bg-slate-900 text-white rounded-lg border border-white/10 h-32"
            placeholder="Symptoms..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <Button className="w-full" onClick={handleBook} isLoading={isSubmitting}>Confirm</Button>
        </div>
      </Modal>
    </div>
  );
};