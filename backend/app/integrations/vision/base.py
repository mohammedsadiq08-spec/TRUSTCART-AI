from abc import ABC, abstractmethod
from typing import Dict, Any, Optional


class VisionProvider(ABC):
    """
    Abstract Provider Interface for social commerce image OCR and reverse image search.
    """

    @abstractmethod
    async def extract_text_from_image(self, image_url_or_bytes: Any) -> str:
        """Perform OCR on screenshot/post image to extract seller claims, prices, and product names."""
        pass

    @abstractmethod
    async def reverse_image_search(self, image_url_or_bytes: Any) -> Dict[str, Any]:
        """Detect original source image origins (e.g. AliExpress/Taobao wholesale vs authentic original)."""
        pass
