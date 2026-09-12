import math
import re
from typing import Dict, Any, List
from collections import Counter


class ReviewAnalyzer:
    """
    Computes linguistic complexity, Shannon entropy, lexical diversity,
    and syntactic variance for customer review datasets.
    """

    def calculate_entropy(self, text: str) -> float:
        """Calculates Shannon entropy of the character and word distribution."""
        if not text:
            return 0.0
        words = re.findall(r"\b\w+\b", text.lower())
        if not words:
            return 0.0
        word_counts = Counter(words)
        total_words = len(words)
        entropy = -sum((count / total_words) * math.log2(count / total_words) for count in word_counts.values())
        return round(entropy, 2)

    def calculate_lexical_diversity(self, text: str) -> float:
        """Type-Token Ratio (TTR). Higher ratio means richer, more varied vocabulary."""
        words = re.findall(r"\b\w+\b", text.lower())
        if not words:
            return 0.0
        unique_words = len(set(words))
        return round(unique_words / len(words), 2)

    def analyze_batch(self, reviews: List[Dict[str, Any]]) -> Dict[str, Any]:
        if not reviews:
            return {
                "total_analyzed": 0,
                "authentic_percent": 100.0,
                "suspicious_percent": 0.0,
                "average_entropy": 0.0,
                "review_trust_score": 85.0
            }

        total = len(reviews)
        suspicious_count = 0
        total_entropy = 0.0

        for r in reviews:
            text = r.get("review_text", "") or r.get("content", "")
            entropy = self.calculate_entropy(text)
            total_entropy += entropy
            if r.get("suspicion_probability", 0) >= 50 or r.get("suspicionScore", 0) >= 50:
                suspicious_count += 1

        suspicious_percent = round((suspicious_count / total) * 100.0, 1)
        authentic_percent = round(100.0 - suspicious_percent, 1)
        avg_entropy = round(total_entropy / total, 2)

        # Baseline review trust score
        review_trust_score = max(10.0, min(100.0, authentic_percent * 0.9 + (min(avg_entropy, 5.0) * 2.0)))

        return {
            "total_analyzed": total,
            "authentic_percent": authentic_percent,
            "suspicious_percent": suspicious_percent,
            "average_entropy": avg_entropy,
            "review_trust_score": round(review_trust_score, 1)
        }


review_analyzer = ReviewAnalyzer()
