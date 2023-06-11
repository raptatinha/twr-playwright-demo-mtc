import { test, expect } from '@playwright/test';
import pages from '../../utils/pages';
import footerLinks from '../../utils/footer-links';

test.beforeEach(async ({ page }) => {
    await page.goto(pages.homePage);
});

test.describe('Footer without Page Object Model', () => {
  for(const option in footerLinks){
    test(`successfully open ${footerLinks[option].link}`, async ({page, context}) => {
      const pagePromise = context.waitForEvent('page'); 
      await page.getByRole('link', { name: footerLinks[option].link }).click();
      const newPage = await pagePromise;
      await newPage.waitForLoadState();
      await expect(newPage).toHaveURL(footerLinks[option].url);
    });
  }
});
