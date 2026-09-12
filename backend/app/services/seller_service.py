from typing import Optional, Dict, Any
from sqlalchemy.orm import Session
from app.database import models
from app.ai.seller_trust import seller_trust_engine
from app.schemas.seller import SellerAnalysisRequest


class SellerService:
    def get_seller_by_id(self, db: Session, seller_id: str) -> Optional[models.Seller]:
        return db.query(models.Seller).filter(models.Seller.id == seller_id).first()

    def analyze_seller(self, db: Session, req: SellerAnalysisRequest) -> Dict[str, Any]:
        seller = None
        if req.seller_id:
            seller = self.get_seller_by_id(db, req.seller_id)

        if not seller and req.seller_name:
            seller = db.query(models.Seller).filter(models.Seller.name.ilike(f"%{req.seller_name}%")).first()

        name = seller.name if seller else (req.seller_name or "Unknown Seller")
        rating = seller.rating if seller else 3.5
        review_count = seller.review_count if seller else 50
        account_age = seller.account_age if seller else "1+ Year"
        fulfillment = seller.fulfillment_type if seller else "Direct Platform"
        return_policy = seller.return_policy if seller else "Standard Return Policy"
        warnings = seller.warnings if (seller and seller.warnings) else []

        eval_res = seller_trust_engine.evaluate_seller(
            name=name,
            rating=rating,
            review_count=review_count,
            account_age=account_age,
            fulfillment_type=fulfillment,
            return_policy=return_policy,
            warnings=warnings
        )

        return {
            "seller_id": seller.id if seller else None,
            "seller_name": name,
            "seller_trust_score": eval_res["seller_trust_score"],
            "risk_level": eval_res["risk_level"],
            "signals": eval_res["signals"],
            "return_policy": return_policy,
            "warnings": warnings
        }


seller_service = SellerService()
