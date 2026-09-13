import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Bookmark, 
  History, 
  Sliders, 
  User, 
  Sparkles, 
  ExternalLink, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Clock, 
  LogOut, 
  Lock, 
  Mail, 
  Save, 
  Check 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userApi, SavedProductItem, AnalysisHistoryItem, UserProfile } from '../api';
import { PersonaPreferences, ProductInvestigation } from '../types';
import { FullInvestigationModal } from '../components/FullInvestigationModal';
import { mockInvestigatedProducts } from '../data/mockProducts';

export const DashboardPage: React.FC = () => {
  const { user, logout, toggleSaveProduct } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'saved' | 'history' | 'preferences' | 'profile'>('saved');
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [savedProducts, setSavedProducts] = useState<SavedProductItem[]>([]);
  const [historyItems, setHistoryItems] = useState<AnalysisHistoryItem[]>([]);
  const [preferences, setPreferences] = useState<PersonaPreferences>({
    purpose: 'Study',
    budget: 30000,
    comfortWeight: 40,
    batteryWeight: 30,
    soundWeight: 20,
    micWeight: 10
  });

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSavingPref, setIsSavingPref] = useState(false);
  const [prefSavedSuccess, setPrefSavedSuccess] = useState(false);

  // Profile update form state
  const [fullNameInput, setFullNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  // Selected product for modal dossier
  const [selectedProduct, setSelectedProduct] = useState<ProductInvestigation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoadingData(true);
    try {
      const [profile, saved, hist, prefs] = await Promise.all([
        userApi.getProfile(),
        userApi.getSavedProducts(),
        userApi.getAnalysisHistory(),
        userApi.getPreferences()
      ]);

      setProfileData(profile);
      setSavedProducts(saved);
      setHistoryItems(hist);
      setPreferences(prefs);
      setFullNameInput(profile.full_name);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleRemoveSaved = async (productId: string) => {
    try {
      await toggleSaveProduct(productId);
      setSavedProducts((prev) => prev.filter((item) => item.product_id !== productId));
    } catch (err) {
      console.error('Failed to unsave product:', err);
    }
  };

  const handleOpenDossier = (productId: string) => {
    const prod = mockInvestigatedProducts[productId] || mockInvestigatedProducts['sony-wh1000xm5'];
    setSelectedProduct(prod);
    setIsModalOpen(true);
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPref(true);
    try {
      await userApi.updatePreferences(preferences);
      setPrefSavedSuccess(true);
      setTimeout(() => setPrefSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save preferences:', err);
    } finally {
      setIsSavingPref(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setProfileSuccessMsg('');
    try {
      const payload: { full_name?: string; password?: string } = {};
      if (fullNameInput.trim()) payload.full_name = fullNameInput.trim();
      if (passwordInput.trim()) payload.password = passwordInput.trim();

      const updated = await userApi.updateProfile(payload);
      setProfileData(updated);
      setProfileSuccessMsg('Profile details updated successfully.');
      setPasswordInput('');
      setTimeout(() => setProfileSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-950 text-brand-text flex flex-col selection:bg-ai-cyan/20 selection:text-ai-cyan">
      
      {/* Dashboard Top Header */}
      <header className="bg-dark-900/90 border-b border-dark-700/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-dark-950 border border-dark-700 p-0.5">
              <img src="/trustcart-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-base sm:text-lg text-white font-sans">
                TRUSTCART
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-ai-cyan to-ai-blue text-dark-950 uppercase tracking-wider">
                AI
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/#console"
              className="px-3.5 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 text-xs font-semibold text-brand-text border border-dark-700 flex items-center gap-1.5 transition-colors hidden sm:flex"
            >
              <Sparkles className="w-3.5 h-3.5 text-ai-cyan" />
              <span>New Investigation</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-risk hover:bg-risk/10 border border-risk/30 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* User Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-dark-900 via-dark-900 to-dark-950 border border-dark-700/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-ai-cyan/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-ai-cyan via-brand-text to-ai-blue p-0.5 flex-shrink-0 shadow-glow-cyan">
                <div className="w-full h-full rounded-2xl bg-dark-950 flex items-center justify-center text-xl font-bold text-white font-mono">
                  {user?.full_name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {user?.full_name || 'Member Dashboard'}
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-trust/10 text-trust border border-trust/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Member
                  </span>
                </div>
                <div className="text-xs text-brand-dim mt-1 flex flex-wrap items-center gap-3 font-mono">
                  <span>{user?.email}</span>
                  <span>•</span>
                  <span>Member Since: {profileData?.created_at || '2026'}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-dark-950/80 border border-dark-800">
                <span className="text-[10px] font-mono uppercase text-brand-dim block">Saved Items</span>
                <span className="text-xl font-bold font-mono text-ai-cyan mt-0.5 block">
                  {savedProducts.length}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-dark-950/80 border border-dark-800">
                <span className="text-[10px] font-mono uppercase text-brand-dim block">Analyses Run</span>
                <span className="text-xl font-bold font-mono text-trust mt-0.5 block">
                  {historyItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-dark-800 pb-4">
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'saved'
                ? 'bg-ai-cyan text-dark-950 shadow-glow-cyan'
                : 'text-brand-muted hover:text-white hover:bg-dark-900 border border-transparent'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Products ({savedProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'history'
                ? 'bg-ai-cyan text-dark-950 shadow-glow-cyan'
                : 'text-brand-muted hover:text-white hover:bg-dark-900 border border-transparent'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Analysis History ({historyItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'preferences'
                ? 'bg-ai-cyan text-dark-950 shadow-glow-cyan'
                : 'text-brand-muted hover:text-white hover:bg-dark-900 border border-transparent'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>My Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'profile'
                ? 'bg-ai-cyan text-dark-950 shadow-glow-cyan'
                : 'text-brand-muted hover:text-white hover:bg-dark-900 border border-transparent'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Security</span>
          </button>
        </div>

        {/* TAB 1: SAVED PRODUCTS */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            {savedProducts.length === 0 ? (
              <div className="p-12 rounded-3xl bg-dark-900/60 border border-dark-800 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-dark-800 border border-dark-700 flex items-center justify-center text-brand-dim mx-auto">
                  <Bookmark className="w-7 h-7" />
                </div>
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-bold text-white">Your shopping intelligence starts here.</h3>
                  <p className="text-xs text-brand-muted mt-1">
                    You haven't saved any product investigations yet. When you analyze products on Amazon, Flipkart, or Instagram, click the bookmark icon to track them here.
                  </p>
                </div>
                <Link
                  to="/#console"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-dark-950 bg-gradient-to-r from-ai-cyan to-ai-blue hover:brightness-110 shadow-glow-cyan transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Your First Product</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProducts.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-dark-900 border border-dark-700/80 p-5 shadow-xl flex flex-col justify-between hover:border-dark-600 transition-all"
                  >
                    <div>
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-dark-950 border border-dark-800">
                        <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-dark-950/90 border border-dark-700 text-[10px] font-mono text-brand-text">
                          {item.product.source_platform}
                        </span>
                      </div>

                      <div className="mt-4">
                        <div className="text-[10px] font-mono uppercase text-brand-dim">{item.product.brand} • {item.product.category}</div>
                        <h4 className="font-bold text-sm text-white line-clamp-2 mt-0.5">{item.product.name}</h4>
                        <div className="text-lg font-mono font-bold text-white mt-2">
                          {item.product.currency}{item.product.price.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-dark-800 flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleRemoveSaved(item.product_id)}
                        className="text-brand-dim hover:text-risk flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>

                      <button
                        onClick={() => handleOpenDossier(item.product_id)}
                        className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 text-white font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <span>View Dossier</span>
                        <ExternalLink className="w-3 h-3 text-ai-cyan" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ANALYSIS HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {historyItems.length === 0 ? (
              <div className="p-12 rounded-3xl bg-dark-900/60 border border-dark-800 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-dark-800 border border-dark-700 flex items-center justify-center text-brand-dim mx-auto">
                  <History className="w-7 h-7" />
                </div>
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-bold text-white">No analysis records found.</h3>
                  <p className="text-xs text-brand-muted mt-1">
                    Every product investigation you conduct is automatically recorded here with its cryptographic audit score and verdict.
                  </p>
                </div>
                <Link
                  to="/#console"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-dark-950 bg-gradient-to-r from-ai-cyan to-ai-blue hover:brightness-110 shadow-glow-cyan transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Your First Product</span>
                </Link>
              </div>
            ) : (
              <div className="rounded-2xl bg-dark-900 border border-dark-700/80 overflow-hidden shadow-xl">
                <div className="divide-y divide-dark-800">
                  {historyItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-dark-850/50 transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-dark-950 border border-dark-700 overflow-hidden flex-shrink-0">
                          {item.product_image ? (
                            <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-brand-dim font-mono">TC</div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white line-clamp-1">{item.product_name}</h4>
                          <div className="text-xs text-brand-dim font-mono mt-0.5">
                            {item.currency}{item.price.toLocaleString()} • {item.analyzed_at}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right font-mono">
                          <div className="text-sm font-bold text-white">Score: {item.trust_score}/100</div>
                          <span className={`text-[10px] font-bold uppercase ${
                            item.recommendation === 'BUY' ? 'text-trust' : item.recommendation === 'AVOID' ? 'text-risk' : 'text-warning'
                          }`}>
                            {item.recommendation} ({item.confidence}% Conf)
                          </span>
                        </div>

                        <button
                          onClick={() => handleOpenDossier(item.product_id)}
                          className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
                        >
                          <span>Re-open</span>
                          <ArrowRight className="w-3 h-3 text-ai-cyan" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: USER PREFERENCES */}
        {activeTab === 'preferences' && (
          <div className="max-w-3xl mx-auto rounded-2xl bg-dark-900 border border-dark-700/80 p-6 sm:p-8 shadow-xl">
            <div className="pb-4 border-b border-dark-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Personalized Priority Engine</h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  These weights are stored in your profile to customize AI recommendation scores.
                </p>
              </div>
              <span className="text-xs font-mono text-ai-cyan">Active Engine</span>
            </div>

            <form onSubmit={handleSavePreferences} className="mt-6 space-y-6">
              <div>
                <label className="text-xs font-mono uppercase text-brand-dim block mb-2">
                  Primary Usage Focus
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['Study', 'Workout', 'Office Work', 'Audiophile', 'Gaming'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPreferences({ ...preferences, purpose: p })}
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        preferences.purpose === p
                          ? 'bg-dark-950 border-ai-cyan text-white shadow-sm'
                          : 'bg-dark-950/40 border-dark-800 text-brand-muted hover:border-dark-700 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white">Ergonomic Comfort Weight</span>
                    <span className="font-mono text-ai-cyan font-bold">{preferences.comfortWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={preferences.comfortWeight}
                    onChange={(e) => setPreferences({ ...preferences, comfortWeight: Number(e.target.value) })}
                    className="w-full h-1.5 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-ai-cyan"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white">Battery Endurance Weight</span>
                    <span className="font-mono text-trust font-bold">{preferences.batteryWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={preferences.batteryWeight}
                    onChange={(e) => setPreferences({ ...preferences, batteryWeight: Number(e.target.value) })}
                    className="w-full h-1.5 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-trust"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white">Sound Quality & Acoustics</span>
                    <span className="font-mono text-purple-400 font-bold">{preferences.soundWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={preferences.soundWeight}
                    onChange={(e) => setPreferences({ ...preferences, soundWeight: Number(e.target.value) })}
                    className="w-full h-1.5 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-purple-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white">Microphone & Call Clarity</span>
                    <span className="font-mono text-brand-muted font-bold">{preferences.micWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={preferences.micWeight}
                    onChange={(e) => setPreferences({ ...preferences, micWeight: Number(e.target.value) })}
                    className="w-full h-1.5 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-brand-muted"
                  />
                </div>
              </div>

              {prefSavedSuccess && (
                <div className="p-3 rounded-xl bg-trust/10 border border-trust/40 text-trust text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Preferences saved successfully to your profile!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSavingPref}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-dark-950 bg-gradient-to-r from-ai-cyan to-ai-blue hover:brightness-110 shadow-glow-cyan transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingPref ? 'Saving...' : 'Save Preferences'}</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: PROFILE & SECURITY */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto rounded-2xl bg-dark-900 border border-dark-700/80 p-6 sm:p-8 shadow-xl">
            <div className="pb-4 border-b border-dark-800">
              <h3 className="text-base font-bold text-white">Profile & Security Settings</h3>
              <p className="text-xs text-brand-muted mt-0.5">
                Update your name or change your account password.
              </p>
            </div>

            <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-brand-dim block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-brand-dim absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullNameInput}
                    onChange={(e) => setFullNameInput(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-700 text-xs text-white placeholder:text-brand-dim focus:outline-none focus:border-ai-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-brand-dim block mb-1">
                  Email Address
                </label>
                <div className="relative opacity-60">
                  <Mail className="w-4 h-4 text-brand-dim absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-xs text-brand-dim cursor-not-allowed"
                  />
                </div>
                <span className="text-[10px] text-brand-dim mt-1 block">Email cannot be changed after registration.</span>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-brand-dim block mb-1">
                  Change Password (Leave blank to keep current)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-brand-dim absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter new password (min 6 chars)"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-700 text-xs text-white placeholder:text-brand-dim focus:outline-none focus:border-ai-cyan"
                  />
                </div>
              </div>

              {profileSuccessMsg && (
                <div className="p-3 rounded-xl bg-trust/10 border border-trust/40 text-trust text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{profileSuccessMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-dark-950 bg-gradient-to-r from-ai-cyan to-ai-blue hover:brightness-110 shadow-glow-cyan transition-all flex items-center justify-center gap-2"
              >
                <span>{isUpdatingProfile ? 'Updating Profile...' : 'Save Profile Changes'}</span>
              </button>
            </form>
          </div>
        )}

      </main>

      {/* Investigation Dossier Modal */}
      <FullInvestigationModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};
