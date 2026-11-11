import React from 'react';
import { SurveyRecord, Language } from '../types/survey';
import { STAGE_CONFIG, SECTORS } from '../data/sectorsData';
import { Stage1SurveyorRespondent } from './stages/Stage1SurveyorRespondent';
import { Stage2PropertyLocation } from './stages/Stage2PropertyLocation';
import { StageSectorAssessment } from './stages/StageSectorAssessment';
import { Stage6EvidenceSamples } from './stages/Stage6EvidenceSamples';
import { Stage7ReviewSubmit } from './stages/Stage7ReviewSubmit';
import { ChevronLeft, ChevronRight, Save, CheckCircle2 } from 'lucide-react';

interface FieldSurveyProps {
  survey: SurveyRecord;
  onChange: (updated: SurveyRecord) => void;
  onSaveAndExit: () => void;
  lang: Language;
}

export const FieldSurvey: React.FC<FieldSurveyProps> = ({
  survey,
  onChange,
  onSaveAndExit,
  lang
}) => {
  const currentStage = survey.currentStage || 1;

  const setStage = (num: number) => {
    // If consent is denied, cannot proceed past Stage 1
    if (num > 1 && !survey.consent.surveyConsent) {
      alert(
        lang === 'ta'
          ? 'ஆய்வு நடத்த அனுமதி மறுக்கப்பட்டது. விதிகளின்படி, மேலும் விவரங்களைச் சேகரிக்க முடியாது.'
          : 'Permission to conduct the survey was declined. Cannot proceed further.'
      );
      return;
    }
    onChange({
      ...survey,
      currentStage: num
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentStage < 7) {
      setStage(currentStage + 1);
    }
  };

  const handlePrev = () => {
    if (currentStage > 1) {
      setStage(currentStage - 1);
    }
  };

  const handleFinalSubmit = () => {
    onChange({
      ...survey,
      status: 'submitted',
      submittedAt: new Date().toISOString()
    });
  };

  // Stage sectors partitioning
  const sectorsStage3 = SECTORS.slice(0, 4); // 01 to 04
  const sectorsStage4 = SECTORS.slice(4, 8); // 05 to 08
  const sectorsStage5 = SECTORS.slice(8, 12); // 09 to 12

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 pb-28">
      {/* Top 7 Stages Progress Indicator */}
      <div className="mb-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              {currentStage}
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {lang === 'ta'
                ? `படி ${currentStage} / 7: ${STAGE_CONFIG[currentStage - 1].titleTa}`
                : `Stage ${currentStage} of 7: ${STAGE_CONFIG[currentStage - 1].titleEn}`}
            </span>
          </div>

          <span className="text-xs font-semibold text-slate-500 tabular-nums">
            {Math.round(((currentStage - 1) / 6) * 100)}% Complete
          </span>
        </div>

        {/* 7 Stage Pills / Buttons */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {STAGE_CONFIG.map((st) => {
            const isCompleted = st.num < currentStage || (st.num === 7 && survey.status === 'submitted');
            const isCurrent = st.num === currentStage;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setStage(st.num)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl text-center transition-all ${
                  isCurrent
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 hover:bg-emerald-100'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center gap-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <span className="text-xs font-bold">{st.num}</span>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] truncate w-full mt-0.5 hidden sm:inline">
                  {lang === 'ta' ? st.shortTa : st.shortEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Stage Content */}
      <div className="min-h-[400px]">
        {currentStage === 1 && (
          <Stage1SurveyorRespondent survey={survey} onChange={onChange} lang={lang} />
        )}

        {currentStage === 2 && (
          <Stage2PropertyLocation survey={survey} onChange={onChange} lang={lang} />
        )}

        {currentStage === 3 && (
          <StageSectorAssessment
            survey={survey}
            sectors={sectorsStage3}
            stageTitleEn="Stage 3: Environmental Assessment (Sectors 01–04)"
            stageTitleTa="படி 3: சுற்றுச்சூழல் ஆய்வு (பிரிவுகள் 01–04)"
            stageSubtitleEn="Soil & Earth Management, Water Management, Energy Management, EV & Clean Mobility"
            stageSubtitleTa="மண் மேலாண்மை, நீர் மேலாண்மை, ஆற்றல் & மின்சாரம், மின்வாகனம் & தூய போக்குவரத்து"
            onChange={onChange}
            lang={lang}
          />
        )}

        {currentStage === 4 && (
          <StageSectorAssessment
            survey={survey}
            sectors={sectorsStage4}
            stageTitleEn="Stage 4: Environmental Assessment (Sectors 05–08)"
            stageTitleTa="படி 4: சுற்றுச்சூழல் ஆய்வு (பிரிவுகள் 05–08)"
            stageSubtitleEn="Waste Management, Organic Transformation, Biodiversity, Air Quality"
            stageSubtitleTa="கழிவு மேலாண்மை, இயற்கை வேளாண்மை மாற்றம், பல்லுயிர் பெருக்கம், காற்று தரம் & தூய்மை"
            onChange={onChange}
            lang={lang}
          />
        )}

        {currentStage === 5 && (
          <StageSectorAssessment
            survey={survey}
            sectors={sectorsStage5}
            stageTitleEn="Stage 5: Environmental Assessment (Sectors 09–12)"
            stageTitleTa="படி 5: சுற்றுச்சூழல் ஆய்வு (பிரிவுகள் 09–12)"
            stageSubtitleEn="Self Vegetation & Green Cover, Disaster Resilience, Carbon Footprint, Community Governance"
            stageSubtitleTa="சுய தாவர பசுமை மூடாக்கு, பேரிடர் மேலாண்மை, கார்பன் தாக்கம், சமுதாய & சுற்றுச்சூழல் ஆளுகை"
            onChange={onChange}
            lang={lang}
          />
        )}

        {currentStage === 6 && (
          <Stage6EvidenceSamples survey={survey} onChange={onChange} lang={lang} />
        )}

        {currentStage === 7 && (
          <Stage7ReviewSubmit
            survey={survey}
            onChange={onChange}
            onSubmit={handleFinalSubmit}
            lang={lang}
          />
        )}
      </div>

      {/* Ergonomic Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 sm:p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Previous Stage Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStage <= 1}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              currentStage > 1
                ? 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                : 'opacity-40 text-slate-400 cursor-not-allowed border border-transparent'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{lang === 'ta' ? 'முந்தைய படி' : 'Previous'}</span>
          </button>

          {/* Auto-save & Save and Continue */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSaveAndExit}
              className="min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">
                {lang === 'ta' ? 'சேமித்து வெளியேறுக' : 'Save & Exit'}
              </span>
              <span className="sm:hidden">{lang === 'ta' ? 'சேமி' : 'Save'}</span>
            </button>
          </div>

          {/* Next Stage Button */}
          {currentStage < 7 ? (
            <button
              type="button"
              onClick={handleNext}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm hover:opacity-90 active:scale-95 transition-all"
            >
              <span>{lang === 'ta' ? 'அடுத்த படி' : 'Next Stage'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'ta' ? 'சமர்ப்பிக்கவும்' : 'Submit'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
