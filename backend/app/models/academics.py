"""
CollegeOS — Academic Operations Models
Course management, faculty, students, timetables, and attendance.
"""

from sqlalchemy import Column, String, Integer, Float, DateTime, Enum, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import enum

from app.core.database import Base


class Department(Base):
    __tablename__ = "academics_departments"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    code = Column(String, unique=True, nullable=False)
    hod_id = Column(String, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relations
    courses = relationship("Course", back_populates="department")
    faculty = relationship("Faculty", back_populates="department")


class Course(Base):
    __tablename__ = "academics_courses"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    code = Column(String, unique=True, nullable=False)
    department_id = Column(String, ForeignKey("academics_departments.id"), nullable=False)
    credits = Column(Integer, nullable=False)
    semester = Column(Integer, nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relations
    department = relationship("Department", back_populates="courses")
    enrollments = relationship("Enrollment", back_populates="course")


class Faculty(Base):
    __tablename__ = "academics_faculty"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), unique=True, nullable=False)
    department_id = Column(String, ForeignKey("academics_departments.id"), nullable=False)
    designation = Column(String, nullable=True)
    specialization = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relations
    user = relationship("User", back_populates="faculty")
    department = relationship("Department", back_populates="faculty")


class Student(Base):
    __tablename__ = "academics_students"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), unique=True, nullable=False)
    enrollment_no = Column(String, unique=True, nullable=False, index=True)
    department_id = Column(String, ForeignKey("academics_departments.id"), nullable=False)
    semester = Column(Integer, nullable=False)
    cgpa = Column(Float, default=0.0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relations
    user = relationship("User", back_populates="student")
    enrollments = relationship("Enrollment", back_populates="student")


class Enrollment(Base):
    __tablename__ = "academics_enrollments"

    id = Column(String, primary_key=True, index=True)
    student_id = Column(String, ForeignKey("academics_students.id"), nullable=False)
    course_id = Column(String, ForeignKey("academics_courses.id"), nullable=False)
    semester = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relations
    student = relationship("Student", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")


class AttendanceStatus(str, enum.Enum):
    PRESENT = "PRESENT"
    ABSENT = "ABSENT"
    LATE = "LATE"
    EXCUSED = "EXCUSED"


class Attendance(Base):
    __tablename__ = "academics_attendance"

    id = Column(String, primary_key=True, index=True)
    student_id = Column(String, ForeignKey("academics_students.id"), nullable=False)
    course_id = Column(String, ForeignKey("academics_courses.id"), nullable=False)
    date = Column(DateTime, nullable=False)
    status = Column(Enum(AttendanceStatus), default=AttendanceStatus.PRESENT, nullable=False)
    remarks = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class TimetableSlot(Base):
    __tablename__ = "academics_timetable"

    id = Column(String, primary_key=True, index=True)
    course_id = Column(String, ForeignKey("academics_courses.id"), nullable=False)
    faculty_id = Column(String, ForeignKey("academics_faculty.id"), nullable=False)
    day_of_week = Column(Integer, nullable=False)  # 0=Monday, 6=Sunday
    start_time = Column(String, nullable=False)  # "09:00"
    end_time = Column(String, nullable=False)  # "10:30"
    room = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
