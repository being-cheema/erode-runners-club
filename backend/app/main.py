from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.database import init_db, SessionLocal
from app.config import settings
from app.models import User
from app.auth import get_password_hash
from app.scheduler import start_scheduler, shutdown_scheduler

# Import routes
from app.routes import admin, auth, strava, activities, leaderboard, statistics, blog, races, dashboard

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    logger.info("Starting Erode Runners Club Backend...")
    
    # Initialize database
    init_db()
    logger.info("Database initialized")
    
    # Create default admin user if not exists
    db = SessionLocal()
    try:
        admin_user = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if not admin_user:
            admin_user = User(
                email=settings.ADMIN_EMAIL,
                username=settings.ADMIN_USERNAME,
                full_name="Admin User",
                hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                is_admin=True
            )
            db.add(admin_user)
            db.commit()
            logger.info(f"Default admin user created: {settings.ADMIN_EMAIL}")
        else:
            logger.info("Admin user already exists")
    finally:
        db.close()
    
    # Start scheduler for daily sync
    start_scheduler()
    logger.info("Scheduler started for daily Strava sync at 11 PM IST")
    
    yield
    
    # Shutdown
    logger.info("Shutting down...")
    shutdown_scheduler()
    logger.info("Scheduler stopped")

# Create FastAPI app
app = FastAPI(
    title="Erode Runners Club API",
    description="Backend API for Erode Runners Club application with Strava integration",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:3000",
        "http://localhost:5173",
        "https://caustically-unmesmeric-catherine.ngrok-free.dev"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(strava.router)
app.include_router(activities.router)
app.include_router(leaderboard.router)
app.include_router(statistics.router)
app.include_router(blog.router)
app.include_router(races.router)
app.include_router(dashboard.router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Erode Runners Club API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
