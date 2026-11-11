import React, { useState } from 'react';
import { Shield, Key, Mail, AlertTriangle, CheckCircle2, X, Lock, ExternalLink } from 'lucide-react';
import { PlatformAdminUser } from '../../types/survey';
import { verifySuperAdminAuthorization } from '../../services/storage';

interface SuperAdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (admin: PlatformAdminUser) => void;
}

export const SuperAdminLoginModal: React.FC<SuperAdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [email, setEmail] = useState<string>('admin@xylemfoundations.org');
  const [authCode, setAuthCode] = useState<string>('9009');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsVerifying(true);

    setTimeout(() => {
      const result = verifySuperAdminAuthorization(email, authCode);
      setIsVerifying(false);

      if (result.success && result.user) {
        onSuccess(result.user);
        onClose();
      } else {
        setErrorMsg(result.error || 'Authentication failed. Please verify credentials.');
      }
    }, 400);
  };

  const handleUseExecutiveCredentials = () => {
    setEmail('admin@xylemfoundations.org');
    setAuthCode('9009');
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header with Xylem Foundations Branding */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <Shield className="w-4 h-4" />
            <span>Xylem Foundations · Platform Governance</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Super Admin Authorization</h2>
          <p className="text-xs text-slate-300 mt-1">
            ECOPOLY 360° Multi-Site Platform Administration Access
          </p>
        </div>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-xl flex items-start gap-2.5 text-red-700 dark:text-red-300">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
              <div>
                <p className="font-semibold text-[11px] uppercase tracking-wide">Security Check Failed</p>
                <p className="text-xs mt-0.5 leading-relaxed">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Guidelines for Non-Technical Administrator */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl space-y-2 text-amber-900 dark:text-amber-200">
            <div className="flex items-center justify-between font-semibold text-[11px]">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Authorized Platform Credentials</span>
              </span>
              <button
                type="button"
                onClick={handleUseExecutiveCredentials}
                className="text-emerald-700 dark:text-emerald-400 underline font-bold hover:opacity-80 cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-300">
              Only authorized Xylem Foundations platform trustees can access Super Admin mode.
              Self-promotion without credentials is automatically rejected and logged.
            </p>
            <div className="font-mono text-[11px] bg-white/70 dark:bg-slate-900/80 p-2 rounded-lg border border-amber-200 dark:border-amber-900 space-y-0.5">
              <div>Email: <span className="font-bold text-slate-900 dark:text-white">admin@xylemfoundations.org</span></div>
              <div>PIN / Token: <span className="font-bold text-emerald-700 dark:text-emerald-400">9009</span> <span className="text-slate-400">or XYLEM-SUPER-2026</span></div>
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">
              Authorised Administrator Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@xylemfoundations.org"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Security PIN or Access Token */}
          <div className="space-y-1">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">
              Executive PIN / Access Token *
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="4-digit PIN (9009) or executive token"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isVerifying}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isVerifying ? 'Verifying Authorization...' : 'Authenticate & Enter'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
