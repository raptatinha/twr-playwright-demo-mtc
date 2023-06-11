import { test, expect, type Page } from '@playwright/test';
import messages from '../../utils/messages';
import pages from '../../utils/pages';
import userData from '../../data/user-data';

const userName = userData;
const password = process.env.PASSWORD;

test.use({ storageState: undefined }); // doesn't share the logged in session

test.beforeEach(async ({ page }) => {
  await page.goto(pages.loginPage);
});

test.describe('Login without Page Object Model', () => {
  test(`successfull login`, async ({ page }) => {
    await doLogin(page, userName.validUser, password!);
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  for(const invalidUserType in userData.invalidUser){
    test(`failing login for ${invalidUserType}`, async ({ page }) => {
      const invalidUsername = userData.invalidUser[invalidUserType];
      doLogin(page, invalidUsername, password!);
      await expect(page.getByTestId('error')).toHaveText(messages.login[invalidUserType]);
    });
  }
});

async function doLogin(page: Page, userName: string, password: string) {
  await page.getByPlaceholder('Username').fill(userName);
  await page.getByPlaceholder('Password').fill(password!);
  await page.getByText('Login', { exact: true }).click();
};
