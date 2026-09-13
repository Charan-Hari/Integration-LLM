import type { LLMFactory } from '../../core/llm-factory.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { AnthropicClient } from '../sdk-clients.js';
export declare class AnthropicFactory implements LLMFactory {
    private readonly client;
    constructor(client?: AnthropicClient);
    createClient(model: string): LLMStrategy;
    listAvailableModels(): readonly string[];
}
