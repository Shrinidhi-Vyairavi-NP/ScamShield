import React from 'react';
import { Shield, ShieldCheck, Radio, UserCheck, BarChart3, Download, Lock, Sparkles, Globe } from 'lucide-react';
import { LanguageOption } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedLanguage: LanguageOption;
  setSelectedLanguage: (lang: LanguageOption) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage
}) => {
  const navItems = [
    { id: 'scanner', label: 'AI Scanner & Chat', icon: Sparkles },
    { id: 'explainability', label: 'Explainability (6-Layers)', icon: ShieldCheck },
    { id: 'radar', label: 'Live Scam Radar', icon: Radio, badge: 'LIVE' },
    { id: 'persona', label: 'Personalized Profile', icon: UserCheck },
    { id: 'analytics', label: 'Analytics & History', icon: BarChart3 },
    { id: 'downloads', label: 'App & Extension', icon: Download },
    { id: 'privacy', label: 'Privacy Portal', icon: Lock },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Status */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('scanner')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 shadow-md shadow-cyan-500/20 text-white font-bold">
              <Shield className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                  ShieldScam AI
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-mono font-semibold tracking-wider bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded-full">
                  v3.6 Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Multilingual Fraud & Zero-Day Threat Shield
              </p>
            </div>
          </div>

          {/* Quick Language Selector */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-300 font-medium">Language:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as LanguageOption)}
              className="bg-slate-900 text-xs text-cyan-300 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 rounded px-2 py-1 cursor-pointer border border-slate-700"
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

          {/* Shield Status Badge */}
          <div className="hidden lg:flex items-center space-x-2 bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Real-time Zero-Day Protection Active</span>
          </div>

        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-full animate-pulse">
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
