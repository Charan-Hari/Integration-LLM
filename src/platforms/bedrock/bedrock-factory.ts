import type { LLMFactory } from '../../core/llm-factory.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { BedrockSDKClient } from '../sdk-clients.js';
import { BedrockStrategy } from './bedrock-strategy.js';

const SUPPORTED_MODELS = Object.freeze([
  'anthropic.claude-v2',
  'mistral.large',
  'meta.llama2-70b'
]);

export class BedrockFactory implements LLMFactory {
  constructor(private readonly client: BedrockSDKClient = new BedrockSDKClient()) {}

  createClient(model: string): LLMStrategy {
    if (!SUPPORTED_MODELS.includes(model)) {
      throw new Error(`Bedrock model "${model}" is not supported.`);
    }
    return new BedrockStrategy(this.client, model);
  }

  listAvailableModels(): readonly string[] {
    return SUPPORTED_MODELS;
  }
}
