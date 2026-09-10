export type RecommendationType = 'BUY' | 'WAIT' | 'AVOID';

export interface FiveLayerTrust {
  reviewTrust: number;       // 0-100
  sellerTrust: number;       // 0-100
  priceIntelligence: number; // 0-100
  productReliability: number;// 0-100
  purchaseRisk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ReviewSample {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  verifiedPurchase: boolean;
  content: string;
  suspicionScore: number;    // 0-100 (higher = more suspicious)
  credibilityLabel: 'High Credibility' | 'Moderate Credibility' | 'Potentially Suspicious' | 'High Bot Probability';
  detectedSignals: string[];
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  avgPrice: number;
}

export interface ProductInvestigation {
  id: string;
  title: string;
  brand: string;
  category: string;
  sourcePlatform: 'Amazon' | 'Flipkart' | 'Instagram DM' | 'Shopify Store' | 'Myntra';
  image: string;
  currentPrice: number;
  currency: string;
  originalPrice?: number;
  thirtyDayAvgPrice: number;
  allTimeLow: number;
  marketRange: { min: number; max: number };
  trustScore: number;        // Overall 0-100
  recommendation: RecommendationType;
  recommendationConfidence: number; // e.g. 89%
  decisionSummary: string;
  fiveLayers: FiveLayerTrust;
  sellerDetails: {
    name: string;
    rating: number;
    accountAge: string;
    fulfillmentType: 'Direct Platform' | 'Third Party Dropship' | 'Unknown DM Vendor';
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    returnPolicy: string;
    warnings?: string[];
  };
  keyEvidence: {
    positive: string[];
    caution: string[];
    riskFactors: string[];
  };
  reviewsAnalysis: {
    totalAnalyzed: number;
    authenticPercent: number;
    suspiciousPercent: number;
    sentimentScore: number;
    sampleReviews: ReviewSample[];
  };
  priceHistory: PriceHistoryPoint[];
}

export interface SocialPostExtraction {
  originalPostTitle: string;
  platform: 'Instagram' | 'WhatsApp' | 'Telegram';
  postedPriceClaim: string;
  sellerHandle: string;
  followers: string;
  identifiedProduct: string;
  extractedMarketPriceRange: string;
  sellerRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  returnInfoStatus: 'Unknown / Hidden' | 'Strict 2-day' | 'Standard 7-day';
  reverseImageOrigin: string;
  confidenceScore: number;
  flaggedWarning: string;
}

export interface ComparisonItem {
  id: string;
  name: string;
  image: string;
  price: number;
  badge?: 'BEST OVERALL' | 'BEST VALUE' | 'LOWEST PRICE';
  trustScore: number;
  reviewTrust: number;
  sellerTrust: number;
  qualityScore: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  userMatch: number;
  pros: string[];
  cons: string[];
}

export interface PersonaPreferences {
  purpose: 'Study' | 'Workout' | 'Office Work' | 'Audiophile' | 'Gaming';
  budget: number;
  comfortWeight: number;   // e.g. 40
  batteryWeight: number;   // e.g. 30
  soundWeight: number;     // e.g. 20
  micWeight: number;       // e.g. 10
}
