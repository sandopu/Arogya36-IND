import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { UserRole, User } from './types.ts';
import { Layout } from './components/Layout.tsx';
import { Login } from './components/Login.tsx';
import { PatientDashboard } from './components/views/PatientDashboard.tsx';
import { DoctorDashboard } from './components/views/DoctorDashboard.tsx';
import { AdminDashboard } from './components/views/AdminDashboard.tsx';
import { StoreDashboard } from './components/views/StoreDashboard.tsx';
import { DataProvider } from './contexts/DataContext.tsx';

const MOCK_USERS: Record<UserRole, User> = {
  [UserRole.PATIENT]: { id: 'u1', name: 'Rahul Sharma', email: 'rahul@example.com', role: UserRole.PATIENT },
  [UserRole.DOCTOR]: { id: 'u2', name: 'Dr. Aryan Mehta', email: 'dr.aryan@hospital.com', role: UserRole.DOCTOR },
  [UserRole.ADMIN]: { id: 'u3', name: 'System Admin', email: 'admin@arogya360.com', role: UserRole.ADMIN },
  [UserRole.STORE]: { id: 'u4', name: 'Apollo Pharmacy', email: 'store@apollo.com', role: UserRole.STORE },
  [UserRole.HOSPITAL_ADMIN]: { id: 'u5', name: 'Hospital Admin', email: 'admin@royalcity.com', role: UserRole.HOSPITAL_ADMIN },
};

function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (role: UserRole) => {
    setUser(MOCK_USERS[role]);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    if (!user) return <Login onLogin={handleLogin} />;

    switch (user.role) {
      case UserRole.PATIENT: return <PatientDashboard activeTab={activeTab} />;
      case UserRole.DOCTOR: return <DoctorDashboard activeTab={activeTab} />;
      case UserRole.ADMIN: return <AdminDashboard activeTab={activeTab} />;
      case UserRole.STORE: return <StoreDashboard activeTab={activeTab} />;
      default: return <div className="p-10 text-center">Welcome</div>;
    }
  };

  return (
    <HashRouter>
      {user ? (
        <Layout user={user} onLogout={handleLogout} activeTab={activeTab} onTabChange={setActiveTab}>
          {renderContent()}
        </Layout>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </HashRouter>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}