import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'npm run dev -- --port 3000 --strictPort',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});