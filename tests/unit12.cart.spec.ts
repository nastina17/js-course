import { test, expect } from "@playwright/test";
import { HeaderFragment } from "fragments/HeaderFragment";
import { HomePage } from "pages/home.page";
import { ProductPage } from "pages/product.page";
import { CartPage } from "pages/cart.page";

const PRODUCT_NAME = "Slip Joint Pliers";
const PRODUCT_PRICE = "9.17";

test("Verify user can add product to cart", async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const headerFragment = new HeaderFragment(page);
    const cartPage = new CartPage(page);

    await page.goto('/');

    await homePage.selectProduct(PRODUCT_NAME);

    await expect(page).toHaveURL(/\/product/);
    await expect(productPage.productName).toHaveText(PRODUCT_NAME);
    await expect(productPage.productPrice).toHaveText(PRODUCT_PRICE);

    await productPage.addToCartButton.click();

    await expect(productPage.alertMessage).toHaveText("Product added to shopping cart.");
    await expect(productPage.alertMessage).toBeHidden({ timeout: 8000 });

    await expect(headerFragment.cartQuantity).toHaveText("1");

    await headerFragment.cartButton.click();

    await expect(page).toHaveURL(/\/checkout/);
    await expect(cartPage.cartProducts).toHaveCount(1);
    await expect(cartPage.productTitle).toHaveText(PRODUCT_NAME);
    await expect(cartPage.proceedToCheckoutButton).toBeVisible();
});