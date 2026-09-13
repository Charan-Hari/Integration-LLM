import type { LLMFactory } from '../../core/llm-factory.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { OpenAIClient } from '../sdk-clients.js';
import { OpenAIStrategy } from './openai-strategy.js';

const SUPPORTED_MODELS = Object.freeze([
  'gpt-4o',
  'gpt-4o-mini',
  'gpt-4-turbo',
  'gpt-3.5-turbo'
]);

export class OpenAIFactory implements LLMFactory {
  constructor(private readonly client: OpenAIClient = new OpenAIClient()) {}

  createClient(model: string): LLMStrategy {
    if (!SUPPORTED_MODELS.includes(model)) {
      throw new Error(`OpenAI model "${model}" is not registered.`);
    }
    return new OpenAIStrategy(this.client, model);
  }

  listAvailableModels(): readonly string[] {
    return SUPPORTED_MODELS;
  }
}
