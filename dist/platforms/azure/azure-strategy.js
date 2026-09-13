export class AzureOpenAIStrategy {
    client;
    deploymentId;
    constructor(client, deploymentId) {
        this.client = client;
        this.deploymentId = deploymentId;
    }
    async sendMessage(prompt, options) {
        const raw = await this.client.createChatCompletion({
            deploymentId: this.deploymentId,
            messages: [
                ...(options?.systemPrompt ? [{ role: 'system', content: options.systemPrompt }] : []),
                { role: 'user', content: prompt }
            ],
            temperature: options?.temperature,
            maxTokens: options?.maxTokens
        });
        return {
            model: raw.model,
            content: raw.content,
            usage: {
                promptTokens: raw.usage.promptTokens,
                completionTokens: raw.usage.completionTokens,
                totalTokens: raw.usage.promptTokens + raw.usage.completionTokens
            }
        };
    }
    async *streamMessage(prompt, _options) {
        const response = await this.sendMessage(prompt, _options);
        const words = response.content.split(' ');
        for (let i = 0; i < words.length; i++) {
            yield {
                model: this.deploymentId,
                contentFragment: words[i] + (i === words.length - 1 ? '' : ' '),
                isLast: i === words.length - 1
            };
        }
    }
}
