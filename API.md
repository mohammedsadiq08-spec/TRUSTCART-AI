# TRUSTCART AI — Backend API Reference & Specifications

TRUSTCART AI provides a high-performance REST API powered by **FastAPI**, **SQLAlchemy ORM**, **Pydantic v2**, and modular **Forensic AI Sub-Engines**.

Base URL: `http://localhost:8000/api` (Local Dev) or configured production domain.
Interactive Swagger Documentation: `http://localhost:8000/docs`
ReDoc Documentation: `http://localhost:8000/redoc`

---

## 1. Authentication & Security (`/api/auth`)

All secured endpoints require an `Authorization: Bearer <access_token>` header.

### `POST /api/auth/register`
Creates a new user account and returns an active JWT session token.
- **Payload**:
  ```json
  {
    "full_name": "Alex Morgan",
    "email": "alex@trustcart.ai",
    "password": "password123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "access_token": "eyJhbGciOi...",
    "token_type": "bearer",
    "user_id": "usr_7a8b9c1d2e3f",
    "email": "alex@trustcart.ai",
    "full_name": "Alex Morgan"
  }
  ```

### `POST /api/auth/login`
Authenticates existing credentials and returns a new JWT access token.
- **Payload**:
  ```json
  {
    "email": "alex@trustcart.ai",
    "password": "password123"
  }
  ```

### `GET /api/auth/me` *(Protected)*
Returns currently authenticated user identification.

### `POST /api/auth/logout` *(Protected)*
Logs out the user and clears session context.

---

## 2. Users & Dashboard (`/api/users`)

### `GET /api/users/me` *(Protected)*
Returns user profile metadata, statistics, and analysis history count.

### `PATCH /api/users/me` *(Protected)*
Updates profile fields (name, password).

### `GET /api/users/me/saved-products` *(Protected)*
Returns all bookmarked/watchlist items for the current user.

### `GET /api/users/me/analysis-history` *(Protected)*
Returns chronological list of all forensic analyses executed by the user.

### `GET /api/users/me/preferences` *(Protected)*
Fetches saved trust weightings and persona priorities.

### `POST /api/users/me/preferences` *(Protected)*
Persists updated priority weights (Comfort, Battery, Sound, Mic, Budget, Purpose).

---

## 3. Product Intelligence (`/api/products`)

### `GET /api/products`
Lists all catalog products with pricing and seller linkage.
- Query Parameters: `limit` (default 20, max 100).

### `GET /api/products/{id}`
Returns details for a single product.

### `POST /api/products/search`
Multi-field full-text search across titles, brands, and categories.
- **Payload**:
  ```json
  {
    "query": "Sony ANC Headphones",
    "category": "Electronics",
    "limit": 10
  }
  ```

### `POST /api/products/compare`
Executes head-to-head comparison between 2 to 4 product IDs.
- **Payload**:
  ```json
  {
    "product_ids": ["sony-wh1000xm5", "bose-qc45", "apple-airpods-max"]
  }
  ```

### `POST /api/products/{id}/save` *(Protected)*
Saves product to authenticated user’s watchlist.

### `DELETE /api/products/{id}/save` *(Protected)*
Removes product from authenticated user’s watchlist.

---

## 4. 5-Layer Trust Analysis (`/api/analysis`)

### `POST /api/analysis/product`
Forensic analysis of a product URL, title, or image input.
- **Payload**:
  ```json
  {
    "input_text": "https://www.amazon.in/dp/B09XS7JWHH/Sony-WH-1000XM5",
    "mode": "link"
  }
  ```
- **Response Structure**:
  - `trustScore`: Overall score out of 100.
  - `recommendation`: `"BUY"` | `"WAIT"` | `"AVOID"`.
  - `confidence`: AI confidence percentage.
  - `fiveLayers`:
    - `reviewTrust`: 0–100
    - `sellerTrust`: 0–100
    - `priceIntelligence`: 0–100
    - `productReliability`: 0–100
    - `purchaseRisk`: `"LOW"` | `"MEDIUM"` | `"HIGH"`
  - `sellerDetails`: Entity forensics, age, fulfillment type, warnings.
  - `keyEvidence`: Positive signals, cautions, risk vectors.

### `GET /api/analysis/product/{id}`
Retrieves existing full investigation dossier for a specific product.

---

## 5. Review Intelligence (`/api/reviews`)

### `POST /api/reviews/analyze`
Performs NLP bot pattern analysis, sentiment scoring, and deceptive language detection.
- **Payload**:
  ```json
  {
    "review_text": "Battery lasted around 28 hours with ANC on during long study sessions. Incredibly comfortable.",
    "rating": 4.5,
    "verified_purchase": true
  }
  ```
- **Response**:
  - `suspicionScore`: 0–100 (higher = more likely fake)
  - `isSuspicious`: boolean
  - `detectedPatterns`: List of triggers (e.g. `"Deceptive Superlative Cluster"`, `"Keyword Stuffing"`)
  - `sentiment`: `"POSITIVE"` | `"NEUTRAL"` | `"NEGATIVE"`

---

## 6. Seller Forensics (`/api/sellers`)

### `GET /api/sellers`
Lists all verified and flagged merchant entities.

### `GET /api/sellers/{id}`
Returns merchant entity details and track record.

### `POST /api/sellers/analyze`
Evaluates seller trustworthiness, delivery channel, return policies, and scam probability.

---

## 7. Price Intelligence (`/api/prices`)

### `GET /api/prices/product/{id}/history`
Returns chronological price timeline points and moving averages.

### `POST /api/prices/product/{id}/analysis`
Calculates whether a discount is genuine or inflated, and gives a `BUY NOW` vs `WAIT FOR SALE` verdict.

---

## 8. Personalized Recommendations (`/api/recommendations`)

### `POST /api/recommendations/personalized`
Calculates optimal product match based on user weightings.
- **Payload**:
  ```json
  {
    "purpose": "Study",
    "budget": 30000.0,
    "comfortWeight": 40.0,
    "batteryWeight": 30.0,
    "soundWeight": 20.0,
    "micWeight": 10.0
  }
  ```

### `GET /api/recommendations/decision-matrix/{category}`
Returns decision matrix thresholds and case studies for a category.

---

## 9. Social Commerce Intelligence (`/api/social`)

### `POST /api/social/analyze`
Analyzes Instagram/TikTok/WhatsApp seller posts, sponsored reels, and DM shopping links.
- Returns seller drop-ship risk, market price comparisons, and safety checklists.
