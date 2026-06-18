"""
CollegeOS — Shared Dependencies
Common FastAPI dependencies used across route handlers.
"""

from typing import AsyncGenerator
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user

# Re-export commonly used dependencies
CurrentUser = Depends(get_current_user)
DbSession = Depends(get_db)
