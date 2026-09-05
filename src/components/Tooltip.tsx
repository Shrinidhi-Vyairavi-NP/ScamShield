import React, { useState } from 'react';
import { HelpCircle, Info } from 'lucide-react';

interface TooltipProps {
  term?: string;
  content: string | React.ReactNode;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  iconOnly?: boolean;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  term,
  content,
  children,
  position = 'top',
  iconOnly = false,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-1 border-t-slate-900 border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-slate-900 border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1 border-l-slate-900 border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1 border-r-slate-900 border-y-transparent border-l-transparent'
  };

  return (
    <span 
      className={`relative inline-flex items-center group ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      role="tooltip"
    >
      {children ? (
        children
      ) : iconOnly ? (
        <span className="inline-flex items-center text-cyan-500 hover:text-cyan-400 dark:text-cyan-400 dark:hover:text-cyan-300 ml-1 cursor-help transition-colors">
          <HelpCircle className="w-3.5 h-3.5 inline-block align-middle" />
        </span>
      ) : (
        <span className="inline-flex items-center border-b border-dashed border-cyan-500/60 dark:border-cyan-400/60 text-current cursor-help hover:border-cyan-400 transition-colors">
          <span>{term}</span>
          <Info className="w-3 h-3 ml-1 text-cyan-500 dark:text-cyan-400 opacity-80 group-hover:opacity-100 flex-shrink-0 inline" />
        </span>
      )}

      {/* Tooltip Content Box */}
      <span
        className={`absolute ${positionClasses[position]} z-50 w-64 p-2.5 rounded-xl shadow-2xl text-[11px] font-normal normal-case tracking-normal leading-relaxed text-slate-100 bg-slate-950 border border-slate-700/80 backdrop-blur-md transition-all duration-150 pointer-events-none ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <span className="block font-bold text-cyan-400 mb-0.5 border-b border-slate-800 pb-1">
          {term || 'Term Explanation'}
        </span>
        <span className="block text-slate-300 font-sans">
          {content}
        </span>
        <span className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`} />
      </span>
    </span>
  );
};

// Dictionary of Complex Fraud Term Definitions for easy reuse across app
export const FRAUD_GLOSSARY: Record<string, { term: string; definition: string }> = {
  digitalArrest: {
    term: "Digital Arrest",
    definition: "Coercive scam where fraudsters impersonate CBI, Police, or Narcotics officers over Skype/Video call to keep victims under 'virtual custody' and demand immediate extortion money."
  },
  zeroDay: {
    term: "Zero-Day Scam",
    definition: "Newly created phishing domain, vector, or scam script that has never been recorded in traditional threat databases or blacklists."
  },
  kyc: {
    term: "KYC (Know Your Customer)",
    definition: "Mandatory bank identity verification process frequently spoofed in panic SMS messages ('Account will be blocked tonight') to steal passwords & OTPs."
  },
  heuristics: {
    term: "AI Heuristics",
    definition: "Pattern-recognition rules analyzing urgency indicators, structural anomalies, and coercive phrasing rather than relying on static keyword lists."
  },
  apk: {
    term: "APK File Scam",
    definition: "Malicious Android installation file sent via WhatsApp or SMS under the guise of an electricity bill or banking app, designed to install remote keyloggers."
  },
  threatVelocity: {
    term: "Threat Velocity",
    definition: "The percentage acceleration and surge in reported victim incidents for a specific fraud campaign within a designated timeframe."
  },
  telemetry: {
    term: "Live Telemetry",
    definition: "Aggregated, real-time cyber incident stream tracking emerging scam campaigns and regional geographical hotspots."
  },
  explainability: {
    term: "6-Layer Explainability",
    definition: "Transparent AI diagnostic breakdown showing specific risk signals like linguistic urgency, domain creation age, sender spoofing, and pattern matching."
  },
  spoofedSms: {
    term: "Spoofed SMS",
    definition: "Text message sent using a manipulated sender ID (e.g. AD-SBIBNK) to falsely mimic legitimate bank communications."
  },
  sextortion: {
    term: "Sextortion",
    definition: "Blackmail scheme where fraudsters trick victims into video calls, record spliced compromised video, and demand ransom under threat of public leak."
  },
  parcelScam: {
    term: "FedEx / Customs Scam",
    definition: "Impersonation of customs or courier officials claiming a package in your name contains drugs or fake passports, demanding clearance fees."
  },
  zeroRetention: {
    term: "Zero-Retention Privacy",
    definition: "Privacy architecture ensuring user inputs and analyzed text are processed purely in memory and immediately wiped without persistent database storage."
  }
};
