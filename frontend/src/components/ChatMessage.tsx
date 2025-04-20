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
              <div className="bg-slate-800 text-white p-2 text-sm font-mono">
                {language && <span className="text-xs text-slate-400">{language}</span>}
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
    <div className={`flex gap-3 p-4 ${message.role === 'assistant' ? 'bg-slate-50' : ''}`}>
      <div className="flex-shrink-0">
        <Avatar className={message.role === 'assistant' ? 'bg-blue-600' : 'bg-slate-700'}>
          {message.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="font-medium">
          {message.role === 'assistant' ? 'Devin AI' : 'You'}
        </div>
        <div className="mt-1 text-slate-700">
          {renderContent(message.content)}
        </div>
        
        {/* Code execution results */}
        {codeExecution && (
          <Card className="mt-3 bg-slate-50 border-slate-200">
            <CardContent className="p-3">
              <div className="text-sm font-medium mb-1">Code Execution Result</div>
              {codeExecution.error ? (
                <div className="text-red-500 text-sm font-mono whitespace-pre-wrap bg-red-50 p-2 rounded">
                  {codeExecution.error}
                </div>
              ) : (
                <div className="text-sm font-mono whitespace-pre-wrap bg-slate-100 p-2 rounded">
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
