import React, { useState } from 'react';
import { Scale, Check, X, ShieldCheck, Sparkles, Trophy, ArrowRight, Zap, ExternalLink } from 'lucide-react';
import { sampleComparisonData } from '../data/mockProducts';

export const ProductComparison: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('comp-1');

  return (
    <section id="compare" className="relative py-20 md:py-28 bg-dark-950 border-t border-dark-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ai-cyan/10 border border-ai-cyan/30 text-xs font-mono uppercase tracking-widest text-ai-cyan mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Forensic Head-to-Head</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Product Comparison, <br />
            <span className="bg-gradient-to-r from-ai-cyan via-white to-purple-300 bg-clip-text text-transparent">
              De-Hyped & Unfiltered.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted">
            We strip away marketing taglines and compare real metrics: actual review legitimacy, verified seller scores, hardware quality, and true risk.
          </p>
        </div>

        {/* 3-Column Comparison Grid (No boring spreadsheet) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {sampleComparisonData.map((item) => {
            const isBestOverall = item.badge === 'BEST OVERALL';
            const isBestValue = item.badge === 'BEST VALUE';
            const isLowestPrice = item.badge === 'LOWEST PRICE';

            return (
              <div
                key={item.id}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isBestOverall
                    ? 'bg-gradient-to-b from-dark-900 to-dark-950 border-2 border-ai-cyan/60 shadow-glow-cyan md:-translate-y-2'
                    : isBestValue
                    ? 'bg-dark-900/90 border border-trust/40 shadow-xl'
                    : 'bg-dark-900/60 border border-dark-800 hover:border-dark-700'
                }`}
              >
                {/* Badge Header */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isBestOverall
                        ? 'bg-ai-cyan text-dark-950 shadow-sm'
                        : isBestValue
                        ? 'bg-trust text-dark-950'
                        : 'bg-dark-800 text-brand-text border border-dark-700'
                    }`}>
                      {item.badge}
                    </span>

                    <span className="text-xs font-mono text-brand-dim">
                      {item.risk} Risk Tier
                    </span>
                  </div>

                  {/* Thumbnail & Title */}
                  <div className="mt-5 flex items-center gap-3.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover border border-dark-700 bg-dark-950"
                    />
                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {item.name}
                      </h3>
                      <div className="text-lg font-mono font-bold text-white mt-0.5">
                        ₹{item.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Trust Score Radial Bar */}
                  <div className="mt-6 p-3.5 rounded-xl bg-dark-950/80 border border-dark-800">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                      <span className="text-brand-dim uppercase">Overall Trust</span>
                      <span className="font-bold text-white">{item.trustScore}/100</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-dark-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          item.trustScore >= 90 ? 'bg-trust' : item.trustScore >= 80 ? 'bg-ai-cyan' : 'bg-warning'
                        }`}
                        style={{ width: `${item.trustScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Feature Breakdown Metrics */}
                  <div className="mt-5 space-y-2.5 text-xs font-mono">
                    <div className="flex items-center justify-between py-1.5 border-b border-dark-800/80">
                      <span className="text-brand-dim">Review Trust</span>
                      <span className="font-bold text-white">{item.reviewTrust}/100</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-dark-800/80">
                      <span className="text-brand-dim">Seller Trust</span>
                      <span className="font-bold text-white">{item.sellerTrust}/100</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-dark-800/80">
                      <span className="text-brand-dim">Hardware Quality</span>
                      <span className="font-bold text-white">{item.qualityScore}/100</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-dark-800/80">
                      <span className="text-brand-dim">Personalized Match</span>
                      <span className="font-bold text-trust">{item.userMatch}%</span>
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="mt-5 space-y-2">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-brand-dim">
                      Key Highlights:
                    </div>
                    {item.pros.map((p, pidx) => (
                      <div key={pidx} className="flex items-center gap-2 text-xs text-brand-text">
                        <Check className="w-3.5 h-3.5 text-trust flex-shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                    {item.cons.map((c, cidx) => (
                      <div key={cidx} className="flex items-center gap-2 text-xs text-brand-dim">
                        <X className="w-3.5 h-3.5 text-risk flex-shrink-0" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-6 pt-4 border-t border-dark-800">
                  <a
                    href="#console"
                    className={`w-full py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 ${
                      isBestOverall
                        ? 'bg-gradient-to-r from-ai-cyan to-ai-blue text-dark-950 hover:brightness-110 shadow-glow-cyan'
                        : 'bg-dark-800 text-white hover:bg-dark-750 border border-dark-700'
                    }`}
                  >
                    <span>Investigate Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
