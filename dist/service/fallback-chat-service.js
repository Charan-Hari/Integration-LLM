export class FallbackChatService {
    strategies;
    constructor(strategies) {
        this.strategies = strategies;
        if (!strategies || strategies.length === 0) {
            throw new Error('At least one LLM strategy must be provided for fallback.');
        }
    }
    async send(prompt, options) {
        const errors = [];
        for (const strategy of this.strategies) {
            try {
                return await strategy.sendMessage(prompt, options);
            }
            catch (err) {
                errors.push(err instanceof Error ? err : new Error(String(err)));
            }
        }
        throw new Error(`All fallback LLM providers failed:\n${errors.map((e, idx) => `[Provider ${idx + 1}]: ${e.message}`).join('\n')}`);
    }
}
