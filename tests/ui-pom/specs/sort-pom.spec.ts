import { test } from '@playwright/test';
import InventoryPage from '../pages/inventory-page';
import pages from '../../utils/pages';

let inventoryPage: InventoryPage;
const sortOptions = {
  az: 'Sauce Labs Backpack',
  za: 'Test.allTheThings() T-Shirt (Red)',
  lohi: 'Sauce Labs Onesie',
  hilo: 'Sauce Labs Fleece Jacket',
}

test.beforeEach(async ({ page }) => {
  await page.goto(pages.homePage);
  inventoryPage = new InventoryPage(page);
});

test.describe('Sort with Page Object Model', () => {
  for(const option in sortOptions){
    test(`successfully sort by ${option}`, async ({page}) => {
      await inventoryPage.sortProducts(option);
      await inventoryPage.checkSort(sortOptions[option]);
    });
  }
});
