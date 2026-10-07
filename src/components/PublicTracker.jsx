import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Building2, 
  Wrench, 
  ShieldCheck, 
  Star, 
  MessageSquare,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PublicTracker({ potholes, onSubmitFeedback }) {
  const [searchInput, setSearchInput] = useState('PTH-BLR-00125');
  const [activeReport, setActiveReport] = useState(potholes[0]);
  const [rating, setRating] = useState(5);
  const [qProper, setQProper] = useState(true);
  const [qSafe, setQSafe] = useState(true);
  const [qSatisfactory, setQSatisfactory] = useState(true);
  const [feedbackComments, setFeedbackComments] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchInput.trim().toLowerCase();
    const found = potholes.find(p => p.id.toLowerCase().includes(q) || (p.shortId && p.shortId.toLowerCase().includes(q)));
    if (found) {
      setActiveReport(found);
      setFeedbackSubmitted(false);
    } else {
      setActiveReport(null);
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!activeReport) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback if confetti canvas not attached
    }

    const feedbackPayload = {
      rating,
      properlyRepaired: qProper,
      roadSafe: qSafe,
      satisfactory: qSatisfactory,
      comments: feedbackComments,
      submittedAt: new Date().toISOString()
    };

    onSubmitFeedback(activeReport.id, feedbackPayload);
    setFeedbackSubmitted(true);
  };

  // Helper to determine stage active status
  const stages = [
    { key: 'Submitted', label: 'Report Submitted', icon: Clock },
    { key: 'AiVerified', label: 'AI / Citizen Verification', icon: Sparkles },
    { key: 'BbmpReceived', label: 'BBMP Received', icon: Building2 },
    { key: 'Assigned', label: 'Repair Assigned', icon: Wrench },
    { key: 'InProgress', label: 'Repair In Progress', icon: Wrench },
    { key: 'ProofUploaded', label: 'Completion Proof Uploaded', icon: MapPin },
    { key: 'Verified', label: 'BBMP Verified', icon: ShieldCheck },
    { key: 'Fixed', label: 'Fixed', icon: CheckCircle2 },
  ];

  const getStageCompleted = (stageKey) => {
    if (!activeReport) return false;
    const status = activeReport.status;

    if (stageKey === 'Submitted' || stageKey === 'AiVerified' || stageKey === 'BbmpReceived') return true;
    if (stageKey === 'Assigned') return ['Assigned', 'In Progress', 'Fixed', 'Verified'].includes(status);
    if (stageKey === 'InProgress') return ['In Progress', 'Fixed', 'Verified'].includes(status);
    if (stageKey === 'ProofUploaded') return ['Fixed', 'Verified'].includes(status) || !!activeReport.repairDetails;
    if (stageKey === 'Verified' || stageKey === 'Fixed') return ['Fixed', 'Verified'].includes(status);
    return false;
  };

  return (
    <div className="space-y-10">
      
      {/* Search Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-6">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Track My Complaint
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Enter your unique Pothole Complaint ID (e.g. <span className="font-mono text-cyan-300">PTH-BLR-00125</span>) to check real-time status and timeline updates.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Complaint ID (e.g. PTH-BLR-00125)..."
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-xs font-bold rounded-2xl shadow-lg shadow-cyan-500/20"
          >
            Track Status
          </button>
        </form>
      </div>

      {activeReport ? (
        <div className="space-y-8">
          
          {/* Complaint Overview Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xl font-extrabold text-cyan-300">{activeReport.id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  activeReport.status === 'Verified' || activeReport.status === 'Fixed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {activeReport.status}
                </span>
              </div>
              <h4 className="font-bold text-white text-sm">{activeReport.locationName}</h4>
              <p className="text-xs text-slate-400">{activeReport.roadName} • Landmark: {activeReport.landmark || 'N/A'}</p>
            </div>

            <div className="flex items-center space-x-4 text-xs font-mono text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Severity</span>
                <span className="font-bold text-rose-400">{activeReport.severity}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Source</span>
                <span className="font-bold text-cyan-300">{activeReport.source}</span>
              </div>
            </div>
          </div>

          {/* SECTION 10 TIMELINE STEPPER */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" /> Life Cycle Repair Timeline
            </h3>

            <div className="relative border-l-2 border-slate-800 ml-4 space-y-8 pl-6">
              {stages.map((stage, idx) => {
                const isDone = getStageCompleted(stage.key);
                const Icon = stage.icon;

                return (
                  <div key={idx} className="relative group">
                    {/* Circle Node */}
                    <div className={`absolute -left-[35px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                        : 'bg-slate-900 border-2 border-slate-700 text-slate-500'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm font-bold ${isDone ? 'text-white' : 'text-slate-500'}`}>
                          ● {stage.label}
                        </span>
                        {isDone && (
                          <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300">
                            COMPLETED
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-slate-400 font-mono">
                        {isDone 
                          ? `Processed on ${new Date(new Date(activeReport.detectionTimestamp).getTime() + idx * 7200000).toLocaleString()}`
                          : 'Pending next phase execution'
                        }
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 11 PUBLIC FEEDBACK FORM */}
          {(activeReport.status === 'Fixed' || activeReport.status === 'Verified') && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 space-y-6">
              
              <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Public Citizen Feedback</h3>
                  <p className="text-xs text-slate-400">Provide feedback for completed BBMP repair work</p>
                </div>
              </div>

              {feedbackSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Thank You!</h4>
                  <p className="text-xs text-emerald-300">
                    “Thank you. Your feedback helps improve road maintenance.”
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                  
                  {/* Star Rating */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-300">Overall Repair Rating</label>
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 focus:outline-none transition-transform hover:scale-125"
                        >
                          <Star className={`w-7 h-7 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
                        </button>
                      ))}
                      <span className="text-xs text-amber-300 font-bold ml-2">{rating} / 5 Stars</span>
                    </div>
                  </div>

                  {/* Survey Questions */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-xs text-slate-300 font-medium block">
                        Was the pothole properly repaired?
                      </span>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => setQProper(true)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${qProper ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setQProper(false)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${!qProper ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-xs text-slate-300 font-medium block">
                        Is the road safe now?
                      </span>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => setQSafe(true)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${qSafe ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setQSafe(false)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${!qSafe ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <span className="text-xs text-slate-300 font-medium block">
                        Was the repair satisfactory?
                      </span>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => setQSatisfactory(true)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${qSatisfactory ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setQSatisfactory(false)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${!qSatisfactory ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          No
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Feedback Text Area */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Text Feedback / Comments
                    </label>
                    <textarea
                      rows={3}
                      value={feedbackComments}
                      onChange={(e) => setFeedbackComments(e.target.value)}
                      placeholder="Share your experience regarding the quality of this repair..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Submit Feedback Button */}
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20"
                  >
                    Submit Feedback
                  </button>

                </form>
              )}

            </div>
          )}

        </div>
      ) : (
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <h4 className="text-lg font-bold text-white">Complaint ID Not Found</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            No report matched your query. Try searching for sample complaint ID <span className="font-mono text-cyan-300">PTH-BLR-00125</span> or <span className="font-mono text-cyan-300">PTH-BLR-00120</span>.
          </p>
        </div>
      )}

    </div>
  );
}
