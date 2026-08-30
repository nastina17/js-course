import { test, expect } from '@playwright/test';
import { HomePage } from 'pages/home.page';
import { PowerTools } from 'tests/testData/categories';

test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto('/');

    await homePage.selectSubcategory(PowerTools.Sander);

    await expect(async () => {
        const productNames = await homePage.getProductNames();

        expect(
            productNames.every(name => name.includes(PowerTools.Sander))
        ).toBeTruthy();
    }).toPass();
});