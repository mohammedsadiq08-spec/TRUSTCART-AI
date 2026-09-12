import React, { useState } from 'react';
import { MessageSquareWarning, Star, CheckCircle, AlertTriangle, Sparkles, User, ShieldCheck, ShieldAlert, Cpu, Bot } from 'lucide-react';
import { apiClient } from '../services/api';

export const FakeReviewAnalyzer: React.FC = () => {
  const [customReviewInput, setCustomReviewInput] = useState('');
  const [isAnalyzingCustom, setIsAnalyzingCustom] = useState(false);
  const [customResult, setCustomResult] = useState<{
    suspicionScore: number;
    label: string;
    signals: string[];
  } | null>(null);

  const reviews = [
    {
      author: 'Anonymous_User882',
      rating: 5,
      date: 'Aug 28, 2026',
      text: 'Absolutely amazing!!! Best product ever in the world buy now 1000% perfect quality guaranteed!!! 🔥🔥🔥',
      isSuspicious: true,
      suspicionProb: 88,
      label: 'Potentially Suspicious Pattern',
      signals: [
        'Excessive exclamation marks & superlative bias',
        'No specific technical or functional parameters',
        'Reviewer account created same day with 0 prior history',
        'Cluster timestamp coincides with bulk promo campaign'
      ]
    },
    {
      author: 'Deepak Raghavan (Verified Purchase)',
      rating: 4,
      date: 'Sep 2, 2026',
      text: 'Battery lasted around 28 hours with ANC on during my Bangalore-Delhi flight. Comfortable for long study sessions, but the microphone is average in windy traffic.',
      isSuspicious: false,
      suspicionProb: 12,
      label: 'Higher Credibility Signals',
      signals: [
        'Balanced pros & cons with specific context of use',
        'Verified invoice receipt and long-term buyer account',
        'Natural sentence structure and moderate emotional sentiment',
        'Specific mention of real-world battery metric'
      ]
    },
    {
      author: 'ShopDirect_Promoter',
      rating: 5,
      date: 'Aug 30, 2026',
      text: 'Seller sent item immediately. Very nice item. Will order 10 more for my family. 5 stars!',
      isSuspicious: true,
      suspicionProb: 79,
      label: 'Incentivized / Bot Probability',
      signals: [
        'Template phrasing matches 18 other listings from same merchant',
        'Focuses exclusively on seller speed rather than product attributes',
        'Unverified purchase status'
      ]
    }
  ];

  const handleAnalyzeCustomReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customReviewInput.trim()) return;
    setIsAnalyzingCustom(true);

    try {
      const res = await apiClient.analyzeReviewText(customReviewInput, 5, true);
      setCustomResult({
        suspicionScore: res.suspicionScore,
        label: res.label,
        signals: res.signals
      });
    } catch (err) {
      console.error('Review analysis failed:', err);
    } finally {
      setIsAnalyzingCustom(false);
    }
  };

  return (
    <section id="fake-reviews" className="relative py-20 md:py-28 bg-dark-950 border-t border-dark-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ai-purple/10 border border-purple-500/30 text-xs font-mono uppercase tracking-widest text-purple-300 mb-4">
            <Bot className="w-3.5 h-3.5" />
            <span>AI Review Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Not Every 5-Star Review <br />
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-ai-cyan bg-clip-text text-transparent">
              Deserves 5 Stars.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted">
            Online marketplaces are flooded with bot farms, paid unboxers, and copy-pasted templates. TRUSTCART AI scans thousands of reviews to highlight authentic experiences.
          </p>
        </div>

        {/* 5 Dimensions of Review Intelligence */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Suspicious Language', desc: 'Identifies template phrasing & robotic hyperbole' },
            { label: 'Duplicate Patterns', desc: 'Finds identical reviews across multiple accounts' },
            { label: 'Reviewer Behavior', desc: 'Tracks account age and unverified purchase ratios' },
            { label: 'Rating Anomalies', desc: 'Detects artificial sudden spikes in 5-star bursts' },
            { label: 'Review Consistency', desc: 'Cross-checks complaints with known failure rates' },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-dark-900/60 border border-dark-800 flex flex-col justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan" />
                {item.label}
              </span>
              <p className="text-[11px] text-brand-dim mt-2 leading-tight">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Realistic Review Comparisons */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 bg-dark-900/80 border flex flex-col justify-between transition-all duration-300 ${
                rev.isSuspicious
                  ? 'border-risk/40 hover:border-risk/70'
                  : 'border-trust/40 hover:border-trust/70'
              }`}
            >
              <div>
                {/* Header: User & Rating */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-dark-950 border border-dark-700 flex items-center justify-center text-brand-dim">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{rev.author}</div>
                      <div className="text-[10px] text-brand-dim font-mono">{rev.date}</div>
                    </div>
                  </div>

                  <div className="flex text-warning">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-warning text-warning' : 'text-dark-700'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Body */}
                <blockquote className="mt-4 text-xs text-brand-text italic leading-relaxed p-3 rounded-xl bg-dark-950/60 border border-dark-800">
                  "{rev.text}"
                </blockquote>

                {/* AI Credibility Assessment Tag */}
                <div className="mt-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold font-mono ${
                    rev.isSuspicious
                      ? 'bg-risk/10 text-risk border border-risk/30'
                      : 'bg-trust/10 text-trust border border-trust/30'
                  }`}>
                    {rev.isSuspicious ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                    <span>{rev.label}</span>
                    <span className="ml-1 opacity-80">({rev.suspicionProb}% Prob)</span>
                  </div>
                </div>

                {/* Detected Signals List */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[10px] font-mono text-brand-dim uppercase tracking-wider block">
                    Observed Credibility Signals:
                  </span>
                  {rev.signals.map((sig, sidx) => (
                    <div key={sidx} className="flex items-start gap-1.5 text-[11px] text-brand-muted">
                      <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${rev.isSuspicious ? 'bg-risk' : 'bg-trust'}`} />
                      <span>{sig}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-dark-800 text-[10px] text-brand-dim font-mono flex items-center justify-between">
                <span>NLP Entropy Scan</span>
                <span className={rev.isSuspicious ? 'text-risk' : 'text-trust'}>
                  {rev.isSuspicious ? 'Flagged Pattern' : 'Verified Organic'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Interactive Review Tester Widget */}
        <div className="mt-12 rounded-2xl bg-dark-900/90 border border-dark-700/80 p-6 max-w-3xl mx-auto shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-ai-cyan" />
            <h3 className="text-sm font-bold text-white">
              Try the AI Review Credibility Scanner
            </h3>
          </div>
          <p className="text-xs text-brand-muted mb-4">
            Paste any customer review below to test how our neural model evaluates suspicion probability.
          </p>

          <form onSubmit={handleAnalyzeCustomReview} className="space-y-3">
            <textarea
              rows={2}
              value={customReviewInput}
              onChange={(e) => setCustomReviewInput(e.target.value)}
              placeholder="Paste a review snippet here, e.g. 'Got this yesterday, build feels solid and tested battery for 12 hours...'"
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-700 text-xs text-brand-text placeholder:text-brand-dim focus:outline-none focus:border-ai-cyan"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-brand-dim">
                Real-time linguistic audit
              </span>
              <button
                type="submit"
                disabled={isAnalyzingCustom || !customReviewInput.trim()}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-dark-950 bg-gradient-to-r from-ai-cyan to-ai-blue hover:brightness-110 disabled:opacity-40 transition-all"
              >
                {isAnalyzingCustom ? 'Analyzing Linguistics...' : 'Test Review Authenticity'}
              </button>
            </div>
          </form>

          {/* Custom Result Reveal */}
          {customResult && (
            <div className="mt-4 p-3.5 rounded-xl bg-dark-950 border border-dark-700 animate-in fade-in duration-300">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-white">AI Linguistic Assessment:</span>
                <span className={`font-mono font-bold ${customResult.suspicionScore > 50 ? 'text-risk' : 'text-trust'}`}>
                  {customResult.label}
                </span>
              </div>
              <ul className="space-y-1">
                {customResult.signals.map((s, idx) => (
                  <li key={idx} className="text-[11px] text-brand-muted flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-ai-cyan" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
