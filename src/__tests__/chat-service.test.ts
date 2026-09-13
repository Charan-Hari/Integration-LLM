import { describe, it, expect, beforeEach } from 'vitest';
import { ChatService } from '../service/chat-service.js';
import { LLMRegistry } from '../registry/llm-registry.js';
import { OllamaFactory } from '../platforms/ollama/ollama-factory.js';
import { AzureFactory } from '../platforms/azure/azure-factory.js';

describe('ChatService', () => {
  let registry: LLMRegistry;
  let chatService: ChatService;

  beforeEach(() => {
    registry = new LLMRegistry();
    registry.register('ollama', new OllamaFactory());
    registry.register('azure', new AzureFactory());
    chatService = new ChatService(registry);
  });

  it('throws error if sending message before configuration', async () => {
    await expect(chatService.send('Hello')).rejects.toThrow(
      'ChatService has not been configured with a provider yet.'
    );
  });

  it('configures and sends message via Ollama', async () => {
    chatService.configure({ platform: 'ollama', model: 'llama3.2' });
    const response = await chatService.send('Test Prompt');

    expect(response.model).toBe('llama3.2');
    expect(response.content).toContain('Ollama response to: Test Prompt');
    expect(response.usage.totalTokens).toBeGreaterThan(0);
  });

  it('allows switching provider at runtime', async () => {
    chatService.configure({ platform: 'ollama', model: 'llama3.2' });
    let response = await chatService.send('First');
    expect(response.model).toBe('llama3.2');

    chatService.configure({ platform: 'azure', model: 'gpt-4o' });
    response = await chatService.send('Second');
    expect(response.model).toBe('gpt-4o');
    expect(response.content).toContain('Azure OpenAI response to: Second');
  });

  it('streams response chunks', async () => {
    chatService.configure({ platform: 'ollama', model: 'llama3.2' });
    const chunks: string[] = [];
    for await (const chunk of chatService.stream('Stream Prompt')) {
      chunks.push(chunk.contentFragment);
    }

    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks.join('')).toContain('Ollama response to: Stream Prompt');
  });
});
