import React, { useState } from 'react';
import { 
  Download, Smartphone, Monitor, CheckCircle2, ShieldAlert, Sparkles, 
  ExternalLink, Code, Layers, FileCode, Play, Copy, Check, ShieldCheck
} from 'lucide-react';

export const AppAndExtensionHub: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [downloadingType, setDownloadingType] = useState<string | null>(null);

  // Manifest JSON content for Chrome Extension
  const extensionManifestCode = `{
  "manifest_version": 3,
  "name": "ShieldScam AI - Phishing & Scam Shield",
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
    a.download = `ShieldScam_Chrome_Extension_Manifest.json`;
    a.click();

    setTimeout(() => setDownloadingType(null), 2500);
  };

  const handleDownloadAndroidApk = () => {
    setDownloadingType('apk');
    
    // Create mock apk config download
    const apkConfig = JSON.stringify({
      appName: "ShieldScam AI Mobile Shield",
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
    a.download = `ShieldScam_AI_v3.6_Android_Setup.json`;
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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full text-cyan-300 text-xs font-bold">
            <Download className="w-3.5 h-3.5" />
            <span>CROSS-PLATFORM INTEGRATION & EXTENSION HUB</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Download ShieldScam Mobile App & Chrome Extension
          </h1>
          <p className="text-xs text-slate-300">
            Integrate real-time scam protection directly into your mobile device (Android/iOS) and web browser (Chrome/Edge/Brave).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Chrome & Web Browser Extension */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400">
                  <Monitor className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Chrome Browser Extension</h2>
                  <p className="text-xs text-slate-400">Real-time URL Phishing Shield & Email Overlay</p>
                </div>
              </div>

              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-full font-bold">
                READY FOR CHROME
              </span>
            </div>

            {/* Extension Simulator Preview */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="font-bold text-slate-300 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>ShieldScam Chrome Overlay Simulator</span>
                </span>
                <span className="text-[10px] text-cyan-400 font-mono">http://sbi-netbank-kyc.online</span>
              </div>

              <div className="bg-rose-950/70 border border-rose-500/50 p-3 rounded-lg text-xs space-y-1 text-rose-300">
                <div className="font-bold flex items-center space-x-1">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>WARNING: Phishing Domain Intercepted!</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  This domain was created 2 days ago and mimics State Bank of India. Do not enter passwords or OTPs.
                </p>
              </div>
            </div>

            {/* Manifest Code View */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">manifest.json (Extension V3)</span>
                <button
                  onClick={handleCopyManifest}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-36">
                {extensionManifestCode}
              </pre>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleDownloadExtensionZip}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>
                {downloadingType === 'extension' ? 'GENERATING EXTENSION MANIFEST...' : 'DOWNLOAD CHROME EXTENSION MANIFEST'}
              </span>
            </button>
          </div>
        </div>

        {/* Card 2: Mobile App (Android APK & iOS TestFlight) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-purple-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Android & iOS Mobile Application</h2>
                  <p className="text-xs text-slate-400">SMS Filter, WhatsApp Link Scanner & Caller ID Warning</p>
                </div>
              </div>

              <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-500/40 px-2.5 py-1 rounded-full font-bold">
                APK & TESTFLIGHT
              </span>
            </div>

            {/* Mobile Notification Simulator Preview */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                Live Mobile SMS Interceptor Mockup
              </span>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-2 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>ShieldScam Mobile Interceptor</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Just now</span>
                </div>

                <div className="text-xs text-rose-300 font-mono bg-rose-950/40 p-2 rounded border border-rose-500/30">
                  "Priya grahak, aapka SBI Khata suspend ho jayega..."
                </div>

                <div className="flex space-x-2 pt-1">
                  <button className="px-3 py-1 bg-rose-600 text-white font-bold text-[10px] rounded-md">
                    BLOCK SENDER & REPORT 1930
                  </button>
                  <button className="px-3 py-1 bg-slate-800 text-slate-300 text-[10px] rounded-md">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <h3 className="font-bold text-white">Key Mobile Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                <li>Background SMS Listener (Automated local scanning)</li>
                <li>WhatsApp Link Interceptor widget</li>
                <li>Digital Arrest Coercion Call Warning System</li>
                <li>Offline Heuristic Engine when internet is disconnected</li>
              </ul>
            </div>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadAndroidApk}
              className="py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingType === 'apk' ? 'BUILDING APK...' : 'DOWNLOAD ANDROID APK'}</span>
            </button>

            <button
              onClick={() => alert("iOS TestFlight invitation URL: https://testflight.apple.com/join/ShieldScamAI")}
              className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer transition-all"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>iOS TESTFLIGHT</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
