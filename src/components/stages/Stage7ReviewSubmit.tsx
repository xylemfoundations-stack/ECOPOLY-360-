import React, { useState } from 'react';
import { SurveyRecord, Language } from '../../types/survey';
import { SECTORS } from '../../data/sectorsData';
import { calculateSurveyScore } from '../../services/storage';
import { ScoreGauge } from '../ScoreGauge';
import {
  CheckCircle,
  FileCheck2,
  User,
  Building,
  CheckCircle2,
  Printer,
  Download,
  AlertCircle,
  KeyRound,
  ShieldCheck
} from 'lucide-react';

interface Stage7Props {
  survey: SurveyRecord;
  onChange: (updated: SurveyRecord) => void;
  onSubmit: () => void;
  lang: Language;
}

export const Stage7ReviewSubmit: React.FC<Stage7Props> = ({
  survey,
  onChange,
  onSubmit,
  lang
}) => {
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const score = calculateSurveyScore(survey);

  // Sector completion counts
  const sectorCompletionList = SECTORS.map((sec) => {
    const answers = survey.sectorAnswers?.[sec.id] || {};
    let answered = 0;
    sec.questions.forEach((q) => {
      const val = answers[q.num];
      if (val !== undefined && val !== null && val !== '') {
        if (Array.isArray(val) ? val.length > 0 : true) answered++;
      }
    });
    return {
      sec,
      answered,
      total: sec.questions.length,
      isDone: answered >= sec.questions.length
    };
  });

  const totalAnswered = sectorCompletionList.reduce((acc, curr) => acc + curr.answered, 0);
  const totalQuestions = SECTORS.length * 25; // 300 total questions across all 12 sectors
  const percentComplete = Math.round((totalAnswered / totalQuestions) * 100);

  const handleRespondentSign = (signatureData: string) => {
    onChange({
      ...survey,
      respondentSignature: signatureData,
      respondentSignedAt: new Date().toISOString()
    });
  };

  const handleSurveyorSign = (signatureData: string) => {
    onChange({
      ...survey,
      surveyorSignature: signatureData,
      surveyorSignedAt: new Date().toISOString()
    });
  };

  const handleFinalSubmitClick = () => {
    if (!survey.consent.surveyConsent) {
      alert(
        lang === 'ta'
          ? 'பதிலளிப்பவரின் ஒப்புதல் இல்லாமல் சமர்ப்பிக்க முடியாது.'
          : 'Cannot submit without survey consent.'
      );
      return;
    }
    onSubmit();
    setSubmittedMessage(true);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-5">
        <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
          {lang === 'ta' ? 'படி 7: மதிப்பாய்வு & சமர்ப்பிப்பு' : 'Stage 7: Review & Submission'}
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
          {lang === 'ta' ? 'கள ஆய்வு இறுதி மதிப்பாய்வு & டிஜிட்டல் உறுதிப்படுத்தல்' : 'Survey Review, Digital Confirmation & Submission'}
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          {lang === 'ta'
            ? 'அனைத்து 12 பிரிவுகளின் பதில்கள், மாதிரிகள் மற்றும் கையொப்பங்களை சரிபார்த்து சமர்ப்பிக்கவும்.'
            : 'Verify baseline answers across all 12 sectors, review sample telemetry, and record respondent endorsement.'}
        </p>
      </div>

      {submittedMessage && (
        <div className="p-4 bg-emerald-600 text-white rounded-2xl flex items-center justify-between gap-3 shadow-md animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 shrink-0" />
            <div>
              <h4 className="font-bold text-sm">
                {lang === 'ta' ? 'கள ஆய்வு வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!' : 'Survey Submitted Successfully!'}
              </h4>
              <p className="text-xs text-emerald-100">
                {lang === 'ta'
                  ? 'தரவுகள் பாதுகாப்பாக உள்ளமைவாக சேமிக்கப்பட்டு நிர்வாக ஆய்வுக்கு தயார் செய்யப்பட்டுள்ளது.'
                  : 'Master assessment recorded and indexed for admin certification & reporting.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-white text-emerald-800 text-xs font-bold rounded-lg hover:bg-emerald-50 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'அச்சிடு' : 'Print'}</span>
          </button>
        </div>
      )}

      {/* Calculated Score Metric */}
      <ScoreGauge score={score} lang={lang} />

      {/* Respondent & Properties Quick Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Respondent Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'ta' ? 'பதிலளிப்பவர் விவரங்கள்' : 'Respondent Profile'}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">{lang === 'ta' ? 'பெயர்' : 'Name'}</span>
              <strong className="text-slate-800 dark:text-slate-200">
                {survey.respondent.fullName || '—'}
              </strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">{lang === 'ta' ? 'பிரிவு' : 'Category'}</span>
              <span className="text-slate-700 dark:text-slate-300">
                {survey.respondent.respondentCategory} · {survey.respondent.occupation}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">{lang === 'ta' ? 'அலைபேசி' : 'Phone'}</span>
              <span className="text-slate-700 dark:text-slate-300">
                {survey.respondent.mobileNumber || '—'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">{lang === 'ta' ? 'கிராமம் / வட்டம்' : 'Location'}</span>
              <span className="text-slate-700 dark:text-slate-300">
                {survey.address.villageTownWard || '—'}, {survey.address.district}
              </span>
            </div>
          </div>
        </div>

        {/* Properties Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Building className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'ta' ? 'பதிவு செய்யப்பட்ட சொத்துக்கள்' : 'Registered Properties'} ({survey.properties.length})
            </h3>
          </div>
          <div className="space-y-2 text-xs">
            {survey.properties.map((p) => (
              <div
                key={p.id}
                className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between"
              >
                <div>
                  <strong className="text-slate-800 dark:text-slate-200 block">{p.name}</strong>
                  <span className="text-[11px] text-slate-500">
                    {p.propertyType} · {p.landExtent} {p.extentUnit} · Survey: {p.surveyNumber || 'N/A'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {p.id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sector Completion Matrix */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'ta' ? '12 நிலைத்தன்மை பிரிவுகள் நிறைவு நிலை' : '12 Sectors Assessment Completion'}
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
            {totalAnswered} / {totalQuestions} {lang === 'ta' ? 'கேள்விகள்' : 'answers'} ({percentComplete}%)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {sectorCompletionList.map(({ sec, answered, total, isDone }) => (
            <div
              key={sec.id}
              className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Sector 0{sec.sectorNumber}
                </span>
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                  {lang === 'ta' ? sec.titleTa.split('–')[1] || sec.titleTa : sec.titleEn.split('–')[1] || sec.titleEn}
                </h4>
                <span className="text-[11px] text-slate-500 tabular-nums">
                  {answered} / {total}
                </span>
              </div>
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <span className="text-[10px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded">
                  {Math.round((answered / total) * 100)}%
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PIN Authentication Section - No signatures, PIN only */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'ta' ? 'PIN எண் மூலம் டிஜிட்டல் சரிபார்ப்பு' : 'Digital Verification via PIN Number'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ta'
              ? 'கையொப்பம் தேவையில்லை — பதிலளிப்பவர் மற்றும் மாணவர் ஆய்வாளரின் 4-இலக்க PIN எண் மூலம் ஆய்வு அங்கீகரிக்கப்படுகிறது.'
              : 'Signatures replaced with secure 4-digit PIN authorization for rapid, reliable field verification.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Respondent Confirmation PIN */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                  {lang === 'ta' ? '1. பதிலளிப்பவர் உறுதிப்படுத்தல் PIN' : '1. Respondent Confirmation PIN'}
                </label>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {lang === 'ta'
                    ? 'பதிலளிப்பவரின் ஒப்புதல் 4-இலக்க எண் (4 Digits)'
                    : '4-digit verification code confirmed with respondent'}
                </span>
              </div>
              {survey.respondentConfirmationPin && survey.respondentConfirmationPin.length >= 4 && (
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {lang === 'ta' ? 'உறுதியானது ✓' : 'Confirmed ✓'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="password"
                maxLength={4}
                value={survey.respondentConfirmationPin || ''}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                  onChange({
                    ...survey,
                    respondentConfirmationPin: val,
                    respondentConfirmedAt: val.length === 4 ? new Date().toISOString() : undefined
                  });
                }}
                placeholder="• • • •"
                className="w-36 tracking-[0.5em] text-center text-lg font-mono font-bold px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />

              <button
                type="button"
                onClick={() => {
                  // Quick auto-generate 4-digit code if respondent agrees
                  const autoCode = String(Math.floor(1000 + Math.random() * 9000));
                  onChange({
                    ...survey,
                    respondentConfirmationPin: autoCode,
                    respondentConfirmedAt: new Date().toISOString()
                  });
                }}
                className="text-xs text-slate-600 dark:text-slate-300 hover:text-emerald-600 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 rounded-xl font-medium transition-colors"
              >
                {lang === 'ta' ? 'தானியங்கு PIN பெற' : 'Generate Code'}
              </button>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {lang === 'ta'
                ? `பதிலளிப்பவர்: ${survey.respondent.fullName || 'R. Senthamarai Kannan'} (${survey.respondent.mobileNumber || 'Mobile'})`
                : `Verified for respondent: ${survey.respondent.fullName || 'Respondent'} (${survey.respondent.mobileNumber || 'N/A'})`}
            </p>
          </div>

          {/* Student Intern Authorization PIN */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                  {lang === 'ta' ? '2. மாணவர் ஆய்வாளர் அங்கீகார PIN' : '2. Student Intern Surveyor PIN'}
                </label>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {lang === 'ta'
                    ? `நிர்வாகத்தால் வழங்கப்பட்ட PIN (${survey.surveyor.internName})`
                    : `Admin-issued 4-digit PIN for ${survey.surveyor.internName}`}
                </span>
              </div>
              {survey.surveyorAuthPin && survey.surveyorAuthPin.length >= 4 && (
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {lang === 'ta' ? 'சான்றளிக்கப்பட்டது ✓' : 'Authorized ✓'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="password"
                maxLength={4}
                value={survey.surveyorAuthPin || ''}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                  onChange({
                    ...survey,
                    surveyorAuthPin: val,
                    surveyorVerifiedAt: val.length === 4 ? new Date().toISOString() : undefined
                  });
                }}
                placeholder="• • • •"
                className="w-36 tracking-[0.5em] text-center text-lg font-mono font-bold px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />

              <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                (ID: {survey.surveyor.internId})
              </span>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {lang === 'ta'
                ? `ஆய்வாளர்: ${survey.surveyor.internName} · கல்லூரி: ${survey.surveyor.college}`
                : `Surveyor: ${survey.surveyor.internName} · MPCAS Institutional Field Assessment`}
            </p>
          </div>
        </div>
      </section>

      {/* Submit Trigger */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Status: <strong className="uppercase">{survey.status}</strong> · Survey ID: <span className="font-mono">{survey.id}</span>
        </div>

        <button
          type="button"
          onClick={handleFinalSubmitClick}
          className="min-h-[48px] px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>
            {lang === 'ta' ? 'முழு கள ஆய்வையும் சமர்ப்பிக்கவும்' : 'Final Submit Master Survey'}
          </span>
        </button>
      </div>
    </div>
  );
};
