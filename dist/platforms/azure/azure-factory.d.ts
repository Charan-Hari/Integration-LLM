import type { LLMFactory } from '../../core/llm-factory.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { AzureOpenAIClient } from '../sdk-clients.js';
export declare class AzureFactory implements LLMFactory {
    private readonly client;
    constructor(client?: AzureOpenAIClient);
    createClient(model: string): LLMStrategy;
    listAvailableModels(): readonly string[];
}
