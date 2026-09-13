from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.seller import SellerResponse, SellerAnalysisRequest
from app.services.seller_service import seller_service

router = APIRouter()


@router.get("", response_model=List[SellerResponse])
def get_sellers(
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Retrieve seller registry with trust scores."""
    return seller_service.get_all_sellers(db, limit=limit)


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
