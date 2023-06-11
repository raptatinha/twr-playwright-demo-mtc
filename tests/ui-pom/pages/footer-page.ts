import { type Page, expect, type BrowserContext } from '@playwright/test';

class FooterPage {
  readonly page: Page;
  readonly context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  async openAndCheckNewPage(link: string, url: RegExp) {
    const pagePromise = this.context.waitForEvent('page'); 
    await this.page.getByRole('link', { name: link }).click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(url);
  }
}

export default FooterPage;
