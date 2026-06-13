import { defineConfig, devices } from '@playwright/test';

// Neutrale Basis-Config. Tests liegen in ./tests, baseURL via APP_URL
// (Default: lokaler Static-Server auf Port 8765, siehe scripts/pw-static-server.mjs).
export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.APP_URL || 'http://127.0.0.1:8765',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome'],
    // Fallback auf System-Browser via PW_CHANNEL=msedge, falls der
    // Playwright-Chromium-Download nicht verfügbar ist.
    channel: process.env.PW_CHANNEL || undefined,
  },
});
