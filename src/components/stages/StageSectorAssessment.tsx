import React, { useState } from 'react';
import { SurveyRecord, SectorDefinition, Language } from '../../types/survey';
import { Check, CheckCircle2, ChevronRight, Building } from 'lucide-react';

interface StageSectorAssessmentProps {
  survey: SurveyRecord;
  sectors: SectorDefinition[];
  stageTitleEn: string;
  stageTitleTa: string;
  stageSubtitleEn: string;
  stageSubtitleTa: string;
  onChange: (updated: SurveyRecord) => void;
  lang: Language;
}

export const StageSectorAssessment: React.FC<StageSectorAssessmentProps> = ({
  survey,
  sectors,
  stageTitleEn,
  stageTitleTa,
  stageSubtitleEn,
  stageSubtitleTa,
  onChange,
  lang
}) => {
  const [activeSectorId, setActiveSectorId] = useState<string>(sectors[0]?.id || '');

  const activeSector = sectors.find((s) => s.id === activeSectorId) || sectors[0];

  const getSectorAnswers = (secId: string) => {
    return survey.sectorAnswers?.[secId] || {};
  };

  const updateAnswer = (secId: string, questionNum: number, value: any) => {
    const currentSectorAns = { ...(survey.sectorAnswers?.[secId] || {}) };
    currentSectorAns[questionNum] = value;

    onChange({
      ...survey,
      sectorAnswers: {
        ...survey.sectorAnswers,
        [secId]: currentSectorAns
      }
    });
  };

  const toggleMultiAnswer = (secId: string, questionNum: number, optionVal: string) => {
    const currentSectorAns = { ...(survey.sectorAnswers?.[secId] || {}) };
    const currentArr: string[] = Array.isArray(currentSectorAns[questionNum])
      ? [...(currentSectorAns[questionNum] as string[])]
      : [];

    const existingIndex = currentArr.indexOf(optionVal);
    if (existingIndex >= 0) {
      currentArr.splice(existingIndex, 1);
    } else {
      currentArr.push(optionVal);
    }

    currentSectorAns[questionNum] = currentArr;
    onChange({
      ...survey,
      sectorAnswers: {
        ...survey.sectorAnswers,
        [secId]: currentSectorAns
      }
    });
  };

  // Calculate sector completion
  const getSectorProgress = (sec: SectorDefinition) => {
    const ans = getSectorAnswers(sec.id);
    let count = 0;
    sec.questions.forEach((q) => {
      const val = ans[q.num];
      if (val !== undefined && val !== null && val !== '') {
        if (Array.isArray(val)) {
          if (val.length > 0) count++;
        } else {
          count++;
        }
      }
    });
    return {
      answered: count,
      total: sec.questions.length,
      isComplete: count >= sec.questions.length
    };
  };

  return (
    <div className="space-y-6">
      {/* Stage Header */}
      <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-5">
        <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
          {lang === 'ta' ? 'சுற்றுச்சூழல் மதிப்பீடு' : 'Environmental Assessment'}
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
          {lang === 'ta' ? stageTitleTa : stageTitleEn}
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          {lang === 'ta' ? stageSubtitleTa : stageSubtitleEn}
        </p>
      </div>

      {/* Sector Tab Selector with Completion Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {sectors.map((sec) => {
          const isActive = sec.id === activeSectorId;
          const prog = getSectorProgress(sec);
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSectorId(sec.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider block ${
                    isActive ? 'text-emerald-100' : 'text-emerald-700 dark:text-emerald-400'
                  }`}
                >
                  Sector 0{sec.sectorNumber}
                </span>
                <h4 className="text-xs font-bold line-clamp-1 mt-0.5">
                  {lang === 'ta' ? sec.titleTa.split('–')[1] || sec.titleTa : sec.titleEn.split('–')[1] || sec.titleEn}
                </h4>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-black/10 dark:border-white/10 text-[11px]">
                <span className={isActive ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}>
                  {prog.answered} / {prog.total}
                </span>
                {prog.isComplete && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-emerald-100' : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Sector Assessment Form */}
      {activeSector && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                SECTOR 0{activeSector.sectorNumber} / 12
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {lang === 'ta' ? activeSector.titleTa : activeSector.titleEn}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'ta' ? activeSector.descriptionTa : activeSector.descriptionEn}
              </p>
            </div>

            {/* Linked Property Indicator */}
            {survey.properties.length > 1 && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <Building className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {lang === 'ta' ? 'மதிப்பீட்டு சொத்து:' : 'Evaluating:'}{' '}
                  <strong>{survey.properties[0].name}</strong>
                </span>
              </div>
            )}
          </div>

          {/* 25 Primary Questions */}
          <div className="space-y-6 divide-y divide-slate-100 dark:divide-slate-800/80">
            {activeSector.questions.map((q) => {
              const currentVal = getSectorAnswers(activeSector.id)[q.num];
              const isMulti = q.type === 'multi';

              return (
                <div key={q.id} className="pt-5 first:pt-0">
                  <div className="flex items-start gap-2.5 mb-2.5">
                    <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {q.num}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {lang === 'ta' ? q.labelTa : q.labelEn}
                      </h4>
                      {isMulti && (
                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                          {lang === 'ta' ? '(பொருந்தும் அனைத்தையும் தேர்வு செய்யலாம்)' : '(Select all that apply)'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Input Options */}
                  {q.type === 'select' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 pt-1">
                      {q.optionsEn.map((optEn, optIdx) => {
                        const optTa = q.optionsTa[optIdx] || optEn;
                        const isSelected = currentVal === optEn;
                        return (
                          <button
                            key={optEn}
                            type="button"
                            onClick={() => updateAnswer(activeSector.id, q.num, optEn)}
                            className={`min-h-[44px] px-3.5 py-2.5 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between gap-2 ${
                              isSelected
                                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-600'
                                : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                            }`}
                          >
                            <span className="line-clamp-2 leading-tight">
                              {lang === 'ta' ? optTa : optEn}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'multi' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 pt-1">
                      {q.optionsEn.map((optEn, optIdx) => {
                        const optTa = q.optionsTa[optIdx] || optEn;
                        const selectedList: string[] = Array.isArray(currentVal)
                          ? (currentVal as string[])
                          : [];
                        const isSelected = selectedList.includes(optEn);
                        return (
                          <button
                            key={optEn}
                            type="button"
                            onClick={() => toggleMultiAnswer(activeSector.id, q.num, optEn)}
                            className={`min-h-[44px] px-3.5 py-2.5 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between gap-2 ${
                              isSelected
                                ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-600'
                                : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                            }`}
                          >
                            <span className="line-clamp-2 leading-tight">
                              {lang === 'ta' ? optTa : optEn}
                            </span>
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'border-emerald-600 bg-emerald-600 text-white'
                                  : 'border-slate-300 dark:border-slate-700'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'text' && (
                    <div className="space-y-2 pt-1 max-w-xl">
                      <div className="flex flex-wrap gap-2">
                        {q.optionsEn.map((optEn, optIdx) => {
                          const optTa = q.optionsTa[optIdx] || optEn;
                          const isMatch = currentVal === optEn;
                          return (
                            <button
                              key={optEn}
                              type="button"
                              onClick={() => updateAnswer(activeSector.id, q.num, optEn)}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                                isMatch
                                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900'
                                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                              }`}
                            >
                              {lang === 'ta' ? optTa : optEn}
                            </button>
                          );
                        })}
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          value={typeof currentVal === 'string' ? currentVal : ''}
                          onChange={(e) => updateAnswer(activeSector.id, q.num, e.target.value)}
                          placeholder={
                            lang === 'ta'
                              ? q.unitTa || 'மதிப்பை அல்லது பதிலை உள்ளிடவும்'
                              : q.unitEn || 'Enter value or observation'
                          }
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick next sector trigger */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            {sectors.indexOf(activeSector) < sectors.length - 1 && (
              <button
                type="button"
                onClick={() => {
                  const currIdx = sectors.indexOf(activeSector);
                  setActiveSectorId(sectors[currIdx + 1].id);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 py-1"
              >
                <span>
                  {lang === 'ta'
                    ? `அடுத்த பிரிவு: 0${sectors[sectors.indexOf(activeSector) + 1].sectorNumber}`
                    : `Next Sector: 0${sectors[sectors.indexOf(activeSector) + 1].sectorNumber}`}
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
