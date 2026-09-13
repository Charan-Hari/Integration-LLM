import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import type { OpenAIClient } from '../sdk-clients.js';

export class OpenAIStrategy implements LLMStrategy {
  constructor(
    private readonly client: OpenAIClient,
    private readonly modelName: string
  ) {}

  async sendMessage(prompt: string, options?: ChatOptions): Promise<ChatResponse> {
    const raw = await this.client.createCompletion({
      model: this.modelName,
      prompt,
      temperature: options?.temperature,
      maxTokens: options?.maxTokens
    });

    return {
      model: raw.model,
      content: raw.text,
      usage: {
        promptTokens: raw.promptTokens,
        completionTokens: raw.completionTokens,
        totalTokens: raw.promptTokens + raw.completionTokens
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
