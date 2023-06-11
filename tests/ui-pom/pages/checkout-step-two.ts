import { type Page, type Locator , expect } from '@playwright/test';

interface OrderInfo {
  readonly itemTotal: RegExp;
  readonly tax: RegExp;
  readonly orderTotal: RegExp;
}

class CheckoutStepTwoPage {
  readonly page: Page;
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly orderTotalLabel: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemTotalLabel = page.getByText('Item total:');
    this.taxLabel = page.getByText('Tax:');
    this.orderTotalLabel = page.getByText('Total:').last();
    this.finishButton = page.getByText('Finish', { exact: true });
  }

  async checkItemTotal(itemTotal: RegExp) {
    await expect(this.itemTotalLabel).toHaveText(itemTotal);
  }

  async checkTax(tax: RegExp) {
    await expect(this.taxLabel).toHaveText(tax);
  }

  async checkOrderTotal(orderTotal: RegExp) {
    await expect(this.orderTotalLabel).toHaveText(orderTotal);
  }

  async checkOrderInfo(orderInfo: OrderInfo){
    await this.checkItemTotal(orderInfo.itemTotal);
    await this.checkTax(orderInfo.tax);
    await this.checkOrderTotal(orderInfo.orderTotal);
  }

  async completeCheckout(){
    await this.finishButton.click();
  }
}

export default CheckoutStepTwoPage;
