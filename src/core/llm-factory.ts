import type { LLMStrategy } from './llm-strategy.js';

export interface LLMFactory {
  createClient(model: string): LLMStrategy;
  listAvailableModels(): readonly string[];
}
