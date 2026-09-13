import { AnthropicClient } from '../sdk-clients.js';
import { AnthropicStrategy } from './anthropic-strategy.js';
const SUPPORTED_MODELS = Object.freeze([
    'claude-3-5-sonnet',
    'claude-3-opus',
    'claude-3-haiku'
]);
export class AnthropicFactory {
    client;
    constructor(client = new AnthropicClient()) {
        this.client = client;
    }
    createClient(model) {
        if (!SUPPORTED_MODELS.includes(model)) {
            throw new Error(`Anthropic model "${model}" is not registered.`);
        }
        return new AnthropicStrategy(this.client, model);
    }
    listAvailableModels() {
        return SUPPORTED_MODELS;
    }
}
