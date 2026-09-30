import { test } from '../fixtures/fixtures';
import { expect } from '@playwright/test';

test('Verify user can view product details', {
    tag: ['@smoke', '@regression'],
}, async ({ page, app }) => {
    const productName = 'Combination Pliers';

    await test.step('Open home page', async () => {
        await page.goto('/');
    });

    await test.step('Select product', async () => {
        await app.homePage.selectProduct(productName);

        await expect(page).toHaveURL(/product/);
    });

    await test.step('Verify product details', async () => {
        await expect(app.productPage.productName).toHaveText(productName);
        await expect(app.productPage.productPrice).toHaveText('14.15');

        await expect(app.productPage.addToCartButton).toBeVisible();
        await expect(app.productPage.addToFavoritesButton).toBeVisible();
    });
});