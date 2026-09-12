import { ProductInvestigation, ComparisonItem, SocialPostExtraction, PersonaPreferences, ReviewSample } from '../types';
import { mockInvestigatedProducts, sampleComparisonData, sampleSocialPost } from '../data/mockProducts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Generic API fetch helper with timeout and fallback support
 */
async function fetchWithFallback<T>(endpoint: string, options: RequestInit = {}, fallbackData: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[TRUSTCART API] ${endpoint} returned ${response.status}. Using cached/fallback intel.`);
      return fallbackData;
    }

    const data = await response.json();
    return data as T;
  } catch (err) {
    console.info(`[TRUSTCART API] Server offline or unreachable at ${endpoint}. Using local offline sentinel.`, err);
    return fallbackData;
  }
}

export const apiClient = {
  /**
   * Main Product Investigation Pipeline
   * Ingests a product link, image context, or search query and returns full forensic analysis.
   */
  async analyzeProduct(inputText: string, mode: 'link' | 'image' | 'search' = 'link'): Promise<ProductInvestigation> {
    const fallback = mockInvestigatedProducts['sony-wh1000xm5'];
    
    // Determine appropriate fallback based on input
    let chosenFallback = fallback;
    const lower = inputText.toLowerCase();
    if (lower.includes('sneaker') || lower.includes('instagram') || mode === 'image') {
      chosenFallback = mockInvestigatedProducts['instagram-viral-sneakers'];
    } else if (lower.includes('noise') || lower.includes('watch')) {
      chosenFallback = mockInvestigatedProducts['noise-smartwatch'];
    }

    return fetchWithFallback<ProductInvestigation>(
      '/analysis/product',
      {
        method: 'POST',
        body: JSON.stringify({ input_text: inputText, mode })
      },
      chosenFallback
    );
  },

  /**
   * Retrieve single product dossier by ID
   */
  async getProductAnalysis(productId: string): Promise<ProductInvestigation> {
    const fallback = mockInvestigatedProducts[productId] || mockInvestigatedProducts['sony-wh1000xm5'];
    return fetchWithFallback<ProductInvestigation>(
      `/analysis/product/${productId}`,
      { method: 'GET' },
      fallback
    );
  },

  /**
   * Analyze custom review text with live NLP entropy & suspicion detection
   */
  async analyzeReviewText(reviewText: string, rating: number = 5, verifiedPurchase: boolean = true) {
    const fallback = {
      suspicionScore: 42,
      credibilityScore: 58,
      label: 'Moderate Credibility (42% Suspicion)',
      credibilityLabel: 'Moderate Credibility',
      signals: ['General consumer sentiment', 'Requires cross-merchant author verification'],
      sentimentScore: 75,
      entropyScore: 3.2,
      botProbability: 42,
      isSuspicious: false
    };

    return fetchWithFallback(
      '/reviews/analyze',
      {
        method: 'POST',
        body: JSON.stringify({
          review_text: reviewText,
          rating,
          verified_purchase: verifiedPurchase
        })
      },
      fallback
    );
  },

  /**
   * Personalized Recommendation based on user priorities
   */
  async getPersonalizedRecommendation(prefs: PersonaPreferences) {
    const fallback = {
      productId: 'sony-wh1000xm5',
      productName: 'Sony WH-1000XM5',
      price: '₹26,990',
      matchPercent: 96,
      reason: 'Best match for your budget and comfort-first focus. Class-leading ANC eliminates library/cafe chatter completely.',
      badge: 'Top Pick for Long Study Sessions',
      rating: 9.6,
      supportingSignals: [
        'Fits target budget with 23% off MSRP',
        'Direct brand-authorized fulfillment path',
        'Verified positive battery endurance benchmarks'
      ]
    };

    return fetchWithFallback(
      '/recommendations/personalized',
      {
        method: 'POST',
        body: JSON.stringify({
          purpose: prefs.purpose,
          budget: prefs.budget,
          comfortWeight: prefs.comfortWeight,
          batteryWeight: prefs.batteryWeight,
          soundWeight: prefs.soundWeight,
          micWeight: prefs.micWeight
        })
      },
      fallback
    );
  },

  /**
   * Social Commerce Post Extraction
   */
  async analyzeSocialPost(urlOrText: string, platform: string = 'Instagram'): Promise<SocialPostExtraction> {
    return fetchWithFallback<SocialPostExtraction>(
      '/social/analyze',
      {
        method: 'POST',
        body: JSON.stringify({ url_or_text: urlOrText, platform })
      },
      sampleSocialPost
    );
  },

  /**
   * Head-to-head product comparison
   */
  async getProductComparison(productIds: string[] = ['sony-wh1000xm5', 'bose-qc45', 'sennheiser-accentum']): Promise<ComparisonItem[]> {
    return fetchWithFallback<ComparisonItem[]>(
      '/products/compare',
      {
        method: 'POST',
        body: JSON.stringify({ product_ids: productIds })
      },
      sampleComparisonData
    );
  }
};
