import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Bed, 
  Stethoscope, 
  Activity, 
  CheckCircle2, 
  Award,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsViewProps {
  darkMode: boolean;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ darkMode }) => {
  const accuracyHistory = [
    { day: 'Day 1', accuracy: 95.2 },
    { day: 'Day 5', accuracy: 96.0 },
    { day: 'Day 10', accuracy: 95.8 },
    { day: 'Day 15', accuracy: 96.4 },
    { day: 'Day 20', accuracy: 97.1 },
    { day: 'Day 25', accuracy: 96.8 },
    { day: 'Day 30', accuracy: 97.4 }
  ];

  const doctorWorkloadData = [
    { dept: 'ER & Trauma', activeDocs: 12, surgeries: 18 },
    { dept: 'ICU', activeDocs: 8, surgeries: 14 },
    { dept: 'Operation Theatre', activeDocs: 15, surgeries: 24 },
    { dept: 'Cardiology', activeDocs: 9, surgeries: 11 },
    { dept: 'Pediatrics', activeDocs: 7, surgeries: 8 }
  ];

  const pieColors = ['#0284c7', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'];

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header */}
      <div className={`p-6 rounded-2xl border transition-all ${
        darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Performance Telemetry
              </span>
              <span className="text-xs text-slate-400">30-Day Model Validation</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight font-display flex items-center gap-2">
              <BarChart3 className="w-7 h-7 text-sky-500" />
              Hospital Operational Analytics & Model Precision
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Deep analytical dashboard measuring prediction accuracy, doctor workload distribution, bed utilization rates, and emergency triage frequencies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-right">
            <div className="text-[10px] uppercase font-bold text-sky-300">30-Day Mean Model Accuracy</div>
            <div className="text-2xl font-black text-sky-400">96.4% Precision</div>
            <div className="text-[10px] text-slate-400">NABH Clinical Benchmark Compliant</div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ML Model Accuracy Trend */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h2 className="text-sm font-bold mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            30-Day AI Prediction Model Accuracy Trend
          </h2>
          <p className="text-xs text-slate-400 mb-4">Tracking model forecast precision vs post-discharge census logs</p>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accuracyHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[90, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#0f172a' : '#ffffff', 
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }} 
                />
                <Area type="monotone" dataKey="accuracy" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" name="Accuracy %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Doctor Workload Distribution */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h2 className="text-sm font-bold mb-1 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-indigo-400" />
            Doctor Roster & Surgical Procedure Workload
          </h2>
          <p className="text-xs text-slate-400 mb-4">Active clinical physicians vs procedures conducted today</p>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={doctorWorkloadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="dept" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#0f172a' : '#ffffff', 
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="activeDocs" fill="#6366f1" radius={[4, 4, 0, 0]} name="Active Doctors" />
                <Bar dataKey="surgeries" fill="#10b981" radius={[4, 4, 0, 0]} name="Surgeries Conducted" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
