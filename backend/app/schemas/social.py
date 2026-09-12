from typing import Optional
from pydantic import BaseModel


class SocialPostAnalyzeRequest(BaseModel):
    url_or_text: Optional[str] = None
    image_base64: Optional[str] = None
    platform: Optional[str] = "Instagram"  # Instagram, WhatsApp, Telegram


class SocialPostExtractionResponse(BaseModel):
    originalPostTitle: str
    platform: str
    postedPriceClaim: str
    sellerHandle: str
    followers: str
    identifiedProduct: str
    extractedMarketPriceRange: str
    sellerRisk: str
    returnInfoStatus: str
    reverseImageOrigin: str
    confidenceScore: float
    flaggedWarning: str
