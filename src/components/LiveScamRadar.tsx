import React, { useState, useEffect } from 'react';
import { 
  Radio, Search, Filter, ThumbsUp, AlertCircle, Plus, MapPin, 
  Smartphone, MessageSquare, PhoneCall, Mail, CheckCircle2, ShieldAlert, RefreshCw
} from 'lucide-react';
import { ScamRadarItem, ScamChannel } from '../types';

export const LiveScamRadar: React.FC = () => {
  const [radarItems, setRadarItems] = useState<ScamRadarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedChannelFilter, setSelectedChannelFilter] = useState('ALL');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

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
    const matchesRegion = selectedRegion === 'ALL' || item.state === selectedRegion || item.region.includes(selectedRegion);
    const matchesChannel = selectedChannelFilter === 'ALL' || item.channel === selectedChannelFilter;
    return matchesSearch && matchesRegion && matchesChannel;
  });

  return (
    <div className="space-y-6">
      
      {/* Live Radar Header Ticker */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full text-rose-400 text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>LIVE SCAM RADAR • PAN-INDIA & GLOBAL FEEDS</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white">
              Real-Time Active Scam Monitor
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Live intelligence feed of ongoing scams, spoofed SMS campaigns, WhatsApp lotteries, and Digital Arrest calls reported across India.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchRadarData}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition-colors cursor-pointer"
              title="Refresh Feed"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center space-x-1.5 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>REPORT NEW SCAM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by keyword, bank, or state (e.g. SBI, Mumbai, Electricity)..."
              className="w-full bg-slate-950 text-slate-200 placeholder-slate-500 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Region Filter */}
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Regions & States in India</option>
              <option value="Maharashtra">Maharashtra (Mumbai, Pune)</option>
              <option value="Delhi-NCR">Delhi-NCR & Haryana</option>
              <option value="Tamil Nadu">Tamil Nadu (Chennai)</option>
              <option value="Gujarat">Gujarat (Ahmedabad)</option>
              <option value="Karnataka">Karnataka (Bangalore)</option>
              <option value="France">France & Europe</option>
            </select>
          </div>

          {/* Channel Filter */}
          <div className="relative">
            <select
              value={selectedChannelFilter}
              onChange={(e) => setSelectedChannelFilter(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Channels (SMS, WhatsApp, Call, Email)</option>
              <option value="sms">SMS Campaigns</option>
              <option value="whatsapp">WhatsApp Messages</option>
              <option value="call">Phone Calls / Video Fraud</option>
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
            No active scam alerts found matching your filters.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg space-y-3 transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full border ${
                    item.threatLevel === 'CRITICAL'
                      ? 'bg-rose-950 text-rose-400 border-rose-500/50'
                      : 'bg-amber-950 text-amber-400 border-amber-500/50'
                  }`}>
                    {item.threatLevel} THREAT
                  </span>

                  <span className="text-xs font-bold text-slate-200 font-mono">
                    [{item.channel.toUpperCase()}]
                  </span>

                  <span className="text-xs text-slate-400 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{item.state} ({item.region})</span>
                  </span>
                </div>

                <span className="text-[11px] text-slate-500 font-mono">
                  First reported: {item.firstEncountered}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <span>{item.title}</span>
                  {item.verifiedStatus && (
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.2 rounded font-mono">
                      VERIFIED SCAM
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-300 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                  "{item.snippet}"
                </p>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-slate-400 font-mono text-[11px]">
                    <strong className="text-cyan-400">{item.reportedCount.toLocaleString()}</strong> user reports today
                  </span>

                  <button
                    onClick={() => handleUpvote(item.id)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center space-x-1 border border-slate-700 cursor-pointer transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Verify ({item.upvotes})</span>
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                <span>Submit Zero-Day Scam to Live Radar</span>
              </h3>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Scam Campaign Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. SBI Account Disconnection Fraud SMS"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Channel Vector</label>
                  <select
                    value={newChannel}
                    onChange={(e) => setNewChannel(e.target.value as ScamChannel)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="sms">SMS</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="call">Call / Video</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">State / Region</label>
                  <select
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi-NCR">Delhi-NCR</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Pan-India">Pan-India</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Exact Message Content / Phone Number</label>
                <textarea
                  rows={3}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Paste the full text message or URL..."
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Publish Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
