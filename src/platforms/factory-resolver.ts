import type { LLMFactory } from '../core/llm-factory.js';
import { llmRegistry } from '../registry/llm-registry.js';

export function resolveFactory(platform: string): LLMFactory {
  return llmRegistry.getFactory(platform);
}
