from fastapi import FastAPI, Depends, Response, status # <- (2)
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.chat import router as chat_router
from odmantic import AIOEngine
from motor.motor_asyncio import AsyncIOMotorClient
import requests # <- (1)
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from typing import Annotated
from contextlib import asynccontextmanager
import asyncio

from llm_integration.huggingface_client import embed_model
from llm_integration.openai_client import llmAgent, llmRetriever, llmTitle, llmTransform
from llm_integration.weaviate_client import weaviate_client
import warnings
warnings.filterwarnings("ignore", category=ResourceWarning)

# Hàm quản lý vòng đời ứng dụng
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("App is starting") 

    # Lưu các mô hình vào trạng thái ứng dụng để dùng lại mà không cần khởi tạo nhiều lần
    app.state.embed_model = embed_model
    app.state.llmAgent = llmAgent
    app.state.llmRetriever = llmRetriever
    app.state.llmTitle = llmTitle
    app.state.llmTransform = llmTransform
    app.state.weaviate_client = weaviate_client
    
    try: 
        yield  # Chạy ứng dụng khi khởi tạo xong
        print("App is shutting down")  
    finally:
        print("App is shutting down")  

# Khởi tạo ứng dụng FastAPI và gắn vòng đời `lifespan`
app = FastAPI(lifespan=lifespan)

# Cấu hình CORS (cho phép frontend giao tiếp với backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Địa chỉ frontend (React/Vue/Next.js) được phép gọi API
    allow_credentials=True,  # Cho phép gửi cookie, token xác thực
    allow_methods=["*"],  # Cho phép tất cả phương thức HTTP (GET, POST, PUT, DELETE,...)
    allow_headers=["*"],  # Cho phép tất cả header trong request
)

# Thêm router chat vào ứng dụng
app.include_router(chat_router, prefix="/chats", tags=["chat"])  