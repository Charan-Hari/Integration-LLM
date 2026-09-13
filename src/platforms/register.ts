import { llmRegistry } from '../registry/llm-registry.js';
import { AzureFactory } from './azure/azure-factory.js';
import { BedrockFactory } from './bedrock/bedrock-factory.js';
import { GoogleFactory } from './google/google-factory.js';
import { OllamaFactory } from './ollama/ollama-factory.js';
import { OpenAIFactory } from './openai/openai-factory.js';
import { AnthropicFactory } from './anthropic/anthropic-factory.js';

export function registerDefaultFactories(): void {
  llmRegistry.register('bedrock', new BedrockFactory());
  llmRegistry.register('azure', new AzureFactory());
  llmRegistry.register('google', new GoogleFactory());
  llmRegistry.register('ollama', new OllamaFactory());
  llmRegistry.register('openai', new OpenAIFactory());
  llmRegistry.register('anthropic', new AnthropicFactory());
}
