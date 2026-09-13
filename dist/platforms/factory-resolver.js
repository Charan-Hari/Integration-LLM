import { llmRegistry } from '../registry/llm-registry.js';
export function resolveFactory(platform) {
    return llmRegistry.getFactory(platform);
}
