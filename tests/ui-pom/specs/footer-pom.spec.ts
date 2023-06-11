import { test } from '@playwright/test';
import FooterPage from '../pages/footer-page';
import pages from '../../utils/pages';
import footerLinks from '../../utils/footer-links';

let footerPage: FooterPage;

test.beforeEach(async ({ page, context }) => {
  await page.goto(pages.homePage);
  footerPage = new FooterPage(page, context);
});

test.describe('Footer with Page Object Model', () => {
  for(const option in footerLinks){
    test(`successfully open ${footerLinks[option].link}`, async () => {
      await footerPage.openAndCheckNewPage(footerLinks[option].link, (footerLinks[option].url));
    });
  }
});
