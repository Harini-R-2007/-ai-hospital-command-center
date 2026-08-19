import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;
const API_URL = 'https://ai-hospital-command-center-idnm.onrender.com';

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error("Gemini AI Client init error:", err);
  }
}

// API Routes

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    system: "AI Hospital Command Center OS",
    version: "2.4.0",
    geminiActive: !!aiClient,
    timestamp: new Date().toISOString()
  });
});

// Authentication Endpoint
app.post("/api/auth/login", (req, res) => {
  const { email, password, role } = req.body;
  
  if (role === 'admin' || email?.includes('admin')) {
    return res.json({
      success: true,
      user: {
        id: 'usr-admin-01',
        name: 'Dr. Arthur Vance',
        email: email || 'admin@hospital.org',
        role: 'admin',
        title: 'Chief Medical Officer & Command Director',
        avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
      },
      token: 'jwt-simulated-token-admin-99812'
    });
  } else {
    return res.json({
      success: true,
      user: {
        id: 'usr-doctor-02',
        name: 'Dr. Ananya Sharma',
        email: email || 'doctor@hospital.org',
        role: 'doctor',
        department: 'Intensive Care Unit (ICU)',
        title: 'Lead Critical Care Specialist',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
      },
      token: 'jwt-simulated-token-doctor-44210'
    });
  }
});

// ML Prediction Engine Simulator
app.get("/api/predict", (_req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    todayPatientCount: 184,
    predictedTomorrowPatientCount: 218,
    predictionConfidence: 94.2,
    hospitalRiskLevel: 'ELEVATED',
    requirements: {
      totalBedsNeeded: 218,
      extraBedsNeeded: 34,
      icuBedsNeeded: 33,
      doctorsNeeded: 48,
      nursesNeeded: 124,
      ventilatorsNeeded: 21,
      oxygenCylindersNeeded: 195,
      emergencyProbability: 82.5
    },
    departmentDemandForecast: [
      { name: 'Emergency & Trauma', current: 36, predicted: 48, surge: '+33%' },
      { name: 'Pediatrics', current: 32, predicted: 42, surge: '+31%' },
      { name: 'ICU', current: 27, predicted: 33, surge: '+22%' },
      { name: 'Cardiology', current: 34, predicted: 39, surge: '+15%' },
      { name: 'General Ward A', current: 45, predicted: 52, surge: '+16%' }
    ]
  });
});

// Explainable AI (XAI) Endpoint
app.get("/api/explain", (_req, res) => {
  res.json({
    predictedTotal: 218,
    confidence: 94.2,
    factors: [
      { id: 'f-1', factor: 'Viral Fever & Respiratory Outbreak Index', impact: '+22 Patients', category: 'Epidemiology', impactVal: 22, confidence: 96 },
      { id: 'f-2', factor: 'Weekend Emergency Admission Pattern', impact: '+18 Patients', category: 'Seasonality', impactVal: 18, confidence: 94 },
      { id: 'f-3', factor: 'Monsoon Rain & Heavy Precipitation', impact: '+15 Patients', category: 'Weather', impactVal: 15, confidence: 89 },
      { id: 'f-4', factor: 'Local Stadium Sports Crowd Event', impact: '+12 Patients', category: 'Events', impactVal: 12, confidence: 91 },
      { id: 'f-5', factor: 'Baseline Historical Admission Growth', impact: '+8 Patients', category: 'Historical', impactVal: 8, confidence: 98 },
      { id: 'f-6', factor: 'Pre-scheduled Elective Discharges', impact: '-11 Patients', category: 'Historical', impactVal: -11, confidence: 87 }
    ],
    aiExecutiveSummary: "Prediction Model (XGBoost Ensemble v4) synthesized 5,240 historical records, real-time city epidemiology feeds, and regional weather radar. The primary driver is a 34% surge in viral respiratory symptoms compounded by weekend trauma admission statistical trends."
  });
});

// What-If Simulation Endpoint
app.post("/api/simulation", (req, res) => {
  const { patientSurge = 218, availableStaffPercent = 100, icuCapacityReduction = 0, oxygenSupplyDrop = 0 } = req.body;
  
  const baseCapacityBeds = 322;
  const currentOccupiedBeds = 244;
  const effectiveBeds = baseCapacityBeds;
  
  const bedShortage = Math.max(0, patientSurge - (effectiveBeds - currentOccupiedBeds + 34));
  const doctorShortage = Math.max(0, Math.ceil((patientSurge / 5) - (50 * (availableStaffPercent / 100))));
  const nurseShortage = Math.max(0, Math.ceil((patientSurge / 1.8) - (130 * (availableStaffPercent / 100))));
  const icuShortage = Math.max(0, Math.ceil(patientSurge * 0.15) - Math.floor(30 * (1 - icuCapacityReduction / 100)));
  const ventilatorShortage = Math.max(0, Math.ceil(patientSurge * 0.10) - 18);
  const oxygenShortageCylinders = Math.max(0, Math.ceil(patientSurge * 0.95) - Math.floor(180 * (1 - oxygenSupplyDrop / 100)));
  
  let emergencyLevel: 'STABLE' | 'ELEVATED' | 'CRITICAL' | 'CODE RED' = 'STABLE';
  if (patientSurge > 270 || bedShortage > 20 || icuShortage > 5) {
    emergencyLevel = 'CODE RED';
  } else if (patientSurge > 230 || bedShortage > 5 || doctorShortage > 4) {
    emergencyLevel = 'CRITICAL';
  } else if (patientSurge > 200) {
    emergencyLevel = 'ELEVATED';
  }

  const actions: string[] = [];
  if (bedShortage > 0) actions.push(`Open Block C Overflow Ward to deploy ${bedShortage + 10} extra surge cots.`);
  if (doctorShortage > 0) actions.push(`Mobilize ${doctorShortage} off-duty emergency physicians and residents.`);
  if (nurseShortage > 0) actions.push(`Request ${nurseShortage} travel/agency nursing staff for 24-hour shift expansion.`);
  if (icuShortage > 0) actions.push(`Activate High-Dependency Unit (HDU) step-down beds for stable ICU candidates.`);
  if (oxygenShortageCylinders > 0) actions.push(`Trigger priority expedited oxygen tank delivery from Linde Medical.`);
  if (emergencyLevel === 'CODE RED') actions.push(`Initiate regional hospital collaboration transfer protocol to Apollo & Fortis.`);

  res.json({
    predictedTotalPatients: patientSurge,
    bedShortage,
    doctorShortage,
    nurseShortage,
    icuShortage,
    ventilatorShortage,
    oxygenShortageCylinders,
    emergencyLevel,
    recommendedActions: actions.length > 0 ? actions : ["Maintain current operational staffing and monitoring routine."],
    estimatedWaitTimeMinutes: Math.round(15 + (patientSurge / 10) + (bedShortage * 2.5))
  });
});

// Gemini AI Chat Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  const { message, context } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const systemPrompt = `You are "Command AI", an expert Healthcare System Architect and Operations Assistant for the AI Hospital Command Center.
You speak with authoritative, precise, medical-grade executive intelligence.
Key Current Hospital Metrics:
- Today's Patients: 184 | Predicted Tomorrow: 218 (+18.5% surge)
- Total Beds: 322 | Occupied Beds: 244 | Available Beds: 78 (Emergency & Pediatrics near 90%+ capacity)
- ICU Occupancy: 88% (27/30 occupied)
- Doctor Availability: 42 active / 50 total
- Hospital Risk Level: ELEVATED (Confidence 94.2%)
- Emergency Probabilities: Highest in ER and Pediatrics due to monsoon rain and viral outbreak (+22 patients)

Answer the user's operational question clearly, concisely, with actionable bullet points if relevant.`;

  if (aiClient && apiKey) {
    try {
      const response = await aiClient.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `${systemPrompt}\n\nUser Question: ${message}`,
      });
      return res.json({
        reply: response.text || "I have analyzed the hospital operating state. All systems are currently being continuously monitored.",
        source: "gemini-3.6-flash"
      });
    } catch (err) {
      console.error("Gemini API Error, falling back to intelligent rule engine:", err);
    }
  }

  // Fallback Intelligent Engine
  let reply = "";
  const lower = message.toLowerCase();

  if (lower.includes("bed") || lower.includes("capacity")) {
    reply = "🏥 **Bed Capacity Summary:**\n- **Today:** 244 of 322 beds occupied (75.7% total utilization).\n- **Tomorrow Forecast:** 218 new admissions expected. Available surge beds: 34.\n- **Bottleneck Warning:** ER and Pediatrics are at 90%+ capacity. **Recommendation:** Prepare 25 extra beds in Block C immediately.";
  } else if (lower.includes("why") || lower.includes("prediction") || lower.includes("high")) {
    reply = "🔍 **Explainable AI Prediction Analysis:**\nTomorrow's prediction of 218 patients (+18.5%) is driven by:\n1. **Viral Respiratory Outbreak (+22 patients)** - 34% spike in influenza cases.\n2. **Weekend Emergency Pattern (+18 patients)** - Historical trauma surge.\n3. **Monsoon Rain Radar (+15 patients)** - 78mm rain forecast.\n4. **Local Event (+12 patients)** - Nearby stadium gathering.";
  } else if (lower.includes("inventory") || lower.includes("order") || lower.includes("stock") || lower.includes("oxygen")) {
    reply = "📦 **Inventory & Supply Demand Alert:**\n- **Critical Shortages:** Meropenem Antibiotics (2.7 days left) & Hydraulic Stretchers (1.8 days left).\n- **Oxygen Cylinders:** 180 cylinders available; burn rate is 35/day (5.1 days left).\n- **Action:** Issue Purchase Order for 50 Oxygen Cylinders and 150 Vials of Meropenem.";
  } else if (lower.includes("overload") || lower.includes("department")) {
    reply = "⚠️ **Overloaded Departments:**\n1. **Emergency & Trauma:** 36/40 beds (90% occupied, 8 in queue).\n2. **Pediatrics:** 32/35 beds (91% occupied, 5 in queue).\n3. **ICU:** 27/30 beds (90% occupied, 3 waiting transfer).";
  } else {
    reply = `📊 **Hospital Command Summary:**\nCurrently operating at **ELEVATED Risk Level** with **94.2% AI Prediction Confidence**.\n- 184 patients admitted today; 218 projected tomorrow.\n- Emergency Mode ready if admissions cross 250.\n- All critical ICU ventilators are operational with 7 reserve units ready.`;
  }

  return res.json({ reply, source: "command-rule-engine" });
});

// Vite middleware in dev mode
if (process.env.NODE_ENV !== "production") {
  startViteServer();
} else {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

async function startViteServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AI Hospital Command Center Server running on http://0.0.0.0:${PORT}`);
});
