import uuid
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


def test_get_single_product_and_analysis():
    res = client.get("/api/products/sony-wh1000xm5")
    assert res.status_code == 200
    data = res.json()
    assert data["id"] == "sony-wh1000xm5"
    assert "Sony WH-1000XM5" in data["name"]

    res_analysis = client.get("/api/analysis/product/sony-wh1000xm5")
    assert res_analysis.status_code == 200
    analysis = res_analysis.json()
    assert analysis["trustScore"] >= 80
    assert "fiveLayers" in analysis


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


def test_sellers_and_prices():
    sellers_res = client.get("/api/sellers")
    assert sellers_res.status_code == 200
    sellers = sellers_res.json()
    assert len(sellers) > 0

    prices_res = client.get("/api/prices/product/sony-wh1000xm5/history")
    assert prices_res.status_code == 200
    prices = prices_res.json()
    assert len(prices) > 0
    assert "price" in prices[0]


def test_auth_and_user_flows():
    # 1. Register a new user
    reg_email = f"tester_{uuid.uuid4().hex[:8]}@trustcart.ai"
    reg_res = client.post("/api/auth/register", json={
        "email": reg_email,
        "password": "Password123!",
        "full_name": "Test Engineer"
    })
    assert reg_res.status_code in (200, 201)
    auth_data = reg_res.json()
    token = auth_data["access_token"]
    assert token is not None

    headers = {"Authorization": f"Bearer {token}"}

    # 2. Check /auth/me
    me_res = client.get("/api/auth/me", headers=headers)
    assert me_res.status_code == 200
    me_data = me_res.json()
    assert me_data["email"] == reg_email

    # 3. Update profile
    prof_res = client.patch("/api/users/me", headers=headers, json={
        "full_name": "Senior Test Engineer"
    })
    assert prof_res.status_code == 200
    assert prof_res.json()["full_name"] == "Senior Test Engineer"

    # 4. Save product & verify
    save_res = client.post("/api/products/sony-wh1000xm5/save", headers=headers)
    assert save_res.status_code == 200

    saved_list = client.get("/api/users/me/saved-products", headers=headers)
    assert saved_list.status_code == 200
    saved_items = saved_list.json()
    assert any(s["product_id"] == "sony-wh1000xm5" for s in saved_items)

    # 5. Unsave product
    unsave_res = client.delete("/api/products/sony-wh1000xm5/save", headers=headers)
    assert unsave_res.status_code == 200

    # 6. Update user preferences
    pref_res = client.post("/api/users/me/preferences", headers=headers, json={
        "comfortWeight": 45.0,
        "batteryWeight": 25.0,
        "soundWeight": 20.0,
        "micWeight": 10.0,
        "budget": 35000.0,
        "purpose": "Audiophile"
    })
    assert pref_res.status_code == 200
    pref_data = pref_res.json()
    assert pref_data["comfortWeight"] == 45.0
    assert pref_data["purpose"] == "Audiophile"
