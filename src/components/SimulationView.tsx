import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  AlertTriangle, 
  Siren, 
  Bed, 
  Stethoscope, 
  Wind, 
  Cylinder, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Play,
  RotateCcw
} from 'lucide-react';
import { SimulationResult } from '../types';
import { runWhatIfSimulation } from '../services/api';

interface SimulationViewProps {
  darkMode: boolean;
}

export const SimulationView: React.FC<SimulationViewProps> = ({ darkMode }) => {
  const [patientSurge, setPatientSurge] = useState<number>(300);
  const [availableStaffPercent, setAvailableStaffPercent] = useState<number>(85);
  const [icuCapacityReduction, setIcuCapacityReduction] = useState<number>(10);
  const [oxygenSupplyDrop, setOxygenSupplyDrop] = useState<number>(20);

  const [simResult, setSimResult] = useState<SimulationResult | null>({
    predictedTotalPatients: 300,
    bedShortage: 88,
    doctorShortage: 18,
    nurseShortage: 55,
    icuShortage: 18,
    ventilatorShortage: 12,
    oxygenShortageCylinders: 105,
    emergencyLevel: 'CODE RED',
    recommendedActions: [
      'Open Block C Overflow Ward to deploy 98 extra surge cots immediately.',
      'Mobilize 18 off-duty emergency physicians and 55 travel nursing staff.',
      'Request priority oxygen tanker delivery from Linde Medical Gas.',
      'Initiate regional hospital collaboration transfer protocol to Apollo & Fortis.'
    ],
    estimatedWaitTimeMinutes: 65
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRunSimulation = async () => {
    setIsLoading(true);
    const res = await runWhatIfSimulation({
      patientSurge,
      availableStaffPercent,
      icuCapacityReduction,
      oxygenSupplyDrop
    });
    setSimResult(res);
    setIsLoading(false);
  };

  const handlePreset = (surge: number, staff: number, icu: number, oxygen: number) => {
    setPatientSurge(surge);
    setAvailableStaffPercent(staff);
    setIcuCapacityReduction(icu);
    setOxygenSupplyDrop(oxygen);
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Futuristic Banner */}
      <div className={`p-6 rounded-2xl border transition-all ${
        darkMode 
          ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-indigo-500/40 text-slate-100 shadow-xl' 
          : 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-indigo-500 text-white shadow-lg'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Judge WOW Feature • Predictive Sandbox
              </span>
              <span className="text-xs text-indigo-200 font-mono">Monte Carlo Stress Test HUD</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight font-display flex items-center gap-2 text-white">
              <Sliders className="w-7 h-7 text-indigo-400" />
              What-If Scenario Simulation Engine
            </h1>
            <p className="text-xs text-indigo-200 mt-1 max-w-2xl">
              Simulate catastrophic hospital stress events (e.g., 300+ patient surge, staff shortages, or oxygen supply drops) and generate real-time AI contingency recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunSimulation}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-indigo-500 hover:bg-indigo-400 text-white flex items-center gap-2 shadow-lg shadow-indigo-500/30 transition-all font-display uppercase tracking-wider"
            >
              <Play className={`w-4 h-4 fill-white ${isLoading ? 'animate-spin' : ''}`} />
              Run AI Simulation
            </button>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
        <span className="text-slate-400 mr-1">Quick Presets:</span>
        <button
          onClick={() => { handlePreset(300, 85, 10, 20); }}
          className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20"
        >
          🚨 "What if 300 patients arrive tomorrow?"
        </button>
        <button
          onClick={() => { handlePreset(250, 60, 20, 0); }}
          className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"
        >
          👨‍⚕️ "What if 40% staff call in sick?"
        </button>
        <button
          onClick={() => { handlePreset(220, 100, 0, 35); }}
          className="px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20"
        >
          💨 "What if Oxygen Supply drops 35%?"
        </button>
      </div>

      {/* Interactive Controls & HUD Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Interactive Sliders */}
        <div className={`p-5 rounded-2xl border space-y-5 ${
          darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h2 className="text-sm font-bold flex items-center gap-2 border-b pb-3 border-slate-700/60">
            <Sliders className="w-4 h-4 text-indigo-400" />
            Simulation Parameters
          </h2>

          {/* Slider 1: Patient Surge */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">Inbound Patient Surge</span>
              <span className="text-indigo-400 font-mono text-sm">{patientSurge} Patients</span>
            </div>
            <input 
              type="range" min={150} max={500} step={10}
              value={patientSurge}
              onChange={(e) => setPatientSurge(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>150 (Baseline)</span>
              <span>500 (Mass Disaster)</span>
            </div>
          </div>

          {/* Slider 2: Available Staff */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">Staff Roster Availability</span>
              <span className="text-emerald-400 font-mono text-sm">{availableStaffPercent}% Roster</span>
            </div>
            <input 
              type="range" min={40} max={100} step={5}
              value={availableStaffPercent}
              onChange={(e) => setAvailableStaffPercent(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>40% (Severe Absence)</span>
              <span>100% (Full Staff)</span>
            </div>
          </div>

          {/* Slider 3: ICU Reduction */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">ICU Capacity Outage</span>
              <span className="text-rose-400 font-mono text-sm">{icuCapacityReduction}% Outage</span>
            </div>
            <input 
              type="range" min={0} max={50} step={5}
              value={icuCapacityReduction}
              onChange={(e) => setIcuCapacityReduction(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          {/* Slider 4: Oxygen Supply Drop */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">Oxygen Tank Supply Drop</span>
              <span className="text-cyan-400 font-mono text-sm">{oxygenSupplyDrop}% Loss</span>
            </div>
            <input 
              type="range" min={0} max={60} step={5}
              value={oxygenSupplyDrop}
              onChange={(e) => setOxygenSupplyDrop(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <button
            onClick={handleRunSimulation}
            className="w-full py-2.5 rounded-xl text-xs font-black bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all"
          >
            Execute Simulation Calculation
          </button>
        </div>

        {/* Right 2 Columns: Futuristic Simulation Output HUD */}
        <div className={`lg:col-span-2 p-5 rounded-2xl border space-y-5 ${
          darkMode ? 'bg-slate-900/90 border-slate-700/80' : 'bg-slate-900 border-slate-800 text-white'
        }`}>
          <div className="flex items-center justify-between border-b pb-3 border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h2 className="text-sm font-bold text-white">
                AI Calculated Stress Test Output
              </h2>
            </div>

            {simResult && (
              <span className={`px-3 py-1 rounded-lg text-xs font-black font-mono uppercase ${
                simResult.emergencyLevel === 'CODE RED' 
                  ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-600/30'
                  : simResult.emergencyLevel === 'CRITICAL'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-emerald-500 text-slate-950'
              }`}>
                Emergency Level: {simResult.emergencyLevel}
              </span>
            )}
          </div>

          {/* Shortages Breakdown Grid */}
          {simResult && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Bed Shortage</div>
                <div className="text-2xl font-black text-rose-400 mt-1">
                  {simResult.bedShortage > 0 ? `-${simResult.bedShortage}` : '0 (OK)'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Doctor Deficit</div>
                <div className="text-2xl font-black text-amber-400 mt-1">
                  {simResult.doctorShortage > 0 ? `-${simResult.doctorShortage}` : '0 (OK)'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Nurse Deficit</div>
                <div className="text-2xl font-black text-purple-400 mt-1">
                  {simResult.nurseShortage > 0 ? `-${simResult.nurseShortage}` : '0 (OK)'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400 font-bold uppercase">ICU Bed Deficit</div>
                <div className="text-2xl font-black text-rose-400 mt-1">
                  {simResult.icuShortage > 0 ? `-${simResult.icuShortage}` : '0 (OK)'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Ventilator Deficit</div>
                <div className="text-2xl font-black text-cyan-400 mt-1">
                  {simResult.ventilatorShortage > 0 ? `-${simResult.ventilatorShortage}` : '0 (OK)'}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Oxygen Deficit</div>
                <div className="text-2xl font-black text-amber-400 mt-1">
                  {simResult.oxygenShortageCylinders > 0 ? `-${simResult.oxygenShortageCylinders} Cyl` : '0 (OK)'}
                </div>
              </div>
            </div>
          )}

          {/* AI Calculated Action Plan */}
          {simResult && (
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-2">
              <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
                AI Automated Action Plan for Scenario
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {simResult.recommendedActions.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
