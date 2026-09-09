import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";

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
    test(`Verify user can perform sorting by ${option.name}`, async ({ page, app }) => {

        await page.goto('/');

        await app.homePage.sortDropdown.selectOption({ label: option.name });

        await expect(async () => {
            const actualPrices = await app.homePage.getProductPrices();

            const expectedPrices = actualPrices.map(Number);

            option.sort(expectedPrices);

            expect(actualPrices.map(Number)).toEqual(expectedPrices);
        }).toPass();
    });
}