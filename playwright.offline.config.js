// Offline-/Sandbox-Config für Umgebungen ohne Zugriff auf cdn.playwright.dev:
// nutzt das via npm installierte @sparticuz/chromium als Browser-Binary und
// einen lokalen Static-Server (scripts/pw-static-server.mjs) als baseURL.
// Aufruf: APP_URL=http://127.0.0.1:8765 npx playwright test -c playwright.offline.config.js
import baseConfig from './playwright.config.js';
import { defineConfig } from '@playwright/test';
import chromiumPkg from '@sparticuz/chromium';

const c = chromiumPkg.default || chromiumPkg;
const executablePath = await c.executablePath();

export default defineConfig({
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: process.env.APP_URL || 'http://127.0.0.1:8765',
    launchOptions: { executablePath, args: c.args },
  },
});
