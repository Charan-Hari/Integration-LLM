export interface BedrockRequest {
    readonly modelId: string;
    readonly prompt: string;
    readonly temperature?: number;
    readonly maxTokens?: number;
}
export interface BedrockResponse {
    readonly modelId: string;
    readonly outputText: string;
    readonly promptTokens: number;
    readonly completionTokens: number;
    readonly additionalMetadata?: Record<string, unknown>;
}
export declare class BedrockSDKClient {
    invokeModel(request: BedrockRequest): Promise<BedrockResponse>;
}
export interface AzureRequest {
    readonly deploymentId: string;
    readonly messages: Array<{
        role: 'system' | 'user';
        content: string;
    }>;
    readonly temperature?: number;
    readonly maxTokens?: number;
}
export interface AzureResponse {
    readonly model: string;
    readonly content: string;
    readonly usage: {
        promptTokens: number;
        completionTokens: number;
    };
}
export declare class AzureOpenAIClient {
    createChatCompletion(request: AzureRequest): Promise<AzureResponse>;
}
export interface GoogleRequest {
    readonly model: string;
    readonly input: string;
    readonly safetySettings?: Record<string, unknown>;
}
export interface GoogleResponse {
    readonly model: string;
    readonly candidates: Array<{
        output: string;
    }>;
    readonly tokenUsage: {
        promptTokens: number;
        candidatesTokens: number;
    };
}
export declare class GoogleGenerativeClient {
    generateContent(request: GoogleRequest): Promise<GoogleResponse>;
}
export interface OllamaRequest {
    readonly model: string;
    readonly prompt: string;
    readonly options?: Record<string, unknown>;
}
export interface OllamaResponse {
    readonly model: string;
    readonly response: string;
    readonly promptEvalCount: number;
    readonly evalCount: number;
}
export declare class OllamaClient {
    generate(request: OllamaRequest): Promise<OllamaResponse>;
}
export interface OpenAIRequest {
    readonly model: string;
    readonly prompt: string;
    readonly temperature?: number;
    readonly maxTokens?: number;
}
export interface OpenAIResponse {
    readonly model: string;
    readonly text: string;
    readonly promptTokens: number;
    readonly completionTokens: number;
}
export declare class OpenAIClient {
    createCompletion(request: OpenAIRequest): Promise<OpenAIResponse>;
}
export interface AnthropicRequest {
    readonly model: string;
    readonly prompt: string;
    readonly temperature?: number;
    readonly maxTokens?: number;
}
export interface AnthropicResponse {
    readonly model: string;
    readonly completion: string;
    readonly inputTokens: number;
    readonly outputTokens: number;
}
export declare class AnthropicClient {
    completeMessage(request: AnthropicRequest): Promise<AnthropicResponse>;
}
