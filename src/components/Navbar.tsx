import React from 'react';
import { 
  Building2, 
  Siren, 
  Bell, 
  Sun, 
  Moon, 
  User as UserIcon, 
  ShieldCheck, 
  Search, 
  Activity,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  onLoginClick: () => void;
  isEmergency: boolean;
  onToggleEmergency: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadAlertsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onLoginClick,
  isEmergency,
  onToggleEmergency,
  darkMode,
  setDarkMode,
  unreadAlertsCount
}) => {
  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-300 border-b ${
      isEmergency 
        ? 'bg-rose-950/90 border-rose-600 text-white shadow-lg shadow-rose-950/50' 
        : darkMode 
          ? 'bg-slate-900/90 border-slate-800 text-slate-100' 
          : 'bg-white/90 border-slate-200 text-slate-800'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Status */}
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl shadow-md flex items-center justify-center transition-all ${
            isEmergency 
              ? 'bg-rose-600 text-white animate-pulse' 
              : 'bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-blue-500/20'
          }`}>
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight font-display bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-sky-400 dark:to-indigo-300">
                AI Hospital Command Center
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300 border border-sky-500/20">
                OS v2.4
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs opacity-75">
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${isEmergency ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
                {isEmergency ? 'EMERGENCY PROTOCOL ACTIVE' : 'Operational Status: ELEVATED'}
              </span>
              <span className="hidden md:inline">• Confidence 94.2%</span>
            </div>
          </div>
        </div>

        {/* Center: Search / Filter */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
            <input 
              type="text" 
              placeholder="Search departments, patients, inventory, doctor roster..."
              className={`w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border transition-all outline-none ${
                darkMode 
                  ? 'bg-slate-800/80 border-slate-700 text-slate-200 focus:border-sky-500' 
                  : 'bg-slate-100/80 border-slate-200 text-slate-700 focus:border-sky-500'
              }`}
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Emergency Command Button */}
          <button
            onClick={onToggleEmergency}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
              isEmergency
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/30 font-black tracking-wide'
                : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-600/30'
            }`}
            title="Toggle Emergency Mode Scenario"
          >
            <Siren className={`w-4 h-4 ${isEmergency ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">
              {isEmergency ? 'DEACTIVATE EMERGENCY' : 'EMERGENCY MODE'}
            </span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg border transition-all ${
              darkMode 
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            }`}
            title="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              className={`p-2 rounded-lg border transition-all relative ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
              }`}
              title="Active Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadAlertsCount}
                </span>
              )}
            </button>
          </div>

          {/* User Profile / Role Badge */}
          <button
            onClick={onLoginClick}
            className={`flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl border transition-all ${
              darkMode 
                ? 'bg-slate-800/90 border-slate-700 hover:border-slate-600' 
                : 'bg-slate-100 border-slate-200 hover:border-slate-300'
            }`}
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-7 h-7 rounded-full object-cover border border-sky-500/40"
            />
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold leading-none flex items-center gap-1">
                {user.name}
                <ShieldCheck className="w-3 h-3 text-sky-500 inline" />
              </div>
              <div className="text-[10px] text-slate-400 capitalize mt-0.5">
                {user.role} • Switch
              </div>
            </div>
            <ChevronDown className="w-3 h-3 opacity-50 ml-0.5" />
          </button>

        </div>

      </div>
    </header>
  );
};
