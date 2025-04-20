import { ChatResponse, FileOperation, FileOperationResponse, Message } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const sendChatMessage = async (messages: Message[], executeCode: boolean = false): Promise<ChatResponse> => {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
      execute_code: executeCode,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const performFileOperation = async (operation: FileOperation): Promise<FileOperationResponse> => {
  const response = await fetch(`${API_URL}/api/files`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(operation),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const listFiles = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/api/files`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return JSON.parse(data.content || '[]');
};
