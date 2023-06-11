import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  globalSetup: require.resolve('./tests/setup/global-setup'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'on',
    storageState: 'storageState.json',
    testIdAttribute: 'data-test'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ], 
});
