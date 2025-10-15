from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, extract, desc
from app.database import get_db
from app.models import User, Activity, Race
from app.schemas import DashboardStats, UserStats, RaceResponse, ActivityResponse
from app.auth import get_current_user
from datetime import datetime, timedelta
from typing import List

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("", response_model=DashboardStats)
async def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get dashboard data for current user"""
    # Get all user activities
    all_activities = db.query(Activity).filter(
        Activity.user_id == current_user.id
    ).all()
    
    # Calculate overall stats
    if all_activities:
        total_distance = sum(a.distance for a in all_activities)
        total_time = sum(a.moving_time for a in all_activities)
        total_elevation = sum(a.total_elevation_gain for a in all_activities)
        longest_run = max(a.distance for a in all_activities)
        average_pace = (total_time / 60) / (total_distance / 1000) if total_distance > 0 else 0
    else:
        total_distance = total_time = total_elevation = longest_run = average_pace = 0
    
    user_stats = UserStats(
        total_distance=round(total_distance / 1000, 2),
        total_activities=len(all_activities),
        total_time=round(total_time / 60),
        total_elevation=round(total_elevation, 2),
        average_pace=round(average_pace, 2),
        longest_run=round(longest_run / 1000, 2)
    )
    
    # Monthly distance
    now = datetime.now()
    month_start = datetime(now.year, now.month, 1)
    monthly_activities = [a for a in all_activities if a.start_date_local >= month_start]
    monthly_distance = sum(a.distance for a in monthly_activities) / 1000
    
    # Weekly distance
    week_start = now - timedelta(days=now.weekday())
    weekly_activities = [a for a in all_activities if a.start_date_local >= week_start]
    weekly_distance = sum(a.distance for a in weekly_activities) / 1000
    
    # Upcoming races
    upcoming_races = db.query(Race).filter(
        Race.is_active == True,
        Race.date >= datetime.now()
    ).order_by(Race.date).limit(3).all()
    
    # Recent activities
    recent_activities = db.query(Activity).filter(
        Activity.user_id == current_user.id
    ).order_by(desc(Activity.start_date)).limit(5).all()
    
    # Get user rank
    leaderboard_data = db.query(
        User.id,
        func.sum(Activity.distance).label('total_distance')
    ).join(
        Activity, User.id == Activity.user_id
    ).filter(
        extract('month', Activity.start_date_local) == now.month,
        extract('year', Activity.start_date_local) == now.year
    ).group_by(
        User.id
    ).order_by(
        func.sum(Activity.distance).desc()
    ).all()
    
    user_rank = None
    for rank, data in enumerate(leaderboard_data, start=1):
        if data.id == current_user.id:
            user_rank = rank
            break
    
    return DashboardStats(
        user_stats=user_stats,
        monthly_distance=round(monthly_distance, 2),
        weekly_distance=round(weekly_distance, 2),
        upcoming_races=[RaceResponse.model_validate(r) for r in upcoming_races],
        recent_activities=[ActivityResponse.model_validate(a) for a in recent_activities],
        user_rank=user_rank
    )