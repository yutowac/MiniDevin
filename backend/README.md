# MiniDevin Backend

This is the FastAPI backend for the MiniDevin application, a Devin-like chat interface with Python code execution capabilities.

## Features

- OpenAI GPT-4.1 Integration
- Python Code Execution with Timeout
- Virtual File System Management
- RESTful API Endpoints

## Setup

1. Create a `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

2. Install dependencies:
   ```
   poetry install
   ```

3. Run the application:
   ```
   poetry run fastapi dev app/main.py
   ```

## API Endpoints

- `GET /healthz` - Health check endpoint
- `POST /api/chat` - Process chat messages and return AI responses
- `POST /api/files` - Perform file operations (create, read, update, delete)
- `GET /api/files` - List all files in the virtual file system
