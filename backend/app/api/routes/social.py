from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.social import SocialPostAnalyzeRequest, SocialPostExtractionResponse
from app.services.social_service import social_service

router = APIRouter()


@router.post("/analyze", response_model=SocialPostExtractionResponse)
def analyze_social_post(
    req: SocialPostAnalyzeRequest,
    db: Session = Depends(get_db)
):
    """
    Extracts product intelligence from public social media posts,
    reverse-image matches against wholesale sources, and uncovers hidden price ranges.
    """
    return social_service.analyze_social_input(db, req)
