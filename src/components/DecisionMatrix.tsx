import React, { useState } from 'react';
import { CheckCircle2, Clock, AlertOctagon, ArrowRight, ShieldCheck, TrendingDown, AlertTriangle, ExternalLink } from 'lucide-react';
import { RecommendationType } from '../types';

export const DecisionMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RecommendationType>('BUY');

  const decisions = {
    BUY: {
      tag: '🟢 BUY VERDICT',
      title: 'Good Value + Strong Trust Signals',
      color: 'text-trust',
      borderColor: 'border-trust/40',
      bgColor: 'bg-trust/10',
      glowShadow: 'shadow-glow-trust',
      headline: 'Clear to purchase with high statistical confidence.',
      criteria: [
        'Verified seller with long-term platform history and active warranty channel',
        'Review authenticity score above 85% with natural linguistic distribution',
        'Current price within bottom quartile of 90-day tracking index',
        'Established return & dispute resolution compliance'
      ],
      sampleProduct: {
        name: 'Sony WH-1000XM5 Noise Canceling Headphones',
        price: '₹26,990',
        trustScore: 92,
        reason: 'Authorized brand seller, authentic 4.8★ reviews across 3,400+ units, price currently ₹1,509 below 30-day average.'
      }
    },
    WAIT: {
      tag: '🟡 WAIT VERDICT',
      title: 'Solid Product, But Timing / Price May Improve',
      color: 'text-warning',
      borderColor: 'border-warning/40',
      bgColor: 'bg-warning/10',
      glowShadow: 'shadow-glow-warning',
      headline: 'Product is legitimate, but holding off for 7-14 days will save money.',
      criteria: [
        'Priced above recent 30-day moving average or recent pre-sale inflation detected',
        'Upcoming scheduled marketplace seasonal festival sale within 10-15 days',
        'Minor firmware/batch revisions announced for imminent release',
        'Healthy seller and reviews, but sub-optimal purchasing timing'
      ],
      sampleProduct: {
        name: 'Noise ColorFit Pulse 3 Smartwatch',
        price: '₹1,999 (Elevated)',
        trustScore: 81,
        reason: 'Current price is ₹200 above 30-day baseline. Predictive model forecasts a drop to ₹1,499 during the upcoming festive sale in 12 days.'
      }
    },
    AVOID: {
      tag: '🔴 AVOID VERDICT',
      title: 'Potentially High Risk, Clone, or Exploitative Markup',
      color: 'text-risk',
      borderColor: 'border-risk/40',
      bgColor: 'bg-risk/10',
      glowShadow: 'shadow-glow-risk',
      headline: 'Significant risk of non-delivery, fake reviews, or dropshipped clone.',
      criteria: [
        'Hidden pricing behind "DM for price" with unverified direct UPI transfers',
        'Bot review clusters with copy-pasted enthusiasm and no real benchmarks',
        'Reverse image search links product to ₹800 wholesale factory batches marked up to ₹3,500+',
        'Unenforceable return policies or newly created anonymous seller profiles'
      ],
      sampleProduct: {
        name: 'AuraStyle CloudRun Hyped Sneaker (Instagram DM)',
        price: '₹3,499 (Hidden in DM)',
        trustScore: 34,
        reason: 'High scam risk. Unregistered Instagram seller changed name 3 times, comments blocked, identical wholesale listing found for ₹850 on OEM hub.'
      }
    }
  };

  const current = decisions[activeTab];

  return (
    <section id="decision-matrix" className="relative py-20 md:py-28 bg-dark-950/80 border-t border-dark-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-900 border border-dark-700 text-xs font-mono uppercase tracking-widest text-white mb-4">
            <span>Actionable Decision Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            A Decision, <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-trust via-warning to-risk bg-clip-text text-transparent">
              Not Just a Recommendation.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted">
            We don't leave you with confusing 50-page datasheets. We give you a decisive, explainable verdict: BUY, WAIT, or AVOID.
          </p>
        </div>

        {/* 3 Decision State Switcher Tabs */}
        <div className="mt-12 flex justify-center">
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-dark-900 border border-dark-700/80 max-w-xl w-full">
            
            <button
              onClick={() => setActiveTab('BUY')}
              className={`py-3 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'BUY'
                  ? 'bg-trust text-dark-950 shadow-glow-trust'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>BUY</span>
            </button>

            <button
              onClick={() => setActiveTab('WAIT')}
              className={`py-3 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'WAIT'
                  ? 'bg-warning text-dark-950 shadow-glow-warning'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>WAIT</span>
            </button>

            <button
              onClick={() => setActiveTab('AVOID')}
              className={`py-3 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'AVOID'
                  ? 'bg-risk text-white shadow-glow-risk'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <AlertOctagon className="w-4 h-4" />
              <span>AVOID</span>
            </button>
          </div>
        </div>

        {/* Interactive Expanded Case Study Card */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className={`rounded-2xl p-6 sm:p-8 bg-dark-900/90 border-2 ${current.borderColor} shadow-2xl backdrop-blur-xl transition-all duration-300`}>
            
            {/* Header of Active Decision */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-dark-800">
              <div>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${current.color}`}>
                  {current.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {current.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-brand-dim">
                Click tabs above to switch verdicts
              </span>
            </div>

            {/* Decision Threshold Criteria */}
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-brand-dim mb-3">
                Algorithmic Trigger Criteria:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {current.criteria.map((c, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-dark-950/80 border border-dark-800 flex items-start gap-2.5 text-xs text-brand-text">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      activeTab === 'BUY' ? 'bg-trust' : activeTab === 'WAIT' ? 'bg-warning' : 'bg-risk'
                    }`} />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Example Analysis Case Study */}
            <div className="mt-6 p-4 rounded-xl bg-dark-950 border border-dark-800">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-dark-850">
                <span className="text-brand-dim font-mono uppercase">
                  Simulated Case Study
                </span>
                <span className={`font-mono font-bold ${current.color}`}>
                  Trust Index: {current.sampleProduct.trustScore}/100
                </span>
              </div>
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h5 className="text-sm font-bold text-white">
                    {current.sampleProduct.name}
                  </h5>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    "{current.sampleProduct.reason}"
                  </p>
                </div>
                <div className="font-mono font-bold text-white whitespace-nowrap text-right">
                  {current.sampleProduct.price}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
