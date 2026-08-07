import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { analyzeScamContent } from "./server/scamAnalyzer";
import { ScamRadarItem } from "./src/types";

// In-memory mock live radar database seeded with active Indian and global scam threats
const LIVE_SCAM_RADAR_ITEMS: ScamRadarItem[] = [
  {
    id: "radar-101",
    title: "SBI/HDFC Fake KYC Suspension SMS Campaign",
    channel: "sms",
    region: "Pan-India",
    state: "Maharashtra",
    reportedCount: 3840,
    firstEncountered: "2026-08-07 08:30 AM",
    threatLevel: "CRITICAL",
    category: "Banking Phishing",
    snippet: "Priya Graahak, Aapka SBI Khata KYC na hone ki वजह se AAJ RAAT 10 PM par SUSPEND kar diya jayega. Click: http://sbi-netbank-kyc...",
    targetPersona: "senior",
    verifiedStatus: true,
    upvotes: 890,
    tags: ["SBI", "KYC", "SMS Phishing", "Bank Scam"]
  },
  {
    id: "radar-102",
    title: "Digital Arrest Coercion Call & Skype Video Scam",
    channel: "call",
    region: "North & West India",
    state: "Delhi-NCR",
    reportedCount: 1420,
    firstEncountered: "2026-08-06 11:15 AM",
    threatLevel: "CRITICAL",
    category: "Law Enforcement Coercion",
    snippet: "High Court & Narcotics Bureau Digital Arrest Order under section 420. Stay on video call or face immediate police raid...",
    targetPersona: "senior",
    verifiedStatus: true,
    upvotes: 1240,
    tags: ["Digital Arrest", "CBI Impersonation", "Skype Fraud"]
  },
  {
    id: "radar-103",
    title: "Telegram Part-Time Like & Rate Task Fraud",
    channel: "whatsapp",
    region: "South India",
    state: "Tamil Nadu",
    reportedCount: 2190,
    firstEncountered: "2026-08-07 06:10 AM",
    threatLevel: "HIGH",
    category: "Job & WFH Fraud",
    snippet: "Anbu nanbarae! Daily Rs 3500-5000 income for Youtube video like. Join Telegram group now...",
    targetPersona: "student",
    verifiedStatus: true,
    upvotes: 610,
    tags: ["Telegram Task", "WFH Job", "Tamil Scam"]
  },
  {
    id: "radar-104",
    title: "BSES Electricity Bill Power Cut at 10 PM APK Scam",
    channel: "sms",
    region: "West India",
    state: "Gujarat",
    reportedCount: 950,
    firstEncountered: "2026-08-06 09:45 PM",
    threatLevel: "HIGH",
    category: "Utility Disconnection",
    snippet: "Power supply will be DISCONNECTED tonight at 10 PM due to unpaid bill. Pay via APK app: http://bses-bill-pay.apk...",
    targetPersona: "general",
    verifiedStatus: true,
    upvotes: 430,
    tags: ["Electricity Bill", "Malicious APK", "Power Disconnection"]
  },
  {
    id: "radar-105",
    title: "KBC 25 Lakh WhatsApp Lottery Cash Claim Scam",
    channel: "whatsapp",
    region: "East India",
    state: "Bihar & WB",
    reportedCount: 1670,
    firstEncountered: "2026-08-05 02:20 PM",
    threatLevel: "MODERATE",
    category: "Lottery & Advance Fee",
    snippet: "Aapka WhatsApp number KBC Kismat Lottery mein 25 Lakh Rupees winner ban gaya hai. Deposit Rs 2500 processing fee...",
    targetPersona: "general",
    verifiedStatus: true,
    upvotes: 520,
    tags: ["KBC Lottery", "WhatsApp Fraud", "25 Lakh Prize"]
  },
  {
    id: "radar-106",
    title: "French ANTAI Stationnement Fine Phishing",
    channel: "sms",
    region: "Europe",
    state: "France",
    reportedCount: 820,
    firstEncountered: "2026-08-06 04:00 PM",
    threatLevel: "HIGH",
    category: "Government Fine Phishing",
    snippet: "INFO ANTAI: Vous avez un retard de paiement d'amende stationnement de 35,00 €. Consigner votre dossier...",
    targetPersona: "general",
    verifiedStatus: true,
    upvotes: 210,
    tags: ["ANTAI", "French Scam", "Traffic Fine"]
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Route: Analyze Scam Content (Layer 1-5 + Explainability)
  app.post("/api/analyze-scam", async (req, res) => {
    try {
      const { text, channel = 'sms', language = 'english', persona = 'general' } = req.body;
      if (!text || typeof text !== 'string' || !text.trim()) {
        return res.status(400).json({ error: "Please provide text content to analyze." });
      }

      const result = await analyzeScamContent(text, channel, language, persona);
      return res.json(result);
    } catch (err: any) {
      console.error("Error analyzing scam:", err);
      return res.status(500).json({ error: "Failed to analyze threat. Please try again." });
    }
  });

  // API Route: Get Live Scam Radar Feed
  app.get("/api/scam-radar", (req, res) => {
    return res.json({
      items: LIVE_SCAM_RADAR_ITEMS,
      totalCount: LIVE_SCAM_RADAR_ITEMS.length,
      lastUpdated: new Date().toISOString()
    });
  });

  // API Route: Submit new community scam report
  app.post("/api/submit-scam-report", (req, res) => {
    const { title, text, channel, region, state, targetPersona } = req.body;
    if (!title || !text) {
      return res.status(400).json({ error: "Title and message content are required." });
    }

    const newItem: ScamRadarItem = {
      id: `radar-user-${Date.now()}`,
      title: title || "Community Reported Scam",
      channel: channel || "sms",
      region: region || "Pan-India",
      state: state || "User Submission",
      reportedCount: 1,
      firstEncountered: new Date().toLocaleString(),
      threatLevel: "HIGH",
      category: "Zero-Day User Report",
      snippet: text.substring(0, 140) + "...",
      targetPersona: targetPersona || "general",
      verifiedStatus: false,
      upvotes: 1,
      tags: ["User Submission", "Zero-Day"]
    };

    LIVE_SCAM_RADAR_ITEMS.unshift(newItem);
    return res.json({ success: true, item: newItem });
  });

  // API Route: Upvote scam report
  app.post("/api/upvote-scam", (req, res) => {
    const { id } = req.body;
    const item = LIVE_SCAM_RADAR_ITEMS.find(i => i.id === id);
    if (item) {
      item.upvotes += 1;
      item.reportedCount += 1;
      return res.json({ success: true, item });
    }
    return res.status(404).json({ error: "Report not found." });
  });

  // Vite Middleware in Development vs Static in Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ShieldScam AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
