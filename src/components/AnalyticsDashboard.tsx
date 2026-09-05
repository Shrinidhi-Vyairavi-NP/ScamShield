import React, { useState } from 'react';
import { 
  BarChart3, ShieldAlert, CheckCircle2, Search, Download, 
  PieChart as PieIcon, TrendingUp, Calendar, FileText, ArrowUpRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { DetectionHistoryItem, ThemeMode, LanguageOption } from '../types';
import { t } from '../lib/i18n';
import { Tooltip as TermTooltip, FRAUD_GLOSSARY } from './Tooltip';

interface AnalyticsDashboardProps {
  themeMode?: ThemeMode;
  selectedLanguage?: LanguageOption;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ 
  themeMode = 'dark',
  selectedLanguage = 'english'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const isDark = themeMode === 'dark';
  const lang = selectedLanguage as LanguageOption;

  // Mock telemetry data for charts
  const weeklyTrends = [
    { day: 'Mon', sms: 340, whatsapp: 280, email: 120, call: 90 },
    { day: 'Tue', sms: 410, whatsapp: 310, email: 150, call: 110 },
    { day: 'Wed', sms: 590, whatsapp: 420, email: 190, call: 140 },
    { day: 'Thu', sms: 720, whatsapp: 530, email: 210, call: 180 },
    { day: 'Fri', sms: 890, whatsapp: 640, email: 280, call: 230 },
    { day: 'Sat', sms: 950, whatsapp: 780, email: 310, call: 290 },
    { day: 'Sun', sms: 1120, whatsapp: 890, email: 340, call: 310 }
  ];

  const channelDistribution = [
    { name: 'SMS Phishing', value: 42, color: '#38bdf8' },
    { name: 'WhatsApp Scams', value: 31, color: '#34d399' },
    { name: 'Email Phishing', value: 16, color: '#a78bfa' },
    { name: 'Call / Digital Arrest', value: 11, color: '#f43f5e' }
  ];

  // Recent Scan History
  const historyItems: DetectionHistoryItem[] = [
    {
      id: 'scan-8812',
      snippet: 'Priya Graahak, Aapka SBI Khata KYC update na hone ki wajah se Aaj Raat 10 PM par suspend ho jayega...',
      channel: 'sms',
      overallScore: 94,
      verdict: 'HIGH_RISK_MALICIOUS',
      date: '2026-08-07 13:42',
      language: 'Hindi',
      persona: 'senior'
    },
    {
      id: 'scan-8811',
      snippet: 'Anbu nanbarae! Part-time WFH Job daily income Rs. 3500-5000. Registration fee Rs 499...',
      channel: 'whatsapp',
      overallScore: 88,
      verdict: 'HIGH_RISK_MALICIOUS',
      date: '2026-08-07 12:15',
      language: 'Tamil',
      persona: 'student'
    },
    {
      id: 'scan-8810',
      snippet: 'INFO ANTAI: Vous avez un retard de paiement d\'amende stationnement de 35,00 €...',
      channel: 'sms',
      overallScore: 82,
      verdict: 'HIGH_RISK_MALICIOUS',
      date: '2026-08-07 10:05',
      language: 'French',
      persona: 'general'
    },
    {
      id: 'scan-8809',
      snippet: 'Meeting confirmation for tomorrow at 3 PM via Google Meet link...',
      channel: 'email',
      overallScore: 12,
      verdict: 'SAFE',
      date: '2026-08-06 18:30',
      language: 'English',
      persona: 'business'
    },
    {
      id: 'scan-8808',
      snippet: 'High Court Notice: Digital Arrest Order under section 420 IPC by Narcotics Bureau...',
      channel: 'call',
      overallScore: 98,
      verdict: 'HIGH_RISK_MALICIOUS',
      date: '2026-08-06 14:20',
      language: 'English',
      persona: 'senior'
    }
  ];

  const handleDownloadReport = () => {
    const jsonReport = JSON.stringify({
      generatedBy: "ScramAway AI Threat Intelligence",
      timestamp: new Date().toISOString(),
      summaryStats: {
        totalScansCompleted: 14820,
        threatsBlocked: 11420,
        zeroDayCatchRate: "99.4%"
      },
      recentScans: historyItems
    }, null, 2);

    const blob = new Blob([jsonReport], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ScramAway_Incident_Report_${Date.now()}.json`;
    a.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const filteredHistory = historyItems.filter(item =>
    item.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className={`border rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div>
          <div className={`inline-flex items-center space-x-2 border px-3 py-1 rounded-full text-xs font-bold mb-2 ${
            isDark ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <BarChart3 className="w-3.5 h-3.5" />
            <span>GLOBAL THREAT METRICS & DETECTION LOGS</span>
          </div>
          <h1 className="text-2xl font-black">
            {t('analyticsTitle', lang)}
          </h1>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('analyticsSubtitle', lang)}
          </p>
        </div>

        <button
          onClick={handleDownloadReport}
          className={`px-5 py-2.5 font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-2 cursor-pointer transition-all ${
            isDark 
              ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20' 
              : 'bg-blue-700 hover:bg-blue-800 text-white'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>{downloadSuccess ? 'REPORT DOWNLOADED!' : t('exportReportBtn', lang)}</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`border p-5 rounded-2xl shadow-md space-y-1 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <span className={`text-[11px] font-extrabold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('totalScanned', lang)}</span>
          <div className={`text-3xl font-black font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>14,820</div>
          <span className={`text-[10px] flex items-center space-x-1 font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
            <TrendingUp className="w-3 h-3" />
            <span>+24% vs last week</span>
          </span>
        </div>

        <div className={`border p-5 rounded-2xl shadow-md space-y-1 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <span className={`text-[11px] font-extrabold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('scamsBlocked', lang)}</span>
          <div className="text-3xl font-black text-rose-500 font-mono">11,420</div>
          <span className="text-[10px] text-rose-600 dark:text-rose-400 flex items-center space-x-1 font-bold">
            <ShieldAlert className="w-3 h-3" />
            <span>77.0% High Threat Rate</span>
          </span>
        </div>

        <div className={`border p-5 rounded-2xl shadow-md space-y-1 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <span className={`text-[11px] font-extrabold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <TermTooltip term={t('zeroDayCatchRate', lang)} content={FRAUD_GLOSSARY.zeroDay.definition} />
          </span>
          <div className={`text-3xl font-black font-mono ${isDark ? 'text-cyan-400' : 'text-blue-700'}`}>99.4%</div>
          <span className={`text-[10px] font-bold ${isDark ? 'text-cyan-400' : 'text-blue-700'}`}>
            Gemini 2.5 Multilingual Reasoning
          </span>
        </div>

        <div className={`border p-5 rounded-2xl shadow-md space-y-1 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <span className={`text-[11px] font-extrabold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t('avgScanLatency', lang)}</span>
          <div className={`text-3xl font-black font-mono ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>120 ms</div>
          <span className={`text-[10px] font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
            Sub-second <TermTooltip term="Zero-Retention" content={FRAUD_GLOSSARY.zeroRetention.definition} /> Inference
          </span>
        </div>
      </div>

      {/* Visual Recharts Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Threat Velocity Bar Chart */}
        <div className={`lg:col-span-2 border rounded-2xl p-6 shadow-md space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <h2 className={`text-sm font-extrabold uppercase tracking-wider flex items-center space-x-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <TrendingUp className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
            <span>Weekly Scam Volume Trends by Channel</span>
          </h2>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTrends}>
                <XAxis dataKey="day" stroke={isDark ? '#64748b' : '#475569'} fontSize={11} />
                <YAxis stroke={isDark ? '#64748b' : '#475569'} fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderColor: isDark ? '#334155' : '#cbd5e1', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="sms" name="SMS" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="whatsapp" name="WhatsApp" fill="#34d399" radius={[4, 4, 0, 0]} />
                <Bar dataKey="email" name="Email" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                <Bar dataKey="call" name="Call" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Distribution Pie Chart */}
        <div className={`border rounded-2xl p-6 shadow-md space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <h2 className={`text-sm font-extrabold uppercase tracking-wider flex items-center space-x-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <PieIcon className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
            <span>Channel Vector Share</span>
          </h2>

          <div className="h-48 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {channelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderColor: isDark ? '#334155' : '#cbd5e1', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2">
            {channelDistribution.map((item, idx) => (
              <div key={idx} className={`flex items-center justify-between text-xs font-semibold ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span>{item.name}</span>
                </div>
                <span className="font-mono font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Detection History Table */}
      <div className={`border rounded-2xl p-6 shadow-md space-y-4 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className={`text-sm font-extrabold uppercase tracking-wider flex items-center space-x-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <FileText className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
            <span>Recent Detection Log & Incident History</span>
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search history..."
              className={`w-full border rounded-xl pl-8 pr-3 py-1.5 text-xs font-medium focus:outline-none ${
                isDark ? 'bg-slate-950 text-slate-200 placeholder-slate-500 border-slate-800 focus:border-cyan-500' : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-blue-600'
              }`}
            />
          </div>
        </div>

        {/* History Table */}
        <div className="overflow-x-auto">
          <table className={`w-full text-left text-xs ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
            <thead className={`font-mono uppercase text-[10px] border-b ${
              isDark ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-300 font-bold'
            }`}>
              <tr>
                <th className="p-3">ID & Date</th>
                <th className="p-3">Vector</th>
                <th className="p-3">Message Snippet</th>
                <th className="p-3">Language</th>
                <th className="p-3">Risk Score</th>
                <th className="p-3">Verdict</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
              {filteredHistory.map((item) => (
                <tr key={item.id} className={isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                  <td className={`p-3 font-mono text-[11px] whitespace-nowrap ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <div className="font-bold">{item.id}</div>
                    <div className="text-[10px]">{item.date}</div>
                  </td>
                  <td className="p-3 uppercase font-bold text-[10px]">
                    <span className={`px-2 py-0.5 rounded border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-cyan-300' : 'bg-slate-100 border-slate-300 text-blue-900'
                    }`}>
                      {item.channel}
                    </span>
                  </td>
                  <td className={`p-3 max-w-xs truncate font-mono font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                    "{item.snippet}"
                  </td>
                  <td className={`p-3 font-mono ${isDark ? 'text-slate-400' : 'text-slate-700 font-semibold'}`}>
                    {item.language}
                  </td>
                  <td className="p-3 font-mono font-black text-rose-500">
                    {item.overallScore}/100
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-full border ${
                      item.verdict === 'HIGH_RISK_MALICIOUS'
                        ? 'bg-rose-100 text-rose-950 border-rose-400 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-500/50'
                        : 'bg-emerald-100 text-emerald-950 border-emerald-400 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-500/50'
                    }`}>
                      {item.verdict}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

