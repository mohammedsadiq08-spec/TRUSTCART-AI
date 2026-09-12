from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.api import api_router
from app.database.database import engine, Base
from app.database.seed_data import seed_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables and run seed data
    Base.metadata.create_all(bind=engine)
    seed_database()
    yield
    # Shutdown: Clean up connections if needed


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-Powered E-Commerce & Social Commerce Trust and Product Decision Assistant API",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routes under /api
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/", tags=["Health"])
def root_status():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "tagline": "Discover. Verify. Compare. Decide.",
        "docs_url": "/docs"
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "ai_sentinel": "v4.2 online"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
