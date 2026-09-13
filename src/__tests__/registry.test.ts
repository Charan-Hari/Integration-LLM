import { describe, it, expect, beforeEach } from 'vitest';
import { LLMRegistry } from '../registry/llm-registry.js';
import { OllamaFactory } from '../platforms/ollama/ollama-factory.js';

describe('LLMRegistry', () => {
  let registry: LLMRegistry;

  beforeEach(() => {
    registry = new LLMRegistry();
  });

  it('registers and resolves factory case-insensitively', () => {
    const factory = new OllamaFactory();
    registry.register('OLLAMA', factory);

    const resolved = registry.getFactory('ollama');
    expect(resolved).toBe(factory);
  });

  it('throws error for unregistered platform', () => {
    expect(() => registry.getFactory('unknown')).toThrow(
      'Factory for platform "unknown" has not been registered.'
    );
  });

  it('lists registered platforms', () => {
    registry.register('ollama', new OllamaFactory());
    expect(registry.listPlatforms()).toEqual(['ollama']);
  });
});
