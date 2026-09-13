/**
 * Lightweight prompt templating utility. Supports {{variable}} interpolation
 * so applications can define reusable prompt templates instead of building
 * strings manually with string concatenation.
 */
export declare class PromptTemplate {
    private readonly template;
    private constructor();
    static from(template: string): PromptTemplate;
    /**
     * Replaces all {{key}} placeholders with the provided values.
     * Throws if a placeholder in the template has no corresponding value.
     */
    format(values: Record<string, string | number | boolean>): string;
    /** Returns the list of placeholder names found in the template. */
    variables(): string[];
    toString(): string;
}
