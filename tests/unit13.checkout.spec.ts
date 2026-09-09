import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";

test("Verify logged in user can buy a product", async ({ page, loggedInApp }) => {
    await page.goto('/');

    await loggedInApp.homePage.products.first().click();

    await expect(loggedInApp.page).toHaveURL(/product/);

    const productName = await loggedInApp.productPage.productName.innerText();
    const productPrice = await loggedInApp.productPage.productPrice.innerText();

    await loggedInApp.productPage.addToCartButton.click();

    await loggedInApp.productPage.header.cartButton.click();

    await expect(loggedInApp.page).toHaveURL(/checkout/);

    await expect(loggedInApp.cartPage.cartProducts).toHaveCount(1);
    await expect(loggedInApp.cartPage.productTitle).toHaveText(productName);
    await expect(loggedInApp.cartPage.productPrice).toHaveText(`$${productPrice}`);
    await expect(loggedInApp.cartPage.totalPrice).toHaveText(`$${productPrice}`);

    await loggedInApp.cartPage.proceedToCheckoutButton.click();

    await expect(loggedInApp.checkoutPage.loggedInUserInfo).toContainText('Jane Doe');
    await loggedInApp.checkoutPage.proceedSignin.click();

    await loggedInApp.checkoutPage.country.selectOption({ label: 'Ukraine' });
    await loggedInApp.checkoutPage.postalCode.fill('48260');
    await loggedInApp.checkoutPage.houseNumber.fill('20');
    await loggedInApp.checkoutPage.proceedBilling.click();

    await loggedInApp.checkoutPage.paymentMethod.selectOption({ label: 'Credit Card' });
    await loggedInApp.checkoutPage.cardNumber.fill('1111-1111-1111-1111');
    await loggedInApp.checkoutPage.cvv.fill('111');
    await loggedInApp.checkoutPage.cardHolder.fill('Jane Doe');

    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 3);
    const month = String(expirationDate.getMonth() + 1).padStart(2, '0');
    const year = String(expirationDate.getFullYear());
    await loggedInApp.checkoutPage.expirationDate.fill(`${month}/${year}`);

    await loggedInApp.checkoutPage.confirmButton.click();
    await expect(loggedInApp.checkoutPage.paymentSuccessMessage).toBeVisible();

});