import { ChatService, registerDefaultFactories } from './index.js';

async function main() {
  console.log('--- Initializing Integration-LLM ---');
  registerDefaultFactories();

  const chatService = new ChatService();

  console.log('\n[1] Testing Ollama Provider:');
  chatService.configure({
    platform: 'ollama',
    model: 'llama3.2'
  });

  const response1 = await chatService.send('Explain the Strategy Pattern in TypeScript.');
  console.log('Model:', response1.model);
  console.log('Response:', response1.content);
  console.log('Usage:', response1.usage);

  console.log('\n[2] Testing Azure OpenAI Provider:');
  chatService.configure({
    platform: 'azure',
    model: 'gpt-4o'
  });

  const response2 = await chatService.send('Explain the Adapter Pattern in TypeScript.');
  console.log('Model:', response2.model);
  console.log('Response:', response2.content);
  console.log('Usage:', response2.usage);
}

main().catch(console.error);
