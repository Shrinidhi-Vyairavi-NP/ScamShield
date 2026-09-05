import React, { useState } from 'react';
import { 
  Download, Smartphone, Monitor, CheckCircle2, ShieldAlert, Sparkles, 
  ExternalLink, Code, Layers, FileCode, Play, Copy, Check, ShieldCheck
} from 'lucide-react';
import { ThemeMode, LanguageOption } from '../types';
import { t } from '../lib/i18n';
import { Tooltip, FRAUD_GLOSSARY } from './Tooltip';

interface AppAndExtensionHubProps {
  themeMode?: ThemeMode;
  selectedLanguage?: LanguageOption;
}

export const AppAndExtensionHub: React.FC<AppAndExtensionHubProps> = ({ 
  themeMode = 'dark',
  selectedLanguage = 'english'
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [downloadingType, setDownloadingType] = useState<string | null>(null);

  const isDark = themeMode === 'dark';
  const lang = selectedLanguage as LanguageOption;

  // Manifest JSON content for Chrome Extension
  const extensionManifestCode = `{
  "manifest_version": 3,
  "name": "ScramAway AI - Phishing & Scam Shield",
  "version": "3.6.0",
  "description": "Real-time zero-day SMS, Email & Phishing Link Scam Detector powered by Gemini AI",
  "permissions": ["activeTab", "scripting", "storage", "webRequest"],
  "host_permissions": ["<all_urls>"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}`;

  const handleDownloadExtensionZip = () => {
    setDownloadingType('extension');
    
    // Create manifest file download
    const blob = new Blob([extensionManifestCode], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ScramAway_Chrome_Extension_Manifest.json`;
    a.click();

    setTimeout(() => setDownloadingType(null), 2500);
  };

  const handleDownloadAndroidApk = () => {
    setDownloadingType('apk');
    
    // Create mock apk config download
    const apkConfig = JSON.stringify({
      appName: "ScramAway AI Mobile Shield",
      version: "3.6.0-release",
      platform: "Android (APK)",
      features: [
        "Live SMS Scam Interceptor",
        "WhatsApp Link Pre-Scanner",
        "Digital Arrest Call Caller-ID Warning"
      ],
      installationInstructions: "1. Download APK file\n2. Allow 'Install from Unknown Sources' in Android Settings\n3. Grant Notification & SMS permission"
    }, null, 2);

    const blob = new Blob([apkConfig], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ScramAway_AI_v3.6_Android_Setup.json`;
    a.click();

    setTimeout(() => setDownloadingType(null), 2500);
  };

  const handleCopyManifest = () => {
    navigator.clipboard.writeText(extensionManifestCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className={`border rounded-2xl p-6 shadow-md relative overflow-hidden transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="max-w-2xl space-y-2">
          <div className={`inline-flex items-center space-x-2 border px-3 py-1 rounded-full text-xs font-bold ${
            isDark ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <Download className="w-3.5 h-3.5" />
            <span>CROSS-PLATFORM INTEGRATION & EXTENSION HUB</span>
          </div>
          <h1 className="text-2xl font-black">
            {t('downloadHubTitle', lang)}
          </h1>
          <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Integrate real-time scam protection directly into your mobile device (Android/iOS) and web browser (Chrome/Edge/Brave).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Chrome & Web Browser Extension */}
        <div className={`border rounded-2xl p-6 shadow-md space-y-5 flex flex-col justify-between transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-2xl border ${
                  isDark ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-blue-50 border-blue-200 text-blue-800'
                }`}>
                  <Monitor className="w-6 h-6" />
                </div>
                <div>
                  <h2 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('chromeExtension', lang)}</h2>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Real-time URL <Tooltip term="Phishing" content="Deceptive websites that copy legitimate bank/official portals to steal passwords and credit card credentials." /> Shield & Email Overlay
                  </p>
                </div>
              </div>

              <span className="text-[10px] bg-emerald-100 text-emerald-950 border border-emerald-400 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-500/40 px-2.5 py-1 rounded-full font-bold">
                READY FOR CHROME
              </span>
            </div>

            {/* Extension Simulator Preview */}
            <div className={`border rounded-xl p-4 space-y-3 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`flex items-center justify-between text-xs border-b pb-2 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <span className={`font-bold flex items-center space-x-1.5 ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                  <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
                  <span>ScramAway Chrome Extension V3 Protection</span>
                </span>
                <span className={`text-[10px] font-mono font-bold ${isDark ? 'text-cyan-400' : 'text-blue-700'}`}>v3.6.0 Active</span>
              </div>
            </div>

            {/* Manifest Code View */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">manifest.json (Extension V3)</span>
                <button
                  onClick={handleCopyManifest}
                  className={`flex items-center space-x-1 cursor-pointer font-bold ${
                    isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-blue-700 hover:text-blue-800'
                  }`}
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className={`p-3 rounded-xl border text-[11px] font-mono overflow-x-auto max-h-36 ${
                isDark ? 'bg-slate-950 border-slate-800 text-cyan-300' : 'bg-slate-100 border-slate-300 text-blue-900 font-semibold'
              }`}>
                {extensionManifestCode}
              </pre>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleDownloadExtensionZip}
              className={`w-full py-3 font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 cursor-pointer transition-all ${
                isDark 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20' 
                  : 'bg-blue-700 hover:bg-blue-800 text-white'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>
                {downloadingType === 'extension' ? 'GENERATING EXTENSION MANIFEST...' : 'DOWNLOAD CHROME EXTENSION MANIFEST'}
              </span>
            </button>
          </div>
        </div>

        {/* Card 2: Mobile App (Android APK & iOS TestFlight) */}
        <div className={`border rounded-2xl p-6 shadow-md space-y-5 flex flex-col justify-between transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-2xl border ${
                  isDark ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-purple-50 border-purple-200 text-purple-800'
                }`}>
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Android & iOS Mobile Application</h2>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <Tooltip term="Spoofed SMS" content={FRAUD_GLOSSARY.spoofedSms.definition} /> Filter, WhatsApp Link Scanner & Caller ID Warning
                  </p>
                </div>
              </div>

              <span className="text-[10px] bg-purple-100 text-purple-950 border border-purple-300 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-500/40 px-2.5 py-1 rounded-full font-bold">
                APK & TESTFLIGHT
              </span>
            </div>

            {/* Mobile Notification Simulator Preview */}
            <div className={`border rounded-xl p-4 space-y-3 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block font-bold">
                Live Mobile SMS Interceptor Mockup
              </span>

              <div className={`border rounded-xl p-3 space-y-2 shadow-inner ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold flex items-center space-x-1.5 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    <span>ScramAway Mobile Interceptor</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">Just now</span>
                </div>

                <div className="text-xs font-mono bg-rose-100 text-rose-950 border border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-500/30 p-2 rounded">
                  "Priya grahak, aapka SBI Khata suspend ho jayega..."
                </div>

                <div className="flex space-x-2 pt-1">
                  <button className="px-3 py-1 bg-rose-600 text-white font-bold text-[10px] rounded-md">
                    BLOCK SENDER & REPORT 1930
                  </button>
                  <button className={`px-3 py-1 text-[10px] font-bold rounded-md ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-800'
                  }`}>
                    Dismiss
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h3 className={`font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Key Mobile Features:</h3>
              <ul className={`list-disc list-inside space-y-1 text-[11px] font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-700'
              }`}>
                <li>Background SMS Listener (Automated local scanning)</li>
                <li>WhatsApp Link Interceptor widget</li>
                <li><Tooltip term="Digital Arrest" content={FRAUD_GLOSSARY.digitalArrest.definition} /> Coercion Call Warning System</li>
                <li><Tooltip term="Offline Heuristics" content={FRAUD_GLOSSARY.heuristics.definition} /> Engine when internet is disconnected</li>
              </ul>
            </div>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadAndroidApk}
              className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingType === 'apk' ? 'BUILDING APK...' : 'DOWNLOAD ANDROID APK'}</span>
            </button>

            <button
              onClick={() => alert("iOS TestFlight invitation URL: https://testflight.apple.com/join/ScramAwayAI")}
              className={`py-3 border font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer transition-all ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              <ExternalLink className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
              <span>iOS TESTFLIGHT</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};


