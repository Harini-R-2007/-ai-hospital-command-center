import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { PredictionView } from './components/PredictionView';
import { ExplainableAIView } from './components/ExplainableAIView';
import { RecommendationsView } from './components/RecommendationsView';
import { EmergencyView } from './components/EmergencyView';
import { DigitalTwinView } from './components/DigitalTwinView';
import { SimulationView } from './components/SimulationView';
import { InventoryView } from './components/InventoryView';
import { CollaborationView } from './components/CollaborationView';
import { ReportsView } from './components/ReportsView';
import { AnalyticsView } from './components/AnalyticsView';
import { AIChatDrawer } from './components/AIChatDrawer';
import { LoginModal } from './components/LoginModal';
import { User } from './types';

export default function App() {
  const [user, setUser] = useState<User>({
    id: 'usr-admin-01',
    name: 'Dr. Arthur Vance',
    role: 'admin',
    email: 'admin@hospital.org',
    title: 'Chief Medical Officer & Command Director',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200'
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const handleToggleEmergency = () => {
    setIsEmergency((prev) => !prev);
    if (!isEmergency) {
      setActiveTab('emergency');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      darkMode 
        ? isEmergency ? 'bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-100' 
        : isEmergency ? 'bg-rose-50 text-slate-900' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Top Navigation Bar */}
      <Navbar
        user={user}
        onLoginClick={() => setIsLoginOpen(true)}
        isEmergency={isEmergency}
        onToggleEmergency={handleToggleEmergency}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadAlertsCount={3}
      />

      {/* Body Layout */}
      <div className="flex">
        
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isEmergency={isEmergency}
          darkMode={darkMode}
          pendingRecsCount={5}
        />

        {/* Main Workspace Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto overflow-x-hidden">
          {activeTab === 'dashboard' && (
            <DashboardView darkMode={darkMode} onNavigate={setActiveTab} isEmergency={isEmergency} />
          )}

          {activeTab === 'prediction' && (
            <PredictionView darkMode={darkMode} onNavigate={setActiveTab} />
          )}

          {activeTab === 'explainable' && (
            <ExplainableAIView darkMode={darkMode} onNavigate={setActiveTab} />
          )}

          {activeTab === 'recommendations' && (
            <RecommendationsView darkMode={darkMode} onNavigate={setActiveTab} />
          )}

          {activeTab === 'emergency' && (
            <EmergencyView 
              darkMode={darkMode} 
              isEmergency={isEmergency} 
              onToggleEmergency={handleToggleEmergency}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'digitaltwin' && (
            <DigitalTwinView darkMode={darkMode} />
          )}

          {activeTab === 'simulation' && (
            <SimulationView darkMode={darkMode} />
          )}

          {activeTab === 'inventory' && (
            <InventoryView darkMode={darkMode} />
          )}

          {activeTab === 'collaboration' && (
            <CollaborationView darkMode={darkMode} />
          )}

          {activeTab === 'reports' && (
            <ReportsView darkMode={darkMode} />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView darkMode={darkMode} />
          )}
        </main>

      </div>

      {/* Floating AI Command Assistant */}
      <AIChatDrawer darkMode={darkMode} />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
        darkMode={darkMode}
      />

    </div>
  );
}
