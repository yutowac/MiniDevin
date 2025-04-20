# Devin Chat App

A web application that recreates the Devin AI chat interface with Python code execution capabilities.

## Features

- **Devin-style Chat Interface**: Left sidebar with file system, right chat area with thread-style messages
- **OpenAI GPT-4.1 Integration**: Natural language processing powered by OpenAI's GPT-4.1
- **Python Code Execution**: Safely execute Python code snippets from chat responses
- **Virtual File System**: Create, read, update, and delete files in a browser session-based virtual file system

## Screenshots

![Devin Chat App Screenshot](screenshot.png)

## Technology Stack

- **Frontend**: React with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: FastAPI (Python)
- **API Integration**: OpenAI API (GPT-4.1)

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- Poetry (Python package manager)
- OpenAI API Key

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd devin-chat-app/backend
   ```

2. Create a `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

3. Install dependencies:
   ```
   poetry install
   ```

4. Start the backend server:
   ```
   poetry run fastapi dev app/main.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd devin-chat-app/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the backend URL:
   ```
   VITE_API_URL=http://localhost:8000
   ```

4. Start the frontend development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Usage

1. Type your message in the input field at the bottom of the chat area
2. Press Enter or click the send button to send your message
3. Toggle the "Execute Python code" switch to enable/disable code execution
4. Use the file system in the sidebar to create, edit, and manage virtual files

## Implementation Details

- The virtual file system is session-based (data is lost on page refresh)
- Python code execution is sandboxed with a timeout for safety
- The chat interface supports markdown and code syntax highlighting

## License

MIT
