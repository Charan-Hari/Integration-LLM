import { GoogleGenerativeClient } from '../sdk-clients.js';
import { GoogleStrategy } from './google-strategy.js';
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
            throw new Error(`Google model "${model}" is not available.`);
        }
        return new GoogleStrategy(this.client, model);
    }
    listAvailableModels() {
        return SUPPORTED_MODELS;
    }
}
