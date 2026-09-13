import { describe, it, expect } from 'vitest';
import { PromptTemplate } from '../utils/prompt-template.js';

describe('PromptTemplate', () => {
  it('interpolates placeholders with provided values', () => {
    const template = PromptTemplate.from('Explain {{topic}} to a {{audience}}.');
    const result = template.format({ topic: 'the Adapter pattern', audience: 'junior developer' });
    expect(result).toBe('Explain the Adapter pattern to a junior developer.');
  });

  it('lists unique variable names', () => {
    const template = PromptTemplate.from('{{a}} and {{b}} and {{a}} again');
    expect(template.variables()).toEqual(['a', 'b']);
  });

  it('throws when a required value is missing', () => {
    const template = PromptTemplate.from('Hello {{name}}');
    expect(() => template.format({})).toThrow('Missing value for placeholder "{{name}}"');
  });

  it('supports numeric and boolean interpolation', () => {
    const template = PromptTemplate.from('Temperature: {{temp}}, streaming: {{streaming}}');
    const result = template.format({ temp: 0.7, streaming: true });
    expect(result).toBe('Temperature: 0.7, streaming: true');
  });
});
