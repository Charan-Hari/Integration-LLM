const DEFAULT_CONFIG = {
    maxAttempts: 3,
    baseDelayMs: 200,
    backoffFactor: 2
};
/**
 * Wraps any LLMStrategy with automatic retry + exponential backoff.
 * Useful for transient provider errors (rate limits, timeouts, 5xx) without
 * needing to fall back to a different provider entirely.
 */
export class RetryChatService {
    strategy;
    config;
    constructor(strategy, config = {}) {
        this.strategy = strategy;
        this.config = { ...DEFAULT_CONFIG, ...config };
    }
    async send(prompt, options) {
        let lastError;
        let delay = this.config.baseDelayMs;
        for (let attempt = 1; attempt <= this.config.maxAttempts; attempt += 1) {
            try {
                return await this.strategy.sendMessage(prompt, options);
            }
            catch (err) {
                lastError = err instanceof Error ? err : new Error(String(err));
                if (attempt === this.config.maxAttempts) {
                    break;
                }
                this.config.onRetry?.(attempt, lastError, delay);
                await this.sleep(delay);
                delay *= this.config.backoffFactor;
            }
        }
        throw new Error(`LLM request failed after ${this.config.maxAttempts} attempts: ${lastError?.message ?? 'unknown error'}`);
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
