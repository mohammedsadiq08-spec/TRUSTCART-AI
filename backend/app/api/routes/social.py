from typing import Optional
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.social import SocialPostAnalyzeRequest, SocialPostExtractionResponse
from app.services.social_service import social_service
from app.core.security import get_optional_current_user
from app.core.rate_limit import limiter
from app.core.config import settings
from app.database import models

router = APIRouter()


@router.post("/analyze", response_model=SocialPostExtractionResponse)
@limiter.limit(settings.RATE_LIMIT_ANALYSIS)
def analyze_social_post(
    request: Request,
    req: SocialPostAnalyzeRequest,
    current_user: Optional[models.User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db)
):
    """
    Extracts product intelligence from public social media posts,
    reverse-image matches against wholesale sources, and uncovers hidden price ranges.
    """
    return social_service.analyze_social_input(db, req)
