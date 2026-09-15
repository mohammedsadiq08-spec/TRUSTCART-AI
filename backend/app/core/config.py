import os
import json
import logging
from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, field_validator

logger = logging.getLogger("trustcart.config")

DEV_DEFAULT_SECRET = "dev_insecure_secret_key_trustcart_2026_change_in_production"


class Settings(BaseSettings):
    PROJECT_NAME: str = "TRUSTCART AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    ENVIRONMENT: str = Field(default="development", description="Environment: development, test, staging, production")

    # Database: Default to SQLite for zero-setup local dev, PostgreSQL for production
    DATABASE_URL: str = Field(
        default="sqlite:///./trustcart.db",
        description="PostgreSQL or SQLite database connection URL"
    )

    # CORS origins: Must be explicit in production, never wildcard
    BACKEND_CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173"
    ]

    # JWT Authentication
    SECRET_KEY: str = Field(
        default=DEV_DEFAULT_SECRET,
        description="Cryptographic secret key for signing JWT tokens. MUST be set via environment in production."
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60  # 1 hour for secure rotation

    # Rate Limiting Defaults
    RATE_LIMIT_ENABLED: bool = True
    RATE_LIMIT_AUTH: str = "10/minute"
    RATE_LIMIT_ANALYSIS: str = "30/minute"
    RATE_LIMIT_GENERAL: str = "100/minute"

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

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            if v.strip().startswith("[") and v.strip().endswith("]"):
                try:
                    return json.loads(v)
                except Exception:
                    pass
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return []

    def validate_production_security(self) -> None:
        """Fail safely at startup if insecure configuration is detected in production."""
        is_prod = self.ENVIRONMENT.lower() in ("production", "prod", "staging")
        
        if is_prod:
            if not self.SECRET_KEY or self.SECRET_KEY == DEV_DEFAULT_SECRET:
                raise ValueError(
                    "CRITICAL SECURITY CONFIGURATION ERROR: "
                    "SECRET_KEY must be explicitly set via environment variable in production! "
                    "Refusing to boot with insecure development secret."
                )
            
            if "*" in self.BACKEND_CORS_ORIGINS:
                raise ValueError(
                    "CRITICAL SECURITY CONFIGURATION ERROR: "
                    "Wildcard '*' is forbidden in BACKEND_CORS_ORIGINS in production environments! "
                    "Specify exact allowed frontend domain origins."
                )
        else:
            if self.SECRET_KEY == DEV_DEFAULT_SECRET:
                logger.warning(
                    "[SECURITY NOTICE] Running in development mode with fallback SECRET_KEY. "
                    "Ensure a strong random SECRET_KEY is configured before deploying to production."
                )


settings = Settings()
settings.validate_production_security()
