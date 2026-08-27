import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { AzureOpenAIClient } from '../sdk-clients.js';

export class AzureOpenAIStrategy implements LLMStrategy {
  constructor(
    private readonly client: AzureOpenAIClient,
    private readonly deploymentId: string
  ) {}

  async sendMessage(prompt: string, options: ChatOptions = {}): Promise<ChatResponse> {
    const response = await this.client.createChatCompletion({
      deploymentId: this.deploymentId,
      temperature: options.temperature,
      maxTokens: options.maxTokens,
      messages: [
        ...(options.systemPrompt
          ? [{ role: 'system', content: options.systemPrompt }] as const
          : []),
        { role: 'user', content: prompt }
      ]
    });

    return {
      model: response.model,
      content: response.content,
      usage: {
        promptTokens: response.usage.promptTokens,
        completionTokens: response.usage.completionTokens,
        totalTokens: response.usage.promptTokens + response.usage.completionTokens
      }
    };
  }

  async *streamMessage(prompt: string, options: ChatOptions = {}): AsyncIterable<StreamingChunk> {
    const result = await this.sendMessage(prompt, options);
    const tokens = result.content.split(' ');

    for (const [index, token] of tokens.entries()) {
      yield {
        model: result.model,
        contentFragment: token + (index < tokens.length - 1 ? ' ' : ''),
        isLast: index === tokens.length - 1
      };
    }
  }
}
