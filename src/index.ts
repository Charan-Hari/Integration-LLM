/**
 * Public entry point. Re-exports key types and helpers.
 */
export type { ChatOptions, ChatResponse, StreamingChunk } from './core/chat-types.js';
export type { LLMStrategy } from './core/llm-strategy.js';
export type { LLMFactory } from './core/llm-factory.js';
export { llmRegistry } from './registry/llm-registry.js';
export { ChatService } from './service/chat-service.js';
export { LLMClientBuilder } from './service/llm-client-builder.js';
export { registerDefaultFactories } from './platforms/register.js';
