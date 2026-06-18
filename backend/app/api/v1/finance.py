"""
CollegeOS — Finance API Routes
Fee collection, payroll, transactions, and budgeting.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.core.database import get_db
from app.core.deps import CurrentUser
from app.models.finance import Transaction, FeeStructure, FeePayment, PayrollEntry, BudgetAllocation

router = APIRouter(prefix="/finance", tags=["Finance"])


@router.get("/dashboard")
async def get_dashboard(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """Get finance dashboard statistics."""
    total_credits = await db.scalar(select(func.sum(Transaction.amount)).where(Transaction.type == "CREDIT"))
    total_debits = await db.scalar(select(func.sum(Transaction.amount)).where(Transaction.type == "DEBIT"))
    pending_fees = await db.scalar(select(func.sum(FeeStructure.amount)))
    payroll_total = await db.scalar(select(func.sum(PayrollEntry.net_salary)).where(PayrollEntry.status == "paid"))

    revenue = total_credits or 0
    expenses = total_debits or 0
    surplus = revenue - expenses

    return {
        "revenue": revenue,
        "expenses": expenses,
        "surplus": surplus,
        "pending_fees": pending_fees or 0,
        "payroll_total": payroll_total or 0,
    }


@router.get("/transactions")
async def list_transactions(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """List all transactions."""
    result = await db.execute(select(Transaction).order_by(Transaction.date.desc()).limit(50))
    return result.scalars().all()


@router.get("/fee-structures")
async def list_fee_structures(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """List all fee structures."""
    result = await db.execute(select(FeeStructure))
    return result.scalars().all()


@router.get("/fee-payments")
async def list_fee_payments(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """List fee payment records."""
    result = await db.execute(select(FeePayment).order_by(FeePayment.paid_at.desc()).limit(50))
    return result.scalars().all()


@router.get("/payroll")
async def list_payroll(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """List payroll entries."""
    result = await db.execute(select(PayrollEntry).order_by(PayrollEntry.month.desc()).limit(50))
    return result.scalars().all()


@router.get("/budgets")
async def list_budgets(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """List budget allocations."""
    result = await db.execute(select(BudgetAllocation))
    return result.scalars().all()
