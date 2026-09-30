import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['dot'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    baseURL: process.env.BASE_URL,
    testIdAttribute: 'data-test',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },

  projects: [
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
    },
  },

  {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
    },
  },

  {
    name: 'webkit',
    use: {
      ...devices['Desktop Safari'],
    },
  },
],
});