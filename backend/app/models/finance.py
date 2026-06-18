"""
CollegeOS — Finance Models
Fee collection, payroll, transactions, and budgeting.
"""

from sqlalchemy import Column, String, Integer, Float, DateTime, Enum, ForeignKey, Text
from datetime import datetime, timezone
import enum

from app.core.database import Base


class TransactionType(str, enum.Enum):
    CREDIT = "CREDIT"
    DEBIT = "DEBIT"


class TransactionCategory(str, enum.Enum):
    TUITION_FEE = "TUITION_FEE"
    HOSTEL_FEE = "HOSTEL_FEE"
    TRANSPORT_FEE = "TRANSPORT_FEE"
    LAB_FEE = "LAB_FEE"
    EXAM_FEE = "EXAM_FEE"
    PAYROLL = "PAYROLL"
    EQUIPMENT = "EQUIPMENT"
    MAINTENANCE = "MAINTENANCE"
    OTHER = "OTHER"


class Transaction(Base):
    __tablename__ = "finance_transactions"

    id = Column(String, primary_key=True, index=True)
    type = Column(Enum(TransactionType), nullable=False)
    category = Column(Enum(TransactionCategory), nullable=False)
    amount = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    reference = Column(String, nullable=True)  # Receipt / invoice number
    date = Column(DateTime, nullable=False)
    processed_by = Column(String, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class FeeStructure(Base):
    __tablename__ = "finance_fee_structures"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(Enum(TransactionCategory), nullable=False)
    program = Column(String, nullable=False)
    semester = Column(Integer, nullable=False)
    academic_year = Column(String, nullable=False)
    due_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class FeePayment(Base):
    __tablename__ = "finance_fee_payments"

    id = Column(String, primary_key=True, index=True)
    student_id = Column(String, ForeignKey("academics_students.id"), nullable=False)
    fee_structure_id = Column(String, ForeignKey("finance_fee_structures.id"), nullable=False)
    amount_paid = Column(Float, nullable=False)
    payment_method = Column(String, nullable=True)  # CASH, UPI, BANK_TRANSFER
    transaction_id = Column(String, ForeignKey("finance_transactions.id"), nullable=True)
    status = Column(String, default="completed")  # pending, completed, failed, refunded
    paid_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class PayrollEntry(Base):
    __tablename__ = "finance_payroll"

    id = Column(String, primary_key=True, index=True)
    faculty_id = Column(String, ForeignKey("academics_faculty.id"), nullable=False)
    month = Column(String, nullable=False)  # "2026-06"
    base_salary = Column(Float, nullable=False)
    deductions = Column(Float, default=0.0)
    bonuses = Column(Float, default=0.0)
    net_salary = Column(Float, nullable=False)
    status = Column(String, default="pending")  # pending, processed, paid
    paid_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class BudgetAllocation(Base):
    __tablename__ = "finance_budgets"

    id = Column(String, primary_key=True, index=True)
    department_id = Column(String, ForeignKey("academics_departments.id"), nullable=False)
    category = Column(String, nullable=False)
    allocated = Column(Float, nullable=False)
    spent = Column(Float, default=0.0)
    academic_year = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
