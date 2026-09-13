import type { UsageStatistics } from '../core/chat-types.js';

export class TokenCalculator {
  /**
   * Simple heuristic estimate for token count (approx. 4 chars per token)
   */
  static estimateTokenCount(text: string): number {
    if (!text) return 0;
    return Math.ceil(text.trim().length / 4);
  }

  /**
   * Helper to construct UsageStatistics object
   */
  static createUsage(promptText: string, completionText: string): UsageStatistics {
    const promptTokens = this.estimateTokenCount(promptText);
    const completionTokens = this.estimateTokenCount(completionText);
    return {
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens
    };
  }
}
