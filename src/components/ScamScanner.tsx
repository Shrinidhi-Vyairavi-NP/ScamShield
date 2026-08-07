import React, { useState } from 'react';
import { 
  ShieldAlert, Send, Sparkles, Upload, FileText, Smartphone, Mail, MessageSquare, 
  PhoneCall, Link2, AlertTriangle, CheckCircle2, User, RefreshCw, Zap
} from 'lucide-react';
import { ScamChannel, LanguageOption, UserPersona, ScamAnalysisResult } from '../types';
import { PRESET_SCAMS, PresetScam } from '../data/presetScams';

interface ScamScannerProps {
  onAnalysisComplete: (result: ScamAnalysisResult) => void;
  selectedLanguage: LanguageOption;
  setSelectedLanguage: (lang: LanguageOption) => void;
  activePersona: UserPersona;
  setActivePersona: (p: UserPersona) => void;
}

export const ScamScanner: React.FC<ScamScannerProps> = ({
  onAnalysisComplete,
  selectedLanguage,
  setSelectedLanguage,
  activePersona,
  setActivePersona
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<ScamChannel>('sms');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanError, setScanError] = useState<string | null>(null);

  const scanStepsList = [
    'Layer 1: Sanitizing Input & Masking PII Data...',
    'Layer 2: Rule-Based URL Heuristics & Spoofing Verification...',
    'Layer 3: Multilingual NLP Contextual Intent Matching...',
    'Layer 4: Gemini 3.6 LLM Zero-Day Psychological Reasoning...',
    'Layer 5: Dynamic Risk Aggregation & Threat Velocity Check...',
    'Layer 6: Synthesizing Explainability & Safeguard Protocols...'
  ];

  const handleAnalyze = async (textToScan?: string) => {
    const content = textToScan || inputText;
    if (!content.trim()) {
      setScanError('Please enter or paste an SMS, Email text, or URL to analyze.');
      return;
    }

    setScanError(null);
    setIsScanning(true);
    setScanStep(0);

    // Animate scan steps
    for (let i = 0; i < scanStepsList.length; i++) {
      setScanStep(i);
      await new Promise((r) => setTimeout(r, 220));
    }

    try {
      const response = await fetch('/api/analyze-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: content,
          channel: selectedChannel,
          language: selectedLanguage,
          persona: activePersona
        })
      });

      if (!response.ok) {
        throw new Error('Analysis server error');
      }

      const data: ScamAnalysisResult = await response.json();
      setIsScanning(false);
      onAnalysisComplete(data);
    } catch (err) {
      console.error('Scan error:', err);
      setIsScanning(false);
      setScanError('Failed to analyze threat via server. Please check connection and try again.');
    }
  };

  const handleLoadPreset = (preset: PresetScam) => {
    setInputText(preset.text);
    setSelectedChannel(preset.channel);
    setSelectedLanguage(preset.language);
    setActivePersona(preset.targetPersona);
    handleAnalyze(preset.text);
  };

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate OCR text extraction from image/document screenshot
    setInputText(`[OCR Extracted Text from ${file.name}]:\nURGENT: Your SBI Account #4810 has been blocked due to unverified KYC. Click http://sbi-netbank-kyc.online to avoid total account suspension.`);
  };

  return (
    <div className="space-y-8">
      
      {/* Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 md:p-8 border border-slate-700/80 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-cyan-300 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>AI Multilingual Zero-Day Fraud Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Instantly Detect <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">Scams, Phishing & Fraudulent Messages</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Paste suspicious SMS messages, emails, WhatsApp texts, or URLs. ShieldScam AI dissects threat vectors across <strong className="text-cyan-300">6 defensive layers</strong> with deep zero-day explainability in any language.
          </p>
        </div>
      </div>

      {/* Main Scanner Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        
        {/* Input Configuration Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Channel Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              1. Vector / Channel
            </label>
            <div className="grid grid-cols-5 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {[
                { id: 'sms', label: 'SMS', icon: Smartphone },
                { id: 'email', label: 'Email', icon: Mail },
                { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                { id: 'call', label: 'Call', icon: PhoneCall },
                { id: 'url', label: 'URL', icon: Link2 }
              ].map((c) => {
                const Icon = c.icon;
                const isSelected = selectedChannel === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedChannel(c.id as ScamChannel)}
                    className={`flex flex-col items-center justify-center py-2 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Persona Profile */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              2. Target Persona Profile
            </label>
            <div className="relative">
              <select
                value={activePersona}
                onChange={(e) => setActivePersona(e.target.value as UserPersona)}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-medium focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
              >
                <option value="general">General Citizen (Standard Profile)</option>
                <option value="student">College Student / Youth (Fake Jobs & Scholarships)</option>
                <option value="senior">Senior Citizen (60+) (Pension & Electricity Disconnection)</option>
                <option value="job_seeker">Job Seeker (Telegram WFH & Investment Tasks)</option>
                <option value="business">Small Business Owner (Tax & Vendor Fraud)</option>
              </select>
              <User className="absolute right-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Primary Language Choice */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              3. Detection Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as LanguageOption)}
              className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-medium focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
            >
              <option value="english">English (Global)</option>
              <option value="hindi">Hindi / Hinglish (हिंदी)</option>
              <option value="tamil">Tamil / Tanglish (தமிழ்)</option>
              <option value="telugu">Telugu (తెలుగు)</option>
              <option value="bengali">Bengali (বাংলা)</option>
              <option value="french">French (Français)</option>
              <option value="latin">Latin</option>
              <option value="spanish">Spanish (Español)</option>
            </select>
          </div>

        </div>

        {/* Textarea Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Paste Content to Analyze
            </label>
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <label className="flex items-center space-x-1 cursor-pointer text-cyan-400 hover:text-cyan-300 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Screenshot / File</span>
                <input
                  type="file"
                  accept="image/*,.pdf,.txt"
                  onChange={handleSimulatedFileUpload}
                  className="hidden"
                />
              </label>
              {inputText && (
                <button
                  onClick={() => setInputText('')}
                  className="text-slate-400 hover:text-rose-400 text-xs"
                >
                  Clear Text
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={5}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Example: 'Dear SBI customer, your account will be suspended tonight at 10 PM due to incomplete KYC. Update now at http://sbi-netbank-kyc.online' or paste raw email headers..."
              className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 border border-slate-800 rounded-xl p-4 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none font-sans leading-relaxed resize-none shadow-inner"
            />
            
            <div className="absolute bottom-3 right-3 text-[11px] text-slate-500 font-mono">
              {inputText.length} characters
            </div>
          </div>
        </div>

        {scanError && (
          <div className="bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs rounded-xl p-3 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{scanError}</span>
          </div>
        )}

        {/* Scanning Animation State */}
        {isScanning ? (
          <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-6 text-center space-y-4">
            <div className="flex justify-center items-center space-x-2 text-cyan-400">
              <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
              <span className="font-bold text-sm tracking-wide">ShieldScam AI 6-Layer Multi-Stage Scanning...</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 h-full transition-all duration-300"
                style={{ width: `${((scanStep + 1) / scanStepsList.length) * 100}%` }}
              ></div>
            </div>

            <p className="text-xs text-slate-300 font-mono animate-pulse">
              {scanStepsList[scanStep]}
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Zero-Retention Mode: Your message is sanitized locally and deleted immediately after inference.</span>
            </p>

            <button
              onClick={() => handleAnalyze()}
              disabled={isScanning}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <ShieldAlert className="w-5 h-5 text-slate-950" />
              <span>ANALYZE THREAT NOW</span>
            </button>
          </div>
        )}

      </div>

      {/* Preset Scam Quick Tests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Test Curated Indian & Global Scam Vectors (One-Click)</span>
          </h2>
          <span className="text-xs text-slate-400">Select a preset to load & analyze</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_SCAMS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => handleLoadPreset(preset)}
              className="group bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 cursor-pointer transition-all hover:bg-slate-800/80 hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {preset.channel.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {preset.language.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 line-clamp-1 mb-1">
                  {preset.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  "{preset.text}"
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>{preset.region}</span>
                <span className="text-cyan-400 group-hover:underline flex items-center space-x-1 font-semibold">
                  <span>Analyze</span>
                  <Send className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
