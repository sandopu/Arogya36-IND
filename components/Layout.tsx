import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { 
  LayoutDashboard, 
  Stethoscope, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Activity,
  FileText,
  Bell,
  Store,
  HeartPulse
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, activeTab, onTabChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavItems = () => {
    switch (user.role) {
      case UserRole.PATIENT:
        return [
          { id: 'dashboard', label: 'Find Care', icon: LayoutDashboard },
          { id: 'tokens', label: 'My Tokens', icon: Activity },
          { id: 'records', label: 'Medical Records', icon: FileText },
          { id: 'pharmacy', label: 'Pharmacy', icon: ShoppingBag },
        ];
      case UserRole.DOCTOR:
        return [
          { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
          { id: 'patients', label: 'Patient Queue', icon: Users },
          { id: 'records', label: 'Records & AI', icon: Stethoscope },
        ];
      case UserRole.ADMIN:
        return [
          { id: 'dashboard', label: 'Analytics', icon: LayoutDashboard },
          { id: 'hospitals', label: 'Hospitals', icon: Activity },
          { id: 'stores', label: 'Medical Stores', icon: Store },
        ];
      case UserRole.STORE:
        return [
          { id: 'dashboard', label: 'Orders', icon: ShoppingBag },
          { id: 'inventory', label: 'Inventory', icon: FileText },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen flex text-slate-200">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 
        bg-[#0f172a] /* Slate 900 */
        border-r border-white/10
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 shadow-2xl
      `}>
         {/* Subtle texture overlay */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

        <div className="h-full flex flex-col relative z-10">
          {/* Header / Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 group cursor-pointer">
                    {/* Animated Logo Icon */}
                    <div className="bg-gradient-to-br from-gold-500 via-orange-500 to-lotus-600 p-3 rounded-2xl shadow-lg shadow-orange-500/10 group-hover:scale-105 transition-transform duration-300 animate-pulse-slow">
                        <HeartPulse className="h-7 w-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-serif font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gold-200 leading-none drop-shadow-sm">
                          Arogya<span className="text-gold-500">360</span>
                        </h1>
                        <p className="text-[10px] text-gold-400 font-bold tracking-[0.2em] uppercase mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          Swasthya Bharat
                        </p>
                    </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-white">
                <X className="h-6 w-6" />
                </button>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden
                  ${activeTab === item.id 
                    ? 'bg-gradient-to-r from-royal-900/80 to-royal-800/50 text-white shadow-lg shadow-black/20 border border-royal-500/30' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                `}
              >
                 {activeTab === item.id && (
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-400 to-gold-600"></div>
                 )}
                <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-gold-400' : 'text-slate-500 group-hover:text-white transition-colors'}`} />
                <span className="font-medium text-base tracking-wide">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-white/10 bg-black/20">
            <div className="flex items-center space-x-3 px-4 py-3 mb-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold-600 to-gold-700 flex items-center justify-center text-white font-bold shadow-inner ring-2 ring-black/50 group-hover:scale-110 transition-transform">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-200 truncate group-hover:text-gold-300 transition-colors">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize font-medium">{user.role.toLowerCase()}</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-lotus-400 hover:bg-lotus-900/20 hover:text-lotus-300 rounded-lg transition-colors text-sm font-bold tracking-wide group"
            >
              <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative bg-transparent">
        {/* Top Bar */}
        <header className="glass-dark h-20 flex items-center justify-between px-8 z-10 sticky top-0 border-b border-white/5">
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white">
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 md:ml-0 ml-4">
            <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 animate-slide-in-right">
              {navItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center space-x-6">
             <div className="hidden md:flex flex-col items-end mr-2">
                 <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Location</span>
                 <span className="text-sm font-bold text-slate-300 flex items-center bg-white/5 px-3 py-1 rounded-full border border-white/10 shadow-sm">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span> Mumbai, IN
                 </span>
             </div>
            <button className="relative p-2.5 text-slate-400 hover:text-lotus-400 transition-colors rounded-full hover:bg-white/5 group">
              <Bell className="h-6 w-6 group-hover:animate-bounce-gentle" />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-lotus-500 rounded-full border-2 border-black shadow-sm"></span>
            </button>
            <button className="p-2.5 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
              <Settings className="h-6 w-6 hover:rotate-90 transition-transform duration-700" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8 scroll-smooth custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};