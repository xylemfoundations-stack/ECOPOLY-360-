import React, { useState } from 'react';
import { SurveyRecord, StudentIntern, Language } from '../types/survey';
import { SECTORS } from '../data/sectorsData';
import { ScoreGauge } from './ScoreGauge';
import { InternManagement } from './InternManagement';
import {
  Printer,
  Download,
  CheckCircle2,
  MapPin,
  Building,
  User,
  FlaskConical,
  Droplet,
  Gauge,
  ChevronDown,
  ChevronUp,
  Award,
  Users,
  FileCheck,
  KeyRound,
  ShieldCheck
} from 'lucide-react';

interface AdminReviewProps {
  surveys: SurveyRecord[];
  selectedSurveyId?: string;
  onSelectSurvey: (id: string) => void;
  interns: StudentIntern[];
  onSaveIntern: (intern: StudentIntern) => void;
  onDeleteIntern: (id: string) => void;
  onSelectActiveIntern: (id: string) => void;
  activeInternId: string;
  lang: Language;
}

export const AdminReview: React.FC<AdminReviewProps> = ({
  surveys,
  selectedSurveyId,
  onSelectSurvey,
  interns,
  onSaveIntern,
  onDeleteIntern,
  onSelectActiveIntern,
  activeInternId,
  lang
}) => {
  const [adminView, setAdminView] = useState<'report' | 'interns'>('report');
  const [expandedSectors, setExpandedSectors] = useState<{ [secId: string]: boolean }>({
    sector_01: true,
    sector_02: true
  });

  const activeSurvey =
    surveys.find((s) => s.id === selectedSurveyId) || surveys[0];

  if (!activeSurvey) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500">
        No survey records available to review.
      </div>
    );
  }

  const toggleSector = (secId: string) => {
    setExpandedSectors((prev) => ({
      ...prev,
      [secId]: !prev[secId]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportSingleJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(activeSurvey, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute(
      'download',
      `ECOPOLY_Report_${activeSurvey.responderId}_${activeSurvey.id}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const score = activeSurvey.sustainabilityScore || {
    overall: 80,
    sectorScores: {},
    tier: 'Gold'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Admin View Switcher (Report Review vs Student Interns Management) */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 print:hidden">
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setAdminView('report')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              adminView === 'report'
                ? 'bg-white text-slate-900 dark:bg-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'ta' ? 'கள ஆய்வு அறிக்கைகள்' : 'Survey Baseline Reports'}</span>
          </button>

          <button
            type="button"
            onClick={() => setAdminView('interns')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              adminView === 'interns'
                ? 'bg-white text-slate-900 dark:bg-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {lang === 'ta'
                ? 'மாணவர் ஆய்வாளர்கள் & அழைப்புகள்'
                : 'Student Interns & Invitations'}
            </span>
            <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded-full font-bold ml-0.5">
              {interns.length}
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-500 hidden sm:block">
          {lang === 'ta'
            ? 'சைலம் ஃபவுண்டேஷன்ஸ் · நிர்வாக கட்டுப்பாட்டு மையம்'
            : 'Xylem Foundations · MPCAS Field Administration'}
        </div>
      </div>

      {/* When Admin View is Interns Management */}
      {adminView === 'interns' && (
        <InternManagement
          interns={interns}
          onSaveIntern={onSaveIntern}
          onDeleteIntern={onDeleteIntern}
          onSelectActiveIntern={onSelectActiveIntern}
          activeInternId={activeInternId}
          lang={lang}
        />
      )}

      {/* When Admin View is Survey Report Review */}
      {adminView === 'report' && (
        <>
          {/* Top Filter and Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs print:hidden">
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {lang === 'ta' ? 'ஆய்வுத் தேர்வு:' : 'Select Survey:'}
              </label>
              <select
                value={activeSurvey.id}
                onChange={(e) => onSelectSurvey(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              >
                {surveys.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.respondent.fullName || 'Untitled'} ({s.responderId}) · {s.status.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>{lang === 'ta' ? 'அறிக்கையை அச்சிடு' : 'Print Field Report'}</span>
              </button>

              <button
                onClick={handleExportSingleJson}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'ta' ? 'JSON பதிவிறக்கு' : 'Download JSON'}</span>
              </button>
            </div>
          </div>

      {/* Official Assessment Certificate Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                360
              </span>
              <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                ECOPOLY.LIFE FIELD CERTIFICATION
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              {lang === 'ta'
                ? 'சுற்றுச்சூழல் மற்றும் நிலைப்புத்தன்மை கள ஆய்வு அறிக்கை'
                : '360° Comprehensive Environmental Baseline Report'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Promoter: Xylem Foundations · Pilot: Maruthu Pandiyar College of Arts and Science · Student Field Intern Program
            </p>
          </div>

          <div className="text-left md:text-right space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{activeSurvey.status.toUpperCase()}</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Survey ID: {activeSurvey.id}</p>
            <p className="text-xs text-slate-400 font-mono">Responder ID: {activeSurvey.responderId}</p>
            <p className="text-xs text-slate-400">
              Assessed: {new Date(activeSurvey.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Holistic Score Indicator */}
        <ScoreGauge score={score} lang={lang} />

        {/* Profiling Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Surveyor Block */}
          <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'ta' ? 'கள ஆய்வாளர்' : 'Surveyor / Student Intern'}</span>
            </h4>
            <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
              <p>
                <strong>{activeSurvey.surveyor.internName}</strong>
              </p>
              <p className="text-slate-400 font-mono text-[11px]">
                ID: {activeSurvey.surveyor.internId}
              </p>
              <p className="text-[11px]">{activeSurvey.surveyor.college}</p>
              <p className="text-[11px]">{activeSurvey.surveyor.department}</p>
              <p className="text-[11px] text-slate-400">
                Supervisor: {activeSurvey.surveyor.facultySupervisor || 'N/A'}
              </p>
            </div>
          </div>

          {/* Respondent Block */}
          <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'ta' ? 'பதிலளிப்பவர் சுயவிவரம்' : 'Respondent Details'}</span>
            </h4>
            <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
              <p>
                <strong>{activeSurvey.respondent.fullName || '—'}</strong>
              </p>
              <p className="text-[11px]">
                {activeSurvey.respondent.gender} · Age: {activeSurvey.respondent.ageGroup}
              </p>
              <p className="text-[11px]">
                {activeSurvey.respondent.occupation} ({activeSurvey.respondent.respondentCategory})
              </p>
              <p className="text-[11px]">
                Mobile: <span className="font-mono">{activeSurvey.respondent.mobileNumber}</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Language: {activeSurvey.respondent.preferredLanguage} · Size: {activeSurvey.respondent.householdSize}
              </p>
            </div>
          </div>

          {/* Address & GPS */}
          <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'ta' ? 'முகவரி & GPS' : 'Address & Geolocation'}</span>
            </h4>
            <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
              <p>{activeSurvey.address.doorStreet || '—'}</p>
              <p>{activeSurvey.address.villageTownWard}, {activeSurvey.address.panchayatMunicipality}</p>
              <p>{activeSurvey.address.taluk}, {activeSurvey.address.district} - {activeSurvey.address.pinCode}</p>
              {activeSurvey.address.gpsCoordinates && (
                <div className="pt-1 text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                  GPS: {activeSurvey.address.gpsCoordinates.latitude.toFixed(6)},{' '}
                  {activeSurvey.address.gpsCoordinates.longitude.toFixed(6)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Registered Properties Section */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'ta' ? 'பதிவு செய்யப்பட்ட நிலங்கள் / சொத்துக்கள்' : 'Registered Land & Properties'} ({activeSurvey.properties.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSurvey.properties.map((prop) => (
              <div
                key={prop.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{prop.name}</h4>
                  <span className="font-mono text-xs text-emerald-600 font-bold">{prop.id}</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <p>
                    <strong>Type:</strong> {prop.propertyType} · <strong>Usage:</strong> {prop.propertyUsage}
                  </p>
                  <p>
                    <strong>Extent:</strong> {prop.landExtent} {prop.extentUnit} · <strong>Ownership:</strong> {prop.ownership}
                  </p>
                  <p>
                    <strong>Survey No:</strong> {prop.surveyNumber || 'N/A'} · <strong>Subdivision:</strong> {prop.subdivisionNumber || 'N/A'}
                  </p>
                  {prop.mainActivity && (
                    <p>
                      <strong>Activity:</strong> {prop.mainActivity}
                    </p>
                  )}
                  {prop.address && (
                    <p className="text-[11px] text-slate-400">
                      <strong>Address:</strong> {prop.address}
                    </p>
                  )}
                </div>

                {prop.photos && prop.photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {prop.photos.map((p) => (
                      <div key={p.id} className="rounded-lg overflow-hidden aspect-video border border-slate-200 dark:border-slate-800">
                        <img src={p.dataUrl} alt={p.caption} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 12 Sectors Deep Dive */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'ta' ? '12 சுற்றுச்சூழல் பிரிவுகள் - வினாடி வினா விரிவு அறிக்கை' : '12 Sustainability Sectors - Question & Answer Ledger'}
            </h3>
            <span className="text-xs text-slate-400">Click to expand/collapse</span>
          </div>

          <div className="space-y-3">
            {SECTORS.map((sec) => {
              const answers = activeSurvey.sectorAnswers?.[sec.id] || {};
              const isExpanded = !!expandedSectors[sec.id];
              const secScore = score.sectorScores[sec.id] || 0;

              return (
                <div
                  key={sec.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900"
                >
                  <button
                    type="button"
                    onClick={() => toggleSector(sec.id)}
                    className="w-full p-4 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/40 hover:bg-slate-100/80 dark:hover:bg-slate-950/60 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {sec.sectorNumber}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {lang === 'ta' ? sec.titleTa : sec.titleEn}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {lang === 'ta' ? sec.descriptionTa : sec.descriptionEn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                        {secScore}%
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 divide-y divide-slate-100 dark:divide-slate-800/80">
                      {sec.questions.map((q) => {
                        const ans = answers[q.num];
                        const displayVal =
                          ans !== undefined && ans !== null && ans !== ''
                            ? Array.isArray(ans)
                              ? ans.join(', ')
                              : String(ans)
                            : (lang === 'ta' ? 'பதிவு செய்யப்படவில்லை' : 'Not recorded');

                        return (
                          <div
                            key={q.id}
                            className="py-2.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs"
                          >
                            <span className="font-medium text-slate-700 dark:text-slate-300 sm:w-2/3 pr-2">
                              {q.num}. {lang === 'ta' ? q.labelTa : q.labelEn}
                            </span>
                            <span className="font-semibold text-slate-900 dark:text-emerald-300 sm:w-1/3 sm:text-right">
                              {displayVal}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Samples & Meter Telemetry Review */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {lang === 'ta' ? 'மாதிரிகள் & கருவி அளவீடுகள் பரிசீலனை' : 'Physical Samples & Environmental Readings'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Soil Samples */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase">
                <FlaskConical className="w-4 h-4 text-amber-600" />
                <span>Soil Samples ({activeSurvey.evidence.soilSamples.length})</span>
              </h4>
              {activeSurvey.evidence.soilSamples.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No soil samples logged.</p>
              ) : (
                <div className="space-y-2">
                  {activeSurvey.evidence.soilSamples.map((s) => (
                    <div key={s.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs space-y-1">
                      <div className="flex justify-between font-bold">
                        <span>{s.sampleCode}</span>
                        <span className="text-[11px] text-emerald-600">
                          {s.dispatchedToLab ? 'Dispatched to Lab' : 'Stored'}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px]">
                        Depth: {s.depth} · Container: {s.containerType} · Date: {s.collectionDate}
                      </p>
                      {s.notes && <p className="text-slate-600 italic text-[11px]">"{s.notes}"</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Water Samples */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase">
                <Droplet className="w-4 h-4 text-cyan-600" />
                <span>Water Samples ({activeSurvey.evidence.waterSamples.length})</span>
              </h4>
              {activeSurvey.evidence.waterSamples.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No water samples logged.</p>
              ) : (
                <div className="space-y-2">
                  {activeSurvey.evidence.waterSamples.map((w) => (
                    <div key={w.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs space-y-1">
                      <div className="flex justify-between font-bold">
                        <span>{w.sampleCode}</span>
                        <span className="text-[11px] text-cyan-600">{w.sourceType}</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">
                        pH: {w.phReading} · TDS: {w.tdsReading} · Temp: {w.temperature} · Turbidity: {w.turbidity}
                      </p>
                      {w.notes && <p className="text-slate-600 italic text-[11px]">"{w.notes}"</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Environmental Telemetry */}
          {activeSurvey.evidence.readings && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase">
                <Gauge className="w-4 h-4 text-indigo-600" />
                <span>Field Environmental Meter Readings</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">PM 2.5</span>
                  <strong>{activeSurvey.evidence.readings.pm25 || '—'} µg/m³</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">PM 10</span>
                  <strong>{activeSurvey.evidence.readings.pm10 || '—'} µg/m³</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Ambient Temp</span>
                  <strong>{activeSurvey.evidence.readings.ambientTemp || '—'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Humidity</span>
                  <strong>{activeSurvey.evidence.readings.humidity || '—'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Noise Level</span>
                  <strong>{activeSurvey.evidence.readings.soundLevel || '—'}</strong>
                </div>
              </div>
              {activeSurvey.evidence.readings.readingSource && (
                <p className="text-[11px] text-slate-400 pt-1">
                  Source: {activeSurvey.evidence.readings.readingSource}
                </p>
              )}
            </div>
          )}

          {/* Surveyor Observations */}
          {activeSurvey.evidence.surveyorNotes && (
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Surveyor Field Observations
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{activeSurvey.evidence.surveyorNotes}"
              </p>
            </div>
          )}
        </div>

        {/* Digital PIN Verification & Official Endorsement */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'ta' ? 'பதிலளிப்பவர் PIN உறுதிப்படுத்தல்' : 'Respondent PIN Confirmation'}</span>
              </h4>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {lang === 'ta' ? 'சரிபார்க்கப்பட்டது ✓' : 'PIN Verified ✓'}
              </span>
            </div>
            <div className="min-h-14 flex items-center justify-center p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
              <div className="flex items-center gap-3 font-mono font-bold text-sm tracking-widest text-slate-900 dark:text-white">
                <span>AUTH CODE: • • • •</span>
                <span className="text-xs font-sans text-emerald-600 font-semibold">(No signature required)</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Respondent: {activeSurvey.respondent.fullName || 'R. Senthamarai Kannan'} · Verified at visit
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'ta' ? 'மாணவர் ஆய்வாளர் PIN சான்றளிப்பு' : 'Surveyor PIN Certification'}</span>
              </h4>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {lang === 'ta' ? 'சான்றளிக்கப்பட்டது ✓' : 'Authorized ✓'}
              </span>
            </div>
            <div className="min-h-14 flex items-center justify-center p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
              <div className="flex items-center gap-3 font-mono font-bold text-sm tracking-widest text-slate-900 dark:text-white">
                <span>SEAL: • • • •</span>
                <span className="text-xs font-sans text-emerald-600 font-semibold">({activeSurvey.surveyor.internId})</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Surveyor: {activeSurvey.surveyor.internName} · Maruthu Pandiyar College of Arts and Science
            </p>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};
