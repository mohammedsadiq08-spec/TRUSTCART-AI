import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { SocialCommerceDemo } from './components/SocialCommerceDemo';
import { TrustEngine } from './components/TrustEngine';
import { FakeReviewAnalyzer } from './components/FakeReviewAnalyzer';
import { PriceIntelligence } from './components/PriceIntelligence';
import { PersonalizedDecision } from './components/PersonalizedDecision';
import { DecisionMatrix } from './components/DecisionMatrix';
import { ProductComparison } from './components/ProductComparison';
import { ExplainableAI } from './components/ExplainableAI';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FullInvestigationModal } from './components/FullInvestigationModal';
import { AuthModal } from './components/AuthModal';
import { ProductInvestigation } from './types';
import { mockInvestigatedProducts } from './data/mockProducts';
import { apiClient } from './services/api';

export const App: React.FC = () => {
  const [currentProduct, setCurrentProduct] = useState<ProductInvestigation>(
    mockInvestigatedProducts['sony-wh1000xm5']
  );
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Initial load from backend API
  useEffect(() => {
    apiClient.getProductAnalysis('sony-wh1000xm5').then((prod) => {
      if (prod) setCurrentProduct(prod);
    });
  }, []);

  const handleInvestigate = async (queryOrProduct: ProductInvestigation | string, mode: 'link' | 'image' | 'search' = 'link') => {
    setIsScanning(true);
    try {
      if (typeof queryOrProduct === 'string') {
        const result = await apiClient.analyzeProduct(queryOrProduct, mode);
        setCurrentProduct(result);
      } else {
        const result = await apiClient.getProductAnalysis(queryOrProduct.id);
        setCurrentProduct(result || queryOrProduct);
      }
      setIsModalOpen(true);
    } catch (err) {
      console.error('Investigation error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleOpenScanner = () => {
    const consoleEl = document.getElementById('console');
    if (consoleEl) {
      consoleEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTrustEngine = () => {
    const el = document.getElementById('trust-engine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-brand-text flex flex-col selection:bg-ai-cyan/20 selection:text-ai-cyan">
      {/* Navigation */}
      <Navbar
        onOpenScanner={handleOpenScanner}
        onOpenSignIn={() => setIsAuthOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Signature Investigation Console & Live Preview */}
        <Hero
          onInvestigate={(p) => handleInvestigate(p, 'link')}
          isScanning={isScanning}
          currentProduct={currentProduct}
          onOpenFullReport={(p) => {
            setCurrentProduct(p);
            setIsModalOpen(true);
          }}
          onScrollToHowItWorks={handleScrollToHowItWorks}
        />

        {/* 01 to 05 Process Pipeline */}
        <HowItWorks />

        {/* Social Commerce / Instagram DM Intelligence */}
        <SocialCommerceDemo
          onInvestigateProduct={(p) => {
            handleInvestigate(p, 'image');
          }}
        />

        {/* 5-Layer Trust Engine Section */}
        <TrustEngine />

        {/* Fake Review & Bot NLP Analyzer */}
        <FakeReviewAnalyzer />

        {/* Price Intelligence & Historical Chart */}
        <PriceIntelligence />

        {/* Personalized Decision Sliders */}
        <PersonalizedDecision />

        {/* Decision States: BUY / WAIT / AVOID */}
        <DecisionMatrix />

        {/* Head-to-Head Comparison Cards */}
        <ProductComparison />

        {/* Explainable AI Transparency Section */}
        <ExplainableAI />

        {/* Final High-Impact CTA */}
        <FinalCTA
          onAnalyzeClick={handleOpenScanner}
          onExploreEngineClick={handleScrollToTrustEngine}
        />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Full Product Investigation Dossier Modal */}
      <FullInvestigationModal
        product={currentProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
};
