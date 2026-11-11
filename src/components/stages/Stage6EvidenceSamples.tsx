import React from 'react';
import {
  SurveyRecord,
  SoilSample,
  WaterSample,
  EvidenceDocument,
  Language
} from '../../types/survey';
import {
  FlaskConical,
  Droplet,
  Gauge,
  FileText,
  Plus,
  Trash2,
  Camera,
  Check
} from 'lucide-react';

interface Stage6Props {
  survey: SurveyRecord;
  onChange: (updated: SurveyRecord) => void;
  lang: Language;
}

export const Stage6EvidenceSamples: React.FC<Stage6Props> = ({
  survey,
  onChange,
  lang
}) => {
  const updateEvidence = (field: string, val: any) => {
    onChange({
      ...survey,
      evidence: {
        ...survey.evidence,
        [field]: val
      }
    });
  };

  const updateReadings = (field: string, val: string) => {
    onChange({
      ...survey,
      evidence: {
        ...survey.evidence,
        readings: {
          ...survey.evidence.readings,
          [field]: val
        }
      }
    });
  };

  // Add Soil Sample
  const addSoilSample = () => {
    const nextNum = survey.evidence.soilSamples.length + 1;
    const newSample: SoilSample = {
      id: `SOIL-${Date.now()}`,
      sampleCode: `SS-${survey.responderId.slice(-4)}-0${nextNum}`,
      propertyId: survey.properties[0]?.id || 'PROP-01',
      depth: '15 cm (Topsoil root zone)',
      containerType: 'Sterilized airtight canvas bag',
      collectionDate: new Date().toISOString().slice(0, 10),
      dispatchedToLab: true,
      notes: ''
    };
    updateEvidence('soilSamples', [...survey.evidence.soilSamples, newSample]);
  };

  const updateSoilSample = (id: string, field: keyof SoilSample, val: any) => {
    const updated = survey.evidence.soilSamples.map((s) => {
      if (s.id === id) return { ...s, [field]: val };
      return s;
    });
    updateEvidence('soilSamples', updated);
  };

  const removeSoilSample = (id: string) => {
    const updated = survey.evidence.soilSamples.filter((s) => s.id !== id);
    updateEvidence('soilSamples', updated);
  };

  // Add Water Sample
  const addWaterSample = () => {
    const nextNum = survey.evidence.waterSamples.length + 1;
    const newSample: WaterSample = {
      id: `WAT-${Date.now()}`,
      sampleCode: `WS-${survey.responderId.slice(-4)}-0${nextNum}`,
      propertyId: survey.properties[0]?.id || 'PROP-01',
      sourceType: 'Borewell discharge pipe',
      temperature: '28.0 °C',
      phReading: '7.2',
      tdsReading: '350 ppm',
      turbidity: 'Clear',
      containerType: '500ml sterilised HDPE bottle',
      collectionDate: new Date().toISOString().slice(0, 10),
      notes: ''
    };
    updateEvidence('waterSamples', [...survey.evidence.waterSamples, newSample]);
  };

  const updateWaterSample = (id: string, field: keyof WaterSample, val: any) => {
    const updated = survey.evidence.waterSamples.map((s) => {
      if (s.id === id) return { ...s, [field]: val };
      return s;
    });
    updateEvidence('waterSamples', updated);
  };

  const removeWaterSample = (id: string) => {
    const updated = survey.evidence.waterSamples.filter((s) => s.id !== id);
    updateEvidence('waterSamples', updated);
  };

  // Add Document Evidence
  const addDocument = () => {
    const newDoc: EvidenceDocument = {
      id: `DOC-${Date.now()}`,
      title: 'Field Photograph / Document',
      category: 'Farm Photograph',
      photoUrl: '',
      timestamp: new Date().toISOString(),
      notes: ''
    };
    updateEvidence('documents', [...survey.evidence.documents, newDoc]);
  };

  const updateDocument = (id: string, field: keyof EvidenceDocument, val: any) => {
    const updated = survey.evidence.documents.map((d) => {
      if (d.id === id) return { ...d, [field]: val };
      return d;
    });
    updateEvidence('documents', updated);
  };

  const removeDocument = (id: string) => {
    const updated = survey.evidence.documents.filter((d) => d.id !== id);
    updateEvidence('documents', updated);
  };

  const handleDocFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateDocument(id, 'photoUrl', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      {/* Stage Header */}
      <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-5">
        <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
          {lang === 'ta' ? 'படி 6: சான்றுகள் மற்றும் அளவீடுகள்' : 'Stage 6: Evidence, Measurements & Samples'}
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
          {lang === 'ta' ? 'கள மாதிரிகள், கருவி அளவீடுகள் & ஆவணப் பதிவுகள்' : 'Field Sample Collection & Environmental Readings'}
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          {lang === 'ta'
            ? 'மண் மற்றும் நீர் மாதிரிகள், காற்று அளவீடுகள் மற்றும் ஆய்வாளர் களக் குறிப்புகளை பதிவு செய்க.'
            : 'Record laboratory-grade soil/water samples, handheld environmental meter telemetry, and evidentiary documentation.'}
        </p>
      </div>

      {/* Soil Sample Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-amber-700 dark:text-amber-500" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {lang === 'ta' ? 'மண் மாதிரி சேகரிப்பு விவரங்கள்' : 'Soil Sample Records'}
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {survey.evidence.soilSamples.length}{' '}
                {lang === 'ta' ? 'மாதிரிகள் பதிவு செய்யப்பட்டுள்ளன' : 'samples recorded'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={addSoilSample}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-900/50 rounded-lg border border-amber-200 dark:border-amber-800 transition-colors self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'மண் மாதிரி சேர்க்க' : 'Add Soil Sample'}</span>
          </button>
        </div>

        {survey.evidence.soilSamples.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-slate-500 italic py-2">
            {lang === 'ta'
              ? 'மண் மாதிரி எதுவும் சேர்க்கப்படவில்லை. அனுமதி இருந்தால் மாதிரி சேர்க்கலாம்.'
              : 'No soil samples logged. Tap above to register a soil sample bag.'}
          </p>
        ) : (
          <div className="space-y-4">
            {survey.evidence.soilSamples.map((sample, idx) => (
              <div
                key={sample.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
                    Sample #{idx + 1}: {sample.sampleCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSoilSample(sample.id)}
                    className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{lang === 'ta' ? 'நீக்குக' : 'Remove'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {lang === 'ta' ? 'மாதிரி குறியீடு' : 'Sample Code'}
                    </label>
                    <input
                      type="text"
                      value={sample.sampleCode}
                      onChange={(e) => updateSoilSample(sample.id, 'sampleCode', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {lang === 'ta' ? 'சொத்து' : 'Property'}
                    </label>
                    <select
                      value={sample.propertyId}
                      onChange={(e) => updateSoilSample(sample.id, 'propertyId', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      {survey.properties.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.id})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {lang === 'ta' ? 'எடுத்த ஆழம்' : 'Sampling Depth'}
                    </label>
                    <input
                      type="text"
                      value={sample.depth}
                      onChange={(e) => updateSoilSample(sample.id, 'depth', e.target.value)}
                      placeholder="e.g. 15 cm"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {lang === 'ta' ? 'சேகரிப்பு கொள்கலன்' : 'Container'}
                    </label>
                    <input
                      type="text"
                      value={sample.containerType}
                      onChange={(e) => updateSoilSample(sample.id, 'containerType', e.target.value)}
                      placeholder="e.g. Canvas bag"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <input
                    type="text"
                    value={sample.notes}
                    onChange={(e) => updateSoilSample(sample.id, 'notes', e.target.value)}
                    placeholder={
                      lang === 'ta'
                        ? 'களக் குறிப்பு (எ.கா: 5 இடங்களில் ஜிக்-ஜாக் முறையில் சேகரிக்கப்பட்டது)'
                        : 'Field notes (e.g., collected across 5 zig-zag points post-harvest)'
                    }
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 shrink-0">
                    <input
                      type="checkbox"
                      checked={sample.dispatchedToLab}
                      onChange={(e) => updateSoilSample(sample.id, 'dispatchedToLab', e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{lang === 'ta' ? 'ஆய்வகத்திற்கு அனுப்பப்பட்டது' : 'Dispatched to Lab'}</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Water Sample Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {lang === 'ta' ? 'நீர் மாதிரி சேகரிப்பு & கள பரிசோதனை' : 'Water Sample & Field Test Records'}
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {survey.evidence.waterSamples.length}{' '}
                {lang === 'ta' ? 'மாதிரிகள் பதிவு செய்யப்பட்டுள்ளன' : 'samples recorded'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={addWaterSample}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-900/50 rounded-lg border border-cyan-200 dark:border-cyan-800 transition-colors self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'நீர் மாதிரி சேர்க்க' : 'Add Water Sample'}</span>
          </button>
        </div>

        {survey.evidence.waterSamples.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-slate-500 italic py-2">
            {lang === 'ta'
              ? 'நீர் மாதிரி எதுவும் சேர்க்கப்படவில்லை. அனுமதி இருந்தால் மாதிரி சேர்க்கலாம்.'
              : 'No water samples logged. Tap above to register a water sample.'}
          </p>
        ) : (
          <div className="space-y-4">
            {survey.evidence.waterSamples.map((sample, idx) => (
              <div
                key={sample.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-800 dark:text-cyan-400">
                    Sample #{idx + 1}: {sample.sampleCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeWaterSample(sample.id)}
                    className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{lang === 'ta' ? 'நீக்குக' : 'Remove'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {lang === 'ta' ? 'ஆதாரம்' : 'Source'}
                    </label>
                    <input
                      type="text"
                      value={sample.sourceType}
                      onChange={(e) => updateWaterSample(sample.id, 'sourceType', e.target.value)}
                      placeholder="e.g. Borewell"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {lang === 'ta' ? 'வெப்பநிலை' : 'Temp (°C)'}
                    </label>
                    <input
                      type="text"
                      value={sample.temperature}
                      onChange={(e) => updateWaterSample(sample.id, 'temperature', e.target.value)}
                      placeholder="28 °C"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {lang === 'ta' ? 'pH அளவு' : 'pH Reading'}
                    </label>
                    <input
                      type="text"
                      value={sample.phReading}
                      onChange={(e) => updateWaterSample(sample.id, 'phReading', e.target.value)}
                      placeholder="7.2"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {lang === 'ta' ? 'TDS அளவு' : 'TDS (ppm)'}
                    </label>
                    <input
                      type="text"
                      value={sample.tdsReading}
                      onChange={(e) => updateWaterSample(sample.id, 'tdsReading', e.target.value)}
                      placeholder="350 ppm"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {lang === 'ta' ? 'கலங்கல் தன்மை' : 'Turbidity'}
                    </label>
                    <input
                      type="text"
                      value={sample.turbidity}
                      onChange={(e) => updateWaterSample(sample.id, 'turbidity', e.target.value)}
                      placeholder="Clear"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {lang === 'ta' ? 'கொள்கலன்' : 'Bottle'}
                    </label>
                    <input
                      type="text"
                      value={sample.containerType}
                      onChange={(e) => updateWaterSample(sample.id, 'containerType', e.target.value)}
                      placeholder="500ml HDPE"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  value={sample.notes}
                  onChange={(e) => updateWaterSample(sample.id, 'notes', e.target.value)}
                  placeholder={
                    lang === 'ta'
                      ? 'களக் குறிப்பு (எ.கா: பம்ப் 15 நிமிடம் ஓடிய பின் மாதிரி எடுக்கப்பட்டது)'
                      : 'Sample notes (e.g. drawn from pump discharge after running 15 mins)'
                  }
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Atmospheric & Environmental Meter Telemetry */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Gauge className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {lang === 'ta' ? 'சுற்றுச்சூழல் கள கருவி அளவீடுகள்' : 'Environmental Meter Telemetry'}
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              PM 2.5 (µg/m³)
            </label>
            <input
              type="text"
              value={survey.evidence.readings.pm25 || ''}
              onChange={(e) => updateReadings('pm25', e.target.value)}
              placeholder="e.g. 22"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              PM 10 (µg/m³)
            </label>
            <input
              type="text"
              value={survey.evidence.readings.pm10 || ''}
              onChange={(e) => updateReadings('pm10', e.target.value)}
              placeholder="e.g. 45"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'சுற்றுச்சூழல் வெப்பம்' : 'Ambient Temp (°C)'}
            </label>
            <input
              type="text"
              value={survey.evidence.readings.ambientTemp || ''}
              onChange={(e) => updateReadings('ambientTemp', e.target.value)}
              placeholder="e.g. 31.5 °C"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'ஈரப்பதம்' : 'Humidity (%)'}
            </label>
            <input
              type="text"
              value={survey.evidence.readings.humidity || ''}
              onChange={(e) => updateReadings('humidity', e.target.value)}
              placeholder="e.g. 68%"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'ஒலி அளவு' : 'Sound (dB)'}
            </label>
            <input
              type="text"
              value={survey.evidence.readings.soundLevel || ''}
              onChange={(e) => updateReadings('soundLevel', e.target.value)}
              placeholder="e.g. 42 dB"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'அளவீட்டு கருவி / மூலம்' : 'Reading Source / Instrument Model'}
            </label>
            <input
              type="text"
              value={survey.evidence.readings.readingSource || ''}
              onChange={(e) => updateReadings('readingSource', e.target.value)}
              placeholder="e.g. Handheld Air Sensor / Weather station"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'கருவி அளவீட்டு குறிப்பு' : 'Reading Observation Notes'}
            </label>
            <input
              type="text"
              value={survey.evidence.readings.notes || ''}
              onChange={(e) => updateReadings('notes', e.target.value)}
              placeholder="e.g. Measured at 10:45 AM, clear conditions"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </section>

      {/* Document & Evidence Uploads */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {lang === 'ta' ? 'ஆவணங்கள் & கள புகைப்பட சான்றுகள்' : 'Documentary & Photographic Evidence'}
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {survey.evidence.documents.length}{' '}
                {lang === 'ta' ? 'ஆவணங்கள் இணைக்கப்பட்டுள்ளன' : 'records attached'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={addDocument}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'ஆவணம் / புகைப்படம் சேர்க்க' : 'Add Evidence Item'}</span>
          </button>
        </div>

        {survey.evidence.documents.length === 0 ? (
          <p className="text-xs text-slate-400 dark:text-slate-500 italic py-2">
            {lang === 'ta'
              ? 'மின்கட்டண ரசீது, மண் பரிசோதனை அட்டை, பண்ணை அமைப்புகள் போன்ற சான்றுகளை இணைக்கலாம்.'
              : 'Attach electricity bills, soil health cards, compost pit photos, solar panels, or meter readings.'}
          </p>
        ) : (
          <div className="space-y-3">
            {survey.evidence.documents.map((doc) => (
              <div
                key={doc.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={doc.title}
                    onChange={(e) => updateDocument(doc.id, 'title', e.target.value)}
                    placeholder="Document Title"
                    className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <select
                    value={doc.category}
                    onChange={(e) => updateDocument(doc.id, 'category', e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Electricity Bill">{lang === 'ta' ? 'மின்கட்டண ரசீது' : 'Electricity Bill'}</option>
                    <option value="Water Test Report">{lang === 'ta' ? 'நீர் பரிசோதனை அறிக்கை' : 'Water Test Report'}</option>
                    <option value="Soil Health Card">{lang === 'ta' ? 'மண் வள அட்டை' : 'Soil Health Card'}</option>
                    <option value="Farm Photograph">{lang === 'ta' ? 'பண்ணை புகைப்படம்' : 'Farm Photograph'}</option>
                    <option value="Compost Facility">{lang === 'ta' ? 'உர தயாரிப்பு இடம்' : 'Compost Facility'}</option>
                    <option value="Solar System">{lang === 'ta' ? 'சோலார் அமைப்பு' : 'Solar System'}</option>
                    <option value="Other">{lang === 'ta' ? 'மற்றவை' : 'Other'}</option>
                  </select>
                  <input
                    type="text"
                    value={doc.notes || ''}
                    onChange={(e) => updateDocument(doc.id, 'notes', e.target.value)}
                    placeholder={lang === 'ta' ? 'குறிப்புகள் / விவரம்' : 'Notes / observation'}
                    className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <label className="cursor-pointer px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs hover:border-slate-300 flex items-center gap-1">
                    <Camera className="w-3 h-3 text-emerald-600" />
                    <span>{doc.photoUrl ? (lang === 'ta' ? 'மாற்றுக' : 'Replace Photo') : (lang === 'ta' ? 'புகைப்படம்' : 'Upload Photo')}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDocFileUpload(doc.id, e)}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => removeDocument(doc.id)}
                    className="p-1 text-rose-600 hover:text-rose-700 dark:text-rose-400"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Surveyor Field Notes */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-2">
        <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          {lang === 'ta' ? 'கள ஆய்வாளரின் ஒட்டுமொத்த குறிப்புகள் & பரிந்துரைகள்' : 'Surveyor Overall Field Observations & Notes'}
        </label>
        <textarea
          rows={4}
          value={survey.evidence.surveyorNotes}
          onChange={(e) => updateEvidence('surveyorNotes', e.target.value)}
          placeholder={
            lang === 'ta'
              ? 'பதிலளிப்பவரின் சூழல் ஆர்வம், பண்ணை நிலை, கிராமத்தின் தேவைகள் மற்றும் எதிர்கால திட்டங்கள் குறித்த ஆய்வாளரின் விரிவான குறிப்பு...'
              : 'Record holistic intern reflections, respondent enthusiasm, environmental risks observed, and key sustainability baseline impressions...'
          }
          className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
        />
      </section>
    </div>
  );
};
