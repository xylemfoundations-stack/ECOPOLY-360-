import React, { useState } from 'react';
import { StudentIntern, Language } from '../types/survey';
import {
  UserPlus,
  KeyRound,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  Shield,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface InternManagementProps {
  interns: StudentIntern[];
  onSaveIntern: (intern: StudentIntern) => void;
  onDeleteIntern: (id: string) => void;
  onSelectActiveIntern: (id: string) => void;
  activeInternId: string;
  lang: Language;
}

export const InternManagement: React.FC<InternManagementProps> = ({
  interns,
  onSaveIntern,
  onDeleteIntern,
  onSelectActiveIntern,
  activeInternId,
  lang
}) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form states for inviting new intern
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [department, setDepartment] = useState('Department of Environmental Studies');
  const [college, setCollege] = useState('Maruthu Pandiyar College of Arts and Science');
  const [supervisor, setSupervisor] = useState('Dr. S. Meenakshi Sundaram');
  const [pin, setPin] = useState(String(Math.floor(1000 + Math.random() * 9000)));

  const handleGeneratePin = () => {
    setPin(String(Math.floor(1000 + Math.random() * 9000)));
  };

  const handleCreateInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const nextIndex = interns.length + 1;
    const internId = `MPCAS-2026-ENV${nextIndex < 10 ? '0' + nextIndex : nextIndex}`;

    const newIntern: StudentIntern = {
      id: internId,
      studentId: `MPCAS-2026-STU${nextIndex + 100}`,
      institutionId: 'ECO-INST-0001',
      campusId: 'ECO-CAMP-0001',
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}.env@mpcas.edu.in`,
      mobile: mobile.trim() || '9842000000',
      college: college.trim(),
      department: department.trim(),
      academicYear: 'III Year',
      joiningDate: new Date().toISOString().slice(0, 10),
      pin: pin.trim(),
      status: 'Invited',
      invitedAt: new Date().toISOString(),
      invitedBy: 'Admin (Dr. S. Meenakshi Sundaram)',
      assignedSupervisor: supervisor.trim(),
      totalSurveys: 0
    };

    onSaveIntern(newIntern);
    setShowInviteModal(false);

    // Reset form
    setName('');
    setEmail('');
    setMobile('');
    handleGeneratePin();
  };

  const handleCopyInvite = (intern: StudentIntern) => {
    const inviteText = `ECOPOLY 360° Field Survey Onboarding:
Hello ${intern.name}, you have been invited by Admin as a student intern for Maruthu Pandiyar College of Arts and Science.
Your Intern ID: ${intern.id}
Your 4-Digit Access PIN: ${intern.pin}
Supervisor: ${intern.assignedSupervisor}
Platform: ECOPOLY.LIFE`;

    navigator.clipboard.writeText(inviteText);
    setCopiedId(intern.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header with Invite Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'ta'
                ? 'மாணவர் கள ஆய்வாளர்கள் மேலாண்மை & அழைப்புகள்'
                : 'Student Interns Onboarding & Administration'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {lang === 'ta'
              ? 'நிர்வாகியிடமிருந்து அழைப்பு மூலம் மாணவர்கள் பதிவு செய்யப்படுகின்றனர். கையொப்பம் தேவையில்லை, 4-இலக்க PIN எண் மட்டுமே போதுமானது.'
              : 'Admin onboards interns via direct invitation with a 4-digit security PIN. No signatures required.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowInviteModal(true)}
          className="min-h-[44px] px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>{lang === 'ta' ? 'புதிய மாணவரை அழைத்திடுக' : 'Invite Student Intern'}</span>
        </button>
      </div>

      {/* Interns List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interns.map((intern) => {
          const isActiveSelected = intern.id === activeInternId;
          const isInvited = intern.status === 'Invited' || (intern.status as any) === 'invited';

          return (
            <div
              key={intern.id}
              className={`p-4 rounded-2xl border transition-all space-y-3 bg-white dark:bg-slate-900 ${
                isActiveSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                    {intern.id}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {intern.name}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      isInvited
                        ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    }`}
                  >
                    {isInvited ? (lang === 'ta' ? 'அழைப்பு அனுப்பப்பட்டது' : 'Invited') : (lang === 'ta' ? 'செயலில் உள்ளது' : 'Active')}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <p className="flex items-center gap-1.5 truncate">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{intern.department}</span>
                </p>
                <p className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{intern.email}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{intern.mobile}</span>
                </p>
              </div>

              {/* PIN Code Box */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {lang === 'ta' ? 'அங்கீகார PIN:' : 'Security PIN:'}
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-900 dark:text-white tracking-widest ml-1 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                    {intern.pin}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyInvite(intern)}
                  className="text-xs font-semibold text-slate-600 hover:text-emerald-600 dark:text-slate-300 flex items-center gap-1 p-1"
                  title="Copy Invitation Details"
                >
                  {copiedId === intern.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-slate-400 text-[11px]">
                  {intern.totalSurveys || 0} {lang === 'ta' ? 'ஆய்வுகள்' : 'surveys done'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectActiveIntern(intern.id)}
                    className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-colors ${
                      isActiveSelected
                        ? 'bg-emerald-600 text-white'
                        : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {isActiveSelected
                      ? (lang === 'ta' ? 'செயலில் உள்ள ஆய்வாளர் ✓' : 'Current Active')
                      : (lang === 'ta' ? 'தேர்வு செய்க' : 'Set as Active')}
                  </button>

                  {interns.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onDeleteIntern(intern.id)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                      title="Remove Intern"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invite Intern Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {lang === 'ta' ? 'புதிய மாணவர் ஆய்வாளரை அழைத்திடுக' : 'Invite Student Field Intern'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInvitation} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ta' ? 'மாணவர் பெயர்' : 'Student Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. S. Karthikeyan"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ta' ? 'மின்னஞ்சல்' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="karthik@mpcas.edu.in"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ta' ? 'அலைபேசி எண்' : 'Mobile Number'}
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="9842100000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ta' ? 'துறை' : 'Department'}
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Department of Environmental Studies">Environmental Studies</option>
                    <option value="Department of Environmental Biotechnology">Environmental Biotechnology</option>
                    <option value="Department of Agricultural Science">Agricultural Science</option>
                    <option value="Department of Botany">Botany</option>
                    <option value="Department of Zoology">Zoology</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ta' ? 'வழிகாட்டி ஆசிரியர்' : 'Supervisor'}
                  </label>
                  <input
                    type="text"
                    value={supervisor}
                    onChange={(e) => setSupervisor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* 4-digit PIN assignment */}
              <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {lang === 'ta' ? '4-இலக்க பாதுகாப்பு PIN எண்' : 'Assigned 4-Digit Security PIN'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {lang === 'ta'
                        ? 'மாணவர் கையொப்பத்திற்கு பதிலாக இந்த PIN-ஐ பயன்படுத்துவார்'
                        : 'Intern uses this PIN for survey submission authentication (no signature required)'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleGeneratePin}
                    className="text-xs text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>{lang === 'ta' ? 'புதிய எண்' : 'Regenerate'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="w-32 font-mono text-center text-lg font-bold tracking-[0.4em] px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <span className="text-[11px] text-slate-500">
                    {lang === 'ta' ? '(தானியங்கு 4-இலக்க குறியீடு)' : '(Secure 4 digits)'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {lang === 'ta' ? 'ரத்து செய்' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                >
                  {lang === 'ta' ? 'அழைப்பை உருவாக்கு & PIN ஒதுக்கு' : 'Issue Invitation & Assign PIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
