/**
 * Lightweight prompt templating utility. Supports {{variable}} interpolation
 * so applications can define reusable prompt templates instead of building
 * strings manually with string concatenation.
 */
export class PromptTemplate {
    template;
    constructor(template) {
        this.template = template;
    }
    static from(template) {
        return new PromptTemplate(template);
    }
    /**
     * Replaces all {{key}} placeholders with the provided values.
     * Throws if a placeholder in the template has no corresponding value.
     */
    format(values) {
        return this.template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, key) => {
            if (!(key in values)) {
                throw new Error(`Missing value for placeholder "{{${key}}}" in prompt template.`);
            }
            return String(values[key]);
        });
    }
    /** Returns the list of placeholder names found in the template. */
    variables() {
        const matches = this.template.matchAll(/\{\{\s*([\w.]+)\s*\}\}/g);
        return [...new Set([...matches].map((m) => m[1]))];
    }
    toString() {
        return this.template;
    }
}
