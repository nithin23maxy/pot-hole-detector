import React, { useState } from 'react';
import { 
  Wrench, 
  Upload, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Camera, 
  Sparkles,
  Send,
  AlertTriangle
} from 'lucide-react';

const AFTER_REPAIR_PHOTOS = [
  "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
];

export default function RepairTeamPortal({ potholes, onSubmitRepairCompletion }) {
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [beforePhoto, setBeforePhoto] = useState(AFTER_REPAIR_PHOTOS[0]);
  const [afterPhoto, setAfterPhoto] = useState(AFTER_REPAIR_PHOTOS[0]);
  const [completionGps, setCompletionGps] = useState({ lat: '12.9354', lng: '77.6247' });
  const [materialsUsed, setMaterialsUsed] = useState('Bituminous Cold Mix (400kg), Tack Coat Emulsion, Grade 60 Aggregate');
  const [contractorNotes, setContractorNotes] = useState('Excavated soft pavement layer, compacted aggregate base, and laid hot asphalt overlay flush with carriageway.');
  const [submittedSuccessId, setSubmittedSuccessId] = useState(null);

  // Assigned or In Progress work orders
  const assignedWorkOrders = potholes.filter(p => p.status === 'Assigned' || p.status === 'In Progress');
  const activeReport = potholes.find(p => p.id === selectedReportId) || assignedWorkOrders[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activeReport) return;

    // Calculate simulated distance difference in meters between original GPS and completion GPS
    const originalLat = activeReport.coordinates.lat;
    const originalLng = activeReport.coordinates.lng;
    const actualLat = parseFloat(completionGps.lat) || originalLat + 0.0002;
    const actualLng = parseFloat(completionGps.lng) || originalLng + 0.0002;
    
    // Rough Haversine distance in meters
    const diffMeters = Math.round(
      Math.sqrt(
        Math.pow((actualLat - originalLat) * 111000, 2) + 
        Math.pow((actualLng - originalLng) * 111000, 2)
      )
    );

    const repairPayload = {
      beforePhoto: beforePhoto,
      afterPhoto: afterPhoto,
      completionPhoto: afterPhoto,
      completionGps: { lat: actualLat, lng: actualLng },
      gpsDistanceDiffMeters: diffMeters,
      materialsUsed: materialsUsed,
      submittedTimestamp: new Date().toISOString(),
      contractorNotes: contractorNotes,
      verificationStatus: 'Awaiting BBMP Verification'
    };

    onSubmitRepairCompletion(activeReport.id, repairPayload);
    setSubmittedSuccessId(activeReport.id);
  };

  const handleSimulateCompletionGps = () => {
    if (activeReport) {
      setCompletionGps({
        lat: (activeReport.coordinates.lat + 0.0002).toFixed(4),
        lng: (activeReport.coordinates.lng + 0.0002).toFixed(4)
      });
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            <span>Field Contractor Work Order System</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Repair Work Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Contractor portal for Road Maintenance Teams. Receive assigned work orders, execute asphalt repairs, and upload before/after spatial proof of completion.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 p-4 rounded-2xl">
          <div className="text-xs text-slate-400">Assigned Team:</div>
          <div className="text-sm font-bold text-cyan-300">Road Maintenance Team 07</div>
          <div className="text-[10px] text-slate-500">Contractor ID: CNT-BLR-884</div>
        </div>
      </div>

      {/* WORK ORDER WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Work Order Selector List */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" /> Assigned Work Orders ({assignedWorkOrders.length})
          </h3>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {assignedWorkOrders.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-900/50 rounded-2xl border border-slate-800">
                No pending assigned work orders for Team 07 at this moment.
              </div>
            ) : (
              assignedWorkOrders.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedReportId(item.id);
                    setSubmittedSuccessId(null);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    activeReport?.id === item.id
                      ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-300">
                      {item.workOrder?.workOrderId || 'WO-BLR-2026-118'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-2 text-xs font-semibold text-white">{item.locationName}</div>
                  <div className="text-[10px] text-slate-400">{item.roadName}</div>

                  <div className="mt-3 flex items-center justify-between text-[10px] text-slate-300 pt-2 border-t border-slate-800">
                    <span>Severity: <strong className="text-rose-400">{item.severity}</strong></span>
                    <span>Ref: {item.shortId || item.id}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Repair Completion Proof Submission Form */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          
          {submittedSuccessId ? (
            <div className="py-8 space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Completion Proof Submitted!</h3>
                <p className="text-xs text-emerald-400">
                  Work order updated. Report is now set to <strong>Awaiting BBMP Verification</strong>.
                </p>
              </div>

              <button
                onClick={() => setSubmittedSuccessId(null)}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold"
              >
                Back to Work Orders
              </button>
            </div>
          ) : activeReport ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400">Work Order ID</span>
                  <h3 className="text-xl font-extrabold font-mono text-cyan-300">
                    {activeReport.workOrder?.workOrderId || 'WO-BLR-2026-118'}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Complaint Reference</span>
                  <div className="font-mono text-xs font-bold text-white">{activeReport.id}</div>
                </div>
              </div>

              {/* Before vs After Photo Uploaders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-amber-400" /> Before Repair Photograph
                  </label>
                  <div className="h-40 rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-900">
                    <img src={activeReport.imageOriginal} alt="Before" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] text-amber-300 font-bold">
                      BEFORE REPAIR
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-300 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-emerald-400" /> After Repair Photograph
                  </label>
                  <div className="h-40 rounded-2xl overflow-hidden border border-emerald-500/40 relative bg-slate-900">
                    <img src={afterPhoto} alt="After" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px] text-emerald-300 font-bold">
                      AFTER REPAIR (COMPLETED)
                    </span>
                  </div>
                </div>

              </div>

              {/* Actual GPS Input & Verification Delta */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-cyan-400" /> Actual Completion Field GPS
                  </span>
                  <button
                    type="button"
                    onClick={handleSimulateCompletionGps}
                    className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-cyan-400" /> Get Field GPS
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-slate-400">Completion Latitude</label>
                    <input
                      type="text"
                      value={completionGps.lat}
                      onChange={(e) => setCompletionGps({ ...completionGps, lat: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400">Completion Longitude</label>
                    <input
                      type="text"
                      value={completionGps.lng}
                      onChange={(e) => setCompletionGps({ ...completionGps, lng: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 font-mono">
                  <span>Original Reported GPS: {activeReport.coordinates.lat}, {activeReport.coordinates.lng}</span>
                  <span className="text-emerald-400 font-bold">Delta: ~22 meters (Acceptable)</span>
                </div>
              </div>

              {/* Materials & Description */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Materials Used</label>
                  <input
                    type="text"
                    required
                    value={materialsUsed}
                    onChange={(e) => setMaterialsUsed(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Repair Description & Contractor Notes</label>
                  <textarea
                    rows={2}
                    value={contractorNotes}
                    onChange={(e) => setContractorNotes(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Completed Work Proof
              </button>

            </form>
          ) : (
            <div className="py-12 text-center text-slate-500">
              Select an assigned work order from the left column to submit completion proof.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
