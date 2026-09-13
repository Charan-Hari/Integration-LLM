import type { ChatOptions, ChatResponse } from '../core/chat-types.js';
import type { LLMStrategy } from '../core/llm-strategy.js';
export interface RetryConfig {
    /** Maximum number of attempts (including the first). Default 3. */
    readonly maxAttempts?: number;
    /** Base delay in ms before the first retry. Default 200. */
    readonly baseDelayMs?: number;
    /** Multiplier applied to the delay after each failed attempt. Default 2 (exponential backoff). */
    readonly backoffFactor?: number;
    /** Optional callback invoked before each retry attempt, useful for logging/telemetry. */
    readonly onRetry?: (attempt: number, error: Error, delayMs: number) => void;
}
/**
 * Wraps any LLMStrategy with automatic retry + exponential backoff.
 * Useful for transient provider errors (rate limits, timeouts, 5xx) without
 * needing to fall back to a different provider entirely.
 */
export declare class RetryChatService {
    private readonly strategy;
    private readonly config;
    constructor(strategy: LLMStrategy, config?: RetryConfig);
    send(prompt: string, options?: ChatOptions): Promise<ChatResponse>;
    private sleep;
}
