import React, { useState } from 'react';
import { Lock, ShieldCheck, EyeOff, Database, Server, CheckCircle2, FileCheck } from 'lucide-react';

export const PrivacyPortal: React.FC = () => {
  const [zeroRetention, setZeroRetention] = useState(true);
  const [researchTelemetry, setResearchTelemetry] = useState(true);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <Lock className="w-6 h-6 text-cyan-400" />
          <h1 className="text-2xl font-extrabold text-white">
            Privacy & Data Transparency Portal
          </h1>
        </div>
        <p className="text-xs text-slate-300">
          ShieldScam AI enforces strict user privacy controls. Your personal message content, names, and phone numbers are never exposed to third parties or other users.
        </p>
      </div>

      {/* Privacy Toggles Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <EyeOff className="w-4 h-4 text-cyan-400" />
          <span>User Data Controls & Ephemeral Mode</span>
        </h2>

        <div className="space-y-4">
          
          {/* Toggle 1: Zero-Retention Mode */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="space-y-1 max-w-xl">
              <h3 className="text-xs font-bold text-white flex items-center space-x-2">
                <span>Zero-Retention Ephemeral Mode</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/40 px-2 py-0.2 rounded font-mono">
                  ACTIVE BY DEFAULT
                </span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your scanned SMS/Email content is processed exclusively in RAM for inference and erased immediately afterwards. No text, phone number, or IP address is written to persistent database storage.
              </p>
            </div>

            <button
              onClick={() => setZeroRetention(!zeroRetention)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                zeroRetention ? 'bg-cyan-500 justify-end' : 'bg-slate-800 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-slate-950 shadow-md"></div>
            </button>
          </div>

          {/* Toggle 2: Anonymized Telemetry */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="space-y-1 max-w-xl">
              <h3 className="text-xs font-bold text-white">
                Anonymized Cybersecurity Research Telemetry
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Opt-in to contribute sanitized scam patterns (URLs, spoofed bank keywords, and phishing domain names) to help train open cyber threat intelligence models protecting Indian citizens. Personal identifiers (PII) are automatically stripped before submission.
              </p>
            </div>

            <button
              onClick={() => setResearchTelemetry(!researchTelemetry)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                researchTelemetry ? 'bg-cyan-500 justify-end' : 'bg-slate-800 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-slate-950 shadow-md"></div>
            </button>
          </div>

        </div>
      </div>

      {/* Data Flow & Protection Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>How Your Data Is Processed & Protected</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-cyan-400 font-bold font-mono">1. LOCAL SANITIZATION</div>
            <p className="text-slate-300">
              Names, phone numbers, account digits, and personal email addresses are automatically masked locally before threat evaluation.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-cyan-400 font-bold font-mono">2. SECURE SERVER INFERENCE</div>
            <p className="text-slate-300">
              Encrypted server-side analysis evaluates 6 defensive layers using Gemini AI without storing raw text bundles.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-cyan-400 font-bold font-mono">3. SAFE FROM OTHER USERS</div>
            <p className="text-slate-300">
              Other users only see aggregated, non-attributable scam patterns on the Live Scam Radar (e.g. domain names like "sbi-kyc-verify.online").
            </p>
          </div>
        </div>
      </div>

      {/* Compliance Standards */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>Regulatory Privacy Compliance</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-emerald-950/30 border border-emerald-500/20 p-3 rounded-xl flex items-center space-x-3 text-slate-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <strong className="text-emerald-300 block">Digital Personal Data Protection (DPDP) Act India 2023</strong>
              <span>Compliant with data minimization, user consent, and purpose limitation mandates.</span>
            </div>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-500/20 p-3 rounded-xl flex items-center space-x-3 text-slate-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <strong className="text-emerald-300 block">GDPR & ISO 27001 Standard Principles</strong>
              <span>Zero third-party advertisement tracking or commercial selling of scan telemetry.</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
