import { describe, it, expect } from 'vitest';
import { TokenCalculator } from '../utils/token-calculator.js';

describe('TokenCalculator', () => {
  it('estimates token count correctly', () => {
    const text = 'Hello world, this is a test string.'; // 35 chars -> ~9 tokens
    const count = TokenCalculator.estimateTokenCount(text);
    expect(count).toBe(9);
  });

  it('creates usage statistics object', () => {
    const usage = TokenCalculator.createUsage('What is AI?', 'Artificial Intelligence is...');
    expect(usage.promptTokens).toBeGreaterThan(0);
    expect(usage.completionTokens).toBeGreaterThan(0);
    expect(usage.totalTokens).toBe(usage.promptTokens + usage.completionTokens);
  });
});
