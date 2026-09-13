import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import type { OllamaClient } from '../sdk-clients.js';
export declare class OllamaStrategy implements LLMStrategy {
    private readonly client;
    private readonly modelName;
    constructor(client: OllamaClient, modelName: string);
    sendMessage(prompt: string, _options?: ChatOptions): Promise<ChatResponse>;
    streamMessage(prompt: string, _options?: ChatOptions): AsyncIterable<StreamingChunk>;
}
