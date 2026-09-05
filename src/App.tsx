import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ScamScanner } from './components/ScamScanner';
import { ExplainabilityView } from './components/ExplainabilityView';
import { LiveScamRadar } from './components/LiveScamRadar';
import { PersonaProfiler } from './components/PersonaProfiler';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AppAndExtensionHub } from './components/AppAndExtensionHub';
import { PrivacyPortal } from './components/PrivacyPortal';
import { CustomerSupportAndComplaints } from './components/CustomerSupportAndComplaints';
import { AuthModal } from './components/AuthModal';
import { LanguageOption, UserPersona, ScamAnalysisResult, ThemeMode, UserProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>('english');
  const [activePersona, setActivePersona] = useState<UserPersona>('general');
  const [latestAnalysis, setLatestAnalysis] = useState<ScamAnalysisResult | null>(null);
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Load persisted user if available
    try {
      const savedUser = localStorage.getItem('scramaway_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        if (parsed.persona) {
          setActivePersona(parsed.persona);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.persona) {
      setActivePersona(user.persona);
    }
    try {
      localStorage.setItem('scramaway_user', JSON.stringify(user));
    } catch {
      // Ignore storage errors
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('scramaway_user');
    } catch {
      // Ignore storage errors
    }
  };

  const handleAnalysisComplete = (result: ScamAnalysisResult) => {
    setLatestAnalysis(result);
    // Automatically switch to explainability view
    setActiveTab('explainability');
  };

  const isDark = themeMode === 'dark';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${
      isDark 
        ? 'bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950' 
        : 'bg-slate-100 text-slate-900 selection:bg-blue-600 selection:text-white'
    }`}>
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        themeMode={themeMode}
        setThemeMode={setThemeMode}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'scanner' && (
          <ScamScanner
            onAnalysisComplete={handleAnalysisComplete}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            activePersona={activePersona}
            setActivePersona={setActivePersona}
            themeMode={themeMode}
          />
        )}

        {activeTab === 'explainability' && (
          <ExplainabilityView
            analysisResult={latestAnalysis}
            onResetScan={() => setActiveTab('scanner')}
            themeMode={themeMode}
          />
        )}

        {activeTab === 'radar' && (
          <LiveScamRadar themeMode={themeMode} selectedLanguage={selectedLanguage} />
        )}

        {activeTab === 'persona' && (
          <PersonaProfiler
            activePersona={activePersona}
            setActivePersona={setActivePersona}
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard themeMode={themeMode} selectedLanguage={selectedLanguage} />
        )}

        {activeTab === 'support' && (
          <CustomerSupportAndComplaints
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'downloads' && (
          <AppAndExtensionHub themeMode={themeMode} selectedLanguage={selectedLanguage} />
        )}

        {activeTab === 'privacy' && (
          <PrivacyPortal themeMode={themeMode} selectedLanguage={selectedLanguage} />
        )}

      </main>

      {/* Auth Login & Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        themeMode={themeMode}
      />

      {/* Footer */}
      <footer className={`border-t py-6 mt-12 text-center text-xs transition-colors ${
        isDark 
          ? 'border-slate-800 bg-slate-950 text-slate-400' 
          : 'border-slate-300 bg-white text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className={`font-bold ${isDark ? 'text-cyan-400' : 'text-blue-700'}`}>ScramAway AI v3.6</span>
            <span>• Multilingual Scam & Phishing Detection Engine</span>
          </div>
          <div className={`font-mono text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Integrated with Cybercrime Helpline 1930 & DoT Sanchar Saathi
          </div>
        </div>
      </footer>

    </div>
  );
}

