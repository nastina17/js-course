import { test, expect } from '@playwright/test';
import { HomePage } from 'pages/home.page';

const sortPriceOptions = [
    {
        name: 'Price (Low - High)',
        sort: (prices: number[]) => prices.sort((a, b) => a - b),
    },
    {
        name: 'Price (High - Low)',
        sort: (prices: number[]) => prices.sort((a, b) => b - a),
    },
];

for (const option of sortPriceOptions) {
    test(`Verify user can perform sorting by ${option.name}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await page.goto('/');

        await homePage.sortDropdown.selectOption({ label: option.name });

        await expect(async () => {
            const actualPrices = await homePage.getProductPrices();

            const expectedPrices = actualPrices.map(Number);

            option.sort(expectedPrices);

            expect(actualPrices.map(Number)).toEqual(expectedPrices);
        }).toPass();
    });
}