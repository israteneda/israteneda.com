import { NextApiRequest, NextApiResponse } from 'next';
import { generateChatResponse } from '@/lib/openai';
import { chatRateLimiter, dailyRateLimiter } from '@/lib/rate-limiter';
import { CHAT_CONFIG, estimateCost } from '@/lib/chat-config';
import { ChatEvent, ChatMessage, ChatResponse } from '@/lib/chat-events';

// Israel's background information for the AI to reference
const israelInfo = {
  name: "Israel Teneda",
  role: "Frontend Developer specializing in e-commerce platforms",
  experience: "5+ years as a Software Engineer",
  expertise: ["Shopify Plus", "React", "TypeScript", "Python", "E-commerce"],
  currentRole: "Shopify Developer at Lyra Collective",
  previousRoles: [
    "Frontend Engineer at Brandable",
    "React/Python Developer at Ioet (contractor for Pair Eyewear and Warby Parker)",
    "Software Consultant (Freelance)",
    "Software Developer at Mivilsoft"
  ],
  projects: [
    "Lyra Collective Brand Storefronts (Ever, Lola)",
    "Brandable Analytics Platform",
    "Pair Eyewear E-commerce",
    "Warby Parker Finance Integration",
    "Electronic Invoicing System 'Verónica'"
  ],
  skills: ["Shopify Plus", "React", "TypeScript", "Python", "GraphQL", "Liquid", "Material UI", "Django", "Flutter"],
  location: "Remote",
  contact: {
    linkedin: "https://linkedin.com/in/israteneda",
    email: "Available through contact form"
  }
};

// Navigation sections available on the site
const siteSections = {
  about: { id: "about", title: "About Me", description: "Learn about Israel's background and expertise" },
  experience: { id: "experience", title: "Professional Experience", description: "View Israel's work history and roles" },
  projects: { id: "projects", title: "Projects", description: "See Israel's portfolio of work" },
  testimonials: { id: "testimonials", title: "Testimonials", description: "Read what colleagues say about Israel" },
  clients: { id: "clients", title: "Clients", description: "View companies Israel has worked with" },
  contact: { id: "contact", title: "Contact", description: "Get in touch with Israel" }
};

// Get client IP for rate limiting
function getClientIP(req: NextApiRequest): string {
  return (
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.headers['x-real-ip']?.toString() ||
    req.socket.remoteAddress ||
    'unknown'
  );
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, sessionId, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Rate limiting
    const clientIP = getClientIP(req);
    const sessionKey = `${clientIP}-${sessionId || 'default'}`;

    // Check per-minute rate limit
    if (!chatRateLimiter.isAllowed(sessionKey)) {
      const remaining = chatRateLimiter.getRemainingRequests(sessionKey);
      const resetTime = chatRateLimiter.getResetTime(sessionKey);
      const resetIn = resetTime ? Math.ceil((resetTime - Date.now()) / 1000) : 0;

      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: `Too many requests. Please wait ${resetIn} seconds before trying again.`,
        remaining,
        resetIn,
        limit: CHAT_CONFIG.rateLimits.perMinute.maxRequests,
        window: '1 minute'
      });
    }

    // Check daily rate limit
    if (!dailyRateLimiter.isAllowed(clientIP)) {
      const remaining = dailyRateLimiter.getRemainingRequests(clientIP);
      const resetTime = dailyRateLimiter.getResetTime(clientIP);
      const resetIn = resetTime ? Math.ceil((resetTime - Date.now()) / (1000 * 60 * 60)) : 0;

      return res.status(429).json({
        error: 'Daily limit exceeded',
        message: `Daily chat limit reached. Please try again in ${resetIn} hours.`,
        remaining,
        resetIn,
        limit: CHAT_CONFIG.rateLimits.daily.maxRequests,
        window: '24 hours'
      });
    }

    // Check message length to prevent expensive API calls
    const messageLength = message.length;
    const conversationLength = conversationHistory.reduce((acc, msg) => acc + msg.content.length, 0);
    const totalLength = messageLength + conversationLength;

    if (messageLength > CHAT_CONFIG.messageLimits.maxMessageLength) {
      return res.status(400).json({
        error: 'Message too long',
        message: `Please keep your message under ${CHAT_CONFIG.messageLimits.maxMessageLength} characters.`
      });
    }

    if (totalLength > CHAT_CONFIG.messageLimits.maxConversationLength) {
      return res.status(400).json({
        error: 'Conversation too long',
        message: 'Please start a new conversation or keep your message shorter.'
      });
    }

    // Check for potential abuse patterns
    const isSuspicious = CHAT_CONFIG.suspiciousPatterns.some(pattern => pattern.test(message));
    if (isSuspicious) {
      return res.status(400).json({
        error: 'Suspicious request',
        message: 'This type of request is not allowed to prevent abuse.'
      });
    }

    // Generate response using OpenAI
    const chatResponse = await generateChatResponse(message, conversationHistory);

    // Log the raw response for debugging
    console.log('OpenAI Raw Response:', {
      message: chatResponse.message,
      interactions: chatResponse.interactions
    });

    // Create events array
    const events: ChatEvent[] = [];

    // Add interaction events
    if (chatResponse.interactions) {
      events.push(...chatResponse.interactions);
    }

    // Estimate cost
    const estimatedCost = estimateCost(totalLength, chatResponse.message.length);

    // Add usage info to response
    const response: ChatResponse = {
      message: chatResponse.message,
      events,
      usage: {
        remainingPerMinute: chatRateLimiter.getRemainingRequests(sessionKey),
        remainingDaily: dailyRateLimiter.getRemainingRequests(clientIP),
        totalLength,
        estimatedCost: estimatedCost.toFixed(6) // Show cost in dollars
      }
    };

    // Log the final response being sent to the client
    console.log('Final Response to Client:', {
      message: response.message,
      events: response.events
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Check if it's an OpenAI API error
    if (error instanceof Error && error.message.includes('insufficient_quota')) {
      return res.status(503).json({
        error: 'Service temporarily unavailable',
        message: 'Chat service is currently unavailable due to quota limits. Please try again later.'
      });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
} 