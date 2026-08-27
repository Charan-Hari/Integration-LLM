export interface ChatOptions {
  readonly temperature?: number;
  readonly maxTokens?: number;
  readonly systemPrompt?: string;
  readonly streaming?: boolean;
  readonly metadata?: Record<string, unknown>;
}

export interface UsageStatistics {
  readonly promptTokens: number;
  readonly completionTokens: number;
  readonly totalTokens: number;
}

export interface ChatResponse {
  readonly model: string;
  readonly content: string;
  readonly usage: UsageStatistics;
  readonly additionalData?: Record<string, unknown>;
}

export interface StreamingChunk {
  readonly model: string;
  readonly contentFragment: string;
  readonly isLast: boolean;
}
