import React, { useState } from 'react';
import {
  StudentIntern,
  SurveyRecord,
  InternAssignment,
  InternPost,
  GreenCreditTransaction,
  InternStatus,
  Language,
  UserRole
} from '../../types/survey';
import {
  User,
  Shield,
  Key,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  XCircle,
  RotateCcw,
  Award,
  FileText,
  Camera,
  MapPin,
  Phone,
  Mail,
  Building,
  GraduationCap,
  X,
  Check
} from 'lucide-react';

interface InternProfileModalProps {
  intern: StudentIntern;
  surveys: SurveyRecord[];
  assignments: InternAssignment[];
  posts: InternPost[];
  greenCredits: GreenCreditTransaction[];
  onUpdateStatus: (
    internId: string,
    newStatus: InternStatus,
    reason?: string
  ) => void;
  onClose: () => void;
  lang: Language;
  userRole: UserRole;
}

export const InternProfileModal: React.FC<InternProfileModalProps> = ({
  intern,
  surveys,
  assignments,
  posts,
  greenCredits,
  onUpdateStatus,
  onClose,
  lang,
  userRole
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'status' | 'assignments' | 'surveys' | 'posts' | 'credits'
  >('overview');
  const [suspendReason, setSuspendReason] = useState('');
  const [showSuspendInput, setShowSuspendInput] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const canManageStatus = userRole === 'campus_admin' || userRole === 'super_admin';

  // Filter intern specific data
  const internSurveys = surveys.filter((s) => s.surveyor.internId === intern.id);
  const internAssignments = assignments.filter((a) =>
    a.internIds.includes(intern.id) || a.internNames.includes(intern.name)
  );
  const internPosts = posts.filter((p) => p.authorInternId === intern.id);
  const internCredits = greenCredits.filter((g) => g.internId === intern.id);
  const totalCredits = internCredits
    .filter((g) => g.status === 'confirmed')
    .reduce((sum, g) => sum + g.credits, 0);

  const handleStatusChange = (newStatus: InternStatus, reason?: string) => {
    onUpdateStatus(intern.id, newStatus, reason);
    setActionSuccessMsg(`Intern status updated to '${newStatus}'!`);
    setShowSuspendInput(false);
    setSuspendReason('');
    setTimeout(() => setActionSuccessMsg(null), 3500);
  };

  const getStatusBadge = (status: InternStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded text-xs font-semibold inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active Member</span>
          </span>
        );
      case 'Invited':
      case 'Pending Acceptance':
        return (
          <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-2.5 py-0.5 rounded text-xs font-semibold inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{status}</span>
          </span>
        );
      case 'Suspended':
        return (
          <span className="bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800 px-2.5 py-0.5 rounded text-xs font-semibold inline-flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            <span>Suspended</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800 px-2.5 py-0.5 rounded text-xs font-semibold inline-flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>Internship Completed</span>
          </span>
        );
      case 'On Leave':
        return (
          <span className="bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-2.5 py-0.5 rounded text-xs font-semibold inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>On Leave</span>
          </span>
        );
      case 'Inactive':
      default:
        return (
          <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2.5 py-0.5 rounded text-xs font-semibold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header Strip */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
              {intern.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  {intern.name}
                </h3>
                {getStatusBadge(intern.status)}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>Intern ID: {intern.id}</span>
                <span aria-hidden="true">·</span>
                <span>Student ID: {intern.studentId || 'MPCAS-2026-STU'}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 font-bold">{totalCredits} Green Credits</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {actionSuccessMsg && (
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 rounded-lg flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs overflow-x-auto shrink-0">
          {[
            { id: 'overview', label: 'Contact & Profile' },
            { id: 'status', label: 'Membership Status & Controls' },
            { id: 'assignments', label: `Assigned Tasks (${internAssignments.length})` },
            { id: 'surveys', label: `Surveys (${internSurveys.length})` },
            { id: 'posts', label: `Field Posts (${internPosts.length})` },
            { id: 'credits', label: `Green Credits (${totalCredits})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs">
          {/* TAB 1: OVERVIEW & CONTACT */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    <span>College & Department</span>
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {intern.college}
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400">
                    {intern.department}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Academic Year & Supervisor</span>
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {intern.academicYear || 'III Year'}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Supervisor: {intern.assignedSupervisor}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Contact Coordinates</span>
                  </span>
                  <p className="font-mono font-semibold text-slate-900 dark:text-white mt-0.5">
                    Mobile: {intern.mobile}
                  </p>
                  <p className="font-mono text-slate-600 dark:text-slate-400 truncate">
                    Email: {intern.email}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Auth 4-Digit Security PIN</span>
                  </span>
                  <p className="font-mono font-bold text-base text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {intern.pin}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Used for field survey authorization.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Onboarding & Joining Milestones:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-mono">
                  <p>Joining Date: {intern.joiningDate || '2026-11-01'}</p>
                  <p>Invited At: {new Date(intern.invitedAt).toLocaleDateString()}</p>
                  <p>Invited By: {intern.invitedBy}</p>
                  <p>
                    Notification: {intern.notificationSent ? 'Dispatched' : 'Manual Card Handled'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEMBERSHIP STATUS & CONTROLS */}
          {activeTab === 'status' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Current Membership Status:
                  </span>
                  {getStatusBadge(intern.status)}
                </div>

                {intern.statusReason && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    Log: {intern.statusReason}
                  </p>
                )}
              </div>

              {canManageStatus ? (
                <div className="space-y-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Administrative Lifecycle Controls
                  </h4>
                  <p className="text-xs text-slate-500">
                    Only authorized Campus Administrators may transition student membership. Every change is immutably logged to the compliance ledger.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {intern.status !== 'Active' && (
                      <button
                        onClick={() => handleStatusChange('Active', 'Reactivated by Campus Admin')}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Activate Intern</span>
                      </button>
                    )}

                    {intern.status === 'Active' && (
                      <>
                        <button
                          onClick={() => handleStatusChange('Completed', 'Successfully completed field survey internship hours')}
                          className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold flex items-center gap-1.5"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Complete Membership</span>
                        </button>

                        <button
                          onClick={() => handleStatusChange('On Leave', 'Exam leave / approved absence')}
                          className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold flex items-center gap-1.5"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Place On Leave</span>
                        </button>

                        <button
                          onClick={() => setShowSuspendInput(!showSuspendInput)}
                          className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold flex items-center gap-1.5"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Suspend Membership</span>
                        </button>
                      </>
                    )}

                    {intern.status === 'Suspended' && (
                      <button
                        onClick={() => handleStatusChange('Active', 'Suspension lifted by Campus Admin')}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reactivate Membership</span>
                      </button>
                    )}

                    {intern.status !== 'Inactive' && (
                      <button
                        onClick={() => handleStatusChange('Inactive', 'Marked inactive')}
                        className="px-3.5 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 rounded-lg font-semibold"
                      >
                        Mark Inactive
                      </button>
                    )}
                  </div>

                  {showSuspendInput && (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      <label className="block font-medium text-slate-700 dark:text-slate-300">
                        Reason for Suspension (Recorded in Audit Log) *
                      </label>
                      <input
                        type="text"
                        value={suspendReason}
                        onChange={(e) => setSuspendReason(e.target.value)}
                        placeholder="e.g. Failure to comply with field ethics or prolonged unexcused absence"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowSuspendInput(false)}
                          className="px-3 py-1.5 text-xs text-slate-500"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange('Suspended', suspendReason || 'Administrative suspension')
                          }
                          className="px-4 py-1.5 bg-rose-600 text-white font-semibold rounded-lg text-xs"
                        >
                          Confirm Suspension
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-lg text-xs">
                  Membership status controls are restricted to Campus Administrators. Faculty supervisors have read-only view.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ASSIGNED TASKS */}
          {activeTab === 'assignments' && (
            <div className="space-y-3">
              {internAssignments.map((asg) => (
                <div
                  key={asg.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">
                      {asg.title}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
                      {asg.status}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2">
                    {asg.activityDescription}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>
                      Target: {asg.targetVillage} · {asg.completedSurveyCount}/{asg.targetSurveyCount} Surveys
                    </span>
                    <span>Deadline: {asg.deadline}</span>
                  </div>
                </div>
              ))}
              {internAssignments.length === 0 && (
                <p className="py-6 text-center text-slate-500">No field assignments currently assigned.</p>
              )}
            </div>
          )}

          {/* TAB 4: SURVEYS */}
          {activeTab === 'surveys' && (
            <div className="space-y-3">
              {internSurveys.map((s) => (
                <div
                  key={s.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {s.respondent.fullName || 'Respondent'}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {s.id} · {s.address.villageTownWard || 'Thanjavur'} · {s.sustainabilityScore?.overall || 65}/100 Score
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded capitalize">
                      {s.approvalStatus || s.status}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {internSurveys.length === 0 && (
                <p className="py-6 text-center text-slate-500">No field surveys submitted by this intern yet.</p>
              )}
            </div>
          )}

          {/* TAB 5: POSTS */}
          {activeTab === 'posts' && (
            <div className="space-y-3">
              {internPosts.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{p.title}</p>
                    <p className="text-[11px] text-slate-500">
                      {p.category} · {p.location} · {p.date}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded capitalize">
                    {p.status}
                  </span>
                </div>
              ))}
              {internPosts.length === 0 && (
                <p className="py-6 text-center text-slate-500">No field activity posts submitted yet.</p>
              )}
            </div>
          )}

          {/* TAB 6: GREEN CREDITS */}
          {activeTab === 'credits' && (
            <div className="space-y-3">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                    Total Approved Green Credits
                  </span>
                  <p className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
                    {totalCredits} Credits
                  </p>
                </div>
                <Award className="w-8 h-8 text-emerald-600" />
              </div>

              {internCredits.map((gc) => (
                <div
                  key={gc.id}
                  className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{gc.notes}</p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Ref: {gc.referenceId} · {new Date(gc.issuedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    +{gc.credits} GC
                  </span>
                </div>
              ))}
              {internCredits.length === 0 && (
                <p className="py-6 text-center text-slate-500">No Green Credits recorded for this intern yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
