export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  code_execution?: CodeExecutionResult;
}

export interface CodeExecutionResult {
  output: string;
  error?: string;
}

export interface ChatResponse {
  message: Message;
  code_execution?: CodeExecutionResult;
}

export interface FileOperation {
  operation: 'create' | 'read' | 'update' | 'delete';
  path: string;
  content?: string;
}

export interface FileOperationResponse {
  success: boolean;
  content?: string;
  error?: string;
}
