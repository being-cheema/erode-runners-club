from datetime import datetime
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User
from app.services.strava_service import StravaService
import logging

logger = logging.getLogger(__name__)

class SyncService:
    
    @staticmethod
    async def sync_all_users():
        """Sync all users with Strava connection - called daily at 11 PM IST"""
        db = SessionLocal()
        try:
            # Get all users with Strava connection
            users = db.query(User).filter(
                User.strava_athlete_id.isnot(None),
                User.is_active == True
            ).all()
            
            logger.info(f"Starting daily sync for {len(users)} users at {datetime.now()}")
            
            total_synced = 0
            for user in users:
                try:
                    activities_synced = await StravaService.sync_user_activities(db, user, days_back=7)
                    total_synced += activities_synced
                    logger.info(f"Synced {activities_synced} activities for user {user.username}")
                except Exception as e:
                    logger.error(f"Error syncing user {user.username}: {str(e)}")
                    continue
            
            logger.info(f"Daily sync completed. Total activities synced: {total_synced}")
            
        except Exception as e:
            logger.error(f"Error in daily sync: {str(e)}")
        finally:
            db.close()