import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import type { AzureOpenAIClient } from '../sdk-clients.js';

export class AzureOpenAIStrategy implements LLMStrategy {
  constructor(
    private readonly client: AzureOpenAIClient,
    private readonly deploymentId: string
  ) {}

  async sendMessage(prompt: string, options?: ChatOptions): Promise<ChatResponse> {
    const raw = await this.client.createChatCompletion({
      deploymentId: this.deploymentId,
      messages: [
        ...(options?.systemPrompt ? [{ role: 'system' as const, content: options.systemPrompt }] : []),
        { role: 'user', content: prompt }
      ],
      temperature: options?.temperature,
      maxTokens: options?.maxTokens
    });

    return {
      model: raw.model,
      content: raw.content,
      usage: {
        promptTokens: raw.usage.promptTokens,
        completionTokens: raw.usage.completionTokens,
        totalTokens: raw.usage.promptTokens + raw.usage.completionTokens
      }
    };
  }

  async *streamMessage(prompt: string, _options?: ChatOptions): AsyncIterable<StreamingChunk> {
    const response = await this.sendMessage(prompt, _options);
    const words = response.content.split(' ');
    for (let i = 0; i < words.length; i++) {
      yield {
        model: this.deploymentId,
        contentFragment: words[i] + (i === words.length - 1 ? '' : ' '),
        isLast: i === words.length - 1
      };
    }
  }
}
