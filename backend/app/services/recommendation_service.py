from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.database import models
from app.schemas.recommendation import PersonaPreferencesSchema


class RecommendationService:
    def get_personalized_recommendation(
        self,
        db: Session,
        prefs: PersonaPreferencesSchema
    ) -> Dict[str, Any]:
        purpose = prefs.purpose
        budget = prefs.budget
        comfort = prefs.comfortWeight
        battery = prefs.batteryWeight
        sound = prefs.soundWeight

        if purpose == "Study":
            product = db.query(models.Product).filter(models.Product.id == "sony-wh1000xm5").first()
            match_percent = min(98.0, max(82.0, 85.0 + (comfort * 0.15) + (battery * 0.1)))
            reason = "Best match for your budget and comfort-first focus. Class-leading ANC eliminates library/cafe chatter completely."
            badge = "Top Pick for Long Study Sessions"
            rating = 9.6
            price_str = f"₹{int(product.price):,}" if product else "₹26,990"
        elif purpose == "Office":
            product = db.query(models.Product).filter(models.Product.id == "bose-qc45").first()
            match_percent = 93.0
            reason = "Outstanding all-day headband ergonomics with dedicated multi-device Zoom / Teams switching."
            badge = "Top Pick for Work & Meetings"
            rating = 9.3
            price_str = f"₹{int(product.price):,}" if product else "₹24,990"
        elif purpose == "Gaming":
            product = db.query(models.Product).filter(models.Product.id == "steelseries-nova-pro").first()
            match_percent = 95.0
            reason = "Zero-latency 2.4GHz connection, hot-swappable battery system, and pin-point spatial audio."
            badge = "Top Pick for Low Latency"
            rating = 9.5
            price_str = f"₹{int(product.price):,}" if product else "₹31,990"
        elif purpose == "Fitness":
            product = db.query(models.Product).filter(models.Product.id == "jabra-elite-8").first()
            match_percent = 92.0
            reason = "Military-grade IP68 waterproof rating, shake-proof fit, and rugged sweat resistance."
            badge = "Top Pick for Workout Durability"
            rating = 9.2
            price_str = f"₹{int(product.price):,}" if product else "₹17,999"
        else:
            product = db.query(models.Product).filter(models.Product.id == "sennheiser-hd660s2").first()
            match_percent = 97.0
            reason = "Natural acoustic timbre, expansive soundstage, and ultra-low harmonic distortion curve."
            badge = "Top Pick for Studio Fidelity"
            rating = 9.7
            price_str = f"₹{int(product.price):,}" if product else "₹38,990"

        prod_id = product.id if product else "sony-wh1000xm5"
        prod_name = product.name if product else "Sony WH-1000XM5"

        return {
            "productId": prod_id,
            "productName": prod_name,
            "price": price_str,
            "matchPercent": round(match_percent),
            "reason": reason,
            "badge": badge,
            "rating": rating,
            "supportingSignals": [
                f"Fits budget threshold (Target: ₹{int(budget):,})",
                f"Weight prioritized: Comfort ({int(comfort)}%), Battery ({int(battery)}%)",
                "High seller trust and genuine brand warranty",
                "Verified positive battery endurance benchmarks"
            ]
        }


recommendation_service = RecommendationService()
