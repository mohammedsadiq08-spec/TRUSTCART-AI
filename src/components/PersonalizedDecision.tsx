import React, { useState } from 'react';
import { Sliders, Sparkles, Check, Headphones, Laptop, Gamepad2, Dumbbell, Compass, ArrowRight } from 'lucide-react';

export const PersonalizedDecision: React.FC = () => {
  const [purpose, setPurpose] = useState<'Study' | 'Office' | 'Gaming' | 'Fitness' | 'Audiophile'>('Study');
  const [budget, setBudget] = useState<number>(30000);
  
  // Weights (percentages summing to 100%)
  const [comfort, setComfort] = useState<number>(40);
  const [battery, setBattery] = useState<number>(30);
  const [sound, setSound] = useState<number>(20);
  const [mic, setMic] = useState<number>(10);

  // Dynamic match calculation based on purpose and sliders
  const calculateMatch = () => {
    if (purpose === 'Study') {
      return {
        product: 'Sony WH-1000XM5',
        matchPercent: Math.min(98, Math.max(82, 85 + Math.round((comfort * 0.15) + (battery * 0.1)))),
        reason: 'Best match for your budget and comfort-first focus. Class-leading ANC eliminates library/cafe chatter completely.',
        rating: 9.6,
        price: '₹26,990',
        badge: 'Top Pick for Long Study Sessions'
      };
    } else if (purpose === 'Office') {
      return {
        product: 'Bose QuietComfort 45',
        matchPercent: 93,
        reason: 'Outstanding all-day headband ergonomics with dedicated multi-device Zoom / Teams switching.',
        rating: 9.3,
        price: '₹24,990',
        badge: 'Top Pick for Work & Meetings'
      };
    } else if (purpose === 'Gaming') {
      return {
        product: 'SteelSeries Arctis Nova Pro Wireless',
        matchPercent: 95,
        reason: 'Zero-latency 2.4GHz connection, hot-swappable battery system, and pin-point spatial audio.',
        rating: 9.5,
        price: '₹31,990',
        badge: 'Top Pick for Low Latency'
      };
    } else if (purpose === 'Fitness') {
      return {
        product: 'Jabra Elite 8 Active Gen 2',
        matchPercent: 92,
        reason: 'Military-grade IP68 waterproof rating, shake-proof fit, and rugged sweat resistance.',
        rating: 9.2,
        price: '₹17,999',
        badge: 'Top Pick for Workout Durability'
      };
    } else {
      return {
        product: 'Sennheiser HD 660S2',
        matchPercent: 97,
        reason: 'Natural acoustic timbre, expansive soundstage, and ultra-low harmonic distortion curve.',
        rating: 9.7,
        price: '₹38,990',
        badge: 'Top Pick for Studio Fidelity'
      };
    }
  };

  const bestMatch = calculateMatch();

  const purposes = [
    { id: 'Study', icon: Headphones, label: 'Study & Reading' },
    { id: 'Office', icon: Laptop, label: 'Work & Calls' },
    { id: 'Gaming', icon: Gamepad2, label: 'Gaming / Spatial' },
    { id: 'Fitness', icon: Dumbbell, label: 'Gym & Fitness' },
    { id: 'Audiophile', icon: Compass, label: 'Pure Hi-Fi Audio' },
  ] as const;

  return (
    <section id="personalized-decision" className="relative py-20 md:py-28 bg-dark-950 border-t border-dark-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-trust/10 border border-trust/30 text-xs font-mono uppercase tracking-widest text-trust mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>Explainable Personalization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            The Best Product Isn't <br />
            <span className="bg-gradient-to-r from-trust via-ai-cyan to-white bg-clip-text text-transparent">
              the Same for Everyone.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted">
            Generic top-10 lists fail because they ignore your unique constraints. Configure your priorities to see how the AI selects the optimal match.
          </p>
        </div>

        {/* Interactive Personalization Console */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Preference Sliders & Controls */}
          <div className="lg:col-span-6 rounded-2xl bg-dark-900/80 border border-dark-700/80 p-6 sm:p-7 shadow-xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-dark-800">
                <span className="text-xs font-mono uppercase font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-ai-cyan" />
                  Your Usage Persona & Priorities
                </span>
                <span className="text-[11px] font-mono text-brand-dim">
                  Real-time Recalculation
                </span>
              </div>

              {/* Purpose Selector */}
              <div className="mt-5">
                <label className="text-xs font-mono uppercase tracking-wider text-brand-dim block mb-2">
                  Primary Usage Objective:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {purposes.map((p) => {
                    const Icon = p.icon;
                    const isSelected = purpose === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPurpose(p.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                          isSelected
                            ? 'bg-dark-950 border-ai-cyan text-white shadow-sm'
                            : 'bg-dark-950/40 border-dark-800 text-brand-muted hover:border-dark-700 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-ai-cyan' : 'text-brand-dim'}`} />
                        <span className="text-xs font-medium">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sliders Area */}
              <div className="mt-6 space-y-4">
                
                {/* Comfort Priority */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-white font-medium">Ergonomic Comfort Weight</span>
                    <span className="font-mono font-bold text-ai-cyan">{comfort}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={comfort}
                    onChange={(e) => setComfort(Number(e.target.value))}
                    className="w-full h-1.5 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-ai-cyan"
                  />
                </div>

                {/* Battery Priority */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-white font-medium">Battery Endurance Weight</span>
                    <span className="font-mono font-bold text-trust">{battery}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={battery}
                    onChange={(e) => setBattery(Number(e.target.value))}
                    className="w-full h-1.5 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-trust"
                  />
                </div>

                {/* Sound Quality Priority */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-white font-medium">Acoustic Sound Profile</span>
                    <span className="font-mono font-bold text-purple-400">{sound}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={sound}
                    onChange={(e) => setSound(Number(e.target.value))}
                    className="w-full h-1.5 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-purple-400"
                  />
                </div>

                {/* Microphone Priority */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-white font-medium">Microphone / Call Clarity</span>
                    <span className="font-mono font-bold text-brand-muted">{mic}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={mic}
                    onChange={(e) => setMic(Number(e.target.value))}
                    className="w-full h-1.5 bg-dark-950 rounded-lg appearance-none cursor-pointer accent-brand-muted"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-800 text-[11px] text-brand-dim font-mono flex items-center justify-between">
              <span>Weights Auto-Normalized</span>
              <span>Target Budget: Up to ₹35,000</span>
            </div>
          </div>

          {/* RIGHT: Dynamic Best Match Reveal */}
          <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-dark-900 via-dark-900 to-dark-950 border border-trust/40 p-6 sm:p-7 shadow-2xl backdrop-blur-xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Glow backdrop */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-trust/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider bg-trust/10 text-trust border border-trust/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  YOUR BEST MATCH
                </span>

                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-2xl font-black text-trust">{bestMatch.matchPercent}%</span>
                  <span className="text-xs text-brand-dim">Match</span>
                </div>
              </div>

              {/* Product Title & Badge */}
              <div className="mt-5">
                <span className="text-xs font-mono uppercase text-ai-cyan font-semibold">
                  {bestMatch.badge}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {bestMatch.product}
                </h3>
                <div className="text-lg font-mono font-bold text-white mt-1">
                  {bestMatch.price}
                </div>
              </div>

              {/* Reason Explanation */}
              <div className="mt-5 p-4 rounded-xl bg-dark-950/80 border border-dark-800">
                <span className="text-[10px] uppercase font-mono tracking-wider text-brand-dim block mb-1">
                  Explainable Rationale
                </span>
                <p className="text-xs sm:text-sm text-brand-text leading-relaxed">
                  "{bestMatch.reason}"
                </p>
              </div>

              {/* Feature Matrix Breakdown for User */}
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-dark-950/60 border border-dark-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-trust" />
                  <span className="text-brand-muted">Fits Comfort Priority</span>
                </div>
                <div className="p-2.5 rounded-lg bg-dark-950/60 border border-dark-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-trust" />
                  <span className="text-brand-muted">30-Day Fair Price Window</span>
                </div>
                <div className="p-2.5 rounded-lg bg-dark-950/60 border border-dark-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-trust" />
                  <span className="text-brand-muted">95/100 Seller Pedigree</span>
                </div>
                <div className="p-2.5 rounded-lg bg-dark-950/60 border border-dark-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-trust" />
                  <span className="text-brand-muted">Instant Warranty Support</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-800 flex items-center justify-between">
              <span className="text-xs text-brand-dim font-mono">
                No sponsored placement bias
              </span>
              <a
                href="#console"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-ai-cyan hover:underline"
              >
                <span>Investigate In-Depth</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
