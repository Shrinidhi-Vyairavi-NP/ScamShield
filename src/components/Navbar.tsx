import React from 'react';
import { Shield, ShieldCheck, Radio, UserCheck, BarChart3, Download, Lock, Sparkles, Globe, Sun, Moon, Headphones, User, LogIn } from 'lucide-react';
import { LanguageOption, ThemeMode, UserProfile } from '../types';
import { t } from '../lib/i18n';
import { ScramAwayLogo } from './ScramAwayLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedLanguage: LanguageOption;
  setSelectedLanguage: (lang: LanguageOption) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
  themeMode,
  setThemeMode,
  currentUser,
  onOpenAuth
}) => {
  const isDark = themeMode === 'dark';

  const navItems = [
    { id: 'scanner', label: t('tabScanner', selectedLanguage), icon: Sparkles },
    { id: 'explainability', label: t('tabExplainability', selectedLanguage), icon: ShieldCheck },
    { id: 'radar', label: t('tabRadar', selectedLanguage), icon: Radio, badge: 'LIVE' },
    { id: 'persona', label: t('tabPersona', selectedLanguage), icon: UserCheck },
    { id: 'analytics', label: t('tabAnalytics', selectedLanguage), icon: BarChart3 },
    { id: 'support', label: 'Support & Complaints', icon: Headphones, badge: '1930' },
    { id: 'downloads', label: t('tabDownloads', selectedLanguage), icon: Download },
    { id: 'privacy', label: t('tabPrivacy', selectedLanguage), icon: Lock },
  ];

  return (
    <header className={`sticky top-0 z-50 shadow-md border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-slate-900 border-slate-800 text-slate-100' 
        : 'bg-white border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('scanner')}>
            <ScramAwayLogo className="w-10 h-10" isDark={isDark} showLivePulse={true} />
            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-xl font-black tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  ScramAway<span className={isDark ? 'text-cyan-400' : 'text-blue-700'}>.AI</span>
                </span>
              </div>
              <p className={`text-[11px] hidden sm:block ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Multilingual Fraud & Phishing Scam Detection
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            
            {/* Quick Language Selector */}
            <div className={`hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${
              isDark 
                ? 'bg-slate-800/80 border-slate-700 text-slate-300' 
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <Globe className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
              <span>Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as LanguageOption)}
                className={`text-xs font-semibold focus:outline-none rounded px-2 py-1 cursor-pointer border ${
                  isDark 
                    ? 'bg-slate-900 text-cyan-300 border-slate-700' 
                    : 'bg-white text-slate-900 border-slate-300'
                }`}
              >
                <option value="english">English (Global)</option>
                <option value="hindi">Hindi (हिंदी)</option>
                <option value="tamil">Tamil (தமிழ்)</option>
                <option value="telugu">Telugu (తెలుగు)</option>
                <option value="bengali">Bengali (বাংলা)</option>
                <option value="french">French (Français)</option>
                <option value="latin">Latin</option>
                <option value="spanish">Spanish (Español)</option>
              </select>
            </div>

            {/* High Density Dark / High Contrast Light Mode Toggle */}
            <button
              onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700 hover:border-amber-400/50' 
                  : 'bg-slate-900 text-amber-300 border-slate-800 hover:bg-slate-800'
              }`}
              title="Switch accessibility theme mode"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-amber-300" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            {/* Auth Sign In / User Profile Button */}
            <button
              onClick={onOpenAuth}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                currentUser
                  ? isDark 
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25' 
                    : 'bg-blue-50 border-blue-300 text-blue-900 hover:bg-blue-100'
                  : isDark 
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 border-cyan-400 shadow-sm' 
                    : 'bg-blue-700 hover:bg-blue-800 text-white border-blue-600 shadow-sm'
              }`}
            >
              {currentUser ? (
                <>
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="max-w-[120px] truncate">{currentUser.name.split(' ')[0]}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Register</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* Tab Navigation Menu */}
        <nav className={`flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t ${
          isDark ? 'border-slate-800/80' : 'border-slate-200'
        }`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? isDark 
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                      : 'bg-blue-100 text-blue-900 border border-blue-300 font-extrabold shadow-sm'
                    : isDark 
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${
                  isActive 
                    ? isDark ? 'text-cyan-400' : 'text-blue-700' 
                    : isDark ? 'text-slate-400' : 'text-slate-500'
                }`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full border animate-pulse ${
                    isDark 
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                      : 'bg-rose-100 text-rose-900 border-rose-300 font-extrabold'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

