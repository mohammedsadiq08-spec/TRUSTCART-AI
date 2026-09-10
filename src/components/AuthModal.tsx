import React, { useState } from 'react';
import { X, ShieldCheck, Sparkles, ArrowRight, Lock, Mail, Github } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSent(true);
    setTimeout(() => {
      onClose();
      setIsSent(false);
      setEmail('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-dark-900 border border-dark-700 p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-ai-cyan/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-dark-800 text-brand-dim hover:text-white border border-dark-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-dark-950 border border-dark-700">
            <img src="/trustcart-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-wide">
              TRUSTCART AI
            </h3>
            <span className="text-[10px] text-brand-dim font-mono uppercase tracking-wider">
              Smart Shopping Intel
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold text-white">
            Unlock Unlimited Investigations
          </h2>
          <p className="text-xs text-brand-muted mt-1">
            Save custom priority personas, track real-time price drops, and sync browser extension alerts.
          </p>
        </div>

        {isSent ? (
          <div className="my-8 p-4 rounded-xl bg-trust/10 border border-trust/40 text-center animate-in zoom-in-95">
            <div className="text-trust font-bold text-sm">Magic Link Dispatched!</div>
            <p className="text-xs text-brand-muted mt-1">Check your inbox to authenticate immediately.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-brand-dim block mb-1.5">
                Work or Personal Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-dim absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-700 text-xs text-white placeholder:text-brand-dim focus:outline-none focus:border-ai-cyan"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-xs text-dark-950 bg-gradient-to-r from-ai-cyan to-ai-blue hover:brightness-110 shadow-glow-cyan transition-all flex items-center justify-center gap-2"
            >
              <span>Continue with Magic Link</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-dark-800 text-[11px] text-center text-brand-dim">
          <span>By continuing, you agree to our </span>
          <a href="#" className="text-white hover:underline">Privacy Policy</a>
          <span> & </span>
          <a href="#" className="text-white hover:underline">Terms of Service</a>
        </div>
      </div>
    </div>
  );
};
