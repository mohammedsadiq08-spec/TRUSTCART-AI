import React from 'react';
import { Sparkles, Shield, ArrowRight, CheckCircle2, Search, ArrowDown } from 'lucide-react';
import { InvestigationConsole } from './InvestigationConsole';
import { HeroLiveDemo } from './HeroLiveDemo';
import { ProductInvestigation } from '../types';

interface HeroProps {
  onInvestigate: (product: ProductInvestigation) => void;
  isScanning: boolean;
  currentProduct: ProductInvestigation;
  onOpenFullReport: (p: ProductInvestigation) => void;
  onScrollToHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onInvestigate,
  isScanning,
  currentProduct,
  onOpenFullReport,
  onScrollToHowItWorks
}) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Dynamic Background Glows & Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-b from-ai-cyan/15 via-purple-600/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-900/90 border border-dark-700/80 shadow-inner backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ai-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ai-cyan" />
            </span>
            <span className="text-[11px] font-bold tracking-widest font-mono uppercase bg-gradient-to-r from-ai-cyan via-white to-ai-blue bg-clip-text text-transparent">
              AI-POWERED SHOPPING INTELLIGENCE
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center mt-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Before You Buy, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-ai-cyan via-blue-200 to-indigo-300 bg-clip-text text-transparent underline decoration-ai-cyan/30 decoration-wavy decoration-1 underline-offset-8">
              Know What You're Buying.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-brand-muted max-w-2xl mx-auto font-normal leading-relaxed">
            TRUSTCART AI investigates products across e-commerce and social commerce, helping you understand reviews, sellers, prices and risks before you spend your money.
          </p>

          {/* Quick CTA Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#console"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-dark-950 bg-gradient-to-r from-ai-cyan via-brand-text to-ai-blue hover:shadow-glow-cyan transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-dark-950" />
              <span>Analyze a Product</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onScrollToHowItWorks}
              className="px-6 py-3.5 rounded-xl font-medium text-sm text-brand-text bg-dark-900/80 hover:bg-dark-850 border border-dark-700 hover:border-dark-600 transition-all flex items-center gap-2"
            >
              <span>See How It Works</span>
              <ArrowDown className="w-4 h-4 text-brand-dim" />
            </button>
          </div>
        </div>

        {/* Trust Metrics Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-center">
          <div className="p-3 rounded-xl bg-dark-900/50 border border-dark-800/80">
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">98.4%</div>
            <div className="text-[11px] text-brand-dim uppercase tracking-wider mt-0.5">Scam & Drop Detection</div>
          </div>
          <div className="p-3 rounded-xl bg-dark-900/50 border border-dark-800/80">
            <div className="text-xl sm:text-2xl font-bold font-mono text-trust">4.8M+</div>
            <div className="text-[11px] text-brand-dim uppercase tracking-wider mt-0.5">Reviews Verified</div>
          </div>
          <div className="p-3 rounded-xl bg-dark-900/50 border border-dark-800/80">
            <div className="text-xl sm:text-2xl font-bold font-mono text-ai-cyan">5 Layers</div>
            <div className="text-[11px] text-brand-dim uppercase tracking-wider mt-0.5">Multi-Vector Audit</div>
          </div>
          <div className="p-3 rounded-xl bg-dark-900/50 border border-dark-800/80">
            <div className="text-xl sm:text-2xl font-bold font-mono text-purple-300">0% Ads</div>
            <div className="text-[11px] text-brand-dim uppercase tracking-wider mt-0.5">100% Unbiased Intel</div>
          </div>
        </div>

        {/* Primary Investigation Console */}
        <div className="mt-12">
          <InvestigationConsole
            onInvestigate={onInvestigate}
            isScanning={isScanning}
          />
        </div>

        {/* Real-time Hero Live Demo Preview */}
        <HeroLiveDemo
          currentProduct={currentProduct}
          onSelectProduct={onInvestigate}
          onOpenFullReport={onOpenFullReport}
        />

      </div>
    </section>
  );
};
