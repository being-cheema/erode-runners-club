from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.database import get_db
from app.models import Race
from app.schemas import RaceCreate, RaceUpdate, RaceResponse
from app.auth import get_current_admin_user
from typing import List
from datetime import datetime

router = APIRouter(prefix="/api/races", tags=["Races"])

@router.get("", response_model=List[RaceResponse])
async def get_races(
    upcoming_only: bool = True,
    db: Session = Depends(get_db)
):
    """Get all races"""
    query = db.query(Race).filter(Race.is_active == True)
    
    if upcoming_only:
        query = query.filter(Race.date >= datetime.now())
    
    races = query.order_by(Race.date).all()
    return [RaceResponse.model_validate(race) for race in races]

@router.get("/{race_id}", response_model=RaceResponse)
async def get_race(
    race_id: str,
    db: Session = Depends(get_db)
):
    """Get single race"""
    race = db.query(Race).filter(Race.id == race_id).first()
    
    if not race:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Race not found"
        )
    
    return RaceResponse.model_validate(race)

@router.post("", response_model=RaceResponse, status_code=status.HTTP_201_CREATED)
async def create_race(
    race_data: RaceCreate,
    current_user = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new race (Admin only)"""
    new_race = Race(**race_data.model_dump())
    
    db.add(new_race)
    db.commit()
    db.refresh(new_race)
    
    return RaceResponse.model_validate(new_race)

@router.put("/{race_id}", response_model=RaceResponse)
async def update_race(
    race_id: str,
    race_data: RaceUpdate,
    current_user = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Update race (Admin only)"""
    race = db.query(Race).filter(Race.id == race_id).first()
    
    if not race:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Race not found"
        )
    
    update_data = race_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(race, key, value)
    
    race.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(race)
    
    return RaceResponse.model_validate(race)

@router.delete("/{race_id}")
async def delete_race(
    race_id: str,
    current_user = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Delete race (Admin only)"""
    race = db.query(Race).filter(Race.id == race_id).first()
    
    if not race:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Race not found"
        )
    
    db.delete(race)
    db.commit()
    
    return {"message": "Race deleted successfully"}