import type { ChatOptions, ChatResponse } from '../core/chat-types.js';
import type { LLMStrategy } from '../core/llm-strategy.js';
export declare class LLMClientBuilder {
    private platform?;
    private model?;
    setPlatform(platform: string): this;
    setModel(model: string): this;
    build(): LLMStrategy;
    send(prompt: string, options?: ChatOptions): Promise<ChatResponse>;
}
