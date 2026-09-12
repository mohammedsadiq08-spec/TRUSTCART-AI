from typing import Optional, List
from pydantic import BaseModel, ConfigDict


class SellerBase(BaseModel):
    name: str
    platform: str = "Amazon"
    profile_url: Optional[str] = None
    rating: float = 0.0
    review_count: int = 0
    location: Optional[str] = None
    account_age: str = "1+ Year active"
    fulfillment_type: str = "Direct Platform"
    risk_level: str = "LOW"
    return_policy: str = "7-Day Replacement Policy"
    warnings: List[str] = []


class SellerCreate(SellerBase):
    id: Optional[str] = None


class SellerResponse(SellerBase):
    id: str

    model_config = ConfigDict(from_attributes=True)


class SellerAnalysisRequest(BaseModel):
    seller_id: Optional[str] = None
    seller_name: Optional[str] = None
    platform: Optional[str] = "Amazon"
    profile_url: Optional[str] = None
