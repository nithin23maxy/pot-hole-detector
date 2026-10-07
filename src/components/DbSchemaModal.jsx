import React, { useState } from 'react';
import { 
  Database, 
  Code2, 
  Server, 
  Table, 
  Copy, 
  Check, 
  ShieldCheck, 
  FileText,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function DbSchemaModal() {
  const [copiedSection, setCopiedSection] = useState(null);

  const handleCopy = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const sqlSchema = `-- ============================================================
-- SMART POTHOLE DETECTOR BENGALURU - DATABASE SCHEMA (POSTGRESQL / SQLITE)
-- BBMP & BMTC Integration Ready Prototype
-- ============================================================

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(20),
    role VARCHAR(30) CHECK (role IN ('PUBLIC_CITIZEN', 'BBMP_OFFICER', 'REPAIR_CONTRACTOR')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sensor_detections (
    detection_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id VARCHAR(50) NOT NULL, -- e.g. BMTC-PD-007
    bus_number VARCHAR(50),
    bus_route VARCHAR(100),
    motion_anomaly_score NUMERIC(5,2), -- e.g. 3.4g Z-spike
    ai_confidence_score NUMERIC(5,2), -- e.g. 94.50%
    severity VARCHAR(20) CHECK (severity IN ('Minor', 'Moderate', 'Severe')),
    latitude NUMERIC(10,7) NOT NULL,
    longitude NUMERIC(10,7) NOT NULL,
    detection_image_url TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pothole_reports (
    report_id VARCHAR(50) PRIMARY KEY, -- e.g. PTH-BLR-2026-00125
    latitude NUMERIC(10,7) NOT NULL,
    longitude NUMERIC(10,7) NOT NULL,
    location_name VARCHAR(150) NOT NULL,
    road_name VARCHAR(200) NOT NULL,
    landmark VARCHAR(200),
    image_original_url TEXT NOT NULL,
    image_ai_annotated_url TEXT,
    severity VARCHAR(20) CHECK (severity IN ('Minor', 'Moderate', 'Severe')),
    source VARCHAR(30) CHECK (source IN ('AI + BMTC', 'Public', 'City Inspector')),
    description TEXT,
    reporter_user_id UUID REFERENCES users(user_id),
    bmtc_detection_id UUID REFERENCES sensor_detections(detection_id),
    status VARCHAR(30) CHECK (status IN ('Pending', 'Assigned', 'In Progress', 'Fixed', 'Verified', 'Rejected')) DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE work_orders (
    work_order_id VARCHAR(50) PRIMARY KEY, -- e.g. WO-BLR-2026-118
    report_id VARCHAR(50) REFERENCES pothole_reports(report_id) ON DELETE CASCADE,
    assigned_team VARCHAR(100) NOT NULL,
    contractor_name VARCHAR(150) NOT NULL,
    assigned_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    target_completion_date DATE
);

CREATE TABLE repair_verifications (
    verification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id VARCHAR(50) REFERENCES pothole_reports(report_id) ON DELETE CASCADE,
    before_photo_url TEXT NOT NULL,
    after_photo_url TEXT NOT NULL,
    completion_latitude NUMERIC(10,7) NOT NULL,
    completion_longitude NUMERIC(10,7) NOT NULL,
    gps_distance_diff_meters NUMERIC(6,2),
    materials_used TEXT,
    contractor_notes TEXT,
    verified_by_officer_id UUID REFERENCES users(user_id),
    decision VARCHAR(30) CHECK (decision IN ('VERIFIED_AND_FIXED', 'REWORK_REQUIRED')),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE citizen_feedback (
    feedback_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id VARCHAR(50) REFERENCES pothole_reports(report_id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    is_properly_repaired BOOLEAN,
    is_road_safe BOOLEAN,
    is_satisfactory BOOLEAN,
    comments TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`;

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Backend Integration Ready Prototype Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Database Schema & REST API Inspector
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Complete entity-relationship database design, schema definitions, and REST endpoints for BBMP central server integration.
          </p>
        </div>

        <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-2xl text-xs font-mono text-cyan-300">
          STATUS: BBMP READY SCHEMA (V1.0)
        </div>
      </div>

      {/* SCHEMA ENTITY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
            <Table className="w-4 h-4" /> USERS Table
          </div>
          <ul className="text-xs text-slate-300 font-mono space-y-1 list-disc list-inside">
            <li>user_id (UUID PK)</li>
            <li>name (VARCHAR)</li>
            <li>email (VARCHAR)</li>
            <li>role (CITIZEN / BBMP / CONTRACTOR)</li>
          </ul>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs">
            <Table className="w-4 h-4" /> POTHOLE_REPORTS Table
          </div>
          <ul className="text-xs text-slate-300 font-mono space-y-1 list-disc list-inside">
            <li>report_id (VARCHAR PK)</li>
            <li>latitude & longitude (NUMERIC)</li>
            <li>severity (Minor, Moderate, Severe)</li>
            <li>status (Pending, Assigned, Verified)</li>
          </ul>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
            <Table className="w-4 h-4" /> SENSOR_DETECTIONS Table
          </div>
          <ul className="text-xs text-slate-300 font-mono space-y-1 list-disc list-inside">
            <li>detection_id (UUID PK)</li>
            <li>device_id (BMTC-PD-007)</li>
            <li>motion_anomaly_score (3.4g)</li>
            <li>ai_confidence_score (94%)</li>
          </ul>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs">
            <Table className="w-4 h-4" /> WORK_ORDERS Table
          </div>
          <ul className="text-xs text-slate-300 font-mono space-y-1 list-disc list-inside">
            <li>work_order_id (VARCHAR PK)</li>
            <li>report_id (FK)</li>
            <li>assigned_team (VARCHAR)</li>
            <li>target_completion_date</li>
          </ul>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
            <Table className="w-4 h-4" /> REPAIR_VERIFICATIONS Table
          </div>
          <ul className="text-xs text-slate-300 font-mono space-y-1 list-disc list-inside">
            <li>verification_id (UUID PK)</li>
            <li>before_photo & after_photo</li>
            <li>completion_latitude & longitude</li>
            <li>gps_distance_diff_meters</li>
          </ul>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-teal-400 font-bold text-xs">
            <Table className="w-4 h-4" /> CITIZEN_FEEDBACK Table
          </div>
          <ul className="text-xs text-slate-300 font-mono space-y-1 list-disc list-inside">
            <li>feedback_id (UUID PK)</li>
            <li>rating (1 to 5 Stars)</li>
            <li>is_properly_repaired (BOOL)</li>
            <li>comments (TEXT)</li>
          </ul>
        </div>

      </div>

      {/* CODE VIEW BOX FOR SQL SCHEMA */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl space-y-3">
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-300">
            <Code2 className="w-4 h-4" /> schema.sql (PostgreSQL DDL)
          </div>
          <button
            onClick={() => handleCopy(sqlSchema, 'sql')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            {copiedSection === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedSection === 'sql' ? 'Copied SQL!' : 'Copy SQL Schema'}
          </button>
        </div>

        <pre className="p-6 text-xs font-mono text-cyan-200/90 overflow-x-auto leading-relaxed bg-slate-950/90 max-h-96 no-scrollbar">
          {sqlSchema}
        </pre>
      </div>

    </div>
  );
}
