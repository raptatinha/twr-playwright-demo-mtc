import { test, expect, type Page } from '@playwright/test';
import pages from '../../utils/pages';
import userData from '../../data/user-data';
import productData from '../../data/product-data';

const orderCompletedLabelString = 'Thank you for your order!';
const orderCompletedTextString = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';

test.beforeEach(async ({ page }) => {
    await page.goto(pages.homePage);
});

test.describe('Checkout without Page Object Model', () => {
    test(`successfull checkout`, async ({page}) => {
        await test.step('add/remove items to/from cart', async () => {
            await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
            await expect(page.locator('#shopping_cart_container')).toHaveText('1');
            await page.getByRole('button', { name: 'Add to cart' }).first().click();
            await expect(page.locator('#shopping_cart_container')).toHaveText('2');
            await page.getByRole('button', { name: 'Remove' }).first().click();
            await expect(page.locator('#shopping_cart_container')).toHaveText('1');
            await page.locator(`[name='add-to-cart-sauce-labs-bolt-t-shirt']`).click();
        });
    
        await test.step('go to cart', async () => {
            await page.locator('#shopping_cart_container').filter( { hasText: productData.items.toString() }).click();
            await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(productData.items);
        });
    
        await test.step('go to checkout step one', async () => {
            await page.getByRole('button', { name: 'Checkout' }).click();
        });
        
        await test.step('fill customer info and go to step two', async () => {
            for (const input of await page.getByRole('textbox').all()){
                await expect(input).toBeEmpty();
            }
            await page.getByPlaceholder('First Name').fill(userData.firstName);
            await page.getByPlaceholder('Last Name').fill(userData.lastName);
            await page.getByPlaceholder('Zip/Postal Code').fill(userData.zip);
            await page.getByText('Continue', { exact: true }).click();
        });

        await test.step('check order info and complete checkout', async () => {
            await expect(page.getByText('Item total')).toHaveText( productData.orderInfo.itemTotal);
            await expect(page.getByText('Tax')).toHaveText( productData.orderInfo.tax);
            await expect(page.getByText('Total:').last()).toHaveText( productData.orderInfo.orderTotal);
            await page.getByText('Finish', { exact: true }).click();
        });

        await test.step('check checkout successfull', async () => {
            await expect(page.getByText(orderCompletedLabelString)).toBeVisible();
            await expect(page.getByText(orderCompletedTextString)).toBeVisible();
            await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();
        });
        
        await test.step('back to home', async () => {
            await page.getByRole('button', { name: 'Back Home' }).click();
            await expect(page).toHaveURL(/.*inventory.html/);
        });
    });
});
