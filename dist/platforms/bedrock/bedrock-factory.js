import { BedrockSDKClient } from '../sdk-clients.js';
import { BedrockStrategy } from './bedrock-strategy.js';
const SUPPORTED_MODELS = Object.freeze([
    'anthropic.claude-v2',
    'mistral.large',
    'meta.llama2-70b'
]);
export class BedrockFactory {
    client;
    constructor(client = new BedrockSDKClient()) {
        this.client = client;
    }
    createClient(model) {
        if (!SUPPORTED_MODELS.includes(model)) {
            throw new Error(`Bedrock model "${model}" is not supported.`);
        }
        return new BedrockStrategy(this.client, model);
    }
    listAvailableModels() {
        return SUPPORTED_MODELS;
    }
}
