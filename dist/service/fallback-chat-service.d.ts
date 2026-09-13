import type { ChatOptions, ChatResponse } from '../core/chat-types.js';
import type { LLMStrategy } from '../core/llm-strategy.js';
export declare class FallbackChatService {
    private readonly strategies;
    constructor(strategies: LLMStrategy[]);
    send(prompt: string, options?: ChatOptions): Promise<ChatResponse>;
}
