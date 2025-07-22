"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Send, Users, Minimize2, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export const ChatSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'Sarah Chen',
      text: 'Hey team! I just pushed the latest changes to the auth module.',
      timestamp: new Date(Date.now() - 5 * 60000),
      isOwn: false
    },
    {
      id: '2',
      user: 'You',
      text: 'Great! I\'ll review it now.',
      timestamp: new Date(Date.now() - 3 * 60000),
      isOwn: true
    },
    {
      id: '3',
      user: 'Mike Rodriguez',
      text: 'Can someone help me with the API integration on line 127?',
      timestamp: new Date(Date.now() - 1 * 60000),
      isOwn: false
    }
  ]);

  const [onlineUsers] = useState<User[]>([
    { id: '1', name: 'Sarah Chen', avatar: 'SC', isOnline: true },
    { id: '2', name: 'Mike Rodriguez', avatar: 'MR', isOnline: true },
    { id: '3', name: 'Alex Kim', avatar: 'AK', isOnline: false },
    { id: '4', name: 'You', avatar: 'ME', isOnline: true }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        user: 'You',
        text: messageText,
        timestamp: new Date(),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  if (isCollapsed) {
    return (
      <div className="h-full w-12 bg-gray-900 border-r border-gray-700 flex flex-col items-center py-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          <MessageCircle className="w-5 h-5 text-gray-400" />
        </button>
        <div className="mt-4 space-y-2">
          {onlineUsers.filter(u => u.isOnline).map((user) => (
            <div
              key={user.id}
              className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-medium flex items-center justify-center relative"
            >
              {user.avatar}
              {user.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-blue-500" />
          <h2 className="text-sm font-semibold text-white">Team Chat</h2>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded hover:bg-gray-800 transition-colors"
        >
          <Minimize2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Online Users */}
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center space-x-2 mb-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400 font-medium">
            Online ({onlineUsers.filter(u => u.isOnline).length})
          </span>
        </div>
        <div className="flex space-x-2">
          {onlineUsers.filter(u => u.isOnline).map((user) => (
            <div
              key={user.id}
              className="relative group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-medium flex items-center justify-center">
                {user.avatar}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {user.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
              {!message.isOwn && (
                <div className="text-xs text-gray-400 mb-1 font-medium">
                  {message.user}
                </div>
              )}
              <div
                className={`rounded-lg px-3 py-2 text-sm ${
                  message.isOwn
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                {message.text}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={1}
              style={{
                minHeight: '36px',
                maxHeight: '80px'
              }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-gray-400 mt-2">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};
