from typing import Optional, List, Dict, Any
from pydantic import BaseModel
from app.schemas.review import ReviewSampleSchema
from app.schemas.product import PriceHistoryPointSchema


class FiveLayerTrustSchema(BaseModel):
    reviewTrust: float
    sellerTrust: float
    priceIntelligence: float
    productReliability: float
    purchaseRisk: str  # LOW, MEDIUM, HIGH


class SellerDetailsSchema(BaseModel):
    name: str
    rating: float
    accountAge: str
    fulfillmentType: str
    riskLevel: str
    returnPolicy: str
    warnings: List[str] = []


class KeyEvidenceSchema(BaseModel):
    positive: List[str] = []
    caution: List[str] = []
    riskFactors: List[str] = []


class ReviewsAnalysisSummarySchema(BaseModel):
    totalAnalyzed: int
    authenticPercent: float
    suspiciousPercent: float
    sentimentScore: float
    sampleReviews: List[ReviewSampleSchema] = []


class MarketRangeSchema(BaseModel):
    min: float
    max: float


class ProductInvestigationSchema(BaseModel):
    id: str
    title: str
    brand: str
    category: str
    sourcePlatform: str
    image: str
    currentPrice: float
    currency: str = "₹"
    originalPrice: Optional[float] = None
    thirtyDayAvgPrice: float
    allTimeLow: float
    marketRange: MarketRangeSchema
    trustScore: float
    recommendation: str  # BUY, WAIT, AVOID
    recommendationConfidence: float
    decisionSummary: str
    fiveLayers: FiveLayerTrustSchema
    sellerDetails: SellerDetailsSchema
    keyEvidence: KeyEvidenceSchema
    reviewsAnalysis: ReviewsAnalysisSummarySchema
    priceHistory: List[PriceHistoryPointSchema] = []


class AnalyzeProductRequest(BaseModel):
    input_text: str  # Link, keyword, or query
    mode: str = "link"  # link, image, search
    category: Optional[str] = None
    user_budget: Optional[float] = None
