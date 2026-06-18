"""
CollegeOS — Generic Paginated Response Schema
"""

from pydantic import BaseModel
from typing import Generic, TypeVar, List

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    page_size: int
    total_pages: int

    model_config = {"from_attributes": True}


class HealthResponse(BaseModel):
    status: str
    version: str
    environment: str
    database: str
    redis: str
