# ScramAway AI - Zero-Day Fraud & Phishing Scam Detection Platform

> **Next-Generation Multilingual AI Defense Platform against Phishing, Social Engineering, Impersonation, and Financial Fraud.**

![ScramAway AI Logo](https://raw.githubusercontent.com/google/scramaway-ai/main/logo.png) *(or inspect the interactive vector emblem in-app)*

---

## 📌 Overview

**ScramAway AI** is an enterprise-grade, privacy-first cybersecurity web application engineered to protect citizens, students, seniors, and businesses from sophisticated zero-day social engineering scams. 

Powered by a **6-Layer Detection Architecture** and the **Google Gemini Generative AI SDK**, ScramAway inspects suspicious SMS messages, WhatsApp chats, emails, phone transcripts, and malicious links in real-time. It reasons over psychological triggers, linguistic patterns, urgency tactics, and fraudulent routing before providing clear, plain-language explanations and actionable countermeasures.

---

## 🚀 Key Features

### 1. 🔍 Multimodal & Multi-Channel Scam Scanner
- **Multi-Channel Ingestion**: Analyze suspicious content from:
  - **SMS Messages** (fake KYC updates, electricity cut alerts, bank warnings)
  - **WhatsApp & Telegram** (part-time task scams, WFH offers, lottery claims)
  - **Emails** (invoice fraud, executive impersonation, phishing portals)
  - **Phone Call Transcripts** (Digital Arrest coercion, CBI/police threats, OTP requests)
  - **Direct URLs / Domains** (typosquatting, lookalike banking portals, malicious APKs)
- **Multilingual Analysis (8+ Languages)**:
  - Native detection across **English, Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), Bengali (বাংলা), Marathi (मराठी), French (Français), and Spanish (Español)**.
  - Recognizes transliterated Hinglish and Tanglish vernacular commonly used by scam syndicates.
- **One-Click Real-World Threat Presets**: Instant testing with simulated live campaigns (e.g., SBI KYC suspension, Skype Digital Arrest, BSES power cut APK, KBC WhatsApp lottery, ANTAI traffic fine).

---

### 2. 🧠 6-Layer Detection & Explainability Engine
Rather than returning a black-box probability, ScramAway breaks down threats into forensic evidence:
1. **Layer 1: Deterministic Heuristic Engine** — Scans for known malicious patterns, urgent keywords, advance fees, unverified APK links, and OTP solicitation.
2. **Layer 2: Gemini LLM Zero-Day Intent Reasoner** — Employs advanced reasoning to uncover novel social engineering tactics that bypass rule filters.
3. **Layer 3: Vector Scoring & Threat Meter** — Evaluates threats across 5 levels: `SAFE`, `LOW`, `MODERATE`, `HIGH`, and `CRITICAL`.
4. **Layer 4: Psychological Trigger Mapping** — Highlights psychological levers exploited by attackers (e.g., Artificial Urgency, Authority Coercion, Scarcity, Financial Bait, Digital Arrest Panic).
5. **Layer 5: Actionable Countermeasures** — Offers immediate defensive steps (e.g., exact contact numbers, official portal checks, evidence preservation).
6. **Layer 6: Persona Contextualization** — Adapts risk communication to the user's vulnerability profile.

---

### 3. 📡 Live Scam Radar & Interactive D3 Threat Map
- **Live Threat Feed**: Real-time telemetry displaying active campaigns reported across regions and states.
- **Interactive D3 Geo Map**: Visualizes geographic clusters, regional targets, and distribution vectors.
- **Crowdsourced Intelligence**: Users can report emerging scams with screenshots/text and upvote verified alerts to protect others.

---

### 4. 👤 Adaptive Persona Profiling
Customizes detection parameters and advice for specific vulnerability groups:
- **Senior Citizens**: Defends against pension stoppage, KYC suspension, utility cutoffs, and Digital Arrest coercion calls.
- **Students & Job Seekers**: Shields against fake Telegram like-and-subscribe jobs, bogus internships, and student loan scams.
- **Working Professionals**: Detects corporate spear-phishing, CEO gift card fraud, and fake invoice payment diversions.
- **Small Business Owners**: Highlights GST notice fraud, fake vendor bank account updates, and delivery failure scams.
- **General Public**: Broad-spectrum protection against common e-commerce and lottery scams.

---

### 5. 🛡️ National Cybercrime & 1930 Helpline Support
- **Helpline 1930 Integration**: Guidance for rapid reporting to India's National Cyber Crime Reporting Portal (`cybercrime.gov.in`).
- **Golden Hour Financial Recovery Protocol**: Step-by-step actions to freeze funds transferred through UPI or net banking within 2 hours.
- **Complaint Ticket Filing**: Log formal incident tickets, record reference numbers, track investigation status, and export evidence packages for law enforcement.

---

### 6. 🔒 Privacy Portal & Zero-Retention Architecture
- **Zero Server-Side Retention**: Analyze sensitive SMS or messages in ephemeral mode with zero permanent logging.
- **Data Anonymization**: Auto-redacts credit card numbers, Aadhaar/SSN formats, and phone numbers before analysis.
- **Audit Logs & Telemetry Toggle**: Transparent control over research telemetry and telemetry sharing.
- **High-Risk Email Alerts**: Configurable email notifications for high-risk and zero-day threat detections.

---

### 7. ⚙️ User Profiles & Notification Settings
- **User Authentication**: Sign in and register with persistent session profiles.
- **Alerts via Email**: Toggle automated email alerts when high-risk threats are identified.
- **Preferred Notification Address**: Configure dedicated email addresses to receive urgent threat bulletins.

---

### 8. 📱 App & Browser Extension Ecosystem
- **Browser Protection**: Lightweight extension concept for Chrome, Brave, and Edge that monitors URLs and webmail in real time.
- **Mobile Shield**: Companion app guidance for Android (SMS & Call screening) and iOS (Call directory filtering).

---

### 9. 🎨 Design System & Accessibility
- **Dual Themes**: Switch seamlessly between **High-Contrast Light Mode** and **High-Density Cyber Dark Mode**.
- **WCAG AA Compliance**: High-contrast typography, mathematical spacing, readable line heights, and accessible color ramps.
- **Custom Vector Identity**: Bespoke SVG emblem with dynamic status indicators.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite 6, Tailwind CSS v4, Motion (Framer Motion) |
| **Data Visualization** | D3.js (Geographic threat maps), Recharts (Analytical distribution charts) |
| **Backend** | Node.js, Express, `tsx` (development runtime), `esbuild` (production bundler) |
| **AI & LLM** | `@google/genai` (Google Gemini 2.5 Flash / Pro SDK) |
| **Icons & UI** | `lucide-react`, Custom SVG components |

---

## 📂 Project Structure

```
├── .env.example                # Example environment variables (GEMINI_API_KEY)
├── metadata.json               # Application metadata and capabilities
├── package.json                # Dependencies, scripts, and build configuration
├── server.ts                   # Express backend server with Vite middleware & API routes
├── server/
│   └── scamAnalyzer.ts         # Server-side Gemini API integration & fallback logic
├── src/
│   ├── App.tsx                 # Root application component and tab coordinator
│   ├── main.tsx                # Client entry point
│   ├── types.ts                # TypeScript interfaces (Analysis, Radar, UserProfile)
│   ├── lib/
│   │   ├── i18n.ts             # Multilingual translations (8 languages)
│   │   └── utils.ts            # Utility functions
│   └── components/
│       ├── Navbar.tsx          # Top navigation bar with theme & language selectors
│       ├── ScamScanner.tsx     # Primary input scanner & channel selection
│       ├── ExplainabilityView.tsx # Forensic layer-by-layer breakdown
│       ├── LiveScamRadar.tsx   # Real-time incident feed & community reports
│       ├── D3ScamGeoMap.tsx    # Interactive geographic scam density map
│       ├── PersonaProfiler.tsx # Vulnerability quiz & targeted defenses
│       ├── CustomerSupportAndComplaints.tsx # 1930 helpline & FIR assistant
│       ├── PrivacyPortal.tsx   # Ephemeral data controls & alert preferences
│       ├── AnalyticsDashboard.tsx # Historical trend charts & attack distributions
│       ├── AppAndExtensionHub.tsx # Browser extension & mobile download hub
│       ├── AuthModal.tsx       # Sign in, registration & notification settings
│       ├── ScramAwayLogo.tsx   # Custom SVG vector brand identity
│       └── Tooltip.tsx         # Educational cybersecurity glossary
└── vite.config.ts              # Vite configuration
```

---

## 🚦 Getting Started

### Prerequisites
- **Node.js** v18+ or v20+
- **npm** or **bun**
- *(Optional)* A **Google Gemini API Key** for real-time generative reasoning. The platform also includes a robust deterministic heuristic engine if no API key is provided.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/scramaway-ai.git
   cd scramaway-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key (optional for local heuristics, required for deep LLM reasoning):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:3000`.

---

## 🏗️ Production Build

To build and run ScramAway AI for production:

```bash
# Compile frontend assets and bundle the server into dist/server.cjs
npm run build

# Start the standalone production server
npm start
```

---

## 🛡️ Security & Privacy Notice

ScramAway AI is built on the principle of **Zero-Knowledge Ephemeral Inspection**:
- Scanned text is processed in memory and never stored in a public database without explicit user submission.
- Personal identifiable information (PII) like Aadhaar numbers, phone numbers, and bank account numbers are redacted on input.
- Always report confirmed financial fraud immediately to your local cyber police or by calling **1930** (India).

---

## 📄 License

This project is licensed under the **MIT License**.
