export class LLMRegistry {
    factories = new Map();
    register(platform, factory) {
        this.factories.set(platform.toLowerCase(), factory);
    }
    getFactory(platform) {
        const factory = this.factories.get(platform.toLowerCase());
        if (factory === undefined) {
            throw new Error(`Factory for platform "${platform}" has not been registered.`);
        }
        return factory;
    }
    listPlatforms() {
        return [...this.factories.keys()];
    }
    clear() {
        this.factories.clear();
    }
}
export const llmRegistry = new LLMRegistry();
