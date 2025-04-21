from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import ChatRequest, ChatResponse, FileOperation, FileOperationResponse
from app.services.openai_service import OpenAIService
from app.services.file_service import FileService
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
    expose_headers=["*"]  # Expose all headers
)

openai_service = OpenAIService()
file_service = FileService()

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Process a chat request and return a response"""
    return await openai_service.generate_response(request)

@app.post("/api/files", response_model=FileOperationResponse)
async def handle_file_operation(operation: FileOperation):
    """Handle file operations (create, read, update, delete)"""
    return await file_service.handle_operation(operation)

@app.get("/api/files", response_model=FileOperationResponse)
async def list_files():
    """List all files in the virtual file system"""
    return file_service.list_files()
