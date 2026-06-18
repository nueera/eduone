"""
CollegeOS — FastAPI Application Entry Point
Main application with all routes, middleware, and lifecycle events.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import redis.asyncio as redis

from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1 import auth, admission, academics, examination, campus, finance


# ─── Lifespan ────────────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown events."""
    # Startup
    print(f"🚀 {settings.APP_NAME} v{settings.APP_VERSION} starting...")
    print(f"   Environment: {settings.APP_ENV}")

    # Test Redis connection
    try:
        r = redis.from_url(settings.REDIS_URL)
        await r.ping()
        print("   Redis: Connected ✓")
        await r.aclose()
    except Exception as e:
        print(f"   Redis: Connection failed ✗ ({e})")

    yield

    # Shutdown
    print(f"👋 {settings.APP_NAME} shutting down...")
    await engine.dispose()


# ─── App Instance ────────────────────────────────────────────────────────────

app = FastAPI(
    title="CollegeOS API",
    description="Full-stack campus management platform — Admission CRM, Academic Ops, Examination, Campus Ops & Finance",
    version=settings.APP_VERSION,
    docs_url="/api/v1/docs",
    redoc_url="/api/v1/redoc",
    openapi_url="/api/v1/openapi.json",
    lifespan=lifespan,
)


# ─── CORS Middleware ─────────────────────────────────────────────────────────

origins = [origin.strip() for origin in settings.BACKEND_CORS_ORIGINS.split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── API Routes ──────────────────────────────────────────────────────────────

api_prefix = "/api/v1"

app.include_router(auth.router, prefix=api_prefix)
app.include_router(admission.router, prefix=api_prefix)
app.include_router(academics.router, prefix=api_prefix)
app.include_router(examination.router, prefix=api_prefix)
app.include_router(campus.router, prefix=api_prefix)
app.include_router(finance.router, prefix=api_prefix)


# ─── Health Check ────────────────────────────────────────────────────────────

@app.get("/api/v1/health", tags=["System"])
async def health_check():
    """Health check endpoint for monitoring and Docker health checks."""
    return {
        "status": "healthy",
        "version": settings.APP_VERSION,
        "environment": settings.APP_ENV,
    }


@app.get("/", tags=["System"])
async def root():
    """Root endpoint — redirects to API docs."""
    return {
        "name": "CollegeOS API",
        "version": settings.APP_VERSION,
        "docs": "/api/v1/docs",
    }
