import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database.seed_data import seed_database

client = TestClient(app)


@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    seed_database()


def test_root_and_health():
    res = client.get("/")
    assert res.status_code == 200
    assert res.json()["status"] == "online"

    health = client.get("/health")
    assert health.status_code == 200
    assert health.json()["status"] == "healthy"


def test_get_products():
    res = client.get("/api/products")
    assert res.status_code == 200
    data = res.json()
    assert len(data) > 0
    assert any(p["id"] == "sony-wh1000xm5" for p in data)


def test_analyze_product_link():
    res = client.post("/api/analysis/product", json={
        "input_text": "https://www.amazon.in/dp/B09XS7JWHH/Sony-WH-1000XM5",
        "mode": "link"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["id"] == "sony-wh1000xm5"
    assert data["recommendation"] == "BUY"
    assert data["trustScore"] >= 85
    assert "fiveLayers" in data
    assert "sellerDetails" in data
    assert "keyEvidence" in data


def test_analyze_custom_review_text():
    # Test genuine review
    res_good = client.post("/api/reviews/analyze", json={
        "review_text": "Battery lasted around 28 hours with ANC on during long study sessions. Incredibly comfortable, ANC cuts AC hum completely.",
        "rating": 4.0,
        "verified_purchase": True
    })
    assert res_good.status_code == 200
    data_good = res_good.json()
    assert data_good["suspicionScore"] < 30.0
    assert data_good["isSuspicious"] is False

    # Test bot pattern review
    res_bot = client.post("/api/reviews/analyze", json={
        "review_text": "BEST PRODUCT EVER 1000% RECOMMENDED BUY NOW SUPER FAST SHIPPING!!!!!",
        "rating": 5.0,
        "verified_purchase": False
    })
    assert res_bot.status_code == 200
    data_bot = res_bot.json()
    assert data_bot["suspicionScore"] >= 70.0
    assert data_bot["isSuspicious"] is True


def test_personalized_recommendations():
    res = client.post("/api/recommendations/personalized", json={
        "purpose": "Study",
        "budget": 30000.0,
        "comfortWeight": 40.0,
        "batteryWeight": 30.0,
        "soundWeight": 20.0,
        "micWeight": 10.0
    })
    assert res.status_code == 200
    data = res.json()
    assert data["productId"] == "sony-wh1000xm5"
    assert data["matchPercent"] >= 80.0


def test_social_commerce_analysis():
    res = client.post("/api/social/analyze", json={
        "url_or_text": "https://instagram.com/p/C9_SneakerHype_ViralDM",
        "platform": "Instagram"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["sellerRisk"] == "HIGH"
    assert "1,299" in data["extractedMarketPriceRange"]
