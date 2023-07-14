import { test, expect } from '@playwright/test';

const orderCompletedLabelString = 'Thank you for your order!';
const orderCompletedTextString = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';

test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
});

test.describe('Checkout without Page Object Model', () => {
    test(`successfull checkout`, async ({page}) => {
        await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
        await expect(page.locator('#shopping_cart_container')).toHaveText('1');
        await page.getByRole('button', { name: 'Add to cart' }).first().click();
        await expect(page.locator('#shopping_cart_container')).toHaveText('2');
        await page.getByRole('button', { name: 'Remove' }).first().click();
        await expect(page.locator('#shopping_cart_container')).toHaveText('1');
        await page.locator(`[name='add-to-cart-sauce-labs-bolt-t-shirt']`).click();
        await page.locator('#shopping_cart_container').filter( { hasText: '2' }).click();
        await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(2);
        await page.getByRole('button', { name: 'Checkout' }).click();
        for (const input of await page.getByRole('textbox').all()){
            await expect(input).toBeEmpty();
        }
        await page.getByPlaceholder('First Name').fill('Renatinha');
        await page.getByPlaceholder('Last Name').fill('Andrade');
        await page.getByPlaceholder('Zip/Postal Code').fill('2187');
        await page.getByText('Continue', { exact: true }).click();
        await expect(page.getByText('Item total')).toHaveText(/.*25.98/);
        await expect(page.getByText('Tax')).toHaveText(/.*2.08/);
        await expect(page.getByText('Total:').last()).toHaveText(/.*28.06/);
        await page.getByText('Finish', { exact: true }).click();
        await expect(page.getByText(orderCompletedLabelString)).toBeVisible();
        await expect(page.getByText(orderCompletedTextString)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();
        await page.getByRole('button', { name: 'Back Home' }).click();
        await expect(page).toHaveURL(/.*inventory.html/);
    });
});


