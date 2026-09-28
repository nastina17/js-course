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
    test(`Verify user can perform sorting by ${option.name}`, {
        tag: "@regression",
    }, async ({ page, app }) => {

        await test.step("Open home page", async () => {
            await page.goto('/');
        });

        await test.step(`Sort products by ${option.name}`, async () => {
            await app.homePage.sortDropdown.selectOption({
                label: option.name
            });
        });

        await test.step("Verify products are sorted correctly", async () => {
            await expect(async () => {
                const actualPrices = await app.homePage.getProductPrices();

                const expectedPrices = actualPrices.map(Number);

                option.sort(expectedPrices);

                expect(actualPrices.map(Number)).toEqual(expectedPrices);
            }).toPass();
        });
    });
}