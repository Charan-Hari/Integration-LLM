import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import type { OpenAIClient } from '../sdk-clients.js';
export declare class OpenAIStrategy implements LLMStrategy {
    private readonly client;
    private readonly modelName;
    constructor(client: OpenAIClient, modelName: string);
    sendMessage(prompt: string, options?: ChatOptions): Promise<ChatResponse>;
    streamMessage(prompt: string, _options?: ChatOptions): AsyncIterable<StreamingChunk>;
}
