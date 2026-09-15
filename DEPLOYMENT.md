# TRUSTCART AI — Production Deployment Guide

This guide details instructions for deploying TRUSTCART AI to production on **Render** (or any modern cloud container platform) with a managed **PostgreSQL** database.

---

## 1. Environment Architecture

* **Frontend**: Static React Single Page Application (SPA) built with Vite and served via CDN (Render Static Site / Vercel / Netlify / Cloudflare Pages).
* **Backend**: FastAPI asynchronous Python 3.12 service running via Uvicorn.
* **Database**: PostgreSQL 15+ managed instance with SQLAlchemy ORM and Alembic migrations.

---

## 2. Environment Variables

### Backend Production Configuration
| Variable Name | Required | Example / Description |
| :--- | :---: | :--- |
| `ENVIRONMENT` | Yes | `production` |
| `DATABASE_URL` | Yes | `postgresql://user:password@host:5432/trustcart` |
| `SECRET_KEY` | Yes | 32-byte secure random hex key (`openssl rand -hex 32`) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | `60` (Default: 60 minutes) |
| `BACKEND_CORS_ORIGINS` | Yes | `["https://trustcart.ai","https://trustcart-ai.onrender.com"]` *(Wildcard `*` is strictly blocked in production)* |
| `RATE_LIMIT_ENABLED` | No | `true` |
| `RATE_LIMIT_AUTH` | No | `10/minute` |
| `RATE_LIMIT_ANALYSIS` | No | `30/minute` |

### Frontend Production Configuration
| Variable Name | Required | Example / Description |
| :--- | :---: | :--- |
| `VITE_API_BASE_URL` | Yes | `https://api.trustcart.ai/api` or `https://trustcart-backend.onrender.com/api` |

---

## 3. Deployment Steps on Render

### Step 1: Create Managed PostgreSQL Database
1. In the Render Dashboard, click **New +** → **PostgreSQL**.
2. Name: `trustcart-db`.
3. Database: `trustcart`.
4. User: `trustcart_user`.
5. Select the appropriate instance type and click **Create Database**.
6. Copy the **Internal Connection String** (or rely on `render.yaml`).

### Step 2: Deploy Backend Web Service
1. In Render, select **New +** → **Web Service** (or use the Blueprint in `backend/render.yaml`).
2. Connect your Git repository.
3. Configure settings:
   - **Root Directory**: `backend`
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt && alembic upgrade head`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add the required environment variables listed above.

### Step 3: Deploy Frontend Static Site
1. Select **New +** → **Static Site**.
2. Configure settings:
   - **Root Directory**: `.` (or project root)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
3. Add Environment Variable:
   - `VITE_API_BASE_URL`: `https://<your-backend-service>.onrender.com/api`
4. Set up Rewrite Rule for React Router:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`

---

## 4. Database Migrations

Alembic manages all schema migrations.

To apply migrations manually:
```bash
cd backend
export PYTHONPATH=.
alembic upgrade head
```

To rollback a migration:
```bash
alembic downgrade -1
```

---

## 5. Development Data Seeding

Seed data does **not** run automatically on production boot.

To seed fixture data in development:
```bash
cd backend
export PYTHONPATH=.
python -m app.database.seed_data
```

To seed without the demo user account:
```bash
python -m app.database.seed_data --no-demo-user
```
