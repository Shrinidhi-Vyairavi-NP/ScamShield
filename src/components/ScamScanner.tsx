import React, { useState } from 'react';
import { 
  ShieldAlert, Send, Upload, FileText, Smartphone, Mail, MessageSquare, 
  PhoneCall, Link2, AlertTriangle, CheckCircle2, User, RefreshCw, Zap
} from 'lucide-react';
import { ScamChannel, LanguageOption, UserPersona, ScamAnalysisResult, ThemeMode } from '../types';
import { PRESET_SCAMS, PresetScam } from '../data/presetScams';
import { t } from '../lib/i18n';
import { Tooltip, FRAUD_GLOSSARY } from './Tooltip';
import { RecentScamsFeed } from './RecentScamsFeed';

interface ScamScannerProps {
  onAnalysisComplete: (result: ScamAnalysisResult) => void;
  selectedLanguage: LanguageOption;
  setSelectedLanguage: (lang: LanguageOption) => void;
  activePersona: UserPersona;
  setActivePersona: (p: UserPersona) => void;
  themeMode?: ThemeMode;
}

export const ScamScanner: React.FC<ScamScannerProps> = ({
  onAnalysisComplete,
  selectedLanguage,
  setSelectedLanguage,
  activePersona,
  setActivePersona,
  themeMode = 'dark'
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<ScamChannel>('sms');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanError, setScanError] = useState<string | null>(null);

  const isDark = themeMode === 'dark';

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

    setInputText(`[OCR Extracted Text from ${file.name}]:\nURGENT: Your SBI Account #4810 has been blocked due to unverified KYC. Click http://sbi-netbank-kyc.online to avoid total account suspension.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Refined High-Density Banner */}
      <div className={`rounded-2xl p-6 md:p-8 border shadow-md transition-colors ${
        isDark 
          ? 'bg-slate-900 border-slate-800 text-slate-100' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="max-w-3xl space-y-2">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold border ${
            isDark 
              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' 
              : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}>
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Multilingual Zero-Day Scam Detection Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Analyze Suspicious SMS, Email, Call & WhatsApp Content
          </h1>
          <p className={`text-xs sm:text-sm leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Paste suspicious messages or URLs to evaluate intent across <strong className={isDark ? 'text-cyan-400' : 'text-blue-700'}>6 deep analysis layers</strong> with Gemini AI zero-day reasoning in any language.
          </p>
        </div>
      </div>

      {/* Grid Container for Main Scanner & Recent Intercepts Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Main Scanner & Presets */}
        <div className="lg:col-span-8 space-y-6">

          {/* Main Scanner Card */}
          <div className={`rounded-2xl p-6 border shadow-md space-y-6 transition-colors ${
            isDark 
              ? 'bg-slate-900 border-slate-800' 
              : 'bg-white border-slate-200'
          }`}>
        
        {/* Input Configuration Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Channel Selector */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wider ${
              isDark ? 'text-slate-300' : 'text-slate-800'
            }`}>
              1. Communication Vector
            </label>
            <div className={`grid grid-cols-5 gap-1.5 p-1.5 rounded-xl border ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
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
                    className={`flex flex-col items-center justify-center py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? isDark 
                          ? 'bg-cyan-500 text-slate-950 shadow-md' 
                          : 'bg-blue-700 text-white shadow-md'
                        : isDark 
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
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
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wider ${
              isDark ? 'text-slate-300' : 'text-slate-800'
            }`}>
              2. Target Persona Profile
            </label>
            <div className="relative">
              <select
                value={activePersona}
                onChange={(e) => setActivePersona(e.target.value as UserPersona)}
                className={`w-full border rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none cursor-pointer ${
                  isDark 
                    ? 'bg-slate-950 text-slate-200 border-slate-800 focus:border-cyan-500' 
                    : 'bg-slate-50 text-slate-900 border-slate-300 focus:border-blue-600'
                }`}
              >
                <option value="general">General Citizen (Standard Profile)</option>
                <option value="student">College Student / Youth (Fake Jobs & Scholarships)</option>
                <option value="senior">Senior Citizen (60+) (Pension & Electricity Disconnection)</option>
                <option value="job_seeker">Job Seeker (Telegram WFH & Investment Tasks)</option>
                <option value="business">Small Business Owner (Tax & Vendor Fraud)</option>
              </select>
              <User className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Primary Language Choice */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wider ${
              isDark ? 'text-slate-300' : 'text-slate-800'
            }`}>
              3. Message Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as LanguageOption)}
              className={`w-full border rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none cursor-pointer ${
                isDark 
                  ? 'bg-slate-950 text-slate-200 border-slate-800 focus:border-cyan-500' 
                  : 'bg-slate-50 text-slate-900 border-slate-300 focus:border-blue-600'
              }`}
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
            <label className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-slate-300' : 'text-slate-800'
            }`}>
              Paste Suspicious Content to Analyze
            </label>
            <div className="flex items-center space-x-3 text-xs">
              <label className={`flex items-center space-x-1 cursor-pointer font-semibold ${
                isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-700 hover:text-blue-900'
              }`}>
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Screenshot / Document</span>
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
                  className="text-slate-400 hover:text-rose-500 text-xs font-semibold"
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
              placeholder="Example: 'Dear SBI customer, your account will be suspended tonight at 10 PM due to incomplete KYC. Update now at http://sbi-netbank-kyc.online' or paste raw email text..."
              className={`w-full border rounded-xl p-4 text-sm font-sans leading-relaxed resize-none focus:outline-none ${
                isDark 
                  ? 'bg-slate-950 text-slate-100 placeholder-slate-500 border-slate-800 focus:border-cyan-500' 
                  : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-blue-600 font-medium'
              }`}
            />
            
            <div className="absolute bottom-3 right-3 text-[11px] font-mono text-slate-400">
              {inputText.length} characters
            </div>
          </div>
        </div>

        {scanError && (
          <div className="bg-rose-100 border border-rose-400 text-rose-900 text-xs rounded-xl p-3 font-semibold flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{scanError}</span>
          </div>
        )}

        {/* Scanning Progress */}
        {isScanning ? (
          <div className={`border rounded-xl p-6 text-center space-y-4 ${
            isDark ? 'bg-slate-950 border-cyan-500/30' : 'bg-slate-50 border-blue-300'
          }`}>
            <div className={`flex justify-center items-center space-x-2 font-bold text-sm ${
              isDark ? 'text-cyan-400' : 'text-blue-800'
            }`}>
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span>ScramAway AI 6-Layer Security Scan in Progress...</span>
            </div>
            
            <div className="w-full bg-slate-300 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 dark:bg-cyan-500 h-full transition-all duration-300"
                style={{ width: `${((scanStep + 1) / scanStepsList.length) * 100}%` }}
              ></div>
            </div>

            <p className={`text-xs font-mono animate-pulse ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {scanStepsList[scanStep]}
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={`text-xs flex items-center space-x-1.5 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                <Tooltip term="Zero-Retention Ephemeral Mode" content={FRAUD_GLOSSARY.zeroRetention.definition} />: Message is analyzed and immediately erased from RAM.
              </span>
            </p>

            <button
              onClick={() => handleAnalyze()}
              disabled={isScanning}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-xs tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md ${
                isDark 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20' 
                  : 'bg-blue-700 hover:bg-blue-800 text-white shadow-blue-700/20'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{t('runAnalysisBtn', selectedLanguage)}</span>
            </button>
          </div>
        )}

      </div>

      {/* Preset Scam Quick Tests */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-2 ${
            isDark ? 'text-slate-200' : 'text-slate-900'
          }`}>
            <FileText className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
            <span>Test Curated Scam Samples (One-Click)</span>
          </h2>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Click sample to analyze</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_SCAMS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => handleLoadPreset(preset)}
              className={`group border rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/80' 
                  : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                    isDark 
                      ? 'bg-slate-800 text-cyan-300 border-slate-700' 
                      : 'bg-slate-100 text-blue-800 border-slate-300'
                  }`}>
                    {preset.channel.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {preset.language.toUpperCase()}
                  </span>
                </div>
                <h3 className={`text-xs font-bold line-clamp-1 mb-1 ${
                  isDark ? 'text-slate-100 group-hover:text-cyan-300' : 'text-slate-900 group-hover:text-blue-700'
                }`}>
                  {preset.title}
                </h3>
                <p className={`text-[11px] line-clamp-2 leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  "{preset.text}"
                </p>
              </div>

              <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
              }`}>
                <span>{preset.region}</span>
                <span className={`font-bold flex items-center space-x-1 ${
                  isDark ? 'text-cyan-400' : 'text-blue-700'
                }`}>
                  <span>Analyze</span>
                  <Send className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      </div> {/* End of Left Col (lg:col-span-8) */}

      {/* Right Col: Recent User Scams Feed Sidebar */}
      <div className="lg:col-span-4">
        <RecentScamsFeed
          onInspectScam={(text, channel) => {
            setInputText(text);
            setSelectedChannel(channel);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          themeMode={themeMode}
        />
      </div>

      </div> {/* End of Grid Container */}

    </div>
  );
};

