/**
 * Public entry point. Re-exports key types, strategies, and services.
 */
export type { ChatOptions, ChatResponse, StreamingChunk, UsageStatistics } from './core/chat-types.js';
export type { LLMStrategy } from './core/llm-strategy.js';
export type { LLMFactory } from './core/llm-factory.js';
export { llmRegistry, LLMRegistry } from './registry/llm-registry.js';
export { ChatService } from './service/chat-service.js';
export { LLMClientBuilder } from './service/llm-client-builder.js';
export { FallbackChatService } from './service/fallback-chat-service.js';
export { TokenCalculator } from './utils/token-calculator.js';
export { registerDefaultFactories } from './platforms/register.js';

export { AzureFactory } from './platforms/azure/azure-factory.js';
export { BedrockFactory } from './platforms/bedrock/bedrock-factory.js';
export { GoogleFactory } from './platforms/google/google-factory.js';
export { OllamaFactory } from './platforms/ollama/ollama-factory.js';
export { OpenAIFactory } from './platforms/openai/openai-factory.js';
export { AnthropicFactory } from './platforms/anthropic/anthropic-factory.js';
