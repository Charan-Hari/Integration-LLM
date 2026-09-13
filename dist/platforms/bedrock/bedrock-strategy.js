export class BedrockStrategy {
    client;
    modelId;
    constructor(client, modelId) {
        this.client = client;
        this.modelId = modelId;
    }
    async sendMessage(prompt, options) {
        const raw = await this.client.invokeModel({
            modelId: this.modelId,
            prompt,
            temperature: options?.temperature,
            maxTokens: options?.maxTokens
        });
        return {
            model: raw.modelId,
            content: raw.outputText,
            usage: {
                promptTokens: raw.promptTokens,
                completionTokens: raw.completionTokens,
                totalTokens: raw.promptTokens + raw.completionTokens
            },
            additionalData: raw.additionalMetadata
        };
    }
    async *streamMessage(prompt, _options) {
        const response = await this.sendMessage(prompt, _options);
        const words = response.content.split(' ');
        for (let i = 0; i < words.length; i++) {
            yield {
                model: this.modelId,
                contentFragment: words[i] + (i === words.length - 1 ? '' : ' '),
                isLast: i === words.length - 1
            };
        }
    }
}
