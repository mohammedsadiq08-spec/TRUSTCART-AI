import re
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict, field_validator

EMAIL_REGEX = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"


class UserRegisterRequest(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=128, description="User's full name")
    email: str = Field(..., min_length=3, max_length=255, description="Unique email address")
    password: str = Field(..., min_length=6, max_length=128, description="Password (min 6 characters)")
    confirm_password: Optional[str] = None

    @field_validator("email")
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        clean = v.strip().lower()
        if not re.match(EMAIL_REGEX, clean):
            raise ValueError("Invalid email format.")
        return clean

    @field_validator("full_name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        clean = v.strip()
        if len(clean) < 2:
            raise ValueError("Full name must be at least 2 characters.")
        return clean


class UserLoginRequest(BaseModel):
    email: str = Field(..., min_length=3, max_length=255)
    password: str = Field(..., min_length=1, max_length=128)

    @field_validator("email")
    @classmethod
    def clean_email(cls, v: str) -> str:
        return v.strip().lower()


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
