import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, Sparkles, ArrowRight, User as UserIcon, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenScanner?: () => void;
  onOpenSignIn?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenScanner, onOpenSignIn }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Discover', href: '/#console' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Trust Engine', href: '/#trust-engine' },
    { label: 'Review AI', href: '/#fake-reviews' },
    { label: 'Social Commerce', href: '/#social-commerce' },
    { label: 'Compare', href: '/#compare' },
  ];

  const handleActionScanner = () => {
    if (isHomePage && onOpenScanner) {
      onOpenScanner();
    } else {
      navigate('/#console');
    }
  };

  const handleSignInClick = () => {
    if (onOpenSignIn) {
      onOpenSignIn();
    } else {
      navigate('/login');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/85 backdrop-blur-xl border-b border-dark-700/60 shadow-glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden bg-dark-900 border border-dark-700/80 group-hover:border-ai-cyan/50 transition-all duration-300 shadow-md">
              <img 
                src="/trustcart-logo.jpg" 
                alt="TRUSTCART AI Logo" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-lg text-white font-sans">
                  TRUSTCART
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-ai-cyan to-ai-blue text-dark-950 uppercase tracking-wider">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-brand-dim tracking-widest uppercase font-mono hidden sm:inline-block">
                Trust & Decision Intel
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-dark-900/60 border border-dark-700/50 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium text-brand-muted hover:text-white hover:bg-white/[0.04] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-dark-900 border border-dark-750 hover:border-dark-650 transition-all text-xs text-white"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-ai-cyan to-ai-blue text-dark-950 font-bold text-[10px] flex items-center justify-center">
                    {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium max-w-[120px] truncate">{user.full_name || user.email.split('@')[0]}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-dark-900 border border-dark-700 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-dark-800">
                      <div className="text-xs font-bold text-white truncate">{user.full_name || 'User'}</div>
                      <div className="text-[10px] font-mono text-brand-dim truncate">{user.email}</div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl text-brand-muted hover:text-white hover:bg-dark-800 transition-colors mt-1"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-ai-cyan" />
                      <span>Trust Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl text-risk hover:bg-risk/10 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignInClick}
                className="px-4 py-2 text-xs lg:text-sm font-medium text-brand-muted hover:text-white transition-colors"
              >
                Sign In
              </button>
            )}

            <button
              onClick={handleActionScanner}
              className="relative group overflow-hidden px-4 lg:px-5 py-2 rounded-xl text-xs lg:text-sm font-semibold text-dark-950 bg-gradient-to-r from-ai-cyan via-brand-text to-ai-blue hover:shadow-glow-cyan transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-dark-950" />
              <span>Analyze a Product</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleActionScanner}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-ai-cyan text-dark-950"
            >
              Analyze
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-dark-900 text-brand-muted hover:text-white border border-dark-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-950/95 backdrop-blur-2xl border-b border-dark-700 px-4 pt-4 pb-6 mt-3 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-dark-800 text-xs text-brand-dim">
            <span className="flex items-center gap-1.5 text-trust">
              <span className="w-2 h-2 rounded-full bg-trust animate-pulse" />
              Live AI Trust Engine Online
            </span>
            <span className="font-mono">v4.2</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-brand-muted hover:text-white hover:bg-dark-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-dark-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleActionScanner();
              }}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-dark-950 bg-gradient-to-r from-ai-cyan to-ai-blue flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Analyze a Product Now
            </button>
            
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 rounded-lg text-xs font-semibold text-ai-cyan bg-dark-900 border border-dark-700 text-center flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Open Trust Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    navigate('/');
                  }}
                  className="w-full py-2 rounded-lg text-xs font-medium text-risk hover:bg-risk/10 text-center"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignInClick();
                }}
                className="w-full py-2 rounded-lg text-xs font-medium text-brand-muted hover:text-white text-center"
              >
                Sign In to Account
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
