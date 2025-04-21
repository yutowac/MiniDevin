import { ChatResponse, FileOperation, FileOperationResponse, Message } from '../types';

const getApiBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8001';
  try {
    const url = new URL(apiUrl);
    const credentials = url.username && url.password ? 
      { username: url.username, password: url.password } : null;
    
    url.username = '';
    url.password = '';
    
    let baseUrl = url.toString();
    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1);
    }
    
    return { 
      baseUrl, 
      credentials 
    };
  } catch (e) {
    console.error('Error parsing API URL:', e);
    return { baseUrl: apiUrl, credentials: null };
  }
};

const { baseUrl, credentials } = getApiBaseUrl();

const getHeaders = (contentType = 'application/json') => {
  const headers: Record<string, string> = {
    'Content-Type': contentType
  };
  
  if (credentials) {
    const authString = `${credentials.username}:${credentials.password}`;
    headers['Authorization'] = `Basic ${btoa(authString)}`;
  }
  
  return headers;
};

export const sendChatMessage = async (messages: Message[], executeCode: boolean = false): Promise<ChatResponse> => {
  console.log('Sending request to:', `${baseUrl}/api/chat`);
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: getHeaders(),
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
  const response = await fetch(`${baseUrl}/api/files`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(operation),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

export const listFiles = async (): Promise<string[]> => {
  const response = await fetch(`${baseUrl}/api/files`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return JSON.parse(data.content || '[]');
};
