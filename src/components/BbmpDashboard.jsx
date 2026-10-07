import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Wrench, 
  ShieldCheck, 
  UserCheck,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function BbmpDashboard({ potholes, onSelectReport, stats }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState('ALL');

  const filteredPotholes = potholes.filter(item => {
    if (selectedStatusFilter !== 'ALL' && item.status !== selectedStatusFilter) return false;
    if (selectedSeverityFilter !== 'ALL' && item.severity !== selectedSeverityFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchId = item.id.toLowerCase().includes(q) || (item.shortId && item.shortId.toLowerCase().includes(q));
      const matchLoc = item.locationName.toLowerCase().includes(q) || item.roadName.toLowerCase().includes(q);
      if (!matchId && !matchLoc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Bruhat Bengaluru Mahanagara Palike (BBMP) • Central Command</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            BBMP ROAD MONITORING CENTER
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Triage center for civic road maintenance. Review AI sensor detections and public reports, issue work orders to contractor teams, and verify proof of completion.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 p-4 rounded-2xl flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
            BLR
          </div>
          <div className="text-xs">
            <div className="font-bold text-white">BBMP Zone: Central & East</div>
            <div className="text-slate-400 text-[11px]">Officer Duty ID: BBMP-ENG-4022</div>
          </div>
        </div>
      </div>

      {/* DASHBOARD STATISTICS SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div 
          onClick={() => setSelectedStatusFilter('ALL')}
          className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedStatusFilter === 'ALL' ? 'border-cyan-500 ring-1 ring-cyan-500 bg-slate-900' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] font-medium text-slate-400">Total Reports</span>
          <h4 className="text-2xl font-black text-white mt-1">{stats?.total || 124}</h4>
          <span className="text-[10px] text-cyan-400 font-medium">All Incidents</span>
        </div>

        <div 
          onClick={() => setSelectedStatusFilter('Pending')}
          className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedStatusFilter === 'Pending' ? 'border-rose-500 ring-1 ring-rose-500 bg-slate-900' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] font-medium text-slate-400">Pending</span>
          <h4 className="text-2xl font-black text-rose-400 mt-1">{stats?.pending || 48}</h4>
          <span className="text-[10px] text-rose-300 font-medium">Action Required</span>
        </div>

        <div 
          onClick={() => setSelectedStatusFilter('Assigned')}
          className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedStatusFilter === 'Assigned' ? 'border-amber-500 ring-1 ring-amber-500 bg-slate-900' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] font-medium text-slate-400">Assigned</span>
          <h4 className="text-2xl font-black text-amber-400 mt-1">{stats?.assigned || 31}</h4>
          <span className="text-[10px] text-amber-300 font-medium">Work Order Issued</span>
        </div>

        <div 
          onClick={() => setSelectedStatusFilter('In Progress')}
          className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedStatusFilter === 'In Progress' ? 'border-cyan-500 ring-1 ring-cyan-500 bg-slate-900' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] font-medium text-slate-400">In Progress</span>
          <h4 className="text-2xl font-black text-cyan-400 mt-1">{stats?.inProgress || 19}</h4>
          <span className="text-[10px] text-cyan-300 font-medium">Under Repair</span>
        </div>

        <div 
          onClick={() => setSelectedStatusFilter('Fixed')}
          className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedStatusFilter === 'Fixed' ? 'border-emerald-500 ring-1 ring-emerald-500 bg-slate-900' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] font-medium text-slate-400">Fixed</span>
          <h4 className="text-2xl font-black text-emerald-400 mt-1">{stats?.fixed || 26}</h4>
          <span className="text-[10px] text-emerald-300 font-medium">Awaiting Audit</span>
        </div>

        <div 
          onClick={() => setSelectedStatusFilter('Verified')}
          className={`glass-panel p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedStatusFilter === 'Verified' ? 'border-emerald-400 ring-1 ring-emerald-400 bg-slate-900' : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <span className="text-[11px] font-medium text-slate-400">Verified</span>
          <h4 className="text-2xl font-black text-emerald-300 mt-1">{stats?.verified || 18}</h4>
          <span className="text-[10px] text-emerald-400 font-medium">Verified & Fixed</span>
        </div>

      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Complaint ID or Location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="ALL">Status: All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Fixed">Fixed (Awaiting BBMP)</option>
            <option value="Verified">Verified & Fixed</option>
          </select>

          <select
            value={selectedSeverityFilter}
            onChange={(e) => setSelectedSeverityFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="ALL">Severity: All</option>
            <option value="Severe">🔴 Severe</option>
            <option value="Moderate">🟠 Moderate</option>
            <option value="Minor">🟡 Minor</option>
          </select>
        </div>

      </div>

      {/* COMPLAINT INCIDENTS DATATABLE */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            
            <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Complaint ID</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Severity</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredPotholes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No matching complaint reports found in BBMP database.
                  </td>
                </tr>
              ) : (
                filteredPotholes.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">
                    
                    {/* Complaint ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                      {item.shortId || item.id}
                      <span className="block text-[10px] text-slate-500 font-sans font-normal">
                        {new Date(item.detectionTimestamp).toLocaleDateString()}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{item.locationName}</div>
                      <div className="text-[10px] text-slate-400">{item.roadName}</div>
                    </td>

                    {/* Severity */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        item.severity === 'Severe' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                        item.severity === 'Moderate' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                      }`}>
                        {item.severity === 'Severe' && '🔴'}
                        {item.severity === 'Moderate' && '🟠'}
                        {item.severity === 'Minor' && '🟡'}
                        {item.severity}
                      </span>
                    </td>

                    {/* Source */}
                    <td className="py-3.5 px-4 font-medium">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                        {item.source}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        item.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        item.status === 'Fixed' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                        item.status === 'In Progress' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' :
                        item.status === 'Assigned' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Action View Button */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectReport(item)}
                        className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}
