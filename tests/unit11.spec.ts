import { test, expect } from '@playwright/test';
import { HomePage } from 'pages/home.page';
import { ProductPage } from 'pages/product.page';


test('Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await page.goto('/');

    await homePage.selectProduct('Combination Pliers');

    await expect(page).toHaveURL(/product/);

    await expect(productPage.productName).toHaveText('Combination Pliers');
    await expect(productPage.productPrice).toHaveText('14.15');

    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToFavoritesButton).toBeVisible();
});