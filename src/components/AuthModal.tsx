import React, { useState, useEffect } from 'react';
import { 
  X, Shield, Mail, Lock, User, Phone, CheckCircle2, Bell, Save, AlertTriangle,
  Sparkles, ArrowRight, Eye, EyeOff, LogIn, UserPlus, GraduationCap, HeartHandshake, Briefcase, Building
} from 'lucide-react';
import { UserProfile, UserPersona, ThemeMode } from '../types';
import { ScramAwayLogo } from './ScramAwayLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
  themeMode?: ThemeMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout,
  themeMode = 'dark'
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [persona, setPersona] = useState<UserPersona>('general');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email Notification Settings State
  const [alertsViaEmail, setAlertsViaEmail] = useState<boolean>(
    currentUser?.alertsViaEmail ?? true
  );
  const [notificationEmail, setNotificationEmail] = useState<string>(
    currentUser?.notificationEmail || currentUser?.email || ''
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setAlertsViaEmail(currentUser.alertsViaEmail ?? true);
      setNotificationEmail(currentUser.notificationEmail || currentUser.email || '');
    }
  }, [currentUser]);

  const handleSaveNotificationSettings = () => {
    if (!currentUser) return;
    const updatedUser: UserProfile = {
      ...currentUser,
      alertsViaEmail,
      notificationEmail: notificationEmail.trim() || currentUser.email
    };
    onLoginSuccess(updatedUser);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!isOpen) return null;

  const isDark = themeMode === 'dark';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    if (mode === 'signup' && !name) {
      setError('Please enter your full name.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const newUser: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        name: mode === 'signup' ? name : (email.split('@')[0].toUpperCase() + ' (Shield User)'),
        email,
        phone: phone || '+91 98765 43210',
        persona: persona,
        tier: 'PRO_SHIELD',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        totalScansPerformed: 12,
        alertsViaEmail: true,
        notificationEmail: email
      };

      onLoginSuccess(newUser);
      onClose();
    }, 600);
  };

  const handleDemoLogin = (demoPersona: UserPersona, demoName: string, demoEmail: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const demoUser: UserProfile = {
        id: 'usr_demo_' + demoPersona,
        name: demoName,
        email: demoEmail,
        phone: '+91 98110 22334',
        persona: demoPersona,
        tier: 'PRO_SHIELD',
        joinedDate: 'Aug 2026',
        totalScansPerformed: 28,
        alertsViaEmail: true,
        notificationEmail: demoEmail
      };
      onLoginSuccess(demoUser);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className={`relative w-full max-w-md p-6 rounded-2xl shadow-2xl border transition-all ${
          isDark 
            ? 'bg-slate-900 border-slate-800 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-1.5 rounded-xl border transition-colors ${
            isDark 
              ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800' 
              : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        {/* If already logged in: View Profile details */}
        {currentUser ? (
          <div className="space-y-6 pt-2">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-1">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-black">{currentUser.name}</h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {currentUser.email}
              </p>
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <CheckCircle2 className="w-3 h-3" />
                <span>ACTIVE SHIELD PROTECTED • {currentUser.tier}</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border space-y-2.5 text-xs ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Account ID:</span>
                <span className="font-mono font-bold">{currentUser.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Assigned Persona:</span>
                <span className="font-bold capitalize text-cyan-400">{currentUser.persona}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Phone Verification:</span>
                <span className="font-mono">{currentUser.phone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Member Since:</span>
                <span>{currentUser.joinedDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Total Scans Performed:</span>
                <span className="font-mono font-bold text-emerald-400">{currentUser.totalScansPerformed} Scans</span>
              </div>
            </div>

            {/* Notification & High-Risk Alert Settings Panel */}
            <div className={`p-4 rounded-xl border space-y-3.5 text-xs ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                <div className="flex items-center space-x-2 font-bold">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>High-Risk Threat Email Alerts</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                  alertsViaEmail
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}>
                  {alertsViaEmail ? 'ALERTS ACTIVE' : 'ALERTS MUTED'}
                </span>
              </div>

              {/* Toggle: Alerts via Email */}
              <div className="flex items-start justify-between space-x-3">
                <div className="space-y-1">
                  <label htmlFor="alerts-email-toggle" className={`font-bold block cursor-pointer ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                    Alerts via Email
                  </label>
                  <p className={`text-[11px] leading-snug ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Receive instant email notifications whenever a high-risk or zero-day scam is detected during your scans.
                  </p>
                </div>

                <button
                  id="alerts-email-toggle"
                  type="button"
                  onClick={() => setAlertsViaEmail(!alertsViaEmail)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    alertsViaEmail 
                      ? (isDark ? 'bg-cyan-500' : 'bg-blue-600') 
                      : (isDark ? 'bg-slate-800' : 'bg-slate-300')
                  }`}
                  role="switch"
                  aria-checked={alertsViaEmail}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      alertsViaEmail ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Preferred Notification Email Address Field */}
              {alertsViaEmail && (
                <div className="pt-2 space-y-2 animate-fade-in">
                  <label htmlFor="notification-email-input" className={`block text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Preferred Notification Address
                  </label>
                  <div className="relative">
                    <Mail className={`w-4 h-4 absolute left-3 top-2.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                      id="notification-email-input"
                      type="email"
                      value={notificationEmail}
                      onChange={(e) => setNotificationEmail(e.target.value)}
                      placeholder="alerts-user@scramaway.ai"
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border font-mono transition-all focus:outline-none ${
                        isDark 
                          ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-400' 
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 italic">
                    Critical threat alerts will be routed to this email address immediately.
                  </p>
                </div>
              )}

              {/* Save settings action button */}
              <div className="pt-1 flex items-center justify-between">
                {saveSuccess ? (
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center space-x-1 animate-fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Settings saved!</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500">
                    Preferences saved locally.
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleSaveNotificationSettings}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                    isDark 
                      ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4 rotate-180" />
                <span>SIGN OUT OF SHIELD</span>
              </button>
            </div>
          </div>
        ) : (
          /* Login & Signup Form */
          <div className="space-y-5">
            {/* Header */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider justify-center">
                <ScramAwayLogo className="w-5 h-5" isDark={isDark} showLivePulse={false} />
                <span>ScramAway Security Auth</span>
              </div>
              <h2 className="text-2xl font-black">
                {mode === 'login' ? 'Sign In to Your Shield' : 'Create Protected Account'}
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {mode === 'login' 
                  ? 'Access cross-device scam history, extension sync & ticket alerts.'
                  : 'Start real-time zero-day scam protection across SMS, Email & WhatsApp.'}
              </p>
            </div>

            {/* Mode Switcher */}
            <div className={`p-1 rounded-xl border flex text-xs font-bold ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => { setMode('login'); setError(null); }}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  mode === 'login'
                    ? isDark ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-blue-700 text-white font-black'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => { setMode('signup'); setError(null); }}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  mode === 'signup'
                    ? isDark ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-blue-700 text-white font-black'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register</span>
              </button>
            </div>

            {error && (
              <div className="p-3 text-xs bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl font-medium">
                {error}
              </div>
            )}

            {/* Quick Demo Login Option */}
            <div className="space-y-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider block text-center ${
                isDark ? 'text-slate-500' : 'text-slate-600'
              }`}>
                Instant Demo Profiles (One-Click Test):
              </span>
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('senior', 'Ramesh Sharma (Senior Citizen)', 'ramesh.senior@example.com')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    isDark 
                      ? 'bg-slate-950 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300' 
                      : 'bg-slate-50 border-slate-200 hover:border-blue-600 hover:bg-white text-slate-800'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4 mx-auto text-cyan-400 mb-1" />
                  <span className="font-bold block truncate">Senior</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('student', 'Ananya Roy (College Student)', 'ananya.student@example.com')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    isDark 
                      ? 'bg-slate-950 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300' 
                      : 'bg-slate-50 border-slate-200 hover:border-blue-600 hover:bg-white text-slate-800'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
                  <span className="font-bold block truncate">Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('business', 'Vikram Sethi (Small Business)', 'vikram.biz@example.com')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    isDark 
                      ? 'bg-slate-950 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300' 
                      : 'bg-slate-50 border-slate-200 hover:border-blue-600 hover:bg-white text-slate-800'
                  }`}
                >
                  <Building className="w-4 h-4 mx-auto text-amber-400 mb-1" />
                  <span className="font-bold block truncate">Business</span>
                </button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase font-mono">Or Credentials</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Aakash Verma"
                      className={`w-full pl-9 pr-3 py-2 text-xs border rounded-xl focus:outline-none ${
                        isDark 
                          ? 'bg-slate-950 text-white border-slate-800 focus:border-cyan-500' 
                          : 'bg-slate-50 text-slate-900 border-slate-300 focus:border-blue-600'
                      }`}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className={`w-full pl-9 pr-3 py-2 text-xs border rounded-xl focus:outline-none ${
                      isDark 
                        ? 'bg-slate-950 text-white border-slate-800 focus:border-cyan-500' 
                        : 'bg-slate-50 text-slate-900 border-slate-300 focus:border-blue-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full pl-9 pr-10 py-2 text-xs border rounded-xl focus:outline-none ${
                      isDark 
                        ? 'bg-slate-950 text-white border-slate-800 focus:border-cyan-500' 
                        : 'bg-slate-50 text-slate-900 border-slate-300 focus:border-blue-600'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <>
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Mobile Number (For Emergency Fraud Alerts)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className={`w-full pl-9 pr-3 py-2 text-xs border rounded-xl focus:outline-none ${
                          isDark 
                            ? 'bg-slate-950 text-white border-slate-800 focus:border-cyan-500' 
                            : 'bg-slate-50 text-slate-900 border-slate-300 focus:border-blue-600'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Demographic Risk Persona
                    </label>
                    <select
                      value={persona}
                      onChange={(e) => setPersona(e.target.value as UserPersona)}
                      className={`w-full px-3 py-2 text-xs border rounded-xl focus:outline-none ${
                        isDark 
                          ? 'bg-slate-950 text-white border-slate-800 focus:border-cyan-500' 
                          : 'bg-slate-50 text-slate-900 border-slate-300 focus:border-blue-600'
                      }`}
                    >
                      <option value="general">General Citizen</option>
                      <option value="senior">Senior Citizen (60+)</option>
                      <option value="student">College Student / Youth</option>
                      <option value="job_seeker">Job Seeker & Freelancer</option>
                      <option value="business">Small Business / Merchant</option>
                    </select>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer transition-all ${
                  isDark
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'bg-blue-700 hover:bg-blue-800 text-white shadow-lg shadow-blue-700/20'
                }`}
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    <span>AUTHENTICATING...</span>
                  </span>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'SIGN IN NOW' : 'CREATE FREE SHIELD ACCOUNT'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
