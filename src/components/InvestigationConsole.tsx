import React, { useState } from 'react';
import { Link2, Image, Search, Sparkles, ArrowRight, ShieldCheck, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { ProductInvestigation } from '../types';
import { mockInvestigatedProducts } from '../data/mockProducts';

interface InvestigationConsoleProps {
  onInvestigate: (product: ProductInvestigation) => void;
  isScanning: boolean;
}

export const InvestigationConsole: React.FC<InvestigationConsoleProps> = ({
  onInvestigate,
  isScanning
}) => {
  const [activeTab, setActiveTab] = useState<'link' | 'image' | 'search'>('link');
  const [inputValue, setInputValue] = useState('https://www.amazon.in/Sony-WH-1000XM5-Wireless-Noise-Canceling-Headphones/dp/B09XS7JWHH');
  const [dragActive, setDragActive] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('sony-wh1000xm5');

  const handlePresetClick = (key: string) => {
    setSelectedPreset(key);
    const prod = mockInvestigatedProducts[key];
    if (key === 'sony-wh1000xm5') {
      setInputValue('https://amazon.in/dp/B09XS7JWHH/Sony-WH-1000XM5');
    } else if (key === 'instagram-viral-sneakers') {
      setInputValue('https://instagram.com/p/C9_SneakerHype_ViralDM');
    } else {
      setInputValue('https://flipkart.com/noise-colorfit-pulse-3-smartwatch');
    }
    onInvestigate(prod);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.toLowerCase().includes('sneaker') || inputValue.toLowerCase().includes('instagram') || activeTab === 'image') {
      onInvestigate(mockInvestigatedProducts['instagram-viral-sneakers']);
    } else if (inputValue.toLowerCase().includes('noise') || inputValue.toLowerCase().includes('watch')) {
      onInvestigate(mockInvestigatedProducts['noise-smartwatch']);
    } else {
      onInvestigate(mockInvestigatedProducts['sony-wh1000xm5']);
    }
  };

  return (
    <div id="console" className="relative w-full max-w-4xl mx-auto">
      {/* Subtle outer glow frame */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-ai-cyan/20 via-ai-blue/15 to-purple-600/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000" />

      {/* Main Console Box */}
      <div className="relative rounded-2xl bg-dark-900/90 border border-dark-700/80 shadow-2xl backdrop-blur-xl overflow-hidden p-4 sm:p-7">
        {/* Animated Cybernetic Scan Line when Scanning */}
        {isScanning && (
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-ai-cyan to-transparent animate-scan-line shadow-glow-cyan" />
        )}

        {/* Top Header & Mode Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-dark-800/80">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-ai-cyan/10 border border-ai-cyan/30 text-ai-cyan">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs uppercase tracking-wider font-mono font-semibold text-white">
              AI Investigation Console
            </span>
            <span className="hidden sm:inline-block text-[11px] text-brand-dim font-mono">
              | Multi-Source Evidence Engine
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-dark-950/80 p-1 rounded-xl border border-dark-700/60">
            <button
              type="button"
              onClick={() => setActiveTab('link')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'link'
                  ? 'bg-dark-800 text-white shadow-sm border border-dark-600'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <Link2 className="w-3.5 h-3.5 text-ai-cyan" />
              <span>Paste Link</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('image')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'image'
                  ? 'bg-dark-800 text-white shadow-sm border border-dark-600'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <Image className="w-3.5 h-3.5 text-ai-blue" />
              <span>Upload Image / DM</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'search'
                  ? 'bg-dark-800 text-white shadow-sm border border-dark-600'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-trust" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Input Form Area */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {activeTab === 'link' && (
            <div className="relative">
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 rounded-xl bg-dark-950/90 border border-dark-700 focus-within:border-ai-cyan/60 focus-within:ring-1 focus-within:ring-ai-cyan/30 transition-all">
                <div className="flex items-center gap-2.5 px-3 py-2 text-brand-dim flex-1">
                  <Link2 className="w-4 h-4 text-ai-cyan flex-shrink-0" />
                  <input
                    type="url"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Paste product link (Amazon, Flipkart, Instagram, Myntra, Shopify...)"
                    className="w-full bg-transparent text-sm text-brand-text placeholder:text-brand-dim focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isScanning}
                  className="px-6 py-3 rounded-lg font-semibold text-sm text-dark-950 bg-gradient-to-r from-ai-cyan via-white to-ai-blue hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-glow-cyan disabled:opacity-50"
                >
                  {isScanning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
                      <span>Deconstructing Signals...</span>
                    </>
                  ) : (
                    <>
                      <span>Investigate</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'image' && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); handlePresetClick('instagram-viral-sneakers'); }}
              onClick={() => handlePresetClick('instagram-viral-sneakers')}
              className={`p-6 border-2 border-dashed rounded-xl cursor-pointer text-center transition-all ${
                dragActive ? 'border-ai-cyan bg-ai-cyan/5' : 'border-dark-700 bg-dark-950/60 hover:border-dark-600'
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-dark-800 border border-dark-700 flex items-center justify-center text-ai-blue">
                  <Image className="w-6 h-6" />
                </div>
                <div className="text-sm font-medium text-white">
                  Drop screenshot of Instagram Post, WhatsApp chat, or Marketplace Ad
                </div>
                <div className="text-xs text-brand-dim max-w-md">
                  Our OCR + Vision AI will reverse-image search supplier databases, extract hidden prices, and audit the vendor.
                </div>
                <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-dark-800 text-ai-cyan border border-dark-700">
                  Click to test sample: Viral IG Sneaker Post
                </span>
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 rounded-xl bg-dark-950/90 border border-dark-700 focus-within:border-ai-cyan/60 focus-within:ring-1 focus-within:ring-ai-cyan/30 transition-all">
              <div className="flex items-center gap-2.5 px-3 py-2 text-brand-dim flex-1">
                <Search className="w-4 h-4 text-trust flex-shrink-0" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe any product or brand name (e.g. Sony ANC headphones, budget smartwatch...)"
                  className="w-full bg-transparent text-sm text-brand-text placeholder:text-brand-dim focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isScanning}
                className="px-6 py-3 rounded-lg font-semibold text-sm text-dark-950 bg-gradient-to-r from-ai-cyan via-white to-ai-blue hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-glow-cyan disabled:opacity-50"
              >
                <span>Investigate Product</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Preset Quick Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-brand-dim font-mono text-[11px] mr-1">Quick Scans:</span>
            
            <button
              type="button"
              onClick={() => handlePresetClick('sony-wh1000xm5')}
              className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                selectedPreset === 'sony-wh1000xm5'
                  ? 'bg-trust/10 border-trust/40 text-trust'
                  : 'bg-dark-950 border-dark-800 text-brand-muted hover:border-dark-700 hover:text-white'
              }`}
            >
              <CheckCircle className="w-3 h-3 text-trust" />
              <span>Sony WH-1000XM5 (Verified High Trust)</span>
            </button>

            <button
              type="button"
              onClick={() => handlePresetClick('instagram-viral-sneakers')}
              className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                selectedPreset === 'instagram-viral-sneakers'
                  ? 'bg-risk/10 border-risk/40 text-risk'
                  : 'bg-dark-950 border-dark-800 text-brand-muted hover:border-dark-700 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3 h-3 text-risk" />
              <span>Viral IG Sneaker (High Scam Risk)</span>
            </button>

            <button
              type="button"
              onClick={() => handlePresetClick('noise-smartwatch')}
              className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
                selectedPreset === 'noise-smartwatch'
                  ? 'bg-warning/10 border-warning/40 text-warning'
                  : 'bg-dark-950 border-dark-800 text-brand-muted hover:border-dark-700 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3 h-3 text-warning" />
              <span>Noise Pulse 3 (Price Wait Alert)</span>
            </button>
          </div>
        </form>

        {/* Live scanning status badge bar */}
        <div className="mt-5 pt-3.5 border-t border-dark-800/80 flex flex-wrap items-center justify-between text-[11px] text-brand-dim font-mono gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-trust animate-ping" />
              NLP Sentiment Cross-Validator
            </span>
            <span className="hidden md:inline-block text-dark-700">•</span>
            <span className="hidden md:inline-flex items-center gap-1">
              Seller Registry Fingerprinting
            </span>
            <span className="hidden md:inline-block text-dark-700">•</span>
            <span className="hidden md:inline-flex items-center gap-1">
              Dynamic Price Trend Graph
            </span>
          </div>
          <span className="text-ai-cyan/80">
            End-to-End Buyer Protection
          </span>
        </div>
      </div>
    </div>
  );
};
