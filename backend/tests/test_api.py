import uuid
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database.seed_data import seed_database
from app.core.config import settings
from app.services.scoring_service import scoring_service
from app.ai.recommendation_engine import recommendation_engine

client = TestClient(app)


@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    seed_database(include_demo_user=True, force=False)


# ----------------------------------------------------
# 1. Health & Root Endpoints
# ----------------------------------------------------
def test_root_and_health():
    res = client.get("/")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "online"
    assert "version" in data
    assert "tagline" in data

    health = client.get("/health")
    assert health.status_code == 200
    assert health.json()["status"] == "healthy"
    assert health.json()["database"] == "connected"


def test_security_headers_present():
    res = client.get("/health")
    assert res.status_code == 200
    assert "X-Request-ID" in res.headers
    assert res.headers.get("X-Content-Type-Options") == "nosniff"
    assert res.headers.get("X-Frame-Options") == "DENY"
    assert res.headers.get("Referrer-Policy") == "strict-origin-when-cross-origin"


# ----------------------------------------------------
# 2. Authentication Tests (Registration, Login, Errors)
# ----------------------------------------------------
def test_auth_registration_success():
    email = f"user_{uuid.uuid4().hex[:8]}@trustcart.ai"
    res = client.post("/api/auth/register", json={
        "full_name": "Jordan Bell",
        "email": email,
        "password": "SecurePassword123!"
    })
    assert res.status_code == 200
    data = res.json()
    assert "access_token" in data
    assert data["email"] == email
    assert data["full_name"] == "Jordan Bell"


def test_auth_registration_duplicate_email():
    email = f"user_dup_{uuid.uuid4().hex[:8]}@trustcart.ai"
    # First registration
    client.post("/api/auth/register", json={
        "full_name": "Original User",
        "email": email,
        "password": "Password123!"
    })
    # Second registration with duplicate email
    res = client.post("/api/auth/register", json={
        "full_name": "Duplicate User",
        "email": email,
        "password": "Password456!"
    })
    assert res.status_code == 400
    assert "already exists" in res.json()["message"]


def test_auth_registration_validation_errors():
    # Invalid email format
    res_bad_email = client.post("/api/auth/register", json={
        "full_name": "Bad Email",
        "email": "not-an-email",
        "password": "Password123!"
    })
    assert res_bad_email.status_code == 422

    # Short password
    res_short_pwd = client.post("/api/auth/register", json={
        "full_name": "Short Pwd",
        "email": "valid@trustcart.ai",
        "password": "123"
    })
    assert res_short_pwd.status_code == 422


def test_auth_login_success_and_invalid():
    email = f"login_test_{uuid.uuid4().hex[:8]}@trustcart.ai"
    password = "MyStrongPassword123!"

    # Register
    client.post("/api/auth/register", json={
        "full_name": "Login Tester",
        "email": email,
        "password": password
    })

    # Valid Login
    login_res = client.post("/api/auth/login", json={
        "email": email,
        "password": password
    })
    assert login_res.status_code == 200
    assert "access_token" in login_res.json()

    # Invalid Password (Generic message to prevent enumeration)
    bad_login = client.post("/api/auth/login", json={
        "email": email,
        "password": "WrongPassword!"
    })
    assert bad_login.status_code == 401
    assert "Invalid email or password" in bad_login.json()["message"]


def test_auth_logout_behavior():
    res = client.post("/api/auth/logout")
    assert res.status_code == 200
    assert res.json()["status"] == "success"


def test_protected_route_rejection():
    # Unauthenticated request to /api/auth/me
    res = client.get("/api/auth/me")
    assert res.status_code == 401


# ----------------------------------------------------
# 3. User Data Isolation & IDOR Tests
# ----------------------------------------------------
def test_user_data_isolation():
    # Create User A
    user_a_email = f"user_a_{uuid.uuid4().hex[:8]}@trustcart.ai"
    res_a = client.post("/api/auth/register", json={
        "full_name": "User Alpha",
        "email": user_a_email,
        "password": "PasswordAlpha123!"
    })
    token_a = res_a.json()["access_token"]
    headers_a = {"Authorization": f"Bearer {token_a}"}

    # Create User B
    user_b_email = f"user_b_{uuid.uuid4().hex[:8]}@trustcart.ai"
    res_b = client.post("/api/auth/register", json={
        "full_name": "User Beta",
        "email": user_b_email,
        "password": "PasswordBeta123!"
    })
    token_b = res_b.json()["access_token"]
    headers_b = {"Authorization": f"Bearer {token_b}"}

    # User A saves a product
    client.post("/api/products/sony-wh1000xm5/save", headers=headers_a)

    # User A sets unique preferences
    client.post("/api/users/me/preferences", headers=headers_a, json={
        "comfortWeight": 50.0,
        "batteryWeight": 20.0,
        "soundWeight": 20.0,
        "micWeight": 10.0,
        "budget": 45000.0,
        "purpose": "Audiophile"
    })

    # Verify User A sees saved product & preferences
    saved_a = client.get("/api/users/me/saved-products", headers=headers_a).json()
    assert any(p["product_id"] == "sony-wh1000xm5" for p in saved_a)

    prefs_a = client.get("/api/users/me/preferences", headers=headers_a).json()
    assert prefs_a["comfortWeight"] == 50.0
    assert prefs_a["purpose"] == "Audiophile"

    # Verify User B has NO access to User A's saved product or preferences (Isolated)
    saved_b = client.get("/api/users/me/saved-products", headers=headers_b).json()
    assert len(saved_b) == 0

    prefs_b = client.get("/api/users/me/preferences", headers=headers_b).json()
    assert prefs_b["comfortWeight"] == 40.0  # Default


# ----------------------------------------------------
# 4. Trust Engine, Weights, Thresholds & Insufficient Evidence
# ----------------------------------------------------
def test_trust_scoring_weights():
    # Test scoring service with known weights
    result = scoring_service.calculate_overall_trust(
        review_trust=80.0,
        seller_trust=90.0,
        product_quality=85.0,
        price_intelligence=75.0,
        return_info_score=90.0,
        authenticity_score=95.0
    )
    score = result["overall_trust_score"]
    assert 80.0 <= score <= 90.0
    assert result["risk_tier"] == "LOW"


def test_recommendation_verdicts_and_insufficient_data():
    # 1. Low risk + Good price -> BUY
    buy_decision = recommendation_engine.decide(
        overall_trust_score=88.0,
        purchase_risk="LOW",
        price_intelligence_score=82.0,
        seller_trust_score=90.0,
        review_trust_score=85.0,
        product_quality_score=88.0
    )
    assert buy_decision["recommendation"] == "BUY"

    # 2. High risk -> AVOID
    avoid_decision = recommendation_engine.decide(
        overall_trust_score=35.0,
        purchase_risk="HIGH",
        price_intelligence_score=60.0,
        seller_trust_score=30.0,
        review_trust_score=40.0,
        product_quality_score=50.0
    )
    assert avoid_decision["recommendation"] == "AVOID"

    # 3. Unfavorable timing / price inflation -> WAIT
    wait_decision = recommendation_engine.decide(
        overall_trust_score=82.0,
        purchase_risk="LOW",
        price_intelligence_score=55.0,
        seller_trust_score=85.0,
        review_trust_score=80.0,
        product_quality_score=80.0
    )
    assert wait_decision["recommendation"] == "WAIT"

    # 4. Insufficient Information state
    insufficient_decision = recommendation_engine.decide(
        overall_trust_score=0.0,
        purchase_risk="LOW",
        price_intelligence_score=0.0,
        seller_trust_score=0.0,
        review_trust_score=0.0,
        product_quality_score=0.0,
        has_sufficient_data=False
    )
    assert insufficient_decision["recommendation"] == "INSUFFICIENT INFORMATION"
    assert insufficient_decision["confidence"] == 0.0


# ----------------------------------------------------
# 5. Product & Analysis API Tests
# ----------------------------------------------------
def test_get_products_list():
    res = client.get("/api/products")
    assert res.status_code == 200
    data = res.json()
    assert len(data) > 0
    assert any(p["id"] == "sony-wh1000xm5" for p in data)


def test_analyze_product_link_flow():
    res = client.post("/api/analysis/product", json={
        "input_text": "https://www.amazon.in/dp/B09XS7JWHH/Sony-WH-1000XM5",
        "mode": "link"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["id"] == "sony-wh1000xm5"
    assert data["recommendation"] in ("BUY", "WAIT", "AVOID")
    assert "fiveLayers" in data
    assert "sellerDetails" in data
    assert "keyEvidence" in data


def test_malformed_url_rejection():
    # JavaScript scheme rejection
    res = client.post("/api/analysis/product", json={
        "input_text": "javascript:alert(1)",
        "mode": "link"
    })
    assert res.status_code == 422


# ----------------------------------------------------
# 6. Review Analysis & NLP NLP Tests
# ----------------------------------------------------
def test_analyze_review_nlp():
    # Genuine review
    res_good = client.post("/api/reviews/analyze", json={
        "review_text": "Battery lasted around 28 hours with ANC on during study sessions. Incredibly comfortable ear cushions.",
        "rating": 4.5,
        "verified_purchase": True
    })
    assert res_good.status_code == 200
    assert res_good.json()["isSuspicious"] is False

    # Deceptive Bot pattern
    res_bot = client.post("/api/reviews/analyze", json={
        "review_text": "BEST PRODUCT EVER 1000% RECOMMENDED BUY NOW SUPER FAST SHIPPING!!!!!",
        "rating": 5.0,
        "verified_purchase": False
    })
    assert res_bot.status_code == 200
    assert res_bot.json()["isSuspicious"] is True


# ----------------------------------------------------
# 7. Social Commerce Analysis
# ----------------------------------------------------
def test_social_commerce_analysis():
    res = client.post("/api/social/analyze", json={
        "url_or_text": "https://instagram.com/p/C9_SneakerHype_ViralDM",
        "platform": "Instagram"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["sellerRisk"] == "HIGH"
    assert "1,299" in data["extractedMarketPriceRange"]
