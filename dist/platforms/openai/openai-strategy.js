export class OpenAIStrategy {
    client;
    modelName;
    constructor(client, modelName) {
        this.client = client;
        this.modelName = modelName;
    }
    async sendMessage(prompt, options) {
        const raw = await this.client.createCompletion({
            model: this.modelName,
            prompt,
            temperature: options?.temperature,
            maxTokens: options?.maxTokens
        });
        return {
            model: raw.model,
            content: raw.text,
            usage: {
                promptTokens: raw.promptTokens,
                completionTokens: raw.completionTokens,
                totalTokens: raw.promptTokens + raw.completionTokens
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
