from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.seller import SellerResponse, SellerAnalysisRequest
from app.services.seller_service import seller_service

router = APIRouter()


@router.get("/{seller_id}", response_model=SellerResponse)
def get_seller(
    seller_id: str,
    db: Session = Depends(get_db)
):
    """Retrieve seller entity information."""
    seller = seller_service.get_seller_by_id(db, seller_id)
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")
    return seller


@router.post("/analyze")
def analyze_seller_entity(
    req: SellerAnalysisRequest,
    db: Session = Depends(get_db)
):
    """Audit seller entity background and risk level."""
    return seller_service.analyze_seller(db, req)
