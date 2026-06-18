"""
CollegeOS — Admission CRM API Routes
Lead management, application pipeline, and dashboard analytics.
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import Optional

from app.core.database import get_db
from app.core.deps import CurrentUser
from app.models.admission import Lead, LeadStatus
from app.schemas.admission import LeadCreate, LeadUpdate, LeadResponse, DashboardStats

router = APIRouter(prefix="/admission", tags=["Admission CRM"])


@router.get("/dashboard", response_model=DashboardStats)
async def get_dashboard(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """Get admission dashboard statistics."""
    # Count leads by status
    new_leads = await db.scalar(select(func.count()).where(Lead.status == LeadStatus.NEW))
    applications = await db.scalar(select(func.count()).where(Lead.status == LeadStatus.APPLICATION))
    enrolled = await db.scalar(select(func.count()).where(Lead.status == LeadStatus.ENROLLED))
    total = await db.scalar(select(func.count()))

    conversion_rate = round((enrolled / total * 100) if total > 0 else 0, 1)

    return DashboardStats(
        new_leads=new_leads or 0,
        applications=applications or 0,
        enrolled=enrolled or 0,
        conversion_rate=conversion_rate,
        leads_by_status={},
        monthly_trend=[],
    )


@router.get("/leads", response_model=list[LeadResponse])
async def list_leads(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    status: Optional[LeadStatus] = None,
    db: AsyncSession = Depends(get_db),
    user: dict = CurrentUser,
):
    """List all leads with optional filtering."""
    query = select(Lead)
    if status:
        query = query.where(Lead.status == status)
    query = query.offset(skip).limit(limit).order_by(Lead.created_at.desc())

    result = await db.execute(query)
    leads = result.scalars().all()
    return [LeadResponse.model_validate(lead) for lead in leads]


@router.post("/leads", response_model=LeadResponse, status_code=201)
async def create_lead(data: LeadCreate, db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """Create a new lead."""
    lead = Lead(
        id=f"lead_{data.email.split('@')[0]}",
        **data.model_dump(),
    )
    db.add(lead)
    await db.flush()
    await db.refresh(lead)
    return LeadResponse.model_validate(lead)


@router.get("/leads/{lead_id}", response_model=LeadResponse)
async def get_lead(lead_id: str, db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """Get a specific lead by ID."""
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalar_one_or_none()
    if not lead:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Lead not found")
    return LeadResponse.model_validate(lead)


@router.patch("/leads/{lead_id}", response_model=LeadResponse)
async def update_lead(lead_id: str, data: LeadUpdate, db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """Update a lead."""
    result = await db.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalar_one_or_none()
    if not lead:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Lead not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(lead, key, value)

    await db.flush()
    await db.refresh(lead)
    return LeadResponse.model_validate(lead)
