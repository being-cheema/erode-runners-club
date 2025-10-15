import httpx
from datetime import datetime, timezone
from typing import Dict, List, Optional
from sqlalchemy.orm import Session
from app.config import settings
from app.models import User, Activity
import logging

logger = logging.getLogger(__name__)

STRAVA_API_BASE_URL = "https://www.strava.com/api/v3"
STRAVA_OAUTH_URL = "https://www.strava.com/oauth/token"

class StravaService:
    
    @staticmethod
    async def exchange_code_for_token(code: str) -> Dict:
        """Exchange authorization code for access token"""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                STRAVA_OAUTH_URL,
                data={
                    "client_id": settings.STRAVA_CLIENT_ID,
                    "client_secret": settings.STRAVA_CLIENT_SECRET,
                    "code": code,
                    "grant_type": "authorization_code"
                }
            )
            response.raise_for_status()
            return response.json()
    
    @staticmethod
    async def refresh_access_token(refresh_token: str) -> Dict:
        """Refresh Strava access token"""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                STRAVA_OAUTH_URL,
                data={
                    "client_id": settings.STRAVA_CLIENT_ID,
                    "client_secret": settings.STRAVA_CLIENT_SECRET,
                    "refresh_token": refresh_token,
                    "grant_type": "refresh_token"
                }
            )
            response.raise_for_status()
            return response.json()
    
    @staticmethod
    async def get_valid_access_token(user: User, db: Session) -> str:
        """Get a valid access token, refreshing if necessary"""
        now = datetime.now(timezone.utc)
        
        # Check if token is expired or about to expire (within 1 hour)
        if user.strava_token_expires_at and user.strava_token_expires_at <= now:
            logger.info(f"Refreshing token for user {user.id}")
            token_data = await StravaService.refresh_access_token(user.strava_refresh_token)
            
            # Update user tokens
            user.strava_access_token = token_data["access_token"]
            user.strava_refresh_token = token_data["refresh_token"]
            user.strava_token_expires_at = datetime.fromtimestamp(token_data["expires_at"], tz=timezone.utc)
            db.commit()
            
            return token_data["access_token"]
        
        return user.strava_access_token
    
    @staticmethod
    async def get_athlete_activities(
        access_token: str,
        page: int = 1,
        per_page: int = 100,
        after: Optional[int] = None,
        before: Optional[int] = None
    ) -> List[Dict]:
        """Get athlete activities from Strava"""
        params = {
            "page": page,
            "per_page": per_page
        }
        if after:
            params["after"] = after
        if before:
            params["before"] = before
        
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{STRAVA_API_BASE_URL}/athlete/activities",
                headers={"Authorization": f"Bearer {access_token}"},
                params=params,
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
    
    @staticmethod
    async def get_athlete_info(access_token: str) -> Dict:
        """Get athlete information"""
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{STRAVA_API_BASE_URL}/athlete",
                headers={"Authorization": f"Bearer {access_token}"},
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
    
    @staticmethod
    def save_activity_to_db(db: Session, user: User, activity_data: Dict) -> Activity:
        """Save or update activity in database"""
        strava_activity_id = str(activity_data["id"])
        
        # Check if activity already exists
        existing_activity = db.query(Activity).filter(
            Activity.strava_activity_id == strava_activity_id
        ).first()
        
        if existing_activity:
            # Update existing activity
            for key, value in activity_data.items():
                if hasattr(existing_activity, key):
                    setattr(existing_activity, key, value)
            existing_activity.synced_at = datetime.utcnow()
            db.commit()
            db.refresh(existing_activity)
            return existing_activity
        
        # Create new activity
        activity = Activity(
            user_id=user.id,
            strava_activity_id=strava_activity_id,
            name=activity_data["name"],
            sport_type=activity_data.get("sport_type", "Run"),
            distance=activity_data["distance"],
            moving_time=activity_data["moving_time"],
            elapsed_time=activity_data["elapsed_time"],
            total_elevation_gain=activity_data.get("total_elevation_gain", 0),
            average_speed=activity_data.get("average_speed"),
            max_speed=activity_data.get("max_speed"),
            average_heartrate=activity_data.get("average_heartrate"),
            max_heartrate=activity_data.get("max_heartrate"),
            average_cadence=activity_data.get("average_cadence"),
            start_date=datetime.fromisoformat(activity_data["start_date"].replace("Z", "+00:00")),
            start_date_local=datetime.fromisoformat(activity_data["start_date_local"].replace("Z", "+00:00")),
            timezone=activity_data.get("timezone"),
            start_latlng=activity_data.get("start_latlng"),
            end_latlng=activity_data.get("end_latlng"),
            achievement_count=activity_data.get("achievement_count", 0),
            kudos_count=activity_data.get("kudos_count", 0),
            comment_count=activity_data.get("comment_count", 0),
            athlete_count=activity_data.get("athlete_count", 1),
            map_summary_polyline=activity_data.get("map", {}).get("summary_polyline"),
            synced_at=datetime.utcnow()
        )
        
        db.add(activity)
        db.commit()
        db.refresh(activity)
        return activity
    
    @staticmethod
    async def sync_user_activities(db: Session, user: User, days_back: int = 90) -> int:
        """Sync user activities from Strava"""
        try:
            access_token = await StravaService.get_valid_access_token(user, db)
            
            # Calculate 'after' timestamp (90 days back)
            after_timestamp = int((datetime.now() - timedelta(days=days_back)).timestamp())
            
            activities_synced = 0
            page = 1
            
            while True:
                activities = await StravaService.get_athlete_activities(
                    access_token=access_token,
                    page=page,
                    per_page=100,
                    after=after_timestamp
                )
                
                if not activities:
                    break
                
                for activity_data in activities:
                    # Only sync running activities
                    if "Run" in activity_data.get("sport_type", ""):
                        StravaService.save_activity_to_db(db, user, activity_data)
                        activities_synced += 1
                
                # Check if we've received all activities
                if len(activities) < 100:
                    break
                
                page += 1
            
            logger.info(f"Synced {activities_synced} activities for user {user.id}")
            return activities_synced
            
        except Exception as e:
            logger.error(f"Error syncing activities for user {user.id}: {str(e)}")
            raise

from datetime import timedelta