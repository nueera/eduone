"""
CollegeOS — Celery Worker Configuration
Background task processing for emails, reports, and scheduled jobs.
"""

from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "collegeos-worker",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
)

# Auto-discover tasks from modules
celery_app.autodiscover_tasks(["app.services"])


@celery_app.task(bind=True)
def debug_task(self):
    """Debug task for testing Celery connectivity."""
    print(f"Request: {self.request!r}")
