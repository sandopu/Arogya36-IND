import React, { useState } from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { useData } from '../../contexts/DataContext';
import { analyzePatientData } from '../../services/geminiService';
import { Brain, Activity, ClipboardCheck, CheckCircle, Users, Pill } from 'lucide-react';
import { Modal } from '../Modal';

interface DoctorDashboardProps {
    activeTab: string;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ activeTab }) => {
  const { appointments, updateAppointmentStatus, createOrder } = useData();
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Prescription State
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [medicines, setMedicines] = useState('');

  const activeAppointments = appointments.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled');
  const currentPatient = appointments.find(a => a.id === selectedPatientId);

  const handleAnalyze = async () => {
    if (!currentPatient) return;
    setIsAnalyzing(true);
    
    const detailedHistory = "Hypertension diagnosed 2 years ago. Allergic to Penicillin.";
    const vitals = "BP: 145/90, HR: 82, Temp: 98.6F";
    
    const result = await analyzePatientData(
      currentPatient.symptoms || "General Checkup",
      detailedHistory,
      vitals
    );
    
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const handleCompleteVisit = () => {
    if (!selectedPatientId) return;
    updateAppointmentStatus(selectedPatientId, 'Completed');
    setSelectedPatientId(null);
    setAiAnalysis(null);
  };

  const handlePrescribe = () => {
    if (!selectedPatientId || !medicines || !currentPatient) return;
    const items = medicines.split(',').map(i => i.trim());
    createOrder(selectedPatientId, items, currentPatient.patientName);
    setIsPrescriptionModalOpen(false);
    setMedicines('');
    setSelectedPatientId(null); 
    alert("Prescription sent successfully to the Pharmacy Dashboard!");
  };

  const handleSelectPatient = (id: string) => {
      setSelectedPatientId(id);
      setAiAnalysis(null);
      updateAppointmentStatus(id, 'Active');
  };

  if (activeTab === 'records') {
      return (
        <div className="text-center py-20 animate-fade-in">
            <Brain className="h-16 w-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-300">Medical Records & AI</h3>
            <p className="text-slate-500">Deep analysis of patient history will appear here.</p>
        </div>
      );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)] animate-fade-in">
      {/* Queue Column */}
      <div className="lg:col-span-1 flex flex-col h-full">
        <Card className="h-full flex flex-col" title="Patient Queue">
          <div className="flex-1 overflow-y-auto space-y-3 mt-2 pr-2 custom-scrollbar">
            {activeAppointments.length === 0 ? (
                <div className="text-center py-10 text-slate-500">No pending patients</div>
            ) : (
                activeAppointments.map(apt => (
                <div 
                    key={apt.id}
                    onClick={() => handleSelectPatient(apt.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedPatientId === apt.id 
                    ? 'bg-royal-900/30 border-royal-500 shadow-lg shadow-royal-900/20' 
                    : 'border-white/5 hover:border-white/10 hover:bg-white/5'
                    }`}
                >
                    <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${apt.status === 'Active' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                        {apt.status}
                    </span>
                    <span className="text-xs text-slate-500">Token #{apt.tokenNumber}</span>
                    </div>
                    <h4 className="font-bold text-white">{apt.patientName}</h4>
                    <p className="text-sm text-slate-400 truncate">{apt.symptoms}</p>
                </div>
                ))
            )}
          </div>
        </Card>
      </div>

      {/* Main Work Area */}
      <div className="lg:col-span-2 flex flex-col h-full">
        {currentPatient ? (
          <div className="space-y-6 h-full overflow-y-auto pr-2 custom-scrollbar">
            {/* Patient Header */}
            <Card className="bg-gradient-to-r from-white/5 to-royal-900/20 border-royal-500/20">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-royal-900 flex items-center justify-center text-royal-300 text-xl font-bold border border-royal-500/30">
                    {currentPatient.patientName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-white">{currentPatient.patientName}</h2>
                    <p className="text-slate-400">Male, 34 Years • ID: #PT-{currentPatient.tokenNumber}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                    <Button variant="danger" size="sm" onClick={() => updateAppointmentStatus(currentPatient.id, 'Cancelled')}>Cancel</Button>
                    <Button variant="primary" size="sm" onClick={handleCompleteVisit}>Complete Visit</Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-black/20 p-3 rounded-lg border border-white/5 shadow-sm">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Blood Pressure</p>
                  <p className="font-bold text-lg text-slate-200">145/90 <span className="text-xs text-red-400 font-normal">High</span></p>
                </div>
                <div className="bg-black/20 p-3 rounded-lg border border-white/5 shadow-sm">
                   <p className="text-xs text-slate-500 uppercase tracking-wider">Heart Rate</p>
                  <p className="font-bold text-lg text-slate-200">82 <span className="text-xs text-slate-500 font-normal">bpm</span></p>
                </div>
                <div className="bg-black/20 p-3 rounded-lg border border-white/5 shadow-sm">
                   <p className="text-xs text-slate-500 uppercase tracking-wider">Weight</p>
                  <p className="font-bold text-lg text-slate-200">78 <span className="text-xs text-slate-500 font-normal">kg</span></p>
                </div>
              </div>
            </Card>

            {/* AI Analysis Section */}
            <Card className="border-royal-500/20 overflow-hidden" title="AI Medical Assistant">
              {!aiAnalysis ? (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Generate AI-assisted diagnosis based on symptoms and vitals.</p>
                  <Button onClick={handleAnalyze} isLoading={isAnalyzing} className="w-full md:w-auto">
                    <Activity className="h-4 w-4 mr-2" />
                    Analyze Patient Data
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-royal-900/20 p-4 rounded-lg border border-royal-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="h-5 w-5 text-royal-400" />
                      <h4 className="font-bold text-royal-200">AI Analysis Report</h4>
                    </div>
                    <div className="prose prose-sm max-w-none text-slate-300 whitespace-pre-line">
                      {aiAnalysis}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                     <Button variant="secondary" onClick={() => setAiAnalysis(null)}>Clear</Button>
                     <Button onClick={() => setIsPrescriptionModalOpen(true)}>Use in Prescription</Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Action Area */}
            <div className="grid grid-cols-2 gap-4">
               <Button 
                 variant="outline" 
                 className="h-20 flex flex-col items-center justify-center gap-2 border-white/10 hover:bg-white/5"
                 onClick={() => setIsPrescriptionModalOpen(true)}
                >
                 <ClipboardCheck className="h-6 w-6" />
                 <span>Write Prescription</span>
               </Button>
               <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 border-white/10 hover:bg-white/5">
                 <CheckCircle className="h-6 w-6" />
                 <span>Request Lab Tests</span>
               </Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center flex-col text-slate-600">
            <Users className="h-16 w-16 mb-4 opacity-20" />
            <p>Select a patient from the queue to begin consultation</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        title="Digital Prescription"
      >
          <div className="space-y-4">
              <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1">Medicines (Comma separated)</label>
                  <textarea 
                    className="w-full p-3 border border-white/10 rounded-lg focus:ring-2 focus:ring-royal-500 outline-none h-32 bg-[#0b1120] text-white placeholder:text-slate-600"
                    placeholder="e.g. Paracetamol 500mg (2 times/day), Amoxicillin 250mg"
                    value={medicines}
                    onChange={(e) => setMedicines(e.target.value)}
                  ></textarea>
              </div>
              <div className="bg-blue-900/20 p-3 rounded text-sm text-blue-200 border border-blue-500/20">
                  This prescription will be instantly sent to the nearest registered pharmacy for the patient.
              </div>
              <Button className="w-full" onClick={handlePrescribe} disabled={!medicines}>
                  <Pill className="h-4 w-4 mr-2" /> Send to Pharmacy
              </Button>
          </div>
      </Modal>
    </div>
  );
};