import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// __dirname points to /config, so tests are resolved relative to the repo root
const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export default defineConfig({
  root: rootDir,
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/__tests__/**/*.test.ts']
  }
});
