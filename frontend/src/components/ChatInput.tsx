import React, { useState, KeyboardEvent } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { SendHorizontal, Play } from 'lucide-react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface ChatInputProps {
  onSendMessage: (content: string, executeCode: boolean) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [executeCode, setExecuteCode] = useState(false);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message, executeCode);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="execute-code"
            checked={executeCode}
            onCheckedChange={setExecuteCode}
          />
          <Label htmlFor="execute-code" className="text-sm">
            Execute Python code
          </Label>
        </div>
      </div>
      <div className="flex gap-2">
        <Textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[80px] flex-1"
          disabled={isLoading}
        />
        <div className="flex flex-col gap-2">
          <Button 
            onClick={handleSend} 
            disabled={!message.trim() || isLoading}
            className="h-10 px-3"
          >
            <SendHorizontal size={18} />
          </Button>
          {executeCode && (
            <Button 
              variant="outline" 
              onClick={handleSend} 
              disabled={!message.trim() || isLoading}
              className="h-10 px-3"
              title="Send and execute code"
            >
              <Play size={18} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
