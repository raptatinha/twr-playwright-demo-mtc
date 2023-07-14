import { test, expect } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Simple Login', () => {
  test(`successfull login`, async ({ page }) => {
    await page.getByPlaceholder('Username')
      .fill(process.env.USERNAME!);
    await page.getByTestId('password')
      .fill(process.env.PASSWORD!);
    await page.getByText('Login', { exact: true })
    .click();
    await expect(page).toHaveURL(/.*inventory.html/)
    await expect(page).toHaveTitle(/Swag Labs/);
  });
});
