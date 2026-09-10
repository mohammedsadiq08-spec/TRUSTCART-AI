import React, { useState } from 'react';
import { Instagram, AlertTriangle, ShieldAlert, Sparkles, MessageCircle, Heart, Share2, Bookmark, Eye, ArrowRight, ExternalLink, RefreshCw } from 'lucide-react';
import { sampleSocialPost } from '../data/mockProducts';
import { ProductInvestigation } from '../types';
import { mockInvestigatedProducts } from '../data/mockProducts';

interface SocialCommerceDemoProps {
  onInvestigateProduct: (p: ProductInvestigation) => void;
}

export const SocialCommerceDemo: React.FC<SocialCommerceDemoProps> = ({
  onInvestigateProduct
}) => {
  const [isScanningSocial, setIsScanningSocial] = useState(false);
  const [activeTab, setActiveTab] = useState<'instagram' | 'whatsapp'>('instagram');

  const handleRunScan = () => {
    setIsScanningSocial(true);
    setTimeout(() => {
      setIsScanningSocial(false);
      onInvestigateProduct(mockInvestigatedProducts['instagram-viral-sneakers']);
    }, 800);
  };

  return (
    <section id="social-commerce" className="relative py-20 md:py-28 bg-dark-950 border-t border-dark-800/80 overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-gradient-to-br from-pink-600/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-mono uppercase tracking-widest text-pink-400 mb-4">
            <Instagram className="w-3.5 h-3.5" />
            <span>Social Commerce Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Saw It on Instagram? <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-ai-cyan bg-clip-text text-transparent">
              Don't Buy Blind.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
            Products discovered through social media often hide prices, reviews and seller information behind DMs, WhatsApp messages or profile links. TRUSTCART AI helps turn that discovery into useful product intelligence.
          </p>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Mock Social Media Post (Instagram Reel/Post & WhatsApp) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-2xl bg-dark-900 border border-dark-700/90 shadow-2xl overflow-hidden flex flex-col h-full">
              
              {/* Instagram App Bar */}
              <div className="px-4 py-3 bg-dark-950 border-b border-dark-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-dark-950 flex items-center justify-center text-[10px] font-bold text-white">
                      HK
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      hypeluxekicks_in
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-dim" />
                      <span className="text-[10px] text-pink-400 font-normal">Sponsored</span>
                    </div>
                    <div className="text-[10px] text-brand-dim">New Delhi • 14.2K Followers</div>
                  </div>
                </div>
                <span className="text-xs text-brand-dim">•••</span>
              </div>

              {/* Mock Media Image */}
              <div className="relative aspect-square bg-dark-950 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
                  alt="Social Media Sneaker Post"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating "DM for Price" Badge on Image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="px-3 py-1.5 rounded-lg bg-dark-950/90 border border-dark-700 text-xs font-mono font-bold text-warning backdrop-blur-md shadow-lg flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>"DM for Price & Size"</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-md bg-risk/90 text-[10px] font-bold text-white uppercase tracking-wider">
                    Limited 90% OFF Claim
                  </div>
                </div>
              </div>

              {/* Social Interactions */}
              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between bg-dark-900">
                <div className="flex items-center justify-between text-brand-muted">
                  <div className="flex items-center gap-4">
                    <Heart className="w-5 h-5 hover:text-red-400 cursor-pointer" />
                    <MessageCircle className="w-5 h-5 hover:text-white cursor-pointer" />
                    <Share2 className="w-5 h-5 hover:text-white cursor-pointer" />
                  </div>
                  <Bookmark className="w-5 h-5 hover:text-white cursor-pointer" />
                </div>

                <div className="text-xs text-brand-text">
                  <span className="font-bold text-white mr-1.5">hypeluxekicks_in</span>
                  🔥 ULTRA LIMITED EDITION CLOUD RUN SNEAKERS! Pure Italian leather feel. Only 10 pairs left! 
                  <span className="text-pink-400 ml-1">#hype #sneakerhead #streetwear</span>
                </div>

                <div className="text-[11px] text-brand-dim flex items-center justify-between pt-2 border-t border-dark-800">
                  <span>Comments disabled for this post</span>
                  <span className="text-risk font-mono text-[10px]">⚠️ Red Flag</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: TRUSTCART AI Forensic Extraction */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="rounded-2xl bg-dark-900/90 border border-dark-700/80 shadow-2xl p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between h-full relative overflow-hidden">
              
              {/* Scan Beam Indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-dark-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-ai-cyan/10 border border-ai-cyan/40 text-ai-cyan flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase">
                      Social Commerce Forensic Audit
                    </h4>
                    <span className="text-[11px] text-brand-dim">
                      Reverse image + entity registration search
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-bold font-mono bg-risk/10 text-risk border border-risk/30 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  HIGH RISK (34/100)
                </span>
              </div>

              {/* Extracted Intelligence Grid */}
              <div className="my-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Item 1: Extracted Product */}
                <div className="p-3.5 rounded-xl bg-dark-950/80 border border-dark-800">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-brand-dim block">
                    Product Classification
                  </span>
                  <div className="text-sm font-semibold text-white mt-1">
                    Unbranded Generic High-Top Sneaker
                  </div>
                  <span className="text-[11px] text-brand-muted mt-0.5 block">
                    Source: OEM Catalog Match (Guangdong)
                  </span>
                </div>

                {/* Item 2: Claimed vs Market Price */}
                <div className="p-3.5 rounded-xl bg-dark-950/80 border border-dark-800">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-brand-dim block">
                    Real Market Price Range
                  </span>
                  <div className="text-sm font-bold text-trust mt-1 font-mono">
                    ₹1,299 – ₹1,899
                  </div>
                  <span className="text-[11px] text-risk mt-0.5 block font-mono">
                    Seller DM Quote: ₹3,499 (110% Markup)
                  </span>
                </div>

                {/* Item 3: Seller Risk */}
                <div className="p-3.5 rounded-xl bg-dark-950/80 border border-dark-800">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-brand-dim block">
                    Seller Entity Risk
                  </span>
                  <div className="text-sm font-bold text-risk mt-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    High (Handle changed 3x)
                  </div>
                  <span className="text-[11px] text-brand-muted mt-0.5 block">
                    Account created 42 days ago
                  </span>
                </div>

                {/* Item 4: Return Policy */}
                <div className="p-3.5 rounded-xl bg-dark-950/80 border border-dark-800">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-brand-dim block">
                    Return / Dispute Policy
                  </span>
                  <div className="text-sm font-bold text-risk mt-1">
                    Unknown / Hidden
                  </div>
                  <span className="text-[11px] text-brand-muted mt-0.5 block">
                    No consumer court jurisdiction / Unverified UPI
                  </span>
                </div>
              </div>

              {/* AI Detection Insight Banner */}
              <div className="p-3.5 rounded-xl bg-risk/5 border border-risk/20 flex items-start gap-3 text-xs">
                <ShieldAlert className="w-4 h-4 text-risk flex-shrink-0 mt-0.5" />
                <div className="text-brand-muted">
                  <strong className="text-white block font-medium">TRUSTCART Sentinel Finding:</strong>
                  "Reverse image matching found 14 identical listings across wholesale export portals. The seller claims 'Italian handcrafted' but sources unbranded PU synthetic material without customer recourse."
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-brand-dim font-mono">
                  Confidence: <strong className="text-white">96%</strong> • 0% Ad Bias
                </span>

                <button
                  onClick={handleRunScan}
                  disabled={isScanningSocial}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-dark-950 bg-gradient-to-r from-ai-cyan to-ai-blue hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-glow-cyan"
                >
                  {isScanningSocial ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
                      <span>Extracting Social Signals...</span>
                    </>
                  ) : (
                    <>
                      <span>Investigate This Product</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
