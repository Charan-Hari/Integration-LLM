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

const DEFAULT_CONFIG: Required<Omit<RetryConfig, 'onRetry'>> = {
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
  private readonly config: Required<Omit<RetryConfig, 'onRetry'>> & Pick<RetryConfig, 'onRetry'>;

  constructor(private readonly strategy: LLMStrategy, config: RetryConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async send(prompt: string, options?: ChatOptions): Promise<ChatResponse> {
    let lastError: Error | undefined;
    let delay = this.config.baseDelayMs;

    for (let attempt = 1; attempt <= this.config.maxAttempts; attempt += 1) {
      try {
        return await this.strategy.sendMessage(prompt, options);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        if (attempt === this.config.maxAttempts) {
          break;
        }

        this.config.onRetry?.(attempt, lastError, delay);
        await this.sleep(delay);
        delay *= this.config.backoffFactor;
      }
    }

    throw new Error(
      `LLM request failed after ${this.config.maxAttempts} attempts: ${lastError?.message ?? 'unknown error'}`
    );
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
