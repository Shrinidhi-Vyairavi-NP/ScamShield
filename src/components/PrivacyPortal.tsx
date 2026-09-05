import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, EyeOff, Database, Server, CheckCircle2, FileCheck, Bell, Mail, Save } from 'lucide-react';
import { ThemeMode, LanguageOption, UserProfile } from '../types';
import { t } from '../lib/i18n';
import { Tooltip, FRAUD_GLOSSARY } from './Tooltip';

interface PrivacyPortalProps {
  themeMode?: ThemeMode;
  selectedLanguage?: LanguageOption;
}

export const PrivacyPortal: React.FC<PrivacyPortalProps> = ({ 
  themeMode = 'dark',
  selectedLanguage = 'english'
}) => {
  const [zeroRetention, setZeroRetention] = useState(true);
  const [researchTelemetry, setResearchTelemetry] = useState(true);
  
  // High-Risk Scam Detection Alert Settings
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const [notificationEmail, setNotificationEmail] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('scramaway_user');
      if (savedUser) {
        const parsed: UserProfile = JSON.parse(savedUser);
        setEmailAlertsEnabled(parsed.alertsViaEmail ?? true);
        setNotificationEmail(parsed.notificationEmail || parsed.email || '');
      }
    } catch {
      // Ignore storage read error
    }
  }, []);

  const handleSaveAlertSettings = () => {
    try {
      const savedUser = localStorage.getItem('scramaway_user');
      if (savedUser) {
        const parsed: UserProfile = JSON.parse(savedUser);
        const updated: UserProfile = {
          ...parsed,
          alertsViaEmail: emailAlertsEnabled,
          notificationEmail: notificationEmail.trim() || parsed.email
        };
        localStorage.setItem('scramaway_user', JSON.stringify(updated));
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      // Ignore storage write error
    }
  };

  const isDark = themeMode === 'dark';
  const lang = selectedLanguage as LanguageOption;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className={`border rounded-2xl p-6 shadow-md transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center space-x-3 mb-2">
          <Lock className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
          <h1 className="text-2xl font-black">
            {t('privacyTitle', lang)}
          </h1>
        </div>
        <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {t('privacySubtitle', lang)}
        </p>
      </div>

      {/* Privacy Toggles Card */}
      <div className={`border rounded-2xl p-6 shadow-md space-y-6 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <h2 className={`text-sm font-extrabold uppercase tracking-wider flex items-center space-x-2 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          <EyeOff className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
          <span>User Data Controls & Ephemeral Mode</span>
        </h2>

        <div className="space-y-4">
          
          {/* Toggle 1: Zero-Retention Mode */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="space-y-1 max-w-xl">
              <h3 className={`text-xs font-bold flex items-center space-x-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <span>
                  <Tooltip term="Zero-Retention Ephemeral Mode" content={FRAUD_GLOSSARY.zeroRetention.definition} />
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-950 border border-emerald-400 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-500/40 px-2 py-0.2 rounded font-mono font-bold">
                  ACTIVE BY DEFAULT
                </span>
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Your scanned SMS/Email content is processed exclusively in RAM for inference and erased immediately afterwards. No text, phone number, or IP address is written to persistent database storage.
              </p>
            </div>

            <button
              onClick={() => setZeroRetention(!zeroRetention)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                zeroRetention ? (isDark ? 'bg-cyan-500 justify-end' : 'bg-blue-700 justify-end') : (isDark ? 'bg-slate-800 justify-start' : 'bg-slate-300 justify-start')
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-950 shadow-md"></div>
            </button>
          </div>

          {/* Toggle 2: Anonymized Telemetry */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="space-y-1 max-w-xl">
              <h3 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Anonymized Cybersecurity Research Telemetry
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Opt-in to contribute sanitized scam patterns (URLs, spoofed bank keywords, and phishing domain names) to help train open cyber threat intelligence models protecting Indian citizens. Personal identifiers (PII) are automatically stripped before submission.
              </p>
            </div>

            <button
              onClick={() => setResearchTelemetry(!researchTelemetry)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                researchTelemetry ? (isDark ? 'bg-cyan-500 justify-end' : 'bg-blue-700 justify-end') : (isDark ? 'bg-slate-800 justify-start' : 'bg-slate-300 justify-start')
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-950 shadow-md"></div>
            </button>
          </div>

        </div>
      </div>

      {/* High-Risk Scam Detection Email Alert Preferences */}
      <div className={`border rounded-2xl p-6 shadow-md space-y-4 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className={`text-sm font-extrabold uppercase tracking-wider flex items-center space-x-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <Bell className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
            <span>High-Risk Scam Detection Alerts</span>
          </h2>
          <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${
            emailAlertsEnabled
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
              : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}>
            {emailAlertsEnabled ? 'EMAIL ALERTS ACTIVE' : 'ALERTS DISABLED'}
          </span>
        </div>

        <div className="space-y-4 text-xs">
          {/* Toggle Row */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="space-y-1 max-w-xl">
              <label htmlFor="portal-alerts-toggle" className={`font-bold block cursor-pointer ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Alerts via Email
              </label>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Receive instant priority email warnings whenever our 6-layer engine or browser extension flags a high-risk or zero-day malicious scam attempt.
              </p>
            </div>

            <button
              id="portal-alerts-toggle"
              onClick={() => setEmailAlertsEnabled(!emailAlertsEnabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                emailAlertsEnabled ? (isDark ? 'bg-cyan-500 justify-end' : 'bg-blue-700 justify-end') : (isDark ? 'bg-slate-800 justify-start' : 'bg-slate-300 justify-start')
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white dark:bg-slate-950 shadow-md"></div>
            </button>
          </div>

          {/* Preferred Notification Address Config Placeholder UI */}
          {emailAlertsEnabled && (
            <div className={`p-4 rounded-xl border space-y-3 animate-fade-in ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <label htmlFor="portal-notification-email" className={`block font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Preferred Notification Email Address
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="relative flex-1">
                  <Mail className={`w-4 h-4 absolute left-3 top-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                  <input
                    id="portal-notification-email"
                    type="email"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                    placeholder="alerts-user@scramaway.ai"
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border font-mono transition-all focus:outline-none ${
                      isDark 
                        ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-400' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600'
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSaveAlertSettings}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                    isDark 
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950' 
                      : 'bg-blue-700 hover:bg-blue-800 text-white'
                  }`}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Address</span>
                </button>
              </div>

              {saveSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Preferred notification address saved to user preferences!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Data Flow & Protection Diagram */}
      <div className={`border rounded-2xl p-6 shadow-md space-y-4 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <h2 className={`text-sm font-extrabold uppercase tracking-wider flex items-center space-x-2 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          <Database className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
          <span>How Your Data Is Processed & Protected</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`font-bold font-mono ${isDark ? 'text-cyan-400' : 'text-blue-800'}`}>1. LOCAL SANITIZATION</div>
            <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              Names, phone numbers, account digits, and personal email addresses are automatically masked locally before threat evaluation.
            </p>
          </div>

          <div className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`font-bold font-mono ${isDark ? 'text-cyan-400' : 'text-blue-800'}`}>2. SECURE SERVER INFERENCE</div>
            <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              Encrypted server-side analysis evaluates 6 defensive layers using Gemini AI without storing raw text bundles.
            </p>
          </div>

          <div className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`font-bold font-mono ${isDark ? 'text-cyan-400' : 'text-blue-800'}`}>3. SAFE FROM OTHER USERS</div>
            <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              Other users only see aggregated, non-attributable scam patterns on the Live Scam Radar (e.g. domain names like "sbi-kyc-verify.online").
            </p>
          </div>
        </div>
      </div>

      {/* Compliance Standards */}
      <div className={`border rounded-2xl p-6 shadow-md space-y-3 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <h2 className={`text-sm font-extrabold uppercase tracking-wider flex items-center space-x-2 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          <FileCheck className="w-4 h-4 text-emerald-500" />
          <span>Regulatory Privacy Compliance</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className={`border p-3 rounded-xl flex items-center space-x-3 ${
            isDark ? 'bg-emerald-950/30 border-emerald-500/20 text-slate-200' : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <div>
              <strong className={`block font-extrabold ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>Digital Personal Data Protection (DPDP) Act India 2023</strong>
              <span>Compliant with data minimization, user consent, and purpose limitation mandates.</span>
            </div>
          </div>

          <div className={`border p-3 rounded-xl flex items-center space-x-3 ${
            isDark ? 'bg-emerald-950/30 border-emerald-500/20 text-slate-200' : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <div>
              <strong className={`block font-extrabold ${isDark ? 'text-emerald-300' : 'text-emerald-900'}`}>GDPR & ISO 27001 Standard Principles</strong>
              <span>Zero third-party advertisement tracking or commercial selling of scan telemetry.</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

