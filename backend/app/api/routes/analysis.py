from typing import Optional
from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.analysis import AnalyzeProductRequest, ProductInvestigationSchema
from app.services.product_service import product_service
from app.core.security import get_optional_current_user
from app.core.rate_limit import limiter
from app.core.config import settings
from app.database import models

router = APIRouter()


@router.post("/product", response_model=ProductInvestigationSchema)
@limiter.limit(settings.RATE_LIMIT_ANALYSIS)
def analyze_product_input(
    request: Request,
    req: AnalyzeProductRequest,
    current_user: Optional[models.User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    """
    Main entrypoint for 'Analyze a Product' investigation flow.
    Ingests URL, screenshot context, or search keywords, runs the 5-layer trust
    pipeline, records history if user is logged in, and returns a full forensic dossier.
    """
    product = product_service.resolve_product_from_input(db, req.input_text, req.mode)
    if not product:
        raise HTTPException(
            status_code=404,
            detail="Could not identify or extract product signals from the provided input. Check the product link or try a specific query."
        )

    dossier = product_service.generate_investigation_dossier(db, product, user=current_user)
    return dossier


@router.get("/product/{product_id}", response_model=ProductInvestigationSchema)
def get_product_analysis(
    product_id: str,
    current_user: Optional[models.User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve full forensic 5-layer trust dossier for an existing product."""
    product = product_service.get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    dossier = product_service.generate_investigation_dossier(db, product, user=current_user)
    return dossier
