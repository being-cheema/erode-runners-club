from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, extract, case
from app.database import get_db
from app.models import User, Activity
from app.schemas import LeaderboardResponse, LeaderboardEntry
from datetime import datetime
from typing import Optional

router = APIRouter(prefix="/api/leaderboard", tags=["Leaderboard"])

@router.get("", response_model=LeaderboardResponse)
async def get_leaderboard(
    month: Optional[int] = Query(None, ge=1, le=12),
    year: Optional[int] = Query(None, ge=2020),
    db: Session = Depends(get_db)
):
    """Get leaderboard for specific month/year"""
    # Default to current month/year
    if not month:
        month = datetime.now().month
    if not year:
        year = datetime.now().year
    
    # Query to get total distance per user for the month
    leaderboard_data = db.query(
        User.id,
        User.username,
        User.full_name,
        User.profile_picture,
        func.sum(Activity.distance).label('total_distance'),
        func.count(Activity.id).label('total_activities')
    ).join(
        Activity, User.id == Activity.user_id
    ).filter(
        extract('month', Activity.start_date_local) == month,
        extract('year', Activity.start_date_local) == year
    ).group_by(
        User.id, User.username, User.full_name, User.profile_picture
    ).order_by(
        func.sum(Activity.distance).desc()
    ).all()
    
    # Build leaderboard entries with ranks
    entries = []
    for rank, data in enumerate(leaderboard_data, start=1):
        entries.append(LeaderboardEntry(
            user_id=data.id,
            username=data.username,
            full_name=data.full_name,
            profile_picture=data.profile_picture,
            total_distance=round(data.total_distance / 1000, 2),  # Convert to km
            total_activities=data.total_activities,
            rank=rank
        ))
    
    return LeaderboardResponse(
        month=datetime(year, month, 1).strftime("%B"),
        year=year,
        entries=entries
    )