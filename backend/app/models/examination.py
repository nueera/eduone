"""
CollegeOS — Examination Models
Exam scheduling, results, grading, and question papers.
"""

from sqlalchemy import Column, String, Integer, Float, DateTime, Enum, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum

from app.core.database import Base


class ExamType(str, enum.Enum):
    MIDTERM = "MIDTERM"
    FINAL = "FINAL"
    SUPPLEMENTARY = "SUPPLEMENTARY"
    QUIZ = "QUIZ"
    PRACTICAL = "PRACTICAL"


class ExamStatus(str, enum.Enum):
    SCHEDULED = "SCHEDULED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"


class Exam(Base):
    __tablename__ = "examination_exams"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    course_id = Column(String, ForeignKey("academics_courses.id"), nullable=False)
    type = Column(Enum(ExamType), default=ExamType.FINAL, nullable=False)
    status = Column(Enum(ExamStatus), default=ExamStatus.SCHEDULED, nullable=False)
    date = Column(DateTime, nullable=False)
    duration = Column(Integer, nullable=False)  # minutes
    total_marks = Column(Integer, nullable=False)
    room = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relations
    results = relationship("Result", back_populates="exam")


class Result(Base):
    __tablename__ = "examination_results"

    id = Column(String, primary_key=True, index=True)
    exam_id = Column(String, ForeignKey("examination_exams.id"), nullable=False)
    student_id = Column(String, ForeignKey("academics_students.id"), nullable=False)
    marks = Column(Integer, nullable=False)
    total_marks = Column(Integer, nullable=False)
    percentage = Column(Float, nullable=False)
    grade = Column(String, nullable=False)
    remarks = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relations
    exam = relationship("Exam", back_populates="results")


class QuestionPaper(Base):
    __tablename__ = "examination_question_papers"

    id = Column(String, primary_key=True, index=True)
    exam_id = Column(String, ForeignKey("examination_exams.id"), nullable=False)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=True)  # JSON or markdown content
    file_path = Column(String, nullable=True)
    created_by = Column(String, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
