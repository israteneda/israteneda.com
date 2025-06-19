import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { MessageCircle, Send, X, AlertCircle } from 'lucide-react';
import { ChatEvent } from '../lib/chat-events';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface UsageInfo {
  remainingPerMinute: number;
  remainingDaily: number;
  totalLength: number;
  estimatedCost: string;
}

interface ChatInterfaceProps {
  onNavigate?: (section: string) => void;
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

interface Suggestion {
  text: string;
  action: ChatEvent;
  condition?: () => boolean;
}

export default function ChatInterface({ onNavigate, onThemeChange }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm Israel's AI assistant. I'm here to help you learn about my work, experience, and projects. Ask me about my Shopify Plus expertise, React development, or any of the projects I've worked on with brands like Lyra Collective, Pair Eyewear, and Warby Parker!",
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);
  const [usageInfo, setUsageInfo] = useState<UsageInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(`session_${Date.now()}`);

  const MAX_MESSAGES = 20;

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(timestamp);
  };

  const addMessage = (newMessage: Message) => {
    setMessages(prev => {
      // If we're about to exceed the limit, remove the oldest messages (but keep the first one as it's the welcome message)
      if (prev.length >= MAX_MESSAGES) {
        const welcomeMessage = prev[0];
        const recentMessages = prev.slice(-(MAX_MESSAGES - 2)); // Keep space for the new message
        return [welcomeMessage, ...recentMessages, newMessage];
      }
      return [...prev, newMessage];
    });
  };

  const conversationSuggestions: Suggestion[] = [
    {
      text: "Show me your projects",
      action: { type: 'navigate', data: { section: 'projects' } }
    },
    {
      text: "Download Resume",
      action: { type: 'download', data: { url: '/Israel_Teneda_CV.pdf' } }
    },
    {
      text: "Switch to dark mode",
      action: { type: 'toggle_theme', data: { theme: 'dark' } },
      condition: () => {
        const root = document.documentElement;
        return !root.classList.contains('dark');
      }
    },
    {
      text: "Switch to light mode",
      action: { type: 'toggle_theme', data: { theme: 'light' } },
      condition: () => {
        const root = document.documentElement;
        return !root.classList.contains('light');
      }
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle element highlighting
  useEffect(() => {
    if (highlightedElement) {
      const element = document.getElementById(highlightedElement);
      if (element) {
        element.classList.add('highlight-pulse');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    return () => {
      if (highlightedElement) {
        const element = document.getElementById(highlightedElement);
        if (element) {
          element.classList.remove('highlight-pulse');
        }
      }
    };
  }, [highlightedElement]);

  const handleInteraction = (event: ChatEvent) => {
    switch (event.type) {
      case 'navigate':
        if (onNavigate && event.data.section) {
          onNavigate(event.data.section);
          // Only close on mobile devices
          if (window.innerWidth < 640) {
            setIsOpen(false);
          }
        }
        break;
      case 'highlight':
        if (event.data.elementId) {
          setHighlightedElement(event.data.elementId);
          setTimeout(() => {
            setHighlightedElement(null);
          }, event.data.duration || 2000);
        }
        break;
      case 'focus':
        if (event.data.elementId) {
          const element = document.getElementById(event.data.elementId);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        break;
      case 'download':
        if (event.data.url) {
          const link = document.createElement('a');
          link.href = event.data.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.click();
        }
        break;
      case 'open_link':
        if (event.data.url) {
          window.open(event.data.url, '_blank');
        }
        break;
      case 'scroll_to_top':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'toggle_theme':
        if (onThemeChange && event.data.theme) {
          onThemeChange(event.data.theme);
          // Update document class directly for immediate feedback
          const root = document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(event.data.theme);
          localStorage.setItem('theme', event.data.theme);
        }
        break;
    }
  };

  const handleSendMessage = async () => {
    if (isLoading) return;
    
    const messageText = inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      role: 'user',
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputValue('');
    setShowSuggestions(false);
    setIsLoading(true);
    setError(null);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          sessionId: sessionId.current,
          conversationHistory
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }
      
      if (data.usage) {
        setUsageInfo(data.usage);
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date(),
      };
      addMessage(assistantMessage);
      
      console.log('Received events from API:', data.events);
      
      if (data.events && Array.isArray(data.events)) {
        console.log('Processing events:', data.events);
        data.events.forEach((event: ChatEvent) => {
          console.log('Processing event:', event);
          handleInteraction(event);
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        content: `Sorry, I'm having trouble responding right now: ${errorMessage}`,
        role: 'assistant',
        timestamp: new Date(),
      };
      addMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = async (suggestion: Suggestion) => {
    if (isLoading) return;
    
    // Handle theme changes with immediate feedback
    if (suggestion.action.type === 'toggle_theme') {
      handleInteraction(suggestion.action);
      const theme = suggestion.action.data.theme;
      const feedbackMessage: Message = {
        id: Date.now().toString(),
        content: `Theme updated to ${theme} mode! If you're interested, I can show you some of the projects I've worked on. Just let me know!`,
        role: 'assistant',
        timestamp: new Date(),
      };
      addMessage(feedbackMessage);
      return;
    }

    // Handle navigation immediately
    if (suggestion.action.type === 'navigate') {
      handleInteraction(suggestion.action);
      const userMessage: Message = {
        id: Date.now().toString(),
        content: suggestion.text,
        role: 'user',
        timestamp: new Date(),
      };
      addMessage(userMessage);
      return;
    }

    // Handle downloads immediately
    if (suggestion.action.type === 'download') {
      handleInteraction(suggestion.action);
      const userMessage: Message = {
        id: Date.now().toString(),
        content: suggestion.text,
        role: 'user',
        timestamp: new Date(),
      };
      const assistantMessage: Message = {
        id: Date.now().toString() + '1',
        content: "Great choice! I'll initiate the download of Israel's resume for you. If you'd like to learn more about his experience while the download completes, feel free to explore his projects or professional experience sections.",
        role: 'assistant',
        timestamp: new Date(),
      };
      addMessage(userMessage);
      addMessage(assistantMessage);
      return;
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: suggestion.text,
      role: 'user',
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputValue('');
    setShowSuggestions(false);
    setIsLoading(true);
    setError(null);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: suggestion.text,
          sessionId: sessionId.current,
          conversationHistory
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }
      
      if (data.usage) {
        setUsageInfo(data.usage);
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'assistant',
        timestamp: new Date(),
      };
      addMessage(assistantMessage);
      
      // Handle interaction events from response
      if (data.events) {
        data.events.forEach((event: ChatEvent) => {
          handleInteraction(event);
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        content: `Sorry, I'm having trouble responding right now: ${errorMessage}`,
        role: 'assistant',
        timestamp: new Date(),
      };
      addMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-5 right-5 z-50">
        <Button
          onClick={toggleChat}
          size="lg"
          className="rounded-full shadow-lg w-full sm:w-auto hover:scale-105 transition-transform duration-200"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          <span className="hidden sm:inline">Chat with Israel</span>
          <span className="sm:hidden">Chat</span>
        </Button>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300" 
      onClick={toggleChat}
    >
      <div 
        className="fixed bottom-5 right-5 z-50 
          w-[calc(100%-2rem)] sm:w-[400px] md:w-[450px] h-[600px] max-h-[calc(100vh-4rem)]
          bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700
          overflow-hidden flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-t-xl">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Chat with Israel</h3>
          </div>
          <Button
            onClick={toggleChat}
            variant="ghost"
            size="sm"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Usage Info */}
        {usageInfo && (
          <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
            <div className="flex justify-between items-center text-xs text-blue-700 dark:text-blue-300">
              <span>Messages: {messages.length}/{MAX_MESSAGES}</span>
              <span>{formatTimestamp(new Date())}</span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="px-4 py-2 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 text-xs text-red-700 dark:text-red-300">
              <AlertCircle className="h-3 w-3" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Messages Container */}
        <ScrollArea className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div key={message.id} className="animate-fade-in">
                <div
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-lg px-4 py-2 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                    <span
                      className={`text-xs mt-1 block ${
                        message.role === 'user'
                          ? 'text-blue-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                </div>
                {/* Show suggestions after assistant messages */}
                {message.role === 'assistant' && index === messages.length - 1 && showSuggestions && (
                  <div className="mt-4 space-y-2">
                    {conversationSuggestions
                      .filter(suggestion => !suggestion.condition || suggestion.condition())
                      .map((suggestion, idx) => (
                        <Button
                          key={idx}
                          variant="secondary"
                          className="mr-2 mb-2"
                          onClick={() => handleSuggestionClick(suggestion)}
                          disabled={isLoading}
                        >
                          {suggestion.text}
                        </Button>
                      ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <div className="relative">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="pr-12 resize-none h-[60px] max-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 bottom-2 hover:scale-105 transition-transform duration-200"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 