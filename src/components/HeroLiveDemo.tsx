import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, AlertTriangle, CheckCircle2, ShieldAlert, Zap, ExternalLink, RefreshCw } from 'lucide-react';
import { ProductInvestigation } from '../types';
import { mockInvestigatedProducts } from '../data/mockProducts';

interface HeroLiveDemoProps {
  currentProduct: ProductInvestigation;
  onSelectProduct: (p: ProductInvestigation) => void;
  onOpenFullReport: (p: ProductInvestigation) => void;
}

export const HeroLiveDemo: React.FC<HeroLiveDemoProps> = ({
  currentProduct,
  onSelectProduct,
  onOpenFullReport
}) => {
  const [activeMetric, setActiveMetric] = useState<string>('overall');

  // Radial score calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentProduct.trustScore / 100) * circumference;

  const isBuy = currentProduct.recommendation === 'BUY';
  const isWait = currentProduct.recommendation === 'WAIT';
  const isAvoid = currentProduct.recommendation === 'AVOID';

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      {/* Container with subtle glass edge */}
      <div className="relative rounded-2xl bg-dark-900/80 border border-dark-700/80 p-5 sm:p-7 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Glow corner */}
        <div className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isBuy ? 'bg-trust' : isAvoid ? 'bg-risk' : 'bg-warning'
        }`} />

        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-dark-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ai-cyan animate-pulse" />
            <span className="text-xs uppercase font-mono tracking-widest text-brand-dim">
              Live Investigation Stream
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-brand-dim">Platform:</span>
            <span className="px-2 py-0.5 rounded bg-dark-800 text-brand-text border border-dark-700 font-medium">
              {currentProduct.sourcePlatform}
            </span>
          </div>
        </div>

        {/* Product Overview & Trust Radar Grid */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Product Thumbnail & Meta */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden border border-dark-700 bg-dark-950 group">
              <img 
                src={currentProduct.image} 
                alt={currentProduct.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
                  isBuy ? 'bg-trust/90 text-dark-950' : isAvoid ? 'bg-risk/90 text-white' : 'bg-warning/90 text-dark-950'
                }`}>
                  {isBuy && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {isAvoid && <ShieldAlert className="w-3.5 h-3.5" />}
                  {isWait && <AlertTriangle className="w-3.5 h-3.5" />}
                  {currentProduct.recommendation}
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono text-brand-dim uppercase tracking-wider">
                {currentProduct.brand} • {currentProduct.category}
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-white line-clamp-2 mt-0.5">
                {currentProduct.title}
              </h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-xl font-bold text-white font-mono">
                  {currentProduct.currency}{currentProduct.currentPrice.toLocaleString()}
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-xs text-brand-dim line-through font-mono">
                    {currentProduct.currency}{currentProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-brand-muted ml-auto font-mono">
                  30D Avg: {currentProduct.currency}{currentProduct.thirtyDayAvgPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Center Column: Radial Trust Score Visualizer */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-dark-950/60 border border-dark-800/80">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* SVG Radial Gauge */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-dark-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Score Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className={`transition-all duration-1000 ease-out ${
                    currentProduct.trustScore >= 80
                      ? 'stroke-trust'
                      : currentProduct.trustScore >= 60
                      ? 'stroke-warning'
                      : 'stroke-risk'
                  }`}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Center Score Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                  {currentProduct.trustScore}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-brand-dim">
                  Trust Score
                </span>
                <span className={`text-[10px] font-bold uppercase mt-0.5 ${
                  currentProduct.trustScore >= 80 ? 'text-trust' : currentProduct.trustScore >= 60 ? 'text-warning' : 'text-risk'
                }`}>
                  {currentProduct.fiveLayers.purchaseRisk} RISK
                </span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className="inline-block text-xs text-brand-muted">
                Confidence Level: <strong className="text-white font-mono">{currentProduct.recommendationConfidence}%</strong>
              </span>
            </div>
          </div>

          {/* Right Column: 4 Sub-Metrics breakdown */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <div className="p-2.5 rounded-xl bg-dark-950/80 border border-dark-800 hover:border-dark-700 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-brand-muted">Review Authenticity</span>
                <span className="font-mono font-bold text-white">{currentProduct.fiveLayers.reviewTrust}/100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-dark-800 overflow-hidden">
                <div 
                  className="h-full bg-trust rounded-full transition-all duration-700" 
                  style={{ width: `${currentProduct.fiveLayers.reviewTrust}%` }} 
                />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-dark-950/80 border border-dark-800 hover:border-dark-700 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-brand-muted">Seller Legitimacy</span>
                <span className="font-mono font-bold text-white">{currentProduct.fiveLayers.sellerTrust}/100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-dark-800 overflow-hidden">
                <div 
                  className="h-full bg-ai-cyan rounded-full transition-all duration-700" 
                  style={{ width: `${currentProduct.fiveLayers.sellerTrust}%` }} 
                />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-dark-950/80 border border-dark-800 hover:border-dark-700 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-brand-muted">Price Intelligence</span>
                <span className="font-mono font-bold text-white">{currentProduct.fiveLayers.priceIntelligence}/100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-dark-800 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${
                    currentProduct.fiveLayers.priceIntelligence >= 75 ? 'bg-trust' : 'bg-warning'
                  }`}
                  style={{ width: `${currentProduct.fiveLayers.priceIntelligence}%` }} 
                />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-dark-950/80 border border-dark-800 hover:border-dark-700 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-brand-muted">Product Reliability</span>
                <span className="font-mono font-bold text-white">{currentProduct.fiveLayers.productReliability}/100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-dark-800 overflow-hidden">
                <div 
                  className="h-full bg-purple-400 rounded-full transition-all duration-700" 
                  style={{ width: `${currentProduct.fiveLayers.productReliability}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI Explainable Summary Footer */}
        <div className="mt-5 pt-4 border-t border-dark-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-brand-muted flex items-start gap-2 max-w-xl">
            <span className="font-semibold text-white uppercase font-mono flex-shrink-0 text-[11px] px-1.5 py-0.5 rounded bg-dark-800 border border-dark-700">
              AI VERDICT
            </span>
            <span className="line-clamp-2">
              {currentProduct.decisionSummary}
            </span>
          </div>

          <button
            onClick={() => onOpenFullReport(currentProduct)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-white bg-dark-800 hover:bg-dark-750 border border-dark-600/80 hover:border-ai-cyan/50 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm"
          >
            <span>View Full Forensic Report</span>
            <ExternalLink className="w-3.5 h-3.5 text-ai-cyan" />
          </button>
        </div>
      </div>
    </div>
  );
};
