"""
CollegeOS — Database Seed Script
Populates the database with sample data for development and testing.
"""

import asyncio
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal, Base, engine
from app.core.security import hash_password
from app.models.user import User, RoleEnum
from app.models.admission import Lead, LeadStatus, LeadSource
from app.models.academics import Department, Course, Faculty, Student
from app.models.examination import Exam, ExamType, ExamStatus
from app.models.campus import Hostel, HostelType, TransportRoute, TransportRouteStatus
from app.models.finance import Transaction, TransactionType, TransactionCategory, FeeStructure


async def seed_users(db: AsyncSession):
    """Create admin and demo users."""
    users = [
        User(id="usr_admin", email="admin@collegeos.dev", name="Super Admin",
             hashed_password=hash_password("admin123"), role=RoleEnum.SUPER_ADMIN),
        User(id="usr_faculty", email="faculty@collegeos.dev", name="Dr. Rajesh Gupta",
             hashed_password=hash_password("faculty123"), role=RoleEnum.FACULTY),
        User(id="usr_student", email="student@collegeos.dev", name="Aarav Sharma",
             hashed_password=hash_password("student123"), role=RoleEnum.STUDENT),
    ]
    for user in users:
        db.add(user)
    await db.flush()
    print("  ✓ Users seeded")


async def seed_departments(db: AsyncSession):
    """Create academic departments."""
    depts = [
        Department(id="dept_cse", name="Computer Science & Engineering", code="CSE"),
        Department(id="dept_ece", name="Electronics & Communication", code="ECE"),
        Department(id="dept_me", name="Mechanical Engineering", code="ME"),
        Department(id="dept_ce", name="Civil Engineering", code="CE"),
        Department(id="dept_mba", name="Business Administration", code="MBA"),
    ]
    for dept in depts:
        db.add(dept)
    await db.flush()
    print("  ✓ Departments seeded")


async def seed_leads(db: AsyncSession):
    """Create admission leads."""
    leads = [
        Lead(id="lead_001", name="Priya Patel", email="priya@example.com", phone="+91-98765-43210",
             course_interest="B.Tech CSE", status=LeadStatus.NEW, source=LeadSource.WEBSITE),
        Lead(id="lead_002", name="Rohit Kumar", email="rohit@example.com", phone="+91-87654-32109",
             course_interest="MBA", status=LeadStatus.CONTACTED, source=LeadSource.REFERRAL),
        Lead(id="lead_003", name="Sneha Reddy", email="sneha@example.com", phone="+91-76543-21098",
             course_interest="B.Tech ECE", status=LeadStatus.QUALIFIED, source=LeadSource.CAMPUS_EVENT),
        Lead(id="lead_004", name="Vikram Singh", email="vikram@example.com", phone="+91-65432-10987",
             course_interest="MCA", status=LeadStatus.APPLICATION, source=LeadSource.WEBSITE),
        Lead(id="lead_005", name="Ananya Joshi", email="ananya@example.com", phone="+91-54321-09876",
             course_interest="B.Sc Physics", status=LeadStatus.ENROLLED, source=LeadSource.WALK_IN),
    ]
    for lead in leads:
        db.add(lead)
    await db.flush()
    print("  ✓ Leads seeded")


async def seed_hostels(db: AsyncSession):
    """Create hostel data."""
    hostels = [
        Hostel(id="hostel_ba", name="Boys Hostel A", type=HostelType.BOYS, capacity=200, occupancy=190),
        Hostel(id="hostel_bb", name="Boys Hostel B", type=HostelType.BOYS, capacity=180, occupancy=158),
        Hostel(id="hostel_ga", name="Girls Hostel A", type=HostelType.GIRLS, capacity=150, occupancy=146),
        Hostel(id="hostel_gb", name="Girls Hostel B", type=HostelType.GIRLS, capacity=160, occupancy=131),
    ]
    for hostel in hostels:
        db.add(hostel)
    await db.flush()
    print("  ✓ Hostels seeded")


async def seed_transport(db: AsyncSession):
    """Create transport routes."""
    routes = [
        TransportRoute(id="route_01", name="Route 1 — City Center", buses=3, students=145, status=TransportRouteStatus.ACTIVE),
        TransportRoute(id="route_02", name="Route 2 — Station Road", buses=2, students=98, status=TransportRouteStatus.ACTIVE),
        TransportRoute(id="route_03", name="Route 3 — Highway", buses=2, students=112, status=TransportRouteStatus.ACTIVE),
        TransportRoute(id="route_04", name="Route 4 — Old Town", buses=1, students=56, status=TransportRouteStatus.DELAYED),
    ]
    for route in routes:
        db.add(route)
    await db.flush()
    print("  ✓ Transport routes seeded")


async def seed_transactions(db: AsyncSession):
    """Create financial transactions."""
    from datetime import datetime, timezone
    transactions = [
        Transaction(id="txn_001", type=TransactionType.CREDIT, category=TransactionCategory.TUITION_FEE,
                    amount=85000, description="Tuition Fee - Aarav Sharma", date=datetime.now(timezone.utc)),
        Transaction(id="txn_002", type=TransactionType.DEBIT, category=TransactionCategory.PAYROLL,
                    amount=1210000, description="Faculty Salary - June 2026", date=datetime.now(timezone.utc)),
        Transaction(id="txn_003", type=TransactionType.CREDIT, category=TransactionCategory.HOSTEL_FEE,
                    amount=45000, description="Hostel Fee - Priya Patel", date=datetime.now(timezone.utc)),
        Transaction(id="txn_004", type=TransactionType.DEBIT, category=TransactionCategory.EQUIPMENT,
                    amount=180000, description="Lab Equipment Purchase", date=datetime.now(timezone.utc)),
    ]
    for txn in transactions:
        db.add(txn)
    await db.flush()
    print("  ✓ Transactions seeded")


async def main():
    """Run all seed functions."""
    print("🌱 Seeding CollegeOS database...")

    async with AsyncSessionLocal() as db:
        try:
            await seed_users(db)
            await seed_departments(db)
            await seed_leads(db)
            await seed_hostels(db)
            await seed_transport(db)
            await seed_transactions(db)
            await db.commit()
            print("\n✅ Database seeded successfully!")
        except Exception as e:
            await db.rollback()
            print(f"\n❌ Seeding failed: {e}")
            raise


if __name__ == "__main__":
    asyncio.run(main())
