import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, ShieldAlert } from 'lucide-react';

interface FinalCTAProps {
  onAnalyzeClick: () => void;
  onExploreEngineClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onAnalyzeClick,
  onExploreEngineClick
}) => {
  return (
    <section className="relative py-24 md:py-32 bg-dark-950 overflow-hidden border-t border-dark-800/80">
      
      {/* Dynamic Background Glow Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-ai-cyan/15 via-purple-600/10 to-trust/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Floating Mini Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-dark-900 border border-dark-700/80 p-1 shadow-2xl shadow-ai-cyan/10">
            <img src="/trustcart-logo.jpg" alt="TRUSTCART AI" className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Your Next Purchase Deserves <br />
          <span className="bg-gradient-to-r from-ai-cyan via-white to-trust bg-clip-text text-transparent">
            More Than a Star Rating.
          </span>
        </h2>

        {/* Supporting text */}
        <p className="mt-6 text-lg sm:text-xl text-brand-muted max-w-xl mx-auto font-normal">
          Investigate before you buy. Cut through deceptive listings, fake discounts, and anonymous social sellers.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onAnalyzeClick}
            className="px-7 py-4 rounded-xl font-bold text-sm text-dark-950 bg-gradient-to-r from-ai-cyan via-white to-ai-blue hover:shadow-glow-cyan active:scale-98 transition-all flex items-center gap-2 shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-dark-950" />
            <span>Analyze Your First Product →</span>
          </button>

          <button
            onClick={onExploreEngineClick}
            className="px-6 py-4 rounded-xl font-medium text-sm text-brand-text bg-dark-900/90 hover:bg-dark-850 border border-dark-700 hover:border-dark-600 transition-all flex items-center gap-2"
          >
            <span>Explore Trust Engine</span>
          </button>
        </div>

        {/* Bottom Trust Seal */}
        <div className="mt-12 flex items-center justify-center gap-6 text-xs text-brand-dim font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-trust" /> 0% Paid Affiliate Bias
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-ai-cyan" /> 100% Free for Consumers
          </span>
        </div>

      </div>
    </section>
  );
};
