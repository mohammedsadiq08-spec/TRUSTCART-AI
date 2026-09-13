from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.user import UserProfileResponse, UserUpdateRequest, SavedProductResponse, AnalysisHistoryItemResponse
from app.schemas.recommendation import PersonaPreferencesSchema
from app.services.user_service import user_service
from app.core.security import get_current_user
from app.database import models

router = APIRouter()


@router.get("/me", response_model=UserProfileResponse)
def get_current_user_profile(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve full profile information for the authenticated user."""
    return user_service.get_user_profile(db, current_user)


@router.patch("/me", response_model=UserProfileResponse)
def update_current_user_profile(
    req: UserUpdateRequest,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update profile details (name, password)."""
    return user_service.update_user_profile(db, current_user, req)


@router.get("/me/saved-products", response_model=List[SavedProductResponse])
def get_user_saved_products(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve all products bookmarked/saved by the authenticated user."""
    return user_service.get_saved_products(db, current_user)


@router.get("/me/analysis-history", response_model=List[AnalysisHistoryItemResponse])
def get_user_analysis_history(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve the chronological investigation history for the authenticated user."""
    return user_service.get_user_analysis_history(db, current_user)


@router.get("/me/preferences")
def get_user_preferences(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve saved priority preferences for the authenticated user."""
    return user_service.get_user_preferences(db, current_user)


@router.post("/me/preferences")
def update_user_preferences(
    prefs: PersonaPreferencesSchema,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Persist updated priority preferences for the authenticated user."""
    return user_service.update_user_preferences(db, current_user, prefs)
