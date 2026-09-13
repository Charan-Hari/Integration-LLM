import { describe, it, expect } from 'vitest';
import { RetryChatService } from '../service/retry-chat-service.js';
import type { LLMStrategy } from '../core/llm-strategy.js';
import type { ChatResponse } from '../core/chat-types.js';

class FlakyStrategy implements LLMStrategy {
  private attempts = 0;

  constructor(private readonly failuresBeforeSuccess: number) {}

  async sendMessage(prompt: string): Promise<ChatResponse> {
    this.attempts += 1;
    if (this.attempts <= this.failuresBeforeSuccess) {
      throw new Error(`Transient failure #${this.attempts}`);
    }
    return {
      model: 'retry-model',
      content: `Recovered: ${prompt}`,
      usage: { promptTokens: 3, completionTokens: 3, totalTokens: 6 }
    };
  }

  async *streamMessage() {
    yield { model: 'retry-model', contentFragment: 'n/a', isLast: true };
  }
}

class AlwaysFailingStrategy implements LLMStrategy {
  async sendMessage(): Promise<ChatResponse> {
    throw new Error('Permanent failure');
  }

  async *streamMessage() {
    throw new Error('Permanent failure');
  }
}

describe('RetryChatService', () => {
  it('returns immediately on success without retrying', async () => {
    const strategy = new FlakyStrategy(0);
    const service = new RetryChatService(strategy, { baseDelayMs: 1 });

    const res = await service.send('Hello');
    expect(res.content).toBe('Recovered: Hello');
  });

  it('retries transient failures and eventually succeeds', async () => {
    const strategy = new FlakyStrategy(2);
    const service = new RetryChatService(strategy, { maxAttempts: 3, baseDelayMs: 1 });

    const res = await service.send('Hello');
    expect(res.content).toBe('Recovered: Hello');
  });

  it('throws after exhausting max attempts', async () => {
    const strategy = new AlwaysFailingStrategy();
    const service = new RetryChatService(strategy, { maxAttempts: 2, baseDelayMs: 1 });

    await expect(service.send('Hello')).rejects.toThrow('LLM request failed after 2 attempts');
  });

  it('invokes onRetry callback with attempt number and delay', async () => {
    const strategy = new FlakyStrategy(1);
    const retries: number[] = [];
    const service = new RetryChatService(strategy, {
      maxAttempts: 3,
      baseDelayMs: 1,
      onRetry: (attempt) => retries.push(attempt)
    });

    await service.send('Hello');
    expect(retries).toEqual([1]);
  });
});
