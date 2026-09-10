import React from 'react';
import { X, ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, TrendingDown, ExternalLink, Share2, Sparkles, Building, MessageSquare, Tag, Lock, Download } from 'lucide-react';
import { ProductInvestigation } from '../types';

interface FullInvestigationModalProps {
  product: ProductInvestigation | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FullInvestigationModal: React.FC<FullInvestigationModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  if (!isOpen || !product) return null;

  const isBuy = product.recommendation === 'BUY';
  const isWait = product.recommendation === 'WAIT';
  const isAvoid = product.recommendation === 'AVOID';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-dark-950/85 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Dialog Shell */}
      <div className="relative w-full max-w-5xl rounded-3xl bg-dark-900 border border-dark-700/80 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Top Floating Bar with Close */}
        <div className="px-6 py-4 bg-dark-950 border-b border-dark-800 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-dark-900 border border-dark-700 p-0.5">
              <img src="/trustcart-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>TRUSTCART AI Forensic Audit Dossier</span>
                <span className="text-ai-cyan text-[10px]">#TC-CERT-{product.id.toUpperCase().slice(0, 8)}</span>
              </div>
              <div className="text-[11px] text-brand-dim">
                Platform: {product.sourcePlatform} • Category: {product.category}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert(`Trust Certificate for "${product.title}" copied to clipboard!`);
              }}
              className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 border border-dark-700 text-xs text-brand-text flex items-center gap-1.5 transition-colors hidden sm:flex"
            >
              <Share2 className="w-3.5 h-3.5 text-ai-cyan" />
              <span>Share Report</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-brand-muted hover:text-white border border-dark-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 custom-scrollbar">
          
          {/* Header Product Card Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-2xl bg-dark-950 border border-dark-800">
            <div className="md:col-span-3 aspect-video md:aspect-square rounded-xl overflow-hidden border border-dark-700 bg-dark-900">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>

            <div className="md:col-span-6 space-y-2">
              <div className="text-xs font-mono text-brand-dim uppercase tracking-wider">
                {product.brand} • {product.category}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {product.title}
              </h2>
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-black font-mono text-white">
                  {product.currency}{product.currentPrice.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-brand-dim line-through">
                    {product.currency}{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs font-mono text-brand-muted">
                  (30D Avg: {product.currency}{product.thirtyDayAvgPrice.toLocaleString()})
                </span>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col items-center justify-center p-4 rounded-xl bg-dark-900 border border-dark-800 text-center">
              <span className="text-[10px] font-mono text-brand-dim uppercase tracking-wider">
                Overall AI Trust
              </span>
              <div className={`text-4xl font-black font-mono mt-1 ${
                product.trustScore >= 80 ? 'text-trust' : product.trustScore >= 60 ? 'text-warning' : 'text-risk'
              }`}>
                {product.trustScore}
                <span className="text-sm text-brand-dim font-normal">/100</span>
              </div>
              <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-wider ${
                isBuy ? 'bg-trust text-dark-950' : isAvoid ? 'bg-risk text-white' : 'bg-warning text-dark-950'
              }`}>
                {product.recommendation} — {product.recommendationConfidence}% Conf.
              </div>
            </div>
          </div>

          {/* AI Decision Rationale */}
          <div className="p-4 rounded-xl bg-dark-950 border border-dark-800 flex items-start gap-3 text-xs sm:text-sm">
            <Sparkles className="w-5 h-5 text-ai-cyan flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Executive Decision Rationale:</strong>
              <p className="text-brand-text leading-relaxed">
                "{product.decisionSummary}"
              </p>
            </div>
          </div>

          {/* 5-Layer Trust Breakdown Matrix */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-brand-dim mb-4 flex items-center gap-2">
              <span>5-Layer Trust Intelligence Analysis</span>
              <span className="w-full h-px bg-dark-800" />
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-dark-950 border border-dark-800">
                <span className="text-[10px] text-brand-dim uppercase font-mono block">Review Trust</span>
                <span className="text-xl font-bold font-mono text-trust mt-1 block">
                  {product.fiveLayers.reviewTrust}/100
                </span>
                <span className="text-[10px] text-brand-muted mt-0.5 block">Linguistic Scan</span>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-950 border border-dark-800">
                <span className="text-[10px] text-brand-dim uppercase font-mono block">Seller Trust</span>
                <span className="text-xl font-bold font-mono text-ai-cyan mt-1 block">
                  {product.fiveLayers.sellerTrust}/100
                </span>
                <span className="text-[10px] text-brand-muted mt-0.5 block">Entity Registry</span>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-950 border border-dark-800">
                <span className="text-[10px] text-brand-dim uppercase font-mono block">Price Intel</span>
                <span className="text-xl font-bold font-mono text-ai-blue mt-1 block">
                  {product.fiveLayers.priceIntelligence}/100
                </span>
                <span className="text-[10px] text-brand-muted mt-0.5 block">30D Fluctuation</span>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-950 border border-dark-800">
                <span className="text-[10px] text-brand-dim uppercase font-mono block">Reliability</span>
                <span className="text-xl font-bold font-mono text-purple-400 mt-1 block">
                  {product.fiveLayers.productReliability}/100
                </span>
                <span className="text-[10px] text-brand-muted mt-0.5 block">Durability Index</span>
              </div>

              <div className="p-3.5 rounded-xl bg-dark-950 border border-dark-800 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-brand-dim uppercase font-mono block">Purchase Risk</span>
                <span className={`text-xl font-bold font-mono mt-1 block ${
                  product.fiveLayers.purchaseRisk === 'LOW' ? 'text-trust' : product.fiveLayers.purchaseRisk === 'MEDIUM' ? 'text-warning' : 'text-risk'
                }`}>
                  {product.fiveLayers.purchaseRisk}
                </span>
                <span className="text-[10px] text-brand-muted mt-0.5 block">Scam Probability</span>
              </div>
            </div>
          </div>

          {/* Seller & Entity Forensic Dossier */}
          <div className="p-5 rounded-2xl bg-dark-950 border border-dark-800 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-brand-dim flex items-center gap-2">
              <Building className="w-4 h-4 text-ai-cyan" />
              <span>Seller Background & Verification Dossier</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-dark-900 border border-dark-800">
                <span className="text-[10px] text-brand-dim uppercase font-mono block">Merchant Identity</span>
                <span className="font-semibold text-white mt-1 block">{product.sellerDetails.name}</span>
                <span className="text-brand-dim text-[11px]">{product.sellerDetails.accountAge}</span>
              </div>

              <div className="p-3 rounded-xl bg-dark-900 border border-dark-800">
                <span className="text-[10px] text-brand-dim uppercase font-mono block">Fulfillment Channel</span>
                <span className="font-semibold text-white mt-1 block">{product.sellerDetails.fulfillmentType}</span>
                <span className="text-brand-dim text-[11px]">Direct Insured Dispatch</span>
              </div>

              <div className="p-3 rounded-xl bg-dark-900 border border-dark-800">
                <span className="text-[10px] text-brand-dim uppercase font-mono block">Dispute & Return Policy</span>
                <span className="font-semibold text-white mt-1 block">{product.sellerDetails.returnPolicy}</span>
              </div>
            </div>

            {product.sellerDetails.warnings && product.sellerDetails.warnings.length > 0 && (
              <div className="p-3 rounded-xl bg-risk/10 border border-risk/30 space-y-1">
                <span className="text-xs font-bold text-risk flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Active Seller Risk Alerts:
                </span>
                {product.sellerDetails.warnings.map((w, idx) => (
                  <div key={idx} className="text-xs text-brand-text">• {w}</div>
                ))}
              </div>
            )}
          </div>

          {/* Evidence Checklist (Positives & Risk Factors) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Positives */}
            <div className="p-5 rounded-2xl bg-dark-950 border border-dark-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-trust mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Trust Strengths ({product.keyEvidence.positive.length})</span>
              </h4>
              <div className="space-y-2">
                {product.keyEvidence.positive.map((p, idx) => (
                  <div key={idx} className="text-xs text-brand-text flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-trust mt-1.5 flex-shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
                {product.keyEvidence.positive.length === 0 && (
                  <div className="text-xs text-brand-dim italic">No strong positive trust signals found.</div>
                )}
              </div>
            </div>

            {/* Cautions & Risk Factors */}
            <div className="p-5 rounded-2xl bg-dark-950 border border-dark-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-warning mb-3 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Cautions & Risk Vectors ({product.keyEvidence.caution.length + product.keyEvidence.riskFactors.length})</span>
              </h4>
              <div className="space-y-2">
                {product.keyEvidence.caution.map((c, idx) => (
                  <div key={idx} className="text-xs text-brand-text flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
                {product.keyEvidence.riskFactors.map((r, idx) => (
                  <div key={idx} className="text-xs text-risk flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-risk mt-1.5 flex-shrink-0" />
                    <span className="font-semibold">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Action Bar */}
        <div className="px-6 py-4 bg-dark-950 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-20">
          <div className="text-xs text-brand-dim font-mono">
            TRUSTCART AI Sentinel • Continuous 24/7 Listing Monitoring Active
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-medium text-brand-muted hover:text-white bg-dark-800 hover:bg-dark-750 transition-colors"
            >
              Close Dossier
            </button>
            <button
              onClick={() => {
                alert(`Price drop sentinel activated for ${product.title}! We will alert you if the price drops below ₹${product.currentPrice}.`);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-dark-950 bg-gradient-to-r from-ai-cyan to-ai-blue hover:brightness-110 shadow-glow-cyan transition-all"
            >
              Track Price & Trust Sentinel
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
