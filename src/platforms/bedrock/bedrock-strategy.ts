import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import type { BedrockSDKClient } from '../sdk-clients.js';

export class BedrockStrategy implements LLMStrategy {
  constructor(
    private readonly client: BedrockSDKClient,
    private readonly modelId: string
  ) {}

  async sendMessage(prompt: string, options?: ChatOptions): Promise<ChatResponse> {
    const raw = await this.client.invokeModel({
      modelId: this.modelId,
      prompt,
      temperature: options?.temperature,
      maxTokens: options?.maxTokens
    });

    return {
      model: raw.modelId,
      content: raw.outputText,
      usage: {
        promptTokens: raw.promptTokens,
        completionTokens: raw.completionTokens,
        totalTokens: raw.promptTokens + raw.completionTokens
      },
      additionalData: raw.additionalMetadata
    };
  }

  async *streamMessage(prompt: string, _options?: ChatOptions): AsyncIterable<StreamingChunk> {
    const response = await this.sendMessage(prompt, _options);
    const words = response.content.split(' ');
    for (let i = 0; i < words.length; i++) {
      yield {
        model: this.modelId,
        contentFragment: words[i] + (i === words.length - 1 ? '' : ' '),
        isLast: i === words.length - 1
      };
    }
  }
}
