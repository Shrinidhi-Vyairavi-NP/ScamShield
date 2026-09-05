import React from 'react';
import { UserCheck, Shield, AlertTriangle, GraduationCap, HeartHandshake, Briefcase, Building, CheckCircle2 } from 'lucide-react';
import { UserPersona, ThemeMode, LanguageOption } from '../types';
import { t } from '../lib/i18n';
import { Tooltip, FRAUD_GLOSSARY } from './Tooltip';

interface PersonaProfilerProps {
  activePersona: UserPersona;
  setActivePersona: (p: UserPersona) => void;
  themeMode?: ThemeMode;
  selectedLanguage?: LanguageOption;
}

export const PersonaProfiler: React.FC<PersonaProfilerProps> = ({
  activePersona,
  setActivePersona,
  themeMode = 'dark',
  selectedLanguage = 'english'
}) => {
  const isDark = themeMode === 'dark';
  const lang = selectedLanguage as LanguageOption;

  const personas = [
    {
      id: 'student' as UserPersona,
      title: t('studentTitle', lang),
      icon: GraduationCap,
      description: 'Frequently targeted by Telegram part-time rating jobs, fake overseas grants, and paid assignment scams.',
      riskLevel: 'HIGH VULNERABILITY (78% Targeted)',
      primaryThreats: [
        'Telegram / Instagram "Like & Earn" Rs 3,500/day part-time task fraud',
        'PM / Foreign University Overseas Scholarship document verification fee scams',
        'Fake internship offers requiring upfront deposit for training kits'
      ],
      psychologicalTraps: [
        'Exploits desire for quick pocket money and flexible work hours',
        'Uses peer pressure and fake payment proof screenshots in group chats'
      ],
      protectionChecklist: [
        'Never pay money to receive a job offer or internship kit',
        'Verify university grants on official govt portals (scholarships.gov.in)',
        'Avoid joining unverified Telegram earning groups'
      ]
    },
    {
      id: 'senior' as UserPersona,
      title: t('seniorTitle', lang),
      icon: HeartHandshake,
      description: (
        <span>
          Highly targeted by electricity board disconnection panic threats, pension life certificate <Tooltip term="KYC" content={FRAUD_GLOSSARY.kyc.definition} />, and <Tooltip term="Digital Arrest" content={FRAUD_GLOSSARY.digitalArrest.definition} /> calls.
        </span>
      ),
      riskLevel: 'CRITICAL VULNERABILITY (92% Targeted)',
      primaryThreats: [
        'Urgent Electricity disconnection at 10 PM unless APK app is installed',
        'Bank account & pension block due to incomplete Aadhar/PAN KYC',
        'CBI / Narcotics Bureau Digital Arrest video call extortion'
      ],
      psychologicalTraps: [
        'Capitalizes on fear of losing basic utility services late at night',
        'Leverages legal authority coercion (Supreme Court / Police intimidation)'
      ],
      protectionChecklist: [
        'Electricity boards NEVER send APK download links or demand night transfers',
        'Law enforcement agencies NEVER conduct "Digital Arrests" via Zoom or Skype',
        'Always consult family members before making urgent bank transfers'
      ]
    },
    {
      id: 'job_seeker' as UserPersona,
      title: t('jobSeekerTitle', lang),
      icon: Briefcase,
      description: 'Targeted by fake hiring managers impersonating Amazon, TCS, or Wipro offering remote roles.',
      riskLevel: 'HIGH VULNERABILITY (84% Targeted)',
      primaryThreats: [
        'Data entry / typing job scams requiring security bond deposits',
        'Fake HR appointment letters requesting background check processing fee',
        'Crypto trading task scams promising 200% returns'
      ],
      psychologicalTraps: [
        'Exploits anxiety surrounding employment opportunities',
        'Uses professional-looking forged offer letter PDFs'
      ],
      protectionChecklist: [
        'Legitimate companies NEVER charge candidates for interview selection',
        'Verify company domain in HR emails (e.g., @tcs.com vs @tcs-careers-hr.online)'
      ]
    },
    {
      id: 'business' as UserPersona,
      title: t('businessTitle', lang),
      icon: Building,
      description: 'Targeted by fake GST tax refund notices, vendor invoice fraud, and payment gateway phishing.',
      riskLevel: 'MODERATE VULNERABILITY (65% Targeted)',
      primaryThreats: [
        'Fake GST tax penalty notices demanding immediate fine payment',
        'QR Code / UPI payment receipt spoofing (fake soundbox apps)',
        'Supply chain invoice redirection scams'
      ],
      psychologicalTraps: [
        'Exploits fear of tax authority audit or business account freeze',
        'High-velocity rush during busy trading hours'
      ],
      protectionChecklist: [
        'Verify GST notices on official portal (gst.gov.in)',
        'Always verify incoming UPI payments on your official bank app'
      ]
    }
  ];

  const currentPersona = personas.find(p => p.id === activePersona) || personas[0];
  const Icon = currentPersona.icon;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className={`border rounded-2xl p-6 shadow-md transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center space-x-3 mb-2">
          <UserCheck className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
          <h1 className="text-2xl font-black">
            {t('personaTitle', lang)}
          </h1>
        </div>
        <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {t('personaSubtitle', lang)}
        </p>
      </div>

      {/* Profile Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {personas.map((p) => {
          const PIcon = p.icon;
          const isSelected = activePersona === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setActivePersona(p.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? isDark
                    ? 'bg-slate-800 border-cyan-500 shadow-lg'
                    : 'bg-blue-50 border-blue-600 shadow-md ring-1 ring-blue-600'
                  : isDark
                    ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${
                  isSelected 
                    ? isDark ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-blue-700 text-white font-bold'
                    : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  <PIcon className="w-5 h-5" />
                </div>
                {isSelected && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                    isDark 
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' 
                      : 'bg-blue-100 text-blue-900 border-blue-300'
                  }`}>
                    ACTIVE PROFILE
                  </span>
                )}
              </div>
              <h3 className={`text-sm font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.title}</h3>
              <p className={`text-[11px] line-clamp-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {p.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Active Profile Detailed Vulnerability Report */}
      <div className={`border rounded-2xl p-6 shadow-md space-y-6 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-2xl border ${
              isDark ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{currentPersona.title} Risk Profile</h2>
              <span className={`text-xs font-mono font-bold ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>{currentPersona.riskLevel}</span>
            </div>
          </div>
        </div>

        {/* Primary Threats List */}
        <div className="space-y-3">
          <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-2 ${
            isDark ? 'text-slate-200' : 'text-slate-900'
          }`}>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Top Fraud Campaigns Targeting Your Profile</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentPersona.primaryThreats.map((threat, idx) => (
              <div key={idx} className={`p-4 rounded-xl border text-xs font-medium leading-relaxed ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}>
                <span className={`font-bold font-mono mr-1 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`}>#{idx + 1}</span>
                {threat}
              </div>
            ))}
          </div>
        </div>

        {/* Psychological Manipulation Analysis */}
        <div className={`p-4 rounded-xl border space-y-2 ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-purple-50/50 border-purple-200'
        }`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-purple-300' : 'text-purple-900'
          }`}>
            Psychological Manipulation Vectors
          </h3>
          <ul className={`list-disc list-inside text-xs space-y-1 ${
            isDark ? 'text-slate-300' : 'text-slate-800'
          }`}>
            {currentPersona.psychologicalTraps.map((trap, idx) => (
              <li key={idx}>{trap}</li>
            ))}
          </ul>
        </div>

        {/* Tailored Shield Checklist */}
        <div className="space-y-3">
          <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-2 ${
            isDark ? 'text-emerald-400' : 'text-emerald-800'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Recommended Personal Protection Rules</span>
          </h3>

          <div className="space-y-2">
            {currentPersona.protectionChecklist.map((rule, idx) => (
              <div key={idx} className={`flex items-center space-x-2 text-xs border p-3 rounded-xl ${
                isDark 
                  ? 'bg-emerald-950/30 border-emerald-500/20 text-slate-200' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950 font-medium'
              }`}>
                <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

