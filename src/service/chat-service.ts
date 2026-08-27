import type { ChatOptions, ChatResponse, StreamingChunk } from '../core/chat-types.js';
import type { LLMFactory } from '../core/llm-factory.js';
import type { LLMStrategy } from '../core/llm-strategy.js';
import { llmRegistry } from '../registry/llm-registry.js';

export interface ProviderConfig {
  readonly platform: string;
  readonly model: string;
}

export class ChatService {
  private strategy?: LLMStrategy;
  private config?: ProviderConfig;

  constructor(private readonly registry = llmRegistry) {}

  configure(config: ProviderConfig): void {
    const factory = this.resolveFactory(config.platform);
    this.strategy = factory.createClient(config.model);
    this.config = config;
  }

  async send(prompt: string, options?: ChatOptions): Promise<ChatResponse> {
    return this.ensureStrategy().sendMessage(prompt, options);
  }

  async *stream(prompt: string, options?: ChatOptions): AsyncIterable<StreamingChunk> {
    yield* this.ensureStrategy().streamMessage(prompt, options);
  }

  getCurrentConfiguration(): ProviderConfig | undefined {
    return this.config;
  }

  private resolveFactory(platform: string): LLMFactory {
    return this.registry.getFactory(platform);
  }

  private ensureStrategy(): LLMStrategy {
    if (this.strategy === undefined) {
      throw new Error('ChatService has not been configured with a provider yet.');
    }

    return this.strategy;
  }
}
