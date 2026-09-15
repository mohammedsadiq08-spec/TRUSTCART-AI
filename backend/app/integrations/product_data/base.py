from abc import ABC, abstractmethod
from typing import Dict, Any, Optional


class ProductDataProvider(ABC):
    """
    Abstract Provider Interface for acquiring verified product catalog data
    (e.g., E-commerce API scrapers, merchant feeds, barcode registries).
    """

    @abstractmethod
    async def fetch_product_by_url(self, url: str) -> Optional[Dict[str, Any]]:
        """Extract canonical product details, specs, seller info, and customer reviews from a URL."""
        pass

    @abstractmethod
    async def fetch_product_by_id(self, product_id: str, platform: str = "Amazon") -> Optional[Dict[str, Any]]:
        """Fetch real-time listing metadata by platform ASIN / SKU / ID."""
        pass
