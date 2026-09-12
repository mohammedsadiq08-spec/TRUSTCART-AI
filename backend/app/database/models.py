import datetime
from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    Boolean,
    DateTime,
    ForeignKey,
    Text,
    JSON
)
from sqlalchemy.orm import relationship
from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    preferences = relationship("UserPreference", back_populates="user", cascade="all, delete-orphan")
    social_inputs = relationship("SocialProductInput", back_populates="user")


class Seller(Base):
    __tablename__ = "sellers"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    platform = Column(String(64), nullable=False, default="Amazon")
    profile_url = Column(String(512), nullable=True)
    rating = Column(Float, default=0.0)
    review_count = Column(Integer, default=0)
    location = Column(String(128), nullable=True)
    account_age = Column(String(64), default="1+ Year active")
    fulfillment_type = Column(String(64), default="Direct Platform")
    risk_level = Column(String(32), default="LOW")  # LOW, MEDIUM, HIGH
    return_policy = Column(String(255), default="7-Day Replacement Policy")
    warnings = Column(JSON, default=list)  # List of string warnings
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    products = relationship("Product", back_populates="seller")
    reviews = relationship("Review", back_populates="seller")


class Product(Base):
    __tablename__ = "products"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(512), nullable=False, index=True)
    description = Column(Text, nullable=True)
    category = Column(String(128), nullable=False, index=True)
    brand = Column(String(128), nullable=False, index=True)
    price = Column(Float, nullable=False)
    currency = Column(String(8), default="₹")
    original_price = Column(Float, nullable=True)
    image_url = Column(String(1024), nullable=True)
    source_platform = Column(String(64), nullable=False, default="Amazon")
    source_url = Column(String(1024), nullable=True)
    seller_id = Column(String(64), ForeignKey("sellers.id"), nullable=True)
    rating = Column(Float, default=0.0)
    review_count = Column(Integer, default=0)
    thirty_day_avg_price = Column(Float, default=0.0)
    all_time_low = Column(Float, default=0.0)
    market_min = Column(Float, default=0.0)
    market_max = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    seller = relationship("Seller", back_populates="products")
    reviews = relationship("Review", back_populates="product", cascade="all, delete-orphan")
    price_history = relationship("PriceHistory", back_populates="product", cascade="all, delete-orphan")
    analyses = relationship("ProductAnalysis", back_populates="product", cascade="all, delete-orphan")


class Review(Base):
    __tablename__ = "reviews"

    id = Column(String(64), primary_key=True, index=True)
    product_id = Column(String(64), ForeignKey("products.id"), nullable=False, index=True)
    seller_id = Column(String(64), ForeignKey("sellers.id"), nullable=True)
    author = Column(String(128), nullable=False)
    avatar_url = Column(String(512), nullable=True)
    review_text = Column(Text, nullable=False)
    rating = Column(Float, nullable=False)
    verified_purchase = Column(Boolean, default=True)
    reviewer_id = Column(String(64), nullable=True)
    review_date = Column(String(64), nullable=True)
    sentiment_score = Column(Float, default=0.0)  # -1.0 to +1.0 or 0 to 100
    credibility_score = Column(Float, default=80.0)  # 0 to 100
    suspicion_probability = Column(Float, default=10.0)  # 0 to 100
    credibility_label = Column(String(64), default="High Credibility")
    detected_signals = Column(JSON, default=list)  # List of string signals
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    product = relationship("Product", back_populates="reviews")
    seller = relationship("Seller", back_populates="reviews")


class PriceHistory(Base):
    __tablename__ = "price_history"

    id = Column(String(64), primary_key=True, index=True)
    product_id = Column(String(64), ForeignKey("products.id"), nullable=False, index=True)
    price = Column(Float, nullable=False)
    avg_price = Column(Float, nullable=False)
    source = Column(String(64), default="Amazon")
    recorded_date = Column(String(32), nullable=False)  # e.g. "1 Aug", "10 Sep"
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    product = relationship("Product", back_populates="price_history")


class ProductAnalysis(Base):
    __tablename__ = "product_analyses"

    id = Column(String(64), primary_key=True, index=True)
    product_id = Column(String(64), ForeignKey("products.id"), nullable=False, index=True)
    review_trust_score = Column(Float, default=80.0)
    seller_trust_score = Column(Float, default=80.0)
    price_intelligence_score = Column(Float, default=80.0)
    product_quality_score = Column(Float, default=80.0)
    purchase_risk = Column(String(32), default="LOW")  # LOW, MEDIUM, HIGH
    overall_trust_score = Column(Float, default=80.0)
    recommendation = Column(String(16), default="BUY")  # BUY, WAIT, AVOID
    confidence = Column(Float, default=85.0)  # percentage
    decision_summary = Column(Text, nullable=True)
    positive_evidence = Column(JSON, default=list)
    caution_evidence = Column(JSON, default=list)
    risk_factors = Column(JSON, default=list)
    raw_telemetry = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    product = relationship("Product", back_populates="analyses")


class UserPreference(Base):
    __tablename__ = "user_preferences"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id"), nullable=True, index=True)
    category = Column(String(128), default="Audio & Electronics")
    budget = Column(Float, default=30000.0)
    purpose = Column(String(64), default="Study")  # Study, Office, Gaming, Fitness, Audiophile
    comfort_weight = Column(Float, default=40.0)
    battery_weight = Column(Float, default=30.0)
    sound_weight = Column(Float, default=20.0)
    mic_weight = Column(Float, default=10.0)
    preferences = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="preferences")


class SocialProductInput(Base):
    __tablename__ = "social_product_inputs"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), ForeignKey("users.id"), nullable=True)
    source_platform = Column(String(32), default="Instagram")  # Instagram, WhatsApp, Telegram
    source_url = Column(String(1024), nullable=True)
    image_url = Column(String(1024), nullable=True)
    raw_post_title = Column(String(512), nullable=True)
    seller_handle = Column(String(128), nullable=True)
    posted_price_claim = Column(String(128), nullable=True)
    extracted_text = Column(Text, nullable=True)
    identified_product = Column(String(255), nullable=True)
    market_price_range = Column(String(128), nullable=True)
    seller_risk = Column(String(32), default="HIGH")
    return_info_status = Column(String(64), default="Unknown / Hidden")
    reverse_image_origin = Column(String(255), nullable=True)
    flagged_warning = Column(Text, nullable=True)
    confidence_score = Column(Float, default=90.0)
    analysis_status = Column(String(32), default="COMPLETED")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="social_inputs")
