import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import PotholeMap from './components/PotholeMap';
import AiDetectionCenter from './components/AiDetectionCenter';
import BbmpDashboard from './components/BbmpDashboard';
import BbmpReportDetailModal from './components/BbmpReportDetailModal';
import RepairTeamPortal from './components/RepairTeamPortal';
import ProofOfCompletionModal from './components/ProofOfCompletionModal';
import PublicTracker from './components/PublicTracker';
import ReportForm from './components/ReportForm';
import RoadHeatmap from './components/RoadHeatmap';
import AnalyticsView from './components/AnalyticsView';
import DbSchemaModal from './components/DbSchemaModal';
import Footer from './components/Footer';
import { INITIAL_POTHOLES } from './data/mockPotholes';

export default function App() {
  const [potholes, setPotholes] = useState(() => {
    const saved = localStorage.getItem('smart_pothole_blr_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_POTHOLES; }
    }
    return INITIAL_POTHOLES;
  });

  const [activeTab, setActiveTab] = useState('landing');
  const [activeRole, setActiveRole] = useState('public');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReportForDetail, setSelectedReportForDetail] = useState(null);
  const [selectedReportForVerification, setSelectedReportForVerification] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('smart_pothole_blr_data', JSON.stringify(potholes));
  }, [potholes]);

  // Calculated Stats Ticker
  const stats = {
    total: potholes.length,
    pending: potholes.filter(p => p.status === 'Pending').length,
    assigned: potholes.filter(p => p.status === 'Assigned').length,
    inProgress: potholes.filter(p => p.status === 'In Progress').length,
    fixed: potholes.filter(p => p.status === 'Fixed').length,
    verified: potholes.filter(p => p.status === 'Verified').length,
  };

  // Handlers
  const handleAddNewReport = (newReport) => {
    setPotholes(prev => [newReport, ...prev]);
  };

  const handleUpdateReportStatus = (reportId, updates) => {
    setPotholes(prev => prev.map(item => {
      if (item.id === reportId) {
        return { ...item, ...updates };
      }
      return item;
    }));
    if (selectedReportForDetail?.id === reportId) {
      setSelectedReportForDetail(prev => ({ ...prev, ...updates }));
    }
  };

  const handleAiDetectionPush = (aiAlert) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newReport = {
      id: `PTH-BLR-2026-${randomNum}`,
      shortId: `PTH-BLR-${randomNum.toString().slice(-4)}`,
      locationName: aiAlert.location || "Koramangala 80ft Road",
      roadName: "80 Feet Road Junction",
      landmark: "Near Bus Stop",
      coordinates: { lat: 12.9352, lng: 77.6245 },
      severity: aiAlert.severity === 'SEVERE' ? 'Severe' : 'Moderate',
      source: "AI + BMTC",
      status: "Pending",
      detectionTimestamp: new Date().toISOString(),
      bmtcUnitId: "BMTC-PD-007",
      bmtcRoute: aiAlert.route || "Route 500D",
      aiConfidence: aiAlert.aiConfidence,
      vibrationAnomalyScore: aiAlert.motionAnomaly,
      reporterName: "Automated BMTC Telemetry",
      reporterContact: "bmtc-ai-node-007@bengaluru.gov.in",
      description: "Automated real-time detection by BMTC camera & accelerometer sensor fusion.",
      imageOriginal: aiAlert.image,
      imageAiAnnotated: aiAlert.image,
      workOrder: null,
      repairDetails: null
    };

    handleAddNewReport(newReport);
    setActiveTab('bbmp-dashboard');
  };

  const handleSubmitRepairCompletion = (reportId, repairPayload) => {
    handleUpdateReportStatus(reportId, {
      status: 'Fixed',
      repairDetails: repairPayload
    });
  };

  const handleVerifyRepair = (reportId) => {
    handleUpdateReportStatus(reportId, {
      status: 'Verified',
      repairDetails: {
        ...(potholes.find(p => p.id === reportId)?.repairDetails || {}),
        verificationStatus: 'Verified & Fixed',
        verifiedTimestamp: new Date().toISOString()
      }
    });
    setSelectedReportForVerification(null);
  };

  const handleRejectRepair = (reportId) => {
    handleUpdateReportStatus(reportId, {
      status: 'In Progress',
      repairDetails: {
        ...(potholes.find(p => p.id === reportId)?.repairDetails || {}),
        verificationStatus: 'Rework Required (Rejected by BBMP Audit)',
      }
    });
    setSelectedReportForVerification(null);
  };

  const handleCitizenFeedback = (reportId, feedbackPayload) => {
    handleUpdateReportStatus(reportId, {
      feedback: feedbackPayload
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      
      {/* Top Sticky Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        stats={stats}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'landing' && (
          <LandingPage
            onNavigate={setActiveTab}
            onOpenReportModal={() => setIsReportModalOpen(true)}
            stats={stats}
          />
        )}

        {activeTab === 'map' && (
          <PotholeMap
            potholes={potholes}
            onViewDetails={(item) => setSelectedReportForDetail(item)}
          />
        )}

        {activeTab === 'ai-center' && (
          <AiDetectionCenter
            onTriggerNewDetection={handleAiDetectionPush}
            onCreateBbmpReport={handleAiDetectionPush}
          />
        )}

        {activeTab === 'bbmp-dashboard' && (
          <BbmpDashboard
            potholes={potholes}
            onSelectReport={(item) => setSelectedReportForDetail(item)}
            stats={stats}
          />
        )}

        {activeTab === 'repair-portal' && (
          <RepairTeamPortal
            potholes={potholes}
            onSubmitRepairCompletion={handleSubmitRepairCompletion}
          />
        )}

        {activeTab === 'tracking' && (
          <PublicTracker
            potholes={potholes}
            onSubmitFeedback={handleCitizenFeedback}
          />
        )}

        {activeTab === 'heatmap' && (
          <RoadHeatmap />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView stats={stats} />
        )}

        {activeTab === 'db-schema' && (
          <DbSchemaModal />
        )}
      </main>

      {/* REPORT SUBMISSION MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl my-8">
            <ReportForm
              onSubmitSuccess={(newReport) => {
                handleAddNewReport(newReport);
              }}
              onClose={() => setIsReportModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* BBMP REPORT DETAIL DRAWER MODAL */}
      {selectedReportForDetail && (
        <BbmpReportDetailModal
          report={selectedReportForDetail}
          onClose={() => setSelectedReportForDetail(null)}
          onUpdateReportStatus={handleUpdateReportStatus}
          onOpenVerificationModal={(rep) => {
            setSelectedReportForDetail(null);
            setSelectedReportForVerification(rep);
          }}
        />
      )}

      {/* BBMP OFFICER VERIFICATION MODAL */}
      {selectedReportForVerification && (
        <ProofOfCompletionModal
          report={selectedReportForVerification}
          onClose={() => setSelectedReportForVerification(null)}
          onVerifyRepair={handleVerifyRepair}
          onRejectRepair={handleRejectRepair}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

    </div>
  );
}
