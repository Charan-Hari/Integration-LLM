import type { LLMFactory } from '../../core/llm-factory.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { AnthropicClient } from '../sdk-clients.js';
import { AnthropicStrategy } from './anthropic-strategy.js';

const SUPPORTED_MODELS = Object.freeze([
  'claude-3-5-sonnet',
  'claude-3-opus',
  'claude-3-haiku'
]);

export class AnthropicFactory implements LLMFactory {
  constructor(private readonly client: AnthropicClient = new AnthropicClient()) {}

  createClient(model: string): LLMStrategy {
    if (!SUPPORTED_MODELS.includes(model)) {
      throw new Error(`Anthropic model "${model}" is not registered.`);
    }
    return new AnthropicStrategy(this.client, model);
  }

  listAvailableModels(): readonly string[] {
    return SUPPORTED_MODELS;
  }
}
