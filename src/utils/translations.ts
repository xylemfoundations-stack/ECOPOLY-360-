import { Language } from '../types/survey';

export const UI_TEXT = {
  brandTitle: {
    en: 'ECOPOLY 360°',
    ta: 'எக்கோபாலி 360°'
  },
  brandSubtitle: {
    en: 'Life Management Field Survey',
    ta: 'வாழ்க்கை மேலாண்மை கள ஆய்வு'
  },
  promoter: {
    en: 'Promoter: Xylem Foundations · Pilot: Maruthu Pandiyar College of Arts and Science',
    ta: 'முன்னெடுப்பு: சைலம் ஃபவுண்டேஷன்ஸ் · முன்னோடி மையம்: மருது பாண்டியர் கலை மற்றும் அறிவியல் கல்லூரி'
  },
  navDashboard: {
    en: 'Surveyor Dashboard',
    ta: 'ஆய்வாளர் முகப்பு'
  },
  navSurvey: {
    en: 'Field Survey',
    ta: 'கள ஆய்வு வினாடி வினா'
  },
  navAdmin: {
    en: 'Admin Review',
    ta: 'நிர்வாக மதிப்பாய்வு'
  },
  newSurveyBtn: {
    en: 'Start New Survey',
    ta: 'புதிய கள ஆய்வு தொடங்குக'
  },
  resumeSurveyBtn: {
    en: 'Resume Survey',
    ta: 'ஆய்வைத் தொடர்க'
  },
  saveAutoNotice: {
    en: 'Auto-saved locally',
    ta: 'உள்ளமைவாக தானாகச் சேமிக்கப்பட்டது'
  },
  saveAndContinue: {
    en: 'Save & Continue Later',
    ta: 'சேமித்து பின்னர் தொடர்க'
  },
  prevStage: {
    en: 'Previous Stage',
    ta: 'முந்தைய படி'
  },
  nextStage: {
    en: 'Next Stage',
    ta: 'அடுத்த படி'
  },
  completeAndSubmit: {
    en: 'Submit Completed Survey',
    ta: 'முழு ஆய்வையும் சமர்ப்பிக்கவும்'
  },
  stageOf: {
    en: 'Stage',
    ta: 'படி'
  },
  of: {
    en: 'of',
    ta: 'இல்'
  },
  requiredNotice: {
    en: 'Consent is mandatory before proceeding to field data collection.',
    ta: 'களத் தகவல் சேகரிப்பைத் தொடர பதிலளிப்பவரின் இசைவு கட்டாயமாகும்.'
  },
  consentDeniedWarning: {
    en: 'Permission to conduct survey was declined. By protocol, no further data may be collected.',
    ta: 'ஆய்வு நடத்த அனுமதி மறுக்கப்பட்டது. விதிகளின்படி, மேலும் விவரங்களைச் சேகரிக்க முடியாது.'
  },
  exportCsv: {
    en: 'Export Registry (CSV)',
    ta: 'பதிவேட்டை பதிவிறக்கு (CSV)'
  },
  exportJson: {
    en: 'Export All (JSON)',
    ta: 'அனைத்தையும் பதிவிறக்கு (JSON)'
  },
  loadPilotData: {
    en: 'Load Pilot Sample Survey',
    ta: 'முன்னோடி மாதிரி ஆய்வை ஏற்று'
  }
};

export function t(key: keyof typeof UI_TEXT, lang: Language): string {
  const item = UI_TEXT[key];
  if (!item) return '';
  return item[lang] || item['en'];
}
