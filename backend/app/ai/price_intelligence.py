from typing import Dict, Any, List


class PriceIntelligenceEngine:
    """
    Evaluates price trends, volatility, discount authenticity,
    and calculates timing recommendations (BUY NOW vs WAIT).
    """

    def analyze_price_trend(
        self,
        current_price: float,
        thirty_day_avg: float,
        all_time_low: float,
        market_min: float,
        market_max: float,
        price_history: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        if thirty_day_avg <= 0:
            thirty_day_avg = current_price

        diff = current_price - thirty_day_avg
        diff_percent = round((diff / thirty_day_avg) * 100.0, 1)

        # Base score starts at 80
        score = 80.0
        timing_advice = "BUY NOW"
        timing_reason = "Current price is favorable."
        fake_discount_detected = False

        if current_price <= all_time_low * 1.05 and current_price > 0:
            score = 95.0
            timing_advice = "BUY NOW"
            timing_reason = "Current price is near historical all-time low."
        elif diff < 0:
            # Below 30-day average
            savings = abs(diff)
            score = min(95.0, 85.0 + abs(diff_percent) * 0.5)
            timing_advice = "BUY NOW"
            timing_reason = f"Current price is ₹{int(savings):,} below recent 30-day average."
        elif diff_percent > 10.0:
            # Elevated price
            score = max(30.0, 70.0 - diff_percent * 1.2)
            timing_advice = "WAIT"
            timing_reason = f"Current price is {diff_percent}% above 30-day baseline. Better deal expected in upcoming cycle."
        else:
            score = 75.0
            timing_advice = "BUY NOW"
            timing_reason = "Price is stable within regular market range."

        # Check for pre-sale artificial spikes in price history
        if len(price_history) >= 3:
            prices = [p.get("price", 0) for p in price_history]
            if max(prices) > thirty_day_avg * 1.25 and current_price < max(prices):
                fake_discount_detected = True

        return {
            "price_intelligence_score": round(score, 1),
            "timing_advice": timing_advice,
            "timing_reason": timing_reason,
            "price_difference": round(diff, 2),
            "price_difference_percent": diff_percent,
            "fake_discount_detected": fake_discount_detected,
            "market_range": {"min": market_min, "max": market_max}
        }


price_intelligence_engine = PriceIntelligenceEngine()
