import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Activity, 
  Cpu, 
  CheckCircle2,
  Users
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AnalyticsView({ stats }) {
  
  // 1. Monthly Detection Trends Chart
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct 2026'],
    datasets: [
      {
        fill: true,
        label: 'BMTC AI Detections',
        data: [42, 55, 68, 80, 95, 112, 130, 145, 162, 178],
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.15)',
        tension: 0.4,
      },
      {
        fill: true,
        label: 'Public Citizen Reports',
        data: [15, 22, 30, 38, 45, 52, 60, 72, 85, 94],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        tension: 0.4,
      }
    ]
  };

  // 2. Severity Breakdown Donut Chart
  const severityData = {
    labels: ['🔴 Severe / Critical', '🟠 Moderate', '🟡 Minor'],
    datasets: [
      {
        data: [54, 42, 28],
        backgroundColor: ['#ef4444', '#f59e0b', '#eab308'],
        borderColor: '#0f172a',
        borderWidth: 2,
      }
    ]
  };

  // 3. Reports by Source Doughnut Chart
  const sourceData = {
    labels: ['AI + BMTC Buses (68%)', 'Public Citizens (28%)', 'City Inspection (4%)'],
    datasets: [
      {
        data: [68, 28, 4],
        backgroundColor: ['#10b981', '#06b6d4', '#8b5cf6'],
        borderColor: '#0f172a',
        borderWidth: 2,
      }
    ]
  };

  // 4. Verification vs Pipeline Bar Chart
  const pipelineData = {
    labels: ['Pending Triage', 'Assigned', 'In Progress', 'Fixed (Proof Submitted)', 'BBMP Verified'],
    datasets: [
      {
        label: 'Incident Counts',
        data: [stats?.pending || 48, stats?.assigned || 31, stats?.inProgress || 19, stats?.fixed || 26, stats?.verified || 18],
        backgroundColor: ['#ef4444', '#f59e0b', '#06b6d4', '#10b981', '#34d399'],
        borderRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1
      }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', font: { size: 10 } } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', font: { size: 10 } } }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Civic Intelligence & Machine Learning Analytics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Civic Analytics Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Real-time analytics tracking pothole incidence trends, AI vs Public detection accuracy, repair pipeline throughput, and road safety index.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <TrendingUp className="w-8 h-8 text-emerald-400" />
          <div className="text-xs">
            <span className="text-slate-400 block">Road Safety Improvement:</span>
            <span className="text-lg font-extrabold text-emerald-300">+76.4% YoY</span>
          </div>
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-medium">Avg Repair Resolution Time</span>
          <h4 className="text-2xl font-black text-cyan-300">2.4 Days</h4>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 42% Faster than 2025 baseline
          </span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-medium">AI Sensor Precision Rate</span>
          <h4 className="text-2xl font-black text-emerald-400">96.2%</h4>
          <span className="text-[10px] text-cyan-300 font-mono">YOLOv8 Road Vision Engine</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-medium">Verified Repair Pipeline</span>
          <h4 className="text-2xl font-black text-amber-400">{stats?.verified || 18} / {stats?.total || 124}</h4>
          <span className="text-[10px] text-amber-300">Closed-loop verified</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-medium">Active BMTC Bus Scanners</span>
          <h4 className="text-2xl font-black text-indigo-300">45 Buses</h4>
          <span className="text-[10px] text-slate-400">2,400 KM Daily Scanning</span>
        </div>

      </div>

      {/* CHARTS GRID ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Trend Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" /> Potholes Detected Per Month (Jan - Oct 2026)
            </h3>
            <span className="text-xs text-slate-400 font-mono">BMTC AI vs Public</span>
          </div>
          <div className="h-72">
            <Line data={monthlyData} options={chartOptions} />
          </div>
        </div>

        {/* Severity Distribution Donut */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-400" /> Severity Breakdown
          </h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={severityData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

      </div>

      {/* CHARTS GRID ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Detection Source Breakdown */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" /> Reports by Source Breakdown
          </h3>
          <div className="h-64 flex items-center justify-center">
            <Pie data={sourceData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Repair Pipeline Bar Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" /> Verified vs Pending Repair Pipeline
          </h3>
          <div className="h-64">
            <Bar data={pipelineData} options={chartOptions} />
          </div>
        </div>

      </div>

    </div>
  );
}
