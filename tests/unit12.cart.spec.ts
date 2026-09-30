import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";

const PRODUCT_NAME = "Slip Joint Pliers";
const PRODUCT_PRICE = "9.17";

test("Verify user can add product to cart", {
    tag: ["@smoke", "@regression"],
}, async ({ page, app }) => {

    await test.step("Open home page", async () => {
        await page.goto('/');
    });

    await test.step("Open product details", async () => {
        await app.homePage.selectProduct(PRODUCT_NAME);

        await expect(page).toHaveURL(/product/);
        await expect(app.productPage.productName).toHaveText(PRODUCT_NAME);
        await expect(app.productPage.productPrice).toHaveText(PRODUCT_PRICE);
    });

    await test.step("Add product to cart", async () => {
        await app.productPage.addToCartButton.click();

        await expect(app.productPage.alertMessage)
            .toHaveText("Product added to shopping cart.");

        await expect(app.productPage.alertMessage)
            .toBeHidden({ timeout: 8000 });

        await expect(app.header.cartQuantity).toHaveText("1");
    });

    await test.step("Open cart and verify product", async () => {
        await app.header.cartButton.click();

        await expect(page).toHaveURL(/checkout/);
        await expect(app.cartPage.cartProducts).toHaveCount(1);
        await expect(app.cartPage.productTitle).toHaveText(PRODUCT_NAME);
        await expect(app.cartPage.proceedToCheckoutButton).toBeVisible();
    });
});