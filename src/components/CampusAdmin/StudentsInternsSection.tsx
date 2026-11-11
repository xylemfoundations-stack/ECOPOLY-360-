import React, { useState } from 'react';
import {
  StudentCandidate,
  StudentIntern,
  SurveyRecord,
  InternAssignment,
  InternPost,
  GreenCreditTransaction,
  AdminAuditLogEntry,
  InternStatus,
  Language,
  UserRole
} from '../../types/survey';
import {
  Search,
  Filter,
  UserPlus,
  CheckCircle,
  Clock,
  Eye,
  Key,
  GraduationCap,
  X,
  Mail,
  Phone,
  Shield,
  Upload,
  Database,
  History,
  AlertTriangle,
  UserCheck,
  CheckSquare,
  Square,
  ArrowRight,
  Layers
} from 'lucide-react';
import {
  checkStudentDuplicate,
  createCandidateStudent,
  onboardCandidate,
  bulkOnboardCandidates
} from '../../services/storage';
import { StudentImportModal } from './StudentImportModal';
import { AuditLogModal } from './AuditLogModal';
import { InternProfileModal } from './InternProfileModal';

interface StudentsInternsSectionProps {
  candidates: StudentCandidate[];
  interns: StudentIntern[];
  surveys: SurveyRecord[];
  assignments: InternAssignment[];
  posts: InternPost[];
  greenCredits: GreenCreditTransaction[];
  auditLogs: AdminAuditLogEntry[];
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
  onUpdateInternStatus: (
    internId: string,
    newStatus: InternStatus,
    reason?: string
  ) => void;
  onRefreshData: () => void;
  lang: Language;
  userRole: UserRole;
  onNavigateToOnboarding: (candidateId?: string) => void;
}

export const StudentsInternsSection: React.FC<StudentsInternsSectionProps> = ({
  candidates,
  interns,
  surveys,
  assignments,
  posts,
  greenCredits,
  auditLogs,
  onSaveCandidate,
  onOnboardIntern,
  onBulkOnboard,
  onUpdateInternStatus,
  onRefreshData,
  lang,
  userRole,
  onNavigateToOnboarding
}) => {
  // Permission Enforcement Barrier
  const isAuthorized =
    userRole === 'campus_admin' ||
    userRole === 'super_admin' ||
    userRole === 'faculty_supervisor';

  const isFullAdmin = userRole === 'campus_admin' || userRole === 'super_admin';

  // Supervisor Scoping
  const [selectedSupervisorFilter, setSelectedSupervisorFilter] = useState('Dr. S. Meenakshi Sundaram');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [selectedInternForProfile, setSelectedInternForProfile] = useState<StudentIntern | null>(null);

  // Single Enrol Modal for candidate
  const [enrolCandidateModalItem, setEnrolCandidateModalItem] = useState<StudentCandidate | null>(null);
  const [enrolSupervisor, setEnrolSupervisor] = useState('Dr. S. Meenakshi Sundaram');
  const [enrolPin, setEnrolPin] = useState('2026');
  const [enrolJoiningDate, setEnrolJoiningDate] = useState(new Date().toISOString().slice(0, 10));

  // Bulk Selection State
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [bulkSupervisor, setBulkSupervisor] = useState('Dr. S. Meenakshi Sundaram');

  // New Student Form State
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newDept, setNewDept] = useState('Department of Environmental Studies');
  const [newYear, setNewYear] = useState<'I Year' | 'II Year' | 'III Year' | 'PG I' | 'PG II'>('II Year');
  const [addError, setAddError] = useState<string | null>(null);

  const departments = [
    'Department of Environmental Studies',
    'Department of Environmental Biotechnology',
    'Department of Agricultural Science',
    'Department of Botany',
    'Department of Chemistry & Soil Science'
  ];

  // If unauthorized user accesses section, render security lock screen
  if (!isAuthorized) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-2xl p-8 text-center space-y-4 max-w-2xl mx-auto my-12 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center mx-auto">
          <Shield className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Access Restricted: Unauthorized Role
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Your active role (<strong className="capitalize">{userRole.replace('_', ' ')}</strong>) lacks authorization to access the college student directory or administrative onboarding controls.
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-mono text-slate-500">
          Enforced by ECOPOLY 360° Role-Based Access Control (RBAC) Governance Policy.
        </div>
        <p className="text-xs text-slate-400">
          Switch to 'Campus Admin' or 'Faculty Supervisor' using the Active Role selector in the top bar to test authorized views.
        </p>
      </div>
    );
  }

  // Filter candidates & interns according to supervisor scope and search criteria
  const filteredCandidates = candidates.filter((c) => {
    // If faculty supervisor, restrict view to only candidates/interns assigned to them
    if (userRole === 'faculty_supervisor') {
      const internRecord = interns.find((i) => i.studentId === c.id || i.id === c.internId);
      const isAssigned =
        c.assignedSupervisor === selectedSupervisorFilter ||
        (internRecord && internRecord.assignedSupervisor === selectedSupervisorFilter);
      if (!isAssigned) return false;
    }

    // 5-field multi search: name, student ID, department, academic year, mobile number
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      c.name.toLowerCase().includes(term) ||
      c.id.toLowerCase().includes(term) ||
      (c.internId && c.internId.toLowerCase().includes(term)) ||
      c.department.toLowerCase().includes(term) ||
      c.yearOfStudy.toLowerCase().includes(term) ||
      c.mobile.includes(term) ||
      c.email.toLowerCase().includes(term);

    const matchesDept = selectedDept === 'all' || c.department === selectedDept;
    const matchesYear = selectedYear === 'all' || c.yearOfStudy === selectedYear;

    let matchesStatus = true;
    if (selectedStatus === 'candidate') {
      matchesStatus = c.enrolmentStatus === 'candidate';
    } else if (selectedStatus === 'onboarded') {
      matchesStatus = c.enrolmentStatus === 'onboarded';
    } else if (selectedStatus !== 'all') {
      const intern = interns.find((i) => i.studentId === c.id || i.id === c.internId);
      matchesStatus = intern ? intern.status === selectedStatus : false;
    }

    return matchesSearch && matchesDept && matchesYear && matchesStatus;
  });

  const handleAddNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    const targetId = newId.trim() || `MPCAS-2026-STU${Math.floor(120 + Math.random() * 880)}`;
    const targetEmail = newEmail.trim() || `${newName.toLowerCase().replace(/\s+/g, '.')}.stu@mpcas.edu.in`;

    const dup = checkStudentDuplicate({
      id: targetId,
      email: targetEmail,
      mobile: newMobile.trim()
    });

    if (dup.isDuplicate) {
      setAddError(dup.message || 'Duplicate student account detected.');
      return;
    }

    const actorName =
      userRole === 'campus_admin'
        ? 'Dr. S. Meenakshi Sundaram (Campus Admin)'
        : 'Authorized Administrator';

    const res = createCandidateStudent(
      {
        id: targetId,
        name: newName.trim(),
        email: targetEmail,
        mobile: newMobile.trim(),
        college: 'Maruthu Pandiyar College of Arts and Science',
        department: newDept,
        yearOfStudy: newYear
      },
      userRole,
      actorName
    );

    if (!res.success) {
      setAddError(res.error || 'Failed to create student candidate.');
      return;
    }

    onRefreshData();
    setShowAddModal(false);
    setNewId('');
    setNewName('');
    setNewEmail('');
    setNewMobile('');
  };

  const handleConfirmSingleEnrol = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrolCandidateModalItem) return;

    onOnboardIntern(
      enrolCandidateModalItem.id,
      enrolSupervisor,
      enrolCandidateModalItem.department,
      enrolPin,
      enrolCandidateModalItem.yearOfStudy,
      enrolJoiningDate
    );

    setEnrolCandidateModalItem(null);
    onRefreshData();
  };

  const handleToggleBulkSelect = (id: string) => {
    setSelectedCandidateIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllFilteredCandidates = () => {
    const candidateIds = filteredCandidates
      .filter((c) => c.enrolmentStatus === 'candidate')
      .map((c) => c.id);

    if (selectedCandidateIds.length === candidateIds.length) {
      setSelectedCandidateIds([]);
    } else {
      setSelectedCandidateIds(candidateIds);
    }
  };

  const handleExecuteBulkEnrol = () => {
    if (selectedCandidateIds.length === 0) return;
    onBulkOnboard(selectedCandidateIds, bulkSupervisor);
    setSelectedCandidateIds([]);
    onRefreshData();
  };

  const openInternProfileForCandidate = (c: StudentCandidate) => {
    const foundIntern = interns.find((i) => i.studentId === c.id || i.id === c.internId);
    if (foundIntern) {
      setSelectedInternForProfile(foundIntern);
    } else {
      // If candidate not yet onboarded, open enrol modal
      setEnrolCandidateModalItem(c);
    }
  };

  return (
    <div className="space-y-6">
      {/* Faculty Supervisor Scoping Notice */}
      {userRole === 'faculty_supervisor' && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-blue-800 dark:text-blue-300">
            <Shield className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Faculty Supervisor Scoped View:</strong> Viewing only students and interns allocated to{' '}
              <strong className="underline">{selectedSupervisorFilter}</strong>.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-500 text-[11px]">Switch Supervisor:</span>
            <select
              value={selectedSupervisorFilter}
              onChange={(e) => setSelectedSupervisorFilter(e.target.value)}
              className="px-2 py-1 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded text-slate-800 dark:text-slate-200 text-xs"
            >
              <option value="Dr. S. Meenakshi Sundaram">Dr. S. Meenakshi Sundaram</option>
              <option value="Prof. R. Natarajan">Prof. R. Natarajan</option>
              <option value="Dr. M. Sasikumar">Dr. M. Sasikumar</option>
            </select>
          </div>
        </div>
      )}

      {/* Section Header with Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {lang === 'ta'
              ? 'மாணவர் தரவுத்தளம் & பயிற்சியாளர் பதிவேடு'
              : 'Students & Interns Directory (Stage 2)'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Authorised student roster for Maruthu Pandiyar College. Enrol students, assign supervisors, manage lifecycle statuses, and audit changes.
          </p>
        </div>

        {isFullAdmin && (
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => setShowAuditModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
            >
              <History className="w-3.5 h-3.5 text-emerald-600" />
              <span>Audit Log ({auditLogs.length})</span>
            </button>

            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
            >
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span>CSV / Portal Ingestion</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'மாணவர் சேர்க்கை' : 'Enrol New Student'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Multi-Field Search and Filter Strip */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              lang === 'ta'
                ? 'பெயர், மாணவர் எண், துறை, ஆண்டு அல்லது கைபேசி மூலம் தேடுக...'
                : 'Search by student name, student ID, department, academic year, or mobile number...'
            }
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white placeholder-slate-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
            >
              <option value="all">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d.replace('Department of ', '')}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
            >
              <option value="all">All Academic Years</option>
              <option value="I Year">I Year</option>
              <option value="II Year">II Year</option>
              <option value="III Year">III Year</option>
              <option value="PG I">PG I</option>
              <option value="PG II">PG II</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            {['all', 'candidate', 'onboarded', 'Active', 'Suspended', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2 py-1 rounded-md font-medium capitalize transition-colors ${
                  selectedStatus === st
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {st === 'candidate' ? 'Candidates' : st === 'onboarded' ? 'Interns' : st}
              </button>
            ))}
          </div>

          <span className="ml-auto text-[11px] text-slate-400 font-mono">
            Showing {filteredCandidates.length} of {candidates.length} records
          </span>
        </div>
      </div>

      {/* Bulk Action Strip if items selected */}
      {isFullAdmin && selectedCandidateIds.length > 0 && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>{selectedCandidateIds.length} Candidates Selected for Bulk Onboarding</span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={bulkSupervisor}
              onChange={(e) => setBulkSupervisor(e.target.value)}
              className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 rounded-lg text-slate-900 dark:text-white text-xs"
            >
              <option value="Dr. S. Meenakshi Sundaram">Dr. S. Meenakshi Sundaram</option>
              <option value="Prof. R. Natarajan">Prof. R. Natarajan</option>
              <option value="Dr. M. Sasikumar">Dr. M. Sasikumar</option>
            </select>

            <button
              onClick={handleExecuteBulkEnrol}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Enrol Selected ({selectedCandidateIds.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Student and Intern Directory Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {isFullAdmin && (
                  <th className="py-3 px-3 w-8">
                    <button
                      type="button"
                      onClick={handleSelectAllFilteredCandidates}
                      className="text-slate-400 hover:text-emerald-600"
                      title="Select all candidate students"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                    </button>
                  </th>
                )}
                <th className="py-3 px-4">Student ID / Name</th>
                <th className="py-3 px-4">Department & Year</th>
                <th className="py-3 px-4">Mobile & Official Email</th>
                <th className="py-3 px-4">Supervisor & Joining</th>
                <th className="py-3 px-4">Internship Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredCandidates.map((stu) => {
                const intern = interns.find((i) => i.studentId === stu.id || i.id === stu.internId);
                const isOnboarded = stu.enrolmentStatus === 'onboarded' || !!intern;
                const isSelected = selectedCandidateIds.includes(stu.id);

                return (
                  <tr
                    key={stu.id}
                    className={`hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors ${
                      isSelected ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                    }`}
                  >
                    {isFullAdmin && (
                      <td className="py-3 px-3">
                        {!isOnboarded ? (
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleBulkSelect(stu.id)}
                            className="rounded text-emerald-600 focus:ring-emerald-500"
                          />
                        ) : (
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                        )}
                      </td>
                    )}

                    <td className="py-3 px-4">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{stu.name}</p>
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                          <span>{stu.id}</span>
                          {intern && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                                {intern.id}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="text-slate-800 dark:text-slate-200">
                        {stu.department.replace('Department of ', '')}
                      </p>
                      <p className="text-[11px] text-slate-500">{stu.yearOfStudy}</p>
                    </td>

                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-mono">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{stu.mobile}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-mono">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[140px]">{stu.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="text-slate-700 dark:text-slate-300">
                        {intern?.assignedSupervisor || stu.assignedSupervisor || 'Unassigned'}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {intern?.joiningDate ? `Joined: ${intern.joiningDate}` : 'Pending Enrolment'}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      {intern ? (
                        <div className="space-y-0.5">
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded capitalize inline-flex items-center gap-1 ${
                              intern.status === 'Active'
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                                : intern.status === 'Suspended'
                                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                                : intern.status === 'Completed'
                                ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span>{intern.status}</span>
                          </span>
                          <p className="font-mono text-[10px] text-slate-400">PIN: {intern.pin}</p>
                        </div>
                      ) : (
                        <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                          Candidate
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {intern ? (
                          <button
                            onClick={() => setSelectedInternForProfile(intern)}
                            className="px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors inline-flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Profile</span>
                          </button>
                        ) : isFullAdmin ? (
                          <button
                            onClick={() => setEnrolCandidateModalItem(stu)}
                            className="px-3 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors"
                          >
                            Enrol Intern
                          </button>
                        ) : (
                          <span className="text-slate-400 text-xs italic">Awaiting Enrolment</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredCandidates.length === 0 && (
                <tr>
                  <td colSpan={isFullAdmin ? 7 : 6} className="py-12 text-center text-slate-500">
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Single Candidate Enrolment Modal */}
      {enrolCandidateModalItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleConfirmSingleEnrol}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Enrol Student as ECOPOLY Intern
              </h3>
              <button
                type="button"
                onClick={() => setEnrolCandidateModalItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">
                  {enrolCandidateModalItem.name}
                </p>
                <p className="text-slate-500 font-mono">
                  Student ID: {enrolCandidateModalItem.id} · {enrolCandidateModalItem.department}
                </p>
                <p className="text-slate-500 font-mono">Mobile: {enrolCandidateModalItem.mobile}</p>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Faculty Supervisor *
                </label>
                <select
                  value={enrolSupervisor}
                  onChange={(e) => setEnrolSupervisor(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="Dr. S. Meenakshi Sundaram">Dr. S. Meenakshi Sundaram (Campus Admin)</option>
                  <option value="Prof. R. Natarajan">Prof. R. Natarajan (Biotechnology & Agri)</option>
                  <option value="Dr. M. Sasikumar">Dr. M. Sasikumar (Environmental Studies)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Joining Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={enrolJoiningDate}
                    onChange={(e) => setEnrolJoiningDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    4-Digit Security PIN *
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    required
                    value={enrolPin}
                    onChange={(e) => setEnrolPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-center font-bold tracking-widest"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                A unique sequential Intern ID (e.g. MPCAS-2026-ENVxx) will be assigned automatically and logged to the audit trail.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEnrolCandidateModalItem(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
              >
                Confirm Enrolment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Manual Add Student Modal with Duplicate Protection */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddNewStudent}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Enrol Student in College Database
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {addError && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 rounded-lg text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{addError}</span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Student ID / Roll Number (Must be unique) *
                </label>
                <input
                  type="text"
                  required
                  value={newId}
                  onChange={(e) => setNewId(e.target.value)}
                  placeholder="e.g. MPCAS-2026-STU115"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. R. Subramanian"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newMobile}
                    onChange={(e) => setNewMobile(e.target.value)}
                    placeholder="e.g. 9842100000"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Academic Year
                  </label>
                  <select
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="I Year">I Year</option>
                    <option value="II Year">II Year</option>
                    <option value="III Year">III Year</option>
                    <option value="PG I">PG I</option>
                    <option value="PG II">PG II</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Department
                </label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. subramanian.env@mpcas.edu.in"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs"
              >
                Save Candidate
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CSV / Portal Import Modal */}
      {showImportModal && (
        <StudentImportModal
          onClose={() => setShowImportModal(false)}
          onSuccess={() => {
            onRefreshData();
          }}
          lang={lang}
          userRole={userRole}
        />
      )}

      {/* Audit Log Modal */}
      {showAuditModal && (
        <AuditLogModal
          logs={auditLogs}
          onClose={() => setShowAuditModal(false)}
          lang={lang}
        />
      )}

      {/* Intern Profile Drawer/Modal */}
      {selectedInternForProfile && (
        <InternProfileModal
          intern={selectedInternForProfile}
          surveys={surveys}
          assignments={assignments}
          posts={posts}
          greenCredits={greenCredits}
          onUpdateStatus={(id, st, reason) => {
            onUpdateInternStatus(id, st, reason);
            // Refresh local selected intern state
            const updated = interns.find((i) => i.id === id);
            if (updated) setSelectedInternForProfile({ ...updated, status: st });
          }}
          onClose={() => setSelectedInternForProfile(null)}
          lang={lang}
          userRole={userRole}
        />
      )}
    </div>
  );
};
