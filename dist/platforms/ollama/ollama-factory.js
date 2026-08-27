import { OllamaClient } from '../sdk-clients.js';
import { OllamaStrategy } from './ollama-strategy.js';
const SUPPORTED_MODELS = Object.freeze([
    'llama3.2',
    'gemma3',
    'qwen3'
]);
export class OllamaFactory {
    client;
    constructor(client = new OllamaClient()) {
        this.client = client;
    }
    createClient(model) {
        if (!SUPPORTED_MODELS.includes(model)) {
            throw new Error(`Ollama model "${model}" is not available.`);
        }
        return new OllamaStrategy(this.client, model);
    }
    listAvailableModels() {
        return SUPPORTED_MODELS;
    }
}
