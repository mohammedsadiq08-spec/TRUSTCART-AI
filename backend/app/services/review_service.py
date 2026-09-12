from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.database import models
from app.ai.fake_review_detector import fake_review_detector
from app.schemas.review import ReviewAnalyzeRequest


class ReviewService:
    def get_reviews_by_product_id(self, db: Session, product_id: str) -> List[models.Review]:
        return db.query(models.Review).filter(models.Review.product_id == product_id).all()

    def analyze_single_review(self, req: ReviewAnalyzeRequest) -> Dict[str, Any]:
        return fake_review_detector.evaluate_single_review(
            text=req.review_text,
            rating=req.rating or 5.0,
            verified_purchase=req.verified_purchase if req.verified_purchase is not None else True,
            author_account_age_days=req.author_account_age_days or 180
        )


review_service = ReviewService()
