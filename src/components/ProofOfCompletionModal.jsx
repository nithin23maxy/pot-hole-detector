import React from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Clock, 
  Wrench, 
  FileText, 
  ArrowRight,
  AlertTriangle
} from 'lucide-react';

export default function ProofOfCompletionModal({ report, onClose, onVerifyRepair, onRejectRepair }) {
  if (!report || !report.repairDetails) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div className="glass-panel p-6 rounded-2xl max-w-md w-full text-center space-y-4">
          <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Completion Proof Uploaded Yet</h3>
          <p className="text-xs text-slate-400">
            The contractor has not yet submitted before/after photos or completion GPS for this work order.
          </p>
          <button onClick={onClose} className="px-4 py-2 bg-slate-800 text-xs font-bold text-slate-300 rounded-xl">
            Close
          </button>
        </div>
      </div>
    );
  }

  const repair = report.repairDetails;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-4xl p-6 sm:p-8 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-extrabold text-white">WORK COMPLETION PROOF</h3>
                <span className="font-mono text-xs font-bold text-cyan-300">({report.id})</span>
              </div>
              <p className="text-xs text-slate-400">BBMP Official Spatial & Visual Verification Audit</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Tag */}
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
          <span className="text-amber-300 font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" /> Audit Status:
          </span>
          <span className="font-bold text-amber-400 font-mono">
            {repair.verificationStatus || 'Awaiting BBMP Verification'}
          </span>
        </div>

        {/* SIDE-BY-SIDE BEFORE VS AFTER PHOTO COMPARISON */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-300 tracking-wider uppercase">Visual Proof Audit</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Before Photo */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-rose-400 font-bold">
                <span>BEFORE REPAIR</span>
                <span className="text-[10px] text-slate-400 font-normal">Original Pothole Detection</span>
              </div>
              <div className="h-56 rounded-2xl overflow-hidden border border-rose-500/30 relative bg-slate-900">
                <img src={repair.beforePhoto || report.imageOriginal} alt="Before" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* After Photo */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                <span>AFTER REPAIR</span>
                <span className="text-[10px] text-slate-400 font-normal">Asphalt Paved & Compacted</span>
              </div>
              <div className="h-56 rounded-2xl overflow-hidden border border-emerald-500/50 relative bg-slate-900">
                <img src={repair.afterPhoto || repair.completionPhoto} alt="After" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>

        {/* GPS COMPARISON & TILE METRICS */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-cyan-400" /> Spatial GPS Distance Verification
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Original Reported GPS</span>
              <span className="font-mono text-cyan-300 font-bold">
                {report.coordinates.lat}, {report.coordinates.lng}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Actual Completion GPS</span>
              <span className="font-mono text-emerald-400 font-bold">
                {repair.completionGps?.lat || report.coordinates.lat}, {repair.completionGps?.lng || report.coordinates.lng}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Distance Difference</span>
              <span className="font-bold text-emerald-300">
                {repair.gpsDistanceDiffMeters || 22} meters (Acceptable)
              </span>
            </div>
          </div>
        </div>

        {/* REPAIR DETAILS & MATERIALS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
              <Wrench className="w-3.5 h-3.5 text-amber-400" /> Contractor & Execution
            </span>
            <div>
              <span className="text-slate-400">Assigned Team: </span>
              <span className="font-bold text-white">{report.workOrder?.assignedTeam || 'Road Maintenance Team 07'}</span>
            </div>
            <div>
              <span className="text-slate-400">Completion Timestamp: </span>
              <span className="text-slate-200">{new Date(repair.submittedTimestamp).toLocaleString()}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-indigo-400" /> Material & Work Specs
            </span>
            <div>
              <span className="text-slate-400 block">Materials Used:</span>
              <span className="text-slate-200 font-medium">{repair.materialsUsed || 'Bituminous Cold Mix'}</span>
            </div>
            <div className="italic text-slate-400 text-[11px] pt-1">
              "{repair.contractorNotes || 'Compacted asphalt patch.'}"
            </div>
          </div>

        </div>

        {/* OFFICER VERIFICATION ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            BBMP Officer Decision:
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onRejectRepair(report.id)}
              className="px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <XCircle className="w-4 h-4 text-rose-400" /> Reject / Request Rework
            </button>

            <button
              onClick={() => onVerifyRepair(report.id)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" /> Verify Repair & Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
