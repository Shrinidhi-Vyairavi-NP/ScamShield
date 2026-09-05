import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, ExternalLink, UserCheck, Eye, Layers, Lock, Sparkles
} from 'lucide-react';
import { ScamAnalysisResult, ThemeMode } from '../types';
import { Tooltip, FRAUD_GLOSSARY } from './Tooltip';

interface ExplainabilityViewProps {
  analysisResult: ScamAnalysisResult | null;
  onResetScan: () => void;
  themeMode?: ThemeMode;
}

export const ExplainabilityView: React.FC<ExplainabilityViewProps> = ({
  analysisResult,
  onResetScan,
  themeMode = 'dark'
}) => {
  const [selectedHighlight, setSelectedHighlight] = useState<string | null>(null);

  const isDark = themeMode === 'dark';

  if (!analysisResult) {
    return (
      <div className={`border rounded-2xl p-12 text-center space-y-4 shadow-md ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${
          isDark ? 'bg-slate-800 text-cyan-400' : 'bg-slate-100 text-blue-700'
        }`}>
          <Layers className="w-8 h-8" />
        </div>
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          No Scam Analysis Available Yet
        </h2>
        <p className={`text-xs sm:text-sm max-w-md mx-auto ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Please run a scan in the <strong>AI Scanner & Chat</strong> tab or pick a sample scam to view the 6-layer explainability breakdown.
        </p>
        <button
          onClick={onResetScan}
          className={`px-6 py-2.5 font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all ${
            isDark 
              ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950' 
              : 'bg-blue-700 hover:bg-blue-800 text-white'
          }`}
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
    ? { 
        text: 'HIGH RISK MALICIOUS SCAM', 
        bg: isDark ? 'bg-rose-950/80' : 'bg-rose-100', 
        border: isDark ? 'border-rose-500/60' : 'border-rose-400', 
        textCol: isDark ? 'text-rose-400' : 'text-rose-950 font-black', 
        icon: ShieldAlert 
      }
    : verdict === 'SUSPICIOUS'
    ? { 
        text: 'SUSPICIOUS PATTERN', 
        bg: isDark ? 'bg-amber-950/80' : 'bg-amber-100', 
        border: isDark ? 'border-amber-500/60' : 'border-amber-400', 
        textCol: isDark ? 'text-amber-400' : 'text-amber-950 font-black', 
        icon: AlertTriangle 
      }
    : { 
        text: 'SAFE CONTENT', 
        bg: isDark ? 'bg-emerald-950/80' : 'bg-emerald-100', 
        border: isDark ? 'border-emerald-500/60' : 'border-emerald-400', 
        textCol: isDark ? 'text-emerald-400' : 'text-emerald-950 font-black', 
        icon: ShieldCheck 
      };

  const BadgeIcon = verdictBadge.icon;

  const renderHighlightedText = () => {
    if (!highlights || highlights.length === 0) {
      return <p className={`text-sm font-mono leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{scannedText}</p>;
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
          ? isDark ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' : 'bg-amber-200 text-amber-950 border-amber-400 font-extrabold'
          : h.type === 'url'
          ? isDark ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' : 'bg-rose-200 text-rose-950 border-rose-400 font-extrabold'
          : h.type === 'impersonation'
          ? isDark ? 'bg-purple-500/20 text-purple-300 border-purple-500/50' : 'bg-purple-200 text-purple-950 border-purple-400 font-extrabold'
          : isDark ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-blue-200 text-blue-950 border-blue-400 font-extrabold';

        resultElements.push(
          <span
            key={`highlight-${idx}`}
            onClick={() => setSelectedHighlight(selectedHighlight === h.phrase ? null : h.phrase)}
            className={`cursor-pointer px-1.5 py-0.5 rounded border ${highlightColor} font-bold hover:underline transition-all relative group`}
            title={h.explanation}
          >
            {match}
            <span className={`ml-1 text-[10px] uppercase font-mono px-1 rounded border ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300 text-slate-800'
            }`}>
              {h.type}
            </span>
          </span>
        );
      }
    });

    resultElements.push(remainingText);

    return <div className={`text-sm font-mono leading-relaxed whitespace-pre-wrap ${isDark ? 'text-slate-100' : 'text-slate-900 font-medium'}`}>{resultElements}</div>;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Summary Banner */}
      <div className={`p-6 rounded-2xl border shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${verdictBadge.border} ${verdictBadge.bg}`}>
        <div className="flex items-start space-x-4">
          <div className={`p-3.5 rounded-2xl border ${verdictBadge.border} ${verdictBadge.bg}`}>
            <BadgeIcon className={`w-8 h-8 ${verdictBadge.textCol}`} />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border ${verdictBadge.border} ${verdictBadge.textCol}`}>
                {verdictBadge.text}
              </span>
              <span className={`text-xs font-mono font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                Channel: {channel.toUpperCase()} | Lang: {language.toUpperCase()}
              </span>
            </div>
            <h1 className={`text-xl font-black mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {verdict === 'HIGH_RISK_MALICIOUS' ? 'Malicious Phishing & Fraud Attempt Identified' : 'Scam Risk Assessment Completed'}
            </h1>
            <p className={`text-xs mt-1 max-w-2xl font-medium ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              {layers.layer4_llm_zero_day.reasoningExplanation}
            </p>
          </div>
        </div>

        {/* Risk Score Gauge */}
        <div className={`flex flex-col items-center justify-center border rounded-2xl px-6 py-4 min-w-[160px] shadow-sm ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
        }`}>
          <span className={`text-[10px] font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>RISK INDEX</span>
          <div className="flex items-baseline space-x-1 my-1">
            <span className={`text-4xl font-black ${verdictBadge.textCol}`}>
              {overallScore}
            </span>
            <span className={`font-bold text-sm ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>/100</span>
          </div>
          <span className={`text-[10px] font-mono font-bold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
            {layers.layer5_dynamic_risk.recurrenceFactor}
          </span>
        </div>
      </div>

      {/* Scanned Content Breakdown */}
      <div className={`border rounded-2xl p-6 shadow-md space-y-4 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className={`text-xs font-black uppercase tracking-wider flex items-center space-x-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <Eye className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
            <span>Interactive Threat Phrase Breakdown</span>
          </h2>
          <span className={`text-xs font-mono font-bold ${isDark ? 'text-cyan-400' : 'text-blue-800'}`}>
            Click highlighted terms for details
          </span>
        </div>

        <div className={`p-4 rounded-xl border shadow-inner ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
        }`}>
          {renderHighlightedText()}
        </div>

        {/* Highlight Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {highlights.map((h, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border transition-all ${
                selectedHighlight === h.phrase
                  ? isDark ? 'bg-slate-800 border-cyan-500 shadow-md' : 'bg-blue-50 border-blue-500 shadow-md'
                  : isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold font-mono ${
                  isDark ? 'text-rose-300' : 'text-rose-800 font-extrabold'
                }`}>
                  "{h.phrase}"
                </span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                  isDark ? 'bg-slate-800 text-cyan-300 border-slate-700' : 'bg-white text-slate-900 border-slate-300 font-extrabold'
                }`}>
                  {h.type}
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700 font-medium'
              }`}>
                {h.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Persona Vulnerability Matrix */}
      {personaSusceptibility && personaSusceptibility.length > 0 && (
        <div className={`border rounded-2xl p-6 shadow-md space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center space-x-2">
            <UserCheck className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
            <h2 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Persona Profile Vulnerability: {personaSusceptibility[0].personaLabel}
            </h2>
          </div>

          <div className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-700 font-bold'}`}>
                Risk Level for {selectedPersona.toUpperCase()}:
              </span>
              <span className="px-2.5 py-0.5 text-xs font-black rounded-full bg-rose-200 text-rose-950 border border-rose-400 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-500/40">
                {personaSusceptibility[0].vulnerabilityLevel} VULNERABILITY
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              <strong>Targeting Analysis:</strong> {personaSusceptibility[0].targetedReason}
            </p>
            <p className={`text-xs p-2.5 rounded-lg border mt-2 ${
              isDark 
                ? 'text-emerald-300 bg-emerald-950/40 border-emerald-500/30' 
                : 'text-emerald-950 bg-emerald-100 border-emerald-300 font-semibold'
            }`}>
              <strong>Preventative Shield:</strong> {personaSusceptibility[0].preventativeAdvice}
            </p>
          </div>
        </div>
      )}

      {/* 6-Layer Deep Analysis Section */}
      <div className={`border rounded-2xl p-6 shadow-md space-y-6 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className={`flex items-center justify-between border-b pb-4 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div>
            <h2 className={`text-base font-bold flex items-center space-x-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <Layers className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
              <span>ScramAway 6-Layer Security Assessment</span>
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Sequential defensive evaluation from local privacy to zero-day LLM intent reasoning
            </p>
          </div>
        </div>

        {/* Layers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Layer 1: Input & Privacy */}
          <div className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 font-mono">LAYER 1: INPUT & PRIVACY</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Sanitized</span>
              </span>
            </div>
            <h3 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Local Privacy & PII Scrubbing</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
              {layers.layer1_privacy.note}
            </p>
          </div>

          {/* Layer 2: Rule-Based & URL Heuristics */}
          <div className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 font-mono">LAYER 2: RULE-BASED & URLS</span>
              <span className="text-xs text-amber-700 dark:text-amber-400 font-mono font-bold">Score: {layers.layer2_rules.score}/100</span>
            </div>
            <h3 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Tooltip term="Rule Heuristics" content={FRAUD_GLOSSARY.heuristics.definition} /> & Domain Spoofing
            </h3>
            <div className={`text-xs space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              <div>Matched Keywords: {layers.layer2_rules.matchedKeywords.join(', ') || 'None'}</div>
              {layers.layer2_rules.suspiciousUrls.map((u, i) => (
                <div key={i} className="text-rose-900 dark:text-rose-400 font-mono text-[11px] bg-rose-100 dark:bg-rose-950/40 p-1.5 rounded border border-rose-300 dark:border-rose-500/30 font-semibold">
                  Phishing Link: {u.url} ({u.spoofedBrand}) - {u.reason}
                </div>
              ))}
            </div>
          </div>

          {/* Layer 3: Multilingual Context */}
          <div className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 font-mono">LAYER 3: MULTILINGUAL CONTEXT</span>
              <span className="text-xs text-indigo-700 dark:text-indigo-400 font-mono font-bold">{layers.layer3_multilingual_context.detectedLanguage}</span>
            </div>
            <h3 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Contextual Language Intent</h3>
            <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              Intent: {layers.layer3_multilingual_context.intentCategory}
            </p>
            <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Anomalies: {layers.layer3_multilingual_context.linguisticAnomalies.join(', ')}
            </p>
          </div>

          {/* Layer 4: Gemini LLM Zero-Day Reasoning */}
          <div className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 dark:text-cyan-300 font-mono">LAYER 4: GEMINI LLM ZERO-DAY</span>
              <Sparkles className="w-4 h-4 text-blue-700 dark:text-cyan-400" />
            </div>
            <h3 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Psychological Manipulation & <Tooltip term="Zero-Day Threat" content={FRAUD_GLOSSARY.zeroDay.definition} />
            </h3>
            <div className="flex flex-wrap gap-1">
              {layers.layer4_llm_zero_day.psychologicalTactics.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 text-[10px] bg-blue-100 text-blue-900 border border-blue-300 font-bold dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-500/30 rounded">
                  {t}
                </span>
              ))}
            </div>
            <p className={`text-xs italic ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              "{layers.layer4_llm_zero_day.zeroDayPattern}"
            </p>
          </div>

          {/* Layer 5: Dynamic Risk Aggregator */}
          <div className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400 font-mono">LAYER 5: DYNAMIC RISK SCORE</span>
              <span className="text-xs font-extrabold text-rose-700 dark:text-rose-400">{layers.layer5_dynamic_risk.overallScore}/100</span>
            </div>
            <h3 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Threat Recurrence & Velocity</h3>
            <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              Recurrence: {layers.layer5_dynamic_risk.recurrenceFactor}
            </p>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Campaign Velocity: {layers.layer5_dynamic_risk.threatVelocity}
            </p>
          </div>

          {/* Layer 6: Actionable Safeguards */}
          <div className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">LAYER 6: ACTION DASHBOARD</span>
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            </div>
            <h3 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Recommended Defensive Actions</h3>
            <ul className={`list-disc list-inside text-xs space-y-1 ${
              isDark ? 'text-slate-300' : 'text-slate-800 font-medium'
            }`}>
              {layers.layer6_actions.recommendedActions.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Cyber Crime Helpline Footer */}
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark 
            ? 'bg-cyan-950/40 border-cyan-500/30' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="space-y-1">
            <h4 className={`text-xs font-black uppercase tracking-wider ${
              isDark ? 'text-cyan-300' : 'text-blue-900'
            }`}>
              Official Cyber Fraud Reporting Helpline
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
              Lodge a financial fraud report with <strong>National Cyber Crime Portal 1930</strong>.
            </p>
          </div>

          <div className="flex space-x-2">
            {layers.layer6_actions.reportingPortals.map((portal, idx) => (
              <a
                key={idx}
                href={portal.contactOrUrl.includes('http') ? portal.contactOrUrl.split(' / ')[0] : 'https://cybercrime.gov.in'}
                target="_blank"
                rel="noreferrer"
                className={`px-3 py-2 font-bold text-xs rounded-lg flex items-center space-x-1 cursor-pointer transition-all whitespace-nowrap ${
                  isDark 
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950' 
                    : 'bg-blue-700 hover:bg-blue-800 text-white'
                }`}
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

