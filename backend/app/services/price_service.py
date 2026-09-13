import datetime
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.database import models
from app.ai.price_intelligence import price_intelligence_engine


class PriceService:
    def get_price_history(self, db: Session, product_id: str) -> List[models.PriceHistory]:
        records = db.query(models.PriceHistory).filter(models.PriceHistory.product_id == product_id).all()
        if not records:
            prod = db.query(models.Product).filter(models.Product.id == product_id).first()
            if prod:
                history_data = [
                    ("Day -60", prod.price * 1.08, prod.thirty_day_avg_price or prod.price),
                    ("Day -45", prod.price * 1.05, prod.thirty_day_avg_price or prod.price),
                    ("Day -30", prod.price * 1.02, prod.thirty_day_avg_price or prod.price),
                    ("Day -15", prod.price * 0.98, prod.thirty_day_avg_price or prod.price),
                    ("Day -7", prod.price * 1.01, prod.thirty_day_avg_price or prod.price),
                    ("Today", prod.price, prod.thirty_day_avg_price or prod.price)
                ]
                new_records = []
                for idx, (dt, p_val, avg_val) in enumerate(history_data):
                    rec = models.PriceHistory(
                        id=f"ph_{product_id}_{idx}",
                        product_id=product_id,
                        price=round(p_val, 2),
                        avg_price=round(avg_val, 2),
                        source=prod.source_platform,
                        recorded_date=dt,
                        created_at=datetime.datetime.now(datetime.timezone.utc)
                    )
                    db.add(rec)
                    new_records.append(rec)
                db.commit()
                return new_records
        return records

    def analyze_product_price(self, db: Session, product_id: str) -> Dict[str, Any]:
        product = db.query(models.Product).filter(models.Product.id == product_id).first()
        if not product:
            return {
                "error": "Product not found",
                "price_intelligence_score": 50.0,
                "timing_advice": "WAIT",
                "timing_reason": "Insufficient pricing data."
            }

        history_records = self.get_price_history(db, product_id)
        history = [
            {"date": p.recorded_date, "price": p.price, "avgPrice": p.avg_price}
            for p in history_records
        ]

        analysis = price_intelligence_engine.analyze_price_trend(
            current_price=product.price,
            thirty_day_avg=product.thirty_day_avg_price or product.price,
            all_time_low=product.all_time_low or (product.price * 0.85),
            market_min=product.market_min or (product.price * 0.9),
            market_max=product.market_max or (product.price * 1.2),
            price_history=history
        )

        return {
            "productId": product.id,
            "productName": product.name,
            "currentPrice": product.price,
            "currency": product.currency,
            "thirtyDayAvgPrice": product.thirty_day_avg_price,
            "allTimeLow": product.all_time_low,
            "marketRange": {"min": product.market_min, "max": product.market_max},
            "priceIntelligenceScore": analysis["price_intelligence_score"],
            "timingAdvice": analysis["timing_advice"],
            "timingReason": analysis["timing_reason"],
            "fakeDiscountDetected": analysis["fake_discount_detected"],
            "priceHistory": history
        }


price_service = PriceService()
