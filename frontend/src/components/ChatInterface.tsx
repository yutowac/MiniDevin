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
    
    console.log('Current messages before adding user message:', messages);
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log('Sending messages to API:', [...messages, userMessage]);
      const response: ChatResponse = await sendChatMessage(
        [...messages, userMessage],
        executeCode
      );
      
      console.log('Received response from API:', response);
      setMessages((prev) => {
        console.log('Updating messages with response:', [...prev, response.message]);
        return [...prev, response.message];
      });
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
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center max-w-md">
              <h2 className="text-xl font-semibold mb-2">Welcome to Mini Devin</h2>
              <p>
                Ask me anything and I'll respond using GPT-4.1. You can also have me execute Python code!
              </p>
              <p className="text-sm text-gray-500 mt-4">
                A Devin-inspired AI coding assistant that helps you with programming tasks
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {messages.map((message, index) => {
              return (
                <ChatMessage 
                  key={index} 
                  message={message} 
                  codeExecution={undefined} // We'll handle code execution in a separate PR
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
