import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Bus, 
  Activity, 
  Camera, 
  Navigation, 
  Wifi, 
  Radio, 
  AlertTriangle, 
  Send, 
  PlusCircle, 
  Zap, 
  ShieldCheck, 
  Play, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { BMTC_SENSOR_UNITS } from '../data/mockPotholes';

export default function AiDetectionCenter({ onTriggerNewDetection, onCreateBbmpReport }) {
  const [selectedUnitId, setSelectedUnitId] = useState('BMTC-PD-007');
  const [telemetryVal, setTelemetryVal] = useState(1.02);
  const [isSimulating, setIsSimulating] = useState(false);
  const [detectionAlert, setDetectionAlert] = useState({
    title: "POTHOLE DETECTED",
    source: "BMTC Bus Sensor Unit",
    busNumber: "KA-01-F-4589 (Volvo Electric AC)",
    route: "Route 500D (Silk Board ↔ Hebbal)",
    motionAnomaly: "Detected (3.4g Z-Axis Spike)",
    aiConfidence: 94,
    severity: "SEVERE",
    gps: "12.9352, 77.6245",
    timestamp: "07 Oct 2026, 10:42 AM",
    location: "Koramangala 80 Feet Road Junction",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80"
  });

  const activeUnit = BMTC_SENSOR_UNITS.find(u => u.id === selectedUnitId) || BMTC_SENSOR_UNITS[0];

  // Dynamic telemetry simulator ticker
  useEffect(() => {
    const interval = setInterval(() => {
      if (isSimulating) {
        // High vibration spikes
        const spike = 2.5 + Math.random() * 2.2;
        setTelemetryVal(parseFloat(spike.toFixed(2)));
      } else {
        // Normal baseline road vibration 0.9g - 1.3g
        const baseline = 0.95 + Math.random() * 0.35;
        setTelemetryVal(parseFloat(baseline.toFixed(2)));
      }
    }, 600);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleSimulateDetection = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      const randomConfidence = Math.floor(92 + Math.random() * 7);
      const severities = ['SEVERE', 'MODERATE'];
      const chosenSev = severities[Math.floor(Math.random() * severities.length)];
      
      const updatedAlert = {
        ...detectionAlert,
        busNumber: activeUnit.busNumber,
        route: activeUnit.route,
        aiConfidence: randomConfidence,
        severity: chosenSev,
        timestamp: new Date().toLocaleString(),
        motionAnomaly: `Detected (${(3.1 + Math.random() * 1.5).toFixed(1)}g Spike)`
      };
      setDetectionAlert(updatedAlert);
    }, 3000);
  };

  return (
    <div className="space-y-10">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>AI Vision & Accelerometer Fusion Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            AI Detection Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            BMTC buses serve as autonomous mobile scanning nodes equipped with visual AI inference and 3-axis accelerometer vibration telemetry.
          </p>
        </div>

        {/* Bus Unit Selector Dropdown */}
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-2xl space-y-2">
          <label className="text-xs text-slate-400 font-medium block">Select BMTC Bus Unit:</label>
          <select
            value={selectedUnitId}
            onChange={(e) => setSelectedUnitId(e.target.value)}
            className="w-full bg-slate-800 text-cyan-300 font-mono text-xs font-bold rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            {BMTC_SENSOR_UNITS.map(unit => (
              <option key={unit.id} value={unit.id}>
                🚌 {unit.id} • {unit.busNumber.split(' ')[0]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SENSOR UNIT STATUS DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Device Telemetry Panel */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs text-slate-400">Device ID</span>
              <h3 className="text-xl font-extrabold font-mono text-cyan-300">{activeUnit.id}</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              {activeUnit.status}
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-white">{activeUnit.busNumber}</p>
            <p className="text-xs text-slate-400">{activeUnit.route}</p>
          </div>

          {/* Sensor Diagnostics Status List */}
          <div className="space-y-3 pt-2">
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center space-x-2.5">
                <Activity className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium text-slate-300">Motion Sensor</span>
              </div>
              <span className="text-xs font-bold text-emerald-400">ACTIVE</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center space-x-2.5">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-medium text-slate-300">AI Camera</span>
              </div>
              <span className="text-xs font-bold text-emerald-400">ACTIVE (60 FPS)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center space-x-2.5">
                <Navigation className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-medium text-slate-300">GPS Node</span>
              </div>
              <span className="text-xs font-bold text-emerald-400">ACTIVE (Sub-Meter)</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center space-x-2.5">
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium text-slate-300">Network Sync</span>
              </div>
              <span className="text-xs font-bold text-emerald-400">{activeUnit.network}</span>
            </div>

          </div>

          {/* Live Accelerometer Telemetry Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Z-Axis Acceleration:
              </span>
              <span className={`font-mono font-bold ${telemetryVal > 2.5 ? 'text-rose-400 text-sm animate-pulse' : 'text-cyan-300'}`}>
                {telemetryVal} g
              </span>
            </div>
            
            {/* Progress bar visualizer */}
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  telemetryVal > 2.5 ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                }`}
                style={{ width: `${Math.min(100, (telemetryVal / 4.5) * 100)}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0.0g Normal</span>
              <span>2.0g Anomaly</span>
              <span>4.0g+ Severe Crater</span>
            </div>
          </div>

          {/* Trigger Simulation Button */}
          <button
            onClick={handleSimulateDetection}
            disabled={isSimulating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <Radio className="w-4 h-4 animate-spin" /> Simulating Road Bump...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Simulate Bus Road Anomaly Trigger
              </>
            )}
          </button>

        </div>

        {/* Right: Live Detection Alert Card */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-rose-500/30 space-y-6 relative overflow-hidden">
          
          {/* Animated Detection Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <div>
                <h3 className="text-xl font-black tracking-wide text-white uppercase flex items-center gap-2">
                  {detectionAlert.title}
                </h3>
                <p className="text-xs text-slate-400">Detection Source: {detectionAlert.source}</p>
              </div>
            </div>
            
            <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">
              SEVERITY: {detectionAlert.severity}
            </span>
          </div>

          {/* AI Annotated Image Viewport with Bounding Box Overlay */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-64 sm:h-72 bg-slate-900 group">
            <img 
              src={detectionAlert.image} 
              alt="AI Detection" 
              className="w-full h-full object-cover" 
            />

            {/* AI Bounding Box Overlay Graphic */}
            <div className="absolute top-1/4 left-1/3 w-48 h-32 border-2 border-cyan-400 bg-cyan-500/10 rounded-lg flex flex-col justify-between p-2 shadow-2xl animate-pulse">
              <div className="flex items-center justify-between">
                <span className="bg-cyan-500 text-slate-950 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                  POTHOLE DETECTED ({detectionAlert.aiConfidence}%)
                </span>
                <span className="text-[10px] text-cyan-300 font-mono">YOLOv8 Vision</span>
              </div>
              <div className="text-[9px] text-cyan-200 font-mono bg-slate-950/80 px-1.5 py-0.5 rounded self-start">
                Depth Est: 8.5cm • Severe
              </div>
            </div>

            {/* Bottom HUD bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 flex flex-wrap items-center justify-between text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-cyan-300">GPS: {detectionAlert.gps}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <span>🕒 {detectionAlert.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Detection Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Motion Anomaly</span>
              <span className="font-bold text-amber-400">{detectionAlert.motionAnomaly}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[11px] block">AI Confidence</span>
              <span className="font-bold text-cyan-300">{detectionAlert.aiConfidence}% Match</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[11px] block">BMTC Route</span>
              <span className="font-semibold text-slate-200 truncate block">{detectionAlert.route.split(' ')[0]}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Locality</span>
              <span className="font-semibold text-slate-200 truncate block">{detectionAlert.location}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              onClick={() => onTriggerNewDetection(detectionAlert)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" /> Send to Dashboard
            </button>

            <button
              onClick={() => onCreateBbmpReport(detectionAlert)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-colors"
            >
              <PlusCircle className="w-4 h-4" /> Create BBMP Report
            </button>
          </div>

        </div>

      </div>

      {/* DETAILED WORKFLOW FLOWCHART DIAGRAM */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Architecture Workflow
          </span>
          <h3 className="text-xl font-bold text-white">
            BMTC Sensor to BBMP Monitoring Data Processing Pipeline
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-2 items-center text-center">
          
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <Activity className="w-5 h-5 text-amber-400 mx-auto" />
            <div className="text-xs font-bold text-white">Motion Sensor</div>
            <div className="text-[10px] text-slate-400">Vibration Spike</div>
          </div>

          <div className="hidden md:block text-slate-600 font-bold">↓</div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <Camera className="w-5 h-5 text-cyan-400 mx-auto" />
            <div className="text-xs font-bold text-white">AI Camera</div>
            <div className="text-[10px] text-slate-400">Visual Snapshot</div>
          </div>

          <div className="hidden md:block text-slate-600 font-bold">↓</div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <Cpu className="w-5 h-5 text-indigo-400 mx-auto" />
            <div className="text-xs font-bold text-white">AI Vision Model</div>
            <div className="text-[10px] text-slate-400">Classification</div>
          </div>

          <div className="hidden md:block text-slate-600 font-bold">↓</div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <Navigation className="w-5 h-5 text-rose-400 mx-auto" />
            <div className="text-xs font-bold text-white">GPS Tagging</div>
            <div className="text-[10px] text-slate-400">Lat & Long</div>
          </div>

        </div>

        <div className="flex justify-center items-center gap-3 text-xs text-slate-400 pt-2 font-mono">
          <span>Data Processing</span>
          <span>→</span>
          <span className="text-cyan-300 font-bold">Cloud Server API</span>
          <span>→</span>
          <span className="text-emerald-400 font-bold">BBMP Dashboard</span>
        </div>
      </div>

    </div>
  );
}
