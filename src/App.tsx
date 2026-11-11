/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  Institution,
  CampusSite,
  PlatformAdminUser,
  SuperAdminAuditLogEntry,
  AdminAuditLogEntry,
  InternStatus
} from './types/survey';
import {
  getStoredSurveys,
  saveSurveyRecord,
  deleteSurveyRecord,
  createNewSurvey,
  getActiveSurveyId,
  setActiveSurveyId,
  resetToSampleSurvey,
  getStoredInterns,
  saveIntern,
  deleteIntern,
  getActiveInternId,
  setActiveInternId,
  getStoredCandidates,
  saveCandidate,
  onboardCandidate,
  bulkOnboardCandidates,
  updateInternStatus,
  getStoredAssignments,
  saveAssignment,
  deleteAssignment,
  getStoredPosts,
  savePost,
  moderatePost,
  likePost,
  getStoredCommunications,
  logCommunication,
  getStoredGreenCredits,
  getStoredCampusSettings,
  saveCampusSettings,
  reviewSurveyRecord,
  getStoredAuditLogs,
  getStoredInstitutions,
  getStoredCampuses,
  getStoredPlatformAdmins,
  getStoredSuperAdminAuditLogs,
  getSuperAdminSession,
  clearSuperAdminSession,
  verifySuperAdminAuthorization,
  preventUnauthorizedSelfPromotion,
  migrateExistingRecordsToInitialTenant
} from './services/storage';
import { Navbar } from './components/Navbar';
import { SurveyorDashboard } from './components/SurveyorDashboard';
import { FieldSurvey } from './components/FieldSurvey';
import { AdminReview } from './components/AdminReview';
import { InternLoginModal } from './components/InternLoginModal';
import { CampusAdminConsole } from './components/CampusAdmin/CampusAdminConsole';
import { SuperAdminConsole } from './components/SuperAdmin/SuperAdminConsole';
import { SuperAdminLoginModal } from './components/SuperAdmin/SuperAdminLoginModal';
import { Shield, AlertTriangle, X } from 'lucide-react';

export default function App() {
  const [surveys, setSurveys] = useState<SurveyRecord[]>([]);
  const [interns, setInterns] = useState<StudentIntern[]>([]);
  const [candidates, setCandidates] = useState<StudentCandidate[]>([]);
  const [assignments, setAssignments] = useState<InternAssignment[]>([]);
  const [posts, setPosts] = useState<InternPost[]>([]);
  const [communications, setCommunications] = useState<CommunicationRecord[]>([]);
  const [greenCredits, setGreenCredits] = useState<GreenCreditTransaction[]>([]);
  const [campusSettings, setCampusSettingsState] = useState<CampusSettings>(getStoredCampusSettings());
  const [campusAuditLogs, setCampusAuditLogs] = useState<AdminAuditLogEntry[]>([]);

  // Platform & Multi-Tenant State (Stage 1)
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [campuses, setCampuses] = useState<CampusSite[]>([]);
  const [platformAdmins, setPlatformAdmins] = useState<PlatformAdminUser[]>([]);
  const [superAdminAuditLogs, setSuperAdminAuditLogs] = useState<SuperAdminAuditLogEntry[]>([]);
  const [superAdminSession, setSuperAdminSessionState] = useState<PlatformAdminUser | null>(null);
  const [showSuperAdminLoginModal, setShowSuperAdminLoginModal] = useState<boolean>(false);
  const [privilegeDenialMessage, setPrivilegeDenialMessage] = useState<string | null>(null);

  const [activeInternId, setActiveInternIdState] = useState<string>('MPCAS-2026-ENV04');
  const [showInternLoginModal, setShowInternLoginModal] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<
    'dashboard' | 'survey' | 'admin' | 'campus_admin' | 'super_admin'
  >('campus_admin');
  const [userRole, setUserRole] = useState<UserRole>('campus_admin');
  const [activeSurveyId, setActiveIdState] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('en');

  // Load all data on initial mount and run safe migration
  useEffect(() => {
    // 1. Run safe idempotent migration of existing Maruthu Pandiyar College records
    migrateExistingRecordsToInitialTenant();

    // 2. Load core datasets
    const surveyList = getStoredSurveys();
    setSurveys(surveyList);

    const internList = getStoredInterns();
    setInterns(internList);

    const candList = getStoredCandidates();
    setCandidates(candList);

    const asgList = getStoredAssignments();
    setAssignments(asgList);

    const postList = getStoredPosts();
    setPosts(postList);

    const commList = getStoredCommunications();
    setCommunications(commList);

    const gcList = getStoredGreenCredits();
    setGreenCredits(gcList);

    const settings = getStoredCampusSettings();
    setCampusSettingsState(settings);

    const cAudit = getStoredAuditLogs();
    setCampusAuditLogs(cAudit);

    // 3. Load Multi-Tenant & Platform state
    const instList = getStoredInstitutions();
    setInstitutions(instList);

    const campList = getStoredCampuses();
    setCampuses(campList);

    const adminList = getStoredPlatformAdmins();
    setPlatformAdmins(adminList);

    const saLogs = getStoredSuperAdminAuditLogs();
    setSuperAdminAuditLogs(saLogs);

    const activeSession = getSuperAdminSession();
    setSuperAdminSessionState(activeSession);

    const currentInternId = getActiveInternId();
    setActiveInternIdState(currentInternId);

    const savedActiveId = getActiveSurveyId();
    if (savedActiveId && surveyList.some((s: SurveyRecord) => s.id === savedActiveId)) {
      setActiveIdState(savedActiveId);
    } else if (surveyList.length > 0) {
      setActiveIdState(surveyList[0].id);
    }
  }, []);

  const refreshSurveys = () => {
    const list = getStoredSurveys();
    setSurveys(list);
    const gcList = getStoredGreenCredits();
    setGreenCredits(gcList);
  };

  const refreshInterns = () => {
    const list = getStoredInterns();
    setInterns(list);
  };

  const refreshCandidates = () => {
    const list = getStoredCandidates();
    setCandidates(list);
  };

  const refreshAssignments = () => {
    const list = getStoredAssignments();
    setAssignments(list);
  };

  const refreshPosts = () => {
    const list = getStoredPosts();
    setPosts(list);
    const gcList = getStoredGreenCredits();
    setGreenCredits(gcList);
  };

  const refreshCommunications = () => {
    const list = getStoredCommunications();
    setCommunications(list);
  };

  const activeIntern =
    interns.find((i) => i.id === activeInternId) || interns[0] || {
      id: 'MPCAS-2026-ENV04',
      name: 'K. Vignesh',
      email: 'vignesh.env@mpcas.edu.in',
      mobile: '9842156780',
      college: 'Maruthu Pandiyar College of Arts and Science',
      department: 'Department of Environmental Studies',
      pin: '2026',
      status: 'active' as const,
      invitedAt: new Date().toISOString(),
      invitedBy: 'Admin',
      assignedSupervisor: 'Dr. S. Meenakshi Sundaram',
      totalSurveys: 3
    };

  const activeSurvey =
    surveys.find((s) => s.id === activeSurveyId) || surveys[0];

  const handleStartNewSurvey = () => {
    const created = createNewSurvey(activeIntern);
    refreshSurveys();
    setActiveIdState(created.id);
    setActiveSurveyId(created.id);
    setCurrentScreen('survey');
  };

  const handleResumeSurvey = (id: string) => {
    setActiveIdState(id);
    setActiveSurveyId(id);
    setCurrentScreen('survey');
  };

  const handleViewAdmin = (id: string) => {
    setActiveIdState(id);
    setActiveSurveyId(id);
    setCurrentScreen('admin');
  };

  const handleDeleteSurvey = (id: string) => {
    if (
      confirm(
        lang === 'ta'
          ? 'இந்த ஆய்வை நீக்க விரும்புகிறீர்களா?'
          : 'Are you sure you want to delete this survey record?'
      )
    ) {
      deleteSurveyRecord(id);
      refreshSurveys();
      if (activeSurveyId === id) {
        const remaining = surveys.filter((s) => s.id !== id);
        setActiveIdState(remaining[0]?.id || null);
      }
    }
  };

  const handleReloadPilot = () => {
    resetToSampleSurvey();
    refreshSurveys();
    const list = getStoredSurveys();
    if (list.length > 0) {
      setActiveIdState(list[0].id);
    }
  };

  const handleUpdateActiveSurvey = (updated: SurveyRecord) => {
    saveSurveyRecord(updated);
    setSurveys((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  const handleSaveAndExit = () => {
    refreshSurveys();
    setCurrentScreen('dashboard');
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ta' : 'en'));
  };

  const handleSaveIntern = (intern: StudentIntern) => {
    saveIntern(intern);
    refreshInterns();
  };

  const handleDeleteIntern = (id: string) => {
    deleteIntern(id);
    refreshInterns();
  };

  const handleSelectActiveIntern = (id: string) => {
    setActiveInternId(id);
    setActiveInternIdState(id);
  };

  // Campus Admin Specific Handlers
  const handleSaveCandidate = (candidate: StudentCandidate) => {
    saveCandidate(candidate);
    refreshCandidates();
  };

  const handleOnboardIntern = (
    candidateId: string,
    supervisor: string,
    department: string,
    pin: string
  ) => {
    onboardCandidate(candidateId, supervisor, department, pin);
    refreshInterns();
    refreshCandidates();
  };

  const handleBulkOnboard = (candidateIds: string[], supervisor: string) => {
    bulkOnboardCandidates(candidateIds, supervisor);
    refreshInterns();
    refreshCandidates();
    refreshCampusAuditLogs();
  };

  const handleUpdateInternStatus = (
    internId: string,
    newStatus: InternStatus,
    reason?: string
  ) => {
    updateInternStatus(internId, newStatus, userRole, 'Campus Admin', reason);
    refreshInterns();
    refreshCandidates();
    refreshCampusAuditLogs();
  };

  const refreshCampusAuditLogs = () => {
    const list = getStoredAuditLogs();
    setCampusAuditLogs(list);
  };

  const refreshPlatformData = () => {
    setInstitutions(getStoredInstitutions());
    setCampuses(getStoredCampuses());
    setPlatformAdmins(getStoredPlatformAdmins());
    setSuperAdminAuditLogs(getStoredSuperAdminAuditLogs());
  };

  const refreshAllData = () => {
    refreshSurveys();
    refreshInterns();
    refreshCandidates();
    refreshAssignments();
    refreshPosts();
    refreshPlatformData();
    refreshCampusAuditLogs();
  };

  const handleRoleChange = (newRole: UserRole) => {
    if (newRole === 'super_admin') {
      const session = getSuperAdminSession();
      if (!session) {
        const check = preventUnauthorizedSelfPromotion('super_admin', userRole);
        setPrivilegeDenialMessage(
          check.reason ||
            'Security Policy: Self-promotion to Super Admin is prohibited. Please authenticate using authorized Xylem Foundations executive credentials.'
        );
        setShowSuperAdminLoginModal(true);
        return;
      }
      setUserRole('super_admin');
      setCurrentScreen('super_admin');
    } else {
      setUserRole(newRole);
      setPrivilegeDenialMessage(null);
    }
  };

  const handleSuperAdminLoginSuccess = (admin: PlatformAdminUser) => {
    setSuperAdminSessionState(admin);
    setUserRole('super_admin');
    setCurrentScreen('super_admin');
    setPrivilegeDenialMessage(null);
    refreshPlatformData();
  };

  const handleSuperAdminLogout = () => {
    clearSuperAdminSession();
    setSuperAdminSessionState(null);
    setUserRole('campus_admin');
    setCurrentScreen('campus_admin');
    refreshPlatformData();
  };

  const handleSaveAssignment = (assignment: InternAssignment) => {
    saveAssignment(assignment);
    refreshAssignments();
  };

  const handleDeleteAssignment = (id: string) => {
    deleteAssignment(id);
    refreshAssignments();
  };

  const handleSavePost = (post: InternPost) => {
    savePost(post);
    refreshPosts();
  };

  const handleModeratePost = (
    postId: string,
    status: 'approved' | 'returned' | 'rejected',
    notes: string,
    reviewerName: string,
    role: string
  ) => {
    moderatePost(postId, status, notes, reviewerName, role);
    refreshPosts();
  };

  const handleLikePost = (postId: string) => {
    likePost(postId);
    refreshPosts();
  };

  const handleReviewSurvey = (
    surveyId: string,
    status: 'approved' | 'returned' | 'rejected',
    notes: string,
    reviewerName: string
  ) => {
    reviewSurveyRecord(surveyId, status, notes, reviewerName);
    refreshSurveys();
  };

  const handleLogCommunication = (
    record: Omit<CommunicationRecord, 'id' | 'sentAt'>
  ) => {
    logCommunication(record);
    refreshCommunications();
  };

  const handleSaveCampusSettings = (settings: CampusSettings) => {
    saveCampusSettings(settings);
    setCampusSettingsState(settings);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar with 3-Zone Contract */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        lang={lang}
        onToggleLang={handleToggleLang}
        onNewSurvey={handleStartNewSurvey}
        hasActiveDraft={surveys.some((s) => s.status === 'draft')}
        isSuperAdminAuthenticated={!!superAdminSession}
        onOpenSuperAdminLogin={() => setShowSuperAdminLoginModal(true)}
      />

      {/* Privilege Denial Alert Toast / Banner */}
      {privilegeDenialMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 w-full">
          <div className="p-3 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 rounded-xl flex items-center justify-between gap-3 text-xs text-red-800 dark:text-red-200 shadow-xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{privilegeDenialMessage}</span>
            </div>
            <button
              onClick={() => setPrivilegeDenialMessage(null)}
              className="p-1 text-red-600 hover:text-red-900 dark:hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Screen Body: Super Admin, Campus Admin, Dashboard, Survey, or Admin Review */}
      <main className="flex-1">
        {currentScreen === 'super_admin' && (
          superAdminSession ? (
            <SuperAdminConsole
              institutions={institutions}
              campuses={campuses}
              platformAdmins={platformAdmins}
              auditLogs={superAdminAuditLogs}
              surveys={surveys}
              interns={interns}
              candidates={candidates}
              posts={posts}
              greenCredits={greenCredits}
              activeSuperAdmin={superAdminSession}
              onLogout={handleSuperAdminLogout}
              onNavigateToCampusAdmin={() => setCurrentScreen('campus_admin')}
              onNavigateToSurveyor={() => setCurrentScreen('dashboard')}
              onRefreshData={refreshAllData}
              lang={lang}
            />
          ) : (
            <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 mx-auto flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Super Admin Authentication Required
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Access to the Xylem Foundations Super Admin platform is restricted to verified administrators.
                Self-promotion without executive authorization is prevented by security policy.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowSuperAdminLoginModal(true)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Shield className="w-4 h-4" />
                  <span>Authenticate with Xylem Credentials</span>
                </button>
                <button
                  onClick={() => setCurrentScreen('campus_admin')}
                  className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Return to Campus Admin
                </button>
              </div>
            </div>
          )
        )}

        {currentScreen === 'campus_admin' && (
          <CampusAdminConsole
            surveys={surveys}
            interns={interns}
            candidates={candidates}
            assignments={assignments}
            posts={posts}
            communications={communications}
            greenCredits={greenCredits}
            campusSettings={campusSettings}
            auditLogs={campusAuditLogs}
            onSaveCandidate={handleSaveCandidate}
            onOnboardIntern={handleOnboardIntern}
            onBulkOnboard={handleBulkOnboard}
            onUpdateInternStatus={handleUpdateInternStatus}
            onRefreshData={refreshAllData}
            onSaveAssignment={handleSaveAssignment}
            onDeleteAssignment={handleDeleteAssignment}
            onSavePost={handleSavePost}
            onModeratePost={handleModeratePost}
            onLikePost={handleLikePost}
            onReviewSurvey={handleReviewSurvey}
            onLogCommunication={handleLogCommunication}
            onSaveSettings={handleSaveCampusSettings}
            lang={lang}
            userRole={userRole}
            onRoleChange={handleRoleChange}
            activeInternId={activeInternId}
          />
        )}

        {currentScreen === 'dashboard' && (
          <SurveyorDashboard
            surveys={surveys}
            activeIntern={activeIntern}
            onOpenInternLogin={() => setShowInternLoginModal(true)}
            onStartNewSurvey={handleStartNewSurvey}
            onResumeSurvey={handleResumeSurvey}
            onViewAdmin={handleViewAdmin}
            onDeleteSurvey={handleDeleteSurvey}
            onReloadPilot={handleReloadPilot}
            lang={lang}
          />
        )}

        {currentScreen === 'survey' && activeSurvey && (
          <FieldSurvey
            survey={activeSurvey}
            onChange={handleUpdateActiveSurvey}
            onSaveAndExit={handleSaveAndExit}
            lang={lang}
          />
        )}

        {currentScreen === 'admin' && (
          <AdminReview
            surveys={surveys}
            selectedSurveyId={activeSurvey?.id}
            onSelectSurvey={(id) => {
              setActiveIdState(id);
              setActiveSurveyId(id);
            }}
            interns={interns}
            onSaveIntern={handleSaveIntern}
            onDeleteIntern={handleDeleteIntern}
            onSelectActiveIntern={handleSelectActiveIntern}
            activeInternId={activeInternId}
            lang={lang}
          />
        )}
      </main>

      {/* Intern PIN Login Modal */}
      {showInternLoginModal && (
        <InternLoginModal
          interns={interns}
          activeInternId={activeInternId}
          onLogin={handleSelectActiveIntern}
          onClose={() => setShowInternLoginModal(false)}
          lang={lang}
        />
      )}

      {/* Super Admin Login Modal */}
      <SuperAdminLoginModal
        isOpen={showSuperAdminLoginModal}
        onClose={() => setShowSuperAdminLoginModal(false)}
        onSuccess={handleSuperAdminLoginSuccess}
      />

      {/* Clean Institutional Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400 print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            ECOPOLY 360° Life Management Field Survey · Promoter: Xylem Foundations
          </p>
          <p>
            Pilot Institution: Maruthu Pandiyar College of Arts and Science, Thanjavur · Parent: ECOPOLY.LIFE
          </p>
        </div>
      </footer>
    </div>
  );
}
