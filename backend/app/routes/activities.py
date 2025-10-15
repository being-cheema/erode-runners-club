from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, extract, desc
from app.database import get_db
from app.models import User, Activity
from app.schemas import ActivityListResponse, ActivityResponse
from app.auth import get_current_user
from typing import List
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/activities", tags=["Activities"])

@router.get("", response_model=ActivityListResponse)
async def get_user_activities(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user activities with pagination"""
    offset = (page - 1) * page_size
    
    activities = db.query(Activity).filter(
        Activity.user_id == current_user.id
    ).order_by(desc(Activity.start_date)).offset(offset).limit(page_size).all()
    
    total = db.query(func.count(Activity.id)).filter(
        Activity.user_id == current_user.id
    ).scalar()
    
    return ActivityListResponse(
        activities=[ActivityResponse.model_validate(a) for a in activities],
        total=total,
        page=page,
        page_size=page_size
    )

@router.get("/recent", response_model=List[ActivityResponse])
async def get_recent_activities(
    limit: int = Query(5, ge=1, le=20),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get recent activities"""
    activities = db.query(Activity).filter(
        Activity.user_id == current_user.id
    ).order_by(desc(Activity.start_date)).limit(limit).all()
    
    return [ActivityResponse.model_validate(a) for a in activities]