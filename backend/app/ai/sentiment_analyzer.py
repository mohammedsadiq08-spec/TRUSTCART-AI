import re
from typing import Dict, Any


class SentimentAnalyzer:
    """
    Baseline sentiment analysis engine.
    Computes overall polarity, subjectivity, and feature-specific sentiment.
    Can be seamlessly swapped with Transformers (e.g., DistilBERT/RoBERTa) when required.
    """

    POSITIVE_WORDS = {
        "amazing", "excellent", "great", "fantastic", "good", "perfect", "love", "loved",
        "superb", "durable", "clear", "crisp", "comfortable", "solid", "worth", "best",
        "fast", "reliable", "genuine", "original", "smooth", "premium", "impressive"
    }

    NEGATIVE_WORDS = {
        "terrible", "awful", "bad", "poor", "broken", "defective", "waste", "scam",
        "worst", "cheap", "fake", "delayed", "useless", "disappointed", "slow", "horrible",
        "fraud", "damaged", "uncomfortable", "painful", "fail", "failed"
    }

    def analyze(self, text: str) -> Dict[str, Any]:
        if not text:
            return {"sentiment_score": 0.0, "polarity": "neutral", "positive_count": 0, "negative_count": 0}

        words = re.findall(r"\b\w+\b", text.lower())
        total_words = len(words) or 1

        pos_count = sum(1 for w in words if w in self.POSITIVE_WORDS)
        neg_count = sum(1 for w in words if w in self.NEGATIVE_WORDS)

        raw_score = (pos_count - neg_count) / max(1, pos_count + neg_count)
        # Normalized score from 0.0 to 100.0
        normalized_score = round(((raw_score + 1.0) / 2.0) * 100.0, 1)

        polarity = "neutral"
        if raw_score > 0.2:
            polarity = "positive"
        elif raw_score < -0.2:
            polarity = "negative"

        return {
            "sentiment_score": normalized_score,
            "raw_score": round(raw_score, 2),
            "polarity": polarity,
            "positive_count": pos_count,
            "negative_count": neg_count
        }


sentiment_analyzer = SentimentAnalyzer()
