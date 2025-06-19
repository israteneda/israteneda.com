// Custom Chat Event Types - No AG-UI dependency

export type ChatEventType = 
  | 'navigate'
  | 'highlight'
  | 'focus'
  | 'download'
  | 'open_link'
  | 'scroll_to_top'
  | 'toggle_theme';

export interface ChatEvent {
  type: ChatEventType;
  data: {
    section?: string;
    elementId?: string;
    url?: string;
    duration?: number;
    theme?: 'light' | 'dark';
  };
}

export interface ChatMessage {
  content: string;
  role: 'user' | 'assistant';
  sessionId: string;
}

export interface ChatResponse {
  message: string;
  events?: ChatEvent[];
  usage?: {
    remainingPerMinute: number;
    remainingDaily: number;
    totalLength: number;
    estimatedCost: string;
  };
} 