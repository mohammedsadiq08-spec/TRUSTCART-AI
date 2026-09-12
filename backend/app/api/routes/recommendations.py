from typing import Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.recommendation import PersonaPreferencesSchema, PersonalizedRecommendationResponse
from app.services.recommendation_service import recommendation_service

router = APIRouter()


@router.post("/personalized", response_model=PersonalizedRecommendationResponse)
def get_personalized_recommendation(
    prefs: PersonaPreferencesSchema,
    db: Session = Depends(get_db)
):
    """
    Computes explainable personalized product match and recommendation
    based on user-configured priority weights (Purpose, Comfort, Battery, Sound, Mic).
    """
    return recommendation_service.get_personalized_recommendation(db, prefs)


@router.get("/matrix")
def get_decision_matrix_criteria() -> Dict[str, Any]:
    """Returns algorithmic criteria definitions for BUY, WAIT, and AVOID."""
    return {
        "BUY": {
            "title": "Good Value + Strong Trust Signals",
            "criteria": [
                "Verified seller with long-term platform history and active warranty channel",
                "Review authenticity score above 85% with natural linguistic distribution",
                "Current price within bottom quartile of 90-day tracking index",
                "Established return & dispute resolution compliance"
            ]
        },
        "WAIT": {
            "title": "Solid Product, But Timing / Price May Improve",
            "criteria": [
                "Priced above recent 30-day moving average or recent pre-sale inflation detected",
                "Upcoming scheduled marketplace seasonal festival sale within 10-15 days",
                "Minor firmware/batch revisions announced for imminent release",
                "Healthy seller and reviews, but sub-optimal purchasing timing"
            ]
        },
        "AVOID": {
            "title": "Potentially High Risk, Clone, or Exploitative Markup",
            "criteria": [
                "Hidden pricing behind 'DM for price' with unverified direct UPI transfers",
                "Bot review clusters with copy-pasted enthusiasm and no real benchmarks",
                "Reverse image search links product to wholesale factory batches marked up 300%+",
                "Unenforceable return policies or newly created anonymous seller profiles"
            ]
        }
    }
