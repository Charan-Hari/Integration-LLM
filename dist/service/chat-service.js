import { llmRegistry } from '../registry/llm-registry.js';
export class ChatService {
    registry;
    strategy;
    config;
    constructor(registry = llmRegistry) {
        this.registry = registry;
    }
    configure(config) {
        const factory = this.resolveFactory(config.platform);
        this.strategy = factory.createClient(config.model);
        this.config = config;
    }
    async send(prompt, options) {
        return this.ensureStrategy().sendMessage(prompt, options);
    }
    async *stream(prompt, options) {
        yield* this.ensureStrategy().streamMessage(prompt, options);
    }
    getCurrentConfiguration() {
        return this.config;
    }
    resolveFactory(platform) {
        return this.registry.getFactory(platform);
    }
    ensureStrategy() {
        if (this.strategy === undefined) {
            throw new Error('ChatService has not been configured with a provider yet.');
        }
        return this.strategy;
    }
}
