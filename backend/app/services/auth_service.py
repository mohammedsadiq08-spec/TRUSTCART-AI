import uuid
import datetime
from typing import Optional, Dict, Any
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.database import models
from app.schemas.auth import UserRegisterRequest, UserLoginRequest
from app.core.security import get_password_hash, verify_password, create_access_token


class AuthService:
    def register_user(self, db: Session, req: UserRegisterRequest) -> Dict[str, Any]:
        # 1. Validate password match if confirm_password supplied
        if req.confirm_password and req.password != req.confirm_password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Passwords do not match."
            )

        # 2. Check if email already exists
        existing_user = db.query(models.User).filter(models.User.email == req.email.lower().strip()).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="An account with this email already exists."
            )

        # 3. Create user
        user_id = f"usr_{uuid.uuid4().hex[:12]}"
        hashed_password = get_password_hash(req.password)
        new_user = models.User(
            id=user_id,
            full_name=req.full_name.strip(),
            email=req.email.lower().strip(),
            password_hash=hashed_password,
            created_at=datetime.datetime.now(datetime.timezone.utc)
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # 4. Generate JWT
        token = create_access_token(subject=new_user.id)

        return {
            "access_token": token,
            "token_type": "bearer",
            "user_id": new_user.id,
            "email": new_user.email,
            "full_name": new_user.full_name
        }

    def login_user(self, db: Session, req: UserLoginRequest) -> Dict[str, Any]:
        generic_error = "Invalid email or password."

        user = db.query(models.User).filter(models.User.email == req.email.lower().strip()).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=generic_error
            )

        if not verify_password(req.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=generic_error
            )

        token = create_access_token(subject=user.id)

        return {
            "access_token": token,
            "token_type": "bearer",
            "user_id": user.id,
            "email": user.email,
            "full_name": user.full_name
        }


auth_service = AuthService()
