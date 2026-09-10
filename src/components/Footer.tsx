import React from 'react';
import { ShieldCheck, ArrowUp, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-950 border-t border-dark-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-dark-800">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-dark-900 border border-dark-700 p-0.5">
                <img src="/trustcart-logo.jpg" alt="TRUSTCART AI Logo" className="w-full h-full object-cover rounded" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-lg text-white font-sans">
                  TRUSTCART
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-ai-cyan to-ai-blue text-dark-950 uppercase tracking-wider">
                  AI
                </span>
              </div>
            </div>

            <p className="text-sm font-medium text-brand-text">
              Discover. Verify. Compare. Decide.
            </p>

            <p className="text-xs text-brand-muted max-w-sm leading-relaxed">
              The AI-powered E-Commerce and Social Commerce Trust Intelligence Platform. Protecting buyers from deceptive sellers, fake reviews, and predatory price markups.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs">
            <div>
              <h4 className="font-mono uppercase tracking-wider text-brand-dim mb-3">
                Intelligence Platform
              </h4>
              <ul className="space-y-2">
                <li><a href="#console" className="text-brand-muted hover:text-white transition-colors">Product Investigation</a></li>
                <li><a href="#how-it-works" className="text-brand-muted hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#trust-engine" className="text-brand-muted hover:text-white transition-colors">5-Layer Trust Engine</a></li>
                <li><a href="#fake-reviews" className="text-brand-muted hover:text-white transition-colors">Fake Review AI</a></li>
                <li><a href="#social-commerce" className="text-brand-muted hover:text-white transition-colors">Instagram DM Scanner</a></li>
                <li><a href="#compare" className="text-brand-muted hover:text-white transition-colors">Head-to-Head Compare</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono uppercase tracking-wider text-brand-dim mb-3">
                Trust & Legal
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-brand-muted hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-brand-muted hover:text-white transition-colors">Ethics & AI Policy</a></li>
                <li><a href="#" className="text-brand-muted hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-brand-muted hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-brand-muted hover:text-white transition-colors">Security Disclosures</a></li>
              </ul>
            </div>
          </div>

          {/* Col 3: Back to top & Live Status */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-dark-900 hover:bg-dark-800 border border-dark-700 text-xs text-brand-text flex items-center gap-2 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            <div className="text-xs text-brand-dim md:text-right mt-6 md:mt-0 font-mono">
              <span className="inline-flex items-center gap-1.5 text-trust">
                <span className="w-2 h-2 rounded-full bg-trust animate-pulse" />
                Live AI Sentinel v4.2
              </span>
              <div className="text-[10px] text-brand-dim mt-1">
                Global Index Latency: 24ms
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer Note */}
        <div className="pt-8 text-center max-w-3xl mx-auto space-y-3">
          <p className="text-[11px] text-brand-dim leading-relaxed">
            "AI insights are informational and may be uncertain. Always verify important product and seller information before purchasing."
          </p>
          <div className="text-xs text-brand-dim">
            © {new Date().getFullYear()} TRUSTCART AI. All rights reserved. Crafted for transparent commerce.
          </div>
        </div>

      </div>
    </footer>
  );
};
