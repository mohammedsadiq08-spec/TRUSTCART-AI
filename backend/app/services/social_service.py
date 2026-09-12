from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.database import models
from app.schemas.social import SocialPostAnalyzeRequest


class SocialCommerceService:
    def analyze_social_input(
        self,
        db: Session,
        req: SocialPostAnalyzeRequest
    ) -> Dict[str, Any]:
        text_input = req.url_or_text or ""
        platform = req.platform or "Instagram"

        # Baseline OCR & Extraction Pipeline
        # Simulates reverse image matching against public factory indexes & catalog registries
        if "sneaker" in text_input.lower() or "shoe" in text_lower(text_input) or "hype" in text_input.lower():
            return {
                "originalPostTitle": "🔥 DROP ALERT 🔥 Retro Vintage High-Top Street Sneaker — Strictly Limited Edition",
                "platform": platform,
                "postedPriceClaim": "DM for Best Price & Free Shipping",
                "sellerHandle": "@trendstreet_kicks_official",
                "followers": "14.2K (Low Engagement Ratio)",
                "identifiedProduct": "Unbranded Synthetic Leather Retro High-Top (Possible Match)",
                "extractedMarketPriceRange": "₹1,299 – ₹1,899",
                "sellerRisk": "HIGH",
                "returnInfoStatus": "Unknown / Hidden",
                "reverseImageOrigin": "Wholesale listing batch from Guangdong OEM hub",
                "confidenceScore": 94.0,
                "flaggedWarning": "High suspicion of dropshipping standard ₹900 wholesale inventory at ₹3,500+ without statutory consumer dispute rights."
            }
        else:
            return {
                "originalPostTitle": "Luxury Minimalist Leather Goods Collection (Public Social Discovery)",
                "platform": platform,
                "postedPriceClaim": "Inquire via WhatsApp Catalog",
                "sellerHandle": "@luxecraft_india",
                "followers": "8.5K",
                "identifiedProduct": "Handcrafted Vegan Leather Messenger Bag (Possible Match)",
                "extractedMarketPriceRange": "₹1,800 – ₹2,400",
                "sellerRisk": "MEDIUM",
                "returnInfoStatus": "Strict 2-day replacement only",
                "reverseImageOrigin": "Domestic regional leather handicraft cluster",
                "confidenceScore": 88.0,
                "flaggedWarning": "Vendor operates outside standard marketplace escrow. Verify invoice before making direct UPI payments."
            }


def text_lower(val: Optional[str]) -> str:
    return val.lower() if val else ""


social_service = SocialCommerceService()
