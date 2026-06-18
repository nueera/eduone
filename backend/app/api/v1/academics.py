"""
CollegeOS — Academic Operations API Routes
Course management, faculty, students, attendance, and timetable.
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.core.database import get_db
from app.core.deps import CurrentUser
from app.models.academics import Department, Course, Faculty, Student, Attendance

router = APIRouter(prefix="/academics", tags=["Academic Operations"])


@router.get("/dashboard")
async def get_dashboard(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """Get academic dashboard statistics."""
    courses = await db.scalar(select(func.count()).select_from(Course))
    faculty_count = await db.scalar(select(func.count()).select_from(Faculty))
    students = await db.scalar(select(func.count()).select_from(Student))
    departments = await db.scalar(select(func.count()).select_from(Department))

    return {
        "active_courses": courses or 0,
        "faculty_members": faculty_count or 0,
        "total_students": students or 0,
        "departments": departments or 0,
    }


@router.get("/departments")
async def list_departments(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """List all departments."""
    result = await db.execute(select(Department))
    return result.scalars().all()


@router.get("/courses")
async def list_courses(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    user: dict = CurrentUser,
):
    """List all courses."""
    result = await db.execute(select(Course).offset(skip).limit(limit))
    return result.scalars().all()


@router.get("/faculty")
async def list_faculty(db: AsyncSession = Depends(get_db), user: dict = CurrentUser):
    """List all faculty members."""
    result = await db.execute(select(Faculty))
    return result.scalars().all()


@router.get("/students")
async def list_students(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    user: dict = CurrentUser,
):
    """List all students."""
    result = await db.execute(select(Student).offset(skip).limit(limit))
    return result.scalars().all()


@router.get("/attendance")
async def get_attendance(
    course_id: str = Query(None),
    student_id: str = Query(None),
    db: AsyncSession = Depends(get_db),
    user: dict = CurrentUser,
):
    """Get attendance records."""
    query = select(Attendance)
    if course_id:
        query = query.where(Attendance.course_id == course_id)
    if student_id:
        query = query.where(Attendance.student_id == student_id)
    result = await db.execute(query.limit(100))
    return result.scalars().all()
