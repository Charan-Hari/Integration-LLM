// Platform and Model Registry Map
const platformModels = {
  azure: ['gpt-4o', 'gpt-4o-mini', 'gpt-35-turbo'],
  bedrock: ['llama3.2', 'gemma3', 'qwen3', 'anthropic.claude-v2'],
  google: ['gemini-pro', 'gemini-1.0-pro', 'text-unicorn-latest'],
  ollama: ['llama3.2', 'gemma3', 'qwen3'],
  openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  anthropic: ['claude-3-5-sonnet', 'claude-3-opus', 'claude-3-haiku']
};

const mockResponses = {
  azure: {
    'gpt-4o': 'The Adapter pattern translates provider-specific vendor payloads into a unified ChatResponse contract.',
    'gpt-4o-mini': 'Azure OpenAI provides fast, enterprise-grade completions with managed deployments.',
    'gpt-35-turbo': 'Legacy turbo deployment processing request efficiently.'
  },
  bedrock: {
    'llama3.2': 'AWS Bedrock invocation complete. Output adapted seamlessly via BedrockStrategy.',
    'gemma3': 'Gemma 3 hosted on Bedrock generated content successfully.',
    'qwen3': 'Qwen 3 response payload normalized to standard ChatResponse.',
    'anthropic.claude-v2': 'Claude v2 response parsed and converted via Bedrock SDK Client.'
  },
  google: {
    'gemini-pro': 'Vertex AI Gemini Pro completed request using GoogleGenerativeClient adapter.',
    'gemini-1.0-pro': 'Google Gemini 1.0 Pro response received.',
    'text-unicorn-latest': 'Text Unicorn model returned structured completion.'
  },
  ollama: {
    'llama3.2': 'Ollama local node executed Llama 3.2 locally with zero external API fees.',
    'gemma3': 'Ollama local node executed Gemma 3 model.',
    'qwen3': 'Ollama local node executed Qwen 3 model.'
  },
  openai: {
    'gpt-4o': 'Direct OpenAI API integration returned high-intelligence completion.',
    'gpt-4o-mini': 'Direct OpenAI API returned fast mini-model completion.',
    'gpt-4-turbo': 'Direct OpenAI API returned GPT-4 Turbo completion.',
    'gpt-3.5-turbo': 'Direct OpenAI API returned GPT-3.5 Turbo completion.'
  },
  anthropic: {
    'claude-3-5-sonnet': 'Direct Anthropic API returned Claude 3.5 Sonnet completion with long-context memory.',
    'claude-3-opus': 'Direct Anthropic API returned Claude 3 Opus completion.',
    'claude-3-haiku': 'Direct Anthropic API returned lightning-fast Claude 3 Haiku response.'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const platformSelect = document.getElementById('platform');
  const modelSelect = document.getElementById('model');
  const tempInput = document.getElementById('temperature');
  const tempVal = document.getElementById('tempVal');
  const maxTokensInput = document.getElementById('maxTokens');
  const systemPromptInput = document.getElementById('systemPrompt');
  const promptInput = document.getElementById('prompt');
  const sendBtn = document.getElementById('sendBtn');
  const responseBox = document.getElementById('responseBox');
  const latencyBadge = document.getElementById('latencyBadge');
  const tokenBadge = document.getElementById('tokenBadge');
  const themeToggle = document.getElementById('themeToggle');
  const copyCodeBtn = document.getElementById('copyCodeBtn');

  // Code Tab Switchers
  const tabBtns = document.querySelectorAll('.tab-btn');
  let activeLang = 'ts';

  // Theme Toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      themeToggle.textContent = nextTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    });
  }

  // Populate models
  function populateModels() {
    if (!platformSelect || !modelSelect) return;
    const selectedPlatform = platformSelect.value;
    const models = platformModels[selectedPlatform] || [];
    modelSelect.innerHTML = models.map(m => `<option value="${m}">${m}</option>`).join('');
    updateCodeSnippet();
  }

  if (platformSelect) {
    platformSelect.addEventListener('change', populateModels);
    modelSelect.addEventListener('change', updateCodeSnippet);
  }

  if (tempInput && tempVal) {
    tempInput.addEventListener('input', () => {
      tempVal.textContent = tempInput.value;
      updateCodeSnippet();
    });
  }

  if (maxTokensInput) maxTokensInput.addEventListener('input', updateCodeSnippet);
  if (systemPromptInput) systemPromptInput.addEventListener('input', updateCodeSnippet);
  if (promptInput) promptInput.addEventListener('input', updateCodeSnippet);

  // Tab Switching for Code Snippets
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeLang = btn.getAttribute('data-lang');
      updateCodeSnippet();
    });
  });

  // Code Generator
  function updateCodeSnippet() {
    const codeSnippetBox = document.getElementById('codeSnippetBox');
    if (!codeSnippetBox) return;

    const platform = platformSelect ? platformSelect.value : 'azure';
    const model = modelSelect ? modelSelect.value : 'gpt-4o';
    const temp = tempInput ? tempInput.value : '0.7';
    const maxTokens = maxTokensInput ? maxTokensInput.value : '500';
    const sysPrompt = systemPromptInput ? systemPromptInput.value : 'You are a helpful assistant.';
    const prompt = promptInput ? promptInput.value : 'Explain Strategy Pattern.';

    let code = '';

    if (activeLang === 'ts') {
      code = `import { ChatService, registerDefaultFactories } from 'integration-llm';

// Register built-in factories (Azure, Bedrock, Google, Ollama, OpenAI, Anthropic)
registerDefaultFactories();

const chatService = new ChatService();

// Configure provider and model dynamically at runtime
chatService.configure({
  platform: '${platform}',
  model: '${model}'
});

const response = await chatService.send('${prompt}', {
  temperature: ${temp},
  maxTokens: ${maxTokens},
  systemPrompt: '${sysPrompt}'
});

console.log('Model:', response.model);
console.log('Content:', response.content);
console.log('Token Usage:', response.usage);`;
    } else if (activeLang === 'js') {
      code = `const { ChatService, registerDefaultFactories } = require('integration-llm');

registerDefaultFactories();

const chatService = new ChatService();
chatService.configure({ platform: '${platform}', model: '${model}' });

chatService.send('${prompt}', { temperature: ${temp} })
  .then(res => console.log(res.content));`;
    } else if (activeLang === 'builder') {
      code = `import { LLMClientBuilder, registerDefaultFactories } from 'integration-llm';

registerDefaultFactories();

const response = await new LLMClientBuilder()
  .setPlatform('${platform}')
  .setModel('${model}')
  .send('${prompt}', { temperature: ${temp} });

console.log(response.content);`;
    } else if (activeLang === 'fallback') {
      code = `import { FallbackChatService, LLMClientBuilder, registerDefaultFactories } from 'integration-llm';

registerDefaultFactories();

// Primary: ${platform}, Secondary: Ollama Fallback
const primary = new LLMClientBuilder().setPlatform('${platform}').setModel('${model}').build();
const fallback = new LLMClientBuilder().setPlatform('ollama').setModel('llama3.2').build();

const resilientService = new FallbackChatService([primary, fallback]);
const response = await resilientService.send('${prompt}');

console.log('Resilient Response:', response.content);`;
    }

    codeSnippetBox.textContent = code;
  }

  // Copy Code Button
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const codeSnippetBox = document.getElementById('codeSnippetBox');
      if (codeSnippetBox) {
        navigator.clipboard.writeText(codeSnippetBox.textContent);
        copyCodeBtn.textContent = '✓ Copied!';
        setTimeout(() => copyCodeBtn.textContent = '📋 Copy Code', 2000);
      }
    });
  }

  // Preset Buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetText = btn.getAttribute('data-prompt');
      if (promptInput && presetText) {
        promptInput.value = presetText;
        updateCodeSnippet();
      }
    });
  });

  // Send Execution Simulation
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const platform = platformSelect ? platformSelect.value : 'azure';
      const model = modelSelect ? modelSelect.value : 'gpt-4o';
      const prompt = promptInput ? promptInput.value.trim() : '';

      if (!prompt) {
        responseBox.textContent = 'Please enter a valid prompt.';
        return;
      }

      responseBox.textContent = 'Connecting to provider strategy...\n[1/2] Resolving Abstract Factory for platform: ' + platform + '\n[2/2] Instantiating Strategy adapter...';
      sendBtn.disabled = true;

      const startTime = performance.now();

      setTimeout(() => {
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);

        const mockText = mockResponses[platform]?.[model] || `Standard completion response for ${platform} (${model}).`;
        const output = `Provider: ${platform.toUpperCase()}\nModel: ${model}\nStatus: 200 OK\n\n--- Content ---\n${mockText}\n\n[Architecture Note]: Execution switched seamlessly at runtime without recompilation.`;

        responseBox.textContent = output;
        sendBtn.disabled = false;

        if (latencyBadge) latencyBadge.textContent = `${duration} ms`;
        if (tokenBadge) {
          const pTokens = Math.ceil(prompt.length / 4);
          const cTokens = Math.ceil(mockText.length / 4);
          tokenBadge.textContent = `${pTokens + cTokens} tokens`;
        }
      }, 700);
    });
  }

  // Initial call
  populateModels();
});
