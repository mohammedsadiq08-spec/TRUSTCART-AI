import { ProductInvestigation, ComparisonItem, SocialPostExtraction } from '../types';

export const mockInvestigatedProducts: Record<string, ProductInvestigation> = {
  'sony-wh1000xm5': {
    id: 'sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones',
    brand: 'Sony',
    category: 'Audio & Electronics',
    sourcePlatform: 'Amazon',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    currentPrice: 26990,
    currency: '₹',
    originalPrice: 34990,
    thirtyDayAvgPrice: 28499,
    allTimeLow: 24990,
    marketRange: { min: 25000, max: 29990 },
    trustScore: 92,
    recommendation: 'BUY',
    recommendationConfidence: 94,
    decisionSummary: 'Outstanding product integrity with verified manufacturer warranty, authorized seller pedigree, and authentic review distribution. Current price is ₹1,509 below the 30-day moving average.',
    fiveLayers: {
      reviewTrust: 88,
      sellerTrust: 95,
      priceIntelligence: 91,
      productReliability: 94,
      purchaseRisk: 'LOW'
    },
    sellerDetails: {
      name: 'Appario Retail (Authorized Sony Tier-1)',
      rating: 4.8,
      accountAge: '7+ Years active',
      fulfillmentType: 'Direct Platform',
      riskLevel: 'LOW',
      returnPolicy: '7-Day Replacement + 1-Year Brand Warranty',
      warnings: []
    },
    keyEvidence: {
      positive: [
        'Fits target budget with 23% off MSRP',
        'Direct brand-authorized fulfillment path',
        '88% authentic verified purchase reviews across 3,420 entries',
        'Observed price is in the bottom 12th percentile of annual trend',
        'Return policy strictly verified under standard platform terms'
      ],
      caution: [
        'Ear cushion replacements might need separate purchase after 2 years heavy use',
        'Slight touch control sensitivity in humid weather reported by 4% of users'
      ],
      riskFactors: []
    },
    reviewsAnalysis: {
      totalAnalyzed: 3420,
      authenticPercent: 88,
      suspiciousPercent: 12,
      sentimentScore: 91,
      sampleReviews: [
        {
          id: 'rev-1',
          author: 'Arjun M., Bangalore',
          rating: 4,
          date: '3 days ago',
          verifiedPurchase: true,
          content: 'Battery lasted around 28 hours with ANC on during long study sessions. Incredibly comfortable, ANC cuts AC hum completely. Microphone is average in windy traffic.',
          suspicionScore: 8,
          credibilityLabel: 'High Credibility',
          detectedSignals: ['Specific usage parameters', 'Balanced pros/cons', 'Verified invoice timestamp']
        },
        {
          id: 'rev-2',
          author: 'Priya K., Mumbai',
          rating: 5,
          date: '1 week ago',
          verifiedPurchase: true,
          content: 'Soundstage is crisp, multipoint Bluetooth connects to my MacBook and iPhone seamlessly. Worth the upgrade from XM4 for office calls.',
          suspicionScore: 14,
          credibilityLabel: 'High Credibility',
          detectedSignals: ['Device-specific interoperability mentioned', 'Consistent reviewer profile']
        },
        {
          id: 'rev-3',
          author: 'User_9823741',
          rating: 5,
          date: '2 weeks ago',
          verifiedPurchase: false,
          content: 'BEST HEADPHONES ON EARTH 1000% RECOMMENDED BUY NOW SUPER FAST SHIPPING!!!!!',
          suspicionScore: 84,
          credibilityLabel: 'High Bot Probability',
          detectedSignals: ['Hyperbolic capitalization', 'No technical specifics', 'Cluster review burst timestamp']
        }
      ]
    },
    priceHistory: [
      { date: '1 Aug', price: 29990, avgPrice: 29500 },
      { date: '10 Aug', price: 29490, avgPrice: 29200 },
      { date: '20 Aug', price: 28990, avgPrice: 28900 },
      { date: '1 Sep', price: 27990, avgPrice: 28600 },
      { date: '10 Sep', price: 26990, avgPrice: 28499 }
    ]
  },

  'instagram-viral-sneakers': {
    id: 'instagram-viral-sneakers',
    title: 'AuraStyle CloudRun Hyped Limited Edition Sneaker (Social Commerce Discovery)',
    brand: 'Unregistered Vendor (IG: @hypeluxekicks_in)',
    category: 'Footwear & Apparel',
    sourcePlatform: 'Instagram DM',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    currentPrice: 3499,
    currency: '₹',
    originalPrice: 8999,
    thirtyDayAvgPrice: 3499,
    allTimeLow: 999,
    marketRange: { min: 1100, max: 1800 },
    trustScore: 34,
    recommendation: 'AVOID',
    recommendationConfidence: 96,
    decisionSummary: 'High purchase risk detected. Reverse image search matches unbranded OEM stock listed on wholesale hubs for ₹850. No public return policy, anonymous UPI payment link requested in DM.',
    fiveLayers: {
      reviewTrust: 22,
      sellerTrust: 18,
      priceIntelligence: 30,
      productReliability: 35,
      purchaseRisk: 'HIGH'
    },
    sellerDetails: {
      name: '@hypeluxekicks_in (Instagram DM Storefront)',
      rating: 2.1,
      accountAge: 'Created 42 days ago (Renamed 3 times)',
      fulfillmentType: 'Unknown DM Vendor',
      riskLevel: 'HIGH',
      returnPolicy: 'No Returns / "Defect replacement on unboxing video only" (Unenforceable)',
      warnings: [
        'Account handle changed 3 times in last 60 days',
        'Comments restricted on 90% of promotional reels',
        'Requires advance payment via private UPI QR code'
      ]
    },
    keyEvidence: {
      positive: [],
      caution: [
        'Appealing marketing video using stolen influencer b-roll'
      ],
      riskFactors: [
        'Hidden price behind "DM for price" funnel',
        'Identical design available on open marketplaces for ₹1,299',
        'High rate of non-delivery complaints on consumer forums',
        'No physical business address or GST registration found'
      ]
    },
    reviewsAnalysis: {
      totalAnalyzed: 140,
      authenticPercent: 15,
      suspiciousPercent: 85,
      sentimentScore: 32,
      sampleReviews: [
        {
          id: 'rev-scam-1',
          author: 'Bot_Fashion_99',
          rating: 5,
          date: 'Yesterday',
          verifiedPurchase: false,
          content: 'Best quality ever received within 2 days so fast and original!!! 🔥🔥🔥',
          suspicionScore: 92,
          credibilityLabel: 'High Bot Probability',
          detectedSignals: ['Account created same day', 'Spam comment loop', 'Generic template']
        },
        {
          id: 'rev-scam-2',
          author: 'Rohan_RealBuyer',
          rating: 1,
          date: '4 days ago',
          verifiedPurchase: false,
          content: 'Paid ₹3500 advance on GPay. No tracking number sent, seller blocked my handle when asked for dispatch status.',
          suspicionScore: 4,
          credibilityLabel: 'High Credibility',
          detectedSignals: ['Specific transaction grievance', 'High external fraud matching pattern']
        }
      ]
    },
    priceHistory: [
      { date: '1 Aug', price: 4999, avgPrice: 4200 },
      { date: '15 Aug', price: 3999, avgPrice: 3800 },
      { date: '1 Sep', price: 3499, avgPrice: 3499 }
    ]
  },

  'noise-smartwatch': {
    id: 'noise-smartwatch',
    title: 'Noise ColorFit Pulse 3 1.96" HD Display Smartwatch with BT Calling',
    brand: 'Noise',
    category: 'Wearables',
    sourcePlatform: 'Flipkart',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    currentPrice: 1999,
    currency: '₹',
    originalPrice: 4999,
    thirtyDayAvgPrice: 1799,
    allTimeLow: 1499,
    marketRange: { min: 1499, max: 2199 },
    trustScore: 81,
    recommendation: 'WAIT',
    recommendationConfidence: 87,
    decisionSummary: 'Reliable entry-level wearable with authentic seller credentials, but current price of ₹1,999 is elevated. Upcoming sale cycle is predicted to drop price to ₹1,499 within 10-14 days.',
    fiveLayers: {
      reviewTrust: 83,
      sellerTrust: 89,
      priceIntelligence: 62,
      productReliability: 82,
      purchaseRisk: 'LOW'
    },
    sellerDetails: {
      name: 'RetailNet Official',
      rating: 4.6,
      accountAge: '5+ Years active',
      fulfillmentType: 'Direct Platform',
      riskLevel: 'LOW',
      returnPolicy: '7-Day Replacement Policy',
      warnings: []
    },
    keyEvidence: {
      positive: [
        'Legitimate brand warranty with nationwide service centers',
        '83% genuine customer review validation rate',
        'Strong battery consistency reports (6-7 days real usage)'
      ],
      caution: [
        'Currently priced above 30-day historical mean (₹1,799)',
        'Quarterly festive sale expected within 12 days'
      ],
      riskFactors: []
    },
    reviewsAnalysis: {
      totalAnalyzed: 8420,
      authenticPercent: 83,
      suspiciousPercent: 17,
      sentimentScore: 80,
      sampleReviews: [
        {
          id: 'rev-watch-1',
          author: 'Siddharth T.',
          rating: 4,
          date: '5 days ago',
          verifiedPurchase: true,
          content: 'Screen is bright outdoors, step counter has ~5% margin compared to Apple Watch. Bluetooth calling is clear indoors.',
          suspicionScore: 10,
          credibilityLabel: 'High Credibility',
          detectedSignals: ['Comparative benchmarks provided', 'Verified purchase badge']
        }
      ]
    },
    priceHistory: [
      { date: '1 Aug', price: 1499, avgPrice: 1650 },
      { date: '15 Aug', price: 1699, avgPrice: 1700 },
      { date: '25 Aug', price: 1799, avgPrice: 1750 },
      { date: '5 Sep', price: 1999, avgPrice: 1799 }
    ]
  }
};

export const sampleComparisonData: ComparisonItem[] = [
  {
    id: 'comp-1',
    name: 'Sony WH-1000XM5',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80',
    price: 26990,
    badge: 'BEST OVERALL',
    trustScore: 92,
    reviewTrust: 88,
    sellerTrust: 95,
    qualityScore: 94,
    risk: 'LOW',
    userMatch: 96,
    pros: ['Class-leading ANC', '30h battery life', 'Lightweight ergonomic fit'],
    cons: ['Non-folding hinge design', 'Premium price tag']
  },
  {
    id: 'comp-2',
    name: 'Bose QuietComfort 45',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    price: 24990,
    badge: 'BEST VALUE',
    trustScore: 88,
    reviewTrust: 85,
    sellerTrust: 92,
    qualityScore: 90,
    risk: 'LOW',
    userMatch: 91,
    pros: ['Classic folding design', 'Physical tactile buttons', 'Extreme comfort'],
    cons: ['Microphone pickup average outdoors', 'No auto-pause sensor']
  },
  {
    id: 'comp-3',
    name: 'Sennheiser Accentum Plus',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
    price: 15990,
    badge: 'LOWEST PRICE',
    trustScore: 84,
    reviewTrust: 82,
    sellerTrust: 88,
    qualityScore: 85,
    risk: 'LOW',
    userMatch: 86,
    pros: ['50-hour mammoth battery', 'Audiophile sound tuning', 'Fast charging'],
    cons: ['ANC slightly behind Sony', 'Earcup clamping pressure higher']
  }
];

export const sampleSocialPost: SocialPostExtraction = {
  originalPostTitle: '🔥 DROP ALERT 🔥 Retro Vintage High-Top Street Sneaker — Strictly Limited Edition',
  platform: 'Instagram',
  postedPriceClaim: 'DM for Best Price & Free Shipping',
  sellerHandle: '@trendstreet_kicks_official',
  followers: '14.2K (Low Engagement Ratio)',
  identifiedProduct: 'Unbranded Synthetic Leather Retro High-Top',
  extractedMarketPriceRange: '₹1,299 – ₹1,899',
  sellerRisk: 'HIGH',
  returnInfoStatus: 'Unknown / Hidden',
  reverseImageOrigin: 'Wholesale listing batch from Guangdong OEM hub',
  confidenceScore: 94,
  flaggedWarning: 'High suspicion of dropshipping standard ₹900 inventory at ₹3,500+ without consumer dispute rights.'
};
