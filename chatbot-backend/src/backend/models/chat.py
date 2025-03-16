from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum

# Định nghĩa Enum cho role để tránh nhập sai dữ liệu
class Role(str, Enum):
    USER = "user"
    MODEL = "model"

# Model cho phần nội dung (text)
class Part(BaseModel):
    text: str

# Model cho một tin nhắn trong lịch sử hội thoại
class HistoryItem(BaseModel):
    role: Role
    parts: List[Part]
    img: Optional[str] = None  

# Model chính cho cuộc hội thoại
class Chat(BaseModel):
    user: str
    history: List[HistoryItem] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
