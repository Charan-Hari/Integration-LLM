import type { LLMFactory } from '../../core/llm-factory.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { OllamaClient } from '../sdk-clients.js';
export declare class OllamaFactory implements LLMFactory {
    private readonly client;
    constructor(client?: OllamaClient);
    createClient(model: string): LLMStrategy;
    listAvailableModels(): readonly string[];
}
