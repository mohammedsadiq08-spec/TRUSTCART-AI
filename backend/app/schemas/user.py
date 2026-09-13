from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, ConfigDict
from app.schemas.product import ProductResponse


class UserUpdateRequest(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=128)
    password: Optional[str] = Field(None, min_length=6, max_length=128)


class UserProfileResponse(BaseModel):
    id: str
    full_name: str
    email: str
    created_at: str
    saved_products_count: int = 0
    analyses_count: int = 0

    model_config = ConfigDict(from_attributes=True)


class SavedProductResponse(BaseModel):
    id: str
    product_id: str
    saved_at: str
    product: ProductResponse

    model_config = ConfigDict(from_attributes=True)


class AnalysisHistoryItemResponse(BaseModel):
    id: str
    product_id: str
    product_name: str
    product_image: Optional[str] = None
    brand: str
    category: str
    price: float
    currency: str
    trust_score: float
    recommendation: str
    confidence: float
    analyzed_at: str

    model_config = ConfigDict(from_attributes=True)
