import { type Page, type Locator } from '@playwright/test';

class HeaderPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.cartButton = page.locator('#shopping_cart_container');
  }

  async goToCart(items: number){
    await this.cartButton.filter( { hasText: items.toString() }).click();
  }
}

export default HeaderPage;
