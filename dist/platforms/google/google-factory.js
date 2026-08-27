import { GoogleGenerativeClient } from '../sdk-clients.js';
import { GoogleVertexStrategy } from './google-strategy.js';
const SUPPORTED_MODELS = Object.freeze([
    'gemini-pro',
    'gemini-1.0-pro',
    'text-unicorn-latest'
]);
export class GoogleFactory {
    client;
    constructor(client = new GoogleGenerativeClient()) {
        this.client = client;
    }
    createClient(model) {
        if (!SUPPORTED_MODELS.includes(model)) {
            throw new Error(`Google model "${model}" is not supported.`);
        }
        return new GoogleVertexStrategy(this.client, model);
    }
    listAvailableModels() {
        return SUPPORTED_MODELS;
    }
}
