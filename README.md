# Integration-LLM

A TypeScript demonstration of a provider-agnostic LLM integration layer.

This project applies three design patterns:

- Strategy: a shared `LLMStrategy` interface lets the application switch providers at runtime.
- Abstract Factory: each platform factory creates a strategy for a supported model.
- Adapter: each platform strategy converts provider-specific data into one shared response format.

## Current Status

The provider clients are typed mock implementations. They return predictable sample responses and do not make live requests to AWS Bedrock, Azure OpenAI, Google Vertex AI, or Ollama.

## Supported Platforms

| Platform | Example models |
| --- | --- |
| AWS Bedrock | `anthropic.claude-v2`, `mistral.large`, `meta.llama2-70b` |
| Azure OpenAI | `gpt-4o-mini`, `gpt-35-turbo`, `gpt-4o` |
| Google Vertex AI | `gemini-pro`, `gemini-1.0-pro`, `text-unicorn-latest` |
| Ollama | `llama3.2`, `gemma3`, `qwen3` |

## Requirements

- Node.js 18 or later
- npm

## Install and Run

```bash
npm install
npm run build
npm test
npm run demo


Project Layout
src/
  core/         Shared interfaces and response types
  platforms/    Factories, strategies, and mock SDK clients
  registry/     Factory registration and lookup
  service/      ChatService facade and fluent client builder
  demo.ts       Runtime switching demonstration

Basic Usage
import {
  ChatService,
  registerDefaultFactories
} from './src/index.js';

registerDefaultFactories();

const chatService = new ChatService();

chatService.configure({
  platform: 'azure',
  model: 'gpt-4o-mini'
});

const response = await chatService.send('Explain the adapter pattern.');

console.log(response.content);
console.log(response.usage.totalTokens);