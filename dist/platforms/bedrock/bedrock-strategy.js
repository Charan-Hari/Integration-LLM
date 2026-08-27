export class BedrockStrategy {
    client;
    modelId;
    constructor(client, modelId) {
        this.client = client;
        this.modelId = modelId;
    }
    async sendMessage(prompt, options = {}) {
        const response = await this.client.invokeModel({
            modelId: this.modelId,
            prompt,
            temperature: options.temperature,
            maxTokens: options.maxTokens
        });
        return {
            model: response.modelId,
            content: response.outputText,
            usage: {
                promptTokens: response.promptTokens,
                completionTokens: response.completionTokens,
                totalTokens: response.promptTokens + response.completionTokens
            },
            additionalData: response.additionalMetadata
        };
    }
    async *streamMessage(prompt, options = {}) {
        const result = await this.sendMessage(prompt, options);
        const words = result.content.split(' ');
        for (const [index, word] of words.entries()) {
            yield {
                model: result.model,
                contentFragment: word + (index < words.length - 1 ? ' ' : ''),
                isLast: index === words.length - 1
            };
        }
    }
}
