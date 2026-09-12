from typing import Dict, Any, List
from app.core.config import settings


class RiskEngine:
    """
    Evaluates multi-vector risks (seller dispute rate, unverified dropship funnel,
    review manipulation, return refusal risk) into a unified risk tier.
    """

    def calculate_risk(
        self,
        seller_risk: str,
        review_suspicion_percent: float,
        price_volatility_score: float,
        seller_warnings: List[str]
    ) -> Dict[str, Any]:
        risk_points = 0.0
        risk_factors: List[str] = []

        # 1. Seller risk weight
        if seller_risk == "HIGH":
            risk_points += 45.0
            risk_factors.append("High seller entity risk (unregistered/frequent profile changes)")
        elif seller_risk == "MEDIUM":
            risk_points += 20.0
            risk_factors.append("Moderate seller dispute index")

        # 2. Review manipulation
        if review_suspicion_percent > 40.0:
            risk_points += 30.0
            risk_factors.append(f"Significant review anomaly rate ({review_suspicion_percent}% suspicious)")
        elif review_suspicion_percent > 20.0:
            risk_points += 15.0

        # 3. Seller Warnings
        if seller_warnings:
            risk_points += min(30.0, len(seller_warnings) * 10.0)
            for w in seller_warnings:
                if w not in risk_factors:
                    risk_factors.append(w)

        # Classify risk tier based on thresholds
        if risk_points >= 40.0 or seller_risk == "HIGH":
            risk_tier = "HIGH"
        elif risk_points >= 20.0 or seller_risk == "MEDIUM":
            risk_tier = "MEDIUM"
        else:
            risk_tier = "LOW"

        return {
            "risk_tier": risk_tier,
            "risk_score": min(100.0, risk_points),
            "risk_factors": risk_factors
        }


risk_engine = RiskEngine()
