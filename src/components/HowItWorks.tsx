import React, { useState } from 'react';
import { Search, ShieldCheck, Cpu, Scale, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      step: '01',
      title: 'DISCOVER',
      subtitle: 'Multi-Channel Intake',
      desc: 'Find the product from a marketplace, social post, image or description.',
      detailedDesc: 'Ingests links, screenshots, or keywords from Amazon, Flipkart, Instagram DMs, Shopify, Myntra and Telegram storefronts. Normalizes messy catalog listings.',
      icon: Search,
      tag: 'Input Layer',
      color: 'text-ai-cyan',
      borderColor: 'border-ai-cyan/40',
      bgColor: 'bg-ai-cyan/10'
    },
    {
      step: '02',
      title: 'VERIFY',
      subtitle: 'Seller & Entity Forensic',
      desc: 'Evaluate available seller and product signals.',
      detailedDesc: 'Audits seller age, account name changes, GST & business registration, fulfillment history, return policies, and platform dispute records.',
      icon: ShieldCheck,
      tag: 'Identity Layer',
      color: 'text-trust',
      borderColor: 'border-trust/40',
      bgColor: 'bg-trust/10'
    },
    {
      step: '03',
      title: 'ANALYZE',
      subtitle: 'NLP & Risk Intelligence',
      desc: 'Understand reviews, quality signals and potential risks.',
      detailedDesc: 'Scans thousands of customer reviews with NLP to detect bot clusters, paid review velocity, unboxing defect ratios, and hidden specifications.',
      icon: Cpu,
      tag: 'Deep Audit',
      color: 'text-purple-400',
      borderColor: 'border-purple-400/40',
      bgColor: 'bg-purple-400/10'
    },
    {
      step: '04',
      title: 'COMPARE',
      subtitle: 'Market & Price Matrix',
      desc: 'Compare price, trust and alternatives.',
      detailedDesc: 'Maps 90-day price trends across cross-platform indexes to catch fake "Was ₹9,999" discounts, calculating true market worth vs competitors.',
      icon: Scale,
      tag: 'Pricing & Specs',
      color: 'text-ai-blue',
      borderColor: 'border-ai-blue/40',
      bgColor: 'bg-ai-blue/10'
    },
    {
      step: '05',
      title: 'DECIDE',
      subtitle: 'Explainable Verdict',
      desc: 'Get an explainable BUY, WAIT or AVOID recommendation.',
      detailedDesc: 'Synthesizes all signals into an actionable BUY, WAIT or AVOID verdict with full transparent rationale and personalized user preference alignment.',
      icon: CheckCircle2,
      tag: 'Actionable Intelligence',
      color: 'text-emerald-300',
      borderColor: 'border-emerald-300/40',
      bgColor: 'bg-emerald-300/10'
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 md:py-28 bg-dark-950/60 border-t border-dark-800/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-900 border border-dark-700 text-xs font-mono uppercase tracking-widest text-ai-cyan mb-4">
            <span>How TrustCart Thinks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            From Product Discovery to Confident Decision.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted">
            Our multi-layer investigative pipeline cuts through manipulative marketing, fake discounts, and suspicious reviews in milliseconds.
          </p>
        </div>

        {/* Step Flow Nodes (Desktop & Tablet Horizontal Pipeline) */}
        <div className="mt-16 relative">
          
          {/* Flowing Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-8 h-0.5 bg-gradient-to-r from-ai-cyan via-trust to-purple-400 opacity-30 pointer-events-none" />

          {/* 5 Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isSelected = activeStep === index;

              return (
                <div
                  key={s.step}
                  onMouseEnter={() => setActiveStep(index)}
                  className={`group relative rounded-2xl p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-dark-900/95 border-2 ' + s.borderColor + ' shadow-2xl scale-[1.02]'
                      : 'bg-dark-900/50 border border-dark-800/80 hover:bg-dark-850 hover:border-dark-700'
                  }`}
                >
                  {/* Step Number & Badge */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-mono font-extrabold ${isSelected ? s.color : 'text-brand-dim'}`}>
                        {s.step}
                      </span>
                      <div className={`p-2 rounded-xl ${s.bgColor} ${s.color} border border-dark-700/50`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-brand-dim">
                        {s.subtitle}
                      </div>
                      <h3 className="text-lg font-bold text-white mt-0.5">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-xs text-brand-muted leading-relaxed">
                        "{s.desc}"
                      </p>
                    </div>
                  </div>

                  {/* Hover detail reveal */}
                  <div className={`mt-4 pt-3 border-t border-dark-800 text-[11px] leading-relaxed transition-opacity duration-200 ${
                    isSelected ? 'text-brand-text opacity-100' : 'text-brand-dim opacity-70'
                  }`}>
                    {s.detailedDesc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Step Highlight Bar */}
        <div className="mt-8 p-4 rounded-xl bg-dark-900/80 border border-dark-700/80 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase text-ai-cyan font-bold px-2 py-1 rounded bg-dark-800 border border-dark-700">
              Pipeline Stage {steps[activeStep].step}
            </span>
            <span className="text-sm font-semibold text-white">
              {steps[activeStep].title}: {steps[activeStep].subtitle}
            </span>
          </div>
          <div className="text-xs text-brand-muted text-center sm:text-right">
            Hover over any phase above to inspect how the AI breaks down signals.
          </div>
        </div>

      </div>
    </section>
  );
};
