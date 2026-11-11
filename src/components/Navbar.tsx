import React from 'react';
import { Language } from '../types/survey';
import { Globe, PlusCircle } from 'lucide-react';

interface NavbarProps {
  currentScreen: 'dashboard' | 'survey' | 'admin' | 'campus_admin' | 'super_admin';
  onNavigate: (screen: 'dashboard' | 'survey' | 'admin' | 'campus_admin' | 'super_admin') => void;
  lang: Language;
  onToggleLang: () => void;
  onNewSurvey: () => void;
  hasActiveDraft: boolean;
  isSuperAdminAuthenticated?: boolean;
  onOpenSuperAdminLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  lang,
  onToggleLang,
  onNewSurvey,
  hasActiveDraft,
  isSuperAdminAuthenticated,
  onOpenSuperAdminLogin
}) => {
  const handleSuperAdminClick = () => {
    if (isSuperAdminAuthenticated) {
      onNavigate('super_admin');
    } else if (onOpenSuperAdminLogin) {
      onOpenSuperAdminLogin();
    } else {
      onNavigate('super_admin');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-left flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
            360
          </span>
          <span>ECOPOLY 360°</span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentScreen === 'dashboard'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {lang === 'ta' ? 'ஆய்வாளர் முகப்பு' : 'Surveyor Dashboard'}
          </button>

          <button
            onClick={() => onNavigate('survey')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentScreen === 'survey'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{lang === 'ta' ? 'கள ஆய்வு' : 'Field Survey'}</span>
            {hasActiveDraft && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active draft in progress" />
            )}
          </button>

          <button
            onClick={() => onNavigate('campus_admin')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentScreen === 'campus_admin'
                ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                : 'hover:text-slate-900 dark:hover:text-white font-semibold text-emerald-700 dark:text-emerald-400'
            }`}
          >
            <span>{lang === 'ta' ? 'வளாக நிர்வாகம்' : 'Campus Admin'}</span>
          </button>

          <button
            onClick={handleSuperAdminClick}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentScreen === 'super_admin'
                ? 'bg-slate-900 text-emerald-400 font-semibold shadow-xs border border-slate-700'
                : 'hover:text-slate-900 dark:hover:text-white text-slate-700 dark:text-slate-300'
            }`}
            title="Xylem Foundations Platform Administration"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span>Super Admin</span>
            <span className="text-[10px] uppercase font-mono px-1 py-0.2 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
              Xylem
            </span>
          </button>

          <button
            onClick={() => onNavigate('admin')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentScreen === 'admin'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {lang === 'ta' ? 'ஆய்வு அறிக்கைகள்' : 'Survey Review'}
          </button>
        </nav>

        {/* Zone 3: Actions - Language Toggle & New Survey */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleLang}
            title="Switch Language / மொழியை மாற்றுக"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>

          <button
            onClick={onNewSurvey}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 active:scale-95 transition-all whitespace-nowrap shrink-0 shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'புதிய ஆய்வு' : 'New Survey'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
