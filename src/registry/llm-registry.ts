import type { LLMFactory } from '../core/llm-factory.js';

export class LLMRegistry {
  private readonly factories = new Map<string, LLMFactory>();

  register(platform: string, factory: LLMFactory): void {
    this.factories.set(platform.toLowerCase(), factory);
  }

  getFactory(platform: string): LLMFactory {
    const factory = this.factories.get(platform.toLowerCase());
    if (factory === undefined) {
      throw new Error(`Factory for platform "${platform}" has not been registered.`);
    }
    return factory;
  }

  listPlatforms(): readonly string[] {
    return [...this.factories.keys()];
  }

  clear(): void {
    this.factories.clear();
  }
}

export const llmRegistry = new LLMRegistry();
