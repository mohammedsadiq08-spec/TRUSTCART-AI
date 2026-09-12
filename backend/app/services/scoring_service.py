from typing import Dict, Any
from app.core.config import settings


class CentralizedScoringService:
    """
    Centralized, dynamic scoring engine for TRUSTCART AI.
    Combines multi-vector sub-scores into an overall Trust Score (0-100)
    using configurable weights from settings.
    """

    def calculate_overall_trust(
        self,
        review_trust: float,
        seller_trust: float,
        product_quality: float,
        price_intelligence: float,
        return_info_score: float = 85.0,
        authenticity_score: float = 85.0
    ) -> Dict[str, Any]:
        weights = {
            "review": settings.WEIGHT_REVIEW_TRUST,
            "seller": settings.WEIGHT_SELLER_TRUST,
            "quality": settings.WEIGHT_PRODUCT_QUALITY,
            "price": settings.WEIGHT_PRICE_VALUE,
            "return_info": settings.WEIGHT_RETURN_INFO,
            "authenticity": settings.WEIGHT_AUTHENTICITY_RISK
        }

        # Normalize weights if needed
        total_weight = sum(weights.values()) or 1.0

        raw_trust = (
            (review_trust * weights["review"]) +
            (seller_trust * weights["seller"]) +
            (product_quality * weights["quality"]) +
            (price_intelligence * weights["price"]) +
            (return_info_score * weights["return_info"]) +
            (authenticity_score * weights["authenticity"])
        ) / total_weight

        overall_trust = round(max(5.0, min(100.0, raw_trust)), 1)

        if overall_trust <= settings.RISK_THRESHOLD_HIGH_MAX:
            risk_tier = "HIGH"
        elif overall_trust <= settings.RISK_THRESHOLD_MEDIUM_MAX:
            risk_tier = "MEDIUM"
        else:
            risk_tier = "LOW"

        return {
            "overall_trust_score": overall_trust,
            "risk_tier": risk_tier,
            "weights_applied": weights
        }


scoring_service = CentralizedScoringService()
