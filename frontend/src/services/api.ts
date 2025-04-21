import { ChatResponse, FileOperation, FileOperationResponse, Message } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;

const getHeaders = (contentType = 'application/json') => {
  const headers: Record<string, string> = {
    'Content-Type': contentType
  };
  
  const authString = 'user:0e4b6564bce74cb0f9358308c4288e79';
  headers['Authorization'] = `Basic ${btoa(authString)}`;
  
  return headers;
};

export const sendChatMessage = async (messages: Message[], executeCode: boolean = false): Promise<ChatResponse> => {
  console.log('Sending request to:', `${baseUrl}/api/chat`);
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: getHeaders(),
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({
      messages,
      execute_code: executeCode,
    }),
  });

  if (!response.ok) {
    console.error('API error:', response.status, response.statusText);
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const performFileOperation = async (operation: FileOperation): Promise<FileOperationResponse> => {
  const response = await fetch(`${baseUrl}/api/files`, {
    method: 'POST',
    headers: getHeaders(),
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(operation),
  });

  if (!response.ok) {
    console.error('API error:', response.status, response.statusText);
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const listFiles = async (): Promise<string[]> => {
  const response = await fetch(`${baseUrl}/api/files`, {
    method: 'GET',
    headers: getHeaders(),
    credentials: 'include',
    mode: 'cors',
  });

  if (!response.ok) {
    console.error('API error:', response.status, response.statusText);
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return JSON.parse(data.content || '[]');
};
