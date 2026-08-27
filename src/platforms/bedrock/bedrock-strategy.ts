import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { BedrockSDKClient } from '../sdk-clients.js';

export class BedrockStrategy implements LLMStrategy {
  constructor(
    private readonly client: BedrockSDKClient,
    private readonly modelId: string
  ) {}

  async sendMessage(prompt: string, options: ChatOptions = {}): Promise<ChatResponse> {
    const response = await this.client.invokeModel({
      modelId: this.modelId,
      prompt,
      temperature: options.temperature,
      maxTokens: options.maxTokens
    });

    return {
      model: response.modelId,
      content: response.outputText,
      usage: {
        promptTokens: response.promptTokens,
        completionTokens: response.completionTokens,
        totalTokens: response.promptTokens + response.completionTokens
      },
      additionalData: response.additionalMetadata
    };
  }

  async *streamMessage(prompt: string, options: ChatOptions = {}): AsyncIterable<StreamingChunk> {
    const result = await this.sendMessage(prompt, options);
    const words = result.content.split(' ');

    for (const [index, word] of words.entries()) {
      yield {
        model: result.model,
        contentFragment: word + (index < words.length - 1 ? ' ' : ''),
        isLast: index === words.length - 1
      };
    }
  }
}
