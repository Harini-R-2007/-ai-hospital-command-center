import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  Bed, 
  Stethoscope, 
  UserCheck, 
  Activity, 
  Wind, 
  Cylinder, 
  Siren, 
  Gauge, 
  TrendingUp, 
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  Sliders
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface PredictionViewProps {
  darkMode: boolean;
  onNavigate: (tab: string) => void;
}

export const PredictionView: React.FC<PredictionViewProps> = ({ darkMode, onNavigate }) => {
  const [modelType, setModelType] = useState<'xgboost' | 'randomforest' | 'ensemble'>('ensemble');
  const [isSimulating, setIsSimulating] = useState(false);

  const featureImportance = [
    { feature: 'City Viral & Respiratory Index', importance: 28, category: 'Epidemiology' },
    { feature: 'Historical Saturday/Sunday Pattern', importance: 24, category: 'Seasonality' },
    { feature: 'Monsoon Precipitation (mm)', importance: 18, category: 'Weather' },
    { feature: 'Local Stadium / Festival Crowd', importance: 16, category: 'Events' },
    { feature: '5-Year Baseline Inflow Growth', importance: 14, category: 'Historical' }
  ];

  const departmentPredictions = [
    { name: 'Emergency & Trauma', today: 36, predicted: 48, delta: '+33%', status: 'Critical Surge' },
    { name: 'Pediatrics', today: 32, predicted: 42, delta: '+31%', status: 'Critical Surge' },
    { name: 'ICU', today: 27, predicted: 33, delta: '+22%', status: 'High Occupancy' },
    { name: 'Cardiology', today: 34, predicted: 39, delta: '+15%', status: 'Elevated' },
    { name: 'General Medical Ward A', today: 45, predicted: 52, delta: '+16%', status: 'Elevated' },
    { name: 'Orthopedics', today: 32, predicted: 34, delta: '+6%', status: 'Stable' }
  ];

  const handleRefreshPrediction = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 800);
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
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-500 border border-sky-500/20">
                Machine Learning Forecasting
              </span>
              <span className="text-xs text-slate-400">Trained on 5,000+ historical admission logs</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight font-display flex items-center gap-2">
              <BrainCircuit className="w-7 h-7 text-sky-500" />
              AI Resource Demand Prediction Engine
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Multi-factor ML models predict tomorrow's patient surge to allow proactive staff dispatching and bed allocation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
              <button
                onClick={() => setModelType('ensemble')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${modelType === 'ensemble' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400'}`}
              >
                Ensemble v4
              </button>
              <button
                onClick={() => setModelType('xgboost')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${modelType === 'xgboost' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400'}`}
              >
                XGBoost
              </button>
              <button
                onClick={() => setModelType('randomforest')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${modelType === 'randomforest' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400'}`}
              >
                Random Forest
              </button>
            </div>

            <button
              onClick={handleRefreshPrediction}
              disabled={isSimulating}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-slate-700 text-white flex items-center gap-2 hover:bg-slate-800 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              Re-Calculate
            </button>
          </div>
        </div>
      </div>

      {/* Main Prediction Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Tomorrow Patient Card */}
        <div className={`p-5 rounded-2xl border relative overflow-hidden ${
          darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none" />
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
            Tomorrow Patient Forecast
          </div>
          <div className="text-3xl font-black tracking-tight text-amber-500 flex items-baseline gap-2">
            218 <span className="text-xs font-bold text-rose-500">+18.5% Surge</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Today: 184 patients • Surge Delta: +34 patients
          </p>
          <div className="mt-3 pt-3 border-t border-slate-700/30 flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-400">Model Confidence</span>
            <span className="text-emerald-500 font-bold">94.2% High Precision</span>
          </div>
        </div>

        {/* Emergency Probability */}
        <div className={`p-5 rounded-2xl border relative overflow-hidden ${
          darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-bl-full pointer-events-none" />
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
            Emergency Triage Risk
          </div>
          <div className="text-3xl font-black tracking-tight text-rose-500 flex items-baseline gap-2">
            82.5% <span className="text-xs font-bold text-rose-400">High Risk</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Probability of ER overcrowding threshold breaching
          </p>
          <div className="mt-3 pt-3 border-t border-slate-700/30 flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-400">Peak Hour Window</span>
            <span className="text-amber-400 font-bold">11 AM - 4 PM</span>
          </div>
        </div>

        {/* Bed & ICU Requirements */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
            Bed & ICU Demand
          </div>
          <div className="text-2xl font-black tracking-tight text-sky-400">
            218 Total Beds
          </div>
          <div className="text-xs text-slate-300 mt-1 flex justify-between">
            <span>Extra Beds Needed: <strong className="text-amber-400">+34</strong></span>
            <span>ICU Required: <strong className="text-rose-400">33</strong></span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-700/30 flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-400">Surge Recommendation</span>
            <button onClick={() => onNavigate('recommendations')} className="text-sky-400 hover:underline">
              Deploy Block C
            </button>
          </div>
        </div>

        {/* Staff Requirements */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
            Staff Roster Demand
          </div>
          <div className="text-2xl font-black tracking-tight text-indigo-400">
            48 Docs / 124 Nurses
          </div>
          <div className="text-xs text-slate-300 mt-1 flex justify-between">
            <span>On-Call Call-In: <strong className="text-rose-400">+4 Nurses</strong></span>
            <span>Ratio: <strong className="text-emerald-400">1:1 ICU</strong></span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-700/30 flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-400">Shift Status</span>
            <span className="text-emerald-400 font-bold">Optimal Coverage</span>
          </div>
        </div>

      </div>

      {/* Feature Importance & Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Feature Importance Matrix */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold flex items-center gap-2">
              <Gauge className="w-4 h-4 text-sky-500" />
              ML Model Feature Importance Weights
            </h2>
            <button 
              onClick={() => onNavigate('explainable')}
              className="text-xs text-sky-500 font-semibold hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Explainable AI
            </button>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Factors driving the XGBoost decision boundary for tomorrow's prediction
          </p>

          <div className="space-y-3">
            {featureImportance.map((f, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{f.feature}</span>
                  <span className="font-mono text-sky-400 font-bold">{f.importance}% weight</span>
                </div>
                <div className="w-full bg-slate-700/60 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full" style={{ width: `${f.importance * 3}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department-wise Demand Breakdown Table */}
        <div className={`p-5 rounded-2xl border ${
          darkMode ? 'bg-slate-800/80 border-slate-700/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h2 className="text-sm font-bold mb-1 flex items-center gap-2">
            <Bed className="w-4 h-4 text-amber-500" />
            Department-Wise Inflow & Surge Projections
          </h2>
          <p className="text-xs text-slate-400 mb-4">Predicted patient count compared against current active admissions</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="pb-2">Department</th>
                  <th className="pb-2 text-center">Today</th>
                  <th className="pb-2 text-center">Predicted</th>
                  <th className="pb-2 text-center">Surge %</th>
                  <th className="pb-2 text-right">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {departmentPredictions.map((d, i) => (
                  <tr key={i} className="hover:bg-slate-700/20 transition-colors">
                    <td className="py-2.5 font-semibold text-slate-200">{d.name}</td>
                    <td className="py-2.5 text-center font-mono">{d.today}</td>
                    <td className="py-2.5 text-center font-mono font-bold text-amber-400">{d.predicted}</td>
                    <td className="py-2.5 text-center font-mono text-rose-400 font-bold">{d.delta}</td>
                    <td className="py-2.5 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.status.includes('Critical') 
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : d.status.includes('High') || d.status.includes('Elevated')
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
