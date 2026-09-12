# TRUSTCART AI — System Architecture

**Tagline:** *Discover. Verify. Compare. Decide.*  
**Purpose:** AI-powered E-Commerce & Social Commerce Trust and Product Decision Assistant.

---

```mermaid
flowchart TB
    subgraph Frontend["Frontend Layer (React + TypeScript + Tailwind)"]
        UI_Nav[Navbar & Brand System]
        UI_Hero[Hero & Live Telemetry Gauge]
        UI_Console[Investigation Console\n(Link / Image / Search)]
        UI_Engine[5-Layer Trust Explorer]
        UI_Reviews[AI Review Credibility Tester]
        UI_Price[Price Intelligence & History Chart]
        UI_Personal[Explainable Persona Sliders]
        UI_Compare[Head-to-Head Comparison Matrix]
        UI_Modal[Full Forensic Dossier Modal]
        API_Client[src/services/api.ts Client]
    end

    subgraph Backend["Backend Layer (FastAPI + Python 3.12)"]
        Router[API Router /api]
        
        subgraph Services["Core Services Layer"]
            ProdService[Product Service]
            ReviewService[Review Service]
            SellerService[Seller Service]
            PriceService[Price Service]
            RecService[Recommendation Service]
            SocialService[Social Commerce Service]
            ScoringService[Centralized Scoring Service]
        end

        subgraph AIEngines["Modular AI Layer"]
            NLP_Review[Review Analyzer & Shannon Entropy]
            Fake_Detect[Suspicion Probability Detector]
            Sentiment[Sentiment & Polarity Engine]
            Seller_AI[Seller Legitimacy & Dispute Auditor]
            Price_AI[Price Volatility & Artificial Spike Detector]
            Risk_Engine[Multi-Vector Risk Classifier (LOW/MED/HIGH)]
            Rec_Engine[BUY / WAIT / AVOID Synthesizer]
            Explain_AI[Explainable Rationale & Telemetry Generator]
        end
    end

    subgraph Database["Database Layer (PostgreSQL / SQLAlchemy)"]
        T_Products[(products)]
        T_Sellers[(sellers)]
        T_Reviews[(reviews)]
        T_PriceHistory[(price_history)]
        T_Analyses[(product_analyses)]
        T_Preferences[(user_preferences)]
        T_Social[(social_product_inputs)]
    end

    UI_Console --> API_Client
    UI_Reviews --> API_Client
    UI_Personal --> API_Client
    API_Client --> Router

    Router --> Services
    Services --> AIEngines
    Services --> Database
```

---

## 1. Architectural Philosophy
TRUSTCART AI is deliberately engineered as a **decision assistant**, not a direct store. The system strictly separates **probabilistic suspicion signals** from **confirmed certainties**, providing mathematical transparency without biased commercial affiliation.

---

## 2. Frontend Layer (React + TypeScript + Tailwind CSS)
* **Design Philosophy:** Futuristic, financial-grade dark palette (`#080A0F`), subtle glass surfaces, large typographic hierarchy, and responsive micro-interactions.
* **Component Modularity:** Reusable, clean separation between view components and data layers.
* **Resilient API Client (`src/services/api.ts`):** 
  * Configurable via `VITE_API_BASE_URL`.
  * Automatic graceful fallback to cached/offline data if the backend server is unreachable.
  * Timeout protections and live state transitions (`isScanning`).

---

## 3. Backend Layer (FastAPI + Python 3.12)
* **Architecture:** Layered REST micro-architecture (`api/routes`, `core`, `database`, `schemas`, `services`, `ai`, `utils`).
* **Dependency Injection:** Database sessions and request contextual schemas managed via FastAPI's `Depends()`.
* **Centralized Configuration:** Managed through Pydantic `BaseSettings` (`backend/app/core/config.py`).

---

## 4. Database Layer (PostgreSQL / SQLAlchemy)
* **Tables:**
  1. `users`: Account identities & authentication hashes.
  2. `sellers`: Merchant credentials, platform, rating, account longevity, dispute history, and return compliance.
  3. `products`: Catalog items, price benchmarks, 30-day averages, all-time lows, and market ranges.
  4. `reviews`: Customer feedback records with NLP sentiment scores, credibility labels, and suspicion probabilities.
  5. `price_history`: Chronological historical price tracking points.
  6. `product_analyses`: Cached 5-layer audit dossiers with explainable evidence trees.
  7. `user_preferences`: Stored persona weightings (Comfort, Battery, Sound, Mic).
  8. `social_product_inputs`: Reverse-image and social post extraction dossiers.

---

## 5. Centralized Trust Scoring Engine
$$Overall\_Trust = \frac{\sum (Score_i \times Weight_i)}{\sum Weight_i}$$

* **Configurable Weights:**
  * Review Trust: **25%**
  * Seller Trust: **20%**
  * Product Quality: **20%**
  * Price Value: **15%**
  * Return Information & Dispute Recourse: **10%**
  * Authenticity / Risk Vector: **10%**

* **Configurable Risk Thresholds:**
  * `0 – 39` → **HIGH RISK** (Triggers `AVOID`)
  * `40 – 69` → **MEDIUM RISK** (Triggers `WAIT` or caution flags)
  * `70 – 100` → **LOW RISK** (Eligible for `BUY` if price is favorable)

---

## 6. Recommendation & Explainable AI Engine
Recommendations do **not** rely solely on raw star ratings:
* **BUY**: High overall trust ($\ge 75$), acceptable low risk, and price within favorable historical quartile.
* **WAIT**: Product and seller are legitimate, but current price is elevated above 30-day mean or imminent sale cycle is predicted.
* **AVOID**: High risk tier ($< 40$ trust), unverified dropship funnel, or severe review manipulation anomalies.

Every recommendation delivers a transparent **"Why?"** evidence tree and a deterministic cryptographic telemetry hash (`#tc_xxxxxxxx`).

---

## 7. Social Commerce Extraction Pipeline
1. **Intake:** Public link, user-provided image/screenshot, or text description.
2. **Text & Vision Extraction:** OCR and attribute deconstruction.
3. **Similarity Matching:** Cross-references open wholesale registries and catalog indexes.
4. **Market Price Discovery:** Exposes artificial "DM for Price" markups vs true wholesale pricing.
5. **Entity Risk Audit:** Verifies merchant longevity, account name changes, and return dispute rights.
