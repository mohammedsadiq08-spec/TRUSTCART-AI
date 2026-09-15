from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional


class PricingProvider(ABC):
    """
    Abstract Provider Interface for historical price tracking and deal detection.
    """

    @abstractmethod
    async def get_price_history(self, product_id: str, platform: str = "Amazon", days: int = 90) -> List[Dict[str, Any]]:
        """Fetch historical price timeline data points."""
        pass

    @abstractmethod
    async def get_current_competitor_prices(self, product_name: str, brand: str) -> List[Dict[str, Any]]:
        """Fetch cross-platform competitor pricing for fair-market-value benchmarking."""
        pass
