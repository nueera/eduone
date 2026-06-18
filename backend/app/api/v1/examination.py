"""
CollegeOS — Examination API Routes
Exam scheduling, results, grading, and question papers.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.core.database import get_db
from app.core.deps import CurrentUser
from app.models.examination import Exam, Result, QuestionPaper

router = APIRouter(prefix="/examination", tags=["Examination"])


@router.get("/dashboard")
async def get_dashboard(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """Get examination dashboard statistics."""
    total = await db.scalar(select(func.count()).select_from(Exam))
    completed = await db.scalar(select(func.count()).where(Exam.status == "COMPLETED"))
    scheduled = await db.scalar(select(func.count()).where(Exam.status == "SCHEDULED"))
    results = await db.scalar(select(func.count()).select_from(Result))

    avg_score = await db.scalar(select(func.avg(Result.percentage)))

    return {
        "total_exams": total or 0,
        "completed": completed or 0,
        "scheduled": scheduled or 0,
        "results_published": results or 0,
        "avg_score": round(avg_score or 0, 1),
    }


@router.get("/exams")
async def list_exams(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """List all exams."""
    result = await db.execute(select(Exam).order_by(Exam.date))
    return result.scalars().all()


@router.get("/results")
async def list_results(
    exam_id: str = None,
    db: AsyncSession = Depends(get_db),
    user: dict = CurrentUser,
):
    """List exam results."""
    query = select(Result)
    if exam_id:
        query = query.where(Result.exam_id == exam_id)
    result = await db.execute(query.limit(100))
    return result.scalars().all()


@router.get("/question-papers")
async def list_question_papers(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """List all question papers."""
    result = await db.execute(select(QuestionPaper))
    return result.scalars().all()
