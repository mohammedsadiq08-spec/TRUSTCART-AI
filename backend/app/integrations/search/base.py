from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional


class SearchProvider(ABC):
    """
    Abstract Provider Interface for multi-marketplace search and discovery.
    """

    @abstractmethod
    async def search_products(self, query: str, category: Optional[str] = None, limit: int = 10) -> List[Dict[str, Any]]:
        """Search products across platforms and merchant catalogs."""
        pass
