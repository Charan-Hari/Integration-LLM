export class GoogleStrategy {
    client;
    modelName;
    constructor(client, modelName) {
        this.client = client;
        this.modelName = modelName;
    }
    async sendMessage(prompt, _options) {
        const raw = await this.client.generateContent({
            model: this.modelName,
            input: prompt
        });
        const outputText = raw.candidates[0]?.output ?? '';
        return {
            model: raw.model,
            content: outputText,
            usage: {
                promptTokens: raw.tokenUsage.promptTokens,
                completionTokens: raw.tokenUsage.candidatesTokens,
                totalTokens: raw.tokenUsage.promptTokens + raw.tokenUsage.candidatesTokens
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
