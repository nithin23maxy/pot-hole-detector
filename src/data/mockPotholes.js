// Initial mock state for Smart Pothole Detector - Bengaluru (BBMP Integration Prototype)

export const INITIAL_POTHOLES = [
  {
    id: "PTH-BLR-2026-00125",
    shortId: "PTH-BLR-00125",
    locationName: "Jayanagar 4th Block",
    roadName: "11th Main Road, Near Bus Stand",
    landmark: "Opposite South End Metro Station",
    coordinates: { lat: 12.9279, lng: 77.5824 },
    severity: "Severe", // Severe, Moderate, Minor
    source: "AI + BMTC", // AI + BMTC, Public, City Inspector
    status: "Pending", // Pending, Assigned, In Progress, Fixed, Verified
    detectionTimestamp: "2026-10-07T10:42:00",
    bmtcUnitId: "BMTC-PD-007",
    bmtcRoute: "Route 215 (Banashankari to Majestic)",
    aiConfidence: 94,
    vibrationAnomalyScore: "3.4g (High Z-Spike)",
    reporterName: "Automated BMTC Telemetry",
    reporterContact: "bmtc-ai-node-007@bengaluru.gov.in",
    description: "Deep double-crater pothole detected on outer lane during regular bus travel. Poses high risk to two-wheelers.",
    imageOriginal: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    imageAiAnnotated: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    workOrder: null,
    repairDetails: null
  },
  {
    id: "PTH-BLR-2026-00124",
    shortId: "PTH-BLR-00124",
    locationName: "Koramangala 5th Block",
    roadName: "80 Feet Road, Near Sony World Signal",
    landmark: "Adjacent to Oasis Centre",
    coordinates: { lat: 12.9352, lng: 77.6245 },
    severity: "Moderate",
    source: "Public",
    status: "Assigned",
    detectionTimestamp: "2026-10-06T14:15:00",
    bmtcUnitId: "N/A",
    bmtcRoute: "N/A",
    aiConfidence: 87,
    vibrationAnomalyScore: "N/A",
    reporterName: "Rajesh Kumar",
    reporterContact: "+91 98450 12345",
    description: "Edge breakdown forming medium pothole right before turning into 80ft road. Water accumulation observed.",
    imageOriginal: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    imageAiAnnotated: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    workOrder: {
      workOrderId: "WO-BLR-2026-118",
      assignedTeam: "Road Maintenance Team 07",
      contractorName: "Sri Balaji Infra Projects",
      assignedDate: "2026-10-06T16:30:00",
      targetCompletion: "2026-10-09"
    },
    repairDetails: null
  },
  {
    id: "PTH-BLR-2026-00123",
    shortId: "PTH-BLR-00123",
    locationName: "Banashankari 2nd Stage",
    roadName: "Outer Ring Road (ORR)",
    landmark: "Near BDA Complex Flyover",
    coordinates: { lat: 12.9254, lng: 77.5647 },
    severity: "Severe",
    source: "AI + BMTC",
    status: "In Progress",
    detectionTimestamp: "2026-10-05T08:20:00",
    bmtcUnitId: "BMTC-PD-012",
    bmtcRoute: "Route 500A (Hebbal to Silk Board)",
    aiConfidence: 98,
    vibrationAnomalyScore: "4.1g (Critical)",
    reporterName: "Automated BMTC Telemetry",
    reporterContact: "bmtc-ai-node-012@bengaluru.gov.in",
    description: "Multi-layered pavement depression with loose gravel extending across 1.5 meters.",
    imageOriginal: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    imageAiAnnotated: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    workOrder: {
      workOrderId: "WO-BLR-2026-115",
      assignedTeam: "Rapid Asphalt Patching Squad 03",
      contractorName: "KPTCL Civil Contractors",
      assignedDate: "2026-10-05T11:00:00",
      targetCompletion: "2026-10-07"
    },
    repairDetails: {
      beforePhoto: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
      afterPhoto: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80",
      completionGps: { lat: 12.9255, lng: 77.5648 },
      materialsUsed: "Bituminous Cold Mix (350kg), Polymer Modified Emulsion",
      submittedTimestamp: "2026-10-07T09:15:00",
      contractorNotes: "Excavated loose base layer, applied tack coat, and compacted with 8-ton roller."
    }
  },
  {
    id: "PTH-BLR-2026-00120",
    shortId: "PTH-BLR-00120",
    locationName: "Whitefield Main Road",
    roadName: "ITPL Main Road",
    landmark: "Opposite Hope Farm Junction",
    coordinates: { lat: 12.9830, lng: 77.7500 },
    severity: "Minor",
    source: "Public",
    status: "Fixed",
    detectionTimestamp: "2026-10-03T11:10:00",
    bmtcUnitId: "N/A",
    bmtcRoute: "N/A",
    aiConfidence: 91,
    vibrationAnomalyScore: "1.8g",
    reporterName: "Priya Sharma",
    reporterContact: "priya.s@gmail.com",
    description: "Minor asphalt surface chipping near bus bay entrance.",
    imageOriginal: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    imageAiAnnotated: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    workOrder: {
      workOrderId: "WO-BLR-2026-109",
      assignedTeam: "Zone East Paving Unit 01",
      contractorName: "Bruhat Infra Pvt Ltd",
      assignedDate: "2026-10-03T15:00:00",
      targetCompletion: "2026-10-04"
    },
    repairDetails: {
      beforePhoto: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      afterPhoto: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80",
      completionPhoto: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=800&q=80",
      completionGps: { lat: 12.9832, lng: 77.7502 },
      gpsDistanceDiffMeters: 24,
      materialsUsed: "Quick-setting asphalt patch, Aggregate Grade 60",
      submittedTimestamp: "2026-10-04T16:45:00",
      verifiedTimestamp: "2026-10-05T10:00:00",
      verifiedBy: "BBMP Zone Chief Officer (East)",
      contractorNotes: "Patched and surface leveled flush with main carriageway.",
      verificationStatus: "Verified & Fixed"
    },
    feedback: {
      rating: 5,
      properlyRepaired: true,
      roadSafe: true,
      satisfactory: true,
      comments: "Prompt action! Road is much smoother now for my evening commute.",
      submittedAt: "2026-10-05T14:30:00"
    }
  },
  {
    id: "PTH-BLR-2026-00118",
    shortId: "PTH-BLR-00118",
    locationName: "JP Nagar 6th Phase",
    roadName: "15th Cross Road",
    landmark: "Near Delmia Circle",
    coordinates: { lat: 12.9081, lng: 77.5855 },
    severity: "Severe",
    source: "AI + BMTC",
    status: "Pending",
    detectionTimestamp: "2026-10-07T07:15:00",
    bmtcUnitId: "BMTC-PD-045",
    bmtcRoute: "Route 201G (JP Nagar to Central Silk Board)",
    aiConfidence: 96,
    vibrationAnomalyScore: "3.8g (High)",
    reporterName: "Automated BMTC Telemetry",
    reporterContact: "bmtc-ai-node-045@bengaluru.gov.in",
    description: "Stormwater drain cover subsidence leading to 12cm deep pothole edge.",
    imageOriginal: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    imageAiAnnotated: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    workOrder: null,
    repairDetails: null
  },
  {
    id: "PTH-BLR-2026-00115",
    shortId: "PTH-BLR-00115",
    locationName: "Outer Ring Road (Silk Board Junction)",
    roadName: "Hosur Main Road Slip Lane",
    landmark: "Under Silk Board Flyover Ramp",
    coordinates: { lat: 12.9172, lng: 77.6228 },
    severity: "Severe",
    source: "AI + BMTC",
    status: "Assigned",
    detectionTimestamp: "2026-10-06T18:00:00",
    bmtcUnitId: "BMTC-PD-007",
    bmtcRoute: "Route 500D (Electronic City to Hebbal)",
    aiConfidence: 99,
    vibrationAnomalyScore: "4.5g (Critical)",
    reporterName: "Automated BMTC Telemetry",
    reporterContact: "bmtc-ai-node-007@bengaluru.gov.in",
    description: "Heavy vehicle traffic caused severe pavement erosion and deep trenching.",
    imageOriginal: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    imageAiAnnotated: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    workOrder: {
      workOrderId: "WO-BLR-2026-121",
      assignedTeam: "Heavy Rapid Repair Taskforce 01",
      contractorName: "Karnataka Road Dev Corp",
      assignedDate: "2026-10-07T08:00:00",
      targetCompletion: "2026-10-08"
    },
    repairDetails: null
  }
];

export const BMTC_SENSOR_UNITS = [
  {
    id: "BMTC-PD-007",
    busNumber: "KA-01-F-4589 (Volvo Electric AC)",
    route: "Route 500D (Silk Board ↔ Hebbal)",
    status: "ONLINE",
    motionSensor: "ACTIVE (3-Axis Accelerometer)",
    aiCamera: "ACTIVE (4K HDR Dashcam @ 60 FPS)",
    gps: "ACTIVE (Dual Frequency GNSS)",
    network: "5G Connected",
    speedKmH: 34,
    currentLocationName: "Near Koramangala 100ft Road",
    currentCoords: { lat: 12.9352, lng: 77.6245 },
    lastDetectionTime: "10:42 AM",
    detectionsCountToday: 14
  },
  {
    id: "BMTC-PD-012",
    busNumber: "KA-01-FA-2201 (Non-AC Green Line)",
    route: "Route 215 (Majestic ↔ Banashankari)",
    status: "ONLINE",
    motionSensor: "ACTIVE",
    aiCamera: "ACTIVE",
    gps: "ACTIVE",
    network: "4G LTE High Band",
    speedKmH: 28,
    currentLocationName: "Jayanagar 4th Block",
    currentCoords: { lat: 12.9279, lng: 77.5824 },
    lastDetectionTime: "11:15 AM",
    detectionsCountToday: 9
  },
  {
    id: "BMTC-PD-045",
    busNumber: "KA-57-F-9912 (Vayu Vajra Airport Special)",
    route: "KIAS-9 (KIA Airport ↔ Electronic City)",
    status: "ONLINE",
    motionSensor: "ACTIVE",
    aiCamera: "ACTIVE",
    gps: "ACTIVE",
    network: "5G Connected",
    speedKmH: 52,
    currentLocationName: "Outer Ring Road (Bellandur)",
    currentCoords: { lat: 12.9260, lng: 77.6762 },
    lastDetectionTime: "10:05 AM",
    detectionsCountToday: 18
  }
];

export const ROAD_RISK_ZONES = [
  {
    zoneName: "Outer Ring Road (Silk Board - Bellandur Corridor)",
    riskLevel: "High Risk",
    color: "#ef4444",
    potholesCount: 38,
    avgRepairDelay: "4.2 Days",
    mostCommonSeverity: "Severe",
    coordinates: { lat: 12.9215, lng: 77.6500 },
    roadDeteriorationIndex: "84/100 (High Risk)"
  },
  {
    zoneName: "Whitefield Main Road & Hope Farm Junction",
    riskLevel: "Medium Risk",
    color: "#f59e0b",
    potholesCount: 22,
    avgRepairDelay: "2.1 Days",
    mostCommonSeverity: "Moderate",
    coordinates: { lat: 12.9800, lng: 77.7450 },
    roadDeteriorationIndex: "58/100 (Moderate)"
  },
  {
    zoneName: "Indiranagar 100 Feet Road & 12th Main",
    riskLevel: "Low Risk",
    color: "#10b981",
    potholesCount: 6,
    avgRepairDelay: "1.0 Days",
    mostCommonSeverity: "Minor",
    coordinates: { lat: 12.9784, lng: 77.6408 },
    roadDeteriorationIndex: "18/100 (Low Risk)"
  },
  {
    zoneName: "Bannerghatta Road (Dairy Circle to Arekere)",
    riskLevel: "High Risk",
    color: "#ef4444",
    potholesCount: 31,
    avgRepairDelay: "3.8 Days",
    mostCommonSeverity: "Severe",
    coordinates: { lat: 12.8980, lng: 77.5990 },
    roadDeteriorationIndex: "79/100 (High Risk)"
  }
];
