# TRUSTCART AI — Discover. Verify. Compare. Decide.

**TRUSTCART AI** is an AI-powered **E-Commerce & Social Commerce Trust and Product Decision Assistant**.

The core purpose is **NOT** to sell products directly. The purpose is to help users discover products, investigate them, compare them, detect potential risks, understand customer reviews, evaluate sellers, and make smarter purchasing decisions.

---

## 🌟 Key Features

* **5-Layer Trust Scoring Engine**:
  * Review Credibility & Shannon Entropy (25%)
  * Seller Verification & Longevity (20%)
  * Product Reliability & Build Index (20%)
  * Price Intelligence & Artificial Markup Detector (15%)
  * Return Policies & Dispute Recourse (10%)
  * Authenticity & Dropship Risk Vectors (10%)
* **Decision Verdicts**: Decisive, transparent **BUY / WAIT / AVOID / INSUFFICIENT INFORMATION** verdicts with explainable evidence trees.
* **Fake Review & NLP Bot Detector**: Analyzes lexical diversity, repetitive syntax patterns, sentiment polarity, and unverified review bursts.
* **Social Commerce & Instagram DM Intelligence**: Analyzes Instagram/TikTok/WhatsApp shopping posts, detecting dropship markups and hidden terms.
* **Personalized Decision Persona**: Dynamic sliders allowing users to weigh comfort, battery, sound, mic quality, and budget.
* **Head-to-Head Comparison Matrix**: Multi-product side-by-side benchmarking.
* **User Trust Dashboard**: Secure watchlist/saved products, investigation history, and customizable profile settings.

---

## 🏗️ Architecture & Technology Stack

* **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite, React Router v6.
* **Backend**: FastAPI, Python 3.12, SQLAlchemy ORM, Alembic, SlowAPI rate limiting, Pydantic v2.
* **Database**: PostgreSQL (Production) / SQLite (Zero-setup local development).
* **Authentication**: JWT access tokens, bcrypt password hashing, dependency injection auth guards.
* **Integrations Foundation**: Modular provider interfaces in `backend/app/integrations/` for future external AI, Search, Product Data, Pricing, Vision, and Email services.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
* **Node.js**: v18+
* **Python**: v3.12+

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt

# Run database migrations
export PYTHONPATH=.
alembic upgrade head

# (Optional) Seed fixture data for local testing
python -m app.database.seed_data

# Start FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Backend API will be running at `http://localhost:8000`.
Interactive API Documentation (Swagger): `http://localhost:8000/docs`

### 3. Frontend Setup
```bash
# In the repository root:
npm install
npm run dev
```
Frontend application will be running at `http://localhost:3000`.

---

## 🧪 Testing

Run backend test suite:
```bash
cd backend
export PYTHONPATH=.
pytest tests/test_api.py -v
```

Build frontend for production:
```bash
npm run build
```

---

## 📖 Documentation Reference

* [ARCHITECTURE.md](file:///c:/TRUSTCART%20AI/ARCHITECTURE.md): System architecture, mathematical models, and AI engine design.
* [API.md](file:///c:/TRUSTCART%20AI/API.md): Comprehensive REST API endpoint reference and schemas.
* [DEPLOYMENT.md](file:///c:/TRUSTCART%20AI/DEPLOYMENT.md): Production deployment guides for Render and PostgreSQL.
* [SECURITY.md](file:///c:/TRUSTCART%20AI/SECURITY.md): Security architecture, rate limiting, and CORS specifications.
