export type Language = 'en' | 'ta';

export type SurveyStatus = 'draft' | 'submitted' | 'reviewed';

export interface SurveyorDetails {
  internId: string;
  internName: string;
  college: string;
  department: string;
  visitDateTime: string;
  facultySupervisor: string;
}

export interface RespondentDetails {
  fullName: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say' | '';
  ageGroup: 'Below 18' | '18–25' | '26–35' | '36–45' | '46–60' | 'Above 60' | '';
  mobileNumber: string;
  alternateMobile: string;
  email: string;
  occupation: string;
  respondentCategory: string;
  householdSize: string;
  mainLivelihood: string;
  preferredLanguage: 'Tamil' | 'English' | 'Other' | '';
}

export interface AddressDetails {
  doorStreet: string;
  villageTownWard: string;
  panchayatMunicipality: string;
  taluk: string;
  district: string;
  state: string;
  pinCode: string;
  gpsCoordinates?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  gpsAddress?: string;
}

export interface ConsentDetails {
  surveyConsent: boolean;
  gpsConsent: boolean;
  photoConsent: boolean;
  sampleConsent: boolean;
  followUpConsent: boolean;
  recordedAt: string;
}

export interface PropertyPhoto {
  id: string;
  dataUrl: string;
  caption: string;
  timestamp: string;
}

export interface PropertyRecord {
  id: string;
  name: string;
  propertyType: string;
  propertyUsage: string;
  address: string;
  surveyNumber: string;
  subdivisionNumber: string;
  ownership: string;
  landExtent: string;
  extentUnit: string;
  builtUpArea: string;
  cultivatedArea: string;
  occupantsCount: string;
  mainActivity: string;
  gpsCoordinates?: {
    latitude: number;
    longitude: number;
  };
  photos: PropertyPhoto[];
}

export interface QuestionDefinition {
  id: string;
  num: number;
  labelEn: string;
  labelTa: string;
  type: 'select' | 'multi' | 'numeric' | 'text';
  optionsEn: string[];
  optionsTa: string[];
  unitEn?: string;
  unitTa?: string;
  condition?: {
    dependsOnNum: number;
    value: string;
  };
}

export interface SectorDefinition {
  id: string;
  sectorNumber: number;
  titleEn: string;
  titleTa: string;
  descriptionEn: string;
  descriptionTa: string;
  iconName: string;
  questions: QuestionDefinition[];
}

export interface SectorAnswers {
  [questionNum: number]: string | string[] | number;
}

export interface SoilSample {
  id: string;
  sampleCode: string;
  propertyId: string;
  depth: string;
  containerType: string;
  collectionDate: string;
  dispatchedToLab: boolean;
  notes: string;
  photoUrl?: string;
}

export interface WaterSample {
  id: string;
  sampleCode: string;
  propertyId: string;
  sourceType: string;
  temperature: string;
  phReading: string;
  tdsReading: string;
  turbidity: string;
  containerType: string;
  collectionDate: string;
  notes: string;
  photoUrl?: string;
}

export interface EnvironmentalReadings {
  pm25?: string;
  pm10?: string;
  ambientTemp?: string;
  humidity?: string;
  soundLevel?: string;
  readingSource?: string;
  notes?: string;
}

export interface EvidenceDocument {
  id: string;
  title: string;
  category: 'Electricity Bill' | 'Water Test Report' | 'Soil Health Card' | 'Farm Photograph' | 'Compost Facility' | 'Solar System' | 'Other';
  photoUrl: string;
  timestamp: string;
  notes?: string;
}

export interface EvidenceRecords {
  soilSamples: SoilSample[];
  waterSamples: WaterSample[];
  readings: EnvironmentalReadings;
  documents: EvidenceDocument[];
  surveyorNotes: string;
}

export type InternStatus =
  | 'Invited'
  | 'Pending Acceptance'
  | 'Active'
  | 'On Leave'
  | 'Suspended'
  | 'Completed'
  | 'Inactive';

export interface StudentIntern {
  id: string; // Unique Intern ID e.g. MPCAS-2026-ENV04
  studentId: string; // Original College Student ID e.g. MPCAS-2026-STU101
  institutionId?: string; // Tenant ID e.g. ECO-INST-0001
  campusId?: string; // Campus ID e.g. ECO-CAMP-0001
  name: string;
  email: string;
  mobile: string;
  college: string;
  department: string;
  academicYear: 'I Year' | 'II Year' | 'III Year' | 'PG I' | 'PG II';
  joiningDate: string;
  pin: string;
  status: InternStatus;
  invitedAt: string;
  invitedBy: string;
  assignedSupervisor: string;
  totalSurveys: number;
  statusReason?: string;
  notificationSent?: boolean;
}

export interface SurveyRecord {
  id: string;
  institutionId?: string; // Tenant ID e.g. ECO-INST-0001
  campusId?: string; // Campus ID e.g. ECO-CAMP-0001
  responderId: string;
  status: SurveyStatus;
  currentStage: number;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  surveyor: SurveyorDetails;
  respondent: RespondentDetails;
  address: AddressDetails;
  consent: ConsentDetails;
  properties: PropertyRecord[];
  sectorAnswers: {
    [sectorId: string]: SectorAnswers;
  };
  evidence: EvidenceRecords;
  respondentConfirmationPin?: string;
  respondentConfirmedAt?: string;
  surveyorAuthPin?: string;
  surveyorVerifiedAt?: string;
  // Kept for backward compatibility
  respondentSignature?: string;
  respondentSignedAt?: string;
  surveyorSignature?: string;
  surveyorSignedAt?: string;
  sustainabilityScore?: {
    overall: number;
    sectorScores: { [sectorId: string]: number };
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  };
  approvalStatus?: 'pending' | 'approved' | 'returned' | 'rejected';
  approvalNotes?: string;
  approvedBy?: string;
  approvedAt?: string;
  greenCreditsAwarded?: number;
}

export type UserRole =
  | 'super_admin'
  | 'campus_admin'
  | 'faculty_supervisor'
  | 'student_intern'
  | 'respondent';

export type InstitutionType =
  | 'College'
  | 'University'
  | 'School'
  | 'Corporate'
  | 'NGO'
  | 'Training Centre'
  | 'Community Programme'
  | 'Other';

export interface Institution {
  id: string; // e.g. ECO-INST-0001
  name: string;
  type: InstitutionType;
  code: string;
  website: string;
  address: string;
  villageTown: string;
  district: string;
  state: string;
  country: string;
  pinCode: string;
  contactNumber: string;
  officialEmail: string;
  logoUrl?: string;
  primaryContactPerson: string;
  createdAt: string;
  status: 'active' | 'suspended' | 'archived';
}

export interface CampusSite {
  id: string; // e.g. ECO-CAMP-0001
  institutionId: string; // e.g. ECO-INST-0001
  institutionName: string;
  name: string;
  code: string;
  address: string;
  location: string;
  gpsCoordinates?: {
    latitude: number;
    longitude: number;
  };
  departments: string[];
  academicYear: string;
  programmeStartDate: string;
  programmeEndDate: string;
  timezone: string;
  defaultLanguage: 'en' | 'ta';
  status: 'active' | 'suspended' | 'archived';
  adminUserIds: string[];
  createdAt: string;
  settings: CampusSettings;
}

export interface PlatformAdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'super_admin' | 'campus_admin';
  institutionId?: string; // undefined for super_admin
  assignedCampusIds?: string[]; // undefined for super_admin (global)
  status: 'active' | 'suspended';
  lastLoginAt?: string;
  authCodeHash?: string; // secure hash representation
  designatedTitle: string;
  organization: string;
  createdAt: string;
}

export interface SuperAdminAuditLogEntry {
  id: string;
  timestamp: string;
  actorRole: UserRole;
  actorName: string;
  actorEmail: string;
  action:
    | 'SUPER_ADMIN_LOGIN_SUCCESS'
    | 'SUPER_ADMIN_LOGIN_FAILED'
    | 'UNAUTHORIZED_PRIVILEGE_ESCALATION_ATTEMPT'
    | 'CAMPUS_ADMIN_INVITED'
    | 'CAMPUS_ADMIN_STATUS_CHANGED'
    | 'CAMPUS_STATUS_CHANGED'
    | 'TENANT_SETTINGS_MODIFIED'
    | 'GLOBAL_QUESTION_BANK_ACCESSED'
    | 'TENANT_MIGRATION_VERIFIED'
    | 'PLATFORM_BACKUP_GENERATED';
  targetTenantId?: string;
  targetTenantName?: string;
  details: string;
  ipOrOrigin?: string;
}

export interface RolePermissionCheckResult {
  allowed: boolean;
  reason?: string;
}

export interface StudentCandidate {
  id: string; // Student ID e.g. MPCAS-2026-STU101
  institutionId?: string; // e.g. ECO-INST-0001
  campusId?: string; // e.g. ECO-CAMP-0001
  name: string;
  email: string;
  mobile: string;
  college: string;
  department: string;
  yearOfStudy: 'I Year' | 'II Year' | 'III Year' | 'PG I' | 'PG II';
  enrolmentStatus: 'candidate' | 'onboarded' | 'inactive';
  internId?: string;
  assignedSupervisor?: string;
  pin?: string;
  attendanceCount: number;
  surveysCount: number;
  joinedAt: string;
}

export interface AdminAuditLogEntry {
  id: string;
  timestamp: string;
  actorRole: UserRole;
  actorName: string;
  actionType:
    | 'STUDENT_CREATED'
    | 'STUDENT_CSV_IMPORTED'
    | 'PORTAL_SYNC'
    | 'INTERN_ENROLLED'
    | 'INTERN_STATUS_CHANGED'
    | 'SUPERVISOR_ASSIGNED'
    | 'PIN_RESET'
    | 'MEMBERSHIP_COMPLETED'
    | 'INTERN_SUSPENDED'
    | 'INTERN_REACTIVATED'
    | 'NOTIFICATION_DISPATCHED';
  targetId: string;
  targetName: string;
  details: string;
  previousState?: string;
  newState?: string;
}

export interface InternAssignment {
  id: string;
  institutionId?: string;
  campusId?: string;
  title: string;
  type: 'individual' | 'group';
  internIds: string[];
  internNames: string[];
  targetVillage: string;
  targetTaluk: string;
  targetCategories: string[];
  supervisor: string;
  targetSurveyCount: number;
  completedSurveyCount: number;
  activityDescription: string;
  deadline: string;
  status: 'assigned' | 'in_progress' | 'submitted' | 'completed';
  reassignmentAudit?: {
    reassignedAt: string;
    previousInterns: string[];
    reason: string;
  }[];
  createdAt: string;
}

export interface PostPhoto {
  id: string;
  dataUrl: string;
  caption: string;
}

export interface PostRevision {
  timestamp: string;
  authorRole: string;
  notes: string;
  content: string;
}

export interface InternPost {
  id: string;
  institutionId?: string;
  campusId?: string;
  authorInternId: string;
  authorName: string;
  authorDepartment: string;
  title: string;
  category:
    | 'Tree Plantation'
    | 'Waste Management'
    | 'Water Conservation'
    | 'Soil Testing'
    | 'Community Engagement'
    | 'Renewable Energy';
  sectorId: string;
  sectorName: string;
  location: string;
  date: string;
  description: string;
  photos: PostPhoto[];
  status: 'draft' | 'under_review' | 'approved' | 'returned' | 'rejected';
  moderationNotes?: string;
  moderatedBy?: string;
  moderatedAt?: string;
  revisions: PostRevision[];
  likesCount: number;
  sharesCount: number;
  greenCreditsAwarded: number;
  createdAt: string;
}

export interface CommunicationRecord {
  id: string;
  institutionId?: string;
  campusId?: string;
  channel: 'email' | 'whatsapp';
  recipientGroup:
    | 'all_interns'
    | 'specific_dept'
    | 'pending_onboarding'
    | 'supervisors'
    | 'custom';
  recipientsCount: number;
  subject: string;
  content: string;
  templateName?: string;
  sentBy: string;
  sentAt: string;
  status: 'sent' | 'delivered' | 'failed';
  optOutCount?: number;
}

export interface GreenCreditTransaction {
  id: string;
  institutionId?: string;
  campusId?: string;
  internId: string;
  internName: string;
  sourceType: 'survey_approval' | 'field_post' | 'eco_sample';
  referenceId: string;
  credits: number;
  status: 'confirmed' | 'pending';
  issuedAt: string;
  issuedBy: string;
  notes: string;
}

export interface CampusSettings {
  collegeName: string;
  campusCode: string;
  district: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  weeklyDigestDay:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';
  weeklyDigestTime: string;
  autoDigestEnabled: boolean;
  creditsPerSurvey: number;
  creditsPerPost: number;
  supervisorReviewRequired: boolean;
  autoRemindOverdue: boolean;
  activeSurveysAllowedPerIntern: number;
  emailIntegrationConfigured: boolean;
  emailIntegrationAuthorized: boolean;
  whatsappIntegrationConfigured: boolean;
  whatsappIntegrationAuthorized: boolean;
  portalApiEndpoint?: string;
  portalApiConnected?: boolean;
}


