import uuid
import datetime
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.database import models
from app.schemas.user import UserUpdateRequest
from app.schemas.recommendation import PersonaPreferencesSchema
from app.core.security import get_password_hash


class UserService:
    def get_user_profile(self, db: Session, user: models.User) -> Dict[str, Any]:
        saved_count = db.query(models.SavedProduct).filter(models.SavedProduct.user_id == user.id).count()
        analyses_count = db.query(models.ProductAnalysis).filter(models.ProductAnalysis.user_id == user.id).count()

        return {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "created_at": user.created_at.strftime("%B %Y") if user.created_at else "Recently",
            "saved_products_count": saved_count,
            "analyses_count": analyses_count
        }

    def update_user_profile(self, db: Session, user: models.User, req: UserUpdateRequest) -> Dict[str, Any]:
        if req.full_name:
            user.full_name = req.full_name.strip()

        if req.password:
            user.password_hash = get_password_hash(req.password)

        user.updated_at = datetime.datetime.now(datetime.timezone.utc)
        db.commit()
        db.refresh(user)

        return self.get_user_profile(db, user)

    def save_product(self, db: Session, user: models.User, product_id: str) -> Dict[str, Any]:
        product = db.query(models.Product).filter(models.Product.id == product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        existing = db.query(models.SavedProduct).filter(
            models.SavedProduct.user_id == user.id,
            models.SavedProduct.product_id == product_id
        ).first()

        if existing:
            return {"status": "already_saved", "saved": True, "product_id": product_id}

        saved_item = models.SavedProduct(
            id=f"saved_{uuid.uuid4().hex[:12]}",
            user_id=user.id,
            product_id=product_id,
            created_at=datetime.datetime.now(datetime.timezone.utc)
        )
        db.add(saved_item)
        db.commit()

        return {"status": "saved", "saved": True, "product_id": product_id}

    def unsave_product(self, db: Session, user: models.User, product_id: str) -> Dict[str, Any]:
        saved_item = db.query(models.SavedProduct).filter(
            models.SavedProduct.user_id == user.id,
            models.SavedProduct.product_id == product_id
        ).first()

        if saved_item:
            db.delete(saved_item)
            db.commit()

        return {"status": "unsaved", "saved": False, "product_id": product_id}

    def get_saved_products(self, db: Session, user: models.User) -> List[Dict[str, Any]]:
        saved_records = db.query(models.SavedProduct).filter(
            models.SavedProduct.user_id == user.id
        ).order_by(models.SavedProduct.created_at.desc()).all()

        results = []
        for record in saved_records:
            prod = record.product
            if prod:
                results.append({
                    "id": record.id,
                    "product_id": prod.id,
                    "saved_at": record.created_at.strftime("%d %b %Y") if record.created_at else "Recently",
                    "product": {
                        "id": prod.id,
                        "name": prod.name,
                        "description": prod.description,
                        "category": prod.category,
                        "brand": prod.brand,
                        "price": prod.price,
                        "currency": prod.currency,
                        "original_price": prod.original_price,
                        "image_url": prod.image_url,
                        "source_platform": prod.source_platform,
                        "source_url": prod.source_url,
                        "rating": prod.rating,
                        "review_count": prod.review_count,
                        "thirty_day_avg_price": prod.thirty_day_avg_price,
                        "all_time_low": prod.all_time_low,
                        "market_min": prod.market_min,
                        "market_max": prod.market_max
                    }
                })
        return results

    def get_user_analysis_history(self, db: Session, user: models.User) -> List[Dict[str, Any]]:
        analyses = db.query(models.ProductAnalysis).filter(
            models.ProductAnalysis.user_id == user.id
        ).order_by(models.ProductAnalysis.created_at.desc()).all()

        results = []
        for a in analyses:
            prod = a.product
            results.append({
                "id": a.id,
                "product_id": a.product_id,
                "product_name": prod.name if prod else "Investigated Product",
                "product_image": prod.image_url if prod else None,
                "brand": prod.brand if prod else "Brand",
                "category": prod.category if prod else "Electronics",
                "price": prod.price if prod else 0.0,
                "currency": prod.currency if prod else "₹",
                "trust_score": a.overall_trust_score,
                "recommendation": a.recommendation,
                "confidence": a.confidence,
                "analyzed_at": a.created_at.strftime("%d %b %Y, %I:%M %p") if a.created_at else "Recently"
            })
        return results

    def get_user_preferences(self, db: Session, user: models.User) -> Dict[str, Any]:
        pref = db.query(models.UserPreference).filter(models.UserPreference.user_id == user.id).first()
        if not pref:
            return {
                "purpose": "Study",
                "budget": 30000.0,
                "comfortWeight": 40.0,
                "batteryWeight": 30.0,
                "soundWeight": 20.0,
                "micWeight": 10.0
            }
        return {
            "purpose": pref.purpose,
            "budget": pref.budget,
            "comfortWeight": pref.comfort_weight,
            "batteryWeight": pref.battery_weight,
            "soundWeight": pref.sound_weight,
            "micWeight": pref.mic_weight
        }

    def update_user_preferences(self, db: Session, user: models.User, prefs: PersonaPreferencesSchema) -> Dict[str, Any]:
        pref = db.query(models.UserPreference).filter(models.UserPreference.user_id == user.id).first()
        if not pref:
            pref = models.UserPreference(
                id=f"pref_{uuid.uuid4().hex[:12]}",
                user_id=user.id,
                purpose=prefs.purpose,
                budget=prefs.budget,
                comfort_weight=prefs.comfortWeight,
                battery_weight=prefs.batteryWeight,
                sound_weight=prefs.soundWeight,
                mic_weight=prefs.micWeight,
                created_at=datetime.datetime.now(datetime.timezone.utc)
            )
            db.add(pref)
        else:
            pref.purpose = prefs.purpose
            pref.budget = prefs.budget
            pref.comfort_weight = prefs.comfortWeight
            pref.battery_weight = prefs.batteryWeight
            pref.sound_weight = prefs.soundWeight
            pref.mic_weight = prefs.micWeight
            pref.updated_at = datetime.datetime.now(datetime.timezone.utc)

        db.commit()
        return self.get_user_preferences(db, user)


user_service = UserService()
