import React from 'react';
import { Bus, Building2, Heart, ShieldAlert } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 py-10 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
              <Bus className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                SMART POTHOLE DETECTOR – BENGALURU
              </div>
              <div className="text-[11px] text-slate-500">
                AI-Powered Road Monitoring & Civic Repair Platform • Student Project Prototype
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <button onClick={() => onNavigate('landing')} className="hover:text-cyan-300">Home</button>
            <button onClick={() => onNavigate('map')} className="hover:text-cyan-300">Spatial Map</button>
            <button onClick={() => onNavigate('ai-center')} className="hover:text-cyan-300">AI Sensor Unit</button>
            <button onClick={() => onNavigate('bbmp-dashboard')} className="hover:text-cyan-300">BBMP Center</button>
            <button onClick={() => onNavigate('repair-portal')} className="hover:text-cyan-300">Contractor Portal</button>
            <button onClick={() => onNavigate('tracking')} className="hover:text-cyan-300">Track & Feedback</button>
            <button onClick={() => onNavigate('heatmap')} className="hover:text-cyan-300">Risk Heatmap</button>
            <button onClick={() => onNavigate('db-schema')} className="hover:text-cyan-300">DB Schema</button>
          </div>

        </div>

        {/* Disclaimer & Credits */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            ⚠️ <strong>Disclaimer:</strong> This is a college social-impact project prototype designed as BBMP-integration-ready. It is not directly connected to BBMP live servers.
          </div>
          <div className="flex items-center gap-1">
            Built for Bengaluru Civic Road Safety
          </div>
        </div>

      </div>
    </footer>
  );
}
