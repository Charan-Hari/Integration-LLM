import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import type { OllamaClient } from '../sdk-clients.js';

export class OllamaStrategy implements LLMStrategy {
  constructor(
    private readonly client: OllamaClient,
    private readonly modelName: string
  ) {}

  async sendMessage(prompt: string, _options?: ChatOptions): Promise<ChatResponse> {
    const raw = await this.client.generate({
      model: this.modelName,
      prompt
    });

    return {
      model: raw.model,
      content: raw.response,
      usage: {
        promptTokens: raw.promptEvalCount,
        completionTokens: raw.evalCount,
        totalTokens: raw.promptEvalCount + raw.evalCount
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
