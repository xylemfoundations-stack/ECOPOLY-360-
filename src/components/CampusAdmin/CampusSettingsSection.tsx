import React, { useState } from 'react';
import {
  CampusSettings,
  Language,
  UserRole
} from '../../types/survey';
import {
  Settings,
  Building,
  Calendar,
  Award,
  Shield,
  Save,
  Check,
  Eye,
  Copy
} from 'lucide-react';

interface CampusSettingsSectionProps {
  settings: CampusSettings;
  onSaveSettings: (settings: CampusSettings) => void;
  lang: Language;
  userRole: UserRole;
}

export const CampusSettingsSection: React.FC<CampusSettingsSectionProps> = ({
  settings,
  onSaveSettings,
  lang,
  userRole
}) => {
  const [formData, setFormData] = useState<CampusSettings>(settings);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [copiedDigest, setCopiedDigest] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const sampleDigestPreview = `*ECOPOLY 360° WEEKLY CAMPUS DIGEST*
Institution: ${formData.collegeName} (${formData.campusCode})
Schedule: Every ${formData.weeklyDigestDay} at ${formData.weeklyDigestTime}

Weekly Highlights:
- Active Field Interns: 3
- Approved 12-Sector Baseline Surveys: 3 (+150 Green Credits)
- Field Projects: Tree plantation, vermicomposting pit, water testing
- Top Contributor: K. Vignesh (Department of Environmental Studies)

Authorized by Campus Admin: ${formData.adminName}`;

  const copyDigest = () => {
    navigator.clipboard.writeText(sampleDigestPreview);
    setCopiedDigest(true);
    setTimeout(() => setCopiedDigest(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          {lang === 'ta' ? 'வளாக கட்டமைப்பு & அமைப்புகள்' : 'Campus Programme Configuration & Settings'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure institutional parameters, Green Credit issuance rates, automated weekly digest distribution, and quality policies.
        </p>
      </div>

      {saveSuccessMsg && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-300 rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Campus settings successfully updated and saved to storage.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card 1: College & Campus Admin Identification */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-600" />
            <span>Pilot College & Administrator Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                College / Institution Name *
              </label>
              <input
                type="text"
                required
                value={formData.collegeName}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Campus Code *
              </label>
              <input
                type="text"
                required
                value={formData.campusCode}
                onChange={(e) => setFormData({ ...formData, campusCode: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                District / Region
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Campus Administrator Name *
              </label>
              <input
                type="text"
                required
                value={formData.adminName}
                onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Admin Official Email
              </label>
              <input
                type="email"
                value={formData.adminEmail}
                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Admin Phone / WhatsApp
              </label>
              <input
                type="tel"
                value={formData.adminPhone}
                onChange={(e) => setFormData({ ...formData, adminPhone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Green Credit Integration & Policies */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Green Credit Parameters & Approval Protocol</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Credits per Approved Survey (12 Sectors)
              </label>
              <input
                type="number"
                min={10}
                max={200}
                value={formData.creditsPerSurvey}
                onChange={(e) =>
                  setFormData({ ...formData, creditsPerSurvey: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Awarded upon full approval of respondent baseline and lab samples.
              </p>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Credits per Approved Field Post
              </label>
              <input
                type="number"
                min={5}
                max={50}
                value={formData.creditsPerPost}
                onChange={(e) =>
                  setFormData({ ...formData, creditsPerPost: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Awarded for verified tree planting, waste, soil, or water activities.
              </p>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Max Active Drafts per Intern
              </label>
              <input
                type="number"
                min={1}
                max={15}
                value={formData.activeSurveysAllowedPerIntern}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    activeSurveysAllowedPerIntern: Number(e.target.value)
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Prevents intern over-commitment before submitting completed stages.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.supervisorReviewRequired}
                onChange={(e) =>
                  setFormData({ ...formData, supervisorReviewRequired: e.target.checked })
                }
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-medium text-slate-800 dark:text-slate-200">
                Require Faculty Supervisor recommendation before Campus Admin final sign-off
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.autoRemindOverdue}
                onChange={(e) =>
                  setFormData({ ...formData, autoRemindOverdue: e.target.checked })
                }
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="font-medium text-slate-800 dark:text-slate-200">
                Automatically generate WhatsApp reminders for assignments approaching deadline
              </span>
            </label>
          </div>
        </div>

        {/* Card 3: Weekly Campus Digest Schedule & Preview */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Weekly Campus Digest Distribution</span>
            </h3>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded font-medium">
              Automated Digest Engine
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Distribution Day
              </label>
              <select
                value={formData.weeklyDigestDay}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    weeklyDigestDay: e.target.value as any
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Scheduled Dispatch Time (IST)
              </label>
              <input
                type="time"
                value={formData.weeklyDigestTime}
                onChange={(e) => setFormData({ ...formData, weeklyDigestTime: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.autoDigestEnabled}
                  onChange={(e) =>
                    setFormData({ ...formData, autoDigestEnabled: e.target.checked })
                  }
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  Enable Automated Weekly Dispatch
                </span>
              </label>
            </div>
          </div>

          {/* Digest Preview Box */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Formatted Digest Preview (Email & WhatsApp Ready)
              </span>
              <button
                type="button"
                onClick={copyDigest}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1"
              >
                {copiedDigest ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedDigest ? 'Copied' : 'Copy Preview Text'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed border border-slate-200 dark:border-slate-700">
              {sampleDigestPreview}
            </pre>
          </div>
        </div>

        {/* Card 4: Access Control & Role Permission Matrix */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Role-Based Access Control (RBAC) Governance Matrix</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Entity Scope</th>
                  <th className="py-2.5 px-3">Core Permissions & Responsibilities</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                <tr>
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                    Super Admin
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    Xylem Foundations (Multi-Campus)
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    Create/manage campuses, manage sector question banks, configure platform Green Credit rates, consolidated reports.
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                    Campus Admin
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    Maruthu Pandiyar College
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    Complete institutional administration: intern onboarding, directory, assignments, post moderation, survey approvals, weekly digest.
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                    Faculty Supervisor
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    Assigned Cohort / Department
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    Monitor assigned interns, review field activities, recommend survey approval, return items for correction.
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                    Student Intern
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    Individual Surveyor Profile
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    Conduct on-site 12-sector surveys, submit field activity posts, verify respondent PIN, view confirmed Green Credits.
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                    Respondent
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    Field Participant
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                    Provide field responses, consent to GPS/samples, authenticate submission via 4-digit PIN (no account required).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-2 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Campus Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
