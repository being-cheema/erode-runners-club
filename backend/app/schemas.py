from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str
    is_admin: bool = False

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    bio: Optional[str] = None
    profile_picture: Optional[str] = None

class UserResponse(UserBase):
    id: str
    is_admin: bool
    is_active: bool
    strava_athlete_id: Optional[str] = None
    strava_connected_at: Optional[datetime] = None
    profile_picture: Optional[str] = None
    bio: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Strava Schemas
class StravaConnect(BaseModel):
    code: str

class StravaTokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    expires_at: int
    athlete_id: str

# Activity Schemas
class ActivityBase(BaseModel):
    name: str
    sport_type: str
    distance: float
    moving_time: int
    elapsed_time: int

class ActivityResponse(ActivityBase):
    id: str
    user_id: str
    strava_activity_id: str
    total_elevation_gain: float
    average_speed: Optional[float] = None
    max_speed: Optional[float] = None
    start_date: datetime
    start_date_local: datetime
    achievement_count: int
    kudos_count: int
    synced_at: datetime
    
    class Config:
        from_attributes = True

class ActivityListResponse(BaseModel):
    activities: List[ActivityResponse]
    total: int
    page: int
    page_size: int

# Blog Schemas
class BlogPostBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    cover_image: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None

class BlogPostCreate(BlogPostBase):
    is_published: bool = False

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    cover_image: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    is_published: Optional[bool] = None

class BlogPostResponse(BlogPostBase):
    id: str
    author_id: str
    slug: str
    is_published: bool
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Race Schemas
class RaceBase(BaseModel):
    name: str
    description: Optional[str] = None
    location: str
    date: datetime
    distance: float
    elevation_gain: Optional[float] = None
    race_type: str
    registration_url: Optional[str] = None
    registration_deadline: Optional[datetime] = None
    max_participants: Optional[int] = None
    cover_image: Optional[str] = None

class RaceCreate(RaceBase):
    pass

class RaceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    date: Optional[datetime] = None
    distance: Optional[float] = None
    elevation_gain: Optional[float] = None
    race_type: Optional[str] = None
    registration_url: Optional[str] = None
    registration_deadline: Optional[datetime] = None
    max_participants: Optional[int] = None
    cover_image: Optional[str] = None
    is_active: Optional[bool] = None

class RaceResponse(RaceBase):
    id: str
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Statistics Schemas
class UserStats(BaseModel):
    total_distance: float  # km
    total_activities: int
    total_time: int  # minutes
    total_elevation: float  # meters
    average_pace: float  # min/km
    longest_run: float  # km
    
class LeaderboardEntry(BaseModel):
    user_id: str
    username: str
    full_name: Optional[str]
    profile_picture: Optional[str]
    total_distance: float  # km
    total_activities: int
    rank: int

class LeaderboardResponse(BaseModel):
    month: str
    year: int
    entries: List[LeaderboardEntry]

# Dashboard Schemas
class DashboardStats(BaseModel):
    user_stats: UserStats
    monthly_distance: float
    weekly_distance: float
    upcoming_races: List[RaceResponse]
    recent_activities: List[ActivityResponse]
    user_rank: Optional[int] = None