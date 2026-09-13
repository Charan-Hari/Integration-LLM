# Integration-LLM

> **Unified, Provider-Agnostic LLM Integration Framework for TypeScript**

[![CI Pipeline](https://github.com/Charan-Hari/Integration-LLM/actions/workflows/ci.yml/badge.svg)](https://github.com/Charan-Hari/Integration-LLM/actions)
[![Deploy Docs](https://github.com/Charan-Hari/Integration-LLM/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/Charan-Hari/Integration-LLM/actions)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Website-success)](https://charan-hari.github.io/Integration-LLM/)

`Integration-LLM` is an enterprise-grade TypeScript library and interactive portal designed for provider-agnostic integration across **Azure OpenAI**, **AWS Bedrock**, **Google Vertex AI**, **Ollama**, **OpenAI Direct**, and **Anthropic Claude**.

Built with proven design patterns (**Strategy**, **Abstract Factory**, **Adapter**, **Facade**, and **Builder**), `Integration-LLM` empowers applications to switch LLM backends dynamically at runtime without changing client code.

---

## 🌟 Key Features

- **Multi-Cloud & Local Provider Support**: Seamless integration for Azure OpenAI, AWS Bedrock, Google Vertex AI, Ollama (Local/Self-hosted), OpenAI Direct, and Anthropic Claude.
- **Runtime Switching**: Change LLM strategy dynamically at runtime without redeployment or code refactoring.
- **Resilient Multi-Provider Failover**: Includes `FallbackChatService` to automatically fall back to secondary LLMs if the primary fails.
- **Token Usage Estimation**: `TokenCalculator` utility for prompt/completion token tracking across providers.
- **Interactive Documentation & Playground**: Hosted live on [GitHub Pages](https://charan-hari.github.io/Integration-LLM/).
- **Fully Type-Safe**: Written in strict TypeScript with comprehensive Vitest test coverage and automated GitHub Actions CI.

---

## 🌐 Live GitHub Pages Documentation & Interactive Playground

Visit the live documentation and interactive playground at:
👉 **[https://charan-hari.github.io/Integration-LLM/](https://charan-hari.github.io/Integration-LLM/)**

Features of the online portal:
- Live Interactive LLM Playground with model selection, temperature control, system prompt testing, and real-time execution metrics.
- Code generator exporting ready-to-use TypeScript, CommonJS, Builder pattern, and Resilient Fallback snippets.
- Interactive API Reference and Architecture Diagram viewer.

---

## 🚀 Quick Start

### 1. Installation

```bash
npm install integration-llm
```

### 2. Basic Usage (`ChatService`)

```typescript
import { ChatService, registerDefaultFactories } from 'integration-llm';

// Register built-in factories (Azure, Bedrock, Google, Ollama, OpenAI, Anthropic)
registerDefaultFactories();

const chatService = new ChatService();

// Configure provider platform & model at runtime
chatService.configure({
  platform: 'ollama', // Options: 'azure', 'bedrock', 'google', 'ollama', 'openai', 'anthropic'
  model: 'llama3.2'
});

const response = await chatService.send('Explain the Strategy Pattern in TypeScript.', {
  temperature: 0.7,
  maxTokens: 500
});

console.log('Model:', response.model);
console.log('Response:', response.content);
console.log('Prompt Tokens:', response.usage.promptTokens);
console.log('Completion Tokens:', response.usage.completionTokens);
```

### 3. Builder Pattern (`LLMClientBuilder`)

```typescript
import { LLMClientBuilder, registerDefaultFactories } from 'integration-llm';

registerDefaultFactories();

const response = await new LLMClientBuilder()
  .setPlatform('azure')
  .setModel('gpt-4o')
  .send('Explain the Adapter pattern.', { temperature: 0.5 });
```

### 4. Multi-Provider Resilient Failover (`FallbackChatService`)

```typescript
import { FallbackChatService, LLMClientBuilder, registerDefaultFactories } from 'integration-llm';

registerDefaultFactories();

// Primary: Azure OpenAI | Secondary: Ollama Local
const primary = new LLMClientBuilder().setPlatform('azure').setModel('gpt-4o').build();
const secondary = new LLMClientBuilder().setPlatform('ollama').setModel('llama3.2').build();

const resilientService = new FallbackChatService([primary, secondary]);
const response = await resilientService.send('Mission-critical prompt');
```

---

## 🛠️ Design Patterns Architecture

```
Client App
   │
   ▼
ChatService (Facade) ──► LLMRegistry (Lookup)
   │                           │
   ▼                           ▼
LLMStrategy (Interface) ◄── LLMFactory (Abstract Factory)
   │
   ▼
Platform Strategy (Adapter) ──► SDK Client ──► Vendor API
```

1. **Strategy Pattern**: `LLMStrategy` interface defines standardized message sending & streaming operations.
2. **Abstract Factory Pattern**: Platform factories (`AzureFactory`, `BedrockFactory`, etc.) isolate client instantiation.
3. **Adapter Pattern**: Vendor response formats are normalized into a single `ChatResponse` contract.
4. **Facade Pattern**: `ChatService` simplifies provider lookup and request dispatching.

---

## 🧪 Testing & Building

Run unit tests with Vitest:

```bash
npm run test
```

Build TypeScript definitions and bundle:

```bash
npm run build
```

Run linter:

```bash
npm run lint
```

Run demo script:

```bash
npm run demo
```

---

## 📄 License

This project is licensed under the **ISC License**.
