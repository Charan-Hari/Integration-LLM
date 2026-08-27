export class AzureOpenAIStrategy {
    client;
    deploymentId;
    constructor(client, deploymentId) {
        this.client = client;
        this.deploymentId = deploymentId;
    }
    async sendMessage(prompt, options = {}) {
        const response = await this.client.createChatCompletion({
            deploymentId: this.deploymentId,
            temperature: options.temperature,
            maxTokens: options.maxTokens,
            messages: [
                ...(options.systemPrompt
                    ? [{ role: 'system', content: options.systemPrompt }]
                    : []),
                { role: 'user', content: prompt }
            ]
        });
        return {
            model: response.model,
            content: response.content,
            usage: {
                promptTokens: response.usage.promptTokens,
                completionTokens: response.usage.completionTokens,
                totalTokens: response.usage.promptTokens + response.usage.completionTokens
            }
        };
    }
    async *streamMessage(prompt, options = {}) {
        const result = await this.sendMessage(prompt, options);
        const tokens = result.content.split(' ');
        for (const [index, token] of tokens.entries()) {
            yield {
                model: result.model,
                contentFragment: token + (index < tokens.length - 1 ? ' ' : ''),
                isLast: index === tokens.length - 1
            };
        }
    }
}
