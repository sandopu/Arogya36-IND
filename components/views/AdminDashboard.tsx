import React, { useState } from 'react';
import { Card } from '../Card.tsx';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  Building2, 
  Activity, 
  DollarSign, 
  Trash2, 
  Plus, 
  MapPin, 
  ShoppingBag, 
  Database, 
  Download, 
  GitBranch, 
  Github, 
  Server, 
  ShieldCheck 
} from 'lucide-react';
import { useData } from '../../contexts/DataContext.tsx';
import { Button } from '../Button.tsx';
import { Modal } from '../Modal.tsx';

const data = [
  { name: 'Mon', visits: 40, orders: 24 },
  { name: 'Tue', visits: 30, orders: 13 },
  { name: 'Wed', visits: 20, orders: 98 },
  { name: 'Thu', visits: 27, orders: 39 },
  { name: 'Fri', visits: 18, orders: 48 },
  { name: 'Sat', visits: 23, orders: 38 },
  { name: 'Sun', visits: 34, orders: 43 },
];

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/10 hover:-translate-y-1 transition-transform duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-serif font-bold text-white mt-1">{value}</h3>
      </div>
      <div className="p-3 bg-gradient-to-br from-royal-900/50 to-royal-800/30 rounded-xl shadow-inner border border-white/5">
        <Icon className="h-6 w-6 text-royal-400" />
      </div>
    </div>
    <p className={`text-xs mt-4 font-bold flex items-center ${trend.includes('+') ? 'text-emerald-400' : 'text-red-400'}`}>
      <span className={`px-1.5 py-0.5 rounded mr-2 ${trend.includes('+') ? 'bg-emerald-900/30' : 'bg-red-900/30'}`}>{trend}</span> from last month
    </p>
  </div>
);

interface AdminDashboardProps {
    activeTab: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ activeTab }) => {
  const { appointments, orders, hospitals, stores, resetData, exportData, addHospital, deleteHospital, addStore, deleteStore } = useData();
  
  const [isAddHospitalOpen, setIsAddHospitalOpen] = useState(false);
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);

  const [newHospital, setNewHospital] = useState({ name: '', address: '', city: '', imageUrl: 'https://picsum.photos/400/300' });
  const [newStore, setNewStore] = useState({ name: '', address: '', contact: '' });

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const handleAddHospital = () => {
      addHospital({ ...newHospital, specializations: ['General'], rating: 4.5, waitTimes: '15 mins' });
      setIsAddHospitalOpen(false);
      setNewHospital({ name: '', address: '', city: '', imageUrl: 'https://picsum.photos/400/300' });
  };

  const handleAddStore = () => {
      addStore({ ...newStore, rating: 4.0, isOpen: true });
      setIsAddStoreOpen(false);
      setNewStore({ name: '', address: '', contact: '' });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Tab Content */}
      {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-slide-up">
             <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
                <div className="flex-1 flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-3">
                        <Database className="h-5 w-5 text-gold-500" />
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Database Storage</p>
                            <p className="text-sm text-slate-300">LocalStorage Engine</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button size="sm" variant="secondary" onClick={exportData}>
                            <Download className="h-4 w-4 mr-2" /> Export
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => { if(confirm('Reset all data?')) resetData(); }}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-3">
                        <GitBranch className="h-5 w-5 text-emerald-400" />
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Git Action Status</p>
                            <p className="text-sm text-slate-300">CI/CD: Healthy</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-900/20 border border-emerald-500/30 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">Deployed v1.0.4</span>
                    </div>
                </div>
             </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Appointments" value={appointments.length} icon={Users} trend="+12%" />
                <StatCard title="Active Hospitals" value={hospitals.length} icon={Building2} trend="+5%" />
                <StatCard title="Active Stores" value={stores.length} icon={ShoppingBag} trend="+8%" />
                <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={DollarSign} trend="+18%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Weekly Appointments">
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <Tooltip 
                            contentStyle={{backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff'}} 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                        />
                        <Bar dataKey="visits" fill="url(#colorGradient)" radius={[6, 6, 0, 0]} barSize={40} />
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={1}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.6}/>
                            </linearGradient>
                        </defs>
                    </BarChart>
                    </ResponsiveContainer>
                </div>
                </Card>

                <Card title="Pharmacy Revenue Trend">
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <Tooltip contentStyle={{backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff'}} />
                        <Line type="monotone" dataKey="orders" stroke="#FF9933" strokeWidth={4} dot={{r: 6, fill: '#FF9933', strokeWidth: 2, stroke: '#fff'}} />
                    </LineChart>
                    </ResponsiveContainer>
                </div>
                </Card>
            </div>

            {/* Git Action / DevOps Insight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 glass-dark p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                    <div className="flex items-center space-x-3 mb-6">
                        <Github className="h-6 w-6 text-white" />
                        <h3 className="text-xl font-bold font-serif">Recent Git Activity</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { msg: 'feat: integrated gemini-3-pro for cardiology', time: '2h ago', status: 'Success' },
                            { msg: 'fix: resolved mobile navigation overlap', time: '5h ago', status: 'Success' },
                            { msg: 'chore: updated patient token schema', time: '1d ago', status: 'Success' }
                        ].map((commit, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5 hover:border-royal-500/30 transition-colors">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-200">{commit.msg}</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase">{commit.time}</p>
                                    </div>
                                </div>
                                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="glass-dark p-6 rounded-2xl border border-white/5 bg-royal-900/10">
                    <div className="flex items-center space-x-3 mb-6">
                        <Server className="h-6 w-6 text-gold-500" />
                        <h3 className="text-lg font-bold font-serif">System Health</h3>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-widest text-slate-500">
                                <span>API Uptime</span>
                                <span className="text-emerald-400">99.9%</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full w-[99%]"></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-widest text-slate-500">
                                <span>Memory Usage</span>
                                <span className="text-gold-400">124MB</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-gold-500 h-full w-[45%]"></div>
                            </div>
                        </div>
                        <div className="pt-2">
                             <Button className="w-full text-xs" variant="outline" size="sm">System Logs</Button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      )}

      {activeTab === 'hospitals' && (
          <div className="space-y-6 animate-slide-up">
              <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-serif font-bold text-white">Registered Hospitals</h2>
                  <Button onClick={() => setIsAddHospitalOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" /> Add Hospital
                  </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hospitals.map(hospital => (
                      <Card key={hospital.id} className="group relative overflow-hidden border-l-4 border-l-royal-500 bg-white/5">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-xl text-white">{hospital.name}</h3>
                                <p className="text-slate-400 text-sm flex items-center mt-1">
                                    <MapPin className="h-3 w-3 mr-1" /> {hospital.city}
                                </p>
                            </div>
                            <button onClick={() => deleteHospital(hospital.id)} className="text-red-400 hover:text-red-300 p-2 hover:bg-red-900/20 rounded-full transition-colors">
                                <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="text-sm text-slate-400 mb-4">
                              <p>{hospital.address}</p>
                              <p className="mt-2 font-bold text-royal-400">{hospital.specializations.join(', ')}</p>
                          </div>
                          <div className="bg-black/20 p-3 rounded-lg flex justify-between items-center border border-white/5">
                              <span className="text-xs font-bold text-slate-300 uppercase">Tokens Avail: {hospital.tokensAvailable}</span>
                              <span className="text-xs font-bold text-gold-500">★ {hospital.rating}</span>
                          </div>
                      </Card>
                  ))}
              </div>
          </div>
      )}

      {activeTab === 'stores' && (
           <div className="space-y-6 animate-slide-up">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold text-white">Registered Pharmacies</h2>
                <Button onClick={() => setIsAddStoreOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" /> Add Store
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map(store => (
                    <Card key={store.id} className="group relative overflow-hidden border-l-4 border-l-gold-500 bg-white/5">
                         <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-xl text-white">{store.name}</h3>
                                <p className="text-slate-400 text-sm flex items-center mt-1">
                                    <ShoppingBag className="h-3 w-3 mr-1" /> {store.contact}
                                </p>
                            </div>
                            <button onClick={() => deleteStore(store.id)} className="text-red-400 hover:text-red-300 p-2 hover:bg-red-900/20 rounded-full transition-colors">
                                <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                          <p className="text-sm text-slate-400 mb-4">{store.address}</p>
                          <div className="bg-black/20 p-3 rounded-lg flex justify-between items-center border border-white/5">
                              <span className="text-xs font-bold text-gold-400 uppercase">{store.isOpen ? 'Open Now' : 'Closed'}</span>
                              <span className="text-xs font-bold text-royal-400">★ {store.rating}</span>
                          </div>
                    </Card>
                ))}
            </div>
           </div>
      )}

      {/* Modals */}
      <Modal isOpen={isAddHospitalOpen} onClose={() => setIsAddHospitalOpen(false)} title="Add New Hospital">
          <div className="space-y-4">
              <input className="w-full p-3 border border-white/10 bg-[#0b1120] text-white rounded-lg placeholder:text-slate-600" placeholder="Hospital Name" value={newHospital.name} onChange={e => setNewHospital({...newHospital, name: e.target.value})} />
              <input className="w-full p-3 border border-white/10 bg-[#0b1120] text-white rounded-lg placeholder:text-slate-600" placeholder="City" value={newHospital.city} onChange={e => setNewHospital({...newHospital, city: e.target.value})} />
              <input className="w-full p-3 border border-white/10 bg-[#0b1120] text-white rounded-lg placeholder:text-slate-600" placeholder="Address" value={newHospital.address} onChange={e => setNewHospital({...newHospital, address: e.target.value})} />
              <Button className="w-full" onClick={handleAddHospital}>Save Hospital</Button>
          </div>
      </Modal>

      <Modal isOpen={isAddStoreOpen} onClose={() => setIsAddStoreOpen(false)} title="Add New Pharmacy">
          <div className="space-y-4">
              <input className="w-full p-3 border border-white/10 bg-[#0b1120] text-white rounded-lg placeholder:text-slate-600" placeholder="Store Name" value={newStore.name} onChange={e => setNewStore({...newStore, name: e.target.value})} />
              <input className="w-full p-3 border border-white/10 bg-[#0b1120] text-white rounded-lg placeholder:text-slate-600" placeholder="Address" value={newStore.address} onChange={e => setNewStore({...newStore, address: e.target.value})} />
              <input className="w-full p-3 border border-white/10 bg-[#0b1120] text-white rounded-lg placeholder:text-slate-600" placeholder="Contact Number" value={newStore.contact} onChange={e => setNewStore({...newStore, contact: e.target.value})} />
              <Button className="w-full" onClick={handleAddStore}>Save Pharmacy</Button>
          </div>
      </Modal>
    </div>
  );
};