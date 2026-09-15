from abc import ABC, abstractmethod
from typing import Optional


class EmailProvider(ABC):
    """
    Abstract Provider Interface for transactional emails, price alerts, and password resets.
    """

    @abstractmethod
    async def send_email(self, to_email: str, subject: str, html_content: str, text_content: Optional[str] = None) -> bool:
        """Send a transactional email notification."""
        pass
