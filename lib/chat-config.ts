export const CHAT_CONFIG = {
  // Rate limiting
  rateLimits: {
    perMinute: {
      maxRequests: 10,
      windowMs: 60 * 1000, // 1 minute
    },
    daily: {
      maxRequests: 100,
      windowMs: 24 * 60 * 60 * 1000, // 24 hours
    }
  },

  // Message limits
  messageLimits: {
    maxMessageLength: 1000,
    maxConversationLength: 4000,
  },

  // OpenAI settings
  openai: {
    model: "gpt-3.5-turbo",
    maxTokens: 500,
    temperature: 0.7,
  },

  // Abuse prevention patterns
  suspiciousPatterns: [
    /repeat.*\d+.*times/i,
    /generate.*\d+.*words/i,
    /write.*\d+.*sentences/i,
    /create.*\d+.*paragraphs/i,
    /spam.*\d+/i,
    /flood.*\d+/i,
  ],

  // Cost estimation (approximate)
  costEstimation: {
    inputTokensPerChar: 0.25, // Rough estimate
    outputTokensPerChar: 0.25,
    inputCostPer1kTokens: 0.0015, // GPT-3.5-turbo input
    outputCostPer1kTokens: 0.002, // GPT-3.5-turbo output
  }
} as const;

// Helper function to estimate cost
export function estimateCost(inputLength: number, outputLength: number): number {
  const inputTokens = Math.ceil(inputLength * CHAT_CONFIG.costEstimation.inputTokensPerChar);
  const outputTokens = Math.ceil(outputLength * CHAT_CONFIG.costEstimation.outputTokensPerChar);
  
  const inputCost = (inputTokens / 1000) * CHAT_CONFIG.costEstimation.inputCostPer1kTokens;
  const outputCost = (outputTokens / 1000) * CHAT_CONFIG.costEstimation.outputCostPer1kTokens;
  
  return inputCost + outputCost;
} 