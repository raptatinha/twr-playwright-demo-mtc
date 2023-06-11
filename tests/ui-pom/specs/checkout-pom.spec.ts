import { test } from '@playwright/test';
import CartPage from '../pages/cart-page';
import CheckoutStepCompletePage from '../pages/checkout-complete';
import CheckoutStepOnePage from '../pages/checkout-step-one';
import CheckoutStepTwoPage from '../pages/checkout-step-two';
import HeaderPage from '../pages/header-page';
import InventoryPage from '../pages/inventory-page';
import pages from '../../utils/pages';
import productData from '../../data/product-data';
import userData from '../../data/user-data';

const orderInfo = {
    itemTotal: /.*39.98/,
    tax: /.*3.20/,
    orderTotal: /.*43.18/,
};

let inventoryPage: InventoryPage;
let headerPage: HeaderPage;
let cartPage: CartPage;
let checkoutStepOnePage: CheckoutStepOnePage;
let checkoutStepTwoPage: CheckoutStepTwoPage;
let checkoutStepCompletePage: CheckoutStepCompletePage;

test.beforeEach(async ({ page }) => {
    await page.goto(pages.homePage);
    inventoryPage = new InventoryPage(page);
    headerPage = new HeaderPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutStepCompletePage = new CheckoutStepCompletePage(page);
});

test.describe('Checkout with Page Object Model', () => {
    test(`successfull checkout`, async () => {
        await inventoryPage.addToCart();
        await inventoryPage.addToCart();
        await inventoryPage.removeFromCart();
        await inventoryPage.addToCart();
        await headerPage.goToCart(productData.items);
        await cartPage.checkItemsInCart(productData.items);
        await cartPage.goToCheckout();
        await checkoutStepOnePage.fillInformationAndContinue(userData);
        await checkoutStepTwoPage.checkOrderInfo(orderInfo);
        await checkoutStepTwoPage.completeCheckout();
        await checkoutStepCompletePage.checkCheckoutSucessfull();
        await checkoutStepCompletePage.goBackToHome();
    });
});
