import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { 
  Flame, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  MapPin,
  Layers
} from 'lucide-react';
import { ROAD_RISK_ZONES } from '../data/mockPotholes';

export default function RoadHeatmap() {
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');

  const filteredZones = ROAD_RISK_ZONES.filter(z => {
    if (selectedRiskFilter !== 'ALL' && z.riskLevel !== selectedRiskFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Spatial Road Risk & Deterioration Heatmap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Road Risk Heatmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Bengaluru carriageway deterioration analysis calculated from BMTC repeat vibration anomaly frequency, severity clustering, and civic repair latency.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <select
            value={selectedRiskFilter}
            onChange={(e) => setSelectedRiskFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-rose-500"
          >
            <option value="ALL">Risk Level: All Zones</option>
            <option value="High Risk">🔴 High Risk Only</option>
            <option value="Medium Risk">🟠 Medium Risk Only</option>
            <option value="Low Risk">🟢 Low Risk Only</option>
          </select>
        </div>
      </div>

      {/* SECTION 12 HIGHLIGHT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Most Affected Zone */}
        <div className="glass-panel p-5 rounded-2xl border border-rose-500/40 space-y-2">
          <div className="flex items-center justify-between text-xs text-rose-400 font-bold">
            <span>MOST AFFECTED ZONE</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h4 className="text-base font-extrabold text-white">Outer Ring Road Corridor</h4>
          <p className="text-xs text-slate-400">Silk Board ↔ Bellandur Flyover</p>
          <div className="text-[11px] text-rose-300 font-mono font-bold pt-2 border-t border-slate-800">
            38 Active Pothole Incidents
          </div>
        </div>

        {/* Card 2: Highest Severity Zone */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/40 space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
            <span>HIGHEST SEVERITY ZONE</span>
            <Flame className="w-4 h-4" />
          </div>
          <h4 className="text-base font-extrabold text-white">Bannerghatta Road</h4>
          <p className="text-xs text-slate-400">Dairy Circle to Arekere Gate</p>
          <div className="text-[11px] text-amber-300 font-mono font-bold pt-2 border-t border-slate-800">
            79/100 Pavement Degradation Score
          </div>
        </div>

        {/* Card 3: Longest Pending Repair */}
        <div className="glass-panel p-5 rounded-2xl border border-indigo-500/40 space-y-2">
          <div className="flex items-center justify-between text-xs text-indigo-400 font-bold">
            <span>LONGEST PENDING REPAIR</span>
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="text-base font-extrabold text-white">JP Nagar 6th Phase</h4>
          <p className="text-xs text-slate-400">15th Cross Drain Subsidence</p>
          <div className="text-[11px] text-indigo-300 font-mono font-bold pt-2 border-t border-slate-800">
            Pending 14 Days (Delayed Audit)
          </div>
        </div>

        {/* Card 4: Most Improved Road */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/40 space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
            <span>MOST IMPROVED ROAD</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h4 className="text-base font-extrabold text-white">Indiranagar 100ft Road</h4>
          <p className="text-xs text-slate-400">12th Main to Domlur Flyover</p>
          <div className="text-[11px] text-emerald-300 font-mono font-bold pt-2 border-t border-slate-800">
            100% Potholes Verified & Fixed
          </div>
        </div>

      </div>

      {/* HEATMAP LEAFLET MAP VIEW */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[520px] z-10">
        <MapContainer
          center={[12.9352, 77.6245]}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {filteredZones.map((zone, idx) => (
            <React.Fragment key={idx}>
              {/* Outer Heat Density Ring */}
              <CircleMarker
                center={[zone.coordinates.lat, zone.coordinates.lng]}
                radius={zone.potholesCount * 1.2}
                pathOptions={{
                  color: zone.color,
                  fillColor: zone.color,
                  fillOpacity: 0.25,
                  stroke: false
                }}
              />
              {/* Inner Focus Pin */}
              <CircleMarker
                center={[zone.coordinates.lat, zone.coordinates.lng]}
                radius={10}
                pathOptions={{
                  color: zone.color,
                  fillColor: '#0f172a',
                  fillOpacity: 0.9,
                  weight: 3
                }}
              >
                <Popup>
                  <div className="p-1 font-sans space-y-2 w-56">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                      <span className="font-bold text-xs text-white">{zone.zoneName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ color: zone.color, background: `${zone.color}20` }}>
                        {zone.riskLevel}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 space-y-1">
                      <div>Active Potholes: <strong className="text-white">{zone.potholesCount}</strong></div>
                      <div>Avg Repair Delay: <strong>{zone.avgRepairDelay}</strong></div>
                      <div>Road Deterioration Index: <strong>{zone.roadDeteriorationIndex}</strong></div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            </React.Fragment>
          ))}
        </MapContainer>

        {/* Legend Overlay */}
        <div className="absolute top-4 right-4 z-[400] glass-panel p-3 rounded-2xl border border-slate-800 text-xs space-y-2">
          <div className="font-bold text-white text-[11px]">Heatmap Density Legend</div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span> High Risk Density Zone
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span> Medium Deterioration
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Low / Resilient Segment
          </div>
        </div>

      </div>

    </div>
  );
}
