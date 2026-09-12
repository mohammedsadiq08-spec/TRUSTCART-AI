# TRUSTCART AI — Backend API

**Tagline:** *Discover. Verify. Compare. Decide.*  
**Framework:** FastAPI (Python 3.12+)  
**Database:** PostgreSQL (SQLAlchemy ORM with SQLite local fallback)  
**AI Layer:** Scikit-Learn, PyTorch / Transformers compatible interfaces

---

## 1. Project Overview
TRUSTCART AI is an AI-powered **E-Commerce and Social Commerce Trust & Product Decision Assistant**.
The core mission is not to sell products directly, but to investigate products, calculate multi-vector trust signals, detect fake review bursts, audit seller longevity, evaluate price fluctuations, and deliver explainable **BUY / WAIT / AVOID** decisions.

---

## 2. Folder Structure
```
backend/
├── app/
│   ├── main.py                     # FastAPI app with CORS & lifespan initialization
│   ├── api/
│   │   ├── api.py                  # API route aggregator
│   │   └── routes/
│   │       ├── products.py         # Catalog query, search, comparison
│   │       ├── analysis.py         # 5-layer trust & investigation dossier endpoints
│   │       ├── reviews.py          # Review retrieval & live NLP analyzer
│   │       ├── sellers.py          # Seller pedigree & forensic profile
│   │       ├── prices.py           # Price trend history & timing advice
│   │       ├── recommendations.py  # BUY/WAIT/AVOID & personalized matches
│   │       └── social.py           # Social commerce / reverse image discovery
│   ├── core/
│   │   ├── config.py               # Pydantic Settings (weights, thresholds, DB URL)
│   │   └── security.py             # Password hashing & JWT token handling
│   ├── database/
│   │   ├── database.py             # SQLAlchemy session manager & engine
│   │   ├── models.py               # Database ORM models
│   │   └── seed_data.py            # Rich realistic database seeder
│   ├── schemas/
│   │   ├── product.py              # Product Pydantic schemas
│   │   ├── review.py               # Review Pydantic schemas
│   │   ├── seller.py               # Seller Pydantic schemas
│   │   ├── analysis.py             # Investigation Dossier schemas
│   │   ├── recommendation.py       # Decision & Personalization schemas
│   │   └── social.py               # Social Commerce schemas
│   ├── services/
│   │   ├── product_service.py      # Product business logic
│   │   ├── review_service.py       # Review querying & batch analysis
│   │   ├── seller_service.py       # Seller trust auditing
│   │   ├── price_service.py        # Historical price tracking & market range
│   │   ├── recommendation_service.py # BUY / WAIT / AVOID pipeline
│   │   ├── social_service.py       # Social post extraction & OCR pipeline
│   │   └── scoring_service.py      # Centralized configurable 5-layer trust scorer
│   ├── ai/
│   │   ├── review_analyzer.py      # NLP linguistic distribution & entropy analyzer
│   │   ├── fake_review_detector.py # Suspicious patterns, bot bursts & templates
│   │   ├── sentiment_analyzer.py   # Aspect-based & polarity sentiment scoring
│   │   ├── seller_trust.py         # Seller legitimacy & dispute probability
│   │   ├── price_intelligence.py   # Price volatility, discount validity & deal advice
│   │   ├── product_similarity.py   # Cross-catalog matching & embeddings
│   │   ├── risk_engine.py          # Multi-vector risk calculator (LOW/MED/HIGH)
│   │   ├── recommendation_engine.py# Decision tree synthesizer
│   │   └── explainable_ai.py       # Evidence extraction & rationale generation
│   └── utils/
│       ├── validators.py           # URL & input sanitizers
│       └── scoring.py              # Normalization formulas & weight matrices
├── tests/
│   └── test_api.py                 # Automated pytest suite
├── requirements.txt
├── .env.example
└── README.md
```

---

## 3. Database Setup
The application uses SQLAlchemy ORM and supports both **PostgreSQL** and **SQLite**:
* **PostgreSQL (Production/Staging):** Set `DATABASE_URL=postgresql://user:password@localhost:5432/trustcart_db` in `.env`.
* **SQLite (Local Development):** Defaults to `sqlite:///./trustcart.db` when no PostgreSQL URL is supplied.

On initial startup, tables are automatically created and populated with realistic seed data (12+ products, 6+ sellers, 100+ reviews, and historical price points).

---

## 4. How to Run the Backend
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server with live reload
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
API Documentation will be live at:
* **Swagger UI:** `http://localhost:8000/docs`
* **ReDoc:** `http://localhost:8000/redoc`

---

## 5. How to Run the Frontend
```bash
# In the project root
npm install
npm run dev
```
Frontend runs on: `http://localhost:3000/`

---

## 6. API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Root service status & version |
| `GET` | `/health` | Health check & AI sentinel heartbeat |
| `GET` | `/api/products` | Retrieve catalog products |
| `GET` | `/api/products/{id}` | Get product details by ID |
| `POST` | `/api/products/search` | Search products across title/brand/category |
| `POST` | `/api/products/compare` | Head-to-head comparison across 3 products |
| `POST` | `/api/analysis/product` | **Main Investigation Flow**: Analyze link/query/image context |
| `GET` | `/api/analysis/product/{id}` | Retrieve full 5-layer forensic dossier |
| `GET` | `/api/reviews/product/{id}` | Get analyzed customer reviews |
| `POST` | `/api/reviews/analyze` | Real-time NLP entropy & suspicion scorer for custom text |
| `GET` | `/api/sellers/{id}` | Retrieve seller entity profile |
| `POST` | `/api/sellers/analyze` | Audit seller risk & longevity |
| `GET` | `/api/prices/product/{id}/history` | Historical price timeline |
| `POST` | `/api/prices/product/{id}/analysis` | Price volatility & BUY NOW / WAIT advice |
| `POST` | `/api/recommendations/personalized` | Recalculate persona match score from weights |
| `GET` | `/api/recommendations/matrix` | Algorithmic criteria for BUY / WAIT / AVOID |
| `POST` | `/api/social/analyze` | Social Commerce / Instagram DM forensic extractor |

---

## 7. Running Tests
```bash
pytest tests/test_api.py -v
```

---

## 8. Future AI Modules Roadmap
1. **Transformer-based aspect sentiment extraction:** Fine-tuned RoBERTa on consumer electronics and fashion.
2. **Computer Vision OCR & Reverse Image Retrieval:** Embeddings using CLIP/SigLIP against wholesale export catalogs.
3. **Vector Database Integration:** pgvector / FAISS for semantic cross-merchant product deduplication.
