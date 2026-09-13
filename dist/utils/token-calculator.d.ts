import type { UsageStatistics } from '../core/chat-types.js';
export declare class TokenCalculator {
    /**
     * Simple heuristic estimate for token count (approx. 4 chars per token)
     */
    static estimateTokenCount(text: string): number;
    /**
     * Helper to construct UsageStatistics object
     */
    static createUsage(promptText: string, completionText: string): UsageStatistics;
}
