from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from app.services.sync_service import SyncService
import pytz
import logging

logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler()

def start_scheduler():
    """Start the scheduler for daily Strava sync"""
    # Indian Standard Time
    ist = pytz.timezone('Asia/Kolkata')
    
    # Schedule daily sync at 11 PM IST
    scheduler.add_job(
        SyncService.sync_all_users,
        trigger=CronTrigger(hour=23, minute=0, timezone=ist),
        id='daily_strava_sync',
        name='Daily Strava Sync at 11 PM IST',
        replace_existing=True
    )
    
    scheduler.start()
    logger.info("Scheduler started. Daily sync scheduled for 11 PM IST")

def shutdown_scheduler():
    """Shutdown the scheduler"""
    scheduler.shutdown()
    logger.info("Scheduler shut down")