import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, 
  Filter, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Layers,
  Info,
  Bus
} from 'lucide-react';

// Custom SVG Icons for Leaflet Markers based on status & severity
const createCustomIcon = (severity, status) => {
  let color = '#f59e0b'; // Moderate amber default
  if (status === 'Fixed' || status === 'Verified') {
    color = '#10b981'; // Fixed green
  } else if (severity === 'Severe') {
    color = '#ef4444'; // Severe red
  } else if (severity === 'Minor') {
    color = '#eab308'; // Minor yellow
  }

  const svgHtml = `
    <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: ${color}; opacity: 0.35; animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
      <div style="position: relative; width: 26px; height: 26px; border-radius: 50%; background: #0f172a; border: 2.5px solid ${color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
        <div style="width: 10px; height: 10px; border-radius: 50%; background: ${color};"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-marker',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18]
  });
};

function MapViewSetter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
}

export default function PotholeMap({ potholes, onViewDetails, onSelectForBbmp }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterSource, setFilterSource] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState([12.9352, 77.6245]); // Bengaluru default center

  // Filtered potholes list
  const filteredPotholes = potholes.filter(p => {
    if (filterSeverity !== 'ALL' && p.severity !== filterSeverity) return false;
    if (filterStatus !== 'ALL' && p.status !== filterStatus) return false;
    if (filterSource !== 'ALL' && !p.source.includes(filterSource)) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchId = p.id.toLowerCase().includes(q) || (p.shortId && p.shortId.toLowerCase().includes(q));
      const matchLoc = p.locationName.toLowerCase().includes(q) || p.roadName.toLowerCase().includes(q);
      if (!matchId && !matchLoc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Controls Toolbar */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" /> Bengaluru Live Pothole Spatial Map
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Demo Data
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time map markers synchronized with BMTC AI Vision and citizen civic reports.
            </p>
          </div>

          {/* Legend Pills */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-rose-500 ring-2 ring-rose-500/30"></span> 🔴 Severe / Critical
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-500/30"></span> 🟠 Moderate
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-yellow-500 ring-2 ring-yellow-500/30"></span> 🟡 Minor
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30"></span> 🟢 Fixed & Verified
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-800">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search locality or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Severity Filter */}
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="ALL">Filter Severity: All</option>
            <option value="Severe">🔴 Severe Only</option>
            <option value="Moderate">🟠 Moderate Only</option>
            <option value="Minor">🟡 Minor Only</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="ALL">Filter Status: All</option>
            <option value="Pending">Pending Review</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Fixed">Fixed / Proof Submitted</option>
            <option value="Verified">Verified & Closed</option>
          </select>

          {/* Source Filter */}
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="ALL">Source: All Sources</option>
            <option value="BMTC">🤖 AI + BMTC Buses</option>
            <option value="Public">👤 Citizen Reports</option>
          </select>

        </div>

      </div>

      {/* LEAFLET INTERACTIVE MAP CONTAINER */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[580px] z-10">
        
        <MapContainer
          center={mapCenter}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <MapViewSetter center={mapCenter} />
          
          {/* Dark Mode Tile Layer from CartoDB */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {filteredPotholes.map((item) => (
            <Marker
              key={item.id}
              position={[item.coordinates.lat, item.coordinates.lng]}
              icon={createCustomIcon(item.severity, item.status)}
            >
              <Popup>
                <div className="w-64 space-y-2 p-1 font-sans">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      {item.shortId || item.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'Fixed' || item.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-300' :
                      item.severity === 'Severe' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Photo Thumbnail */}
                  <div className="h-28 rounded-lg overflow-hidden relative">
                    <img src={item.imageOriginal} alt={item.locationName} className="w-full h-full object-cover" />
                    <div className="absolute bottom-1 left-1 bg-slate-950/80 px-2 py-0.5 rounded text-[9px] text-slate-300 font-mono">
                      GPS: {item.coordinates.lat}, {item.coordinates.lng}
                    </div>
                  </div>

                  {/* Location Info */}
                  <div>
                    <h4 className="font-bold text-xs text-white leading-snug">{item.locationName}</h4>
                    <p className="text-[11px] text-slate-400">{item.roadName}</p>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-1 text-[10px] pt-1 text-slate-300">
                    <div>
                      <span className="text-slate-400">Severity: </span>
                      <span className="font-semibold">{item.severity}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Source: </span>
                      <span className="font-semibold">{item.source}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400">Detected: </span>
                      <span>{new Date(item.detectionTimestamp).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => onViewDetails(item)}
                    className="w-full mt-2 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> View BBMP Report Details
                  </button>

                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map Overlay Quick Jump Chips */}
        <div className="absolute bottom-4 left-4 z-[400] flex flex-wrap gap-2 max-w-xl">
          <span className="text-[10px] font-bold text-slate-400 bg-slate-950/90 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
            Quick Jump:
          </span>
          {[
            { label: 'Jayanagar', coords: [12.9279, 77.5824] },
            { label: 'Koramangala', coords: [12.9352, 77.6245] },
            { label: 'Banashankari', coords: [12.9254, 77.5647] },
            { label: 'Outer Ring Road', coords: [12.9172, 77.6228] },
            { label: 'Whitefield', coords: [12.9830, 77.7500] },
            { label: 'JP Nagar', coords: [12.9081, 77.5855] }
          ].map((loc, idx) => (
            <button
              key={idx}
              onClick={() => setMapCenter(loc.coords)}
              className="text-[11px] font-semibold bg-slate-900/90 hover:bg-slate-800 text-cyan-300 px-2.5 py-1 rounded-lg border border-slate-700 backdrop-blur-md shadow-md transition-colors"
            >
              📍 {loc.label}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}
