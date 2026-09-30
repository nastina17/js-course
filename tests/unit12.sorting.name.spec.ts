import { test } from "../fixtures/fixtures";
import { expect } from "@playwright/test";

const sortOptions = [
    {
        name: 'Name (A - Z)',
        sort: (names: string[]) => names.sort(),
    },
    {
        name: 'Name (Z - A)',
        sort: (names: string[]) => names.sort().reverse(),
    },
];

for (const option of sortOptions) {
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
                const actualNames = await app.homePage.getProductNames();

                const expectedNames = [...actualNames];

                option.sort(expectedNames);

                expect(actualNames).toEqual(expectedNames);
            }).toPass();
        });
    });
}
