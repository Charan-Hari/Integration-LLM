export class GoogleVertexStrategy {
    client;
    model;
    constructor(client, model) {
        this.client = client;
        this.model = model;
    }
    async sendMessage(prompt, options = {}) {
        const response = await this.client.generateContent({
            model: this.model,
            input: prompt,
            safetySettings: options.metadata
        });
        const firstCandidate = response.candidates[0];
        return {
            model: response.model,
            content: firstCandidate?.output ?? '',
            usage: {
                promptTokens: response.tokenUsage.promptTokens,
                completionTokens: response.tokenUsage.candidatesTokens,
                totalTokens: response.tokenUsage.promptTokens + response.tokenUsage.candidatesTokens
            }
        };
    }
    async *streamMessage(prompt, options = {}) {
        const result = await this.sendMessage(prompt, options);
        const sentences = result.content.split(/(?<=[.!?])\s+/u);
        for (const [index, sentence] of sentences.entries()) {
            yield {
                model: result.model,
                contentFragment: sentence,
                isLast: index === sentences.length - 1
            };
        }
    }
}
