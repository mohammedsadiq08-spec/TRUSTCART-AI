from fastapi import APIRouter
from app.api.routes import (
    auth,
    users,
    products,
    analysis,
    reviews,
    sellers,
    prices,
    recommendations,
    social
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users & Dashboard"])
api_router.include_router(products.router, prefix="/products", tags=["Products"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["5-Layer Trust Analysis"])
api_router.include_router(reviews.router, prefix="/reviews", tags=["Review Intelligence"])
api_router.include_router(sellers.router, prefix="/sellers", tags=["Seller Forensics"])
api_router.include_router(prices.router, prefix="/prices", tags=["Price Intelligence"])
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["Recommendations"])
api_router.include_router(social.router, prefix="/social", tags=["Social Commerce"])
