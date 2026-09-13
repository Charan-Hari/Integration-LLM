import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import type { BedrockSDKClient } from '../sdk-clients.js';
export declare class BedrockStrategy implements LLMStrategy {
    private readonly client;
    private readonly modelId;
    constructor(client: BedrockSDKClient, modelId: string);
    sendMessage(prompt: string, options?: ChatOptions): Promise<ChatResponse>;
    streamMessage(prompt: string, _options?: ChatOptions): AsyncIterable<StreamingChunk>;
}
