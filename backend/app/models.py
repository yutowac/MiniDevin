from pydantic import BaseModel
from typing import List, Optional, Dict, Any, Literal


class Message(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]
    execute_code: bool = False


class CodeExecutionResult(BaseModel):
    output: str
    error: Optional[str] = None


class ChatResponse(BaseModel):
    message: Message
    code_execution: Optional[CodeExecutionResult] = None


class FileOperation(BaseModel):
    operation: Literal["create", "read", "update", "delete"]
    path: str
    content: Optional[str] = None


class FileOperationResponse(BaseModel):
    success: bool
    content: Optional[str] = None
    error: Optional[str] = None
