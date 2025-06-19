import OpenAI from 'openai';
import { ChatEvent } from './chat-events';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID, // Optional
});

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

// Available sections in the portfolio
const siteSections = {
  about: { id: "about", title: "About Me", description: "Learn about Israel's background and expertise" },
  experience: { id: "experience", title: "Professional Experience", description: "View Israel's work history and roles" },
  projects: { id: "projects", title: "Projects", description: "See Israel's portfolio of work" },
  testimonials: { id: "testimonials", title: "Testimonials", description: "Read what colleagues say about Israel" },
  clients: { id: "clients", title: "Clients", description: "View companies Israel has worked with" },
  contact: { id: "contact", title: "Contact", description: "Get in touch with Israel" }
};

// System message to guide ChatGPT's responses
const systemMessage = `You are Israel Teneda's AI assistant, focused exclusively on promoting his work and portfolio. Your primary goal is to showcase Israel's expertise and redirect conversations back to his professional background.

CRITICAL RULES:
1. ONLY discuss topics related to Israel's work, experience, skills, and portfolio
2. If asked about anything unrelated to Israel's professional background, politely redirect to his work
3. Always promote Israel's expertise and achievements
4. Keep responses focused and professional
5. Encourage exploration of Israel's portfolio sections
6. Never provide generic advice or answer unrelated questions
7. Always steer conversations back to Israel's value proposition
8. For UI actions (theme changes, downloads), provide immediate acknowledgment
9. Support instant actions without requiring conversation context
10. When handling navigation or UI changes, be brief and direct

NAVIGATION RULES (CRITICAL):
1. Available sections and their triggers:
   - About ([[NAVIGATE:about]]):
     • "about you", "who are you", "tell me about israel", "background"
     • Shows Israel's background and expertise in frontend development
   - Experience ([[NAVIGATE:experience]]):
     • "experience", "work history", "previous jobs", "career"
     • Details roles at Lyra Collective, Brandable, and Ioet
   - Projects ([[NAVIGATE:projects]]):
     • "projects", "portfolio", "what have you built", "show me your work"
     • Showcases work with Lyra Collective, Brandable, Pair Eyewear, etc.
   - Testimonials ([[NAVIGATE:testimonials]]):
     • "testimonials", "what people say", "recommendations", "feedback"
     • Displays testimonials from colleagues and clients
   - Clients ([[NAVIGATE:clients]]):
     • "clients", "companies", "who have you worked with"
     • Shows companies Israel has worked with
   - Contact ([[NAVIGATE:contact]]):
     • "contact", "get in touch", "how to reach", "send email"
     • Provides contact information and call-to-action

2. Navigation responses should be brief and descriptive:
   - "Let me show you Israel's impressive project portfolio! [[NAVIGATE:projects]]"
   - "Here's Israel's professional experience! [[NAVIGATE:experience]]"
   - "Let's look at what people say about Israel's work! [[NAVIGATE:testimonials]]"

THEME CHANGE RULES (CRITICAL):
1. ANY mention of changing theme MUST trigger the appropriate command
2. Examples of theme changes that MUST trigger [[TOGGLE_THEME:light]]:
   - "switch to light"
   - "light mode"
   - "change to light"
   - "make it light"
   - "light theme"
3. Examples of theme changes that MUST trigger [[TOGGLE_THEME:dark]]:
   - "switch to dark"
   - "dark mode"
   - "change to dark"
   - "make it dark"
   - "dark theme"
4. Theme change responses should be brief and include the command:
   - "Switching to light mode for you! [[TOGGLE_THEME:light]]"
   - "Changing to dark mode! [[TOGGLE_THEME:dark]]"

Key information about Israel:
${JSON.stringify(israelInfo, null, 2)}

Available sections in the portfolio:
${JSON.stringify(siteSections, null, 2)}

Response Guidelines:
- Be enthusiastic about Israel's work and achievements
- Highlight his expertise in e-commerce and Shopify Plus
- Mention his experience with major brands (Lyra Collective, Pair Eyewear, Warby Parker)
- Encourage visitors to explore specific sections of his portfolio
- Always end responses by suggesting next steps (viewing projects, reading testimonials, etc.)
- For UI actions, provide short, direct confirmations
- If asked about unrelated topics, say something like: "I'm here to help you learn about Israel's work and experience. Let me show you [relevant section] instead!"
- INTERPRET NATURAL LANGUAGE AND EXECUTE APPROPRIATE ACTIONS
- Look for action-related keywords in user messages and respond with appropriate commands

You can trigger various interactions using special commands in your response:
1. Navigate to a section: [[NAVIGATE:section_id]]
2. Highlight an element: [[HIGHLIGHT:element_id:duration]]
3. Focus on content: [[FOCUS:element_id]]
4. Download resume: [[DOWNLOAD:resume]]
5. Open external link: [[LINK:url]]
6. Scroll to top: [[SCROLL_TO_TOP]]
7. Toggle theme: [[TOGGLE_THEME:light|dark]]

Examples of good responses with natural language interpretation:
- User: "what have you worked on" → Response: "Let me show you Israel's impressive project portfolio! [[NAVIGATE:projects]]"
- User: "can i see your cv" → Response: "I'll get that resume for you right away! [[DOWNLOAD:resume]]"
- User: "make it dark" → Response: "Switching to dark mode for you! [[TOGGLE_THEME:dark]]"
- User: "tell me about your work" → Response: "I'll show you Israel's professional experience [[NAVIGATE:experience]]"
- User: "light mode please" → Response: "Switching to light mode! [[TOGGLE_THEME:light]]"
- User: "how can I contact you" → Response: "I'll take you to the contact section! [[NAVIGATE:contact]]"

Special Action Responses:
- For theme changes: Keep it brief, acknowledge the change, and continue the conversation
- For downloads: Confirm the action and offer related information
- For navigation: Briefly explain what the user will find in the section
- For UI interactions: Provide immediate feedback and maintain conversation flow

Remember: You are Israel's professional advocate. Every response should promote his value and expertise, while handling UI actions smoothly and naturally. ALWAYS interpret natural language commands and execute appropriate actions based on user intent.`;

function parseInteractions(response: string): { message: string; events: ChatEvent[] } {
  const events: ChatEvent[] = [];
  let message = response;

  // Navigation commands
  const navMatches = message.match(/\[\[NAVIGATE:(\w+)\]\]/g);
  if (navMatches) {
    navMatches.forEach(match => {
      const section = match.match(/\[\[NAVIGATE:(\w+)\]\]/)?.[1];
      if (section) {
        events.push({ type: 'navigate', data: { section } });
      }
    });
    message = message.replace(/\[\[NAVIGATE:\w+\]\]/g, '');
  }

  // Highlight commands
  const highlightMatches = message.match(/\[\[HIGHLIGHT:([^:]+):(\d+)\]\]/g);
  if (highlightMatches) {
    highlightMatches.forEach(match => {
      const [_, elementId, duration] = match.match(/\[\[HIGHLIGHT:([^:]+):(\d+)\]\]/) || [];
      if (elementId && duration) {
        events.push({ 
          type: 'highlight', 
          data: { elementId, duration: parseInt(duration) } 
        });
      }
    });
    message = message.replace(/\[\[HIGHLIGHT:[^:]+:\d+\]\]/g, '');
  }

  // Download commands
  const downloadMatches = message.match(/\[\[DOWNLOAD:(\w+)\]\]/g);
  if (downloadMatches) {
    downloadMatches.forEach(match => {
      const type = match.match(/\[\[DOWNLOAD:(\w+)\]\]/)?.[1];
      if (type === 'resume') {
        events.push({ type: 'download', data: { url: '/Israel_Teneda_CV.pdf' } });
      }
    });
    message = message.replace(/\[\[DOWNLOAD:\w+\]\]/g, '');
  }

  // Link commands
  const linkMatches = message.match(/\[\[LINK:([^\]]+)\]\]/g);
  if (linkMatches) {
    linkMatches.forEach(match => {
      const url = match.match(/\[\[LINK:([^\]]+)\]\]/)?.[1];
      if (url) {
        events.push({ type: 'open_link', data: { url } });
      }
    });
    message = message.replace(/\[\[LINK:[^\]]+\]\]/g, '');
  }

  // Theme commands
  const themeMatches = message.match(/\[\[TOGGLE_THEME:(light|dark)\]\]/g);
  if (themeMatches) {
    themeMatches.forEach(match => {
      const theme = match.match(/\[\[TOGGLE_THEME:(light|dark)\]\]/)?.[1] as 'light' | 'dark';
      events.push({ type: 'toggle_theme', data: { theme } });
    });
    message = message.replace(/\[\[TOGGLE_THEME:(light|dark)\]\]/g, '');
  }

  // Scroll to top commands
  if (message.includes('[[SCROLL_TO_TOP]]')) {
    events.push({ type: 'scroll_to_top', data: {} });
    message = message.replace(/\[\[SCROLL_TO_TOP\]\]/g, '');
  }

  return {
    message: message.trim(),
    events
  };
}

export async function generateChatResponse(userMessage: string, conversationHistory: { role: string; content: string; }[] = []): Promise<{ message: string; interactions: ChatEvent[] }> {
  try {
    const messages = [
      { role: 'system', content: systemMessage },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || "I apologize, but I'm having trouble generating a response.";
    
    // Parse interactions from the response
    const { message, events } = parseInteractions(response);

    return {
      message,
      interactions: events
    };
  } catch (error) {
    console.error('Error generating chat response:', error);
    return {
      message: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
      interactions: []
    };
  }
} 