from odmantic import Model
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# Sự kiện trong lịch của user
class CalendarEvent(BaseModel):
    title: str
    description: Optional[str] = ""
    date: datetime

# Schema Pydantic để validate request
class UserSchema(BaseModel):
    username: str
    email: EmailStr
    gender: str
    date_of_birth: datetime
    profile_picture: Optional[str] = None
    cover_picture: Optional[str] = None
    followers: List[str] = []
    followings: List[str] = []
    notifications: List[str] = []
    status: str = "active"
    liked_posts: List[str] = []
    saved_posts: List[str] = []
    posts_count: int = 0
    follower_count: int = 0
    following_count: int = 0
    bio: Optional[str] = None
    calendar_events: List[CalendarEvent] = []
    read_documents: List[str] = []
    purchased_documents: List[str] = []
    saved_documents: List[str] = []
    role: str = "user"
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()

    class Config:
        orm_mode = True

# Model ODMantic để lưu vào MongoDB
class User(UserSchema, Model):
    pass
