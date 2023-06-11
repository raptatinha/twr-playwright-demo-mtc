import { type Page, type Locator, expect } from '@playwright/test';

class InventoryPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly removeFromCartButton: Locator;
  readonly productSortContainer: Locator;
  readonly inventoryContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.removeFromCartButton = page.getByRole('button', { name: 'Remove' });
    this.productSortContainer = page.getByTestId('product_sort_container');
    this.inventoryContainer = page.locator('#inventory_container').first();
  }

  async addToCart() {
    await this.addToCartButton.first().click();
  }

  async removeFromCart(){
    await this.removeFromCartButton.first().click();
  }

  async sortProducts(option: string){
    await this.productSortContainer.selectOption(option);
  }

  async checkSort(product: string){
    await expect(this.inventoryContainer).toContainText(product);
  }
}

export default InventoryPage;
