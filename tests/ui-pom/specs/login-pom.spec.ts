import { test } from '@playwright/test';
import LoginPage from '../pages/login-page';
import pages from '../../utils/pages';
import userData from '../../data/user-data';

const userName = userData;
const password = process.env.PASSWORD;
let loginPage: LoginPage;

test.use({ storageState: undefined }); // doesn't share the logged in session

test.beforeEach(async ({ page }) => {
  await page.goto(pages.loginPage);
  loginPage = new LoginPage(page);
});

test.describe('Login with Page Object Model', () => {
  test(`successfull login`, async () => {
    await loginPage.doLogin(userName.validUser, password!);
    await loginPage.checkLoggedIn();
  });

  for(const invalidUserType in userData.invalidUser){
    test(`failing login for ${invalidUserType}`, async () => {
      const invalidUsername = userData.invalidUser[invalidUserType];
      await loginPage.doLogin(invalidUsername, password!);
      await loginPage.checkInvalidCredentials(invalidUserType);
    });
  }
});
