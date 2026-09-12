from typing import Dict, Any, List


class SellerTrustEngine:
    """
    Evaluates merchant pedigree, fulfillment channels, dispute ratios,
    and statutory consumer return compliance.
    """

    def evaluate_seller(
        self,
        name: str,
        rating: float,
        review_count: int,
        account_age: str,
        fulfillment_type: str,
        return_policy: str,
        warnings: List[str]
    ) -> Dict[str, Any]:
        score = 80.0
        risk_level = "LOW"
        signals: List[str] = []

        # 1. Rating & volume adjustment
        if rating >= 4.5 and review_count > 500:
            score += 10.0
            signals.append("High customer satisfaction rating with substantial transaction volume")
        elif rating < 3.5 or review_count < 10:
            score -= 20.0
            signals.append("Low seller rating or inadequate transaction history")

        # 2. Account Age
        age_lower = account_age.lower()
        if "5+" in age_lower or "7+" in age_lower:
            score += 8.0
            signals.append("Established merchant longevity (>5 years on platform)")
        elif "days" in age_lower or "month" in age_lower:
            score -= 25.0
            signals.append("Newly created merchant profile (<90 days active)")

        # 3. Fulfillment type
        if "direct" in fulfillment_type.lower() or "insured" in fulfillment_type.lower():
            score += 5.0
            signals.append("Direct platform insured fulfillment with tracking guarantee")
        elif "unknown" in fulfillment_type.lower() or "dm" in fulfillment_type.lower():
            score -= 30.0
            signals.append("Informal fulfillment channel (private unverified delivery)")

        # 4. Return Policy
        if "replacement" in return_policy.lower() or "7-day" in return_policy.lower() or "warranty" in return_policy.lower():
            score += 5.0
            signals.append("Standard statutory return/replacement window supported")
        else:
            score -= 20.0
            signals.append("No clear or enforceable return policy identified")

        # 5. Active Warnings
        if warnings:
            score -= (len(warnings) * 15.0)
            for w in warnings:
                signals.append(f"Seller Risk Alert: {w}")

        final_score = max(5.0, min(100.0, score))

        if final_score < 40.0:
            risk_level = "HIGH"
        elif final_score < 70.0:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"

        return {
            "seller_trust_score": round(final_score, 1),
            "risk_level": risk_level,
            "signals": signals
        }


seller_trust_engine = SellerTrustEngine()
