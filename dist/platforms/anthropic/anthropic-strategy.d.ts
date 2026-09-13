import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import type { AnthropicClient } from '../sdk-clients.js';
export declare class AnthropicStrategy implements LLMStrategy {
    private readonly client;
    private readonly modelName;
    constructor(client: AnthropicClient, modelName: string);
    sendMessage(prompt: string, options?: ChatOptions): Promise<ChatResponse>;
    streamMessage(prompt: string, _options?: ChatOptions): AsyncIterable<StreamingChunk>;
}
