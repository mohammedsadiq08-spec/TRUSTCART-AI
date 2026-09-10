import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Calendar, AlertCircle, CheckCircle2, Clock, DollarSign, ArrowUpRight } from 'lucide-react';

export const PriceIntelligence: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<'30D' | '90D' | '1Y'>('30D');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Price points for the interactive SVG chart
  const priceData = [
    { date: '1 Aug', price: 29990, avg: 29500, note: 'Standard Retail' },
    { date: '8 Aug', price: 29490, avg: 29200, note: 'Minor Drop' },
    { date: '15 Aug', price: 31990, avg: 29400, note: 'Pre-Sale Artificial Spike' },
    { date: '22 Aug', price: 28990, avg: 29100, note: 'Promo Discount' },
    { date: '30 Aug', price: 27990, avg: 28700, note: 'End of Month Offer' },
    { date: '5 Sep', price: 26990, avg: 28499, note: 'Current Deal Price' },
  ];

  const minPrice = 24000;
  const maxPrice = 33000;
  const chartHeight = 180;
  const chartWidth = 560;

  // Compute SVG points
  const points = priceData.map((d, index) => {
    const x = (index / (priceData.length - 1)) * chartWidth;
    const y = chartHeight - ((d.price - minPrice) / (maxPrice - minPrice)) * chartHeight;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <section id="price-intelligence" className="relative py-20 md:py-28 bg-dark-950/70 border-t border-dark-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ai-blue/10 border border-ai-blue/30 text-xs font-mono uppercase tracking-widest text-ai-blue mb-4">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Price Intelligence Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Is It Really a Good Deal?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-muted">
            E-commerce stores often inflate prices right before a "Mega Sale" to fake a 50% discount. We track unmanipulated price history to tell you when to buy.
          </p>
        </div>

        {/* Main Price Intelligence Dashboard */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-dark-900/90 border border-dark-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Top Bar: Live Price Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-dark-800">
            
            <div className="p-3.5 rounded-xl bg-dark-950 border border-dark-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-dim">
                Current Price
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-trust mt-1">
                ₹26,990
              </div>
              <span className="text-[10px] text-trust font-medium flex items-center gap-1 mt-0.5">
                <TrendingDown className="w-3 h-3" /> ₹1,509 below 30D avg
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950 border border-dark-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-dim">
                30-Day Average
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                ₹28,499
              </div>
              <span className="text-[10px] text-brand-dim mt-0.5 block">
                Normalized benchmark
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950 border border-dark-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-dim">
                Observed All-Time Low
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-ai-cyan mt-1">
                ₹24,990
              </div>
              <span className="text-[10px] text-brand-dim mt-0.5 block font-mono">
                Recorded during Prime Day
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950 border border-dark-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-dim">
                Market Range
              </span>
              <div className="text-lg sm:text-xl font-bold font-mono text-brand-muted mt-1">
                ₹25.0K – ₹29.9K
              </div>
              <span className="text-[10px] text-brand-dim mt-0.5 block">
                Verified cross-store index
              </span>
            </div>
          </div>

          {/* Timing Verdict & Recommendation Banner */}
          <div className="my-6 p-4 rounded-xl bg-gradient-to-r from-trust/10 via-dark-950 to-dark-950 border border-trust/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-lg bg-trust text-dark-950 font-bold text-sm tracking-wider font-mono shadow-glow-trust flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>BUY NOW</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Strong Purchasing Window
                </h4>
                <p className="text-xs text-brand-muted mt-0.5">
                  "Current price is ₹1,509 below recent 30-day average. Minimal risk of lower discounts in the next 14 days."
                </p>
              </div>
            </div>

            <div className="text-xs font-mono text-brand-dim">
              Confidence: <strong className="text-white">94%</strong>
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-brand-dim uppercase">
                  Price Fluctuation History
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan" />
              </div>

              {/* Timeframe selector */}
              <div className="flex bg-dark-950 p-1 rounded-lg border border-dark-800 text-xs font-mono">
                {(['30D', '90D', '1Y'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    className={`px-3 py-1 rounded-md transition-all ${
                      selectedRange === range ? 'bg-dark-800 text-white font-bold' : 'text-brand-dim hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Container */}
            <div className="relative p-4 rounded-xl bg-dark-950 border border-dark-800 overflow-x-auto">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-48 sm:h-56 overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#43D17A" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#43D17A" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid horizontal lines */}
                <line x1="0" y1="30" x2={chartWidth} y2="30" stroke="#1E2433" strokeDasharray="3 3" />
                <line x1="0" y1="90" x2={chartWidth} y2="90" stroke="#1E2433" strokeDasharray="3 3" />
                <line x1="0" y1="150" x2={chartWidth} y2="150" stroke="#1E2433" strokeDasharray="3 3" />

                {/* Area fill */}
                <path d={areaD} fill="url(#priceGradient)" />

                {/* Stroke line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#43D17A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                {points.map((p, idx) => (
                  <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(idx)} onMouseLeave={() => setHoveredPoint(null)}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={hoveredPoint === idx ? 7 : 4.5}
                      className="fill-dark-950 stroke-trust transition-all duration-200"
                      strokeWidth="2.5"
                    />
                  </g>
                ))}
              </svg>

              {/* X Axis Labels */}
              <div className="flex justify-between mt-3 text-[11px] font-mono text-brand-dim px-2">
                {priceData.map((d, idx) => (
                  <span key={idx} className={hoveredPoint === idx ? 'text-white font-bold' : ''}>
                    {d.date}
                  </span>
                ))}
              </div>

              {/* Hover Tooltip readout */}
              {hoveredPoint !== null && (
                <div className="mt-3 p-2.5 rounded-lg bg-dark-900 border border-dark-700 text-xs flex items-center justify-between">
                  <span className="text-brand-muted">
                    Point: <strong className="text-white">{priceData[hoveredPoint].date}</strong> ({priceData[hoveredPoint].note})
                  </span>
                  <span className="font-mono font-bold text-trust">
                    Price: ₹{priceData[hoveredPoint].price.toLocaleString()} (Avg: ₹{priceData[hoveredPoint].avg.toLocaleString()})
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
