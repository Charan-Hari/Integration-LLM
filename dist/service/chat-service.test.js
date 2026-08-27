import { beforeEach, describe, expect, it } from 'vitest';
import { registerDefaultFactories } from '../platforms/register.js';
import { llmRegistry } from '../registry/llm-registry.js';
import { ChatService } from './chat-service.js';
import { LLMClientBuilder } from './llm-client-builder.js';
describe('ChatService integration', () => {
    beforeEach(() => {
        llmRegistry.clear();
        registerDefaultFactories();
    });
    it('switches strategies at runtime without recreating the service', async () => {
        const service = new ChatService();
        service.configure({
            platform: 'bedrock',
            model: 'anthropic.claude-v2'
        });
        const bedrockResponse = await service.send('Hello Bedrock');
        expect(bedrockResponse.model).toBe('anthropic.claude-v2');
        expect(bedrockResponse.content).toContain('Bedrock response');
        service.configure({
            platform: 'azure',
            model: 'gpt-35-turbo'
        });
        const azureResponse = await service.send('Hello Azure');
        expect(azureResponse.model).toBe('gpt-35-turbo');
        expect(azureResponse.content).toContain('Azure OpenAI response');
    });
    it('streams content fragments in a unified format', async () => {
        const service = new ChatService();
        service.configure({
            platform: 'google',
            model: 'gemini-pro'
        });
        const fragments = [];
        for await (const chunk of service.stream('Break response into sentences.')) {
            fragments.push(chunk.contentFragment);
        }
        expect(fragments.join(' ')).toContain('Vertex AI response');
    });
    it('builds a configured client with default options', async () => {
        const client = new LLMClientBuilder()
            .withPlatform('ollama')
            .withModel('llama3.2')
            .withDefaultOptions({ temperature: 0.5 })
            .build();
        const response = await client.send('Explain the benefits of adapters.');
        expect(response.model).toBe('llama3.2');
        expect(response.content).toContain('Ollama response');
    });
});
