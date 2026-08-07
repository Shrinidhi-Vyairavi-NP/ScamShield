import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Info, CheckCircle2, 
  HelpCircle, ExternalLink, RefreshCw, UserCheck, Eye, Layers, Lock, Sparkles
} from 'lucide-react';
import { ScamAnalysisResult } from '../types';

interface ExplainabilityViewProps {
  analysisResult: ScamAnalysisResult | null;
  onResetScan: () => void;
}

export const ExplainabilityView: React.FC<ExplainabilityViewProps> = ({
  analysisResult,
  onResetScan
}) => {
  const [activeLayer, setActiveLayer] = useState<number>(0); // 0 = All layers
  const [selectedHighlight, setSelectedHighlight] = useState<string | null>(null);

  if (!analysisResult) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 text-cyan-400">
          <Layers className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">No Scam Analysis Available Yet</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Please run a scan in the <strong>AI Scanner & Chat</strong> tab or pick a sample scam to view the 6-layer explainability breakdown.
        </p>
        <button
          onClick={onResetScan}
          className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          Go to AI Scanner
        </button>
      </div>
    );
  }

  const { layers, highlights, personaSusceptibility, scannedText, channel, language, selectedPersona } = analysisResult;
  const overallScore = layers.layer5_dynamic_risk.overallScore;
  const verdict = layers.layer5_dynamic_risk.verdict;

  const verdictBadge = verdict === 'HIGH_RISK_MALICIOUS'
    ? { text: 'HIGH RISK MALICIOUS SCAM', bg: 'bg-rose-950/80', border: 'border-rose-500/60', textCol: 'text-rose-400', icon: ShieldAlert }
    : verdict === 'SUSPICIOUS'
    ? { text: 'SUSPICIOUS PATTERN', bg: 'bg-amber-950/80', border: 'border-amber-500/60', textCol: 'text-amber-400', icon: AlertTriangle }
    : { text: 'SAFE CONTENT', bg: 'bg-emerald-950/80', border: 'border-emerald-500/60', textCol: 'text-emerald-400', icon: ShieldCheck };

  const BadgeIcon = verdictBadge.icon;

  // Helper function to render text with color highlights
  const renderHighlightedText = () => {
    if (!highlights || highlights.length === 0) {
      return <p className="text-sm text-slate-200 font-mono leading-relaxed">{scannedText}</p>;
    }

    let resultElements: React.ReactNode[] = [];
    let remainingText = scannedText;

    highlights.forEach((h, idx) => {
      const pos = remainingText.toLowerCase().indexOf(h.phrase.toLowerCase());
      if (pos !== -1) {
        const before = remainingText.substring(0, pos);
        const match = remainingText.substring(pos, pos + h.phrase.length);
        remainingText = remainingText.substring(pos + h.phrase.length);

        resultElements.push(before);

        const highlightColor = h.type === 'urgency'
          ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
          : h.type === 'url'
          ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
          : h.type === 'impersonation'
          ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
          : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50';

        resultElements.push(
          <span
            key={`highlight-${idx}`}
            onClick={() => setSelectedHighlight(selectedHighlight === h.phrase ? null : h.phrase)}
            className={`cursor-pointer px-1.5 py-0.5 rounded border ${highlightColor} font-bold hover:underline transition-all relative group`}
            title={h.explanation}
          >
            {match}
            <span className="ml-1 text-[10px] uppercase font-mono px-1 rounded bg-slate-900 border border-slate-700">
              {h.type}
            </span>
          </span>
        );
      }
    });

    resultElements.push(remainingText);

    return <div className="text-sm text-slate-100 font-mono leading-relaxed whitespace-pre-wrap">{resultElements}</div>;
  };

  return (
    <div className="space-y-8">
      
      {/* Top Threat Summary Banner */}
      <div className={`p-6 rounded-2xl border ${verdictBadge.border} ${verdictBadge.bg} shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}>
        <div className="flex items-start space-x-4">
          <div className={`p-3.5 rounded-2xl ${verdictBadge.bg} border ${verdictBadge.border}`}>
            <BadgeIcon className={`w-8 h-8 ${verdictBadge.textCol}`} />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <span className={`text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${verdictBadge.border} ${verdictBadge.textCol}`}>
                {verdictBadge.text}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                Channel: {channel.toUpperCase()} | Lang: {language.toUpperCase()}
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-white mt-1">
              {verdict === 'HIGH_RISK_MALICIOUS' ? 'Malicious Phishing & Fraud Attempt Identified' : 'Scam Risk Analysis Completed'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              {layers.layer4_llm_zero_day.reasoningExplanation}
            </p>
          </div>
        </div>

        {/* Risk Score Gauge */}
        <div className="flex flex-col items-center justify-center bg-slate-900/90 border border-slate-800 rounded-2xl px-6 py-4 min-w-[160px] shadow-lg">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AGGREGATED RISK</span>
          <div className="flex items-baseline space-x-1 my-1">
            <span className={`text-4xl font-extrabold ${verdictBadge.textCol}`}>
              {overallScore}
            </span>
            <span className="text-slate-500 font-bold text-sm">/100</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {layers.layer5_dynamic_risk.recurrenceFactor}
          </span>
        </div>
      </div>

      {/* Scanned Content Explainability View with Highlights */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Interactive Threat Phrase Breakdown ("WHY" It Was Flagged)</span>
          </h2>
          <span className="text-xs text-cyan-400 font-mono">Click highlighted terms for details</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
          {renderHighlightedText()}
        </div>

        {/* Explainability Cards for Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {highlights.map((h, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border transition-all ${
                selectedHighlight === h.phrase
                  ? 'bg-slate-800 border-cyan-500 shadow-lg'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-rose-300 font-mono">
                  "{h.phrase}"
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  {h.type}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {h.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Persona Vulnerability Matrix */}
      {personaSusceptibility && personaSusceptibility.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Persona Specific Vulnerability: {personaSusceptibility[0].personaLabel}
            </h2>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Vulnerability Tier for {selectedPersona.toUpperCase()}:</span>
              <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-full bg-rose-950 text-rose-400 border border-rose-500/40">
                {personaSusceptibility[0].vulnerabilityLevel} VULNERABILITY
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Targeting Analysis:</strong> {personaSusceptibility[0].targetedReason}
            </p>
            <p className="text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-lg mt-2">
              <strong>Preventative Shield:</strong> {personaSusceptibility[0].preventativeAdvice}
            </p>
          </div>
        </div>
      )}

      {/* 6-Layer Deep Analysis Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Multi-Layer Fraud Detection Architecture</span>
            </h2>
            <p className="text-xs text-slate-400">
              ShieldScam AI evaluates every message through 6 sequential defensive layers
            </p>
          </div>

          <div className="flex space-x-1">
            <button
              onClick={() => setActiveLayer(0)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
                activeLayer === 0 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All 6 Layers
            </button>
          </div>
        </div>

        {/* Layers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Layer 1: Input & Privacy */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 font-mono">LAYER 1: INPUT & PRIVACY</span>
              <span className="text-xs text-emerald-400 font-mono flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Sanitized</span>
              </span>
            </div>
            <h3 className="text-xs font-bold text-white">Local Privacy & PII Scrubbing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {layers.layer1_privacy.note}
            </p>
          </div>

          {/* Layer 2: Rule-Based & URL Heuristics */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 font-mono">LAYER 2: RULE-BASED & URLS</span>
              <span className="text-xs text-amber-400 font-mono">Score: {layers.layer2_rules.score}/100</span>
            </div>
            <h3 className="text-xs font-bold text-white">Rule Heuristics & Domain Spoofing</h3>
            <div className="text-xs text-slate-300 space-y-1">
              <div>Matched Keywords: {layers.layer2_rules.matchedKeywords.join(', ') || 'None'}</div>
              {layers.layer2_rules.suspiciousUrls.map((u, i) => (
                <div key={i} className="text-rose-400 font-mono text-[11px] bg-rose-950/40 p-1.5 rounded border border-rose-500/30">
                  Phishing Link: {u.url} ({u.spoofedBrand}) - {u.reason}
                </div>
              ))}
            </div>
          </div>

          {/* Layer 3: Multilingual Context */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 font-mono">LAYER 3: MULTILINGUAL CONTEXT</span>
              <span className="text-xs text-indigo-400 font-mono">{layers.layer3_multilingual_context.detectedLanguage}</span>
            </div>
            <h3 className="text-xs font-bold text-white">Contextual Language Intent</h3>
            <p className="text-xs text-slate-300">
              Intent: {layers.layer3_multilingual_context.intentCategory}
            </p>
            <p className="text-[11px] text-slate-400">
              Anomalies: {layers.layer3_multilingual_context.linguisticAnomalies.join(', ')}
            </p>
          </div>

          {/* Layer 4: Gemini LLM Zero-Day Reasoning */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 font-mono">LAYER 4: GEMINI LLM ZERO-DAY</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-xs font-bold text-white">Psychological Manipulation & Zero-Day Threat</h3>
            <div className="flex flex-wrap gap-1">
              {layers.layer4_llm_zero_day.psychologicalTactics.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/30 rounded">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-300 italic">
              "{layers.layer4_llm_zero_day.zeroDayPattern}"
            </p>
          </div>

          {/* Layer 5: Dynamic Risk Aggregator */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 font-mono">LAYER 5: DYNAMIC RISK SCORE</span>
              <span className="text-xs font-bold text-rose-400">{layers.layer5_dynamic_risk.overallScore}/100</span>
            </div>
            <h3 className="text-xs font-bold text-white">Threat Recurrence & Velocity</h3>
            <p className="text-xs text-slate-300">
              Recurrence: {layers.layer5_dynamic_risk.recurrenceFactor}
            </p>
            <p className="text-xs text-slate-400">
              Campaign Velocity: {layers.layer5_dynamic_risk.threatVelocity}
            </p>
          </div>

          {/* Layer 6: Actionable Safeguards */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 font-mono">LAYER 6: ACTION DASHBOARD</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-xs font-bold text-white">Recommended Defensive Actions</h3>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
              {layers.layer6_actions.recommendedActions.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Cyber Crime Helpline Action Footer */}
        <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
              Official Indian & Global Cyber Reporting
            </h4>
            <p className="text-xs text-slate-300">
              Need to lodge a financial loss or report this scam? Connect directly to <strong>National Cyber Crime Portal 1930</strong>.
            </p>
          </div>

          <div className="flex space-x-2">
            {layers.layer6_actions.reportingPortals.map((portal, idx) => (
              <a
                key={idx}
                href={portal.contactOrUrl.includes('http') ? portal.contactOrUrl.split(' / ')[0] : 'https://cybercrime.gov.in'}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg flex items-center space-x-1 cursor-pointer transition-all whitespace-nowrap"
              >
                <span>{portal.name}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
