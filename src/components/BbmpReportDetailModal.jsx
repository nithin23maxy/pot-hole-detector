import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Building2, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Camera, 
  Activity, 
  UserCheck, 
  FileText,
  Send,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function BbmpReportDetailModal({ report, onClose, onUpdateReportStatus, onOpenVerificationModal }) {
  const [selectedContractor, setSelectedContractor] = useState('Road Maintenance Team 07');
  const [isAssigning, setIsAssigning] = useState(false);

  if (!report) return null;

  const handleAssignTeam = () => {
    setIsAssigning(true);
    setTimeout(() => {
      const updatedWorkOrder = {
        workOrderId: `WO-BLR-2026-${Math.floor(100 + Math.random() * 900)}`,
        assignedTeam: selectedContractor,
        contractorName: "Sri Balaji Civil Contractors",
        assignedDate: new Date().toISOString(),
        targetCompletion: "2026-10-10"
      };

      onUpdateReportStatus(report.id, {
        status: 'Assigned',
        workOrder: updatedWorkOrder
      });
      setIsAssigning(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-4xl p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-lg font-extrabold text-cyan-300">{report.id}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  report.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-300' :
                  report.status === 'Fixed' ? 'bg-cyan-500/20 text-cyan-300' :
                  report.status === 'In Progress' ? 'bg-indigo-500/20 text-indigo-300' :
                  report.status === 'Assigned' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {report.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">BBMP Official Inspection Triage View</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dual Photo View (Original vs AI Annotated) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-cyan-400" /> Original Pothole Photo
            </span>
            <div className="h-48 rounded-2xl overflow-hidden border border-slate-800 relative">
              <img src={report.imageOriginal} alt="Original" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Vision Detection & Annotation
            </span>
            <div className="h-48 rounded-2xl overflow-hidden border border-cyan-500/40 relative bg-slate-900">
              <img src={report.imageAiAnnotated || report.imageOriginal} alt="AI Vision" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-cyan-500 text-slate-950 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                AI Match: {report.aiConfidence || 94}% Confidence
              </div>
            </div>
          </div>

        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Location & GPS Card */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Location Details
            </span>
            <h4 className="font-bold text-white text-sm">{report.locationName}</h4>
            <p className="text-slate-300">{report.roadName}</p>
            <p className="text-slate-400">Landmark: {report.landmark || 'N/A'}</p>
            <div className="pt-2 font-mono text-cyan-300">
              GPS: {report.coordinates.lat}, {report.coordinates.lng}
            </div>
          </div>

          {/* Telemetry & Detection Card */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-amber-400" /> Sensor & Source Info
            </span>
            <div className="flex justify-between">
              <span className="text-slate-400">Detection Source:</span>
              <span className="font-bold text-white">{report.source}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">BMTC Unit:</span>
              <span className="font-mono text-slate-200">{report.bmtcUnitId || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Vibration Anomaly:</span>
              <span className="font-mono text-amber-400">{report.vibrationAnomalyScore || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Detection Date:</span>
              <span>{new Date(report.detectionTimestamp).toLocaleString()}</span>
            </div>
          </div>

          {/* Reporter & Citizen Description */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-emerald-400" /> Citizen & Field Notes
            </span>
            <div className="flex justify-between">
              <span className="text-slate-400">Reporter:</span>
              <span className="font-semibold text-white">{report.reporterName || 'BMTC Telemetry'}</span>
            </div>
            <div className="text-slate-300 pt-1 italic">
              "{report.description || 'No description provided.'}"
            </div>
          </div>

        </div>

        {/* WORK ORDER ASSIGNMENT BAR */}
        {report.status === 'Pending' && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-amber-400" /> Assign Repair Work Order
            </span>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <select
                value={selectedContractor}
                onChange={(e) => setSelectedContractor(e.target.value)}
                className="w-full sm:w-auto bg-slate-900 text-slate-200 text-xs rounded-xl px-3.5 py-2.5 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="Road Maintenance Team 07">Road Maintenance Team 07 (Central Zone)</option>
                <option value="Rapid Asphalt Patching Squad 03">Rapid Asphalt Patching Squad 03</option>
                <option value="Zone East Paving Unit 01">Zone East Paving Unit 01</option>
              </select>

              <button
                onClick={handleAssignTeam}
                disabled={isAssigning}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" /> Assign Repair Team
              </button>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS BAR */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
          
          <button
            onClick={() => onUpdateReportStatus(report.id, { status: 'In Progress' })}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-bold"
          >
            Mark In Progress
          </button>

          <button
            onClick={() => onUpdateReportStatus(report.id, { status: 'Pending' })}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 text-xs font-bold"
          >
            Request Reinspection
          </button>

          {(report.status === 'Fixed' || report.repairDetails) && (
            <button
              onClick={() => onOpenVerificationModal(report)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <ShieldCheck className="w-4 h-4" /> Verify Completed Work Proof
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}
