import { describe, it, expect } from 'vitest';
import { FallbackChatService } from '../service/fallback-chat-service.js';
import type { LLMStrategy } from '../core/llm-strategy.js';
import type { ChatResponse } from '../core/chat-types.js';

class FailingStrategy implements LLMStrategy {
  async sendMessage(): Promise<ChatResponse> {
    throw new Error('Primary service unavailable');
  }

  async *streamMessage() {
    throw new Error('Primary service unavailable');
  }
}

class WorkingStrategy implements LLMStrategy {
  constructor(private readonly model: string) {}

  async sendMessage(prompt: string): Promise<ChatResponse> {
    return {
      model: this.model,
      content: `Fallback success: ${prompt}`,
      usage: { promptTokens: 5, completionTokens: 5, totalTokens: 10 }
    };
  }

  async *streamMessage() {
    yield { model: this.model, contentFragment: 'Fallback success', isLast: true };
  }
}

describe('FallbackChatService', () => {
  it('uses primary strategy if successful', async () => {
    const primary = new WorkingStrategy('primary-model');
    const fallback = new WorkingStrategy('fallback-model');
    const service = new FallbackChatService([primary, fallback]);

    const res = await service.send('Hello');
    expect(res.model).toBe('primary-model');
  });

  it('falls back to secondary strategy if primary fails', async () => {
    const primary = new FailingStrategy();
    const fallback = new WorkingStrategy('fallback-model');
    const service = new FallbackChatService([primary, fallback]);

    const res = await service.send('Hello');
    expect(res.model).toBe('fallback-model');
    expect(res.content).toContain('Fallback success');
  });

  it('throws error if all strategies fail', async () => {
    const s1 = new FailingStrategy();
    const s2 = new FailingStrategy();
    const service = new FallbackChatService([s1, s2]);

    await expect(service.send('Hello')).rejects.toThrow('All fallback LLM providers failed');
  });
});
