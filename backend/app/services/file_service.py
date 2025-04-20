from app.models import FileOperation, FileOperationResponse
from typing import Dict, Optional
import json
import os


class FileService:
    def __init__(self):
        self.files: Dict[str, str] = {}
        
        self._load_files()
    
    def _load_files(self):
        """Load files from persistent storage if available"""
        try:
            if os.path.exists("virtual_files.json"):
                with open("virtual_files.json", "r") as f:
                    self.files = json.load(f)
        except Exception:
            self.files = {}
    
    def _save_files(self):
        """Save files to persistent storage"""
        try:
            with open("virtual_files.json", "w") as f:
                json.dump(self.files, f)
        except Exception:
            pass
    
    async def handle_operation(self, operation: FileOperation) -> FileOperationResponse:
        """Handle file operations"""
        if operation.operation == "create":
            return self._create_file(operation.path, operation.content or "")
        elif operation.operation == "read":
            return self._read_file(operation.path)
        elif operation.operation == "update":
            return self._update_file(operation.path, operation.content or "")
        elif operation.operation == "delete":
            return self._delete_file(operation.path)
        else:
            return FileOperationResponse(
                success=False,
                error=f"Unknown operation: {operation.operation}"
            )
    
    def _create_file(self, path: str, content: str) -> FileOperationResponse:
        """Create a new file"""
        if path in self.files:
            return FileOperationResponse(
                success=False,
                error=f"File already exists: {path}"
            )
        
        self.files[path] = content
        self._save_files()
        
        return FileOperationResponse(
            success=True,
            content=content
        )
    
    def _read_file(self, path: str) -> FileOperationResponse:
        """Read a file"""
        if path not in self.files:
            return FileOperationResponse(
                success=False,
                error=f"File not found: {path}"
            )
        
        return FileOperationResponse(
            success=True,
            content=self.files[path]
        )
    
    def _update_file(self, path: str, content: str) -> FileOperationResponse:
        """Update a file"""
        if path not in self.files:
            return FileOperationResponse(
                success=False,
                error=f"File not found: {path}"
            )
        
        self.files[path] = content
        self._save_files()
        
        return FileOperationResponse(
            success=True,
            content=content
        )
    
    def _delete_file(self, path: str) -> FileOperationResponse:
        """Delete a file"""
        if path not in self.files:
            return FileOperationResponse(
                success=False,
                error=f"File not found: {path}"
            )
        
        del self.files[path]
        self._save_files()
        
        return FileOperationResponse(
            success=True
        )
    
    def list_files(self) -> FileOperationResponse:
        """List all files"""
        return FileOperationResponse(
            success=True,
            content=json.dumps(list(self.files.keys()))
        )
