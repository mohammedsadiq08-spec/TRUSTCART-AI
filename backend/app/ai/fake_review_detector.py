import re
from typing import Dict, Any, List
from app.ai.sentiment_analyzer import sentiment_analyzer


class FakeReviewDetector:
    """
    Evaluates customer reviews for signs of synthetic generation, bot duplication,
    incentivized enthusiasm, and rating anomalies.
    
    IMPORTANT DESIGN PRINCIPLE:
    This model outputs a *Suspicion Probability* and *Credibility Signals*,
    never asserting absolute certainty ("Confirmed Fake") without cryptographically signed evidence.
    """

    BOT_TEMPLATE_PHRASES = [
        "best product ever", "buy now", "super fast shipping", "1000% recommended",
        "must buy", "perfect quality", "order 10 more", "very nice item",
        "received within 2 days", "original product", "great seller"
    ]

    TECHNICAL_INDICATORS = [
        "battery", "hours", "sound", "anc", "mic", "weight", "bluetooth", "comfort",
        "bass", "treble", "cushion", "latency", "warranty", "months", "days", "tested",
        "drop", "material", "stitch", "fit", "screen", "display", "resolution"
    ]

    def evaluate_single_review(
        self,
        text: str,
        rating: float = 5.0,
        verified_purchase: bool = True,
        author_account_age_days: int = 180
    ) -> Dict[str, Any]:
        if not text:
            return {
                "suspicion_score": 50.0,
                "credibility_score": 50.0,
                "label": "Insufficient Content",
                "credibility_label": "Potentially Suspicious",
                "signals": ["Empty or near-empty review content"],
                "is_suspicious": False,
                "sentiment_score": 50.0,
                "entropy_score": 0.0,
                "bot_probability": 50.0
            }

        text_clean = text.strip()
        text_lower = text_clean.lower()
        signals: List[str] = []
        suspicion_points = 0.0

        # 1. Linguistic markers: Excessive exclamations and all-caps
        exclamation_count = text.count("!")
        if exclamation_count >= 3:
            suspicion_points += 20.0
            signals.append("Excessive exclamation marks and hyperbolic punctuation")

        caps_ratio = sum(1 for c in text if c.isupper()) / max(1, len(text))
        if caps_ratio > 0.4 and len(text) > 20:
            suspicion_points += 15.0
            signals.append("Abnormal capitalization ratio (>40% uppercase characters)")

        # 2. Short non-descriptive reviews
        word_count = len(re.findall(r"\b\w+\b", text_lower))
        if word_count < 12 and rating >= 5.0:
            suspicion_points += 15.0
            signals.append("Short review length lacking descriptive product telemetry")

        # 3. Template matching
        matched_templates = [t for t in self.BOT_TEMPLATE_PHRASES if t in text_lower]
        if len(matched_templates) >= 2:
            suspicion_points += 25.0
            signals.append(f"Phrasing clusters match known promotional templates: '{matched_templates[0]}'")

        # 4. Technical specifics vs generic praise
        found_tech = [k for k in self.TECHNICAL_INDICATORS if k in text_lower]
        if found_tech:
            suspicion_points -= 20.0
            signals.append(f"Contains specific feature telemetry ({', '.join(found_tech[:3])})")
        else:
            suspicion_points += 10.0

        # 5. Purchase verification and account history
        if not verified_purchase:
            suspicion_points += 20.0
            signals.append("Unverified purchase status")
        else:
            signals.append("Verified invoice purchase receipt")

        if author_account_age_days < 14:
            suspicion_points += 15.0
            signals.append("Reviewer account created recently (<14 days)")

        # Normalize score
        suspicion_score = max(5.0, min(95.0, suspicion_points))
        credibility_score = round(100.0 - suspicion_score, 1)

        # Assign calibrated labels
        if suspicion_score >= 75.0:
            label = f"High Suspicion Probability ({round(suspicion_score)}%)"
            credibility_label = "High Bot Probability"
            is_suspicious = True
        elif suspicion_score >= 50.0:
            label = f"Moderate Suspicion ({round(suspicion_score)}%)"
            credibility_label = "Potentially Suspicious"
            is_suspicious = True
        elif suspicion_score >= 30.0:
            label = f"Moderate Credibility ({round(credibility_score)}%)"
            credibility_label = "Moderate Credibility"
            is_suspicious = False
        else:
            label = f"High Credibility Signals ({round(credibility_score)}%)"
            credibility_label = "High Credibility"
            is_suspicious = False

        sentiment_res = sentiment_analyzer.analyze(text_clean)

        return {
            "suspicion_score": round(suspicion_score, 1),
            "credibility_score": credibility_score,
            "label": label,
            "credibility_label": credibility_label,
            "signals": signals,
            "sentiment_score": sentiment_res["sentiment_score"],
            "entropy_score": round(word_count * 0.4, 2),
            "bot_probability": round(suspicion_score, 1),
            "is_suspicious": is_suspicious
        }


fake_review_detector = FakeReviewDetector()
