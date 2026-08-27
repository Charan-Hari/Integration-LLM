// Mock LLM responses based on platform and model
const mockResponses = {
    azure: {
        'gpt-4o-mini': [
            'The adapter pattern is a structural design pattern that converts the interface of a class into another interface clients expect. It lets classes work together that couldn\'t otherwise because of incompatible interfaces.',
            'In this Integration-LLM library, the Adapter pattern is used to convert provider-specific API responses into a unified ChatResponse format.',
        ],
        'gpt-35-turbo': [
            'An adapter pattern acts as a bridge between two incompatible interfaces, allowing them to work together seamlessly.',
            'Azure OpenAI is being configured. This adapter connects Azure\'s native API to our unified interface.',
        ],
        'gpt-4o': [
            'The adapter pattern solves the problem of incompatible interfaces by providing a wrapper that translates one interface to another.',
            'Think of it like a power adapter - it allows different plugs to connect to the same outlet.',
        ]
    },
    bedrock: {
        'llama3.2': [
            'Llama responding: The adapter pattern enables interoperability between systems with different interfaces without modifying their source code.',
            'In AWS Bedrock, the adapter translates Bedrock\'s response format into our standardized ChatResponse structure.',
        ],
        'gemma3': [
            'From Gemma: Design patterns like the adapter help us write more maintainable and flexible code.',
            'The adapter pattern is essential for multi-provider systems like this one.',
        ],
        'qwen3': [
            'Qwen LLM perspective: The adapter pattern allows us to plug in different LLM providers without rewriting the consuming code.',
            'This is exactly how Integration-LLM works - each provider has an adapter.',
        ]
    },
    google: {
        'gemini-pro': [
            'Gemini says: The adapter pattern is crucial for API integration layers. It provides a single interface for multiple backend implementations.',
            'Google Vertex AI integrates with this library through its own adapter implementation.',
        ],
        'gemini-1.0-pro': [
            'Google\'s perspective: The adapter pattern enables you to switch implementations at runtime, which is perfect for multi-cloud strategies.',
            'Each LLM platform in this library has its own adapter.',
        ],
        'text-unicorn-latest': [
            'Text Unicorn perspective: Adapter patterns solve the impedance mismatch between different systems.',
            'This library demonstrates excellent use of adapters for LLM integration.',
        ]
    },
    ollama: {
        'llama3.2': [
            'Ollama Llama 3.2: The adapter pattern allows us to create a universal interface for diverse LLM implementations. This is powerful for local and remote model serving.',
            'Notice how you can run this locally with Ollama or switch to cloud providers - all using the same code!',
        ],
        'gemma3': [
            'Gemma running locally: This design pattern is brilliant for creating flexible, extensible systems.',
            'The adapter abstracts away provider details, letting you focus on your application logic.',
        ],
        'qwen3': [
            'Qwen running on Ollama: The beauty of the adapter pattern is that it\'s transparent to the client code.',
            'You send a message, and the adapter handles all the provider-specific translation.',
        ]
    }
};

// Platform model mappings
const platformModels = {
    azure: ['gpt-4o-mini', 'gpt-35-turbo', 'gpt-4o'],
    bedrock: ['llama3.2', 'gemma3', 'qwen3'],
    google: ['gemini-pro', 'gemini-1.0-pro', 'text-unicorn-latest'],
    ollama: ['llama3.2', 'gemma3', 'qwen3']
};

// Initialize demo
document.addEventListener('DOMContentLoaded', () => {
    const platformSelect = document.getElementById('platform');
    const modelSelect = document.getElementById('model');
    const sendBtn = document.getElementById('sendBtn');
    const promptInput = document.getElementById('prompt');
    const responseBox = document.getElementById('responseBox');
    const codeExample = document.getElementById('codeExample');

    // Update model options when platform changes
    platformSelect.addEventListener('change', () => {
        const platform = platformSelect.value;
        const models = platformModels[platform] || [];
        modelSelect.innerHTML = models.map(m => `<option value="${m}">${m}</option>`).join('');
        updateCodeExample();
    });

    modelSelect.addEventListener('change', updateCodeExample);

    // Send message
    sendBtn.addEventListener('click', () => {
        const platform = platformSelect.value;
        const model = modelSelect.value;
        const prompt = promptInput.value.trim();

        if (!prompt) {
            responseBox.innerHTML = '<p class="placeholder">Please enter a prompt</p>';
            return;
        }

        sendMessage(platform, model, prompt);
    });

    // Allow sending with Enter key
    promptInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            sendBtn.click();
        }
    });

    // Send message function
    function sendMessage(platform, model, prompt) {
        responseBox.innerHTML = '';
        responseBox.classList.add('loading');
        sendBtn.disabled = true;

        // Simulate network delay
        setTimeout(() => {
            const responses = mockResponses[platform]?.[model] || [];
            const response = responses.length > 0 
                ? responses[Math.floor(Math.random() * responses.length)]
                : `Response from ${platform} using ${model} model.`;

            responseBox.classList.remove('loading');
            responseBox.innerHTML = `<p>${response}</p>`;
            sendBtn.disabled = false;
        }, 1000);
    }

    // Update code example
    function updateCodeExample() {
        const platform = platformSelect.value;
        const model = modelSelect.value;
        const prompt = promptInput.value || 'Explain the adapter pattern.';

        const code = `import { ChatService, registerDefaultFactories } from 'integration-llm';

registerDefaultFactories();

const chatService = new ChatService();
chatService.configure({
  platform: '${platform}',
  model: '${model}'
});

const response = await chatService.send('${prompt}');

console.log(response.content);`;

        codeExample.textContent = code;
    }

    // Initial setup
    updateCodeExample();

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#home') return; // Skip home link

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
