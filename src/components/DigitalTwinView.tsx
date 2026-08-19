import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Activity, 
  Bed, 
  Stethoscope, 
  UserCheck, 
  Thermometer, 
  Wind, 
  X, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { Department } from '../types';
import { mockDepartments } from '../data/mockData';

interface DigitalTwinViewProps {
  darkMode: boolean;
}

export const DigitalTwinView: React.FC<DigitalTwinViewProps> = ({ darkMode }) => {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const getStatusBg = (status: 'green' | 'yellow' | 'red') => {
    switch (status) {
      case 'green':
        return 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20';
      case 'yellow':
        return 'bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20';
      case 'red':
        return 'bg-rose-500/10 border-rose-500/40 text-rose-400 hover:bg-rose-500/20 animate-pulse';
    }
  };

  const getStatusBadge = (status: 'green' | 'yellow' | 'red') => {
    switch (status) {
      case 'green': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white">AVAILABLE</span>;
      case 'yellow': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950">NEARLY FULL</span>;
      case 'red': return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white animate-pulse">CRITICAL</span>;
    }
  };

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
                Interactive Spatial Simulation
              </span>
              <span className="text-xs text-slate-400">Live IoT Sensor Feed</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight font-display flex items-center gap-2">
              <Building2 className="w-7 h-7 text-sky-500" />
              Digital Hospital Twin Map
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Interactive 2D spatial layout showing real-time department status, bed capacity, temperature, and waiting queues. Click any department node for deep telemetry.
            </p>
          </div>

          {/* Color Legend */}
          <div className="flex items-center gap-3 text-xs font-semibold bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3 h-3 rounded-full bg-emerald-500" /> Green (&lt;75%)
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-3 h-3 rounded-full bg-amber-500" /> Yellow (75-90%)
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" /> Red (&gt;90%)
            </span>
          </div>
        </div>
      </div>

      {/* 2D Floor Plan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockDepartments.map((dept) => {
          const occPct = Math.round((dept.occupiedBeds / dept.totalBeds) * 100);

          return (
            <div
              key={dept.id}
              onClick={() => setSelectedDept(dept)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${getStatusBg(dept.status)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold opacity-75">{dept.code}</span>
                {getStatusBadge(dept.status)}
              </div>

              <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 mb-1">
                {dept.name}
              </h3>

              <div className="text-xs opacity-75 mb-3">
                {dept.floor}
              </div>

              {/* Progress bar */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-[11px] font-mono">
                  <span>Occupancy</span>
                  <span className="font-bold">{dept.occupiedBeds}/{dept.totalBeds} ({occPct}%)</span>
                </div>
                <div className="w-full bg-slate-800/60 rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full ${
                    occPct > 90 ? 'bg-rose-500' : occPct > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} style={{ width: `${occPct}%` }} />
                </div>
              </div>

              {/* IoT Stats */}
              <div className="pt-3 border-t border-slate-700/30 flex items-center justify-between text-[11px] opacity-90">
                <span className="flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5" /> {dept.temperature}°C
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5" /> O2: {dept.oxygenLevel}%
                </span>
                <span className="flex items-center gap-1 font-bold">
                  Queue: {dept.waitingQueue}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-over / Modal for Selected Department */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl p-6 rounded-2xl border shadow-2xl space-y-6 ${
            darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between border-b pb-4 border-slate-700/60">
              <div>
                <span className="text-xs font-mono font-bold text-sky-400">{selectedDept.code} • {selectedDept.floor}</span>
                <h2 className="text-xl font-bold flex items-center gap-2 mt-0.5">
                  {selectedDept.name}
                  {getStatusBadge(selectedDept.status)}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedDept(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Department Detailed Telemetry */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Total Beds</div>
                <div className="text-xl font-black text-sky-400 mt-1">{selectedDept.totalBeds}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Occupied</div>
                <div className="text-xl font-black text-amber-400 mt-1">{selectedDept.occupiedBeds}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">ICU Capacity</div>
                <div className="text-xl font-black text-rose-400 mt-1">{selectedDept.icuOccupied}/{selectedDept.icuTotal}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Waiting Queue</div>
                <div className="text-xl font-black text-purple-400 mt-1">{selectedDept.waitingQueue}</div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between">
                <span className="font-bold text-slate-300">Department Head:</span>
                <span className="text-sky-400 font-semibold">{selectedDept.headDoctor}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between">
                <span className="font-bold text-slate-300">Active Staff Roster:</span>
                <span className="text-slate-300">{selectedDept.doctorsCount} Doctors • {selectedDept.nursesCount} Nurses</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between">
                <span className="font-bold text-slate-300">Ambient Climate & O2:</span>
                <span className="text-emerald-400 font-bold">{selectedDept.temperature}°C Temp • {selectedDept.oxygenLevel}% O2 Flow</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedDept(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-white"
              >
                Close Spatial Analytics
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
