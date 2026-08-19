import React from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  TrendingUp, 
  CloudRain, 
  Activity, 
  Calendar, 
  Users, 
  CheckCircle2, 
  BrainCircuit,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { mockPredictionFactors } from '../data/mockData';

interface ExplainableAIViewProps {
  darkMode: boolean;
  onNavigate: (tab: string) => void;
}

export const ExplainableAIView: React.FC<ExplainableAIViewProps> = ({ darkMode, onNavigate }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Epidemiology': return <Activity className="w-4 h-4 text-rose-400" />;
      case 'Weather': return <CloudRain className="w-4 h-4 text-sky-400" />;
      case 'Seasonality': return <Calendar className="w-4 h-4 text-purple-400" />;
      case 'Events': return <Users className="w-4 h-4 text-amber-400" />;
      case 'Historical': return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      default: return <Sparkles className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border transition-all ${
        darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Core Hackathon Feature
              </span>
              <span className="text-xs text-slate-400">Transparent AI Governance</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight font-display flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-purple-400" />
              Explainable AI (XAI) Attribution Module
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Hospital leadership cannot act on black-box predictions. Every forecast is decomposed into audited causal features, weights, and natural language justifications.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-right">
            <div className="text-[10px] uppercase tracking-wider font-bold text-purple-300">
              Overall AI Confidence
            </div>
            <div className="text-2xl font-black text-purple-400">
              94.2% Precision
            </div>
            <div className="text-[10px] text-slate-400">
              SHAP / LIME Value Decomposed
            </div>
          </div>
        </div>
      </div>

      {/* Main Prediction Formula Card */}
      <div className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700' : 'bg-gradient-to-r from-slate-50 via-sky-50/50 to-slate-50 border-slate-200 shadow-sm'
      }`}>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Forecast Synthesis Equation
        </div>
        <div className="flex flex-wrap items-center gap-3 text-lg font-mono font-black">
          <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-100 border border-slate-700">
            Baseline: 184
          </span>
          <span className="text-slate-500">+</span>
          <span className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
            Viral Index (+22)
          </span>
          <span className="text-slate-500">+</span>
          <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            Weekend (+18)
          </span>
          <span className="text-slate-500">+</span>
          <span className="px-3 py-1 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
            Rain (+15)
          </span>
          <span className="text-slate-500">+</span>
          <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            Crowd (+12)
          </span>
          <span className="text-slate-500">+</span>
          <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Growth (+8)
          </span>
          <span className="text-slate-500">-</span>
          <span className="px-3 py-1 rounded-lg bg-slate-700 text-slate-300 border border-slate-600">
            Discharges (-11)
          </span>
          <span className="text-sky-500 font-extrabold text-2xl ml-auto">
            = 218 Patients
          </span>
        </div>
      </div>

      {/* Factor Decomposition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPredictionFactors.map((f) => {
          const isIncrease = f.direction === 'increase';

          return (
            <div
              key={f.id}
              className={`p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
                darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-700/50">
                    {getCategoryIcon(f.category)}
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {f.category}
                  </span>
                </div>
                <span className={`text-sm font-black font-mono px-2.5 py-0.5 rounded-lg ${
                  isIncrease 
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {f.impactValue > 0 ? `+${f.impactValue}` : f.impactValue} Patients
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-100 dark:text-slate-100 mb-2">
                {f.factor}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {f.description}
              </p>

              <div className="pt-3 border-t border-slate-700/40 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Feature Confidence</span>
                <span className="text-sky-400 font-bold">{f.confidence}% audited</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Natural Language AI Commentary Box */}
      <div className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2 mb-3">
          <BrainCircuit className="w-5 h-5 text-sky-400" />
          <h2 className="text-sm font-bold text-slate-200">
            Natural Language Causal Interpretation
          </h2>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 font-mono text-xs text-slate-300 leading-relaxed space-y-2">
          <p>
            <strong className="text-purple-400">[XAI AUDIT LOG]</strong> Model evaluation completed at 09:44 AM local time.
          </p>
          <p>
            "The forecasted patient total of <strong className="text-sky-300">218 admissions</strong> represents a <strong className="text-amber-300">+18.5% deviation</strong> above standard baseline. Primary pressure originates from an active viral respiratory outbreak in the North district (+22 admissions), compounded by rain-induced road hazards (+15 admissions) and typical Saturday emergency triage surges (+18 admissions)."
          </p>
          <p className="text-emerald-400">
            ✓ Recommendation: Proceed to Recommendations view to execute pre-emptive bed & staff deployment.
          </p>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onNavigate('recommendations')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-all"
          >
            <Zap className="w-4 h-4" />
            View AI Recommended Actions
          </button>
        </div>
      </div>

    </div>
  );
};
