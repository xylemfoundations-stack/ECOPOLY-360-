import React, { useState } from 'react';
import {
  Institution,
  CampusSite,
  PlatformAdminUser,
  SuperAdminAuditLogEntry,
  SurveyRecord,
  StudentIntern,
  StudentCandidate,
  InternPost,
  GreenCreditTransaction,
  UserRole,
  Language
} from '../../types/survey';
import {
  Shield,
  Building,
  Users,
  Award,
  FileCheck2,
  Camera,
  Layers,
  History,
  Lock,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Filter,
  Search,
  RefreshCw,
  Eye,
  Sliders,
  Globe,
  Briefcase,
  Activity
} from 'lucide-react';
import { updateCampusStatus } from '../../services/storage';

interface SuperAdminConsoleProps {
  institutions: Institution[];
  campuses: CampusSite[];
  platformAdmins: PlatformAdminUser[];
  auditLogs: SuperAdminAuditLogEntry[];
  surveys: SurveyRecord[];
  interns: StudentIntern[];
  candidates: StudentCandidate[];
  posts: InternPost[];
  greenCredits: GreenCreditTransaction[];
  activeSuperAdmin: PlatformAdminUser;
  onLogout: () => void;
  onNavigateToCampusAdmin: (campusId?: string) => void;
  onNavigateToSurveyor: () => void;
  onRefreshData: () => void;
  lang: Language;
}

export const SuperAdminConsole: React.FC<SuperAdminConsoleProps> = ({
  institutions,
  campuses,
  platformAdmins,
  auditLogs,
  surveys,
  interns,
  candidates,
  posts,
  greenCredits,
  activeSuperAdmin,
  onLogout,
  onNavigateToCampusAdmin,
  onNavigateToSurveyor,
  onRefreshData,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tenants' | 'rbac' | 'audit'>('overview');
  const [selectedInstitutionFilter, setSelectedInstitutionFilter] = useState<string>('all');
  const [auditSearch, setAuditSearch] = useState<string>('');
  const [auditActionFilter, setAuditActionFilter] = useState<string>('all');
  const [statusActionMessage, setStatusActionMessage] = useState<string | null>(null);

  // Compute Platform Metrics (10 metrics from specification)
  const totalInstitutions = institutions.length;
  const activeCampusCount = campuses.filter((c) => c.status === 'active').length;
  const suspendedCampusCount = campuses.filter((c) => c.status === 'suspended').length;
  const campusAdminCount = platformAdmins.filter((a) => a.role === 'campus_admin').length;
  const totalRegisteredStudents = candidates.length;
  const totalActiveInterns = interns.filter((i) => i.status === 'Active').length;
  const totalSubmittedSurveys = surveys.filter(
    (s) => s.status === 'submitted' || s.status === 'reviewed'
  ).length;
  const totalApprovedSurveys = surveys.filter((s) => s.approvalStatus === 'approved').length;
  const totalPublishedPosts = posts.filter((p) => p.status === 'approved').length;
  const totalConfirmedGreenCredits = greenCredits
    .filter((g) => g.status === 'confirmed')
    .reduce((sum, g) => sum + g.credits, 0);

  // Filtered lists if an institution is selected
  const filteredCampuses =
    selectedInstitutionFilter === 'all'
      ? campuses
      : campuses.filter((c) => c.institutionId === selectedInstitutionFilter);

  const filteredSurveys =
    selectedInstitutionFilter === 'all'
      ? surveys
      : surveys.filter((s) => s.institutionId === selectedInstitutionFilter);

  const filteredInterns =
    selectedInstitutionFilter === 'all'
      ? interns
      : interns.filter((i) => i.institutionId === selectedInstitutionFilter);

  const handleToggleCampusStatus = (campus: CampusSite) => {
    const nextStatus = campus.status === 'active' ? 'suspended' : 'active';
    const success = updateCampusStatus(
      campus.id,
      nextStatus,
      'super_admin',
      activeSuperAdmin.name,
      activeSuperAdmin.email
    );
    if (success) {
      onRefreshData();
      setStatusActionMessage(`Campus "${campus.name}" is now marked as ${nextStatus.toUpperCase()}.`);
      setTimeout(() => setStatusActionMessage(null), 3500);
    }
  };

  const filteredAuditLogs = auditLogs.filter((log) => {
    const matchesSearch =
      auditSearch === '' ||
      log.actorName.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.actorEmail.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.details.toLowerCase().includes(auditSearch.toLowerCase()) ||
      (log.targetTenantName && log.targetTenantName.toLowerCase().includes(auditSearch.toLowerCase()));

    const matchesAction =
      auditActionFilter === 'all' || log.action === auditActionFilter;

    return matchesSearch && matchesAction;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Banner: Xylem Foundations Platform Governance */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Platform Owner: Xylem Foundations · Global Platform Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              ECOPOLY 360° PLATFORM ADMINISTRATION
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Centrally governed sustainability framework across multiple independent institutional sites.
              Super Admin manages multi-tenant creation, campus sites, role authorizations, and data isolation.
            </p>
          </div>

          {/* Super Admin Identity Badge & Action Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <div className="space-y-0.5 pr-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                <span>{activeSuperAdmin.name}</span>
              </div>
              <div className="text-[11px] font-mono text-emerald-400">{activeSuperAdmin.email}</div>
              <div className="text-[10px] text-slate-400">{activeSuperAdmin.designatedTitle}</div>
            </div>

            <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:border-l sm:border-slate-700 sm:pl-3">
              <button
                onClick={onLogout}
                className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Exit Super Admin Session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Working Navigation Tabs */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>1. Global Platform Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('tenants')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'tenants'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>2. Institutions & Campus Sites</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-slate-700 text-slate-200">
                {campuses.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('rbac')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'rbac'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>3. Role-Based Access Control (RBAC)</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>4. Security & Audit Trail</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-slate-700 text-slate-200">
                {auditLogs.length}
              </span>
            </button>
          </div>

          {/* Quick Context Switchers */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => onNavigateToCampusAdmin('ECO-CAMP-0001')}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Campus Admin View (MPCAS)</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </button>
            <button
              onClick={onNavigateToSurveyor}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors cursor-pointer"
            >
              Surveyor Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Notification Banner */}
      {statusActionMessage && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-200 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusActionMessage}</span>
        </div>
      )}

      {/* TAB 1: GLOBAL PLATFORM OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Institutional Filter Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Data Scope Filter:
              </span>
              <select
                value={selectedInstitutionFilter}
                onChange={(e) => setSelectedInstitutionFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
              >
                <option value="all">All Institutions (Global Consolidated)</option>
                {institutions.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name} ({inst.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 text-slate-500 text-[11px]">
              <span>Tenant Isolation: <strong className="text-emerald-600">Enforced</strong></span>
              <span aria-hidden="true">·</span>
              <span>Backend Rule: <strong className="text-emerald-600">Zero Leakage</strong></span>
            </div>
          </div>

          {/* 10 Core Global Platform Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Institutions
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {totalInstitutions}
              </div>
              <div className="text-[11px] text-emerald-600 font-medium">Platform Tenants</div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Active Campuses
              </div>
              <div className="text-2xl font-black text-emerald-600 font-mono">
                {activeCampusCount}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {suspendedCampusCount} Suspended
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Campus Admins
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {campusAdminCount}
              </div>
              <div className="text-[11px] text-slate-400">Institutional Leads</div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Students Roster
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {totalRegisteredStudents}
              </div>
              <div className="text-[11px] text-slate-400">Candidate Records</div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Active Interns
              </div>
              <div className="text-2xl font-black text-emerald-600 font-mono">
                {totalActiveInterns}
              </div>
              <div className="text-[11px] text-slate-400">Field Surveyors</div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Submitted Surveys
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {totalSubmittedSurveys}
              </div>
              <div className="text-[11px] text-slate-400">12-Sector Baselines</div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Approved Surveys
              </div>
              <div className="text-2xl font-black text-emerald-600 font-mono">
                {totalApprovedSurveys}
              </div>
              <div className="text-[11px] text-slate-400">Verified by Campus</div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Published Posts
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {totalPublishedPosts}
              </div>
              <div className="text-[11px] text-slate-400">Community Evidence</div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1 col-span-2 sm:col-span-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Green Credits
              </div>
              <div className="text-2xl font-black text-emerald-600 font-mono">
                {totalConfirmedGreenCredits}
              </div>
              <div className="text-[11px] text-slate-400">Confirmed & Issued</div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-1 col-span-2 sm:col-span-1">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Platform Health
              </div>
              <div className="text-2xl font-black text-emerald-600 flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span className="text-base font-bold">Optimal</span>
              </div>
              <div className="text-[11px] text-slate-400">Multi-Site Isolation Active</div>
            </div>
          </div>

          {/* Active Pilot Institution Detail Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <Building className="w-4 h-4" />
                  <span>Pilot Institution Tenant · ID: ECO-INST-0001</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  Maruthu Pandiyar College of Arts and Science
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Thanjavur, Tamil Nadu · Campus Code: MPCAS-TN613 · Primary Contact: Dr. S. Meenakshi Sundaram
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Active Pilot
                </span>
                <button
                  onClick={() => onNavigateToCampusAdmin('ECO-CAMP-0001')}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Open Campus Console</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl space-y-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Academic Framework & Cohort
                </span>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  5 Academic Departments (Environmental Studies, Biotechnology, Agriculture, Botany, Zoology).
                  3 Active Interns enrolled under faculty supervision.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl space-y-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Field Survey & Evidence Coverage
                </span>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Master 12-Sector Life Management Survey active. Comprehensive baseline for households, farms,
                  soil and water samples with GPS coordinate tagging.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl space-y-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Governance & Security Policy
                </span>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  Campus Admin operates under isolated tenant boundaries. Super Admin maintains exclusive
                  authority to alter global question banks, credit issuance rates, and platform configuration.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INSTITUTIONS & CAMPUS SITES */}
      {activeTab === 'tenants' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Institutional Tenants & Campus Sites
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Multi-tenant architecture allowing independent institutions to run ECOPOLY internship programmes.
              </p>
            </div>

            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl text-xs text-blue-800 dark:text-blue-300 flex items-center gap-2">
              <Shield className="w-4 h-4 shrink-0 text-blue-600" />
              <span>
                <strong>Stage 1 Boundary:</strong> Site creation wizard will unlock in Stage 2 after Super Admin role verification.
              </span>
            </div>
          </div>

          {/* List of Registered Institutions & Campuses */}
          <div className="space-y-4">
            {campuses.map((campus) => {
              const inst = institutions.find((i) => i.id === campus.institutionId);
              const campusInterns = interns.filter((i) => i.campusId === campus.id);
              const campusSurveys = surveys.filter((s) => s.campusId === campus.id);
              const isSuspended = campus.status === 'suspended';

              return (
                <div
                  key={campus.id}
                  className={`bg-white dark:bg-slate-900 border rounded-2xl p-6 transition-all shadow-xs ${
                    isSuspended
                      ? 'border-amber-300 dark:border-amber-900 bg-amber-50/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                        <span>Institution ID: {campus.institutionId}</span>
                        <span aria-hidden="true">·</span>
                        <span>Campus ID: {campus.id}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{campus.institutionName}</span>
                        <span className="text-sm font-normal text-slate-500 font-sans">
                          — {campus.name}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {campus.address} · Timezone: {campus.timezone} · Code: <code className="font-mono text-emerald-700 dark:text-emerald-400">{campus.code}</code>
                      </p>
                    </div>

                    {/* Status & Control Actions */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isSuspended
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        {isSuspended ? 'Suspended Site' : 'Active Tenant'}
                      </span>

                      <button
                        onClick={() => handleToggleCampusStatus(campus)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          isSuspended
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {isSuspended ? 'Reactivate Campus' : 'Suspend Campus'}
                      </button>

                      <button
                        onClick={() => onNavigateToCampusAdmin(campus.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Manage Campus
                      </button>
                    </div>
                  </div>

                  {/* Campus Summary Footprint */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Academic Departments</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {campus.departments.length} Departments
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Active Interns</span>
                      <span className="font-semibold text-emerald-600 font-mono">
                        {campusInterns.length} Interns
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Field Surveys Logged</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                        {campusSurveys.length} Surveys
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Campus Admin Lead</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {campus.settings.adminName}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: ROLE-BASED ACCESS CONTROL (RBAC) */}
      {activeTab === 'rbac' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Platform Role-Based Access Control (RBAC) & Governance
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Strict role hierarchy enforced in backend storage services and access interceptors.
              Self-promotion to Super Admin is strictly prevented.
            </p>
          </div>

          {/* Security Policy Advisory Box */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-xs space-y-2 text-emerald-950 dark:text-emerald-200">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-900 dark:text-emerald-100">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Multi-Tenant Security & Privilege Boundaries</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-xs text-emerald-900 dark:text-emerald-300">
              <li>
                <strong>No Self-Promotion:</strong> Only an authorized platform administrator from Xylem Foundations can assign Super Admin privileges. Attempts by standard users trigger audit alerts and are denied.
              </li>
              <li>
                <strong>Tenant Boundary Isolation:</strong> Campus Admins from Institution A cannot query, update, or approve surveys belonging to Institution B.
              </li>
              <li>
                <strong>Backend Interceptor:</strong> Permissions are evaluated in <code>enforceGlobalSuperAdminPermission</code> and <code>preventUnauthorizedSelfPromotion</code>, not simply by hiding UI buttons.
              </li>
            </ul>
          </div>

          {/* Five Platform Roles Specification Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 font-semibold text-sm text-slate-900 dark:text-white flex items-center justify-between">
              <span>Platform Role Hierarchy Matrix</span>
              <span className="text-xs text-slate-500">5 Defined Roles</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Entity & Authority</th>
                    <th className="py-3 px-4">Permitted Operations</th>
                    <th className="py-3 px-4">Strict Prohibitions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">
                      Super Admin
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      Xylem Foundations (Global Platform Owner)
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      Create institutions, campuses, allocate Campus Admins, configure global sector frameworks, activate/suspend sites, view consolidated platform audit trail.
                    </td>
                    <td className="py-3 px-4 text-slate-400 italic">None (Root Platform Authority)</td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      Campus Admin
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      College Administrator (MPCAS)
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      Student directory, intern onboarding, supervisor allocation, post moderation, survey approval, campus digest, campus reports.
                    </td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400">
                      Cannot create institutions, access other campuses, alter global questions, or assign Super Admin roles.
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      Faculty Supervisor
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      Assigned Cohort / Department
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      Monitor assigned interns, review submitted field posts and surveys, return items for correction, recommend approval.
                    </td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400">
                      Cannot view interns of other supervisors, onboard students, or modify campus settings.
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      Student Intern
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      Field Surveyor Profile
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      Execute 12-sector surveys, submit field activity posts, collect samples with GPS coordinates, verify respondent PIN, view confirmed Green Credits.
                    </td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400">
                      No administrative, moderation, or survey approval rights.
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      Respondent
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      Field Participant (Household / Farm)
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      Provide environmental survey answers, give consent, verify submission via on-site 4-digit PIN.
                    </td>
                    <td className="py-3 px-4 text-red-600 dark:text-red-400">
                      Zero administrative access. No login account required.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Platform Administrators Roster */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Registered Platform Administrators</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {platformAdmins.map((admin) => (
                <div
                  key={admin.id}
                  className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {admin.name}
                      </div>
                      <div className="text-slate-500">{admin.designatedTitle} · {admin.organization}</div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        admin.role === 'super_admin'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      {admin.role.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="font-mono text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5 pt-1 border-t border-slate-200 dark:border-slate-700">
                    <div>Email: {admin.email}</div>
                    {admin.institutionId && <div>Tenant ID: {admin.institutionId}</div>}
                    <div>Status: <span className="text-emerald-600 font-semibold">{admin.status}</span></div>
                    {admin.lastLoginAt && (
                      <div className="text-[10px] text-slate-400">
                        Last Login: {new Date(admin.lastLoginAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SECURITY & AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Platform Security Audit Trail
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Immutable record of role authentication, privilege check events, tenant migrations, and administrative modifications.
              </p>
            </div>

            <button
              onClick={onRefreshData}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Log</span>
            </button>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 text-xs">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search audit trail by actor, email, tenant, or details..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={auditActionFilter}
                onChange={(e) => setAuditActionFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
              >
                <option value="all">All Action Types</option>
                <option value="SUPER_ADMIN_LOGIN_SUCCESS">Login Success</option>
                <option value="SUPER_ADMIN_LOGIN_FAILED">Login Failed</option>
                <option value="UNAUTHORIZED_PRIVILEGE_ESCALATION_ATTEMPT">Privilege Escalation Blocked</option>
                <option value="CAMPUS_STATUS_CHANGED">Campus Status Changed</option>
                <option value="TENANT_MIGRATION_VERIFIED">Tenant Migration</option>
              </select>
            </div>
          </div>

          {/* Audit Entries List */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs divide-y divide-slate-100 dark:divide-slate-800">
            {filteredAuditLogs.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No audit entries match the current filter criteria.
              </div>
            ) : (
              filteredAuditLogs.map((log) => {
                const isPrivilegeAlert =
                  log.action === 'UNAUTHORIZED_PRIVILEGE_ESCALATION_ATTEMPT' ||
                  log.action === 'SUPER_ADMIN_LOGIN_FAILED';

                return (
                  <div
                    key={log.id}
                    className={`p-4 transition-colors ${
                      isPrivilegeAlert
                        ? 'bg-red-50/40 dark:bg-red-950/20'
                        : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            isPrivilegeAlert
                              ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          }`}
                        >
                          {log.action}
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {log.actorName}
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          ({log.actorEmail})
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 font-mono">
                        {new Date(log.timestamp).toLocaleString()} · {log.ipOrOrigin || 'Console'}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {log.details}
                    </p>

                    {log.targetTenantName && (
                      <div className="mt-1 text-[11px] text-slate-400 font-mono">
                        Target Tenant: {log.targetTenantName} ({log.targetTenantId})
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
