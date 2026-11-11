import React, { useState, useEffect } from 'react';
import {
  StudentCandidate,
  StudentIntern,
  CampusSettings,
  Language,
  UserRole
} from '../../types/survey';
import {
  CheckCircle2,
  Copy,
  Check,
  Send,
  Users,
  Shield,
  Key,
  MessageSquare,
  Share2,
  QrCode,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  GraduationCap,
  Calendar
} from 'lucide-react';

interface OnboardingSectionProps {
  candidates: StudentCandidate[];
  interns: StudentIntern[];
  campusSettings: CampusSettings;
  onOnboardIntern: (
    candidateId: string,
    supervisor: string,
    department: string,
    pin: string,
    academicYear?: 'I Year' | 'II Year' | 'III Year' | 'PG I' | 'PG II',
    joiningDate?: string
  ) => void;
  onBulkOnboard: (candidateIds: string[], supervisor: string) => void;
  onSendCommunication: (channel: 'email' | 'whatsapp', recipientName: string, text: string) => void;
  initialSelectedCandidateId?: string;
  lang: Language;
  userRole: UserRole;
}

export const OnboardingSection: React.FC<OnboardingSectionProps> = ({
  candidates,
  interns,
  campusSettings,
  onOnboardIntern,
  onBulkOnboard,
  onSendCommunication,
  initialSelectedCandidateId,
  lang,
  userRole
}) => {
  const isAuthorized = userRole === 'campus_admin' || userRole === 'super_admin';

  const pendingCandidates = candidates.filter((c) => c.enrolmentStatus === 'candidate');

  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    initialSelectedCandidateId || (pendingCandidates[0]?.id ?? '')
  );
  const [assignedSupervisor, setAssignedSupervisor] = useState('Dr. S. Meenakshi Sundaram');
  const [assignedDepartment, setAssignedDepartment] = useState('Department of Environmental Studies');
  const [academicYear, setAcademicYear] = useState<'I Year' | 'II Year' | 'III Year' | 'PG I' | 'PG II'>('II Year');
  const [joiningDate, setJoiningDate] = useState(new Date().toISOString().slice(0, 10));
  const [customPin, setCustomPin] = useState('2026');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [recentOnboarded, setRecentOnboarded] = useState<StudentIntern | null>(null);
  const [bulkSelectedIds, setBulkSelectedIds] = useState<string[]>([]);
  const [bulkSuccessMsg, setBulkSuccessMsg] = useState<string | null>(null);


  useEffect(() => {
    if (initialSelectedCandidateId) {
      setSelectedCandidateId(initialSelectedCandidateId);
    }
  }, [initialSelectedCandidateId]);

  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId);

  useEffect(() => {
    if (selectedCandidate) {
      setAssignedDepartment(selectedCandidate.department);
    }
  }, [selectedCandidate]);

  const handleGeneratePin = () => {
    const randomPin = String(Math.floor(1000 + Math.random() * 9000));
    setCustomPin(randomPin);
  };

  const handleSingleOnboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidateId) return;

    onOnboardIntern(
      selectedCandidateId,
      assignedSupervisor,
      assignedDepartment,
      customPin,
      academicYear,
      joiningDate
    );

    const internId = `MPCAS-2026-ENV${Math.floor(10 + Math.random() * 90)}`;
    const internObj: StudentIntern = {
      id: internId,
      studentId: selectedCandidateId,
      name: selectedCandidate ? selectedCandidate.name : 'Intern',
      email: selectedCandidate ? selectedCandidate.email : 'intern@mpcas.edu.in',
      mobile: selectedCandidate ? selectedCandidate.mobile : '9876543210',
      college: 'Maruthu Pandiyar College of Arts and Science',
      department: assignedDepartment,
      academicYear,
      joiningDate,
      pin: customPin,
      status: 'Active',
      invitedAt: new Date().toISOString(),
      invitedBy: 'Campus Admin (Dr. S. Meenakshi Sundaram)',
      assignedSupervisor,
      totalSurveys: 0,
      notificationSent:
        campusSettings.emailIntegrationAuthorized || campusSettings.whatsappIntegrationAuthorized
    };
    setRecentOnboarded(internObj);
  };

  const handleBulkOnboardSubmit = () => {
    if (bulkSelectedIds.length === 0) return;
    onBulkOnboard(bulkSelectedIds, assignedSupervisor);
    setBulkSuccessMsg(`Successfully onboarded ${bulkSelectedIds.length} candidate interns!`);
    setBulkSelectedIds([]);
    setTimeout(() => setBulkSuccessMsg(null), 4000);
  };

  const toggleBulkSelect = (id: string) => {
    setBulkSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllBulk = () => {
    if (bulkSelectedIds.length === pendingCandidates.length) {
      setBulkSelectedIds([]);
    } else {
      setBulkSelectedIds(pendingCandidates.map((c) => c.id));
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  if (!isAuthorized) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-2xl p-8 text-center space-y-4 max-w-2xl mx-auto my-12 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center mx-auto">
          <Shield className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Onboarding Controls Restricted
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Student intern onboarding, supervisor allocation, and surveyor PIN provisioning require authenticated Campus Administrator or Super Admin authorization.
        </p>
      </div>
    );
  }

  const notificationActive =
    campusSettings.emailIntegrationAuthorized || campusSettings.whatsappIntegrationAuthorized;

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          {lang === 'ta'
            ? 'பயிற்சியாளர் சேர்க்கை & அனுமதி மேலாண்மை'
            : 'Student Intern Onboarding & Access Provisioning'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Verify college students, assign faculty supervisors, configure 4-digit security PINs, and issue official invitation cards.
        </p>
      </div>

      {/* Notification Configuration Status Advisory */}
      <div
        className={`p-4 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          notificationActive
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
            : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Send className="w-4 h-4 shrink-0" />
          <span>
            {notificationActive ? (
              <strong>Notification Integration Active:</strong>
            ) : (
              <strong>Notification Integration Notice:</strong>
            )}{' '}
            {notificationActive
              ? 'Automated email/WhatsApp notifications are authorised and will dispatch upon intern activation.'
              : 'Automated email/WhatsApp notifications are currently paused until integration credentials are authenticated in Campus Settings. Use the official copyable credentials card below or dispatch via manual link.'}
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout: Left Onboarding Form, Right Generated Invitation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Step-by-Step Onboarding */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Step-by-Step Intern Activation</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {pendingCandidates.length} Candidates Pending
            </span>
          </div>

          <form onSubmit={handleSingleOnboard} className="space-y-4 text-xs">
            {/* Step 1: Select Candidate */}
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                1. Select Enrolled Student Candidate *
              </label>
              {pendingCandidates.length > 0 ? (
                <select
                  value={selectedCandidateId}
                  onChange={(e) => setSelectedCandidateId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
                >
                  {pendingCandidates.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.id}) · {c.department.replace('Department of ', '')} · {c.yearOfStudy}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500">
                  All registered students are currently onboarded! Add more students in the Student Directory.
                </div>
              )}
            </div>

            {/* Step 2: Assign Supervisor and Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  2. Assign Faculty Supervisor *
                </label>
                <select
                  value={assignedSupervisor}
                  onChange={(e) => setAssignedSupervisor(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="Dr. S. Meenakshi Sundaram">Dr. S. Meenakshi Sundaram (Campus Admin)</option>
                  <option value="Prof. R. Natarajan">Prof. R. Natarajan (Biotechnology & Agri)</option>
                  <option value="Dr. M. Sasikumar">Dr. M. Sasikumar (Environmental Studies)</option>
                  <option value="Prof. K. Anandhi">Prof. K. Anandhi (Botany & Soil Science)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  readOnly
                  value={assignedDepartment}
                  className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400"
                />
              </div>
            </div>

            {/* Step 3: Academic Year & Joining Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Academic Year *
                </label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="I Year">I Year</option>
                  <option value="II Year">II Year</option>
                  <option value="III Year">III Year</option>
                  <option value="PG I">PG I</option>
                  <option value="PG II">PG II</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Joining Date *
                </label>
                <input
                  type="date"
                  required
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>


            {/* Step 3: 4-Digit Security PIN */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>3. 4-Digit Surveyor PIN (No Signature Required) *</span>
                </label>
                <button
                  type="button"
                  onClick={handleGeneratePin}
                  className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Generate New PIN</span>
                </button>
              </div>
              <input
                type="text"
                maxLength={4}
                required
                value={customPin}
                onChange={(e) => setCustomPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="4-digit PIN (e.g. 2026)"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-base font-bold tracking-widest text-center"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                The intern uses this 4-digit PIN to authenticate survey submissions. Canvas signatures are deprecated.
              </p>
            </div>

            <button
              type="submit"
              disabled={pendingCandidates.length === 0}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-xs shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Activate Intern & Issue Invitation</span>
            </button>
          </form>
        </div>

        {/* Right Column: Invitation Card Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Onboarding Invitation Card</span>
              </h3>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                Official Credential
              </span>
            </div>

            {recentOnboarded || interns[0] ? (
              (() => {
                const target = recentOnboarded || interns[0];
                const invitationText = `*ECOPOLY 360° LIFE MANAGEMENT SURVEY*
Pilot Institution: Maruthu Pandiyar College of Arts and Science, Thanjavur

Dear ${target.name},
You have been appointed as an authenticated Student Intern Surveyor for the ECOPOLY Field Survey.

Surveyor ID: ${target.id}
Department: ${target.department}
Faculty Supervisor: ${target.assignedSupervisor}
Security PIN: ${target.pin}

Surveyor Dashboard: https://ecopoly.life/survey
Instructions: Enter your 4-digit PIN when submitting household assessments and verifying respondent consent.`;

                return (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700 text-[11px]">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">
                          ECOPOLY 360° CREDENTIAL
                        </span>
                        <span className="text-slate-400">MPCAS</span>
                      </div>

                      <div className="space-y-1.5 text-slate-700 dark:text-slate-200">
                        <p>
                          <span className="text-slate-400">Intern:</span>{' '}
                          <strong className="text-slate-900 dark:text-white">{target.name}</strong>
                        </p>
                        <p>
                          <span className="text-slate-400">Intern ID:</span> {target.id}
                        </p>
                        <p>
                          <span className="text-slate-400">Supervisor:</span>{' '}
                          {target.assignedSupervisor}
                        </p>
                        <p>
                          <span className="text-slate-400">Department:</span>{' '}
                          {target.department.replace('Department of ', '')}
                        </p>
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                          <span className="text-slate-400">Security PIN:</span>
                          <span className="font-bold text-base text-emerald-700 dark:text-emerald-400 tracking-wider">
                            {target.pin}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => copyToClipboard(invitationText, 'invitation-card')}
                        className="py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        {copiedId === 'invitation-card' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Card</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(invitationText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Send WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })()
            ) : null}
          </div>
        </div>
      </div>

      {/* Bulk Onboarding Tool */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Bulk Student Intern Onboarding</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select multiple candidate students from the directory and activate them simultaneously.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSelectAllBulk}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {bulkSelectedIds.length === pendingCandidates.length
                ? 'Deselect All'
                : 'Select All Candidates'}
            </button>

            <button
              onClick={handleBulkOnboardSubmit}
              disabled={bulkSelectedIds.length === 0}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Onboard Selected ({bulkSelectedIds.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {bulkSuccessMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-300 rounded-lg flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{bulkSuccessMsg}</span>
          </div>
        )}

        {pendingCandidates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {pendingCandidates.map((c) => {
              const isSelected = bulkSelectedIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => toggleBulkSelect(c.id)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}} // Controlled via parent div click
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-semibold text-slate-900 dark:text-white">{c.name}</p>
                    <p className="text-[11px] font-mono text-slate-500">{c.id}</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      {c.department.replace('Department of ', '')} · {c.yearOfStudy}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-500 py-3 text-center">
            No candidates waiting for onboarding.
          </p>
        )}
      </div>

      {/* Roster of Active Onboarded Interns */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
          Active Student Interns Roster ({interns.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3">Intern ID</th>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Supervisor</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Security PIN</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Invitation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {interns.map((i) => (
                <tr key={i.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-900 dark:text-white">
                    {i.id}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">
                    {i.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    {i.assignedSupervisor}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    {i.department.replace('Department of ', '')}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {i.pin}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      Active
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => {
                        const inv = `*ECOPOLY INTERN CARD*\nName: ${i.name}\nID: ${i.id}\nPIN: ${i.pin}\nSupervisor: ${i.assignedSupervisor}\nApp: https://ecopoly.life/survey`;
                        copyToClipboard(inv, i.id);
                      }}
                      className="px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded font-medium inline-flex items-center gap-1"
                    >
                      {copiedId === i.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === i.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
