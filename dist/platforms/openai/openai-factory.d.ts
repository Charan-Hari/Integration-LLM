import type { LLMFactory } from '../../core/llm-factory.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { OpenAIClient } from '../sdk-clients.js';
export declare class OpenAIFactory implements LLMFactory {
    private readonly client;
    constructor(client?: OpenAIClient);
    createClient(model: string): LLMStrategy;
    listAvailableModels(): readonly string[];
}
