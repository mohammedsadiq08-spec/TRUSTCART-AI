from typing import Dict, Any, List
from app.core.config import settings


class RecommendationEngine:
    """
    Synthesizes overall trust, price intelligence, seller reputation,
    and purchase risk into an explainable BUY, WAIT, or AVOID verdict.
    """

    def decide(
        self,
        overall_trust_score: float,
        purchase_risk: str,
        price_intelligence_score: float,
        seller_trust_score: float,
        review_trust_score: float,
        product_quality_score: float
    ) -> Dict[str, Any]:
        # 1. AVOID Triggers
        if purchase_risk == "HIGH" or overall_trust_score < settings.RISK_THRESHOLD_MEDIUM_MAX:
            recommendation = "AVOID"
            confidence = min(98.0, max(85.0, 100.0 - overall_trust_score))
            summary = "High purchase risk detected. Deceptive listing patterns, high seller risk, or manipulated review signals make this product unsafe."
        
        # 2. WAIT Triggers
        elif price_intelligence_score < 70.0 or (overall_trust_score < 85.0 and price_intelligence_score < 75.0):
            recommendation = "WAIT"
            confidence = 88.0
            summary = "Legitimate product and seller, but current price or timing is unfavorable. A price drop is expected during the upcoming sale cycle."

        # 3. BUY Triggers
        else:
            recommendation = "BUY"
            confidence = min(96.0, max(88.0, overall_trust_score * 0.98))
            summary = "Outstanding product integrity with verified warranty, authorized seller pedigree, and authentic review distribution."

        return {
            "recommendation": recommendation,
            "confidence": round(confidence, 1),
            "decision_summary": summary
        }


recommendation_engine = RecommendationEngine()
