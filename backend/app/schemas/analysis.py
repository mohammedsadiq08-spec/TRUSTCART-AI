from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, field_validator
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
    recommendation: str  # BUY, WAIT, AVOID, INSUFFICIENT INFORMATION
    recommendationConfidence: float
    decisionSummary: str
    fiveLayers: FiveLayerTrustSchema
    sellerDetails: SellerDetailsSchema
    keyEvidence: KeyEvidenceSchema
    reviewsAnalysis: ReviewsAnalysisSummarySchema
    priceHistory: List[PriceHistoryPointSchema] = []


class AnalyzeProductRequest(BaseModel):
    input_text: str = Field(..., min_length=1, max_length=2048, description="URL, product title, or query")
    mode: str = Field(default="link", description="Mode: 'link', 'image', or 'search'")
    category: Optional[str] = Field(None, max_length=128)
    user_budget: Optional[float] = Field(None, ge=0)

    @field_validator("mode")
    @classmethod
    def validate_mode(cls, v: str) -> str:
        clean = v.strip().lower()
        if clean not in ("link", "image", "search"):
            raise ValueError("Mode must be one of: 'link', 'image', 'search'.")
        return clean

    @field_validator("input_text")
    @classmethod
    def sanitize_input(cls, v: str) -> str:
        clean = v.strip()
        # Disallow harmful URL schemes like javascript:, data:, file:
        low = clean.lower()
        if low.startswith(("javascript:", "file:", "data:", "vbscript:")):
            raise ValueError("Invalid URL scheme provided.")
        return clean
