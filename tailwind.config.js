/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#080A0F', // Main deep dark background
          900: '#10131A', // Base Surface
          850: '#131722', // Card Surface
          800: '#151923', // Elevated Surface
          750: '#1A202E', // Hover Surface
          700: '#22293C', // Border subtle
          600: '#2E3850', // Border distinct
        },
        trust: {
          DEFAULT: '#43D17A',
          glow: 'rgba(67, 209, 122, 0.25)',
          dark: '#1e683d',
          light: '#72e89f'
        },
        warning: {
          DEFAULT: '#F5B84B',
          glow: 'rgba(245, 184, 75, 0.25)',
          dark: '#7e5a1b',
          light: '#f9d288'
        },
        risk: {
          DEFAULT: '#F06464',
          glow: 'rgba(240, 100, 100, 0.25)',
          dark: '#782626',
          light: '#f59090'
        },
        ai: {
          cyan: '#00F2FE',
          blue: '#4FACFE',
          purple: '#7F00FF',
          violet: '#8A2387',
          neon: '#06B6D4'
        },
        brand: {
          text: '#F5F7FA',
          muted: '#9AA3B2',
          dim: '#64748B'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.12) 0%, rgba(138, 35, 135, 0.05) 50%, transparent 80%)',
        'shield-glow': 'radial-gradient(circle at center, rgba(0, 242, 254, 0.15) 0%, rgba(127, 0, 255, 0.05) 70%, transparent 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.4)',
        'glow-trust': '0 0 25px -5px rgba(67, 209, 122, 0.4)',
        'glow-risk': '0 0 25px -5px rgba(240, 100, 100, 0.4)',
        'glow-warning': '0 0 25px -5px rgba(245, 184, 75, 0.4)',
      },
      animation: {
        'scan-line': 'scan 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'radar': 'radar 8s linear infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.3' },
          '50%': { transform: 'translateY(100%)', opacity: '0.9' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
