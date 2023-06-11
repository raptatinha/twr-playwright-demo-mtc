import { type Page, type Locator , expect } from '@playwright/test';

class CheckoutCompletePage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly backHomeButton: Locator;
  readonly orderCompletedLabel: Locator;
  readonly orderCompletedText: Locator;
  readonly orderCompletedLabelString: string = 'Thank you for your order!';
  readonly orderCompletedTextString: string = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';

  constructor(page: Page) {
    this.page = page;
    this.orderCompletedLabel = page.getByText(this.orderCompletedLabelString);
    this.orderCompletedText = page.getByText(this.orderCompletedTextString);
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
  }

  async goBackToHome(){
    await this.backHomeButton.click();
  }

  async checkCheckoutSucessfull(){
    await expect(this.orderCompletedLabel).toBeVisible();
    await expect(this.orderCompletedText).toBeVisible();
    await expect(this.backHomeButton).toBeVisible();
  }
}

export default CheckoutCompletePage;
