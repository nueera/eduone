"""
CollegeOS — User Schemas
Pydantic models for request/response validation.
"""

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum


class RoleEnum(str, Enum):
    SUPER_ADMIN = "SUPER_ADMIN"
    ADMIN = "ADMIN"
    FACULTY = "FACULTY"
    STUDENT = "STUDENT"


# ─── Auth ────────────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    name: str
    password: str
    role: RoleEnum = RoleEnum.STUDENT


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: "UserResponse"


# ─── User ────────────────────────────────────────────────────────────────────

class UserResponse(BaseModel):
    id: str
    email: str
    name: Optional[str] = None
    role: RoleEnum
    avatar: Optional[str] = None
    is_active: bool = True
    created_at: datetime

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    name: Optional[str] = None
    avatar: Optional[str] = None

    model_config = {"from_attributes": True}
