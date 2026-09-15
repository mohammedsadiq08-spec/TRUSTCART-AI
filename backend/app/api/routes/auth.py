from fastapi import APIRouter, Depends, Request, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.auth import UserRegisterRequest, UserLoginRequest, TokenResponse, AuthMeResponse
from app.services.auth_service import auth_service
from app.core.security import get_current_user
from app.core.rate_limit import limiter
from app.core.config import settings
from app.database import models

router = APIRouter()


@router.post("/register", response_model=TokenResponse)
@limiter.limit(settings.RATE_LIMIT_AUTH)
def register(
    request: Request,
    req: UserRegisterRequest,
    db: Session = Depends(get_db)
):
    """
    Registers a new user with full_name, unique email, and hashed password.
    Returns access token and user credentials.
    """
    return auth_service.register_user(db, req)


@router.post("/login", response_model=TokenResponse)
@limiter.limit(settings.RATE_LIMIT_AUTH)
def login(
    request: Request,
    req: UserLoginRequest,
    db: Session = Depends(get_db)
):
    """
    Authenticates user with email and password.
    Returns generic 401 on failure to prevent email enumeration.
    """
    return auth_service.login_user(db, req)


@router.post("/logout")
def logout():
    """
    Logs out the current user session.
    Note: Client immediately clears local JWT token.
    """
    return {"status": "success", "message": "Successfully logged out."}


@router.get("/me", response_model=AuthMeResponse)
def get_me(
    current_user: models.User = Depends(get_current_user)
):
    """
    Returns the authenticated user profile.
    """
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "created_at": current_user.created_at.strftime("%Y-%m-%d %H:%M:%S") if current_user.created_at else ""
    }
