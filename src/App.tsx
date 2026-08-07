import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ScamScanner } from './components/ScamScanner';
import { ExplainabilityView } from './components/ExplainabilityView';
import { LiveScamRadar } from './components/LiveScamRadar';
import { PersonaProfiler } from './components/PersonaProfiler';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AppAndExtensionHub } from './components/AppAndExtensionHub';
import { PrivacyPortal } from './components/PrivacyPortal';
import { LanguageOption, UserPersona, ScamAnalysisResult } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>('english');
  const [activePersona, setActivePersona] = useState<UserPersona>('general');
  const [latestAnalysis, setLatestAnalysis] = useState<ScamAnalysisResult | null>(null);

  const handleAnalysisComplete = (result: ScamAnalysisResult) => {
    setLatestAnalysis(result);
    // Automatically switch to explainability view
    setActiveTab('explainability');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
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
          />
        )}

        {activeTab === 'explainability' && (
          <ExplainabilityView
            analysisResult={latestAnalysis}
            onResetScan={() => setActiveTab('scanner')}
          />
        )}

        {activeTab === 'radar' && (
          <LiveScamRadar />
        )}

        {activeTab === 'persona' && (
          <PersonaProfiler
            activePersona={activePersona}
            setActivePersona={setActivePersona}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard />
        )}

        {activeTab === 'downloads' && (
          <AppAndExtensionHub />
        )}

        {activeTab === 'privacy' && (
          <PrivacyPortal />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-cyan-400">ShieldScam AI v3.6</span>
            <span>• Multilingual Fraud & Zero-Day Threat Shield</span>
          </div>
          <div className="text-slate-400 font-mono text-[11px]">
            Integrated with Cybercrime Helpline 1930 & DoT Sanchar Saathi
          </div>
        </div>
      </footer>

    </div>
  );
}
