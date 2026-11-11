import React, { useState } from 'react';
import { AdminAuditLogEntry, Language } from '../../types/survey';
import { Shield, Clock, Search, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuditLogModalProps {
  logs: AdminAuditLogEntry[];
  onClose: () => void;
  lang: Language;
}

export const AuditLogModal: React.FC<AuditLogModalProps> = ({ logs, onClose, lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.targetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.actionType === filterAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-6 space-y-5 shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded-lg">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Administrative Audit Log & Compliance Ledger
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Immutable audit trail of all student creations, CSV imports, enrolments, status transitions, and supervisor assignments.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 shrink-0 text-xs">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, ID, actor, or details..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
          >
            <option value="all">All Action Types</option>
            <option value="INTERN_ENROLLED">Intern Enrolment</option>
            <option value="INTERN_STATUS_CHANGED">Status Changes</option>
            <option value="STUDENT_CREATED">Student Creation</option>
            <option value="STUDENT_CSV_IMPORTED">CSV Batch Import</option>
            <option value="PORTAL_SYNC">Portal API Sync</option>
            <option value="INTERN_SUSPENDED">Suspension</option>
            <option value="INTERN_REACTIVATED">Reactivation</option>
            <option value="MEMBERSHIP_COMPLETED">Membership Completed</option>
          </select>
        </div>

        {/* Audit Log Entries List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5 text-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                    {log.actionType.replace(/_/g, ' ')}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {log.targetName} ({log.targetId})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {log.details}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
                <span>
                  Actor: <strong className="text-slate-600 dark:text-slate-300">{log.actorName}</strong> ({log.actorRole})
                </span>
                {log.newState && (
                  <span>
                    New State: <strong className="text-emerald-600 dark:text-emerald-400">{log.newState}</strong>
                  </span>
                )}
              </div>
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-xs">
              No audit log entries match the search criteria.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg"
          >
            Close Audit Log
          </button>
        </div>
      </div>
    </div>
  );
};
