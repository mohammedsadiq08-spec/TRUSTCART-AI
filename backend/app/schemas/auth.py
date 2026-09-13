from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class UserRegisterRequest(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=128)
    email: str = Field(..., min_length=3, max_length=256)
    password: str = Field(..., min_length=6, max_length=128)
    confirm_password: Optional[str] = None


class UserLoginRequest(BaseModel):
    email: str = Field(..., min_length=3, max_length=256)
    password: str = Field(..., min_length=1)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    full_name: str


class AuthMeResponse(BaseModel):
    id: str
    full_name: str
    email: str
    created_at: str

    model_config = ConfigDict(from_attributes=True)
