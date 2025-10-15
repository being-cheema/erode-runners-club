from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.database import get_db
from app.models import User
from app.schemas import StravaConnect
from app.auth import get_current_user
from app.services.strava_service import StravaService
from app.config import settings
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/strava", tags=["Strava"])

@router.get("/connect")
async def connect_strava(current_user: User = Depends(get_current_user)):
    """Generate Strava OAuth URL"""
    strava_auth_url = (
        f"https://www.strava.com/oauth/authorize?"
        f"client_id={settings.STRAVA_CLIENT_ID}&"
        f"response_type=code&"
        f"redirect_uri={settings.STRAVA_REDIRECT_URI}&"
        f"approval_prompt=force&"
        f"scope=read,activity:read_all"
    )
    return {"auth_url": strava_auth_url}

@router.get("/callback")
async def strava_callback(
    code: str = Query(...),
    state: str = Query(None),
    db: Session = Depends(get_db)
):
    """Handle Strava OAuth callback"""
    try:
        # Exchange code for token
        token_data = await StravaService.exchange_code_for_token(code)
        
        # Extract athlete info
        athlete_id = str(token_data["athlete"]["id"])
        
        # Find user by athlete_id or create/update
        # Note: In production, you'd want to tie this to the logged-in user
        # For now, we'll update any user with this athlete_id or return info
        
        logger.info(f"Strava connected for athlete {athlete_id}")
        
        # Redirect to frontend with success
        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}/?strava_connected=true&athlete_id={athlete_id}"
        )
        
    except Exception as e:
        logger.error(f"Error in Strava callback: {str(e)}")
        return RedirectResponse(
            url=f"{settings.FRONTEND_URL}/?strava_connected=false&error={str(e)}"
        )

@router.post("/link")
async def link_strava_account(
    strava_data: StravaConnect,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Link Strava account to user"""
    try:
        # Exchange code for token
        token_data = await StravaService.exchange_code_for_token(strava_data.code)
        
        # Update user with Strava data
        current_user.strava_athlete_id = str(token_data["athlete"]["id"])
        current_user.strava_access_token = token_data["access_token"]
        current_user.strava_refresh_token = token_data["refresh_token"]
        current_user.strava_token_expires_at = datetime.fromtimestamp(
            token_data["expires_at"], tz=timezone.utc
        )
        current_user.strava_connected_at = datetime.utcnow()
        
        # Update profile picture if available
        if "athlete" in token_data and "profile" in token_data["athlete"]:
            current_user.profile_picture = token_data["athlete"]["profile"]
        
        db.commit()
        db.refresh(current_user)
        
        # Trigger initial sync
        await StravaService.sync_user_activities(db, current_user, days_back=90)
        
        return {
            "message": "Strava account linked successfully",
            "athlete_id": current_user.strava_athlete_id
        }
        
    except Exception as e:
        logger.error(f"Error linking Strava account: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to link Strava account: {str(e)}"
        )

@router.post("/sync")
async def sync_strava_activities(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Manually trigger Strava sync"""
    if not current_user.strava_athlete_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Strava account not connected"
        )
    
    try:
        activities_synced = await StravaService.sync_user_activities(db, current_user, days_back=90)
        return {
            "message": "Sync completed",
            "activities_synced": activities_synced
        }
    except Exception as e:
        logger.error(f"Error syncing activities: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Sync failed: {str(e)}"
        )

@router.delete("/disconnect")
async def disconnect_strava(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Disconnect Strava account"""
    current_user.strava_athlete_id = None
    current_user.strava_access_token = None
    current_user.strava_refresh_token = None
    current_user.strava_token_expires_at = None
    current_user.strava_connected_at = None
    
    db.commit()
    
    return {"message": "Strava account disconnected"}