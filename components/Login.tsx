import React, { useState } from 'react';
import { UserRole } from '../types';
import { Button } from './Button';
import { Activity, User, Stethoscope, ShieldCheck, ShoppingBag, HeartPulse } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.PATIENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin(selectedRole);
      setLoading(false);
    }, 1000);
  };

  const roles = [
    { id: UserRole.PATIENT, label: 'Patient', icon: User, desc: 'Book tokens & view records' },
    { id: UserRole.DOCTOR, label: 'Doctor', icon: Stethoscope, desc: 'Manage patients & diagnosis' },
    { id: UserRole.ADMIN, label: 'Admin', icon: ShieldCheck, desc: 'System control & analytics' },
    { id: UserRole.STORE, label: 'Store', icon: ShoppingBag, desc: 'Manage orders & inventory' },
  ];

  return (
    <div className="min-h-screen bg-[#0b1120] flex items-center justify-center p-4 relative overflow-hidden text-slate-200">
      {/* Vibrant Background Overlay */}
      <div className="absolute inset-0 z-0">
         {/* Abstract Shapes */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-royal-900/40 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/4"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-lotus-900/20 to-transparent rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>
         <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>
      
      <div className="relative w-full max-w-5xl glass-dark rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[680px] z-10 border border-white/10">
        
        {/* Left Side - Role Selection */}
        <div className="w-full md:w-5/12 p-8 bg-white/5 flex flex-col justify-center border-r border-white/5">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-gradient-to-br from-gold-500 via-orange-500 to-lotus-600 p-3 rounded-2xl shadow-lg shadow-orange-500/20">
                 <HeartPulse className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-white tracking-wide">Arogya<span className="text-gold-500">360</span></h1>
            </div>
            <p className="text-slate-400 font-medium pl-1">Select your role to continue.</p>
          </div>

          <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex items-center p-4 rounded-2xl border transition-all duration-300 text-left group relative overflow-hidden ${
                  selectedRole === role.id 
                  ? 'border-gold-500/50 bg-white/10 shadow-lg shadow-black/20' 
                  : 'border-transparent hover:bg-white/5 bg-white/5'
                }`}
              >
                {selectedRole === role.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-400 to-gold-600"></div>}
                <div className={`p-3 rounded-full mr-4 transition-colors shadow-sm ${
                  selectedRole === role.id ? 'bg-gold-500 text-black' : 'bg-slate-800 text-slate-500 group-hover:text-gold-400'
                }`}>
                  <role.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className={`block font-bold text-lg ${selectedRole === role.id ? 'text-white' : 'text-slate-400'}`}>
                    {role.label}
                  </span>
                  <span className="text-xs text-slate-500">{role.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-7/12 p-12 flex flex-col justify-center bg-black/20 relative">
          <div className="absolute top-0 right-0 p-6">
             <span className="text-xs font-bold text-gold-400 bg-gold-900/20 px-3 py-1 rounded-full border border-gold-500/30">Premium Healthcare</span>
          </div>

          <div className="mb-10">
            <h2 className="text-4xl font-serif font-bold text-white mb-2">Namaste 🙏</h2>
            <p className="text-slate-400 text-lg">Access your digital health dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all shadow-inner placeholder:text-slate-600"
                    placeholder="name@example.com"
                    required
                  />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-300 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all shadow-inner placeholder:text-slate-600"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="flex items-center justify-between text-sm pt-2">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="rounded text-gold-600 focus:ring-gold-500 mr-2 h-4 w-4 border-slate-600 bg-white/10" />
                <span className="text-slate-400 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-gold-500 hover:text-gold-400 font-bold">Forgot password?</a>
            </div>

            <Button type="submit" className="w-full py-4 text-lg bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-black font-bold shadow-xl shadow-gold-900/20 rounded-xl" isLoading={loading}>
              Sign In as {roles.find(r => r.id === selectedRole)?.label}
            </Button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Don't have an account? <a href="#" className="text-gold-500 font-bold hover:underline">Register Now</a>
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-6 text-white/20 text-xs font-bold tracking-widest">
        © 2024 AROGYA360 • SWASTHYA BHARAT
      </div>
    </div>
  );
};