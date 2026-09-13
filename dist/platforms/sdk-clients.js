export class BedrockSDKClient {
    async invokeModel(request) {
        return {
            modelId: request.modelId,
            outputText: `Bedrock response to: ${request.prompt}`,
            promptTokens: 10,
            completionTokens: 20,
            additionalMetadata: { temperature: request.temperature ?? 0 }
        };
    }
}
export class AzureOpenAIClient {
    async createChatCompletion(request) {
        const userMessage = request.messages.find((message) => message.role === 'user');
        return {
            model: request.deploymentId,
            content: `Azure OpenAI response to: ${userMessage?.content ?? ''}`,
            usage: { promptTokens: 12, completionTokens: 18 }
        };
    }
}
export class GoogleGenerativeClient {
    async generateContent(request) {
        return {
            model: request.model,
            candidates: [{ output: `Vertex AI response to: ${request.input}` }],
            tokenUsage: { promptTokens: 9, candidatesTokens: 16 }
        };
    }
}
export class OllamaClient {
    async generate(request) {
        return {
            model: request.model,
            response: `Ollama response to: ${request.prompt}`,
            promptEvalCount: 8,
            evalCount: 13
        };
    }
}
export class OpenAIClient {
    async createCompletion(request) {
        return {
            model: request.model,
            text: `OpenAI response to: ${request.prompt}`,
            promptTokens: 14,
            completionTokens: 22
        };
    }
}
export class AnthropicClient {
    async completeMessage(request) {
        return {
            model: request.model,
            completion: `Anthropic Claude response to: ${request.prompt}`,
            inputTokens: 15,
            outputTokens: 25
        };
    }
}
