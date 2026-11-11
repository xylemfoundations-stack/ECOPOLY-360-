import React, { useState } from 'react';
import {
  SurveyRecord,
  Language,
  UserRole
} from '../../types/survey';
import {
  FileText,
  CheckCircle2,
  Clock,
  RotateCcw,
  XCircle,
  Eye,
  Award,
  MapPin,
  Calendar,
  Layers,
  FlaskConical,
  KeyRound,
  ShieldCheck,
  X,
  Check
} from 'lucide-react';

interface SurveyApprovalsSectionProps {
  surveys: SurveyRecord[];
  onReviewSurvey: (
    surveyId: string,
    status: 'approved' | 'returned' | 'rejected',
    notes: string,
    reviewerName: string
  ) => void;
  lang: Language;
  userRole: UserRole;
}

export const SurveyApprovalsSection: React.FC<SurveyApprovalsSectionProps> = ({
  surveys,
  onReviewSurvey,
  lang,
  userRole
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyRecord | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const handleReviewAction = (
    surveyId: string,
    status: 'approved' | 'returned' | 'rejected'
  ) => {
    const reviewerName =
      userRole === 'campus_admin'
        ? 'Dr. S. Meenakshi Sundaram (Campus Admin)'
        : userRole === 'faculty_supervisor'
        ? 'Prof. R. Natarajan (Faculty Supervisor)'
        : 'Campus Reviewer';

    onReviewSurvey(
      surveyId,
      status,
      reviewNotes || (status === 'approved' ? 'All 12 sectors & lab samples verified.' : 'Action required'),
      reviewerName
    );

    setActionSuccessMsg(
      status === 'approved'
        ? `Survey ${surveyId} approved! 50 Green Credits awarded to surveyor.`
        : `Survey ${surveyId} marked as ${status}.`
    );
    setSelectedSurvey(null);
    setReviewNotes('');
    setTimeout(() => setActionSuccessMsg(null), 4000);
  };

  const filteredSurveys = surveys.filter((s) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending') {
      return s.approvalStatus === 'pending' || (s.status === 'submitted' && !s.approvalStatus);
    }
    if (statusFilter === 'approved') {
      return s.approvalStatus === 'approved' || s.status === 'reviewed';
    }
    if (statusFilter === 'returned') return s.approvalStatus === 'returned';
    if (statusFilter === 'draft') return s.status === 'draft';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {lang === 'ta' ? 'கள ஆய்வு ஒப்புதல் & பசுமை வரவு ஒதுக்கீடு' : 'Master Survey Verification & Approvals'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Inspect 12-sector questionnaire responses, soil and water lab samples, photo evidence, and respondent 4-digit PIN confirmation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Standard: 50 Green Credits / Approved Survey
          </span>
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-300 rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit text-xs">
        {['all', 'pending', 'approved', 'returned', 'draft'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors capitalize ${
              statusFilter === st
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Surveys Verification Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Survey ID / Responder</th>
                <th className="py-3 px-4">Student Surveyor</th>
                <th className="py-3 px-4">Village & District</th>
                <th className="py-3 px-4 text-center">Score & Tier</th>
                <th className="py-3 px-4">PIN & Lab Samples</th>
                <th className="py-3 px-4">Approval Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredSurveys.map((survey) => {
                const isApproved =
                  survey.approvalStatus === 'approved' || survey.status === 'reviewed';
                const isReturned = survey.approvalStatus === 'returned';
                const isPending =
                  survey.approvalStatus === 'pending' ||
                  (!survey.approvalStatus && survey.status !== 'draft');

                const overallScore = survey.sustainabilityScore?.overall || 65;
                const tier = survey.sustainabilityScore?.tier || 'Silver';
                const hasSamples =
                  (survey.evidence?.soilSamples?.length || 0) > 0 ||
                  (survey.evidence?.waterSamples?.length || 0) > 0;

                return (
                  <tr
                    key={survey.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {survey.respondent.fullName || 'Anonymous Respondent'}
                        </p>
                        <p className="font-mono text-[11px] text-slate-500">
                          {survey.id} · {survey.respondent.respondentCategory || 'Household'}
                        </p>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-200">
                          {survey.surveyor.internName}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {survey.surveyor.internId} · {survey.surveyor.department.replace('Department of ', '')}
                        </p>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="text-slate-800 dark:text-slate-200">
                        {survey.address.villageTownWard || 'Thanjavur'}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {survey.address.district}, {survey.address.state}
                      </p>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="font-mono font-bold text-slate-900 dark:text-white">
                        {overallScore}/100
                      </div>
                      <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                        {tier} Tier
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                          <KeyRound className="w-3 h-3 text-emerald-600" />
                          <span>4-Digit PIN Verified</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500">
                          <FlaskConical className="w-3 h-3 text-slate-400" />
                          <span>
                            {survey.evidence?.soilSamples?.length || 0} Soil,{' '}
                            {survey.evidence?.waterSamples?.length || 0} Water
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {isApproved ? (
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Approved (+50 GC)</span>
                          </span>
                          {survey.approvedBy && (
                            <p className="text-[10px] text-slate-400 truncate max-w-[140px]">
                              {survey.approvedBy}
                            </p>
                          )}
                        </div>
                      ) : isReturned ? (
                        <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded inline-flex items-center gap-1">
                          <RotateCcw className="w-3 h-3" />
                          <span>Returned</span>
                        </span>
                      ) : survey.status === 'draft' ? (
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Draft</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Pending Review</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedSurvey(survey)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect</span>
                        </button>

                        {!isApproved && (
                          <button
                            onClick={() => handleReviewAction(survey.id, 'approved')}
                            className="px-2.5 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors whitespace-nowrap"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredSurveys.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No field surveys match the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Survey Inspection Modal */}
      {selectedSurvey && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-mono font-semibold text-slate-400">
                  {selectedSurvey.id}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Field Survey Inspection & Quality Audit
                </h3>
              </div>
              <button
                onClick={() => setSelectedSurvey(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Respondent & Surveyor Header */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div>
                  <span className="text-slate-400">Respondent Details:</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedSurvey.respondent.fullName || 'Anonymous'}
                  </p>
                  <p className="text-slate-500">
                    {selectedSurvey.respondent.gender} · {selectedSurvey.respondent.ageGroup} · {selectedSurvey.respondent.occupation}
                  </p>
                  <p className="text-slate-500 font-mono">
                    Phone: {selectedSurvey.respondent.mobileNumber || 'N/A'}
                  </p>
                  <p className="text-slate-500">
                    Location: {selectedSurvey.address.villageTownWard}, {selectedSurvey.address.taluk}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400">Surveyor Credentials:</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedSurvey.surveyor.internName}
                  </p>
                  <p className="text-slate-500 font-mono">
                    {selectedSurvey.surveyor.internId}
                  </p>
                  <p className="text-slate-500">
                    {selectedSurvey.surveyor.department}
                  </p>
                  <p className="text-slate-500">
                    Supervisor: {selectedSurvey.surveyor.facultySupervisor}
                  </p>
                </div>
              </div>

              {/* 12-Sector Baseline Score Summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    12-Sector Environmental Baseline Score
                  </span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                    {selectedSurvey.sustainabilityScore?.overall || 65}/100 (
                    {selectedSurvey.sustainabilityScore?.tier || 'Silver'} Tier)
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                  {selectedSurvey.sustainabilityScore?.sectorScores &&
                    Object.entries(selectedSurvey.sustainabilityScore.sectorScores).map(
                      ([secId, score]) => (
                        <div
                          key={secId}
                          className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex justify-between"
                        >
                          <span className="text-slate-400">Sec {secId}:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {score}%
                          </span>
                        </div>
                      )
                    )}
                </div>
              </div>

              {/* Lab Samples & PIN Verification Strip */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl">
                <div>
                  <p className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PIN Authentication</span>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    Respondent confirmed survey with on-site 4-digit PIN. Legally validated under ECOPOLY terms.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Lab Test Samples</span>
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    {selectedSurvey.evidence?.soilSamples?.length || 0} Soil core sample(s) ·{' '}
                    {selectedSurvey.evidence?.waterSamples?.length || 0} Water quality sample(s)
                  </p>
                </div>
              </div>

              {/* Notes Input for Review */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Supervisor / Admin Verification Remarks
                </label>
                <textarea
                  rows={2}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="e.g. Master survey thoroughly verified. All 12 sectors verified with farmer."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleReviewAction(selectedSurvey.id, 'rejected')}
                  className="px-3 py-2 text-xs font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 rounded-lg hover:bg-rose-100 transition-colors"
                >
                  Reject Survey
                </button>

                <button
                  type="button"
                  onClick={() => handleReviewAction(selectedSurvey.id, 'returned')}
                  className="px-3 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  Return for Correction
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleReviewAction(selectedSurvey.id, 'approved')}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve Survey & Award 50 Green Credits</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
