import { CHAT_CONFIG } from './chat-config';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.store[identifier];

    // Clean up expired records
    if (record && now > record.resetTime) {
      delete this.store[identifier];
    }

    // If no record exists, create one
    if (!this.store[identifier]) {
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.config.windowMs,
      };
      return true;
    }

    // Check if within limits
    if (this.store[identifier].count < this.config.maxRequests) {
      this.store[identifier].count++;
      return true;
    }

    return false;
  }

  getRemainingRequests(identifier: string): number {
    const record = this.store[identifier];
    if (!record) return this.config.maxRequests;
    return Math.max(0, this.config.maxRequests - record.count);
  }

  getResetTime(identifier: string): number | null {
    const record = this.store[identifier];
    return record ? record.resetTime : null;
  }

  // Clean up old records periodically
  cleanup() {
    const now = Date.now();
    Object.keys(this.store).forEach(key => {
      if (now > this.store[key].resetTime) {
        delete this.store[key];
      }
    });
  }
}

// Create rate limiter instances using config
export const chatRateLimiter = new RateLimiter(CHAT_CONFIG.rateLimits.perMinute);
export const dailyRateLimiter = new RateLimiter(CHAT_CONFIG.rateLimits.daily);

// Clean up old records every 5 minutes
setInterval(() => {
  chatRateLimiter.cleanup();
  dailyRateLimiter.cleanup();
}, 5 * 60 * 1000); 