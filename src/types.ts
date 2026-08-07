export type ScamChannel = 'sms' | 'email' | 'whatsapp' | 'call' | 'url';

export type LanguageOption = 
  | 'english' 
  | 'hindi' 
  | 'tamil' 
  | 'telugu' 
  | 'bengali' 
  | 'french' 
  | 'latin' 
  | 'spanish';

export type UserPersona = 'student' | 'senior' | 'job_seeker' | 'business' | 'general';

export interface SuspiciousUrlFlag {
  url: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  domainAge: string;
  spoofedBrand?: string;
  reason: string;
}

export interface HighlightItem {
  phrase: string;
  type: 'urgency' | 'url' | 'fake_brand' | 'money_request' | 'impersonation' | 'suspicious_phone';
  explanation: string;
}

export interface LayerAnalysis {
  layer1_privacy: {
    passed: boolean;
    anonymized: boolean;
    note: string;
  };
  layer2_rules: {
    score: number; // 0-100
    matchedKeywords: string[];
    suspiciousUrls: SuspiciousUrlFlag[];
    domainFlags: string[];
  };
  layer3_multilingual_context: {
    score: number;
    detectedLanguage: string;
    intentCategory: string;
    linguisticAnomalies: string[];
    culturalContext: string;
  };
  layer4_llm_zero_day: {
    score: number;
    zeroDayPattern: string;
    psychologicalTactics: string[];
    reasoningExplanation: string;
  };
  layer5_dynamic_risk: {
    overallScore: number; // 0 to 100
    verdict: 'SAFE' | 'SUSPICIOUS' | 'HIGH_RISK_MALICIOUS';
    recurrenceFactor: string;
    threatVelocity: string;
    confidence: number;
  };
  layer6_actions: {
    recommendedActions: string[];
    reportingPortals: { name: string; contactOrUrl: string; description: string }[];
  };
}

export interface PersonaSusceptibility {
  persona: UserPersona;
  personaLabel: string;
  vulnerabilityLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  targetedReason: string;
  preventativeAdvice: string;
}

export interface ScamAnalysisResult {
  id: string;
  scannedText: string;
  channel: ScamChannel;
  timestamp: string;
  language: LanguageOption;
  selectedPersona: UserPersona;
  layers: LayerAnalysis;
  highlights: HighlightItem[];
  personaSusceptibility: PersonaSusceptibility[];
}

export interface ScamRadarItem {
  id: string;
  title: string;
  channel: ScamChannel;
  region: string;
  state: string;
  reportedCount: number;
  firstEncountered: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
  category: string;
  snippet: string;
  targetPersona: string;
  verifiedStatus: boolean;
  upvotes: number;
  tags: string[];
}

export interface DetectionHistoryItem {
  id: string;
  snippet: string;
  channel: ScamChannel;
  overallScore: number;
  verdict: 'SAFE' | 'SUSPICIOUS' | 'HIGH_RISK_MALICIOUS';
  date: string;
  language: string;
  persona: UserPersona;
}
