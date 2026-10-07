import React, { useState } from 'react';
import { 
  PlusCircle, 
  MapPin, 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Sparkles,
  Upload,
  Info,
  X
} from 'lucide-react';

const SAMPLE_PRESET_LOCATIONS = [
  { name: "Jayanagar 4th Block", road: "11th Main Road", landmark: "Near South End Metro", lat: 12.9279, lng: 77.5824 },
  { name: "Koramangala 5th Block", road: "80 Feet Road", landmark: "Near Sony World Signal", lat: 12.9352, lng: 77.6245 },
  { name: "Indiranagar 100ft Road", road: "100 Feet Road", landmark: "Opposite 12th Main Junction", lat: 12.9784, lng: 77.6408 },
  { name: "Whitefield Hope Farm", road: "ITPL Main Road", landmark: "Hope Farm Junction", lat: 12.9830, lng: 77.7500 },
  { name: "Banashankari 2nd Stage", road: "Outer Ring Road", landmark: "Near BDA Complex", lat: 12.9254, lng: 77.5647 }
];

const SAMPLE_POTHOLE_PHOTOS = [
  "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80"
];

export default function ReportForm({ onSubmitSuccess, onClose }) {
  const [formData, setFormData] = useState({
    reporterName: '',
    reporterContact: '',
    locationName: 'Jayanagar 4th Block',
    roadName: '11th Main Road',
    landmark: 'Near South End Metro Station',
    lat: '12.9279',
    lng: '77.5824',
    severity: 'Severe',
    description: 'Deep road surface defect near bus stop causing severe traffic slowdown.',
    imageOriginal: SAMPLE_POTHOLE_PHOTOS[0]
  });

  const [submittedReport, setSubmittedReport] = useState(null);
  const [customImageFile, setCustomImageFile] = useState(null);

  const handleUseMyLocation = () => {
    // Demo location generator with simulated GPS precision
    const randomPreset = SAMPLE_PRESET_LOCATIONS[Math.floor(Math.random() * SAMPLE_PRESET_LOCATIONS.length)];
    const randomLatOffset = (Math.random() - 0.5) * 0.005;
    const randomLngOffset = (Math.random() - 0.5) * 0.005;
    
    setFormData(prev => ({
      ...prev,
      locationName: randomPreset.name,
      roadName: randomPreset.road,
      landmark: randomPreset.landmark,
      lat: (randomPreset.lat + randomLatOffset).toFixed(4),
      lng: (randomPreset.lng + randomLngOffset).toFixed(4)
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImageFile(file);
      setFormData(prev => ({ ...prev, imageOriginal: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate realistic complaint ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const complaintId = `PTH-BLR-2026-${randomNum}`;
    const timestamp = new Date().toISOString();

    const newReport = {
      id: complaintId,
      shortId: `PTH-BLR-${randomNum.toString().slice(-4)}`,
      locationName: formData.locationName,
      roadName: formData.roadName,
      landmark: formData.landmark,
      coordinates: {
        lat: parseFloat(formData.lat) || 12.9352,
        lng: parseFloat(formData.lng) || 77.6245
      },
      severity: formData.severity,
      source: "Public",
      status: "Pending",
      detectionTimestamp: timestamp,
      bmtcUnitId: "N/A (Citizen Report)",
      bmtcRoute: "N/A",
      aiConfidence: 92, // Simulated visual auto-confidence
      vibrationAnomalyScore: "N/A",
      reporterName: formData.reporterName || "Anonymous Citizen",
      reporterContact: formData.reporterContact || "Not Provided",
      description: formData.description,
      imageOriginal: formData.imageOriginal,
      imageAiAnnotated: formData.imageOriginal,
      workOrder: null,
      repairDetails: null
    };

    setSubmittedReport(newReport);
    if (onSubmitSuccess) onSubmitSuccess(newReport);
  };

  return (
    <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl relative">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Report a Pothole</h2>
            <p className="text-xs text-slate-400">Public Citizen Civic Reporting Portal</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {submittedReport ? (
        /* SUCCESS CONFIRMATION DISPLAY */
        <div className="py-8 space-y-6 text-center animate-fadeIn">
          
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-white">Report Submitted Successfully!</h3>
            <p className="text-sm text-emerald-400 font-medium">
              Your pothole report has been successfully submitted.
            </p>
          </div>

          {/* Details Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-left max-w-md mx-auto space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs text-slate-400">Complaint ID</span>
              <span className="font-mono text-sm font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                {submittedReport.id}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Location</span>
              <span className="text-white font-medium">{submittedReport.locationName}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">GPS Coordinates</span>
              <span className="font-mono text-slate-300">{submittedReport.coordinates.lat}, {submittedReport.coordinates.lng}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Severity</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                submittedReport.severity === 'Severe' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                submittedReport.severity === 'Moderate' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
              }`}>
                {submittedReport.severity}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Submitted Time</span>
              <span className="text-slate-300">{new Date(submittedReport.detectionTimestamp).toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
              <span className="text-slate-400">Current Status</span>
              <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
                <Clock className="w-3.5 h-3.5" /> Pending BBMP Review
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => setSubmittedReport(null)}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
            >
              Report Another Pothole
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold"
              >
                Close Window
              </button>
            )}
          </div>

        </div>
      ) : (
        /* INPUT FORM */
        <form onSubmit={handleSubmit} className="pt-6 space-y-6">
          
          {/* Reporter Optional Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Name <span className="text-slate-500">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Ramesh Reddy"
                value={formData.reporterName}
                onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Mobile / Email <span className="text-slate-500">(Optional for SMS updates)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. +91 98450 12345"
                value={formData.reporterContact}
                onChange={(e) => setFormData({ ...formData, reporterContact: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Photo Selection / Upload */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Pothole Photograph <span className="text-rose-400">*</span>
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SAMPLE_POTHOLE_PHOTOS.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData({ ...formData, imageOriginal: imgUrl })}
                  className={`relative h-28 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    formData.imageOriginal === imgUrl
                      ? 'border-cyan-400 ring-2 ring-cyan-500/40 scale-[1.02]'
                      : 'border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <img src={imgUrl} alt={`Sample ${idx + 1}`} className="w-full h-full object-cover" />
                  {formData.imageOriginal === imgUrl && (
                    <div className="absolute top-2 right-2 bg-cyan-500 text-slate-950 p-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className="absolute bottom-1 left-1 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] text-slate-300">
                    Sample #{idx + 1}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="cursor-pointer px-4 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 rounded-xl text-xs font-medium flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Custom Photo
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              <span className="text-[11px] text-slate-400">Select a sample photo or upload your own</span>
            </div>
          </div>

          {/* Location & GPS */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" /> Location & GPS Coordinates
              </span>
              <button
                type="button"
                onClick={handleUseMyLocation}
                className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Use My Location
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Area / Locality</label>
                <input
                  type="text"
                  required
                  value={formData.locationName}
                  onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Road / Street Name</label>
                <input
                  type="text"
                  required
                  value={formData.roadName}
                  onChange={(e) => setFormData({ ...formData, roadName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs text-slate-400 mb-1">Landmark</label>
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Latitude</label>
                <input
                  type="text"
                  required
                  value={formData.lat}
                  onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Longitude</label>
                <input
                  type="text"
                  required
                  value={formData.lng}
                  onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Severity Radio Selectors */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Severity Level <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Minor', label: '🟡 Minor', desc: 'Shallow surface pit' },
                { id: 'Moderate', label: '🟠 Moderate', desc: 'Medium rim edge breakdown' },
                { id: 'Severe', label: '🔴 Severe', desc: 'Deep crater / high risk' },
              ].map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setFormData({ ...formData, severity: item.id })}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    formData.severity === item.id
                      ? 'bg-slate-800 border-cyan-500 ring-1 ring-cyan-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs text-white">{item.label}</div>
                  <div className="text-[10px] text-slate-400">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Description / Additional Details
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide details such as size, depth, or traffic impact..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Submit Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
            >
              Submit Report
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
