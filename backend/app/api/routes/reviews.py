from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.review import ReviewAnalyzeRequest, ReviewAnalyzeResponse, ReviewSampleSchema
from app.services.review_service import review_service

router = APIRouter()


@router.get("/product/{product_id}", response_model=List[ReviewSampleSchema])
def get_product_reviews(
    product_id: str,
    db: Session = Depends(get_db)
):
    """Get all analyzed reviews for a product."""
    reviews = review_service.get_reviews_by_product_id(db, product_id)
    return [
        {
            "id": r.id,
            "author": r.author,
            "avatar": r.avatar_url,
            "rating": r.rating,
            "date": r.review_date or "Recently",
            "verifiedPurchase": r.verified_purchase,
            "content": r.review_text,
            "suspicionScore": r.suspicion_probability,
            "credibilityLabel": r.credibility_label,
            "detectedSignals": r.detected_signals or []
        }
        for r in reviews
    ]


@router.post("/analyze", response_model=ReviewAnalyzeResponse)
def analyze_single_review_text(
    req: ReviewAnalyzeRequest
):
    """
    Analyzes any user-provided review text in real-time.
    Evaluates linguistic entropy, template markers, and outputs suspicion probability.
    """
    res = review_service.analyze_single_review(req)
    return {
        "suspicionScore": res["suspicion_score"],
        "credibilityScore": res["credibility_score"],
        "label": res["label"],
        "credibilityLabel": res["credibility_label"],
        "signals": res["signals"],
        "sentimentScore": res["sentiment_score"],
        "entropyScore": res["entropy_score"],
        "botProbability": res["bot_probability"],
        "isSuspicious": res["is_suspicious"]
    }
