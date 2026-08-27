import type { LLMFactory } from '../../core/llm-factory.js';
import type { LLMStrategy } from '../../core/llm-strategy.js';
import { OllamaClient } from '../sdk-clients.js';
import { OllamaStrategy } from './ollama-strategy.js';

const SUPPORTED_MODELS = Object.freeze([
  'llama3.2',
  'gemma3',
  'qwen3'
]);

export class OllamaFactory implements LLMFactory {
  constructor(private readonly client: OllamaClient = new OllamaClient()) {}

  createClient(model: string): LLMStrategy {
    if (!SUPPORTED_MODELS.includes(model)) {
      throw new Error(`Ollama model "${model}" is not available.`);
    }
    return new OllamaStrategy(this.client, model);
  }

  listAvailableModels(): readonly string[] {
    return SUPPORTED_MODELS;
  }
}
