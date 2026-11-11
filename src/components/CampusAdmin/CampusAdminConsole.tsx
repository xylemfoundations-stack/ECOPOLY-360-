import React, { useState } from 'react';
import {
  SurveyRecord,
  StudentIntern,
  StudentCandidate,
  InternAssignment,
  InternPost,
  CommunicationRecord,
  GreenCreditTransaction,
  CampusSettings,
  Language,
  UserRole,
  AdminAuditLogEntry,
  InternStatus
} from '../../types/survey';
import { OverviewSection } from './OverviewSection';
import { StudentsInternsSection } from './StudentsInternsSection';
import { OnboardingSection } from './OnboardingSection';
import { AssignmentsSection } from './AssignmentsSection';
import { PostModerationSection } from './PostModerationSection';
import { SurveyApprovalsSection } from './SurveyApprovalsSection';
import { CommunicationsSection } from './CommunicationsSection';
import { ReportsSection } from './ReportsSection';
import { CampusSettingsSection } from './CampusSettingsSection';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Camera,
  FileCheck2,
  Mail,
  BarChart3,
  Settings,
  Shield,
  Building,
  ChevronRight
} from 'lucide-react';

interface CampusAdminConsoleProps {
  surveys: SurveyRecord[];
  interns: StudentIntern[];
  candidates: StudentCandidate[];
  assignments: InternAssignment[];
  posts: InternPost[];
  communications: CommunicationRecord[];
  greenCredits: GreenCreditTransaction[];
  campusSettings: CampusSettings;
  auditLogs?: AdminAuditLogEntry[];
  onSaveCandidate: (candidate: StudentCandidate) => void;
  onOnboardIntern: (
    candidateId: string,
    supervisor: string,
    department: string,
    pin: string,
    academicYear?: 'I Year' | 'II Year' | 'III Year' | 'PG I' | 'PG II',
    joiningDate?: string
  ) => void;
  onBulkOnboard: (candidateIds: string[], supervisor: string) => void;
  onUpdateInternStatus?: (internId: string, newStatus: InternStatus, reason?: string) => void;
  onRefreshData?: () => void;
  onSaveAssignment: (assignment: InternAssignment) => void;
  onDeleteAssignment: (id: string) => void;
  onSavePost: (post: InternPost) => void;
  onModeratePost: (
    postId: string,
    status: 'approved' | 'returned' | 'rejected',
    notes: string,
    reviewerName: string,
    role: string
  ) => void;
  onLikePost: (postId: string) => void;
  onReviewSurvey: (
    surveyId: string,
    status: 'approved' | 'returned' | 'rejected',
    notes: string,
    reviewerName: string
  ) => void;
  onLogCommunication: (
    record: Omit<CommunicationRecord, 'id' | 'sentAt'>
  ) => void;
  onSaveSettings: (settings: CampusSettings) => void;
  lang: Language;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeInternId: string;
}

export const CampusAdminConsole: React.FC<CampusAdminConsoleProps> = ({
  surveys,
  interns,
  candidates,
  assignments,
  posts,
  communications,
  greenCredits,
  campusSettings,
  auditLogs = [],
  onSaveCandidate,
  onOnboardIntern,
  onBulkOnboard,
  onUpdateInternStatus = () => {},
  onRefreshData = () => {},
  onSaveAssignment,
  onDeleteAssignment,
  onSavePost,
  onModeratePost,
  onLikePost,
  onReviewSurvey,
  onLogCommunication,
  onSaveSettings,
  lang,
  userRole,
  onRoleChange,
  activeInternId
}) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [onboardingCandidateId, setOnboardingCandidateId] = useState<string | undefined>(undefined);

  // Compute live pending badges
  const pendingOnboardingCount = candidates.filter((c) => c.enrolmentStatus === 'candidate').length;
  const pendingPostsCount = posts.filter((p) => p.status === 'under_review').length;
  const pendingSurveysCount = surveys.filter(
    (s) => s.approvalStatus === 'pending' || (s.status === 'submitted' && !s.approvalStatus)
  ).length;

  const sections = [
    { id: 'overview', label: '1. Overview', icon: LayoutDashboard },
    {
      id: 'students',
      label: '2. Students & Interns',
      icon: Users,
      badge: candidates.length
    },
    {
      id: 'onboarding',
      label: '3. Onboarding',
      icon: UserCheck,
      badge: pendingOnboardingCount > 0 ? pendingOnboardingCount : undefined,
      badgeColor: 'amber'
    },
    {
      id: 'assignments',
      label: '4. Intern Assignments',
      icon: Calendar,
      badge: assignments.length
    },
    {
      id: 'moderation',
      label: '5. Post Moderation',
      icon: Camera,
      badge: pendingPostsCount > 0 ? pendingPostsCount : undefined,
      badgeColor: 'amber'
    },
    {
      id: 'surveys',
      label: '6. Survey Approvals',
      icon: FileCheck2,
      badge: pendingSurveysCount > 0 ? pendingSurveysCount : undefined,
      badgeColor: 'blue'
    },
    {
      id: 'communications',
      label: '7. Communications',
      icon: Mail
    },
    {
      id: 'reports',
      label: '8. Reports',
      icon: BarChart3
    },
    {
      id: 'settings',
      label: '9. Campus Settings',
      icon: Settings
    }
  ];

  const handleNavigateSection = (sectionId: string, candidateId?: string) => {
    setActiveSection(sectionId);
    if (candidateId) {
      setOnboardingCandidateId(candidateId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Console Title & Institutional Sub-Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Building className="w-3.5 h-3.5" />
              <span>Maruthu Pandiyar College of Arts and Science · Thanjavur</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-500">MPCAS-TN613</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              ECOPOLY CAMPUS ADMINISTRATION
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Promoter: Xylem Foundations · Parent Platform: ECOPOLY.LIFE Students Portal
            </p>
          </div>

          {/* Interactive Role Switcher Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs self-start md:self-auto">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Active Role:</span>
            </span>
            <select
              value={userRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="campus_admin">Campus Admin (College Authorized)</option>
              <option value="faculty_supervisor">Faculty Supervisor (Dr. S. Meenakshi Sundaram)</option>
              <option value="super_admin">Super Admin (Xylem Foundations)</option>
              <option value="student_intern">Student Intern / Surveyor</option>
            </select>
          </div>
        </div>

        {/* Compact 9-Section Horizontal Working Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleNavigateSection(sec.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{sec.label}</span>
                {sec.badge !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                      isActive
                        ? 'bg-emerald-800 text-emerald-100'
                        : sec.badgeColor === 'amber'
                        ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {sec.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Working Area Rendering Selected Section */}
      <div className="min-h-[500px]">
        {activeSection === 'overview' && (
          <OverviewSection
            surveys={surveys}
            interns={interns}
            candidates={candidates}
            assignments={assignments}
            posts={posts}
            greenCredits={greenCredits}
            lang={lang}
            userRole={userRole}
            onNavigateSection={handleNavigateSection}
          />
        )}

        {activeSection === 'students' && (
          <StudentsInternsSection
            candidates={candidates}
            interns={interns}
            surveys={surveys}
            assignments={assignments}
            posts={posts}
            greenCredits={greenCredits}
            auditLogs={auditLogs}
            onSaveCandidate={onSaveCandidate}
            onOnboardIntern={onOnboardIntern}
            onBulkOnboard={onBulkOnboard}
            onUpdateInternStatus={onUpdateInternStatus}
            onRefreshData={onRefreshData}
            lang={lang}
            userRole={userRole}
            onNavigateToOnboarding={(cId) => handleNavigateSection('onboarding', cId)}
          />
        )}

        {activeSection === 'onboarding' && (
          <OnboardingSection
            candidates={candidates}
            interns={interns}
            campusSettings={campusSettings}
            onOnboardIntern={onOnboardIntern}
            onBulkOnboard={onBulkOnboard}
            onSendCommunication={() => {}}
            initialSelectedCandidateId={onboardingCandidateId}
            lang={lang}
            userRole={userRole}
          />
        )}

        {activeSection === 'assignments' && (
          <AssignmentsSection
            assignments={assignments}
            interns={interns}
            onSaveAssignment={onSaveAssignment}
            onDeleteAssignment={onDeleteAssignment}
            lang={lang}
            userRole={userRole}
          />
        )}

        {activeSection === 'moderation' && (
          <PostModerationSection
            posts={posts}
            interns={interns}
            onSavePost={onSavePost}
            onModeratePost={onModeratePost}
            onLikePost={onLikePost}
            lang={lang}
            userRole={userRole}
            activeInternId={activeInternId}
          />
        )}

        {activeSection === 'surveys' && (
          <SurveyApprovalsSection
            surveys={surveys}
            onReviewSurvey={onReviewSurvey}
            lang={lang}
            userRole={userRole}
          />
        )}

        {activeSection === 'communications' && (
          <CommunicationsSection
            communications={communications}
            interns={interns}
            candidates={candidates}
            onLogCommunication={onLogCommunication}
            lang={lang}
            userRole={userRole}
          />
        )}

        {activeSection === 'reports' && (
          <ReportsSection
            surveys={surveys}
            interns={interns}
            candidates={candidates}
            assignments={assignments}
            posts={posts}
            greenCredits={greenCredits}
            lang={lang}
            userRole={userRole}
          />
        )}

        {activeSection === 'settings' && (
          <CampusSettingsSection
            settings={campusSettings}
            onSaveSettings={onSaveSettings}
            lang={lang}
            userRole={userRole}
          />
        )}
      </div>
    </div>
  );
};
