import { llmRegistry } from '../registry/llm-registry.js';
export class LLMClientBuilder {
    platform;
    model;
    setPlatform(platform) {
        this.platform = platform;
        return this;
    }
    setModel(model) {
        this.model = model;
        return this;
    }
    build() {
        if (!this.platform || !this.model) {
            throw new Error('Both platform and model must be specified before building client.');
        }
        const factory = llmRegistry.getFactory(this.platform);
        return factory.createClient(this.model);
    }
    async send(prompt, options) {
        const client = this.build();
        return client.sendMessage(prompt, options);
    }
}
