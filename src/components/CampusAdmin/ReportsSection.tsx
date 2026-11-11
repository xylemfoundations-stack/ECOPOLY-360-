import React, { useState } from 'react';
import {
  SurveyRecord,
  StudentIntern,
  StudentCandidate,
  InternAssignment,
  InternPost,
  GreenCreditTransaction,
  Language,
  UserRole
} from '../../types/survey';
import {
  Download,
  Printer,
  BarChart3,
  Award,
  Users,
  FileText,
  Filter,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { exportSurveysToCSV } from '../../services/storage';

interface ReportsSectionProps {
  surveys: SurveyRecord[];
  interns: StudentIntern[];
  candidates: StudentCandidate[];
  assignments: InternAssignment[];
  posts: InternPost[];
  greenCredits: GreenCreditTransaction[];
  lang: Language;
  userRole: UserRole;
}

export const ReportsSection: React.FC<ReportsSectionProps> = ({
  surveys,
  interns,
  candidates,
  assignments,
  posts,
  greenCredits,
  lang
}) => {
  const [activeReportTab, setActiveReportTab] = useState<
    'performance' | 'departments' | 'sectors' | 'credits' | 'onboarding'
  >('performance');

  // Compute intern scorecards
  const internScorecards = interns.map((intern) => {
    const internSurveys = surveys.filter((s) => s.surveyor.internId === intern.id);
    const approvedSurveys = internSurveys.filter(
      (s) => s.approvalStatus === 'approved' || s.status === 'reviewed'
    );
    const internPosts = posts.filter((p) => p.authorInternId === intern.id);
    const approvedPosts = internPosts.filter((p) => p.status === 'approved');
    const credits = greenCredits
      .filter((g) => g.internId === intern.id && g.status === 'confirmed')
      .reduce((sum, g) => sum + g.credits, 0);

    return {
      intern,
      totalSurveys: internSurveys.length,
      approvedSurveys: approvedSurveys.length,
      totalPosts: internPosts.length,
      approvedPosts: approvedPosts.length,
      greenCredits: credits
    };
  });

  // Department Breakdown
  const deptStats = [
    {
      name: 'Department of Environmental Studies',
      students: candidates.filter((c) => c.department.includes('Environmental Studies')).length,
      activeInterns: interns.filter((i) => i.department.includes('Environmental Studies')).length,
      surveys: surveys.filter((s) => s.surveyor.department.includes('Environmental Studies')).length,
      greenCredits: 115
    },
    {
      name: 'Department of Environmental Biotechnology',
      students: candidates.filter((c) => c.department.includes('Biotechnology')).length,
      activeInterns: interns.filter((i) => i.department.includes('Biotechnology')).length,
      surveys: surveys.filter((s) => s.surveyor.department.includes('Biotechnology')).length,
      greenCredits: 65
    },
    {
      name: 'Department of Agricultural Science',
      students: candidates.filter((c) => c.department.includes('Agricultural')).length,
      activeInterns: interns.filter((i) => i.department.includes('Agricultural')).length,
      surveys: surveys.filter((s) => s.surveyor.department.includes('Agricultural')).length,
      greenCredits: 35
    },
    {
      name: 'Department of Botany & Chemistry',
      students: candidates.filter((c) => c.department.includes('Botany') || c.department.includes('Chemistry')).length,
      activeInterns: interns.filter((i) => i.department.includes('Botany') || i.department.includes('Chemistry')).length,
      surveys: 1,
      greenCredits: 0
    }
  ];

  // 12 Sectors Aggregated Baselines
  const sectorBaselines = [
    { num: '01', name: 'Ambient Air Quality & Microclimate', avg: 72 },
    { num: '02', name: 'Water Resources & Catchment Health', avg: 68 },
    { num: '03', name: 'Solid Waste Management & Circularity', avg: 59 },
    { num: '04', name: 'Forests, Biodiversity & Agroforestry', avg: 81 },
    { num: '05', name: 'Wildlife & Animal Welfare', avg: 74 },
    { num: '06', name: 'Agriculture & Soil Health', avg: 76 },
    { num: '07', name: 'Clean Energy & Decarbonisation', avg: 62 },
    { num: '08', name: 'Built Environment & Eco-Settlements', avg: 65 },
    { num: '09', name: 'Industrial & Occupational Ecology', avg: 54 },
    { num: '10', name: 'Coastal, Marine & Wetland Health', avg: 70 },
    { num: '11', name: 'Community, Gender & Tribal Inclusion', avg: 85 },
    { num: '12', name: 'Climate Resilience & Governance', avg: 66 }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    exportSurveysToCSV(surveys);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {lang === 'ta' ? 'அறிக்கைகள் & பகுப்பாய்வு மையம்' : 'Reports & Analytical Scorecards'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Consolidated reports for student performance, 12-sector environmental baseline scores, and Green Credit distribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Download CSV Registry</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report View</span>
          </button>
        </div>
      </div>

      {/* Sub-Report Navigation */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit text-xs overflow-x-auto">
        {[
          { id: 'performance', label: 'Intern Performance Scorecard' },
          { id: 'departments', label: 'Department Participation' },
          { id: 'sectors', label: '12-Sector District Baselines' },
          { id: 'credits', label: 'Green Credits Ledger' },
          { id: 'onboarding', label: 'Onboarding & Enrolment' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveReportTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
              activeReportTab === tab.id
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* REPORT 1: INTERN PERFORMANCE SCORECARD */}
      {activeReportTab === 'performance' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs space-y-3 p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Student Intern Performance & Output Scorecard</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Academic Term 2026-27 · Maruthu Pandiyar College
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 px-3">Intern ID / Name</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Supervisor</th>
                  <th className="py-2.5 px-3 text-center">Surveys (Total / Approved)</th>
                  <th className="py-2.5 px-3 text-center">Field Posts (Total / Approved)</th>
                  <th className="py-2.5 px-3 text-right">Confirmed Green Credits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {internScorecards.map((sc) => (
                  <tr key={sc.intern.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 px-3">
                      <p className="font-bold text-slate-900 dark:text-white">{sc.intern.name}</p>
                      <p className="font-mono text-[11px] text-slate-500">{sc.intern.id}</p>
                    </td>

                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                      {sc.intern.department.replace('Department of ', '')}
                    </td>

                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                      {sc.intern.assignedSupervisor}
                    </td>

                    <td className="py-2.5 px-3 text-center font-mono tabular-nums">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {sc.totalSurveys}
                      </span>{' '}
                      <span className="text-slate-400">/ {sc.approvedSurveys}</span>
                    </td>

                    <td className="py-2.5 px-3 text-center font-mono tabular-nums">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {sc.totalPosts}
                      </span>{' '}
                      <span className="text-slate-400">/ {sc.approvedPosts}</span>
                    </td>

                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                      {sc.greenCredits} Credits
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT 2: DEPARTMENT PARTICIPATION */}
      {activeReportTab === 'departments' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs space-y-4 p-6">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Department-Wise Sustainability Participation & Coverage</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deptStats.map((dept, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {dept.name}
                  </h4>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {dept.greenCredits} GC
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-200 dark:border-slate-700 font-mono">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded">
                    <span className="text-slate-400 text-[10px] block">Students</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                      {dept.students}
                    </span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-800 rounded">
                    <span className="text-slate-400 text-[10px] block">Interns</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                      {dept.activeInterns}
                    </span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-800 rounded">
                    <span className="text-slate-400 text-[10px] block">Surveys</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                      {dept.surveys}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REPORT 3: 12-SECTOR DISTRICT BASELINES */}
      {activeReportTab === 'sectors' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs space-y-4 p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span>12 ECOPOLY Sectors: Thanjavur District Environmental Baseline</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Aggregate District Average: 69.8 / 100
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {sectorBaselines.map((sec) => (
              <div
                key={sec.num}
                className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-2 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-500">Sector {sec.num}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {sec.avg} / 100
                  </span>
                </div>
                <p className="font-medium text-slate-800 dark:text-slate-200 truncate">
                  {sec.name}
                </p>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      sec.avg >= 75
                        ? 'bg-emerald-600'
                        : sec.avg >= 60
                        ? 'bg-blue-600'
                        : 'bg-amber-600'
                    }`}
                    style={{ width: `${sec.avg}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REPORT 4: GREEN CREDITS LEDGER */}
      {activeReportTab === 'credits' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs space-y-4 p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Official Green Credit Issuance & Transaction Ledger</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Total Confirmed: {greenCredits.reduce((sum, g) => sum + g.credits, 0)} Credits
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 px-3">Transaction ID</th>
                  <th className="py-2.5 px-3">Intern Surveyor</th>
                  <th className="py-2.5 px-3">Activity Source</th>
                  <th className="py-2.5 px-3">Reference ID & Notes</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3 text-right">Credits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {greenCredits.map((gc) => (
                  <tr key={gc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-mono text-slate-500">{gc.id}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                      {gc.internName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400 capitalize">
                      {gc.sourceType.replace('_', ' ')}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                      {gc.notes}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">
                      {new Date(gc.issuedAt).toLocaleDateString()}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      +{gc.credits} GC
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT 5: ONBOARDING & ENROLMENT */}
      {activeReportTab === 'onboarding' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs space-y-4 p-6">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Campus Enrolment & Intern Verification Funnel</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-center">
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-slate-400 text-xs">Total College Enrolled</span>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {candidates.length}
              </p>
              <span className="text-[11px] text-slate-500">Students in directory</span>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 space-y-1">
              <span className="text-emerald-700 dark:text-emerald-400 text-xs">
                Active Authenticated Interns
              </span>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                {interns.length}
              </p>
              <span className="text-[11px] text-emerald-600">With 4-digit surveyor PIN</span>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 space-y-1">
              <span className="text-amber-700 dark:text-amber-400 text-xs">
                Pending Onboarding
              </span>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                {candidates.filter((c) => c.enrolmentStatus === 'candidate').length}
              </p>
              <span className="text-[11px] text-amber-600">Awaiting supervisor assignment</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
