import { OpenAIClient } from '../sdk-clients.js';
import { OpenAIStrategy } from './openai-strategy.js';
const SUPPORTED_MODELS = Object.freeze([
    'gpt-4o',
    'gpt-4o-mini',
    'gpt-4-turbo',
    'gpt-3.5-turbo'
]);
export class OpenAIFactory {
    client;
    constructor(client = new OpenAIClient()) {
        this.client = client;
    }
    createClient(model) {
        if (!SUPPORTED_MODELS.includes(model)) {
            throw new Error(`OpenAI model "${model}" is not registered.`);
        }
        return new OpenAIStrategy(this.client, model);
    }
    listAvailableModels() {
        return SUPPORTED_MODELS;
    }
}
