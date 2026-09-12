from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    PROJECT_NAME: str = "TRUSTCART AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    ENVIRONMENT: str = "development"

    # Database: Default to SQLite for easy local development, or PostgreSQL when DATABASE_URL is set
    DATABASE_URL: str = Field(
        default="sqlite:///./trustcart.db",
        description="PostgreSQL or SQLite database connection URL"
    )

    # CORS origins
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "*"
    ]

    # JWT Authentication
    SECRET_KEY: str = "trustcart_ai_secret_key_super_secure_development_2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Centralized Trust Score Weights (Normalized to sum to 1.0)
    WEIGHT_REVIEW_TRUST: float = 0.25
    WEIGHT_SELLER_TRUST: float = 0.20
    WEIGHT_PRODUCT_QUALITY: float = 0.20
    WEIGHT_PRICE_VALUE: float = 0.15
    WEIGHT_RETURN_INFO: float = 0.10
    WEIGHT_AUTHENTICITY_RISK: float = 0.10

    # Risk Thresholds (0-100 scale)
    RISK_THRESHOLD_HIGH_MAX: int = 39      # 0 - 39 is HIGH RISK
    RISK_THRESHOLD_MEDIUM_MAX: int = 69    # 40 - 69 is MEDIUM RISK
    RISK_THRESHOLD_LOW_MIN: int = 70       # 70 - 100 is LOW RISK

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()
