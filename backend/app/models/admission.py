"""
CollegeOS — Admission CRM Models
Lead management, application pipeline, and enrollment tracking.
"""

from sqlalchemy import Column, String, Text, DateTime, Enum, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum

from app.core.database import Base


class LeadStatus(str, enum.Enum):
    NEW = "NEW"
    CONTACTED = "CONTACTED"
    QUALIFIED = "QUALIFIED"
    APPLICATION = "APPLICATION"
    ENROLLED = "ENROLLED"
    LOST = "LOST"


class LeadSource(str, enum.Enum):
    WEBSITE = "WEBSITE"
    REFERRAL = "REFERRAL"
    WALK_IN = "WALK_IN"
    SOCIAL_MEDIA = "SOCIAL_MEDIA"
    CAMPUS_EVENT = "CAMPUS_EVENT"
    OTHER = "OTHER"


class Lead(Base):
    __tablename__ = "admission_leads"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, index=True)
    phone = Column(String, nullable=True)
    course_interest = Column(String, nullable=True)
    status = Column(Enum(LeadStatus), default=LeadStatus.NEW, nullable=False)
    source = Column(Enum(LeadSource), default=LeadSource.WEBSITE, nullable=False)
    notes = Column(Text, nullable=True)
    assigned_to = Column(String, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relations
    application = relationship("Application", back_populates="lead", uselist=False)


class ApplicationStatus(str, enum.Enum):
    PENDING = "PENDING"
    UNDER_REVIEW = "UNDER_REVIEW"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    WAITLISTED = "WAITLISTED"


class Application(Base):
    __tablename__ = "admission_applications"

    id = Column(String, primary_key=True, index=True)
    lead_id = Column(String, ForeignKey("admission_leads.id"), unique=True, nullable=False)
    status = Column(Enum(ApplicationStatus), default=ApplicationStatus.PENDING, nullable=False)
    documents = Column(Text, nullable=True)  # JSON string of document paths
    reviewed_by = Column(String, ForeignKey("users.id"), nullable=True)
    review_notes = Column(Text, nullable=True)
    reviewed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relations
    lead = relationship("Lead", back_populates="application")
