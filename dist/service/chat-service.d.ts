import type { ChatOptions, ChatResponse, StreamingChunk } from '../core/chat-types.js';
export interface ProviderConfig {
    readonly platform: string;
    readonly model: string;
}
export declare class ChatService {
    private readonly registry;
    private strategy?;
    private config?;
    constructor(registry?: import("../registry/llm-registry.js").LLMRegistry);
    configure(config: ProviderConfig): void;
    send(prompt: string, options?: ChatOptions): Promise<ChatResponse>;
    stream(prompt: string, options?: ChatOptions): AsyncIterable<StreamingChunk>;
    getCurrentConfiguration(): ProviderConfig | undefined;
    private resolveFactory;
    private ensureStrategy;
}
