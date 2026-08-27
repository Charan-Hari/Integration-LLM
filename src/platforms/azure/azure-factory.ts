import type { LLMFactory } from '../../core/llm-factory.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { AzureOpenAIClient } from '../sdk-clients.js';
import { AzureOpenAIStrategy } from './azure-strategy.js';

const SUPPORTED_DEPLOYMENTS = Object.freeze([
  'gpt-4o-mini',
  'gpt-35-turbo',
  'gpt-4o'
]);

export class AzureFactory implements LLMFactory {
  constructor(private readonly client: AzureOpenAIClient = new AzureOpenAIClient()) {}

  createClient(model: string): LLMStrategy {
    if (!SUPPORTED_DEPLOYMENTS.includes(model)) {
      throw new Error(`Azure deployment "${model}" is not registered.`);
    }
    return new AzureOpenAIStrategy(this.client, model);
  }

  listAvailableModels(): readonly string[] {
    return SUPPORTED_DEPLOYMENTS;
  }
}
