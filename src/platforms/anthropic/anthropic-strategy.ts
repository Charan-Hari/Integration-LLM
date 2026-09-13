import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import type { AnthropicClient } from '../sdk-clients.js';

export class AnthropicStrategy implements LLMStrategy {
  constructor(
    private readonly client: AnthropicClient,
    private readonly modelName: string
  ) {}

  async sendMessage(prompt: string, options?: ChatOptions): Promise<ChatResponse> {
    const raw = await this.client.completeMessage({
      model: this.modelName,
      prompt,
      temperature: options?.temperature,
      maxTokens: options?.maxTokens
    });

    return {
      model: raw.model,
      content: raw.completion,
      usage: {
        promptTokens: raw.inputTokens,
        completionTokens: raw.outputTokens,
        totalTokens: raw.inputTokens + raw.outputTokens
      }
    };
  }

  async *streamMessage(prompt: string, _options?: ChatOptions): AsyncIterable<StreamingChunk> {
    const response = await this.sendMessage(prompt, _options);
    const words = response.content.split(' ');
    for (let i = 0; i < words.length; i++) {
      yield {
        model: this.modelName,
        contentFragment: words[i] + (i === words.length - 1 ? '' : ' '),
        isLast: i === words.length - 1
      };
    }
  }
}
