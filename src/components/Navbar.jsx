import React from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Cpu, 
  Building2, 
  Wrench, 
  Search, 
  Flame, 
  BarChart3, 
  Database,
  UserCheck,
  PlusCircle,
  Bus
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, activeRole, setActiveRole, onOpenReportModal, stats }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      {/* Top Banner Disclaimer */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 px-4 py-1 text-xs text-slate-300 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            STUDENT PROJECT PROTOTYPE
          </span>
          <span className="hidden sm:inline text-slate-400">
            BBMP-Integration-Ready Platform • Powered by BMTC Moving Data Collectors
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            System Online: {stats?.total || 124} Reports Tracked
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('landing')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-bmtc-green to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bus className="w-5 h-5 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  SMART POTHOLE DETECTOR
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-bmtc-green/20 text-emerald-300 border border-emerald-500/30 rounded">
                  BLR
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wider">
                BMTC AI Collector Network & BBMP Civic Repair
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { id: 'landing', label: 'Home', icon: Bus },
              { id: 'map', label: 'Live Map', icon: MapPin },
              { id: 'ai-center', label: 'AI Detection Center', icon: Cpu, badge: 'LIVE' },
              { id: 'bbmp-dashboard', label: 'BBMP Center', icon: Building2, count: stats?.pending || 48 },
              { id: 'repair-portal', label: 'Repair Team', icon: Wrench },
              { id: 'tracking', label: 'Track & Feedback', icon: Search },
              { id: 'heatmap', label: 'Heatmap & Risk', icon: Flame },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'db-schema', label: 'DB & API', icon: Database },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 relative ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1 py-0.2 text-[9px] font-bold bg-rose-500 text-white rounded animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Role Selector & Quick Action Button */}
          <div className="flex items-center gap-3">
            
            {/* Role Switcher Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-1 text-xs">
              <span className="text-[10px] text-slate-400 px-2 hidden xl:inline flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-cyan-400" /> Demo Role:
              </span>
              <select
                value={activeRole}
                onChange={(e) => {
                  setActiveRole(e.target.value);
                  if (e.target.value === 'bbmp') setActiveTab('bbmp-dashboard');
                  else if (e.target.value === 'repair') setActiveTab('repair-portal');
                }}
                className="bg-slate-800 text-cyan-300 text-xs font-semibold rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-500 border border-slate-700 cursor-pointer"
              >
                <option value="public">👤 Citizen / Public</option>
                <option value="bbmp">🏛️ BBMP Officer</option>
                <option value="repair">🛠️ Repair Team Contractor</option>
              </select>
            </div>

            {/* Quick Report Button */}
            <button
              onClick={onOpenReportModal}
              className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Report Pothole</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-800/60 no-scrollbar">
          {[
            { id: 'landing', label: 'Home', icon: Bus },
            { id: 'map', label: 'Map', icon: MapPin },
            { id: 'ai-center', label: 'AI Center', icon: Cpu },
            { id: 'bbmp-dashboard', label: 'BBMP', icon: Building2 },
            { id: 'repair-portal', label: 'Repair', icon: Wrench },
            { id: 'tracking', label: 'Track', icon: Search },
            { id: 'heatmap', label: 'Heatmap', icon: Flame },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'db-schema', label: 'DB', icon: Database },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium shrink-0 flex items-center gap-1 ${
                  isActive ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
