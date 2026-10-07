import React from 'react';
import { 
  Bus, 
  Camera, 
  Activity, 
  Navigation, 
  Map, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Radio,
  Cpu,
  Zap,
  Check
} from 'lucide-react';

export default function LandingPage({ onNavigate, onOpenReportModal, stats }) {
  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 rounded-3xl border border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-6 sm:p-10 shadow-2xl">
        {/* Glowing Background FX */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>BMTC Moving Road-Data Collector Network • BBMP Civic Integration Ready</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            SMART POTHOLE DETECTOR
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300">
            AI-Powered Road Monitoring & Civic Repair Platform
          </p>

          {/* Tagline */}
          <div className="flex items-center justify-center space-x-3 text-sm sm:text-base font-bold text-slate-300">
            <span className="text-cyan-400">Detect</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">Locate</span>
            <span className="text-slate-600">•</span>
            <span className="text-amber-400">Repair</span>
            <span className="text-slate-600">•</span>
            <span className="text-indigo-400">Verify</span>
          </div>

          {/* Core Explanation Quote Box */}
          <div className="max-w-3xl mx-auto p-5 rounded-2xl glass-panel border border-cyan-500/20 text-slate-300 text-sm leading-relaxed shadow-lg">
            <p className="italic font-normal">
              “BMTC buses act as moving data collectors. Motion sensors identify abnormal road vibrations while AI cameras visually confirm potholes. GPS coordinates, images, severity and timestamps are processed and sent to the monitoring platform.”
            </p>
          </div>

          {/* Main CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenReportModal}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-5 h-5" />
              Report a Pothole
            </button>

            <button
              onClick={() => onNavigate('tracking')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5" />
              Track Complaint
            </button>

            <button
              onClick={() => onNavigate('bbmp-dashboard')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
            >
              <Building2 className="w-5 h-5 text-amber-400" />
              BBMP Dashboard
            </button>

            <button
              onClick={() => onNavigate('map')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
            >
              <Map className="w-5 h-5 text-emerald-400" />
              View Road Map
            </button>
          </div>

        </div>

        {/* VISUAL HERO ARCHITECTURE CARDS */}
        <div className="mt-14 max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
              System Hardware & Telemetry Pipeline
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              BMTC Sensor Architecture → BBMP Monitoring
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            
            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center space-y-2 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">AI Camera</span>
              <span className="text-[10px] text-slate-400">4K 60FPS Vision</span>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center space-y-2 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">Motion Sensor</span>
              <span className="text-[10px] text-slate-400">3-Axis Telemetry</span>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center space-y-2 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Bus className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">BMTC Bus</span>
              <span className="text-[10px] text-slate-400">Moving Collector</span>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center space-y-2 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">Bengaluru Roads</span>
              <span className="text-[10px] text-slate-400">Target Carriageway</span>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center space-y-2 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
                <Navigation className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">GPS Location</span>
              <span className="text-[10px] text-slate-400">Sub-Meter Precision</span>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center space-y-2 border border-slate-800 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Map className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">Digital Map</span>
              <span className="text-[10px] text-slate-400">Spatial Indexing</span>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center space-y-2 border border-slate-800 hover:border-cyan-500/40 transition-colors col-span-2 md:col-span-1">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">BBMP Dashboard</span>
              <span className="text-[10px] text-emerald-400">Civic Action</span>
            </div>

          </div>
        </div>

      </section>

      {/* LIVE COUNTER STATISTICS TICKER */}
      <section className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center">
          <p className="text-xs font-medium text-slate-400">Total Reports</p>
          <h4 className="text-3xl font-extrabold text-white mt-1">{stats?.total || 124}</h4>
          <span className="text-[10px] text-cyan-400">AI + Public</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center">
          <p className="text-xs font-medium text-slate-400">Pending Review</p>
          <h4 className="text-3xl font-extrabold text-rose-400 mt-1">{stats?.pending || 48}</h4>
          <span className="text-[10px] text-rose-300">Needs Assignment</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center">
          <p className="text-xs font-medium text-slate-400">Assigned</p>
          <h4 className="text-3xl font-extrabold text-amber-400 mt-1">{stats?.assigned || 31}</h4>
          <span className="text-[10px] text-amber-300">Work Orders Issued</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center">
          <p className="text-xs font-medium text-slate-400">In Progress</p>
          <h4 className="text-3xl font-extrabold text-cyan-400 mt-1">{stats?.inProgress || 19}</h4>
          <span className="text-[10px] text-cyan-300">Field Repairing</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center">
          <p className="text-xs font-medium text-slate-400">Fixed & Proofed</p>
          <h4 className="text-3xl font-extrabold text-emerald-400 mt-1">{stats?.fixed || 26}</h4>
          <span className="text-[10px] text-emerald-300">Completed Work</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-center">
          <p className="text-xs font-medium text-slate-400">BBMP Verified</p>
          <h4 className="text-3xl font-extrabold text-emerald-300 mt-1">{stats?.verified || 18}</h4>
          <span className="text-[10px] text-emerald-400">Closed Loop</span>
        </div>
      </section>

      {/* END-TO-END WORKFLOW SECTION */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Closed-Loop Pothole Repair Cycle
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            From automated BMTC detection to verified civic road repair and citizen feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-white text-base">Public / BMTC Detection</h3>
            <p className="text-xs text-slate-400">
              Motion sensors register vibration anomaly spikes; AI camera captures instant visual proof.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-white text-base">GPS & AI Classification</h3>
            <p className="text-xs text-slate-400">
              GPS tags exact coordinates. AI tags severity (Minor, Moderate, Severe) with confidence score.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-white text-base">BBMP Repair Order</h3>
            <p className="text-xs text-slate-400">
              BBMP road officers view central dashboard, prioritize critical zones, and issue contractor work orders.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h3 className="font-bold text-white text-base">Before/After GPS Proof</h3>
            <p className="text-xs text-slate-400">
              Contractor uploads before & after repair photos with verified field GPS coordinates.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              5
            </div>
            <h3 className="font-bold text-white text-base">BBMP Verification</h3>
            <p className="text-xs text-slate-400">
              Officer compares proof, verifies spatial tolerance, signs off, and opens public feedback.
            </p>
          </div>

        </div>
      </section>

      {/* QUICK EXPLORER CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: AI Detection Center */}
        <div 
          onClick={() => onNavigate('ai-center')}
          className="glass-panel p-6 rounded-2xl border border-cyan-500/30 hover:border-cyan-500 cursor-pointer transition-all group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300">
                  AI + BMTC Sensor Center
                </h3>
                <p className="text-xs text-slate-400">Live bus telemetry simulation & AI vision</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="mt-4 p-3 rounded-xl bg-slate-900/80 text-xs text-slate-300 font-mono flex items-center justify-between">
            <span>Unit: BMTC-PD-007</span>
            <span className="text-emerald-400 font-bold">● ACTIVE ONLINE</span>
          </div>
        </div>

        {/* Card 2: BBMP Monitoring Center */}
        <div 
          onClick={() => onNavigate('bbmp-dashboard')}
          className="glass-panel p-6 rounded-2xl border border-amber-500/30 hover:border-amber-500 cursor-pointer transition-all group relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300">
                  BBMP Road Monitoring Center
                </h3>
                <p className="text-xs text-slate-400">Officer triage, work order assignment & verification</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="mt-4 p-3 rounded-xl bg-slate-900/80 text-xs text-slate-300 flex items-center justify-between">
            <span>Active Triage Queue</span>
            <span className="text-amber-400 font-bold">{stats?.pending || 48} Pending Tasks</span>
          </div>
        </div>

      </section>

    </div>
  );
}
