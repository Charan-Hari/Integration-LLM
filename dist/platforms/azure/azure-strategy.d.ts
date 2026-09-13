import type { ChatOptions, ChatResponse, StreamingChunk } from '../../core/chat-types.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import type { AzureOpenAIClient } from '../sdk-clients.js';
export declare class AzureOpenAIStrategy implements LLMStrategy {
    private readonly client;
    private readonly deploymentId;
    constructor(client: AzureOpenAIClient, deploymentId: string);
    sendMessage(prompt: string, options?: ChatOptions): Promise<ChatResponse>;
    streamMessage(prompt: string, _options?: ChatOptions): AsyncIterable<StreamingChunk>;
}
