import React from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Sparkles, 
  Zap, 
  Siren, 
  Building2, 
  Sliders, 
  Package, 
  Network, 
  FileText, 
  BarChart3,
  MessageSquareCode
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isEmergency: boolean;
  darkMode: boolean;
  pendingRecsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isEmergency,
  darkMode,
  pendingRecsCount
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'prediction', label: 'AI Prediction', icon: BrainCircuit, badge: 'ML v4' },
    { id: 'explainable', label: 'Explainable AI', icon: Sparkles, badge: 'XAI' },
    { id: 'recommendations', label: 'Recommendations', icon: Zap, badge: pendingRecsCount > 0 ? `${pendingRecsCount} New` : null, highlight: true },
    { id: 'emergency', label: 'Emergency Center', icon: Siren, alert: isEmergency },
    { id: 'digitaltwin', label: 'Digital Hospital Twin', icon: Building2, badge: '2D Map' },
    { id: 'simulation', label: 'What-If Simulation', icon: Sliders, badge: 'Sim' },
    { id: 'inventory', label: 'Inventory', icon: Package, badge: 'Alerts' },
    { id: 'collaboration', label: 'Nearby Hospitals', icon: Network, badge: '4 Connected' },
    { id: 'reports', label: 'Reports', icon: FileText, badge: 'PDF/XLS' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
  ];

  return (
    <aside className={`w-64 flex-shrink-0 border-r min-h-[calc(100vh-4rem)] p-3 transition-colors duration-300 ${
      isEmergency 
        ? 'bg-rose-950/40 border-rose-900/50 text-slate-100' 
        : darkMode 
          ? 'bg-slate-900/80 border-slate-800 text-slate-300' 
          : 'bg-slate-50/90 border-slate-200 text-slate-700'
    }`}>
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Command Operations
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                isActive
                  ? isEmergency
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 font-bold'
                    : 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md shadow-sky-600/25 font-bold'
                  : item.alert
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse font-bold'
                    : darkMode
                      ? 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                      : 'hover:bg-slate-200/80 text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : item.alert ? 'text-rose-500' : 'text-sky-500 dark:text-sky-400'
                }`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`px-2 py-0.5 text-[10px] rounded-md font-bold tracking-tight ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : item.highlight
                      ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                      : darkMode
                        ? 'bg-slate-800 text-slate-400 border border-slate-700'
                        : 'bg-slate-200 text-slate-600 border border-slate-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-slate-800/40 dark:border-slate-800 text-[11px] text-slate-400 px-3 space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-slate-300">
          <span>AI Hospital OS</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
        <p className="text-[10px] leading-relaxed text-slate-400">
          Decision Support System powered by XGBoost ensemble & Gemini AI.
        </p>
      </div>
    </aside>
  );
};
