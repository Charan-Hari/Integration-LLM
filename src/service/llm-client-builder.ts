import type { ChatOptions, ChatResponse } from '../core/chat-types.js';
import type { LLMStrategy } from '../core/llm-strategy.js';
import { llmRegistry } from '../registry/llm-registry.js';

export class LLMClientBuilder {
  private platform?: string;
  private model?: string;

  setPlatform(platform: string): this {
    this.platform = platform;
    return this;
  }

  setModel(model: string): this {
    this.model = model;
    return this;
  }

  build(): LLMStrategy {
    if (!this.platform || !this.model) {
      throw new Error('Both platform and model must be specified before building client.');
    }
    const factory = llmRegistry.getFactory(this.platform);
    return factory.createClient(this.model);
  }

  async send(prompt: string, options?: ChatOptions): Promise<ChatResponse> {
    const client = this.build();
    return client.sendMessage(prompt, options);
  }
}
