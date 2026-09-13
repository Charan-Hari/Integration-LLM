import type { LLMFactory } from '../../core/llm-factory.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { BedrockSDKClient } from '../sdk-clients.js';
export declare class BedrockFactory implements LLMFactory {
    private readonly client;
    constructor(client?: BedrockSDKClient);
    createClient(model: string): LLMStrategy;
    listAvailableModels(): readonly string[];
}
