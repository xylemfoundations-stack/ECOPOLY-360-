import React, { useState } from 'react';
import { Language, UserRole } from '../../types/survey';
import {
  Upload,
  FileSpreadsheet,
  Download,
  Database,
  CheckCircle2,
  AlertTriangle,
  X,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { importStudentsFromCSV, syncStudentsFromPortal } from '../../services/storage';

interface StudentImportModalProps {
  onClose: () => void;
  onSuccess: () => void;
  lang: Language;
  userRole: UserRole;
}

export const StudentImportModal: React.FC<StudentImportModalProps> = ({
  onClose,
  onSuccess,
  lang,
  userRole
}) => {
  const [activeTab, setActiveTab] = useState<'csv' | 'portal'>('csv');
  const [csvContent, setCsvContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultMessage, setResultMessage] = useState<{
    type: 'success' | 'error';
    text: string;
    details?: string[];
  } | null>(null);

  const sampleCsvData = `Student ID,Full Name,Email,Mobile,Department,Academic Year
MPCAS-2026-STU112,M. Gunasekaran,guna.env@mpcas.edu.in,9842199887,Department of Environmental Studies,II Year
MPCAS-2026-STU113,S. Jayashree,jaya.biotech@mpcas.edu.in,9443299881,Department of Environmental Biotechnology,III Year
MPCAS-2026-STU114,K. Vijayakumar,vijay.agri@mpcas.edu.in,9789099882,Department of Agricultural Science,I Year`;

  const handleDownloadSample = () => {
    const blob = new Blob([sampleCsvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ECOPOLY_Student_Import_Template.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCsvContent(text);
      };
      reader.readAsText(file);
    }
  };

  const handleCsvImport = () => {
    if (!csvContent.trim()) {
      setResultMessage({
        type: 'error',
        text: 'Please select a CSV file or paste CSV content before importing.'
      });
      return;
    }

    setIsProcessing(true);
    try {
      const actorName =
        userRole === 'campus_admin'
          ? 'Dr. S. Meenakshi Sundaram (Campus Admin)'
          : 'Super Admin (Xylem Foundations)';
      const res = importStudentsFromCSV(csvContent, userRole, actorName);

      if (res.errors.length > 0) {
        setResultMessage({
          type: 'error',
          text: res.errors.join(' ')
        });
      } else {
        setResultMessage({
          type: 'success',
          text: `Successfully imported ${res.importedCount} student candidates! Skipped ${res.skippedDuplicates} duplicate records to guarantee no duplicate accounts.`,
          details: res.duplicateDetails
        });
        onSuccess();
      }
    } catch (err: any) {
      setResultMessage({
        type: 'error',
        text: err.message || 'CSV Import failed.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePortalSync = () => {
    setIsProcessing(true);
    try {
      const actorName =
        userRole === 'campus_admin'
          ? 'Dr. S. Meenakshi Sundaram (Campus Admin)'
          : 'Super Admin (Xylem Foundations)';
      const res = syncStudentsFromPortal(userRole, actorName);

      setResultMessage({
        type: 'success',
        text: `Connected to ECOPOLY Students Portal API. Ingested ${res.importedCount} new candidates. Skipped ${res.existingCount} already enrolled students (duplicate protection active).`
      });
      onSuccess();
    } catch (err: any) {
      setResultMessage({
        type: 'error',
        text: err.message || 'Portal API sync failed.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Student Database Ingestion & Portal Sync
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Import students from the official college roster without creating duplicate accounts.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
          <button
            onClick={() => {
              setActiveTab('csv');
              setResultMessage(null);
            }}
            className={`flex-1 py-1.5 font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'csv'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Authorised CSV Import</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('portal');
              setResultMessage(null);
            }}
            className={`flex-1 py-1.5 font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'portal'
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>ECOPOLY Portal API Sync</span>
          </button>
        </div>

        {/* Result Message */}
        {resultMessage && (
          <div
            className={`p-3 rounded-lg text-xs space-y-1 ${
              resultMessage.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {resultMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{resultMessage.text}</span>
            </div>
            {resultMessage.details && resultMessage.details.length > 0 && (
              <div className="pl-6 pt-1 text-[11px] space-y-0.5 opacity-90">
                <p className="font-bold">Duplicate Records Skipped:</p>
                {resultMessage.details.slice(0, 3).map((d, idx) => (
                  <p key={idx}>· {d}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 1: CSV IMPORT */}
        {activeTab === 'csv' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Upload College Roster File (.csv)
              </span>
              <button
                type="button"
                onClick={handleDownloadSample}
                className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Download Sample CSV Template</span>
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-5 text-center space-y-2 hover:border-emerald-500 transition-colors">
              <Upload className="w-6 h-6 text-slate-400 mx-auto" />
              <div>
                <label className="cursor-pointer font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                  Choose CSV file
                  <input
                    type="file"
                    accept=".csv,text/csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-slate-400"> or paste content below</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Required columns: Student ID, Full Name, Email, Mobile, Department, Academic Year
              </p>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                CSV Data Preview / Direct Paste
              </label>
              <textarea
                rows={5}
                value={csvContent}
                onChange={(e) => setCsvContent(e.target.value)}
                placeholder="Student ID,Full Name,Email,Mobile,Department,Academic Year..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-[11px]"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-[11px] text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Strict Duplicate Protection Rules:
              </p>
              <p>· Rows matching any existing Student ID, Email, or Mobile are skipped automatically.</p>
              <p>· Enforces clean data hygiene for Maruthu Pandiyar College records.</p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessing || !csvContent.trim()}
                onClick={handleCsvImport}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                {isProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                <span>Import & Enrol Candidates</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PORTAL API SYNC */}
        {activeTab === 'portal' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>ECOPOLY.LIFE Students Portal API</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
                  Connected & Authorized
                </span>
              </div>
              <p className="text-emerald-700 dark:text-emerald-400 text-xs leading-relaxed">
                Directly queries the centralized ECOPOLY student registry for Maruthu Pandiyar College of Arts and Science.
              </p>
              <div className="font-mono text-[11px] text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 p-2 rounded">
                API Endpoint: https://students.ecopoly.life/api/v1/college-roster
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-[11px] text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Automatic Duplicate Check & Ingestion:
              </p>
              <p>· Fetches authenticated college candidates waiting for internship onboarding.</p>
              <p>· Compares against existing directory and skips pre-registered students.</p>
              <p>· Every synced student is recorded in the administrative audit log.</p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Close
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePortalSync}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                {isProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                <span>Fetch & Sync Candidate Roster</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
