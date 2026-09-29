import { defineConfig, devices } from '@playwright/test';
import { userAuthJsonPath } from './auth-constants';
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
    name: 'auth',
    testMatch: /.*\.login\.spec\.ts/,
  },

  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      storageState: userAuthJsonPath,
    },
    dependencies: ['auth'],
  },

  /*
  {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
      storageState: userAuthJsonPath,
    },
    dependencies: ['auth'],
  },

  {
    name: 'webkit',
    use: {
      ...devices['Desktop Safari'],
      storageState: userAuthJsonPath,
    },
    dependencies: ['auth'],
  },
  */
],
});