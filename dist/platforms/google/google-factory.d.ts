import type { LLMFactory } from '../../core/llm-factory.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { GoogleGenerativeClient } from '../sdk-clients.js';
export declare class GoogleFactory implements LLMFactory {
    private readonly client;
    constructor(client?: GoogleGenerativeClient);
    createClient(model: string): LLMStrategy;
    listAvailableModels(): readonly string[];
}
