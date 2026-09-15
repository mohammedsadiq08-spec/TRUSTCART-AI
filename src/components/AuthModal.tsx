import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, Mail, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (mode === 'signin') {
        await login({ email, password });
      } else {
        await register({ email, password, full_name: fullName.trim() || 'User' });
      }
      onClose();
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-dark-900 border border-dark-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-ai-cyan/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl bg-dark-800 text-brand-dim hover:text-white border border-dark-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-dark-950 border border-dark-700 p-0.5 shadow-md">
            <img src="/trustcart-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-extrabold text-white tracking-wide">
                TRUSTCART
              </h3>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-bold bg-gradient-to-r from-ai-cyan to-ai-blue text-dark-950 uppercase">
                AI
              </span>
            </div>
            <span className="text-[10px] text-brand-dim font-mono uppercase tracking-wider">
              Smart Shopping Intel
            </span>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex rounded-xl bg-dark-950 border border-dark-800 p-1 mb-6">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'signin'
                ? 'bg-dark-800 text-white shadow-sm'
                : 'text-brand-muted hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-dark-800 text-white shadow-sm'
                : 'text-brand-muted hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-risk/10 border border-risk/40 text-risk text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="text-[11px] font-mono uppercase text-brand-dim block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-brand-dim absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-700 text-xs text-white placeholder:text-brand-dim focus:outline-none focus:border-ai-cyan transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-mono uppercase text-brand-dim block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-dim absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-700 text-xs text-white placeholder:text-brand-dim focus:outline-none focus:border-ai-cyan transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono uppercase text-brand-dim block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-dim absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-700 text-xs text-white placeholder:text-brand-dim focus:outline-none focus:border-ai-cyan transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-bold text-xs text-dark-950 bg-gradient-to-r from-ai-cyan to-ai-blue hover:brightness-110 shadow-glow-cyan transition-all flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
