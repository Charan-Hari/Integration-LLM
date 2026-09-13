import type { LLMFactory } from '../core/llm-factory.js';
export declare class LLMRegistry {
    private readonly factories;
    register(platform: string, factory: LLMFactory): void;
    getFactory(platform: string): LLMFactory;
    listPlatforms(): readonly string[];
    clear(): void;
}
export declare const llmRegistry: LLMRegistry;
