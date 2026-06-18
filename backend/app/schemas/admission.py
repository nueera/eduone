"""
CollegeOS — Admission Schemas
"""

from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from enum import Enum


class LeadStatus(str, Enum):
    NEW = "NEW"
    CONTACTED = "CONTACTED"
    QUALIFIED = "QUALIFIED"
    APPLICATION = "APPLICATION"
    ENROLLED = "ENROLLED"
    LOST = "LOST"


class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    course_interest: Optional[str] = None
    source: Optional[str] = "WEBSITE"
    notes: Optional[str] = None


class LeadUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    course_interest: Optional[str] = None
    status: Optional[LeadStatus] = None
    notes: Optional[str] = None


class LeadResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    course_interest: Optional[str] = None
    status: LeadStatus
    source: Optional[str] = None
    notes: Optional[str] = None
    assigned_to: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ApplicationResponse(BaseModel):
    id: str
    lead_id: str
    status: str
    documents: Optional[str] = None
    reviewed_by: Optional[str] = None
    review_notes: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class DashboardStats(BaseModel):
    new_leads: int
    applications: int
    enrolled: int
    conversion_rate: float
    leads_by_status: dict
    monthly_trend: list
