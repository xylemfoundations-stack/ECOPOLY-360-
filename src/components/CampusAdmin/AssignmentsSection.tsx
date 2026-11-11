import React, { useState } from 'react';
import {
  InternAssignment,
  StudentIntern,
  Language,
  UserRole
} from '../../types/survey';
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Trash2,
  X,
  Target,
  FileCheck
} from 'lucide-react';

interface AssignmentsSectionProps {
  assignments: InternAssignment[];
  interns: StudentIntern[];
  onSaveAssignment: (assignment: InternAssignment) => void;
  onDeleteAssignment: (id: string) => void;
  lang: Language;
  userRole: UserRole;
}

export const AssignmentsSection: React.FC<AssignmentsSectionProps> = ({
  assignments,
  interns,
  onSaveAssignment,
  onDeleteAssignment,
  lang,
  userRole
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [reassignModalItem, setReassignModalItem] = useState<InternAssignment | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'individual' | 'group'>('individual');
  const [selectedInternIds, setSelectedInternIds] = useState<string[]>([interns[0]?.id || '']);
  const [targetVillage, setTargetVillage] = useState('Ammapettai');
  const [targetTaluk, setTargetTaluk] = useState('Papanasam');
  const [targetSurveyCount, setTargetSurveyCount] = useState(5);
  const [deadline, setDeadline] = useState('2026-11-25');
  const [supervisor, setSupervisor] = useState('Dr. S. Meenakshi Sundaram');
  const [activityDescription, setActivityDescription] = useState('');
  const [categories, setCategories] = useState<string[]>(['Household', 'Farmer']);

  // Reassignment State
  const [reassignNewInternId, setReassignNewInternId] = useState(interns[0]?.id || '');
  const [reassignReason, setReassignReason] = useState('');

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || selectedInternIds.length === 0) return;

    const assignedInterns = interns.filter((i) => selectedInternIds.includes(i.id));
    const newAssignment: InternAssignment = {
      id: `ASG-2026-00${assignments.length + 1}`,
      title: title.trim(),
      type,
      internIds: selectedInternIds,
      internNames: assignedInterns.map((i) => i.name),
      targetVillage,
      targetTaluk,
      targetCategories: categories,
      supervisor,
      targetSurveyCount: Number(targetSurveyCount) || 5,
      completedSurveyCount: 0,
      activityDescription: activityDescription.trim(),
      deadline,
      status: 'assigned',
      createdAt: new Date().toISOString()
    };

    onSaveAssignment(newAssignment);
    setShowCreateModal(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setType('individual');
    setSelectedInternIds([interns[0]?.id || '']);
    setTargetVillage('Ammapettai');
    setTargetSurveyCount(5);
    setActivityDescription('');
  };

  const handleReassignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reassignModalItem || !reassignNewInternId) return;

    const newIntern = interns.find((i) => i.id === reassignNewInternId);
    if (!newIntern) return;

    const auditEntry = {
      reassignedAt: new Date().toISOString(),
      previousInterns: reassignModalItem.internNames,
      reason: reassignReason || 'Reassigned by Campus Admin'
    };

    const updated: InternAssignment = {
      ...reassignModalItem,
      internIds: [newIntern.id],
      internNames: [newIntern.name],
      reassignmentAudit: [...(reassignModalItem.reassignmentAudit || []), auditEntry]
    };

    onSaveAssignment(updated);
    setReassignModalItem(null);
    setReassignReason('');
  };

  const filteredAssignments = assignments.filter((a) => {
    if (statusFilter === 'all') return true;
    return a.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {lang === 'ta' ? 'கள ஆய்வு இலக்குகள் & பணிகள்' : 'Field Targets & Intern Assignments'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dispatch individual or group survey tasks across Thanjavur district villages with deadlines and audit trails.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{lang === 'ta' ? 'புதிய பணி ஒதுக்கீடு' : 'Create Assignment'}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit text-xs">
        {['all', 'assigned', 'in_progress', 'completed'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors capitalize ${
              statusFilter === st
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Assignments Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAssignments.map((asg) => {
          const progressPct = Math.min(
            100,
            Math.round((asg.completedSurveyCount / asg.targetSurveyCount) * 100)
          );

          return (
            <div
              key={asg.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-mono font-semibold text-slate-500">
                    {asg.id}
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded capitalize ${
                      asg.status === 'completed'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                        : asg.status === 'in_progress'
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                    }`}
                  >
                    {asg.status.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                  {asg.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {asg.activityDescription}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {asg.targetVillage}, {asg.targetTaluk}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {asg.internNames.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Deadline: {asg.deadline}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Survey Target</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {asg.completedSurveyCount} / {asg.targetSurveyCount} ({progressPct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Reassignment audit info if present */}
                {asg.reassignmentAudit && asg.reassignmentAudit.length > 0 && (
                  <p className="text-[11px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2 rounded">
                    Reassigned: {asg.reassignmentAudit[asg.reassignmentAudit.length - 1].reason}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  Sup: {asg.supervisor.replace('Dr. ', '').replace('Prof. ', '')}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReassignModalItem(asg)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Reassign Intern"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Delete this assignment?')) {
                        onDeleteAssignment(asg.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Delete Assignment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredAssignments.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            No assignments match the selected status filter.
          </div>
        )}
      </div>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateAssignment}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Create Field Intern Assignment
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Kumbakonam Cauvery River Basin Household Audit"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Assignment Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'individual' | 'group')}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="individual">Individual Intern</option>
                    <option value="group">Group / Cohort</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Target Survey Count
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={targetSurveyCount}
                    onChange={(e) => setTargetSurveyCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Assign Student Intern(s) *
                </label>
                <select
                  multiple={type === 'group'}
                  value={selectedInternIds}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, (o) => o.value);
                    setSelectedInternIds(options);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white h-24"
                >
                  {interns.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name} ({i.id}) · {i.department.replace('Department of ', '')}
                    </option>
                  ))}
                </select>
                {type === 'group' && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    Hold Ctrl (Windows) or Cmd (Mac) to select multiple interns.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Target Village / Ward *
                  </label>
                  <input
                    type="text"
                    required
                    value={targetVillage}
                    onChange={(e) => setTargetVillage(e.target.value)}
                    placeholder="e.g. Ammapettai"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Taluk / District
                  </label>
                  <input
                    type="text"
                    value={targetTaluk}
                    onChange={(e) => setTargetTaluk(e.target.value)}
                    placeholder="e.g. Papanasam, Thanjavur"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Faculty Supervisor
                  </label>
                  <select
                    value={supervisor}
                    onChange={(e) => setSupervisor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Dr. S. Meenakshi Sundaram">Dr. S. Meenakshi Sundaram</option>
                    <option value="Prof. R. Natarajan">Prof. R. Natarajan</option>
                    <option value="Dr. M. Sasikumar">Dr. M. Sasikumar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Submission Deadline *
                  </label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Activity Guidance & Sustainability Instructions
                </label>
                <textarea
                  rows={3}
                  value={activityDescription}
                  onChange={(e) => setActivityDescription(e.target.value)}
                  placeholder="Specific tasks: collect soil & drinking water samples, record rooftop solar adoption, inspect canal water quality..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
              >
                Dispatch Assignment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reassignment Modal */}
      {reassignModalItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleReassignSubmit}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Reassign Intern Assignment
              </h3>
              <button
                type="button"
                onClick={() => setReassignModalItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {reassignModalItem.title}
                </p>
                <p className="text-slate-500 mt-1">
                  Currently Assigned: {reassignModalItem.internNames.join(', ')}
                </p>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  New Intern Surveyor *
                </label>
                <select
                  value={reassignNewInternId}
                  onChange={(e) => setReassignNewInternId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  {interns.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name} ({i.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Reason for Reassignment (Audit Trail) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={reassignReason}
                  onChange={(e) => setReassignReason(e.target.value)}
                  placeholder="e.g. Intern on exam leave; reassigned to prioritize field deadline."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setReassignModalItem(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
              >
                Confirm Reassignment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
