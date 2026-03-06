// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

const PORT = 5173;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const isCI = process.env.CI === 'true';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30_000,
  expect: { timeout: 15_000 },
  outputDir: 'test-results',
  retries: isCI ? 2 : 1, // Standardizing retries for stability in CI

  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
  ],

  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  webServer: {
    command: isCI ? 'npm run e2e:serve:ci' : 'npm run e2e:serve',
    url: BASE_URL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    // You can easily add Firefox or WebKit here later if needed,
    // with no auth-setup dependencies blocking them.
  ],
});
