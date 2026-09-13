export class AnthropicStrategy {
    client;
    modelName;
    constructor(client, modelName) {
        this.client = client;
        this.modelName = modelName;
    }
    async sendMessage(prompt, options) {
        const raw = await this.client.completeMessage({
            model: this.modelName,
            prompt,
            temperature: options?.temperature,
            maxTokens: options?.maxTokens
        });
        return {
            model: raw.model,
            content: raw.completion,
            usage: {
                promptTokens: raw.inputTokens,
                completionTokens: raw.outputTokens,
                totalTokens: raw.inputTokens + raw.outputTokens
            }
        };
    }
    async *streamMessage(prompt, _options) {
        const response = await this.sendMessage(prompt, _options);
        const words = response.content.split(' ');
        for (let i = 0; i < words.length; i++) {
            yield {
                model: this.modelName,
                contentFragment: words[i] + (i === words.length - 1 ? '' : ' '),
                isLast: i === words.length - 1
            };
        }
    }
}
