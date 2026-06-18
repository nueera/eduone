"""
CollegeOS — Campus Operations API Routes
Hostel, transport, cafeteria, and security management.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.core.database import get_db
from app.core.deps import CurrentUser
from app.models.campus import Hostel, TransportRoute, CafeteriaItem, SecurityIncident

router = APIRouter(prefix="/campus", tags=["Campus Operations"])


@router.get("/dashboard")
async def get_dashboard(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """Get campus operations dashboard statistics."""
    hostels = await db.scalar(select(func.count()).select_from(Hostel))
    total_capacity = await db.scalar(select(func.sum(Hostel.capacity)))
    total_occupancy = await db.scalar(select(func.sum(Hostel.occupancy)))
    routes = await db.scalar(select(func.count()).select_from(TransportRoute))
    incidents = await db.scalar(select(func.count()).where(SecurityIncident.status == "open"))

    occupancy_rate = round((total_occupancy / total_capacity * 100) if total_capacity and total_capacity > 0 else 0, 1)

    return {
        "hostels": hostels or 0,
        "occupancy_rate": occupancy_rate,
        "bus_routes": routes or 0,
        "open_incidents": incidents or 0,
    }


@router.get("/hostels")
async def list_hostels(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """List all hostels with occupancy data."""
    result = await db.execute(select(Hostel))
    return result.scalars().all()


@router.get("/transport")
async def list_transport_routes(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """List all transport routes."""
    result = await db.execute(select(TransportRoute))
    return result.scalars().all()


@router.get("/cafeteria")
async def list_cafeteria_items(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """List cafeteria menu items."""
    result = await db.execute(select(CafeteriaItem).where(CafeteriaItem.is_available == 1))
    return result.scalars().all()


@router.get("/security/incidents")
async def list_security_incidents(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """List security incidents."""
    result = await db.execute(select(SecurityIncident).order_by(SecurityIncident.created_at.desc()).limit(50))
    return result.scalars().all()
