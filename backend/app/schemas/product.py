from typing import Optional, List, Dict
from pydantic import BaseModel, ConfigDict


class PriceHistoryPointSchema(BaseModel):
    date: str
    price: float
    avgPrice: float


class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    brand: str
    price: float
    currency: str = "₹"
    original_price: Optional[float] = None
    image_url: Optional[str] = None
    source_platform: str = "Amazon"
    source_url: Optional[str] = None


class ProductCreate(ProductBase):
    id: Optional[str] = None
    seller_id: Optional[str] = None
    thirty_day_avg_price: Optional[float] = None
    all_time_low: Optional[float] = None
    market_min: Optional[float] = None
    market_max: Optional[float] = None


class ProductResponse(ProductBase):
    id: str
    seller_id: Optional[str] = None
    rating: float = 0.0
    review_count: int = 0
    thirty_day_avg_price: float = 0.0
    all_time_low: float = 0.0
    market_min: float = 0.0
    market_max: float = 0.0

    model_config = ConfigDict(from_attributes=True)


class ProductSearchRequest(BaseModel):
    query: str
    category: Optional[str] = None
    limit: int = 10


class ProductComparisonRequest(BaseModel):
    product_ids: List[str]
