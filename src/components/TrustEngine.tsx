import React, { useState } from 'react';
import { MessageSquareText, Shield, TrendingDown, Award, AlertOctagon, CheckCircle2, ChevronRight, Info } from 'lucide-react';

export const TrustEngine: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(0);

  const layers = [
    {
      id: '01',
      name: 'Review Trust',
      score: 87,
      scoreMax: 100,
      icon: MessageSquareText,
      color: 'text-trust',
      bgGradient: 'from-trust/20 to-emerald-950/30',
      borderColor: 'border-trust/40',
      shortDesc: 'Based on review consistency, sentiment patterns and suspicious-review signals.',
      signals: [
        'Natural review submission velocity curves',
        'NLP detection of sponsored & AI-generated templates',
        'Cross-validation of verified buyer timestamps',
        'Ratio of unboxing complaint anomalies'
      ],
      methodology: 'Our proprietary language model flags synthetic enthusiasm, burst review cycles, and paid positive clustering.'
    },
    {
      id: '02',
      name: 'Seller Trust',
      score: 95,
      scoreMax: 100,
      icon: Shield,
      color: 'text-ai-cyan',
      bgGradient: 'from-ai-cyan/20 to-cyan-950/30',
      borderColor: 'border-ai-cyan/40',
      shortDesc: 'Evaluates seller longevity, dispute resolution rates, and brand authorization pedigree.',
      signals: [
        'Tier-1 brand authorization status',
        'Entity age > 7 years across multiple platforms',
        '99.2% on-time dispatch and authentic serial numbering',
        'Strict compliance with statutory consumer return laws'
      ],
      methodology: 'Fingerprints merchant history across corporate registers, consumer court filings, and marketplace penalty logs.'
    },
    {
      id: '03',
      name: 'Price Intelligence',
      score: 91,
      scoreMax: 100,
      icon: TrendingDown,
      color: 'text-ai-blue',
      bgGradient: 'from-ai-blue/20 to-blue-950/30',
      borderColor: 'border-ai-blue/40',
      shortDesc: 'Tracks multi-retailer historical fluctuations to expose artificial price markups.',
      signals: [
        'Current price ₹1,500 below 30-day moving average',
        'No artificial pre-sale price inflation detected',
        'True discount calculated against 180-day baseline',
        'Predictive deal probability for upcoming sale cycles'
      ],
      methodology: 'Continuously monitors price changes every 15 minutes across major retailers to catch fake slash-price tricks.'
    },
    {
      id: '04',
      name: 'Product Reliability',
      score: 94,
      scoreMax: 100,
      icon: Award,
      color: 'text-purple-400',
      bgGradient: 'from-purple-500/20 to-purple-950/30',
      borderColor: 'border-purple-400/40',
      shortDesc: 'Measures build durability, hardware failure benchmarks, and warranty service accessibility.',
      signals: [
        '< 1.8% defect return rate reported by buyers',
        'Nationwide authorized service center availability',
        'Over-the-air firmware updates maintained regularly',
        'High build score in independent stress tests'
      ],
      methodology: 'Aggregates long-term owner check-ins, teardown logs, repairability ratings, and customer care fulfillment response times.'
    },
    {
      id: '05',
      name: 'Purchase Risk',
      score: 8, // Low risk
      scoreMax: 100,
      riskLevel: 'LOW',
      icon: AlertOctagon,
      color: 'text-emerald-400',
      bgGradient: 'from-emerald-500/20 to-teal-950/30',
      borderColor: 'border-emerald-400/40',
      shortDesc: 'Calculates the net probability of delivery failure, counterfeit units, or return refusal.',
      signals: [
        'Fulfillment handled through insured logistics',
        'No active counterfeit clone variants detected in batch',
        'Instant refund guarantee supported on standard return',
        'Transparent escrow/payment gateway protection'
      ],
      methodology: 'Synthesizes all remaining risk vectors into a single probabilistic risk tier (Low, Medium, or High Risk).'
    }
  ];

  const current = layers[selectedLayer];
  const Icon = current.icon;

  return (
    <section id="trust-engine" className="relative py-20 md:py-28 bg-dark-950/80 border-t border-dark-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ai-cyan/10 border border-ai-cyan/30 text-xs font-mono uppercase tracking-widest text-ai-cyan mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Multi-Vector Trust Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            One Product. <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-ai-cyan via-white to-trust bg-clip-text text-transparent">
              Five Layers of Trust.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted">
            A single star rating cannot tell you the truth. Our Trust Engine deconstructs every purchasing decision across five critical vectors.
          </p>
        </div>

        {/* 5 Layer Navigation & Interactive Viewer */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 5 Layer Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {layers.map((layer, idx) => {
              const LayerIcon = layer.icon;
              const isSelected = selectedLayer === idx;

              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayer(idx)}
                  onMouseEnter={() => setSelectedLayer(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? `bg-dark-900 ${layer.borderColor} shadow-xl scale-[1.02]`
                      : 'bg-dark-900/40 border-dark-800 hover:bg-dark-900/80 hover:border-dark-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                      isSelected ? `${layer.color} bg-dark-950 border-current` : 'text-brand-dim bg-dark-950 border-dark-800'
                    }`}>
                      <LayerIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-brand-dim">{layer.id}</span>
                        <h3 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-brand-muted'}`}>
                          {layer.name}
                        </h3>
                      </div>
                      <p className="text-xs text-brand-dim line-clamp-1 mt-0.5">
                        {layer.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Score Pill */}
                  <div className="flex items-center gap-2">
                    <div className="text-right font-mono">
                      <span className={`text-base font-bold ${isSelected ? layer.color : 'text-white'}`}>
                        {layer.riskLevel ? layer.riskLevel : `${layer.score}`}
                      </span>
                      {!layer.riskLevel && (
                        <span className="text-[10px] text-brand-dim">/{layer.scoreMax}</span>
                      )}
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? `${layer.color} translate-x-1` : 'text-dark-700'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Deep Expanded Explanation & Signals Inspector */}
          <div className="lg:col-span-7">
            <div className={`rounded-2xl p-6 sm:p-8 bg-dark-900/90 border ${current.borderColor} shadow-2xl backdrop-blur-xl relative overflow-hidden transition-all duration-500`}>
              
              {/* Dynamic Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-white/[0.04] to-transparent rounded-bl-full pointer-events-none" />

              {/* Layer Title Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-dark-800">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-dark-950 border ${current.borderColor} ${current.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-brand-dim">
                      Layer {current.id} Forensic Vector
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {current.name}
                    </h3>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-dark-950 border border-dark-800 flex items-baseline gap-1.5 font-mono">
                  <span className="text-xs text-brand-dim">Audit Score:</span>
                  <span className={`text-xl font-black ${current.color}`}>
                    {current.riskLevel ? `${current.riskLevel} RISK` : `${current.score}/100`}
                  </span>
                </div>
              </div>

              {/* Vector Core Summary */}
              <div className="mt-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-brand-dim">
                  Vector Objective
                </h4>
                <p className="text-base text-brand-text font-normal mt-1 leading-relaxed">
                  {current.shortDesc}
                </p>
              </div>

              {/* Detected Verified Signals */}
              <div className="mt-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-brand-dim mb-3">
                  Key Verification Signals Examined
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.signals.map((sig, sidx) => (
                    <div key={sidx} className="p-3 rounded-xl bg-dark-950/70 border border-dark-800/80 flex items-start gap-2.5 text-xs text-brand-text">
                      <CheckCircle2 className={`w-4 h-4 ${current.color} flex-shrink-0 mt-0.5`} />
                      <span>{sig}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Methodology Explainer */}
              <div className="mt-6 p-4 rounded-xl bg-dark-950/90 border border-dark-800 flex items-start gap-3 text-xs">
                <Info className="w-4 h-4 text-ai-cyan flex-shrink-0 mt-0.5" />
                <div className="text-brand-muted">
                  <strong className="text-white block font-medium">How AI calculates this score:</strong>
                  {current.methodology}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
