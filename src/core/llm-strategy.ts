import type { ChatOptions, ChatResponse, StreamingChunk } from './chat-types.js';

export interface LLMStrategy {
  sendMessage(prompt: string, options?: ChatOptions): Promise<ChatResponse>;
  streamMessage(prompt: string, options?: ChatOptions): AsyncIterable<StreamingChunk>;
}
