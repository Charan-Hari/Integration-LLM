export class OllamaStrategy {
    client;
    model;
    constructor(client, model) {
        this.client = client;
        this.model = model;
    }
    async sendMessage(prompt, options = {}) {
        const response = await this.client.generate({
            model: this.model,
            prompt,
            options: {
                temperature: options.temperature,
                num_predict: options.maxTokens,
                ...options.metadata
            }
        });
        return {
            model: response.model,
            content: response.response,
            usage: {
                promptTokens: response.promptEvalCount,
                completionTokens: response.evalCount,
                totalTokens: response.promptEvalCount + response.evalCount
            }
        };
    }
    async *streamMessage(prompt, options = {}) {
        const result = await this.sendMessage(prompt, options);
        const characters = [...result.content];
        for (const [index, character] of characters.entries()) {
            yield {
                model: result.model,
                contentFragment: character,
                isLast: index === characters.length - 1
            };
        }
    }
}
