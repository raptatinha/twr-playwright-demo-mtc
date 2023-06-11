import { chromium, FullConfig } from '@playwright/test';
import LoginPage from '../ui-pom/pages/login-page';
import userData from '../data/user-data';

async function globalSetup(config: FullConfig) {
  const userName = userData.validUser;
  const password = process.env.PASSWORD;
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch({ headless: true, timeout: 10000 });
  const context = await browser.newContext();
  // const page = await browser.newPage({ ignoreHTTPSErrors: shouldIgnoreHTTPSErrors });
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);

  try {
      await context.tracing.start({ screenshots: true, snapshots: true });
      await page.goto(baseURL!);
      await loginPage.doLogin(userName, password!);
      await loginPage.checkLoggedIn();
      await page.context().storageState({ path: storageState as string });
      await context.tracing.stop({path: './test-results/setup-trace.zip'});
      await browser.close();
    } catch (error) {
        await context.tracing.stop({path: './test-results/failed-setup-trace.zip'});
        await browser.close();
        throw error;
    }
}

export default globalSetup;

// https://playwright.dev/docs/test-global-setup-teardown#capturing-trace-of-failures-during-global-setup
// https://playwright.dev/docs/trace-viewer
