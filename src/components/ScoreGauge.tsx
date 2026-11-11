import React from 'react';
import { Award } from 'lucide-react';
import { SECTORS } from '../data/sectorsData';
import { Language } from '../types/survey';

interface ScoreGaugeProps {
  score: {
    overall: number;
    sectorScores: { [sectorId: string]: number };
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  };
  lang: Language;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, lang }) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'Gold':
        return 'text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'Silver':
        return 'text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700';
      default:
        return 'text-orange-700 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-300 border-orange-300 dark:border-orange-800';
    }
  };

  const getScoreColor = (val: number) => {
    if (val >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (val >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-rose-600 dark:text-rose-400';
  };

  const getScoreBarBg = (val: number) => {
    if (val >= 80) return 'bg-emerald-600';
    if (val >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {lang === 'ta'
                ? 'ECOPOLY 360° சுற்றுச்சூழல் நிலைப்புத்தன்மை குறியீடு'
                : 'ECOPOLY 360° Baseline Sustainability Index'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {lang === 'ta'
              ? '12 நிலைத்தன்மை பிரிவுகளில் அளவிடப்பட்ட முழுமையான தர மதிப்பீடு'
              : 'Holistic benchmark computed across all 12 ECOPOLY sustainability sectors'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ${getTierColor(
              score.tier
            )}`}
          >
            <Award className="w-4 h-4" />
            <span>
              {score.tier} {lang === 'ta' ? 'சான்று நிலை' : 'Tier Certification'}
            </span>
          </div>

          <div className="text-right">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums">
              {score.overall}
            </span>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500"> / 100</span>
          </div>
        </div>
      </div>

      {/* 12 Sectors Grid breakdown */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {SECTORS.map((sec) => {
          const val = score.sectorScores[sec.id] || 0;
          return (
            <div
              key={sec.id}
              className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 line-clamp-1">
                  {lang === 'ta' ? sec.titleTa : sec.titleEn}
                </span>
                <span className={`text-xs font-bold tabular-nums shrink-0 ${getScoreColor(val)}`}>
                  {val}%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getScoreBarBg(
                    val
                  )}`}
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
