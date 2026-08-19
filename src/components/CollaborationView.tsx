import React, { useState } from 'react';
import { 
  Network, 
  MapPin, 
  PhoneCall, 
  Bed, 
  Activity, 
  Send, 
  CheckCircle2, 
  X,
  Building
} from 'lucide-react';
import { NearbyHospital } from '../types';
import { mockNearbyHospitals } from '../data/mockData';

interface CollaborationViewProps {
  darkMode: boolean;
}

export const CollaborationView: React.FC<CollaborationViewProps> = ({ darkMode }) => {
  const [hospitals, setHospitals] = useState<NearbyHospital[]>(mockNearbyHospitals);
  const [selectedHospital, setSelectedHospital] = useState<NearbyHospital | null>(null);
  const [transferSuccess, setTransferSuccess] = useState<boolean>(false);
  const [patientCountToTransfer, setPatientCountToTransfer] = useState<number>(4);

  const handleInitiateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      setSelectedHospital(null);
    }, 1500);
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
                Regional Healthcare Network
              </span>
              <span className="text-xs text-slate-400">Inter-Hospital Emergency Dispatch</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight font-display flex items-center gap-2">
              <Network className="w-7 h-7 text-sky-500" />
              Nearby Hospital Network & Collaboration
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              When internal surge capacity reaches critical thresholds, coordinate stable patient transfers to nearby regional trauma centers in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Network Hospitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hospitals.map((hosp) => (
          <div
            key={hosp.id}
            className={`p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-sky-500" />
                <span className="font-mono text-xs font-bold text-slate-400">{hosp.traumaLevel}</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                hosp.status === 'open' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : hosp.status === 'limited'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {hosp.status.toUpperCase()}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 mb-1">
              {hosp.name}
            </h3>

            <p className="text-xs text-slate-400 flex items-center gap-1 mb-4">
              <MapPin className="w-3.5 h-3.5 text-sky-400" /> {hosp.address} ({hosp.distanceKm} km away)
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4 text-center">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Available Beds</div>
                <div className="text-xl font-black text-emerald-400 mt-0.5">{hosp.availableBeds}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Available ICU</div>
                <div className="text-xl font-black text-sky-400 mt-0.5">{hosp.availableICU}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/40 flex items-center justify-between">
              <a 
                href={`tel:${hosp.emergencyContact}`}
                className="text-xs font-bold text-sky-400 hover:underline flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" /> {hosp.emergencyContact}
              </a>

              <button
                onClick={() => setSelectedHospital(hosp)}
                disabled={hosp.status === 'full'}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  hosp.status === 'full'
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/20'
                }`}
              >
                <Send className="w-3.5 h-3.5" /> Transfer Patients
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Transfer Request Modal */}
      {selectedHospital && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-700 text-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-700">
              <h2 className="text-base font-bold flex items-center gap-2">
                <Send className="w-5 h-5 text-sky-400" />
                Patient Transfer Protocol Directive
              </h2>
              <button onClick={() => setSelectedHospital(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {transferSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-bold text-xs space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p>Transfer Protocol Authorized by Command Center!</p>
              </div>
            ) : (
              <form onSubmit={handleInitiateTransfer} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-bold">Target Hospital</label>
                  <div className="p-2.5 rounded-xl bg-slate-800 font-bold text-slate-200">
                    {selectedHospital.name} ({selectedHospital.distanceKm} km)
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-bold">Number of Stable Patients to Transfer</label>
                  <input 
                    type="number" min={1} max={selectedHospital.availableBeds}
                    value={patientCountToTransfer}
                    onChange={(e) => setPatientCountToTransfer(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 font-bold text-slate-100"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Available Beds at Target: {selectedHospital.availableBeds}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700 flex justify-end gap-2">
                  <button
                    type="button" onClick={() => setSelectedHospital(null)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold"
                  >
                    Dispatch Transfer Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
