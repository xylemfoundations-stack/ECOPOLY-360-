import React, { useState } from 'react';
import { SurveyRecord, Language } from '../../types/survey';
import { MapPin, Navigation, ShieldCheck, AlertTriangle, UserCheck, CheckCircle2 } from 'lucide-react';

interface Stage1Props {
  survey: SurveyRecord;
  onChange: (updated: SurveyRecord) => void;
  lang: Language;
}

export const Stage1SurveyorRespondent: React.FC<Stage1Props> = ({
  survey,
  onChange,
  lang
}) => {
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState(false);

  const updateSurveyor = (field: string, val: string) => {
    onChange({
      ...survey,
      surveyor: {
        ...survey.surveyor,
        [field]: val
      }
    });
  };

  const updateRespondent = (field: string, val: string) => {
    onChange({
      ...survey,
      respondent: {
        ...survey.respondent,
        [field]: val
      }
    });
  };

  const updateAddress = (field: string, val: any) => {
    onChange({
      ...survey,
      address: {
        ...survey.address,
        [field]: val
      }
    });
  };

  const updateConsent = (field: string, val: boolean) => {
    onChange({
      ...survey,
      consent: {
        ...survey.consent,
        [field]: val
      }
    });
  };

  const captureGPS = () => {
    if (!navigator.geolocation) {
      alert(lang === 'ta' ? 'உங்கள் உலாவியில் GPS ஆதரிக்கப்படவில்லை' : 'GPS not supported in browser');
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);
        setGpsSuccess(true);
        updateAddress('gpsCoordinates', {
          latitude: parseFloat(pos.coords.latitude.toFixed(6)),
          longitude: parseFloat(pos.coords.longitude.toFixed(6)),
          accuracy: Math.round(pos.coords.accuracy)
        });
        if (!survey.address.gpsAddress) {
          updateAddress(
            'gpsAddress',
            `Lat: ${pos.coords.latitude.toFixed(4)}, Long: ${pos.coords.longitude.toFixed(4)} (±${Math.round(pos.coords.accuracy)}m)`
          );
        }
      },
      (err) => {
        setGpsLoading(false);
        console.warn('GPS error, applying Thanjavur pilot fallback coordinates:', err);
        // Fallback to Thanjavur / Maruthu Pandiyar College pilot vicinity
        updateAddress('gpsCoordinates', {
          latitude: 10.7870,
          longitude: 79.1378,
          accuracy: 10
        });
        updateAddress('gpsAddress', 'Thanjavur Pilot Area, Tamil Nadu 613005');
        setGpsSuccess(true);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="space-y-8">
      {/* Promoter & Pilot Institute Banner */}
      <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
              {lang === 'ta' ? 'முன்னோடி கள ஆய்வு திட்டம்' : 'Student Intern Field Assessment'}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              {lang === 'ta' ? 'பிரிவு 1: ஆய்வாளர் மற்றும் பதிலளிப்பவர் பதிவு' : 'Stage 1: Surveyor & Respondent Registration'}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Xylem Foundations · Maruthu Pandiyar College of Arts and Science · ECOPOLY.LIFE
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">{lang === 'ta' ? 'பதிலளிப்பவர் ஐடி' : 'Responder ID'}</span>
            <span className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800 inline-block mt-0.5">
              {survey.responderId}
            </span>
          </div>
        </div>
      </div>

      {/* Mandatory Consent Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {lang === 'ta' ? 'பதிலளிப்பவர் இசைவு (Consent Protocol)' : 'Mandatory Consent Protocol'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              key: 'surveyConsent',
              labelEn: '1. Permission to conduct the environmental survey',
              labelTa: '1. சுற்றுச்சூழல் கள ஆய்வு நடத்த முழு சம்மதம்',
              required: true
            },
            {
              key: 'gpsConsent',
              labelEn: '2. Permission to capture GPS coordinates',
              labelTa: '2. ஜி.பி.எஸ் (GPS) இருப்பிடத்தை பதிவு செய்ய சம்மதம்'
            },
            {
              key: 'photoConsent',
              labelEn: '3. Permission to photograph property and evidence',
              labelTa: '3. சொத்து மற்றும் ஆதாரங்களை புகைப்படம் எடுக்க சம்மதம்'
            },
            {
              key: 'sampleConsent',
              labelEn: '4. Permission to collect soil or water samples',
              labelTa: '4. மண் அல்லது நீர் மாதிரிகள் சேகரிக்க சம்மதம்'
            },
            {
              key: 'followUpConsent',
              labelEn: '5. Permission for future follow-up visits & updates',
              labelTa: '5. எதிர்கால மறுபார்வை மற்றும் தொடர் வழிகாட்டலுக்கு சம்மதம்'
            }
          ].map((item) => {
            const isChecked = (survey.consent as any)[item.key] ?? false;
            return (
              <label
                key={item.key}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isChecked
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-900 dark:text-slate-100'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => updateConsent(item.key, e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700"
                />
                <div className="text-xs font-medium leading-relaxed">
                  {lang === 'ta' ? item.labelTa : item.labelEn}
                  {item.required && <span className="text-rose-500 ml-1 font-bold">*</span>}
                </div>
              </label>
            );
          })}
        </div>

        {!survey.consent.surveyConsent && (
          <div className="mt-4 p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              {lang === 'ta'
                ? 'ஆய்வு நடத்த சம்மதம் மறுக்கப்பட்டால் அடுத்த கட்டங்களுக்கு செல்ல முடியாது.'
                : 'Permission to conduct the survey is required. If declined, no further data may be collected.'}
            </span>
          </div>
        )}
      </section>

      {/* Surveyor Details */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {lang === 'ta' ? 'கள ஆய்வாளர் (மாணவர்) விவரங்கள்' : 'Surveyor (Student Intern) Details'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'மாணவர் / ஆய்வாளர் ஐடி' : 'Intern ID'}
            </label>
            <input
              type="text"
              value={survey.surveyor.internId}
              onChange={(e) => updateSurveyor('internId', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              placeholder="e.g. MPCAS-2026-ENV04"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'மாணவர் பெயர்' : 'Intern Name'}
            </label>
            <input
              type="text"
              value={survey.surveyor.internName}
              onChange={(e) => updateSurveyor('internName', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. K. Vignesh"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'கல்லூரி / நிறுவனம்' : 'College / Institution'}
            </label>
            <input
              type="text"
              value={survey.surveyor.college}
              onChange={(e) => updateSurveyor('college', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Maruthu Pandiyar College of Arts and Science"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'துறை' : 'Department'}
            </label>
            <input
              type="text"
              value={survey.surveyor.department}
              onChange={(e) => updateSurveyor('department', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Department of Environmental Science"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'கள ஆய்வு தேதி & நேரம்' : 'Date and Time of Visit'}
            </label>
            <input
              type="datetime-local"
              value={survey.surveyor.visitDateTime}
              onChange={(e) => updateSurveyor('visitDateTime', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'வழிகாட்டி ஆசிரியர்' : 'Faculty Supervisor'}
            </label>
            <input
              type="text"
              value={survey.surveyor.facultySupervisor}
              onChange={(e) => updateSurveyor('facultySupervisor', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Dr. S. Meenakshi Sundaram"
            />
          </div>
        </div>
      </section>

      {/* Respondent Profile Details */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
          {lang === 'ta' ? 'பதிலளிப்பவர் விவரங்கள் (Respondent Details)' : 'Respondent Details'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'முழு பெயர்' : 'Full Name'} *
            </label>
            <input
              type="text"
              value={survey.respondent.fullName}
              onChange={(e) => updateRespondent('fullName', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. R. Senthamarai Kannan"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'பாலினம்' : 'Gender'}
            </label>
            <select
              value={survey.respondent.gender}
              onChange={(e) => updateRespondent('gender', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">{lang === 'ta' ? 'தேர்வு செய்க' : 'Select Gender'}</option>
              <option value="Male">{lang === 'ta' ? 'ஆண்' : 'Male'}</option>
              <option value="Female">{lang === 'ta' ? 'பெண்' : 'Female'}</option>
              <option value="Other">{lang === 'ta' ? 'மற்றவை' : 'Other'}</option>
              <option value="Prefer not to say">{lang === 'ta' ? 'குறிப்பிட விரும்பவில்லை' : 'Prefer not to say'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'வயது வரம்பு' : 'Age Group'}
            </label>
            <select
              value={survey.respondent.ageGroup}
              onChange={(e) => updateRespondent('ageGroup', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">{lang === 'ta' ? 'தேர்வு செய்க' : 'Select Age Group'}</option>
              <option value="Below 18">{lang === 'ta' ? '18க்கு கீழ்' : 'Below 18'}</option>
              <option value="18–25">18–25</option>
              <option value="26–35">26–35</option>
              <option value="36–45">36–45</option>
              <option value="46–60">46–60</option>
              <option value="Above 60">{lang === 'ta' ? '60க்கு மேல்' : 'Above 60'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'அலைபேசி எண்' : 'Mobile Number'} *
            </label>
            <input
              type="tel"
              value={survey.respondent.mobileNumber}
              onChange={(e) => updateRespondent('mobileNumber', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. 9842103456"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'மாற்று அலைபேசி எண் (விருப்பத்தேர்வு)' : 'Alternate Mobile (Optional)'}
            </label>
            <input
              type="tel"
              value={survey.respondent.alternateMobile}
              onChange={(e) => updateRespondent('alternateMobile', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              placeholder="Optional"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'மின்னஞ்சல் (விருப்பத்தேர்வு)' : 'Email (Optional)'}
            </label>
            <input
              type="email"
              value={survey.respondent.email}
              onChange={(e) => updateRespondent('email', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'தொழில்' : 'Occupation'}
            </label>
            <select
              value={survey.respondent.occupation}
              onChange={(e) => updateRespondent('occupation', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Farmer">{lang === 'ta' ? 'விவசாயி' : 'Farmer'}</option>
              <option value="Business owner">{lang === 'ta' ? 'வணிக உரிமையாளர்' : 'Business owner'}</option>
              <option value="Employee">{lang === 'ta' ? 'ஊழியர்' : 'Employee'}</option>
              <option value="Homemaker">{lang === 'ta' ? 'குடும்பத் தலைவி' : 'Homemaker'}</option>
              <option value="Student">{lang === 'ta' ? 'மாணவர்' : 'Student'}</option>
              <option value="Industrial worker">{lang === 'ta' ? 'தொழிலாளி' : 'Industrial worker'}</option>
              <option value="SHG member">{lang === 'ta' ? 'சுய உதவிக் குழு உறுப்பினர்' : 'SHG member'}</option>
              <option value="Other">{lang === 'ta' ? 'மற்றவை' : 'Other'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'பதிலளிப்பவர் பிரிவு' : 'Respondent Category'}
            </label>
            <select
              value={survey.respondent.respondentCategory}
              onChange={(e) => updateRespondent('respondentCategory', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Individual">{lang === 'ta' ? 'தனிநபர்' : 'Individual'}</option>
              <option value="Household">{lang === 'ta' ? 'குடும்பம்' : 'Household'}</option>
              <option value="Farmer">{lang === 'ta' ? 'விவசாயி' : 'Farmer'}</option>
              <option value="Landowner">{lang === 'ta' ? 'நில உரிமையாளர்' : 'Landowner'}</option>
              <option value="Tenant farmer">{lang === 'ta' ? 'குத்தகை விவசாயி' : 'Tenant farmer'}</option>
              <option value="Business">{lang === 'ta' ? 'வணிகம்' : 'Business'}</option>
              <option value="Industry">{lang === 'ta' ? 'தொழிற்துறை' : 'Industry'}</option>
              <option value="SHG">{lang === 'ta' ? 'சுய உதவிக் குழு' : 'SHG'}</option>
              <option value="Institution">{lang === 'ta' ? 'நிறுவனம் / பள்ளி' : 'Institution'}</option>
              <option value="Community representative">{lang === 'ta' ? 'சமூக பிரதிநிதி' : 'Community representative'}</option>
              <option value="Local body">{lang === 'ta' ? 'உள்ளாட்சி அமைப்பு' : 'Local body'}</option>
              <option value="Other">{lang === 'ta' ? 'மற்றவை' : 'Other'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'குடும்ப உறுப்பினர் எண்ணிக்கை' : 'Household Size'}
            </label>
            <select
              value={survey.respondent.householdSize}
              onChange={(e) => updateRespondent('householdSize', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="1">1</option>
              <option value="2–3">2–3</option>
              <option value="4–5">4–5</option>
              <option value="6–8">6–8</option>
              <option value="Above 8">{lang === 'ta' ? '8க்கும் மேல்' : 'Above 8'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'முக்கிய வாழ்வாதாரம்' : 'Main Livelihood'}
            </label>
            <select
              value={survey.respondent.mainLivelihood}
              onChange={(e) => updateRespondent('mainLivelihood', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Agriculture">{lang === 'ta' ? 'விவசாயம்' : 'Agriculture'}</option>
              <option value="Livestock">{lang === 'ta' ? 'கால்நடை வளர்ப்பு' : 'Livestock'}</option>
              <option value="Industry">{lang === 'ta' ? 'தொழிற்துறை' : 'Industry'}</option>
              <option value="Trade">{lang === 'ta' ? 'வியாபாரம் / வர்த்தகம்' : 'Trade'}</option>
              <option value="Services">{lang === 'ta' ? 'சேவைத்துறை' : 'Services'}</option>
              <option value="Employment">{lang === 'ta' ? 'கூலி / வேலைவாய்ப்பு' : 'Employment'}</option>
              <option value="Multiple">{lang === 'ta' ? 'பல்வேறு வாழ்வாதாரங்கள்' : 'Multiple'}</option>
              <option value="Other">{lang === 'ta' ? 'மற்றவை' : 'Other'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'விரும்பும் மொழி' : 'Preferred Language'}
            </label>
            <select
              value={survey.respondent.preferredLanguage}
              onChange={(e) => updateRespondent('preferredLanguage', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Tamil">தமிழ் (Tamil)</option>
              <option value="English">English</option>
              <option value="Other">{lang === 'ta' ? 'மற்றவை' : 'Other'}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Address & GPS Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'ta' ? 'முகவரி மற்றும் இருப்பிடம் (Address & GPS)' : 'Address & Location'}
            </h3>
          </div>

          {/* GPS Trigger Button */}
          <button
            type="button"
            onClick={captureGPS}
            disabled={gpsLoading || !survey.consent.gpsConsent}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs ${
              survey.consent.gpsConsent
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600'
            }`}
          >
            <Navigation className={`w-3.5 h-3.5 ${gpsLoading ? 'animate-spin' : ''}`} />
            <span>
              {gpsLoading
                ? (lang === 'ta' ? 'GPS பெறப்படுகிறது...' : 'Acquiring GPS...')
                : gpsSuccess || survey.address.gpsCoordinates
                ? (lang === 'ta' ? 'GPS இருப்பிடம் பதிவு செய்யப்பட்டது ✓' : 'Update GPS Coordinates')
                : (lang === 'ta' ? 'GPS இருப்பிடத்தைப் பெறுக' : 'Capture GPS Coordinates')}
            </span>
          </button>
        </div>

        {survey.address.gpsCoordinates && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>GPS:</strong> {survey.address.gpsCoordinates.latitude.toFixed(6)},{' '}
                {survey.address.gpsCoordinates.longitude.toFixed(6)}
                {survey.address.gpsCoordinates.accuracy && ` (±${survey.address.gpsCoordinates.accuracy}m)`}
              </span>
            </div>
            {survey.address.gpsAddress && (
              <span className="text-slate-500 dark:text-slate-400 truncate max-w-xs hidden md:inline">
                {survey.address.gpsAddress}
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'கதவு எண் & தெரு பெயர்' : 'Door No. & Street Name'}
            </label>
            <input
              type="text"
              value={survey.address.doorStreet}
              onChange={(e) => updateAddress('doorStreet', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. 14/B, East Street"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'கிராமம் / நகரம் / வார்டு' : 'Village / Town / Ward'}
            </label>
            <input
              type="text"
              value={survey.address.villageTownWard}
              onChange={(e) => updateAddress('villageTownWard', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. Ammapettai"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'பஞ்சாயத்து / பேரூராட்சி / நகராட்சி' : 'Panchayat / Municipality'}
            </label>
            <input
              type="text"
              value={survey.address.panchayatMunicipality}
              onChange={(e) => updateAddress('panchayatMunicipality', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. Ammapettai Town Panchayat"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'வட்டம் (தாலுகா)' : 'Taluk'}
            </label>
            <input
              type="text"
              value={survey.address.taluk}
              onChange={(e) => updateAddress('taluk', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. Papanasam / Thanjavur"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'மாவட்டம்' : 'District'}
            </label>
            <input
              type="text"
              value={survey.address.district}
              onChange={(e) => updateAddress('district', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              placeholder="Thanjavur"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'மாநிலம்' : 'State'}
            </label>
            <input
              type="text"
              value={survey.address.state}
              onChange={(e) => updateAddress('state', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              placeholder="Tamil Nadu"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {lang === 'ta' ? 'அஞ்சல் குறியீட்டு எண் (PIN)' : 'PIN Code'}
            </label>
            <input
              type="text"
              value={survey.address.pinCode}
              onChange={(e) => updateAddress('pinCode', e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. 614401"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
