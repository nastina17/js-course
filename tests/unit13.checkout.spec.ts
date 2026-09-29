import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";

test("Verify logged in user can buy a product", {
    tag: ["@smoke", "@regression"],
}, async ({ page, app }) => {

    let productName: string;
    let productPrice: string;

    await test.step("Open home page", async () => {
        await page.goto('/');
    });

    await test.step("Select a product", async () => {
        await app.homePage.products.first().click();

        await expect(page).toHaveURL(/product/);

        productName = await app.productPage.productName.innerText();
        productPrice = await app.productPage.productPrice.innerText();
    });

    await test.step("Add product to cart", async () => {
        await app.productPage.addToCartButton.click();

        await app.productPage.header.cartButton.click();

        await expect(page).toHaveURL(/checkout/);
    });

    await test.step("Verify product in cart", async () => {
        await expect(app.cartPage.cartProducts).toHaveCount(1);
        await expect(app.cartPage.productTitle).toHaveText(productName);
        await expect(app.cartPage.productPrice).toHaveText(`$${productPrice}`);
        await expect(app.cartPage.totalPrice).toHaveText(`$${productPrice}`);

        await app.cartPage.proceedToCheckoutButton.click();
    });

    await test.step("Verify logged in user", async () => {
        await expect(app.checkoutPage.loggedInUserInfo)
            .toContainText('Jane Doe');

        await app.checkoutPage.proceedSignin.click();
    });

    await test.step("Fill billing address", async () => {
        await app.checkoutPage.country.selectOption({
            label: 'Ukraine'
        });

        await app.checkoutPage.postalCode.fill('48260');
        await app.checkoutPage.houseNumber.fill('20');

        await app.checkoutPage.proceedBilling.click();
    });

    await test.step("Fill payment details and confirm order", async () => {
        await app.checkoutPage.paymentMethod.selectOption({
            label: 'Credit Card'
        });

        await app.checkoutPage.cardNumber.fill(
            '1111-1111-1111-1111'
        );

        await app.checkoutPage.cvv.fill('111');
        await app.checkoutPage.cardHolder.fill('Jane Doe');

        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 3);

        const month = String(
            expirationDate.getMonth() + 1
        ).padStart(2, '0');

        const year = String(expirationDate.getFullYear());

        await app.checkoutPage.expirationDate.fill(
            `${month}/${year}`
        );

        await app.checkoutPage.confirmButton.click();

        await expect(
            app.checkoutPage.paymentSuccessMessage
        ).toBeVisible();
    });
});