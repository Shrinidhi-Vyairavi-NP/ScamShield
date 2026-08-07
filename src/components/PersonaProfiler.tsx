import React from 'react';
import { UserCheck, Shield, AlertTriangle, GraduationCap, HeartHandshake, Briefcase, Building, CheckCircle2, Lock } from 'lucide-react';
import { UserPersona } from '../types';

interface PersonaProfilerProps {
  activePersona: UserPersona;
  setActivePersona: (p: UserPersona) => void;
}

export const PersonaProfiler: React.FC<PersonaProfilerProps> = ({
  activePersona,
  setActivePersona
}) => {
  const personas = [
    {
      id: 'student' as UserPersona,
      title: 'College Student / Youth',
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
      title: 'Senior Citizen (60+)',
      icon: HeartHandshake,
      description: 'Highly targeted by electricity board disconnection panic threats, pension life certificate KYC, and Digital Arrest calls.',
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
      title: 'Job Seeker & Freelancer',
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
      title: 'Small Business / Merchant',
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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <UserCheck className="w-6 h-6 text-cyan-400" />
          <h1 className="text-2xl font-extrabold text-white">
            Personalized Scam Risk Profiler
          </h1>
        </div>
        <p className="text-xs text-slate-300">
          ShieldScam AI customizes threat detection heuristics based on user demographics and daily digital habits.
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
                  ? 'bg-slate-800 border-cyan-500 shadow-xl shadow-cyan-500/10'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}>
                  <PIcon className="w-5 h-5" />
                </div>
                {isSelected && (
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded-full font-bold">
                    ACTIVE PROFILE
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{p.title}</h3>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {p.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Active Profile Detailed Vulnerability Report */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{currentPersona.title} Risk Profile</h2>
              <span className="text-xs text-rose-400 font-mono font-bold">{currentPersona.riskLevel}</span>
            </div>
          </div>
        </div>

        {/* Primary Threats List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Top Fraud Campaigns Targeting Your Profile</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentPersona.primaryThreats.map((threat, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 font-medium leading-relaxed">
                <span className="text-cyan-400 font-bold font-mono mr-1">#{idx + 1}</span>
                {threat}
              </div>
            ))}
          </div>
        </div>

        {/* Psychological Manipulation Analysis */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
            Psychological Manipulation Vectors
          </h3>
          <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
            {currentPersona.psychologicalTraps.map((trap, idx) => (
              <li key={idx}>{trap}</li>
            ))}
          </ul>
        </div>

        {/* Tailored Shield Checklist */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Recommended Personal Protection Rules</span>
          </h3>

          <div className="space-y-2">
            {currentPersona.protectionChecklist.map((rule, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs text-slate-200 bg-emerald-950/30 border border-emerald-500/20 p-3 rounded-xl">
                <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
