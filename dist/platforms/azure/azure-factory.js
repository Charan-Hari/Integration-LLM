import { AzureOpenAIClient } from '../sdk-clients.js';
import { AzureOpenAIStrategy } from './azure-strategy.js';
const SUPPORTED_DEPLOYMENTS = Object.freeze([
    'gpt-4o-mini',
    'gpt-35-turbo',
    'gpt-4o'
]);
export class AzureFactory {
    client;
    constructor(client = new AzureOpenAIClient()) {
        this.client = client;
    }
    createClient(model) {
        if (!SUPPORTED_DEPLOYMENTS.includes(model)) {
            throw new Error(`Azure deployment "${model}" is not registered.`);
        }
        return new AzureOpenAIStrategy(this.client, model);
    }
    listAvailableModels() {
        return SUPPORTED_DEPLOYMENTS;
    }
}
