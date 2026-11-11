import React from 'react';
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
  Users,
  CheckCircle2,
  Clock,
  Award,
  FileText,
  Camera,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface OverviewSectionProps {
  surveys: SurveyRecord[];
  interns: StudentIntern[];
  candidates: StudentCandidate[];
  assignments: InternAssignment[];
  posts: InternPost[];
  greenCredits: GreenCreditTransaction[];
  lang: Language;
  userRole: UserRole;
  onNavigateSection: (sectionId: string) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  surveys,
  interns,
  candidates,
  assignments,
  posts,
  greenCredits,
  lang,
  onNavigateSection
}) => {
  // Compute live metrics
  const totalStudents = candidates.length;
  const activeInterns = interns.filter((i) => i.status === 'Active' || (i.status as any) === 'active').length;
  const pendingOnboarding = candidates.filter((c) => c.enrolmentStatus === 'candidate').length;
  const uniqueSupervisors = Array.from(
    new Set(interns.map((i) => i.assignedSupervisor).filter(Boolean))
  ).length || 2;

  const totalSurveys = surveys.length;
  const draftSurveys = surveys.filter((s) => s.status === 'draft').length;
  const submittedSurveys = surveys.filter(
    (s) => s.status === 'submitted' || (!s.approvalStatus && s.status !== 'draft')
  ).length;
  const approvedSurveys = surveys.filter(
    (s) => s.approvalStatus === 'approved' || s.status === 'reviewed'
  ).length;

  const totalPosts = posts.length;
  const pendingPosts = posts.filter((p) => p.status === 'under_review').length;
  const approvedPosts = posts.filter((p) => p.status === 'approved').length;

  const totalPropertiesMapped = surveys.reduce(
    (sum, s) => sum + (s.properties?.length || 1),
    0
  );
  const totalSamples = surveys.reduce(
    (sum, s) =>
      sum +
      (s.evidence?.soilSamples?.length || 0) +
      (s.evidence?.waterSamples?.length || 0),
    0
  );

  const confirmedCredits = greenCredits
    .filter((g) => g.status === 'confirmed')
    .reduce((sum, g) => sum + g.credits, 0);

  const pendingCredits = greenCredits
    .filter((g) => g.status === 'pending')
    .reduce((sum, g) => sum + g.credits, 0);

  const averageScore =
    surveys.length > 0
      ? Math.round(
          surveys.reduce(
            (sum, s) => sum + (s.sustainabilityScore?.overall || 65),
            0
          ) / surveys.length
        )
      : 72;

  return (
    <div className="space-y-8">
      {/* Pilot Institution & Executive Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <span>Maruthu Pandiyar College of Arts and Science</span>
              <span aria-hidden="true">·</span>
              <span>Thanjavur, Tamil Nadu</span>
              <span aria-hidden="true">·</span>
              <span>Pilot Field Internship Programme</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {lang === 'ta'
                ? 'கள ஆய்வு மேலாண்மை கட்டுப்பாட்டு அறை'
                : 'Campus Field Operations & Intern Dashboard'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {lang === 'ta'
                ? 'மாணவர் களப்பணி, 12 துறை நிலைத்தன்மை கணக்கெடுப்பு, சரிபார்ப்பு மற்றும் பசுமை வரவு மேலாண்மை.'
                : 'Live campus monitoring for student intern onboarding, village field assessments, post moderation, and Green Credit settlements.'}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateSection('onboarding')}
              className="px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors whitespace-nowrap"
            >
              + {lang === 'ta' ? 'புதிய பயிற்சியாளர்' : 'Onboard Intern'}
            </button>
            <button
              onClick={() => onNavigateSection('surveys')}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap"
            >
              {lang === 'ta' ? 'ஆய்வுகளை சரிபார்க்கவும்' : 'Review Surveys'} ({submittedSurveys})
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid (High Density Tabular Numerals) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">
              {lang === 'ta' ? 'செயலில் உள்ள பயிற்சியாளர்கள்' : 'Active Interns'}
            </span>
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            {activeInterns}
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
            <span>{totalStudents} enrolled</span>
            <span aria-hidden="true">·</span>
            <span>{pendingOnboarding} pending</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">
              {lang === 'ta' ? '12-துறை ஆய்வுகள்' : 'Field Surveys'}
            </span>
            <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            {totalSurveys}
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
            <span>{approvedSurveys} approved</span>
            <span aria-hidden="true">·</span>
            <span>{draftSurveys} drafts</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">
              {lang === 'ta' ? 'கள பதிவுகள்' : 'Field Activity Posts'}
            </span>
            <Camera className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            {totalPosts}
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
            <span>{approvedPosts} approved</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-600 dark:text-amber-400 font-medium">
              {pendingPosts} in queue
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-medium">
              {lang === 'ta' ? 'பசுமை வரவு இருப்பு' : 'Green Credits'}
            </span>
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
            {confirmedCredits}
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1">
            <span>Confirmed</span>
            <span aria-hidden="true">·</span>
            <span>+{pendingCredits} pending</span>
          </div>
        </div>
      </div>

      {/* Two Column Detailed Operational Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Department & Assignment Readiness */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {lang === 'ta' ? 'துறை வாரியான பங்கேற்பு' : 'Department Participation & Field Tasks'}
            </h3>
            <button
              onClick={() => onNavigateSection('assignments')}
              className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>{lang === 'ta' ? 'பணிகள்' : 'View Assignments'}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                dept: 'Department of Environmental Studies',
                interns: 3,
                surveys: 4,
                villages: 'Ammapettai, Vallam'
              },
              {
                dept: 'Department of Environmental Biotechnology',
                interns: 2,
                surveys: 3,
                villages: 'Kallaperambur, Vennar'
              },
              {
                dept: 'Department of Agricultural Science',
                interns: 2,
                surveys: 2,
                villages: 'Papanasam Delta'
              },
              {
                dept: 'Department of Botany & Chemistry',
                interns: 1,
                surveys: 1,
                villages: 'Thanjavur Periphery'
              }
            ].map((d, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{d.dept}</p>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    Target Areas: {d.villages}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono font-semibold text-slate-900 dark:text-white">
                    {d.surveys} Surveys
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">
                    {d.interns} Interns active
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Faculty Supervisors Assigned: {uniqueSupervisors}</span>
            <span>Total Properties Registered: {totalPropertiesMapped}</span>
          </div>
        </div>

        {/* Right: Environmental Baseline & Lab Samples */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {lang === 'ta' ? 'சுற்றுச்சூழல் ஆய்வு நிலை' : 'Environmental Assessment Baseline'}
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Avg Score: {averageScore}/100
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-1">
              <span className="text-slate-500 dark:text-slate-400">Soil Samples</span>
              <p className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                {surveys.reduce((sum, s) => sum + (s.evidence?.soilSamples?.length || 0), 0)}
              </p>
              <span className="text-slate-400">Core depth & texture</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-1">
              <span className="text-slate-500 dark:text-slate-400">Water Samples</span>
              <p className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                {surveys.reduce((sum, s) => sum + (s.evidence?.waterSamples?.length || 0), 0)}
              </p>
              <span className="text-slate-400">pH, TDS & Turbidity</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-1">
              <span className="text-slate-500 dark:text-slate-400">Active Assignments</span>
              <p className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                {assignments.filter((a) => a.status === 'in_progress').length}
              </p>
              <span className="text-slate-400">Village surveys in progress</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-1">
              <span className="text-slate-500 dark:text-slate-400">Photo Evidence</span>
              <p className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                {surveys.reduce(
                  (sum, s) =>
                    sum +
                    (s.evidence?.documents?.length || 0) +
                    s.properties.reduce((pSum, p) => pSum + (p.photos?.length || 0), 0),
                  0
                )}
              </p>
              <span className="text-slate-400">Geo-tagged records</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-lg space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Campus Survey Protocol Standard</span>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
              Every master survey captures all 12 ECOPOLY sectors with 25 indicators each. Respondent confirmation uses authenticated 4-digit PIN protocol for tamper-free field validation.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          {
            id: 'students',
            label: 'Student Directory',
            sub: `${totalStudents} Registered`,
            icon: Users
          },
          {
            id: 'onboarding',
            label: 'Intern Onboarding',
            sub: `${pendingOnboarding} Pending`,
            icon: CheckCircle2
          },
          {
            id: 'assignments',
            label: 'Field Assignments',
            sub: `${assignments.length} Targets`,
            icon: Calendar
          },
          {
            id: 'moderation',
            label: 'Post Moderation',
            sub: `${pendingPosts} Under Review`,
            icon: Camera
          },
          {
            id: 'surveys',
            label: 'Survey Approvals',
            sub: `${submittedSurveys} In Queue`,
            icon: FileText
          },
          {
            id: 'communications',
            label: 'WhatsApp & Email',
            sub: 'Communication Centre',
            icon: Layers
          }
        ].map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigateSection(item.id)}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all text-left space-y-1.5 group cursor-pointer"
            >
              <IconComponent className="w-4 h-4 text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
              <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {item.label}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.sub}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
