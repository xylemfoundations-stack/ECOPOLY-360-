import React, { useState } from 'react';
import {
  CommunicationRecord,
  StudentIntern,
  StudentCandidate,
  Language,
  UserRole
} from '../../types/survey';
import {
  Mail,
  MessageSquare,
  Send,
  Copy,
  Check,
  Share2,
  Users,
  FileText,
  Clock,
  Sparkles,
  Phone,
  ShieldCheck
} from 'lucide-react';

interface CommunicationsSectionProps {
  communications: CommunicationRecord[];
  interns: StudentIntern[];
  candidates: StudentCandidate[];
  onLogCommunication: (
    record: Omit<CommunicationRecord, 'id' | 'sentAt'>
  ) => void;
  lang: Language;
  userRole: UserRole;
}

export const CommunicationsSection: React.FC<CommunicationsSectionProps> = ({
  communications,
  interns,
  candidates,
  onLogCommunication,
  lang,
  userRole
}) => {
  const [activeChannel, setActiveChannel] = useState<'email' | 'whatsapp'>('email');
  const [recipientGroup, setRecipientGroup] = useState<
    'all_interns' | 'specific_dept' | 'pending_onboarding' | 'supervisors' | 'custom'
  >('all_interns');
  const [selectedDept, setSelectedDept] = useState('Department of Environmental Studies');
  const [selectedTemplate, setSelectedTemplate] = useState('Weekly Survey Milestones Reminder');
  const [subject, setSubject] = useState('Weekly Field Survey Target & Green Credit Update');
  const [messageBody, setMessageBody] = useState(
    'Dear Student Interns,\n\nPlease review your village survey assignments for this week. Submit pending draft surveys by Friday 5:00 PM for verification and Green Credit settlement.\n\nBest regards,\nCampus Admin, Maruthu Pandiyar College'
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sentSuccessMsg, setSentSuccessMsg] = useState<string | null>(null);

  const templates = [
    {
      id: 'T1',
      name: 'Weekly Survey Milestones Reminder',
      channel: 'both',
      subject: 'Weekly Field Survey Target & Green Credit Update',
      body: `Dear Student Interns,

Please review your village survey assignments for this week. Remember that each approved 12-sector survey awards 50 Green Credits to your account.

Deadlines: Submit pending draft surveys by Friday 5:00 PM for faculty supervisor verification and credit settlement.

Best regards,
Dr. S. Meenakshi Sundaram
Campus Administrator, Maruthu Pandiyar College`
    },
    {
      id: 'T2',
      name: 'Field Safety, Ethics Code & Respondent Respect Advisory',
      channel: 'both',
      subject: 'Advisory: Field Survey Protocols & On-Site Conduct',
      body: `Dear ECOPOLY Field Surveyors,

Safety and ethical field conduct reminders:
1. Always obtain explicit verbal and digital consent before beginning the survey.
2. Authenticate respondent confirmation using their 4-digit PIN on-site.
3. Respect agrarian work hours; avoid interfering with active harvesting.
4. Wear your college identity card and carry survey credentials.

Faculty Supervisor Team, Maruthu Pandiyar College`
    },
    {
      id: 'T3',
      name: 'Intern Onboarding & 4-Digit Security PIN Notice',
      channel: 'both',
      subject: 'Welcome to ECOPOLY 360° Field Internship - Login Credentials',
      body: `Dear Student Intern,

Congratulations on being selected for the ECOPOLY 360° Field Survey Internship Programme at Maruthu Pandiyar College.

Your Surveyor Access Details:
- College: Maruthu Pandiyar College of Arts and Science
- Authenticated Surveyor PIN: 2026
- Surveyor Web Portal: https://ecopoly.life/survey

Please join the preparatory briefing session tomorrow at the Environmental Studies Seminar Hall.`
    },
    {
      id: 'T4',
      name: 'Weekly Campus Green Digest & Performance Report',
      channel: 'both',
      subject: 'ECOPOLY Weekly Campus Digest: Thanjavur District Field Impact',
      body: `*ECOPOLY 360° WEEKLY CAMPUS DIGEST* 🌾
Pilot Institution: Maruthu Pandiyar College of Arts and Science

Weekly Achievements:
- 12-Sector Surveys Completed: 8
- Native Trees Planted: 35 saplings along Vennar Canal
- Soil & Water Samples Tested: 14 samples
- Total Green Credits Confirmed: 215 Credits

Outstanding Intern of the Week: K. Vignesh (Department of Environmental Studies)

Keep up the tremendous grassroots sustainability leadership!`
    }
  ];

  const handleSelectTemplate = (templateName: string) => {
    setSelectedTemplate(templateName);
    const tmpl = templates.find((t) => t.name === templateName);
    if (tmpl) {
      setSubject(tmpl.subject);
      setMessageBody(tmpl.body);
    }
  };

  const getRecipientCount = (): number => {
    if (recipientGroup === 'all_interns') return interns.length;
    if (recipientGroup === 'pending_onboarding')
      return candidates.filter((c) => c.enrolmentStatus === 'candidate').length;
    if (recipientGroup === 'supervisors') return 4;
    if (recipientGroup === 'specific_dept')
      return interns.filter((i) => i.department === selectedDept).length;
    return 1;
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageBody.trim()) return;

    onLogCommunication({
      channel: activeChannel,
      recipientGroup,
      recipientsCount: getRecipientCount(),
      subject: activeChannel === 'email' ? subject : 'WhatsApp Broadcast Alert',
      content: messageBody.trim(),
      templateName: selectedTemplate,
      sentBy: 'Campus Admin (Dr. S. Meenakshi Sundaram)',
      status: 'delivered'
    });

    setSentSuccessMsg(
      activeChannel === 'email'
        ? `Email successfully dispatched to ${getRecipientCount()} recipients!`
        : `WhatsApp broadcast created for ${getRecipientCount()} recipients!`
    );
    setTimeout(() => setSentSuccessMsg(null), 4000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          {lang === 'ta' ? 'தகவல் தொடர்பு மையம்' : 'Integrated Campus Communication Centre'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Coordinate with student interns, faculty supervisors, and departments through formatted Emails and official WhatsApp broadcasts.
        </p>
      </div>

      {sentSuccessMsg && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-300 rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{sentSuccessMsg}</span>
        </div>
      )}

      {/* Two Column Workspace: Left Composer, Right Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Composer */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5">
          {/* Channel Tabs */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveChannel('email')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeChannel === 'email'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Center</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveChannel('whatsapp')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeChannel === 'whatsapp'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Broadcast</span>
              </button>
            </div>

            <span className="text-xs text-slate-500 font-mono">
              Target: {getRecipientCount()} recipients
            </span>
          </div>

          <form onSubmit={handleDispatch} className="space-y-4 text-xs">
            {/* Template Selector */}
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Select Pre-Approved Communication Template
              </label>
              <select
                value={selectedTemplate}
                onChange={(e) => handleSelectTemplate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Recipient Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Recipient Audience *
                </label>
                <select
                  value={recipientGroup}
                  onChange={(e) =>
                    setRecipientGroup(
                      e.target.value as
                        | 'all_interns'
                        | 'specific_dept'
                        | 'pending_onboarding'
                        | 'supervisors'
                        | 'custom'
                    )
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                >
                  <option value="all_interns">All Active Interns ({interns.length})</option>
                  <option value="specific_dept">By Department</option>
                  <option value="pending_onboarding">
                    Pending Onboarding Candidates ({candidates.filter((c) => c.enrolmentStatus === 'candidate').length})
                  </option>
                  <option value="supervisors">Faculty Supervisors (4)</option>
                </select>
              </div>

              {recipientGroup === 'specific_dept' && (
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Select Department
                  </label>
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Department of Environmental Studies">Environmental Studies</option>
                    <option value="Department of Environmental Biotechnology">Environmental Biotechnology</option>
                    <option value="Department of Agricultural Science">Agricultural Science</option>
                    <option value="Department of Botany">Botany</option>
                  </select>
                </div>
              )}
            </div>

            {/* Subject (for email) */}
            {activeChannel === 'email' && (
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email Subject Line *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            )}

            {/* Message Body */}
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                {activeChannel === 'email' ? 'Email Body' : 'WhatsApp Message (Markdown Supported)'} *
              </label>
              <textarea
                rows={7}
                required
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-xs leading-relaxed"
              />
              {activeChannel === 'whatsapp' && (
                <p className="text-[11px] text-slate-400 mt-1">
                  Use *bold* for bold text, _italics_ for italics, and bullet lines for lists.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => copyToClipboard(messageBody, 'body-copy')}
                className="py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium flex items-center gap-1.5 transition-colors"
              >
                {copiedId === 'body-copy' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied text!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                {activeChannel === 'whatsapp' && (
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(messageBody)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Open WhatsApp Web</span>
                  </a>
                )}

                <button
                  type="submit"
                  className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch & Log</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Broadcast Recipient Preview & Compliance Info */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Target Audience Roster ({getRecipientCount()})</span>
            </h3>

            <div className="space-y-2 max-h-52 overflow-y-auto pr-1 text-xs">
              {interns.map((i) => (
                <div
                  key={i.id}
                  className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{i.name}</p>
                    <p className="text-[11px] text-slate-500">{i.department.replace('Department of ', '')}</p>
                  </div>
                  <div className="text-right font-mono text-[11px] text-slate-600 dark:text-slate-400">
                    <p>{i.mobile}</p>
                    <p className="truncate max-w-[120px] text-slate-400">{i.email}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 rounded-lg text-[11px] text-emerald-800 dark:text-emerald-300 space-y-1">
              <p className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Strict Anti-Scraping & Consent Protocol</span>
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                All communications comply with ECOPOLY communication ethics. Broadcasts are dispatched exclusively via registered verified student email and opt-in WhatsApp deep links.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Communication Dispatch History Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs space-y-3 p-6">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
          Dispatch & Communication Logs ({communications.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <th className="py-2.5 px-3">Log ID / Channel</th>
                <th className="py-2.5 px-3">Subject & Template</th>
                <th className="py-2.5 px-3">Recipients</th>
                <th className="py-2.5 px-3">Dispatched By</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {communications.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1.5 font-medium">
                      {c.channel === 'email' ? (
                        <Mail className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      <span className="font-mono text-slate-900 dark:text-white capitalize">
                        {c.channel}
                      </span>
                    </div>
                  </td>

                  <td className="py-2.5 px-3">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white truncate max-w-xs">
                        {c.subject}
                      </p>
                      <p className="text-[11px] text-slate-400">{c.templateName}</p>
                    </div>
                  </td>

                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-mono">
                    {c.recipientsCount} recipients
                  </td>

                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    {c.sentBy}
                  </td>

                  <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                    {new Date(c.sentAt).toLocaleString()}
                  </td>

                  <td className="py-2.5 px-3 text-right">
                    <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded capitalize">
                      {c.status}
                    </span>
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
