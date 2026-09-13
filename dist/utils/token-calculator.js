export class TokenCalculator {
    /**
     * Simple heuristic estimate for token count (approx. 4 chars per token)
     */
    static estimateTokenCount(text) {
        if (!text)
            return 0;
        return Math.ceil(text.trim().length / 4);
    }
    /**
     * Helper to construct UsageStatistics object
     */
    static createUsage(promptText, completionText) {
        const promptTokens = this.estimateTokenCount(promptText);
        const completionTokens = this.estimateTokenCount(completionText);
        return {
            promptTokens,
            completionTokens,
            totalTokens: promptTokens + completionTokens
        };
    }
}
