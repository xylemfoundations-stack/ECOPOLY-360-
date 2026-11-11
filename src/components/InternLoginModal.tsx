import React, { useState } from 'react';
import { StudentIntern, Language } from '../types/survey';
import { KeyRound, UserCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

interface InternLoginModalProps {
  interns: StudentIntern[];
  activeInternId: string;
  onLogin: (internId: string) => void;
  onClose: () => void;
  lang: Language;
}

export const InternLoginModal: React.FC<InternLoginModalProps> = ({
  interns,
  activeInternId,
  onLogin,
  onClose,
  lang
}) => {
  const [selectedId, setSelectedId] = useState(activeInternId);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedIntern = interns.find((i) => i.id === selectedId) || interns[0];

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIntern) return;

    if (selectedIntern.pin === pin.trim()) {
      setError(false);
      setSuccess(true);
      setTimeout(() => {
        onLogin(selectedIntern.id);
        onClose();
      }, 500);
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === 'ta' ? 'மாணவர் ஆய்வாளர் உள்நுழைவு' : 'Student Intern PIN Login'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleVerify} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'மாணவர் ஆய்வாளரை தேர்வு செய்க' : 'Select Intern Profile'}
            </label>
            <select
              value={selectedId}
              onChange={(e) => {
                setSelectedId(e.target.value);
                setError(false);
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs focus:ring-2 focus:ring-emerald-500"
            >
              {interns.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name} ({i.id}) · {i.department.replace('Department of ', '')}
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] space-y-1 text-slate-500">
            <p>
              <strong>College:</strong> {selectedIntern.college}
            </p>
            <p>
              <strong>Supervisor:</strong> {selectedIntern.assignedSupervisor}
            </p>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? '4-இலக்க பாதுகாப்பு PIN உள்ளிடவும்' : 'Enter 4-Digit Security PIN'}
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={4}
                autoFocus
                value={pin}
                onChange={(e) => {
                  setError(false);
                  setPin(e.target.value.replace(/\D/g, '').slice(0, 4));
                }}
                placeholder="• • • •"
                className="w-full tracking-[0.6em] text-center text-xl font-mono font-bold px-3 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-4 pointer-events-none" />
            </div>
          </div>

          {error && (
            <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 rounded-xl text-xs flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>
                {lang === 'ta' ? 'தவறான PIN எண். மீண்டும் முயல்க.' : 'Incorrect PIN. Please re-enter.'}
              </span>
            </div>
          )}

          {success && (
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === 'ta' ? 'அங்கீகரிக்கப்பட்டது! ✓' : 'PIN Verified! Logging in...'}</span>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs"
            >
              {lang === 'ta' ? 'ரத்து' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={pin.length < 4}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all ${
                pin.length >= 4 ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-400 cursor-not-allowed'
              }`}
            >
              {lang === 'ta' ? 'உள்நுழைக' : 'Verify & Enter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
