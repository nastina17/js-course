import { test } from '../fixtures/fixtures';
import { expect } from '@playwright/test';

test('Verify user can view product details', async ({ page, app }) => {
    const productName = 'Combination Pliers';

    await page.goto('/');

    await app.homePage.selectProduct(productName);

    await expect(page).toHaveURL(/product/);

    await expect(app.productPage.productName).toHaveText(productName);
    await expect(app.productPage.productPrice).toHaveText('14.15');

    await expect(app.productPage.addToCartButton).toBeVisible();
    await expect(app.productPage.addToFavoritesButton).toBeVisible();
});