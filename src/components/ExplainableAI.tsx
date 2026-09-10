import React, { useState } from 'react';
import { Sparkles, Check, ChevronDown, ChevronUp, ShieldCheck, FileText, Database, Lock, Eye, ArrowRight } from 'lucide-react';

export const ExplainableAI: React.FC = () => {
  const [showEvidence, setShowEvidence] = useState<boolean>(false);

  const evidencePoints = [
    {
      title: 'Fits Target Budget & Spec Requirements',
      desc: 'Selected price point is within the declared budget ceiling while delivering >28h ANC battery runtime matching user persona.',
      source: 'Algorithmic constraint solver (Engine: v4.2)'
    },
    {
      title: 'Tier-1 Authorized Seller Pedigree (95/100)',
      desc: 'Seller Appario Retail is an official manufacturer-certified distributor with 7+ years track record and < 0.4% dispute escalation rate.',
      source: 'Marketplace merchant registry and corporate filings'
    },
    {
      title: 'Reliable Review Signals (88/100 Authenticity)',
      desc: 'NLP sentiment scan of 3,420 reviews verified organic linguistic diversity with 88% verified buyer invoice timestamps.',
      source: 'Review entropy neural validator'
    },
    {
      title: 'Favorable Historical Price Window',
      desc: 'Current listing of ₹26,990 sits in the bottom 12th percentile of annual tracking without artificial pre-discount markup.',
      source: 'Cross-store price historical database (365 days)'
    },
    {
      title: 'Low Risk Tier & Full Return Protection',
      desc: 'Standard 7-day replacement guaranteed with nationwide brand repair centers and direct warranty coverage.',
      source: 'Consumer dispute policy inspection'
    }
  ];

  return (
    <section className="relative py-20 md:py-28 bg-dark-950/70 border-t border-dark-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ai-cyan/10 border border-ai-cyan/30 text-xs font-mono uppercase tracking-widest text-ai-cyan mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explainable AI Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Don't Just Trust the AI. <br />
            <span className="bg-gradient-to-r from-ai-cyan via-white to-trust bg-clip-text text-transparent">
              Understand It.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted">
            Black-box AI is dangerous for purchasing decisions. TRUSTCART AI provides verifiable evidence for every single recommendation.
          </p>
        </div>

        {/* Explainable Decision Card */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-dark-900/90 border border-dark-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Top Recommendation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-dark-800">
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-lg bg-trust text-dark-950 font-bold font-mono text-sm tracking-wider flex items-center gap-1.5 shadow-glow-trust">
                <Check className="w-4 h-4" />
                <span>BUY</span>
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  Sony WH-1000XM5 Wireless Headphones
                </div>
                <div className="text-xs text-brand-dim">
                  Amazon India • Listing ID: B09XS7JWHH
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-xs text-brand-dim">Confidence Score:</span>
              <span className="text-xl font-extrabold text-trust">89%</span>
            </div>
          </div>

          {/* Transparent "Why?" List */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono uppercase font-bold text-white">
                Why was this decision generated?
              </span>
            </div>

            <div className="space-y-3">
              {evidencePoints.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-dark-950 border border-dark-800/90 flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-trust/10 border border-trust/40 text-trust flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div className="flex-1">
                    <strong className="text-white block font-medium">
                      {item.title}
                    </strong>
                    <p className="text-brand-muted mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Evidence Drawer Toggle Button */}
          <div className="mt-6 pt-5 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-brand-dim font-mono">
              Cryptographic Signal Audit Trail • Hash: <span className="text-white">#tc_98a72b</span>
            </div>

            <button
              onClick={() => setShowEvidence(!showEvidence)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-dark-800 hover:bg-dark-750 border border-dark-600 transition-all flex items-center gap-2 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-ai-cyan" />
              <span>{showEvidence ? 'Hide Technical Evidence' : 'Show Forensic Evidence'}</span>
              {showEvidence ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Expanded Deep Technical Evidence Panel */}
          {showEvidence && (
            <div className="mt-5 p-5 rounded-xl bg-dark-950/90 border border-ai-cyan/30 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-ai-cyan uppercase">
                <Database className="w-4 h-4" />
                Raw Telemetry & Verification Audit Trail
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-dark-900 border border-dark-800 font-mono text-[11px] text-brand-dim space-y-1">
                  <div className="text-white font-semibold">1. NLP Syntactic Score:</div>
                  <div>- Shannon Entropy: 4.82 (Organic)</div>
                  <div>- Syntactic Repetition Index: 0.08 (Low)</div>
                  <div>- Review Burst Anomaly Index: 1.2% (Nominal)</div>
                </div>

                <div className="p-3 rounded-lg bg-dark-900 border border-dark-800 font-mono text-[11px] text-brand-dim space-y-1">
                  <div className="text-white font-semibold">2. Merchant Entity Record:</div>
                  <div>- GSTIN Status: Active (Karnataka 29AAAAA0000A1Z5)</div>
                  <div>- Direct Brand Contract: Active Tier-1 Sony India</div>
                  <div>- Marketplace Fulfilled: FBA Insured Logistics</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-dark-900 border border-dark-800 text-[11px] text-brand-muted flex items-center justify-between">
                <span>All verification logs are independently verifiable and mathematically auditable.</span>
                <span className="text-trust font-mono font-bold">100% Deterministic</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
