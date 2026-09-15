from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional


class AIProvider(ABC):
    """
    Abstract Provider Interface for LLM and NLP inference engines
    (e.g., Gemini, OpenAI, Claude, Local HuggingFace models).
    """

    @abstractmethod
    async def analyze_sentiment(self, text: str, aspects: Optional[List[str]] = None) -> Dict[str, Any]:
        """Analyze sentiment polarity and aspect-specific ratings."""
        pass

    @abstractmethod
    async def detect_anomalies(self, reviews: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Detect automated bot patterns, burst review campaigns, and deceptive language clusters."""
        pass

    @abstractmethod
    async def generate_explanation(self, trust_metrics: Dict[str, Any], context: Dict[str, Any]) -> str:
        """Generate human-understandable, transparent decision explanation for the user."""
        pass
