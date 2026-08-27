import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { GoogleGenerativeClient } from '../sdk-clients.js';

export class GoogleVertexStrategy implements LLMStrategy {
  constructor(
    private readonly client: GoogleGenerativeClient,
    private readonly model: string
  ) {}

  async sendMessage(prompt: string, options: ChatOptions = {}): Promise<ChatResponse> {
    const response = await this.client.generateContent({
      model: this.model,
      input: prompt,
      safetySettings: options.metadata
    });

    const firstCandidate = response.candidates[0];

    return {
      model: response.model,
      content: firstCandidate?.output ?? '',
      usage: {
        promptTokens: response.tokenUsage.promptTokens,
        completionTokens: response.tokenUsage.candidatesTokens,
        totalTokens: response.tokenUsage.promptTokens + response.tokenUsage.candidatesTokens
      }
    };
  }

  async *streamMessage(prompt: string, options: ChatOptions = {}): AsyncIterable<StreamingChunk> {
    const result = await this.sendMessage(prompt, options);
    const sentences = result.content.split(/(?<=[.!?])\s+/u);

    for (const [index, sentence] of sentences.entries()) {
      yield {
        model: result.model,
        contentFragment: sentence,
        isLast: index === sentences.length - 1
      };
    }
  }
}
