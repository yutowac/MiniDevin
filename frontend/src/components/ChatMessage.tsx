import React from 'react';
import { Message, CodeExecutionResult } from '../types';
import { Card, CardContent } from './ui/card';
import { Avatar } from './ui/avatar';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  codeExecution?: CodeExecutionResult;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, codeExecution }) => {
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        if (match) {
          const language = match[1] || '';
          const code = match[2];
          
          return (
            <div key={index} className="my-2 rounded-md overflow-hidden">
              <div className="bg-gray-900 text-gray-100 p-2 text-sm font-mono border border-gray-700">
                {language && <span className="text-xs text-blue-400">{language}</span>}
                <pre className="mt-1 overflow-x-auto">{code}</pre>
              </div>
            </div>
          );
        }
      }
      
      return part ? <p key={index} className="whitespace-pre-wrap">{part}</p> : null;
    });
  };

  return (
    <div className={`flex gap-3 p-4 ${message.role === 'assistant' ? 'bg-gray-800' : 'bg-gray-900'}`}>
      <div className="flex-shrink-0">
        <Avatar className={message.role === 'assistant' ? 'bg-blue-600' : 'bg-gray-700'}>
          {message.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-200">
          {message.role === 'assistant' ? 'Mini Devin' : 'You'}
        </div>
        <div className="mt-1 text-gray-300">
          {renderContent(message.content)}
        </div>
        
        {/* Code execution results */}
        {codeExecution && (
          <Card className="mt-3 bg-gray-800 border-gray-700">
            <CardContent className="p-3">
              <div className="text-sm font-medium mb-1 text-gray-300">Code Execution Result</div>
              {codeExecution.error ? (
                <div className="text-red-400 text-sm font-mono whitespace-pre-wrap bg-red-900/30 p-2 rounded border border-red-800">
                  {codeExecution.error}
                </div>
              ) : (
                <div className="text-sm font-mono whitespace-pre-wrap bg-gray-900 p-2 rounded border border-gray-700 text-gray-300">
                  {codeExecution.output || 'No output'}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
