import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Bed, 
  UserCheck, 
  Package, 
  Network, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { Recommendation } from '../types';
import { mockRecommendations } from '../data/mockData';

interface RecommendationsViewProps {
  darkMode: boolean;
  onNavigate: (tab: string) => void;
  onUpdatePendingCount?: (count: number) => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({ darkMode, onNavigate }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations);
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  const handleApplyRecommendation = (id: string) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: 'applied' } : rec))
    );
  };

  const handleDismissRecommendation = (id: string) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: 'dismissed' } : rec))
    );
  };

  const filteredRecs = recommendations.filter((rec) => {
    if (filterPriority === 'ALL') return true;
    return rec.priority === filterPriority;
  });

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'HIGH':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'MEDIUM':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
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
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Actionable Decision Support
              </span>
              <span className="text-xs text-slate-400">Automated Operational Directives</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight font-display flex items-center gap-2">
              <Zap className="w-7 h-7 text-amber-400" />
              AI Recommendation & Execution Engine
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Automated system directives calculated from predictive surge analytics. Execute actions with 1-click to reallocate beds, staff, and inventory.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter Priority:
            </span>
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  filterPriority === p
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecs.map((rec) => {
          const isApplied = rec.status === 'applied';
          const isDismissed = rec.status === 'dismissed';

          return (
            <div
              key={rec.id}
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                isApplied
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                  : isDismissed
                    ? 'opacity-50 bg-slate-900/40 border-slate-800'
                    : darkMode
                      ? 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                      : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Content */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 text-[10px] font-black rounded-lg border uppercase tracking-wider ${getPriorityStyle(rec.priority)}`}>
                      {rec.priority} PRIORITY
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-700/60 text-slate-300 capitalize">
                      {rec.actionType} action
                    </span>
                    {isApplied && (
                      <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-lg bg-emerald-500 text-white flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> EXECUTED & ACTIVE
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-100 dark:text-slate-100">
                    {rec.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                      <span className="font-bold text-amber-400 block mb-0.5">Expected Impact:</span>
                      <span className="text-slate-300">{rec.expectedImpact}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                      <span className="font-bold text-sky-400 block mb-0.5">AI Causal Rationale:</span>
                      <span className="text-slate-300">{rec.reason}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {!isApplied && !isDismissed && (
                    <>
                      <button
                        onClick={() => handleDismissRecommendation(rec.id)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-all"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() => handleApplyRecommendation(rec.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all font-display"
                      >
                        <Zap className="w-4 h-4 fill-slate-950" />
                        Execute Action
                      </button>
                    </>
                  )}
                  {isApplied && (
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> System Updated
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
