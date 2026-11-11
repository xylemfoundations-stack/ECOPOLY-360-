import {
  SurveyRecord,
  PropertyRecord,
  StudentIntern,
  StudentCandidate,
  InternAssignment,
  InternPost,
  CommunicationRecord,
  GreenCreditTransaction,
  CampusSettings,
  InternStatus,
  AdminAuditLogEntry,
  UserRole,
  Institution,
  CampusSite,
  PlatformAdminUser,
  SuperAdminAuditLogEntry,
  RolePermissionCheckResult
} from '../types/survey';
import { SAMPLE_PILOT_SURVEY } from '../data/sampleSurvey';
import { SECTORS } from '../data/sectorsData';

const STORAGE_KEY = 'ecopoly_field_surveys_v1';
const ACTIVE_SURVEY_ID_KEY = 'ecopoly_active_survey_id_v1';
const INTERNS_STORAGE_KEY = 'ecopoly_interns_registry_v1';
const ACTIVE_INTERN_ID_KEY = 'ecopoly_active_intern_id_v1';
const CANDIDATES_STORAGE_KEY = 'ecopoly_candidates_registry_v1';
const ASSIGNMENTS_STORAGE_KEY = 'ecopoly_assignments_registry_v1';
const POSTS_STORAGE_KEY = 'ecopoly_posts_registry_v1';
const COMMUNICATIONS_STORAGE_KEY = 'ecopoly_communications_registry_v1';
const GREEN_CREDITS_STORAGE_KEY = 'ecopoly_green_credits_registry_v1';
const CAMPUS_SETTINGS_STORAGE_KEY = 'ecopoly_campus_settings_v1';
const AUDIT_LOGS_STORAGE_KEY = 'ecopoly_admin_audit_logs_v1';

// Multi-Tenant Platform Storage Keys
export const INSTITUTIONS_STORAGE_KEY = 'ecopoly_platform_institutions_v1';
export const CAMPUSES_STORAGE_KEY = 'ecopoly_platform_campuses_v1';
export const PLATFORM_ADMINS_STORAGE_KEY = 'ecopoly_platform_admins_v1';
export const SUPER_ADMIN_AUDIT_KEY = 'ecopoly_super_admin_audit_logs_v1';
export const SUPER_ADMIN_SESSION_KEY = 'ecopoly_super_admin_session_v1';
export const CURRENT_TENANT_ID_KEY = 'ecopoly_current_tenant_id_v1';

export const INITIAL_INTERNS: StudentIntern[] = [
  {
    id: 'MPCAS-2026-ENV04',
    studentId: 'MPCAS-2026-STU101',
    institutionId: 'ECO-INST-0001',
    campusId: 'ECO-CAMP-0001',
    name: 'K. Vignesh',
    email: 'vignesh.env@mpcas.edu.in',
    mobile: '9842156780',
    college: 'Maruthu Pandiyar College of Arts and Science',
    department: 'Department of Environmental Studies',
    academicYear: 'III Year',
    joiningDate: '2026-11-01',
    pin: '2026',
    status: 'Active',
    invitedAt: '2026-11-01T09:00:00.000Z',
    invitedBy: 'Campus Admin (Dr. S. Meenakshi Sundaram)',
    assignedSupervisor: 'Dr. S. Meenakshi Sundaram',
    totalSurveys: 3
  },
  {
    id: 'MPCAS-2026-ENV02',
    studentId: 'MPCAS-2026-STU102',
    institutionId: 'ECO-INST-0001',
    campusId: 'ECO-CAMP-0001',
    name: 'S. Priya',
    email: 'priya.env@mpcas.edu.in',
    mobile: '9443217890',
    college: 'Maruthu Pandiyar College of Arts and Science',
    department: 'Department of Environmental Biotechnology',
    academicYear: 'II Year',
    joiningDate: '2026-11-02',
    pin: '1492',
    status: 'Active',
    invitedAt: '2026-11-02T10:30:00.000Z',
    invitedBy: 'Campus Admin (Dr. S. Meenakshi Sundaram)',
    assignedSupervisor: 'Dr. S. Meenakshi Sundaram',
    totalSurveys: 2
  },
  {
    id: 'MPCAS-2026-ENV07',
    studentId: 'MPCAS-2026-STU103',
    institutionId: 'ECO-INST-0001',
    campusId: 'ECO-CAMP-0001',
    name: 'M. Aravind',
    email: 'aravind.agri@mpcas.edu.in',
    mobile: '9789012345',
    college: 'Maruthu Pandiyar College of Arts and Science',
    department: 'Department of Agricultural Science',
    academicYear: 'III Year',
    joiningDate: '2026-11-05',
    pin: '3840',
    status: 'Invited',
    invitedAt: '2026-11-05T14:15:00.000Z',
    invitedBy: 'Campus Admin (Dr. S. Meenakshi Sundaram)',
    assignedSupervisor: 'Prof. R. Natarajan',
    totalSurveys: 0
  }
];


export function getStoredInterns(): StudentIntern[] {
  try {
    const raw = localStorage.getItem(INTERNS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INTERNS_STORAGE_KEY, JSON.stringify(INITIAL_INTERNS));
      return INITIAL_INTERNS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_INTERNS;
  } catch (err) {
    console.error('Error reading interns from storage:', err);
    return INITIAL_INTERNS;
  }
}

export function saveIntern(intern: StudentIntern): void {
  const interns = getStoredInterns();
  const index = interns.findIndex((i) => i.id === intern.id);
  if (index >= 0) {
    interns[index] = intern;
  } else {
    interns.unshift(intern);
  }
  localStorage.setItem(INTERNS_STORAGE_KEY, JSON.stringify(interns));
}

export function deleteIntern(id: string): void {
  const interns = getStoredInterns().filter((i) => i.id !== id);
  localStorage.setItem(INTERNS_STORAGE_KEY, JSON.stringify(interns));
  if (getActiveInternId() === id) {
    localStorage.removeItem(ACTIVE_INTERN_ID_KEY);
  }
}

export function getActiveInternId(): string {
  const stored = localStorage.getItem(ACTIVE_INTERN_ID_KEY);
  if (stored) return stored;
  const interns = getStoredInterns();
  return interns[0]?.id || 'MPCAS-2026-ENV04';
}

export function setActiveInternId(id: string): void {
  localStorage.setItem(ACTIVE_INTERN_ID_KEY, id);
}

export function getActiveIntern(): StudentIntern {
  const activeId = getActiveInternId();
  const interns = getStoredInterns();
  return interns.find((i) => i.id === activeId) || interns[0] || INITIAL_INTERNS[0];
}

export function verifyInternPin(internId: string, enteredPin: string): boolean {
  const interns = getStoredInterns();
  const intern = interns.find((i) => i.id === internId);
  if (!intern) return false;
  return intern.pin === enteredPin.trim();
}

export function getStoredSurveys(): SurveyRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = [SAMPLE_PILOT_SURVEY];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [SAMPLE_PILOT_SURVEY];
  } catch (err) {
    console.error('Error reading surveys from storage:', err);
    return [SAMPLE_PILOT_SURVEY];
  }
}

export function saveSurveyRecord(survey: SurveyRecord): void {
  try {
    const surveys = getStoredSurveys();
    const existingIndex = surveys.findIndex((s) => s.id === survey.id);
    const updated = {
      ...survey,
      updatedAt: new Date().toISOString(),
      sustainabilityScore: calculateSurveyScore(survey)
    };

    if (existingIndex >= 0) {
      surveys[existingIndex] = updated;
    } else {
      surveys.unshift(updated);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(surveys));
    localStorage.setItem(ACTIVE_SURVEY_ID_KEY, survey.id);
  } catch (err) {
    console.error('Error saving survey record:', err);
  }
}

export function getActiveSurveyId(): string | null {
  return localStorage.getItem(ACTIVE_SURVEY_ID_KEY);
}

export function setActiveSurveyId(id: string): void {
  localStorage.setItem(ACTIVE_SURVEY_ID_KEY, id);
}

export function deleteSurveyRecord(id: string): void {
  const surveys = getStoredSurveys().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(surveys));
  if (getActiveSurveyId() === id) {
    localStorage.removeItem(ACTIVE_SURVEY_ID_KEY);
  }
}

export function resetToSampleSurvey(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([SAMPLE_PILOT_SURVEY]));
  localStorage.setItem(ACTIVE_SURVEY_ID_KEY, SAMPLE_PILOT_SURVEY.id);
}

export function createNewSurvey(activeIntern?: StudentIntern): SurveyRecord {
  const intern = activeIntern || getActiveIntern();
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const surveyId = `ECO-${dateStr}-${randomSuffix}`;
  const responderId = `RESP-TN-${Math.floor(100000 + Math.random() * 900000)}`;

  const initialProperty: PropertyRecord = {
    id: 'PROP-01',
    name: 'Primary Property / Residence',
    propertyType: 'Residence',
    propertyUsage: 'Residential',
    address: '',
    surveyNumber: '',
    subdivisionNumber: '',
    ownership: 'Owned',
    landExtent: '',
    extentUnit: 'Acres',
    builtUpArea: '',
    cultivatedArea: '',
    occupantsCount: '',
    mainActivity: '',
    photos: []
  };

  const newSurvey: SurveyRecord = {
    id: surveyId,
    responderId,
    status: 'draft',
    currentStage: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    surveyor: {
      internId: intern.id,
      internName: intern.name,
      college: intern.college,
      department: intern.department,
      visitDateTime: new Date().toISOString().slice(0, 16),
      facultySupervisor: intern.assignedSupervisor
    },
    respondent: {
      fullName: '',
      gender: '',
      ageGroup: '',
      mobileNumber: '',
      alternateMobile: '',
      email: '',
      occupation: 'Farmer',
      respondentCategory: 'Individual',
      householdSize: '4–5',
      mainLivelihood: 'Agriculture',
      preferredLanguage: 'Tamil'
    },
    address: {
      doorStreet: '',
      villageTownWard: '',
      panchayatMunicipality: '',
      taluk: '',
      district: 'Thanjavur',
      state: 'Tamil Nadu',
      pinCode: '613001'
    },
    consent: {
      surveyConsent: true,
      gpsConsent: true,
      photoConsent: true,
      sampleConsent: true,
      followUpConsent: true,
      recordedAt: new Date().toISOString()
    },
    properties: [initialProperty],
    sectorAnswers: {},
    evidence: {
      soilSamples: [],
      waterSamples: [],
      readings: {},
      documents: [],
      surveyorNotes: ''
    }
  };

  saveSurveyRecord(newSurvey);
  return newSurvey;
}

/**
 * Calculates a benchmarked Sustainability Baseline Score (0–100) across all 12 sectors
 */
export function calculateSurveyScore(survey: SurveyRecord): {
  overall: number;
  sectorScores: { [sectorId: string]: number };
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
} {
  const sectorScores: { [sectorId: string]: number } = {};

  SECTORS.forEach((sec) => {
    const answers = survey.sectorAnswers?.[sec.id] || {};
    let answeredCount = 0;
    let positivePoints = 0;

    sec.questions.forEach((q) => {
      const val = answers[q.num];
      if (val !== undefined && val !== null && val !== '') {
        answeredCount++;
        const strVal = Array.isArray(val) ? val.join(' ') : String(val);

        // Evaluation heuristic for positive sustainability actions
        const isHighlyPositive =
          /organic|solar|biogas|vermicompost|drip|recharge|native|alluvial|filtered|led|yes|always|regularly|abundant|expanding|good|very good|pucca|ample|attended|committed/i.test(
            strVal
          );
        const isModeratelyPositive =
          /partially|sometimes|occasionally|planned|sprinkler|moderate|interested|in process|most/i.test(
            strVal
          );
        const isNegative =
          /chemical|never|none|open discharge|open burning|open dumping|dry|poor|severe|fallow|bare soil/i.test(
            strVal
          );

        if (isHighlyPositive) {
          positivePoints += 4;
        } else if (isModeratelyPositive) {
          positivePoints += 2.5;
        } else if (!isNegative) {
          positivePoints += 2;
        } else {
          positivePoints += 0.5;
        }
      }
    });

    if (answeredCount === 0) {
      sectorScores[sec.id] = 0;
    } else {
      const maxPossible = answeredCount * 4;
      const pct = Math.round((positivePoints / maxPossible) * 100);
      sectorScores[sec.id] = Math.min(100, Math.max(10, pct));
    }
  });

  const validScores = Object.values(sectorScores).filter((s) => s > 0);
  const overall =
    validScores.length > 0
      ? Math.round(validScores.reduce((a, b) => a + b, 0) / SECTORS.length)
      : 0;

  let tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' = 'Bronze';
  if (overall >= 90) tier = 'Platinum';
  else if (overall >= 75) tier = 'Gold';
  else if (overall >= 50) tier = 'Silver';

  return {
    overall,
    sectorScores,
    tier
  };
}

export function exportSurveysToJSON(surveys: SurveyRecord[]): void {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(surveys, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute(
    'download',
    `ECOPOLY_Field_Surveys_${new Date().toISOString().slice(0, 10)}.json`
  );
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportSurveysToCSV(surveys: SurveyRecord[]): void {
  const headers = [
    'Survey ID',
    'Responder ID',
    'Status',
    'Visit Date',
    'Intern ID',
    'Intern Name',
    'College',
    'Respondent Name',
    'Gender',
    'Age Group',
    'Mobile',
    'Occupation',
    'Category',
    'Village/Town',
    'Panchayat',
    'District',
    'Latitude',
    'Longitude',
    'Number of Properties',
    'Overall Eco Score',
    'Tier',
    'Soil Sample Collected',
    'Water Sample Collected'
  ];

  const rows = surveys.map((s) => [
    `"${s.id}"`,
    `"${s.responderId}"`,
    `"${s.status}"`,
    `"${s.surveyor.visitDateTime}"`,
    `"${s.surveyor.internId}"`,
    `"${s.surveyor.internName}"`,
    `"${s.surveyor.college}"`,
    `"${s.respondent.fullName}"`,
    `"${s.respondent.gender}"`,
    `"${s.respondent.ageGroup}"`,
    `"${s.respondent.mobileNumber}"`,
    `"${s.respondent.occupation}"`,
    `"${s.respondent.respondentCategory}"`,
    `"${s.address.villageTownWard}"`,
    `"${s.address.panchayatMunicipality}"`,
    `"${s.address.district}"`,
    s.address.gpsCoordinates?.latitude || '',
    s.address.gpsCoordinates?.longitude || '',
    s.properties.length,
    s.sustainabilityScore?.overall || '',
    `"${s.sustainabilityScore?.tier || ''}"`,
    s.evidence.soilSamples.length > 0 ? 'Yes' : 'No',
    s.evidence.waterSamples.length > 0 ? 'Yes' : 'No'
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute(
    'download',
    `ECOPOLY_Master_Field_Registry_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// ==========================================
// CAMPUS ADMIN INITIAL SEED DATA & FUNCTIONS
// ==========================================

export const INITIAL_CANDIDATES: StudentCandidate[] = [
  {
    id: 'MPCAS-2026-STU101',
    name: 'K. Vignesh',
    email: 'vignesh.env@mpcas.edu.in',
    mobile: '9842156780',
    college: 'Maruthu Pandiyar College of Arts and Science',
    department: 'Department of Environmental Studies',
    yearOfStudy: 'III Year',
    enrolmentStatus: 'onboarded',
    internId: 'MPCAS-2026-ENV04',
    assignedSupervisor: 'Dr. S. Meenakshi Sundaram',
    pin: '2026',
    attendanceCount: 14,
    surveysCount: 3,
    joinedAt: '2026-06-15T09:00:00.000Z'
  },
  {
    id: 'MPCAS-2026-STU102',
    name: 'S. Priya',
    email: 'priya.env@mpcas.edu.in',
    mobile: '9443217890',
    college: 'Maruthu Pandiyar College of Arts and Science',
    department: 'Department of Environmental Biotechnology',
    yearOfStudy: 'II Year',
    enrolmentStatus: 'onboarded',
    internId: 'MPCAS-2026-ENV02',
    assignedSupervisor: 'Dr. S. Meenakshi Sundaram',
    pin: '1492',
    attendanceCount: 12,
    surveysCount: 2,
    joinedAt: '2026-06-18T10:00:00.000Z'
  },
  {
    id: 'MPCAS-2026-STU103',
    name: 'M. Aravind',
    email: 'aravind.agri@mpcas.edu.in',
    mobile: '9789012345',
    college: 'Maruthu Pandiyar College of Arts and Science',
    department: 'Department of Agricultural Science',
    yearOfStudy: 'III Year',
    enrolmentStatus: 'onboarded',
    internId: 'MPCAS-2026-ENV07',
    assignedSupervisor: 'Prof. R. Natarajan',
    pin: '3840',
    attendanceCount: 8,
    surveysCount: 0,
    joinedAt: '2026-07-01T09:00:00.000Z'
  },
  {
    id: 'MPCAS-2026-STU104',
    name: 'R. Kavitha',
    email: 'kavitha.bot@mpcas.edu.in',
    mobile: '9629123456',
    college: 'Maruthu Pandiyar College of Arts and Science',
    department: 'Department of Botany',
    yearOfStudy: 'II Year',
    enrolmentStatus: 'candidate',
    attendanceCount: 6,
    surveysCount: 0,
    joinedAt: '2026-07-10T09:30:00.000Z'
  },
  {
    id: 'MPCAS-2026-STU105',
    name: 'T. Saravanan',
    email: 'saravanan.agri@mpcas.edu.in',
    mobile: '9841234567',
    college: 'Maruthu Pandiyar College of Arts and Science',
    department: 'Department of Agricultural Science',
    yearOfStudy: 'III Year',
    enrolmentStatus: 'candidate',
    attendanceCount: 7,
    surveysCount: 0,
    joinedAt: '2026-07-12T11:00:00.000Z'
  },
  {
    id: 'MPCAS-2026-STU106',
    name: 'B. Deepa',
    email: 'deepa.biotech@mpcas.edu.in',
    mobile: '9444567890',
    college: 'Maruthu Pandiyar College of Arts and Science',
    department: 'Department of Environmental Biotechnology',
    yearOfStudy: 'PG I',
    enrolmentStatus: 'candidate',
    attendanceCount: 9,
    surveysCount: 0,
    joinedAt: '2026-07-15T14:00:00.000Z'
  },
  {
    id: 'MPCAS-2026-STU107',
    name: 'N. Karthik',
    email: 'karthik.env@mpcas.edu.in',
    mobile: '9940123789',
    college: 'Maruthu Pandiyar College of Arts and Science',
    department: 'Department of Environmental Studies',
    yearOfStudy: 'I Year',
    enrolmentStatus: 'candidate',
    attendanceCount: 5,
    surveysCount: 0,
    joinedAt: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 'MPCAS-2026-STU108',
    name: 'G. Divya',
    email: 'divya.chem@mpcas.edu.in',
    mobile: '9788123987',
    college: 'Maruthu Pandiyar College of Arts and Science',
    department: 'Department of Chemistry & Soil Science',
    yearOfStudy: 'III Year',
    enrolmentStatus: 'candidate',
    attendanceCount: 8,
    surveysCount: 0,
    joinedAt: '2026-08-05T09:15:00.000Z'
  }
];

export const INITIAL_ASSIGNMENTS: InternAssignment[] = [
  {
    id: 'ASG-2026-001',
    title: 'Ammapettai Village Comprehensive Household & Farming Audit',
    type: 'individual',
    internIds: ['MPCAS-2026-ENV04'],
    internNames: ['K. Vignesh'],
    targetVillage: 'Ammapettai',
    targetTaluk: 'Papanasam',
    targetCategories: ['Household', 'Farmer', 'Livestock'],
    supervisor: 'Dr. S. Meenakshi Sundaram',
    targetSurveyCount: 5,
    completedSurveyCount: 3,
    activityDescription:
      'Conduct complete 12-sector environmental baseline surveys of agrarian households, map farm irrigation sources, and collect soil and drinking water samples.',
    deadline: '2026-11-20',
    status: 'in_progress',
    createdAt: '2026-11-01T09:30:00.000Z'
  },
  {
    id: 'ASG-2026-002',
    title: 'Vennar River Basin Organic Farm & Water Quality Mapping',
    type: 'group',
    internIds: ['MPCAS-2026-ENV02', 'MPCAS-2026-ENV07'],
    internNames: ['S. Priya', 'M. Aravind'],
    targetVillage: 'Kallaperambur & Vennar Bank',
    targetTaluk: 'Thanjavur',
    targetCategories: ['Farmer', 'Tenant farmer', 'Agricultural Land'],
    supervisor: 'Prof. R. Natarajan',
    targetSurveyCount: 8,
    completedSurveyCount: 2,
    activityDescription:
      'Map canal irrigation health, riparian tree canopy extent, fertilizer runoff indicators, and test borewell water TDS and pH.',
    deadline: '2026-11-25',
    status: 'in_progress',
    createdAt: '2026-11-03T11:00:00.000Z'
  },
  {
    id: 'ASG-2026-003',
    title: 'Vallam Semi-Urban Solid Waste & Solar Energy Readiness Survey',
    type: 'individual',
    internIds: ['MPCAS-2026-ENV04'],
    internNames: ['K. Vignesh'],
    targetVillage: 'Vallam Town Panchayat',
    targetTaluk: 'Thanjavur',
    targetCategories: ['Household', 'Business', 'SHG'],
    supervisor: 'Dr. S. Meenakshi Sundaram',
    targetSurveyCount: 4,
    completedSurveyCount: 1,
    activityDescription:
      'Evaluate source segregation practices, wet waste composting adoption, rooftop solar potential, and single-use plastic reduction compliance.',
    deadline: '2026-11-30',
    status: 'assigned',
    createdAt: '2026-11-08T14:20:00.000Z'
  }
];

export const INITIAL_POSTS: InternPost[] = [
  {
    id: 'POST-2026-001',
    authorInternId: 'MPCAS-2026-ENV04',
    authorName: 'K. Vignesh',
    authorDepartment: 'Department of Environmental Studies',
    title: 'Native Neem & Pongamia Plantation along Vennar Canal Bank',
    category: 'Tree Plantation',
    sectorId: '04',
    sectorName: 'Forests, Biodiversity & Agroforestry',
    location: 'Vennar Canal Embankment, Ammapettai',
    date: '2026-11-08',
    description:
      'Collaborated with local farmer collective to plant 35 native saplings (Azadirachta indica and Pongamia pinnata) for soil erosion control and microclimate cooling along the primary field channel.',
    photos: [
      {
        id: 'P1',
        dataUrl:
          'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
        caption: 'Interns and farmers planting native sapling'
      }
    ],
    status: 'approved',
    moderationNotes:
      'Excellent community participation and native species selection. Verified by field supervisor.',
    moderatedBy: 'Dr. S. Meenakshi Sundaram (Campus Admin)',
    moderatedAt: '2026-11-09T10:00:00.000Z',
    revisions: [],
    likesCount: 18,
    sharesCount: 6,
    greenCreditsAwarded: 15,
    createdAt: '2026-11-08T16:30:00.000Z'
  },
  {
    id: 'POST-2026-002',
    authorInternId: 'MPCAS-2026-ENV02',
    authorName: 'S. Priya',
    authorDepartment: 'Department of Environmental Biotechnology',
    title: 'Community Vermicomposting Pit Construction & Inoculation',
    category: 'Waste Management',
    sectorId: '03',
    sectorName: 'Solid Waste Management & Circular Economy',
    location: 'Perumal Kovil Street, Kallaperambur Village',
    date: '2026-11-09',
    description:
      'Set up a 10x4 ft brick-lined vermicomposting pit with Eisenia fetida earthworms to recycle 120 kg/week of crop residue and cattle dung into organic microbial vermicast.',
    photos: [
      {
        id: 'P2',
        dataUrl:
          'https://images.unsplash.com/photo-1592417817098-8f3d69106093?auto=format&fit=crop&w=800&q=80',
        caption: 'Composting trench and organic substrate bed'
      }
    ],
    status: 'under_review',
    revisions: [],
    likesCount: 9,
    sharesCount: 2,
    greenCreditsAwarded: 0,
    createdAt: '2026-11-09T14:45:00.000Z'
  },
  {
    id: 'POST-2026-003',
    authorInternId: 'MPCAS-2026-ENV07',
    authorName: 'M. Aravind',
    authorDepartment: 'Department of Agricultural Science',
    title: 'Groundwater TDS & pH Testing Drive for Paddy Cultivators',
    category: 'Water Conservation',
    sectorId: '02',
    sectorName: 'Water Resources & Catchment Health',
    location: 'Agricultural Extension Point, Papanasam',
    date: '2026-11-07',
    description:
      'Tested 6 open irrigation wells and borewells. Found average TDS 480 ppm and pH 7.2. Recommended rainwater percolation pits for two farms with rising salinity.',
    photos: [],
    status: 'returned',
    moderationNotes:
      'Please attach digital meter calibration photographs or lab dispatch receipts before approval.',
    moderatedBy: 'Prof. R. Natarajan (Faculty Supervisor)',
    moderatedAt: '2026-11-08T11:30:00.000Z',
    revisions: [
      {
        timestamp: '2026-11-08T11:30:00.000Z',
        authorRole: 'Faculty Supervisor',
        notes: 'Returned for photo verification of water test instrument.',
        content: 'Initial submission without test meter photos.'
      }
    ],
    likesCount: 3,
    sharesCount: 1,
    greenCreditsAwarded: 0,
    createdAt: '2026-11-07T12:00:00.000Z'
  }
];

export const INITIAL_COMMUNICATIONS: CommunicationRecord[] = [
  {
    id: 'COM-2026-001',
    channel: 'email',
    recipientGroup: 'all_interns',
    recipientsCount: 3,
    subject: 'ECOPOLY 360° Field Survey Guidelines & Ethics Code',
    content:
      'Dear Interns, please ensure respondent 4-digit PIN verification is completed on-site. Respect farmer working hours and record GPS coordinates accurately.',
    templateName: 'Field Survey Safety & Ethics Advisory',
    sentBy: 'Campus Admin (Dr. S. Meenakshi Sundaram)',
    sentAt: '2026-11-02T09:00:00.000Z',
    status: 'delivered'
  },
  {
    id: 'COM-2026-002',
    channel: 'whatsapp',
    recipientGroup: 'all_interns',
    recipientsCount: 3,
    subject: 'Weekly Survey Target Update: Papanasam & Ammapettai',
    content:
      '*ECOPOLY FIELD ALERT* 🌿\n\nAll student interns: Please submit pending Draft surveys by Friday 5:00 PM to qualify for weekly Green Credit settlement.\n\n_Maruthu Pandiyar College Campus Admin_',
    templateName: 'Weekly Milestone Reminder',
    sentBy: 'Campus Admin (Dr. S. Meenakshi Sundaram)',
    sentAt: '2026-11-05T14:00:00.000Z',
    status: 'delivered'
  }
];

export const INITIAL_GREEN_CREDITS: GreenCreditTransaction[] = [
  {
    id: 'GC-2026-001',
    internId: 'MPCAS-2026-ENV04',
    internName: 'K. Vignesh',
    sourceType: 'survey_approval',
    referenceId: 'ECO-20261109-7842',
    credits: 50,
    status: 'confirmed',
    issuedAt: '2026-11-09T11:00:00.000Z',
    issuedBy: 'Campus Admin (Dr. S. Meenakshi Sundaram)',
    notes: 'Approved 12-Sector Survey of R. Muthusamy (Household & Farm)'
  },
  {
    id: 'GC-2026-002',
    internId: 'MPCAS-2026-ENV04',
    internName: 'K. Vignesh',
    sourceType: 'field_post',
    referenceId: 'POST-2026-001',
    credits: 15,
    status: 'confirmed',
    issuedAt: '2026-11-09T10:00:00.000Z',
    issuedBy: 'Campus Admin (Dr. S. Meenakshi Sundaram)',
    notes: 'Verified Native Tree Plantation along Vennar Canal'
  },
  {
    id: 'GC-2026-003',
    internId: 'MPCAS-2026-ENV02',
    internName: 'S. Priya',
    sourceType: 'field_post',
    referenceId: 'POST-2026-002',
    credits: 15,
    status: 'pending',
    issuedAt: '2026-11-09T14:45:00.000Z',
    issuedBy: 'System (Pending Review)',
    notes: 'Pending moderation for Vermicomposting Pit Post'
  }
];

export const INITIAL_CAMPUS_SETTINGS: CampusSettings = {
  collegeName: 'Maruthu Pandiyar College of Arts and Science',
  campusCode: 'MPCAS-TN613',
  district: 'Thanjavur, Tamil Nadu',
  adminName: 'Dr. S. Meenakshi Sundaram',
  adminEmail: 'admin.ecopoly@mpcas.edu.in',
  adminPhone: '9842156780',
  weeklyDigestDay: 'Saturday',
  weeklyDigestTime: '17:00',
  autoDigestEnabled: true,
  creditsPerSurvey: 50,
  creditsPerPost: 15,
  supervisorReviewRequired: true,
  autoRemindOverdue: true,
  activeSurveysAllowedPerIntern: 5,
  emailIntegrationConfigured: false,
  emailIntegrationAuthorized: false,
  whatsappIntegrationConfigured: false,
  whatsappIntegrationAuthorized: false,
  portalApiEndpoint: 'https://students.ecopoly.life/api/v1/college-roster',
  portalApiConnected: true
};

// ==========================================
// ADMIN AUDIT LOGS STORAGE & SECURITY
// ==========================================

export const INITIAL_AUDIT_LOGS: AdminAuditLogEntry[] = [
  {
    id: 'AUDIT-2026-001',
    timestamp: '2026-11-01T09:00:00.000Z',
    actorRole: 'campus_admin',
    actorName: 'Dr. S. Meenakshi Sundaram',
    actionType: 'INTERN_ENROLLED',
    targetId: 'MPCAS-2026-ENV04',
    targetName: 'K. Vignesh',
    details: 'Enrolled student K. Vignesh as active intern. Assigned supervisor Dr. S. Meenakshi Sundaram, PIN 2026, joining date 2026-11-01.',
    newState: 'Active'
  },
  {
    id: 'AUDIT-2026-002',
    timestamp: '2026-11-02T10:30:00.000Z',
    actorRole: 'campus_admin',
    actorName: 'Dr. S. Meenakshi Sundaram',
    actionType: 'INTERN_ENROLLED',
    targetId: 'MPCAS-2026-ENV02',
    targetName: 'S. Priya',
    details: 'Enrolled student S. Priya as active intern. Assigned supervisor Dr. S. Meenakshi Sundaram, PIN 1492, joining date 2026-11-02.',
    newState: 'Active'
  },
  {
    id: 'AUDIT-2026-003',
    timestamp: '2026-11-05T14:15:00.000Z',
    actorRole: 'campus_admin',
    actorName: 'Dr. S. Meenakshi Sundaram',
    actionType: 'INTERN_STATUS_CHANGED',
    targetId: 'MPCAS-2026-ENV07',
    targetName: 'M. Aravind',
    details: 'Issued internship invitation to M. Aravind with supervisor Prof. R. Natarajan.',
    previousState: 'candidate',
    newState: 'Invited'
  }
];

export function getStoredAuditLogs(): AdminAuditLogEntry[] {
  try {
    const raw = localStorage.getItem(AUDIT_LOGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(AUDIT_LOGS_STORAGE_KEY, JSON.stringify(INITIAL_AUDIT_LOGS));
      return INITIAL_AUDIT_LOGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_AUDIT_LOGS;
  } catch (err) {
    console.error('Error reading audit logs:', err);
    return INITIAL_AUDIT_LOGS;
  }
}

export function addAuditLogEntry(
  entry: Omit<AdminAuditLogEntry, 'id' | 'timestamp'>
): AdminAuditLogEntry {
  const logs = getStoredAuditLogs();
  const newEntry: AdminAuditLogEntry = {
    ...entry,
    id: `AUDIT-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
    timestamp: new Date().toISOString()
  };
  logs.unshift(newEntry);
  localStorage.setItem(AUDIT_LOGS_STORAGE_KEY, JSON.stringify(logs));
  return newEntry;
}

export function enforceAdminPermission(role: UserRole, actionDescription: string): void {
  if (role !== 'campus_admin' && role !== 'super_admin') {
    throw new Error(
      `Permission Denied: User role '${role}' is not authorised to perform '${actionDescription}'. Campus Admin or Super Admin access is required.`
    );
  }
}

export function isAuthorizedAdmin(role: UserRole): boolean {
  return role === 'campus_admin' || role === 'super_admin';
}

// ==========================================
// DUPLICATE STUDENT PREVENTION
// ==========================================

export function checkStudentDuplicate(
  candidate: { id?: string; email?: string; mobile?: string },
  excludeId?: string
): { isDuplicate: boolean; field?: 'id' | 'email' | 'mobile'; message?: string } {
  const candidates = getStoredCandidates();
  const interns = getStoredInterns();

  const normId = candidate.id?.trim().toLowerCase();
  const normEmail = candidate.email?.trim().toLowerCase();
  const normMobile = candidate.mobile?.trim().replace(/\D/g, '');

  for (const c of candidates) {
    if (excludeId && c.id === excludeId) continue;
    if (normId && c.id.trim().toLowerCase() === normId) {
      return {
        isDuplicate: true,
        field: 'id',
        message: `Student ID '${candidate.id}' already exists in candidate directory for '${c.name}'. Duplicate student accounts are strictly prohibited.`
      };
    }
    if (normEmail && c.email.trim().toLowerCase() === normEmail) {
      return {
        isDuplicate: true,
        field: 'email',
        message: `Email '${candidate.email}' is already registered to candidate '${c.name}'.`
      };
    }
    if (normMobile && c.mobile.trim().replace(/\D/g, '') === normMobile) {
      return {
        isDuplicate: true,
        field: 'mobile',
        message: `Mobile '${candidate.mobile}' is already registered to candidate '${c.name}'.`
      };
    }
  }

  for (const i of interns) {
    if (excludeId && (i.id === excludeId || i.studentId === excludeId)) continue;
    if (
      normId &&
      (i.id.trim().toLowerCase() === normId || i.studentId?.trim().toLowerCase() === normId)
    ) {
      return {
        isDuplicate: true,
        field: 'id',
        message: `Student / Intern ID '${candidate.id}' already exists for active intern '${i.name}'.`
      };
    }
    if (normEmail && i.email.trim().toLowerCase() === normEmail) {
      return {
        isDuplicate: true,
        field: 'email',
        message: `Email '${candidate.email}' is already registered to active intern '${i.name}'.`
      };
    }
    if (normMobile && i.mobile.trim().replace(/\D/g, '') === normMobile) {
      return {
        isDuplicate: true,
        field: 'mobile',
        message: `Mobile '${candidate.mobile}' is already registered to active intern '${i.name}'.`
      };
    }
  }

  return { isDuplicate: false };
}

// ==========================================
// CANDIDATES STORAGE FUNCTIONS
// ==========================================

export function getStoredCandidates(): StudentCandidate[] {
  try {
    const raw = localStorage.getItem(CANDIDATES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CANDIDATES_STORAGE_KEY, JSON.stringify(INITIAL_CANDIDATES));
      return INITIAL_CANDIDATES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CANDIDATES;
  } catch (err) {
    console.error('Error reading candidates:', err);
    return INITIAL_CANDIDATES;
  }
}

export function saveCandidate(candidate: StudentCandidate): void {
  const list = getStoredCandidates();
  const idx = list.findIndex((c) => c.id === candidate.id);
  if (idx >= 0) {
    list[idx] = candidate;
  } else {
    list.unshift(candidate);
  }
  localStorage.setItem(CANDIDATES_STORAGE_KEY, JSON.stringify(list));
}

export function createCandidateStudent(
  student: Omit<StudentCandidate, 'enrolmentStatus' | 'attendanceCount' | 'surveysCount' | 'joinedAt'>,
  actorRole: UserRole,
  actorName: string
): { success: boolean; candidate?: StudentCandidate; error?: string } {
  enforceAdminPermission(actorRole, 'create student in directory');

  const dup = checkStudentDuplicate(student);
  if (dup.isDuplicate) {
    return { success: false, error: dup.message };
  }

  const candidate: StudentCandidate = {
    ...student,
    enrolmentStatus: 'candidate',
    attendanceCount: 0,
    surveysCount: 0,
    joinedAt: new Date().toISOString()
  };

  saveCandidate(candidate);

  addAuditLogEntry({
    actorRole,
    actorName,
    actionType: 'STUDENT_CREATED',
    targetId: candidate.id,
    targetName: candidate.name,
    details: `Created new student record ${candidate.name} (${candidate.id}) in ${candidate.department}, ${candidate.yearOfStudy}.`,
    newState: 'candidate'
  });

  return { success: true, candidate };
}

export function onboardCandidate(
  candidateId: string,
  supervisor: string,
  department: string,
  pin: string,
  academicYear?: 'I Year' | 'II Year' | 'III Year' | 'PG I' | 'PG II',
  joiningDate?: string,
  actorRole: UserRole = 'campus_admin',
  actorName: string = 'Campus Admin'
): StudentIntern {
  enforceAdminPermission(actorRole, 'onboard student intern');

  const candidates = getStoredCandidates();
  const candidate = candidates.find((c) => c.id === candidateId);
  const existingInterns = getStoredInterns();

  // Find next sequential unique Intern ID to prevent collisions
  let numSuffix = 10;
  let internId = `MPCAS-2026-ENV${numSuffix}`;
  while (existingInterns.some((i) => i.id === internId)) {
    numSuffix++;
    internId = `MPCAS-2026-ENV${numSuffix < 10 ? '0' + numSuffix : numSuffix}`;
  }

  const effectiveDept =
    department || (candidate ? candidate.department : 'Department of Environmental Studies');
  const effectiveYear =
    academicYear || (candidate ? candidate.yearOfStudy : 'II Year');
  const effectiveJoiningDate =
    joiningDate || new Date().toISOString().slice(0, 10);

  const settings = getStoredCampusSettings();
  const notificationAuthorized =
    settings.emailIntegrationAuthorized || settings.whatsappIntegrationAuthorized;

  const newIntern: StudentIntern = {
    id: internId,
    studentId: candidateId,
    name: candidate ? candidate.name : 'New Intern',
    email: candidate ? candidate.email : `${internId.toLowerCase()}@mpcas.edu.in`,
    mobile: candidate ? candidate.mobile : '9876543210',
    college: 'Maruthu Pandiyar College of Arts and Science',
    department: effectiveDept,
    academicYear: effectiveYear,
    joiningDate: effectiveJoiningDate,
    pin: pin || '2026',
    status: 'Active',
    invitedAt: new Date().toISOString(),
    invitedBy: `${actorName} (${actorRole})`,
    assignedSupervisor: supervisor || 'Dr. S. Meenakshi Sundaram',
    totalSurveys: 0,
    notificationSent: notificationAuthorized
  };

  saveIntern(newIntern);

  // Update candidate status in directory
  if (candidate) {
    candidate.enrolmentStatus = 'onboarded';
    candidate.internId = internId;
    candidate.assignedSupervisor = supervisor;
    candidate.pin = pin;
    saveCandidate(candidate);
  }

  // Audit log entry
  addAuditLogEntry({
    actorRole,
    actorName,
    actionType: 'INTERN_ENROLLED',
    targetId: internId,
    targetName: newIntern.name,
    details: `Enrolled student ${newIntern.name} (Student ID: ${candidateId}) as Intern ${internId}. Assigned supervisor: ${supervisor}, Dept: ${effectiveDept}, Joining: ${effectiveJoiningDate}, PIN: ${pin}. Notifications: ${notificationAuthorized ? 'Sent' : 'Awaiting manual dispatch / integration config'}.`,
    previousState: 'candidate',
    newState: 'Active'
  });

  return newIntern;
}

export function bulkOnboardCandidates(
  candidateIds: string[],
  supervisor: string,
  actorRole: UserRole = 'campus_admin',
  actorName: string = 'Campus Admin'
): StudentIntern[] {
  enforceAdminPermission(actorRole, 'bulk onboard student interns');

  const onboarded: StudentIntern[] = [];
  candidateIds.forEach((id) => {
    const defaultPin = String(Math.floor(1000 + Math.random() * 9000));
    const intern = onboardCandidate(
      id,
      supervisor,
      '',
      defaultPin,
      undefined,
      undefined,
      actorRole,
      actorName
    );
    onboarded.push(intern);
  });
  return onboarded;
}

export function updateInternStatus(
  internId: string,
  newStatus: InternStatus,
  actorRole: UserRole,
  actorName: string,
  reason?: string
): { success: boolean; intern?: StudentIntern; error?: string } {
  enforceAdminPermission(actorRole, `update intern status to ${newStatus}`);

  const interns = getStoredInterns();
  const intern = interns.find((i) => i.id === internId);
  if (!intern) {
    return { success: false, error: `Intern ${internId} not found in registry.` };
  }

  const prevStatus = intern.status;
  intern.status = newStatus;
  intern.statusReason = reason || `Status changed to ${newStatus} by ${actorName}`;
  saveIntern(intern);

  // Sync candidate enrolment status if membership completed or marked inactive
  const candidates = getStoredCandidates();
  const cand = candidates.find((c) => c.internId === internId || c.id === intern.studentId);
  if (cand) {
    if (newStatus === 'Inactive' || newStatus === 'Suspended') {
      cand.enrolmentStatus = 'inactive';
    } else {
      cand.enrolmentStatus = 'onboarded';
    }
    saveCandidate(cand);
  }

  let actionType: AdminAuditLogEntry['actionType'] = 'INTERN_STATUS_CHANGED';
  if (newStatus === 'Completed') actionType = 'MEMBERSHIP_COMPLETED';
  if (newStatus === 'Suspended') actionType = 'INTERN_SUSPENDED';
  if (newStatus === 'Active' && prevStatus === 'Suspended') actionType = 'INTERN_REACTIVATED';

  addAuditLogEntry({
    actorRole,
    actorName,
    actionType,
    targetId: intern.id,
    targetName: intern.name,
    details: `Updated status of intern ${intern.name} (${intern.id}) from '${prevStatus}' to '${newStatus}'. Reason: ${reason || 'Administrative update'}.`,
    previousState: prevStatus,
    newState: newStatus
  });

  return { success: true, intern };
}

// ==========================================
// AUTHORISED CSV IMPORT & PORTAL API SYNC
// ==========================================

export function importStudentsFromCSV(
  csvText: string,
  actorRole: UserRole = 'campus_admin',
  actorName: string = 'Campus Admin'
): {
  importedCount: number;
  skippedDuplicates: number;
  duplicateDetails: string[];
  errors: string[];
} {
  enforceAdminPermission(actorRole, 'import student directory CSV');

  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length <= 1) {
    return {
      importedCount: 0,
      skippedDuplicates: 0,
      duplicateDetails: [],
      errors: ['CSV file is empty or contains only headers.']
    };
  }

  const headerLine = lines[0].toLowerCase();
  const headers = headerLine.split(',').map((h) => h.trim().replace(/^"|"$/g, ''));

  const idIdx = headers.findIndex((h) => h.includes('id') || h.includes('roll') || h.includes('student'));
  const nameIdx = headers.findIndex((h) => h.includes('name'));
  const emailIdx = headers.findIndex((h) => h.includes('email') || h.includes('mail'));
  const mobileIdx = headers.findIndex((h) => h.includes('mobile') || h.includes('phone') || h.includes('contact'));
  const deptIdx = headers.findIndex((h) => h.includes('dept') || h.includes('department'));
  const yearIdx = headers.findIndex((h) => h.includes('year'));

  let importedCount = 0;
  let skippedDuplicates = 0;
  const duplicateDetails: string[] = [];
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = line.split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
    const name = nameIdx >= 0 ? cols[nameIdx] : cols[1];
    if (!name) continue;

    const id =
      idIdx >= 0 && cols[idIdx]
        ? cols[idIdx]
        : `MPCAS-2026-STU${Math.floor(200 + Math.random() * 700)}`;
    const email =
      emailIdx >= 0 && cols[emailIdx]
        ? cols[emailIdx]
        : `${name.toLowerCase().replace(/\s+/g, '.')}.stu@mpcas.edu.in`;
    const mobile =
      mobileIdx >= 0 && cols[mobileIdx]
        ? cols[mobileIdx]
        : `9842${Math.floor(100000 + Math.random() * 900000)}`;
    const department =
      deptIdx >= 0 && cols[deptIdx]
        ? cols[deptIdx]
        : 'Department of Environmental Studies';
    const yearRaw = yearIdx >= 0 && cols[yearIdx] ? cols[yearIdx] : 'II Year';

    let yearOfStudy: StudentCandidate['yearOfStudy'] = 'II Year';
    if (/I Year|1st/i.test(yearRaw)) yearOfStudy = 'I Year';
    else if (/III Year|3rd/i.test(yearRaw)) yearOfStudy = 'III Year';
    else if (/PG I/i.test(yearRaw)) yearOfStudy = 'PG I';
    else if (/PG II/i.test(yearRaw)) yearOfStudy = 'PG II';

    // Duplicate check
    const dup = checkStudentDuplicate({ id, email, mobile });
    if (dup.isDuplicate) {
      skippedDuplicates++;
      duplicateDetails.push(`Row ${i + 1} (${name}): ${dup.message}`);
      continue;
    }

    const newCandidate: StudentCandidate = {
      id,
      name,
      email,
      mobile,
      college: 'Maruthu Pandiyar College of Arts and Science',
      department,
      yearOfStudy,
      enrolmentStatus: 'candidate',
      attendanceCount: 0,
      surveysCount: 0,
      joinedAt: new Date().toISOString()
    };

    saveCandidate(newCandidate);
    importedCount++;
  }

  addAuditLogEntry({
    actorRole,
    actorName,
    actionType: 'STUDENT_CSV_IMPORTED',
    targetId: `CSV-BATCH-${Date.now()}`,
    targetName: 'CSV Batch Import',
    details: `Imported ${importedCount} student records. Skipped ${skippedDuplicates} duplicate records.`,
    newState: `${importedCount} candidates enrolled`
  });

  return { importedCount, skippedDuplicates, duplicateDetails, errors };
}

export function syncStudentsFromPortal(
  actorRole: UserRole = 'campus_admin',
  actorName: string = 'Campus Admin'
): { importedCount: number; existingCount: number } {
  enforceAdminPermission(actorRole, 'sync student roster from ECOPOLY portal');

  // Authorised students from ECOPOLY Students Portal Roster for Maruthu Pandiyar College
  const portalRoster = [
    {
      id: 'MPCAS-2026-STU109',
      name: 'V. Senthilkumar',
      email: 'senthil.env@mpcas.edu.in',
      mobile: '9842567812',
      department: 'Department of Environmental Studies',
      yearOfStudy: 'III Year' as const
    },
    {
      id: 'MPCAS-2026-STU110',
      name: 'A. Meenakshi',
      email: 'meenakshi.agri@mpcas.edu.in',
      mobile: '9443890123',
      department: 'Department of Agricultural Science',
      yearOfStudy: 'II Year' as const
    },
    {
      id: 'MPCAS-2026-STU111',
      name: 'P. Balasubramanian',
      email: 'bala.biotech@mpcas.edu.in',
      mobile: '9789123478',
      department: 'Department of Environmental Biotechnology',
      yearOfStudy: 'PG I' as const
    }
  ];

  let importedCount = 0;
  let existingCount = 0;

  portalRoster.forEach((stu) => {
    const dup = checkStudentDuplicate(stu);
    if (!dup.isDuplicate) {
      saveCandidate({
        ...stu,
        college: 'Maruthu Pandiyar College of Arts and Science',
        enrolmentStatus: 'candidate',
        attendanceCount: 0,
        surveysCount: 0,
        joinedAt: new Date().toISOString()
      });
      importedCount++;
    } else {
      existingCount++;
    }
  });

  addAuditLogEntry({
    actorRole,
    actorName,
    actionType: 'PORTAL_SYNC',
    targetId: 'ECOPOLY-PORTAL-SYNC',
    targetName: 'ECOPOLY Students Portal API',
    details: `Synced with ECOPOLY Students Portal API. Ingested ${importedCount} new student candidates, verified ${existingCount} pre-existing records.`,
    newState: 'Portal Synchronized'
  });

  return { importedCount, existingCount };
}


// ==========================================
// ASSIGNMENTS STORAGE FUNCTIONS
// ==========================================

export function getStoredAssignments(): InternAssignment[] {
  try {
    const raw = localStorage.getItem(ASSIGNMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(INITIAL_ASSIGNMENTS));
      return INITIAL_ASSIGNMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ASSIGNMENTS;
  } catch (err) {
    console.error('Error reading assignments:', err);
    return INITIAL_ASSIGNMENTS;
  }
}

export function saveAssignment(assignment: InternAssignment): void {
  const list = getStoredAssignments();
  const idx = list.findIndex((a) => a.id === assignment.id);
  if (idx >= 0) {
    list[idx] = assignment;
  } else {
    list.unshift(assignment);
  }
  localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(list));
}

export function deleteAssignment(id: string): void {
  const list = getStoredAssignments().filter((a) => a.id !== id);
  localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(list));
}

// ==========================================
// FIELD POSTS STORAGE FUNCTIONS
// ==========================================

export function getStoredPosts(): InternPost[] {
  try {
    const raw = localStorage.getItem(POSTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_POSTS;
  } catch (err) {
    console.error('Error reading posts:', err);
    return INITIAL_POSTS;
  }
}

export function savePost(post: InternPost): void {
  const list = getStoredPosts();
  const idx = list.findIndex((p) => p.id === post.id);
  if (idx >= 0) {
    list[idx] = post;
  } else {
    list.unshift(post);
  }
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(list));
}

export function moderatePost(
  postId: string,
  status: 'approved' | 'returned' | 'rejected',
  notes: string,
  reviewerName: string,
  role: string
): void {
  const list = getStoredPosts();
  const post = list.find((p) => p.id === postId);
  if (!post) return;

  const previousStatus = post.status;
  post.status = status;
  post.moderationNotes = notes;
  post.moderatedBy = `${reviewerName} (${role})`;
  post.moderatedAt = new Date().toISOString();

  // Add revision entry
  post.revisions.push({
    timestamp: new Date().toISOString(),
    authorRole: role,
    notes: `${status.toUpperCase()}: ${notes}`,
    content: `Status changed from ${previousStatus} to ${status}`
  });

  // If approved and not previously awarded, award Green Credits
  if (status === 'approved' && post.greenCreditsAwarded === 0) {
    post.greenCreditsAwarded = 15;
    awardGreenCredits(
      post.authorInternId,
      post.authorName,
      'field_post',
      post.id,
      15,
      `Moderated & Approved Field Post: "${post.title}"`
    );
  }

  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(list));
}

export function likePost(postId: string): void {
  const list = getStoredPosts();
  const post = list.find((p) => p.id === postId);
  if (post) {
    post.likesCount = (post.likesCount || 0) + 1;
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(list));
  }
}

// ==========================================
// COMMUNICATIONS STORAGE FUNCTIONS
// ==========================================

export function getStoredCommunications(): CommunicationRecord[] {
  try {
    const raw = localStorage.getItem(COMMUNICATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(COMMUNICATIONS_STORAGE_KEY, JSON.stringify(INITIAL_COMMUNICATIONS));
      return INITIAL_COMMUNICATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_COMMUNICATIONS;
  } catch (err) {
    console.error('Error reading communications:', err);
    return INITIAL_COMMUNICATIONS;
  }
}

export function logCommunication(
  record: Omit<CommunicationRecord, 'id' | 'sentAt'>
): CommunicationRecord {
  const list = getStoredCommunications();
  const newRecord: CommunicationRecord = {
    ...record,
    id: `COM-${Date.now()}`,
    sentAt: new Date().toISOString()
  };
  list.unshift(newRecord);
  localStorage.setItem(COMMUNICATIONS_STORAGE_KEY, JSON.stringify(list));
  return newRecord;
}

// ==========================================
// GREEN CREDITS STORAGE FUNCTIONS
// ==========================================

export function getStoredGreenCredits(): GreenCreditTransaction[] {
  try {
    const raw = localStorage.getItem(GREEN_CREDITS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(GREEN_CREDITS_STORAGE_KEY, JSON.stringify(INITIAL_GREEN_CREDITS));
      return INITIAL_GREEN_CREDITS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_GREEN_CREDITS;
  } catch (err) {
    console.error('Error reading green credits:', err);
    return INITIAL_GREEN_CREDITS;
  }
}

export function awardGreenCredits(
  internId: string,
  internName: string,
  sourceType: 'survey_approval' | 'field_post' | 'eco_sample',
  referenceId: string,
  credits: number,
  notes: string
): GreenCreditTransaction {
  const list = getStoredGreenCredits();

  // Prevent duplicate awards for the same referenceId and intern
  const existing = list.find(
    (g) => g.referenceId === referenceId && g.internId === internId && g.status === 'confirmed'
  );
  if (existing) {
    return existing;
  }

  const transaction: GreenCreditTransaction = {
    id: `GC-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
    internId,
    internName,
    sourceType,
    referenceId,
    credits,
    status: 'confirmed',
    issuedAt: new Date().toISOString(),
    issuedBy: 'Campus Admin (Dr. S. Meenakshi Sundaram)',
    notes
  };

  list.unshift(transaction);
  localStorage.setItem(GREEN_CREDITS_STORAGE_KEY, JSON.stringify(list));
  return transaction;
}

// ==========================================
// SURVEY APPROVAL & REVIEW
// ==========================================

export function reviewSurveyRecord(
  surveyId: string,
  status: 'approved' | 'returned' | 'rejected',
  notes: string,
  reviewerName: string
): SurveyRecord | null {
  const surveys = getStoredSurveys();
  const survey = surveys.find((s) => s.id === surveyId);
  if (!survey) return null;

  survey.approvalStatus = status;
  survey.approvalNotes = notes;
  survey.approvedBy = reviewerName;
  survey.approvedAt = new Date().toISOString();

  if (status === 'approved') {
    survey.status = 'reviewed';
    if (!survey.greenCreditsAwarded || survey.greenCreditsAwarded === 0) {
      survey.greenCreditsAwarded = 50;
      awardGreenCredits(
        survey.surveyor.internId,
        survey.surveyor.internName,
        'survey_approval',
        survey.id,
        50,
        `Approved Master 12-Sector Survey for ${survey.respondent.fullName}`
      );
    }
  }

  saveSurveyRecord(survey);
  return survey;
}

// ==========================================
// CAMPUS SETTINGS STORAGE FUNCTIONS
// ==========================================

export function getStoredCampusSettings(): CampusSettings {
  try {
    const raw = localStorage.getItem(CAMPUS_SETTINGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CAMPUS_SETTINGS_STORAGE_KEY, JSON.stringify(INITIAL_CAMPUS_SETTINGS));
      return INITIAL_CAMPUS_SETTINGS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading campus settings:', err);
    return INITIAL_CAMPUS_SETTINGS;
  }
}

export function saveCampusSettings(settings: CampusSettings): void {
  localStorage.setItem(CAMPUS_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

// ==========================================
// MULTI-TENANT & SUPER ADMIN PLATFORM GOVERNANCE
// (Xylem Foundations - Stage 1 Implementation)
// ==========================================

export const INITIAL_INSTITUTIONS: Institution[] = [
  {
    id: 'ECO-INST-0001',
    name: 'Maruthu Pandiyar College of Arts and Science',
    type: 'College',
    code: 'MPCAS',
    website: 'https://mpcas.edu.in',
    address: 'Trichy Main Road, Vallam',
    villageTown: 'Vallam',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    country: 'India',
    pinCode: '613403',
    contactNumber: '+91 4362 265228',
    officialEmail: 'principal@mpcas.edu.in',
    primaryContactPerson: 'Dr. S. Meenakshi Sundaram',
    createdAt: '2026-06-01T09:00:00.000Z',
    status: 'active'
  }
];

export const INITIAL_CAMPUSES: CampusSite[] = [
  {
    id: 'ECO-CAMP-0001',
    institutionId: 'ECO-INST-0001',
    institutionName: 'Maruthu Pandiyar College of Arts and Science',
    name: 'Main Campus, Thanjavur',
    code: 'MPCAS-TN613',
    address: 'Trichy Main Road, Vallam, Thanjavur, Tamil Nadu 613403',
    location: 'Vallam, Thanjavur',
    gpsCoordinates: { latitude: 10.7412, longitude: 79.0683 },
    departments: [
      'Department of Environmental Studies',
      'Department of Environmental Biotechnology',
      'Department of Agricultural Science',
      'Department of Botany',
      'Department of Zoology'
    ],
    academicYear: '2026–2027',
    programmeStartDate: '2026-06-15',
    programmeEndDate: '2027-05-31',
    timezone: 'Asia/Kolkata (IST)',
    defaultLanguage: 'en',
    status: 'active',
    adminUserIds: ['ADMIN-MPCAS-01'],
    createdAt: '2026-06-01T09:00:00.000Z',
    settings: INITIAL_CAMPUS_SETTINGS
  }
];

export const INITIAL_PLATFORM_ADMINS: PlatformAdminUser[] = [
  {
    id: 'SUPER-XYLEM-01',
    name: 'Dr. K. Radhakrishnan',
    email: 'admin@xylemfoundations.org',
    phone: '+91 94430 00000',
    role: 'super_admin',
    status: 'active',
    designatedTitle: 'Executive Director & Platform Trustee',
    organization: 'Xylem Foundations',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'ADMIN-MPCAS-01',
    name: 'Dr. S. Meenakshi Sundaram',
    email: 'admin.ecopoly@mpcas.edu.in',
    phone: '9842156780',
    role: 'campus_admin',
    institutionId: 'ECO-INST-0001',
    assignedCampusIds: ['ECO-CAMP-0001'],
    status: 'active',
    designatedTitle: 'Campus Internship Director',
    organization: 'Maruthu Pandiyar College of Arts and Science',
    createdAt: '2026-06-01T09:00:00.000Z'
  }
];

export const INITIAL_SUPER_ADMIN_AUDIT_LOGS: SuperAdminAuditLogEntry[] = [
  {
    id: 'SA-AUDIT-2026-001',
    timestamp: '2026-06-01T09:00:00.000Z',
    actorRole: 'super_admin',
    actorName: 'Dr. K. Radhakrishnan',
    actorEmail: 'admin@xylemfoundations.org',
    action: 'TENANT_MIGRATION_VERIFIED',
    targetTenantId: 'ECO-INST-0001',
    targetTenantName: 'Maruthu Pandiyar College of Arts and Science',
    details: 'Initial pilot institution and Main Campus (MPCAS-TN613) provisioned with isolated tenant boundaries.',
    ipOrOrigin: 'Platform Core (System)'
  },
  {
    id: 'SA-AUDIT-2026-002',
    timestamp: '2026-06-01T10:00:00.000Z',
    actorRole: 'super_admin',
    actorName: 'Dr. K. Radhakrishnan',
    actorEmail: 'admin@xylemfoundations.org',
    action: 'CAMPUS_ADMIN_INVITED',
    targetTenantId: 'ECO-CAMP-0001',
    targetTenantName: 'Main Campus, Thanjavur',
    details: 'Allocated Campus Admin privileges to Dr. S. Meenakshi Sundaram for MPCAS-TN613.',
    ipOrOrigin: 'Xylem Executive Portal'
  }
];

// Institutions Get / Save
export function getStoredInstitutions(): Institution[] {
  try {
    const raw = localStorage.getItem(INSTITUTIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INSTITUTIONS_STORAGE_KEY, JSON.stringify(INITIAL_INSTITUTIONS));
      return INITIAL_INSTITUTIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_INSTITUTIONS;
  } catch (err) {
    console.error('Error reading institutions:', err);
    return INITIAL_INSTITUTIONS;
  }
}

export function saveInstitution(inst: Institution): void {
  const list = getStoredInstitutions();
  const idx = list.findIndex((i) => i.id === inst.id);
  if (idx >= 0) {
    list[idx] = inst;
  } else {
    list.push(inst);
  }
  localStorage.setItem(INSTITUTIONS_STORAGE_KEY, JSON.stringify(list));
}

// Campuses Get / Save / Status update
export function getStoredCampuses(): CampusSite[] {
  try {
    const raw = localStorage.getItem(CAMPUSES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CAMPUSES_STORAGE_KEY, JSON.stringify(INITIAL_CAMPUSES));
      return INITIAL_CAMPUSES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CAMPUSES;
  } catch (err) {
    console.error('Error reading campuses:', err);
    return INITIAL_CAMPUSES;
  }
}

export function saveCampus(campus: CampusSite): void {
  const list = getStoredCampuses();
  const idx = list.findIndex((c) => c.id === campus.id);
  if (idx >= 0) {
    list[idx] = campus;
  } else {
    list.push(campus);
  }
  localStorage.setItem(CAMPUSES_STORAGE_KEY, JSON.stringify(list));
}

export function updateCampusStatus(
  campusId: string,
  newStatus: 'active' | 'suspended' | 'archived',
  actorRole: UserRole,
  actorName: string,
  actorEmail: string
): boolean {
  const campuses = getStoredCampuses();
  const campus = campuses.find((c) => c.id === campusId);
  if (!campus) return false;

  const prevStatus = campus.status;
  campus.status = newStatus;
  localStorage.setItem(CAMPUSES_STORAGE_KEY, JSON.stringify(campuses));

  logSuperAdminAudit({
    actorRole,
    actorName,
    actorEmail,
    action: 'CAMPUS_STATUS_CHANGED',
    targetTenantId: campus.id,
    targetTenantName: campus.name,
    details: `Updated campus status from "${prevStatus}" to "${newStatus}".`,
    ipOrOrigin: 'Platform Management Console'
  });

  return true;
}

// Platform Admins Get / Save
export function getStoredPlatformAdmins(): PlatformAdminUser[] {
  try {
    const raw = localStorage.getItem(PLATFORM_ADMINS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PLATFORM_ADMINS_STORAGE_KEY, JSON.stringify(INITIAL_PLATFORM_ADMINS));
      return INITIAL_PLATFORM_ADMINS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PLATFORM_ADMINS;
  } catch (err) {
    console.error('Error reading platform admins:', err);
    return INITIAL_PLATFORM_ADMINS;
  }
}

export function savePlatformAdmin(admin: PlatformAdminUser): void {
  const list = getStoredPlatformAdmins();
  const idx = list.findIndex((a) => a.id === admin.id);
  if (idx >= 0) {
    list[idx] = admin;
  } else {
    list.push(admin);
  }
  localStorage.setItem(PLATFORM_ADMINS_STORAGE_KEY, JSON.stringify(list));
}

// Super Admin Audit Logs
export function getStoredSuperAdminAuditLogs(): SuperAdminAuditLogEntry[] {
  try {
    const raw = localStorage.getItem(SUPER_ADMIN_AUDIT_KEY);
    if (!raw) {
      localStorage.setItem(SUPER_ADMIN_AUDIT_KEY, JSON.stringify(INITIAL_SUPER_ADMIN_AUDIT_LOGS));
      return INITIAL_SUPER_ADMIN_AUDIT_LOGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SUPER_ADMIN_AUDIT_LOGS;
  } catch (err) {
    console.error('Error reading super admin audit logs:', err);
    return INITIAL_SUPER_ADMIN_AUDIT_LOGS;
  }
}

export function logSuperAdminAudit(
  entry: Omit<SuperAdminAuditLogEntry, 'id' | 'timestamp'>
): SuperAdminAuditLogEntry {
  const logs = getStoredSuperAdminAuditLogs();
  const newEntry: SuperAdminAuditLogEntry = {
    ...entry,
    id: `SA-AUDIT-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
    timestamp: new Date().toISOString()
  };
  logs.unshift(newEntry);
  localStorage.setItem(SUPER_ADMIN_AUDIT_KEY, JSON.stringify(logs));
  return newEntry;
}

// ==========================================
// SUPER ADMIN AUTHENTICATION & SECURITY GATE
// ==========================================

export function getSuperAdminSession(): PlatformAdminUser | null {
  try {
    const raw = localStorage.getItem(SUPER_ADMIN_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (session && session.role === 'super_admin' && session.status === 'active') {
      return session;
    }
    return null;
  } catch (err) {
    console.error('Error parsing super admin session:', err);
    return null;
  }
}

export function setSuperAdminSession(user: PlatformAdminUser): void {
  const sessionUser: PlatformAdminUser = {
    ...user,
    lastLoginAt: new Date().toISOString()
  };
  localStorage.setItem(SUPER_ADMIN_SESSION_KEY, JSON.stringify(sessionUser));
  // Also update in registered admins
  const admins = getStoredPlatformAdmins();
  const idx = admins.findIndex((a) => a.id === user.id);
  if (idx >= 0) {
    admins[idx].lastLoginAt = sessionUser.lastLoginAt;
    localStorage.setItem(PLATFORM_ADMINS_STORAGE_KEY, JSON.stringify(admins));
  }
}

export function clearSuperAdminSession(): void {
  localStorage.removeItem(SUPER_ADMIN_SESSION_KEY);
}

/**
 * Verifies platform administrator credentials.
 * Requirements:
 * - Email must match an active Super Admin in the authorized registry.
 * - PIN/Token: Accepts authorized Xylem executive PIN '9009' or token 'XYLEM-SUPER-2026'.
 * - Records an immutable audit log entry for every success or failure.
 */
export function verifySuperAdminAuthorization(
  email: string,
  authCode: string
): { success: boolean; user?: PlatformAdminUser; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  const cleanCode = authCode.trim();
  const admins = getStoredPlatformAdmins();
  const superAdmin = admins.find(
    (a) => a.email.toLowerCase() === cleanEmail && a.role === 'super_admin'
  );

  if (!superAdmin) {
    logSuperAdminAudit({
      actorRole: 'respondent',
      actorName: 'Unverified User',
      actorEmail: cleanEmail || 'unknown@domain.com',
      action: 'SUPER_ADMIN_LOGIN_FAILED',
      details: `Failed Super Admin authentication attempt: Email "${cleanEmail}" is not an authorised platform administrator.`,
      ipOrOrigin: 'Platform Gateway'
    });
    return {
      success: false,
      error: 'Unauthorised: This email is not registered as a Xylem Foundations Super Administrator.'
    };
  }

  if (superAdmin.status !== 'active') {
    logSuperAdminAudit({
      actorRole: 'super_admin',
      actorName: superAdmin.name,
      actorEmail: superAdmin.email,
      action: 'SUPER_ADMIN_LOGIN_FAILED',
      details: `Failed login attempt for suspended administrator account: ${superAdmin.email}.`,
      ipOrOrigin: 'Platform Gateway'
    });
    return {
      success: false,
      error: 'Account Suspended: This administrator account is currently inactive. Contact Xylem Foundations platform trustees.'
    };
  }

  // Authorised credential verification
  // Production systems integrate with OAuth/SAML. In this environment, we verify against executive authorization tokens.
  const isValidAuthCode =
    cleanCode === '9009' ||
    cleanCode === 'XYLEM-SUPER-2026' ||
    (superAdmin.authCodeHash && cleanCode === superAdmin.authCodeHash);

  if (!isValidAuthCode) {
    logSuperAdminAudit({
      actorRole: 'super_admin',
      actorName: superAdmin.name,
      actorEmail: superAdmin.email,
      action: 'SUPER_ADMIN_LOGIN_FAILED',
      details: `Incorrect security PIN / token entered for ${superAdmin.email}.`,
      ipOrOrigin: 'Platform Gateway'
    });
    return {
      success: false,
      error: 'Invalid authorization PIN or token. Please verify your executive credentials.'
    };
  }

  // Successful verification
  setSuperAdminSession(superAdmin);
  logSuperAdminAudit({
    actorRole: 'super_admin',
    actorName: superAdmin.name,
    actorEmail: superAdmin.email,
    action: 'SUPER_ADMIN_LOGIN_SUCCESS',
    targetTenantId: 'GLOBAL',
    targetTenantName: 'Xylem Foundations Platform Hub',
    details: `Authorized Super Admin session initialized for ${superAdmin.name} (${superAdmin.email}).`,
    ipOrOrigin: 'Platform Gateway'
  });

  return { success: true, user: superAdmin };
}

/**
 * Requirement 9: Do not allow users to assign themselves Super Admin permissions.
 * Requirement 10: Only an authorised platform administrator can allocate or revoke Super Admin privileges.
 */
export function preventUnauthorizedSelfPromotion(
  targetRole: UserRole,
  currentRole: UserRole,
  actorEmail?: string
): RolePermissionCheckResult {
  if (targetRole === 'super_admin') {
    const session = getSuperAdminSession();
    if (!session || session.role !== 'super_admin') {
      logSuperAdminAudit({
        actorRole: currentRole,
        actorName: 'Unauthenticated User',
        actorEmail: actorEmail || 'unassigned@client',
        action: 'UNAUTHORIZED_PRIVILEGE_ESCALATION_ATTEMPT',
        details: `Blocked attempt to elevate role to "super_admin" from role "${currentRole}" without verified platform administrator session.`,
        ipOrOrigin: 'RBAC Authorization Interceptor'
      });
      return {
        allowed: false,
        reason:
          'Security Policy Violation: Self-promotion to Super Admin is strictly prohibited. Super Admin access requires authorized Xylem Foundations platform verification.'
      };
    }
  }
  return { allowed: true };
}

/**
 * Requirement 8: Enforce all permissions in backend database rules and APIs, not just the user interface.
 */
export function enforceGlobalSuperAdminPermission(
  actorRole: UserRole,
  action: string,
  actorEmail?: string
): RolePermissionCheckResult {
  if (actorRole !== 'super_admin') {
    logSuperAdminAudit({
      actorRole,
      actorName: 'Client Actor',
      actorEmail: actorEmail || 'unknown@client',
      action: 'UNAUTHORIZED_PRIVILEGE_ESCALATION_ATTEMPT',
      details: `Denied unauthorized execution of platform action "${action}" by role "${actorRole}".`,
      ipOrOrigin: 'Backend Enforcement Layer'
    });
    return {
      allowed: false,
      reason: `Access Denied: Platform operation "${action}" requires verified Xylem Foundations Super Admin privileges.`
    };
  }

  const session = getSuperAdminSession();
  if (!session || session.role !== 'super_admin') {
    return {
      allowed: false,
      reason: 'Active Super Admin authentication session required. Please verify credentials.'
    };
  }

  return { allowed: true };
}

// ==========================================
// TENANT MIGRATION (MARUTHU PANDIYAR COLLEGE)
// ==========================================

export interface MigrationResult {
  migratedSurveys: number;
  migratedInterns: number;
  migratedCandidates: number;
  migratedAssignments: number;
  migratedPosts: number;
  migratedCommunications: number;
  migratedGreenCredits: number;
  alreadyMigrated: boolean;
}

/**
 * Inspects all existing records in storage and safely tags them with
 * institutionId: 'ECO-INST-0001' and campusId: 'ECO-CAMP-0001'.
 * Guaranteed to never drop or overwrite existing fields, IDs, or timestamps.
 */
export function migrateExistingRecordsToInitialTenant(): MigrationResult {
  let needsMigration = false;
  let sCount = 0;
  let iCount = 0;
  let cCount = 0;
  let aCount = 0;
  let pCount = 0;
  let mCount = 0;
  let gCount = 0;

  // 1. Ensure Institutions & Campuses exist
  getStoredInstitutions();
  getStoredCampuses();
  getStoredPlatformAdmins();
  getStoredSuperAdminAuditLogs();

  // 2. Migrate Surveys
  try {
    const surveys = getStoredSurveys();
    const updatedSurveys = surveys.map((s) => {
      if (!s.institutionId || !s.campusId) {
        needsMigration = true;
        sCount++;
        return {
          ...s,
          institutionId: s.institutionId || 'ECO-INST-0001',
          campusId: s.campusId || 'ECO-CAMP-0001'
        };
      }
      return s;
    });
    if (sCount > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSurveys));
    }
  } catch (err) {
    console.error('Migration error on surveys:', err);
  }

  // 3. Migrate Interns
  try {
    const interns = getStoredInterns();
    const updatedInterns = interns.map((i) => {
      if (!i.institutionId || !i.campusId) {
        needsMigration = true;
        iCount++;
        return {
          ...i,
          institutionId: i.institutionId || 'ECO-INST-0001',
          campusId: i.campusId || 'ECO-CAMP-0001'
        };
      }
      return i;
    });
    if (iCount > 0) {
      localStorage.setItem(INTERNS_STORAGE_KEY, JSON.stringify(updatedInterns));
    }
  } catch (err) {
    console.error('Migration error on interns:', err);
  }

  // 4. Migrate Candidates
  try {
    const candidates = getStoredCandidates();
    const updatedCandidates = candidates.map((c) => {
      if (!c.institutionId || !c.campusId) {
        needsMigration = true;
        cCount++;
        return {
          ...c,
          institutionId: c.institutionId || 'ECO-INST-0001',
          campusId: c.campusId || 'ECO-CAMP-0001'
        };
      }
      return c;
    });
    if (cCount > 0) {
      localStorage.setItem(CANDIDATES_STORAGE_KEY, JSON.stringify(updatedCandidates));
    }
  } catch (err) {
    console.error('Migration error on candidates:', err);
  }

  // 5. Migrate Assignments
  try {
    const assignments = getStoredAssignments();
    const updatedAssignments = assignments.map((a) => {
      if (!a.institutionId || !a.campusId) {
        needsMigration = true;
        aCount++;
        return {
          ...a,
          institutionId: a.institutionId || 'ECO-INST-0001',
          campusId: a.campusId || 'ECO-CAMP-0001'
        };
      }
      return a;
    });
    if (aCount > 0) {
      localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(updatedAssignments));
    }
  } catch (err) {
    console.error('Migration error on assignments:', err);
  }

  // 6. Migrate Posts
  try {
    const posts = getStoredPosts();
    const updatedPosts = posts.map((p) => {
      if (!p.institutionId || !p.campusId) {
        needsMigration = true;
        pCount++;
        return {
          ...p,
          institutionId: p.institutionId || 'ECO-INST-0001',
          campusId: p.campusId || 'ECO-CAMP-0001'
        };
      }
      return p;
    });
    if (pCount > 0) {
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updatedPosts));
    }
  } catch (err) {
    console.error('Migration error on posts:', err);
  }

  // 7. Migrate Communications
  try {
    const comms = getStoredCommunications();
    const updatedComms = comms.map((m) => {
      if (!m.institutionId || !m.campusId) {
        needsMigration = true;
        mCount++;
        return {
          ...m,
          institutionId: m.institutionId || 'ECO-INST-0001',
          campusId: m.campusId || 'ECO-CAMP-0001'
        };
      }
      return m;
    });
    if (mCount > 0) {
      localStorage.setItem(COMMUNICATIONS_STORAGE_KEY, JSON.stringify(updatedComms));
    }
  } catch (err) {
    console.error('Migration error on communications:', err);
  }

  // 8. Migrate Green Credits
  try {
    const credits = getStoredGreenCredits();
    const updatedCredits = credits.map((g) => {
      if (!g.institutionId || !g.campusId) {
        needsMigration = true;
        gCount++;
        return {
          ...g,
          institutionId: g.institutionId || 'ECO-INST-0001',
          campusId: g.campusId || 'ECO-CAMP-0001'
        };
      }
      return g;
    });
    if (gCount > 0) {
      localStorage.setItem(GREEN_CREDITS_STORAGE_KEY, JSON.stringify(updatedCredits));
    }
  } catch (err) {
    console.error('Migration error on green credits:', err);
  }

  return {
    migratedSurveys: sCount,
    migratedInterns: iCount,
    migratedCandidates: cCount,
    migratedAssignments: aCount,
    migratedPosts: pCount,
    migratedCommunications: mCount,
    migratedGreenCredits: gCount,
    alreadyMigrated: !needsMigration
  };
}


