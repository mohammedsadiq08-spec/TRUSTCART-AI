from typing import Optional, List, Dict
from pydantic import BaseModel


class PersonaPreferencesSchema(BaseModel):
    purpose: str = "Study"  # Study, Office, Gaming, Fitness, Audiophile
    budget: float = 30000.0
    comfortWeight: float = 40.0
    batteryWeight: float = 30.0
    soundWeight: float = 20.0
    micWeight: float = 10.0


class PersonalizedRecommendationResponse(BaseModel):
    productId: str
    productName: str
    price: str
    matchPercent: float
    reason: str
    badge: str
    rating: float
    supportingSignals: List[str] = []


class DecisionMatrixResponse(BaseModel):
    verdict: str  # BUY, WAIT, AVOID
    confidence: float
    reasons: List[str]
    thresholdTriggers: List[str]
    caseStudy: Dict[str, str]
