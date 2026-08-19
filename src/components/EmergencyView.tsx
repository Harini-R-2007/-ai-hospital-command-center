import React, { useState } from 'react';
import { 
  Siren, 
  AlertTriangle, 
  Users, 
  Bed, 
  Stethoscope, 
  UserCheck, 
  CheckSquare, 
  Square, 
  Clock, 
  ShieldAlert, 
  Activity,
  PlusCircle,
  PhoneCall,
  MapPin
} from 'lucide-react';
import { EmergencyChecklistItem } from '../types';
import { mockPatients } from '../data/mockData';

interface EmergencyViewProps {
  darkMode: boolean;
  isEmergency: boolean;
  onToggleEmergency: () => void;
  onNavigate: (tab: string) => void;
}

export const EmergencyView: React.FC<EmergencyViewProps> = ({
  darkMode,
  isEmergency,
  onToggleEmergency,
  onNavigate
}) => {
  const [checklist, setChecklist] = useState<EmergencyChecklistItem[]>([
    { id: 'c-1', task: 'Deploy Block C Overflow Ward (25 Surge Cots)', assignedTo: 'Nursing Superintendent', completed: true, priority: 'urgent' },
    { id: 'c-2', task: 'Dispatch 6 On-Call Emergency Physicians & Trauma Surgeons', assignedTo: 'Chief Medical Officer', completed: true, priority: 'urgent' },
    { id: 'c-3', task: 'Reserve 8 ICU Ventilators for Inbound Mass Casualty Triage', assignedTo: 'Lead Intensivist', completed: false, priority: 'urgent' },
    { id: 'c-4', task: 'Procure Emergency Expedited Oxygen Delivery (Linde Gas)', assignedTo: 'Inventory Manager', completed: true, priority: 'urgent' },
    { id: 'c-5', task: 'Trigger Regional Patient Redistribution with Apollo Hospital', assignedTo: 'Command Center Director', completed: false, priority: 'standard' },
    { id: 'c-6', task: 'Notify Police & District Disaster Management Cell', assignedTo: 'Public Relations Officer', completed: true, priority: 'standard' }
  ]);

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = checklist.filter((i) => i.completed).length;
  const progressPct = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="space-y-6 pb-8">
      
      {/* High Impact Emergency Banner */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isEmergency 
          ? 'bg-gradient-to-r from-rose-950 via-red-900 to-rose-950 border-rose-500 text-white shadow-2xl shadow-rose-900/50 animate-pulse' 
          : 'bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border-rose-900/60 text-white'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-600/40">
              <Siren className="w-8 h-8 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white">
                  CODE RED PROTOCOL ACTIVE
                </span>
                <span className="text-xs text-rose-300 font-bold">Scenario: Mass Casualty / Outbreak Spike</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight font-display">
                Emergency Command & Surge Response Center
              </h1>
              <p className="text-xs text-rose-200 mt-1 max-w-2xl">
                Actual patient arrival (<strong className="text-amber-300">260 patients</strong>) has exceeded initial predictions (<strong className="text-white">180 patients</strong>) by <strong className="text-amber-300">+44.4%</strong>. Emergency response protocols initiated.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleEmergency}
              className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wide uppercase transition-all shadow-lg ${
                isEmergency
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/30'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
              }`}
            >
              {isEmergency ? 'Deactivate Emergency' : 'Trigger Emergency Mode'}
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Surge Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-800/80 text-rose-100">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-1">
            Actual vs Forecast
          </div>
          <div className="text-3xl font-black text-rose-400 flex items-baseline gap-2">
            260 <span className="text-xs text-amber-300">+80 Over Model</span>
          </div>
          <p className="text-xs text-rose-300/80 mt-1">Predicted: 180 • Delta: +44.4%</p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-800/80 text-amber-100">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
            Surge Beds Deployed
          </div>
          <div className="text-3xl font-black text-amber-400">
            25 / 35
          </div>
          <p className="text-xs text-amber-300/80 mt-1">Block C Overflow Ward Active</p>
        </div>

        <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-800/80 text-purple-100">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1">
            Staff Mobilized
          </div>
          <div className="text-3xl font-black text-purple-400">
            +6 Docs / +14 Nurses
          </div>
          <p className="text-xs text-purple-300/80 mt-1">On-Call Call-In Roster Dispatched</p>
        </div>

        <div className="p-5 rounded-2xl bg-sky-950/40 border border-sky-800/80 text-sky-100">
          <div className="text-xs font-bold uppercase tracking-wider text-sky-300 mb-1">
            Hospital Collaboration
          </div>
          <div className="text-3xl font-black text-sky-400">
            12 Transfers
          </div>
          <p className="text-xs text-sky-300/80 mt-1">Re-routed to Apollo Partner</p>
        </div>

      </div>

      {/* Emergency Checklist & Triage Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Emergency Checklist */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              Emergency Response Action Checklist
            </h2>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              {completedCount}/{checklist.length} ({progressPct}%)
            </span>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden mb-4">
            <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
          </div>

          <div className="space-y-2.5">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs flex items-start gap-3 transition-all ${
                  item.completed
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-900/60 border-slate-700/80 text-slate-200 hover:border-slate-600'
                }`}
              >
                {item.completed ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <span className={`font-bold block ${item.completed ? 'line-through opacity-70' : ''}`}>
                    {item.task}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Assigned: {item.assignedTo}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Critical Triage Queue */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold flex items-center gap-2">
              <Users className="w-4 h-4 text-rose-500" />
              Critical Triage Queue (Priority Patients)
            </h2>
            <span className="text-xs text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
              RED Triage Active
            </span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {mockPatients.map((pat) => (
              <div
                key={pat.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 text-xs flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      pat.triage === 'RED' ? 'bg-rose-500 animate-ping' : 'bg-amber-500'
                    }`} />
                    <span className="font-bold text-slate-200">{pat.name}</span>
                    <span className="text-[10px] text-slate-400">({pat.age}y / {pat.gender})</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {pat.department} • Doctor: {pat.doctorAssigned}
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-slate-300">
                    {pat.status}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {pat.admissionDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
