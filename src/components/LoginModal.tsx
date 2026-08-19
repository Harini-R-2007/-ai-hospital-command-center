import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User as UserIcon, 
  Stethoscope, 
  Building2, 
  X, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { User } from '../types';
import { loginUser } from '../services/api';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  darkMode: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  darkMode
}) => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'doctor'>('admin');
  const [email, setEmail] = useState<string>('admin@hospital.org');
  const [password, setPassword] = useState<string>('••••••••');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRoleSelect = (role: 'admin' | 'doctor') => {
    setSelectedRole(role);
    setEmail(role === 'admin' ? 'admin@hospital.org' : 'doctor@hospital.org');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await loginUser(selectedRole, email, password);
      if (res.user) {
        onLoginSuccess(res.user);
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-5 transition-all ${
        darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 border-slate-700/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500 text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display">
                AI Hospital OS Secure Login
              </h2>
              <span className="text-[10px] text-slate-400 block">
                JWT Role-Based Access Control
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Quick Role Selection */}
        <div>
          <label className="text-xs font-bold text-slate-400 block mb-2">
            Select Demo Persona:
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => handleRoleSelect('admin')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                selectedRole === 'admin'
                  ? 'bg-sky-500/20 border-sky-500 text-sky-400 font-black'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Administrator</span>
              <span className="text-[9px] font-normal text-slate-400">Full System Directives</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('doctor')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                selectedRole === 'doctor'
                  ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400 font-black'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Stethoscope className="w-5 h-5" />
              <span>Doctor / Specialist</span>
              <span className="text-[9px] font-normal text-slate-400">Clinical Overview</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="text-slate-400 block mb-1 font-bold">User Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 outline-none focus:border-sky-500 font-mono"
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-bold">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 outline-none focus:border-sky-500 font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl font-bold bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all"
            >
              <span>{isLoading ? 'Authenticating...' : `Login as ${selectedRole === 'admin' ? 'Administrator' : 'Doctor'}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
