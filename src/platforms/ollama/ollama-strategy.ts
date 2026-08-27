import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { OllamaClient } from '../sdk-clients.js';

export class OllamaStrategy implements LLMStrategy {
  constructor(
    private readonly client: OllamaClient,
    private readonly model: string
  ) {}

  async sendMessage(prompt: string, options: ChatOptions = {}): Promise<ChatResponse> {
    const response = await this.client.generate({
      model: this.model,
      prompt,
      options: {
        temperature: options.temperature,
        num_predict: options.maxTokens,
        ...options.metadata
      }
    });

    return {
      model: response.model,
      content: response.response,
      usage: {
        promptTokens: response.promptEvalCount,
        completionTokens: response.evalCount,
        totalTokens: response.promptEvalCount + response.evalCount
      }
    };
  }

  async *streamMessage(prompt: string, options: ChatOptions = {}): AsyncIterable<StreamingChunk> {
    const result = await this.sendMessage(prompt, options);
    const characters = [...result.content];

    for (const [index, character] of characters.entries()) {
      yield {
        model: result.model,
        contentFragment: character,
        isLast: index === characters.length - 1
      };
    }
  }
}
