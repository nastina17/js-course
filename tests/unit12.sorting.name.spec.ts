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
    test(`Verify user can perform sorting by ${option.name}`, async ({ page, app }) => {

        await page.goto('/');

        await app.homePage.sortDropdown.selectOption({ label: option.name });

        await expect(async () => {
            const actualNames = await app.homePage.getProductNames();

            const expectedNames = [...actualNames];

            option.sort(expectedNames);

            expect(actualNames).toEqual(expectedNames);
        }).toPass();
    });
}
