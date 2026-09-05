import React, { useState } from 'react';
import { 
  Mail, MessageSquare, PhoneCall, Radio, AlertTriangle, ShieldAlert, 
  Sparkles, ExternalLink, RefreshCw, Filter, ArrowRight, ShieldCheck
} from 'lucide-react';
import { ScamChannel, ThemeMode } from '../types';

interface DetectedScamItem {
  id: string;
  sourceApp: 'Gmail' | 'Outlook' | 'SMS' | 'WhatsApp' | 'Telegram';
  channel: ScamChannel;
  title: string;
  snippet: string;
  timeAgo: string;
  riskScore: number;
  verdict: 'CRITICAL' | 'HIGH' | 'SUSPICIOUS';
  category: string;
}

interface RecentScamsFeedProps {
  onInspectScam: (text: string, channel: ScamChannel) => void;
  themeMode?: ThemeMode;
}

export const RecentScamsFeed: React.FC<RecentScamsFeedProps> = ({
  onInspectScam,
  themeMode = 'dark'
}) => {
  const isDark = themeMode === 'dark';
  const [filterApp, setFilterApp] = useState<string>('all');
  const [isLiveStream, setIsLiveStream] = useState(true);

  const initialFeedItems: DetectedScamItem[] = [
    {
      id: 'feed_1',
      sourceApp: 'Gmail',
      channel: 'email',
      title: 'Payroll Dept: Direct Deposit Account Verification Needed',
      snippet: 'Your August salary payout is on hold. Click payroll-update-auth.com to submit bank routing info.',
      timeAgo: '2m ago',
      riskScore: 98,
      verdict: 'CRITICAL',
      category: 'Phishing Email'
    },
    {
      id: 'feed_2',
      sourceApp: 'Outlook',
      channel: 'email',
      title: 'IT Support: Office365 Password Expiration in 1 Hour',
      snippet: 'Your company mail account will be suspended. Re-authenticate credentials at portal-m365-login.net.',
      timeAgo: '7m ago',
      riskScore: 94,
      verdict: 'CRITICAL',
      category: 'Credential Harvester'
    },
    {
      id: 'feed_3',
      sourceApp: 'SMS',
      channel: 'sms',
      title: 'SBI Netbanking: Your PAN card update pending',
      snippet: 'Dear Customer your SBI account debited Rs 14,800. If not done by you click http://sbi-panic-hold.cc',
      timeAgo: '14m ago',
      riskScore: 96,
      verdict: 'CRITICAL',
      category: 'Spoofed SMS'
    },
    {
      id: 'feed_4',
      sourceApp: 'WhatsApp',
      channel: 'whatsapp',
      title: 'Telegram Part-time Video Rating: Earn ₹5000/day',
      snippet: 'Pre-pay ₹1000 task deposit to unlock VIP merchant commission wallet on Telegram group.',
      timeAgo: '22m ago',
      riskScore: 88,
      verdict: 'HIGH',
      category: 'Job Task Fraud'
    },
    {
      id: 'feed_5',
      sourceApp: 'Telegram',
      channel: 'whatsapp',
      title: 'Crypto Mining Presale: 500% Guaranteed Staking Yield',
      snippet: 'Connect Phantom wallet now to claim 10,000 free tokens before DEX listing.',
      timeAgo: '35m ago',
      riskScore: 82,
      verdict: 'HIGH',
      category: 'Crypto Scam'
    },
    {
      id: 'feed_6',
      sourceApp: 'SMS',
      channel: 'sms',
      title: 'Electricity Power Cut at 10:30 PM Tonight',
      snippet: 'Your power supply will be disconnected due to unpaid bill. Download Mahavitaran_Update.apk now.',
      timeAgo: '48m ago',
      riskScore: 99,
      verdict: 'CRITICAL',
      category: 'Malicious APK'
    }
  ];

  const filteredItems = initialFeedItems.filter(item => {
    if (filterApp === 'all') return true;
    if (filterApp === 'email') return item.sourceApp === 'Gmail' || item.sourceApp === 'Outlook';
    if (filterApp === 'sms') return item.sourceApp === 'SMS';
    if (filterApp === 'messaging') return item.sourceApp === 'WhatsApp' || item.sourceApp === 'Telegram';
    return true;
  });

  const getSourceIcon = (sourceApp: string) => {
    switch (sourceApp) {
      case 'Gmail':
        return <Mail className="w-3.5 h-3.5 text-rose-400" />;
      case 'Outlook':
        return <Mail className="w-3.5 h-3.5 text-blue-400" />;
      case 'SMS':
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />;
      case 'WhatsApp':
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Telegram':
        return <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <Radio className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div className={`p-4 rounded-2xl border shadow-md space-y-3 ${
      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
    }`}>
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
          </div>
          <div>
            <h3 className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Recent Intercepts
            </h3>
            <span className="text-[10px] text-slate-400 block font-mono">
              Live Extension & App Stream
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsLiveStream(!isLiveStream)}
          className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-full border transition-all ${
            isLiveStream 
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          {isLiveStream ? '● LIVE STREAM' : 'PAUSED'}
        </button>
      </div>

      {/* Source Filter Buttons */}
      <div className="flex space-x-1 text-[10px] font-bold overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setFilterApp('all')}
          className={`px-2 py-1 rounded-lg border cursor-pointer whitespace-nowrap ${
            filterApp === 'all'
              ? isDark ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold' : 'bg-blue-700 text-white border-blue-600'
              : isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
        >
          All (6)
        </button>

        <button
          onClick={() => setFilterApp('email')}
          className={`px-2 py-1 rounded-lg border cursor-pointer whitespace-nowrap ${
            filterApp === 'email'
              ? isDark ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold' : 'bg-blue-700 text-white border-blue-600'
              : isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
        >
          Gmail / Outlook
        </button>

        <button
          onClick={() => setFilterApp('sms')}
          className={`px-2 py-1 rounded-lg border cursor-pointer whitespace-nowrap ${
            filterApp === 'sms'
              ? isDark ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold' : 'bg-blue-700 text-white border-blue-600'
              : isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
        >
          SMS
        </button>

        <button
          onClick={() => setFilterApp('messaging')}
          className={`px-2 py-1 rounded-lg border cursor-pointer whitespace-nowrap ${
            filterApp === 'messaging'
              ? isDark ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold' : 'bg-blue-700 text-white border-blue-600'
              : isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
        >
          WhatsApp / Telegram
        </button>
      </div>

      {/* Feed List Items */}
      <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-xl border text-xs space-y-1.5 transition-all hover:border-cyan-500/50 ${
              isDark ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="p-1 rounded-md bg-slate-800/60 border border-slate-700/60">
                  {getSourceIcon(item.sourceApp)}
                </span>
                <span className={`font-mono font-bold text-[11px] ${
                  item.sourceApp === 'Gmail' ? 'text-rose-400' :
                  item.sourceApp === 'Outlook' ? 'text-blue-400' :
                  'text-emerald-400'
                }`}>
                  {item.sourceApp}
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] text-slate-400 font-mono">{item.timeAgo}</span>
                <span className={`px-1.5 py-0.2 text-[9px] font-mono font-bold rounded ${
                  item.verdict === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                  'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {item.riskScore}% RISK
                </span>
              </div>
            </div>

            <h4 className={`font-bold text-[11px] line-clamp-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              {item.title}
            </h4>

            <p className={`text-[10px] line-clamp-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              "{item.snippet}"
            </p>

            <div className="pt-1 flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase text-cyan-400/80">
                Category: {item.category}
              </span>

              <button
                onClick={() => onInspectScam(item.snippet, item.channel)}
                className={`text-[10px] font-extrabold flex items-center space-x-1 px-2 py-1 rounded transition-colors cursor-pointer ${
                  isDark 
                    ? 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20' 
                    : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                }`}
              >
                <span>Pre-fill Scan</span>
                <ArrowRight className="w-3 h-3 ml-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
