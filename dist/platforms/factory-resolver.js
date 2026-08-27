import { AzureFactory } from './azure/azure-factory.js';
import { BedrockFactory } from './bedrock/bedrock-factory.js';
import { GoogleFactory } from './google/google-factory.js';
import { OllamaFactory } from './ollama/ollama-factory.js';
export function createFactory(platform) {
    switch (platform) {
        case 'bedrock':
            return new BedrockFactory();
        case 'azure':
            return new AzureFactory();
        case 'google':
            return new GoogleFactory();
        case 'ollama':
            return new OllamaFactory();
    }
}
