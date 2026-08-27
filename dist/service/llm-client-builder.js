import { ChatService } from './chat-service.js';
export class LLMClientBuilder {
    service;
    config;
    defaultOptions;
    constructor(service = new ChatService()) {
        this.service = service;
    }
    withPlatform(platform) {
        this.config = {
            ...(this.config ?? { model: '' }),
            platform
        };
        return this;
    }
    withModel(model) {
        this.config = {
            ...(this.config ?? { platform: '' }),
            model
        };
        return this;
    }
    withDefaultOptions(options) {
        this.defaultOptions = {
            ...this.defaultOptions,
            ...options
        };
        return this;
    }
    build() {
        if (!this.config?.platform) {
            throw new Error('Platform must be specified before building the client.');
        }
        if (!this.config.model) {
            throw new Error('Model must be specified before building the client.');
        }
        this.service.configure(this.config);
        return new ConfiguredClient(this.service, this.defaultOptions);
    }
}
export class ConfiguredClient {
    service;
    defaultOptions;
    constructor(service, defaultOptions) {
        this.service = service;
        this.defaultOptions = defaultOptions;
    }
    send(prompt, options) {
        return this.service.send(prompt, {
            ...this.defaultOptions,
            ...options
        });
    }
    stream(prompt, options) {
        return this.service.stream(prompt, {
            ...this.defaultOptions,
            ...options
        });
    }
}
