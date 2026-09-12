from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.price_service import price_service

router = APIRouter()


@router.get("/product/{product_id}/history")
def get_product_price_history(
    product_id: str,
    db: Session = Depends(get_db)
):
    """Retrieve historical price timeline points for a product."""
    history = price_service.get_price_history(db, product_id)
    return [
        {"date": p.recorded_date, "price": p.price, "avgPrice": p.avg_price, "source": p.source}
        for p in history
    ]


@router.post("/product/{product_id}/analysis")
def analyze_product_pricing(
    product_id: str,
    db: Session = Depends(get_db)
):
    """Run price intelligence, deal analysis, and BUY NOW vs WAIT verdict."""
    return price_service.analyze_product_price(db, product_id)
