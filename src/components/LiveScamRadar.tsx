import React, { useState, useEffect } from 'react';
import { 
  Radio, Search, Filter, ThumbsUp, AlertCircle, Plus, MapPin, 
  Smartphone, MessageSquare, PhoneCall, Mail, CheckCircle2, ShieldAlert, RefreshCw
} from 'lucide-react';
import { ScamRadarItem, ScamChannel, ThemeMode, LanguageOption } from '../types';
import { D3ScamGeoMap } from './D3ScamGeoMap';
import { t } from '../lib/i18n';
import { Tooltip, FRAUD_GLOSSARY } from './Tooltip';

interface LiveScamRadarProps {
  themeMode?: ThemeMode;
  selectedLanguage?: LanguageOption;
}

export const LiveScamRadar: React.FC<LiveScamRadarProps> = ({ 
  themeMode = 'dark',
  selectedLanguage = 'english'
}) => {
  const lang: LanguageOption = selectedLanguage as LanguageOption;
  const [radarItems, setRadarItems] = useState<ScamRadarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedChannelFilter, setSelectedChannelFilter] = useState('ALL');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const isDark = themeMode === 'dark';

  // New Scam Report form state
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newChannel, setNewChannel] = useState<ScamChannel>('sms');
  const [newState, setNewState] = useState('Maharashtra');

  const fetchRadarData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/scam-radar');
      const data = await res.json();
      setRadarItems(data.items || []);
    } catch (err) {
      console.error('Error fetching radar data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRadarData();
  }, []);

  const handleUpvote = async (id: string) => {
    try {
      const res = await fetch('/api/upvote-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setRadarItems(prev => prev.map(item => item.id === id ? data.item : item));
      }
    } catch (err) {
      console.error('Upvote error:', err);
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;

    try {
      const res = await fetch('/api/submit-scam-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          text: newText,
          channel: newChannel,
          state: newState,
          region: 'India'
        })
      });
      const data = await res.json();
      if (data.success) {
        setRadarItems(prev => [data.item, ...prev]);
        setIsReportModalOpen(false);
        setNewTitle('');
        setNewText('');
      }
    } catch (err) {
      console.error('Submit report error:', err);
    }
  };

  const filteredItems = radarItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'all' || 
                          item.state.toLowerCase().includes(selectedRegion.toLowerCase()) || 
                          item.region.toLowerCase().includes(selectedRegion.toLowerCase());
    
    const matchesChannel = selectedChannelFilter === 'ALL' || item.channel === selectedChannelFilter;
    
    return matchesSearch && matchesRegion && matchesChannel;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className={`border rounded-2xl p-6 shadow-md relative overflow-hidden transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full text-rose-500 text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>
                <Tooltip term="LIVE TELEMETRY" content={FRAUD_GLOSSARY.telemetry.definition} /> • PAN-INDIA & REGIONAL FRAUD MAP
              </span>
            </div>
            <h1 className="text-2xl font-black">
              {t('radarTitle', lang)}
            </h1>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t('radarSubtitle', lang)}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchRadarData}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
              title={t('refreshFeedBtn', lang)}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className={`px-4 py-2.5 font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5 cursor-pointer transition-all ${
                isDark 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20' 
                  : 'bg-blue-700 hover:bg-blue-800 text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{t('reportScamBtn', lang)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* D3 Geo-Spatial Map Component */}
      <D3ScamGeoMap
        themeMode={themeMode}
        selectedLanguage={lang}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        radarItems={radarItems}
      />

      {/* Filter & Search Bar */}
      <div className={`border rounded-2xl p-4 shadow-md space-y-4 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchRadarPlaceholder', lang)}
              className={`w-full border rounded-xl pl-9 pr-4 py-2 text-xs font-medium focus:outline-none ${
                isDark 
                  ? 'bg-slate-950 text-slate-200 placeholder-slate-500 border-slate-800 focus:border-cyan-500' 
                  : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-300 focus:border-blue-600'
              }`}
            />
          </div>

          {/* Region Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className={`w-full border rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none cursor-pointer ${
                isDark 
                  ? 'bg-slate-950 text-slate-200 border-slate-800 focus:border-cyan-500' 
                  : 'bg-slate-50 text-slate-900 border-slate-300 focus:border-blue-600'
              }`}
            >
              <option value="all">{t('allRegions', lang)}</option>
              <option value="Maharashtra">Maharashtra (Mumbai, Pune)</option>
              <option value="Delhi-NCR">Delhi-NCR (Gurugram, Noida)</option>
              <option value="Tamil Nadu">Tamil Nadu (Chennai)</option>
              <option value="Karnataka">Karnataka (Bengaluru)</option>
              <option value="Gujarat">Gujarat (Ahmedabad, Surat)</option>
              <option value="Telangana">Telangana (Hyderabad)</option>
              <option value="West Bengal">West Bengal (Kolkata)</option>
              <option value="Bihar">Bihar (Patna)</option>
              <option value="Rajasthan">Rajasthan (Jaipur)</option>
              <option value="Punjab">Punjab (Chandigarh)</option>
            </select>
          </div>

          {/* Channel Filter */}
          <div className="relative">
            <select
              value={selectedChannelFilter}
              onChange={(e) => setSelectedChannelFilter(e.target.value)}
              className={`w-full border rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none cursor-pointer ${
                isDark 
                  ? 'bg-slate-950 text-slate-200 border-slate-800 focus:border-cyan-500' 
                  : 'bg-slate-50 text-slate-900 border-slate-300 focus:border-blue-600'
              }`}
            >
              <option value="ALL">{t('allChannels', lang)}</option>
              <option value="sms">SMS Campaigns</option>
              <option value="whatsapp">WhatsApp Messages</option>
              <option value="call">Phone / Video Coercion Calls</option>
              <option value="email">Email Phishing</option>
            </select>
          </div>

        </div>
      </div>

      {/* Live Feed Items List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs flex justify-center items-center space-x-2">
            <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Fetching live threat telemetry...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className={`border rounded-2xl p-8 text-center text-xs ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
          }`}>
            No active scam alerts found matching your selected map filters.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`border rounded-2xl p-5 shadow-md space-y-3 transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full border ${
                    item.threatLevel === 'CRITICAL'
                      ? 'bg-rose-100 text-rose-950 border-rose-400 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-500/50'
                      : 'bg-amber-100 text-amber-950 border-amber-400 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-500/50'
                  }`}>
                    {item.threatLevel} THREAT
                  </span>

                  <span className={`text-xs font-bold font-mono ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                    [{item.channel.toUpperCase()}]
                  </span>

                  <span className={`text-xs flex items-center space-x-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <MapPin className={`w-3 h-3 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
                    <span>{item.state} ({item.region})</span>
                  </span>
                </div>

                <span className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                  First reported: {item.firstEncountered}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className={`text-sm font-black flex items-center space-x-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <span>{item.title}</span>
                  {item.verifiedStatus && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-950 border border-emerald-400 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-500/40 px-1.5 py-0.2 rounded font-mono font-bold">
                      {t('verifiedBadge', lang)}
                    </span>
                  )}
                </h3>
                <p className={`text-xs font-mono p-3 rounded-xl border leading-relaxed ${
                  isDark 
                    ? 'bg-slate-950 text-slate-300 border-slate-800' 
                    : 'bg-slate-50 text-slate-900 border-slate-300 font-medium'
                }`}>
                  "{item.snippet}"
                </p>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      isDark 
                        ? 'bg-slate-800 text-slate-300 border-slate-700' 
                        : 'bg-slate-100 text-slate-800 border-slate-300'
                    }`}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`font-mono text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <strong className={isDark ? 'text-cyan-400' : 'text-blue-700'}>{item.reportedCount.toLocaleString()}</strong> user reports
                  </span>

                  <button
                    onClick={() => handleUpvote(item.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 border cursor-pointer transition-colors ${
                      isDark 
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
                    <span>{t('verifyBtn', lang)} ({item.upvotes})</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Report New Scam Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`border rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <h3 className={`text-sm font-extrabold uppercase tracking-wider flex items-center space-x-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <ShieldAlert className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`} />
                <span>{t('submitReportModalTitle', lang)}</span>
              </h3>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Scam Campaign Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. SBI Account Disconnection Fraud SMS"
                  required
                  className={`w-full border rounded-xl p-2.5 font-medium focus:outline-none ${
                    isDark ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Channel Vector</label>
                  <select
                    value={newChannel}
                    onChange={(e) => setNewChannel(e.target.value as ScamChannel)}
                    className={`w-full border rounded-xl p-2.5 font-semibold focus:outline-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  >
                    <option value="sms">SMS</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="call">Call / Video</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">State / Region</label>
                  <select
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className={`w-full border rounded-xl p-2.5 font-semibold focus:outline-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi-NCR">Delhi-NCR</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Pan-India">Pan-India</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Exact Message Content / Phone Number</label>
                <textarea
                  rows={3}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Paste the full text message or URL..."
                  required
                  className={`w-full border rounded-xl p-2.5 font-medium focus:outline-none resize-none ${
                    isDark ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-cyan-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600'
                  }`}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className={`px-4 py-2 rounded-xl font-bold cursor-pointer ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 font-extrabold rounded-xl shadow-md cursor-pointer ${
                    isDark ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950' : 'bg-blue-700 hover:bg-blue-800 text-white'
                  }`}
                >
                  {t('publishReportBtn', lang)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
