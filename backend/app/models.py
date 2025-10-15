from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    is_admin = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Strava connection
    strava_athlete_id = Column(String, unique=True, nullable=True, index=True)
    strava_access_token = Column(String, nullable=True)
    strava_refresh_token = Column(String, nullable=True)
    strava_token_expires_at = Column(DateTime, nullable=True)
    strava_connected_at = Column(DateTime, nullable=True)
    
    # Profile data
    profile_picture = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    
    # Relationships
    activities = relationship("Activity", back_populates="user", cascade="all, delete-orphan")
    blog_posts = relationship("BlogPost", back_populates="author", cascade="all, delete-orphan")


class Activity(Base):
    __tablename__ = "activities"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    
    # Strava data
    strava_activity_id = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    sport_type = Column(String, nullable=False)  # Run, Trail Run, etc.
    
    # Activity details
    distance = Column(Float, nullable=False)  # meters
    moving_time = Column(Integer, nullable=False)  # seconds
    elapsed_time = Column(Integer, nullable=False)  # seconds
    total_elevation_gain = Column(Float, default=0.0)  # meters
    
    # Performance metrics
    average_speed = Column(Float, nullable=True)  # m/s
    max_speed = Column(Float, nullable=True)  # m/s
    average_heartrate = Column(Float, nullable=True)
    max_heartrate = Column(Float, nullable=True)
    average_cadence = Column(Float, nullable=True)
    
    # Timestamps
    start_date = Column(DateTime, nullable=False)
    start_date_local = Column(DateTime, nullable=False)
    timezone = Column(String, nullable=True)
    
    # Location
    start_latlng = Column(JSON, nullable=True)  # [lat, lng]
    end_latlng = Column(JSON, nullable=True)  # [lat, lng]
    
    # Additional data
    achievement_count = Column(Integer, default=0)
    kudos_count = Column(Integer, default=0)
    comment_count = Column(Integer, default=0)
    athlete_count = Column(Integer, default=1)
    
    # Map
    map_summary_polyline = Column(Text, nullable=True)
    
    # Metadata
    synced_at = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="activities")


class BlogPost(Base):
    __tablename__ = "blog_posts"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    author_id = Column(String, ForeignKey("users.id"), nullable=False)
    
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    content = Column(Text, nullable=False)
    excerpt = Column(Text, nullable=True)
    cover_image = Column(String, nullable=True)
    
    # Categories/Tags
    category = Column(String, nullable=True)
    tags = Column(JSON, nullable=True)  # List of tags
    
    # Status
    is_published = Column(Boolean, default=False)
    published_at = Column(DateTime, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    author = relationship("User", back_populates="blog_posts")


class Race(Base):
    __tablename__ = "races"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    location = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    
    # Race details
    distance = Column(Float, nullable=False)  # meters
    elevation_gain = Column(Float, nullable=True)  # meters
    race_type = Column(String, nullable=False)  # 5K, 10K, Half Marathon, Marathon, Trail, etc.
    
    # Registration
    registration_url = Column(String, nullable=True)
    registration_deadline = Column(DateTime, nullable=True)
    max_participants = Column(Integer, nullable=True)
    
    # Status
    is_active = Column(Boolean, default=True)
    
    # Images
    cover_image = Column(String, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)