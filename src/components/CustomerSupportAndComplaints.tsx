import React, { useState } from 'react';
import { 
  Headphones, PhoneCall, ShieldAlert, FileText, Send, AlertTriangle, 
  CheckCircle2, Clock, ExternalLink, Bot, HelpCircle, Plus, Search, 
  ChevronRight, Lock, Building, RefreshCw, MessageSquare
} from 'lucide-react';
import { ComplaintTicket, ScamChannel, ThemeMode, LanguageOption } from '../types';
import { t } from '../lib/i18n';
import { Tooltip, FRAUD_GLOSSARY } from './Tooltip';

interface CustomerSupportAndComplaintsProps {
  themeMode?: ThemeMode;
  selectedLanguage?: LanguageOption;
  onOpenAuth?: () => void;
}

export const CustomerSupportAndComplaints: React.FC<CustomerSupportAndComplaintsProps> = ({
  themeMode = 'dark',
  selectedLanguage = 'english',
  onOpenAuth
}) => {
  const isDark = themeMode === 'dark';
  const lang = selectedLanguage as LanguageOption;

  // Initial Sample Tickets
  const [tickets, setTickets] = useState<ComplaintTicket[]>([
    {
      id: 'tkt_101',
      ticketNumber: 'CR-2026-88102',
      category: 'Digital Arrest Coercion Call',
      channel: 'call',
      amountLost: 0,
      incidentDate: '2026-08-06',
      suspectDetails: '+91 99012 88301 (Impersonating CBI Officer)',
      description: 'Received video call claiming my Aadhaar was linked to money laundering in Mumbai. Demanded video interrogation.',
      status: 'FORWARDED_TO_1930',
      createdAt: '2026-08-06 14:30',
      officialRefNumber: '1930-IN-981244'
    },
    {
      id: 'tkt_102',
      ticketNumber: 'CR-2026-77319',
      category: 'Fake SBI KYC Phishing SMS',
      channel: 'sms',
      amountLost: 25000,
      incidentDate: '2026-08-02',
      suspectDetails: 'URL: http://sbi-verify-kyc.net',
      description: 'Received SMS stating account blocked. Clicked link and entered netbanking credentials before realizing it was spoofed.',
      status: 'BANK_NOTIFIED',
      createdAt: '2026-08-02 09:15',
      officialRefNumber: 'RBI-OMB-2026-1102'
    }
  ]);

  // Form State
  const [activeTab, setActiveTab] = useState<'form' | 'tickets' | 'chat'>('form');
  const [category, setCategory] = useState('Unauthorized Banking / UPI Debit');
  const [channel, setChannel] = useState<ScamChannel>('sms');
  const [amountLost, setAmountLost] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [suspectDetails, setSuspectDetails] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTicket, setSuccessTicket] = useState<ComplaintTicket | null>(null);

  // AI Assistant Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Hello! I am your 24/7 AI Cyber Emergency Assistant. If you have been targeted by a fraud or lost money, tell me what happened so I can give you instant account freezing steps.',
      time: 'Just now'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');

  // Handle Form Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !suspectDetails) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newTicket: ComplaintTicket = {
        id: 'tkt_' + Math.random().toString(36).substring(2, 8),
        ticketNumber: 'CR-2026-' + Math.floor(10000 + Math.random() * 90000),
        category,
        channel,
        amountLost: amountLost ? parseFloat(amountLost) : 0,
        incidentDate: incidentDate || new Date().toISOString().split('T')[0],
        suspectDetails,
        description,
        status: 'UNDER_AI_REVIEW',
        createdAt: new Date().toLocaleString(),
        officialRefNumber: '1930-PENDING-' + Math.floor(1000 + Math.random() * 9000)
      };

      setTickets([newTicket, ...tickets]);
      setSuccessTicket(newTicket);
      // Reset form
      setDescription('');
      setSuspectDetails('');
      setAmountLost('');
    }, 800);
  };

  // AI Assistant Question
  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || inputQuestion;
    if (!messageText.trim()) return;

    const userMsg = { sender: 'user' as const, text: messageText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, userMsg]);
    setInputQuestion('');

    setTimeout(() => {
      let responseText = "If you have transferred funds to a fraudster, call Cybercrime Helpline 1930 immediately to freeze the destination bank account under the Golden Hour protocol.";
      const lower = messageText.toLowerCase();

      if (lower.includes('upi') || lower.includes('debit') || lower.includes('money') || lower.includes('bank')) {
        responseText = "EMERGENCY STEPS FOR UPI/BANK FRAUD:\n1. Call 1930 immediately with your transaction ID & UTR number.\n2. Open your banking app and tap 'Block Netbanking & Debit Cards'.\n3. File a dispute with your bank within 24 hours under RBI Zero-Liability guidelines.";
      } else if (lower.includes('digital arrest') || lower.includes('cbi') || lower.includes('police')) {
        responseText = "DIGITAL ARREST WARNING:\nNo official agency (CBI, Police, Customs, ED, Narcotics) ever conducts video calls or demands money to clear names. Disconnect the call immediately and report the caller number on Sanchar Saathi Chakshu portal.";
      } else if (lower.includes('apk') || lower.includes('electricity') || lower.includes('download')) {
        responseText = "MALICIOUS APK STEPS:\n1. Turn ON Airplane Mode immediately to stop data transmission.\n2. Uninstall the downloaded APK file from Settings > Apps.\n3. Reset all banking app passwords from a clean secondary device.";
      }

      setChatMessages(prev => [...prev, {
        sender: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border shadow-md ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full text-rose-500 text-xs font-bold mb-2">
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>OFFICIAL CYBERCRIME SUPPORT & COMPLAINTS DESK</span>
            </div>
            <h1 className="text-2xl font-black">
              24/7 Incident Escalation & Helpline Portal
            </h1>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              File cybercrime complaints, trace fraudulent UPI transfers, and dispatch automatic alerts to National Cybercrime Helpline 1930.
            </p>
          </div>

          {/* Emergency 1930 Quick Call Box */}
          <div className="flex items-center space-x-3 bg-gradient-to-r from-rose-600 to-rose-700 text-white p-3.5 rounded-2xl shadow-lg border border-rose-500 flex-shrink-0">
            <div className="p-2.5 bg-white/20 rounded-xl">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold opacity-90 block">NATIONAL HELPLINE</span>
              <a href="tel:1930" className="text-xl font-black font-mono underline hover:text-rose-200">
                DIAL 1930 NOW
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Golden Hour Account Freeze Alert */}
      <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <div>
            <span className="font-extrabold text-amber-500 block">THE "GOLDEN HOUR" FRAUD FREEZE PROTOCOL:</span>
            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              If money was debited within the last 2 hours, reporting immediately to 1930 allows banks to freeze funds before fraudsters cash out at ATMs.
            </span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('chat')}
          className="px-3 py-1.5 rounded-xl font-extrabold bg-amber-500 text-slate-950 hover:bg-amber-400 flex-shrink-0 whitespace-nowrap cursor-pointer"
        >
          GET FREEZE STEPS
        </button>
      </div>

      {/* Tab Controls */}
      <div className={`p-1 rounded-2xl border flex text-xs font-bold ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        <button
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'form'
              ? isDark ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-blue-700 text-white font-black'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>File Incident Complaint</span>
        </button>

        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'tickets'
              ? isDark ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-blue-700 text-white font-black'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>My Tickets & Status ({tickets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'chat'
              ? isDark ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-blue-700 text-white font-black'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>24/7 AI Emergency Bot</span>
        </button>
      </div>

      {/* TAB 1: FILE COMPLAINT FORM */}
      {activeTab === 'form' && (
        <div className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {successTicket ? (
            <div className="p-6 text-center space-y-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <div>
                <h3 className="text-xl font-black text-emerald-400">Complaint Filed Successfully!</h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Your ticket <span className="font-mono font-bold">{successTicket.ticketNumber}</span> has been dispatched for AI legal analysis and forwarded to cyber cell logs.
                </p>
              </div>
              <div className="flex justify-center space-x-3 pt-2">
                <button
                  onClick={() => setActiveTab('tickets')}
                  className="px-4 py-2 text-xs font-bold bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400"
                >
                  View Ticket Tracking
                </button>
                <button
                  onClick={() => setSuccessTicket(null)}
                  className="px-4 py-2 text-xs font-bold border border-slate-700 rounded-xl hover:bg-slate-800"
                >
                  File Another Ticket
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                <ShieldAlert className="w-4 h-4" />
                <span>Cyber Incident Reporting Form</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Incident Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-none ${
                      isDark ? 'bg-slate-950 text-white border-slate-800 focus:border-cyan-500' : 'bg-slate-50 text-slate-900 border-slate-300'
                    }`}
                  >
                    <option value="Unauthorized Banking / UPI Debit">Unauthorized Banking / UPI Debit</option>
                    <option value="Digital Arrest Coercion Call">Digital Arrest Coercion Video Call</option>
                    <option value="Fake Job / Telegram Task Scam">Fake Job / Telegram Rating Task Scam</option>
                    <option value="Spoofed Bank SMS / Electricity Bill APK">Spoofed Bank SMS / Electricity Bill APK</option>
                    <option value="Customs / FedEx Drug Parcel Extortion">Customs / FedEx Drug Parcel Extortion</option>
                    <option value="Identity Theft / SIM Swap Fraud">Identity Theft / SIM Swap Fraud</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Scam Channel
                  </label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as ScamChannel)}
                    className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-none ${
                      isDark ? 'bg-slate-950 text-white border-slate-800 focus:border-cyan-500' : 'bg-slate-50 text-slate-900 border-slate-300'
                    }`}
                  >
                    <option value="sms">SMS Text Message</option>
                    <option value="email">Email (Gmail / Outlook)</option>
                    <option value="whatsapp">WhatsApp / Telegram</option>
                    <option value="call">Phone / Skype Video Call</option>
                    <option value="url">Phishing Website / Portal</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Financial Loss Amount (In ₹ / USD - Enter 0 if no loss)
                  </label>
                  <input
                    type="number"
                    value={amountLost}
                    onChange={(e) => setAmountLost(e.target.value)}
                    placeholder="e.g. 15000"
                    className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-none ${
                      isDark ? 'bg-slate-950 text-white border-slate-800 focus:border-cyan-500' : 'bg-slate-50 text-slate-900 border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Incident Date
                  </label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-none ${
                      isDark ? 'bg-slate-950 text-white border-slate-800 focus:border-cyan-500' : 'bg-slate-50 text-slate-900 border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Suspect Contact Details (Phone, UPI VPA, Email, or Website URL)
                </label>
                <input
                  type="text"
                  value={suspectDetails}
                  onChange={(e) => setSuspectDetails(e.target.value)}
                  placeholder="e.g. +91 98765 00000 or fraudster@paytm or http://fake-kyc.com"
                  className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-none ${
                    isDark ? 'bg-slate-950 text-white border-slate-800 focus:border-cyan-500' : 'bg-slate-50 text-slate-900 border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Detailed Incident Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe how the scammer contacted you, what threats or offers were made, and any links clicked..."
                  className={`w-full p-3 text-xs border rounded-xl focus:outline-none ${
                    isDark ? 'bg-slate-950 text-white border-slate-800 focus:border-cyan-500' : 'bg-slate-50 text-slate-900 border-slate-300'
                  }`}
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !description || !suspectDetails}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-2 cursor-pointer ${
                    isDark ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950' : 'bg-blue-700 hover:bg-blue-800 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <span>DISPATCHING COMPLAINT...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SUBMIT CYBER INCIDENT TICKET</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB 2: MY TICKETS & STATUS */}
      {activeTab === 'tickets' && (
        <div className="space-y-4">
          {tickets.map((tkt) => (
            <div key={tkt.id} className={`p-5 rounded-2xl border space-y-3 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-black text-sm text-cyan-400">{tkt.ticketNumber}</span>
                  <span className="text-xs font-bold bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                    {tkt.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-slate-400 font-mono">{tkt.createdAt}</span>
                  <span className={`px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full uppercase border ${
                    tkt.status === 'FORWARDED_TO_1930' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' :
                    tkt.status === 'BANK_NOTIFIED' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                    'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                  }`}>
                    {tkt.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Suspect Info:</span>
                  <span className="font-mono font-bold text-rose-400">{tkt.suspectDetails}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Reported Loss:</span>
                  <span className="font-mono font-bold">{tkt.amountLost ? `₹ ${tkt.amountLost.toLocaleString()}` : 'No Financial Loss'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Official Reference:</span>
                  <span className="font-mono font-bold text-emerald-400">{tkt.officialRefNumber || 'N/A'}</span>
                </div>
              </div>

              <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {tkt.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: 24/7 AI EMERGENCY BOT */}
      {activeTab === 'chat' && (
        <div className={`p-5 rounded-2xl border flex flex-col h-[500px] ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-800 text-xs font-bold text-cyan-400">
            <Bot className="w-4 h-4" />
            <span>AI Cybercrime Victim Assistant • Real-Time Advice</span>
          </div>

          {/* Quick Scenario Chips */}
          <div className="flex overflow-x-auto gap-2 py-3 scrollbar-none border-b border-slate-800">
            <button
              onClick={() => handleSendMessage("How do I freeze my bank account after a UPI scam?")}
              className="px-3 py-1 text-[11px] rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 whitespace-nowrap cursor-pointer"
            >
              🚨 Freeze UPI / Bank Transfer
            </button>
            <button
              onClick={() => handleSendMessage("Someone is video calling me claiming Digital Arrest by CBI!")}
              className="px-3 py-1 text-[11px] rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 whitespace-nowrap cursor-pointer"
            >
              📹 Digital Arrest CBI Video Call
            </button>
            <button
              onClick={() => handleSendMessage("I downloaded an electricity bill APK on WhatsApp!")}
              className="px-3 py-1 text-[11px] rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 whitespace-nowrap cursor-pointer"
            >
              📱 Malicious APK File Installed
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-cyan-500 text-slate-950 font-medium'
                      : isDark ? 'bg-slate-950 border border-slate-800 text-slate-200' : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="pt-3 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask how to handle your cyber fraud emergency..."
              className={`flex-1 px-3 py-2 text-xs border rounded-xl focus:outline-none ${
                isDark ? 'bg-slate-950 text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-300'
              }`}
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Official Directory Registry */}
      <div className={`p-5 rounded-2xl border space-y-3 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
          <Building className="w-4 h-4 text-cyan-400" />
          <span>Official Law Enforcement & Cyber Portals</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-xl border flex items-center justify-between hover:border-cyan-500 transition-colors ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div>
              <span className="font-bold block">Cybercrime.gov.in</span>
              <span className="text-[10px] text-slate-500">National Cyber Portal</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </a>

          <a
            href="https://sancharsaathi.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-xl border flex items-center justify-between hover:border-cyan-500 transition-colors ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div>
              <span className="font-bold block">Sanchar Saathi TAFCOP</span>
              <span className="text-[10px] text-slate-500">Check Fraud SIM Connections</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </a>

          <a
            href="https://cms.rbi.org.in"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-xl border flex items-center justify-between hover:border-cyan-500 transition-colors ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div>
              <span className="font-bold block">RBI Banking Ombudsman</span>
              <span className="text-[10px] text-slate-500">Dispute Unauthorized Debit</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </a>

          <a
            href="https://consumerhelpline.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-xl border flex items-center justify-between hover:border-cyan-500 transition-colors ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div>
              <span className="font-bold block">Consumer Helpline 1915</span>
              <span className="text-[10px] text-slate-500">E-Commerce & Job Fraud</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </a>
        </div>
      </div>
    </div>
  );
};
