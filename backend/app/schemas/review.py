from typing import Optional, List
from pydantic import BaseModel


class ReviewSampleSchema(BaseModel):
    id: str
    author: str
    avatar: Optional[str] = None
    rating: float
    date: str
    verifiedPurchase: bool
    content: str
    suspicionScore: float
    credibilityLabel: str
    detectedSignals: List[str]


class ReviewAnalyzeRequest(BaseModel):
    review_text: str
    rating: Optional[float] = 5.0
    verified_purchase: Optional[bool] = True
    author_account_age_days: Optional[int] = 180


class ReviewAnalyzeResponse(BaseModel):
    suspicionScore: float
    credibilityScore: float
    label: str
    credibilityLabel: str
    signals: List[str]
    sentimentScore: float
    entropyScore: float
    botProbability: float
    isSuspicious: bool
