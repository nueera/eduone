"""
CollegeOS — Campus Operations Models
Hostel, transport, cafeteria, and security management.
"""

from sqlalchemy import Column, String, Integer, Float, DateTime, Enum, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum

from app.core.database import Base


class HostelType(str, enum.Enum):
    BOYS = "BOYS"
    GIRLS = "GIRLS"


class Hostel(Base):
    __tablename__ = "campus_hostels"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(Enum(HostelType), nullable=False)
    capacity = Column(Integer, nullable=False)
    occupancy = Column(Integer, default=0)
    warden_id = Column(String, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relations
    rooms = relationship("HostelRoom", back_populates="hostel")


class HostelRoom(Base):
    __tablename__ = "campus_hostel_rooms"

    id = Column(String, primary_key=True, index=True)
    hostel_id = Column(String, ForeignKey("campus_hostels.id"), nullable=False)
    room_number = Column(String, nullable=False)
    floor = Column(Integer, nullable=False)
    capacity = Column(Integer, nullable=False)
    occupancy = Column(Integer, default=0)
    student_id = Column(String, ForeignKey("academics_students.id"), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relations
    hostel = relationship("Hostel", back_populates="rooms")


class TransportRouteStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    DELAYED = "DELAYED"
    CANCELLED = "CANCELLED"


class TransportRoute(Base):
    __tablename__ = "campus_transport_routes"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    buses = Column(Integer, default=1)
    students = Column(Integer, default=0)
    status = Column(Enum(TransportRouteStatus), default=TransportRouteStatus.ACTIVE, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class CafeteriaItem(Base):
    __tablename__ = "campus_cafeteria_items"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    is_available = Column(Integer, default=1)  # 1=available, 0=unavailable
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class SecurityIncidentSeverity(str, enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class SecurityIncident(Base):
    __tablename__ = "campus_security_incidents"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    severity = Column(Enum(SecurityIncidentSeverity), default=SecurityIncidentSeverity.LOW, nullable=False)
    location = Column(String, nullable=True)
    reported_by = Column(String, ForeignKey("users.id"), nullable=True)
    status = Column(String, default="open")  # open, investigating, resolved
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
