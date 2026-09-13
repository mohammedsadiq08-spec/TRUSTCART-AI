import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        email,
        password,
        full_name: fullName.trim() || 'User',
      });
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create account. Email may already be in use.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-brand-text flex flex-col justify-center items-center px-4 py-12 selection:bg-ai-cyan/20 selection:text-ai-cyan relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-ai-cyan/10 via-purple-600/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-md rounded-3xl bg-dark-900 border border-dark-700/80 p-8 shadow-2xl backdrop-blur-xl">
        
        {/* Brand Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-dark-950 border border-dark-700 p-0.5 shadow-md">
              <img src="/trustcart-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="flex items-center gap-1.5 text-left">
              <span className="font-extrabold tracking-wider text-xl text-white font-sans">
                TRUSTCART
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-ai-cyan to-ai-blue text-dark-950 uppercase tracking-wider">
                AI
              </span>
            </div>
          </Link>

          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Create Your Account
          </h2>
          <p className="text-xs text-brand-muted mt-1">
            Unlock real-time risk alerts, saved product monitors, and customized trust weighting.
          </p>
        </div>

        {errorMsg && (
          <div className="mt-5 p-3 rounded-xl bg-risk/10 border border-risk/40 text-risk text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-mono uppercase text-brand-dim block mb-1">
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

          <div>
            <label className="text-xs font-mono uppercase text-brand-dim block mb-1">
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
            <label className="text-xs font-mono uppercase text-brand-dim block mb-1">
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

          <div>
            <label className="text-xs font-mono uppercase text-brand-dim block mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-dim absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-700 text-xs text-white placeholder:text-brand-dim focus:outline-none focus:border-ai-cyan transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-bold text-xs text-dark-950 bg-gradient-to-r from-ai-cyan to-ai-blue hover:brightness-110 shadow-glow-cyan transition-all flex items-center justify-center gap-2 mt-6"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-dark-800 text-center text-xs text-brand-muted">
          <span>Already have an account? </span>
          <Link to="/login" className="text-ai-cyan font-semibold hover:underline">
            Sign In
          </Link>
        </div>

        {/* Benefits micro-list */}
        <div className="mt-5 space-y-1.5 text-[11px] text-brand-dim">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-trust flex-shrink-0" />
            <span>Zero sponsored bias — independent AI scoring</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-trust flex-shrink-0" />
            <span>Detect deceptive review spikes & counterfeit alerts</span>
          </div>
        </div>

      </div>
    </div>
  );
};
