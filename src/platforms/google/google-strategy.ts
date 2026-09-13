import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import type { GoogleGenerativeClient } from '../sdk-clients.js';

export class GoogleStrategy implements LLMStrategy {
  constructor(
    private readonly client: GoogleGenerativeClient,
    private readonly modelName: string
  ) {}

  async sendMessage(prompt: string, _options?: ChatOptions): Promise<ChatResponse> {
    const raw = await this.client.generateContent({
      model: this.modelName,
      input: prompt
    });

    const outputText = raw.candidates[0]?.output ?? '';

    return {
      model: raw.model,
      content: outputText,
      usage: {
        promptTokens: raw.tokenUsage.promptTokens,
        completionTokens: raw.tokenUsage.candidatesTokens,
        totalTokens: raw.tokenUsage.promptTokens + raw.tokenUsage.candidatesTokens
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
