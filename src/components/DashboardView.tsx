import React from 'react';
import { 
  Users, 
  Bed, 
  Activity, 
  Stethoscope, 
  UserCheck, 
  Siren, 
  Wind, 
  Layers, 
  Cylinder, 
  Pill, 
  ShieldAlert, 
  Gauge, 
  Bell, 
  Award,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { mockDepartments, mockHistoricalTrends, mockHourlyFlow } from '../data/mockData';

interface DashboardViewProps {
  darkMode: boolean;
  onNavigate: (tab: string) => void;
  isEmergency: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ darkMode, onNavigate, isEmergency }) => {
  const kpis = [
    { label: "Today's Patients", value: "184", change: "+12%", isPos: false, sub: "Total Admissions", icon: Users, color: "text-sky-500", bg: "bg-sky-500/10" },
    { label: "Predicted Tomorrow", value: "218", change: "+18.5%", isPos: false, sub: "XGBoost ML Model", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10", highlight: true },
    { label: "Available Beds", value: "34", change: "-8", isPos: false, sub: "Out of 322 Total", icon: Bed, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Occupied Beds", value: "244", change: "75.7%", isPos: true, sub: "Capacity Utilized", icon: Layers, color: "text-blue-500", bg: "bg-blue-500/10" },
    
    { label: "ICU Occupancy", value: "88%", change: "+4%", isPos: false, sub: "27/30 Beds Active", icon: Activity, color: "text-rose-500", bg: "bg-rose-500/10" },
    { label: "Doctors Available", value: "42 / 50", change: "84%", isPos: true, sub: "8 In Surgery / ER", icon: Stethoscope, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "Nurses Available", value: "112 / 130", change: "86%", isPos: true, sub: "18 On Active Shifts", icon: UserCheck, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Emergency Cases", value: "14", change: "+3", isPos: false, sub: "Critical Triage", icon: Siren, color: "text-rose-600", bg: "bg-rose-600/10" },

    { label: "Ventilator Availability", value: "18 / 25", change: "72% In Use", isPos: true, sub: "7 Reserve Units", icon: Wind, color: "text-cyan-500", bg: "bg-cyan-500/10" },
    { label: "Wheelchairs", value: "45 / 60", change: "Occupied", isPos: true, sub: "15 Ready in ER", icon: Layers, color: "text-teal-500", bg: "bg-teal-500/10" },
    { label: "Oxygen Cylinders", value: "180", change: "5.1 Days", isPos: true, sub: "35 Burn Rate/Day", icon: Cylinder, color: "text-sky-600", bg: "bg-sky-600/10" },
    { label: "Medicine Inventory", value: "89%", change: "2 Low Stock", isPos: false, sub: "Reorder Required", icon: Pill, color: "text-emerald-600", bg: "bg-emerald-600/10" },

    { label: "Hospital Risk Level", value: "ELEVATED", change: "Code Orange", isPos: false, sub: "Monsoon Surge Risk", icon: ShieldAlert, color: "text-amber-600", bg: "bg-amber-600/10", risk: true },
    { label: "Prediction Confidence", value: "94.2%", change: "+0.8%", isPos: true, sub: "Validated ML Ensemble", icon: Gauge, color: "text-violet-500", bg: "bg-violet-500/10" },
    { label: "Active Alerts", value: "3 Critical", change: "Attention", isPos: false, sub: "ER, ICU, Pediatrics", icon: Bell, color: "text-rose-500", bg: "bg-rose-500/10" },
    { label: "Performance Score", value: "92 / 100", change: "A+ Grade", isPos: true, sub: "NABH Benchmark", icon: Award, color: "text-emerald-500", bg: "bg-emerald-500/10" }
  ];

  return (
    <div className="space-y-6 pb-8">
      
      {/* Top Banner / Welcome Header */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isEmergency 
          ? 'bg-gradient-to-r from-rose-950 via-red-900 to-rose-950 border-rose-600 text-white shadow-xl shadow-rose-950/40' 
          : darkMode 
            ? 'bg-slate-800/80 border-slate-700/80 text-white' 
            : 'bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border-slate-800 text-white shadow-lg shadow-slate-900/10'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/30">
                Executive Overview
              </span>
              <span className="text-xs text-slate-300">Updated 1 min ago</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight font-display">
              Hospital Operations Command Center
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Real-time predictive intelligence active. Hospital capacity is <strong className="text-amber-300">ELEVATED (75.7%)</strong>. 
              Tomorrow patient inflow is forecasted to reach <strong className="text-sky-300">218 admissions</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('prediction')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-white flex items-center gap-2 shadow-lg shadow-sky-500/25 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              View AI Explainability
            </button>
            <button
              onClick={() => onNavigate('simulation')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 flex items-center gap-2 transition-all"
            >
              What-If Simulator
            </button>
          </div>
        </div>
      </div>

      {/* 16 KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-3">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
                kpi.highlight 
                  ? 'bg-gradient-to-b from-amber-500/10 to-amber-600/5 border-amber-500/40 dark:border-amber-500/30 shadow-md shadow-amber-500/5'
                  : darkMode 
                    ? 'bg-slate-800/80 border-slate-700/80 text-slate-100 hover:border-slate-600' 
                    : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {kpi.change && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    kpi.risk 
                      ? 'bg-amber-500/20 text-amber-500 font-extrabold'
                      : kpi.isPos 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {kpi.change}
                  </span>
                )}
              </div>
              <div className="text-lg font-black tracking-tight leading-tight">
                {kpi.value}
              </div>
              <div className="text-[11px] font-medium opacity-80 truncate mt-0.5">
                {kpi.label}
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-1">
                {kpi.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Patient Flow Trend Chart */}
        <div className={`lg:col-span-2 p-5 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sky-500" />
                Patient Admission Trend & 3-Day ML Forecast
              </h2>
              <p className="text-xs text-slate-400">Comparing actual historical admissions vs predicted demand curve</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-400">
                <span className="w-3 h-3 rounded-sm bg-sky-500" /> Actual
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-400">
                <span className="w-3 h-3 rounded-sm bg-amber-500" /> Predicted
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockHistoricalTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[120, 260]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#0f172a' : '#ffffff', 
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }} 
                />
                <Area type="monotone" dataKey="actual" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" name="Actual Patients" />
                <Area type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={3} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorPred)" name="Predicted Patients" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700/30 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-amber-500 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Peak surge expected tomorrow (Saturday) between 11:00 AM - 04:00 PM.
            </span>
            <button 
              onClick={() => onNavigate('prediction')}
              className="hover:text-sky-400 flex items-center gap-1 font-semibold text-sky-500"
            >
              Detailed ML Breakdown <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Col: Department Occupancy Summary */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold flex items-center gap-2">
              <Bed className="w-4 h-4 text-emerald-500" />
              Department Occupancy
            </h2>
            <button 
              onClick={() => onNavigate('digitaltwin')}
              className="text-xs text-sky-500 font-semibold hover:underline"
            >
              View Map
            </button>
          </div>

          <div className="space-y-3.5">
            {mockDepartments.slice(0, 6).map((dept) => {
              const pct = Math.round((dept.occupiedBeds / dept.totalBeds) * 100);
              const colorClass = pct > 88 ? 'bg-rose-500' : pct > 75 ? 'bg-amber-500' : 'bg-emerald-500';

              return (
                <div key={dept.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 dark:text-slate-200 truncate max-w-[140px]">
                      {dept.name}
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">
                      {dept.occupiedBeds}/{dept.totalBeds} beds ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700/70 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${colorClass}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-900/50 dark:bg-slate-900/80 border border-slate-700/50 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <p className="text-[11px] text-slate-300">
              <strong className="text-amber-400">ER & Pediatrics Warning:</strong> Reaching 90%+ capacity threshold. AI recommends opening Block C overflow beds.
            </p>
          </div>
        </div>

      </div>

      {/* Hourly Flow + Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Hourly Flow */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h2 className="text-sm font-bold mb-1 flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-500" />
            Today's Hourly Patient Flow (Arrivals vs Discharges)
          </h2>
          <p className="text-xs text-slate-400 mb-4">Intra-day inflow peaks during morning and evening emergency triage shifts</p>
          
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockHourlyFlow} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#0f172a' : '#ffffff', 
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="arrivals" fill="#0284c7" radius={[4, 4, 0, 0]} name="Arrivals" />
                <Bar dataKey="discharges" fill="#10b981" radius={[4, 4, 0, 0]} name="Discharges" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold flex items-center gap-2">
              <Bell className="w-4 h-4 text-rose-500" />
              Live Command Feed & Active Alerts
            </h2>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs flex items-start gap-2.5">
              <Siren className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-rose-400 flex items-center justify-between">
                  <span>CRITICAL SURGE ALERT</span>
                  <span className="text-[10px] text-slate-400">09:42 AM</span>
                </div>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  ER admissions passed 90% threshold. 4 trauma arrivals inbound from Expressway incident.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-start gap-2.5">
              <Pill className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-amber-400 flex items-center justify-between">
                  <span>INVENTORY WARNING</span>
                  <span className="text-[10px] text-slate-400">09:15 AM</span>
                </div>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Meropenem antibiotics stock down to 2.7 days burn rate limit. Reorder requested.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-sky-300 flex items-center justify-between">
                  <span>AI ML MODEL RETRAINED</span>
                  <span className="text-[10px] text-slate-400">08:00 AM</span>
                </div>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Model v4 ensemble accuracy updated to 94.2% after incorporating monsoon radar data.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
