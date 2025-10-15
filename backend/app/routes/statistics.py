from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from app.database import get_db
from app.models import User, Activity
from app.schemas import UserStats
from app.auth import get_current_user
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/statistics", tags=["Statistics"])

@router.get("", response_model=UserStats)
async def get_user_statistics(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user statistics"""
    activities = db.query(Activity).filter(
        Activity.user_id == current_user.id
    ).all()
    
    if not activities:
        return UserStats(
            total_distance=0,
            total_activities=0,
            total_time=0,
            total_elevation=0,
            average_pace=0,
            longest_run=0
        )
    
    total_distance = sum(a.distance for a in activities)  # meters
    total_time = sum(a.moving_time for a in activities)  # seconds
    total_elevation = sum(a.total_elevation_gain for a in activities)
    longest_run = max(a.distance for a in activities) if activities else 0
    
    # Calculate average pace (min/km)
    if total_distance > 0:
        average_pace = (total_time / 60) / (total_distance / 1000)
    else:
        average_pace = 0
    
    return UserStats(
        total_distance=round(total_distance / 1000, 2),  # Convert to km
        total_activities=len(activities),
        total_time=round(total_time / 60),  # Convert to minutes
        total_elevation=round(total_elevation, 2),
        average_pace=round(average_pace, 2),
        longest_run=round(longest_run / 1000, 2)  # Convert to km
    )

@router.get("/monthly")
async def get_monthly_statistics(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get statistics for current month"""
    now = datetime.now()
    month_start = datetime(now.year, now.month, 1)
    
    activities = db.query(Activity).filter(
        Activity.user_id == current_user.id,
        Activity.start_date_local >= month_start
    ).all()
    
    total_distance = sum(a.distance for a in activities) / 1000  # km
    total_activities = len(activities)
    
    return {
        "month": now.strftime("%B %Y"),
        "total_distance": round(total_distance, 2),
        "total_activities": total_activities
    }

@router.get("/weekly")
async def get_weekly_statistics(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get statistics for current week"""
    now = datetime.now()
    week_start = now - timedelta(days=now.weekday())
    
    activities = db.query(Activity).filter(
        Activity.user_id == current_user.id,
        Activity.start_date_local >= week_start
    ).all()
    
    total_distance = sum(a.distance for a in activities) / 1000  # km
    total_activities = len(activities)
    
    return {
        "week_start": week_start.strftime("%Y-%m-%d"),
        "total_distance": round(total_distance, 2),
        "total_activities": total_activities
    }