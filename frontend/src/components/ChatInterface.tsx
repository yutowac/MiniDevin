import React, { useState, useEffect, useRef } from 'react';
import { Message, ChatResponse } from '../types';
import { sendChatMessage } from '../services/api';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string, executeCode: boolean) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response: ChatResponse = await sendChatMessage(
        [...messages, userMessage],
        executeCode
      );

      setMessages((prev) => [...prev, response.message]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your request. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400">
            <div className="text-center max-w-md">
              <h2 className="text-xl font-semibold mb-2">Welcome to Devin Chat</h2>
              <p>
                Ask me anything and I'll respond using GPT-4.1. You can also have me execute Python code!
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y">
            {messages.map((message, index) => {
              const nextMessage = messages[index + 1];
              const isAssistantWithCodeExec = 
                message.role === 'assistant' && 
                nextMessage && 
                nextMessage.role === 'assistant';
              
              return (
                <ChatMessage 
                  key={index} 
                  message={message} 
                  codeExecution={isAssistantWithCodeExec ? undefined : undefined}
                />
              );
            })}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
