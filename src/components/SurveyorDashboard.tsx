import { SurveyRecord, StudentIntern, Language } from '../types/survey';
import {
  exportSurveysToCSV,
  exportSurveysToJSON,
  resetToSampleSurvey
} from '../services/storage';
import {
  PlusCircle,
  FileSpreadsheet,
  Download,
  RotateCcw,
  UserCheck,
  Building,
  CheckCircle2,
  Clock,
  ExternalLink,
  Trash2,
  Edit3,
  KeyRound
} from 'lucide-react';

interface SurveyorDashboardProps {
  surveys: SurveyRecord[];
  activeIntern: StudentIntern;
  onOpenInternLogin: () => void;
  onStartNewSurvey: () => void;
  onResumeSurvey: (id: string) => void;
  onViewAdmin: (id: string) => void;
  onDeleteSurvey: (id: string) => void;
  onReloadPilot: () => void;
  lang: Language;
}

export const SurveyorDashboard: React.FC<SurveyorDashboardProps> = ({
  surveys,
  activeIntern,
  onOpenInternLogin,
  onStartNewSurvey,
  onResumeSurvey,
  onViewAdmin,
  onDeleteSurvey,
  onReloadPilot,
  lang
}) => {
  const completedCount = surveys.filter((s) => s.status === 'submitted').length;
  const draftCount = surveys.filter((s) => s.status === 'draft').length;

  const validScores = surveys
    .map((s) => s.sustainabilityScore?.overall)
    .filter((score): score is number => typeof score === 'number' && score > 0);

  const avgScore =
    validScores.length > 0
      ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length)
      : 84;

  const totalProperties = surveys.reduce((acc, s) => acc + (s.properties?.length || 1), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Surveyor Identification Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <UserCheck className="w-4 h-4" />
              <span>
                {lang === 'ta'
                  ? 'மாணவர் கள ஆய்வாளர் முகப்பு'
                  : 'Student Intern Field Surveyor Console'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ECOPOLY 360° Life Management Survey
            </h1>

            <div className="text-xs sm:text-sm text-slate-300 space-y-1">
              <p>
                <strong>{lang === 'ta' ? 'கல்லூரி:' : 'Institution:'}</strong> {activeIntern.college}
              </p>
              <p>
                <strong>{lang === 'ta' ? 'முன்னெடுப்பு:' : 'Promoter:'}</strong> Xylem Foundations · ECOPOLY.LIFE
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-400">
                  Intern ID: <strong className="font-mono text-emerald-300">{activeIntern.id}</strong>
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-white font-medium">{activeIntern.name}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{activeIntern.department}</span>
                <button
                  type="button"
                  onClick={onOpenInternLogin}
                  className="ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold transition-colors"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>{lang === 'ta' ? 'PIN மூலம் மாற்று' : 'Switch Intern / PIN'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onStartNewSurvey}
              className="min-h-[48px] px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{lang === 'ta' ? 'புதிய கள ஆய்வு தொடங்குக' : 'Start New Field Survey'}</span>
            </button>

            <button
              onClick={onReloadPilot}
              className="min-h-[48px] px-4 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'ta' ? 'முன்னோடி ஆய்வு (தஞ்சாவூர்) ஏற்று' : 'Load Pilot Sample Survey'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
            {lang === 'ta' ? 'சமர்ப்பிக்கப்பட்ட ஆய்வுகள்' : 'Completed Surveys'}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {completedCount}
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
            {lang === 'ta' ? 'நடைபெறும் ஆய்வுகள்' : 'Drafts in Progress'}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-600 tabular-nums">
              {draftCount}
            </span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
            {lang === 'ta' ? 'மதிப்பிடப்பட்ட சொத்துக்கள்' : 'Properties Assessed'}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {totalProperties}
            </span>
            <Building className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
            {lang === 'ta' ? 'சராசரி நிலைப்புத்தன்மை குறியீடு' : 'Avg Sustainability Score'}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {avgScore}
            </span>
            <span className="text-xs font-medium text-slate-400">/ 100</span>
          </div>
        </div>
      </div>

      {/* Main Surveys Registry List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === 'ta' ? 'கள ஆய்வு பதிவேடு' : 'Field Survey Registry'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === 'ta'
                ? 'மாணவர் களத்தில் எடுத்த அனைத்து ஆய்வுகளின் தொகுப்பு'
                : 'All comprehensive assessments conducted by student interns'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportSurveysToCSV(surveys)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'ta' ? 'CSV பதிவிறக்கு' : 'Export CSV'}</span>
            </button>

            <button
              onClick={() => exportSurveysToJSON(surveys)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>JSON</span>
            </button>
          </div>
        </div>

        {surveys.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <p className="text-sm">No surveys found.</p>
            <button
              onClick={onStartNewSurvey}
              className="mt-3 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg"
            >
              Start New Survey
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {surveys.map((item) => {
              const isSubmitted = item.status === 'submitted';
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                        {item.responderId}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isSubmitted
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        }`}
                      >
                        {isSubmitted ? (lang === 'ta' ? 'சமர்ப்பிக்கப்பட்டது' : 'Submitted') : (lang === 'ta' ? 'வரைவு (படி ' + item.currentStage + ')' : 'Draft (Stage ' + item.currentStage + ')')}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.respondent.fullName || (lang === 'ta' ? 'பெயர் பதிவு செய்யப்படவில்லை' : 'Untitled Respondent')}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <span>
                        {item.respondent.respondentCategory} · {item.respondent.occupation}
                      </span>
                      <span>·</span>
                      <span>
                        {item.address.villageTownWard || 'N/A'}, {item.address.district}
                      </span>
                      <span>·</span>
                      <span>
                        {item.properties.length} {lang === 'ta' ? 'சொத்துக்கள்' : 'properties'}
                      </span>
                    </div>
                  </div>

                  {/* Right score and action buttons */}
                  <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                    {item.sustainabilityScore && (
                      <div className="text-right px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <span className="text-xs text-slate-400 block font-medium">Eco Score</span>
                        <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                          {item.sustainabilityScore.overall}
                          <span className="text-[10px] text-slate-400">/100</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onResumeSurvey(item.id)}
                        className="px-3 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{lang === 'ta' ? 'தொடர்க' : 'Open'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onViewAdmin(item.id)}
                        className="px-3 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                        title="View Admin Review"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{lang === 'ta' ? 'மதிப்பாய்வு' : 'Review'}</span>
                      </button>

                      {surveys.length > 1 && (
                        <button
                          type="button"
                          onClick={() => onDeleteSurvey(item.id)}
                          className="p-2 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 rounded-lg transition-colors"
                          title="Delete Survey"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
