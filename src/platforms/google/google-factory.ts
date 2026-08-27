import type { LLMFactory } from '../../core/llm-factory.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { GoogleGenerativeClient } from '../sdk-clients.js';
import { GoogleVertexStrategy } from './google-strategy.js';

const SUPPORTED_MODELS = Object.freeze([
  'gemini-pro',
  'gemini-1.0-pro',
  'text-unicorn-latest'
]);

export class GoogleFactory implements LLMFactory {
  constructor(private readonly client: GoogleGenerativeClient = new GoogleGenerativeClient()) {}

  createClient(model: string): LLMStrategy {
    if (!SUPPORTED_MODELS.includes(model)) {
      throw new Error(`Google model "${model}" is not supported.`);
    }
    return new GoogleVertexStrategy(this.client, model);
  }

  listAvailableModels(): readonly string[] {
    return SUPPORTED_MODELS;
  }
}
