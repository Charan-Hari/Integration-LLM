export class OllamaStrategy {
    client;
    modelName;
    constructor(client, modelName) {
        this.client = client;
        this.modelName = modelName;
    }
    async sendMessage(prompt, _options) {
        const raw = await this.client.generate({
            model: this.modelName,
            prompt
        });
        return {
            model: raw.model,
            content: raw.response,
            usage: {
                promptTokens: raw.promptEvalCount,
                completionTokens: raw.evalCount,
                totalTokens: raw.promptEvalCount + raw.evalCount
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
